"use client";

import { ArrowRight } from "lucide-react";
import type React from "react";
import { motion } from "framer-motion";

const VermontStorySection: React.FC = () => {
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

  return (
    <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Container with 90vw */}
      <div className="w-[90vw] mx-auto">
        {/* Content Container */}
        <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="max-w-6xl">
            {/* Main Title */}
            <motion.h2
              className="text-white text-left text-[min(3rem,8vw)] sm:text-[min(3.5rem,7vw)] md:text-[min(4rem,6vw)] lg:text-[min(72px,5vw)] leading-[1.1] tracking-[-1px] mb-8"
              style={{ fontFamily: "Coconat" }}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px", amount: 0.3 }}
            >
              {["Your", "Vermont", "Story", "Begins", "Here"].map(
                (word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-4 word-blur-animate"
                    variants={wordAppear}
                    style={{
                      animationDelay: `${index * 0.15}s`
                    }}
                  >
                    {word}
                    {index === 2 ? <br /> : ""}
                  </motion.span>
                ),
              )}
            </motion.h2>

            {/* Description */}
            <motion.div
              className="mb-10"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-white/80 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-5xl">
                Every home is a fresh start. Whether you're seeking the perfect
                Vermont retreat or crafting a custom masterpiece, we guide you
                with local expertise, unwavering care, and a passion for
                excellence. Your next chapter starts now let's make it
                unforgettable.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 1.0 }}
            >
              {/* Contact Us Button - Dark */}
              <button
                className="group relative overflow-hidden bg-transparent border-2 border-white/30 hover:border-white/50 rounded-full px-8 py-4 flex items-center justify-center sm:justify-start gap-3 transition-all duration-300 ease-out min-w-fit"
                style={{ fontFamily: "Coconat" }}
                onClick={() => window.location.href = '/list-property'}
              >
                {/* Sliding Background */}
                <div className="absolute inset-0 bg-white/10 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>

                <span className="relative z-10 text-white font-medium text-lg">
                  Sell Your Property
                </span>
                <div className="relative z-10 w-6 h-6 flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
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
                className="group relative overflow-hidden bg-gradient-to-r from-luxury-blue to-blue-600 rounded-full px-8 py-4 flex items-center justify-center sm:justify-start gap-3 transition-all duration-300 ease-out min-w-fit"
                style={{ fontFamily: "Coconat" }}
                onClick={() => window.location.href = "/contact"}
              >
                {/* Sliding Background for invert effect */}
                <div className="absolute inset-0 bg-white rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>

                <span className="relative z-10 text-white group-hover:text-[#21266c] font-medium text-lg transition-colors duration-300">
                  Book a Call
                </span>
                <div className="relative z-10 w-6 h-6 flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-white group-hover:text-[#21266c] transition-all duration-300 group-hover:translate-x-1" />
                </div>
              </button>
            </motion.div>
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

export default VermontStorySection;
