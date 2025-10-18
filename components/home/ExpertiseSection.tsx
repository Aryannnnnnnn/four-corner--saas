"use client";

import { ArrowRight } from "lucide-react";
import type React from "react";
import { motion } from "framer-motion";

const ExpertiseSection: React.FC = () => {
  // Framer Motion variants - matching exact CSS animations
  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  const slideRight = {
    hidden: { opacity: 0, width: 0 },
    visible: { opacity: 1, width: "5rem" }
  };

  const wordAppear = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4
      }
    }
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 overflow-hidden relative" style={{ willChange: "transform" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
          {/* Left Side - Images with Creative Layout */}
          <div className="lg:col-span-7 relative">
            {/* Main Large Image */}
            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px", amount: 0.2 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src="https://res.cloudinary.com/dklhvv6mc/image/upload/v1760173041/todd-kent-178j8tJrNlc-unsplash_txkfnv.jpg"
                alt="Vermont Real Estate"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
            </motion.div>

            {/* Floating Small Image - Top Right */}
            <motion.div
              className="absolute -top-8 right-4 lg:right-8 w-48 h-52 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px", amount: 0.1 }}
              transition={{ delay: 0.6 }}
            >
              <img
                src="https://res.cloudinary.com/dklhvv6mc/image/upload/v1760102913/team-1_l8m6i1.png"
                alt="Interior"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating Stats Card - Bottom Left */}
            <motion.div
              className="absolute -bottom-6 left-8 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-[#21266c] text-5xl font-light mb-1" style={{ fontFamily: "Coconat" }}>
                4+
              </div>
              <div className="text-gray-500 text-xs uppercase tracking-wider">
                Years of Excellence
              </div>
            </motion.div>
          </div>

          {/* Right Side - Content with Asymmetric Layout */}
          <div className="lg:col-span-5 space-y-8">
            {/* Decorative Line */}
            <motion.div
              className="w-20 h-1 bg-[#21266c]"
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
            ></motion.div>

            {/* Our Story */}
            <div>
              <motion.h3
                className="text-[#21266c] text-3xl sm:text-4xl lg:text-5xl font-light mb-6 leading-tight"
                style={{ fontFamily: "Coconat" }}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px", amount: 0.3 }}
              >
                {["Our", "Story"].map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-3"
                    variants={wordAppear}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h3>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Since 2017, our founder has been dedicated to serving Vermont's real estate community, specializing in the Bennington area. In 2021, Four Corner Properties was established with a vision to deliver personalized, expert guidance to every client. Within our first year, we successfully closed over 30 properties, establishing ourselves as trusted advisors in Southern Vermont.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Renowned for exceptional service to first-time buyers and sellers, as well as out-of-state clients relocating to Southern Vermont, our team is celebrated for educational support and dedicated guidance throughout every transaction. Deeply rooted in the Bennington community since 2013, we combine local expertise with genuine care to navigate each client toward their real estate goals with confidence and clarity.
              </p>

              <button className="inline-flex items-center gap-2 text-[#21266c] font-semibold text-sm border-b-2 border-[#21266c] pb-1 hover:gap-4 transition-all duration-300"
              onClick={() => window.location.href = "/about"}
              >
                <span>SEE DETAILS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Floating Stats - Staggered */}
            <div className="space-y-6 pt-8">
              <motion.div
                className="flex items-end gap-12"
                variants={fadeInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.6 }}
              >
                <div>
                  <div className="text-[#21266c] text-5xl font-light mb-2" style={{ fontFamily: "Coconat" }}>
                    200+
                  </div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider">
                    Properties<br />Sold
                  </div>
                </div>
                <div>
                  <div className="text-[#21266c] text-5xl font-light mb-2" style={{ fontFamily: "Coconat" }}>
                    100%
                  </div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider">
                    Client<br />Satisfaction
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-50 p-6 rounded-2xl"
                variants={fadeInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-[#21266c] text-4xl font-light mb-3" style={{ fontFamily: "Coconat" }}>
                  $27 Million +
                </div>
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-4">
                  Total Sales Volume
                </div>
                <button
                  onClick={() => window.location.href = "/about"}
                  className="inline-flex items-center gap-2 text-[#21266c] font-semibold text-sm hover:gap-4 transition-all duration-300"
                >
                  <span>EXPLORE MORE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background Element */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#21266c]/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default ExpertiseSection;
