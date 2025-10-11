"use client";

import { Plus } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface ExpertiseItem {
  id: number;
  title: string;
  content: string;
  image: string;
}

const ExpertiseSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
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

  const expertiseItems: ExpertiseItem[] = [
    {
      id: 1,
      title: "Private Property Listings",
      content:
        "Exclusive access to carefully selected properties, handpicked for their design, location, and long-term value.",
      image:
        "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760103377/68ada709a6656f55ea938436-Service-Img_rw4nrv.jpg",
    },
    {
      id: 2,
      title: "Buyer Representation",
      content:
        "Personalized guidance through every stage of the buying process, ensuring a seamless experience from search to closing.",
      image:
        "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760103374/68afe686a8b0e8104f58a45c-Untitled-design-6_zydsft.png",
    },
    {
      id: 3,
      title: "Seller Advisory & Staging",
      content:
        "Strategic positioning, market insight, and professional staging to present each property at its absolute best.",
      image:
        "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760103343/68afe5de92b348d581323a93-Untitled-design-4_hopcuy.png",
    },
    {
      id: 4,
      title: "Market Insights & Valuations",
      content:
        "In-depth market analysis and accurate property valuations to support informed decisions and maximize returns.",
      image:
        "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760103266/68afe75043f22ac1dc01fa9d-Untitled-design-7_dr8s7i.png",
    },
    {
      id: 5,
      title: "Investment Property Guidance",
      content:
        "Expert advice for identifying, acquiring, and managing investment properties with strong growth potential.",
      image:
        "https://res.cloudinary.com/dklhvv6mc/image/upload/v1760103465/68afdae20eb3f0d6726a690c-Untitled-design-3_x4ontk.png",
    },
  ];

  const handleBoxClick = (index: number) => {
    setActiveIndex(index);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="bg-white min-h-screen flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 overflow-hidden"
    >
      {/* Section Heading with HeroSection-style Animation */}
      <div className="mb-16 w-full max-w-[1800px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <h2
          className="text-black text-center lg:max-w-[50%] md:text-left text-[min(2.5rem,7vw)] sm:text-[min(3rem,6vw)] md:text-[min(3.5rem,5vw)] lg:text-[min(52px,4.5vw)] leading-[1.1] tracking-[-0.72px]"
          style={{ fontFamily: "Coconat" }}
        >
          {[
            "Heartfelt",
            "Expertise",
            "for",
            "Vermont's",
            "Finest",
            "Homes",
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

      {/* Main Content Grid */}
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Expandable Boxes */}
          <div className="space-y-4">
            {expertiseItems.map((item, index) => (
              <div
                key={item.id}
                className={`group bg-black/5 border rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out ${
                  expandedIndex === index
                    ? "border-blue-600"
                    : "border-black/10"
                } ${
                  isVisible ? "animate-fadeInUp" : "opacity-0"
                }`}
                style={{
                  animationDelay: isVisible ? `${index * 0.1 + 0.5}s` : "0s",
                  animationFillMode: "forwards",
                }}
                onClick={() => handleBoxClick(index)}
              >
                {/* Box Header */}
                <div className="px-[5%] py-6 flex items-center justify-between">
                  <h3
                    className="text-black text-xl md:text-2xl font-medium pr-4"
                    style={{ fontFamily: "Coconat" }}
                  >
                    {item.title}
                  </h3>
                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ease-in-out ${
                      expandedIndex === index
                        ? "bg-blue-50 border-blue-600"
                        : "bg-black/5 border-black/20 group-hover:border-blue-600 group-hover:bg-blue-50"
                    }`}
                  >
                    <Plus className={`w-5 h-5 transition-all duration-500 ease-in-out transform ${
                      expandedIndex === index ? "rotate-45 text-blue-600" : "rotate-0 text-black/70 group-hover:text-blue-600"
                    }`} />
                  </div>
                </div>

                {/* Expandable Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    expandedIndex === index
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div
                    className={`px-[5%] pb-6 relative transition-all duration-400 ease-out ${
                      expandedIndex === index ? "pt-4" : "pt-0"
                    }`}
                  >
                    {/* Custom border */}
                    <div
                      className={`absolute top-0 left-1/2 -translate-x-1/2 w-[90%] transition-all duration-400 ${
                        expandedIndex === index
                          ? "bg-blue-600"
                          : "bg-black/30"
                      }`}
                      style={{ height: '1px' }}
                    ></div>
                    <p
                      className={`text-black/80 text-base md:text-lg leading-relaxed transition-all duration-400 ease-out ${
                        expandedIndex === index
                          ? "transform translate-y-0 opacity-100 delay-100"
                          : "transform translate-y-0 opacity-0 delay-0"
                      }`}
                    >
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Image Gallery */}
          <div className="lg:sticky lg:top-24">
            <div
              className={`relative w-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ${
                isVisible ? "animate-fadeInRight" : "opacity-0"
              }`}
              style={{
                aspectRatio: "4/3",
                animationDelay: isVisible ? "0.8s" : "0s",
                animationFillMode: "forwards",
              }}
            >
              <img
                src={
                  expertiseItems[activeIndex]?.image ||
                  expertiseItems[0]?.image ||
                  ""
                }
                alt={
                  expertiseItems[activeIndex]?.title ||
                  expertiseItems[0]?.title ||
                  "Expertise image"
                }
                className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
                key={activeIndex} // Force re-render for smooth transitions
              />

              {/* Image Overlay with Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-start p-6"></div>
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

        .animate-fadeInRight {
          animation: fadeInRight 0.6s ease-out both;
        }
      `}</style>
    </section>
  );
};

export default ExpertiseSection;
