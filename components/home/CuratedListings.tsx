"use client";

import { ArrowUpRight } from "lucide-react";
import type React from "react";

interface PropertyListing {
  id: number;
  price: string;
  beds: string | number;
  baths: string | number;
  halfBaths?: string | number;
  sqft?: string | number;
  status: string;
  image: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  href: string;
}

const CuratedListings: React.FC = () => {

  const propertyListings: PropertyListing[] = [
    {
      id: 1,
      price: "$1,500,000",
      beds: 5,
      baths: 4,
      sqft: 3640,
      status: "FOR SALE",
      image:
        "https://fourcorner-property-images.s3.us-east-1.amazonaws.com/property-listings/0a56bf4f-4e3c-4a72-abef-59d4367d5259/1760402018832-d8615b97b0a8ac74-eeded322f67a9d8b31ce7173568b6df0-uncropped_scaled_.webp",
      address: "96 Old Coach Road",
      city: "Killington",
      state: "VT",
      zip: "05751",
      href: "/listings/46d89c99-e500-4722-a6f1-a04535d2288b",
    },
    {
      id: 2,
      price: "$749,990",
      beds: 2,
      baths: 2,
      status: "FOR SALE",
      image:
        "https://fourcorner-property-images.s3.us-east-1.amazonaws.com/property-listings/0a56bf4f-4e3c-4a72-abef-59d4367d5259/1760402321216-bda68873e87ad394-15f942a64c1387e9071f40b44a285f49-uncropped_scaled_.webp",
      address: "22 old Route 4",
      city: "Killington",
      state: "VT",
      zip: "05751",
      href: "/listings/c7b99554-e2e0-4744-8c20-ff7854866cfb",
    },
    {
      id: 3,
      price: "$479,000",
      beds: 2,
      baths: 1,
      status: "FOR SALE",
      image:
        "https://fourcorner-property-images.s3.us-east-1.amazonaws.com/property-listings/0a56bf4f-4e3c-4a72-abef-59d4367d5259/1760402735059-9464f70797cc576f-754f2451f2598415867095f3747108aa-uncropped_scaled_-thumb-lg.webp",
      address: "1376 Shaftsbury Hollow Road",
      city: "Shaftsbury",
      state: "VT",
      zip: "05262",
      href: "/listings/645377d4-d332-45d5-adb5-d63bbb165647",
    },
    {
      id: 4,
      price: "$235,000",
      beds: 3,
      baths: 1,
      sqft: 1010,
      status: "FOR SALE",
      image:
        "https://fourcorner-property-images.s3.us-east-1.amazonaws.com/property-listings/0a56bf4f-4e3c-4a72-abef-59d4367d5259/1760403184231-07ed183274e0d48c-735fafa15b1ec1650e6a370f76e3a739-uncropped_scaled_-thumb-lg.webp",
      address: "4120 Middle Road",
      city: "Clarendon",
      state: "VT",
      zip: "05759",
      href: "/listings/b4f9ff9f-6190-4530-913c-e22164eee960",
    },
    {
      id: 5,
      price: "$105,000",
      beds: "N/A",
      baths: "N/A",
      sqft: "N/A",
      status: "FOR SALE",
      image:
        "https://fourcorner-property-images.s3.us-east-1.amazonaws.com/property-listings/0a56bf4f-4e3c-4a72-abef-59d4367d5259/1760405404463-ee86a5e2d23811f5-9390b31c71385745a1224bde7c3010c9-uncropped_scaled_.webp",
      address: "236-240 Grandview Street",
      city: "Bennington",
      state: "VT",
      zip: "05201",
      href: "/listings/7dfeb12c-e915-4d26-ada6-2ac6efa7ddcc",
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12">
          <p className="text-xs sm:text-sm font-semibold text-gray-500 tracking-widest uppercase mb-4">
            FIND A HOME
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#21266c] mb-2">
            Home Listings in Your Area
          </h2>
          <p className="text-base text-gray-600">Vermont</p>
        </div>

        {/* Grid Layout - All Properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {propertyListings.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* View More Houses Button */}
        <div className="text-center">
          <a
            href="/listings"
            className="inline-flex items-center rounded-md gap-2 px-8 py-3 bg-[#21266c] text-white font-medium text-sm tracking-wide uppercase transition-all duration-300 group"
          >
            VIEW MORE HOUSES
            <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes wordAppear {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
            filter: blur(22px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }

        .animate-word-appear {
          animation: wordAppear 0.6s ease-out both;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out both;
        }
      `}</style>
    </section>
  );
};

// Property Card Component
const PropertyCard: React.FC<{ property: PropertyListing }> = ({
  property,
}) => {
  const bathsText = property.halfBaths
    ? `${property.baths} baths • ${property.halfBaths} half baths`
    : `${property.baths} baths`;

  const sqftText = property.sqft ? `${property.sqft.toLocaleString()} sqft` : '';

  return (
    <a
      href={property.href}
      className="block bg-white p-2 border-t border-gray-200 cursor-pointer transition-all duration-300 hover:bg-gray-50 group"
    >
      {/* Price and Status */}
      <div className="flex items-center justify-between pt-6 pb-4">
        <h3 className="text-2xl sm:text-3xl font-normal text-[#21266c]">
          {property.price}
        </h3>
        <span className="text-xs font-semibold text-gray-900 tracking-wide uppercase">
          {property.status}
        </span>
      </div>

      {/* Property Details */}
      <div className="pb-4">
        <p className="text-sm text-gray-600">
          {property.beds} beds • {bathsText}
          {sqftText && ` • ${sqftText}`}
        </p>
      </div>

      {/* Property Image */}
      <div className="relative aspect-[4/3] overflow-hidden mb-4">
        <img
          src={property.image}
          alt={property.address}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Address */}
      <div className="pb-6">
        <h4 className="text-base font-normal text-gray-900 hover:underline mb-1">
          {property.address}
        </h4>
        <p className="text-sm text-gray-600">
          {property.city}, {property.state} {property.zip}
        </p>
      </div>
    </a>
  );
};

export default CuratedListings;
