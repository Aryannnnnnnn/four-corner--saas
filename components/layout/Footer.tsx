"use client";

import { ArrowRight } from "lucide-react";
import type React from "react";
import { useState } from "react";
import Image from "next/image";

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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto_auto_1fr] gap-8 lg:gap-16">
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

          {/* Middle Columns Group - Navigation, Saas, Socials */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 xl:gap-28">
            {/* Navigation */}
            <div className="space-y-4">
              <h4
                className="text-[#21266c] text-lg md:text-xl font-medium"
                style={{ fontFamily: "Coconat" }}
              >
                Navigation
              </h4>

              <nav className="space-y-3" style={{ fontFamily: "Inter" }}>
                <a
                  href="/"
                  className="block text-gray-700 text-base hover:text-[#21266c] transition-colors duration-300"
                >
                  Home
                </a>
                <a
                  href="/about"
                  className="block text-gray-700 text-base hover:text-[#21266c] transition-colors duration-300"
                >
                  About
                </a>
                <a
                  href="/listings"
                  className="block text-gray-700 text-base hover:text-[#21266c] transition-colors duration-300"
                >
                  Check Our Listings
                </a>
                <a
                  href="/success-stories"
                  className="block text-gray-700 text-base hover:text-[#21266c] transition-colors duration-300"
                >
                  Stories
                </a>
                <a
                  href="/contact"
                  className="block text-gray-700 text-base hover:text-[#21266c] transition-colors duration-300"
                >
                  Contact Us
                </a>
              </nav>
            </div>

            {/* Saas */}
            <div className="space-y-4">
              <h4
                className="text-[#21266c] text-lg md:text-xl font-medium"
                style={{ fontFamily: "Coconat" }}
              >
                Saas
              </h4>

              <nav className="space-y-3" style={{ fontFamily: "Inter" }}>
                <a
                  href="/dashboard"
                  className="block text-gray-700 text-base hover:text-[#21266c] transition-colors duration-300"
                >
                  Dashboard
                </a>
              <a
                  href="/analyze-your-property"
                  className="block text-gray-700 text-base hover:text-[#21266c] transition-colors duration-300"
                >
                  Analyze Property
                </a>
                <a
                  href="/list-property"
                  className="block text-gray-700 text-base hover:text-[#21266c] transition-colors duration-300"
                >
                  Sell Your Property
                </a>
                <a
                  href="/search"
                  className="block text-gray-700 text-base hover:text-[#21266c] transition-colors duration-300"
                >
                  Find a home
                </a>
                <a
                  href="/library"
                  className="block text-gray-700 text-base hover:text-[#21266c] transition-colors duration-300"
                >
                  Library
                </a>
                <a
                  href="/library"
                  className="block text-gray-700 text-base hover:text-[#21266c] transition-colors duration-300"
                >
                  Profile
                </a>
                <a
                  href="/library"
                  className="block text-gray-700 text-base hover:text-[#21266c] transition-colors duration-300"
                >
                  Settings
                </a>
                <a
                  href="/"
                  className="block text-gray-700 text-base hover:text-[#21266c] transition-colors duration-300"
                >
                  Help/Tutorials
                </a>
              </nav>
            </div>

            {/* Socials */}
            <div className="space-y-4">
              <h4
                className="text-[#21266c] text-lg md:text-xl font-medium"
                style={{ fontFamily: "Coconat" }}
              >
                Socials
              </h4>

              <div className="space-y-3" style={{ fontFamily: "Inter" }}>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-700 text-base hover:text-[#21266c] transition-colors duration-300"
                >
                  Instagram
                </a>
               <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-700 text-base hover:text-[#21266c] transition-colors duration-300"
                >
                  Facebook
                </a>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-700 text-base hover:text-[#21266c] transition-colors duration-300"
                >
                  LinkedIn Network
                </a>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-700 text-base hover:text-[#21266c] transition-colors duration-300"
                >
                  X.com
                </a>
              </div>
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
            src="/logooo.png"
            alt="Four Corner Properties"
            width={400}
            height={100}
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
