"use client";

import {
  Grid3x3,
  List,
  Search,
  SlidersHorizontal,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { SavedAnalysis } from "@/app/lib/types/index";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import FilterPanel from "@/components/library/FilterPanel";
import PropertyCard from "@/components/library/PropertyCard";
import PropertyListItem from "@/components/library/PropertyListItem";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

type ViewMode = "grid" | "list";
type SortBy = "date" | "price" | "grade";
type SortOrder = "asc" | "desc";

export default function LibraryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [properties, setProperties] = useState<SavedAnalysis[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<SavedAnalysis[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    priceRange: [0, 10000000] as [number, number],
    grades: [] as string[],
    propertyTypes: [] as string[],
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      // Clear all data when user logs out
      setProperties([]);
      setFilteredProperties([]);
      setSelectedIds([]);
      router.push("/login");
    }
  }, [status, router]);

  const fetchProperties = useCallback(async () => {
    // Only fetch if user is authenticated
    if (!session?.user?.id) {
      setProperties([]);
      setIsLoading(false);
      return;
    }

    try {
      // Add cache-busting parameter with user ID to prevent cross-user data leakage
      const url = `/api/properties?_t=${Date.now()}&_u=${session.user.id}`;
      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const data = await response.json();

      // Handle both successful and error responses gracefully
      if (data.properties) {
        setProperties(data.properties);
      } else {
        setProperties([]);
      }

      // Show error toast if there was an error but don't block the UI
      if (data.error && data.properties?.length === 0) {
        console.error("Property fetch error:", data.error);
        toast.error(
          "Some properties may not have loaded. Please refresh if needed.",
        );
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setProperties([]);
      toast.error(
        "Unable to load your property library. Please try refreshing the page.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [session?.user?.id]);

  const applyFiltersAndSort = useCallback(() => {
    let filtered = [...properties];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.analysis_data.propertyOverview?.city
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          p.analysis_data.propertyOverview?.state
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    // Favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter((p) => p.is_favorite);
    }

    // Price range filter
    filtered = filtered.filter(
      (p) =>
        (p.analysis_data.propertyOverview?.listPrice || 0) >=
          filters.priceRange[0] &&
        (p.analysis_data.propertyOverview?.listPrice || 0) <=
          filters.priceRange[1],
    );

    // Grade filter
    if (filters.grades.length > 0) {
      filtered = filtered.filter((p) =>
        filters.grades.includes(p.analysis_data.aiAnalysis?.buyingGrade || ""),
      );
    }

    // Property type filter
    if (filters.propertyTypes.length > 0) {
      filtered = filtered.filter((p) =>
        filters.propertyTypes.includes(
          p.analysis_data.propertyOverview?.propertyType || "",
        ),
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "date":
          comparison =
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case "price":
          comparison =
            (a.analysis_data.propertyOverview?.listPrice || 0) -
            (b.analysis_data.propertyOverview?.listPrice || 0);
          break;
        case "grade": {
          const gradeValues: Record<string, number> = {
            A: 5,
            B: 4,
            C: 3,
            D: 2,
            F: 1,
          };
          comparison =
            (gradeValues[a.analysis_data.aiAnalysis?.buyingGrade || ""] || 0) -
            (gradeValues[b.analysis_data.aiAnalysis?.buyingGrade || ""] || 0);
          break;
        }
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredProperties(filtered);
  }, [properties, searchQuery, showFavoritesOnly, filters, sortBy, sortOrder]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  // Clear data when user changes to prevent showing previous user's data
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      // User has changed, reset data and fetch fresh
      setProperties([]);
      setFilteredProperties([]);
      setIsLoading(true);
    }
  }, [session?.user?.id, status]);

  const handleToggleFavorite = async (id: string) => {
    try {
      const property = properties.find((p) => p.id === id);
      if (!property) return;

      // Optimistic update
      const wasFavorite = property.is_favorite;
      setProperties((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, is_favorite: !p.is_favorite } : p,
        ),
      );

      const response = await fetch(`/api/properties/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_favorite: !wasFavorite }),
      });

      if (!response.ok) {
        // Revert on error
        setProperties((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, is_favorite: wasFavorite } : p,
          ),
        );
        throw new Error("Failed to update favorite");
      }

      toast.success(
        wasFavorite ? "💔 Removed from favorites" : "⭐ Added to favorites",
      );
    } catch (error) {
      console.error("Toggle favorite error:", error);
      toast.error("Unable to update favorites. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this property? This action cannot be undone.",
      )
    )
      return;

    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      setProperties((prev) => prev.filter((p) => p.id !== id));
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
      toast.success("🗑️ Property deleted successfully");
    } catch (error) {
      console.error("Delete property error:", error);
      toast.error("Unable to delete property. Please try again.");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      toast.error("Please select properties to delete");
      return;
    }

    if (
      !confirm(
        `Delete ${selectedIds.length} ${selectedIds.length === 1 ? "property" : "properties"}? This action cannot be undone.`,
      )
    )
      return;

    try {
      const deletePromises = selectedIds.map(async (id) => {
        const response = await fetch(`/api/properties/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(
            `Failed to delete property ${id}: ${response.status}`,
          );
        }
        return id;
      });

      const results = await Promise.allSettled(deletePromises);

      const successfulDeletes = results
        .filter(
          (r): r is PromiseFulfilledResult<string> => r.status === "fulfilled",
        )
        .map((r) => r.value);

      const failedDeletes = results
        .filter((r): r is PromiseRejectedResult => r.status === "rejected")
        .map((r) => r.reason);

      // Only update UI for successfully deleted properties
      if (successfulDeletes.length > 0) {
        setProperties((prev) =>
          prev.filter((p) => !successfulDeletes.includes(p.id)),
        );
        setSelectedIds((prev) =>
          prev.filter((id) => !successfulDeletes.includes(id)),
        );
      }

      if (failedDeletes.length > 0) {
        console.error("Failed deletions:", failedDeletes);
        toast.error(
          `Deleted ${successfulDeletes.length} properties, but ${failedDeletes.length} failed. Please try again for the remaining items.`,
        );
      } else {
        setSelectedIds([]);
        toast.success(
          `🗑️ Successfully deleted ${successfulDeletes.length} ${successfulDeletes.length === 1 ? "property" : "properties"}`,
        );
      }
    } catch (error) {
      console.error("Bulk delete error:", error);
      toast.error("Unable to delete properties. Please try again.");
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
    );
  };

  const selectAll = () => {
    if (selectedIds.length === filteredProperties.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProperties.map((p) => p.id));
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-luxury-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-white/70">Loading library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 lg:mb-4">
            Property <span className="text-gradient">Library</span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg lg:text-xl">
            Manage and review all your property analyses
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="text-center p-3 sm:p-4">
            <p className="text-white/70 text-xs sm:text-sm mb-1">
              Total Properties
            </p>
            <p className="font-display text-2xl sm:text-3xl font-bold">
              {properties.length}
            </p>
          </Card>
          <Card className="text-center p-3 sm:p-4">
            <p className="text-white/70 text-xs sm:text-sm mb-1">Favorites</p>
            <p className="font-display text-2xl sm:text-3xl font-bold text-luxury-blue">
              {properties.filter((p) => p.is_favorite).length}
            </p>
          </Card>
          <Card className="text-center p-3 sm:p-4">
            <p className="text-white/70 text-xs sm:text-sm mb-1">Total Value</p>
            <p className="font-display text-2xl sm:text-3xl font-bold">
              {(() => {
                const totalValue = properties.reduce((sum, p) => {
                  // Only use listPrice like the dashboard
                  return sum + (p.analysis_data.propertyOverview?.listPrice || 0);
                }, 0);
                
                if (totalValue >= 1000000) {
                  return `$${(totalValue / 1000000).toFixed(1)}M`;
                } else if (totalValue >= 1000) {
                  return `$${(totalValue / 1000).toFixed(0)}K`;
                } else {
                  return `$${totalValue.toLocaleString()}`;
                }
              })()}
            </p>
          </Card>
          <Card className="text-center p-3 sm:p-4">
            <p className="text-white/70 text-xs sm:text-sm mb-1">Showing</p>
            <p className="font-display text-2xl sm:text-3xl font-bold">
              {filteredProperties.length}
            </p>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative w-full">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/50" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="luxury-input pl-10 sm:pl-12 pr-10 sm:pr-12 w-full text-sm sm:text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>

            {/* Controls Row */}
            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
              {/* Sort */}
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split("-");
                  setSortBy(newSortBy as SortBy);
                  setSortOrder(newSortOrder as SortOrder);
                }}
                className="luxury-input w-full lg:w-48"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="price-desc">Highest Price</option>
                <option value="price-asc">Lowest Price</option>
                <option value="grade-desc">Best Grade</option>
                <option value="grade-asc">Worst Grade</option>
              </select>

              {/* Mobile: Row for toggle buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* View Mode Toggle */}
                <div className="flex gap-2 flex-1">
                  <Button
                    variant={viewMode === "grid" ? "primary" : "secondary"}
                    onClick={() => setViewMode("grid")}
                    size="md"
                    className="flex-1 px-3 sm:px-4"
                  >
                    <Grid3x3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-0" />
                    <span className="sm:hidden">Grid</span>
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "primary" : "secondary"}
                    onClick={() => setViewMode("list")}
                    size="md"
                    className="flex-1 px-3 sm:px-4"
                  >
                    <List className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-0" />
                    <span className="sm:hidden">List</span>
                  </Button>
                </div>

                {/* Filters and Favorites Row */}
                <div className="flex gap-3 flex-1">
                  {/* Filters Toggle */}
                  <Button
                    variant="secondary"
                    onClick={() => setShowFilters(!showFilters)}
                    size="md"
                    className="text-sm sm:text-base flex-1"
                  >
                    <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Filters
                  </Button>

                  {/* Favorites Toggle */}
                  <Button
                    variant={showFavoritesOnly ? "primary" : "secondary"}
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    size="md"
                    className="flex-1"
                  >
                    <Star
                      className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 ${
                        showFavoritesOnly ? "fill-current" : ""
                      }`}
                    />
                    <span className="hidden sm:inline">Favorites</span>
                    <span className="sm:hidden">Favs</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              properties={properties}
            />
          )}
        </Card>

        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <Card className="mb-6 bg-luxury-blue/10 border-luxury-blue/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <span className="font-semibold text-sm sm:text-base">
                  {selectedIds.length} selected
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={selectAll}
                  className="text-xs sm:text-sm"
                >
                  {selectedIds.length === filteredProperties.length
                    ? "Deselect All"
                    : "Select All"}
                </Button>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleBulkDelete}
                  className="flex-1 sm:flex-none"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Properties Grid/List */}
        {filteredProperties.length === 0 ? (
          <Card className="text-center py-8 sm:py-12 px-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Search className="w-6 h-6 sm:w-8 sm:h-8 text-white/50" />
            </div>
            <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold mb-2">
              No properties found
            </h3>
            <p className="text-white/70 mb-4 sm:mb-6 text-sm sm:text-base max-w-md mx-auto">
              {searchQuery || filters.grades.length > 0
                ? "Try adjusting your search or filters"
                : "Start analyzing properties to build your library"}
            </p>
            {(searchQuery || filters.grades.length > 0) && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setFilters({
                    priceRange: [0, 10000000],
                    grades: [],
                    propertyTypes: [],
                  });
                  setShowFavoritesOnly(false);
                }}
              >
                Clear Filters
              </Button>
            )}
          </Card>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-fr">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSelected={selectedIds.includes(property.id)}
                onToggleSelect={toggleSelection}
                onToggleFavorite={handleToggleFavorite}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filteredProperties.map((property) => (
              <PropertyListItem
                key={property.id}
                property={property}
                isSelected={selectedIds.includes(property.id)}
                onToggleSelect={toggleSelection}
                onToggleFavorite={handleToggleFavorite}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
