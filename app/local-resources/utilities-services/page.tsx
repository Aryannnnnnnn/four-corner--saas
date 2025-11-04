"use client";

import { ArrowLeft, ArrowRight, Zap, Flame, Droplet, Wifi, Trash2, Phone, MapPin, Globe, School, Trees, Bus, Building2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function UtilitiesServices() {
  const electricProviders = [
    {
      name: "Green Mountain Power (GMP)",
      icon: Zap,
      description: "Vermont's largest electric utility serving most of Franklin County. Known for renewable energy initiatives and customer incentives.",
      service: "Electric Service",
      coverage: "St. Albans, Georgia, Swanton, and most Franklin County towns",
      phone: "(888) 835-4672",
      website: "greenmountainpower.com",
      features: ["Renewable Energy Options", "Budget Billing", "Outage Alerts", "Energy Efficiency Programs", "EV Charging Incentives"]
    },
    {
      name: "Vermont Electric Cooperative (VEC)",
      icon: Zap,
      description: "Member-owned cooperative serving rural areas of Franklin County with reliable electric service.",
      service: "Electric Service",
      coverage: "Northern and eastern Franklin County",
      phone: "(800) 832-2667",
      website: "vermontelectric.coop",
      features: ["Member Ownership", "Local Control", "Energy Efficiency Rebates", "Net Metering"]
    }
  ];

  const gasProvider = {
    name: "Vermont Gas Systems",
    icon: Flame,
    description: "Natural gas provider serving Franklin County communities along major corridors.",
    coverage: "St. Albans, Georgia, and Route 7 corridor",
    phone: "(800) 639-8081",
    website: "vermontgas.com",
    services: ["Natural Gas", "Budget Plans", "Energy Audits", "Safety Inspections"],
    note: "Not all areas have natural gas service. Many homes use propane or heating oil."
  };

  const heatingOilProviders = [
    { name: "Dead River Company", phone: "(802) 527-2181", service: "Heating Oil & Propane" },
    { name: "Champlain Oil", phone: "(802) 658-5000", service: "Heating Oil & Propane" },
    { name: "Bourne's Energy", phone: "(802) 524-2361", service: "Heating Oil & Propane" },
    { name: "Family Oil", phone: "(802) 524-6677", service: "Heating Oil" }
  ];

  const waterSewer = [
    {
      town: "St. Albans City",
      water: "Municipal Water System",
      sewer: "Municipal Sewer System",
      contact: "St. Albans City Public Works",
      phone: "(802) 524-1871",
      note: "City provides full water and sewer services"
    },
    {
      town: "St. Albans Town",
      water: "St. Albans Town Water Department / Private Wells",
      sewer: "Municipal Sewer (some areas) / Septic Systems",
      contact: "St. Albans Town Office",
      phone: "(802) 524-2415",
      note: "Mixed municipal and private systems"
    },
    {
      town: "Swanton Village",
      water: "Swanton Village Water Department",
      sewer: "Municipal Sewer",
      contact: "Swanton Village Office",
      phone: "(802) 868-3641",
      note: "Village provides water and sewer"
    },
    {
      town: "Georgia",
      water: "Private Wells (most common)",
      sewer: "Private Septic Systems",
      contact: "Georgia Town Office",
      phone: "(802) 524-3524",
      note: "Rural town with primarily private systems"
    },
    {
      town: "Fairfax",
      water: "Private Wells",
      sewer: "Private Septic Systems",
      contact: "Fairfax Town Office",
      phone: "(802) 849-6111",
      note: "Rural area with private well and septic"
    }
  ];

  const internetProviders = [
    {
      name: "Comcast Xfinity",
      icon: Wifi,
      description: "Cable internet and TV service available in most populated areas of Franklin County.",
      speeds: "Up to 1,200 Mbps",
      coverage: "St. Albans, Swanton, Georgia (urban areas)",
      phone: "(800) 934-6489",
      website: "xfinity.com",
      services: ["High-Speed Internet", "Cable TV", "Phone", "Mobile"]
    },
    {
      name: "Consolidated Communications",
      icon: Wifi,
      description: "DSL and fiber internet provider serving Vermont communities.",
      speeds: "Up to 1,000 Mbps (fiber), 25-100 Mbps (DSL)",
      coverage: "Various Franklin County locations",
      phone: "(844) 968-7224",
      website: "consolidated.com",
      services: ["Internet", "Phone", "Fiber (select areas)"]
    },
    {
      name: "Starlink",
      icon: Wifi,
      description: "Satellite internet ideal for rural areas without cable or fiber access.",
      speeds: "50-200 Mbps",
      coverage: "All of Franklin County (satellite)",
      phone: "Order online",
      website: "starlink.com",
      services: ["Satellite Internet", "Mobile Internet", "No long-term contracts"]
    },
    {
      name: "HughesNet",
      icon: Wifi,
      description: "Satellite internet option for rural properties.",
      speeds: "25 Mbps",
      coverage: "All of Franklin County",
      phone: "(866) 347-3292",
      website: "hughesnet.com",
      services: ["Satellite Internet", "Available anywhere"]
    }
  ];

  const wasteManagement = [
    {
      name: "Casella Waste Systems",
      description: "Primary waste and recycling collection service for Franklin County.",
      phone: "(802) 524-5986",
      website: "casella.com",
      services: ["Curbside Trash Pickup", "Recycling Collection", "Yard Waste", "Bulk Item Pickup"]
    },
    {
      name: "Myers Disposal",
      description: "Local waste removal service serving Franklin County.",
      phone: "(802) 527-7136",
      services: ["Residential Pickup", "Commercial Service", "Roll-off Containers"]
    }
  ];

  const transferStations = [
    { name: "St. Albans Town Transfer Station", address: "617 Lake Road, St. Albans", phone: "(802) 524-2415" },
    { name: "Swanton Transfer Station", address: "372 Airport Road, Swanton", phone: "(802) 868-4421" },
    { name: "Georgia Transfer Station", address: "Route 7, Georgia", phone: "(802) 524-3524" }
  ];

  const emergencyServices = [
    {
      name: "Northwestern Medical Center",
      type: "Hospital / Emergency Room",
      address: "133 Fairfield Street, St. Albans, VT 05478",
      phone: "Emergency: 911 / Main: (802) 524-5911",
      services: ["24/7 Emergency Care", "Trauma Services", "Pediatric Care"]
    },
    {
      name: "St. Albans Fire Department",
      type: "Fire & Rescue",
      phone: "Emergency: 911 / Non-Emergency: (802) 524-2444",
      coverage: "St. Albans City and surrounding areas"
    },
    {
      name: "St. Albans Police Department",
      type: "Law Enforcement",
      address: "City Hall, 100 North Main Street, St. Albans",
      phone: "Emergency: 911 / Non-Emergency: (802) 524-2166"
    },
    {
      name: "Vermont State Police - St. Albans Barracks",
      type: "State Law Enforcement",
      address: "140 Fisher Pond Road, St. Albans",
      phone: "Emergency: 911 / Non-Emergency: (802) 524-5993"
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
                  Essential Services
                </span>
              </div>

              <h1
                className="mt-6 text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "Coconat" }}
              >
                Utilities & Services
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                Complete guide to essential utilities and services in Franklin County. Connect your home with reliable electricity, internet, water, and more.
              </p>
            </div>
          </div>
        </section>

        {/* Electric Service Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Electric Service
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Franklin County is served by reliable electric utilities committed to clean energy and customer service.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {electricProviders.map((provider, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 hover:border-[#3b82f6] transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <provider.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#21266c] mb-2">{provider.name}</h3>
                      <p className="text-sm text-gray-500 font-medium">{provider.service}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{provider.description}</p>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm"><span className="font-semibold text-[#21266c]">Coverage:</span> {provider.coverage}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-[#3b82f6]" />
                      <span>{provider.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="w-4 h-4 text-[#3b82f6]" />
                      <span>{provider.website}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#21266c] mb-2">Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {provider.features.map((feature, i) => (
                        <span key={i} className="text-xs px-3 py-1 bg-blue-50 text-[#3b82f6] rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Natural Gas & Heating Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8" style={{ fontFamily: "Coconat" }}>
              Natural Gas & Heating Fuel
            </h2>

            {/* Natural Gas */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#21266c] mb-2">{gasProvider.name}</h3>
                  <p className="text-sm text-gray-500 font-medium">Natural Gas Service</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">{gasProvider.description}</p>
              <div className="space-y-2 mb-4">
                <p className="text-sm"><span className="font-semibold text-[#21266c]">Coverage:</span> {gasProvider.coverage}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-[#3b82f6]" />
                  <span>{gasProvider.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Globe className="w-4 h-4 text-[#3b82f6]" />
                  <span>{gasProvider.website}</span>
                </div>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <p className="text-sm text-gray-700"><span className="font-semibold">Note:</span> {gasProvider.note}</p>
              </div>
            </div>

            {/* Heating Oil & Propane */}
            <div>
              <h3 className="text-2xl font-bold text-[#21266c] mb-6">Heating Oil & Propane Providers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {heatingOilProviders.map((provider, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-5 hover:border-[#3b82f6] transition-all">
                    <h4 className="font-bold text-[#21266c] mb-2">{provider.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{provider.service}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-[#3b82f6]" />
                      <span>{provider.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Water & Sewer Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Water & Sewer Services
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Water and sewer services vary by municipality in Franklin County. Some areas have municipal systems while rural properties typically use private wells and septic.
              </p>
            </div>

            <div className="space-y-4">
              {waterSewer.map((area, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <Droplet className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-[#21266c] mb-4">{area.town}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-semibold text-[#21266c] mb-1">Water:</p>
                          <p className="text-gray-600 text-sm">{area.water}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#21266c] mb-1">Sewer:</p>
                          <p className="text-gray-600 text-sm">{area.sewer}</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-3">
                        <p className="text-sm text-gray-600"><span className="font-semibold">Contact:</span> {area.contact}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-[#3b82f6]" />
                          <span>{area.phone}</span>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-700">{area.note}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Vermont Tip */}
            <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-xs font-bold">
                    i
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#21266c] mb-1">Vermont Well & Septic Systems</p>
                  <p className="text-sm text-gray-700">If purchasing a property with a private well, get the water tested for quality and contaminants. Septic systems should be inspected during the home buying process. Vermont requires proper permits for new septic installations.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internet & Cable Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Internet & Cable Providers
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Internet availability varies in Franklin County. Urban areas have cable and fiber options, while rural properties may rely on satellite or fixed wireless.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {internetProviders.map((provider, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Wifi className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#21266c] mb-2">{provider.name}</h3>
                      <p className="text-sm text-[#3b82f6] font-medium">{provider.speeds}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{provider.description}</p>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm"><span className="font-semibold text-[#21266c]">Coverage:</span> {provider.coverage}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-[#3b82f6]" />
                      <span>{provider.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="w-4 h-4 text-[#3b82f6]" />
                      <span>{provider.website}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#21266c] mb-2">Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {provider.services.map((service, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded">
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

        {/* Waste Management Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8" style={{ fontFamily: "Coconat" }}>
              Waste Management & Recycling
            </h2>

            {/* Collection Services */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#21266c] mb-6">Collection Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wasteManagement.map((provider, index) => (
                  <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-all">
                    <Trash2 className="w-10 h-10 text-[#3b82f6] mb-4" />
                    <h4 className="text-xl font-bold text-[#21266c] mb-3">{provider.name}</h4>
                    <p className="text-gray-600 mb-4 text-sm">{provider.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-[#3b82f6]" />
                        <span>{provider.phone}</span>
                      </div>
                      {provider.website && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Globe className="w-4 h-4 text-[#3b82f6]" />
                          <span>{provider.website}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#21266c] mb-2">Services:</p>
                      <div className="space-y-1">
                        {provider.services.map((service, i) => (
                          <div key={i} className="flex items-center text-xs text-gray-600">
                            <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mr-2"></div>
                            {service}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transfer Stations */}
            <div>
              <h3 className="text-2xl font-bold text-[#21266c] mb-6">Municipal Transfer Stations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {transferStations.map((station, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                    <h4 className="font-bold text-[#21266c] mb-3">{station.name}</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                        <span>{station.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#3b82f6]" />
                        <span>{station.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Emergency Services
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Franklin County has comprehensive emergency services including hospitals, fire departments, and law enforcement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {emergencyServices.map((service, index) => (
                <div key={index} className="bg-white border-2 border-red-200 rounded-xl p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#21266c] mb-1">{service.name}</h3>
                      <p className="text-sm text-gray-500 font-medium">{service.type}</p>
                    </div>
                  </div>
                  {service.address && (
                    <div className="flex items-start gap-2 mb-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                      <span>{service.address}</span>
                    </div>
                  )}
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-red-600">{service.phone}</p>
                  </div>
                  {service.coverage && (
                    <p className="text-sm text-gray-600">Coverage: {service.coverage}</p>
                  )}
                  {service.services && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {service.services.map((s, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-red-50 text-red-700 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Emergency Number Highlight */}
            <div className="mt-8 bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-red-600" />
                <div>
                  <p className="text-lg font-bold text-red-600">Emergency: Dial 911</p>
                  <p className="text-sm text-gray-700">For fire, medical emergencies, or police assistance</p>
                </div>
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
                  <p className="text-gray-600 text-sm mb-4">School districts, colleges, and libraries.</p>
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

              <Link href="/local-resources/local-government">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all cursor-pointer h-full">
                  <Building2 className="w-10 h-10 text-[#3b82f6] mb-4" />
                  <h3 className="text-lg font-bold text-[#21266c] mb-2">Local Government</h3>
                  <p className="text-gray-600 text-sm mb-4">Town offices, permits, and civic services.</p>
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
                Ready to Set Up Your Vermont Home?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                We'll help you navigate the process of connecting utilities and services for your new Franklin County home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#21266c] font-medium text-base rounded-full hover:bg-gray-100 transition-all duration-300"
                >
                  CONTACT US
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/calculators"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-medium text-base rounded-full hover:bg-white hover:text-[#21266c] transition-all duration-300"
                >
                  USE CALCULATORS
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
