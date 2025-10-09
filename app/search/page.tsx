"use client";

import { ArrowLeft, Filter, Grid3X3, Map, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PropertyFiltersComponent from "@/components/search/PropertyFilter";
import PropertyGrid from "@/components/search/PropertyGrid";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { PropertyFilters, PropertySearchResult } from "@/lib/types";

// Dynamic import to avoid SSR issues with Leaflet
const PropertyMap = dynamic(
  () =>
    import("@/components/search/PropertyMapClient").then((mod) => {
      // Import leaflet config only on client side
      import("@/app/lib/leaflet-config");
      return mod;
    }),
  {
    ssr: false,
    loading: () => (
      <div className="h-full flex items-center justify-center bg-white/5 rounded-xl">
        <p className="text-white/60">Loading map...</p>
      </div>
    ),
  },
);

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(true);
  const [showMap, setShowMap] = useState(true);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allProperties, setAllProperties] = useState<PropertySearchResult[]>(
    [],
  );
  const [properties, setProperties] = useState<PropertySearchResult[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentFilters, setCurrentFilters] = useState<PropertyFilters>({
    location: "",
    minPrice: undefined,
    maxPrice: undefined,
    bedsMin: undefined,
    bedsMax: undefined,
    bathsMin: undefined,
    bathsMax: undefined,
    sqftMin: undefined,
    sqftMax: undefined,
    homeType: [],
    daysOnZillow: undefined,
    hasPool: false,
    hasGarage: false,
    hasAC: false,
    lotMin: undefined,
    lotMax: undefined,
    builtYearMin: undefined,
    builtYearMax: undefined,
    hoaMax: undefined,
    keywords: "",
    sort: "Homes_for_You",
  });

  const handleSearch = useCallback(async (filters: PropertyFilters) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/search-properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: filters.location,
          status_type: "ForSale",
          filters: {
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            bedsMin: filters.bedsMin,
            bedsMax: filters.bedsMax,
            bathsMin: filters.bathsMin,
            bathsMax: filters.bathsMax,
            sqftMin: filters.sqftMin,
            sqftMax: filters.sqftMax,
            lotMin: filters.lotMin,
            lotMax: filters.lotMax,
            builtYearMin: filters.builtYearMin,
            builtYearMax: filters.builtYearMax,
            daysOnZillow: filters.daysOnZillow,
            hoaMax: filters.hoaMax,
            homeType: filters.homeType,
            hasPool: filters.hasPool,
            hasGarage: filters.hasGarage,
            hasAC: filters.hasAC,
            keywords: filters.keywords,
            sort: filters.sort,
          },
          page: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.results)) {
        setAllProperties(data.results);
        setProperties(data.results);
        setTotalResults(data.totalResults);
        setCurrentFilters(filters);
        toast.success(`Found ${data.totalResults} properties`);
      } else {
        throw new Error("No results found");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error(error instanceof Error ? error.message : "Search failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const location = searchParams.get("location");
    if (location) {
      // Parse all URL params
      const filters: PropertyFilters = {
        location,
        minPrice: searchParams.get("minPrice")
          ? Number(searchParams.get("minPrice"))
          : undefined,
        maxPrice: searchParams.get("maxPrice")
          ? Number(searchParams.get("maxPrice"))
          : undefined,
        bedsMin: searchParams.get("bedsMin")
          ? Number(searchParams.get("bedsMin"))
          : undefined,
        bathsMin: searchParams.get("bathsMin")
          ? Number(searchParams.get("bathsMin"))
          : undefined,
        homeType: searchParams.get("homeType")
          ? [searchParams.get("homeType")!]
          : undefined,
        sort: searchParams.get("sort") || "Homes_for_You",
      };
      handleSearch(filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, handleSearch]);

  // Client-side filtering logic
  const filterProperties = (filters: PropertyFilters) => {
    let filtered = [...allProperties];

    // Price range
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    }

    // Bedrooms
    if (filters.bedsMin !== undefined) {
      filtered = filtered.filter((p) => p.bedrooms >= filters.bedsMin!);
    }
    if (filters.bedsMax !== undefined) {
      filtered = filtered.filter((p) => p.bedrooms <= filters.bedsMax!);
    }

    // Bathrooms
    if (filters.bathsMin !== undefined) {
      filtered = filtered.filter((p) => p.bathrooms >= filters.bathsMin!);
    }
    if (filters.bathsMax !== undefined) {
      filtered = filtered.filter((p) => p.bathrooms <= filters.bathsMax!);
    }

    // Square footage
    if (filters.sqftMin !== undefined) {
      filtered = filtered.filter(
        (p) => p.squareFeet && p.squareFeet >= filters.sqftMin!,
      );
    }
    if (filters.sqftMax !== undefined) {
      filtered = filtered.filter(
        (p) => p.squareFeet && p.squareFeet <= filters.sqftMax!,
      );
    }

    // Year built
    if (filters.builtYearMin !== undefined) {
      filtered = filtered.filter(
        (p) => p.yearBuilt && p.yearBuilt >= filters.builtYearMin!,
      );
    }
    if (filters.builtYearMax !== undefined) {
      filtered = filtered.filter(
        (p) => p.yearBuilt && p.yearBuilt <= filters.builtYearMax!,
      );
    }

    // Home type
    if (filters.homeType && filters.homeType.length > 0) {
      filtered = filtered.filter((p) =>
        filters.homeType?.some((type) =>
          p.propertyType.toLowerCase().includes(type.toLowerCase()),
        ),
      );
    }

    // Days on Zillow
    if (filters.daysOnZillow !== undefined) {
      filtered = filtered.filter(
        (p) =>
          p.daysOnZillow !== undefined &&
          p.daysOnZillow <= filters.daysOnZillow!,
      );
    }

    // Keywords (search in address)
    if (filters.keywords?.trim()) {
      const keywords = filters.keywords.toLowerCase();
      filtered = filtered.filter((p) =>
        p.address.toLowerCase().includes(keywords),
      );
    }

    // Sort
    if (filters.sort) {
      switch (filters.sort) {
        case "Price_Low_High":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "Price_High_Low":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "Bedrooms":
          filtered.sort((a, b) => b.bedrooms - a.bedrooms);
          break;
        case "Bathrooms":
          filtered.sort((a, b) => b.bathrooms - a.bathrooms);
          break;
        case "Square_Feet":
          filtered.sort((a, b) => (b.squareFeet || 0) - (a.squareFeet || 0));
          break;
        case "Lot_Size":
          filtered.sort((a, b) => (b.lotSize || 0) - (a.lotSize || 0));
          break;
        case "Newest":
          filtered.sort(
            (a, b) => (a.daysOnZillow || 999) - (b.daysOnZillow || 999),
          );
          break;
      }
    }

    return filtered;
  };

  // Handle filter changes (instant filtering)
  const handleFilterChange = (filters: PropertyFilters) => {
    setCurrentFilters(filters);
    // Only apply filtering if we have properties from a search
    if (allProperties.length > 0) {
      const filtered = filterProperties(filters);
      setProperties(filtered);
    }
  };



  const handlePropertyClick = (property: PropertySearchResult) => {
    window.open(
      `/analyze?zpid=${property.zpid}&address=${encodeURIComponent(property.address)}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-blue to-luxury-blue/20">
      <div className="max-w-[1920px] mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push("/")}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient">
                Property Search
              </h1>
              {totalResults > 0 && (
                <p className="text-white/60 mt-1">
                  {properties.length}{" "}
                  {properties.length !== totalResults
                    ? `of ${totalResults}`
                    : ""}{" "}
                  properties
                  {properties.length !== totalResults && " (filtered)"}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Toggle Filters */}
            {!showFilters && properties.length > 0 && (
              <Button
                variant="secondary"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-5 h-5 mr-2" />
                {showFilters ? "Hide" : "Show"} Filters
              </Button>
            )}

            {/* Toggle Map/Grid (Desktop) */}
            {properties.length > 0 && (
              <>
                <Button
                  variant="secondary"
                  onClick={() => setShowMap(!showMap)}
                  className="hidden lg:flex"
                >
                  {showMap ? (
                    <>
                      <Grid3X3 className="w-5 h-5 mr-2" />
                      Grid Only
                    </>
                  ) : (
                    <>
                      <Map className="w-5 h-5 mr-2" />
                      Show Map
                    </>
                  )}
                </Button>

                {/* Fullscreen Map (Mobile) - Moved to sticky bottom */}
              </>
            )}
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-8">
            <PropertyFiltersComponent
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              initialFilters={currentFilters}
              isLoading={isLoading}
              hasResults={allProperties.length > 0}
            />
          </div>
        )}

        {/* Results with Map */}
        {(properties.length > 0 || isLoading) && (
          <div className="flex gap-6">
            {/* Map - Desktop */}
            {showMap && (
              <div className="hidden lg:block w-[45%] xl:w-[40%] sticky top-24 h-[calc(100vh-200px)]">
                <Card className="h-full p-0 overflow-hidden">
                  <PropertyMap
                    properties={properties}
                    onPropertyClick={handlePropertyClick}
                  />
                </Card>
              </div>
            )}

            {/* Property Grid */}
            <div
              className={`flex-1 ${showMap ? "lg:w-[55%] xl:w-[60%]" : "w-full"}`}
            >
              <PropertyGrid properties={properties} isLoading={isLoading} />
            </div>
          </div>
        )}

        {/* Fullscreen Map Modal (Mobile) */}
        {isMapFullscreen && (
          <div className="fixed inset-0 z-50 bg-dark-blue lg:hidden">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-4 bg-dark-blue/95 backdrop-blur-sm border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-bold">Map View</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMapFullscreen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-white/60 text-sm mt-1">
                  {totalResults} properties
                </p>
              </div>

              {/* Map */}
              <div className="flex-1">
                <PropertyMap
                  properties={properties}
                  onPropertyClick={(property) => {
                    setIsMapFullscreen(false);
                    handlePropertyClick(property);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Sticky Mobile Map Button */}
        {properties.length > 0 && !isMapFullscreen && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden">
            <Button
              onClick={() => setIsMapFullscreen(true)}
              className="shadow-2xl px-6 py-3 text-base font-semibold"
            >
              <Map className="w-5 h-5 mr-2" />
              Map View
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-blue to-luxury-blue/20 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      }
    >
      <Header />
      <SearchPageContent />
      <Footer />
    </Suspense>
  );
}
