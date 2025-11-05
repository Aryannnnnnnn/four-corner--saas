"use client";

import React from "react";
import { ArrowLeft, Home, FileText, CheckCircle, Calendar, DollarSign, AlertCircle, TrendingUp, Camera, Ruler, ClipboardCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function AppraisalProcessPage() {
  const appraisalSteps = [
    {
      title: "Lender Orders Appraisal",
      icon: <FileText className="w-6 h-6 text-white" />,
      description: "Once your offer is accepted and you apply for a mortgage, your lender orders the appraisal",
      timeline: "Within 1-3 days of loan application",
      details: [
        "Lender selects licensed appraiser from approved list",
        "You pay appraisal fee upfront ($400-$600 in Vermont)",
        "Appraiser is independent - works for lender, not buyer or seller",
        "Usually takes 3-7 days to schedule the inspection"
      ]
    },
    {
      title: "Appraiser Inspects Property",
      icon: <Home className="w-6 h-6 text-white" />,
      description: "Licensed appraiser visits the property to assess condition and take measurements",
      timeline: "30-60 minutes onsite",
      details: [
        "Measures square footage and room dimensions",
        "Photographs interior and exterior",
        "Notes condition, upgrades, and any issues",
        "Reviews property features (bedrooms, bathrooms, garage, etc.)",
        "Checks for safety hazards or structural concerns"
      ]
    },
    {
      title: "Research & Analysis",
      icon: <ClipboardCheck className="w-6 h-6 text-white" />,
      description: "Appraiser researches comparable sales and analyzes market data",
      timeline: "3-5 days",
      details: [
        "Identifies 3-6 comparable sales (comps) within 1 mile if possible",
        "Comps should be similar size, age, condition, and sold within 3-6 months",
        "Adjusts comp values for differences (finished basement, extra garage, etc.)",
        "Reviews local market trends and neighborhood data",
        "Considers Vermont-specific factors (well, septic, land size)"
      ]
    },
    {
      title: "Appraisal Report Delivered",
      icon: <FileText className="w-6 h-6 text-white" />,
      description: "Appraiser delivers detailed report to lender with final valuation",
      timeline: "5-10 days from inspection",
      details: [
        "Report includes property description, photos, and floor plan sketch",
        "Lists comparable sales with adjustments explained",
        "Final appraised value stated clearly",
        "Lender reviews report for accuracy and compliance",
        "You receive copy of report (you paid for it!)"
      ]
    }
  ];

  const appraisalFactors = [
    {
      icon: <Ruler className="w-6 h-6 text-blue-600" />,
      title: "Size & Layout",
      description: "Square footage, number of bedrooms/bathrooms, and functional layout"
    },
    {
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      title: "Age & Condition",
      description: "Year built, recent updates, overall maintenance, and remaining useful life"
    },
    {
      icon: <Home className="w-6 h-6 text-blue-600" />,
      title: "Location",
      description: "Neighborhood desirability, school district, proximity to amenities"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      title: "Market Trends",
      description: "Recent sales activity, inventory levels, and price direction in the area"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
      title: "Upgrades & Features",
      description: "Kitchen/bath updates, finished basement, garage, deck, energy efficiency"
    },
    {
      icon: <Camera className="w-6 h-6 text-blue-600" />,
      title: "Curb Appeal",
      description: "Exterior appearance, landscaping, and first impression impact"
    }
  ];

  const appraisalOutcomes = [
    {
      outcome: "Appraisal = Purchase Price",
      color: "green",
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      description: "Best case scenario - transaction proceeds as planned",
      whatHappens: [
        "Your loan is approved based on agreed purchase price",
        "Closing proceeds on schedule",
        "No additional negotiations needed"
      ]
    },
    {
      outcome: "Appraisal > Purchase Price",
      color: "blue",
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      description: "Great news - you're getting a good deal",
      whatHappens: [
        "Lender uses purchase price (not higher appraisal) for loan",
        "You're building instant equity",
        "Transaction proceeds smoothly"
      ]
    },
    {
      outcome: "Appraisal < Purchase Price",
      color: "red",
      icon: <AlertCircle className="w-6 h-6 text-red-600" />,
      description: "Low appraisal - requires negotiation and problem-solving",
      whatHappens: [
        "Lender will only loan based on lower appraised value",
        "You'll need more cash for down payment to cover gap",
        "OR negotiate with seller to lower purchase price",
        "OR request second appraisal (rare, requires evidence of error)",
        "OR walk away if you have appraisal contingency"
      ]
    }
  ];

  const vermontSpecific = [
    "Rural properties often have wider comp radius (3-5 miles) due to fewer sales",
    "Well and septic systems are carefully noted and can affect value",
    "Older homes (pre-1900) are common - age alone doesn't hurt value if well-maintained",
    "Seasonal access issues (dirt roads, steep driveways) may be noted but rarely impact value significantly",
    "Energy efficiency features (new windows, insulation, heat pumps) increasingly valued",
    "Vermont appraisers understand local building styles (cape, colonial, farmhouse)",
    "Land size matters more in Vermont than most states - extra acreage adds value"
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#21266c] to-[#3b82f6] pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/buyers-education" className="inline-flex items-center gap-2 text-white hover:text-blue-100 transition-colors mb-8">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Buyer Resources</span>
            </Link>

            <div className="text-white">
              <div className="inline-block mb-4">
                <div className="w-12 h-1 bg-white mb-4"></div>
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                  Buyer's Guide
                </span>
              </div>

              <h1
                className="mt-6 text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "Coconat" }}
              >
                Understanding the Appraisal Process
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                Learn what happens during a home appraisal, why it matters for your mortgage, and how to prepare for different appraisal outcomes when buying a home in Vermont.
              </p>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-6" style={{ fontFamily: "Coconat" }}>
                What Is a Home Appraisal?
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  A home appraisal is an unbiased professional opinion of a home's value, conducted by a licensed appraiser. When you're buying a home with a mortgage, your lender requires an appraisal to ensure the property is worth the amount they're lending you.
                </p>
                <p>
                  <span className="font-semibold text-[#21266c]">Important:</span> The appraisal protects both you and the lender. It prevents you from overpaying and ensures the lender isn't loaning more than the property is worth. In Vermont, appraisals typically cost $400-$600 and take 7-10 days from order to delivery.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <DollarSign className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="font-semibold text-[#21266c] mb-2 text-lg">Typical Cost</h3>
                <p className="text-3xl font-bold text-[#3b82f6] mb-2">$400-$600</p>
                <p className="text-sm text-gray-600">Paid by buyer at loan application</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
                <Calendar className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="font-semibold text-purple-900 mb-2 text-lg">Timeline</h3>
                <p className="text-3xl font-bold text-purple-600 mb-2">7-10 days</p>
                <p className="text-sm text-gray-600">From order to final report</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                <CheckCircle className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="font-semibold text-green-900 mb-2 text-lg">Purpose</h3>
                <p className="text-lg font-bold text-green-600 mb-2">Protect All Parties</p>
                <p className="text-sm text-gray-600">Ensures fair market value</p>
              </div>
            </div>
          </div>
        </section>

        {/* Appraisal Steps */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-12 text-center" style={{ fontFamily: "Coconat" }}>
              The Appraisal Process: Step by Step
            </h2>
            <div className="space-y-8">
              {appraisalSteps.map((step, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-full flex items-center justify-center">
                        {step.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-[#21266c] mb-2">
                            Step {index + 1}: {step.title}
                          </h3>
                          <p className="text-gray-700 text-lg mb-2">{step.description}</p>
                          <p className="text-sm font-semibold text-blue-600 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {step.timeline}
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-700">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Appraisers Look At */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-12 text-center" style={{ fontFamily: "Coconat" }}>
              What Appraisers Evaluate
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appraisalFactors.map((factor, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-colors">
                  <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    {factor.icon}
                  </div>
                  <h3 className="font-bold text-[#21266c] text-lg mb-2">{factor.title}</h3>
                  <p className="text-gray-700">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Possible Outcomes */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-12 text-center" style={{ fontFamily: "Coconat" }}>
              Possible Appraisal Outcomes
            </h2>
            <div className="space-y-6">
              {appraisalOutcomes.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 bg-${item.color}-100 rounded-full flex items-center justify-center`}>
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-2xl font-bold text-${item.color}-900 mb-2`}>
                        {item.outcome}
                      </h3>
                      <p className="text-gray-700 text-lg mb-4">{item.description}</p>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">What Happens Next:</h4>
                        <ul className="space-y-2">
                          {item.whatHappens.map((action, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vermont-Specific Considerations */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8 md:p-12 border-2 border-green-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-green-600 p-4 rounded-xl">
                  <Home className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="font-coconat text-3xl font-bold text-gray-900">
                    Vermont Appraisal Considerations
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Unique factors that Vermont appraisers consider
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {vermontSpecific.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center border-2 border-gray-200">
              <h2 className="font-coconat text-3xl font-bold text-gray-900 mb-4">
                Questions About the Appraisal Process?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Understanding appraisals helps you prepare for different outcomes and avoid surprises. Let's discuss your specific situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-[#21266c] to-[#3b82f6] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-shadow inline-flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Get Expert Guidance
                </Link>
                <Link
                  href="/buyers-education"
                  className="bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  More Buyer Resources
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
