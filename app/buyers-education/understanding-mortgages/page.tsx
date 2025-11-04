"use client";

import { ArrowLeft, ArrowRight, TrendingDown, Percent, Home, Calculator, CreditCard, FileCheck, Calendar, FileText, Search, CheckCircle2, Key, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function UnderstandingMortgages() {
  const mortgageTypes = [
    {
      title: "Conventional Loans",
      icon: Home,
      description: "Traditional loans not backed by the government, typically requiring higher credit scores and down payments.",
      features: [
        "Down payment: 3-20% (20% avoids PMI)",
        "Credit score: Usually 620+",
        "Competitive interest rates for qualified buyers",
        "Loan limits apply (varies by county)"
      ],
      bestFor: "Buyers with strong credit and stable income who can afford a larger down payment."
    },
    {
      title: "FHA Loans",
      icon: FileCheck,
      description: "Federal Housing Administration loans designed for first-time buyers and those with lower credit scores.",
      features: [
        "Down payment: As low as 3.5%",
        "Credit score: Can qualify with 580+",
        "Requires mortgage insurance premiums (MIP)",
        "More lenient qualification standards"
      ],
      bestFor: "First-time buyers or those with limited savings for down payment and lower credit scores."
    },
    {
      title: "VA Loans",
      icon: CreditCard,
      description: "Veterans Affairs loans exclusively for eligible military service members, veterans, and spouses.",
      features: [
        "Down payment: $0 down payment option",
        "No private mortgage insurance required",
        "Competitive interest rates",
        "Funding fee applies (can be financed)"
      ],
      bestFor: "Eligible veterans, active-duty service members, and qualifying spouses."
    },
    {
      title: "USDA Loans",
      icon: TrendingDown,
      description: "U.S. Department of Agriculture loans for rural and suburban homebuyers with moderate incomes.",
      features: [
        "Down payment: $0 down payment option",
        "Income limits apply",
        "Property must be in eligible rural area",
        "Guarantee fee required (like mortgage insurance)"
      ],
      bestFor: "Buyers in rural Vermont areas who meet income requirements and want no down payment."
    }
  ];

  const keyTerms = [
    {
      term: "Interest Rate",
      definition: "The annual cost of borrowing money, expressed as a percentage of the loan amount. This affects your monthly payment and total cost over the life of the loan.",
      icon: Percent
    },
    {
      term: "APR (Annual Percentage Rate)",
      definition: "The true cost of your loan, including interest rate plus fees and other costs. APR is typically higher than the interest rate and helps you compare loans.",
      icon: Calculator
    },
    {
      term: "Fixed-Rate vs. Adjustable-Rate",
      definition: "Fixed-rate mortgages maintain the same interest rate for the entire loan term. Adjustable-rate mortgages (ARMs) start with a lower rate that can change after an initial period.",
      icon: TrendingDown
    },
    {
      term: "Private Mortgage Insurance (PMI)",
      definition: "Insurance required on conventional loans when down payment is less than 20%. PMI protects the lender and typically costs 0.5-1% of the loan amount annually.",
      icon: FileCheck
    },
    {
      term: "Debt-to-Income Ratio (DTI)",
      definition: "Your monthly debt payments divided by your gross monthly income. Most lenders prefer a DTI of 43% or less to qualify for a mortgage.",
      icon: Calculator
    },
    {
      term: "Loan-to-Value Ratio (LTV)",
      definition: "The loan amount divided by the property value. A lower LTV (higher down payment) typically results in better loan terms and no PMI if LTV is 80% or less.",
      icon: Home
    }
  ];

  const preApprovalSteps = [
    {
      step: "Gather Your Documents",
      description: "Collect recent pay stubs, W-2s, tax returns (2 years), bank statements, and information about debts and assets."
    },
    {
      step: "Check Your Credit",
      description: "Review your credit report for errors and know your score. Most lenders require at least 620, but higher scores get better rates."
    },
    {
      step: "Calculate Your Budget",
      description: "Determine how much house you can afford based on income, debts, and savings. Use our mortgage calculator to estimate payments."
    },
    {
      step: "Shop for Lenders",
      description: "Compare rates, fees, and terms from multiple lenders. Don't just focus on interest rate—consider closing costs and service quality."
    },
    {
      step: "Submit Your Application",
      description: "Complete the application with your chosen lender. They'll verify your information and order a credit report."
    },
    {
      step: "Get Your Pre-Approval Letter",
      description: "Once approved, you'll receive a letter stating the loan amount you qualify for. This shows sellers you're a serious buyer."
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
                  Mortgage Education
                </span>
              </div>

              <h1
                className="mt-6 text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "Coconat" }}
              >
                Understanding Mortgages
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                Demystify mortgage types, key terms, and the pre-approval process. Get the knowledge you need to secure the best loan for your Vermont home.
              </p>
            </div>
          </div>
        </section>

        {/* Mortgage Types Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Types of Mortgages
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Understanding different loan types helps you choose the best option for your financial situation and homeownership goals.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {mortgageTypes.map((mortgage, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#3b82f6] transition-colors">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center">
                      <mortgage.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#21266c]">{mortgage.title}</h3>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {mortgage.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-[#21266c] mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {mortgage.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-[#3b82f6]">
                    <p className="text-sm font-semibold text-[#21266c] mb-1">Best For:</p>
                    <p className="text-sm text-gray-700">{mortgage.bestFor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Terms Section */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Important Mortgage Terms
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Familiarize yourself with these essential mortgage concepts to make informed decisions and communicate effectively with lenders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {keyTerms.map((item, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-[#3b82f6]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#21266c] mb-2">{item.term}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.definition}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pre-Approval Process Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Getting Pre-Approved
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Pre-approval is a critical first step that shows sellers you're serious and helps you understand your buying power.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {preApprovalSteps.map((item, index) => (
                  <div key={index} className="flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center text-white text-xl font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-grow bg-white border-2 border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-[#21266c] mb-2">{item.step}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-blue-50 rounded-xl p-8 border-2 border-[#3b82f6]">
                <h3 className="text-xl font-bold text-[#21266c] mb-4">Vermont Market Insight</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In Vermont's competitive housing market, having a pre-approval letter is essential. Many sellers won't even consider offers without one, especially in popular areas like Burlington, Stowe, and Montpelier.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Pre-approval typically takes 1-3 business days and is free with most lenders. It's valid for 60-90 days, giving you plenty of time to find the right home.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interest Rate Tips Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#21266c] mb-6" style={{ fontFamily: "Coconat" }}>
                Tips for Getting the Best Rate
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#3b82f6] flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#21266c] mb-2">Improve Your Credit Score</h3>
                    <p className="text-gray-600 text-sm">Pay bills on time, reduce credit card balances, and avoid opening new credit accounts before applying.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#3b82f6] flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#21266c] mb-2">Save for a Larger Down Payment</h3>
                    <p className="text-gray-600 text-sm">Putting down 20% or more eliminates PMI and often qualifies you for better interest rates.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#3b82f6] flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#21266c] mb-2">Shop Multiple Lenders</h3>
                    <p className="text-gray-600 text-sm">Rates can vary significantly between lenders. Compare at least 3-5 lenders to find the best deal.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#3b82f6] flex items-center justify-center text-white font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#21266c] mb-2">Consider Discount Points</h3>
                    <p className="text-gray-600 text-sm">Buying points upfront can lower your interest rate if you plan to stay in the home long-term.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Loan Process Timeline Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                The Loan Process Timeline: From Application to Closing
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Understanding the mortgage timeline helps you plan ahead and know what to expect at each stage of your home buying journey.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              {/* Timeline */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3b82f6] to-[#21266c] hidden sm:block"></div>

                {/* Timeline items */}
                <div className="space-y-8">
                  {/* Week 1: Pre-Qualification */}
                  <div className="relative flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center text-white z-10 relative">
                        <Calendar className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex-grow bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-xl font-bold text-[#21266c]">Week 1: Pre-Qualification</h3>
                        <span className="text-sm font-semibold text-[#3b82f6] bg-blue-50 px-3 py-1 rounded-full inline-block mt-2 sm:mt-0">1-2 days</span>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">Initial conversation with lender</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">Soft credit check</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">Estimate of buying power</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Weeks 1-2: Formal Pre-Approval */}
                  <div className="relative flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center text-white z-10 relative">
                        <FileText className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex-grow bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-xl font-bold text-[#21266c]">Weeks 1-2: Formal Pre-Approval</h3>
                        <span className="text-sm font-semibold text-[#3b82f6] bg-blue-50 px-3 py-1 rounded-full inline-block mt-2 sm:mt-0">3-5 days</span>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">Complete application</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">Document submission (pay stubs, tax returns, bank statements)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">Hard credit check</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">Pre-approval letter issued</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Weeks 2-4: House Hunting */}
                  <div className="relative flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center text-white z-10 relative">
                        <Search className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex-grow bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-xl font-bold text-[#21266c]">Weeks 2-4: House Hunting</h3>
                        <span className="text-sm font-semibold text-[#3b82f6] bg-blue-50 px-3 py-1 rounded-full inline-block mt-2 sm:mt-0">Ongoing</span>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">Search for homes within budget</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">Make offers with pre-approval letter</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Week 4-5: Purchase Agreement & Loan Application */}
                  <div className="relative flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center text-white z-10 relative">
                        <FileCheck className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex-grow bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-xl font-bold text-[#21266c]">Week 4-5: Purchase Agreement & Loan Application</h3>
                        <span className="text-sm font-semibold text-[#3b82f6] bg-blue-50 px-3 py-1 rounded-full inline-block mt-2 sm:mt-0">1 week</span>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">Sign P&S agreement</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">Submit formal mortgage application</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">Pay application fee ($300-$500)</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Weeks 5-7: Processing & Underwriting */}
                  <div className="relative flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center text-white z-10 relative">
                        <Clock className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex-grow bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-xl font-bold text-[#21266c]">Weeks 5-7: Processing & Underwriting</h3>
                        <span className="text-sm font-semibold text-[#3b82f6] bg-blue-50 px-3 py-1 rounded-full inline-block mt-2 sm:mt-0">2-3 weeks</span>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">Lender orders appraisal</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">Underwriter reviews application</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">May request additional documentation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">Conditional approval issued</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Week 7-8: Clear to Close */}
                  <div className="relative flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center text-white z-10 relative">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex-grow bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-xl font-bold text-[#21266c]">Week 7-8: Clear to Close</h3>
                        <span className="text-sm font-semibold text-[#3b82f6] bg-blue-50 px-3 py-1 rounded-full inline-block mt-2 sm:mt-0">3-5 days</span>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">All conditions satisfied</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">Final underwriting approval</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">Closing disclosure sent (must receive 3 days before closing)</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Week 8: Closing Day */}
                  <div className="relative flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center text-white z-10 relative">
                        <Key className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex-grow bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-xl font-bold text-[#21266c]">Week 8: Closing Day</h3>
                        <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block mt-2 sm:mt-0">Final Step</span>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">Sign loan documents</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">Receive keys to new home</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vermont-specific note */}
              <div className="mt-12 bg-blue-50 rounded-xl p-8 border-2 border-[#3b82f6]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#21266c] mb-3">Vermont Closing Timeline</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      In Vermont, the typical timeline from accepted offer to closing averages <span className="font-semibold text-[#21266c]">45-60 days</span>. This is slightly longer than the national average due to Vermont's thorough inspection processes and rural property considerations.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Plan ahead for seasonal variations—winter closings in Vermont may take longer due to weather-related inspections and appraisal challenges. Working with a local lender familiar with Vermont properties can help expedite the process.
                    </p>
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
                Ready to Explore Your Financing Options?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Use our mortgage calculator to estimate your monthly payments or contact us to discuss the best loan options for your situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/calculators"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#21266c] font-medium text-base rounded-full hover:bg-gray-100 transition-all duration-300"
                >
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
