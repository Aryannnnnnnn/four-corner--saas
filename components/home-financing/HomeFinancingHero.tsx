"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HomeFinancingHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0
    }
  };

  return (
    <section className="relative bg-white pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24 overflow-hidden">
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Eyebrow */}
            <motion.div className="inline-block" variants={itemVariants}>
              <div className="w-12 h-1 bg-[#21266c] mb-4"></div>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-[0.2em]">
                Your Guide to Home Financing
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-[#21266c] text-5xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-tight"
              style={{ fontFamily: "Coconat" }}
              variants={itemVariants}
            >
              Home Financing{" "}
              <span className="block">Basics</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg sm:text-xl text-gray-600 leading-relaxed"
              variants={itemVariants}
            >
              The biggest part of the home buying process is figuring out the home financing basics. Budgeting for buying a new home is always a challenge, but we break it down for you into easy steps.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <button
                onClick={() => (window.location.href = "/contact")}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#21266c] border-2 border-[#21266c] text-white font-medium text-base rounded-full transition-all duration-300"
              >
                SPEAK WITH AN EXPERT
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => (window.location.href = "/listings")}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-[#21266c] text-[#21266c] font-medium text-base rounded-full transition-all duration-300 hover:bg-[#21266c] hover:text-white"
              >
                VIEW LISTINGS
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            className="relative"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80"
                alt="Home Financing"
                className="w-full h-full object-cover"
                style={{ aspectRatio: "4/3" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
