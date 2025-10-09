"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

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
        rootMargin: "-50px 0px -50px 0px", // Add some margin for better timing
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

  const items = [
    {
      id: 1,
      title:
        "196 Glastenview Dr, Shaftsbury, VT - Sold by Four Corner Properties",
      image:
        "https://i.ibb.co/0VMWskXg/68b767a79208d443bd7f87e9-f975965f05957c3e1bf21f1f59d747bb-uncropped-scaled-within-1536-1152.webp",
    },
    {
      id: 2,
      title:
        "441 Guilford St, Brattleboro, VT - Sold by Four Corner Properties",
      image:
        "https://i.ibb.co/SXp00Typ/68b750c2de3cd6a8088bf23f-c02bff851bfd9c354bf2a526bec80f31-uncropped-scaled-within-1536-1152.webp",
    },
    {
      id: 3,
      title: "60 Brookside Dr, Killington, VT - Sold by Four Corner Properties",
      image:
        "https://i.ibb.co/20tWwzJw/68b744c052141201ce324765-dcd5df55acef53f1175fd45791216c21-uncropped-scaled-within-1536-1152.webp",
    },
    {
      id: 4,
      title: "290 Barts Hill Rd, Killington, VT",
      image:
        "https://i.ibb.co/v4j0HMPY/68b71cd250e706efd2a17611-a5b9b3e465864eadec6d2f7b6ca76e5c-uncropped-scaled-within-1536-1152.webp",
    },
    {
      id: 5,
      title: "107 Top Ridge, Mendon, VT 05701",
      image:
        "https://i.ibb.co/8DmT1rXk/68b7123cab8a1dc30fe61c45-fd0a925dded62699f1d1db928326c62f-cc-ft-384.webp",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused && isVisible) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % items.length);
      }, 2000); // 2 seconds delay
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused, isVisible]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
    setIsPaused(true);
    // Resume auto-play after 4 seconds of inactivity
    setTimeout(() => setIsPaused(false), 4000);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
    setIsPaused(true);
    // Resume auto-play after 4 seconds of inactivity
    setTimeout(() => setIsPaused(false), 4000);
  };

  const getPrevIndex = () => {
    return activeIndex > 0 ? activeIndex - 1 : items.length - 1;
  };

  const getNextIndex = () => {
    return activeIndex < items.length - 1 ? activeIndex + 1 : 0;
  };

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center min-h-screen bg-white p-4 md:p-0 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Section Heading with HeroSection-style Animation */}
      <div className="mb-24 w-full max-w-[1800px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <h2
          className="text-black text-left text-[min(2.5rem,7vw)] sm:text-[min(3rem,6vw)] md:text-[min(3.5rem,5vw)] lg:text-[min(52px,4.5vw)] leading-[1.1] tracking-[-0.72px] lg:max-w-[50%]"
          style={{ fontFamily: "Coconat" }}
        >
          {[
            "Vermont's",
            "Finest:",
            "Our",
            "Exclusive",
            "Statewide",
            "Collection",
          ].map((word, index) => (
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

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-center w-full max-w-full">
        {/* Previous Box (Left End) */}
        <div className="overflow-hidden w-32 h-[400px] flex items-center flex-shrink-0">
          <div
            className="relative w-64 h-80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-[800ms] ease-out opacity-50 hover:opacity-70"
            onClick={handlePrev}
          >
            <img
              src={items[getPrevIndex()]?.image || ""}
              alt={items[getPrevIndex()]?.title || "Previous item"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1 min-w-[40px]"></div>

        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="p-4 rounded-full bg-black/10 hover:bg-black/20 hover:scale-110 transition-all duration-300 backdrop-blur-sm z-20 flex-shrink-0 mx-8"
          aria-label="Previous"
        >
          <ChevronLeft className="w-8 h-8 text-black" />
        </button>

        {/* Active Box (Center) - 4:3 Aspect Ratio */}
        <div
          className="relative w-[900px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-[800ms] ease-out flex-shrink-0"
          style={{ aspectRatio: "4/3" }}
        >
          <img
            src={items[activeIndex]?.image || ""}
            alt={items[activeIndex]?.title || "Active item"}
            className="w-full h-full object-cover transition-all duration-[800ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-6">
            <div className="text-center text-white">
              <h3
                className="text-4xl font-bold transition-all duration-[800ms] opacity-0 animate-fade-in"
                style={{
                  fontFamily: "Coconat",
                  animationDelay: "200ms",
                  animationFillMode: "forwards",
                }}
              >
                {items[activeIndex]?.title || "Active Item"}
              </h3>
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="p-4 rounded-full bg-black/10 hover:bg-black/20 hover:scale-110 transition-all duration-300 backdrop-blur-sm z-20 flex-shrink-0 mx-8"
          aria-label="Next"
        >
          <ChevronRight className="w-8 h-8 text-black" />
        </button>

        {/* Spacer */}
        <div className="flex-1 min-w-[40px]"></div>

        {/* Next Box (Right End) */}
        <div className="overflow-hidden w-32 h-[400px] flex items-center justify-end flex-shrink-0">
          <div
            className="relative w-64 h-80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-[800ms] ease-out opacity-50 hover:opacity-70 -ml-32"
            onClick={handleNext}
          >
            <img
              src={items[getNextIndex()]?.image || ""}
              alt={items[getNextIndex()]?.title || "Next item"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Layout - Only Center Box Visible */}
      <div className="flex flex-col items-center lg:hidden w-full">
        {/* Single Carousel Image */}
        <div className="flex items-center justify-center mb-6 w-full px-4">
          {/* Active Box (Center Only) */}
          <div
            className="relative w-full max-w-md rounded-xl md:rounded-2xl overflow-hidden shadow-2xl transition-all duration-[800ms] ease-out flex-shrink-0"
            style={{ aspectRatio: "4/3" }}
          >
            <img
              src={items[activeIndex]?.image || ""}
              alt={items[activeIndex]?.title || "Active item"}
              className="w-full h-full object-cover transition-all duration-[800ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-4 md:p-6">
              <div className="text-center text-white">
                <h3
                  className="text-xl md:text-3xl font-bold transition-all duration-[800ms] opacity-0 animate-fade-in"
                  style={{
                    fontFamily: "Coconat",
                    animationDelay: "200ms",
                    animationFillMode: "forwards",
                  }}
                >
                  {items[activeIndex]?.title || "Active Item"}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Below - Arrows and Indicators */}
        <div className="flex items-center justify-center gap-4 md:gap-6">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="p-3 md:p-4 rounded-full bg-black/10 hover:bg-black/20 hover:scale-110 transition-all duration-300 backdrop-blur-sm"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-black" />
          </button>

          {/* Indicators */}
          <div className="flex items-center gap-2">
            {items.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? "w-8 md:w-10 h-2 md:h-2.5 bg-black"
                    : "w-2 md:w-2.5 h-2 md:h-2.5 bg-black/40 hover:bg-black/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="p-3 md:p-4 rounded-full bg-black/10 hover:bg-black/20 hover:scale-110 transition-all duration-300 backdrop-blur-sm"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-black" />
          </button>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes popFadeIn {
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

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-word-appear {
          animation: popFadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Carousel;
