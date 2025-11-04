"use client";

import { School, Plug, Trees, Bus, Building2, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function LocalResourcesHub() {

  const resourceSections = [
    {
      id: "schools-education",
      title: "Schools & Education",
      description: "Explore Franklin County school districts, colleges, and educational resources. Find the perfect learning environment for your family.",
      icon: School,
      color: "from-blue-500 to-blue-600",
      href: "/local-resources/schools-education",
      highlights: ["School Districts", "Higher Education", "Public Libraries", "Performance Ratings"]
    },
    {
      id: "utilities-services",
      title: "Utilities & Services",
      description: "Essential service providers for your Vermont home. Connect electricity, internet, water, and more with local providers.",
      icon: Plug,
      color: "from-[#21266c] to-[#3b82f6]",
      href: "/local-resources/utilities-services",
      highlights: ["Electric & Gas", "Internet Providers", "Water & Sewer", "Waste Management"]
    },
    {
      id: "community-amenities",
      title: "Community & Amenities",
      description: "Discover parks, healthcare, shopping, dining, and recreational activities throughout Franklin County.",
      icon: Trees,
      color: "from-green-500 to-green-600",
      href: "/local-resources/community-amenities",
      highlights: ["Parks & Recreation", "Healthcare", "Shopping & Dining", "Community Events"]
    },
    {
      id: "transportation",
      title: "Transportation",
      description: "Navigate Franklin County with ease. Learn about major roads, public transit, airports, and commute times.",
      icon: Bus,
      color: "from-[#d4af37] to-[#c5a028]",
      href: "/local-resources/transportation",
      highlights: ["Major Highways", "Public Transit", "Airports", "Bike Trails"]
    },
    {
      id: "local-government",
      title: "Local Government",
      description: "Access town offices, permits, zoning information, and county services. Everything you need for civic engagement.",
      icon: Building2,
      color: "from-purple-500 to-purple-600",
      href: "/local-resources/local-government",
      highlights: ["Town Offices", "Permits & Zoning", "Property Taxes", "County Services"]
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#21266c] to-[#3b82f6] pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="text-white text-center">
              <div className="inline-block mb-4">
                <div className="w-12 h-1 bg-white mx-auto mb-4"></div>
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                  Local Information
                </span>
              </div>

              <h1
                className="mt-6 text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "Coconat" }}
              >
                Vermont Local Resources
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Everything you need to know about living in Franklin County, Vermont. From schools and utilities to community amenities and local government.
              </p>
            </div>
          </div>
        </section>

        {/* Resource Cards Grid */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {resourceSections.map((section) => (
                <div key={section.id}>
                  <Link href={section.href}>
                    <div className="group h-full bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#3b82f6] hover:shadow-xl transition-all duration-300 cursor-pointer">
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <section.icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-[#21266c] mb-4 group-hover:text-[#3b82f6] transition-colors">
                        {section.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {section.description}
                      </p>

                      {/* Highlights List */}
                      <ul className="space-y-2 mb-6">
                        {section.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mr-3"></div>
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      {/* Learn More Link */}
                      <div className="flex items-center text-[#3b82f6] font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
                        <span>Explore Resources</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-2xl p-8 sm:p-12 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "Coconat" }}>
                Ready to Call Vermont Home?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Our team knows Franklin County inside and out. Let us help you find the perfect community for your lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#21266c] font-medium text-base rounded-full hover:bg-gray-100 transition-all duration-300"
                >
                  CONTACT US
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/calculators"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-medium text-base rounded-full hover:bg-white hover:text-[#21266c] transition-all duration-300"
                >
                  USE CALCULATORS
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
