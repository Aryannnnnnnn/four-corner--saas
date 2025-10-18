"use client";

import { DollarSign, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import LocationAutocomplete from "@/components/ui/LocationAutocomplete";
import Header from "../layout/Header";

interface HeroSectionProps {
  logoPath?: string;
  backgroundImage?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage = "/luxury.jpg",
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");

  // Framer Motion variants - matching exact CSS animations
  const wordVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0
    }
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a location");
      return;
    }

    // Navigate to search page with query params
    const params = new URLSearchParams({
      location: searchQuery.trim(),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...(bedrooms && { bedsMin: bedrooms }),
      ...(bathrooms && { bathsMin: bathrooms }),
    });

    router.push(`/search?${params.toString()}`);
  };

  // Split title into words for animation
  const titleWords = [
    "Where",
    "Your",
    "Dreams",
    "Of",
    "Luxury",
    "Come",
    "To",
    "Life",
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Header />
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `
                url('${backgroundImage}'),
                linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, 0.85) 0%,
                    rgba(0, 0, 0, 0.65) 20%,
                    rgba(16, 21, 37, 0.65) 40%,
                    rgba(16,21,37,0.65) 60%,
                    rgba(0, 0, 0, 0.65) 80%,
                    rgba(0, 0, 0, 0.85) 100%
                )
            `,
          backgroundBlendMode: "overlay",
        }}
      />
      <div className="relative z-10 min-h-screen flex items-end">
        {/* Main Content - Bottom Positioned */}
        <div className="w-full pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="w-full max-w-[1800px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              {/* Left Side - Logo, Title and Links */}
              <div className="lg:col-span-6 xl:col-span-7 space-y-3">
                {/* Title with Custom Settings */}
                <motion.h1
                  className="text-white mb-4 pl-0 pr-0 text-[min(2.8rem,8vw)] sm:text-[min(3.5rem,7vw)] md:text-[min(4.5rem,6vw)] lg:text-[min(96px,5.2vw)] leading-[1.1] tracking-[-0.96px] whitespace-normal break-normal overflow-wrap-normal cursor-default"
                  style={{ fontFamily: "Coconat" }}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {titleWords.map((word, index) => (
                    <motion.span
                      key={index}
                      className="inline-block word-blur-animate"
                      variants={wordVariants}
                      style={{
                        marginRight: index === 3 || index === 7 ? "0" : "0.3em",
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      {word}
                      {index === 3 || index === 7 ? <br /> : ""}
                    </motion.span>
                  ))}
                </motion.h1>

                {/* Links */}
                <div
                  className="flex flex-wrap gap-5 sm:gap-6 md:gap-8 lg:gap-10 pt-2"
                  style={{ fontFamily: "Coconat" }}
                >
                  <motion.a
                    href="#"
                    className="text-white/90 hover:text-white backdrop-blur-3xl drop-shadow-lg rounded-full p-3 transition-colors text-sm sm:text-base md:text-lg font-normal tracking-normal"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.8 }}
                  >
                    Vermont ANR Program
                  </motion.a>
                  <motion.a
                    href="/home-financing"
                    className="text-white/90 hover:text-white backdrop-blur-3xl drop-shadow-lg rounded-full p-3 transition-colors text-sm sm:text-base md:text-lg font-normal tracking-normal"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.9 }}
                  >
                    Home Financing
                  </motion.a>
                  <motion.a
                    href="https://fourcornerpropertiesvt.com/wp-content/uploads/2022/06/How%20to%20use%20VT%20ANR%20Atlas%202020.pdf"
                    target="_blank"
                    className="text-white/90 hover:text-white backdrop-blur-3xl drop-shadow-lg rounded-full p-3 transition-colors text-sm sm:text-base md:text-lg font-normal tracking-normal"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.0 }}
                  >
                    ANR Manual
                  </motion.a>
                </div>
              </div>

              {/* Right Side - Search Form */}
              <motion.div
                className="lg:col-span-6 xl:col-span-5 lg:justify-self-end w-full lg:max-w-xl"
                variants={fadeInUpVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.7 }}
              >
                <div className="bg-black/40 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 shadow-2xl">
                  <div className="space-y-4">
                    {/* Location Search with Autocomplete */}
                    <LocationAutocomplete
                      value={searchQuery}
                      onChange={setSearchQuery}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      placeholder="Enter city, address, or ZIP code"
                      inputClassName="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-base focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/15 transition-all"
                    />

                    {/* Price Range */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 w-4 h-4 z-10" />
                        <input
                          type="number"
                          placeholder="Min Price"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          className="w-full pl-10 pr-3 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/15 transition-all"
                        />
                      </div>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 w-4 h-4 z-10" />
                        <input
                          type="number"
                          placeholder="Max Price"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          className="w-full pl-10 pr-3 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/15 transition-all"
                        />
                      </div>
                    </div>

                    {/* Beds & Baths */}
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/15 transition-all"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 0.75rem center",
                          backgroundSize: "1em 1em",
                        }}
                      >
                        <option value="" className="bg-gray-800">
                          Any Beds
                        </option>
                        <option value="1" className="bg-gray-800">
                          1+ Bed
                        </option>
                        <option value="2" className="bg-gray-800">
                          2+ Beds
                        </option>
                        <option value="3" className="bg-gray-800">
                          3+ Beds
                        </option>
                        <option value="4" className="bg-gray-800">
                          4+ Beds
                        </option>
                        <option value="5" className="bg-gray-800">
                          5+ Beds
                        </option>
                      </select>

                      <select
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/15 transition-all"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 0.75rem center",
                          backgroundSize: "1em 1em",
                        }}
                      >
                        <option value="" className="bg-gray-800">
                          Any Baths
                        </option>
                        <option value="1" className="bg-gray-800">
                          1+ Bath
                        </option>
                        <option value="1.5" className="bg-gray-800">
                          1.5+ Baths
                        </option>
                        <option value="2" className="bg-gray-800">
                          2+ Baths
                        </option>
                        <option value="3" className="bg-gray-800">
                          3+ Baths
                        </option>
                        <option value="4" className="bg-gray-800">
                          4+ Baths
                        </option>
                      </select>
                    </div>

                    {/* Search Button */}
                    <button
                      onClick={handleSearch}
                      className="w-full py-4 bg-gradient-to-r from-luxury-blue to-blue-600 hover:from-luxury-blue/90 hover:to-blue-600/90 text-white rounded-xl font-semibold text-base transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <Search className="w-5 h-5" />
                      Search Properties
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
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
    </div>
  );
};

export default HeroSection;
