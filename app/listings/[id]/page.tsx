"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { PropertyListing } from "@/app/lib/types/listings";

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const listingId = params.id as string;

  const [listing, setListing] = useState<PropertyListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (listingId) {
      fetchListing();
    }
  }, [listingId]);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/property-listings/${listingId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch listing");
      }

      const data = await response.json();
      setListing(data.listing);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <LoadingSpinner message="Loading listing..." />
      </>
    );
  }

  if (error || !listing) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center mt-20">
          <Card className="p-6">
            <p className="text-red-600">{error || "Listing not found"}</p>
            <Button onClick={() => router.push("/listings")} className="mt-4">
              Back to Listings
            </Button>
          </Card>
        </div>
      </>
    );
  }

  const images = listing.images || [];
  const selectedImage = images[selectedImageIndex];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-6 md:py-8 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Button
            variant="secondary"
            onClick={() => router.push("/listings")}
            className="mb-4 md:mb-6"
          >
            ← Back to Listings
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Main Content - Images and Details */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* Image Gallery */}
              {images.length > 0 ? (
                <Card className="overflow-hidden">
                  {/* Main Image */}
                  <div className="relative h-64 sm:h-80 md:h-96 bg-gray-200">
                    <img
                      src={selectedImage?.s3_url || ""}
                      alt={`Property ${selectedImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setSelectedImageIndex((prev) =>
                              prev === 0 ? images.length - 1 : prev - 1,
                            )
                          }
                          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                        >
                          <svg
                            className="w-5 h-5 md:w-6 md:h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() =>
                            setSelectedImageIndex((prev) =>
                              prev === images.length - 1 ? 0 : prev + 1,
                            )
                          }
                          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                        >
                          <svg
                            className="w-5 h-5 md:w-6 md:h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </>
                    )}
                    {/* Image Counter */}
                    <div className="absolute bottom-3 md:bottom-4 right-3 md:right-4 bg-black/50 text-white px-2.5 md:px-3 py-1 rounded-full text-xs md:text-sm">
                      {selectedImageIndex + 1} / {images.length}
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  {images.length > 1 && (
                    <div className="p-3 md:p-4 grid grid-cols-4 sm:grid-cols-6 gap-2 overflow-x-auto">
                      {images.map((image, index) => (
                        <button
                          key={image.id}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`relative h-16 md:h-20 rounded-md overflow-hidden border-2 transition ${
                            selectedImageIndex === index
                              ? "border-blue-600"
                              : "border-transparent hover:border-gray-300"
                          }`}
                        >
                          <img
                            src={image.thumbnail_small_url || image.s3_url}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </Card>
              ) : (
                <Card className="p-8 md:p-12 text-center bg-gray-100">
                  <p className="text-gray-500">No images available</p>
                </Card>
              )}

              {/* Property Description */}
              <Card className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                  About This Property
                </h2>
                <p className="text-sm md:text-base text-gray-700 whitespace-pre-line">
                  {listing.description}
                </p>
              </Card>

              {/* Property Features */}
              <Card className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                  Features & Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {(listing.bedrooms || listing.bedrooms === 0) && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-600 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      <span className="text-sm text-gray-700">
                        <strong className="text-gray-900">
                          {listing.bedrooms === -1 ? "N/A" : listing.bedrooms}
                        </strong>{" "}
                        Bedrooms
                      </span>
                    </div>
                  )}
                  {(listing.bathrooms || listing.bathrooms === 0) && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-600 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-700">
                        <strong className="text-gray-900">
                          {listing.bathrooms === -1 ? "N/A" : listing.bathrooms}
                        </strong>{" "}
                        Bathrooms
                      </span>
                    </div>
                  )}
                  {(listing.square_feet || listing.square_feet === 0) && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-600 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
                      </svg>
                      <span className="text-sm text-gray-700">
                        <strong className="text-gray-900">
                          {listing.square_feet === -1 ? "N/A" : listing.square_feet.toLocaleString()}
                        </strong>{" "}
                        sqft
                      </span>
                    </div>
                  )}
                  {(listing.lot_size || listing.lot_size === 0) && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-600 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-700">
                        <strong className="text-gray-900">
                          {listing.lot_size === -1 ? "N/A" : listing.lot_size}
                        </strong>{" "}
                        {listing.lot_size !== -1 && (listing.lot_size_unit || "acres")} lot
                      </span>
                    </div>
                  )}
                  {(listing.year_built || listing.year_built === 0) && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-600 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-700">
                        {listing.year_built === -1 ? (
                          <strong className="text-gray-900">Year Built: N/A</strong>
                        ) : (
                          <>
                            Built in{" "}
                            <strong className="text-gray-900">
                              {listing.year_built}
                            </strong>
                          </>
                        )}
                      </span>
                    </div>
                  )}
                  {listing.garage_spaces && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-600 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                      </svg>
                      <span className="text-sm text-gray-700">
                        <strong className="text-gray-900">
                          {listing.garage_spaces}
                        </strong>{" "}
                        Car Garage
                      </span>
                    </div>
                  )}
                </div>

                {listing.features &&
                  Object.keys(listing.features).length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-semibold text-gray-800 mb-3">
                        Additional Features
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {Object.entries(listing.features).map(
                          ([key, value]) => (
                            <div key={key} className="text-sm text-gray-600">
                              •{" "}
                              <strong className="capitalize">
                                {key.replace(/_/g, " ")}:
                              </strong>{" "}
                              {String(value)}
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
              </Card>
            </div>

            {/* Sidebar - Price and Contact */}
            <div className="lg:col-span-1">
              <Card className="p-5 md:p-6 lg:sticky lg:top-8">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl md:text-3xl font-bold text-blue-600">
                      ${listing.list_price.toLocaleString()}
                    </span>
                    {listing.listing_type === "rent" && (
                      <span className="text-sm md:text-base text-gray-600">
                        /month
                      </span>
                    )}
                  </div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                      listing.listing_type === "sale"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {listing.listing_type === "sale" ? "For Sale" : "For Rent"}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Property Details
                  </h3>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between gap-2">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium text-gray-900 capitalize text-right">
                        {listing.property_type.replace(/_/g, " ")}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium text-gray-900 text-right">
                        {listing.city}, {listing.state}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-gray-600 flex-shrink-0">
                        Address:
                      </span>
                      <span className="font-medium text-gray-900 text-right break-words">
                        {listing.street_address}
                      </span>
                    </div>
                    {listing.hoa_fees && (
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-600">HOA Fees:</span>
                        <span className="font-medium text-gray-900">
                          ${listing.hoa_fees.toLocaleString()}/mo
                        </span>
                      </div>
                    )}
                    {listing.property_tax && (
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-600 flex-shrink-0">
                          Property Tax:
                        </span>
                        <span className="font-medium text-gray-900">
                          ${listing.property_tax.toLocaleString()}/yr
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Contact Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Contact Person</p>
                      <p className="font-medium text-gray-900 break-words">
                        {listing.contact_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Email</p>
                      <a
                        href={`mailto:${listing.contact_email}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium break-all"
                      >
                        {listing.contact_email}
                      </a>
                    </div>
                    {listing.contact_phone && (
                      <div>
                        <p className="text-gray-600 mb-1">Phone</p>
                        <a
                          href={`tel:${listing.contact_phone}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                        >
                          {listing.contact_phone}
                        </a>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="primary"
                    className="w-full mt-6"
                    onClick={() =>
                      (window.location.href = `mailto:${listing.contact_email}?subject=Inquiry about ${listing.title}`)
                    }
                  >
                    Contact Agent
                  </Button>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-6 text-xs text-gray-500">
                  <p>
                    Listed on{" "}
                    {new Date(listing.created_at).toLocaleDateString()}
                  </p>
                  {listing.reviewed_at && (
                    <p>
                      Verified on{" "}
                      {new Date(listing.reviewed_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
