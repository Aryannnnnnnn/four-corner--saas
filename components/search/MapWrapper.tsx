"use client";

import { useEffect, useState } from "react";
import type { PropertySearchResult } from "@/lib/types";

interface MapWrapperProps {
  properties: PropertySearchResult[];
  onPropertyClick: (property: PropertySearchResult) => void;
}

export default function MapWrapper({
  properties,
  onPropertyClick,
}: MapWrapperProps) {
  const [MapComponent, setMapComponent] = useState<any>(null);

  useEffect(() => {
    // Only load map on client side
    const loadMap = async () => {
      const { default: PropertyMap } = await import("./PropertyMapClient");
      setMapComponent(() => PropertyMap);
    };
    loadMap();
  }, []);

  if (!MapComponent) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <MapComponent properties={properties} onPropertyClick={onPropertyClick} />
  );
}
