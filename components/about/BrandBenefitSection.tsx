"use client";

import { ArrowRight, TrendingUp, Target, BarChart3, Zap } from "lucide-react";
import Link from "next/link";

export default function BrandBenefitSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Instant Decode Section */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div className="space-y-6">
              <div className="inline-block">
              </div>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl text-[#21266c] leading-tight"
                style={{ fontFamily: "Coconat" }}
              >
                Instant Decode Any Property
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our AI analyzes location quality, comparables, and market movement to give you a transparent, data-backed property report.
              </p>

              {/* Key Features List */}
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#21266c]/10 rounded-lg flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-[#21266c]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Market Analysis</h3>
                    <p className="text-sm text-gray-600">AI-powered insights on location quality and market movement</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#21266c]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-[#21266c]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Accurate Valuation</h3>
                    <p className="text-sm text-gray-600">Data-backed property reports with comparable analysis</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#21266c]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-[#21266c]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Instant Results</h3>
                    <p className="text-sm text-gray-600">Get your property analysis in seconds, not days</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/analyze-your-property"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-[#21266c] border-2 border-[#21266c] text-white font-medium text-base rounded-full transition-all duration-300"
                >
                  ANALYZE PROPERTY
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dklhvv6mc/image/upload/v1760103266/68afe75043f22ac1dc01fa9d-Untitled-design-7_dr8s7i.png"
                  alt="Property Analysis"
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "4/3" }}
                />
                {/* Overlay Badge */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#21266c]" />
                    <span className="text-sm font-semibold text-[#21266c]">AI-Powered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sell Your Property Section - Split Layout */}
        <div className="bg-[#21266c] rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Content */}
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
              <p className="text-xs sm:text-sm font-semibold text-white/70 tracking-widest uppercase mb-4">
                LIST WITH US
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6"
                style={{ fontFamily: "Coconat" }}
              >
                Sell Your Property With Confidence
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8">
                Sell your home faster with Four Corner Properties, trusted real estate experts offering professional property valuation, strategic marketing, and nationwide exposure for premium results.
              </p>
              <div>
                <Link
                  href="/list-property"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#21266c] font-medium text-base rounded-full hover:bg-white/90 transition-all duration-300"
                >
                  LIST WITH US
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative h-64 lg:h-auto">
              <img
                src="https://res.cloudinary.com/dklhvv6mc/image/upload/v1760103343/68afe5de92b348d581323a93-Untitled-design-4_hopcuy.png"
                alt="Sell Property"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#21266c] to-transparent opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
