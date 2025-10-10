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
      <div className="w-[90vw] mx-auto py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Information */}
          <div className="space-y-6">
            <h3
              className="text-black text-xl md:text-2xl font-medium mb-6"
              style={{ fontFamily: "Coconat" }}
            >
              Four Corner Properties
            </h3>

            <div className="space-y-4">
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

            <div className="pt-6 space-y-2">
              <p className="text-gray-600 text-sm">
                © 2025 Four Corner Properties LLC. All Rights Reserved.
              </p>
              <p className="text-gray-600 text-sm">
                Powered By Empire 325 Marketing
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h4
              className="text-black text-lg md:text-xl font-medium"
              style={{ fontFamily: "Coconat" }}
            >
              Navigation
            </h4>

            <nav className="space-y-3">
              <a
                href="/"
                className="block text-gray-700 text-base hover:text-blue-500 transition-colors duration-300"
              >
                Home
              </a>
              <a
                href="/dashboard"
                className="block text-gray-700 text-base hover:text-blue-500 transition-colors duration-300"
              >
                Dashboard
              </a>
              <a
                href="/analyze-your-property"
                className="block text-gray-700 text-base hover:text-blue-500 transition-colors duration-300"
              >
                Analyze Property
              </a>
              <a
                href="/about"
                className="block text-gray-700 text-base hover:text-blue-500 transition-colors duration-300"
              >
                About
              </a>
              <a
                href="/library"
                className="block text-gray-700 text-base hover:text-blue-500 transition-colors duration-300"
              >
                Library
              </a>
              <a
                href="/projects"
                className="block text-gray-700 text-base hover:text-blue-500 transition-colors duration-300"
              >
                Projects
              </a>
              <a
                href="/stories"
                className="block text-gray-700 text-base hover:text-blue-500 transition-colors duration-300"
              >
                Stories
              </a>
              <a
                href="/contact"
                className="block text-gray-700 text-base hover:text-blue-500 transition-colors duration-300"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Socials */}
          <div className="space-y-6">
            <h4
              className="text-black text-lg md:text-xl font-medium"
              style={{ fontFamily: "Coconat" }}
            >
              Socials
            </h4>

            <div className="space-y-3">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-700 text-base hover:text-blue-500 transition-colors duration-300"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-6">
            <h4
              className="text-black text-lg md:text-xl font-medium"
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
            <form onSubmit={handleNewsletterSubmit} className="mt-6">
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
      <div className="w-[90vw] mx-auto py-16 md:py-20">
        <div className="text-center">
          <Image
            src="/logo.png"
            alt="Four Corner Properties"
            width={400}
            height={100}
            className="mx-auto"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
