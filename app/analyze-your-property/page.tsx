"use client";

import { Search, Shield, TrendingUp, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function HomePage() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!address.trim()) {
      toast.error("Please enter a property address");
      return;
    }

    setIsAnalyzing(true);

    try {
      // Store address in session storage for analysis page
      sessionStorage.setItem("propertyAddress", address);
      router.push("/analysis");
    } catch (_error) {
      toast.error("Failed to start analysis");
      setIsAnalyzing(false);
    }
  };

  const exampleAddresses = [
    "350 5th Ave, New York, NY 10118",
    "1 Apple Park Way, Cupertino, CA 95014",
    "11 Wall St, New York, NY 10005",
    "1600 Pennsylvania Avenue NW, Washington, DC 20500",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 pt-24 sm:pt-32 pb-12 sm:pb-20">
        <div className="max-w-4xl w-full text-center space-y-6 sm:space-y-8 animate-fade-in">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Real Estate <span className="text-gradient">Analysis</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto px-4">
            AI-powered property analysis platform providing sophisticated
            valuations, market insights, and investment projections for real
            estate professionals.
          </p>

          {/* Search Bar */}
          <div className="glass-card p-2 sm:p-3 max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <div className="flex items-center flex-1 min-w-0">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-luxury-blue ml-3 flex-shrink-0" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
                placeholder="Enter any USA property address..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-400 text-base sm:text-lg px-2 min-w-0"
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="luxury-button shrink-0 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span className="hidden sm:inline">Analyzing...</span>
                  <span className="sm:hidden">Loading</span>
                </span>
              ) : (
                <>
                  <span className="hidden sm:inline">Analyze Property</span>
                  <span className="sm:hidden">Analyze</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Examples */}
          <div className="space-y-3 px-4">
            <p className="text-sm text-white/50">Quick Examples:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {exampleAddresses.map((addr) => (
                <button
                  key={addr}
                  onClick={() => setAddress(addr)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 glass-card border border-white/10 rounded-full text-xs sm:text-sm text-white/70 hover:text-white hover:border-luxury-blue/50 transition-all"
                >
                  <span className="hidden sm:inline">{addr.split(",")[0]}</span>
                  <span className="sm:hidden">
                    {addr.split(",")[0]?.split(" ")[0] || addr.split(",")[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center mb-8 sm:mb-12 lg:mb-16">
            Premium Features
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "AI-Powered Analysis",
                description:
                  "Advanced algorithms analyze property data, market trends, and investment potential in minutes.",
              },
              {
                icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Comprehensive Reports",
                description:
                  "Detailed PDF reports with charts, valuations, comparables, and AI recommendations.",
              },
              {
                icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Real-Time Data",
                description:
                  "Live market data integration with Zillow for accurate, up-to-date property information.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-card p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-luxury-blue/10 rounded-2xl flex items-center justify-center text-luxury-blue mb-4 sm:mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center mb-8 sm:mb-12 lg:mb-16">
            How It Works
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                step: "01",
                title: "Enter Address",
                description: "Input any USA property address",
              },
              {
                step: "02",
                title: "AI Analysis",
                description: "2-3 minute comprehensive analysis",
              },
              {
                step: "03",
                title: "Review Report",
                description: "Interactive charts and insights",
              },
              {
                step: "04",
                title: "Export & Share",
                description: "PDF, email, or save to library",
              },
            ].map((item, index) => (
              <div key={index} className="text-center space-y-3 sm:space-y-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-luxury-blue/10 rounded-full flex items-center justify-center text-luxury-blue font-display text-lg sm:text-2xl font-bold mx-auto">
                  {item.step}
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold">
                  {item.title}
                </h3>
                <p className="text-white/70 text-xs sm:text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
