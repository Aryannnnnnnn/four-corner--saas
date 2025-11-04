"use client";

import React from "react";
import { ArrowLeft, ArrowRight, Calculator, DollarSign, FileText, Home, AlertCircle, CheckCircle2, ShieldCheck, Percent } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

interface CostItem {
  name: string;
  range: string;
  negotiable: boolean;
  critical?: boolean;
  note?: string;
}

export default function ClosingCostsPage() {
  const costCategories: Array<{ title: string; icon: any; description: string; items: CostItem[] }> = [
    {
      title: "Lender Fees",
      icon: FileText,
      description: "Charges from your mortgage lender for processing and originating your loan.",
      items: [
        { name: "Loan Origination Fee", range: "0.5-1% of loan amount", negotiable: true },
        { name: "Loan Application Fee", range: "$300-$500", negotiable: true },
        { name: "Credit Report Fee", range: "$25-$50", negotiable: false },
        { name: "Appraisal Fee", range: "$400-$600", negotiable: false },
        { name: "Underwriting Fee", range: "$300-$500", negotiable: true }
      ]
    },
    {
      title: "Title & Legal",
      icon: ShieldCheck,
      description: "Costs for ensuring clear property ownership and legal document preparation.",
      items: [
        { name: "Attorney Fee", range: "$800-$1,200", negotiable: true },
        { name: "Title Search", range: "$200-$400", negotiable: false },
        { name: "Title Insurance", range: "$500-$1,500", negotiable: true },
        { name: "Recording Fees", range: "$100-$200", negotiable: false }
      ]
    },
    {
      title: "Taxes & Insurance",
      icon: Percent,
      description: "Government taxes, property tax escrow, and insurance prepayments.",
      items: [
        { name: "VT Property Transfer Tax", range: "1.45% of purchase price", negotiable: false, critical: true },
        { name: "Property Tax Escrow", range: "2-6 months prepaid", negotiable: false },
        { name: "Homeowners Insurance", range: "First year premium", negotiable: false },
        { name: "HOA Transfer Fee", range: "$150-$500 (if applicable)", negotiable: false }
      ]
    },
    {
      title: "Inspection & Other",
      icon: CheckCircle2,
      description: "Pre-closing inspections and miscellaneous costs for due diligence.",
      items: [
        { name: "Home Inspection", range: "$300-$600", negotiable: false, note: "Paid before closing" },
        { name: "Survey", range: "$300-$600", negotiable: false, note: "If required" },
        { name: "Pest Inspection", range: "$75-$150", negotiable: false },
        { name: "Well Inspection", range: "$200-$400", negotiable: false, note: "VT rural areas" },
        { name: "Septic Inspection", range: "$300-$500", negotiable: false, note: "VT rural areas" }
      ]
    }
  ];

  const exampleScenarios = [
    {
      price: 200000,
      loanAmount: 190000,
      downPayment: 10000,
      transferTax: 2900,
      lenderFees: 2400,
      titleLegal: 2200,
      inspections: 1200,
      escrowInsurance: 3500,
      total: 12200
    },
    {
      price: 350000,
      loanAmount: 280000,
      downPayment: 70000,
      transferTax: 5075,
      lenderFees: 3700,
      titleLegal: 2800,
      inspections: 1600,
      escrowInsurance: 5300,
      total: 18475
    },
    {
      price: 500000,
      loanAmount: 400000,
      downPayment: 100000,
      transferTax: 7250,
      lenderFees: 5200,
      titleLegal: 3400,
      inspections: 2000,
      escrowInsurance: 7200,
      total: 25050
    }
  ];

  const preparationSteps = [
    {
      title: "Review Your Loan Estimate (LE)",
      description: "Within 3 business days of your mortgage application, you'll receive a Loan Estimate that breaks down all estimated closing costs.",
      tips: [
        "Compare LEs from multiple lenders",
        "Pay attention to origination charges and fees",
        "Look for differences in title and escrow fees",
        "Note the total cash needed to close"
      ]
    },
    {
      title: "Examine Your Closing Disclosure (CD)",
      description: "You must receive the Closing Disclosure at least 3 business days before closing. This is your final cost breakdown.",
      tips: [
        "Compare CD to your Loan Estimate line by line",
        "Question any unexpected fee increases",
        "Verify loan terms, interest rate, and monthly payment",
        "Confirm your total cash to close amount"
      ]
    },
    {
      title: "Arrange Your Funds",
      description: "You'll need to bring certified funds to closing. Plan ahead to have the money ready.",
      tips: [
        "Get a cashier's check or arrange wire transfer",
        "Add a small buffer for any last-minute adjustments",
        "Confirm wiring instructions directly with title company",
        "Bring government-issued photo ID to closing"
      ]
    },
    {
      title: "Understand What You Can Negotiate",
      description: "Some closing costs are negotiable, while others are set by law or third parties.",
      tips: [
        "Shop around for title insurance and attorney",
        "Ask lender to waive or reduce origination fees",
        "Request seller credits or concessions",
        "Compare homeowners insurance quotes"
      ]
    }
  ];

  const negotiableVsNot = {
    negotiable: [
      { item: "Loan origination fees", tip: "Shop multiple lenders and ask for fee waivers" },
      { item: "Title insurance", tip: "You can choose your title company" },
      { item: "Attorney fees", tip: "Get quotes from multiple attorneys" },
      { item: "Homeowners insurance", tip: "Compare quotes from different providers" },
      { item: "Some lender fees", tip: "Processing fees may be negotiable or waived" }
    ],
    nonNegotiable: [
      { item: "VT Property Transfer Tax (1.45%)", reason: "Set by Vermont state law" },
      { item: "Recording fees", reason: "Set by local government" },
      { item: "Credit report fee", reason: "Charged by credit bureaus" },
      { item: "Appraisal fee", reason: "Required third-party service" },
      { item: "Property tax escrow", reason: "Required by lender" }
    ]
  };

  const vermontNotes = [
    {
      title: "Buyer Pays Transfer Tax in Vermont",
      description: "Unlike many states where the seller pays, Vermont law requires the BUYER to pay the 1.45% property transfer tax. This is often the single largest closing cost.",
      impact: "On a $300,000 home, this equals $4,350"
    },
    {
      title: "Attorney Required",
      description: "Vermont is an 'attorney state,' meaning real estate attorneys must be involved in the closing process. This is for your protection.",
      impact: "Budget $800-$1,200 for attorney fees"
    },
    {
      title: "Well & Septic Inspections Common",
      description: "Many Vermont properties are in rural areas with private wells and septic systems. These inspections are critical and often required by lenders.",
      impact: "Budget an additional $500-$900 for these inspections"
    },
    {
      title: "Oil Tank Inspections",
      description: "Older Vermont homes may have oil heating systems. Underground or old oil tanks can be environmental hazards and should be inspected.",
      impact: "Inspection: $200-$400, Removal/Replacement: $1,000-$3,000+"
    },
    {
      title: "Higher Heating Costs",
      description: "Vermont winters require efficient heating systems. Lenders may require larger escrow accounts for heating oil or propane prepayment.",
      impact: "May need to prepay heating fuel at closing"
    },
    {
      title: "Seasonal Considerations",
      description: "Winter closings in Vermont may require snow removal for inspectors and appraisers. Spring closings may reveal foundation or drainage issues after snow melt.",
      impact: "Plan inspection timing carefully"
    }
  ];

  const sellerConcessions = [
    "Seller can contribute toward closing costs (typically up to 3-6% depending on loan type)",
    "Seller credits can cover lender fees, title costs, or prepaid items",
    "Seller CANNOT pay the VT Property Transfer Tax on behalf of buyer (must be paid by buyer)",
    "Concessions are negotiated as part of your purchase offer",
    "Seller may pay for buyer's home warranty (typically $400-$600)",
    "In competitive markets, requesting large seller credits may weaken your offer"
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

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
                Understanding Closing Costs in Vermont
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                A comprehensive breakdown of what you'll pay at closing when buying a home in Vermont. Closing costs typically range from 2-5% of your purchase price, with Vermont's unique 1.45% buyer-paid transfer tax being the largest single expense.
              </p>
            </div>
          </div>
        </section>

        {/* What Are Closing Costs */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-6" style={{ fontFamily: "Coconat" }}>
                What Are Closing Costs?
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Closing costs are the fees and expenses you pay when finalizing your home purchase, separate from your down payment. These costs cover everything from loan processing to title insurance to government taxes.
                </p>
                <p>
                  In Vermont, buyers should budget <span className="font-semibold text-[#21266c]">2-5% of the purchase price</span> for closing costs. On a $300,000 home, this means $6,000-$15,000 in addition to your down payment.
                </p>
              </div>
            </div>

            {/* Key Facts Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-[#3b82f6] rounded-xl p-6">
                <Calendar className="w-10 h-10 text-[#3b82f6] mb-3" />
                <h3 className="text-lg font-bold text-[#21266c] mb-2">When They're Due</h3>
                <p className="text-gray-700 leading-relaxed">
                  All closing costs are paid at the closing table, typically via cashier's check or wire transfer.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-[#3b82f6] rounded-xl p-6">
                <DollarSign className="w-10 h-10 text-[#3b82f6] mb-3" />
                <h3 className="text-lg font-bold text-[#21266c] mb-2">Who Pays What</h3>
                <p className="text-gray-700 leading-relaxed">
                  Buyers typically pay lender fees, inspections, and in Vermont, the 1.45% property transfer tax. Sellers pay agent commissions.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-[#3b82f6] rounded-xl p-6">
                <AlertCircle className="w-10 h-10 text-[#3b82f6] mb-3" />
                <h3 className="text-lg font-bold text-[#21266c] mb-2">Vermont Special</h3>
                <p className="text-gray-700 leading-relaxed">
                  Vermont requires BUYERS (not sellers) to pay the 1.45% transfer tax - the largest closing cost you'll face.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VT Property Transfer Tax - CRITICAL */}
        <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border-4 border-red-400 rounded-2xl p-8 sm:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                  <Percent className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-2" style={{ fontFamily: "Coconat" }}>
                    Vermont Property Transfer Tax: 1.45%
                  </h2>
                  <p className="text-lg text-red-600 font-semibold">
                    THE LARGEST CLOSING COST FOR VERMONT BUYERS
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-[#21266c] mb-4">What You Need to Know</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Vermont law requires the <span className="font-semibold">BUYER</span> to pay 1.45% of the purchase price as a property transfer tax</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">This is <span className="font-semibold">NOT negotiable</span> and cannot be avoided - it's a state law requirement</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Unlike many states where sellers pay transfer taxes, Vermont places this burden on buyers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">The seller <span className="font-semibold">CANNOT</span> pay this tax on your behalf, even if they want to</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#21266c] mb-4">Example Calculations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl p-6">
                      <div className="text-sm font-semibold text-gray-600 mb-1">Purchase Price</div>
                      <div className="text-2xl font-bold text-[#21266c] mb-3">$200,000</div>
                      <div className="text-sm text-gray-600 mb-1">Transfer Tax @ 1.45%</div>
                      <div className="text-3xl font-bold text-red-600">$2,900</div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl p-6">
                      <div className="text-sm font-semibold text-gray-600 mb-1">Purchase Price</div>
                      <div className="text-2xl font-bold text-[#21266c] mb-3">$300,000</div>
                      <div className="text-sm text-gray-600 mb-1">Transfer Tax @ 1.45%</div>
                      <div className="text-3xl font-bold text-red-600">$4,350</div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl p-6">
                      <div className="text-sm font-semibold text-gray-600 mb-1">Purchase Price</div>
                      <div className="text-2xl font-bold text-[#21266c] mb-3">$500,000</div>
                      <div className="text-sm text-gray-600 mb-1">Transfer Tax @ 1.45%</div>
                      <div className="text-3xl font-bold text-red-600">$7,250</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-4 rounded-r-lg">
                  <div className="flex gap-3">
                    <AlertCircle className="w-6 h-6 text-[#3b82f6] flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-[#21266c] mb-1">Important Planning Note</p>
                      <p className="text-sm text-gray-700">
                        When calculating your total cash needed to close, remember to add this 1.45% transfer tax to your other closing costs. Many first-time buyers are surprised by this expense, so budget accordingly!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Cost Breakdown */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Line-by-Line Cost Breakdown
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Here's every fee you can expect to see on your closing statement, organized by category.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {costCategories.map((category, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#3b82f6] transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center">
                      <category.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#21266c]">{category.title}</h3>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>

                  <div className="space-y-3">
                    {category.items.map((item, i) => (
                      <div key={i} className={`p-4 rounded-lg ${item?.critical ? 'bg-red-50 border-2 border-red-300' : 'bg-gray-50'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-grow">
                            <div className="flex items-center gap-2">
                              <span className={`font-semibold ${item?.critical ? 'text-red-700' : 'text-[#21266c]'}`}>
                                {item.name}
                              </span>
                              {item.negotiable && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                                  Negotiable
                                </span>
                              )}
                              {item?.critical && (
                                <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-semibold">
                                  LARGEST
                                </span>
                              )}
                            </div>
                            {item?.note && (
                              <p className="text-xs text-gray-500 mt-1">{item.note}</p>
                            )}
                          </div>
                        </div>
                        <div className={`text-sm font-semibold ${item?.critical ? 'text-red-600' : 'text-gray-700'}`}>
                          {item.range}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example Scenarios */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Real Example Calculations
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                See how closing costs break down for different purchase prices in Vermont.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {exampleScenarios.map((scenario, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center mx-auto mb-3">
                      <Home className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Purchase Price</div>
                    <div className="text-3xl font-bold text-[#21266c]">{formatCurrency(scenario.price)}</div>
                    <div className="text-sm text-gray-600 mt-2">
                      {formatCurrency(scenario.downPayment)} down ({((scenario.downPayment / scenario.price) * 100).toFixed(0)}%)
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">VT Transfer Tax (1.45%)</span>
                      <span className="font-semibold text-red-600">{formatCurrency(scenario.transferTax)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Lender Fees</span>
                      <span className="font-semibold text-gray-700">{formatCurrency(scenario.lenderFees)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Title & Legal</span>
                      <span className="font-semibold text-gray-700">{formatCurrency(scenario.titleLegal)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Inspections</span>
                      <span className="font-semibold text-gray-700">{formatCurrency(scenario.inspections)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Escrow & Insurance</span>
                      <span className="font-semibold text-gray-700">{formatCurrency(scenario.escrowInsurance)}</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-xl p-4 text-white">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold">Total Closing Costs</span>
                      <span className="text-2xl font-bold">{formatCurrency(scenario.total)}</span>
                    </div>
                    <div className="text-sm text-blue-100">
                      {((scenario.total / scenario.price) * 100).toFixed(1)}% of purchase price
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="text-xs font-semibold text-gray-600 mb-1">Total Cash Needed</div>
                    <div className="text-xl font-bold text-[#21266c]">
                      {formatCurrency(scenario.downPayment + scenario.total)}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Down payment + closing costs</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Prepare */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                How to Prepare for Closing Costs
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Follow these steps to understand, budget for, and manage your closing costs effectively.
              </p>
            </div>

            <div className="space-y-8">
              {preparationSteps.map((step, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-[#3b82f6] transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-[#21266c] mb-2">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{tip}</span>
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

        {/* Negotiable vs Non-Negotiable */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                What Can You Negotiate?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Understanding which costs are flexible and which are fixed can help you save money.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Negotiable */}
              <div className="bg-white border-2 border-green-300 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#21266c]">Negotiable Costs</h3>
                </div>

                <p className="text-gray-600 mb-6">These fees can often be reduced or waived through shopping around or negotiation:</p>

                <div className="space-y-4">
                  {negotiableVsNot.negotiable.map((item, index) => (
                    <div key={index} className="bg-green-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-800 mb-1">{item.item}</div>
                      <div className="text-sm text-gray-600">{item.tip}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Non-Negotiable */}
              <div className="bg-white border-2 border-red-300 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#21266c]">Non-Negotiable Costs</h3>
                </div>

                <p className="text-gray-600 mb-6">These fees are set by law or third parties and cannot be negotiated:</p>

                <div className="space-y-4">
                  {negotiableVsNot.nonNegotiable.map((item, index) => (
                    <div key={index} className="bg-red-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-800 mb-1">{item.item}</div>
                      <div className="text-sm text-gray-600">{item.reason}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Seller Concessions */}
            <div className="mt-8 bg-white border-2 border-[#3b82f6] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#21266c]">Seller Credits & Concessions</h3>
              </div>

              <p className="text-gray-600 mb-6">
                Sellers can contribute toward your closing costs as part of the purchase negotiation. Here's what you need to know:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sellerConcessions.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vermont-Specific Notes */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Vermont-Specific Closing Cost Considerations
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Vermont has unique requirements and common practices that affect your closing costs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vermontNotes.map((note, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-colors">
                  <h3 className="text-xl font-bold text-[#21266c] mb-3">{note.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{note.description}</p>
                  <div className="bg-blue-50 rounded-lg p-3 inline-block">
                    <p className="text-sm font-semibold text-[#3b82f6]">{note.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-2xl p-8 sm:p-12 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "Coconat" }}>
                Ready to Calculate Your Costs?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Use our free calculators to estimate your total closing costs and monthly payments for homes in Vermont.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/calculators"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#21266c] font-medium text-base rounded-full hover:bg-gray-100 transition-all duration-300"
                >
                  <Calculator className="w-5 h-5" />
                  USE CALCULATORS
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-medium text-base rounded-full hover:bg-white hover:text-[#21266c] transition-all duration-300"
                >
                  CONTACT US
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

// Helper component for missing icon
function Calendar({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
