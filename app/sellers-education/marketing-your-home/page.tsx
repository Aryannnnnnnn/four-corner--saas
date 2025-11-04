import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Camera,
  Share2,
  Monitor,
  Users,
  MapPin,
  Video,
  BarChart3,
  Megaphone,
} from "lucide-react";

export default function MarketingYourHomePage() {
  const photographyTips = [
    {
      aspect: "Why It Matters",
      points: [
        "93% of buyers start their home search online",
        "Homes with professional photos sell 32% faster",
        "Professional photos can increase sale price by 3-5%",
        "First impression happens online, not at showing",
      ],
    },
    {
      aspect: "What to Expect",
      points: [
        "Photographer spends 1-3 hours capturing your home",
        "Wide-angle lenses show full rooms and space",
        "HDR photography balances indoor/outdoor light",
        "Twilight shots showcase exterior ambiance",
        "Cost: $200-$500 for professional real estate photography",
      ],
    },
    {
      aspect: "Preparation Tips",
      points: [
        "Complete all staging before photo day",
        "Turn on all lights, including lamps",
        "Open curtains and blinds for natural light",
        "Remove vehicles from driveway",
        "Ensure landscaping is pristine",
        "Hide trash cans, hoses, and clutter",
      ],
    },
  ];

  const mlsOptimization = [
    {
      element: "Headline/Title",
      tips: [
        "Include key features: '4BR Colonial with Mountain Views'",
        "Mention location highlights: 'Walk to Downtown Burlington'",
        "Note unique features: 'Ski-In/Ski-Out Access'",
        "Keep under 50 characters for best display",
      ],
    },
    {
      element: "Property Description",
      tips: [
        "Start with most compelling features",
        "Use descriptive, emotional language",
        "Mention Vermont-specific appeals (views, access, land)",
        "Include recent updates and improvements",
        "Highlight energy efficiency and systems",
        "Describe neighborhood and lifestyle",
        "Note proximity to amenities and attractions",
        "Keep paragraphs short and scannable",
      ],
    },
    {
      element: "Photo Selection",
      tips: [
        "Lead with your absolute best exterior shot",
        "Include 25-40 photos for optimal engagement",
        "Show every room from best angles",
        "Include key features: kitchen, master, outdoor spaces",
        "Add aerial/drone shots if available",
        "Ensure photos are high-resolution and well-lit",
      ],
    },
    {
      element: "Key Details",
      tips: [
        "Ensure all fields are complete and accurate",
        "List every feature and amenity",
        "Include property disclosures upfront",
        "Mention heating/cooling systems and costs",
        "Note well/septic details for rural properties",
        "Specify acreage and land features",
      ],
    },
  ];

  const onlineMarketing = [
    {
      platform: "Real Estate Websites",
      icon: Monitor,
      description: "Zillow, Realtor.com, Trulia automatically pull from MLS",
      strategies: [
        "Claim your listing to add details and respond to inquiries",
        "Monitor for accuracy and update as needed",
        "Engage with comments and questions promptly",
        "Ensure photos and description are optimized",
      ],
    },
    {
      platform: "Social Media",
      icon: Share2,
      description: "Facebook, Instagram for visual storytelling",
      strategies: [
        "Share listing on Facebook with local community groups",
        "Post Instagram Stories with home highlights",
        "Use relevant hashtags: #VermontRealEstate #VTHomes",
        "Create Facebook event for open houses",
        "Encourage shares from friends and family",
        "Consider paid Facebook/Instagram ads for targeted reach",
      ],
    },
    {
      platform: "Agent's Network",
      icon: Users,
      description: "Leverage your agent's professional connections",
      strategies: [
        "Email blast to local agent database",
        "Share in MLS agent-only remarks",
        "Promote at broker meetings and events",
        "Offer buyer agent bonuses if appropriate",
        "Network with agents who have buyers seeking your features",
      ],
    },
    {
      platform: "Google Search",
      icon: BarChart3,
      description: "Ensure your home appears in local searches",
      strategies: [
        "Optimize listing with local keywords",
        "Create property-specific webpage with your agent",
        "Ensure Google Maps shows property accurately",
        "Encourage reviews of your agent/agency",
      ],
    },
  ];

  const openHouseStrategies = [
    {
      type: "Traditional Open House",
      timing: "Weekend afternoons (1-3 PM)",
      benefits: [
        "Attracts local buyers and neighbors",
        "Creates sense of urgency with multiple viewers",
        "Convenient for buyers to drop in without appointment",
      ],
      tips: [
        "Advertise on MLS, social media, and signage",
        "Ensure home is immaculately clean and staged",
        "Provide refreshments and listing information",
        "Gather visitor information for follow-up",
        "Remove valuables and personal items",
      ],
    },
    {
      type: "Broker's Open House",
      timing: "Weekday lunch hours",
      benefits: [
        "Exposes home to all local real estate agents",
        "Agents preview for their buyer clients",
        "Generates agent-to-agent buzz",
      ],
      tips: [
        "Provide lunch or appetizers for agents",
        "Prepare agent packets with details and disclosures",
        "Highlight features agents should know",
        "Ask for feedback from attending agents",
      ],
    },
    {
      type: "Private Showings",
      timing: "By appointment, any day/time",
      benefits: [
        "Personalized attention for serious buyers",
        "Flexible scheduling for buyer convenience",
        "Better control of home presentation",
      ],
      tips: [
        "Keep home show-ready at all times",
        "Vacate during showings when possible",
        "Maintain comfortable temperature",
        "Leave lights on and music off",
        "Secure pets and remove from home",
      ],
    },
  ];

  const signageMaterials = [
    {
      item: "Yard Sign",
      importance: "Critical",
      details:
        "Professional 'For Sale' sign with agent contact info. Add rider signs for 'Open House' or 'Price Reduced' as needed.",
    },
    {
      item: "Directional Signs",
      importance: "High for Open Houses",
      details:
        "Place at key intersections directing buyers to your property during open houses.",
    },
    {
      item: "Property Brochures",
      importance: "Medium",
      details:
        "Full-color flyer boxes at property with listing details, photos, and features.",
    },
    {
      item: "Feature Cards",
      importance: "Medium",
      details:
        "Small cards highlighting key property features placed throughout home during showings.",
    },
    {
      item: "Coming Soon Sign",
      importance: "Optional",
      details:
        "Pre-listing buzz builder, but ensure you can follow through with listing date.",
    },
  ];

  const videoTours = [
    {
      type: "Standard Video Tour",
      description:
        "Professionally shot walk-through with smooth transitions",
      benefits: [
        "Shows flow and layout of home",
        "Engages viewers longer than photos alone",
        "Shareable on YouTube, social media, listing sites",
      ],
      cost: "$300-$800",
    },
    {
      type: "3D Virtual Tour",
      description: "Matterport or similar interactive 3D walkthrough",
      benefits: [
        "Buyers can explore at their own pace",
        "Provides dollhouse view and floor plan",
        "Especially valuable for out-of-state buyers",
        "Sets listing apart from competition",
      ],
      cost: "$200-$500",
    },
    {
      type: "Drone/Aerial Video",
      description: "Aerial footage of property and surroundings",
      benefits: [
        "Showcases land, acreage, and views",
        "Highlights property in relation to attractions",
        "Dramatic and memorable footage",
        "Essential for Vermont properties with land",
      ],
      cost: "$200-$600",
    },
    {
      type: "Lifestyle Video",
      description: "Cinematic video telling story of living in the home",
      benefits: [
        "Emotional connection with buyers",
        "Showcases lifestyle and neighborhood",
        "Highlights seasonal Vermont living",
        "Premium marketing for luxury properties",
      ],
      cost: "$1,000-$3,000",
    },
  ];

  const targetMarketing = [
    {
      strategy: "Geographic Targeting",
      approach:
        "Focus marketing on areas where your likely buyers live",
      examples: [
        "Urban Vermont properties: Market to Boston, NYC, Connecticut",
        "Ski homes: Target major Northeast metro areas",
        "Lakefront: Advertise in out-of-state lakefront publications",
        "Retirement properties: Market to active adult communities",
      ],
    },
    {
      strategy: "Demographic Targeting",
      approach:
        "Tailor messaging to your ideal buyer profile",
      examples: [
        "First-time buyers: Emphasize affordability, low maintenance",
        "Families: Highlight schools, yard, neighborhood safety",
        "Empty nesters: Focus on single-floor living, low maintenance",
        "Remote workers: Emphasize home office space, internet quality",
      ],
    },
    {
      strategy: "Lifestyle Marketing",
      approach: "Sell the Vermont lifestyle, not just the house",
      examples: [
        "Ski enthusiasts: Emphasize resort access and winter recreation",
        "Outdoor lovers: Highlight hiking, biking, nature access",
        "Farmers market types: Feature local food, community feel",
        "Artists/creatives: Showcase studio space, community, inspiration",
      ],
    },
  ];

  const vermontChannels = [
    {
      channel: "Vermont-Specific Sites",
      platforms: [
        "Vermont Living Magazine online classifieds",
        "Seven Days marketplace (for Chittenden County)",
        "Local town websites and community boards",
        "Vermont Vacation Home Rental sites (for second homes)",
      ],
    },
    {
      channel: "Resort Communities",
      platforms: [
        "Stowe, Killington, Okemo resort bulletin boards",
        "Ski resort email newsletters and social media",
        "Mountain resort real estate offices",
        "Vacation rental owner groups (for investment properties)",
      ],
    },
    {
      channel: "Local Publications",
      platforms: [
        "Local newspaper real estate sections",
        "Community newsletters and magazines",
        "Chamber of Commerce communications",
        "Homeowners association communications",
      ],
    },
    {
      channel: "Luxury Marketing",
      platforms: [
        "Unique Homes magazine for high-end properties",
        "Mansion Global for luxury Vermont estates",
        "Luxury portfolio marketing for $1M+ homes",
        "Country estate specialists and publications",
      ],
    },
  ];

  const relatedResources = [
    {
      title: "Staging Tips",
      description: "Prepare your home for stunning marketing photos and videos",
      href: "/sellers-education/staging-tips",
    },
    {
      title: "Pricing Strategy",
      description: "Price competitively to attract maximum buyer interest",
      href: "/sellers-education/pricing-strategy",
    },
    {
      title: "Negotiating Offers",
      description: "Convert marketing interest into strong offers",
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
            Marketing Your Vermont Home
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Professional photography, strategic online presence, and promotional
            strategies that get your home in front of the right buyers
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Megaphone className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#21266c] text-lg mb-2">
                  Marketing Makes the Difference
                </h3>
                <p className="text-gray-700">
                  Even a perfectly prepared and priced home won't sell if buyers
                  don't know about it. Effective marketing creates maximum
                  exposure, attracts qualified buyers, and often results in
                  multiple offers. In today's digital age, 97% of buyers search
                  online, making professional photography and strategic online
                  marketing essential to a successful sale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Photography */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Professional Photography: Non-Negotiable
            </h2>
            <p className="text-xl text-gray-600">
              Your listing photos are the single most important marketing element
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {photographyTips.map((section, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="bg-blue-50 p-3 rounded-lg inline-block mb-4">
                  <Camera className="w-8 h-8 text-[#3b82f6]" />
                </div>
                <h3 className="text-xl font-bold text-[#21266c] mb-4">
                  {section.aspect}
                </h3>
                <ul className="space-y-3">
                  {section.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Never Use Phone Photos
                </h3>
                <p className="text-gray-700">
                  Smartphone photos immediately signal to buyers that you're not
                  serious about marketing your home. They lack the quality,
                  lighting, and composition of professional photos. Buyers
                  associate poor photos with problem properties, even if your home
                  is perfect. The $300-$500 investment in professional photography
                  returns thousands in higher sale price and faster sale time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MLS Listing Optimization */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              MLS Listing Optimization
            </h2>
            <p className="text-xl text-gray-600">
              Your MLS listing feeds all major real estate websites—make it count
            </p>
          </div>

          <div className="space-y-8">
            {mlsOptimization.map((section, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-8"
              >
                <h3 className="text-2xl font-bold text-[#21266c] mb-4">
                  {section.element}
                </h3>
                <ul className="space-y-3">
                  {section.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Monitor className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#21266c] text-lg mb-2">
                  MLS Syndication Power
                </h3>
                <p className="text-gray-700">
                  Your MLS listing automatically syndicates to Zillow, Realtor.com,
                  Trulia, Redfin, and hundreds of other sites within hours. This
                  is why getting your MLS listing perfect is crucial—it's the
                  single source of truth for most of your online marketing. Any
                  errors or omissions will appear everywhere your listing appears.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Marketing Channels */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Online Marketing and Social Media
            </h2>
            <p className="text-xl text-gray-600">
              Multi-channel digital marketing to maximize exposure
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {onlineMarketing.map((platform, index) => {
              const IconComponent = platform.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-8"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <IconComponent className="w-8 h-8 text-[#3b82f6]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#21266c]">
                        {platform.platform}
                      </h3>
                      <p className="text-gray-600">{platform.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {platform.strategies.map((strategy, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{strategy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Share2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Social Media Amplification
                </h3>
                <p className="text-gray-700 mb-3">
                  Ask friends, family, and neighbors to share your listing on
                  social media. Their networks may include your perfect buyer.
                  Make it easy by providing:
                </p>
                <ul className="space-y-1 text-gray-700 ml-4">
                  <li>• Direct link to your listing</li>
                  <li>• Best photos to share</li>
                  <li>• Suggested caption highlighting key features</li>
                  <li>• Relevant hashtags for your area</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Houses and Showings */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Open Houses and Private Showings
            </h2>
            <p className="text-xl text-gray-600">
              Strategic in-person marketing opportunities
            </p>
          </div>

          <div className="space-y-8">
            {openHouseStrategies.map((strategy, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-8"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-[#21266c]">
                    {strategy.type}
                  </h3>
                  <span className="text-sm bg-blue-50 text-[#3b82f6] px-3 py-1 rounded-full font-semibold">
                    {strategy.timing}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Benefits:
                    </h4>
                    <ul className="space-y-2">
                      {strategy.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Best Practices:
                    </h4>
                    <ul className="space-y-2">
                      {strategy.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
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

      {/* Signage and Print Materials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Signage and Print Materials
            </h2>
            <p className="text-xl text-gray-600">
              Traditional marketing still matters for local buyers
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-[#21266c] text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Marketing Item</th>
                  <th className="px-6 py-4 text-left">Importance</th>
                  <th className="px-6 py-4 text-left">Details & Usage</th>
                </tr>
              </thead>
              <tbody>
                {signageMaterials.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {item.item}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.importance === "Critical"
                            ? "bg-red-100 text-red-800"
                            : item.importance.includes("High")
                            ? "bg-orange-100 text-orange-800"
                            : item.importance === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.importance}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{item.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#21266c] text-lg mb-2">
                  Local Marketing Still Works
                </h3>
                <p className="text-gray-700">
                  While most buyers search online, yard signs and local marketing
                  capture neighborhood buyers and drive-by traffic. In Vermont,
                  many buyers specifically drive neighborhoods they're interested
                  in. A professional yard sign with clean design and easy-to-read
                  contact information is essential. Studies show homes with yard
                  signs sell faster than those without.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Tours and 3D Walkthroughs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Video Tours and 3D Walkthroughs
            </h2>
            <p className="text-xl text-gray-600">
              Immersive experiences that engage buyers and set you apart
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {videoTours.map((video, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-8"
              >
                <div className="bg-blue-50 p-3 rounded-lg inline-block mb-4">
                  <Video className="w-8 h-8 text-[#3b82f6]" />
                </div>
                <h3 className="text-2xl font-bold text-[#21266c] mb-2">
                  {video.type}
                </h3>
                <p className="text-gray-600 mb-4">{video.description}</p>
                <div className="mb-4">
                  <ul className="space-y-2">
                    {video.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-[#3b82f6] font-bold text-xl">{video.cost}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Video className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Video Marketing ROI
                </h3>
                <p className="text-gray-700">
                  Listings with video receive 403% more inquiries than those
                  without. Video is especially important for Vermont properties
                  attracting out-of-state buyers who can't easily visit in person.
                  A 3D virtual tour allows serious buyers to pre-qualify your home
                  before making the trip, ensuring showings are with genuinely
                  interested prospects. For properties over $500K, video and 3D
                  tours are becoming expected, not optional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Marketing Strategies */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Target Marketing Strategies
            </h2>
            <p className="text-xl text-gray-600">
              Reach the right buyers with tailored messaging
            </p>
          </div>

          <div className="space-y-8">
            {targetMarketing.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-8"
              >
                <h3 className="text-2xl font-bold text-[#21266c] mb-3">
                  {item.strategy}
                </h3>
                <p className="text-gray-600 mb-4">{item.approach}</p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Examples:</h4>
                  <ul className="space-y-2">
                    {item.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vermont-Specific Channels */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Vermont-Specific Marketing Channels
            </h2>
            <p className="text-xl text-gray-600">
              Tap into Vermont's unique buyer markets
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {vermontChannels.map((channel, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-8"
              >
                <h3 className="text-2xl font-bold text-[#21266c] mb-4">
                  {channel.channel}
                </h3>
                <ul className="space-y-3">
                  {channel.platforms.map((platform, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{platform}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#21266c] text-lg mb-2">
                  Vermont's Out-of-State Buyer Market
                </h3>
                <p className="text-gray-700">
                  Over 40% of Vermont home buyers come from out of state,
                  primarily from Massachusetts, New York, Connecticut, and
                  metropolitan areas seeking second homes or relocations. Effective
                  marketing targets these geographic areas through online ads,
                  partnerships with out-of-state agents, and presence on
                  second-home and vacation property websites. Your agent should
                  have strategies specifically for reaching these buyers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Timeline */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Marketing Timeline
            </h2>
            <p className="text-xl text-gray-600">
              When to deploy different marketing strategies
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                timing: "1 Week Before Listing",
                activities: [
                  "Schedule professional photography",
                  "Prepare property for photos (stage, clean)",
                  "Install yard sign with 'Coming Soon' rider",
                  "Tease listing on social media",
                ],
              },
              {
                timing: "Listing Day",
                activities: [
                  "MLS listing goes live",
                  "Email blast to agent network",
                  "Post on all social media platforms",
                  "Share listing link with friends and family",
                  "Activate yard sign and brochure box",
                ],
              },
              {
                timing: "First Weekend",
                activities: [
                  "Schedule broker's open house (if applicable)",
                  "Host public open house",
                  "Monitor showing activity and feedback",
                  "Respond promptly to all inquiries",
                ],
              },
              {
                timing: "Week 2-3",
                activities: [
                  "Boost social media posts to reach wider audience",
                  "Send follow-up to agents who showed property",
                  "Analyze showing feedback and adjust if needed",
                  "Consider additional open houses if needed",
                ],
              },
              {
                timing: "Week 4+",
                activities: [
                  "Refresh online listings with new photos if available",
                  "Consider price adjustment if little interest",
                  "Try different marketing angles or messages",
                  "Evaluate marketing strategy with your agent",
                ],
              },
            ].map((phase, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 border border-gray-200"
              >
                <h3 className="text-xl font-bold text-[#21266c] mb-4">
                  {phase.timing}
                </h3>
                <ul className="space-y-2">
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
            Ready to Market Your Vermont Home?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Our comprehensive marketing strategy combines professional
            photography, targeted online advertising, and proven promotional
            tactics to get your home maximum exposure and the best price.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-[#21266c] px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Discuss Marketing Strategy
            </Link>
            <Link
              href="/calculators"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Estimate Your Home Value
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
