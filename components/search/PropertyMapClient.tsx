"use client";

import L from "leaflet";
import { Bath, Bed, Building, Maximize, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import type { PropertySearchResult } from "@/lib/types";
import "leaflet/dist/leaflet.css";

// Fix Leaflet icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface PropertyMapProps {
  properties: PropertySearchResult[];
  onPropertyClick: (property: PropertySearchResult) => void;
}

const createPriceIcon = (price: number) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return L.divIcon({
    className: "custom-price-marker",
    html: `
      <div style="position: relative;">
        <div style="position: absolute; top: -32px; left: 50%; transform: translateX(-50%); background: #2563eb; color: white; padding: 4px 8px; border-radius: 8px; font-size: 11px; font-weight: bold; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.3); z-index: 1000;">
          ${formattedPrice}
        </div>
        <div style="width: 32px; height: 32px; background: #3b82f6; border-radius: 50%; border: 4px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); cursor: pointer; transition: transform 0.2s;">
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

// Component to handle map clicks (close popup)
function MapClickHandler() {
  const map = useMapEvents({
    click: () => {
      map.closePopup();
    },
  });
  return null;
}

// Component to auto-fit bounds
function MapBounds({ properties }: { properties: PropertySearchResult[] }) {
  const map = useMap();

  useEffect(() => {
    if (properties.length === 0) return;
    const validProperties = properties.filter((p) => p.latitude && p.longitude);
    if (validProperties.length === 0) return;

    const bounds = L.latLngBounds(
      validProperties.map((p) => [p.latitude!, p.longitude!]),
    );
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
  }, [properties, map]);

  return null;
}

export default function PropertyMapClient({
  properties,
  onPropertyClick,
}: PropertyMapProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const validProperties = properties.filter(
    (p) => p.latitude && p.longitude && p.latitude !== 0 && p.longitude !== 0,
  );

  if (validProperties.length === 0) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "12px",
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.6)" }}>
          No properties with location data
        </p>
      </div>
    );
  }

  const center: [number, number] = [
    validProperties.reduce((sum, p) => sum + p.latitude!, 0) /
      validProperties.length,
    validProperties.reduce((sum, p) => sum + p.longitude!, 0) /
      validProperties.length,
  ];

  return (
    <>
      <div
        style={{
          height: "100%",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #e0e0e0",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
          zoomControl={true}
          attributionControl={true}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer name="Google Maps Style">
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                subdomains="abcd"
                maxZoom={20}
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Google Satellite">
              <TileLayer
                attribution='&copy; <a href="https://www.google.com/maps">Google</a>'
                url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                maxZoom={20}
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Google Hybrid">
              <TileLayer
                attribution='&copy; <a href="https://www.google.com/maps">Google</a>'
                url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                maxZoom={20}
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer checked name="Google Terrain">
              <TileLayer
                attribution='&copy; <a href="https://www.google.com/maps">Google</a>'
                url="https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
                maxZoom={20}
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          <MapBounds properties={validProperties} />
          <MapClickHandler />

          {validProperties.map((property) => (
            <Marker
              key={property.zpid}
              position={[property.latitude!, property.longitude!]}
              icon={createPriceIcon(property.price)}
            >
              <Popup
                maxWidth={300}
                minWidth={300}
                closeButton={true}
                autoClose={true}
                closeOnClick={false}
              >
                <div
                  style={{
                    background: "#0a1628",
                    borderRadius: "12px",
                    overflow: "hidden",
                    margin: "-12px",
                    width: "300px",
                    fontSize: "14px",
                  }}
                >
                  {/* Property Image */}
                  <div
                    style={{
                      position: "relative",
                      height: "160px",
                      background: "rgba(255,255,255,0.05)",
                    }}
                  >
                    {property.imageUrl ? (
                      <Image
                        src={property.imageUrl}
                        alt={property.address}
                        fill
                        style={{ objectFit: "cover" }}
                        unoptimized
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background:
                            "linear-gradient(to bottom right, rgba(255,255,255,0.05), rgba(255,255,255,0.1))",
                        }}
                      >
                        <Building
                          style={{
                            width: "48px",
                            height: "48px",
                            color: "rgba(255,255,255,0.2)",
                          }}
                        />
                      </div>
                    )}

                    {/* Status Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                      }}
                    >
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: "8px",
                          fontSize: "11px",
                          fontWeight: "bold",
                          backdropFilter: "blur(4px)",
                          background: "rgba(34, 197, 94, 0.9)",
                          color: "white",
                        }}
                      >
                        FOR SALE
                      </span>
                    </div>

                    {/* Days on Market */}
                    {property.daysOnZillow !== undefined &&
                      property.daysOnZillow !== null && (
                        <div
                          style={{
                            position: "absolute",
                            top: "12px",
                            right: "12px",
                          }}
                        >
                          <span
                            style={{
                              padding: "4px 8px",
                              background: "rgba(0,0,0,0.6)",
                              backdropFilter: "blur(4px)",
                              borderRadius: "8px",
                              fontSize: "11px",
                              fontWeight: "600",
                              color: "white",
                            }}
                          >
                            {property.daysOnZillow} days
                          </span>
                        </div>
                      )}
                  </div>

                  {/* Property Details */}
                  <div style={{ padding: "16px" }}>
                    {/* Price & Zestimate */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "12px",
                      }}
                    >
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "20px",
                          color: "#2563eb",
                          margin: 0,
                        }}
                      >
                        {formatPrice(property.price)}
                      </p>
                      {property.zestimate && property.zestimate > 0 && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "11px",
                            color: "rgba(255,255,255,0.6)",
                          }}
                        >
                          <TrendingUp
                            style={{ width: "12px", height: "12px" }}
                          />
                          <span>Est. {formatPrice(property.zestimate)}</span>
                        </div>
                      )}
                    </div>

                    {/* Address */}
                    <div style={{ marginBottom: "12px" }}>
                      <p
                        style={{
                          fontWeight: "600",
                          fontSize: "13px",
                          marginBottom: "4px",
                          color: "rgba(255,255,255,0.9)",
                          margin: "0 0 4px 0",
                        }}
                      >
                        {property.address}
                      </p>
                    </div>

                    {/* Property Stats */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "11px",
                        marginBottom: "12px",
                        paddingBottom: "12px",
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Bed style={{ width: "14px", height: "14px" }} />
                        {property.bedrooms || 0}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Bath style={{ width: "14px", height: "14px" }} />
                        {property.bathrooms || 0}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Maximize style={{ width: "14px", height: "14px" }} />
                        {property.squareFeet
                          ? formatNumber(property.squareFeet)
                          : "--"}{" "}
                        sqft
                      </span>
                    </div>

                    {/* Property Type & Year */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "11px",
                        marginBottom: "12px",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      <span>{property.propertyType.replace(/_/g, " ")}</span>
                      {property.yearBuilt && (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <Building style={{ width: "12px", height: "12px" }} />
                          Built {property.yearBuilt}
                        </span>
                      )}
                    </div>

                    {/* View Analysis Button */}
                    <button
                      onClick={() => onPropertyClick(property)}
                      style={{
                        width: "100%",
                        background:
                          "linear-gradient(to right, #2563eb, #3b82f6)",
                        color: "white",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: "600",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.02)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(212, 175, 55, 0.3)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      View Full Analysis →
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <style jsx global>{`
        .custom-price-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5) !important;
          padding: 0 !important;
          border-radius: 12px !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          width: 300px !important;
        }
        .leaflet-popup-tip {
          background: #0a1628 !important;
        }
        .leaflet-container {
          font-family: inherit !important;
        }
        /* Prevent popup from scaling with zoom */
        .leaflet-zoom-animated .leaflet-popup {
          transform-origin: center bottom !important;
        }
      `}</style>
    </>
  );
}
