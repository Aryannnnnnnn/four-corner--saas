// components/search/PropertyFilter.tsx
"use client";

import {
  Bath,
  Bed,
  Calendar,
  DollarSign,
  Maximize,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { PropertyFilters } from "@/app/lib/types";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import LocationAutocomplete from "@/components/ui/LocationAutocomplete";

interface PropertyFiltersProps {
  onSearch: (filters: PropertyFilters) => void;
  onFilterChange?: (filters: PropertyFilters) => void;
  initialFilters?: PropertyFilters;
  isLoading?: boolean;
  hasResults?: boolean;
}

export default function PropertyFiltersComponent({
  onSearch,
  onFilterChange,
  initialFilters,
  isLoading = false,
  hasResults = false,
}: PropertyFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<PropertyFilters>(
    initialFilters || {
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
    },
  );

  // Update local filters when initialFilters change (after a search)
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  const sortOptions = [
    { value: "Homes_for_You", label: "Recommended" },
    { value: "Price_Low_High", label: "Price: Low to High" },
    { value: "Price_High_Low", label: "Price: High to Low" },
    { value: "Newest", label: "Newest" },
    { value: "Bedrooms", label: "Most Bedrooms" },
    { value: "Bathrooms", label: "Most Bathrooms" },
    { value: "Square_Feet", label: "Largest Sqft" },
    { value: "Lot_Size", label: "Largest Lot" },
  ];

  const handleInputChange = (field: keyof PropertyFilters, value: any) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    // Trigger instant filtering for all fields except location (location needs Search button)
    if (field !== "location" && onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleSearch = () => {
    if (!filters.location.trim()) {
      alert("Please enter a location");
      return;
    }
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({
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
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "location" || key === "sort") return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "boolean") return value;
    return value !== undefined && value !== "";
  }).length;

  return (
    <>
      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute inset-x-0 bottom-0 bg-dark-blue rounded-t-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-dark-blue border-b border-white/10 p-4 flex items-center justify-between z-10">
              <h3 className="font-display text-xl font-bold">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              {/* Basic Filters */}
              <div className="space-y-4 mb-6">
                {/* Price Range */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white/80 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Min Price
                    </label>
                    <input
                      type="number"
                      value={filters.minPrice || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "minPrice",
                          e.target.value ? Number(e.target.value) : undefined,
                        )
                      }
                      placeholder="No min"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-luxury-blue focus:outline-none transition-colors text-white placeholder:text-white/40"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white/80 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Max Price
                    </label>
                    <input
                      type="number"
                      value={filters.maxPrice || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "maxPrice",
                          e.target.value ? Number(e.target.value) : undefined,
                        )
                      }
                      placeholder="No max"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-luxury-blue focus:outline-none transition-colors text-white placeholder:text-white/40"
                    />
                  </div>
                </div>

                {/* Bedrooms & Bathrooms */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white/80 flex items-center gap-2">
                      <Bed className="w-4 h-4" />
                      Min Beds
                    </label>
                    <select
                      value={filters.bedsMin || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "bedsMin",
                          e.target.value ? Number(e.target.value) : undefined,
                        )
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-luxury-blue focus:outline-none transition-colors text-white [&>option]:bg-slate-800 [&>option]:text-white"
                    >
                      <option value="">Any</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num}+
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white/80 flex items-center gap-2">
                      <Bath className="w-4 h-4" />
                      Min Baths
                    </label>
                    <select
                      value={filters.bathsMin || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "bathsMin",
                          e.target.value ? Number(e.target.value) : undefined,
                        )
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-luxury-blue focus:outline-none transition-colors text-white [&>option]:bg-slate-800 [&>option]:text-white"
                    >
                      <option value="">Any</option>
                      {[1, 1.5, 2, 2.5, 3, 3.5, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}+
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white/80">
                    Sort By
                  </label>
                  <select
                    value={filters.sort}
                    onChange={(e) => handleInputChange("sort", e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-luxury-blue focus:outline-none transition-colors text-white [&>option]:bg-slate-800 [&>option]:text-white"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Advanced Filters */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full mb-4 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between text-white"
              >
                <span className="flex items-center gap-2 font-semibold">
                  <SlidersHorizontal className="w-5 h-5" />
                  Advanced Filters
                  {activeFiltersCount > 0 && (
                    <span className="px-2 py-0.5 bg-luxury-blue rounded-full text-xs font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </span>
                <span
                  className={`transform transition-transform ${showAdvanced ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </button>

              {showAdvanced && (
                <div className="space-y-4 mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                  {/* Square Footage */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-white/80 flex items-center gap-2">
                        <Maximize className="w-4 h-4" />
                        Min Sqft
                      </label>
                      <input
                        type="number"
                        value={filters.sqftMin || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "sqftMin",
                            e.target.value ? Number(e.target.value) : undefined,
                          )
                        }
                        placeholder="No min"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-luxury-blue focus:outline-none transition-colors text-white placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-white/80 flex items-center gap-2">
                        <Maximize className="w-4 h-4" />
                        Max Sqft
                      </label>
                      <input
                        type="number"
                        value={filters.sqftMax || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "sqftMax",
                            e.target.value ? Number(e.target.value) : undefined,
                          )
                        }
                        placeholder="No max"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-luxury-blue focus:outline-none transition-colors text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>

                  {/* Year Built */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-white/80 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Built After
                      </label>
                      <input
                        type="number"
                        value={filters.builtYearMin || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "builtYearMin",
                            e.target.value ? Number(e.target.value) : undefined,
                          )
                        }
                        placeholder="Any year"
                        min="1800"
                        max={new Date().getFullYear()}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-luxury-blue focus:outline-none transition-colors text-white placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-white/80 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Built Before
                      </label>
                      <input
                        type="number"
                        value={filters.builtYearMax || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "builtYearMax",
                            e.target.value ? Number(e.target.value) : undefined,
                          )
                        }
                        placeholder="Any year"
                        min="1800"
                        max={new Date().getFullYear()}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-luxury-blue focus:outline-none transition-colors text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>

                  {/* Days on Zillow */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white/80">
                      Listed Within
                    </label>
                    <select
                      value={filters.daysOnZillow || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "daysOnZillow",
                          e.target.value ? Number(e.target.value) : undefined,
                        )
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-luxury-blue focus:outline-none transition-colors text-white [&>option]:bg-slate-800 [&>option]:text-white"
                    >
                      <option value="">Any time</option>
                      <option value="1">Last 24 hours</option>
                      <option value="7">Last 7 days</option>
                      <option value="14">Last 14 days</option>
                      <option value="30">Last 30 days</option>
                      <option value="90">Last 3 months</option>
                    </select>
                  </div>

                  {/* Features */}
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-white/80 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Features
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <label className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:border-luxury-blue transition-colors">
                        <input
                          type="checkbox"
                          checked={filters.hasPool || false}
                          onChange={(e) =>
                            handleInputChange("hasPool", e.target.checked)
                          }
                          className="w-4 h-4 rounded border-white/20 text-luxury-blue focus:ring-luxury-blue"
                        />
                        <span className="text-sm text-white/90">Pool</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:border-luxury-blue transition-colors">
                        <input
                          type="checkbox"
                          checked={filters.hasGarage || false}
                          onChange={(e) =>
                            handleInputChange("hasGarage", e.target.checked)
                          }
                          className="w-4 h-4 rounded border-white/20 text-luxury-blue focus:ring-luxury-blue"
                        />
                        <span className="text-sm text-white/90">Garage</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:border-luxury-blue transition-colors">
                        <input
                          type="checkbox"
                          checked={filters.hasAC || false}
                          onChange={(e) =>
                            handleInputChange("hasAC", e.target.checked)
                          }
                          className="w-4 h-4 rounded border-white/20 text-luxury-blue focus:ring-luxury-blue"
                        />
                        <span className="text-sm text-white/90">A/C</span>
                      </label>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white/80">
                      Keywords
                    </label>
                    <input
                      type="text"
                      value={filters.keywords || ""}
                      onChange={(e) =>
                        handleInputChange("keywords", e.target.value)
                      }
                      placeholder="e.g., waterfront, view"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-luxury-blue focus:outline-none transition-colors text-white placeholder:text-white/40"
                    />
                  </div>
                </div>
              )}

              {/* Apply/Reset Buttons */}
              <div className="flex gap-3 sticky bottom-0 bg-dark-blue pt-4 pb-2">
                <Button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1"
                >
                  Apply Filters
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleReset}
                  className="px-6"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop & Location (always visible) */}
      <Card className="p-4 lg:p-6">
        {/* Location Search - Always Visible */}
        <div className="mb-4 lg:mb-6">
          <label className="block text-sm font-semibold mb-2 text-white/80">
            Location <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <LocationAutocomplete
                value={filters.location}
                onChange={(value) => handleInputChange("location", value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Enter city, address, or ZIP code"
                inputClassName="w-full px-4 py-3 pl-12 bg-white/5 border border-white/10 rounded-xl focus:border-luxury-blue focus:outline-none transition-colors text-white placeholder:text-white/40"
              />
            </div>
            {/* Mobile: Filter Button */}
            <Button
              onClick={() => setShowMobileFilters(true)}
              variant="secondary"
              className="lg:hidden"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-luxury-blue rounded-full text-xs font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Desktop: Horizontal Filters */}
        <div className="hidden lg:block">
          {/* Main Filter Row */}
          <div className="flex flex-wrap items-end gap-3 mb-4">
            {/* Price Range */}
            <div className="flex gap-2 items-end">
              <div className="w-32">
                <label className="block text-xs font-semibold mb-1 text-white/70">
                  <DollarSign className="w-3 h-3 inline mr-1" />
                  Min Price
                </label>
                <input
                  type="number"
                  value={filters.minPrice || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "minPrice",
                      e.target.value ? Number(e.target.value) : undefined,
                    )
                  }
                  placeholder="Any"
                  className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg focus:border-luxury-blue focus:outline-none transition-colors text-white placeholder:text-white/40"
                />
              </div>
              <div className="w-32">
                <label className="block text-xs font-semibold mb-1 text-white/70">
                  <DollarSign className="w-3 h-3 inline mr-1" />
                  Max Price
                </label>
                <input
                  type="number"
                  value={filters.maxPrice || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "maxPrice",
                      e.target.value ? Number(e.target.value) : undefined,
                    )
                  }
                  placeholder="Any"
                  className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg focus:border-luxury-blue focus:outline-none transition-colors text-white placeholder:text-white/40"
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div className="w-28">
              <label className="block text-xs font-semibold mb-1 text-white/70">
                <Bed className="w-3 h-3 inline mr-1" />
                Beds
              </label>
              <select
                value={filters.bedsMin || ""}
                onChange={(e) =>
                  handleInputChange(
                    "bedsMin",
                    e.target.value ? Number(e.target.value) : undefined,
                  )
                }
                className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg focus:border-luxury-blue focus:outline-none transition-colors text-white [&>option]:bg-slate-800 [&>option]:text-white"
              >
                <option value="">Any</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num}+
                  </option>
                ))}
              </select>
            </div>

            {/* Bathrooms */}
            <div className="w-28">
              <label className="block text-xs font-semibold mb-1 text-white/70">
                <Bath className="w-3 h-3 inline mr-1" />
                Baths
              </label>
              <select
                value={filters.bathsMin || ""}
                onChange={(e) =>
                  handleInputChange(
                    "bathsMin",
                    e.target.value ? Number(e.target.value) : undefined,
                  )
                }
                className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg focus:border-luxury-blue focus:outline-none transition-colors text-white [&>option]:bg-slate-800 [&>option]:text-white"
              >
                <option value="">Any</option>
                {[1, 1.5, 2, 2.5, 3, 3.5, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}+
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex-1 min-w-[180px]">
              <label className="block text-xs font-semibold mb-1 text-white/70">
                Sort By
              </label>
              <select
                value={filters.sort}
                onChange={(e) => handleInputChange("sort", e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg focus:border-luxury-blue focus:outline-none transition-colors text-white [&>option]:bg-slate-800 [&>option]:text-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 text-sm font-semibold text-white h-[38px]"
            >
              <SlidersHorizontal className="w-4 h-4" />
              More
              {activeFiltersCount > 0 && (
                <span className="px-2 py-0.5 bg-luxury-blue rounded-full text-xs font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop: Advanced Filters */}
        {showAdvanced && (
          <div className="hidden lg:flex flex-wrap gap-3 mb-4 p-4 bg-white/5 rounded-xl border border-white/10">
            {/* Square Footage */}
            <div className="flex gap-2">
              <div className="w-28">
                <label className="block text-xs font-semibold mb-1 text-white/70">
                  <Maximize className="w-3 h-3 inline mr-1" />
                  Min Sqft
                </label>
                <input
                  type="number"
                  value={filters.sqftMin || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "sqftMin",
                      e.target.value ? Number(e.target.value) : undefined,
                    )
                  }
                  placeholder="Any"
                  className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg focus:border-luxury-blue focus:outline-none transition-colors text-white placeholder:text-white/40"
                />
              </div>
              <div className="w-28">
                <label className="block text-xs font-semibold mb-1 text-white/70">
                  <Maximize className="w-3 h-3 inline mr-1" />
                  Max Sqft
                </label>
                <input
                  type="number"
                  value={filters.sqftMax || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "sqftMax",
                      e.target.value ? Number(e.target.value) : undefined,
                    )
                  }
                  placeholder="Any"
                  className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg focus:border-luxury-blue focus:outline-none transition-colors text-white placeholder:text-white/40"
                />
              </div>
            </div>

            {/* Year Built */}
            <div className="flex gap-2">
              <div className="w-28">
                <label className="block text-xs font-semibold mb-1 text-white/70">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  After
                </label>
                <input
                  type="number"
                  value={filters.builtYearMin || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "builtYearMin",
                      e.target.value ? Number(e.target.value) : undefined,
                    )
                  }
                  placeholder="Year"
                  min="1800"
                  max={new Date().getFullYear()}
                  className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg focus:border-luxury-blue focus:outline-none transition-colors text-white placeholder:text-white/40"
                />
              </div>
              <div className="w-28">
                <label className="block text-xs font-semibold mb-1 text-white/70">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  Before
                </label>
                <input
                  type="number"
                  value={filters.builtYearMax || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "builtYearMax",
                      e.target.value ? Number(e.target.value) : undefined,
                    )
                  }
                  placeholder="Year"
                  min="1800"
                  max={new Date().getFullYear()}
                  className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg focus:border-luxury-blue focus:outline-none transition-colors text-white placeholder:text-white/40"
                />
              </div>
            </div>

            {/* Days on Zillow */}
            <div className="w-40">
              <label className="block text-xs font-semibold mb-1 text-white/70">
                Listed Within
              </label>
              <select
                value={filters.daysOnZillow || ""}
                onChange={(e) =>
                  handleInputChange(
                    "daysOnZillow",
                    e.target.value ? Number(e.target.value) : undefined,
                  )
                }
                className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg focus:border-luxury-blue focus:outline-none transition-colors text-white [&>option]:bg-slate-800 [&>option]:text-white"
              >
                <option value="">Any time</option>
                <option value="1">24 hours</option>
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="30">30 days</option>
                <option value="90">3 months</option>
              </select>
            </div>

            {/* Features */}
            <div className="flex gap-2 items-end">
              <label className="flex items-center gap-2 px-3 py-2 h-[38px] bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:border-luxury-blue transition-colors">
                <input
                  type="checkbox"
                  checked={filters.hasPool || false}
                  onChange={(e) =>
                    handleInputChange("hasPool", e.target.checked)
                  }
                  className="w-4 h-4 rounded border-white/20 text-luxury-blue focus:ring-luxury-blue"
                />
                <span className="text-sm text-white/90">Pool</span>
              </label>
              <label className="flex items-center gap-2 px-3 py-2 h-[38px] bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:border-luxury-blue transition-colors">
                <input
                  type="checkbox"
                  checked={filters.hasGarage || false}
                  onChange={(e) =>
                    handleInputChange("hasGarage", e.target.checked)
                  }
                  className="w-4 h-4 rounded border-white/20 text-luxury-blue focus:ring-luxury-blue"
                />
                <span className="text-sm text-white/90">Garage</span>
              </label>
              <label className="flex items-center gap-2 px-3 py-2 h-[38px] bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:border-luxury-blue transition-colors">
                <input
                  type="checkbox"
                  checked={filters.hasAC || false}
                  onChange={(e) => handleInputChange("hasAC", e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 text-luxury-blue focus:ring-luxury-blue"
                />
                <span className="text-sm text-white/90">A/C</span>
              </label>
            </div>

            {/* Keywords */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-semibold mb-1 text-white/70">
                Keywords
              </label>
              <input
                type="text"
                value={filters.keywords || ""}
                onChange={(e) => handleInputChange("keywords", e.target.value)}
                placeholder="e.g., waterfront, view"
                className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg focus:border-luxury-blue focus:outline-none transition-colors text-white placeholder:text-white/40"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Show Search button only if no results yet OR location has changed */}
          {(!hasResults || filters.location !== initialFilters?.location) && (
            <Button
              onClick={handleSearch}
              disabled={isLoading || !filters.location.trim()}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  {hasResults ? "Search New Location" : "Search Properties"}
                </>
              )}
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={handleReset}
            disabled={isLoading}
            className={
              hasResults && filters.location === initialFilters?.location
                ? "flex-1"
                : "sm:w-auto"
            }
          >
            <X className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>
      </Card>
    </>
  );
}
