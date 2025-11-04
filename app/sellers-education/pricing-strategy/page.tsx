import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  BarChart3,
} from "lucide-react";

export default function PricingStrategyPage() {
  const cmaFactors = [
    {
      factor: "Recently Sold Comparables",
      description:
        "Homes similar to yours that sold in the past 3-6 months within 1 mile",
      weight: "High",
    },
    {
      factor: "Active Competition",
      description:
        "Currently listed homes buyers will compare to yours",
      weight: "High",
    },
    {
      factor: "Pending Sales",
      description:
        "Homes under contract that indicate current market demand",
      weight: "Medium",
    },
    {
      factor: "Expired/Withdrawn Listings",
      description: "Homes that didn't sell, often due to pricing issues",
      weight: "Medium",
    },
    {
      factor: "Square Footage",
      description: "Price per square foot comparison with similar homes",
      weight: "High",
    },
    {
      factor: "Condition & Updates",
      description: "Adjustments for improvements, condition, and age",
      weight: "High",
    },
  ];

  const pricingFactors = [
    {
      category: "Property Features",
      items: [
        "Location and neighborhood quality",
        "Square footage and lot size",
        "Number of bedrooms and bathrooms",
        "Condition and age of property",
        "Recent updates and improvements",
        "Unique features and amenities",
      ],
    },
    {
      category: "Market Conditions",
      items: [
        "Current supply and demand",
        "Local economic trends",
        "Interest rates and lending climate",
        "Seasonal market variations",
        "Days on market trends",
        "Recent comparable sales",
      ],
    },
    {
      category: "Vermont-Specific",
      items: [
        "Ski resort proximity",
        "Lake or mountain views",
        "Land and acreage",
        "Energy efficiency and heating costs",
        "Well and septic systems",
        "Proximity to recreation and towns",
      ],
    },
  ];

  const pricingStrategies = [
    {
      strategy: "Market Value Pricing",
      approach:
        "Price at fair market value based on CMA",
      pros: [
        "Attracts serious buyers immediately",
        "Results in faster sale",
        "Often gets multiple offers",
        "Reduces carrying costs",
      ],
      cons: [
        "Less negotiation room",
        "May leave money on table in hot market",
      ],
      bestFor: "Most situations, especially normal to hot markets",
    },
    {
      strategy: "Aspirational Pricing",
      approach: "Price 5-10% above market value",
      pros: [
        "More negotiation room",
        "Might get lucky with right buyer",
        "Can always reduce later",
      ],
      cons: [
        "Fewer showings and offers",
        "Property becomes stale",
        "Often sell for less after price reduction",
        "Longer time on market",
      ],
      bestFor: "Unique properties or very hot markets with low inventory",
    },
    {
      strategy: "Competitive Pricing",
      approach: "Price slightly below market value",
      pros: [
        "Generates immediate interest",
        "Often results in multiple offers",
        "Can drive price above asking",
        "Quick sale",
      ],
      cons: [
        "Risk of leaving money on table",
        "May attract only bargain hunters",
      ],
      bestFor: "Buyer's markets or when you need to sell quickly",
    },
  ];

  const overUnderPricing = [
    {
      type: "Overpricing Risks",
      icon: TrendingUp,
      color: "text-red-600",
      bgColor: "bg-red-50",
      risks: [
        "Attracts wrong buyer pool who can't afford your home",
        "Serious buyers skip your listing entirely",
        "Property becomes 'stale' after 30-60 days",
        "Eventually forced to reduce price below market value",
        "End up with lower sale price than if priced correctly initially",
        "Longer carrying costs (mortgage, taxes, utilities, maintenance)",
      ],
    },
    {
      type: "Underpricing Risks",
      icon: TrendingDown,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      risks: [
        "May leave significant money on the table",
        "Creates suspicion among buyers (what's wrong with it?)",
        "Can attract only bargain hunters, not quality buyers",
        "May result in lowball offers even below asking price",
        "Reduces perceived value of your home",
        "Difficult to justify higher price during appraisal",
      ],
    },
  ];

  const marketConditions = [
    {
      condition: "Seller's Market",
      indicators: [
        "Low inventory (less than 3 months supply)",
        "Multiple offers common",
        "Homes selling above asking price",
        "Average days on market under 30",
      ],
      strategy:
        "Price at or slightly above market value. Consider 'Coming Soon' marketing to build demand.",
    },
    {
      condition: "Buyer's Market",
      indicators: [
        "High inventory (more than 6 months supply)",
        "Homes sitting longer than 60 days",
        "Price reductions common",
        "Buyers have many choices",
      ],
      strategy:
        "Price competitively at or slightly below market value. Focus on making home stand out through condition and staging.",
    },
    {
      condition: "Balanced Market",
      indicators: [
        "3-6 months of inventory",
        "Homes selling close to asking price",
        "Average days on market 30-60",
        "Steady buyer activity",
      ],
      strategy:
        "Price at fair market value based on CMA. Quality presentation and strategic marketing are key differentiators.",
    },
  ];

  const appraisalProcess = [
    {
      step: "Appraisal Ordered",
      description:
        "Buyer's lender orders appraisal after offer acceptance",
      timeline: "Within 1 week of contract",
    },
    {
      step: "Property Inspection",
      description:
        "Appraiser visits home to assess condition and measure",
      timeline: "1-2 weeks after order",
    },
    {
      step: "Market Analysis",
      description:
        "Appraiser researches comparable sales and analyzes market data",
      timeline: "Same week as inspection",
    },
    {
      step: "Report Preparation",
      description: "Appraiser prepares detailed report with value opinion",
      timeline: "2-3 days after inspection",
    },
    {
      step: "Report Delivery",
      description:
        "Appraisal delivered to lender who shares with buyer and agent",
      timeline: "7-10 days total from order",
    },
  ];

  const priceAdjustmentTips = [
    {
      timing: "After 2 Weeks",
      showings: "No showings or fewer than 2",
      action:
        "Price likely too high. Consider 3-5% reduction immediately.",
      urgency: "High",
    },
    {
      timing: "After 4 Weeks",
      showings: "Few showings but no offers",
      action:
        "Re-evaluate pricing and presentation. Consider 5-7% reduction.",
      urgency: "High",
    },
    {
      timing: "After 6 Weeks",
      showings: "Good showings but no offers",
      action:
        "Likely slight overpricing or presentation issues. Reduce 3-5%.",
      urgency: "Medium",
    },
    {
      timing: "After 8 Weeks",
      showings: "Any activity level",
      action:
        "Property is stale. Significant reduction (10%+) or remove from market temporarily.",
      urgency: "Critical",
    },
  ];

  const relatedResources = [
    {
      title: "Preparing to Sell",
      description:
        "Improvements and repairs can impact your pricing strategy",
      href: "/sellers-education/preparing-to-sell",
    },
    {
      title: "Marketing Your Home",
      description: "Effective marketing supports your pricing strategy",
      href: "/sellers-education/marketing-your-home",
    },
    {
      title: "Negotiating Offers",
      description: "Navigate offers once your pricing attracts buyers",
      href: "/sellers-education/negotiating-offers",
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
            Pricing Strategy for Vermont Homes
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Understanding market analysis, competitive pricing, and strategies to
            get the best price for your home
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Target className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#21266c] text-lg mb-2">
                  Pricing is Your Most Important Decision
                </h3>
                <p className="text-gray-700">
                  The asking price you set will determine which buyers view your
                  home, how long it stays on the market, and ultimately how much
                  you net from the sale. Studies show that homes priced correctly
                  from day one sell for 5-10% more than homes that start
                  overpriced and require reductions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding CMA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Understanding Comparative Market Analysis (CMA)
            </h2>
            <p className="text-xl text-gray-600">
              A CMA is a detailed analysis of recently sold and active comparable
              properties used to determine your home's value
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cmaFactors.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#21266c]">
                    {item.factor}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-semibold ${
                      item.weight === "High"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.weight}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <BarChart3 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Why You Need a Professional CMA
                </h3>
                <p className="text-gray-700">
                  While online estimates from Zillow or Realtor.com can be
                  helpful starting points, they lack the nuance and local
                  expertise of a professional CMA. Real estate agents have access
                  to MLS data showing actual sale prices (not just list prices),
                  can evaluate property condition and upgrades, and understand
                  Vermont's unique micro-markets. Professional CMAs are typically
                  accurate within 3-5% of actual sale price.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Factors Affecting Home Value */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Factors Affecting Home Value in Vermont
            </h2>
            <p className="text-xl text-gray-600">
              Multiple factors influence what buyers will pay for your home
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingFactors.map((section, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#21266c] mb-4">
                  {section.category}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Strategies */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Common Pricing Strategies
            </h2>
            <p className="text-xl text-gray-600">
              Different approaches to pricing your Vermont home
            </p>
          </div>

          <div className="space-y-6">
            {pricingStrategies.map((strategy, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-lg p-8"
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#21266c] mb-2">
                    {strategy.strategy}
                  </h3>
                  <p className="text-gray-600 text-lg">{strategy.approach}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Advantages
                    </h4>
                    <ul className="space-y-2">
                      {strategy.pros.map((pro, idx) => (
                        <li key={idx} className="text-gray-700 text-sm pl-7">
                          • {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Disadvantages
                    </h4>
                    <ul className="space-y-2">
                      {strategy.cons.map((con, idx) => (
                        <li key={idx} className="text-gray-700 text-sm pl-7">
                          • {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <span className="font-semibold text-[#21266c]">
                      Best For:
                    </span>{" "}
                    {strategy.bestFor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overpricing vs Underpricing */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4 text-center"
              style={{ fontFamily: "Coconat" }}
            >
              The Risks of Incorrect Pricing
            </h2>
            <p className="text-xl text-gray-600 text-center">
              Why getting it right the first time matters
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {overUnderPricing.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`${section.bgColor} p-3 rounded-lg`}>
                      <IconComponent className={`w-8 h-8 ${section.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#21266c]">
                      {section.type}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {section.risks.map((risk, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <AlertCircle
                          className={`w-5 h-5 ${section.color} flex-shrink-0 mt-0.5`}
                        />
                        <span className="text-gray-700">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-white rounded-lg p-8 border-2 border-[#3b82f6]">
            <h3 className="text-2xl font-bold text-[#21266c] mb-4 text-center">
              The 'Sweet Spot' Pricing Strategy
            </h3>
            <p className="text-gray-700 text-center max-w-3xl mx-auto mb-6">
              The best approach is to price at or just below fair market value
              based on a thorough CMA. This generates immediate buyer interest,
              often resulting in multiple offers that drive the price up to or
              above your target. It's counterintuitive, but starting lower often
              results in a higher final sale price than starting high.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-[#3b82f6] mb-2">
                  Day 1-7
                </div>
                <div className="text-sm text-gray-600">
                  Maximum buyer interest when properly priced
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-[#3b82f6] mb-2">
                  14 Days
                </div>
                <div className="text-sm text-gray-600">
                  Most offers come within first 2 weeks
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-[#3b82f6] mb-2">
                  30 Days
                </div>
                <div className="text-sm text-gray-600">
                  Property becomes 'stale' after 30 days
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Conditions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Understanding Market Conditions
            </h2>
            <p className="text-xl text-gray-600">
              Adjust your strategy based on current market dynamics
            </p>
          </div>

          <div className="space-y-6">
            {marketConditions.map((market, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-8"
              >
                <h3 className="text-2xl font-bold text-[#21266c] mb-4">
                  {market.condition}
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Key Indicators:
                    </h4>
                    <ul className="space-y-2">
                      {market.indicators.map((indicator, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{indicator}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Pricing Strategy:
                    </h4>
                    <p className="text-gray-700 bg-blue-50 p-4 rounded-lg">
                      {market.strategy}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appraisal Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4 text-center"
              style={{ fontFamily: "Coconat" }}
            >
              Understanding the Appraisal Process
            </h2>
            <p className="text-xl text-gray-600 text-center">
              How lenders determine if your agreed price is justified
            </p>
          </div>

          <div className="space-y-4">
            {appraisalProcess.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 border border-gray-200 flex items-start gap-4"
              >
                <div className="bg-[#21266c] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-[#21266c]">
                      {step.step}
                    </h3>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {step.timeline}
                    </span>
                  </div>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  What If the Appraisal Comes in Low?
                </h3>
                <p className="text-gray-700 mb-3">
                  If the appraisal is lower than the agreed purchase price, you
                  have several options:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Lower your price to match the appraisal</li>
                  <li>
                    • Buyer pays the difference in cash (between appraisal and
                    purchase price)
                  </li>
                  <li>• Meet somewhere in the middle through negotiation</li>
                  <li>
                    • Contest the appraisal with additional comparable data
                  </li>
                  <li>• Walk away from the deal (if allowed by contract)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Adjustments */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              When and How to Adjust Your Price
            </h2>
            <p className="text-xl text-gray-600">
              Guidelines for price reductions based on market feedback
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-[#21266c] text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Timeline</th>
                  <th className="px-6 py-4 text-left">Showing Activity</th>
                  <th className="px-6 py-4 text-left">Recommended Action</th>
                  <th className="px-6 py-4 text-left">Urgency</th>
                </tr>
              </thead>
              <tbody>
                {priceAdjustmentTips.map((tip, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {tip.timing}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{tip.showings}</td>
                    <td className="px-6 py-4 text-gray-700">{tip.action}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          tip.urgency === "Critical"
                            ? "bg-red-100 text-red-800"
                            : tip.urgency === "High"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {tip.urgency}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <DollarSign className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#21266c] text-lg mb-2">
                  Make Price Reductions Count
                </h3>
                <p className="text-gray-700">
                  When reducing price, make it significant enough to move you into
                  a new buyer search bracket and generate renewed interest. Small
                  reductions of 1-2% often don't work. Aim for at least 3-5% to
                  make an impact. In Vermont, crossing price thresholds like
                  $300K, $400K, $500K can dramatically increase your buyer pool.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vermont Market Trends */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Vermont Market Trends
            </h2>
            <p className="text-xl text-gray-600">
              Understanding Vermont's unique real estate market dynamics
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-[#21266c] mb-4">
                Seasonal Variations
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Spring/Summer (Peak Season)
                  </h4>
                  <p className="text-gray-700 mb-2">
                    Most buyers, highest prices, fastest sales
                  </p>
                  <p className="text-sm text-gray-600">
                    May-August typically sees 40% of annual sales volume
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Fall (Strong Market)
                  </h4>
                  <p className="text-gray-700 mb-2">
                    Serious buyers, beautiful foliage helps showings
                  </p>
                  <p className="text-sm text-gray-600">
                    September-October can see multiple offers
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Winter (Slower Season)
                  </h4>
                  <p className="text-gray-700 mb-2">
                    Fewer buyers, more serious intent, longer market time
                  </p>
                  <p className="text-sm text-gray-600">
                    Price competitively and ensure home shows warm and inviting
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-[#21266c] mb-4">
                Location Premium Factors
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-900">
                      Ski Resort Access:
                    </span>
                    <span className="text-gray-700">
                      {" "}
                      Within 30 minutes of major resorts adds 15-25% premium
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-900">
                      Lake Frontage:
                    </span>
                    <span className="text-gray-700">
                      {" "}
                      Direct waterfront commands 40-60% premium over similar
                      homes
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-900">
                      Mountain Views:
                    </span>
                    <span className="text-gray-700">
                      {" "}
                      Unobstructed views add 10-20% to value
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-900">Acreage:</span>
                    <span className="text-gray-700">
                      {" "}
                      10+ acres valued by Vermont buyers, especially with trails
                      or streams
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-900">
                      Town Centers:
                    </span>
                    <span className="text-gray-700">
                      {" "}
                      Walkable village locations increasingly desirable
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-900">
                      Burlington Area:
                    </span>
                    <span className="text-gray-700">
                      {" "}
                      Chittenden County consistently strongest market
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16">
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
            Get a Professional Market Analysis
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Receive a comprehensive CMA and pricing strategy tailored to your
            Vermont home. Our experienced agents will help you determine the
            optimal price to maximize your sale.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-[#21266c] px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Request Free Home Valuation
            </Link>
            <Link
              href="/calculators"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Try Pricing Calculators
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
