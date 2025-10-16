"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { toast } from "react-hot-toast";

interface SoldListing {
  id: string;
  title: string;
  created_at: string;
  sold_at: string;
  sold_by: string;
  sold_price: number;
  list_price: number;
  sale_notes: string;
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

export default function SoldListingsPage() {
  const [listings, setListings] = useState<SoldListing[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSoldListings = async () => {
    try {
      const response = await fetch("/api/admin/listings?status=sold");
      const data = await response.json();
      setListings(data.listings || []);
    } catch (error) {
      console.error("Error fetching sold listings:", error);
      toast.error("Failed to load sold listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSoldListings();
  }, []);

  const handleRevertToApproved = async (listingId: string) => {
    if (
      !confirm(
        "Are you sure you want to revert this listing back to approved status?",
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/listings/${listingId}/sold`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Listing reverted to approved successfully");
        // Refresh the list
        fetchSoldListings();
      } else {
        toast.error(data.error || "Failed to revert listing");
      }
    } catch (error) {
      console.error("Error reverting listing:", error);
      toast.error("Failed to revert listing");
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading sold listings..." />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Sold Properties ({listings.length})
        </h1>
      </div>

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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Sold Properties
          </h3>
          <p className="text-gray-600">
            No properties have been marked as sold yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="relative h-64 md:h-auto md:w-80 flex-shrink-0">
                  {listing.images &&
                  listing.images.length > 0 &&
                  listing.images[0] ? (
                    <Image
                      src={
                        listing.images[0].thumbnail_medium_url ||
                        listing.images[0].s3_url ||
                        "/placeholder-image.jpg"
                      }
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
                    <span className="px-3 py-1 text-xs font-semibold bg-green-600 text-white rounded-full">
                      SOLD
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {listing.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {listing.street_address}, {listing.city},{" "}
                        {listing.state}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        Bedrooms
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {listing.bedrooms === -1 ? "N/A" : listing.bedrooms}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        Bathrooms
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {listing.bathrooms === -1 ? "N/A" : listing.bathrooms}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        Square Feet
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {listing.square_feet === -1
                          ? "N/A"
                          : listing.square_feet.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        Property Type
                      </p>
                      <p className="text-lg font-semibold text-gray-900 capitalize">
                        {listing.property_type}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">List Price</p>
                      <p className="text-lg font-bold text-gray-900">
                        ${listing.list_price.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Sold Price</p>
                      <p className="text-lg font-bold text-green-600">
                        ${listing.sold_price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">
                      Sold on {new Date(listing.sold_at).toLocaleDateString()}{" "}
                      by {listing.sold_by}
                    </p>
                    {listing.sale_notes && (
                      <div className="mt-2 p-3 bg-gray-50 rounded">
                        <p className="text-xs text-gray-500 mb-1 font-semibold">
                          Sale Notes:
                        </p>
                        <p className="text-sm text-gray-700">
                          {listing.sale_notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/listings/${listing.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      target="_blank"
                    >
                      View Listing
                    </Link>
                    <button
                      onClick={() => handleRevertToApproved(listing.id)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                    >
                      Revert to Approved
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
