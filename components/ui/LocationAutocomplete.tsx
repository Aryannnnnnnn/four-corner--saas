"use client";

import { MapPin, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { US_CITIES_EXTENDED } from "@/app/lib/data/us-cities";

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (location: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  dropdownClassName?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

// All 50 USA States with abbreviations
const USA_STATES = [
  "Alabama, AL",
  "Alaska, AK",
  "Arizona, AZ",
  "Arkansas, AR",
  "California, CA",
  "Colorado, CO",
  "Connecticut, CT",
  "Delaware, DE",
  "Florida, FL",
  "Georgia, GA",
  "Hawaii, HI",
  "Idaho, ID",
  "Illinois, IL",
  "Indiana, IN",
  "Iowa, IA",
  "Kansas, KS",
  "Kentucky, KY",
  "Louisiana, LA",
  "Maine, ME",
  "Maryland, MD",
  "Massachusetts, MA",
  "Michigan, MI",
  "Minnesota, MN",
  "Mississippi, MS",
  "Missouri, MO",
  "Montana, MT",
  "Nebraska, NE",
  "Nevada, NV",
  "New Hampshire, NH",
  "New Jersey, NJ",
  "New Mexico, NM",
  "New York, NY",
  "North Carolina, NC",
  "North Dakota, ND",
  "Ohio, OH",
  "Oklahoma, OK",
  "Oregon, OR",
  "Pennsylvania, PA",
  "Rhode Island, RI",
  "South Carolina, SC",
  "South Dakota, SD",
  "Tennessee, TN",
  "Texas, TX",
  "Utah, UT",
  "Vermont, VT",
  "Virginia, VA",
  "Washington, WA",
  "West Virginia, WV",
  "Wisconsin, WI",
  "Wyoming, WY",
];

// Combine states and cities (1000+ locations)
const LOCATIONS = [...USA_STATES, ...US_CITIES_EXTENDED].sort();

export default function LocationAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = "Enter city, address, or ZIP code",
  className = "",
  inputClassName = "",
  dropdownClassName = "",
  onKeyPress,
}: LocationAutocompleteProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Fetch cities from API with debouncing and local fallback
  useEffect(() => {
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (value.trim().length === 0) {
      setFilteredCities([]);
      setIsLoading(false);
      return;
    }

    // For very short queries, use local data immediately
    if (value.trim().length < 2) {
      const searchTerm = value.toLowerCase().trim();
      const localResults = LOCATIONS.filter((loc) =>
        loc.toLowerCase().startsWith(searchTerm),
      ).slice(0, 10);
      setFilteredCities(localResults);
      return;
    }

    // Debounce API calls
    setIsLoading(true);
    debounceTimer.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/cities?q=${encodeURIComponent(value.trim())}`,
        );
        const data = await response.json();

        if (data.cities && data.cities.length > 0) {
          setFilteredCities(data.cities);
        } else {
          // Fallback to local search if API returns no results
          const searchTerm = value.toLowerCase().trim();
          const localResults = LOCATIONS.filter((loc) =>
            loc.toLowerCase().includes(searchTerm),
          ).slice(0, 15);
          setFilteredCities(localResults);
        }
      } catch (error) {
        console.error("City search error:", error);
        // Fallback to local search on error
        const searchTerm = value.toLowerCase().trim();
        const localResults = LOCATIONS.filter((loc) =>
          loc.toLowerCase().includes(searchTerm),
        ).slice(0, 15);
        setFilteredCities(localResults);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setShowSuggestions(true);
    setHighlightedIndex(-1);
  };

  const handleSelectCity = (city: string) => {
    onChange(city);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
    if (onSelect) {
      onSelect(city);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredCities.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredCities.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredCities.length) {
          const selectedCity = filteredCities[highlightedIndex];
          if (selectedCity) {
            handleSelectCity(selectedCity);
          }
        } else if (onKeyPress) {
          onKeyPress(e);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5 z-10" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          onKeyPress={onKeyPress}
          className={inputClassName}
          autoComplete="off"
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (isLoading || filteredCities.length > 0) && (
        <div
          className={`absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50 ${dropdownClassName}`}
        >
          {isLoading ? (
            <div className="px-4 py-6 flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-luxury-blue border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-white/60">Searching cities...</span>
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              {filteredCities.map((location, index) => {
                const isState =
                  location.split(",").length === 2 &&
                  (location.split(",")[1]?.trim().length === 2 || false);
                return (
                  <button
                    key={location}
                    onClick={() => handleSelectCity(location)}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors border-b border-white/5 last:border-0 ${
                      index === highlightedIndex
                        ? "bg-luxury-blue/30 text-white"
                        : "hover:bg-white/10 text-white/90"
                    }`}
                  >
                    {isState ? (
                      <>
                        <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-sm bg-luxury-gold/70" />
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-semibold">
                            {location}
                          </span>
                          <span className="ml-2 text-xs text-white/50">
                            (State)
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4 text-luxury-blue flex-shrink-0" />
                        <span className="text-sm">{location}</span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
