// components/search/PropertyGrid.tsx
"use client";

import { Bath, Bed, Home, Maximize, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { PropertySearchResult } from "@/app/lib/types";
import { formatNumber } from "@/app/lib/utils/format";
import Card from "@/components/ui/Card";

interface PropertyGridProps {
  properties: PropertySearchResult[];
  isLoading?: boolean;
}

export default function PropertyGrid({
  properties,
  isLoading = false,
}: PropertyGridProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="w-full h-64 bg-white/5 rounded-t-xl" />
            <div className="p-6 space-y-4">
              <div className="h-6 bg-white/5 rounded w-3/4" />
              <div className="h-4 bg-white/5 rounded w-1/2" />
              <div className="h-4 bg-white/5 rounded w-full" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Home className="w-16 h-16 text-white/20 mx-auto mb-4" />
        <h3 className="font-display text-2xl font-bold mb-2">
          No Properties Found
        </h3>
        <p className="text-white/60">
          Try adjusting your filters to see more results
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Link
          key={property.zpid}
          href={`/analyze?zpid=${property.zpid}&address=${encodeURIComponent(property.address)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Card className="group cursor-pointer hover:border-luxury-blue transition-all duration-300 overflow-hidden h-full">
            {/* Image */}
            <div className="relative w-full h-64 bg-white/5 overflow-hidden">
              {property.imageUrl ? (
                <Image
                  src={property.imageUrl}
                  alt={property.address}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10">
                  <Home className="w-16 h-16 text-white/20" />
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    property.homeStatus === "FOR_SALE"
                      ? "bg-green-500/90 text-white"
                      : "bg-blue-500/90 text-white"
                  }`}
                >
                  {property.homeStatus.replace("_", " ")}
                </span>
              </div>

              {/* Days on Zillow */}
              {property.daysOnZillow !== undefined && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                    {property.daysOnZillow} days
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Price */}
              <div className="flex items-center justify-between mb-3">
                <p className="font-display text-2xl font-bold text-blue-600">
                  {formatPrice(property.price)}
                </p>
                {property.zestimate && property.zestimate > 0 && (
                  <div className="flex items-center gap-1 text-xs text-white/60">
                    <TrendingUp className="w-3 h-3" />
                    <span>Est. {formatPrice(property.zestimate)}</span>
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="mb-4">
                <p className="font-semibold text-white/90 line-clamp-1">
                  {property.address}
                </p>
              </div>

              {/* Property Stats */}
              <div className="flex items-center gap-4 text-sm text-white/70 mb-3">
                <span className="flex items-center gap-1">
                  <Bed className="w-4 h-4" />
                  {property.bedrooms}
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="w-4 h-4" />
                  {property.bathrooms}
                </span>
                <span className="flex items-center gap-1">
                  <Maximize className="w-4 h-4" />
                  {property.squareFeet
                    ? formatNumber(property.squareFeet)
                    : "--"}
                </span>
              </div>

              {/* Property Type & Year */}
              <div className="flex items-center justify-between text-xs text-white/50">
                <span>{property.propertyType.replace(/_/g, " ")}</span>
                {property.yearBuilt && <span>Built {property.yearBuilt}</span>}
              </div>

              {/* Hover Effect */}
              <div className="mt-4 pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-sm text-luxury-blue font-semibold">
                  Click to analyze →
                </p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
