"use client";

import { ArrowLeft, ArrowRight, DollarSign, FileText, CheckCircle2, AlertCircle, Key, Home, Shield } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function ClosingProcess() {
  const timeline = [
    {
      phase: "Offer Acceptance to Contract",
      timeframe: "Days 1-3",
      icon: FileText,
      tasks: [
        "Purchase agreement signed by both parties",
        "Earnest money deposit submitted to escrow",
        "Contingency periods begin",
        "Title search initiated"
      ],
      tip: "Review your purchase agreement carefully and ensure you understand all contingencies and deadlines."
    },
    {
      phase: "Due Diligence Period",
      timeframe: "Days 3-17",
      icon: Home,
      tasks: [
        "Home inspection completed",
        "Appraisal ordered and completed",
        "Review all inspection reports",
        "Negotiate repairs or credits if needed",
        "Finalize mortgage application"
      ],
      tip: "Most contingencies must be satisfied or waived during this period. Stay proactive and meet all deadlines."
    },
    {
      phase: "Mortgage Processing",
      timeframe: "Days 7-30",
      icon: Shield,
      tasks: [
        "Submit additional documentation to lender",
        "Underwriter reviews loan application",
        "Appraisal reviewed by lender",
        "Loan approval received",
        "Clear to close issued"
      ],
      tip: "Avoid making major purchases or changes to your credit during this period. It can affect your loan approval."
    },
    {
      phase: "Final Preparations",
      timeframe: "Days 30-40",
      icon: CheckCircle2,
      tasks: [
        "Review closing disclosure (3 days before closing)",
        "Arrange homeowners insurance",
        "Schedule final walkthrough",
        "Prepare certified funds for closing",
        "Coordinate with title company"
      ],
      tip: "The closing disclosure must be provided at least 3 business days before closing. Review it carefully for accuracy."
    },
    {
      phase: "Closing Day",
      timeframe: "Day 40-45",
      icon: Key,
      tasks: [
        "Complete final walkthrough",
        "Sign closing documents",
        "Pay closing costs and down payment",
        "Receive keys to your new home",
        "Title transfers to your name"
      ],
      tip: "Bring your government-issued ID and be prepared for 1-2 hours of signing documents. Congratulations!"
    }
  ];

  const closingCosts = [
    {
      category: "Lender Fees",
      items: [
        { name: "Loan Origination Fee", typical: "0.5-1% of loan amount", description: "Fee charged by lender for processing your loan" },
        { name: "Discount Points", typical: "$0-2% of loan amount", description: "Optional fee to lower your interest rate" },
        { name: "Appraisal Fee", typical: "$400-$600", description: "Cost to determine property value" },
        { name: "Credit Report Fee", typical: "$25-$50", description: "Fee to pull your credit report" }
      ]
    },
    {
      category: "Third-Party Fees",
      items: [
        { name: "Home Inspection", typical: "$300-$600", description: "Professional inspection of property condition" },
        { name: "Survey Fee", typical: "$300-$500", description: "Property boundary survey (if required)" },
        { name: "Pest Inspection", typical: "$75-$150", description: "Termite and pest inspection (if required)" }
      ]
    },
    {
      category: "Title and Escrow",
      items: [
        { name: "Title Search", typical: "$200-$400", description: "Research to verify clear property title" },
        { name: "Title Insurance", typical: "$500-$2,000", description: "Protects against title defects" },
        { name: "Escrow Fee", typical: "$300-$600", description: "Fee for managing transaction funds" },
        { name: "Recording Fee", typical: "$50-$250", description: "Government fee to record the deed" }
      ]
    },
    {
      category: "Prepaid Costs",
      items: [
        { name: "Homeowners Insurance", typical: "$800-$2,000", description: "First year premium (paid at closing)" },
        { name: "Property Taxes", typical: "Varies", description: "Prorated portion based on closing date" },
        { name: "Prepaid Interest", typical: "Varies", description: "Interest from closing date to first payment" },
        { name: "HOA Fees", typical: "Varies", description: "If applicable, prorated HOA dues" }
      ]
    }
  ];

  const requiredDocuments = [
    {
      category: "Identification",
      items: ["Government-issued photo ID (driver's license, passport)", "Social Security card or proof of SSN"]
    },
    {
      category: "Financial Documents",
      items: ["Proof of homeowners insurance", "Cashier's check or wire confirmation for closing costs", "Final mortgage approval letter"]
    },
    {
      category: "Property Documents",
      items: ["Copy of purchase agreement", "Home inspection reports", "Appraisal report", "Survey (if applicable)"]
    }
  ];

  const finalWalkthroughChecklist = [
    "All agreed-upon repairs have been completed",
    "Property is in same condition as when offer was made",
    "All fixtures and appliances included in sale are present",
    "No new damage has occurred to the property",
    "Utilities are on and functioning (test all outlets, faucets, appliances)",
    "Garage door openers and keys are available",
    "All seller's belongings have been removed",
    "Windows and doors lock properly"
  ];

  const moneyTips = [
    {
      title: "Budget for 2-5% of Purchase Price",
      description: "On a $300,000 home in Vermont, expect $6,000-$15,000 in closing costs. Plan accordingly and have extra reserves."
    },
    {
      title: "Ask for a Loan Estimate",
      description: "Lenders must provide a Loan Estimate within 3 days of application. This helps you compare offers and understand costs."
    },
    {
      title: "Negotiate Seller Credits",
      description: "In some markets, you can negotiate for the seller to cover part of your closing costs, especially if repairs are needed."
    },
    {
      title: "Wire Funds Securely",
      description: "Call your title company directly to confirm wiring instructions. Wire fraud is common—never rely on email alone."
    },
    {
      title: "Review the Closing Disclosure Carefully",
      description: "Compare it to your Loan Estimate. Question any fees that have increased significantly or that you don't understand."
    },
    {
      title: "Keep Money in Accounts",
      description: "Don't move money between accounts or make large deposits during the closing process without notifying your lender."
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
                  Closing Guide
                </span>
              </div>

              <h1
                className="mt-6 text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "Coconat" }}
              >
                The Closing Process
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                Understand the final steps of buying a home, from closing timeline to costs and what to expect on closing day.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Closing Timeline
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From offer acceptance to receiving your keys, here's what happens during the typical 30-45 day closing period in Vermont.
              </p>
            </div>

            <div className="space-y-8">
              {timeline.map((phase, index) => (
                <div key={index} className="relative">
                  {index < timeline.length - 1 && (
                    <div className="hidden lg:block absolute left-7 top-20 bottom-0 w-0.5 bg-gray-200"></div>
                  )}

                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#3b82f6] transition-colors">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Icon and Timeframe */}
                      <div className="flex-shrink-0 flex lg:flex-col items-center lg:items-start gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center z-10">
                          <phase.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="lg:mt-2">
                          <div className="bg-blue-100 text-[#21266c] text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap">
                            {phase.timeframe}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold text-[#21266c] mb-4">{phase.phase}</h3>

                        <ul className="space-y-2 mb-4">
                          {phase.tasks.map((task, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{task}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-4 rounded-r-lg">
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold text-[#21266c]">Tip: </span>
                            {phase.tip}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Costs Section */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Understanding Closing Costs
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Closing costs typically range from 2-5% of the purchase price. Here's a breakdown of common fees you can expect.
              </p>
            </div>

            <div className="space-y-8">
              {closingCosts.map((section, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <DollarSign className="w-6 h-6 text-[#3b82f6]" />
                    <h3 className="text-2xl font-bold text-[#21266c]">{section.category}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.items.map((item, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-[#21266c]">{item.name}</h4>
                          <span className="text-sm font-bold text-[#3b82f6] whitespace-nowrap ml-2">{item.typical}</span>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Estimate Box */}
            <div className="mt-8 bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Example: Closing Costs on a $300,000 Home</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-blue-200 text-sm mb-1">Low End (2%)</p>
                  <p className="text-3xl font-bold">$6,000</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-blue-200 text-sm mb-1">Average (3.5%)</p>
                  <p className="text-3xl font-bold">$10,500</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-blue-200 text-sm mb-1">High End (5%)</p>
                  <p className="text-3xl font-bold">$15,000</p>
                </div>
              </div>
              <p className="mt-4 text-blue-100 text-sm">
                Plus your down payment. These costs can vary based on loan type, lender, and property location in Vermont.
              </p>
            </div>
          </div>
        </section>

        {/* Money Management Tips */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Smart Money Management
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Protect yourself and save money with these essential tips for managing your closing costs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {moneyTips.map((tip, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#3b82f6] text-white flex items-center justify-center font-bold text-lg mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#21266c] mb-2">{tip.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Required Documents Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Documents to Bring to Closing
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Come prepared with these essential documents to ensure a smooth closing process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {requiredDocuments.map((doc, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#21266c] mb-4">{doc.category}</h3>
                  <ul className="space-y-2">
                    {doc.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Walkthrough Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                  Final Walkthrough Checklist
                </h2>
                <p className="text-lg text-gray-600">
                  Complete this walkthrough 24 hours before closing to ensure the property is in the agreed-upon condition.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                <div className="space-y-3">
                  {finalWalkthroughChecklist.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                      <div className="w-6 h-6 rounded border-2 border-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-3 h-3 bg-[#3b82f6] rounded-sm opacity-0 hover:opacity-100"></div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-900 mb-1">Important</p>
                      <p className="text-sm text-yellow-800">
                        If you discover any issues during the final walkthrough, notify your agent immediately. Don't proceed to closing until problems are resolved or addressed in writing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-2xl p-8 sm:p-12 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "Coconat" }}>
                Ready to Close on Your Vermont Home?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Our team will guide you through every step of the closing process, ensuring you understand all costs and paperwork. Let's make your closing day smooth and stress-free.
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
