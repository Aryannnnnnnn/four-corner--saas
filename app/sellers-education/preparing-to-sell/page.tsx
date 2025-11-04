import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Home,
  Sparkles,
  Calendar,
  DollarSign,
  Thermometer,
} from "lucide-react";

export default function PreparingToSellPage() {
  const repairs = [
    {
      category: "Critical Repairs",
      items: [
        "Fix leaky roofs and damaged shingles",
        "Repair broken windows and cracked glass",
        "Address foundation cracks and structural issues",
        "Fix plumbing leaks and water damage",
        "Repair or replace faulty electrical systems",
        "Fix broken HVAC systems",
      ],
    },
    {
      category: "Curb Appeal",
      items: [
        "Fresh paint on front door and trim",
        "Clean or replace gutters and downspouts",
        "Power wash siding and walkways",
        "Landscape and lawn maintenance",
        "Repair or replace damaged driveway",
        "Add seasonal flowers and plants",
      ],
    },
    {
      category: "Interior Updates",
      items: [
        "Fresh neutral paint throughout",
        "Replace worn carpeting",
        "Update outdated light fixtures",
        "Repair drywall holes and cracks",
        "Fix squeaky doors and floors",
        "Update cabinet hardware",
      ],
    },
  ];

  const cleaningChecklist = [
    "Deep clean all floors, including under furniture",
    "Clean windows inside and out",
    "Scrub bathrooms thoroughly (grout, fixtures, mirrors)",
    "Deep clean kitchen (appliances, cabinets, counters)",
    "Wash all walls and baseboards",
    "Clean light fixtures and ceiling fans",
    "Vacuum or clean air vents",
    "Clean garage and basement",
    "Pressure wash exterior surfaces",
    "Clean or replace air filters",
  ];

  const declutterSteps = [
    {
      title: "Start Early",
      description:
        "Begin decluttering 2-3 months before listing to avoid feeling overwhelmed",
    },
    {
      title: "Remove Personal Items",
      description:
        "Take down family photos, personal collections, and memorabilia",
    },
    {
      title: "Clear Countertops",
      description:
        "Keep kitchen and bathroom counters clear except for a few decorative items",
    },
    {
      title: "Organize Closets",
      description:
        "Remove excess clothing and organize neatly to show storage space",
    },
    {
      title: "Minimize Furniture",
      description: "Remove excess furniture to make rooms feel larger",
    },
    {
      title: "Store Seasonal Items",
      description: "Pack away seasonal decorations and out-of-season clothing",
    },
  ];

  const costValueImprovements = [
    {
      improvement: "Interior Painting",
      cost: "$1,500 - $4,000",
      roi: "107%",
      priority: "High",
    },
    {
      improvement: "Minor Kitchen Update",
      cost: "$5,000 - $15,000",
      roi: "81%",
      priority: "High",
    },
    {
      improvement: "Bathroom Refresh",
      cost: "$2,000 - $8,000",
      roi: "71%",
      priority: "Medium",
    },
    {
      improvement: "Landscaping",
      cost: "$1,000 - $5,000",
      roi: "100%",
      priority: "High",
    },
    {
      improvement: "New Flooring",
      cost: "$3,000 - $10,000",
      roi: "54%",
      priority: "Medium",
    },
    {
      improvement: "New Garage Door",
      cost: "$2,500 - $4,500",
      roi: "94%",
      priority: "Medium",
    },
  ];

  const timeline = [
    { timeframe: "3 Months Before", tasks: "Start decluttering, plan repairs" },
    {
      timeframe: "2 Months Before",
      tasks: "Complete major repairs, begin improvements",
    },
    {
      timeframe: "1 Month Before",
      tasks: "Paint, landscape, complete minor repairs",
    },
    {
      timeframe: "2 Weeks Before",
      tasks: "Deep clean, stage home, professional photos",
    },
    { timeframe: "1 Week Before", tasks: "Final touches, prepare for showings" },
  ];

  const relatedResources = [
    {
      title: "Staging Tips",
      description: "Learn how to stage your prepared home for maximum appeal",
      href: "/sellers-education/staging-tips",
    },
    {
      title: "Pricing Strategy",
      description: "Price your improved home competitively",
      href: "/sellers-education/pricing-strategy",
    },
    {
      title: "Marketing Your Home",
      description: "Showcase your home's improvements effectively",
      href: "/sellers-education/marketing-your-home",
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
            Preparing to Sell Your Vermont Home
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Essential repairs, improvements, and prep work to get your home
            market-ready and maximize your sale price
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#21266c] text-lg mb-2">
                  First Impressions Matter
                </h3>
                <p className="text-gray-700">
                  Buyers form an opinion about your home within the first 7-10
                  seconds. Proper preparation can increase your sale price by
                  5-10% and reduce time on market by up to 50%. In Vermont's
                  competitive market, a well-prepared home stands out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Listing Repairs Checklist */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Pre-Listing Repairs Checklist
            </h2>
            <p className="text-xl text-gray-600">
              Address these issues before listing to avoid buyer concerns and
              negotiation hurdles
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {repairs.map((section, index) => (
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

      {/* Vermont-Specific Considerations */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Vermont-Specific Considerations
            </h2>
            <p className="text-xl text-gray-600">
              Special prep work for Vermont homes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <div className="flex items-start gap-4 mb-4">
                <Thermometer className="w-8 h-8 text-[#3b82f6] flex-shrink-0" />
                <h3 className="text-2xl font-bold text-[#21266c]">
                  Winter Preparation
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Service heating system and provide maintenance records
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Inspect and clean chimney if you have a wood stove or fireplace
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Check insulation in attic and basement
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Test all windows for proper sealing and drafts
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Provide documentation of heating costs for past 2 years
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Ensure snow removal equipment is in good condition
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <div className="flex items-start gap-4 mb-4">
                <Home className="w-8 h-8 text-[#3b82f6] flex-shrink-0" />
                <h3 className="text-2xl font-bold text-[#21266c]">
                  Well & Septic Systems
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Get well water tested (required in Vermont)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Have septic system inspected and pumped if needed
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Locate and mark septic tank and leach field
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Provide maintenance records for both systems
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Document well depth and flow rate if available
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Consider getting a septic system certificate
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Vermont Disclosure Requirements
                </h3>
                <p className="text-gray-700">
                  Vermont law requires sellers to disclose known defects and
                  provide well water test results. Being proactive with testing
                  and repairs shows buyers you've maintained the property and can
                  prevent deal-breaking surprises during inspection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Cleaning Essentials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Deep Cleaning Essentials
            </h2>
            <p className="text-xl text-gray-600">
              A spotless home suggests careful maintenance and creates a positive
              first impression
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {cleaningChecklist.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg"
              >
                <CheckCircle2 className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#21266c] text-lg mb-2">
                  Consider Professional Help
                </h3>
                <p className="text-gray-700">
                  Professional deep cleaning costs $300-$600 for most homes but
                  can be worth the investment. Professional cleaners have
                  commercial-grade equipment and products that achieve better
                  results than DIY cleaning, especially for carpets, windows, and
                  hard-to-reach areas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decluttering and Depersonalizing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Decluttering and Depersonalizing
            </h2>
            <p className="text-xl text-gray-600">
              Help buyers envision themselves in your home
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {declutterSteps.map((step, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#21266c] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-lg p-8 border-2 border-[#3b82f6]">
            <h3 className="text-2xl font-bold text-[#21266c] mb-4">
              The 30-Day Declutter Rule
            </h3>
            <p className="text-gray-700 mb-4">
              If you haven't used something in 30 days and won't need it before
              moving, pack it away or donate it. This creates a clean, spacious
              feel that appeals to buyers.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-[#3b82f6] mb-2">50%</div>
                <div className="text-sm text-gray-600">
                  Remove at least half of items from closets
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-[#3b82f6] mb-2">3-5</div>
                <div className="text-sm text-gray-600">
                  Decorative items per room maximum
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-[#3b82f6] mb-2">Zero</div>
                <div className="text-sm text-gray-600">
                  Personal photos should be visible
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost vs. Value of Improvements */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Cost vs. Value of Improvements
            </h2>
            <p className="text-xl text-gray-600">
              Smart investments that deliver the best return in Vermont
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-[#21266c] text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Improvement</th>
                  <th className="px-6 py-4 text-left">Typical Cost</th>
                  <th className="px-6 py-4 text-left">Average ROI</th>
                  <th className="px-6 py-4 text-left">Priority</th>
                </tr>
              </thead>
              <tbody>
                {costValueImprovements.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {item.improvement}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{item.cost}</td>
                    <td className="px-6 py-4">
                      <span className="text-[#3b82f6] font-bold">{item.roi}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.priority === "High"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <DollarSign className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Focus on High-ROI Projects
                </h3>
                <p className="text-gray-700">
                  Don't over-improve for your neighborhood. Focus on repairs and
                  updates that fix problems and freshen appearance rather than
                  major renovations. Buyers in Vermont particularly value energy
                  efficiency improvements and well-maintained mechanical systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preparation Timeline */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Preparation Timeline
            </h2>
            <p className="text-xl text-gray-600">
              A recommended schedule for getting your home market-ready
            </p>
          </div>

          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 border border-gray-200 flex items-start gap-4"
              >
                <div className="bg-[#21266c] text-white p-3 rounded-full flex-shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#21266c] mb-2">
                    {item.timeframe}
                  </h3>
                  <p className="text-gray-700">{item.tasks}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#21266c] text-lg mb-2">
                  Seasonal Considerations
                </h3>
                <p className="text-gray-700">
                  In Vermont, spring and summer are the busiest selling seasons.
                  If you're planning to list during these peak times, start
                  preparation in late winter. For winter listings, ensure heating
                  systems are in perfect working order and the home feels warm and
                  inviting during showings.
                </p>
              </div>
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
            Ready to Prepare Your Home for Sale?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Our team can help you create a preparation plan tailored to your home
            and timeline. Get started with a free consultation today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-[#21266c] px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Schedule a Consultation
            </Link>
            <Link
              href="/calculators"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Calculate Potential ROI
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
