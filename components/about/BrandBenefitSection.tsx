"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BrandBenefitSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Our brand. Your benefit. Section */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-0.5 bg-blue-600 mx-auto mb-8"></div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 mb-6">
              Instant Decode Any Property
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
              Our AI analyzes location quality, comparables, and market movement to give you a transparent, data-backed property report.
            </p>
            <Link
              href="/dashboard"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gray-900 text-gray-900 font-medium text-sm tracking-wide uppercase hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              ANALYZE PROPERTY
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Sell Your Property With Confidence Section */}
        <div className="bg-white py-16 sm:py-20 lg:py-24 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs sm:text-sm font-semibold text-gray-500 tracking-widest uppercase mb-4">
              LIST WITH US
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 mb-6">
              Sell Your Property With Confidence
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
              Sell your home faster with Four Corner Properties, trusted real estate experts offering professional property valuation, strategic marketing, and nationwide exposure for premium results.
            </p>
            <Link
              href="/list-property"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-medium text-sm tracking-wide uppercase hover:bg-gray-800 transition-all duration-300"
            >
              LIST WITH US
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
