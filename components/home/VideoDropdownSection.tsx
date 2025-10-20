"use client";

import { Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

const VideoDropdownSection: React.FC = () => {
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
    videoUrl: "https://res.cloudinary.com/dklhvv6mc/video/upload/v1760701902/WhatsApp_Video_2025-10-17_at_00.27.56_86064f1f_vmniw2.mp4",
    steps: [
      {
        title: "Pre-qualification",
        description: "Initial step with possible credit check and verbal discussion with lender",
        videoUrl: "https://res.cloudinary.com/dklhvv6mc/video/upload/v1760989361/Pre-qualification_cchblm.mp4"
      },
      {
        title: "Pre-approval",
        description: "Includes credit pull, documentation submission, and loan officer review",
        videoUrl: "https://res.cloudinary.com/dklhvv6mc/video/upload/v1760989358/Pre-approval_tzlnat.mp4"
      },
      {
        title: "Verified approval",
        description: "Additional underwriting team review for enhanced confidence",
        videoUrl: "https://res.cloudinary.com/dklhvv6mc/video/upload/v1760989366/Verified_Approval_lnsdtf.mp4"
      },
      {
        title: "Loan approval/Clear to close",
        description: "Final stage once under contract with completed title and appraisal review",
        videoUrl: "https://res.cloudinary.com/dklhvv6mc/video/upload/v1760989360/Loan_approval_Clear_to_close_yaypax.mp4"
      }
    ]
  };

  const guide2 = {
    id: 2,
    title: "Your Home Buying Journey",
    videoUrl: "https://res.cloudinary.com/dklhvv6mc/video/upload/v1760701904/WhatsApp_Video_2025-10-17_at_00.27.29_8627014d_g2n9yf.mp4",
    steps: [
      {
        title: "Connect with your Four Corner Properties agent",
        description: "Define your goals and timeline",
        videoUrl: "https://res.cloudinary.com/dklhvv6mc/video/upload/v1760988688/Connect_with_your_Four_Corner_Properties_agent_to_define_your_goals_and_timeline_u03547.mp4"
      },
      {
        title: "Secure your verified approval",
        description: "Establish financing and budget parameters",
        videoUrl: "https://res.cloudinary.com/dklhvv6mc/video/upload/v1760988684/Secure_your_verified_approval_to_establish_financing_and_budget_parameters_yu0scc.mp4"
      },
      {
        title: "Begin home search",
        description: "Live and virtual tours to refine your preferences",
        videoUrl: "https://res.cloudinary.com/dklhvv6mc/video/upload/v1760988684/Begin_home_search_with_live_and_virtual_tours_to_refine_your_preferences_idflap.mp4"
      },
      {
        title: "Make an offer",
        description: "Select your property and negotiate contract terms",
        videoUrl: "https://res.cloudinary.com/dklhvv6mc/video/upload/v1760988695/Make_an_offer_on_your_selected_property_and_negotiate_contract_terms_mdqhtv.mp4"
      },
      {
        title: "Finalize loan selection",
        description: "Lock your interest rate after going under contract",
        videoUrl: "https://res.cloudinary.com/dklhvv6mc/video/upload/v1760988686/Final_Loan_Selection_and_Lock_your_Interest_Rate_jzubyx.mp4"
      },
      {
        title: "Complete underwriting process",
        description: "Coordination between lender, attorney, and insurance provider",
        videoUrl: "https://res.cloudinary.com/dklhvv6mc/video/upload/v1760988684/Complete_underwriting_process_with_coordination_between_lender_attorney_and_insurance_provider_vvioem.mp4"
      },
      {
        title: "Receive clear to close",
        description: "Proceed to final signing",
        videoUrl: "https://res.cloudinary.com/dklhvv6mc/video/upload/v1760988692/Receive_clear_to_close_status_and_proceed_to_final_signing_kiouu9.mp4"
      }
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
        <div className="border border-[#21266c] p-8 md:p-16">
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

          {/* Dropdown Steps with Videos */}
          <div className="space-y-4">
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
                      {step.title}
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

                {/* Expandable Content with Video */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    expandedIndex1 === index
                      ? "max-h-[1000px] opacity-100"
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

                    {/* Description Text */}
                    <p
                      className={`text-black/80 text-base md:text-lg leading-relaxed mb-6 transition-all duration-400 ease-out ${
                        expandedIndex1 === index
                          ? "transform translate-y-0 opacity-100 delay-100"
                          : "transform translate-y-0 delay-0"
                      }`}
                    >
                      {step.description}
                    </p>

                    {/* Video Container */}
                    <div
                      className={`relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl bg-gray-100 aspect-[9/16] max-h-[700px] transition-all duration-400 ease-out ${
                        expandedIndex1 === index
                          ? "transform translate-y-0 opacity-100 delay-200"
                          : "transform translate-y-0 delay-0"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {expandedIndex1 === index && (
                        <video
                          src={step.videoUrl}
                          title={step.title}
                          className="w-full h-full object-contain"
                          controls
                          playsInline
                        />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Second Guide - Your Home Buying Journey */}
        <div className="border p-8 md:p-16 border-[#21266c]">
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

          {/* Dropdown Steps with Videos */}
          <div className="space-y-4">
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
                      {step.title}
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

                {/* Expandable Content with Video */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    expandedIndex2 === index
                      ? "max-h-[1000px] opacity-100"
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

                    {/* Description Text */}
                    <p
                      className={`text-black/80 text-base md:text-lg leading-relaxed mb-6 transition-all duration-400 ease-out ${
                        expandedIndex2 === index
                          ? "transform translate-y-0 opacity-100 delay-100"
                          : "transform translate-y-0 delay-0"
                      }`}
                    >
                      {step.description}
                    </p>

                    {/* Video Container */}
                    <div
                      className={`relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl bg-gray-100 aspect-[9/16] max-h-[700px] transition-all duration-400 ease-out ${
                        expandedIndex2 === index
                          ? "transform translate-y-0 opacity-100 delay-200"
                          : "transform translate-y-0 delay-0"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {expandedIndex2 === index && (
                        <video
                          src={step.videoUrl}
                          title={step.title}
                          className="w-full h-full object-contain"
                          controls
                          playsInline
                        />
                      )}
                    </div>
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

export default VideoDropdownSection;
