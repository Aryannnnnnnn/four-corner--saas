"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Calendar, X, Linkedin, Badge } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  email: string;
  phone: string;
  license: string;
  yearsExperience: number;
  specialties: string[];
  location: string;
  languages: string[];
  linkedin?: string;
}

const TeamSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Lori Hurley",
      title: "Founder & Head Real Estate Advisor",
      description:
        "With a sharp eye for rare estates and a reputation built on trust, Founder & Head Real Estate Advisor Alexandra Sienna leads Sienna with vision, discretion, and integrity.",
      imageUrl: "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760102913/team-1_l8m6i1.png",
      email: "lori.hurley@fourcorner.com",
      phone: "(802) 555-0101",
      license: "VT-RE-2018-001234",
      yearsExperience: 15,
      specialties: ["Luxury Estates", "Investment Properties", "Historic Homes"],
      location: "Rutland, Vermont",
      languages: ["English", "French"],
      linkedin: "https://linkedin.com/in/lorihurley",
    },
    {
      id: 2,
      name: "Alex Shaffer",
      title: "Lead Project Manager",
      description:
        "With a sharp eye for Vermont's finest properties and a reputation built on trust, Lead Realtor Alex Shaffer guides Four Corner Properties' clients with expertise and passion, securing dream homes in Rutland, Killington, Bennington, and beyond. Contact him today to find your perfect Vermont retreat!",
      imageUrl: "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760102914/team-2_lex1bl.png",
      email: "alex.shaffer@fourcorner.com",
      phone: "(802) 555-0102",
      license: "VT-RE-2019-002345",
      yearsExperience: 12,
      specialties: ["Ski Properties", "Mountain Homes", "Vacation Rentals"],
      location: "Killington, Vermont",
      languages: ["English", "German"],
    },
    {
      id: 3,
      name: "Courtney Harvey",
      title: "Senior Real Estate Agent",
      description:
        "With a sharp eye for Vermont's finest properties and a reputation for poised professionalism, Senior Real Estate Agent Courtney Harvey delivers exceptional results at Four Corner Properties, handling every transaction with care and confidence. Contact her today to secure your dream Vermont home!",
      imageUrl: "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760102913/team-3_my7hes.jpg",
      email: "courtney.harvey@fourcorner.com",
      phone: "(802) 555-0103",
      license: "VT-RE-2020-003456",
      yearsExperience: 10,
      specialties: ["Residential Sales", "First-Time Buyers", "Relocation"],
      location: "Bennington, Vermont",
      languages: ["English", "Spanish"],
    },
    {
      id: 4,
      name: "Erin Roy",
      title: "Luxury Property Specialist",
      description:
        "With a sharp eye for Vermont's luxury estates and a passion for architectural elegance, Luxury Property Specialist Erin Roy blends financial acumen with market expertise at Four Corner Properties, delivering unmatched value and vision. Contact Erin today to secure your dream Vermont retreat!",
      imageUrl: "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760102915/team-4_xyb08q.png",
      email: "erin.roy@fourcorner.com",
      phone: "(802) 555-0104",
      license: "VT-RE-2017-004567",
      yearsExperience: 18,
      specialties: ["Luxury Estates", "Waterfront Properties", "Land Development"],
      location: "Burlington, Vermont",
      languages: ["English", "Italian"],
      linkedin: "https://linkedin.com/in/erinroy",
    },
    {
      id: 5,
      name: "Pat Sady",
      title: "Lead Real Estate Agent",
      description:
        "With an expert eye for Vermont's most coveted properties and a reputation built on trust, Lead Real Estate Agent Patrick Sady drives Four Corner Properties' success with unmatched dedication and precision. Specializing in Southern Vermont's premier homes, he transforms dreams into reality. Contact Patrick today to find your perfect Vermont escape!",
      imageUrl: "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760102915/team-5_jafvh1.png",
      email: "pat.sady@fourcorner.com",
      phone: "(802) 555-0105",
      license: "VT-RE-2016-005678",
      yearsExperience: 20,
      specialties: ["Rural Properties", "Farms & Ranches", "Commercial Real Estate"],
      location: "Manchester, Vermont",
      languages: ["English"],
    },
  ];

  // Intersection Observer to trigger animation when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: "-50px 0px -50px 0px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Split title into words for animation
  const titleWords = [
    "A",
    "Team",
    "of",
    "Visionary",
    "Experts",
    "and",
    "Passionate",
    "Professionals",
  ];

  return (
    <>
      <section
        ref={sectionRef}
        className="min-h-screen bg-white py-32 px-4 overflow-hidden"
      >
        {/* Section Heading with ExpertiseSection-style Animation */}
        <div className="mb-16 w-full max-w-[1800px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <h2
            className="text-black text-center lg:max-w-[50%] md:text-left text-[#21266c] text-[min(2.5rem,7vw)] sm:text-[min(3rem,6vw)] md:text-[min(3.5rem,5vw)] lg:text-[min(52px,4.5vw)] leading-[1.1] tracking-[-0.72px]"
            style={{ fontFamily: "Coconat" }}
          >
            {titleWords.map((word, index) => (
              <span
                key={index}
                className={`inline-block mr-4 opacity-0 ${isVisible ? "animate-word-appear" : ""}`}
                style={{
                  animationDelay: isVisible ? `${index * 0.15}s` : "0s",
                  animationFillMode: "forwards",
                }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Team Grid */}
        <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`${isVisible ? "animate-fadeInUp" : "opacity-0"}`}
                style={{
                  animationDelay: isVisible ? `${index * 0.1 + 0.5}s` : "0s",
                  animationFillMode: "forwards",
                }}
              >
                <div
                  onClick={() => setSelectedMember(member)}
                  className="bg-black/15 backdrop-blur-sm rounded-2xl p-6 border border-black/10 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-3 group h-full cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-xl mb-6 h-160">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white text-sm font-semibold">View ID Card</span>
                    </div>
                  </div>

                  {/* Name */}
                  <h3
                    className="text-2xl font-normal text-black mb-3"
                    style={{ fontFamily: "Coconat" }}
                  >
                    {member.name}
                  </h3>

                  {/* Title */}
                  <p className="text-sm font-semibold text-[#21266c] uppercase tracking-wider mb-4">
                    {member.title}
                  </p>

                  {/* Description */}
                  <p className="text-black text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ID Card Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-start lg:items-center justify-center bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="relative bg-gradient-to-br from-white via-blue-50/30 to-white w-full max-w-3xl rounded-t-3xl lg:rounded-3xl shadow-2xl overflow-hidden mt-16 lg:my-8 min-h-[calc(100vh-4rem)] lg:min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Mobile/Tablet Bar, Desktop Circle */}
            <button
              onClick={() => setSelectedMember(null)}
              className="sticky lg:absolute top-0 lg:top-6 right-0 lg:right-6 z-[100] w-full lg:w-14 lg:h-14 h-14 flex items-center justify-center bg-gray-900 lg:bg-white rounded-none lg:rounded-full shadow-2xl transition-all hover:scale-105 lg:hover:scale-110"
            >
              <X className="w-6 h-6 text-white lg:text-gray-700" />
              <span className="ml-2 lg:hidden text-white font-semibold">Close</span>
            </button>

            {/* Modern ID Card Design */}
            <div className="bg-white">
              <div className="p-6 sm:p-8 lg:p-8">
                {/* Agent Profile Header */}
                <div className="text-center mb-6">
                  {/* Profile Photo */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 mx-auto mb-4">
                  <img
                    src={selectedMember.imageUrl}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover rounded-full border-4 border-blue-600 shadow-xl"
                  />
                </div>

                {/* Name and Title */}
                <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Coconat" }}>
                  {selectedMember.name}
                </h2>
                <p className="text-[#21266c] font-semibold text-sm sm:text-base uppercase tracking-wider mb-3">
                  {selectedMember.title}
                </p>

                {/* Credentials */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Badge className="w-4 h-4 text-blue-600" />
                    <span className="font-mono">{selectedMember.license}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{selectedMember.yearsExperience} Years Experience</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-5"></div>

              {/* Contact Section */}
              <div className="mb-5">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a href={`mailto:${selectedMember.email}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Mail className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 uppercase">Email</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{selectedMember.email}</p>
                    </div>
                  </a>

                  <a href={`tel:${selectedMember.phone}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Phone className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 uppercase">Phone</p>
                      <p className="text-sm font-medium text-gray-900">{selectedMember.phone}</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-3 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 uppercase">Location</p>
                      <p className="text-sm font-medium text-gray-900">{selectedMember.location}</p>
                    </div>
                  </div>

                  {selectedMember.linkedin && (
                    <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <Linkedin className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase">LinkedIn</p>
                        <p className="text-sm font-medium text-blue-600 group-hover:underline">View Profile</p>
                      </div>
                    </a>
                  )}
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-5">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-blue-100 text-blue-900 rounded-full text-xs sm:text-sm font-semibold"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="mb-5">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 text-gray-900 rounded-full text-xs sm:text-sm font-semibold"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-5 border-t border-gray-200">
                <a
                  href={`mailto:${selectedMember.email}`}
                  className="block w-full py-3 sm:py-3.5 bg-blue-600 text-white text-center rounded-xl font-bold text-base sm:text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Contact {selectedMember.name.split(' ')[0]}
                </a>
              </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes wordAppear {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
            filter: blur(22px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }

        .animate-word-appear {
          animation: wordAppear 0.6s ease-out both;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out both;
        }
      `}</style>
    </>
  );
};

export default TeamSection;
