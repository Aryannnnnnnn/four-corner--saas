"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { PropertyListing } from "@/app/lib/types/listings";
import Header from "@/components/layout/Header";

export default function MyListingsPage() {
  const router = useRouter();
  const { status } = useSession();
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/my-listings");
      return;
    }

    if (status === "authenticated") {
      fetchListings();
    }
  }, [status, router]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/property-listings");

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

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6">
          <p className="text-red-600">{error}</p>
          <Button onClick={fetchListings} className="mt-4">
            Retry
          </Button>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
      draft: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
          styles[status as keyof typeof styles] || styles.draft
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  My Property Listings
                </h1>
                <p className="mt-2 text-gray-600">
                  Manage your submitted property listings
                </p>
              </div>
              <Button onClick={() => router.push("/list-property")}>
                + New Listing
              </Button>
            </div>
          </div>

          {/* Listings */}
          {listings.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="mx-auto w-24 h-24 mb-4 flex items-center justify-center bg-gray-100 rounded-full">
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No listings yet
              </h3>
              <p className="text-gray-600 mb-6">
                Get started by creating your first property listing
              </p>
              <Button onClick={() => router.push("/list-property")}>
                Create Your First Listing
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {listings.map((listing) => (
                <Card
                  key={listing.id}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Property Image */}
                    <div className="flex-shrink-0">
                      <div className="w-full sm:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden">
                        {listing.images &&
                        listing.images.length > 0 &&
                        listing.images[0] ? (
                          <img
                            src={
                              listing.images[0].thumbnail_medium_url ||
                              listing.images[0].s3_url
                            }
                            alt={listing.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Property Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {listing.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {listing.city}, {listing.state} {listing.zipcode}
                          </p>
                        </div>
                        <div className="ml-4">
                          {getStatusBadge(listing.status)}
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                        {listing.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        {listing.list_price && (
                          <div className="font-semibold text-blue-600">
                            ${listing.list_price.toLocaleString()}
                          </div>
                        )}
                        {listing.bedrooms && <div>{listing.bedrooms} bed</div>}
                        {listing.bathrooms && (
                          <div>{listing.bathrooms} bath</div>
                        )}
                        {listing.square_feet && (
                          <div>
                            {listing.square_feet.toLocaleString()} sq ft
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          Submitted:{" "}
                          {new Date(listing.created_at).toLocaleDateString()}
                          {listing.status === "approved" &&
                            listing.reviewed_at && (
                              <>
                                {" "}
                                • Approved:{" "}
                                {new Date(
                                  listing.reviewed_at,
                                ).toLocaleDateString()}
                              </>
                            )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            onClick={() =>
                              router.push(`/listings/${listing.id}`)
                            }
                            className="text-sm px-3 py-1"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>

                      {listing.status === "rejected" &&
                        listing.rejection_reason && (
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm font-medium text-red-800">
                              Rejection Reason:
                            </p>
                            <p className="text-sm text-red-700 mt-1">
                              {listing.rejection_reason}
                            </p>
                          </div>
                        )}
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
