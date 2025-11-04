"use client";

import {
  Droplets,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Wrench,
  Clock,
  DollarSign,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Shield,
  Layers,
  ClipboardList,
  Home,
  Building2,
  Factory,
  Info,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function WastewaterPermitsPage() {
  const permitRequirements = [
    {
      icon: Home,
      title: "New Construction",
      description:
        "Building a new home or structure requires a wastewater system and disposal permit before construction begins.",
      examples: [
        "New single-family homes",
        "Multi-family buildings",
        "Accessory dwelling units (ADUs)",
        "Commercial buildings",
      ],
    },
    {
      icon: Wrench,
      title: "System Replacement",
      description:
        "Replacing a failed or failing septic system requires a new permit, though Clean Slate exemptions may apply.",
      examples: [
        "Complete system replacement",
        "Tank and leachfield replacement",
        "Upgrading to advanced treatment",
        "System relocation on property",
      ],
    },
    {
      icon: Building2,
      title: "Property Expansion",
      description:
        "Adding bedrooms or increasing water usage capacity requires permit review and possible system upgrade.",
      examples: [
        "Adding bedrooms to existing home",
        "Converting basement to living space",
        "Adding bathrooms",
        "Finishing attic or bonus rooms",
      ],
    },
    {
      icon: Factory,
      title: "Change of Use",
      description:
        "Converting a building to a different use may require wastewater system modifications and permits.",
      examples: [
        "Residential to commercial conversion",
        "Adding a home business",
        "Converting barn to event space",
        "Seasonal to year-round occupancy",
      ],
    },
  ];

  const cleanSlateDetails = [
    {
      icon: Shield,
      title: "What is Clean Slate?",
      description:
        'The "Clean Slate" exemption (10 V.S.A. § 1978) allows property owners to repair or replace existing wastewater systems without being required to meet current site capacity standards, provided certain conditions are met.',
      keyPoint:
        "This can save thousands of dollars by avoiding expensive system upgrades or soil testing.",
    },
    {
      icon: CheckCircle2,
      title: "When Clean Slate Applies",
      description: "The exemption applies when:",
      conditions: [
        "You're replacing an existing, permitted wastewater system",
        "The replacement system serves the same number of bedrooms or fewer",
        "No increase in design flow (water usage capacity)",
        "The original system was permitted and legally installed",
        "No change in use of the property",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Clean Slate Limitations",
      description: "The exemption does NOT waive:",
      limitations: [
        "Minimum setback requirements (100 ft from wells, 50 ft from surface water)",
        "Technology standards (must use approved system components)",
        "Construction standards and installation requirements",
        "Professional designer requirements for certain systems",
        "State approval and inspection requirements",
      ],
    },
    {
      icon: Info,
      title: "How to Qualify",
      description:
        "To use Clean Slate, you must demonstrate that the original system was legally permitted. This typically requires:",
      requirements: [
        "Copy of original wastewater permit (from town or state)",
        "Property deed showing bedroom count hasn't increased",
        "Documentation that system serves same property use",
        "Evidence that system was installed per original permit",
      ],
    },
  ];

  const permitProcess = [
    {
      step: 1,
      title: "Site Evaluation",
      description:
        "Licensed designer evaluates property for soil types, depth to bedrock, seasonal high water table, and site constraints.",
      timeline: "1-2 weeks",
      icon: ClipboardList,
    },
    {
      step: 2,
      title: "Soil Testing (if required)",
      description:
        "Test pits or borings are dug to evaluate soil suitability. May be waived under Clean Slate exemption.",
      timeline: "1 day + analysis",
      icon: Layers,
    },
    {
      step: 3,
      title: "System Design",
      description:
        "Designer creates plans for wastewater system based on soil conditions, property constraints, and water usage needs.",
      timeline: "1-2 weeks",
      icon: FileCheck,
    },
    {
      step: 4,
      title: "Permit Application Submission",
      description:
        "Submit application to Vermont DEC Wastewater Program with system design, site plans, and application fee.",
      timeline: "Same day",
      icon: ExternalLink,
    },
    {
      step: 5,
      title: "State Review & Approval",
      description:
        "DEC reviews application for compliance with regulations. May request revisions or additional information.",
      timeline: "4-8 weeks (typical)",
      icon: CheckCircle2,
    },
    {
      step: 6,
      title: "Installation & Inspection",
      description:
        "Licensed installer constructs system. State inspector verifies proper installation before backfilling.",
      timeline: "1-5 days",
      icon: Wrench,
    },
  ];

  const systemTypes = [
    {
      type: "Conventional Septic",
      description:
        "Traditional septic tank with leachfield. Requires suitable soil and adequate space.",
      cost: "$8,000 - $15,000",
      bestFor: "Properties with good soil and adequate land area",
      pros: [
        "Lower installation cost",
        "Simple maintenance",
        "Proven technology",
      ],
      cons: [
        "Requires suitable soil",
        "Large land area needed",
        "Not suitable for poor soils",
      ],
    },
    {
      type: "Mound System",
      description:
        "Elevated sand mound for properties with poor soil, high water table, or shallow bedrock.",
      cost: "$15,000 - $30,000",
      bestFor: "Properties with unsuitable soil or high water table",
      pros: [
        "Works on challenging sites",
        "State-approved technology",
        "Effective treatment",
      ],
      cons: [
        "Higher installation cost",
        "Requires electricity (pump)",
        "More complex maintenance",
        "Visible aboveground",
      ],
    },
    {
      type: "Advanced Treatment",
      description:
        "Enhanced treatment systems (aerobic, sand filters, etc.) for sensitive areas or enhanced water quality.",
      cost: "$20,000 - $40,000+",
      bestFor:
        "Properties near water bodies, conservation areas, or with severe site limitations",
      pros: [
        "Superior wastewater treatment",
        "Required for some locations",
        "Smaller footprint possible",
      ],
      cons: [
        "Highest cost",
        "Requires electricity",
        "Annual service contracts required",
        "Complex maintenance",
      ],
    },
  ];

  const costBreakdown = [
    {
      item: "Permit Application Fee",
      cost: "$200 - $500",
      notes: "Paid to Vermont DEC; varies by system type and complexity",
    },
    {
      item: "Site Evaluation & Design",
      cost: "$1,500 - $3,500",
      notes:
        "Licensed designer fees for soil testing, design, and permit prep",
    },
    {
      item: "System Installation",
      cost: "$5,000 - $35,000+",
      notes:
        "Varies greatly by system type, soil conditions, and site access",
    },
    {
      item: "Inspection Fees",
      cost: "$200 - $500",
      notes: "State inspection during installation",
    },
    {
      item: "Total Project Cost",
      cost: "$7,000 - $40,000+",
      notes:
        "Complete project range from simple replacement to complex new system",
    },
  ];

  const inspectionRequirements = [
    {
      title: "Pre-Installation",
      description: "Before system installation begins:",
      items: [
        "Permit must be approved and posted on-site",
        "Installer must be licensed by the State of Vermont",
        "Property owner or contractor must schedule state inspection",
      ],
    },
    {
      title: "During Installation",
      description: "State inspector must verify:",
      items: [
        "System location matches approved plans",
        "Excavation depth and dimensions are correct",
        "Soil conditions match design assumptions",
        "Proper materials and components are used",
        "Installation follows approved design",
      ],
    },
    {
      title: "Post-Installation",
      description: "After installation is complete:",
      items: [
        "Final inspection before backfilling",
        "As-built documentation submitted to DEC",
        "Operation and maintenance manual provided to owner",
        "Annual maintenance required for advanced systems",
      ],
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
              href="/local-resources"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Local Resources
            </Link>

            {/* Page Header */}
            <div className="text-white">
              <div className="inline-block mb-4">
                <div className="w-12 h-1 bg-white mx-auto mb-4"></div>
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                  Vermont Property Guide
                </span>
              </div>

              <h1
                className="mt-6 text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "Coconat" }}
              >
                Wastewater Permits & Clean Slate Exemption
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                Complete guide to Vermont wastewater system permits, the Clean
                Slate exemption, system types, costs, and regulatory
                requirements. Essential information for property buyers and
                homeowners.
              </p>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#21266c]"
                  style={{ fontFamily: "Coconat" }}
                >
                  Vermont Wastewater Regulations
                </h2>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Vermont has some of the strictest wastewater regulations in
                  the country, designed to protect groundwater, surface water,
                  and public health. The Vermont Department of Environmental
                  Conservation (DEC) regulates all wastewater systems through
                  the{" "}
                  <strong>Wastewater System and Potable Water Supply Rules</strong>.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Whether you're building a new home, replacing a failed septic
                  system, or adding bedrooms to an existing property,
                  understanding Vermont's permitting process is essential.
                  <strong> The "Clean Slate" exemption</strong> can
                  significantly reduce costs for system replacements, but only
                  if you meet specific requirements.
                </p>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-gray-800 font-medium mb-2">
                        Important Notice
                      </p>
                      <p className="text-gray-700">
                        Installing or replacing a wastewater system without a
                        permit is illegal in Vermont and can result in fines,
                        required system removal, and difficulty selling the
                        property. Always obtain permits before beginning work.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* When Permits Are Required */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4"
                style={{ fontFamily: "Coconat" }}
              >
                When Permits Are Required
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Vermont requires wastewater permits for these common scenarios.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {permitRequirements.map((requirement, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                      <requirement.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {requirement.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {requirement.description}
                      </p>
                    </div>
                  </div>

                  <div className="pl-16">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Examples:
                    </p>
                    <ul className="space-y-2">
                      {requirement.examples.map((example, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full flex-shrink-0 mt-1.5"></div>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clean Slate Exemption */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4"
                  style={{ fontFamily: "Coconat" }}
                >
                  Vermont Clean Slate Exemption
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  This exemption can save thousands of dollars when replacing
                  an existing wastewater system.
                </p>
              </div>

              <div className="space-y-6">
                {cleanSlateDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-200 rounded-xl p-8"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                        <detail.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-[#21266c] mb-3">
                          {detail.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {detail.description}
                        </p>

                        {detail.keyPoint && (
                          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-4">
                            <p className="text-sm font-semibold text-green-900 mb-1">
                              Key Benefit
                            </p>
                            <p className="text-sm text-gray-700">
                              {detail.keyPoint}
                            </p>
                          </div>
                        )}

                        {detail.conditions && (
                          <div>
                            <ul className="space-y-2">
                              {detail.conditions.map((condition, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-3 text-gray-700"
                                >
                                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                  <span>{condition}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {detail.limitations && (
                          <div>
                            <ul className="space-y-2">
                              {detail.limitations.map((limitation, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-3 text-gray-700"
                                >
                                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                  <span>{limitation}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {detail.requirements && (
                          <div>
                            <ul className="space-y-2">
                              {detail.requirements.map((requirement, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-3 text-gray-700"
                                >
                                  <ArrowRight className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                                  <span>{requirement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
                <p className="text-gray-800 font-medium mb-2">Pro Tip</p>
                <p className="text-gray-700">
                  Before purchasing a property with a failing septic system,
                  research whether the original system was permitted. If so,
                  Clean Slate can dramatically reduce replacement costs. Ask
                  the seller for permit records or check with your town clerk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Permit Process */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center"
                style={{ fontFamily: "Coconat" }}
              >
                Permit Application Process
              </h2>

              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                From initial site evaluation to final inspection, here's what
                to expect when applying for a Vermont wastewater permit.
              </p>

              <div className="space-y-6 mb-8">
                {permitProcess.map((step) => (
                  <div
                    key={step.step}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {step.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{step.timeline}</span>
                          </div>
                        </div>
                        <p className="text-gray-700">{step.description}</p>
                      </div>
                      <step.icon className="w-6 h-6 text-gray-400 flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-[#21266c] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-800 font-medium mb-2">
                      Typical Timeline
                    </p>
                    <p className="text-gray-700">
                      Plan for <strong>4-8 weeks</strong> from initial site
                      evaluation to permit approval, plus installation time.
                      Clean Slate applications may be processed faster since
                      extensive soil testing may not be required. Complex sites
                      or high-volume periods may take longer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System Types */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4"
                style={{ fontFamily: "Coconat" }}
              >
                Septic System Types
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Understanding the different wastewater treatment systems
                approved in Vermont.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {systemTypes.map((system, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-[#3b82f6] hover:shadow-lg transition-all"
                >
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-bold text-[#21266c]">
                        {system.type}
                      </h3>
                      <div className="flex items-center gap-2 text-lg font-bold text-green-700">
                        <DollarSign className="w-5 h-5" />
                        <span>{system.cost}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{system.description}</p>
                    <p className="text-sm text-gray-600">
                      <strong>Best for:</strong> {system.bestFor}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-semibold text-green-700 mb-3">
                        Advantages:
                      </p>
                      <ul className="space-y-2">
                        {system.pros.map((pro, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-3">
                        Disadvantages:
                      </p>
                      <ul className="space-y-2">
                        {system.cons.map((con, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <span>{con}</span>
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

        {/* Cost Breakdown */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4"
                  style={{ fontFamily: "Coconat" }}
                >
                  Permit & Installation Costs
                </h2>
                <p className="text-lg text-gray-600">
                  Budget for these typical expenses when planning a wastewater
                  system project.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {costBreakdown.map((item, index) => (
                    <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {item.item}
                        </h3>
                        <div className="flex items-center gap-1 text-xl font-bold text-[#21266c]">
                          <DollarSign className="w-5 h-5" />
                          <span>{item.cost}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{item.notes}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-800 font-medium mb-2">
                      Cost Considerations
                    </p>
                    <p className="text-gray-700">
                      Costs vary significantly based on soil conditions, site
                      access, system type, and local market rates. Difficult
                      sites with poor soil, ledge, or limited space can require
                      advanced systems costing $30,000-$50,000 or more.{" "}
                      <strong>
                        Clean Slate exemptions can save $2,000-$5,000
                      </strong>{" "}
                      by avoiding new soil testing and site capacity
                      evaluations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inspection Requirements */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4"
                  style={{ fontFamily: "Coconat" }}
                >
                  Inspection Requirements
                </h2>
                <p className="text-lg text-gray-600">
                  Vermont DEC requires inspections at multiple stages to ensure
                  proper installation.
                </p>
              </div>

              <div className="space-y-6">
                {inspectionRequirements.map((stage, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-200 rounded-xl p-8"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                        <FileCheck className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-[#21266c] mb-3">
                          {stage.title}
                        </h3>
                        <p className="text-gray-700 mb-4">
                          {stage.description}
                        </p>
                        <ul className="space-y-2">
                          {stage.items.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-gray-700"
                            >
                              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-800 font-medium mb-2">
                      Critical Requirement
                    </p>
                    <p className="text-gray-700">
                      <strong>Never backfill a system before inspection.</strong>{" "}
                      State inspectors must verify proper installation while
                      the excavation is open. Backfilling before inspection can
                      result in permit violations and required system removal
                      or expensive excavation for re-inspection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Soil Testing Requirements */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#21266c]"
                  style={{ fontFamily: "Coconat" }}
                >
                  Soil Testing & Percolation
                </h2>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  For new construction or system installations without Clean
                  Slate exemption, Vermont requires comprehensive soil
                  evaluation to determine if the site can support a wastewater
                  system.
                </p>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-8 mb-6">
                  <h3 className="text-xl font-bold text-[#21266c] mb-4">
                    What's Evaluated:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Soil Type & Texture:</strong> Sand, loam,
                        clay, and their suitability for wastewater treatment
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Depth to Bedrock:</strong> Minimum 5 feet
                        required for conventional systems
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Seasonal High Water Table:</strong> Must be
                        below leachfield depth during wettest season
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Percolation Rate:</strong> How quickly water
                        moves through soil (affects leachfield size)
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Slope & Drainage:</strong> Site grade and
                        natural drainage patterns
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-[#21266c] mb-4">
                    Common Soil Issues in Vermont:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-gray-700">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Shallow Bedrock:</strong> Common in Vermont,
                        may require mound systems
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>High Water Table:</strong> Especially in
                        lowland areas near water bodies
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Heavy Clay Soils:</strong> Poor drainage
                        requires larger leachfields or alternatives
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Steep Slopes:</strong> Slopes over 25% are
                        generally unsuitable for septic systems
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEC Resources */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4"
                  style={{ fontFamily: "Coconat" }}
                >
                  Official Resources
                </h2>
                <p className="text-lg text-gray-600">
                  Access Vermont Department of Environmental Conservation
                  wastewater resources.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <a
                  href="https://dec.vermont.gov/water/ww"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#3b82f6] transition-colors">
                        VT DEC Wastewater Program
                      </h3>
                      <p className="text-gray-600 mb-3">
                        Official wastewater permit information, forms, and
                        guidance documents.
                      </p>
                      <p className="text-sm text-gray-500">
                        dec.vermont.gov/water/ww
                      </p>
                    </div>
                    <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-[#3b82f6] flex-shrink-0 ml-4 transition-colors" />
                  </div>
                </a>

                <a
                  href="https://dec.vermont.gov/permits/water/ww"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#3b82f6] transition-colors">
                        Wastewater Permit Applications
                      </h3>
                      <p className="text-gray-600 mb-3">
                        Download permit application forms and submit online.
                      </p>
                      <p className="text-sm text-gray-500">
                        dec.vermont.gov/permits/water/ww
                      </p>
                    </div>
                    <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-[#3b82f6] flex-shrink-0 ml-4 transition-colors" />
                  </div>
                </a>

                <a
                  href="https://legislature.vermont.gov/statutes/section/10/064/001978"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#3b82f6] transition-colors">
                        Clean Slate Law (10 V.S.A. § 1978)
                      </h3>
                      <p className="text-gray-600 mb-3">
                        Read the official Clean Slate statute and exemption
                        language.
                      </p>
                      <p className="text-sm text-gray-500">
                        legislature.vermont.gov
                      </p>
                    </div>
                    <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-[#3b82f6] flex-shrink-0 ml-4 transition-colors" />
                  </div>
                </a>

                <a
                  href="https://anr.vermont.gov/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#3b82f6] transition-colors">
                        ANR Natural Resources Atlas
                      </h3>
                      <p className="text-gray-600 mb-3">
                        Check for wetlands, water bodies, and environmental
                        constraints on your property.
                      </p>
                      <p className="text-sm text-gray-500">
                        anr.vermont.gov/maps
                      </p>
                    </div>
                    <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-[#3b82f6] flex-shrink-0 ml-4 transition-colors" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources CTA */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center"
                style={{ fontFamily: "Coconat" }}
              >
                Related Resources
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <Link
                  href="/local-resources/anr-maps"
                  className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center mb-4">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#3b82f6] transition-colors">
                    ANR Maps Guide
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Learn how to use Vermont's ANR Atlas to research
                    environmental constraints on your property.
                  </p>
                  <div className="flex items-center text-[#3b82f6] font-semibold">
                    <span>View Guide</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link
                  href="/act-250-guide"
                  className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center mb-4">
                    <FileCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#3b82f6] transition-colors">
                    Act 250 Guide
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Understand Vermont's land use regulations and when Act 250
                    permits are required.
                  </p>
                  <div className="flex items-center text-[#3b82f6] font-semibold">
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>

              {/* Final CTA */}
              <div className="bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-2xl p-8 sm:p-12 text-center text-white">
                <h3
                  className="text-3xl sm:text-4xl font-bold mb-4"
                  style={{ fontFamily: "Coconat" }}
                >
                  Need Help with Wastewater Permits?
                </h3>
                <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                  Our team understands Vermont's wastewater regulations and can
                  connect you with experienced designers and installers. We'll
                  help you navigate the permit process and understand your
                  options.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#21266c] font-medium text-base rounded-full hover:bg-gray-100 transition-all duration-300"
                  >
                    CONTACT US TODAY
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/local-resources"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-medium text-base rounded-full hover:bg-white hover:text-[#21266c] transition-all duration-300"
                  >
                    MORE LOCAL RESOURCES
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
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
