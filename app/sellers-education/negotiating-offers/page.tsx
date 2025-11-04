import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HandshakeIcon,
  FileText,
  DollarSign,
  Shield,
  Clock,
  TrendingUp,
  Home,
  Scale,
} from "lucide-react";

export default function NegotiatingOffersPage() {
  const purchaseAgreementComponents = [
    {
      component: "Purchase Price",
      description:
        "The amount the buyer is offering to pay for your home",
      considerations: [
        "Compare to your asking price and market value",
        "Consider other offer terms, not just price",
        "Factor in closing costs and concessions",
      ],
    },
    {
      component: "Earnest Money Deposit",
      description:
        "Good faith deposit showing buyer's serious intent",
      considerations: [
        "Typical in Vermont: 1-3% of purchase price",
        "Higher deposits indicate more committed buyers",
        "Held in escrow until closing",
      ],
    },
    {
      component: "Financing Terms",
      description: "How the buyer plans to pay for the property",
      considerations: [
        "Conventional, FHA, VA, or cash offers",
        "Pre-approval letter strength and lender reputation",
        "Down payment percentage (higher is better)",
      ],
    },
    {
      component: "Contingencies",
      description:
        "Conditions that must be met for sale to proceed",
      considerations: [
        "Inspection, financing, appraisal contingencies",
        "Fewer contingencies mean stronger offer",
        "Contingency deadlines and timeline",
      ],
    },
    {
      component: "Closing Date",
      description: "When the sale will be finalized",
      considerations: [
        "Your moving timeline and needs",
        "Buyer's financing timeline",
        "Typical Vermont closing: 30-45 days",
      ],
    },
    {
      component: "Inclusions/Exclusions",
      description:
        "What stays with the home and what seller keeps",
      considerations: [
        "Appliances, fixtures, window treatments",
        "Negotiate items of value separately",
        "Be clear to avoid closing day disputes",
      ],
    },
  ];

  const evaluatingOffers = [
    {
      factor: "Offer Price",
      weight: "High",
      details:
        "Obviously important, but not the only factor. Consider net proceeds after closing costs and concessions.",
    },
    {
      factor: "Buyer Financing",
      weight: "High",
      details:
        "Cash offers are strongest. Pre-approved conventional loans are solid. FHA/VA have additional requirements.",
    },
    {
      factor: "Down Payment",
      weight: "Medium-High",
      details:
        "20%+ down payment indicates financially strong buyer less likely to have appraisal or financing issues.",
    },
    {
      factor: "Contingencies",
      weight: "High",
      details:
        "Fewer contingencies mean less risk of deal falling through. Inspection and financing are standard; others add risk.",
    },
    {
      factor: "Closing Timeline",
      weight: "Medium",
      details:
        "Must work with your schedule. Quick cash closes can be 7-14 days; financed typically 30-45 days.",
    },
    {
      factor: "Earnest Money",
      weight: "Medium",
      details:
        "Higher deposits show commitment. Typical is 1-3%, but 5%+ indicates very serious buyer.",
    },
    {
      factor: "Buyer's Letter",
      weight: "Low",
      details:
        "Personal letters can be touching but evaluate offer terms first. Don't let emotion override business decision.",
    },
    {
      factor: "Escalation Clause",
      weight: "Variable",
      details:
        "Buyer agrees to outbid other offers up to a maximum. Can be good but verify buyer can actually afford max price.",
    },
  ];

  const contingencies = [
    {
      type: "Home Inspection Contingency",
      timeline: "10-14 days typically",
      description:
        "Buyer has right to inspect and negotiate repairs or credits",
      sellerTips: [
        "Standard and reasonable contingency to expect",
        "Be prepared to negotiate repair requests",
        "Consider pre-inspection to identify issues early",
        "Set reasonable deadline (10-14 days max)",
      ],
    },
    {
      type: "Financing Contingency",
      timeline: "30-45 days typically",
      description:
        "Buyer must secure mortgage approval or can cancel contract",
      sellerTips: [
        "Verify buyer has strong pre-approval letter",
        "Ask for proof of funds for down payment",
        "Shorter financing contingencies are better",
        "Cash offers eliminate this risk entirely",
      ],
    },
    {
      type: "Appraisal Contingency",
      timeline: "After inspection, before closing",
      description:
        "Home must appraise at or above purchase price",
      sellerTips: [
        "Price home correctly to avoid appraisal issues",
        "Provide comparable sales data to appraiser",
        "Be prepared to negotiate if appraisal comes low",
        "Consider appraisal gap coverage requests",
      ],
    },
    {
      type: "Sale of Buyer's Home",
      timeline: "Variable, often 30-60 days",
      description:
        "Buyer must sell their current home first",
      sellerTips: [
        "Risky contingency—buyer's sale could fall through",
        "Accept only if buyer's home is already under contract",
        "Require kick-out clause allowing you to accept backup offers",
        "In seller's market, avoid these offers if possible",
      ],
    },
  ];

  const multipleOffersStrategy = [
    {
      step: "Review All Offers Thoroughly",
      actions: [
        "Compare net proceeds after all costs and concessions",
        "Evaluate buyer strength and likelihood to close",
        "Consider your timeline and contingency tolerance",
        "Don't rush—take time to analyze each offer",
      ],
    },
    {
      step: "Request Highest and Best",
      actions: [
        "Notify all buyers you have multiple offers",
        "Set deadline for improved offers (24-48 hours)",
        "Don't disclose other offer details",
        "Creates competition and drives up price",
      ],
    },
    {
      step: "Counter the Best Offer(s)",
      actions: [
        "Counter your top 1-2 offers simultaneously",
        "Request better terms while keeping competition alive",
        "Set short deadline for response (12-24 hours)",
        "Be prepared for both, either, or neither to accept",
      ],
    },
    {
      step: "Accept and Execute",
      actions: [
        "Choose the offer with best combination of price and terms",
        "Execute contract promptly once terms are agreed",
        "Keep backup offers warm in case primary falls through",
        "Notify all other buyers you've accepted an offer",
      ],
    },
  ];

  const negotiatingRepairs = [
    {
      approach: "Reasonable Repairs",
      description: "Significant issues affecting safety, structure, or systems",
      recommendation: "Generally agree to fix or provide credits",
      examples: [
        "Roof leaks or damage",
        "Electrical or plumbing issues",
        "HVAC system failures",
        "Structural problems",
        "Well or septic issues",
      ],
    },
    {
      approach: "Minor/Cosmetic Items",
      description: "Small repairs or aesthetic preferences",
      recommendation: "Push back or offer small credit",
      examples: [
        "Paint touch-ups",
        "Minor carpet stains",
        "Cabinet hardware",
        "Small drywall repairs",
        "Cosmetic improvements",
      ],
    },
    {
      approach: "Big-Ticket Items",
      description:
        "Major systems near end of life but currently functioning",
      recommendation: "Negotiate credit or price reduction",
      examples: [
        "Aging roof with 5-10 years left",
        "Older HVAC system still working",
        "Old but functional appliances",
        "Windows that could be upgraded",
      ],
    },
  ];

  const lowOfferResponse = [
    {
      scenario: "Offer is 5-10% Below Asking",
      response: "Counter at or near your asking price",
      strategy:
        "Show you're willing to negotiate but price is firm. If market supports your price, don't drop significantly.",
    },
    {
      scenario: "Offer is 10-15% Below Asking",
      response:
        "Counter meaningfully above their offer but show flexibility",
      strategy:
        "Meet somewhere in middle if other terms are strong. Evaluate if your asking price is realistic.",
    },
    {
      scenario: "Offer is 15%+ Below Asking",
      response: "Reject or counter at asking price",
      strategy:
        "Don't reward lowball offers with big concessions. If this is common feedback, reassess your pricing.",
    },
    {
      scenario: "All Offers Coming in Low",
      response: "Reduce asking price rather than negotiating individually",
      strategy:
        "Market is telling you price is too high. Make strategic price reduction to attract better offers.",
    },
  ];

  const counterofferBestPractices = [
    "Counter only the terms you want to change, accept the rest",
    "Set short deadlines (12-48 hours) to maintain momentum",
    "Be reasonable—aggressive counters can offend buyers",
    "Counter multiple offers simultaneously to create competition",
    "Get everything in writing; verbal agreements aren't binding",
    "Work closely with your agent on counter strategy",
    "Be prepared for buyer to walk away after counter",
    "Know your bottom line before entering negotiations",
    "Consider total net proceeds, not just price",
    "Don't counter in anger or emotion",
  ];

  const vermontDisclosures = [
    {
      disclosure: "Property Condition Disclosure",
      requirement: "Required for most sales",
      details:
        "Sellers must complete VCAR Property Condition Disclosure form disclosing known defects and issues",
    },
    {
      disclosure: "Well Water Testing",
      requirement: "Required by law",
      details:
        "Well water must be tested for coliform bacteria, nitrates, and other contaminants. Results provided to buyer.",
    },
    {
      disclosure: "Lead Paint Disclosure",
      requirement: "Required for homes built before 1978",
      details:
        "Federal law requires lead paint disclosure and 10-day testing period for pre-1978 homes",
    },
    {
      disclosure: "Septic System Information",
      requirement: "Recommended",
      details:
        "Provide maintenance records, pumping history, and location of tank and leach field",
    },
    {
      disclosure: "Underground Storage Tanks",
      requirement: "Required if present",
      details:
        "Must disclose presence of oil tanks or other underground storage, even if removed",
    },
    {
      disclosure: "Flood Zone Status",
      requirement: "Required if in flood zone",
      details:
        "Disclose if property is in FEMA flood zone and flood insurance requirements",
    },
  ];

  const closingTimeline = [
    {
      milestone: "Offer Accepted",
      timing: "Day 0",
      activities: [
        "Contract executed by both parties",
        "Earnest money deposited to escrow",
        "Buyer applies for financing if applicable",
      ],
    },
    {
      milestone: "Inspection Period",
      timing: "Days 7-14",
      activities: [
        "Buyer conducts home inspection",
        "Inspection report delivered to seller",
        "Negotiate any repair requests or credits",
        "Inspection contingency removed or deal cancelled",
      ],
    },
    {
      milestone: "Appraisal",
      timing: "Days 14-21",
      activities: [
        "Lender orders appraisal",
        "Appraiser inspects property",
        "Appraisal report delivered",
        "Negotiate if appraisal is low",
      ],
    },
    {
      milestone: "Final Loan Approval",
      timing: "Days 21-30",
      activities: [
        "Underwriter reviews full buyer file",
        "Final loan commitment issued",
        "Financing contingency removed",
        "Closing date confirmed",
      ],
    },
    {
      milestone: "Final Walk-Through",
      timing: "1-2 days before closing",
      activities: [
        "Buyer verifies property condition",
        "Ensures agreed repairs completed",
        "Checks that included items remain",
        "Utilities still working",
      ],
    },
    {
      milestone: "Closing",
      timing: "Days 30-45 typical",
      activities: [
        "Sign closing documents",
        "Buyer funds purchase",
        "Title transfers to buyer",
        "You receive your proceeds!",
      ],
    },
  ];

  const relatedResources = [
    {
      title: "Pricing Strategy",
      description: "Price correctly to attract strong offers from the start",
      href: "/sellers-education/pricing-strategy",
    },
    {
      title: "Marketing Your Home",
      description: "Generate maximum interest and multiple offers",
      href: "/sellers-education/marketing-your-home",
    },
    {
      title: "Preparing to Sell",
      description: "Minimize inspection issues with proper preparation",
      href: "/sellers-education/preparing-to-sell",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#21266c] to-[#3b82f6] text-white pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/sellers-education"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Seller's Education Center
          </Link>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "Coconat" }}
          >
            Negotiating Offers and Closing the Sale
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Understanding purchase agreements, evaluating offers, navigating
            contingencies, and successfully reaching closing on your Vermont home
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <HandshakeIcon className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#21266c] text-lg mb-2">
                  The Art of Negotiation
                </h3>
                <p className="text-gray-700">
                  Receiving an offer is exciting, but it's just the beginning of
                  the negotiation process. The terms you negotiate—price,
                  contingencies, timeline, and repairs—can significantly impact
                  your net proceeds and stress level. Understanding how to evaluate
                  offers and negotiate effectively ensures you maximize your sale
                  while minimizing risk of deals falling through.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Purchase Agreements */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Understanding Purchase Agreements
            </h2>
            <p className="text-xl text-gray-600">
              Key components of every offer you'll receive
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchaseAgreementComponents.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="bg-blue-50 p-3 rounded-lg inline-block mb-4">
                  <FileText className="w-6 h-6 text-[#3b82f6]" />
                </div>
                <h3 className="text-xl font-bold text-[#21266c] mb-2">
                  {item.component}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="space-y-2">
                  {item.considerations.map((consideration, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">
                        {consideration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Never Review Offers Alone
                </h3>
                <p className="text-gray-700">
                  Purchase agreements are legally binding contracts with
                  significant financial implications. Always review offers with
                  your real estate agent who can explain terms, identify red
                  flags, and advise on negotiation strategy. In Vermont, the
                  standard VCAR (Vermont Association of Realtors) purchase
                  agreement is typically used, but terms can vary significantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evaluating Multiple Offers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Evaluating Offers: Beyond the Price
            </h2>
            <p className="text-xl text-gray-600">
              How to assess offer strength and choose the best one
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-[#21266c] text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Offer Factor</th>
                  <th className="px-6 py-4 text-left">Importance</th>
                  <th className="px-6 py-4 text-left">What to Consider</th>
                </tr>
              </thead>
              <tbody>
                {evaluatingOffers.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {item.factor}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.weight === "High"
                            ? "bg-red-100 text-red-800"
                            : item.weight.includes("Medium")
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.weight}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{item.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Scale className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Calculate Net Proceeds
                </h3>
                <p className="text-gray-700 mb-3">
                  The highest offer price isn't always the best deal. Calculate
                  your actual net proceeds for each offer:
                </p>
                <div className="bg-white p-4 rounded space-y-1 text-sm text-gray-700">
                  <div>Offer Price: $400,000</div>
                  <div>- Agent Commission (5-6%): -$24,000</div>
                  <div>- Closing Costs: -$3,000</div>
                  <div>- Buyer Credits/Concessions: -$5,000</div>
                  <div>- Agreed Repairs: -$2,000</div>
                  <div className="border-t border-gray-300 pt-1 font-bold">
                    = Net Proceeds: $366,000
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contingencies Explained */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Contingencies Explained
            </h2>
            <p className="text-xl text-gray-600">
              Understanding common contingencies and how to navigate them
            </p>
          </div>

          <div className="space-y-6">
            {contingencies.map((contingency, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-8"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-[#21266c]">
                    {contingency.type}
                  </h3>
                  <span className="text-sm bg-blue-50 text-[#3b82f6] px-3 py-1 rounded-full font-semibold whitespace-nowrap ml-4">
                    {contingency.timeline}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">{contingency.description}</p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Seller Tips:
                  </h4>
                  <ul className="space-y-2">
                    {contingency.sellerTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Handling Multiple Offers */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Handling Multiple Offers
            </h2>
            <p className="text-xl text-gray-600">
              Leverage competition to get the best price and terms
            </p>
          </div>

          <div className="space-y-6">
            {multipleOffersStrategy.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 border border-gray-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-[#21266c] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-[#21266c] pt-2">
                    {step.step}
                  </h3>
                </div>
                <ul className="space-y-2 ml-16">
                  {step.actions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#21266c] text-lg mb-2">
                  Multiple Offer Situations
                </h3>
                <p className="text-gray-700">
                  Multiple offers are a seller's dream scenario. They indicate
                  you've priced correctly and marketed effectively. Use the
                  competition to improve terms: push buyers to remove
                  contingencies, increase earnest money, waive repair requests, or
                  raise their price. However, maintain professionalism and
                  fairness—don't play games or act in bad faith, as this can
                  backfire and offend all buyers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Negotiating Repairs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Negotiating Repairs and Credits
            </h2>
            <p className="text-xl text-gray-600">
              How to respond to inspection repair requests
            </p>
          </div>

          <div className="space-y-6">
            {negotiatingRepairs.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-8"
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#21266c] mb-2">
                    {item.approach}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="font-semibold text-[#21266c]">
                    Recommended Response: {item.recommendation}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
                  <ul className="space-y-1">
                    {item.examples.map((example, idx) => (
                      <li key={idx} className="text-gray-700 text-sm">
                        • {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    Credits vs. Repairs
                  </h3>
                  <p className="text-gray-700">
                    Often better to give credits at closing rather than making
                    repairs yourself. Buyers can choose their own contractors and
                    you avoid scheduling headaches. Credits also ensure work is
                    done to buyer's satisfaction.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    Don't Over-Negotiate
                  </h3>
                  <p className="text-gray-700">
                    Fighting over every small repair request can sour the deal.
                    Pick your battles. If buyer is reasonable and financially
                    strong, compromise on minor items to keep deal together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Handling Low Offers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Handling Low Offers
            </h2>
            <p className="text-xl text-gray-600">
              How to respond when offers come in below asking price
            </p>
          </div>

          <div className="space-y-6">
            {lowOfferResponse.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#21266c]">
                    {item.scenario}
                  </h3>
                  <span className="bg-blue-50 text-[#3b82f6] px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-4">
                    {item.response}
                  </span>
                </div>
                <p className="text-gray-700">{item.strategy}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <DollarSign className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#21266c] text-lg mb-2">
                  Listen to the Market
                </h3>
                <p className="text-gray-700">
                  If every offer is coming in low, the market is telling you your
                  asking price is too high. Don't take it personally—adjust your
                  price based on feedback. One buyer offering low might be a
                  lowballer; all buyers offering low means you're overpriced. Work
                  with your agent to make strategic price adjustments rather than
                  counter-offering each low bid individually.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counteroffer Best Practices */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Counteroffer Best Practices
            </h2>
            <p className="text-xl text-gray-600">
              Professional negotiation tactics that close deals
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-4">
              {counterofferBestPractices.map((practice, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{practice}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border-2 border-[#3b82f6] text-center">
              <Clock className="w-12 h-12 text-[#3b82f6] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#21266c] mb-2">
                Move Quickly
              </h3>
              <p className="text-gray-700">
                Respond to offers within 12-24 hours to maintain buyer interest
                and momentum
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border-2 border-[#3b82f6] text-center">
              <HandshakeIcon className="w-12 h-12 text-[#3b82f6] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#21266c] mb-2">
                Be Reasonable
              </h3>
              <p className="text-gray-700">
                Aggressive counters can offend buyers. Show willingness to
                negotiate fairly
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border-2 border-[#3b82f6] text-center">
              <Shield className="w-12 h-12 text-[#3b82f6] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#21266c] mb-2">
                Get it in Writing
              </h3>
              <p className="text-gray-700">
                All negotiated terms must be in writing. Verbal agreements aren't
                enforceable
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vermont Disclosure Requirements */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Vermont Disclosure Requirements
            </h2>
            <p className="text-xl text-gray-600">
              Legal requirements you must fulfill when selling
            </p>
          </div>

          <div className="space-y-4">
            {vermontDisclosures.map((disclosure, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-[#21266c]">
                    {disclosure.disclosure}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-4 ${
                      disclosure.requirement.includes("Required")
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {disclosure.requirement}
                  </span>
                </div>
                <p className="text-gray-700">{disclosure.details}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Disclose Everything
                </h3>
                <p className="text-gray-700">
                  Vermont law requires sellers to disclose all known material
                  defects. "Material" means anything that would affect a buyer's
                  decision or the property's value. When in doubt, disclose it.
                  Failure to disclose known defects can result in lawsuits after
                  closing, even years later. It's better to be over-transparent
                  than to hide issues that will come back to haunt you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Path to Closing */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Path to Closing
            </h2>
            <p className="text-xl text-gray-600">
              What happens between accepted offer and closing day
            </p>
          </div>

          <div className="space-y-4">
            {closingTimeline.map((phase, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 border border-gray-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-[#21266c] text-white px-4 py-2 rounded-lg font-bold whitespace-nowrap">
                    {phase.timing}
                  </div>
                  <h3 className="text-2xl font-bold text-[#21266c] pt-1">
                    {phase.milestone}
                  </h3>
                </div>
                <ul className="space-y-2 ml-4">
                  {phase.activities.map((activity, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Home className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Closing Day
                </h3>
                <p className="text-gray-700">
                  At closing, you'll sign the deed transferring ownership to the
                  buyer, along with various closing documents. You'll receive your
                  proceeds via wire transfer or check (wire is faster and safer).
                  Bring photo ID, all house keys, garage door openers, and any
                  relevant documentation. Your agent and attorney will guide you
                  through the process. Congratulations—you've successfully sold
                  your Vermont home!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#21266c] mb-8 text-center"
            style={{ fontFamily: "Coconat" }}
          >
            Related Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedResources.map((resource, index) => (
              <Link
                key={index}
                href={resource.href}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all group"
              >
                <h3 className="text-xl font-bold text-[#21266c] mb-3 group-hover:text-[#3b82f6] transition-colors">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <div className="text-[#3b82f6] font-semibold flex items-center gap-2">
                  Learn More
                  <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#21266c] to-[#3b82f6] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "Coconat" }}
          >
            Ready to Navigate Your Home Sale?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Our experienced agents are skilled negotiators who will fight for your
            best interests from offer to closing. Let us guide you through every
            step of the process.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-[#21266c] px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Get Expert Negotiation Help
            </Link>
            <Link
              href="/calculators"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Calculate Your Net Proceeds
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
