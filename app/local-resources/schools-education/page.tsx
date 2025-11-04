"use client";

import { ArrowLeft, ArrowRight, School, GraduationCap, BookOpen, Award, MapPin, Phone, Globe, Plug, Trees, Bus, Building2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function SchoolsEducation() {
  const schoolDistricts = [
    {
      name: "Franklin Northwest Supervisory Union",
      towns: "St. Albans Town, Swanton, Fairfield, Sheldon",
      description: "Serves northwestern Franklin County with a focus on community engagement and academic excellence.",
      website: "fnwsu.org",
      phone: "(802) 527-6500"
    },
    {
      name: "Franklin Northeast Supervisory Union",
      towns: "St. Albans City, Georgia, Fairfax, Fletcher",
      description: "Committed to preparing students for success through innovative programs and dedicated educators.",
      website: "fnesu.org",
      phone: "(802) 527-1204"
    },
    {
      name: "Franklin West Supervisory Union",
      towns: "Enosburg, Richford, Berkshire, Montgomery",
      description: "Rural schools providing personalized education in close-knit communities.",
      website: "fwsu.org",
      phone: "(802) 933-2414"
    }
  ];

  const schools = [
    {
      category: "Elementary Schools",
      icon: School,
      schools: [
        { name: "Bellows Free Academy Primary School", location: "St. Albans", grades: "PreK-2" },
        { name: "St. Albans City School", location: "St. Albans City", grades: "K-8" },
        { name: "Georgia Elementary School", location: "Georgia", grades: "PreK-6" },
        { name: "Swanton Central School", location: "Swanton", grades: "PreK-6" },
        { name: "Fairfax Elementary School", location: "Fairfax", grades: "PreK-6" },
        { name: "Sheldon Elementary School", location: "Sheldon", grades: "PreK-6" }
      ]
    },
    {
      category: "Middle Schools",
      icon: School,
      schools: [
        { name: "Bellows Free Academy St. Albans", location: "St. Albans", grades: "3-8" },
        { name: "Missisquoi Valley Middle School", location: "Swanton", grades: "7-8" }
      ]
    },
    {
      category: "High Schools",
      icon: GraduationCap,
      schools: [
        { name: "Bellows Free Academy St. Albans", location: "St. Albans", grades: "9-12", note: "Largest high school in Franklin County" },
        { name: "Missisquoi Valley Union High School", location: "Swanton", grades: "9-12" },
        { name: "Enosburg Falls High School", location: "Enosburg Falls", grades: "9-12" }
      ]
    }
  ];

  const privateSchools = [
    {
      name: "Trinity Christian School",
      location: "St. Albans",
      grades: "K-12",
      description: "Faith-based education with small class sizes and individualized attention."
    },
    {
      name: "Montessori Schools",
      location: "Burlington area",
      grades: "PreK-Elementary",
      description: "Child-centered education approach available in nearby Burlington (30 minutes)."
    }
  ];

  const higherEducation = [
    {
      name: "Vermont Technical College",
      location: "Randolph Center, VT",
      distance: "60 miles from St. Albans",
      description: "Vermont's polytechnic college offering hands-on technical and professional programs.",
      programs: ["Engineering", "Agriculture", "Nursing", "Business"],
      website: "vtc.edu"
    },
    {
      name: "University of Vermont (UVM)",
      location: "Burlington, VT",
      distance: "25 miles from St. Albans",
      description: "Vermont's flagship public research university offering comprehensive undergraduate and graduate programs.",
      programs: ["Liberal Arts", "Sciences", "Engineering", "Medicine", "Business"],
      website: "uvm.edu"
    },
    {
      name: "Champlain College",
      location: "Burlington, VT",
      distance: "25 miles from St. Albans",
      description: "Private college known for career-focused programs in business, technology, and creative fields.",
      programs: ["Cybersecurity", "Game Design", "Business", "Digital Marketing"],
      website: "champlain.edu"
    },
    {
      name: "Saint Michael's College",
      location: "Colchester, VT",
      distance: "20 miles from St. Albans",
      description: "Catholic liberal arts college with strong community engagement and academic programs.",
      programs: ["Liberal Arts", "Sciences", "Education", "Business"],
      website: "smcvt.edu"
    },
    {
      name: "Community College of Vermont",
      location: "Multiple locations including St. Albans",
      distance: "Local campus available",
      description: "Affordable access to associate degrees, certificates, and transfer programs.",
      programs: ["Associate Degrees", "Professional Certificates", "Workforce Training"],
      website: "ccv.edu"
    }
  ];

  const libraries = [
    {
      name: "St. Albans Free Library",
      address: "11 Maiden Lane, St. Albans, VT 05478",
      phone: "(802) 524-1507",
      website: "saintalbansfreelibrary.org",
      features: ["Public Computers", "WiFi", "Children's Programs", "Meeting Rooms", "Book Clubs"]
    },
    {
      name: "Swanton Public Library",
      address: "88 Grand Avenue, Swanton, VT 05488",
      phone: "(802) 868-7656",
      website: "swantonpubliclibrary.org",
      features: ["Community Programs", "Children's Story Time", "WiFi", "Local History Resources"]
    },
    {
      name: "Georgia Public Library",
      address: "38 Mill Street, Georgia, VT 05468",
      phone: "(802) 524-3580",
      website: "georgiapubliclibrary.org",
      features: ["Family Programs", "Book Lending", "Community Events"]
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
                  Education Resources
                </span>
              </div>

              <h1
                className="mt-6 text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "Coconat" }}
              >
                Schools & Education
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                Comprehensive guide to educational opportunities in Franklin County, Vermont. From elementary schools to higher education and lifelong learning resources.
              </p>
            </div>
          </div>
        </section>

        {/* School Districts Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Franklin County School Districts
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Franklin County is served by three supervisory unions that oversee public education across the region. Each district is committed to academic excellence and student success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {schoolDistricts.map((district, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-all">
                  <School className="w-10 h-10 text-[#3b82f6] mb-4" />
                  <h3 className="text-xl font-bold text-[#21266c] mb-3">{district.name}</h3>
                  <p className="text-sm text-gray-500 mb-3 font-medium">{district.towns}</p>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{district.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="w-4 h-4 text-[#3b82f6]" />
                      <span>{district.website}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-[#3b82f6]" />
                      <span>{district.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Schools by Level */}
            <div className="space-y-12">
              {schools.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center gap-3 mb-6">
                    <category.icon className="w-8 h-8 text-[#3b82f6]" />
                    <h3 className="text-2xl font-bold text-[#21266c]">{category.category}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.schools.map((school, i) => (
                      <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:border-[#3b82f6] transition-all">
                        <h4 className="font-bold text-[#21266c] mb-2">{school.name}</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-[#3b82f6]" />
                            {school.location}
                          </p>
                          <p className="font-medium text-[#3b82f6]">Grades: {school.grades}</p>
                          {school.note && <p className="text-xs italic mt-2">{school.note}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Private Schools Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8" style={{ fontFamily: "Coconat" }}>
              Private & Alternative Education
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {privateSchools.map((school, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-[#21266c] mb-2">{school.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{school.location} • Grades {school.grades}</p>
                  <p className="text-gray-600">{school.description}</p>
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
                  <p className="text-sm font-semibold text-[#21266c] mb-1">Vermont School Choice</p>
                  <p className="text-sm text-gray-700">Vermont offers school choice programs in some communities. Check with your local school district to learn about tuition and choice options available in your area.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Higher Education Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Higher Education Nearby
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Franklin County is conveniently located near several excellent colleges and universities, offering diverse opportunities for higher education and professional development.
              </p>
            </div>

            <div className="space-y-6">
              {higherEducation.map((college, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 hover:border-[#3b82f6] transition-all">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center">
                        <GraduationCap className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-[#21266c] mb-2">{college.name}</h3>
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#3b82f6]" />
                          <span>{college.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#3b82f6]">{college.distance}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">{college.description}</p>
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-[#21266c] mb-2">Popular Programs:</p>
                        <div className="flex flex-wrap gap-2">
                          {college.programs.map((program, i) => (
                            <span key={i} className="px-3 py-1 bg-blue-50 text-[#3b82f6] text-xs font-medium rounded-full">
                              {program}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="w-4 h-4 text-[#3b82f6]" />
                        <span className="text-gray-600">{college.website}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Public Libraries Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Public Libraries
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                Franklin County's public libraries offer more than just books. They're community hubs providing educational programs, technology access, and cultural events for all ages.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {libraries.map((library, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <BookOpen className="w-10 h-10 text-[#3b82f6] mb-4" />
                  <h3 className="text-xl font-bold text-[#21266c] mb-4">{library.name}</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                      <span>{library.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-[#3b82f6]" />
                      <span>{library.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="w-4 h-4 text-[#3b82f6]" />
                      <span>{library.website}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#21266c] mb-2">Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {library.features.map((feature, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
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

        {/* Education Resources */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8" style={{ fontFamily: "Coconat" }}>
              Additional Education Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6">
                <Award className="w-10 h-10 text-[#3b82f6] mb-4" />
                <h3 className="text-xl font-bold text-[#21266c] mb-3">Vermont Agency of Education</h3>
                <p className="text-gray-700 mb-4">Access statewide education policies, school performance data, and resources for parents and students.</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Globe className="w-4 h-4 text-[#3b82f6]" />
                  <span>education.vermont.gov</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6">
                <BookOpen className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-[#21266c] mb-3">Vermont Adult Learning</h3>
                <p className="text-gray-700 mb-4">Free adult education programs including GED preparation, English language learning, and career training.</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Globe className="w-4 h-4 text-green-600" />
                  <span>vtadultlearning.org</span>
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
                Find Your Perfect Vermont Neighborhood
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Let us help you find a home in a community with excellent schools and educational opportunities for your family.
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
