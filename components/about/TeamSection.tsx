"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Calendar, X, Linkedin, Badge } from "lucide-react";
import { motion } from "framer-motion";

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
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Framer Motion variants - optimized
  const wordAppear = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.6
      }
    }
  };

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Lori Hurley",
      title: "Owner / Principal Broker",
      description:
        "Lori Hurley is the driving force behind Four Corner Properties, combining deep market knowledge with a personal touch. Her commitment to client success and community values makes her a trusted leader in Vermont real estate.",
      imageUrl: "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760102913/team-1_l8m6i1.png",
      email: "Lori@FourCornerPropertiesVT.com",
      phone: "(508) 320-9014",
      license: "081.0134166",
      yearsExperience: 8,
      specialties: ["Luxury Estates", "Investment Properties", "Historic Homes"],
      location: "Bennington, Vermont",
      languages: ["English"],
      linkedin: "https://linkedin.com/in/lorihurley",
    },
    {
      id: 2,
      name: "James Hurley",
      title: "Sales Associate & Realtor",
      description:
        "James Hurley brings energy and dedication to every transaction. Known for his attentive service and local expertise, James helps buyers and sellers achieve their goals with confidence and care.",
      imageUrl: "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760399597/0396402759f451185fe2b690f85164ea-h_l_dj53xg.jpg",
      email: "J.Hurley.FCPVT@gmail.com",
      phone: "508-734-0501",
      license: "082.0135090",
      yearsExperience: 3,
      specialties: ["Luxury Estates", "Investment Properties", "Historic Homes"],
      location: "Bennington, Vermont",
      languages: ["English"],
      linkedin: "https://linkedin.com/in/jameshurley",
    },
    {
      id: 3,
      name: "Alex Shaffer",
      title: "Sales Associate & Realtor",
      description:
        "Alex Shaffer is passionate about matching clients with their dream Vermont properties. His friendly approach and deep knowledge of ski and vacation homes make him a go-to expert for buyers seeking the perfect retreat.",
      imageUrl: "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760102914/team-2_lex1bl.png",
      email: "Alexshaffervt@gmail.com",
      phone: "(802) 855-6175",
      license: "082.0135175",
      yearsExperience: 2,
      specialties: ["Ski Properties", "Mountain Homes", "Vacation Rentals"],
      location: "Bennington, Vermont",
      languages: ["English"],
    },
    {
      id: 4,
      name: "Courtney Harvey",
      title: "Sales Associate & Realtor",
      description:
        "Courtney Harvey is known for her professionalism and attention to detail. She guides clients through every step of the buying and selling process, ensuring smooth transactions and outstanding results.",
      imageUrl: "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760102913/team-3_my7hes.jpg",
      email: "charveyvt@gmail.com",
      phone: "(802) 353-1337",
      license: "082.0135176",
      yearsExperience: 2,
      specialties: ["Residential Sales", "First-Time Buyers", "Relocation"],
      location: "Bennington, Vermont",
      languages: ["English"],
    },
    {
      id: 5,
      name: "Pat Sady",
      title: "Sales Associate & Realtor",
      description:
        "Pat Sady is dedicated to helping clients find their ideal Vermont property, whether it’s a rural retreat or a commercial investment. His integrity and local insight make every transaction rewarding.",
      imageUrl: "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760102915/team-5_jafvh1.png",
      email: "P.Sady.fcpvt@gmail.com",
      phone: "(802) 282-3107",
      license: "82.0135158",
      yearsExperience: 3,
      specialties: ["Rural Properties", "Farms & Ranches", "Commercial Real Estate"],
      location: "Rutland, Vermont",
      languages: ["English"],
    },
  ];

  const titleWords = ["A", "Team", "of", "Visionary", "Experts", "and", "Passionate", "Professionals"];

  return (
    <>
      <section className="min-h-screen bg-white py-32 px-4 overflow-hidden">
        {/* Section Heading with word-by-word blur animation */}
        <div className="mb-16 w-full max-w-[1800px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <motion.h2
            className="text-black text-center lg:max-w-[50%] md:text-left text-[#21266c] text-[min(2.5rem,7vw)] sm:text-[min(3rem,6vw)] md:text-[min(3.5rem,5vw)] lg:text-[min(52px,4.5vw)] leading-[1.1] tracking-[-0.72px]"
            style={{ fontFamily: "Coconat" }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px", amount: 0.3 }}
          >
            {titleWords.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-4 word-blur-animate"
                variants={wordAppear}
                style={{
                  animationDelay: `${index * 0.15}s`
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        {/* Team Grid */}
        <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px", amount: 0.1 }}
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={fadeInUp}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
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
              </motion.div>
            ))}
          </motion.div>
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
                    <span>{selectedMember.yearsExperience}+ Years Experience</span>
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

      {/* CSS Keyframes for blur animation */}
      <style jsx>{`
        @keyframes blurFadeIn {
          0% {
            filter: blur(22px);
          }
          100% {
            filter: blur(0);
          }
        }

        .word-blur-animate {
          animation: blurFadeIn 0.6s ease-out both;
        }
      `}</style>
    </>
  );
};

export default TeamSection;
