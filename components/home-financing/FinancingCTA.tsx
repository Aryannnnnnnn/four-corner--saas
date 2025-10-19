"use client";

import { motion } from 'framer-motion'
import React from 'react'

const FinancingCTA = () => {

      const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <>
             {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stepVariants}
        >       
          <div className="bg-gradient-to-r from-[#21266c] to-blue-600 p-8 sm:p-12 lg:p-16">
            <h3
              className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-6"
              style={{ fontFamily: "Coconat" }}
            >
              Ready to Get Started?
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Our team of experts is here to guide you through every step of
              your home financing journey.
            </p>
            <motion.button
              onClick={() => (window.location.href = "/contact")}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#21266c] font-medium text-base rounded-full transition-all duration-300 hover:bg-gray-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us Today
            </motion.button>
          </div>
        </motion.div>
    </>
  )
}

export default FinancingCTA