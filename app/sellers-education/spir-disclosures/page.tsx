import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ArrowLeft,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Shield,
  Home,
  Droplet,
  Zap,
  Scale,
  Clock,
  AlertCircle,
  ExternalLink,
  FileWarning,
  ScrollText,
} from "lucide-react";

export default function SPIRDisclosuresPage() {
  const mandatoryDisclosures = [
    {
      title: "Lead-Based Paint",
      icon: AlertTriangle,
      description:
        "Required for all homes built before 1978. Must provide EPA pamphlet and disclose known lead paint presence.",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Water Source & Quality",
      icon: Droplet,
      description:
        "Disclose water source (well, municipal, shared). Well water testing is mandatory in Vermont.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Septic System",
      icon: Home,
      description:
        "Condition, last pumping date, permits, and any known issues with the septic system or leach field.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Radon Testing",
      icon: FileWarning,
      description:
        "Disclose any radon testing results. Vermont has high radon potential in many areas.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Structural Issues",
      icon: AlertCircle,
      description:
        "Foundation cracks, roof condition, water intrusion, or any structural defects.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Environmental Hazards",
      icon: Zap,
      description:
        "Underground storage tanks, asbestos, mold, or other environmental concerns.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  const additionalDisclosures = [
    "Flood zone status and history of flooding",
    "Property line disputes or boundary issues",
    "Zoning violations or non-conforming uses",
    "Homeowners association fees and restrictions",
    "Past repairs, renovations, and permits obtained",
    "Known defects in appliances or systems",
    "Neighbor disputes or nuisance issues",
    "Right of way or easement agreements",
    "Current use enrollment or conservation easements",
    "Shared driveways or private road maintenance",
  ];

  const consequences = [
    {
      title: "Contract Rescission",
      description:
        "Buyers may have the right to cancel the purchase agreement if material defects were not disclosed.",
      icon: FileText,
    },
    {
      title: "Financial Liability",
      description:
        "Sellers can be held liable for repair costs, diminution in value, and buyer's expenses.",
      icon: Scale,
    },
    {
      title: "Legal Action",
      description:
        "Buyers may pursue legal action for fraudulent concealment or misrepresentation.",
      icon: Shield,
    },
    {
      title: "Delayed Closing",
      description:
        "Late disclosures can delay closing while issues are addressed or renegotiated.",
      icon: Clock,
    },
  ];

  const accuracyTips = [
    {
      title: "Be Thorough",
      description:
        "Answer every question completely. 'Unknown' is better than leaving items blank.",
    },
    {
      title: "Disclose Everything",
      description:
        "When in doubt, disclose. It's better to over-disclose than face liability later.",
    },
    {
      title: "Document Repairs",
      description:
        "Provide records of repairs and improvements, including permits and invoices.",
    },
    {
      title: "Don't Guess",
      description:
        "If you don't know something, say so. Don't make assumptions or estimates.",
    },
    {
      title: "Update as Needed",
      description:
        "If new issues arise before closing, update your disclosures immediately.",
    },
    {
      title: "Seek Professional Help",
      description:
        "Consult your attorney or real estate agent if you're unsure about any disclosures.",
    },
  ];

  const timeline = [
    {
      when: "Before Listing",
      action: "Complete SPIR form",
      details:
        "Work with your agent to complete the form thoroughly and accurately.",
    },
    {
      when: "With Offer or Before P&S",
      action: "Provide SPIR to buyer",
      details:
        "Vermont law requires delivery before or with the Purchase & Sale agreement.",
    },
    {
      when: "Buyer Review Period",
      action: "Buyer reviews disclosures",
      details:
        "Buyers typically have 5-10 days to review and may request additional information.",
    },
    {
      when: "Before Closing",
      action: "Update if needed",
      details:
        "Disclose any new issues that arise during the transaction period.",
    },
  ];

  const relatedResources = [
    {
      title: "Preparing to Sell",
      description: "Get your home and documentation ready for the market",
      href: "/sellers-education/preparing-to-sell",
    },
    {
      title: "Negotiating Offers",
      description: "Navigate disclosure-related negotiations with confidence",
      href: "/sellers-education/negotiating-offers",
    },
    {
      title: "Pricing Strategy",
      description: "How disclosures impact your pricing strategy",
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
            SPIR & Seller Disclosures
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Understanding Vermont's mandatory disclosure requirements and
            protecting yourself from liability
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#21266c] text-lg mb-2">
                  What is SPIR?
                </h3>
                <p className="text-gray-700 mb-3">
                  The Seller's Property Information Report (SPIR) is a
                  comprehensive disclosure form required by Vermont law (27
                  V.S.A. § 311). It requires sellers to disclose all known
                  material defects and property conditions that could affect a
                  buyer's decision to purchase or the property's value.
                </p>
                <p className="text-gray-700">
                  Complete and honest disclosure protects both buyers and
                  sellers, reduces the risk of post-sale disputes, and is
                  legally required in Vermont real estate transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vermont Law Requirement */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Vermont's Disclosure Law
            </h2>
            <p className="text-xl text-gray-600">
              Understanding the legal requirements under 27 V.S.A. § 311
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 border-2 border-[#3b82f6]">
            <div className="flex items-start gap-4 mb-6">
              <ScrollText className="w-10 h-10 text-[#3b82f6] flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-[#21266c] mb-3">
                  Vermont Statute 27 V.S.A. § 311
                </h3>
                <p className="text-gray-700 mb-4">
                  Vermont law mandates that sellers of residential property
                  provide a property disclosure statement to prospective buyers.
                  This disclosure must be made before the buyer signs a purchase
                  and sale agreement, or at the time an offer is presented.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold text-[#21266c] mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#3b82f6]" />
                  Seller's Obligation
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#3b82f6] mt-1">•</span>
                    <span>
                      Disclose all known material defects that affect property
                      value
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3b82f6] mt-1">•</span>
                    <span>Provide disclosure before P&S agreement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3b82f6] mt-1">•</span>
                    <span>Answer all questions truthfully and completely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3b82f6] mt-1">•</span>
                    <span>Update disclosures if new issues arise</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold text-[#21266c] mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#3b82f6]" />
                  Legal Protection
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#3b82f6] mt-1">•</span>
                    <span>
                      Good faith disclosure protects sellers from liability
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3b82f6] mt-1">•</span>
                    <span>
                      Sellers not liable for unknown or undiscoverable defects
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3b82f6] mt-1">•</span>
                    <span>Documentation provides evidence of compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3b82f6] mt-1">•</span>
                    <span>
                      Reduces risk of post-closing disputes and litigation
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Disclosures */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              What Must Be Disclosed
            </h2>
            <p className="text-xl text-gray-600">
              Key areas covered by Vermont's disclosure requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mandatoryDisclosures.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`${item.bgColor} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}
                  >
                    <IconComponent className={`w-7 h-7 ${item.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-[#21266c] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Disclosure Items */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Additional Important Disclosures
            </h2>
            <p className="text-xl text-gray-600">
              Other property conditions and issues to disclose
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {additionalDisclosures.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <ClipboardCheck className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  When in Doubt, Disclose
                </h3>
                <p className="text-gray-700">
                  If you're unsure whether something needs to be disclosed,
                  err on the side of caution and disclose it. Over-disclosure
                  is always safer than under-disclosure. Material facts that
                  could affect a buyer's decision or the property's value
                  should always be disclosed, regardless of whether they're
                  specifically listed on the SPIR form.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclosure Timeline */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Disclosure Timeline
            </h2>
            <p className="text-xl text-gray-600">
              When disclosures must be provided during the sales process
            </p>
          </div>

          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[#21266c] text-white px-4 py-2 rounded-lg font-bold whitespace-nowrap flex-shrink-0">
                    {item.when}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#21266c] mb-2">
                      {item.action}
                    </h3>
                    <p className="text-gray-700">{item.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#21266c] text-lg mb-2">
                  Timing is Critical
                </h3>
                <p className="text-gray-700">
                  Vermont law requires that SPIR be provided to the buyer
                  before or at the time a purchase and sale agreement is
                  signed. Late disclosure can give buyers the right to cancel
                  the contract or renegotiate terms. Complete your SPIR early
                  in the listing process to avoid delays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consequences of Non-Disclosure */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Consequences of Non-Disclosure
            </h2>
            <p className="text-xl text-gray-600">
              Understanding the risks of incomplete or inaccurate disclosures
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {consequences.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white border-2 border-red-200 rounded-lg p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-red-50 p-3 rounded-lg flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#21266c] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 border-2 border-red-300">
            <div className="flex items-start gap-4 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
              <h3 className="text-2xl font-bold text-[#21266c]">
                Real Consequences, Real Costs
              </h3>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                Failing to disclose known defects can result in significant
                financial and legal consequences. Vermont courts have held
                sellers liable for:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">•</span>
                  <span>
                    <strong>Repair costs</strong> - Full cost to fix
                    undisclosed defects
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">•</span>
                  <span>
                    <strong>Diminution in value</strong> - Loss of property
                    value due to defects
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">•</span>
                  <span>
                    <strong>Attorney fees and costs</strong> - Buyer's legal
                    expenses in pursuing claims
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">•</span>
                  <span>
                    <strong>Punitive damages</strong> - In cases of fraudulent
                    concealment
                  </span>
                </li>
              </ul>
              <p className="text-sm italic mt-4">
                The cost of litigation often exceeds the cost of the defect
                itself. Honest disclosure is always the best policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips for Accurate Completion */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Tips for Completing SPIR Accurately
            </h2>
            <p className="text-xl text-gray-600">
              Best practices for thorough and honest disclosure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accuracyTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-[#3b82f6] flex-shrink-0" />
                  <h3 className="text-xl font-bold text-[#21266c]">
                    {tip.title}
                  </h3>
                </div>
                <p className="text-gray-700">{tip.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-xl p-8 border-2 border-[#3b82f6]">
            <h3 className="text-2xl font-bold text-[#21266c] mb-4">
              Working with Your Real Estate Agent
            </h3>
            <p className="text-gray-700 mb-4">
              Your real estate agent is an invaluable resource when completing
              the SPIR form. They can:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Help you understand which items require disclosure
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Review your completed form for completeness
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Advise on how to present issues professionally
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Coordinate with attorneys when needed
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official SPIR Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#21266c] to-[#3b82f6] text-white rounded-xl p-8 text-center">
            <FileText className="w-16 h-16 mx-auto mb-6" />
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Official Vermont SPIR Form
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Download the official Seller's Property Information Report form
              from the Vermont Board of Real Estate
            </p>
            <a
              href="https://sos.vermont.gov/real-estate-appraisers/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#21266c] px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Visit Vermont Real Estate Board
              <ExternalLink className="w-5 h-5" />
            </a>
            <p className="text-sm text-blue-100 mt-4">
              Your real estate agent will typically provide you with the SPIR
              form
            </p>
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
            Need Help with Seller Disclosures?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Our experienced team will guide you through the disclosure process
            to ensure compliance and protect your interests. Contact us for
            expert assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-[#21266c] px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Schedule a Consultation
            </Link>
            <Link
              href="/sellers-education"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Explore More Resources
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
