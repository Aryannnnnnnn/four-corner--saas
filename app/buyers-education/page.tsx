"use client";

import { BookOpen, Home, ClipboardCheck, FileText, ArrowRight, DollarSign } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function BuyersEducationHub() {

  const educationSections = [
    {
      id: "first-time-buyer",
      title: "First-Time Homebuyer Guide",
      description: "Navigate your home buying journey with confidence. Learn the step-by-step process from pre-approval to closing.",
      icon: Home,
      color: "from-blue-500 to-blue-600",
      href: "/buyers-education/first-time-buyer",
      topics: ["Getting Pre-Approved", "Finding Your Home", "Making an Offer", "Final Walkthrough"]
    },
    {
      id: "understanding-mortgages",
      title: "Understanding Mortgages",
      description: "Demystify mortgage types, terms, and the pre-approval process. Get the knowledge you need to secure the best loan.",
      icon: FileText,
      color: "from-[#21266c] to-[#3b82f6]",
      href: "/buyers-education/understanding-mortgages",
      topics: ["Loan Types", "Interest Rates", "Down Payments", "Pre-Approval Process"]
    },
    {
      id: "home-inspection",
      title: "Home Inspection Guide",
      description: "Know what to expect during inspections and learn to identify potential red flags that could affect your purchase.",
      icon: ClipboardCheck,
      color: "from-[#d4af37] to-[#c5a028]",
      href: "/buyers-education/home-inspection",
      topics: ["What Inspectors Check", "Red Flags", "Negotiating Repairs", "Inspection Checklist"]
    },
    {
      id: "closing-process",
      title: "The Closing Process",
      description: "Understand the final steps of buying a home, from closing costs to signing documents and receiving your keys.",
      icon: BookOpen,
      color: "from-green-500 to-green-600",
      href: "/buyers-education/closing-process",
      topics: ["Closing Timeline", "Required Documents", "Closing Costs", "Final Steps"]
    },
    {
      id: "vt-homebuyer-programs",
      title: "Vermont Homebuyer Programs",
      description: "Discover financial assistance programs including VHFA loans, down payment assistance, and grants that make homeownership more affordable.",
      icon: DollarSign,
      color: "from-purple-500 to-purple-600",
      href: "/buyers-education/vt-homebuyer-programs",
      topics: ["VHFA Programs", "Down Payment Assistance", "Income Requirements", "Education Courses"]
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-white pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="text-center mb-16 lg:mb-20">
              <div className="inline-block">
                <div className="w-12 h-1 bg-[#21266c] mx-auto mb-4"></div>
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-[0.2em]">
                  Education Center
                </span>
              </div>

              <h1
                className="mt-6 text-[#21266c] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight"
                style={{ fontFamily: "Coconat" }}
              >
                Buyer's Education Center
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Everything you need to know about buying a home in Vermont. From first-time buyer tips to understanding mortgages and inspections.
              </p>
            </div>

            {/* Education Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {educationSections.map((section) => (
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

                      {/* Topics List */}
                      <ul className="space-y-2 mb-6">
                        {section.topics.map((topic, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mr-3"></div>
                            {topic}
                          </li>
                        ))}
                      </ul>

                      {/* Learn More Link */}
                      <div className="flex items-center text-[#3b82f6] font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
                        <span>Learn More</span>
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
                Ready to Start Your Home Buying Journey?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Our experienced team is here to guide you every step of the way. Get in touch for personalized assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => (window.location.href = "/contact")}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#21266c] font-medium text-base rounded-full hover:bg-gray-100 transition-all duration-300"
                >
                  CONTACT US
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => (window.location.href = "/calculators")}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-medium text-base rounded-full hover:bg-white hover:text-[#21266c] transition-all duration-300"
                >
                  USE CALCULATORS
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
