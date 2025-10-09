"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
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

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "Do you serve clients beyond Vermont?",
      answer:
        "Absolutely. While we specialize in Vermont’s vibrant real estate market, we’re thrilled to collaborate with select clients statewide and beyond, tailoring our expertise to your unique property vision.",
    },
    {
      id: 2,
      question: "What types of properties do you focus on?",
      answer:
        "We excel in showcasing Vermont’s finest residential gems, from luxurious estates and serene private retreats to custom-built dream homes, crafted to elevate your lifestyle.",
    },
    {
      id: 3,
      question: "When should I contact you for a development project?",
      answer:
        "Reach out as early as possible. Early collaboration lets us shape your vision, source premium materials, and deliver a flawless Vermont development project from start to finish.",
    },
    {
      id: 4,
      question: "Are your homes move-in ready?",
      answer:
        "Many of our Vermont listings are turnkey treasures, ready for you to settle in. We also offer properties with renovation potential or custom development options for those craving a personalized masterpiece.",
    },
    {
      id: 5,
      question: "Can I schedule a private home tour?",
      answer:
        "Yes! We prioritize your privacy and offer exclusive private showings by appointment, delivering a tailored Vermont home-buying experience with unmatched care.",
    },
  ];

  const handleBoxClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="bg-white py-16 md:py-20 lg:py-24 p-4 md:p-8 lg:p-12 overflow-hidden"
    >
      {/* Main Content Grid */}
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Title and Description */}
          <div className="lg:sticky lg:top-24 space-y-8">
            {/* FAQ Title */}
            <h2
              className="text-black text-center lg:text-left text-[min(2.5rem,7vw)] sm:text-[min(3rem,6vw)] md:text-[min(3.5rem,5vw)] lg:text-[min(52px,4.5vw)] leading-[1.1] tracking-[-0.72px]"
              style={{ fontFamily: "Coconat" }}
            >
              {["Frequently", "Asked", "Questions"].map((word, index) => (
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

            {/* Description */}
            <div
              className={`opacity-0 ${isVisible ? "animate-fadeInUp" : ""}`}
              style={{
                animationDelay: isVisible ? "0.5s" : "0s",
                animationFillMode: "forwards",
              }}
            >
              <p className="text-black/80 text-lg md:text-xl leading-relaxed mb-6">
                Whether buying, selling, or building, questions arise. We’ve
                answered top inquiries to empower your journey with confidence.
                Need more? Use our contact form, and we’ll reply fast to fuel
                your Vermont dream.
              </p>

              {/* Contact Us Button */}
              <button
                className="group relative overflow-hidden bg-black/10 hover:bg-black/10 border border-black/30 hover:border-black/50 rounded-full px-4 py-1 flex items-center gap-3 transition-all duration-300 ease-out"
                style={{ fontFamily: "Coconat" }}
              >
                {/* Sliding Background */}
                <div className="absolute inset-0 bg-black/20 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>

                {/* Button Content */}
                <span className="relative z-10 text-black font-medium text-lg">
                  Contact Us
                </span>
                <div className="relative z-10 w-8 h-8 flex items-center justify-center transition-colors duration-300">
                  <ArrowRight className="w-6 h-6 text-black/70 group-hover:text-black transition-colors duration-300" />
                </div>
              </button>
            </div>
          </div>

          {/* Right Side - FAQ Boxes */}
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={item.id}
                className={`bg-black/5 border border-black/10 rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out hover:bg-black/10 hover:border-black/20 ${
                  isVisible ? "animate-fadeInUp" : "opacity-0"
                }`}
                style={{
                  animationDelay: isVisible ? `${index * 0.1 + 0.8}s` : "0s",
                  animationFillMode: "forwards",
                }}
                onClick={() => handleBoxClick(index)}
              >
                {/* Question Header */}
                <div className="p-6 flex items-center justify-between">
                  <h3
                    className="text-black text-lg md:text-xl font-medium pr-4"
                    style={{ fontFamily: "Coconat" }}
                  >
                    {item.question}
                  </h3>
                  <div
                    className={`w-10 h-10 rounded-full border border-black/30 flex items-center justify-center transition-all duration-500 ease-in-out transform hover:border-black/50 ${
                      expandedIndex === index
                        ? "rotate-90 bg-black/10"
                        : "rotate-0 bg-black/5"
                    }`}
                  >
                    <ChevronRight className="w-4 h-4 text-black/70 transition-all duration-500 ease-in-out" />
                  </div>
                </div>

                {/* Expandable Answer */}
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
                    className={`px-6 pb-6 border-t border-black/30 transition-all duration-400 ease-out ${
                      expandedIndex === index ? "pt-4" : "pt-0"
                    }`}
                  >
                    <p
                      className={`text-black/80 text-base md:text-lg leading-relaxed transition-all duration-400 ease-out ${
                        expandedIndex === index
                          ? "transform translate-y-0 opacity-100 delay-100"
                          : "transform translate-y-0 opacity-0 delay-0"
                      }`}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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

export default FAQSection;
