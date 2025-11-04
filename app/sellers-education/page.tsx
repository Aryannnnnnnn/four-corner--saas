import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Home,
  DollarSign,
  Sparkles,
  Megaphone,
  HandshakeIcon,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function SellersEducationPage() {
  const educationSections = [
    {
      title: "Preparing to Sell",
      description:
        "Essential repairs, improvements, and prep work to get your home market-ready",
      icon: Home,
      href: "/sellers-education/preparing-to-sell",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Pricing Strategy",
      description:
        "Market analysis, CMA, and competitive pricing strategies for Vermont homes",
      icon: DollarSign,
      href: "/sellers-education/pricing-strategy",
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Staging Tips",
      description:
        "Professional staging advice to maximize appeal and buyer interest",
      icon: Sparkles,
      href: "/sellers-education/staging-tips",
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Marketing Your Home",
      description:
        "Photography, listings, and promotional strategies that get results",
      icon: Megaphone,
      href: "/sellers-education/marketing-your-home",
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Negotiating Offers",
      description:
        "Understanding offers, contingencies, and navigating the path to closing",
      icon: HandshakeIcon,
      href: "/sellers-education/negotiating-offers",
      color: "bg-indigo-50 text-indigo-600",
    },
  ];

  const benefits = [
    "Expert guidance throughout the entire selling process",
    "Vermont-specific market insights and strategies",
    "Maximize your home's value and appeal",
    "Navigate negotiations with confidence",
    "Comprehensive timelines and checklists",
    "Professional tips from experienced agents",
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#21266c] to-[#3b82f6] text-white pt-32 pb-20 sm:pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ fontFamily: "Coconat" }}
            >
              Seller's Education Center
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Expert guidance to help you sell your Vermont home quickly and for
              top dollar
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-[#21266c] px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Get a Free Home Valuation
              </Link>
              <Link
                href="/calculators"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Seller Calculators
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use This Resource */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Your Complete Selling Guide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know to sell your Vermont home with
              confidence and success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Sections Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Explore Selling Topics
            </h2>
            <p className="text-xl text-gray-600">
              Click any section below to learn more
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {educationSections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <Link
                  key={index}
                  href={section.href}
                  className="group bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:border-[#3b82f6]"
                >
                  <div
                    className={`${section.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-[#21266c] mb-3"
                    style={{ fontFamily: "Coconat" }}
                  >
                    {section.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  <div className="flex items-center text-[#3b82f6] font-semibold group-hover:gap-3 gap-2 transition-all">
                    Learn More
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Quick Start Guide
            </h2>
            <p className="text-xl text-gray-600">
              Follow these steps for a successful home sale
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Prepare Your Home",
                description:
                  "Complete necessary repairs, deep clean, and enhance curb appeal",
                link: "/sellers-education/preparing-to-sell",
              },
              {
                step: 2,
                title: "Set the Right Price",
                description:
                  "Work with your agent on a competitive pricing strategy based on market data",
                link: "/sellers-education/pricing-strategy",
              },
              {
                step: 3,
                title: "Stage for Success",
                description:
                  "Arrange furniture, declutter, and create an inviting atmosphere",
                link: "/sellers-education/staging-tips",
              },
              {
                step: 4,
                title: "Market Effectively",
                description:
                  "Professional photos, MLS listing, and multi-channel promotion",
                link: "/sellers-education/marketing-your-home",
              },
              {
                step: 5,
                title: "Navigate Offers",
                description:
                  "Review offers, negotiate terms, and move toward closing",
                link: "/sellers-education/negotiating-offers",
              },
            ].map((item) => (
              <Link
                key={item.step}
                href={item.link}
                className="block bg-white rounded-lg p-6 border border-gray-200 hover:border-[#3b82f6] hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[#21266c] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#21266c] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-[#3b82f6] flex-shrink-0 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#21266c] to-[#3b82f6] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "Coconat" }}
          >
            Ready to Sell Your Vermont Home?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Our experienced team is here to guide you through every step of the
            selling process. Get started with a free home valuation today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-[#21266c] px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg"
            >
              Get Your Free Home Valuation
            </Link>
            <Link
              href="/calculators"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg"
            >
              Try Our Calculators
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
