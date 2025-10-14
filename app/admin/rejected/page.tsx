"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface RejectedListing {
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
  rejection_reason: string;
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

export default function RejectedListingsPage() {
  const [listings, setListings] = useState<RejectedListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRejectedListings = async () => {
      try {
        const response = await fetch("/api/admin/listings?status=rejected");
        const data = await response.json();
        setListings(data.listings || []);
      } catch (error) {
        console.error("Error fetching rejected listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRejectedListings();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading rejected listings..." />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Rejected Listings ({listings.length})
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
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Rejected Listings
          </h3>
          <p className="text-gray-600">No listings have been rejected.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="flex gap-6 p-6">
                {/* Image */}
                <div className="flex-shrink-0">
                  {listing.images &&
                  listing.images.length > 0 &&
                  listing.images[0] ? (
                    <div className="relative w-48 h-32 rounded-lg overflow-hidden">
                      <Image
                        src={
                          listing.images[0].thumbnail_small_url ||
                          listing.images[0].s3_url ||
                          "/placeholder-image.jpg"
                        }
                        alt={listing.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-48 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-400"
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
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {listing.title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {listing.street_address}, {listing.city}, {listing.state}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
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
                      {listing.property_type}
                    </span>
                    <span>{listing.bedrooms === -1 ? "N/A" : listing.bedrooms} bed</span>
                    <span>{listing.bathrooms === -1 ? "N/A" : listing.bathrooms} bath</span>
                    <span>{listing.square_feet === -1 ? "N/A" : listing.square_feet.toLocaleString()} sqft</span>
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-2xl font-bold text-gray-900">
                      ${listing.list_price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      Submitted{" "}
                      {new Date(listing.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Rejection Reason */}
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-medium text-red-900 mb-1">
                      Rejection Reason:
                    </p>
                    <p className="text-sm text-red-800">
                      {listing.rejection_reason}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 flex-shrink-0">
                  <Link
                    href={`/admin/listing/${listing.id}`}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center text-sm font-medium"
                  >
                    View Details
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
