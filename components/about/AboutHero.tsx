"use client";

import { ArrowRight, Award, Users, Home } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AboutHero() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
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

  return (
    <section
      ref={sectionRef}
      className="relative bg-white pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24 overflow-hidden"
    >
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <div
              className={`inline-block ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
              style={{
                animationDelay: "0.2s",
                animationFillMode: "forwards",
              }}
            >
              <div className="w-12 h-1 bg-[#21266c] mb-4"></div>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-[0.2em]">
                About Four Corner Properties
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className={`text-[#21266c] text-5xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-tight ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
              style={{
                fontFamily: "Coconat",
                animationDelay: "0.4s",
                animationFillMode: "forwards",
              }}
            >
              Your Vermont{" "}
              <span className="block">Dream Home</span>
              <span className="block">Starts Here</span>
            </h1>

            {/* Description */}
            <p
              className={`text-lg sm:text-xl text-gray-600 leading-relaxed ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
              style={{
                animationDelay: "0.6s",
                animationFillMode: "forwards",
              }}
            >
              Established in 2021, Four Corner Properties was built on a commitment to simplify real estate for buyers, sellers, and investors alike. From first-time homeowners to seasoned clients relocating to Southern Vermont, we focus on making every transaction seamless and transparent. Our mission is to combine local expertise with genuine care, ensuring every client feels confident and informed at every step.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
              style={{
                animationDelay: "0.8s",
                animationFillMode: "forwards",
              }}
            >
              <button
                onClick={() => (window.location.href = "/contact")}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#21266c] border-2 border-[#21266c] text-white font-medium text-base rounded-full transition-all duration-300"
              >
                GET IN TOUCH
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => (window.location.href = "/listings")}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-[#21266c] text-[#21266c] font-medium text-base rounded-full transition-all duration-300 hover:bg-[#21266c] hover:text-white"
              >
                VIEW LISTINGS
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-6 pt-8 ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
              style={{
                animationDelay: "1s",
                animationFillMode: "forwards",
              }}
            >
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Award className="w-8 h-8 text-[#21266c] mx-auto mb-2" />
                <p className="text-2xl sm:text-3xl font-light text-[#21266c] mb-1" style={{ fontFamily: "Coconat" }}>
                  X+
                </p>
                <p className="text-xs text-gray-600 uppercase tracking-wider">
                  Years
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Home className="w-8 h-8 text-[#21266c] mx-auto mb-2" />
                <p className="text-2xl sm:text-3xl font-light text-[#21266c] mb-1" style={{ fontFamily: "Coconat" }}>
                  X+
                </p>
                <p className="text-xs text-gray-600 uppercase tracking-wider">
                  Properties
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Users className="w-8 h-8 text-[#21266c] mx-auto mb-2" />
                <p className="text-2xl sm:text-3xl font-light text-[#21266c] mb-1" style={{ fontFamily: "Coconat" }}>
                  100%
                </p>
                <p className="text-xs text-gray-600 uppercase tracking-wider">
                  Satisfied
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Images */}
          <div
            className={`relative ${
              isVisible ? "animate-fadeInRight" : "opacity-0"
            }`}
            style={{
              animationDelay: "0.6s",
              animationFillMode: "forwards",
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Large Image - Top Left */}
              <div className="col-span-2 relative rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://res.cloudinary.com/dklhvv6mc/image/upload/v1760103377/68ada709a6656f55ea938436-Service-Img_rw4nrv.jpg"
                  alt="Vermont Property"
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "16/9" }}
                />
              </div>

              {/* Small Image - Bottom Left */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://res.cloudinary.com/dklhvv6mc/image/upload/v1760103374/68afe686a8b0e8104f58a45c-Untitled-design-6_zydsft.png"
                  alt="Interior"
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "1/1" }}
                />
              </div>

              {/* Small Image - Bottom Right */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://res.cloudinary.com/dklhvv6mc/image/upload/v1760103343/68afe5de92b348d581323a93-Untitled-design-4_hopcuy.png"
                  alt="Property Detail"
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "1/1" }}
                />
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                Trusted Since
              </p>
              <p className="text-3xl font-light text-[#21266c]" style={{ fontFamily: "Coconat" }}>
                X
              </p>
            </div>
          </div>
        </div>
      </div>

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

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out both;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out both;
        }
      `}</style>
    </section>
  );
}
