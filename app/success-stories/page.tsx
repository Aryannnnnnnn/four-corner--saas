"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface SoldProperty {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  list_price: number;
  sold_price: number;
  sold_at: string;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  image: string | null;
}

export default function SuccessStoriesPage() {
  const [soldProperties, setSoldProperties] = useState<SoldProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSoldProperties = async () => {
      try {
        const response = await fetch("/api/sold-properties");
        const data = await response.json();
        if (data.properties && data.properties.length > 0) {
          setSoldProperties(data.properties);
        }
      } catch (error) {
        console.error("Error fetching sold properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSoldProperties();
  }, []);

  const filteredProperties = soldProperties.filter((property) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      property.title.toLowerCase().includes(searchLower) ||
      property.address.toLowerCase().includes(searchLower) ||
      property.city.toLowerCase().includes(searchLower) ||
      property.state.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return <LoadingSpinner message="Loading sold properties..." />;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto mb-16">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Sold Properties
            </h1>
            <p className="mt-2 text-gray-600">
              Explore our success stories - {soldProperties.length} properties sold
            </p>
          </div>

          {soldProperties.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-bold mb-2 text-gray-900">
              No Sold Properties Yet
            </h2>
            <p className="text-gray-600">
              Check back soon for our success stories!
            </p>
          </div>
        ) : (
          <>
            {/* Search Bar */}
            <div className="mb-6 sm:mb-8">
              <input
                type="text"
                placeholder="Search by title, address, city, or state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-blue focus:border-transparent transition-all"
              />
            </div>

            {/* Results Count */}
            <div className="mb-4 text-gray-600 text-sm">
              Showing {filteredProperties.length} of {soldProperties.length}{" "}
              properties
            </div>

            {/* Property Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {filteredProperties.map((property) => (
                <Link
                  key={property.id}
                  href={`/success-stories/${property.id}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 group block"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {property.image ? (
                      <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <svg
                          className="w-12 h-12 text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                      </div>
                    )}
                    {/* SOLD Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-green-600 text-white rounded-lg shadow-lg">
                        SOLD
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-display text-base font-bold mb-1 line-clamp-2 text-gray-900 group-hover:text-luxury-blue transition-colors">
                        {property.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {property.city}, {property.state}
                      </p>
                    </div>

                    {/* Property Details */}
                    {(property.bedrooms > 0 ||
                      property.bathrooms > 0 ||
                      property.square_feet > 0) && (
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        {property.bedrooms > 0 && (
                          <>
                            <span>{property.bedrooms} bed</span>
                            <span>•</span>
                          </>
                        )}
                        {property.bathrooms > 0 && (
                          <>
                            <span>{property.bathrooms} bath</span>
                            <span>•</span>
                          </>
                        )}
                        {property.square_feet > 0 && (
                          <span>
                            {property.square_feet.toLocaleString()} sqft
                          </span>
                        )}
                      </div>
                    )}

                    {/* Pricing */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200">
                      <div>
                        <p className="text-gray-600 text-xs mb-1">List Price</p>
                        <p className="font-bold text-sm text-gray-900">
                          ${property.list_price.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs mb-1">Sold For</p>
                        <p className="font-bold text-sm text-green-600">
                          ${property.sold_price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Sold Date */}
                    <div className="text-xs text-gray-500">
                      Sold{" "}
                      {new Date(property.sold_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
    </>
  );
}
