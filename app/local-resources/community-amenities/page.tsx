"use client";

import { ArrowLeft, ArrowRight, Trees, Heart, ShoppingBag, UtensilsCrossed, Dumbbell, Calendar, MapPin, Phone, Globe, School, Plug, Bus, Building2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

interface Restaurant {
  name: string;
  cuisine: string;
  location: string;
  note?: string;
}

export default function CommunityAmenities() {
  const parksRecreation = [
    {
      name: "Burton Island State Park",
      type: "State Park",
      location: "Lake Champlain (accessible by ferry from Kill Kare State Park)",
      description: "A 253-acre island paradise offering camping, swimming, boating, and hiking. A hidden gem for outdoor enthusiasts.",
      activities: ["Camping", "Swimming", "Hiking", "Boating", "Fishing"],
      season: "Memorial Day - Columbus Day"
    },
    {
      name: "Lake Carmi State Park",
      type: "State Park",
      location: "Franklin, VT",
      description: "Vermont's 4th largest lake offering excellent fishing, camping, and water recreation in a beautiful natural setting.",
      activities: ["Camping", "Fishing", "Swimming", "Boating", "Picnicking"],
      season: "Year-round (camping seasonal)"
    },
    {
      name: "Missisquoi Valley Rail Trail",
      type: "Multi-Use Trail",
      location: "Richford to St. Albans (26 miles)",
      description: "A scenic rail trail perfect for walking, biking, and cross-country skiing through Franklin County's countryside.",
      activities: ["Biking", "Walking", "Running", "Cross-Country Skiing"],
      season: "Year-round"
    },
    {
      name: "Hard'ack Recreation Area",
      type: "Recreation Area",
      location: "St. Albans",
      description: "Multi-use outdoor space with trails, playgrounds, sports fields, and winter activities.",
      activities: ["Hiking", "Mountain Biking", "Disc Golf", "Sledding", "Snowshoeing"],
      season: "Year-round"
    },
    {
      name: "Collins Perley Sports Complex",
      type: "Sports Complex",
      location: "St. Albans",
      description: "Premier sports facility with multiple fields for baseball, softball, soccer, and lacrosse.",
      activities: ["Baseball", "Softball", "Soccer", "Lacrosse"],
      season: "Spring - Fall"
    }
  ];

  const healthcare = [
    {
      name: "Northwestern Medical Center",
      type: "Hospital",
      address: "133 Fairfield Street, St. Albans, VT 05478",
      phone: "(802) 524-5911",
      website: "nmc-vt.org",
      services: ["Emergency Care", "Surgery", "Maternity", "Cardiology", "Orthopedics", "Pediatrics", "Imaging", "Lab Services"],
      description: "Full-service hospital serving Franklin County with 24/7 emergency care and comprehensive medical services."
    },
    {
      name: "Northwestern Medical Center Primary Care",
      type: "Primary Care",
      locations: "Multiple Franklin County locations",
      phone: "(802) 524-8970",
      services: ["Family Medicine", "Internal Medicine", "Pediatrics", "Women's Health"],
      description: "Primary care physicians throughout Franklin County providing comprehensive healthcare for all ages."
    },
    {
      name: "Northwestern Counseling & Support Services",
      type: "Mental Health",
      address: "107 Fisher Pond Road, St. Albans",
      phone: "(802) 524-6554",
      services: ["Mental Health Counseling", "Substance Abuse Treatment", "Crisis Services", "Youth Services"],
      description: "Community mental health and addiction services for Franklin County residents."
    },
    {
      name: "Northwestern Medical Center Dental",
      type: "Dental Care",
      address: "St. Albans",
      phone: "(802) 527-7531",
      services: ["General Dentistry", "Pediatric Dentistry", "Emergency Dental Care"],
      description: "Comprehensive dental services for the community."
    }
  ];

  const shopping = [
    {
      area: "Downtown St. Albans",
      description: "Historic downtown with local boutiques, specialty shops, and professional services.",
      highlights: ["Local Boutiques", "Antique Shops", "Gift Stores", "Professional Services", "Restaurants & Cafes"]
    },
    {
      area: "St. Albans Retail Corridor (Route 7)",
      description: "Main shopping area with grocery stores, national retailers, and service businesses.",
      highlights: ["Hannaford Supermarket", "Walmart", "Dollar General", "Hardware Stores", "Auto Services"]
    },
    {
      area: "Swanton Village",
      description: "Small-town shopping with local businesses and essential services.",
      highlights: ["Grocery Store", "Pharmacy", "Local Shops", "Banking"]
    },
    {
      area: "Burlington (25 miles)",
      description: "Major shopping destination with malls, big-box stores, and specialty retailers.",
      highlights: ["University Mall", "Church Street Marketplace", "Big-Box Retailers", "Specialty Boutiques"]
    }
  ];

  const dining: Array<{ category: string; restaurants: Restaurant[] }> = [
    {
      category: "Local Favorites",
      restaurants: [
        { name: "Jeff's Maine Seafood", cuisine: "Seafood", location: "St. Albans", note: "Fresh seafood, lobster rolls" },
        { name: "Mimmo's Pizzeria & Restaurant", cuisine: "Italian", location: "St. Albans", note: "Family-style Italian" },
        { name: "The Vault", cuisine: "American", location: "St. Albans", note: "Upscale dining downtown" },
        { name: "Piecasso Pizzeria & Lounge", cuisine: "Pizza/American", location: "Swanton", note: "Wood-fired pizza" }
      ]
    },
    {
      category: "Quick Bites & Cafes",
      restaurants: [
        { name: "Dunkin'", cuisine: "Coffee/Breakfast", location: "Multiple locations" },
        { name: "Subway", cuisine: "Sandwiches", location: "St. Albans, Swanton" },
        { name: "Local cafes", cuisine: "Coffee/Bakery", location: "Downtown St. Albans" }
      ]
    },
    {
      category: "Family Dining",
      restaurants: [
        { name: "Friendly's", cuisine: "American", location: "St. Albans" },
        { name: "Applebee's", cuisine: "American", location: "St. Albans" },
        { name: "McDonald's", cuisine: "Fast Food", location: "St. Albans, Swanton" }
      ]
    }
  ];

  const fitness = [
    {
      name: "Planet Fitness",
      type: "Gym",
      location: "St. Albans",
      description: "National gym chain offering cardio, strength training, and group fitness."
    },
    {
      name: "CrossFit facilities",
      type: "CrossFit",
      location: "Franklin County",
      description: "High-intensity functional fitness training in group settings."
    },
    {
      name: "Yoga studios",
      type: "Yoga/Wellness",
      location: "St. Albans area",
      description: "Yoga, meditation, and wellness classes for all levels."
    },
    {
      name: "Collins Perley Sports Complex",
      type: "Recreation",
      location: "St. Albans",
      description: "Public sports fields and facilities for community athletics."
    }
  ];

  const communityOrgs = [
    {
      name: "St. Albans Chamber of Commerce",
      description: "Supporting local businesses and economic development in Franklin County.",
      phone: "(802) 524-2444",
      website: "stalbanschamber.com"
    },
    {
      name: "Franklin County Field Days",
      description: "Annual agricultural fair celebrating Vermont farming and rural life. One of the largest fairs in Vermont.",
      event: "Held annually in August",
      website: "franklincountyfielddays.com"
    },
    {
      name: "Maple Festival",
      description: "Annual spring celebration of Vermont's maple syrup industry with tastings, entertainment, and family activities.",
      event: "Held annually in April",
      location: "St. Albans"
    },
    {
      name: "Taylor Park Concerts",
      description: "Free summer concert series in downtown St. Albans featuring local and regional musicians.",
      event: "Summer evenings",
      location: "Taylor Park, St. Albans"
    }
  ];

  const farmersMarkets = [
    {
      name: "St. Albans Farmers Market",
      location: "Taylor Park, St. Albans",
      season: "May - October",
      days: "Saturdays, 9am - 1pm",
      offerings: "Fresh produce, meats, cheeses, baked goods, crafts, prepared foods"
    },
    {
      name: "Swanton Farmers Market",
      location: "Village Green, Swanton",
      season: "Summer months",
      days: "Weekly",
      offerings: "Local produce, artisan goods, community gathering"
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
                  Community Life
                </span>
              </div>

              <h1
                className="mt-6 text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "Coconat" }}
              >
                Community & Amenities
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                Discover everything Franklin County has to offer. From outdoor recreation and healthcare to shopping, dining, and community events.
              </p>
            </div>
          </div>
        </section>

        {/* Parks & Recreation Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Parks & Recreation
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Franklin County offers abundant outdoor recreation opportunities, from state parks on Lake Champlain to scenic trails and sports facilities.
              </p>
            </div>

            <div className="space-y-6">
              {parksRecreation.map((park, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 hover:border-[#3b82f6] transition-all">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                        <Trees className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-[#21266c] mb-1">{park.name}</h3>
                          <p className="text-sm text-gray-500 font-medium">{park.type}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          {park.season}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 mb-4 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                        <span>{park.location}</span>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">{park.description}</p>
                      <div>
                        <p className="text-sm font-semibold text-[#21266c] mb-2">Activities:</p>
                        <div className="flex flex-wrap gap-2">
                          {park.activities.map((activity, i) => (
                            <span key={i} className="text-xs px-3 py-1 bg-blue-50 text-[#3b82f6] rounded-full">
                              {activity}
                            </span>
                          ))}
                        </div>
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
                  <p className="text-sm font-semibold text-[#21266c] mb-1">Vermont State Parks Pass</p>
                  <p className="text-sm text-gray-700">Consider purchasing an annual Vermont State Parks pass for unlimited access to Burton Island, Lake Carmi, and all other Vermont state parks. Great value for outdoor enthusiasts!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Healthcare Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Healthcare Services
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Franklin County is served by Northwestern Medical Center and a network of healthcare providers offering comprehensive medical services.
              </p>
            </div>

            <div className="space-y-6">
              {healthcare.map((provider, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 hover:border-[#3b82f6] transition-all">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-[#21266c] mb-1">{provider.name}</h3>
                      <p className="text-sm text-gray-500 font-medium mb-4">{provider.type}</p>
                      <p className="text-gray-600 mb-4 leading-relaxed">{provider.description}</p>
                      <div className="space-y-2 mb-4">
                        {provider.address && (
                          <div className="flex items-start gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                            <span>{provider.address}</span>
                          </div>
                        )}
                        {provider.locations && (
                          <div className="flex items-start gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                            <span>{provider.locations}</span>
                          </div>
                        )}
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
                        <p className="text-sm font-semibold text-[#21266c] mb-2">Services:</p>
                        <div className="flex flex-wrap gap-2">
                          {provider.services.map((service, i) => (
                            <span key={i} className="text-xs px-3 py-1 bg-red-50 text-red-700 rounded-full">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shopping Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Shopping & Retail
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                From historic downtown boutiques to modern retail centers, Franklin County offers diverse shopping experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {shopping.map((area, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-all">
                  <ShoppingBag className="w-10 h-10 text-[#3b82f6] mb-4" />
                  <h3 className="text-xl font-bold text-[#21266c] mb-3">{area.area}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{area.description}</p>
                  <div>
                    <p className="text-sm font-semibold text-[#21266c] mb-2">Highlights:</p>
                    <ul className="space-y-1">
                      {area.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full mr-2"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dining Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Dining & Restaurants
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Franklin County offers a variety of dining options, from local favorites to national chains and quick bites.
              </p>
            </div>

            <div className="space-y-8">
              {dining.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center gap-3 mb-4">
                    <UtensilsCrossed className="w-6 h-6 text-[#3b82f6]" />
                    <h3 className="text-2xl font-bold text-[#21266c]">{category.category}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.restaurants.map((restaurant, i) => (
                      <div key={i} className="bg-white border border-gray-200 rounded-lg p-5 hover:border-[#3b82f6] transition-all">
                        <h4 className="font-bold text-[#21266c] mb-2">{restaurant.name}</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p className="text-[#3b82f6] font-medium">{restaurant.cuisine}</p>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-xs">{restaurant.location}</span>
                          </div>
                          {restaurant.note && (
                            <p className="text-xs italic mt-2">{restaurant.note}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fitness & Wellness Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8" style={{ fontFamily: "Coconat" }}>
              Fitness & Wellness
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fitness.map((facility, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-all">
                  <Dumbbell className="w-10 h-10 text-[#3b82f6] mb-4" />
                  <h3 className="text-xl font-bold text-[#21266c] mb-2">{facility.name}</h3>
                  <p className="text-sm text-gray-500 font-medium mb-3">{facility.type} • {facility.location}</p>
                  <p className="text-gray-600 text-sm">{facility.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Events & Organizations */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Community Events & Organizations
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Franklin County has a vibrant community spirit with annual events, festivals, and active civic organizations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communityOrgs.map((org, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-all">
                  <Calendar className="w-10 h-10 text-[#3b82f6] mb-4" />
                  <h3 className="text-xl font-bold text-[#21266c] mb-3">{org.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{org.description}</p>
                  <div className="space-y-2">
                    {org.event && (
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-[#21266c]">When:</span> {org.event}
                      </p>
                    )}
                    {org.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-[#3b82f6]" />
                        <span>{org.location}</span>
                      </div>
                    )}
                    {org.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-[#3b82f6]" />
                        <span>{org.phone}</span>
                      </div>
                    )}
                    {org.website && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Globe className="w-4 h-4 text-[#3b82f6]" />
                        <span>{org.website}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Farmers Markets Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8" style={{ fontFamily: "Coconat" }}>
              Farmers Markets & Local Agriculture
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {farmersMarkets.map((market, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6">
                  <Trees className="w-10 h-10 text-green-600 mb-4" />
                  <h3 className="text-xl font-bold text-[#21266c] mb-3">{market.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{market.location}</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Season:</span> {market.season}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Hours:</span> {market.days}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#21266c] mb-1">Find:</p>
                    <p className="text-sm text-gray-700">{market.offerings}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Vermont Agriculture Info */}
            <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-xs font-bold">
                    i
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#21266c] mb-1">Vermont Farm-to-Table</p>
                  <p className="text-sm text-gray-700">Franklin County is rich in agricultural heritage. Many local farms offer direct sales of produce, meats, dairy, and maple products. Look for farm stands along country roads and support your local farmers!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 bg-gray-50">
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
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-2xl p-8 sm:p-12 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "Coconat" }}>
                Discover Your Perfect Vermont Community
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Let us help you find a home in a Franklin County community that matches your lifestyle and interests.
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
