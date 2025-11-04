"use client";

import { ArrowRight } from "lucide-react";
import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    if (process.env.NODE_ENV === "development") {
      console.log("Newsletter signup:", email);
    }
    // TODO: Implement actual newsletter signup logic
    setEmail("");
  };

  return (
    <footer className="bg-white text-black border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="w-[90vw] mx-auto py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-8 lg:gap-12">
          {/* Company Information */}
          <div className="space-y-4">
            <h3
              className="text-xl md:text-2xl text-[#21266c] font-medium mb-3"
              style={{ fontFamily: "Coconat" }}
            >
              Four Corner Properties
            </h3>

            <div className="space-y-2">
              <p className="text-gray-700 text-base leading-relaxed">
                469 Main St., Bennington, VT 05201
              </p>

              <p className="text-gray-700 text-base leading-relaxed">
                (508) 320-9014
              </p>

              <a
                href="mailto:info@fourcornerpropertiesvt.com"
                className="text-gray-700 text-base leading-relaxed hover:text-black transition-colors duration-300"
              >
                info@fourcornerpropertiesvt.com
              </a>
            </div>
          </div>

          {/* Navigation Links Grid - 5 Columns on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* For Buyers */}
            <div className="space-y-4">
              <h4
                className="text-[#21266c] text-lg font-semibold"
                style={{ fontFamily: "Coconat" }}
              >
                For Buyers
              </h4>

              <nav className="space-y-2.5" style={{ fontFamily: "Inter" }}>
                <Link
                  href="/buyers-education"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Buyer's Education Hub
                </Link>
                <Link
                  href="/buyers-education/first-time-buyer"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  First Time Buyer
                </Link>
                <Link
                  href="/buyers-education/understanding-mortgages"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Understanding Mortgages
                </Link>
                <Link
                  href="/buyers-education/vt-homebuyer-programs"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  VT Homebuyer Programs
                </Link>
                <Link
                  href="/buyers-education/vermont-attorney-requirement"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  VT Attorney Requirement
                </Link>
                <Link
                  href="/buyers-education/sample-forms"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Sample Forms
                </Link>
                <Link
                  href="/buyers-education/appraisal-process"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Appraisal Process
                </Link>
                <Link
                  href="/buyers-education/closing-costs"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Closing Costs
                </Link>
                <Link
                  href="/buyers-education/final-walkthrough"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Final Walkthrough
                </Link>
                <Link
                  href="/calculators"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Calculators
                </Link>
              </nav>
            </div>

            {/* For Sellers */}
            <div className="space-y-4">
              <h4
                className="text-[#21266c] text-lg font-semibold"
                style={{ fontFamily: "Coconat" }}
              >
                For Sellers
              </h4>

              <nav className="space-y-2.5" style={{ fontFamily: "Inter" }}>
                <Link
                  href="/sellers-education"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Seller's Education Hub
                </Link>
                <Link
                  href="/sellers-education/preparing-to-sell"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Preparing to Sell
                </Link>
                <Link
                  href="/sellers-education/spir-disclosures"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  SPIR & Disclosures
                </Link>
                <Link
                  href="/sellers-education/pricing-strategy"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Pricing Strategy
                </Link>
                <Link
                  href="/sellers-education/staging-tips"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Staging Tips
                </Link>
                <Link
                  href="/sellers-education/marketing-your-home"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Marketing Your Home
                </Link>
                <Link
                  href="/sellers-education/closing-costs"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Closing Costs
                </Link>
              </nav>
            </div>

            {/* Local Resources */}
            <div className="space-y-4">
              <h4
                className="text-[#21266c] text-lg font-semibold"
                style={{ fontFamily: "Coconat" }}
              >
                Local Resources
              </h4>

              <nav className="space-y-2.5" style={{ fontFamily: "Inter" }}>
                <Link
                  href="/local-resources"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Local Resources Hub
                </Link>
                <Link
                  href="/local-resources/anr-maps"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  ANR Maps & Resources
                </Link>
                <Link
                  href="/local-resources/wastewater-permits"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Wastewater Permits
                </Link>
                <Link
                  href="/local-resources/land-records"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  County Land Records
                </Link>
                <Link
                  href="/act-250-guide"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Act 250 Guide
                </Link>
                <Link
                  href="/contract-glossary"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Contract Glossary
                </Link>
              </nav>
            </div>

            {/* Saas */}
            <div className="space-y-4">
              <h4
                className="text-[#21266c] text-lg font-semibold"
                style={{ fontFamily: "Coconat" }}
              >
                Saas
              </h4>

              <nav className="space-y-2.5" style={{ fontFamily: "Inter" }}>
                <Link
                  href="/dashboard"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Dashboard
                </Link>
                <Link
                  href="/analyze-your-property"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Analyze Property
                </Link>
                <Link
                  href="/list-property"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Sell Your Property
                </Link>
                <Link
                  href="/listings"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Find a Home
                </Link>
                <Link
                  href="/profile"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Settings
                </Link>
              </nav>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4
                className="text-[#21266c] text-lg font-semibold"
                style={{ fontFamily: "Coconat" }}
              >
                Company
              </h4>

              <nav className="space-y-2.5" style={{ fontFamily: "Inter" }}>
                <Link
                  href="/about"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  About
                </Link>
                <Link
                  href="/listings"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Properties
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Contact
                </Link>
                <Link
                  href="/success-stories"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Success Stories
                </Link>
                <Link
                  href="/dashboard"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Dashboard
                </Link>
                <Link
                  href="/analyze-your-property"
                  className="block text-gray-700 text-sm hover:text-[#21266c] transition-colors duration-300"
                >
                  Analyze Property
                </Link>
              </nav>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-6">
            <h4
              className="text-[#21266c] text-lg md:text-xl font-medium"
              style={{ fontFamily: "Coconat" }}
            >
              Let's Discover Your Dream Vermont Home
            </h4>

            <p className="text-gray-700 text-base leading-relaxed">
              Whether you're hunting for the perfect Vermont residence or
              building a bespoke haven from scratch, Four Corner Properties
              delivers a flawless journey. From exquisite real estate to
              tailored development, we transform your vision into a timeless
              reality.
            </p>

            {/* Email Signup Form */}
            <form
              onSubmit={(e) => {
              handleNewsletterSubmit(e);
              // Show toast on submit
              if (typeof window !== "undefined") {
                // Simple toast implementation
                const toast = document.createElement("div");
                toast.textContent = "Email submitted";
                toast.style.position = "fixed";
                toast.style.bottom = "32px";
                toast.style.left = "50%";
                toast.style.transform = "translateX(-50%)";
                toast.style.background = "#222";
                toast.style.color = "#fff";
                toast.style.padding = "12px 24px";
                toast.style.borderRadius = "999px";
                toast.style.fontSize = "1rem";
                toast.style.zIndex = "9999";
                toast.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
                document.body.appendChild(toast);
                setTimeout(() => {
                toast.remove();
                }, 2500);
              }
              }}
              className="mt-6"
            >
              <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full overflow-hidden transition-colors duration-300 focus-within:border-gray-400">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-6 py-3 text-black placeholder-gray-500 text-base focus:outline-none"
                required
              />
              <button
                type="submit"
                className="group p-3 m-1 bg-gray-800 hover:bg-black rounded-full transition-colors duration-300 flex items-center justify-center"
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="border-t border-gray-200"></div>

      {/* Bottom Logo Section */}
      <div className="w-[90vw] mx-auto py-8 md:py-10">
        <div className="text-center">
          <Image
            src="/logooo.jpg"
            alt="Four Corner Properties"
            width={400}
            height={40}
            className="mx-auto"
          />
        </div>
        <div className="mt-4 w-full text-left text-gray-500 text-xs leading-snug px-2">
          <p>
            <span className="font-semibold text-[#21266c] text-lg">© 2025 Four Corner Properties.</span> All Rights Reserved.
          </p>
          <p>
            Powered By <span className="font-semibold text-gray-500">Empire 325 Marketing</span>
          </p>
          <p>
            Four Corner Properties is a licensed real estate brokerage operating in the State of Vermont. We proudly support the principles of the Fair Housing Act and the Equal Opportunity Act. Each transaction is handled in accordance with Vermont Real Estate Commission rules and state regulations.
          </p>
          <p>
            The information provided on this site, including property data and market analyses, is deemed reliable but not guaranteed. All listings and property information are subject to change, errors, omissions, prior sale, or withdrawal without notice. Users are encouraged to verify all property details independently through qualified professionals such as appraisers, surveyors, or inspectors.
          </p>
          <p>
            Our platform also offers property analysis and listing tools for informational purposes only. Use of these tools does not constitute professional advice or establish a client–broker relationship unless expressly agreed to in writing.
          </p>
          <p className="font-medium text-[#21266c] tracking-wide pt-2">
            Fair Housing • Equal Opportunity • Licensed in Vermont
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
