"use client";

import { X } from "lucide-react";
import { useState } from "react";
import type { SavedAnalysis } from "@/app/lib/types/index";
import { formatPrice } from "@/app/lib/utils/format";
import Button from "@/components/ui/Button";

interface FilterPanelProps {
  filters: {
    priceRange: [number, number];
    grades: string[];
    propertyTypes: string[];
  };
  onFiltersChange: (filters: any) => void;
  properties: SavedAnalysis[];
}

export default function FilterPanel({
  filters,
  onFiltersChange,
  properties,
}: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const grades = ["A", "B", "C", "D", "F"];
  const propertyTypes = Array.from(
    new Set(
      properties
        .map((p) => p.analysis_data.propertyOverview?.propertyType)
        .filter(Boolean) as string[],
    ),
  );

  const maxPrice = Math.max(
    ...properties.map((p) => p.analysis_data.propertyOverview?.listPrice || 0),
  );

  const toggleGrade = (grade: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      grades: prev.grades.includes(grade)
        ? prev.grades.filter((g) => g !== grade)
        : [...prev.grades, grade],
    }));
  };

  const togglePropertyType = (type: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter((t) => t !== type)
        : [...prev.propertyTypes, type],
    }));
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      priceRange: [0, 10000000] as [number, number],
      grades: [],
      propertyTypes: [],
    };
    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  return (
    <div className="mt-6 pt-6 border-t border-white/10 space-y-6">
      {/* Price Range */}
      <div>
        <label className="block text-sm font-semibold mb-3">Price Range</label>
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={localFilters.priceRange[1]}
            onChange={(e) =>
              setLocalFilters((prev) => ({
                ...prev,
                priceRange: [prev.priceRange[0], parseInt(e.target.value, 10)],
              }))
            }
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>{formatPrice(localFilters.priceRange[0])}</span>
            <span>{formatPrice(localFilters.priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Grades */}
      <div>
        <label className="block text-sm font-semibold mb-3">
          Investment Grade
        </label>
        <div className="flex flex-wrap gap-2">
          {grades.map((grade) => (
            <button
              key={grade}
              onClick={() => toggleGrade(grade)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                localFilters.grades.includes(grade)
                  ? "bg-luxury-gold text-black border-luxury-gold"
                  : "bg-white/5 border-white/10 hover:border-white/30"
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>

      {/* Property Types */}
      {propertyTypes.length > 0 && (
        <div>
          <label className="block text-sm font-semibold mb-3">
            Property Type
          </label>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map((type) => (
              <button
                key={type}
                onClick={() => togglePropertyType(type)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  localFilters.propertyTypes.includes(type)
                    ? "bg-luxury-gold text-black border-luxury-gold"
                    : "bg-white/5 border-white/10 hover:border-white/30"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={applyFilters} className="flex-1">
          Apply Filters
        </Button>
        <Button variant="secondary" onClick={resetFilters}>
          <X className="w-5 h-5 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
