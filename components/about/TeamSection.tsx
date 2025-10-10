"use client";

import React, { useEffect, useRef, useState } from "react";

interface TeamMember {
  id: number;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
}

const TeamSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Lori Hurley",
      title: "Founder & Head Real Estate Advisor",
      description:
        "With a sharp eye for rare estates and a reputation built on trust, Founder & Head Real Estate Advisor Alexandra Sienna leads Sienna with vision, discretion, and integrity.",
      imageUrl: "/team-1.png",
    },
    {
      id: 2,
      name: "Alex Shaffer",
      title: "Lead Project Manager",
      description:
        "With a sharp eye for Vermont's finest properties and a reputation built on trust, Lead Realtor Alex Shaffer guides Four Corner Properties' clients with expertise and passion, securing dream homes in Rutland, Killington, Bennington, and beyond. Contact him today to find your perfect Vermont retreat!",
      imageUrl: "/team-2.png",
    },
    {
      id: 3,
      name: "Courtney Harvey",
      title: "Senior Real Estate Agent",
      description:
        "With a sharp eye for Vermont's finest properties and a reputation for poised professionalism, Senior Real Estate Agent Courtney Harvey delivers exceptional results at Four Corner Properties, handling every transaction with care and confidence. Contact her today to secure your dream Vermont home!",
      imageUrl: "/team-3.jpeg",
    },
    {
      id: 4,
      name: "Erin Roy",
      title: "Luxury Property Specialist",
      description:
        "With a sharp eye for Vermont’s luxury estates and a passion for architectural elegance, Luxury Property Specialist Erin Roy blends financial acumen with market expertise at Four Corner Properties, delivering unmatched value and vision. Contact Erin today to secure your dream Vermont retreat!",
      imageUrl: "/team-4.png",
    },
    {
      id: 5,
      name: "Pat Sady",
      title: "Lead Real Estate Agent",
      description:
        "With an expert eye for Vermont’s most coveted properties and a reputation built on trust, Lead Real Estate Agent Patrick Sady drives Four Corner Properties’ success with unmatched dedication and precision. Specializing in Southern Vermont’s premier homes, he transforms dreams into reality. Contact Patrick today to find your perfect Vermont escape!",
      imageUrl: "/team-5.png",
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
            className="text-black text-center lg:max-w-[50%] md:text-left text-[min(2.5rem,7vw)] sm:text-[min(3rem,6vw)] md:text-[min(3.5rem,5vw)] lg:text-[min(52px,4.5vw)] leading-[1.1] tracking-[-0.72px]"
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
                <div className="bg-black/15 backdrop-blur-sm rounded-2xl p-6 border border-black/10 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-3 group h-full">
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-xl mb-6 h-160">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Name */}
                  <h3
                    className="text-2xl font-normal text-black mb-3"
                    style={{ fontFamily: "Coconat" }}
                  >
                    {member.name}
                  </h3>

                  {/* Title */}
                  <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">
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
