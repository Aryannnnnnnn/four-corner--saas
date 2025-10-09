"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface PropertyListing {
  id: number;
  address: string;
  image: string;
  href: string;
}

const CuratedListings: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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

  const propertyListings: PropertyListing[] = [
    {
      id: 1,
      address: "196 Glastenview Dr, Shaftsbury, VT 05262",
      image:
        "https://i.ibb.co/0VMWskXg/68b767a79208d443bd7f87e9-f975965f05957c3e1bf21f1f59d747bb-uncropped-scaled-within-1536-1152.webp",
      href: "/property/1",
    },
    {
      id: 2,
      address: "441 Guilford St, Brattleboro, VT 05301",
      image:
        "https://i.ibb.co/SXp00Typ/68b750c2de3cd6a8088bf23f-c02bff851bfd9c354bf2a526bec80f31-uncropped-scaled-within-1536-1152.webp",
      href: "/property/2",
    },
    {
      id: 3,
      address: "60 Brookside Dr, Killington, VT 05751",
      image:
        "https://i.ibb.co/20tWwzJw/68b744c052141201ce324765-dcd5df55acef53f1175fd45791216c21-uncropped-scaled-within-1536-1152.webp",
      href: "/property/3",
    },
    {
      id: 4,
      address: "290 Barts Hill Rd, Killington, VT 05751",
      image:
        "https://i.ibb.co/v4j0HMPY/68b71cd250e706efd2a17611-a5b9b3e465864eadec6d2f7b6ca76e5c-uncropped-scaled-within-1536-1152.webp",
      href: "/property/4",
    },
    {
      id: 5,
      address: "107 Top Ridge, Mendon, VT 05701",
      image:
        "https://i.ibb.co/8DmT1rXk/68b7123cab8a1dc30fe61c45-fd0a925dded62699f1d1db928326c62f-cc-ft-384.webp",
      href: "/property/5",
    },
  ];

  const handlePrev = () => {
    // Desktop: Show 3 cards, so navigate by 1 but limit to show last 3
    // Mobile: Navigate through all cards
    if (window.innerWidth >= 1024) {
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : Math.max(0, propertyListings.length - 3),
      );
    } else {
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : propertyListings.length - 1,
      );
    }
  };

  const handleNext = () => {
    // Desktop: Show 3 cards, so navigate by 1 but limit to not exceed showing last 3
    // Mobile: Navigate through all cards
    if (window.innerWidth >= 1024) {
      setActiveIndex((prev) =>
        prev < propertyListings.length - 3 ? prev + 1 : 0,
      );
    } else {
      setActiveIndex((prev) =>
        prev < propertyListings.length - 1 ? prev + 1 : 0,
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      className="bg-white min-h-screen flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 overflow-hidden"
    >
      {/* Section Heading with Controls */}
      <div className="mb-16 w-full max-w-[1800px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <h2
            className="text-black text-center lg:text-left text-[min(2.5rem,7vw)] sm:text-[min(3rem,6vw)] md:text-[min(3.5rem,5vw)] lg:text-[min(52px,4.5vw)] leading-[1.1] tracking-[-0.72px] mb-8 lg:mb-0"
            style={{ fontFamily: "Coconat" }}
          >
            {["Newly", "Curated", "Listings"].map((word, index) => (
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

          {/* Desktop Navigation Controls */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-black/30 flex items-center justify-center transition-all duration-300 ease-in-out hover:border-black/50 hover:bg-black/10 bg-black/5"
              aria-label="Previous listing"
            >
              <ChevronLeft className="w-5 h-5 text-black/70" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-black/30 flex items-center justify-center transition-all duration-300 ease-in-out hover:border-black/50 hover:bg-black/10 bg-black/5"
              aria-label="Next listing"
            >
              <ChevronRight className="w-5 h-5 text-black/70" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Desktop Layout - Carousel with 3 Cards Visible */}
        <div className="hidden lg:block">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{
                transform: `translateX(-${activeIndex * (100 / 3)}%)`,
              }}
            >
              {propertyListings.map((property, index) => (
                <div
                  key={property.id}
                  className={`flex-shrink-0 w-1/3 transition-all duration-500 ease-out ${
                    isVisible ? "animate-fadeInUp" : "opacity-0"
                  }`}
                  style={{
                    animationDelay: isVisible ? `${index * 0.1 + 0.5}s` : "0s",
                    animationFillMode: "forwards",
                  }}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout - Single Card with Controls */}
        <div className="lg:hidden">
          {/* Single Property Card */}
          <div className="mb-8">
            {propertyListings[activeIndex] && (
              <PropertyCard property={propertyListings[activeIndex]} />
            )}
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-black/30 flex items-center justify-center transition-all duration-300 ease-in-out hover:border-black/50 hover:bg-black/10 bg-black/5"
              aria-label="Previous listing"
            >
              <ChevronLeft className="w-5 h-5 text-black/70" />
            </button>

            {/* Indicators */}
            <div className="flex items-center gap-2">
              {propertyListings.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-black w-8"
                      : "bg-black/30 hover:bg-black/50"
                  }`}
                  aria-label={`Go to listing ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-black/30 flex items-center justify-center transition-all duration-300 ease-in-out hover:border-black/50 hover:bg-black/10 bg-black/5"
              aria-label="Next listing"
            >
              <ChevronRight className="w-5 h-5 text-black/70" />
            </button>
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

// Property Card Component
const PropertyCard: React.FC<{ property: PropertyListing }> = ({
  property,
}) => {
  return (
    <div className="bg-black/5 border border-black/10 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:bg-black/10 hover:border-black/20 group h-[45vh] flex flex-col">
      {/* Property Image */}
      <div className="relative h-72 overflow-hidden p-4">
        <img
          src={property.image}
          alt={property.address}
          className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Property Info */}
      <div className="p-4 flex items-center justify-between flex-1">
        <div className="flex-1 pr-3">
          <p
            className="text-black/90 text-2xl md:text-xl lg:text-4xl font-medium leading-snug"
            style={{ fontFamily: "Coconat" }}
          >
            {property.address}
          </p>
        </div>

        {/* Navigation Arrow */}
        <a
          href={property.href}
          className="w-10 h-10 rounded-full border border-black/30 flex items-center justify-center transition-all duration-300 ease-in-out hover:border-black/50 hover:bg-black/10 bg-black/5 flex-shrink-0"
          aria-label={`View ${property.address}`}
        >
          <ArrowUpRight className="w-4 h-4 text-black/70" />
        </a>
      </div>
    </div>
  );
};

export default CuratedListings;
