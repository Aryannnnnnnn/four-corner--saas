"use client";

import { ArrowLeft, ArrowRight, Car, Bus, Plane, Train, Bike, MapPin, Phone, Globe, Clock, Navigation, School, Plug, Trees, Building2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function Transportation() {
  const majorRoads = [
    {
      name: "Interstate 89 (I-89)",
      type: "Interstate Highway",
      description: "Major north-south interstate connecting Burlington to Montpelier and beyond. Primary route for commuters traveling to Burlington (25 miles south).",
      access: "Exits in St. Albans and Georgia",
      connections: "Connects to I-91, Route 7, Route 2",
      notes: "Well-maintained year-round, regular winter plowing"
    },
    {
      name: "US Route 7",
      type: "US Highway",
      description: "Historic north-south corridor running through the heart of Franklin County. Main street for St. Albans and Swanton with commercial development.",
      access: "Runs through St. Albans, Georgia, Swanton",
      connections: "Connects to I-89, Route 78, Route 105",
      notes: "Mix of highway and local traffic, retail corridor"
    },
    {
      name: "Vermont Route 78",
      type: "State Highway",
      description: "East-west route connecting Swanton to the Canadian border. Important international crossing at Highgate Springs.",
      access: "Swanton to Canadian border",
      connections: "Route 7, Canadian Highway 133",
      notes: "Border crossing station at Highgate Springs"
    },
    {
      name: "Vermont Route 105",
      type: "State Highway",
      description: "Northern route through St. Albans and eastern Franklin County, providing access to rural communities.",
      access: "Runs through northern Franklin County",
      connections: "Route 7, Route 78",
      notes: "Scenic rural highway"
    }
  ];

  const publicTransit = [
    {
      name: "Green Mountain Transit (GMT)",
      type: "Public Bus Service",
      description: "Regional transit system serving Franklin County and the greater Burlington area with fixed routes and demand-response service.",
      routes: [
        "Swanton/St. Albans LINK - Local service within St. Albans and Swanton",
        "St. Albans to Burlington Commuter - Weekday service connecting to Burlington",
        "Dial-A-Ride - Curb-to-curb service for eligible riders"
      ],
      phone: "(802) 540-2450",
      website: "ridegmt.com",
      fare: "Affordable fares, passes available",
      features: ["Bike Racks", "ADA Accessible", "Online Trip Planning", "Mobile App"]
    }
  ];

  const airports = [
    {
      name: "Burlington International Airport (BTV)",
      distance: "25 miles from St. Albans",
      driveTime: "30-35 minutes",
      description: "Vermont's largest commercial airport offering direct flights to major US cities and connecting service worldwide.",
      airlines: ["United", "American", "Delta", "JetBlue", "Frontier", "Allegiant"],
      destinations: "Direct flights to NYC, Boston, Chicago, Philadelphia, Washington DC, Orlando, Fort Lauderdale, and more",
      address: "1200 Airport Drive, South Burlington, VT 05403",
      phone: "(802) 863-2874",
      website: "btv.aero",
      parking: "Short-term and long-term parking available",
      rental: "All major car rental companies on-site"
    },
    {
      name: "Plattsburgh International Airport (PBG)",
      distance: "35 miles from St. Albans",
      driveTime: "40 minutes",
      description: "Alternative airport across Lake Champlain in New York, often offering competitive fares.",
      airlines: ["Allegiant", "Sun Country (seasonal)"],
      destinations: "Florida, Southern destinations",
      address: "42 Airport Lane, Plattsburgh, NY",
      website: "flyplattsburgh.com",
      note: "Often has lower fares for warm-weather destinations"
    },
    {
      name: "Montreal-Trudeau International Airport (YUL)",
      distance: "70 miles from St. Albans",
      driveTime: "1 hour 15 minutes (via border crossing)",
      description: "Major international airport with extensive domestic and international service. Requires passport for border crossing.",
      destinations: "Extensive international and domestic Canadian service",
      note: "Passport required, factor in border crossing time"
    }
  ];

  const railService = {
    name: "Amtrak Vermonter",
    description: "Passenger rail service connecting Vermont to New York City and Washington, DC.",
    nearestStations: [
      {
        name: "Essex Junction Station",
        distance: "20 miles from St. Albans",
        address: "29 Railroad Avenue, Essex Junction, VT",
        service: "Vermonter Line",
        destinations: "NYC, Washington DC, Springfield MA, Hartford CT, New Haven CT"
      },
      {
        name: "St. Albans Station",
        distance: "In downtown St. Albans",
        address: "28 Federal Street, St. Albans, VT",
        service: "Limited service",
        note: "Historical station, check current service availability"
      }
    ],
    website: "amtrak.com",
    phone: "1-800-USA-RAIL"
  };

  const ferries = [
    {
      name: "Lake Champlain Ferries - Grand Isle to Plattsburgh",
      route: "Grand Isle, VT to Plattsburgh, NY",
      distance: "15 miles from St. Albans to Grand Isle ferry",
      crossing: "12 minutes",
      season: "Year-round",
      description: "Convenient crossing to New York side of Lake Champlain. Great for shopping trips to Plattsburgh or accessing I-87.",
      website: "ferries.com",
      vehicles: "Cars, trucks, motorcycles, bicycles, pedestrians"
    },
    {
      name: "Lake Champlain Ferries - Burlington to Port Kent",
      route: "Burlington, VT to Port Kent, NY",
      distance: "25 miles from St. Albans",
      crossing: "60 minutes",
      season: "Year-round",
      description: "Scenic crossing of Lake Champlain's main lake. Access to Adirondacks and I-87.",
      website: "ferries.com"
    }
  ];

  const bikeTrails = [
    {
      name: "Missisquoi Valley Rail Trail",
      length: "26.5 miles",
      surface: "Crushed stone, paved sections",
      route: "Richford to St. Albans",
      description: "Multi-use trail following former railroad corridor through Franklin County. Perfect for biking, walking, and cross-country skiing.",
      difficulty: "Easy - mostly flat",
      access: "Multiple access points throughout Franklin County",
      winter: "Popular for cross-country skiing and snowshoeing"
    },
    {
      name: "Island Line Rail Trail",
      length: "14 miles (nearby)",
      route: "Burlington waterfront area",
      distance: "25 miles from St. Albans",
      description: "Stunning lakeside trail along Lake Champlain. Connects to ferry crossing to South Hero.",
      note: "Worth the drive for a scenic ride"
    }
  ];

  const commuteInfo = [
    {
      destination: "Burlington, VT",
      distance: "25 miles",
      time: "30-35 minutes",
      route: "I-89 South",
      notes: "Main commute destination for Franklin County residents. Morning and evening traffic can add 5-10 minutes."
    },
    {
      destination: "Montreal, QC",
      distance: "70 miles",
      time: "1 hour 15 minutes - 1 hour 30 minutes",
      route: "I-89 North to Canadian border",
      notes: "Popular for shopping and entertainment. Passport required. Factor in border crossing time (15-45 minutes depending on wait)."
    },
    {
      destination: "Plattsburgh, NY",
      distance: "35 miles",
      time: "40-45 minutes",
      route: "Route 7 North to ferry, or around lake",
      notes: "Shopping destination. Ferry crossing available (Grand Isle to Plattsburgh)."
    },
    {
      destination: "Montpelier, VT (State Capital)",
      distance: "60 miles",
      time: "1 hour",
      route: "I-89 South",
      notes: "Vermont's capital city. Straight shot on I-89."
    }
  ];

  const winterDriving = [
    {
      resource: "Vermont 511 Travel Information",
      description: "Real-time road conditions, weather alerts, and traffic information.",
      phone: "511 (from Vermont) or 1-800-ICY-ROAD",
      website: "511vt.com",
      features: ["Road Conditions", "Weather Alerts", "Traffic Cameras", "Construction Updates"]
    },
    {
      resource: "Vermont Department of Motor Vehicles",
      location: "St. Albans DMV",
      address: "11 South Main Street, St. Albans, VT",
      phone: "(802) 828-2000",
      services: ["Driver's Licenses", "Vehicle Registration", "Titles", "Road Tests"],
      website: "dmv.vermont.gov"
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
                  Getting Around
                </span>
              </div>

              <h1
                className="mt-6 text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "Coconat" }}
              >
                Transportation
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                Navigate Franklin County and beyond. Complete guide to roads, public transit, airports, rail service, and commute times throughout Vermont and neighboring regions.
              </p>
            </div>
          </div>
        </section>

        {/* Major Roads Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Major Roads & Highways
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Franklin County is well-connected by interstate highways and state routes, providing easy access to Burlington, Montreal, and beyond.
              </p>
            </div>

            <div className="space-y-6">
              {majorRoads.map((road, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 hover:border-[#3b82f6] transition-all">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                        <Car className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="mb-3">
                        <h3 className="text-2xl font-bold text-[#21266c] mb-1">{road.name}</h3>
                        <p className="text-sm text-gray-500 font-medium">{road.type}</p>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">{road.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-semibold text-[#21266c] mb-1">Access Points:</p>
                          <p className="text-sm text-gray-600">{road.access}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#21266c] mb-1">Connections:</p>
                          <p className="text-sm text-gray-600">{road.connections}</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-700"><span className="font-semibold">Note:</span> {road.notes}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Public Transit Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Public Transportation
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Green Mountain Transit provides public bus service throughout Franklin County and connections to Burlington.
              </p>
            </div>

            {publicTransit.map((transit, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                      <Bus className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-[#21266c] mb-2">{transit.name}</h3>
                    <p className="text-sm text-gray-500 font-medium mb-4">{transit.type}</p>
                    <p className="text-gray-600 mb-6 leading-relaxed">{transit.description}</p>

                    <div className="mb-6">
                      <p className="text-sm font-semibold text-[#21266c] mb-3">Routes & Services:</p>
                      <ul className="space-y-2">
                        {transit.routes.map((route, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <Navigation className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                            <span>{route}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-[#3b82f6]" />
                        <span>{transit.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Globe className="w-4 h-4 text-[#3b82f6]" />
                        <span>{transit.website}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600"><span className="font-semibold text-[#21266c]">Fares:</span> {transit.fare}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#21266c] mb-2">Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {transit.features.map((feature, i) => (
                          <span key={i} className="text-xs px-3 py-1 bg-green-50 text-green-700 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Airports Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Airports & Air Travel
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Franklin County residents have convenient access to several airports, including Burlington International, just 25 miles away.
              </p>
            </div>

            <div className="space-y-6">
              {airports.map((airport, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 hover:border-[#3b82f6] transition-all">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <Plane className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-[#21266c] mb-3">{airport.name}</h3>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-[#3b82f6]" />
                          <span className="font-medium">{airport.distance}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4 text-[#3b82f6]" />
                          <span className="font-medium">{airport.driveTime}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">{airport.description}</p>

                      {airport.airlines && (
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-[#21266c] mb-2">Airlines:</p>
                          <div className="flex flex-wrap gap-2">
                            {airport.airlines.map((airline, i) => (
                              <span key={i} className="text-xs px-3 py-1 bg-blue-50 text-[#3b82f6] rounded-full">
                                {airline}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {airport.destinations && (
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-[#21266c] mb-1">Popular Destinations:</p>
                          <p className="text-sm text-gray-600">{airport.destinations}</p>
                        </div>
                      )}

                      {airport.address && (
                        <div className="space-y-2 mb-4">
                          <div className="flex items-start gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                            <span>{airport.address}</span>
                          </div>
                          {airport.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4 text-[#3b82f6]" />
                              <span>{airport.phone}</span>
                            </div>
                          )}
                          {airport.website && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Globe className="w-4 h-4 text-[#3b82f6]" />
                              <span>{airport.website}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {(airport.parking || airport.rental || airport.note) && (
                        <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                          {airport.parking && <p className="text-xs text-gray-700">• {airport.parking}</p>}
                          {airport.rental && <p className="text-xs text-gray-700">• {airport.rental}</p>}
                          {airport.note && <p className="text-xs text-gray-700 italic">• {airport.note}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rail Service Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Passenger Rail Service
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Amtrak's Vermonter line provides passenger rail service connecting Vermont to New York City and Washington, DC.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Train className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#21266c] mb-2">{railService.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{railService.description}</p>
                </div>
              </div>

              <div className="space-y-6 mb-6">
                {railService.nearestStations.map((station, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                    <h4 className="text-lg font-bold text-[#21266c] mb-3">{station.name}</h4>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-[#3b82f6]" />
                        <span>{station.distance}</span>
                      </div>
                      {station.address && (
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                          <span>{station.address}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm mb-2"><span className="font-semibold text-[#21266c]">Service:</span> {station.service}</p>
                    {station.destinations && (
                      <p className="text-sm text-gray-600">{station.destinations}</p>
                    )}
                    {station.note && (
                      <p className="text-xs text-gray-500 italic mt-2">{station.note}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Globe className="w-4 h-4 text-[#3b82f6]" />
                  <span>{railService.website}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-[#3b82f6]" />
                  <span>{railService.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lake Champlain Ferries Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Lake Champlain Ferries
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Year-round ferry service across Lake Champlain provides convenient access to New York and scenic travel options.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ferries.map((ferry, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-[#21266c] mb-3">{ferry.name}</h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm"><span className="font-semibold text-[#21266c]">Route:</span> {ferry.route}</p>
                    <p className="text-sm"><span className="font-semibold text-[#21266c]">From St. Albans:</span> {ferry.distance}</p>
                    <p className="text-sm"><span className="font-semibold text-[#21266c]">Crossing Time:</span> {ferry.crossing}</p>
                    <p className="text-sm"><span className="font-semibold text-[#21266c]">Season:</span> {ferry.season}</p>
                  </div>
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">{ferry.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span>{ferry.website}</span>
                  </div>
                  {ferry.vehicles && (
                    <p className="text-xs text-gray-600"><span className="font-semibold">Accepts:</span> {ferry.vehicles}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bike Trails Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Bike Trails & Pedestrian Paths
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Franklin County features excellent multi-use trails for biking, walking, and year-round recreation.
              </p>
            </div>

            <div className="space-y-6">
              {bikeTrails.map((trail, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 hover:border-[#3b82f6] transition-all">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                        <Bike className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-[#21266c] mb-3">{trail.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-semibold text-[#21266c] mb-1">Length:</p>
                          <p className="text-sm text-gray-600">{trail.length}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#21266c] mb-1">Surface:</p>
                          <p className="text-sm text-gray-600">{trail.surface}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#21266c] mb-1">Difficulty:</p>
                          <p className="text-sm text-gray-600">{trail.difficulty}</p>
                        </div>
                      </div>
                      <p className="text-sm mb-3"><span className="font-semibold text-[#21266c]">Route:</span> {trail.route}</p>
                      {trail.distance && (
                        <p className="text-sm mb-3"><span className="font-semibold text-[#21266c]">Distance from St. Albans:</span> {trail.distance}</p>
                      )}
                      <p className="text-gray-600 mb-4 leading-relaxed">{trail.description}</p>
                      {trail.access && (
                        <p className="text-sm text-gray-600 mb-3">{trail.access}</p>
                      )}
                      {(trail.winter || trail.note) && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-700">{trail.winter || trail.note}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commute Times Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Commute Times to Major Destinations
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Franklin County's central location provides reasonable commute times to Burlington, Montreal, and other regional destinations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {commuteInfo.map((commute, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-all">
                  <div className="flex items-start gap-3 mb-4">
                    <Navigation className="w-6 h-6 text-[#3b82f6] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-[#21266c] mb-2">{commute.destination}</h3>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600"><span className="font-semibold">Distance:</span> {commute.distance}</p>
                        <p className="text-sm text-gray-600"><span className="font-semibold">Drive Time:</span> {commute.time}</p>
                        <p className="text-sm text-gray-600"><span className="font-semibold">Route:</span> {commute.route}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-700">{commute.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Winter Driving & DMV Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8" style={{ fontFamily: "Coconat" }}>
              Winter Travel & DMV Services
            </h2>

            <div className="space-y-6">
              {winterDriving.map((resource, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-[#21266c] mb-3">{resource.resource}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <div className="space-y-2 mb-4">
                    {resource.location && <p className="text-sm text-gray-600"><span className="font-semibold">Location:</span> {resource.location}</p>}
                    {resource.address && (
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                        <span>{resource.address}</span>
                      </div>
                    )}
                    {resource.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-[#3b82f6]" />
                        <span>{resource.phone}</span>
                      </div>
                    )}
                    {resource.website && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Globe className="w-4 h-4 text-[#3b82f6]" />
                        <span>{resource.website}</span>
                      </div>
                    )}
                  </div>
                  {resource.services && (
                    <div>
                      <p className="text-sm font-semibold text-[#21266c] mb-2">Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {resource.services.map((service, i) => (
                          <span key={i} className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {resource.features && (
                    <div>
                      <p className="text-sm font-semibold text-[#21266c] mb-2">Features:</p>
                      <ul className="space-y-1">
                        {resource.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Winter Tip */}
            <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-xs font-bold">
                    i
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#21266c] mb-1">Vermont Winter Driving</p>
                  <p className="text-sm text-gray-700">Vermont winters require preparation. Snow tires or all-season tires with good tread are essential. Roads are well-maintained, but check Vermont 511 for real-time conditions before traveling. Keep an emergency kit in your vehicle during winter months.</p>
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
                Find Your Ideal Vermont Location
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Whether you're commuting to Burlington or exploring Vermont's beauty, we'll help you find the perfect home base in Franklin County.
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
