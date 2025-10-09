"use client";

import { ArrowRight } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const VermontStorySection: React.FC = () => {
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
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Container with 90vw */}
      <div className="w-[90vw] mx-auto">
        {/* Content Container */}
        <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="max-w-6xl">
            {/* Main Title */}
            <h2
              className="text-white text-left text-[min(3rem,8vw)] sm:text-[min(3.5rem,7vw)] md:text-[min(4rem,6vw)] lg:text-[min(72px,5vw)] leading-[1.1] tracking-[-1px] mb-8"
              style={{ fontFamily: "Coconat" }}
            >
              {["Your", "Vermont", "Story", "Begins", "Here"].map(
                (word, index) => (
                  <span
                    key={index}
                    className={`inline-block mr-4 opacity-0 ${isVisible ? "animate-word-appear" : ""}`}
                    style={{
                      animationDelay: isVisible ? `${index * 0.15}s` : "0s",
                      animationFillMode: "forwards",
                    }}
                  >
                    {word}
                    {index === 2 ? <br /> : ""}
                  </span>
                ),
              )}
            </h2>

            {/* Description */}
            <div
              className={`opacity-0 ${isVisible ? "animate-fadeInUp" : ""} mb-10`}
              style={{
                animationDelay: isVisible ? "0.8s" : "0s",
                animationFillMode: "forwards",
              }}
            >
              <p className="text-white/80 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-5xl">
                Every home is a fresh start. Whether you're seeking the perfect
                Vermont retreat or crafting a custom masterpiece, we guide you
                with local expertise, unwavering care, and a passion for
                excellence. Your next chapter starts now—let's make it
                unforgettable.
              </p>
            </div>

            {/* Action Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 sm:gap-6 opacity-0 ${isVisible ? "animate-fadeInUp" : ""}`}
              style={{
                animationDelay: isVisible ? "1s" : "0s",
                animationFillMode: "forwards",
              }}
            >
              {/* Contact Us Button - Dark */}
              <button
                className="group relative overflow-hidden bg-gray-900 border-2 border-gray-900 rounded-full px-8 py-4 flex items-center justify-center sm:justify-start gap-3 transition-all duration-300 ease-out min-w-fit"
                style={{ fontFamily: "Coconat" }}
              >
                {/* Sliding Background */}
                <div className="absolute inset-0 bg-black rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>

                <span className="relative z-10 text-white font-medium text-lg">
                  Contact Us
                </span>
                <div className="relative z-10 w-6 h-6 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </button>

              {/* Or Text */}
              <div className="flex items-center justify-center sm:justify-start px-4">
                <span
                  className="text-white/60 text-lg font-medium"
                  style={{ fontFamily: "Coconat" }}
                >
                  Or
                </span>
              </div>

              {/* Book A Call Button - Outlined */}
              <button
                className="group relative overflow-hidden bg-transparent border-2 border-white/30 hover:border-white/50 rounded-full px-8 py-4 flex items-center justify-center sm:justify-start gap-3 transition-all duration-300 ease-out min-w-fit"
                style={{ fontFamily: "Coconat" }}
              >
                {/* Sliding Background */}
                <div className="absolute inset-0 bg-white/10 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>

                <span className="relative z-10 text-white font-medium text-lg">
                  Book A Call
                </span>
                <div className="relative z-10 w-6 h-6 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </button>
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
    </section>
  );
};

export default VermontStorySection;
