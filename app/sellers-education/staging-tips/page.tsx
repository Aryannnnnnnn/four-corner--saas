import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Lightbulb,
  Sofa,
  DollarSign,
  Camera,
  Sun,
} from "lucide-react";

export default function StagingTipsPage() {
  const stagingBenefits = [
    {
      benefit: "Sells 73% faster",
      description: "than non-staged homes according to NAR",
    },
    {
      benefit: "5-15% higher price",
      description: "on average than comparable unstaged homes",
    },
    {
      benefit: "Better photos",
      description: "that attract more online viewers and showings",
    },
    {
      benefit: "Broader appeal",
      description: "helps buyers envision themselves in the space",
    },
  ];

  const roomByRoom = [
    {
      room: "Living Room",
      icon: Sofa,
      tips: [
        "Arrange furniture to create conversation areas",
        "Remove excess furniture to maximize space",
        "Add pops of color with throw pillows and blankets",
        "Ensure clear walkways and flow",
        "Highlight focal points like fireplace or views",
        "Remove personal photos and memorabilia",
      ],
    },
    {
      room: "Kitchen",
      icon: Sparkles,
      tips: [
        "Clear all countertops except 1-2 decorative items",
        "Remove magnets and papers from refrigerator",
        "Clean and organize inside cabinets and pantry",
        "Add fresh flowers or bowl of fruit",
        "Update cabinet hardware if outdated",
        "Ensure all appliances are spotless",
      ],
    },
    {
      room: "Master Bedroom",
      icon: Sparkles,
      tips: [
        "Invest in luxury bedding and hotel-style presentation",
        "Remove all personal items from nightstands",
        "Clear out half of closet to show storage space",
        "Use neutral colors and minimal decor",
        "Add bedside lamps for warm lighting",
        "Remove exercise equipment and TVs if possible",
      ],
    },
    {
      room: "Bathrooms",
      icon: Sparkles,
      tips: [
        "Display fresh white towels and bathmats",
        "Clear counters completely or use minimal spa-like accessories",
        "Hide all toiletries and personal care items",
        "Add small plant or decorative soap dispenser",
        "Ensure grout and fixtures are spotless",
        "Keep toilet lid down during showings",
      ],
    },
    {
      room: "Dining Room",
      icon: Sparkles,
      tips: [
        "Set table with simple place settings",
        "Add centerpiece like flowers or candles",
        "Remove extra leaves to show full table size",
        "Highlight any built-in storage or features",
        "Keep minimal furniture to show space",
        "Ensure chandelier is clean and working",
      ],
    },
    {
      room: "Home Office",
      icon: Sparkles,
      tips: [
        "Organize desk with minimal items",
        "Hide cables and technology clutter",
        "Add professional artwork or plant",
        "Show adequate lighting for workspace",
        "Display how room can be flexible space",
        "Keep it neutral for multiple uses",
      ],
    },
  ];

  const furnitureArrangement = [
    {
      principle: "Create Clear Pathways",
      description:
        "Ensure at least 3 feet of walking space around furniture. Buyers should be able to move through rooms easily without feeling cramped.",
    },
    {
      principle: "Define Room Purpose",
      description:
        "Each room should have a clear, single purpose. Avoid using bedrooms as storage or offices if possible during showings.",
    },
    {
      principle: "Angle Furniture",
      description:
        "Angling larger pieces like sofas creates visual interest and makes rooms feel larger than pushing everything against walls.",
    },
    {
      principle: "Scale Appropriately",
      description:
        "Use furniture that fits the room size. Oversized furniture makes spaces feel smaller; too-small furniture looks odd.",
    },
    {
      principle: "Highlight Features",
      description:
        "Arrange furniture to draw attention to fireplaces, windows with views, or architectural details.",
    },
    {
      principle: "Less is More",
      description:
        "Remove 1/3 to 1/2 of furniture to make rooms feel more spacious. Store excess furniture off-site if possible.",
    },
  ];

  const lightingTips = [
    "Replace all burnt-out bulbs before showings",
    "Use warm white bulbs (2700-3000K) for inviting atmosphere",
    "Ensure every room has at least two light sources",
    "Open all curtains and blinds during daytime showings",
    "Add table or floor lamps in dark corners",
    "Install higher wattage bulbs in dim areas (within fixture limits)",
    "Clean all light fixtures, windows, and lampshades",
    "Turn on all lights during showings, even daytime",
    "Consider updating outdated light fixtures",
    "Use mirrors to reflect natural light",
  ];

  const neutralizingSteps = [
    {
      area: "Paint Colors",
      action:
        "Repaint bold or dark walls in neutral tones like warm gray, greige, or soft white",
      cost: "$500-$2,000",
    },
    {
      area: "Personal Collections",
      action:
        "Pack away hobby items, sports memorabilia, and unique collections",
      cost: "$0",
    },
    {
      area: "Religious/Political",
      action: "Remove all religious symbols and political materials",
      cost: "$0",
    },
    {
      area: "Bold Decor",
      action: "Replace brightly colored or themed decor with neutral alternatives",
      cost: "$100-$500",
    },
    {
      area: "Flooring",
      action:
        "Cover unusually colored carpet with neutral area rugs or consider replacement",
      cost: "$200-$5,000",
    },
    {
      area: "Window Treatments",
      action: "Replace dated or bold curtains with neutral, modern options",
      cost: "$300-$1,500",
    },
  ];

  const proVsDIY = {
    professional: {
      cost: "$2,000-$5,000",
      pros: [
        "Expertise in showcasing your specific home",
        "Access to furniture and decor rental inventory",
        "Objective third-party perspective",
        "Professional design skills and training",
        "Best for vacant homes or homes needing major work",
        "Often pays for itself in higher sale price",
      ],
      cons: [
        "Higher upfront cost",
        "Need to schedule around stager's availability",
        "May require removing your furniture first",
      ],
    },
    diy: {
      cost: "$200-$1,000",
      pros: [
        "Lower cost using items you own",
        "Can work on your own schedule",
        "More control over the process",
        "Good option if home is already well-decorated",
        "Can make changes easily based on feedback",
      ],
      cons: [
        "Harder to be objective about your own space",
        "May lack professional design expertise",
        "Might miss opportunities to maximize appeal",
        "Takes significant time and effort",
      ],
    },
  };

  const virtualStaging = [
    {
      benefit: "Cost-Effective",
      description:
        "Virtual staging costs $50-$150 per room vs. $500-$2,000 for physical staging",
    },
    {
      benefit: "Perfect for Vacant Homes",
      description:
        "Helps buyers visualize potential without expensive furniture rental",
    },
    {
      benefit: "Multiple Styles",
      description:
        "Can show different design styles to appeal to various buyer preferences",
    },
    {
      benefit: "Better Photos",
      description:
        "Makes online listings much more appealing than empty rooms",
    },
  ];

  const vermontSeasonal = [
    {
      season: "Spring Staging",
      tips: [
        "Add fresh flowers and greenery throughout",
        "Open windows to let in fresh air during showings",
        "Highlight outdoor spaces with clean patio furniture",
        "Show garden potential with well-maintained landscaping",
        "Use light, airy fabrics and bright colors",
        "Emphasize mud room organization and functionality",
      ],
    },
    {
      season: "Summer Staging",
      tips: [
        "Showcase outdoor living spaces with inviting furniture",
        "Highlight cooling features like ceiling fans or AC",
        "Use light linens and summer-appropriate decor",
        "Keep rooms cool and comfortable for showings",
        "Emphasize lake or mountain access if applicable",
        "Show outdoor entertaining areas at their best",
      ],
    },
    {
      season: "Fall Staging",
      tips: [
        "Incorporate warm, cozy autumn colors",
        "Stage fireplace area to show warmth and comfort",
        "Add throws and textured pillows in warm tones",
        "Clear leaves from yard and walkways",
        "Highlight views of fall foliage",
        "Show ample storage for seasonal items",
      ],
    },
    {
      season: "Winter Staging",
      tips: [
        "Keep home 68-72°F for showings",
        "Light fireplace if you have one (or use candles in fireplace)",
        "Use warm lighting throughout to combat short days",
        "Add cozy throws and pillows in rich textures",
        "Clear snow from walkways and driveway before showings",
        "Highlight ski equipment storage and mudroom",
        "Emphasize insulation and heating efficiency",
        "Create warm, inviting entryway with boot trays and hooks",
      ],
    },
  ];

  const stagingChecklist = [
    "Declutter and depersonalize every room",
    "Deep clean entire home including carpets and windows",
    "Make minor repairs (holes, scratches, squeaks)",
    "Apply fresh neutral paint where needed",
    "Rearrange furniture to maximize space and flow",
    "Add strategic lighting in dark areas",
    "Incorporate neutral decor and accessories",
    "Clear countertops in kitchen and bathrooms",
    "Organize all closets and remove half of contents",
    "Freshen up curb appeal (landscaping, entrance)",
    "Remove pet items and odors",
    "Set dining table with simple place settings",
    "Make beds with hotel-style presentation",
    "Add fresh flowers or plants",
    "Remove family photos and personal items",
  ];

  const relatedResources = [
    {
      title: "Preparing to Sell",
      description: "Complete repairs and cleaning before staging",
      href: "/sellers-education/preparing-to-sell",
    },
    {
      title: "Marketing Your Home",
      description: "Showcase your staged home with professional photography",
      href: "/sellers-education/marketing-your-home",
    },
    {
      title: "Pricing Strategy",
      description: "Staged homes can justify higher asking prices",
      href: "/sellers-education/pricing-strategy",
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
            Home Staging Tips for Vermont Sellers
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Professional staging advice to maximize your home's appeal and help
            buyers fall in love at first sight
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#21266c] text-lg mb-2">
                  What is Home Staging?
                </h3>
                <p className="text-gray-700">
                  Home staging is the art of preparing your home to appeal to the
                  highest number of potential buyers. It involves decluttering,
                  depersonalizing, and arranging furniture and decor to showcase
                  your home's best features. The goal is to help buyers envision
                  themselves living in the space, which leads to faster sales and
                  higher offers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Staging Matters */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Why Staging Matters
            </h2>
            <p className="text-xl text-gray-600">
              The impact of professional staging on your sale
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stagingBenefits.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center"
              >
                <div className="text-3xl font-bold text-[#3b82f6] mb-2">
                  {item.benefit}
                </div>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <DollarSign className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Return on Investment
                </h3>
                <p className="text-gray-700">
                  The National Association of Realtors reports that staging
                  typically costs 1-3% of the home's value but can increase the
                  sale price by 5-15%. For a $400,000 Vermont home, spending
                  $4,000-$12,000 on staging could result in a $20,000-$60,000
                  higher sale price. Even modest DIY staging efforts can yield
                  significant returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Room-by-Room Guide */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Room-by-Room Staging Guide
            </h2>
            <p className="text-xl text-gray-600">
              Specific staging strategies for each area of your home
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roomByRoom.map((room, index) => {
              const IconComponent = room.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <IconComponent className="w-6 h-6 text-[#3b82f6]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#21266c]">
                      {room.room}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {room.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Furniture Arrangement */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Furniture Arrangement Principles
            </h2>
            <p className="text-xl text-gray-600">
              Strategic placement to maximize space and appeal
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {furnitureArrangement.map((principle, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <h3 className="text-xl font-bold text-[#21266c] mb-3">
                  {principle.principle}
                </h3>
                <p className="text-gray-700">{principle.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#21266c] text-lg mb-2">
                  The 2/3 Rule
                </h3>
                <p className="text-gray-700">
                  Furniture should occupy no more than 2/3 of floor space in any
                  room. This creates a sense of spaciousness that buyers love. If
                  your rooms feel cramped with current furniture, store pieces
                  off-site during the selling period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lighting and Ambiance */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Lighting and Ambiance
            </h2>
            <p className="text-xl text-gray-600">
              Proper lighting makes homes feel welcoming and spacious
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <div className="grid md:grid-cols-2 gap-6">
              {lightingTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
              <Sun className="w-12 h-12 text-[#3b82f6] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#21266c] mb-2">
                Natural Light
              </h3>
              <p className="text-gray-700">
                Open all window treatments during showings to maximize natural
                light
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
              <Lightbulb className="w-12 h-12 text-[#3b82f6] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#21266c] mb-2">
                Layered Lighting
              </h3>
              <p className="text-gray-700">
                Combine overhead, task, and accent lighting in every room
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
              <Sparkles className="w-12 h-12 text-[#3b82f6] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#21266c] mb-2">
                Warm Glow
              </h3>
              <p className="text-gray-700">
                Use warm white bulbs (not cool/blue) to create inviting
                atmosphere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Neutralizing Spaces */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Neutralizing Your Space
            </h2>
            <p className="text-xl text-gray-600">
              Creating a blank canvas for buyers to imagine their own style
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-[#21266c] text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Area to Neutralize</th>
                  <th className="px-6 py-4 text-left">Action Required</th>
                  <th className="px-6 py-4 text-left">Typical Cost</th>
                </tr>
              </thead>
              <tbody>
                {neutralizingSteps.map((step, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {step.area}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{step.action}</td>
                    <td className="px-6 py-4 text-[#3b82f6] font-semibold">
                      {step.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Neutral Doesn't Mean Boring
                </h3>
                <p className="text-gray-700">
                  Neutral staging uses soft grays, warm beiges, whites, and earth
                  tones as a base, but incorporates texture, greenery, and subtle
                  pops of color through accessories. The goal is sophistication
                  and broad appeal, not sterility. Think spa or boutique hotel
                  rather than hospital room.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional vs DIY */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Professional Staging vs. DIY
            </h2>
            <p className="text-xl text-gray-600">
              Choosing the right approach for your situation and budget
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border-2 border-[#3b82f6] rounded-lg p-8">
              <h3 className="text-2xl font-bold text-[#21266c] mb-4">
                Professional Staging
              </h3>
              <div className="text-3xl font-bold text-[#3b82f6] mb-6">
                {proVsDIY.professional.cost}
              </div>
              <div className="mb-6">
                <h4 className="font-semibold text-green-700 mb-3">
                  Advantages:
                </h4>
                <ul className="space-y-2">
                  {proVsDIY.professional.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-3">
                  Disadvantages:
                </h4>
                <ul className="space-y-2">
                  {proVsDIY.professional.cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-[#21266c] mb-4">
                DIY Staging
              </h3>
              <div className="text-3xl font-bold text-[#3b82f6] mb-6">
                {proVsDIY.diy.cost}
              </div>
              <div className="mb-6">
                <h4 className="font-semibold text-green-700 mb-3">
                  Advantages:
                </h4>
                <ul className="space-y-2">
                  {proVsDIY.diy.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-3">
                  Disadvantages:
                </h4>
                <ul className="space-y-2">
                  {proVsDIY.diy.cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#21266c] text-lg mb-2">
                  Hybrid Approach
                </h3>
                <p className="text-gray-700">
                  Many sellers find success with a consultation-only service
                  ($300-$500) where a professional stager walks through your home
                  and provides detailed recommendations, then you implement the
                  changes yourself. This gives you expert guidance at a fraction
                  of full staging cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Staging */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Virtual Staging for Online Listings
            </h2>
            <p className="text-xl text-gray-600">
              Digital staging solution for vacant or minimally furnished homes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {virtualStaging.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="bg-blue-50 p-3 rounded-lg inline-block mb-4">
                  <Camera className="w-8 h-8 text-[#3b82f6]" />
                </div>
                <h3 className="text-xl font-bold text-[#21266c] mb-3">
                  {item.benefit}
                </h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Important Disclosure
                </h3>
                <p className="text-gray-700">
                  When using virtual staging, you must clearly disclose in
                  listings that photos have been digitally staged. Most MLS
                  systems and real estate platforms require watermarks or
                  captions stating "virtually staged" to avoid buyer confusion.
                  Virtual staging works best for online marketing of vacant homes
                  but should be combined with actual furniture for in-person
                  showings when possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Staging in Vermont */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Seasonal Staging in Vermont
            </h2>
            <p className="text-xl text-gray-600">
              Adapt your staging to Vermont's distinct seasons
            </p>
          </div>

          <div className="space-y-6">
            {vermontSeasonal.map((season, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-8"
              >
                <h3 className="text-2xl font-bold text-[#21266c] mb-6">
                  {season.season}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {season.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#21266c] text-lg mb-2">
                  Embrace Vermont's Seasons
                </h3>
                <p className="text-gray-700">
                  Don't fight the season you're selling in—embrace it! Winter
                  staging should emphasize coziness and warmth, while summer
                  staging highlights outdoor living. Vermont buyers appreciate
                  homes that showcase the best of each season and demonstrate
                  year-round livability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Staging Checklist */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Complete Staging Checklist
            </h2>
            <p className="text-xl text-gray-600">
              Use this comprehensive checklist to ensure nothing is missed
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stagingChecklist.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-[#3b82f6] mb-2">
                24-48hrs
              </div>
              <div className="text-gray-600">
                Before first showing, complete all staging
              </div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-[#3b82f6] mb-2">
                15 min
              </div>
              <div className="text-gray-600">
                Needed before each showing to freshen and tidy
              </div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-[#3b82f6] mb-2">
                5-15%
              </div>
              <div className="text-gray-600">
                Average increase in sale price with staging
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
            Ready to Stage Your Vermont Home?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Our team can recommend trusted staging professionals or provide
            personalized DIY staging guidance. Let's make your home irresistible
            to buyers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-[#21266c] px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Get Staging Recommendations
            </Link>
            <Link
              href="/calculators"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Calculate ROI
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
