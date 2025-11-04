"use client";

import { ArrowLeft, ArrowRight, CheckCircle2, Home, DollarSign, Search, FileText, Key, ClipboardCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function FirstTimeBuyerGuide() {
  const steps = [
    {
      number: 1,
      title: "Get Pre-Approved for a Mortgage",
      icon: FileText,
      description: "Before you start house hunting, get pre-approved for a mortgage. This shows sellers you're serious and helps you understand your budget.",
      details: [
        "Gather financial documents (pay stubs, tax returns, bank statements)",
        "Check your credit score and address any issues",
        "Compare lenders and mortgage rates",
        "Get a pre-approval letter showing your maximum loan amount"
      ],
      tip: "Getting pre-approved in Vermont typically takes 1-3 days and is free with most lenders."
    },
    {
      number: 2,
      title: "Find a Real Estate Agent",
      icon: Home,
      description: "A knowledgeable local agent can guide you through Vermont's unique market and help you find the perfect home.",
      details: [
        "Look for agents experienced in Vermont real estate",
        "Interview multiple agents to find the right fit",
        "Discuss your needs, budget, and preferred locations",
        "Understand the agent's role and commission structure"
      ],
      tip: "Buyer's agents are typically paid by the seller, so their service is free to you."
    },
    {
      number: 3,
      title: "Start House Hunting",
      icon: Search,
      description: "With your pre-approval and agent in place, begin searching for homes that meet your needs and budget.",
      details: [
        "Create a list of must-haves and nice-to-haves",
        "Consider Vermont-specific factors (heating costs, snow removal, well/septic)",
        "Attend open houses and schedule private showings",
        "Take notes and photos to remember each property"
      ],
      tip: "Vermont's housing market can be competitive in popular areas. Be prepared to act quickly on properties you love."
    },
    {
      number: 4,
      title: "Make an Offer",
      icon: DollarSign,
      description: "When you find the right home, work with your agent to craft a competitive offer.",
      details: [
        "Research comparable home sales in the area",
        "Determine your offer price and terms",
        "Include contingencies (inspection, appraisal, financing)",
        "Submit your offer with earnest money deposit"
      ],
      tip: "In Vermont, earnest money is typically 1-2% of the purchase price and shows your commitment to the purchase."
    },
    {
      number: 5,
      title: "Complete Inspections and Due Diligence",
      icon: ClipboardCheck,
      description: "Once your offer is accepted, conduct thorough inspections to understand the property's condition.",
      details: [
        "Hire a qualified home inspector",
        "Consider specialized inspections (radon, well water, septic)",
        "Review inspection reports carefully",
        "Negotiate repairs or credits with the seller if needed"
      ],
      tip: "Vermont homes often have unique features like oil tanks, well systems, and older construction that require special attention during inspection."
    },
    {
      number: 6,
      title: "Close on Your Home",
      icon: Key,
      description: "The final step! Review documents, sign paperwork, and receive the keys to your new Vermont home.",
      details: [
        "Review closing disclosure at least 3 days before closing",
        "Arrange homeowners insurance",
        "Complete final walkthrough",
        "Bring government-issued ID and certified funds for closing costs"
      ],
      tip: "Closing costs in Vermont typically range from 2-5% of the purchase price. Budget accordingly!"
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#21266c] to-[#3b82f6] pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link href="/buyers-education" className="inline-flex items-center gap-2 text-white hover:text-blue-100 transition-colors mb-8">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Education Center</span>
            </Link>

            {/* Page Header */}
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
                First-Time Homebuyer Guide
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                Your complete step-by-step guide to buying your first home in Vermont. Navigate the process with confidence from pre-approval to closing.
              </p>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Introduction */}
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-6" style={{ fontFamily: "Coconat" }}>
                The 6-Step Path to Homeownership
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Buying your first home is an exciting journey. While the process may seem overwhelming at first, breaking it down into these six key steps makes it manageable and helps you understand what to expect at each stage.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-2xl p-8 sm:p-10 hover:border-[#3b82f6] transition-colors">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Step Number and Icon */}
                    <div className="flex-shrink-0">
                      <div className="flex items-center gap-4 lg:flex-col lg:items-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center text-white text-2xl font-bold">
                          {step.number}
                        </div>
                        <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center lg:mt-4">
                          <step.icon className="w-7 h-7 text-[#21266c]" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#21266c] mb-4">
                        {step.title}
                      </h3>
                      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Details List */}
                      <ul className="space-y-3 mb-6">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tip */}
                      <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-4 rounded-r-lg">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0">
                            <div className="w-6 h-6 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-xs font-bold">
                              i
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#21266c] mb-1">Vermont Tip</p>
                            <p className="text-sm text-gray-700">{step.tip}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Continue Your Education
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore more resources to help you make informed decisions throughout your home buying journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/buyers-education/understanding-mortgages">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all cursor-pointer h-full">
                  <FileText className="w-10 h-10 text-[#3b82f6] mb-4" />
                  <h3 className="text-xl font-bold text-[#21266c] mb-2">Understanding Mortgages</h3>
                  <p className="text-gray-600 text-sm mb-4">Learn about loan types, interest rates, and the pre-approval process.</p>
                  <div className="flex items-center text-[#3b82f6] font-semibold text-sm">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>

              <Link href="/buyers-education/home-inspection">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all cursor-pointer h-full">
                  <ClipboardCheck className="w-10 h-10 text-[#3b82f6] mb-4" />
                  <h3 className="text-xl font-bold text-[#21266c] mb-2">Home Inspection Guide</h3>
                  <p className="text-gray-600 text-sm mb-4">Know what to expect and identify potential red flags during inspections.</p>
                  <div className="flex items-center text-[#3b82f6] font-semibold text-sm">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>

              <Link href="/buyers-education/closing-process">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all cursor-pointer h-full">
                  <Key className="w-10 h-10 text-[#3b82f6] mb-4" />
                  <h3 className="text-xl font-bold text-[#21266c] mb-2">Closing Process</h3>
                  <p className="text-gray-600 text-sm mb-4">Understand the timeline, costs, and final steps to homeownership.</p>
                  <div className="flex items-center text-[#3b82f6] font-semibold text-sm">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-2xl p-8 sm:p-12 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "Coconat" }}>
                Ready to Start Your Home Search?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Our experienced team is here to guide you through every step of the home buying process. Let's find your perfect Vermont home together.
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
