"use client";

import {
  Map,
  Droplets,
  Mountain,
  Trees,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Search,
  Layers,
  MapPin,
  Info,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function ANRMapsPage() {
  const mapLayers = [
    {
      icon: Droplets,
      title: "Water Resources",
      description: "Streams, rivers, lakes, wetlands, and floodplains",
      uses: [
        "Identify wetlands on or near property",
        "Check flood zone designations (FEMA maps)",
        "Locate water bodies and stream buffers",
        "View watershed boundaries",
      ],
    },
    {
      icon: Mountain,
      title: "Topography & Elevation",
      description: "Contour lines, slopes, and elevation data",
      uses: [
        "Assess building site suitability",
        "Identify steep slopes (>25%)",
        "Plan septic system locations",
        "Evaluate drainage patterns",
      ],
    },
    {
      icon: Trees,
      title: "Natural Resources",
      description: "Forests, wildlife habitat, and conservation lands",
      uses: [
        "Identify state forests and parks",
        "View conservation easements",
        "Check deer wintering areas",
        "Review rare species habitat",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Environmental Constraints",
      description: "River corridors, hazard areas, and protected lands",
      uses: [
        "Check river corridor protections",
        "View Act 250 jurisdiction areas",
        "Identify hazardous waste sites",
        "Review agricultural soil ratings",
      ],
    },
  ];

  const tutorialSteps = [
    {
      step: 1,
      title: "Access the ANR Atlas",
      description:
        "Visit the Vermont Natural Resources Atlas at anr.vermont.gov/maps. The atlas is free and requires no login.",
      icon: ExternalLink,
    },
    {
      step: 2,
      title: "Enter Your Property Address",
      description:
        "Use the search bar to enter the property address or parcel number. You can also zoom and pan to locate the property visually.",
      icon: Search,
    },
    {
      step: 3,
      title: "Select Map Layers",
      description:
        'Click the "Layers" button to choose which environmental and regulatory layers to display. Start with Water Resources and Constraints.',
      icon: Layers,
    },
    {
      step: 4,
      title: "Click on Features for Details",
      description:
        "Click on any colored area (wetlands, flood zones, etc.) to view detailed information, restrictions, and regulatory requirements.",
      icon: Info,
    },
    {
      step: 5,
      title: "Print or Save Maps",
      description:
        'Use the "Print" function to create PDF maps for your records. Include a legend and scale bar for reference.',
      icon: MapPin,
    },
  ];

  const commonUseCases = [
    {
      scenario: "Buying Land for Building",
      whatToCheck: [
        "Wetlands and stream buffers (50-100 ft setbacks required)",
        "Flood zones (affects insurance and building requirements)",
        "Steep slopes (>25% unsuitable for septic systems)",
        "River corridors (severe building restrictions)",
        "Act 250 jurisdiction areas",
      ],
      whyItMatters:
        "These constraints can prevent or significantly increase the cost of building. Check before making an offer.",
    },
    {
      scenario: "Septic System Planning",
      whatToCheck: [
        "Soil types and drainage classifications",
        "Wetlands and water body setbacks",
        "Bedrock depth and seasonal high water table",
        "Slope and grade of potential sites",
      ],
      whyItMatters:
        "Vermont has strict septic regulations. Poor soil or proximity to water can make septic installation impossible or require expensive alternatives.",
    },
    {
      scenario: "Waterfront Property Purchase",
      whatToCheck: [
        "Shoreland protection zones",
        "Public trust waters vs. private ownership",
        "Erosion hazard areas",
        "Aquatic invasive species presence",
      ],
      whyItMatters:
        "Waterfront properties have additional state and local regulations. Know the restrictions before purchasing.",
    },
    {
      scenario: "Agricultural or Forest Land",
      whatToCheck: [
        "Prime agricultural soils",
        "Current Use enrollment status",
        "Forest management plans",
        "Conservation easements",
      ],
      whyItMatters:
        "Current Use enrollment and easements can significantly reduce property taxes but limit development options.",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#21266c] to-[#3b82f6] pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link
              href="/local-resources"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Local Resources
            </Link>

            {/* Page Header */}
            <div className="text-white">
              <div className="inline-block mb-4">
                <div className="w-12 h-1 bg-white mx-auto mb-4"></div>
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                  Property Research Tools
                </span>
              </div>

              <h1
                className="mt-6 text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "Coconat" }}
              >
                Vermont ANR Natural Resources Atlas
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                Your essential tool for researching environmental constraints,
                natural resources, and regulatory information on Vermont
                properties. Learn how to use the ANR Atlas to make informed real
                estate decisions.
              </p>
            </div>
          </div>
        </section>

        {/* What is the ANR Atlas Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center">
                  <Map className="w-6 h-6 text-white" />
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#21266c]"
                  style={{ fontFamily: "Coconat" }}
                >
                  What is the ANR Atlas?
                </h2>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Vermont Agency of Natural Resources (ANR) Natural Resources
                  Atlas is a free, publicly accessible online mapping tool that
                  provides comprehensive environmental and regulatory information
                  for properties throughout Vermont.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Why it's essential for real estate:</strong> Before
                  purchasing land or planning development, the ANR Atlas helps you
                  identify wetlands, flood zones, stream buffers, steep slopes,
                  conservation lands, and other environmental constraints that can
                  significantly affect property use, development potential, and
                  value.
                </p>

                <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg mb-6">
                  <p className="text-gray-800 font-medium mb-2">
                    Free Access
                  </p>
                  <p className="text-gray-700 mb-3">
                    The ANR Atlas is completely free and requires no
                    registration. Access it anytime at:
                  </p>
                  <a
                    href="https://anr.vermont.gov/maps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#21266c] text-white rounded-lg font-semibold hover:bg-[#3b82f6] transition-colors"
                  >
                    Open ANR Atlas
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Layers Section */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4"
                style={{ fontFamily: "Coconat" }}
              >
                Key Map Layers
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                The ANR Atlas includes dozens of map layers. Here are the most
                important ones for property buyers and developers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mapLayers.map((layer, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                      <layer.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {layer.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {layer.description}
                      </p>
                    </div>
                  </div>

                  <div className="pl-16">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Common Uses:
                    </p>
                    <ul className="space-y-2">
                      {layer.uses.map((use, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step-by-Step Tutorial Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center"
                style={{ fontFamily: "Coconat" }}
              >
                How to Use the ANR Atlas
              </h2>

              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Follow these steps to research environmental constraints and
                natural resources on any Vermont property.
              </p>

              <div className="space-y-6">
                {tutorialSteps.map((step) => (
                  <div
                    key={step.step}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-700">{step.description}</p>
                      </div>
                      <step.icon className="w-6 h-6 text-gray-400 flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                <p className="text-gray-800 font-medium mb-2">Pro Tip</p>
                <p className="text-gray-700">
                  Always check the ANR Atlas <strong>before making an offer</strong> on
                  vacant land or waterfront property. Environmental constraints
                  discovered after purchase can be costly surprises.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Use Cases Section */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center"
                style={{ fontFamily: "Coconat" }}
              >
                Common Use Cases
              </h2>

              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Here's what to check on the ANR Atlas based on your property
                goals.
              </p>

              <div className="space-y-8">
                {commonUseCases.map((useCase, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-200 rounded-xl p-8"
                  >
                    <h3 className="text-2xl font-bold text-[#21266c] mb-4">
                      {useCase.scenario}
                    </h3>

                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-700 mb-3">
                        What to Check:
                      </p>
                      <ul className="space-y-2">
                        {useCase.whatToCheck.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <ArrowRight className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-4 rounded-r-lg">
                      <p className="text-sm font-semibold text-[#21266c] mb-1">
                        Why It Matters
                      </p>
                      <p className="text-sm text-gray-700">
                        {useCase.whyItMatters}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Additional Resources Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center"
                style={{ fontFamily: "Coconat" }}
              >
                Related Resources
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Link
                  href="/act-250-guide"
                  className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#3b82f6] transition-colors">
                    Act 250 Guide
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Learn about Vermont's land use law and when permits are
                    required.
                  </p>
                  <div className="flex items-center text-[#3b82f6] font-semibold">
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link
                  href="/local-resources/wastewater-permits"
                  className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#3b82f6] transition-colors">
                    Wastewater Permits
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Understand Vermont septic and wastewater permit requirements.
                  </p>
                  <div className="flex items-center text-[#3b82f6] font-semibold">
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>

              <div className="bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-xl p-8 text-center text-white">
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: "Coconat" }}
                >
                  Need Help Interpreting ANR Maps?
                </h3>
                <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                  Our team can help you understand environmental constraints and
                  their impact on your property purchase or development plans.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#21266c] font-medium text-base rounded-full hover:bg-gray-100 transition-all duration-300"
                >
                  Contact Us Today
                  <ArrowRight className="w-5 h-5" />
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
