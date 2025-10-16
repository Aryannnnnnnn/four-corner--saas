"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface SoldProperty {
  id: string;
  title: string;
  description: string;
  street_address: string;
  city: string;
  state: string;
  zipcode: string;
  list_price: number;
  sold_price: number;
  sold_at: string;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  property_type: string;
  year_built: number;
  lot_size: number;
  lot_size_unit: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  images: Array<{
    id: string;
    s3_url: string;
    thumbnail_large_url?: string;
    display_order: number;
  }>;
}

export default function SoldPropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<SoldProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `/api/sold-properties/${params.id as string}`,
        );
        const data = await response.json();

        if (response.ok && data.property) {
          setProperty(data.property);
        } else {
          console.error("Property not found:", data.error);
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  if (loading) {
    return <LoadingSpinner message="Loading property details..." />;
  }

  if (!property) {
    return (
      <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-lg shadow-sm p-12 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Property Not Found</h2>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.push("/success-stories")}
            className="px-6 py-3 bg-luxury-blue hover:bg-luxury-blue/90 text-white font-semibold rounded-lg transition-colors"
          >
            Back to Success Stories
          </button>
        </div>
      </div>
      <Footer />
      </>
    );
  }

  const currentImage =
    property.images?.[activeImageIndex]?.thumbnail_large_url ||
    property.images?.[activeImageIndex]?.s3_url;

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        {/* Back Button */}
        <button
          onClick={() => router.push("/success-stories")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Success Stories</span>
        </button>

        {/* SOLD Badge & Title */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-2 text-sm font-bold uppercase tracking-wider bg-green-600 text-white rounded-lg">
              SOLD
            </span>
            <span className="text-gray-600">
              Sold on{" "}
              {new Date(property.sold_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-gray-900">
            {property.title}
          </h1>
          <p className="text-gray-600 text-lg">
            {property.street_address}, {property.city}, {property.state}{" "}
            {property.zipcode}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            {currentImage ? (
              <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden mb-4">
                <Image
                  src={currentImage}
                  alt={property.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="h-96 lg:h-[600px] bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <svg
                  className="w-24 h-24 text-gray-300"
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

            {/* Image Thumbnails */}
            {property.images && property.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {property.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === activeImageIndex
                        ? "border-luxury-blue"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image.thumbnail_large_url || image.s3_url}
                      alt={`${property.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            {property.description && (
              <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-3 text-gray-900">About This Property</h2>
                <p className="text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
                Sale Information
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="text-sm text-green-700 mb-2">Sold Price</p>
                <p className="text-4xl font-bold text-green-600">
                  ${property.sold_price.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Property Features */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
                Property Features
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {property.bedrooms > 0 && (
                  <div className="text-center bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-2xl font-bold text-gray-900">{property.bedrooms}</p>
                    <p className="text-xs text-gray-600">Bedrooms</p>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="text-center bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-2xl font-bold text-gray-900">{property.bathrooms}</p>
                    <p className="text-xs text-gray-600">Bathrooms</p>
                  </div>
                )}
                {property.square_feet > 0 && (
                  <div className="text-center bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-2xl font-bold text-gray-900">
                      {property.square_feet.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600">Sq Ft</p>
                  </div>
                )}
                {property.year_built > 0 && (
                  <div className="text-center bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-2xl font-bold text-gray-900">{property.year_built}</p>
                    <p className="text-xs text-gray-600">Year Built</p>
                  </div>
                )}
                {property.lot_size > 0 && (
                  <div className="text-center bg-gray-50 rounded-lg p-3 border border-gray-200 col-span-2">
                    <p className="text-2xl font-bold text-gray-900">
                      {property.lot_size.toLocaleString()} {property.lot_size_unit}
                    </p>
                    <p className="text-xs text-gray-600">Lot Size</p>
                  </div>
                )}
              </div>
            </div>

            {/* Property Type */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
                Property Type
              </h3>
              <p className="text-xl font-bold capitalize text-gray-900">
                {property.property_type.replace(/_/g, " ")}
              </p>
            </div>

            {/* Agent Information */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
                Sold By
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {property.contact_name}
                  </p>
                </div>
                {property.contact_email && (
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href={`mailto:${property.contact_email}`}
                      className="text-sm text-gray-600 hover:text-luxury-blue transition-colors"
                    >
                      {property.contact_email}
                    </a>
                  </div>
                )}
                {property.contact_phone && (
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <a
                      href={`tel:${property.contact_phone}`}
                      className="text-sm text-gray-600 hover:text-luxury-blue transition-colors"
                    >
                      {property.contact_phone}
                    </a>
                  </div>
                )}

                {/* Contact CTA */}
                <a
                  href={`mailto:${property.contact_email}`}
                  className="block w-full mt-4 px-4 py-3 bg-luxury-blue hover:bg-luxury-blue/90 text-white text-center font-semibold rounded-lg transition-colors"
                >
                  Contact Agent
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
    </>
  );
}
