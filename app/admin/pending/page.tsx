"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { showToast } from "@/app/lib/utils/toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface PendingListing {
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
  contact_name: string;
  contact_email: string;
  contact_phone: string;
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

export default function PendingListingsPage() {
  const [listings, setListings] = useState<PendingListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: "approve" | "reject";
    listingId: string;
  }>({ isOpen: false, type: "approve", listingId: "" });
  const [rejectionReason, setRejectionReason] = useState("");

  const fetchPendingListings = async () => {
    try {
      const response = await fetch("/api/admin/listings?status=pending");
      const data = await response.json();
      setListings(data.listings || []);
    } catch (error) {
      console.error("Error fetching pending listings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingListings();
  }, []);

  const handleApprove = async (listingId: string) => {
    setConfirmDialog({ isOpen: true, type: "approve", listingId });
  };

  const handleReject = async (listingId: string) => {
    setConfirmDialog({ isOpen: true, type: "reject", listingId });
  };

  const confirmApprove = async () => {
    const listingId = confirmDialog.listingId;
    setConfirmDialog({ isOpen: false, type: "approve", listingId: "" });
    setApprovingId(listingId);

    try {
      const response = await fetch(`/api/admin/listings/${listingId}/approve`, {
        method: "POST",
      });

      if (response.ok) {
        showToast(
          "Listing approved successfully! Email sent to owner.",
          "success",
        );
        setListings(listings.filter((l) => l.id !== listingId));
      } else {
        const error = await response.json();
        showToast(`Failed to approve listing: ${error.error}`, "error");
      }
    } catch (error) {
      console.error("Error approving listing:", error);
      showToast("Failed to approve listing", "error");
    } finally {
      setApprovingId(null);
    }
  };

  const confirmReject = async () => {
    if (!rejectionReason.trim()) return;

    const listingId = confirmDialog.listingId;
    setConfirmDialog({ isOpen: false, type: "reject", listingId: "" });
    setRejectingId(listingId);

    try {
      const response = await fetch(`/api/admin/listings/${listingId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: rejectionReason }),
      });

      if (response.ok) {
        showToast(
          "Listing rejected successfully! Email sent to owner.",
          "success",
        );
        setListings(listings.filter((l) => l.id !== listingId));
        setRejectionReason("");
      } else {
        const error = await response.json();
        showToast(`Failed to reject listing: ${error.error}`, "error");
      }
    } catch (error) {
      console.error("Error rejecting listing:", error);
      showToast("Failed to reject listing", "error");
    } finally {
      setRejectingId(null);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading pending listings..." />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Pending Listings ({listings.length})
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
            No Pending Listings
          </h3>
          <p className="text-gray-600">
            All caught up! No listings awaiting review.
          </p>
        </div>
      ) : (
        <div className="space-y-4 md:space-y-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6">
                {/* Image */}
                <div className="flex-shrink-0">
                  {listing.images &&
                  listing.images.length > 0 &&
                  listing.images[0] ? (
                    <div className="relative w-full h-56 md:w-48 md:h-36 lg:w-56 lg:h-40 rounded-lg overflow-hidden">
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
                    <div className="w-full h-56 md:w-48 md:h-36 lg:w-56 lg:h-40 bg-gray-200 rounded-lg flex items-center justify-center">
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
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                    {listing.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-3">
                    {listing.street_address}, {listing.city}, {listing.state}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4 flex-shrink-0"
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
                      <span className="font-medium">
                        {listing.property_type}
                      </span>
                    </span>
                    <span className="font-medium">{listing.bedrooms} bed</span>
                    <span className="font-medium">
                      {listing.bathrooms} bath
                    </span>
                    <span className="font-medium">
                      {listing.square_feet.toLocaleString()} sqft
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-2xl md:text-3xl font-bold text-blue-600">
                      ${listing.list_price.toLocaleString()}
                    </span>
                    <span className="text-xs md:text-sm text-gray-500 px-2 py-1 bg-gray-100 rounded">
                      Submitted{" "}
                      {new Date(listing.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                    <p className="font-medium mb-1">Contact Information:</p>
                    <p className="break-words">
                      <span className="font-semibold">
                        {listing.contact_name}
                      </span>
                      <br className="sm:hidden" />
                      <span className="hidden sm:inline"> • </span>
                      <span className="text-blue-600">
                        {listing.contact_email}
                      </span>
                      <br className="sm:hidden" />
                      <span className="hidden sm:inline"> • </span>
                      <span>{listing.contact_phone}</span>
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row md:flex-col gap-2 md:gap-3 w-full md:w-auto flex-shrink-0">
                  <Link
                    href={`/listings/${listing.id}`}
                    className="flex-1 md:flex-initial px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center text-sm font-medium"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleApprove(listing.id)}
                    disabled={
                      approvingId === listing.id || rejectingId === listing.id
                    }
                    className="flex-1 md:flex-initial px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <span>{approvingId === listing.id ? "..." : "✓"}</span>
                    <span>
                      {approvingId === listing.id ? "Processing..." : "Approve"}
                    </span>
                  </button>
                  <button
                    onClick={() => handleReject(listing.id)}
                    disabled={
                      approvingId === listing.id || rejectingId === listing.id
                    }
                    className="flex-1 md:flex-initial px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <span>{rejectingId === listing.id ? "..." : "✗"}</span>
                    <span>
                      {rejectingId === listing.id ? "Processing..." : "Reject"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen && confirmDialog.type === "approve"}
        onClose={() =>
          setConfirmDialog({ isOpen: false, type: "approve", listingId: "" })
        }
        onConfirm={confirmApprove}
        title="Approve Listing"
        message="Are you sure you want to approve this listing? An approval email will be sent to the property owner."
        confirmText="Approve Listing"
        cancelText="Cancel"
        type="info"
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen && confirmDialog.type === "reject"}
        onClose={() => {
          setConfirmDialog({ isOpen: false, type: "reject", listingId: "" });
          setRejectionReason("");
        }}
        onConfirm={confirmReject}
        title="Reject Listing"
        message="Please provide a reason for rejecting this listing. This will be sent to the property owner."
        confirmText="Reject Listing"
        cancelText="Cancel"
        type="danger"
        requireInput
        inputPlaceholder="Enter rejection reason (e.g., Images are unclear, missing information, etc.)"
        onInputChange={(value) => setRejectionReason(value)}
      />
    </div>
  );
}
