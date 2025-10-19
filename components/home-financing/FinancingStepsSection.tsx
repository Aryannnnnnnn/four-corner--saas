"use client";

import React from "react";
import { motion } from "framer-motion";
import { DollarSign, FileCheck, PiggyBank } from "lucide-react";

const FinancingStepsSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const steps = [
    {
      id: 1,
      icon: DollarSign,
      title: "Know Your Finances",
      content: "The first step in preparing your finances is to know your budget. Understanding how much you can afford to spend on a home is a big step. Once you've detailed your budget, you'll want to obtain a copy of your credit report and score. Check that all accounts are in good standing and nothing is bringing your score down.",
    },
    {
      id: 2,
      icon: FileCheck,
      title: "Pre-Approved vs. Pre-Qualified",
      content: "It's highly recommended to have a pre-approval or pre-qualification letter from your lender. Clients can opt to work with a digital or human lender. Human lenders are great for clients looking for a personal experience. This type of lender can be popular for those who have complex applications or lower credit scores. Digital lenders are gaining popularity for those who like to apply on their own time and remove any personal influence from their application process.",
      highlight: "The difference between a pre-approval vs. a pre-qualification letter is that a pre-approval is based on information provided to a lender in good faith. Pre-approval letters generally don't include any verification of finances or income. With a pre-qualification letter, your lender has verified the information you've provided and run a thorough credit check.",
    },
    {
      id: 3,
      icon: PiggyBank,
      title: "Saving for a Down Payment",
      content: "The larger the payment you put towards your home initially, the less you'll be paying per month on your mortgage. It's also important not to dump your entire savings into a down payment. The FHA formula says you should prepare to spend up to 31% of your income on a monthly mortgage, and have a debt to income ratio of no higher than 43%. Additional expenses to be prepared for are closing costs, legal fees and expenses, home improvement, and moving costs.",
    },
  ];

  return (
    <section className="bg-white py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-[#21266c] text-4xl sm:text-5xl lg:text-6xl font-light mb-6"
            style={{ fontFamily: "Coconat" }}
            variants={headerVariants}
          >
            Three Essential Steps
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            variants={headerVariants}
          >
            Follow these key steps to secure your home financing with confidence
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <div className="space-y-12 lg:space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stepVariants}
              transition={{ delay: index * 0.2 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Icon Section */}
                <div className="lg:col-span-2 flex lg:justify-end">
                  <div className="w-20 h-20 rounded-2xl bg-[#21266c]/10 flex items-center justify-center">
                    <step.icon className="w-10 h-10 text-[#21266c]" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:col-span-10">
                  {/* Step Number */}
                  <div className="flex items-center gap-4 mb-4">
                    <span
                      className="text-6xl font-light text-[#21266c]"
                      style={{ fontFamily: "Coconat" }}
                    >
                      {step.id.toString().padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-gray-200"></div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-3xl sm:text-4xl font-normal text-[#21266c] mb-6"
                    style={{ fontFamily: "Coconat" }}
                  >
                    {step.title}
                  </h3>

                  {/* Main Content */}
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {step.content}
                  </p>

                  {/* Highlight Box */}
                  {step.highlight && (
                    <div className="bg-blue-50 border-l-4 border-[#21266c] p-6 rounded-r-lg">
                      <p className="text-base text-gray-700 leading-relaxed">
                        <span className="font-semibold text-[#21266c]">
                          Important:{" "}
                        </span>
                        {step.highlight}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinancingStepsSection;
