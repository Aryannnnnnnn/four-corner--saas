"use client";

import { useState, useEffect } from "react";
import type { PropertyListing } from "@/app/lib/types/listings";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const statusOptions = [
  { value: "all", label: "All Listings", color: "gray" },
  { value: "pending", label: "Pending", color: "yellow" },
  { value: "approved", label: "Approved", color: "green" },
  { value: "rejected", label: "Rejected", color: "red" },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function AllListingsPage() {
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<
    PropertyListing[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<
    "newest" | "oldest" | "price-high" | "price-low"
  >("newest");
  // Separate loading states for each button type
  const [loadingButtons, setLoadingButtons] = useState<{
    [key: string]: {
      approve?: boolean;
      reject?: boolean;
      pending?: boolean;
      delete?: boolean;
    };
  }>({});

  // Helper functions for button states
  const setButtonLoading = (
    propertyId: string,
    action: "approve" | "reject" | "pending" | "delete",
    isLoading: boolean,
  ) => {
    setLoadingButtons((prev) => ({
      ...prev,
      [propertyId]: {
        ...prev[propertyId],
        [action]: isLoading,
      },
    }));
  };

  const isButtonLoading = (
    propertyId: string,
    action: "approve" | "reject" | "pending" | "delete",
  ) => {
    return loadingButtons[propertyId]?.[action] || false;
  };

  useEffect(() => {
    fetchProperties();
  }, [statusFilter]); // Refetch when status filter changes

  useEffect(() => {
    filterAndSortProperties();
  }, [properties, searchTerm, sortBy]); // Remove statusFilter since we handle it in fetchProperties

  const fetchProperties = async () => {
    try {
      // Use the same approach as pending/rejected pages
      const url =
        statusFilter === "all"
          ? "/api/admin/listings"
          : `/api/admin/listings?status=${statusFilter}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const result = await response.json();

      if (result.listings) {
        setProperties(result.listings);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProperties = () => {
    let filtered = [...properties];

    // Status filtering is now handled by the API, so we remove it here

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (property) =>
          property.title?.toLowerCase().includes(searchLower) ||
          property.street_address?.toLowerCase().includes(searchLower) ||
          property.city?.toLowerCase().includes(searchLower) ||
          property.state?.toLowerCase().includes(searchLower) ||
          property.user?.name?.toLowerCase().includes(searchLower),
      );
    }

    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        case "oldest":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case "price-high":
          return (b.list_price || 0) - (a.list_price || 0);
        case "price-low":
          return (a.list_price || 0) - (b.list_price || 0);
        default:
          return 0;
      }
    });

    setFilteredProperties(filtered);
  };

  const updatePropertyStatus = async (
    propertyId: string,
    newStatus: "approved" | "rejected" | "pending",
  ) => {
    const action: "approve" | "reject" | "pending" =
      newStatus === "approved"
        ? "approve"
        : newStatus === "rejected"
          ? "reject"
          : "pending";
    setButtonLoading(propertyId, action, true);

    try {
      console.log(`Updating property ${propertyId} to status: ${newStatus}`);

      let response: Response;

      // Use the appropriate API endpoint based on the new status
      if (newStatus === "approved") {
        response = await fetch(`/api/admin/listings/${propertyId}/approve`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else if (newStatus === "rejected") {
        // For rejection, we need a reason - use toast-based input
        const handleRejection = (reason: string) => {
          return fetch(`/api/admin/listings/${propertyId}/reject`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ reason }),
          });
        };

        // Show rejection reason input toast
        const rejectionPromise = new Promise<Response>((resolve, reject) => {
          // Create a stateful component for the rejection reason input
          const RejectionReasonForm = ({ toastId }: { toastId: string }) => {
            const [rejectionReason, setRejectionReason] = useState("");

            return (
              <div className="flex flex-col gap-3 min-w-[300px]">
                <span className="font-medium">Reject Property</span>
                <textarea
                  placeholder="Please provide a reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm resize-none text-black bg-white placeholder-gray-500"
                  rows={3}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (!rejectionReason.trim()) {
                        toast.error("Rejection reason is required");
                        return;
                      }
                      toast.dismiss(toastId);
                      resolve(handleRejection(rejectionReason.trim()));
                    }}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      toast.dismiss(toastId);
                      reject(new Error("Rejection cancelled"));
                    }}
                    className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            );
          };

          toast((t) => <RejectionReasonForm toastId={t.id} />, {
            duration: Infinity,
            style: {
              background: "#fff",
              color: "#000",
              border: "1px solid #ccc",
            },
          });
        });

        response = await rejectionPromise;
      } else if (newStatus === "pending") {
        response = await fetch(`/api/admin/listings/${propertyId}/pending`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        throw new Error("Invalid status");
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update property status");
      }

      console.log("API response:", result);

      // Refresh the data to ensure consistency with the database
      await fetchProperties();

      // Show success message
      toast.success(
        `Property status updated to ${newStatus.toUpperCase()} successfully!`,
      );
    } catch (error) {
      console.error("Error updating property status:", error);
      toast.error(
        `Failed to update property status: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setButtonLoading(propertyId, action, false);
    }
  };

  const deleteProperty = async (propertyId: string) => {
    // Use a custom confirmation toast instead of browser confirm
    const confirmDelete = () => {
      setButtonLoading(propertyId, "delete", true);
      performDelete();
    };

    const performDelete = async () => {
      try {
        const response = await fetch(`/api/admin/listings/${propertyId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to delete property");
        }

        // Update local state
        setProperties((prev) =>
          prev.filter((property) => property.id !== propertyId),
        );

        // Show success message
        toast.success("Property deleted successfully!");
      } catch (error) {
        console.error("Error deleting property:", error);
        toast.error(
          `Failed to delete property: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      } finally {
        setButtonLoading(propertyId, "delete", false);
      }
    };

    // Show confirmation toast
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span className="font-medium text-gray-900">Delete Property?</span>
          <span className="text-sm text-gray-700">
            This action cannot be undone.
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                confirmDelete();
              }}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        style: {
          background: "#fff",
          color: "#000",
          border: "1px solid #ccc",
        },
      },
    );
  };

  if (loading) {
    return <LoadingSpinner message="Loading all listings..." />;
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />

      {/* Header */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              All Property Listings
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Manage all property listings - Approved, Rejected, and Pending (
              {properties.length} total)
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
          Filters & Search
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search Properties
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by title, address, city, or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white placeholder-gray-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label
              htmlFor="sort"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sort By
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gray-50 px-4 py-3 rounded-lg">
        <span className="text-sm text-gray-600">
          Showing {filteredProperties.length} of {properties.length} properties
        </span>
        <div className="flex flex-wrap gap-2 text-xs">
          {statusOptions.slice(1).map((status) => {
            const count = properties.filter(
              (p) => p.status === status.value,
            ).length;
            return (
              <span
                key={status.value}
                className="px-2 py-1 bg-white rounded border text-gray-800 font-medium whitespace-nowrap"
              >
                {status.label}: {count}
              </span>
            );
          })}
        </div>
      </div>

      {/* Properties List */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.6.713-3.714m0 0A9.97 9.97 0 0124 30a9.97 9.97 0 019.287 6.286"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No properties found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your filters or search term."
              : "Get started by creating your first property listing."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    {/* Property Image */}
                    <div className="flex-shrink-0 w-full sm:w-auto">
                      {property.thumbnail_small_url ? (
                        <Image
                          src={property.thumbnail_small_url}
                          alt={property.title || "Property"}
                          width={120}
                          height={80}
                          className="w-full sm:w-[120px] h-20 sm:h-20 rounded-lg object-cover"
                        />
                      ) : property.images && property.images.length > 0 ? (
                        <Image
                          src={property.images[0]?.s3_url || ""}
                          alt={property.title || "Property"}
                          width={120}
                          height={80}
                          className="w-full sm:w-[120px] h-20 sm:h-20 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-[120px] h-[80px] bg-gray-200 rounded-lg flex items-center justify-center">
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
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Property Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div className="flex-1">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                            {property.title || "Untitled Property"}
                          </h3>
                          <p className="text-sm text-gray-600 break-words">
                            {property.street_address}, {property.city},{" "}
                            {property.state}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${statusColors[property.status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}`}
                          >
                            {property.status.charAt(0).toUpperCase() +
                              property.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 text-xs sm:text-sm">
                            Price:
                          </span>
                          <p className="font-semibold text-green-700 text-sm sm:text-base">
                            ${property.list_price?.toLocaleString() || "N/A"}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600 text-xs sm:text-sm">
                            Bedrooms:
                          </span>
                          <p className="font-medium text-gray-900">
                            {property.bedrooms === -1 ? "N/A" : property.bedrooms || "N/A"}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600 text-xs sm:text-sm">
                            Bathrooms:
                          </span>
                          <p className="font-medium text-gray-900">
                            {property.bathrooms === -1 ? "N/A" : property.bathrooms || "N/A"}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600 text-xs sm:text-sm">
                            Sq Ft:
                          </span>
                          <p className="font-medium text-gray-900">
                            {property.square_feet === -1 ? "N/A" : property.square_feet?.toLocaleString() || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 text-xs sm:text-sm">
                        <span className="text-gray-600">Owner:</span>
                        <span className="ml-1 font-medium text-gray-900 break-words">
                          {property.user?.name || "Unknown"} (
                          {property.user?.email || "No email"})
                        </span>
                      </div>

                      <div className="mt-2 text-xs text-gray-600">
                        Listed:{" "}
                        {new Date(property.created_at).toLocaleDateString()} at{" "}
                        {new Date(property.created_at).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col lg:flex-col gap-2 lg:ml-4 mt-4 lg:mt-0 w-full lg:w-auto">
                    <div className="flex flex-row lg:flex-col gap-2">
                      <Link
                        href={`/listings/${property.id}`}
                        className="flex-1 lg:flex-none px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors text-center"
                      >
                        View Details
                      </Link>

                      <Link
                        href={`/admin/edit-property/${property.id}`}
                        className="flex-1 lg:flex-none px-3 py-2 text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-md transition-colors text-center"
                      >
                        Edit Property
                      </Link>
                    </div>

                    <div className="flex flex-row lg:flex-col gap-2 mt-2 lg:mt-0">
                      {property.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              updatePropertyStatus(property.id, "approved")
                            }
                            disabled={isButtonLoading(property.id, "approve")}
                            className="flex-1 lg:flex-none px-3 py-2 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
                          >
                            {isButtonLoading(property.id, "approve")
                              ? "Approving..."
                              : "Approve"}
                          </button>
                          <button
                            onClick={() =>
                              updatePropertyStatus(property.id, "rejected")
                            }
                            disabled={isButtonLoading(property.id, "reject")}
                            className="flex-1 lg:flex-none px-3 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
                          >
                            {isButtonLoading(property.id, "reject")
                              ? "Rejecting..."
                              : "Reject"}
                          </button>
                        </>
                      )}

                      {property.status === "approved" && (
                        <button
                          onClick={() =>
                            updatePropertyStatus(property.id, "pending")
                          }
                          disabled={isButtonLoading(property.id, "pending")}
                          className="w-full lg:w-auto px-3 py-2 text-xs font-medium text-yellow-600 bg-yellow-50 hover:bg-yellow-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
                        >
                          {isButtonLoading(property.id, "pending")
                            ? "Processing..."
                            : "Set Pending"}
                        </button>
                      )}

                      {property.status === "rejected" && (
                        <button
                          onClick={() =>
                            updatePropertyStatus(property.id, "pending")
                          }
                          disabled={isButtonLoading(property.id, "pending")}
                          className="w-full lg:w-auto px-3 py-2 text-xs font-medium text-yellow-600 bg-yellow-50 hover:bg-yellow-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
                        >
                          {isButtonLoading(property.id, "pending")
                            ? "Processing..."
                            : "Review Again"}
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => deleteProperty(property.id)}
                      disabled={isButtonLoading(property.id, "delete")}
                      className="w-full lg:w-auto px-3 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors mt-2 lg:mt-0"
                    >
                      {isButtonLoading(property.id, "delete")
                        ? "Deleting..."
                        : "Delete"}
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
