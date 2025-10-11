"use client";

import { ArrowRight } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const ExpertiseSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-16 sm:py-20 lg:py-24 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
          {/* Left Side - Images with Creative Layout */}
          <div className="lg:col-span-7 relative">
            {/* Main Large Image */}
            <div
              className={`relative rounded-3xl overflow-hidden shadow-2xl ${isVisible ? "animate-fadeInLeft" : ""}`}
              style={{
                animationDelay: isVisible ? "0.2s" : undefined,
                animationFillMode: isVisible ? "forwards" : undefined,
              }}
            >
              <img
                src="https://res.cloudinary.com/dklhvv6mc/image/upload/v1760173041/todd-kent-178j8tJrNlc-unsplash_txkfnv.jpg"
                alt="Vermont Real Estate"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
            </div>

            {/* Floating Small Image - Top Right */}
            <div
              className={`absolute -top-8 right-4 lg:right-8 w-48 h-52 rounded-2xl overflow-hidden shadow-xl border-4 border-white ${isVisible ? "animate-scaleIn" : ""}`}
              style={{
                animationDelay: isVisible ? "0.6s" : undefined,
                animationFillMode: isVisible ? "forwards" : undefined,
              }}
            >
              <img
                src="https://res.cloudinary.com/dklhvv6mc/image/upload/v1760102913/team-1_l8m6i1.png"
                alt="Interior"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Stats Card - Bottom Left */}
            <div
              className={`absolute -bottom-6 left-8 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 ${isVisible ? "animate-fadeInUp" : ""}`}
              style={{
                animationDelay: isVisible ? "0.8s" : undefined,
                animationFillMode: isVisible ? "forwards" : undefined,
              }}
            >
              <div className="text-[#21266c] text-5xl font-light mb-1" style={{ fontFamily: "Coconat" }}>
                X+
              </div>
              <div className="text-gray-500 text-xs uppercase tracking-wider">
                Years of Excellence
              </div>
            </div>
          </div>

          {/* Right Side - Content with Asymmetric Layout */}
          <div className="lg:col-span-5 space-y-8">
            {/* Decorative Line */}
            <div
              className={`w-20 h-1 bg-[#21266c] ${isVisible ? "animate-slideRight" : ""}`}
              style={{
                animationDelay: isVisible ? "0.3s" : undefined,
                animationFillMode: isVisible ? "forwards" : undefined,
              }}
            ></div>

            {/* Our Story */}
            <div
              className={`${isVisible ? "animate-fadeInRight" : ""}`}
              style={{
                animationDelay: isVisible ? "0.4s" : undefined,
                animationFillMode: isVisible ? "forwards" : undefined,
              }}
            >
              <h3
                className="text-[#21266c] text-3xl sm:text-4xl lg:text-5xl font-light mb-6 leading-tight"
                style={{ fontFamily: "Coconat" }}
              >
                Our Story
              </h3>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Only one network of agents represents the longest standing leader in the world. At the very heart of innovation, an exceptional luxury real estate network boasting Four Corner's unparalleled presence.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Through this comes far more than 300+ networks of homes for sale. Individuals have come to associate their entire luxury lifestyles with our brand.
              </p>

              <button className="inline-flex items-center gap-2 text-[#21266c] font-semibold text-sm border-b-2 border-[#21266c] pb-1 hover:gap-4 transition-all duration-300"
              onClick={() => window.location.href = "/about"}
              >
                <span>SEE DETAILS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Floating Stats - Staggered */}
            <div className="space-y-6 pt-8">
              <div
                className={`flex items-end gap-12 ${isVisible ? "animate-fadeInRight" : ""}`}
                style={{
                  animationDelay: isVisible ? "0.6s" : undefined,
                  animationFillMode: isVisible ? "forwards" : undefined,
                }}
              >
                <div>
                  <div className="text-[#21266c] text-5xl font-light mb-2" style={{ fontFamily: "Coconat" }}>
                    X+
                  </div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider">
                    Properties<br />Sold
                  </div>
                </div>
                <div>
                  <div className="text-[#21266c] text-5xl font-light mb-2" style={{ fontFamily: "Coconat" }}>
                    100%
                  </div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider">
                    Client<br />Satisfaction
                  </div>
                </div>
              </div>

              <div
                className={`bg-gray-50 p-6 rounded-2xl ${isVisible ? "animate-fadeInRight" : ""}`}
                style={{
                  animationDelay: isVisible ? "0.8s" : undefined,
                  animationFillMode: isVisible ? "forwards" : undefined,
                }}
              >
                <div className="text-[#21266c] text-4xl font-light mb-3" style={{ fontFamily: "Coconat" }}>
                  $X Million
                </div>
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-4">
                  Total Sales Volume
                </div>
                <button
                  onClick={() => window.location.href = "/about"}
                  className="inline-flex items-center gap-2 text-[#21266c] font-semibold text-sm hover:gap-4 transition-all duration-300"
                >
                  <span>EXPLORE MORE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background Element */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#21266c]/5 rounded-full blur-3xl -z-10"></div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInLeft {
          0% {
            opacity: 0;
            transform: translateX(-30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideRight {
          0% {
            opacity: 0;
            width: 0;
          }
          100% {
            opacity: 1;
            width: 5rem;
          }
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out both;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out both;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out both;
        }

        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out both;
        }

        .animate-slideRight {
          animation: slideRight 0.8s ease-out both;
        }
      `}</style>
    </section>
  );
};

export default ExpertiseSection;
