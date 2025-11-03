"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutHero() {
  // Framer Motion variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const fadeInRight = {
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
          <div className="space-y-8">
            {/* Eyebrow */}
            <motion.div
              className="inline-block"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px", amount: 0.3 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="w-12 h-1 bg-[#21266c] mb-4"></div>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-[0.2em]">
                About Four Corner Properties
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-[#21266c] text-5xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-tight"
              style={{ fontFamily: "Coconat" }}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px", amount: 0.3 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Your Vermont{" "}
              <span className="block">Dream Home</span>
              <span className="block">Starts Here</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg sm:text-xl text-gray-600 leading-relaxed"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px", amount: 0.3 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Established in 2021, Four Corner Properties was built on a commitment to simplify real estate for buyers, sellers, and investors alike. From first-time homeowners to seasoned clients relocating to Southern Vermont, we focus on making every transaction seamless and transparent. Our mission is to combine local expertise with genuine care, ensuring every client feels confident and informed at every step.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px", amount: 0.3 }}
              transition={{ delay: 0.8, duration: 0.8 }}
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
            </motion.div>

            {/* Stats */}
            {/* <div
              className={`grid grid-cols-3 gap-6 pt-8 ${
                isVisible ? "animate-fadeInUp" : ""
              }`}
              style={{
                animationDelay: "1s",
                animationFillMode: "forwards",
              }}
            >
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Award className="w-8 h-8 text-[#21266c] mx-auto mb-2" />
                <p className="text-2xl sm:text-3xl font-light text-[#21266c] mb-1" style={{ fontFamily: "Coconat" }}>
                  4+
                </p>
                <p className="text-xs text-gray-600 uppercase tracking-wider">
                  Years
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <Home className="w-8 h-8 text-[#21266c] mx-auto mb-2" />
                <p className="text-2xl sm:text-3xl font-light text-[#21266c] mb-1" style={{ fontFamily: "Coconat" }}>
                  200+
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
            </div> */}
          </div>

          {/* Right Side - Images */}
          <motion.div
            className="relative"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px", amount: 0.2 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Large Image - Top Left */}
              <div className="col-span-2 relative rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://res.cloudinary.com/dklhvv6mc/image/upload/v1762205616/Contemporary-Mountain-Home-Vermont-Cushman-Design-Group-01-1-Kindesign_d074nn.jpg"
                  alt="Vermont Property"
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "16/9" }}
                />
              </div>

              {/* Small Image - Bottom Left */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://res.cloudinary.com/dklhvv6mc/image/upload/v1762206396/Gemini_Generated_Image_g8u6n8g8u6n8g8u6_1_sy7ujy.png"
                  alt="Interior"
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "1/1" }}
                />
              </div>

              {/* Small Image - Bottom Right */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://res.cloudinary.com/dklhvv6mc/image/upload/v1762205517/2b0c9d1f_fgj3p8.avif"
                  alt="Property Detail"
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "1/1" }}
                />
              </div>
            </div>

            {/* Floating Badge */}
            {/* <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                Trusted Since
              </p>
              <p className="text-3xl font-light text-[#21266c]" style={{ fontFamily: "Coconat" }}>
                2021
              </p>
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
