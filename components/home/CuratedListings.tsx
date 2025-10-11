"use client";

import { ArrowUpRight } from "lucide-react";
import type React from "react";

interface PropertyListing {
  id: number;
  price: string;
  beds: number;
  baths: number;
  halfBaths?: number;
  sqft?: number;
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
      price: "$734,999",
      beds: 4,
      baths: 1,
      halfBaths: 1,
      sqft: 1384,
      status: "FOR SALE",
      image:
        "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760173041/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash_zifosb.jpg",
      address: "637 W 105th Street",
      city: "Los Angeles",
      state: "CA",
      zip: "90044",
      href: "/property/1",
    },
    {
      id: 2,
      price: "$850,000",
      beds: 2,
      baths: 1,
      status: "FOR SALE",
      image:
        "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760173039/scott-webb-1ddol8rgUH8-unsplash_d9xtla.jpg",
      address: "4216 Berenice",
      city: "Los Angeles",
      state: "CA",
      zip: "90031",
      href: "/property/2",
    },
    {
      id: 3,
      price: "$749,900",
      beds: 3,
      baths: 2,
      status: "FOR SALE",
      image:
        "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760173040/stephan-bechert-yFV39g6AZ5o-unsplash_t8ho4k.jpg",
      address: "1434 W 92nd St",
      city: "Los Angeles",
      state: "CA",
      zip: "90047",
      href: "/property/3",
    },
    {
      id: 4,
      price: "$895,000",
      beds: 3,
      baths: 2,
      sqft: 1500,
      status: "FOR SALE",
      image:
        "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760173041/todd-kent-178j8tJrNlc-unsplash_txkfnv.jpg",
      address: "290 Barts Hill Rd",
      city: "Los Angeles",
      state: "CA",
      zip: "90048",
      href: "/property/4",
    },
    {
      id: 5,
      price: "$1,200,000",
      beds: 4,
      baths: 3,
      sqft: 2200,
      status: "FOR SALE",
      image:
        "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760173042/i-do-nothing-but-love-txDT94Mqs8k-unsplash_htp3ip.jpg",
      address: "107 Top Ridge",
      city: "Los Angeles",
      state: "CA",
      zip: "90049",
      href: "/property/5",
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
          <p className="text-base text-gray-600">Los Angeles, CA</p>
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
