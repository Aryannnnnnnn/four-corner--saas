"use client";

import React from "react";
import { DollarSign, TrendingDown, Calculator, Home, FileText, CheckCircle, AlertCircle, MinusCircle, X, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MortgageCalculator from "@/components/calculators/MortgageCalculator";

export default function SellerClosingCostsPage() {

  const costBreakdownItems = [
    {
      icon: <DollarSign className="w-6 h-6 text-red-500" />,
      title: "Real Estate Commission (LARGEST COST)",
      amount: "5-6% of sale price",
      description: "Typical commission split between listing agent and buyer's agent",
      details: [
        "Typical: 5-6% of sale price",
        "Example: $400,000 sale = $24,000 commission (at 6%)",
        "Split between listing agent and buyer's agent (usually 50/50)",
        "Negotiable, but standard in Vermont",
        "Note: Some sellers try 4-5% but may reduce buyer agent interest and showings",
      ],
      highlight: true,
    },
    {
      icon: <FileText className="w-6 h-6 text-blue-500" />,
      title: "Attorney Fees",
      amount: "$800-$1,500",
      description: "Legal representation for seller",
      details: [
        "Seller's attorney: $800-$1,500",
        "Services include: Deed preparation, title research coordination",
        "Payoff calculations and closing coordination",
        "Vermont is an attorney state - requires separate attorneys for buyer and seller",
        "Fee varies based on complexity and attorney experience",
      ],
    },
    {
      icon: <Home className="w-6 h-6 text-purple-500" />,
      title: "Mortgage Payoff",
      amount: "Varies by loan",
      description: "Outstanding principal, accrued interest, and any penalties",
      details: [
        "Outstanding principal balance",
        "Accrued interest (prorated to closing date)",
        "Prepayment penalty (rare, but check your loan documents)",
        "Home equity loan/HELOC payoff (if applicable)",
        "Note: This is not a 'closing cost' but comes out of proceeds at closing",
      ],
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
      title: "Property Taxes (Prorated)",
      amount: "Varies by town",
      description: "Credit buyer for taxes paid beyond closing date",
      details: [
        "Credit buyer for taxes paid beyond closing date",
        "Vermont property taxes typically paid in advance (varies by town)",
        "Bennington County: Often paid quarterly",
        "Rutland County: Often paid semi-annually",
        "Example: If you paid $6,000 for the year and close June 30, you credit buyer $3,000",
      ],
    },
    {
      icon: <FileText className="w-6 h-6 text-indigo-500" />,
      title: "Recording Fees",
      amount: "$15-$75",
      description: "Town clerk fees for recording documents",
      details: [
        "Deed recording: $15-$25 first page, $5 per additional page",
        "Mortgage discharge recording: $15-$25",
        "Other lien releases: $15-$25 each",
        "Paid to town/city clerk where property is located",
      ],
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-yellow-500" />,
      title: "Transfer Tax (WHO PAYS)",
      amount: "1.45% (usually BUYER pays)",
      description: "Important: Buyer typically pays in Vermont",
      details: [
        "IMPORTANT: In Vermont, BUYER typically pays the 1.45% transfer tax",
        "Some sellers may agree to pay as negotiation incentive",
        "If seller pays: Add 1.45% to your costs",
        "Example: $400K sale = $5,800 if seller agrees to pay",
        "This is a common negotiation point in buyer's markets",
      ],
    },
  ];

  const otherPotentialCosts = [
    "HOA transfer fees: $200-$500 (if applicable)",
    "HOA dues (prorated to closing date)",
    "Current Use program exit fees (if enrolled - can be significant)",
    "Survey (if buyer requests and seller agrees): $300-$600",
    "Home warranty for buyer: $400-$600 (if offering as incentive)",
    "Buyer closing cost credits (if negotiated during inspection)",
    "Repairs or credits from inspection negotiations",
  ];

  const scenarios = [
    {
      title: "Scenario 1: $250,000 Sale",
      salePrice: 250000,
      breakdown: [
        { label: "Commission (6%)", amount: 15000 },
        { label: "Attorney", amount: 1000 },
        { label: "Recording", amount: 50 },
        { label: "Prorated taxes", amount: 500 },
      ],
      totalCosts: 16550,
      costPercentage: 6.6,
      mortgagePayoff: 200000,
      netProceeds: 33450,
    },
    {
      title: "Scenario 2: $400,000 Sale",
      salePrice: 400000,
      breakdown: [
        { label: "Commission (6%)", amount: 24000 },
        { label: "Attorney", amount: 1200 },
        { label: "Recording", amount: 50 },
        { label: "Prorated taxes", amount: 800 },
        { label: "Buyer credit (inspection)", amount: 2000 },
      ],
      totalCosts: 28050,
      costPercentage: 7.0,
      mortgagePayoff: 300000,
      netProceeds: 71950,
    },
    {
      title: "Scenario 3: $650,000 Sale (High-End, Paid Off)",
      salePrice: 650000,
      breakdown: [
        { label: "Commission (5.5%)", amount: 35750 },
        { label: "Attorney", amount: 1500 },
        { label: "Recording", amount: 75 },
        { label: "Prorated taxes", amount: 1200 },
        { label: "Survey", amount: 500 },
        { label: "Home warranty", amount: 500 },
      ],
      totalCosts: 39525,
      costPercentage: 6.1,
      mortgagePayoff: 0,
      netProceeds: 610475,
    },
  ];

  const waysToReduce = [
    {
      title: "Negotiate Commission",
      description: "Carefully negotiate commission rate - but be aware that lower rates may affect marketing reach and buyer agent interest",
      icon: <TrendingDown className="w-5 h-5 text-green-600" />,
    },
    {
      title: "Offer Home 'As-Is'",
      description: "Avoid repair credits by selling as-is, but this may affect final sale price",
      icon: <Home className="w-5 h-5 text-green-600" />,
    },
    {
      title: "Pay Off Liens Early",
      description: "Avoid rush fees and complications by resolving liens before listing",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    },
    {
      title: "Time Closing Strategically",
      description: "Minimize tax proration by timing closing near tax payment dates",
      icon: <Calculator className="w-5 h-5 text-green-600" />,
    },
    {
      title: "Shop for Attorney",
      description: "Compare attorney fees, but prioritize experience over lowest price",
      icon: <FileText className="w-5 h-5 text-green-600" />,
    },
    {
      title: "Pre-Pay Current Use Exit Fees",
      description: "If enrolled in Current Use, handle exit fees proactively if applicable",
      icon: <DollarSign className="w-5 h-5 text-green-600" />,
    },
  ];

  const vermontSpecific = [
    {
      title: "Current Use Program",
      description: "If enrolled, may owe land use change tax when selling (can be significant - 10% of fair market value)",
      icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
    },
    {
      title: "Act 250",
      description: "If property has Act 250 permit, ensure compliance and transferability",
      icon: <FileText className="w-5 h-5 text-blue-600" />,
    },
    {
      title: "Wastewater System",
      description: "Provide existing system documentation to buyer (no cost if you already have it)",
      icon: <Home className="w-5 h-5 text-blue-600" />,
    },
    {
      title: "Well & Septic",
      description: "Some sellers offer to pay for buyer's inspection ($400-$1,000 total) as negotiation incentive",
      icon: <CheckCircle className="w-5 h-5 text-blue-600" />,
    },
    {
      title: "Underground Oil Tank",
      description: "If present, may need assessment or removal ($500-$1,500+)",
      icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
    },
  ];

  const dontPay = [
    "Buyer's attorney fees",
    "Buyer's mortgage costs (origination, appraisal, credit report, etc.)",
    "Buyer's title insurance",
    "Buyer's home inspection",
    "Property transfer tax (BUYER pays in Vermont, unless negotiated otherwise)",
    "Buyer's survey (unless agreed to pay as incentive)",
    "Buyer's mortgage insurance (PMI)",
  ];

  const timeline = [
    {
      phase: "Before Listing",
      items: ["Photography ($150-$400)", "Staging (optional, $500-$2,000)"],
      icon: <Home className="w-5 h-5 text-white" />,
    },
    {
      phase: "During Sale",
      items: ["Maintain utilities", "Keep homeowner's insurance active", "Continue mortgage payments"],
      icon: <Calendar className="w-5 h-5 text-white" />,
    },
    {
      phase: "At Closing",
      items: ["All closing costs deducted from sale proceeds", "Mortgage payoff processed", "Net proceeds calculated"],
      icon: <DollarSign className="w-5 h-5 text-white" />,
    },
    {
      phase: "After Closing",
      items: ["None (if all paid at closing)", "Receive net proceeds via wire transfer within 24 hours"],
      icon: <CheckCircle className="w-5 h-5 text-white" />,
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
            <Link href="/sellers-education" className="inline-flex items-center gap-2 text-white hover:text-blue-100 transition-colors mb-8">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Seller Resources</span>
            </Link>

            {/* Page Header */}
            <div className="text-white">
              <div className="inline-block mb-4">
                <div className="w-12 h-1 bg-white mb-4"></div>
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                  Seller's Guide
                </span>
              </div>

              <h1
                className="mt-6 text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "Coconat" }}
              >
                Understanding Seller Closing Costs in Vermont
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                A comprehensive breakdown of what you'll pay when selling your home in Vermont. Seller costs typically range from 6-10% of your sale price, with real estate commission being the largest expense.
              </p>
            </div>
          </div>
        </section>

      {/* Overview Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-6" style={{ fontFamily: "Coconat" }}>
              What Are Seller Closing Costs?
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                Seller closing costs are the expenses you pay when transferring ownership of your property to the buyer. Understanding these costs is crucial for calculating your actual net proceeds from the sale.
              </p>
              <p>
                In Vermont, sellers should budget <span className="font-semibold text-[#21266c]">6-10% of the sale price</span> for closing costs and commissions. On a $400,000 home, this means $24,000-$40,000 in total costs.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="font-semibold text-[#21266c] mb-2">Typical Range</h3>
              <p className="text-3xl font-bold text-[#3b82f6]">6-10%</p>
              <p className="text-sm text-gray-600 mt-2">of sale price</p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
              <h3 className="font-semibold text-red-900 mb-2">Largest Cost</h3>
              <p className="text-3xl font-bold text-red-600">Commission</p>
              <p className="text-sm text-gray-600 mt-2">Usually 5-6% of sale price</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-2">Important Note</h3>
              <p className="text-lg font-bold text-purple-600">Payoff Amounts</p>
              <p className="text-sm text-gray-600 mt-2">May exceed closing costs</p>
            </div>
          </div>
        </div>
      </section>

        {/* Detailed Cost Breakdown */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-12 text-center" style={{ fontFamily: "Coconat" }}>
              Detailed Cost Breakdown
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
            {costBreakdownItems.map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-md p-6 border-2 ${
                  item.highlight ? "border-red-300 bg-red-50" : "border-gray-200"
                } hover:shadow-xl transition-shadow`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-lg ${item.highlight ? "bg-red-100" : "bg-gray-100"}`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-coconat text-xl font-bold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-2xl font-bold text-blue-600 mb-2">{item.amount}</p>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-2">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* Other Potential Costs */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-amber-50 rounded-2xl shadow-lg p-8 md:p-12 border-2 border-amber-200">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-amber-100 p-3 rounded-lg">
              <AlertCircle className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h3 className="font-coconat text-2xl font-bold text-gray-900 mb-4">
                Other Potential Costs
              </h3>
              <ul className="space-y-3">
                {otherPotentialCosts.map((cost, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <DollarSign className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>{cost}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
          </div>
        </section>

        {/* Example Scenarios */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center" style={{ fontFamily: "Coconat" }}>
              Example Calculations
            </h2>
          <p className="text-center text-gray-600 mb-8 text-lg">
            Real-world examples of seller closing costs in Vermont
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {scenarios.map((scenario, idx) => (
              <div
                key={`scenario-${idx}`}
                className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#21266c] to-[#3b82f6] text-white p-6">
                  <h3 className="font-coconat text-xl font-bold mb-2">{scenario.title}</h3>
                  <p className="text-3xl font-bold">
                    ${scenario.salePrice.toLocaleString()}
                  </p>
                </div>

                <div className="p-6">
                  <div className="space-y-3 mb-4">
                    {scenario.breakdown.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex justify-between items-center">
                        <span className="text-gray-700">{item.label}:</span>
                        <span className="font-semibold text-gray-900">
                          ${item.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t-2 border-gray-200 pt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">Total Costs:</span>
                      <span className="font-bold text-red-600">
                        ${scenario.totalCosts.toLocaleString()} ({scenario.costPercentage}%)
                      </span>
                    </div>
                    {scenario.mortgagePayoff > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Mortgage Payoff:</span>
                        <span className="font-semibold text-gray-900">
                          ${scenario.mortgagePayoff.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg border border-green-200">
                      <span className="font-bold text-green-900">Net Proceeds:</span>
                      <span className="font-bold text-green-600 text-xl">
                        ${scenario.netProceeds.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-blue-200">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-blue-600 p-4 rounded-xl">
              <Calculator className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="font-coconat text-3xl font-bold text-gray-900">
                Calculate Your Net Proceeds
              </h2>
              <p className="text-gray-600 mt-1">
                Use this calculator to estimate your costs and net proceeds from your home sale
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <MortgageCalculator />
          </div>

          <div className="mt-6 bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3">Formula:</h4>
            <div className="font-mono text-sm text-gray-700 space-y-1">
              <div>Sale Price</div>
              <div>- Real Estate Commission</div>
              <div>- Attorney Fees</div>
              <div>- Recording Fees</div>
              <div>- Prorated Property Taxes</div>
              <div>- Other Agreed Credits/Repairs</div>
              <div>- Mortgage Payoff</div>
              <div className="border-t border-blue-300 pt-1 mt-1 font-bold text-blue-900">
                = Your Net Proceeds
              </div>
            </div>
          </div>
        </div>
          </div>
        </section>

        {/* Ways to Reduce Costs */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-12 text-center" style={{ fontFamily: "Coconat" }}>
              Ways to Reduce Your Closing Costs
            </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {waysToReduce.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border-2 border-green-200 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
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
                Vermont-Specific Considerations
              </h2>
              <p className="text-gray-600 mt-1">
                Important factors unique to selling property in Vermont
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {vermontSpecific.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-3 rounded-lg">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
          </div>
        </section>

        {/* What Sellers DON'T Pay */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-2xl shadow-lg p-8 md:p-12 border-2 border-gray-300">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-gray-700 p-4 rounded-xl">
              <MinusCircle className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="font-coconat text-3xl font-bold text-gray-900">
                What Sellers DON'T Pay
              </h2>
              <p className="text-gray-600 mt-1">
                Common misconceptions about seller responsibilities
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {dontPay.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex items-center gap-3"
              >
                <div className="bg-red-100 p-2 rounded-full">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
          </div>
        </section>

        {/* Timeline of Payments */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-12 text-center" style={{ fontFamily: "Coconat" }}>
              Timeline of Payments
            </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {timeline.map((phase, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 relative"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-[#21266c] to-[#3b82f6] p-4 rounded-full">
                    {phase.icon}
                  </div>
                </div>
                <h3 className="font-coconat text-xl font-bold text-center text-gray-900 mb-4">
                  {phase.phase}
                </h3>
                <ul className="space-y-2">
                  {phase.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {index < timeline.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <div className="w-6 h-0.5 bg-gray-300"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* Closing Day Section */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#21266c] to-[#3b82f6] text-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-white/20 p-4 rounded-xl">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="font-coconat text-3xl font-bold">
                Closing Day: What to Expect
              </h2>
              <p className="text-blue-100 mt-1">
                Your final step to completing the sale
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="font-semibold text-xl mb-4">Before the Closing</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <span>Review final HUD-1/Closing Disclosure in advance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <span>Bring valid photo ID (driver's license or passport)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <span>Confirm wire transfer instructions with your bank</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="font-semibold text-xl mb-4">At the Closing</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <span>Sign the deed and transfer documents</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <span>Review and approve final settlement statement</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <span>Hand over keys, garage openers, and access codes</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm md:col-span-2">
              <h3 className="font-semibold text-xl mb-4">After the Closing</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <span>Receive net proceeds via wire transfer (typically within 24 hours)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <span>Keep all closing documents for tax purposes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <span>Cancel homeowner's insurance and utilities after transfer</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <span>Option: Can sign documents in advance with power of attorney if unable to attend</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center border-2 border-gray-200">
          <h2 className="font-coconat text-3xl font-bold text-gray-900 mb-4">
            Ready to Sell Your Vermont Home?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Understanding your closing costs is the first step. Let's discuss your specific situation and create a customized net proceeds estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-[#21266c] to-[#3b82f6] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-shadow inline-flex items-center justify-center gap-2"
            >
              <DollarSign className="w-5 h-5" />
              Get Your Free Net Proceeds Estimate
            </Link>
            <Link
              href="/sellers-education"
              className="bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors inline-flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              More Seller Resources
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
