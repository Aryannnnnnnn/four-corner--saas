"use client";

import { ArrowRight, Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Framer Motion variants - matching exact CSS animations
  const wordAppear = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0
    }
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
        staggerChildren: 0.15
      }
    }
  };

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
    <section className="bg-white py-16 md:py-20 lg:py-24 p-4 md:p-8 lg:p-12 overflow-hidden">
      {/* Main Content Grid */}
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Title and Description */}
          <div className="lg:sticky lg:top-24 space-y-8">
            {/* FAQ Title */}
            <motion.h2
              className="text-center lg:text-left text-[min(2.5rem,7vw)] sm:text-[min(3rem,6vw)] md:text-[min(3.5rem,5vw)] lg:text-[min(52px,4.5vw)] text-[#21266c] leading-[1.1] tracking-[-0.72px]"
              style={{ fontFamily: "Coconat" }}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px", amount: 0.3 }}
            >
              {["Frequently", "Asked", "Questions"].map((word, index) => (
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

            {/* Description */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-black/80 text-lg md:text-xl leading-relaxed mb-6">
                Whether buying, selling, or building, questions arise. We’ve
                answered top inquiries to empower your journey with confidence.
                Need more? Use our contact form, and we’ll reply fast to fuel
                your Vermont dream.
              </p>

              {/* Contact Us Button */}
              <button
                className="group bg-[#21266c] border-2 border-[#21266c] rounded-full px-4 py-1 flex items-center gap-3 transition-all duration-300 ease-out"
                style={{ fontFamily: "Coconat" }}
              >
                {/* Button Content */}
                <span className="py-2 text-white font-medium text-lg">
                  Contact Us
                </span>
                <div className="w-8 h-8 flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </button>
            </motion.div>
          </div>

          {/* Right Side - FAQ Boxes */}
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={`group bg-black/5 border rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out ${
                  expandedIndex === index
                    ? "border-[#21266c]"
                    : "border-black/10"
                }`}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 + 0.8 }}
                onClick={() => handleBoxClick(index)}
              >
                {/* Question Header */}
                <div className="px-[5%] py-6 flex items-center justify-between">
                  <h3
                    className="text-black text-lg md:text-xl font-medium pr-4"
                    style={{ fontFamily: "Coconat" }}
                  >
                    {item.question}
                  </h3>
                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ease-in-out ${
                      expandedIndex === index
                        ? "bg-black/5 border-[#21266c]"
                        : "bg-black/5 border-black/20"
                    }`}
                  >
                    <Plus className={`w-5 h-5 transition-all duration-500 ease-in-out transform ${
                      expandedIndex === index ? "rotate-45 text-[#21266c]" : "rotate-0 text-black/70 group-hover:text-[#21266c]"
                    }`} />
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
                    className={`px-[5%] pb-6 relative transition-all duration-400 ease-out ${
                      expandedIndex === index ? "pt-4" : "pt-0"
                    }`}
                  >
                    {/* Custom border */}
                    <div
                      className={`absolute top-0 left-1/2 -translate-x-1/2 w-[90%] transition-all duration-400 ${
                        expandedIndex === index
                          ? "bg-[#21266c]"
                          : "bg-black/30"
                      }`}
                      style={{ height: '1px' }}
                    ></div>
                    <p
                      className={`text-black/80 text-base md:text-lg leading-relaxed transition-all duration-400 ease-out ${
                        expandedIndex === index
                          ? "transform translate-y-0 opacity-100 delay-100"
                          : "transform translate-y-0 delay-0"
                      }`}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

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
    </section>
  );
};

export default FAQSection;
