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

interface PropertyListItemProps {
  property: SavedAnalysis;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function PropertyListItem({
  property,
  isSelected,
  onToggleSelect,
  onToggleFavorite,
  onDelete,
}: PropertyListItemProps) {
  return (
    <Card className="hover:bg-white/10 transition-all">
      <div className="flex items-center gap-6">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onToggleSelect(property.id);
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-5 h-5 rounded border-2 border-white/20 bg-black/50 cursor-pointer"
          aria-label={`Select ${property.address}`}
        />

        {/* Image */}
        <Link href={`/library/${property.id}`} className="flex-shrink-0">
          <div className="w-32 h-24 rounded-xl overflow-hidden bg-white/5 hover:opacity-80 transition-opacity">
            {property.analysis_data.media?.images?.[0] ? (
              <img
                src={property.analysis_data.media.images[0]}
                alt={property.address}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Home className="w-8 h-8 text-white/30" />
              </div>
            )}
          </div>
        </Link>

        {/* Info - Clickable */}
        <Link href={`/library/${property.id}`} className="flex-1 min-w-0">
          <div className="hover:opacity-80 transition-opacity">
            <h3 className="font-display text-xl font-bold mb-1 truncate">
              {property.address}
            </h3>
            <p className="text-white/70 text-sm mb-2">
              {property.analysis_data.propertyOverview?.city},{" "}
              {property.analysis_data.propertyOverview?.state}
            </p>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <span>
                {property.analysis_data.propertyOverview?.bedrooms} bed •{" "}
                {property.analysis_data.propertyOverview?.bathrooms} bath •{" "}
                {property.analysis_data.propertyOverview?.squareFeet?.toLocaleString()}{" "}
                sqft
              </span>
              <span>•</span>
              <span>{formatRelativeTime(property.created_at)}</span>
            </div>
          </div>
        </Link>

        {/* Price - Clickable */}
        <Link
          href={`/library/${property.id}`}
          className="text-right flex-shrink-0"
        >
          <div className="hover:opacity-80 transition-opacity">
            <p className="text-white/70 text-sm mb-1">List Price</p>
            <p className="font-bold text-xl">
              {property.analysis_data.propertyOverview?.listPrice
                ? formatPrice(property.analysis_data.propertyOverview.listPrice)
                : "N/A"}
            </p>
          </div>
        </Link>

        {/* Grade - Clickable */}
        <Link href={`/library/${property.id}`} className="flex-shrink-0">
          <div className="hover:opacity-80 transition-opacity">
            <div
              className={`w-16 h-16 rounded-xl flex items-center justify-center ${getGradeColor(property.analysis_data.aiAnalysis?.buyingGrade || "C")} bg-white/5`}
            >
              <span className="font-display text-3xl font-bold">
                {property.analysis_data.aiAnalysis?.buyingGrade || "C"}
              </span>
            </div>
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label={
              property.is_favorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            <Star
              className={`w-5 h-5 ${
                property.is_favorite
                  ? "text-luxury-blue fill-luxury-blue"
                  : "text-white/70"
              }`}
            />
          </button>

          <a
            href={property.analysis_data.zillowUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="View on Zillow"
          >
            <ExternalLink className="w-5 h-5 text-white/70" />
          </a>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(property.id);
            }}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            aria-label="Delete property"
          >
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>
    </Card>
  );
}
