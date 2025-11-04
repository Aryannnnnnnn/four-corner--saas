"use client";

import { ArrowLeft, ArrowRight, CheckCircle2, Home, DollarSign, TrendingDown, Users, FileText, ExternalLink, Percent, Clock, MapPin, AlertCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function VTHomebuyerPrograms() {
  const vhfaPrograms = [
    {
      title: "VHFA Mortgage Plus",
      icon: Home,
      description: "A comprehensive first-time homebuyer program combining affordable mortgages with down payment assistance.",
      features: [
        "Down payment assistance up to 4% of the purchase price",
        "Can be used in combination with other assistance programs",
        "Competitive fixed interest rates",
        "Assistance can be used for down payment and/or closing costs"
      ],
      eligibility: [
        "First-time homebuyer (no home ownership in past 3 years)",
        "Complete homebuyer education course",
        "Meet income and purchase price limits",
        "Purchase price limits vary by county"
      ],
      color: "from-[#21266c] to-[#3b82f6]"
    },
    {
      title: "First-Time Homebuyer Loan",
      icon: DollarSign,
      description: "Low down payment mortgage options designed specifically for Vermont's first-time buyers.",
      features: [
        "As low as 3% down payment required",
        "No private mortgage insurance (PMI) on some programs",
        "Competitive interest rates below market average",
        "30-year fixed rate mortgages available"
      ],
      eligibility: [
        "Must be purchasing primary residence in Vermont",
        "Income limits: typically $90,000-$120,000 (varies by county)",
        "Credit score minimum: 640+",
        "Complete 8-hour homebuyer education course"
      ],
      color: "from-green-500 to-green-600"
    }
  ];

  const assistancePrograms = [
    {
      title: "Down Payment Assistance Grants",
      amount: "$2,500 - $7,500",
      type: "Grant (No Repayment)",
      description: "Free money to help with down payment and closing costs. These grants do not need to be repaid.",
      requirements: [
        "Income at or below 80% of area median income",
        "First-time homebuyer status",
        "Complete homebuyer education",
        "Must be combined with VHFA mortgage"
      ]
    },
    {
      title: "Forgivable Second Mortgage",
      amount: "Up to $15,000",
      type: "Forgivable Loan",
      description: "A second mortgage that is forgiven over time as long as you remain in the home.",
      requirements: [
        "0% interest rate",
        "Forgiven after 10-15 years of occupancy",
        "Must remain in home as primary residence",
        "No monthly payments required"
      ]
    },
    {
      title: "Closing Cost Assistance",
      amount: "$1,000 - $5,000",
      type: "Grant or Low-Interest Loan",
      description: "Help covering closing costs including attorney fees, title insurance, and other settlement expenses.",
      requirements: [
        "Based on income and need",
        "May be grant or low-interest loan",
        "Combined with other VHFA programs",
        "Reduces out-of-pocket expenses at closing"
      ]
    }
  ];

  const benefits = [
    {
      icon: TrendingDown,
      title: "Lower Down Payments",
      description: "Put down as little as 3% instead of the traditional 20%, making homeownership accessible sooner.",
      stat: "3% minimum"
    },
    {
      icon: Percent,
      title: "Competitive Rates",
      description: "Access to below-market interest rates that can save you thousands over the life of your loan.",
      stat: "Below market"
    },
    {
      icon: DollarSign,
      title: "No PMI Options",
      description: "Avoid private mortgage insurance on select programs, reducing your monthly payment significantly.",
      stat: "Save $100-300/mo"
    },
    {
      icon: CheckCircle2,
      title: "Closing Cost Help",
      description: "Receive assistance with closing costs, reducing the cash you need to bring to the settlement table.",
      stat: "Up to $7,500"
    }
  ];

  const eligibilityRequirements = [
    {
      category: "First-Time Buyer Definition",
      icon: Users,
      items: [
        "No ownership of a principal residence in the past 3 years",
        "Exception: Single parents and displaced homemakers may qualify",
        "Applies to all borrowers on the loan",
        "Must be purchasing in Vermont"
      ]
    },
    {
      category: "Income Limits by County",
      icon: MapPin,
      items: [
        "Chittenden County: $106,800 (1-2 people), $122,820 (3+ people)",
        "Most other counties: $88,000 (1-2 people), $101,200 (3+ people)",
        "Higher limits for targeted areas",
        "Based on gross household income"
      ]
    },
    {
      category: "Credit Requirements",
      icon: FileText,
      items: [
        "Minimum credit score: 640 (most programs)",
        "Some programs require 680+",
        "Must demonstrate stable employment history",
        "Debt-to-income ratio typically under 45%"
      ]
    },
    {
      category: "Property Eligibility",
      icon: Home,
      items: [
        "Must be primary residence (no investment properties)",
        "Purchase price limits: $350,000-$450,000 (varies by county)",
        "Single-family homes, condos, and some multi-family (2-4 units)",
        "Must meet property condition standards"
      ]
    }
  ];

  const applicationSteps = [
    {
      step: 1,
      title: "Complete Homebuyer Education",
      description: "Start with the required 8-hour homebuyer education course.",
      details: [
        "Available online or in-person statewide",
        "Covers budgeting, mortgages, home maintenance, and more",
        "Certificate valid for 2 years",
        "Cost: typically $50-$100"
      ],
      timeframe: "1-2 days (online) or 1 day (in-person)"
    },
    {
      step: 2,
      title: "Find a VHFA-Approved Lender",
      description: "Work with a lender who participates in VHFA programs.",
      details: [
        "Browse VHFA's list of approved lenders",
        "Interview multiple lenders to compare rates",
        "Discuss which programs you qualify for",
        "Gather required financial documentation"
      ],
      timeframe: "1-2 weeks"
    },
    {
      step: 3,
      title: "Get Pre-Approved",
      description: "Obtain pre-approval to understand your budget and strengthen offers.",
      details: [
        "Submit full loan application",
        "Provide income, asset, and employment documentation",
        "Lender will check credit and verify information",
        "Receive pre-approval letter showing loan amount"
      ],
      timeframe: "3-7 business days"
    },
    {
      step: 4,
      title: "Find Your Home & Make an Offer",
      description: "House hunt within your approved price range and make an offer.",
      details: [
        "Work with a real estate agent",
        "Stay within VHFA purchase price limits",
        "Submit offer with pre-approval letter",
        "Property must meet program requirements"
      ],
      timeframe: "Varies (2 weeks - 6 months)"
    },
    {
      step: 5,
      title: "Final Loan Processing",
      description: "Complete the mortgage application process and meet all conditions.",
      details: [
        "Property appraisal ordered and completed",
        "Home inspection and any negotiations",
        "Final loan underwriting and approval",
        "Clear any remaining conditions"
      ],
      timeframe: "30-45 days"
    },
    {
      step: 6,
      title: "Close on Your Home",
      description: "Sign final documents and receive keys to your new Vermont home!",
      details: [
        "Final walkthrough of property",
        "Review and sign closing documents",
        "Bring required funds for closing",
        "Receive keys and begin your homeownership journey"
      ],
      timeframe: "1-2 hours"
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
                  Financial Assistance
                </span>
              </div>

              <h1
                className="mt-6 text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "Coconat" }}
              >
                Vermont Homebuyer Programs
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                Discover financial assistance programs that make homeownership more affordable for Vermont residents. From down payment assistance to low-interest mortgages, learn how to access thousands in savings.
              </p>
            </div>
          </div>
        </section>

        {/* VHFA Programs Overview */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <div className="w-12 h-1 bg-[#21266c] mx-auto mb-4"></div>
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-[0.2em]">
                  Primary Programs
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                VHFA Programs
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                The Vermont Housing Finance Agency (VHFA) offers comprehensive programs to help first-time homebuyers achieve homeownership with affordable financing and assistance.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {vhfaPrograms.map((program, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#3b82f6] transition-all hover:shadow-lg">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center mb-6`}>
                    <program.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-[#21266c] mb-4">
                    {program.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-[#21266c] mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {program.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#21266c] mb-3">Eligibility:</h4>
                    <ul className="space-y-2">
                      {program.eligibility.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full flex-shrink-0 mt-2"></div>
                          <span className="text-gray-600 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Down Payment Assistance Programs */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <div className="w-12 h-1 bg-[#21266c] mx-auto mb-4"></div>
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-[0.2em]">
                  Financial Assistance
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Down Payment Assistance
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Multiple programs offer grants and forgivable loans to help with down payments and closing costs, reducing the cash you need to buy a home.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {assistancePrograms.map((program, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-all">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-[#21266c]">
                        {program.title}
                      </h3>
                    </div>
                    <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                      {program.amount}
                    </div>
                    <div className="text-sm text-gray-600 font-medium mb-3">
                      {program.type}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {program.description}
                  </p>

                  <ul className="space-y-2">
                    {program.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Program Benefits
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Vermont's homebuyer programs offer substantial financial advantages that make homeownership more accessible and affordable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-all text-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-[#3b82f6] mb-2">
                    {benefit.stat}
                  </div>
                  <h3 className="text-lg font-bold text-[#21266c] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility Requirements */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <div className="w-12 h-1 bg-[#21266c] mx-auto mb-4"></div>
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-[0.2em]">
                  Requirements
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Eligibility Requirements
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Understanding the eligibility criteria helps you determine which programs you qualify for and how to prepare your application.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eligibilityRequirements.map((requirement, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                      <requirement.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#21266c]">
                        {requirement.category}
                      </h3>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {requirement.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Important Note */}
            <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
              <div className="flex gap-4">
                <AlertCircle className="w-6 h-6 text-[#3b82f6] flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-[#21266c] mb-2">Important Note</h4>
                  <p className="text-gray-700 text-sm">
                    Income and purchase price limits vary by county and are updated annually. Contact a VHFA-approved lender for current limits in your area. Additionally, some targeted areas may have higher limits or relaxed requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <div className="w-12 h-1 bg-[#21266c] mx-auto mb-4"></div>
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-[0.2em]">
                  How to Apply
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Application Process & Timeline
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Follow these steps to access Vermont's homebuyer programs. The entire process typically takes 2-4 months from start to finish.
              </p>
            </div>

            <div className="space-y-6">
              {applicationSteps.map((step, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 hover:border-[#3b82f6] transition-all">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Step Number */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center text-white text-2xl font-bold">
                        {step.step}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                        <h3 className="text-2xl font-bold text-[#21266c] mb-2 sm:mb-0">
                          {step.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full w-fit">
                          <Clock className="w-4 h-4" />
                          {step.timeframe}
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {step.description}
                      </p>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline Summary */}
            <div className="mt-8 bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-xl p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "Coconat" }}>
                Total Timeline: 2-4 Months
              </h3>
              <p className="text-blue-100">
                From starting homebuyer education to receiving your keys. Timeline varies based on housing market conditions and how quickly you find your home.
              </p>
            </div>
          </div>
        </section>

        {/* Homebuyer Education */}
  

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-2xl p-8 sm:p-12 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "Coconat" }}>
                Ready to Access These Programs?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Take the first step toward affordable homeownership in Vermont. Visit VHFA to learn more about program details and find approved lenders, or contact our team for personalized guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.vhfa.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#21266c] font-medium text-base rounded-full hover:bg-gray-100 transition-all duration-300"
                >
                  VISIT VHFA WEBSITE
                  <ExternalLink className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-medium text-base rounded-full hover:bg-white hover:text-[#21266c] transition-all duration-300"
                >
                  CONTACT US
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#21266c] mb-3">VHFA Contact Information</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                    <span>Phone: 1-800-339-5866</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                    <span>Email: info@vhfa.org</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                    <span>Office Hours: Monday-Friday, 8:00 AM - 4:30 PM EST</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#21266c] mb-3">Next Steps</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                    <span>Review current income and purchase price limits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                    <span>Enroll in homebuyer education course</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                    <span>Find a VHFA-approved lender in your area</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
