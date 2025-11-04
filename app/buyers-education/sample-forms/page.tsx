"use client";

import {
  FileText,
  ClipboardCheck,
  AlertTriangle,
  Shield,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Home,
  DollarSign,
  Calendar,
  Users,
  FileCheck,
  XCircle,
  Info,
  Scale,
  Eye,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function SampleFormsPage() {
  const purchaseAgreementSections = [
    {
      icon: DollarSign,
      title: "Purchase Price & Earnest Money",
      description:
        "The contract specifies the total purchase price and the earnest money deposit (typically 1-3% of purchase price) that demonstrates your commitment.",
      keyPoints: [
        "Total purchase price in clear dollars",
        "Earnest money amount and how it's held (escrow)",
        "How earnest money applies to down payment at closing",
        "Conditions under which earnest money is refundable",
      ],
      watchFor:
        "Ensure earnest money is held in an escrow or trust account, not directly by the seller.",
    },
    {
      icon: Shield,
      title: "Contingencies (Your Safety Nets)",
      description:
        "Contingencies are conditions that must be met for the sale to proceed. They protect you from losing your deposit if certain issues arise.",
      keyPoints: [
        "Financing contingency: Sale depends on securing a mortgage",
        "Inspection contingency: Right to inspect and negotiate repairs",
        "Appraisal contingency: Home must appraise at or above price",
        "Clear timeframes for each contingency (usually 10-21 days)",
      ],
      watchFor:
        "Pay attention to deadlines. Missing a contingency deadline may mean you waive that protection.",
    },
    {
      icon: Calendar,
      title: "Closing Date & Possession",
      description:
        "The contract establishes when the sale closes and when you take possession of the property.",
      keyPoints: [
        "Specific closing date (or 'on or before' date)",
        "Possession date and time (often same day as closing)",
        "What happens if closing is delayed",
        "Rent-back agreements if seller stays after closing",
      ],
      watchFor:
        "In Vermont, possession typically transfers at closing unless otherwise specified.",
    },
    {
      icon: Home,
      title: "Property Description & Inclusions",
      description:
        "The contract describes the property being sold and what's included (fixtures) vs. excluded (personal property).",
      keyPoints: [
        "Legal description and street address",
        "Included fixtures (appliances, light fixtures, etc.)",
        "Excluded items (chandelier, washer/dryer, etc.)",
        "Condition of property at closing ('broom clean', etc.)",
      ],
      watchFor:
        "Be specific about what stays and goes. If it's important to you, put it in writing.",
    },
    {
      icon: Users,
      title: "Buyer & Seller Responsibilities",
      description:
        "The agreement outlines what each party is responsible for during the transaction.",
      keyPoints: [
        "Buyer: secure financing, conduct inspections, obtain insurance",
        "Seller: maintain property, provide required disclosures",
        "Who pays for title search, survey, inspections, etc.",
        "Seller's disclosure requirements under Vermont law",
      ],
      watchFor:
        "Vermont requires sellers to provide a Property Disclosure Statement about known defects.",
    },
    {
      icon: XCircle,
      title: "Default & Remedies",
      description:
        "What happens if either party fails to perform their obligations under the contract.",
      keyPoints: [
        "If buyer defaults: may lose earnest money deposit",
        "If seller defaults: buyer may sue for specific performance",
        "Dispute resolution procedures (mediation, arbitration)",
        "Attorney fees in case of legal action",
      ],
      watchFor:
        "These clauses are rarely invoked, but they're important protections. Review with your attorney.",
    },
  ];

  const agencyAgreementDetails = [
    {
      type: "Exclusive Buyer Representation",
      description:
        "You agree to work exclusively with one agent/brokerage for a specified time period and geographic area.",
      pros: [
        "Agent is fully committed to your best interests",
        "Agent invests more time and resources in your search",
        "Clearer fiduciary duties and loyalty",
      ],
      cons: [
        "You can't work with other agents during the term",
        "May owe commission even if you find a property yourself",
      ],
    },
    {
      type: "Non-Exclusive Representation",
      description:
        "You can work with multiple agents, and only the agent who shows you the property you buy earns the commission.",
      pros: [
        "Flexibility to work with multiple agents",
        "Only pay commission to the agent who helps you purchase",
      ],
      cons: [
        "Agents may be less committed to your search",
        "Less personalized service and attention",
      ],
    },
  ];

  const agencyDuties = [
    "Loyalty: Put your interests above the agent's own",
    "Confidentiality: Keep your information private",
    "Disclosure: Share all material facts about properties",
    "Reasonable care and skill: Provide competent service",
    "Account for funds: Handle deposits and funds properly",
    "Obedience: Follow your lawful instructions",
  ];

  const commissionStructure = [
    {
      scenario: "Typical Arrangement",
      description:
        "Buyer's agent commission is typically paid by the seller out of the sale proceeds (usually 2.5-3% of purchase price).",
    },
    {
      scenario: "Buyer Pays Directly (Rare)",
      description:
        "In some cases, the buyer may pay the agent directly if the seller doesn't offer buyer-side commission.",
    },
    {
      scenario: "Dual Agency",
      description:
        "If the same agent represents both buyer and seller, they must disclose this and get consent from both parties.",
    },
  ];

  const leadPaintRequirements = [
    {
      icon: AlertTriangle,
      title: "Seller Must Disclose",
      description:
        "Sellers of homes built before 1978 must disclose known lead-based paint hazards and provide available records/reports.",
    },
    {
      icon: Calendar,
      title: "10-Day Inspection Period",
      description:
        "Buyers have the right to conduct a lead paint inspection or risk assessment during a 10-day period (or mutually agreed timeframe).",
    },
    {
      icon: FileText,
      title: "EPA Pamphlet Required",
      description:
        "Sellers must provide buyers with the EPA pamphlet 'Protect Your Family from Lead in Your Home' and a lead disclosure form.",
    },
    {
      icon: CheckCircle2,
      title: "Signed Acknowledgment",
      description:
        "Both parties must sign a Lead-Based Paint Disclosure form acknowledging receipt of information and waiver or use of inspection period.",
    },
  ];

  const commonContingencies = [
    {
      icon: ClipboardCheck,
      title: "Home Inspection Contingency",
      description:
        "Allows you to hire a professional inspector to evaluate the property's condition.",
      keyTerms: [
        "Inspection period (typically 7-14 days)",
        "Right to request repairs or credits",
        "Right to withdraw if major issues are found",
        "Who pays for the inspection (usually buyer)",
      ],
      tipText:
        "Always get a professional inspection, even on newer homes. Inspection costs ($300-500) are minor compared to potential repair costs.",
    },
    {
      icon: DollarSign,
      title: "Financing Contingency",
      description:
        "Protects you if you can't secure a mortgage loan on acceptable terms.",
      keyTerms: [
        "Financing deadline (usually 30-45 days)",
        "Specific loan terms (amount, interest rate, type)",
        "Good faith requirement to apply for financing promptly",
        "Right to terminate if financing is denied",
      ],
      tipText:
        "Get pre-approved (not just pre-qualified) before making an offer to strengthen your financing contingency.",
    },
    {
      icon: FileCheck,
      title: "Appraisal Contingency",
      description:
        "Sale is contingent on the home appraising at or above the purchase price.",
      keyTerms: [
        "Appraisal must meet or exceed purchase price",
        "Options if appraisal comes in low",
        "Renegotiate price, increase down payment, or walk away",
        "Lender orders and pays for appraisal",
      ],
      tipText:
        "In hot markets, some buyers waive this contingency—but it's risky. You may need extra cash if appraisal is low.",
    },
    {
      icon: Home,
      title: "Home Sale Contingency",
      description:
        "Your purchase is contingent on selling your current home first.",
      keyTerms: [
        "Deadline for selling your current home",
        "'Kick-out' or 'escape' clause allowing seller to accept backup offers",
        "Terms of your home sale (price, timeline)",
        "Right to terminate if your home doesn't sell",
      ],
      tipText:
        "This contingency makes your offer less competitive. Consider selling your home first or bridge financing if possible.",
    },
  ];

  const vermontSpecificClauses = [
    {
      title: "Act 250 Land Use Permit",
      description:
        "For larger developments or subdivisions, Vermont's Act 250 requires state permits for land development. Ensure any required permits are in place or obtainable.",
    },
    {
      title: "Wastewater & Septic Systems",
      description:
        "Vermont has strict regulations for septic systems. The contract should address septic inspection, permits, and compliance with state wastewater rules.",
    },
    {
      title: "Current Use Program",
      description:
        "If property is enrolled in Vermont's Current Use program (reduced property taxes for agricultural/forest land), there may be Land Use Change Tax due at sale.",
    },
    {
      title: "Zoning & Permitted Uses",
      description:
        "Vermont towns have varying zoning laws. Verify the property's zoning allows your intended use and any future development plans.",
    },
    {
      title: "Water Rights & Wells",
      description:
        "For properties with wells, confirm water quality, flow rate, and Vermont well construction standards. Test water quality and quantity.",
    },
    {
      title: "Boundary Disputes & Surveys",
      description:
        "Vermont is a 'metes and bounds' state. Consider getting a survey, especially for rural properties, to confirm boundaries and avoid disputes.",
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
                  Educational Resources
                </span>
              </div>

              <h1
                className="mt-6 text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "Coconat" }}
              >
                Sample Forms & Documents
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                Understanding real estate documents is essential to protecting
                your interests. This guide explains common forms, contracts, and
                disclosures you'll encounter when buying a home in Vermont.
              </p>
            </div>
          </div>
        </section>

        {/* Important Disclaimer */}
        <section className="py-12 bg-yellow-50 border-b-2 border-yellow-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Educational Examples Only - Not Legal Documents
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    The information provided here is for educational purposes to
                    help you understand common real estate forms and clauses.{" "}
                    <strong>
                      These are NOT legal documents and should NOT be used for
                      actual transactions.
                    </strong>
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Real estate contracts are legally binding and vary based on
                    your specific situation. Always work with a licensed{" "}
                    <strong>Vermont real estate attorney</strong> to review and
                    prepare your actual purchase documents. In Vermont,{" "}
                    <Link
                      href="/buyers-education/vermont-attorney-requirement"
                      className="text-[#3b82f6] hover:text-[#21266c] font-semibold underline"
                    >
                      attorneys are required at closing
                    </Link>{" "}
                    to protect your interests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Purchase & Sale Agreement Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#21266c]"
                  style={{ fontFamily: "Coconat" }}
                >
                  Purchase & Sale Agreement
                </h2>
              </div>

              <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                The Purchase and Sale Agreement (P&S Agreement) is the primary
                contract between buyer and seller. It's a legally binding
                document that outlines all terms of the sale. Your real estate
                agent typically prepares a draft, but your{" "}
                <strong>attorney must review and finalize it</strong> in
                Vermont.
              </p>

              <div className="space-y-6">
                {purchaseAgreementSections.map((section, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                        <section.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {section.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {section.description}
                        </p>

                        <div className="space-y-2 mb-4">
                          {section.keyPoints.map((point, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>

                        <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-4 rounded-r-lg">
                          <p className="text-sm text-gray-800">
                            <strong className="text-[#21266c]">
                              Watch For:
                            </strong>{" "}
                            {section.watchFor}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Buyer/Broker Agency Agreement Section */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#21266c]"
                  style={{ fontFamily: "Coconat" }}
                >
                  Buyer/Broker Agency Agreement
                </h2>
              </div>

              <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                This agreement formalizes your relationship with your real
                estate agent and establishes their duties and your obligations.
                Understanding this agreement helps you know what to expect from
                your agent.
              </p>

              {/* Exclusive vs Non-Exclusive */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Types of Representation
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {agencyAgreementDetails.map((type, index) => (
                    <div
                      key={index}
                      className="bg-white border-2 border-gray-200 rounded-xl p-6"
                    >
                      <h4 className="text-lg font-bold text-[#21266c] mb-3">
                        {type.type}
                      </h4>
                      <p className="text-gray-600 text-sm mb-4">
                        {type.description}
                      </p>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-green-700 mb-2">
                          Advantages:
                        </p>
                        <ul className="space-y-1">
                          {type.pros.map((pro, i) => (
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
                        <p className="text-sm font-semibold text-red-700 mb-2">
                          Considerations:
                        </p>
                        <ul className="space-y-1">
                          {type.cons.map((con, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <Info className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agency Duties */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Your Agent's Legal Duties
                </h3>
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <p className="text-gray-600 mb-4">
                    When you enter into a buyer representation agreement, your
                    agent owes you these fiduciary duties under Vermont law:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {agencyDuties.map((duty, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <Shield className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                        <span>{duty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Commission Structure */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Commission Structure
                </h3>
                <div className="space-y-4">
                  {commissionStructure.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-colors"
                    >
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        {item.scenario}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Term & Termination */}
              <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  Term & Termination
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Duration:</strong> Agreements typically last 30-90
                      days but can be any mutually agreed timeframe.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Termination:</strong> Review the termination
                      clause carefully. Some agreements automatically renew;
                      others require written notice to terminate.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Post-Termination:</strong> Some agreements include
                      a "tail" provision where the agent is owed commission if
                      you buy a property they showed you within a certain period
                      after termination.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Paint Disclosure Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#21266c]"
                  style={{ fontFamily: "Coconat" }}
                >
                  Lead-Based Paint Disclosure
                </h2>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
                <p className="text-gray-800 font-medium mb-2">
                  Federal Requirement for Pre-1978 Homes
                </p>
                <p className="text-gray-700 text-sm">
                  If you're buying a home built before 1978, federal law
                  requires specific lead-based paint disclosures and
                  notifications. Lead paint was banned for residential use in
                  1978, so older homes may contain lead hazards.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {leadPaintRequirements.map((req, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-orange-500 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                        <req.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {req.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {req.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">
                  Your Rights as a Buyer
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-800 font-medium text-sm">
                        Right to Inspect
                      </p>
                      <p className="text-gray-600 text-sm">
                        You have 10 days (or a mutually agreed timeframe) to
                        conduct a lead paint inspection or risk assessment at
                        your expense.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-800 font-medium text-sm">
                        Right to Waive
                      </p>
                      <p className="text-gray-600 text-sm">
                        You can waive your right to a lead inspection, but you
                        must still receive the disclosure information and EPA
                        pamphlet.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-800 font-medium text-sm">
                        Right to Withdraw
                      </p>
                      <p className="text-gray-600 text-sm">
                        If significant lead hazards are found during inspection,
                        you can negotiate repairs, a price reduction, or
                        withdraw from the contract (depending on your
                        contingencies).
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Common Contingencies Section */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#21266c]"
                  style={{ fontFamily: "Coconat" }}
                >
                  Common Contingencies & Addendums
                </h2>
              </div>

              <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                Contingencies are "escape clauses" that allow you to back out of
                the contract without losing your earnest money deposit if
                certain conditions aren't met. These are your safety nets—use
                them wisely.
              </p>

              <div className="space-y-6">
                {commonContingencies.map((contingency, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                        <contingency.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {contingency.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {contingency.description}
                        </p>

                        <div className="mb-4">
                          <p className="text-sm font-semibold text-gray-900 mb-2">
                            Key Terms to Understand:
                          </p>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {contingency.keyTerms.map((term, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2 text-sm text-gray-700"
                              >
                                <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mt-1.5 flex-shrink-0"></div>
                                <span>{term}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                          <p className="text-sm text-gray-800">
                            <strong className="text-green-700">Pro Tip:</strong>{" "}
                            {contingency.tipText}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vermont-Specific Clauses Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#21266c]"
                  style={{ fontFamily: "Coconat" }}
                >
                  Vermont-Specific Clauses to Watch For
                </h2>
              </div>

              <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                Vermont has unique laws and regulations that may require
                specific clauses or considerations in your purchase agreement.
                Your attorney will ensure these are properly addressed.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {vermontSpecificClauses.map((clause, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-green-200 rounded-xl p-6 hover:border-green-500 hover:shadow-lg transition-all"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {clause.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {clause.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <p className="text-gray-800 font-medium mb-2">
                  Why These Matter
                </p>
                <p className="text-gray-700 text-sm">
                  Vermont's rural character, environmental regulations, and land
                  use laws create unique considerations not found in many other
                  states. These clauses protect you from unexpected costs,
                  permit issues, or legal complications. Your attorney will
                  ensure all Vermont-specific requirements are addressed in your
                  contract.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Disclaimer Section */}
        <section className="py-16 sm:py-20 bg-red-50 border-t-2 border-red-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border-2 border-red-300 rounded-xl p-8">
                <div className="flex items-start gap-4 mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Important Legal Disclaimer
                    </h3>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        <strong>This information is for educational purposes
                        only.</strong> It is NOT legal advice and should NOT be
                        used as a substitute for professional legal counsel.
                      </p>
                      <p>
                        Real estate contracts are complex legal documents that
                        vary based on individual circumstances, property type,
                        location, and transaction details. Every purchase
                        agreement should be customized to your specific
                        situation and reviewed by a qualified attorney.
                      </p>
                      <p>
                        <strong>Vermont law requires a licensed attorney to
                        conduct real estate closings.</strong> Your attorney
                        will:
                      </p>
                      <ul className="space-y-2 ml-6">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                          <span>
                            Review and explain all documents in plain language
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                          <span>Identify legal issues and protect your interests</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                          <span>Conduct title searches and resolve title defects</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                          <span>Ensure compliance with Vermont laws and regulations</span>
                        </li>
                      </ul>
                      <p className="pt-2">
                        <strong>Never sign a real estate contract without
                        having it reviewed by your attorney.</strong> The cost
                        of legal review (typically $800-$1,200) is minimal
                        compared to the potential legal and financial risks of
                        signing a flawed or unfavorable contract.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-xl p-8 sm:p-12 text-center text-white">
                <FileCheck className="w-12 h-12 mx-auto mb-4" />
                <h3
                  className="text-2xl sm:text-3xl font-bold mb-3"
                  style={{ fontFamily: "Coconat" }}
                >
                  Ready to Navigate the Home Buying Process?
                </h3>
                <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                  Understanding these documents is just the first step. Our team
                  will guide you through every contract, form, and disclosure,
                  and connect you with trusted Vermont attorneys to protect your
                  interests.
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
                    href="/buyers-education/vermont-attorney-requirement"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-medium text-base rounded-full hover:bg-white hover:text-[#21266c] transition-all duration-300"
                  >
                    Learn About Attorney Requirements
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
