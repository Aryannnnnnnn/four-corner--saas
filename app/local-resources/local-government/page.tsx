"use client";

import { ArrowLeft, ArrowRight, Building2, FileText, Scale, DollarSign, Vote, Phone, MapPin, Globe, Mail, Clock, Plug, Trees, Bus, School } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function LocalGovernment() {
  const townOffices = [
    {
      name: "St. Albans City",
      address: "100 North Main Street, St. Albans, VT 05478",
      phone: "(802) 524-1500",
      fax: "(802) 527-1115",
      website: "stalbansvt.com",
      email: "info@stalbansvt.com",
      hours: "Monday - Friday: 8:00 AM - 4:30 PM",
      services: ["Building Permits", "Voter Registration", "Dog Licenses", "Property Tax Payments", "Vital Records", "Zoning Information"]
    },
    {
      name: "St. Albans Town",
      address: "105 Myer Road, St. Albans Bay, VT 05481",
      phone: "(802) 524-2415",
      fax: "(802) 524-3598",
      website: "stalbanstown.com",
      email: "townclerk@stalbanstown.com",
      hours: "Monday - Friday: 8:00 AM - 4:00 PM",
      services: ["Land Use Permits", "Tax Collection", "Voter Registration", "Town Records", "Cemetery Information", "Zoning Compliance"]
    },
    {
      name: "Swanton Town",
      address: "1 Academy Street, Swanton, VT 05488",
      phone: "(802) 868-4421",
      fax: "(802) 868-7565",
      website: "swantonvermont.org",
      email: "townclerk@swantonvermont.org",
      hours: "Monday - Friday: 8:00 AM - 4:30 PM",
      services: ["Building Permits", "Dog Licenses", "Property Tax Records", "Marriage Licenses", "Birth/Death Certificates", "Planning & Zoning"]
    },
    {
      name: "Georgia Town",
      address: "2297 US Route 7, St. Albans, VT 05478",
      phone: "(802) 524-3524",
      fax: "(802) 524-3543",
      website: "georgiavermont.com",
      email: "townclerk@georgiavermont.com",
      hours: "Monday - Thursday: 8:00 AM - 4:00 PM, Friday: 8:00 AM - 12:00 PM",
      services: ["Permits & Licenses", "Tax Information", "Voter Registration", "Land Records", "Recreation Programs", "Zoning Applications"]
    },
    {
      name: "Fairfield Town",
      address: "3871 Vermont Route 36, Fairfield, VT 05455",
      phone: "(802) 827-3261",
      fax: "(802) 827-6081",
      website: "fairfieldvt.us",
      email: "townclerk@fairfieldvt.us",
      hours: "Monday - Friday: 8:00 AM - 3:00 PM",
      services: ["Town Clerk Services", "Building Permits", "Tax Collection", "Vital Records", "Dog Licenses", "Voter Information"]
    },
    {
      name: "Sheldon Town",
      address: "326 Falls Road, Sheldon, VT 05483",
      phone: "(802) 933-2524",
      fax: "(802) 933-8720",
      website: "sheldonvt.org",
      email: "clerk@sheldonvt.org",
      hours: "Monday - Friday: 8:00 AM - 3:30 PM",
      services: ["Permits & Licenses", "Property Tax", "Zoning", "Town Records", "Dog Licensing", "Marriage Licenses"]
    }
  ];

  const permitsZoning = [
    {
      title: "Building Permits",
      icon: Building2,
      description: "Required for new construction, additions, renovations, and structural changes to buildings.",
      process: [
        "Submit application with detailed plans and specifications",
        "Pay permit fees (typically based on project value)",
        "Obtain zoning approval if required",
        "Schedule inspections at key construction phases",
        "Receive certificate of occupancy upon completion"
      ],
      tips: "Contact your town zoning office before starting any project. Permit requirements vary by municipality and project scope."
    },
    {
      title: "Zoning Regulations",
      icon: FileText,
      description: "Local zoning ordinances govern land use, building setbacks, lot coverage, and property development.",
      process: [
        "Review town zoning bylaws and maps",
        "Verify property zoning district and permitted uses",
        "Apply for conditional use or variance if needed",
        "Attend Development Review Board hearing if required",
        "Receive written decision and conditions"
      ],
      tips: "Each Franklin County town has unique zoning regulations. Check with your local planning office for specific requirements."
    },
    {
      title: "Subdivision Approvals",
      icon: Scale,
      description: "Dividing land into multiple lots requires subdivision approval from the local planning commission.",
      process: [
        "Submit preliminary plat and application",
        "Present plans to Planning Commission",
        "Complete environmental and engineering reviews",
        "Submit final plat with all required improvements",
        "Record approved subdivision with town clerk"
      ],
      tips: "Subdivision review can take 3-6 months. Engage a surveyor and civil engineer early in the process."
    }
  ];

  const propertyTaxInfo = [
    {
      title: "How Property Taxes Are Calculated",
      icon: DollarSign,
      content: "Vermont property taxes are based on your property's assessed value and local education and municipal tax rates. Franklin County uses the 'Listed Value' system, where properties are assessed at fair market value. Assessments are reviewed regularly, and reappraisals occur periodically.",
      details: [
        "Education tax rate (set by the state)",
        "Municipal tax rate (set by local government)",
        "Property assessed value (determined by town listers)",
        "Tax = (Assessed Value × Tax Rate) / 100"
      ]
    },
    {
      title: "Payment Schedules",
      icon: Clock,
      content: "Property taxes in Franklin County are typically due in quarterly installments. Payment deadlines vary by town but generally follow a similar schedule throughout the year.",
      details: [
        "1st Quarter: Due August 15",
        "2nd Quarter: Due November 15",
        "3rd Quarter: Due February 15",
        "4th Quarter: Due May 15",
        "Late payments subject to interest and penalties"
      ]
    },
    {
      title: "Homestead Exemptions",
      icon: Building2,
      content: "Vermont homestead properties may qualify for property tax adjustments based on household income. File annually with the Vermont Department of Taxes by the deadline.",
      details: [
        "Declare homestead with town by April 15",
        "File HS-122 form with state tax return",
        "Income-based tax credits available",
        "Current Use Program for agricultural/forest land",
        "Property tax credit for qualifying low-income households"
      ]
    },
    {
      title: "Appeals Process",
      icon: Scale,
      content: "If you disagree with your property assessment, you have the right to appeal. Franklin County towns have established procedures for challenging assessments.",
      details: [
        "Review assessment notice carefully",
        "Contact town listers to discuss valuation",
        "File written appeal within 14 days of notice",
        "Attend hearing before Board of Civil Authority",
        "Further appeal to Vermont Board of Tax Appeals if needed"
      ]
    }
  ];

  const voterInfo = [
    {
      title: "Voter Registration",
      description: "Vermont offers same-day voter registration. You can register at your town clerk's office or on Election Day at your polling place.",
      requirements: [
        "Be a U.S. citizen",
        "Be at least 18 years old by Election Day",
        "Be a Vermont resident",
        "Take the Voter's Oath",
        "Provide proof of identity and residency"
      ]
    },
    {
      title: "Town Meeting Day",
      description: "Vermont's iconic Town Meeting Day (first Tuesday in March) is when residents gather to vote on local budgets, elect officials, and debate community issues.",
      highlights: [
        "Direct democracy in action",
        "Vote on town budget and major expenditures",
        "Elect local officials and board members",
        "Discuss and decide community issues",
        "Participate in person at town meeting",
        "Some towns use Australian ballot voting"
      ]
    }
  ];

  const stateServices = [
    {
      name: "Vermont DMV - St. Albans",
      address: "90 Kingman Street, St. Albans, VT 05478",
      phone: "(802) 828-2000",
      website: "dmv.vermont.gov",
      services: ["Driver's Licenses & ID Cards", "Vehicle Registration & Titles", "License Plate Renewals", "Road Tests", "Learner's Permits"],
      hours: "Monday - Friday: 8:00 AM - 4:00 PM (closed Wednesday AM for training)"
    },
    {
      name: "VT Agency of Natural Resources",
      address: "111 West Street, Essex Junction, VT 05452",
      phone: "(802) 879-6565",
      website: "dec.vermont.gov",
      services: ["Environmental Permits", "Water Quality Certification", "Wetlands Protection", "Solid Waste Management", "Air Quality"],
      hours: "Monday - Friday: 7:45 AM - 4:30 PM"
    },
    {
      name: "VT Department of Health - St. Albans District",
      address: "27 Federal Street, St. Albans, VT 05478",
      phone: "(802) 524-7970",
      website: "healthvermont.gov",
      services: ["Vital Records", "Health Statistics", "Public Health Programs", "Environmental Health", "Immunizations"],
      hours: "Monday - Friday: 8:00 AM - 4:30 PM"
    },
    {
      name: "Franklin County Courthouse",
      address: "17 Church Street, St. Albans, VT 05478",
      phone: "(802) 524-7997",
      website: "vermontjudiciary.org",
      services: ["Civil Cases", "Criminal Cases", "Family Court", "Small Claims", "Probate Court", "Public Records"],
      hours: "Monday - Friday: 8:00 AM - 4:30 PM"
    },
    {
      name: "Vermont State Police - St. Albans Barracks",
      address: "140 Fisher Pond Road, St. Albans, VT 05478",
      phone: "(802) 524-5993",
      website: "vsp.vermont.gov",
      services: ["Emergency Response", "Criminal Investigations", "Traffic Safety", "Public Safety", "Crime Prevention"],
      hours: "24/7 Emergency Services"
    },
    {
      name: "VT Labor Department - Unemployment Office",
      address: "63 Pearl Street, Essex Junction, VT 05452",
      phone: "(802) 828-4344",
      website: "labor.vermont.gov",
      services: ["Unemployment Insurance", "Job Search Assistance", "Career Counseling", "Workforce Development", "Employer Resources"],
      hours: "Monday - Friday: 7:45 AM - 4:30 PM"
    }
  ];

  const emergencyContacts = [
    { service: "Emergency (Police, Fire, Medical)", number: "911" },
    { service: "Vermont State Police - St. Albans", number: "(802) 524-5993" },
    { service: "St. Albans Police Department", number: "(802) 524-2166" },
    { service: "St. Albans Fire Department", number: "(802) 524-2244" },
    { service: "Northwestern Medical Center", number: "(802) 524-5911" },
    { service: "Vermont 211 (Community Resources)", number: "211 or (802) 652-4636" }
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
                  Civic Resources
                </span>
              </div>

              <h1
                className="mt-6 text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "Coconat" }}
              >
                Local Government Services
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                Your comprehensive guide to Franklin County town offices, permits, property taxes, voter registration, and state government services in Vermont.
              </p>
            </div>
          </div>
        </section>

        {/* Franklin County Town Offices */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Franklin County Town Offices
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Contact your local town office for permits, licenses, tax information, voter registration, and other municipal services. Each town provides essential services to residents and property owners.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {townOffices.map((office, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 hover:border-[#3b82f6] transition-all">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#21266c] mb-2">{office.name}</h3>
                      <p className="text-sm text-gray-500">Town Office</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-[#3b82f6] flex-shrink-0" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-[#3b82f6] flex-shrink-0" />
                      <span>{office.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Globe className="w-4 h-4 text-[#3b82f6] flex-shrink-0" />
                      <span>{office.website}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                      <span>{office.hours}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#21266c] mb-3">Available Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {office.services.map((service, i) => (
                        <span key={i} className="text-xs px-3 py-1.5 bg-blue-50 text-[#3b82f6] rounded-full font-medium">
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

        {/* Permits & Zoning Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Permits & Zoning Information
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Understanding local permit and zoning requirements is essential for property development, construction projects, and land use in Franklin County.
              </p>
            </div>

            <div className="space-y-8">
              {permitsZoning.map((item, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#21266c] mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-[#21266c] mb-3">Typical Process:</p>
                    <div className="space-y-2">
                      {item.process.map((step, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-[#3b82f6]">{i + 1}</span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-4 rounded-r-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-[#21266c]">Helpful Tip:</span> {item.tips}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Property Tax Information */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Property Tax Information
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Vermont's property tax system funds local schools and municipal services. Understanding how taxes are calculated and your payment options helps you plan your household budget.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {propertyTaxInfo.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-200 rounded-xl p-6 sm:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#21266c]">{item.title}</h3>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">{item.content}</p>

                  <div className="space-y-2">
                    {item.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700 leading-relaxed">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Vermont Tip Box */}
            <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-xs font-bold">
                    i
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#21266c] mb-1">Property Tax Assistance</p>
                  <p className="text-sm text-gray-700">Vermont offers property tax credits and adjustments for qualifying homeowners based on household income. Contact your town clerk or visit <span className="font-medium">tax.vermont.gov</span> for more information about available programs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Voter Registration & Town Meeting */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Voter Registration & Town Meetings
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Vermont's democratic traditions run deep. From same-day voter registration to the iconic Town Meeting Day, residents have direct access to civic participation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {voterInfo.map((item, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 hover:border-[#3b82f6] transition-all">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                      <Vote className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#21266c] mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {(item.requirements || item.highlights)?.map((point, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#3b82f6] mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700 leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Town Meeting Highlight */}
            <div className="mt-8 bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "Coconat" }}>Experience Vermont Democracy</h3>
              <p className="text-blue-100 leading-relaxed mb-4">
                Town Meeting Day is a Vermont tradition dating back to the 1600s. It's one of the purest forms of direct democracy in America, where residents gather to discuss and vote on local matters that directly affect their community.
              </p>
              <p className="text-sm text-blue-200">
                Mark your calendar for the first Tuesday in March to participate in this uniquely Vermont experience!
              </p>
            </div>
          </div>
        </section>

        {/* State Government Services */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                State Government Services
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Vermont state agencies provide essential services throughout Franklin County. Here are the local offices and resources you'll need most frequently.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {stateServices.map((service, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 hover:border-[#3b82f6] transition-all">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#21266c] mb-2">{service.name}</h3>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{service.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{service.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Globe className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{service.website}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{service.hours}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#21266c] mb-3">Services Provided:</p>
                    <div className="flex flex-wrap gap-2">
                      {service.services.map((item, i) => (
                        <span key={i} className="text-xs px-3 py-1.5 bg-green-50 text-green-700 rounded-full font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Important Contacts
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Keep these emergency and important community contacts handy.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm font-medium text-gray-700">{contact.service}</span>
                    <span className="text-sm font-bold text-[#21266c]">{contact.number}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Explore More Resources
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Learn more about living in Franklin County, Vermont.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Link href="/local-resources/schools-education">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all cursor-pointer h-full">
                  <School className="w-10 h-10 text-[#3b82f6] mb-4" />
                  <h3 className="text-lg font-bold text-[#21266c] mb-2">Schools & Education</h3>
                  <p className="text-gray-600 text-sm mb-4">Public schools, colleges, and libraries.</p>
                  <div className="flex items-center text-[#3b82f6] font-semibold text-sm">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>

              <Link href="/local-resources/utilities-services">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all cursor-pointer h-full">
                  <Plug className="w-10 h-10 text-[#3b82f6] mb-4" />
                  <h3 className="text-lg font-bold text-[#21266c] mb-2">Utilities & Services</h3>
                  <p className="text-gray-600 text-sm mb-4">Electric, internet, water, and essential services.</p>
                  <div className="flex items-center text-[#3b82f6] font-semibold text-sm">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>

              <Link href="/local-resources/community-amenities">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all cursor-pointer h-full">
                  <Trees className="w-10 h-10 text-[#3b82f6] mb-4" />
                  <h3 className="text-lg font-bold text-[#21266c] mb-2">Community & Amenities</h3>
                  <p className="text-gray-600 text-sm mb-4">Parks, healthcare, shopping, and recreation.</p>
                  <div className="flex items-center text-[#3b82f6] font-semibold text-sm">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>

              <Link href="/local-resources/transportation">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all cursor-pointer h-full">
                  <Bus className="w-10 h-10 text-[#3b82f6] mb-4" />
                  <h3 className="text-lg font-bold text-[#21266c] mb-2">Transportation</h3>
                  <p className="text-gray-600 text-sm mb-4">Roads, transit, and commute information.</p>
                  <div className="flex items-center text-[#3b82f6] font-semibold text-sm">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-2xl p-8 sm:p-12 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "Coconat" }}>
                Ready to Make Franklin County Your Home?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Let Four Corner Properties help you navigate the local real estate market and find the perfect property in Vermont.
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
                  href="/calculators"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-medium text-base rounded-full hover:bg-white hover:text-[#21266c] transition-all duration-300"
                >
                  USE OUR CALCULATORS
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
