"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import { PropertyListing } from "@/app/lib/types/listings";

export default function ListingsPage() {
  const router = useRouter();
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    listingType: "all",
    propertyType: "all",
    minPrice: "",
    maxPrice: "",
    bedrooms: "all",
    city: "",
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      // Fetch only approved listings for public view
      const response = await fetch("/api/property-listings/public");

      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }

      const data = await response.json();
      setListings(data.listings || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Filter listings based on user selections
  const filteredListings = listings.filter((listing) => {
    if (
      filters.listingType !== "all" &&
      listing.listing_type !== filters.listingType
    ) {
      return false;
    }
    if (
      filters.propertyType !== "all" &&
      listing.property_type !== filters.propertyType
    ) {
      return false;
    }
    if (filters.minPrice && listing.list_price < Number(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && listing.list_price > Number(filters.maxPrice)) {
      return false;
    }
    if (
      filters.bedrooms !== "all" &&
      listing.bedrooms !== Number(filters.bedrooms)
    ) {
      return false;
    }
    if (
      filters.city &&
      !listing.city.toLowerCase().includes(filters.city.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center mt-20">
          <div className="text-lg">Loading listings...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center mt-20">
          <Card className="p-6">
            <p className="text-red-600">{error}</p>
            <Button onClick={fetchListings} className="mt-4">
              Retry
            </Button>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Property Listings
            </h1>
            <p className="mt-2 text-gray-600">
              Browse our collection of {listings.length} available properties
            </p>
          </div>

          {/* Filters */}
          <Card className="p-4 md:p-6 mb-6 md:mb-8">
            <h2 className="text-lg font-semibold mb-4">Filter Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Listing Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Listing Type
                </label>
                <select
                  value={filters.listingType}
                  onChange={(e) =>
                    setFilters({ ...filters, listingType: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                >
                  <option value="all">All</option>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>

              {/* Property Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  value={filters.propertyType}
                  onChange={(e) =>
                    setFilters({ ...filters, propertyType: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                >
                  <option value="all">All Types</option>
                  <option value="single_family">Single Family</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="multi_family">Multi-Family</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              {/* Bedrooms Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) =>
                    setFilters({ ...filters, bedrooms: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                >
                  <option value="all">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Min Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Price
                </label>
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value })
                  }
                  placeholder="No minimum"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                />
              </div>

              {/* Max Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price
                </label>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value })
                  }
                  placeholder="No maximum"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                />
              </div>

              {/* City Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={filters.city}
                  onChange={(e) =>
                    setFilters({ ...filters, city: e.target.value })
                  }
                  placeholder="Search by city"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <p className="text-sm text-gray-600">
                Showing {filteredListings.length} of {listings.length}{" "}
                properties
              </p>
              <Button
                variant="secondary"
                onClick={() =>
                  setFilters({
                    listingType: "all",
                    propertyType: "all",
                    minPrice: "",
                    maxPrice: "",
                    bedrooms: "all",
                    city: "",
                  })
                }
                className="text-sm"
              >
                Clear Filters
              </Button>
            </div>
          </Card>

          {/* Listings Grid */}
          {filteredListings.length === 0 ? (
            <Card className="p-8 md:p-12 text-center">
              <div className="mx-auto w-20 h-20 md:w-24 md:h-24 mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                <svg
                  className="w-10 h-10 md:w-12 md:h-12 text-gray-400"
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
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                No properties found
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Try adjusting your filters to see more results
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredListings.map((listing) => (
                <Card
                  key={listing.id}
                  className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => router.push(`/listings/${listing.id}`)}
                >
                  {/* Property Image */}
                  <div className="relative h-48 md:h-56 bg-gray-200">
                    {listing.images &&
                    listing.images.length > 0 &&
                    listing.images[0] ? (
                      <img
                        src={
                          listing.images[0].thumbnail_large_url ||
                          listing.images[0].thumbnail_medium_url ||
                          listing.images[0].s3_url
                        }
                        alt={listing.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null; // Prevent infinite loop
                          target.style.display = "none";
                          if (target.parentElement) {
                            target.parentElement.innerHTML =
                              '<div class="w-full h-full flex items-center justify-center text-gray-400"><svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div>';
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg
                          className="w-16 h-16"
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
                    {/* Listing Type Badge */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          listing.listing_type === "sale"
                            ? "bg-blue-600 text-white"
                            : "bg-green-600 text-white"
                        }`}
                      >
                        {listing.listing_type === "sale"
                          ? "For Sale"
                          : "For Rent"}
                      </span>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-4 md:p-5">
                    <div className="mb-3">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 line-clamp-1">
                        {listing.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {listing.city}, {listing.state}
                      </p>
                    </div>

                    <div className="mb-3">
                      <p className="text-2xl md:text-3xl font-bold text-blue-600">
                        ${listing.list_price.toLocaleString()}
                        {listing.listing_type === "rent" && (
                          <span className="text-base md:text-lg font-normal">
                            /mo
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center flex-wrap gap-3 md:gap-4 text-sm text-gray-600 mb-3">
                      {listing.bedrooms && (
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                          </svg>
                          <span className="font-medium">
                            {listing.bedrooms} bed
                          </span>
                        </div>
                      )}
                      {listing.bathrooms && (
                        <div className="flex items-center gap-1">
                          <span className="font-medium">
                            {listing.bathrooms} bath
                          </span>
                        </div>
                      )}
                      {listing.square_feet && (
                        <div className="flex items-center gap-1">
                          <span className="font-medium">
                            {listing.square_feet.toLocaleString()} sqft
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-gray-700 line-clamp-2 mb-4">
                      {listing.description}
                    </p>

                    <div className="pt-4 border-t border-gray-200">
                      <Button variant="primary" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
