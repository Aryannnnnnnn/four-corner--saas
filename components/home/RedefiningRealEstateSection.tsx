"use client";

import { ArrowRight } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const RedefiningRealEstateSection: React.FC = () => {
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
      className="bg-white py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Image */}
          <div
            className={`relative ${
              isVisible ? "animate-fadeInLeft" : ""
            }`}
            style={{
              animationDelay: isVisible ? "0.2s" : "0s",
              animationFillMode: "forwards",
            }}
          >
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://res.cloudinary.com/dklhvv6mc/image/upload/v1760103377/68ada709a6656f55ea938436-Service-Img_rw4nrv.jpg"
                alt="Property Listing"
                className="w-full h-full object-cover"
                style={{ aspectRatio: "4/3" }}
              />
              {/* Property Info Overlay */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-2xl border border-gray-100">
                <p className="text-xs text-gray-500 mb-2 uppercase tracking-[0.15em] font-medium">
                  Bennington, Vermont
                </p>
                <p className="text-3xl font-light text-[#21266c] mb-1" style={{ fontFamily: "Coconat" }}>
                  $365,100
                </p>
                <button className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#21266c] hover:text-[#21266c] transition-colors uppercase tracking-wide">
                  VIEW OUR LISTINGS
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div
            className={`space-y-6 ${
              isVisible ? "animate-fadeInRight" : ""
            }`}
            style={{
              animationDelay: isVisible ? "0.4s" : "0s",
              animationFillMode: "forwards",
            }}
          >
            <h2
              className="text-[#21266c] text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight"
              style={{ fontFamily: "Coconat" }}
            >
              Redefining Real Estate
            </h2>
            <p className="text-black/80 text-base md:text-lg leading-relaxed">
              With expertise in Vermont's vibrant real estate market, our
              advisors deliver exceptional service. Leveraging our iconic brand,
              your home gains unparalleled exposure, connecting with buyers
              locally & worldwide through top technology, networks & prestige.
            </p>
            <button className="group bg-[#21266c] border-2 border-[#21266c] rounded-full px-6 py-3 flex items-center gap-3 transition-all duration-300 ease-out"
            onClick={() => window.location.href = '/list-property'}>
              <span className="text-white font-medium text-lg">
                LIST WITH US
              </span>
              <div className="w-8 h-8 flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Section - About Us */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-24">
          {/* Left Side - Content */}
          <div
            className={`space-y-6 ${
              isVisible ? "animate-fadeInLeft" : ""
            }`}
            style={{
              animationDelay: isVisible ? "0.6s" : "0s",
              animationFillMode: "forwards",
            }}
          >
            <p className="text-sm text-gray-600 uppercase tracking-widest">
              ABOUT US
            </p>
            <h2
              className="text-[#21266c] text-4xl sm:text-5xl leading-tight tracking-tight"
              style={{ fontFamily: "Coconat" }}
            >
              Exceptional Connections, Remarkable Results
            </h2>
            <p className="text-black/80 text-base md:text-lg leading-relaxed">
              At Four Corner Properties, we connect exceptional properties with
              extraordinary lives. Through our elite network, exclusive access,
              and trusted reputation, we offer a tailored approach that opens
              doors & drives results for every client.
            </p>
            <button className="group bg-[#21266c] border-2 border-[#21266c] rounded-full px-6 py-3 flex items-center gap-3 transition-all duration-300 ease-out"
            onClick={() => window.location.href = '/about'}>
              <span className="text-white font-medium text-lg">
                LEARN MORE
              </span>
              <div className="w-8 h-8 flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </button>
          </div>

          {/* Right Side - Image */}
          <div
            className={`relative ${
              isVisible ? "animate-fadeInRight" : ""
            }`}
            style={{
              animationDelay: isVisible ? "0.8s" : "0s",
              animationFillMode: "forwards",
            }}
          >
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://res.cloudinary.com/dklhvv6mc/image/upload/v1760103374/68afe686a8b0e8104f58a45c-Untitled-design-6_zydsft.png"
                alt="Interior Design"
                className="w-full h-full object-cover"
                style={{ aspectRatio: "4/3" }}
              />
            </div>
          </div>
        </div>
      </div>

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

        .animate-fadeInLeft {
          animation: fadeInLeft 0.6s ease-out both;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.6s ease-out both;
        }
      `}</style>
    </section>
  );
};

export default RedefiningRealEstateSection;
