"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { toast } from "react-hot-toast";

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
  const [showSoldModal, setShowSoldModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  const [soldPrice, setSoldPrice] = useState<string>("");
  const [saleNotes, setSaleNotes] = useState<string>("");

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

  useEffect(() => {
    fetchApprovedListings();
  }, []);

  const handleMarkAsSold = (listing: ApprovedListing) => {
    setSelectedListing(listing.id);
    setSoldPrice(listing.list_price.toString());
    setSaleNotes("");
    setShowSoldModal(true);
  };

  const confirmMarkAsSold = async () => {
    if (!selectedListing) return;

    try {
      const response = await fetch(`/api/admin/listings/${selectedListing}/sold`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sold_price: soldPrice ? parseFloat(soldPrice) : null,
          sale_notes: saleNotes || null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Property marked as sold successfully!");
        setShowSoldModal(false);
        setSelectedListing(null);
        setSoldPrice("");
        setSaleNotes("");
        // Refresh the list
        fetchApprovedListings();
      } else {
        toast.error(data.error || "Failed to mark property as sold");
      }
    } catch (error) {
      console.error("Error marking as sold:", error);
      toast.error("Failed to mark property as sold");
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading approved listings..." />;
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
                {listing.images &&
                listing.images.length > 0 &&
                listing.images[0] ? (
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
                  <span>{listing.bedrooms === -1 ? "N/A" : listing.bedrooms} bed</span>
                  <span>{listing.bathrooms === -1 ? "N/A" : listing.bathrooms} bath</span>
                  <span>{listing.square_feet === -1 ? "N/A" : listing.square_feet.toLocaleString()} sqft</span>
                </div>
                <div className="mb-3">
                  <span className="text-xl font-bold text-gray-900">
                    ${listing.list_price.toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/listings/${listing.id}`}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium text-center"
                    target="_blank"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleMarkAsSold(listing)}
                    className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Mark as Sold
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mark as Sold Modal */}
      {showSoldModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Mark Property as Sold
            </h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sold Price (optional)
                </label>
                <input
                  type="number"
                  value={soldPrice}
                  onChange={(e) => setSoldPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter sold price"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave as is to use the list price
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sale Notes (optional)
                </label>
                <textarea
                  value={saleNotes}
                  onChange={(e) => setSaleNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Add any notes about the sale..."
                  rows={3}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowSoldModal(false);
                  setSelectedListing(null);
                  setSoldPrice("");
                  setSaleNotes("");
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmMarkAsSold}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
