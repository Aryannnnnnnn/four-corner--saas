"use client";

import { ExternalLink, Home, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import type { SavedAnalysis } from "@/app/lib/types/index";
import {
  formatPrice,
  formatRelativeTime,
  getGradeColor,
} from "@/app/lib/utils/format";
import Card from "@/components/ui/Card";

interface PropertyCardProps {
  property: SavedAnalysis;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function PropertyCard({
  property,
  isSelected,
  onToggleSelect,
  onToggleFavorite,
  onDelete,
}: PropertyCardProps) {
  return (
    <Card className="hover:bg-white/5 transition-all duration-300 group relative overflow-hidden h-full flex flex-col">
      {/* Header with Checkbox and Actions */}
      <div className="flex items-center justify-between p-4 pb-2">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onToggleSelect(property.id);
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-4 h-4 rounded border-2 border-white/20 bg-black/50 cursor-pointer"
          aria-label={`Select ${property.address}`}
        />

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            className={`p-1.5 rounded-lg transition-colors ${
              property.is_favorite
                ? "bg-luxury-blue/20 text-luxury-blue"
                : "bg-white/5 text-white/50 hover:text-luxury-blue hover:bg-luxury-blue/10"
            }`}
            aria-label={
              property.is_favorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            <Star
              className={`w-4 h-4 ${
                property.is_favorite ? "fill-current" : ""
              }`}
            />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(property.id);
            }}
            className="p-1.5 rounded-lg bg-white/5 text-white/50 hover:text-red-400 hover:bg-red-400/10 transition-colors"
            aria-label="Delete property"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content - Clickable */}
      <Link href={`/library/${property.id}`} className="flex-1 flex flex-col">
        {/* Property Image */}
        <div className="relative h-48 -mx-4 mb-4 overflow-hidden">
          {property.analysis_data.media?.images?.[0] ? (
            <img
              src={property.analysis_data.media.images[0]}
              alt={property.address}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/5">
              <Home className="w-12 h-12 text-white/30" />
            </div>
          )}
          {/* Grade Badge */}
          <div className="absolute top-3 right-3">
            <div
              className={`px-3 py-1.5 rounded-lg font-bold text-sm backdrop-blur-sm ${getGradeColor(
                property.analysis_data.aiAnalysis?.buyingGrade || "C",
              )}`}
            >
              {property.analysis_data.aiAnalysis?.buyingGrade || "C"}
            </div>
          </div>
        </div>

        {/* Property Info */}
        <div className="flex-1 px-4 pb-4 space-y-3">
          <div>
            <h3 className="font-display text-lg font-bold mb-1 line-clamp-2 group-hover:text-luxury-blue transition-colors">
              {property.address}
            </h3>
            <p className="text-white/70 text-sm">
              {property.analysis_data.propertyOverview?.city},{" "}
              {property.analysis_data.propertyOverview?.state}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/60">
            <span>
              {property.analysis_data.propertyOverview?.bedrooms === -1
                ? "N/A"
                : property.analysis_data.propertyOverview?.bedrooms}{" "}
              bed
            </span>
            <span>•</span>
            <span>
              {property.analysis_data.propertyOverview?.bathrooms === -1
                ? "N/A"
                : property.analysis_data.propertyOverview?.bathrooms}{" "}
              bath
            </span>
            <span>•</span>
            <span>
              {property.analysis_data.propertyOverview?.squareFeet === -1
                ? "N/A"
                : property.analysis_data.propertyOverview?.squareFeet?.toLocaleString()}{" "}
              sqft
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div>
              <p className="text-white/70 text-xs mb-1">List Price</p>
              <p className="font-bold text-lg">
                {property.analysis_data.propertyOverview?.listPrice
                  ? formatPrice(
                      property.analysis_data.propertyOverview.listPrice,
                    )
                  : "N/A"}
              </p>
            </div>

            <div className="text-right">
              <p className="text-white/70 text-xs mb-1">Added</p>
              <p className="text-xs text-luxury-blue">
                {formatRelativeTime(property.created_at)}
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* Footer with Zillow Link - Outside main Link to avoid nested anchors */}
      <div className="px-4 pb-4 pt-2 border-t border-white/10 mt-auto">
        <a
          href={property.analysis_data.zillowUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-luxury-blue transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          View on Zillow
        </a>
      </div>
    </Card>
  );
}
