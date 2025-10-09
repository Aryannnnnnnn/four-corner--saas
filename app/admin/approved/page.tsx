"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface ApprovedListing {
  id: string;
  title: string;
  created_at: string;
  list_price: number;
  city: string;
  state: string;
  street_address: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  images: Array<{
    id: string;
    s3_url: string;
    thumbnail_small_url?: string;
    thumbnail_medium_url?: string;
    thumbnail_large_url?: string;
    display_order: number;
    is_primary: boolean;
  }>;
}

export default function ApprovedListingsPage() {
  const [listings, setListings] = useState<ApprovedListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApprovedListings = async () => {
      try {
        const response = await fetch("/api/admin/listings?status=approved");
        const data = await response.json();
        setListings(data.listings || []);
      } catch (error) {
        console.error("Error fetching approved listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedListings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading approved listings...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Approved Listings ({listings.length})
      </h1>

      {listings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Approved Listings
          </h3>
          <p className="text-gray-600">No listings have been approved yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative h-48">
                {listing.images && listing.images.length > 0 && listing.images[0] ? (
                  <Image
                    src={listing.images[0].thumbnail_small_url || listing.images[0].s3_url || "/placeholder-image.jpg"}
                    alt={listing.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                    Approved
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                  {listing.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {listing.street_address}, {listing.city}, {listing.state}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span>{listing.bedrooms} bed</span>
                  <span>{listing.bathrooms} bath</span>
                  <span>{listing.square_feet.toLocaleString()} sqft</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    ${listing.list_price.toLocaleString()}
                  </span>
                  <Link
                    href={`/listings/${listing.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    target="_blank"
                  >
                    View →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
