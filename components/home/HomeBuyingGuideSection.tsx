"use client";

import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

const HomeBuyingGuideSection: React.FC = () => {
  const [expandedIndex1, setExpandedIndex1] = useState<number | null>(null);
  const [expandedIndex2, setExpandedIndex2] = useState<number | null>(null);

  // Framer Motion variants
  const wordAppear = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
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
        staggerChildren: 0.15,
        duration: 0.6
      }
    }
  };

  const guide1 = {
    id: 1,
    title: "Understanding Mortgage Approval Levels",
    videoUrl: "https://res.cloudinary.com/dklhvv6mc/video/upload/v1760701902/WhatsApp_Video_2025-10-17_at_00.27.56_86064f1f_vmniw2.mp4", // Replace with actual video URL
    steps: [
      "Pre-qualification: Initial step with possible credit check and verbal discussion with lender",
      "Pre-approval: Includes credit pull, documentation submission, and loan officer review",
      "Verified approval: Additional underwriting team review for enhanced confidence",
      "Loan approval/Clear to close: Final stage once under contract with completed title and appraisal review"
    ]
  };

  const guide2 = {
    id: 2,
    title: "Your Home Buying Journey",
    videoUrl: "https://res.cloudinary.com/dklhvv6mc/video/upload/v1760701904/WhatsApp_Video_2025-10-17_at_00.27.29_8627014d_g2n9yf.mp4", // Replace with actual video URL
    steps: [
      "Connect with your Four Corner Properties agent to define your goals and timeline",
      "Secure your verified approval to establish financing and budget parameters",
      "Begin home search with live and virtual tours to refine your preferences",
      "Make an offer on your selected property and negotiate contract terms",
      "Finalize loan selection and lock your interest rate after going under contract",
      "Complete underwriting process with coordination between lender, attorney, and insurance provider",
      "Receive clear to close status and proceed to final signing"
    ]
  };

  const handleBoxClick1 = (index: number) => {
    setExpandedIndex1(expandedIndex1 === index ? null : index);
  };

  const handleBoxClick2 = (index: number) => {
    setExpandedIndex2(expandedIndex2 === index ? null : index);
  };

  return (
    <section className="bg-white py-16 md:py-20 lg:py-24 p-4 md:p-8 lg:p-12 overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 space-y-24">

        {/* Section Title */}
        <motion.h2
          className="text-center lg:text-left text-[#21266c] text-[min(2.5rem,7vw)] sm:text-[min(3rem,6vw)] md:text-[min(3.5rem,5vw)] lg:text-[min(52px,4.5vw)] leading-[1.1] tracking-[-0.72px] mb-16"
          style={{ fontFamily: "Coconat" }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px", amount: 0.3 }}
        >
          {["Your", "Home", "Buying", "Guide"].map((word, index) => (
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

        {/* First Guide - Understanding Mortgage Approval Levels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-[#21266c] p-8 md:p-16 gap-12 lg:gap-16 items-start">
          {/* Left Side - Video */}
          <motion.div
            className="space-y-6"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Video Container */}
            <div className="relative w-auto max-w-full mx-auto rounded-2xl overflow-hidden shadow-xl bg-gray-100 aspect-[9/16] max-h-[700px]">
              <video
                src={guide1.videoUrl}
                title={guide1.title}
                className="w-full h-full object-contain"
                controls
                playsInline
              />
            </div>

            {/* Video Title */}
            <h3
              className="text-[#21266c] text-[min(2rem,6vw)] sm:text-[min(2.5rem,5vw)] md:text-[min(3rem,4.5vw)] lg:text-[min(42px,4vw)] leading-[1.1] tracking-[-0.72px] text-center"
              style={{ fontFamily: "Coconat" }}
            >
              {guide1.title}
            </h3>
          </motion.div>

          {/* Right Side - Dropdown Steps */}
          <div className="space-y-4">
            {/* Section Title */}
            <motion.h2
              className="text-[#21266c] text-[min(2rem,6vw)] sm:text-[min(2.5rem,5vw)] md:text-[min(3rem,4.5vw)] lg:text-[min(42px,4vw)] leading-[1.1] tracking-[-0.72px] mb-8"
              style={{ fontFamily: "Coconat" }}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              Approval Process Steps
            </motion.h2>

            {/* Steps Dropdown */}
            {guide1.steps.map((step, index) => (
              <motion.div
                key={`guide1-${index}`}
                className={`group bg-black/5 border rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out ${
                  expandedIndex1 === index
                    ? "border-[#21266c]"
                    : "border-black/10"
                }`}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 + 0.2 }}
                onClick={() => handleBoxClick1(index)}
              >
                {/* Step Header */}
                <div className="px-[5%] py-6 flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Step Number */}
                    <div className="w-10 h-10 rounded-full bg-[#21266c]/10 border-2 border-[#21266c] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#21266c] font-bold text-lg">
                        {index + 1}
                      </span>
                    </div>
                    <h3
                      className="text-black text-base md:text-lg font-medium pr-4"
                      style={{ fontFamily: "Coconat" }}
                    >
                      {step.split(':')[0]}
                    </h3>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ease-in-out ${
                      expandedIndex1 === index
                        ? "bg-black/5 border-[#21266c]"
                        : "bg-black/5 border-black/20"
                    }`}
                  >
                    <Plus className={`w-5 h-5 transition-all duration-500 ease-in-out transform ${
                      expandedIndex1 === index ? "rotate-45 text-[#21266c]" : "rotate-0 text-black/70 group-hover:text-[#21266c]"
                    }`} />
                  </div>
                </div>

                {/* Expandable Details */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    expandedIndex1 === index
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div
                    className={`px-[5%] pb-6 relative transition-all duration-400 ease-out ${
                      expandedIndex1 === index ? "pt-4" : "pt-0"
                    }`}
                  >
                    {/* Custom border */}
                    <div
                      className={`absolute top-0 left-1/2 -translate-x-1/2 w-[90%] transition-all duration-400 ${
                        expandedIndex1 === index
                          ? "bg-[#21266c]"
                          : "bg-black/30"
                      }`}
                      style={{ height: '1px' }}
                    ></div>
                    <p
                      className={`text-black/80 text-base md:text-lg leading-relaxed transition-all duration-400 ease-out ${
                        expandedIndex1 === index
                          ? "transform translate-y-0 opacity-100 delay-100"
                          : "transform translate-y-0 delay-0"
                      }`}
                    >
                      {step.includes(':') ? step.split(':')[1]?.trim() : step}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Second Guide - Your Home Buying Journey */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border p-8 md:p-16 border-[#21266c] gap-12 lg:gap-16 items-start">
          {/* Left Side - Video */}
          <motion.div
            className="space-y-6"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Video Container */}
            <div className="relative w-auto max-w-full mx-auto rounded-2xl overflow-hidden shadow-xl bg-gray-100 aspect-[9/16] max-h-[700px] mt-16">
              <video
                src={guide2.videoUrl}
                title={guide2.title}
                className="w-full h-full object-contain"
                controls
                playsInline
              />
            </div>

            {/* Video Title */}
            <h3
              className="text-[#21266c] text-[min(2rem,6vw)] sm:text-[min(2.5rem,5vw)] md:text-[min(3rem,4.5vw)] lg:text-[min(42px,4vw)] leading-[1.1] tracking-[-0.72px] text-center"
              style={{ fontFamily: "Coconat" }}
            >
              {guide2.title}
            </h3>
          </motion.div>

          {/* Right Side - Dropdown Steps */}
          <div className="space-y-4">
            {/* Section Title */}
            <motion.h2
              className="text-[#21266c] text-[min(2rem,6vw)] sm:text-[min(2.5rem,5vw)] md:text-[min(3rem,4.5vw)] lg:text-[min(42px,4vw)] leading-[1.1] tracking-[-0.72px] mb-8"
              style={{ fontFamily: "Coconat" }}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              Journey Steps
            </motion.h2>

            {/* Steps Dropdown */}
            {guide2.steps.map((step, index) => (
              <motion.div
                key={`guide2-${index}`}
                className={`group bg-black/5 border rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out ${
                  expandedIndex2 === index
                    ? "border-[#21266c]"
                    : "border-black/10"
                }`}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 + 0.2 }}
                onClick={() => handleBoxClick2(index)}
              >
                {/* Step Header */}
                <div className="px-[5%] py-6 flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Step Number */}
                    <div className="w-10 h-10 rounded-full bg-[#21266c]/10 border-2 border-[#21266c] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#21266c] font-bold text-lg">
                        {index + 1}
                      </span>
                    </div>
                    <h3
                      className="text-black text-base md:text-lg font-medium pr-4"
                      style={{ fontFamily: "Coconat" }}
                    >
                      {step.split(':')[0]}
                    </h3>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ease-in-out ${
                      expandedIndex2 === index
                        ? "bg-black/5 border-[#21266c]"
                        : "bg-black/5 border-black/20"
                    }`}
                  >
                    <Plus className={`w-5 h-5 transition-all duration-500 ease-in-out transform ${
                      expandedIndex2 === index ? "rotate-45 text-[#21266c]" : "rotate-0 text-black/70 group-hover:text-[#21266c]"
                    }`} />
                  </div>
                </div>

                {/* Expandable Details */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    expandedIndex2 === index
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div
                    className={`px-[5%] pb-6 relative transition-all duration-400 ease-out ${
                      expandedIndex2 === index ? "pt-4" : "pt-0"
                    }`}
                  >
                    {/* Custom border */}
                    <div
                      className={`absolute top-0 left-1/2 -translate-x-1/2 w-[90%] transition-all duration-400 ${
                        expandedIndex2 === index
                          ? "bg-[#21266c]"
                          : "bg-black/30"
                      }`}
                      style={{ height: '1px' }}
                    ></div>
                    <p
                      className={`text-black/80 text-base md:text-lg leading-relaxed transition-all duration-400 ease-out ${
                        expandedIndex2 === index
                          ? "transform translate-y-0 opacity-100 delay-100"
                          : "transform translate-y-0 delay-0"
                      }`}
                    >
                      {step.includes(':') ? step.split(':')[1]?.trim() : step}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center space-y-8 pt-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h3
            className="text-[#21266c] text-[min(2rem,6vw)] sm:text-[min(2.5rem,5vw)] md:text-[min(3rem,4.5vw)] lg:text-[min(42px,4vw)] leading-[1.1] tracking-[-0.72px]"
            style={{ fontFamily: "Coconat" }}
          >
            Your Financing Journey Simplified
          </h3>
          <p className="text-black/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            From pre-qualification to final approval, we make mortgage financing straightforward and stress-free. Connect with trusted lenders and explore financing options tailored to your Vermont home purchase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => (window.location.href = "/contact")}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#21266c] border-2 border-[#21266c] text-white font-medium text-base rounded-full transition-all duration-300 hover:bg-[#1a1d52]"
            >
              GET IN TOUCH
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              onClick={() => (window.location.href = "/home-financing")}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-[#21266c] text-[#21266c] font-medium text-base rounded-full transition-all duration-300 hover:bg-[#21266c] hover:text-white"
            >
              EXPLORE FINANCING
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </motion.div>

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

export default HomeBuyingGuideSection;
