"use client";

import {
  Scale,
  FileCheck,
  Shield,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Phone,
  ClipboardCheck,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function VermontAttorneyRequirementPage() {
  const attorneyResponsibilities = [
    {
      icon: FileCheck,
      title: "Title Search & Insurance",
      description:
        "Review title search results, identify potential issues, and arrange title insurance to protect your ownership rights.",
      details: [
        "Examine chain of title for defects",
        "Resolve liens, encumbrances, or easements",
        "Coordinate title insurance policy",
        "Ensure clear and marketable title",
      ],
    },
    {
      icon: ClipboardCheck,
      title: "Document Review & Preparation",
      description:
        "Draft, review, and explain all closing documents including the deed, purchase agreement, and settlement statement.",
      details: [
        "Review purchase and sale agreement",
        "Prepare warranty deed",
        "Review closing disclosure (HUD-1)",
        "Explain all legal documents in plain language",
      ],
    },
    {
      icon: Shield,
      title: "Legal Protection",
      description:
        "Identify and protect you from legal risks, ensure compliance with Vermont real estate law, and advise on contractual obligations.",
      details: [
        "Spot legal issues that agents may miss",
        "Ensure compliance with state regulations",
        "Protect your interests in negotiations",
        "Advise on legal rights and obligations",
      ],
    },
    {
      icon: DollarSign,
      title: "Closing Coordination",
      description:
        "Oversee the closing process, ensure proper fund disbursement, and handle recording of documents with the town clerk.",
      details: [
        "Coordinate closing date and logistics",
        "Verify all funds are properly disbursed",
        "Record deed with town/county clerk",
        "Ensure transfer tax is paid",
      ],
    },
  ];

  const agentVsAttorney = [
    {
      task: "Show properties and arrange viewings",
      agent: true,
      attorney: false,
    },
    {
      task: "Provide market analysis and pricing guidance",
      agent: true,
      attorney: false,
    },
    {
      task: "Negotiate purchase price and terms",
      agent: true,
      attorney: false,
    },
    {
      task: "Prepare purchase and sale agreement",
      agent: true,
      attorney: true,
      note: "Agent drafts initial agreement; attorney reviews and finalizes",
    },
    {
      task: "Conduct title search",
      agent: false,
      attorney: true,
    },
    {
      task: "Review and explain all legal documents",
      agent: false,
      attorney: true,
    },
    {
      task: "Resolve title defects and legal issues",
      agent: false,
      attorney: true,
    },
    {
      task: "Conduct closing and disburse funds",
      agent: false,
      attorney: true,
    },
    {
      task: "Record deed with town clerk",
      agent: false,
      attorney: true,
    },
  ];

  const costs = [
    {
      service: "Residential Purchase (Buyer)",
      range: "$800 - $1,200",
      typical: "$1,000",
    },
    {
      service: "Residential Sale (Seller)",
      range: "$800 - $1,200",
      typical: "$1,000",
    },
    {
      service: "Complex Transaction or Title Issues",
      range: "$1,200 - $2,000+",
      typical: "$1,500",
    },
    {
      service: "Commercial Real Estate",
      range: "$2,000 - $5,000+",
      typical: "$3,000",
    },
  ];

  const findingAnAttorney = [
    {
      source: "Vermont Bar Association",
      description:
        "Search the VT Bar Association's lawyer referral service for real estate attorneys.",
      link: "https://www.vtbar.org/",
    },
    {
      source: "Real Estate Agent Recommendation",
      description:
        "Your agent can recommend experienced local real estate attorneys they've worked with.",
      link: null,
    },
    {
      source: "Lender Recommendation",
      description:
        "Your mortgage lender may have a list of attorneys familiar with Vermont closings.",
      link: null,
    },
    {
      source: "Local Research",
      description:
        "Search for real estate attorneys in the county where the property is located.",
      link: null,
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
              href="/buyers-education"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Buyer's Education
            </Link>

            {/* Page Header */}
            <div className="text-white">
              <div className="inline-block mb-4">
                <div className="w-12 h-1 bg-white mx-auto mb-4"></div>
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                  Vermont Real Estate Law
                </span>
              </div>

              <h1
                className="mt-6 text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "Coconat" }}
              >
                Why Vermont Requires Attorneys at Closing
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                Unlike many states, Vermont requires a licensed attorney to
                conduct real estate closings. Learn why this requirement exists,
                what attorneys do, and how it protects your interests in the home
                buying process.
              </p>
            </div>
          </div>
        </section>

        {/* Why Vermont Requires Attorneys Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#21266c]"
                  style={{ fontFamily: "Coconat" }}
                >
                  Vermont is an "Attorney State"
                </h2>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Vermont is one of approximately 22 "attorney states" where state
                  law or custom requires a licensed attorney to conduct or
                  supervise real estate closings. In Vermont, this requirement is
                  rooted in consumer protection and the complexity of real estate
                  transactions.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Why this matters:</strong> Real estate transactions
                  involve significant legal complexities — title searches,
                  contract interpretation, lien resolution, and compliance with
                  state and federal regulations. Attorneys are trained to identify
                  and resolve legal issues that could jeopardize your ownership or
                  investment.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                    <div className="flex items-start gap-3 mb-2">
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-800 font-medium mb-1">
                          Consumer Protection
                        </p>
                        <p className="text-gray-700 text-sm">
                          Attorneys ensure buyers and sellers understand their
                          legal rights and obligations, reducing the risk of
                          fraud, mistakes, or misunderstandings.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
                    <div className="flex items-start gap-3 mb-2">
                      <Shield className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-800 font-medium mb-1">
                          Title Security
                        </p>
                        <p className="text-gray-700 text-sm">
                          Attorneys conduct thorough title searches and resolve
                          defects, ensuring you receive clear and marketable
                          title to the property.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                  <p className="text-gray-800 font-medium mb-2">Important Note</p>
                  <p className="text-gray-700">
                    While real estate agents are invaluable for market knowledge,
                    property search, and negotiation, they are <strong>not
                    licensed to practice law</strong>. Agents cannot conduct title
                    searches, resolve legal issues, or provide legal advice. In
                    Vermont, only licensed attorneys can perform these critical
                    functions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Attorneys Do Section */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center"
                style={{ fontFamily: "Coconat" }}
              >
                What Your Attorney Does
              </h2>

              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Your attorney handles critical legal tasks that protect your
                interests throughout the transaction.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {attorneyResponsibilities.map((resp, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                        <resp.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {resp.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {resp.description}
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-2 pl-16">
                      {resp.details.map((detail, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Agent vs Attorney Comparison */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center"
                style={{ fontFamily: "Coconat" }}
              >
                Real Estate Agent vs. Attorney
              </h2>

              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Both agents and attorneys play essential but different roles in
                your transaction.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-2 border-gray-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#21266c] to-[#3b82f6] text-white">
                      <th className="px-6 py-4 text-left font-semibold">Task</th>
                      <th className="px-6 py-4 text-center font-semibold">
                        Real Estate Agent
                      </th>
                      <th className="px-6 py-4 text-center font-semibold">
                        Attorney
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {agentVsAttorney.map((item, index) => (
                      <tr
                        key={index}
                        className={`border-b border-gray-200 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-6 py-4 text-gray-900 font-medium">
                          {item.task}
                          {item.note && (
                            <div className="text-xs text-gray-500 mt-1">
                              {item.note}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {item.agent ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto" />
                          ) : (
                            <div className="w-6 h-6 mx-auto text-gray-300">—</div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {item.attorney ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto" />
                          ) : (
                            <div className="w-6 h-6 mx-auto text-gray-300">—</div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
                <p className="text-gray-800">
                  <strong>Key Takeaway:</strong> Agents and attorneys work
                  together as a team. Your agent finds properties, negotiates
                  price and terms, and guides you through the market. Your
                  attorney handles the legal work, protects your ownership rights,
                  and ensures a legally sound transaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Attorney Fees Section */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center"
                style={{ fontFamily: "Coconat" }}
              >
                Attorney Fees in Vermont
              </h2>

              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Attorney fees are a closing cost typically paid at closing. Here's
                what to expect.
              </p>

              <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b-2 border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Service
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Fee Range
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Typical Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {costs.map((cost, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {cost.service}
                        </td>
                        <td className="px-6 py-4 text-gray-700">{cost.range}</td>
                        <td className="px-6 py-4 font-semibold text-[#21266c]">
                          {cost.typical}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    What's Included
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Title search and examination</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Document preparation and review</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Closing coordination and conduct</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Deed recording and title insurance</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    Additional Costs May Apply For:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <span>Complex title issues or defects</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <span>Contract disputes or negotiations</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <span>Lien resolution or legal research</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <span>Commercial properties or land development</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Finding an Attorney Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center"
                style={{ fontFamily: "Coconat" }}
              >
                How to Find a Real Estate Attorney
              </h2>

              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                It's best to select an attorney early in the process, ideally
                before making an offer.
              </p>

              <div className="space-y-6 mb-12">
                {findingAnAttorney.map((option, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0 text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {option.source}
                        </h3>
                        <p className="text-gray-700 mb-3">{option.description}</p>
                        {option.link && (
                          <a
                            href={option.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-[#21266c] font-semibold transition-colors"
                          >
                            Visit Website
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
                <p className="text-gray-800 font-medium mb-2">
                  Questions to Ask When Choosing an Attorney
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                    <span>How many real estate closings do you handle per year?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                    <span>Are you familiar with [property location] area?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                    <span>What is your fee structure and what does it include?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                    <span>How do you communicate with clients during the process?</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-xl p-8 sm:p-12 text-center text-white">
                <Phone className="w-12 h-12 mx-auto mb-4" />
                <h3
                  className="text-2xl sm:text-3xl font-bold mb-3"
                  style={{ fontFamily: "Coconat" }}
                >
                  Need Attorney Recommendations?
                </h3>
                <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                  Our team works with experienced Vermont real estate attorneys
                  and can provide recommendations based on your transaction needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#21266c] font-medium text-base rounded-full hover:bg-gray-100 transition-all duration-300"
                  >
                    Contact Us Today
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/buyers-education"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-medium text-base rounded-full hover:bg-white hover:text-[#21266c] transition-all duration-300"
                  >
                    More Buyer Resources
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
