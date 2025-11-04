"use client";

import { ArrowLeft, ArrowRight, FileSearch, Building2, MapPin, ExternalLink, CheckCircle2, FolderOpen, Search, DollarSign, FileText, Map, Clock, AlertCircle, ScrollText, Shield, Phone, Globe } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function LandRecords() {
  const countyClerkOffices = [
    {
      name: "Bennington County Clerk",
      address: "207 South Street, Suite 5, Bennington, VT 05201",
      phone: "(802) 447-2700",
      fax: "(802) 442-8268",
      website: "https://www.benningtoncountyvt.org/county-clerk",
      email: "countyclerk@benningtoncountyvermont.gov",
      hours: "Monday - Friday: 8:00 AM - 4:30 PM",
      services: ["Land Records Search", "Document Recording", "Certified Copies", "Property Research", "Historical Records"],
      onlineAccess: true
    },
    {
      name: "Rutland County Clerk",
      address: "83 Center Street, Rutland, VT 05701",
      phone: "(802) 775-4394",
      fax: "(802) 775-0560",
      website: "https://rutlandcounty.org/departments/county-clerk/",
      email: "clerk@rutlandcounty.org",
      hours: "Monday - Friday: 8:30 AM - 4:30 PM",
      services: ["Land Records Search", "Document Recording", "Certified Copies", "Title Research", "Survey Records"],
      onlineAccess: true
    },
    {
      name: "Franklin County Clerk",
      address: "17 Church Street, St. Albans, VT 05478",
      phone: "(802) 524-7948",
      fax: "(802) 527-5258",
      website: "https://www.franklincountyclerk.com/",
      email: "clerk@franklincountyvt.org",
      hours: "Monday - Friday: 8:00 AM - 4:30 PM",
      services: ["Land Records Search", "Document Recording", "Certified Copies", "Property History", "Deed Research"],
      onlineAccess: true
    }
  ];

  const landRecordTypes = [
    {
      title: "Deeds & Property Transfers",
      icon: FileText,
      description: "Legal documents that transfer property ownership from one party to another. Includes warranty deeds, quitclaim deeds, and transfer declarations.",
      contains: [
        "Buyer and seller information",
        "Property description and boundaries",
        "Purchase price and consideration",
        "Date of transfer",
        "Legal property description",
        "Grantee and grantor signatures"
      ]
    },
    {
      title: "Mortgages & Liens",
      icon: DollarSign,
      description: "Records of loans secured by real property and legal claims against properties. Essential for understanding property encumbrances.",
      contains: [
        "Mortgage amount and terms",
        "Lender and borrower information",
        "Property used as collateral",
        "Payment schedules",
        "Tax liens and judgments",
        "Mechanic's liens and UCC filings"
      ]
    },
    {
      title: "Survey Maps & Plats",
      icon: Map,
      description: "Professional surveys showing property boundaries, dimensions, and physical features. Critical for understanding exact property lines.",
      contains: [
        "Property boundary measurements",
        "Adjacent property information",
        "Easements and rights of way",
        "Topographical features",
        "Building locations",
        "Street and lot numbers"
      ]
    },
    {
      title: "Easements & Restrictions",
      icon: Shield,
      description: "Legal rights and limitations affecting property use. Includes utility easements, access rights, and deed restrictions.",
      contains: [
        "Utility access rights",
        "Shared driveway agreements",
        "Conservation easements",
        "Building restrictions",
        "Covenant agreements",
        "Right of way documentation"
      ]
    },
    {
      title: "Property Tax Information",
      icon: ScrollText,
      description: "Assessment records and tax payment history maintained by town clerks and listers. Useful for understanding property values.",
      contains: [
        "Current assessed value",
        "Property tax rate",
        "Payment history",
        "Tax exemptions",
        "Assessment appeals",
        "Grand list information"
      ]
    }
  ];

  const searchMethods = [
    {
      method: "By Owner Name",
      icon: Search,
      description: "Search for all properties owned by a specific person or entity. Useful for researching ownership history.",
      tips: "Use full legal names as they appear on deeds. Try variations including middle initials and maiden names."
    },
    {
      method: "By Property Address",
      icon: MapPin,
      description: "Find records associated with a specific street address. Most common search method for buyers and researchers.",
      tips: "Include complete street address with town name. Some older properties may have had address changes."
    },
    {
      method: "By Book & Page Number",
      icon: FolderOpen,
      description: "Direct reference to specific recorded documents using traditional indexing system still used in Vermont.",
      tips: "Book and page numbers are found on existing deeds and documents. This is the most precise search method."
    },
    {
      method: "By Parcel ID",
      icon: FileSearch,
      description: "Search using the unique identification number assigned to each property by town assessors.",
      tips: "Parcel IDs (SPAN numbers) are available from town assessor's offices and property tax bills."
    }
  ];

  const searchSteps = [
    {
      step: 1,
      title: "Identify Your Search Method",
      description: "Determine whether you'll search by owner name, address, parcel ID, or book and page number. Gather all available information."
    },
    {
      step: 2,
      title: "Visit County Clerk's Office or Website",
      description: "Access online land records through the county clerk website or visit the office in person. Most Vermont counties now offer online searching."
    },
    {
      step: 3,
      title: "Enter Search Criteria",
      description: "Input your search information carefully. Online systems may have different search interfaces - read instructions carefully."
    },
    {
      step: 4,
      title: "Review Search Results",
      description: "Examine the list of documents returned. Results typically show document type, recording date, parties involved, and document reference numbers."
    },
    {
      step: 5,
      title: "View Document Details",
      description: "Click on or request specific documents to view full details. Online systems usually display scanned images of original documents."
    },
    {
      step: 6,
      title: "Request Certified Copies",
      description: "If you need official copies for legal purposes, request certified copies from the county clerk. Fees apply for certification."
    }
  ];

  const recordingFees = [
    {
      document: "Warranty Deed",
      fee: "$15 - $25",
      details: "Standard fee for recording property transfer deed. May include land records tax based on property value."
    },
    {
      document: "Quitclaim Deed",
      fee: "$15 - $25",
      details: "Same recording fee as warranty deed. No title insurance implications, just recording."
    },
    {
      document: "Mortgage",
      fee: "$10 - $15",
      details: "Recording fee for new mortgages. Refinances and modifications have similar fees."
    },
    {
      document: "Mortgage Discharge",
      fee: "$10 - $15",
      details: "Fee to record satisfaction or discharge of existing mortgage lien."
    },
    {
      document: "Easement",
      fee: "$15 - $25",
      details: "Recording fee for easement agreements, access rights, and covenant documents."
    },
    {
      document: "Certified Copy",
      fee: "$10 per document",
      details: "Additional fee for certified copies with county clerk seal. First page may cost more."
    }
  ];

  const commonUses = [
    {
      use: "Title Research Before Purchase",
      icon: CheckCircle2,
      description: "Review property history to ensure clear title before buying. Check for liens, judgments, and ownership disputes.",
      importance: "Critical for protecting your investment and qualifying for title insurance."
    },
    {
      use: "Verify Ownership History",
      icon: FileSearch,
      description: "Trace chain of title to confirm legitimate ownership succession and identify any gaps or irregularities.",
      importance: "Essential for establishing legal ownership and resolving boundary disputes."
    },
    {
      use: "Check for Liens or Encumbrances",
      icon: AlertCircle,
      description: "Identify outstanding mortgages, tax liens, mechanic's liens, or judgments against the property.",
      importance: "Protects buyers from inheriting previous owner's debts or legal obligations."
    },
    {
      use: "Research Property Boundaries",
      icon: Map,
      description: "Review recorded surveys and property descriptions to determine exact boundary lines and dimensions.",
      importance: "Prevents disputes with neighbors and ensures accurate property measurements."
    },
    {
      use: "Confirm Easements or Rights of Way",
      icon: Shield,
      description: "Verify utility easements, access rights, or restrictions that may affect property use and development.",
      importance: "Reveals limitations on property use and third-party access rights."
    },
    {
      use: "Estate Planning & Probate",
      icon: ScrollText,
      description: "Gather property documentation for estate settlement, will preparation, or probate proceedings.",
      importance: "Ensures proper transfer of property to heirs and beneficiaries."
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
            <Link href="/local-resources" className="inline-flex items-center gap-2 text-white hover:text-blue-100 transition-colors mb-8">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Local Resources</span>
            </Link>

            {/* Page Header */}
            <div className="text-white">
              <div className="inline-block mb-4">
                <div className="w-12 h-1 bg-white mb-4"></div>
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                  Property Information
                </span>
              </div>

              <h1
                className="mt-6 text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "Coconat" }}
              >
                County Land Records
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                Your comprehensive guide to accessing and understanding Vermont land records. Learn how to research property ownership, deeds, mortgages, and property history through county clerk offices.
              </p>
            </div>
          </div>
        </section>

        {/* What Are Land Records */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-6" style={{ fontFamily: "Coconat" }}>
                What Are Land Records?
              </h2>
              <div className="prose prose-lg max-w-4xl">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Land records are official documents maintained by county clerk offices that document property ownership, transfers, mortgages, liens, and other legal matters affecting real estate. In Vermont, these records are public information accessible to anyone who needs to research property history or verify ownership.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The county clerk acts as the official recorder and custodian of land records, ensuring that property transactions are properly documented and preserved. When you buy property, refinance a mortgage, or record an easement, these documents become part of the permanent public record.
                </p>
              </div>
            </div>

            {/* Why They Matter */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#21266c] mb-4">Why Land Records Matter</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 leading-relaxed"><span className="font-semibold text-[#21266c]">Protect Your Investment:</span> Verify clear title and identify potential issues before purchasing property.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 leading-relaxed"><span className="font-semibold text-[#21266c]">Legal Documentation:</span> Provide proof of ownership and establish chain of title for legal proceedings.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 leading-relaxed"><span className="font-semibold text-[#21266c]">Property Research:</span> Understand property history, boundaries, restrictions, and encumbrances.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 leading-relaxed"><span className="font-semibold text-[#21266c]">Title Insurance:</span> Required information for obtaining title insurance policies on real property.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 leading-relaxed"><span className="font-semibold text-[#21266c]">Public Transparency:</span> Maintain public record of property transactions to prevent fraud and disputes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Land Records */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Information Available in Land Records
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Vermont land records contain a wealth of information about property ownership, transfers, mortgages, and legal restrictions. Here's what you can find:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {landRecordTypes.map((record, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 hover:border-[#3b82f6] transition-all">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                      <record.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#21266c] mb-2">{record.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{record.description}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#21266c] mb-3">Typical Information Included:</p>
                    <div className="space-y-2">
                      {record.contains.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* County Clerk Offices */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Vermont County Clerk Offices
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Access land records through these county clerk offices. Most Vermont counties now offer online land record searching in addition to in-person services.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {countyClerkOffices.map((office, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all">
                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#21266c] mb-1">{office.name}</h3>
                      {office.onlineAccess && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Online Access
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-[#3b82f6] flex-shrink-0" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                      <span>{office.hours}</span>
                    </div>
                  </div>

                  <a
                    href={office.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[#3b82f6] hover:text-[#21266c] font-semibold text-sm transition-colors mb-4"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {office.services.map((service, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-blue-50 text-[#3b82f6] rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Search */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                How to Search Land Records
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Vermont land records can be searched using several different methods. Choose the approach that best fits the information you have available.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {searchMethods.map((method, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <method.icon className="w-5 h-5 text-[#3b82f6]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#21266c] mb-2">{method.method}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">{method.description}</p>
                      <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-3 rounded-r">
                        <p className="text-xs text-gray-700">
                          <span className="font-semibold text-[#21266c]">Tip:</span> {method.tips}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Step by Step Tutorial */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#21266c] mb-3" style={{ fontFamily: "Coconat" }}>
                  Step-by-Step Search Tutorial
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Follow these steps to successfully search Vermont land records online or in person:
                </p>
              </div>

              <div className="space-y-6">
                {searchSteps.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center">
                        <span className="text-lg font-bold text-white">{item.step}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-[#21266c] mb-2">{item.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recording Fees */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Recording Fees
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Vermont county clerks charge fees for recording documents and providing certified copies. Fees vary by county and document type.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recordingFees.map((fee, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#21266c]">{fee.document}</h3>
                    <span className="text-2xl font-bold text-[#3b82f6]">{fee.fee}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{fee.details}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-[#3b82f6]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#21266c] mb-1">Fee Information</p>
                  <p className="text-sm text-gray-700">Recording fees shown are approximate and may vary by county. Contact your county clerk for exact current fees. Some counties charge additional fees for documents exceeding a certain page count. Vermont Property Transfer Tax is calculated separately based on property value.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Uses */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Common Uses for Land Records
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Understanding when and why to access land records helps protect your property interests and make informed real estate decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {commonUses.map((use, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-all">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center mb-4">
                    <use.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#21266c] mb-3">{use.use}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{use.description}</p>
                  <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-3 rounded-r">
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold text-[#21266c]">Why It Matters:</span> {use.importance}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Online vs In-Person */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Online vs In-Person Access
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Online Access */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center mb-6">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#21266c] mb-4">Online Access</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Most Vermont counties now offer online land record searching through their websites. Access records from anywhere at any time.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Search 24/7 from home or office</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">View scanned document images instantly</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Print documents for reference</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Most searches are free or low-cost</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Records typically date back 20-30 years</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 italic">
                  Note: Online copies are for reference only and are not certified for legal purposes.
                </p>
              </div>

              {/* In-Person Access */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center mb-6">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#21266c] mb-4">In-Person Access</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Visit county clerk offices during business hours for comprehensive access to all records and staff assistance.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Access to complete historical records</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Staff assistance with complex searches</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Obtain certified copies immediately</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">View original documents and older records</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Record new documents and pay fees</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 italic">
                  Recommended for comprehensive title research and obtaining certified copies for legal transactions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Certified Copies */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                How to Obtain Certified Copies
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Certified copies bear the official seal of the county clerk and are required for legal transactions, court proceedings, and official purposes.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-[#21266c] mb-4">Requesting Certified Copies</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-[#3b82f6]">1</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">Identify the Document</p>
                        <p className="text-sm text-gray-600">Know the book and page number or search criteria for the document you need certified.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-[#3b82f6]">2</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">Visit or Contact Clerk</p>
                        <p className="text-sm text-gray-600">Request certified copies in person, by mail, or in some cases online through county systems.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-[#3b82f6]">3</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">Pay Required Fees</p>
                        <p className="text-sm text-gray-600">Certification fees typically range from $10-$15 per document, plus copying costs.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-[#3b82f6]">4</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">Receive Certified Copy</p>
                        <p className="text-sm text-gray-600">Document will bear the official county clerk seal and signature certifying it as a true copy.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#21266c] mb-4">When You Need Certified Copies</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <FileText className="w-5 h-5 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700"><span className="font-semibold">Real estate closings:</span> Title companies and attorneys require certified deed copies.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileText className="w-5 h-5 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700"><span className="font-semibold">Mortgage refinancing:</span> Lenders need certified copies of current deed and previous mortgages.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileText className="w-5 h-5 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700"><span className="font-semibold">Court proceedings:</span> Legal cases involving property require official certified documents.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileText className="w-5 h-5 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700"><span className="font-semibold">Estate settlement:</span> Probate proceedings need certified copies of deeds and ownership documents.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileText className="w-5 h-5 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700"><span className="font-semibold">Property disputes:</span> Boundary and title disputes require official certified records.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <FileText className="w-5 h-5 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700"><span className="font-semibold">Government applications:</span> USDA loans and some permits require certified property documentation.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-r-lg">
                <div className="flex gap-3">
                  <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-1">Important Distinction</p>
                    <p className="text-sm text-gray-700">Documents printed from online land record systems are <span className="font-semibold">not certified copies</span> and cannot be used for official legal purposes. Only documents bearing the original seal and signature of the county clerk are considered certified.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-2xl p-8 sm:p-12 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "Coconat" }}>
                Need Help with Property Research?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Our experienced team at Four Corner Properties can help you navigate land records, understand property history, and make informed real estate decisions in Vermont.
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
                  MORE RESOURCES
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
