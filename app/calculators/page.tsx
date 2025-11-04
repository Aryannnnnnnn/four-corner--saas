"use client";

import { Calculator, DollarSign, PieChart } from "lucide-react";
import { useState } from "react";
import MortgageCalculator from "@/components/calculators/MortgageCalculator";
import AffordabilityCalculator from "@/components/calculators/AffordabilityCalculator";
import AmortizationCalculator from "@/components/calculators/AmortizationCalculator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type CalculatorType = "mortgage" | "affordability" | "amortization";

export default function CalculatorsPage() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>("mortgage");

  const calculators = [
    {
      id: "mortgage" as CalculatorType,
      name: "Mortgage Payment",
      icon: DollarSign,
      description: "Calculate your monthly mortgage payment including taxes and insurance",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "affordability" as CalculatorType,
      name: "Home Affordability",
      icon: Calculator,
      description: "Determine how much house you can afford based on your income and debts",
      color: "from-[#21266c] to-[#3b82f6]",
    },
    {
      id: "amortization" as CalculatorType,
      name: "Amortization Schedule",
      icon: PieChart,
      description: "View your full loan amortization schedule and payment breakdown",
      color: "from-[#d4af37] to-[#c5a028]",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative pt-32 sm:pt-40 lg:pt-48 pb-12 sm:pb-16 lg:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="text-center mb-12 lg:mb-16">
              <div className="w-12 h-1 bg-[#21266c] mx-auto mb-4"></div>
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-[0.2em]">
                Financial Tools
              </span>
              <h1
                className="mt-6 text-[#21266c] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight"
                style={{ fontFamily: "Coconat" }}
              >
                Mortgage Calculators
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Plan your home purchase with our free, easy-to-use calculators.
                Get instant estimates for payments, affordability, and loan schedules.
              </p>
            </div>

            {/* Calculator Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {calculators.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => setActiveCalculator(calc.id)}
                  className={`group relative p-6 sm:p-8 rounded-lg border-2 transition-all duration-300 ${
                    activeCalculator === calc.id
                      ? "border-[#3b82f6] bg-blue-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-[#21266c] hover:shadow-md"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-16 h-16 rounded-lg bg-gradient-to-br ${calc.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <calc.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#21266c] mb-2">{calc.name}</h3>
                    <p className="text-sm text-gray-600">{calc.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Active Calculator */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 sm:p-8 lg:p-10 shadow-lg">
              {activeCalculator === "mortgage" && <MortgageCalculator />}
              {activeCalculator === "affordability" && <AffordabilityCalculator />}
              {activeCalculator === "amortization" && <AmortizationCalculator />}
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-600 text-center leading-relaxed">
                <strong className="text-[#21266c]">Disclaimer:</strong> These calculators provide estimates only and should not be considered financial advice.
                Actual loan terms, payments, and affordability may vary based on lender requirements, credit score, debt-to-income ratio, and other factors.
                Please consult with a licensed mortgage professional for accurate quotes and personalized guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
