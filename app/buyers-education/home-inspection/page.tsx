"use client";

import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle2, Home, Wrench, Droplets, Zap, Wind, Shield } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function HomeInspectionGuide() {
  const inspectionAreas = [
    {
      title: "Structural Components",
      icon: Home,
      description: "Foundation, framing, walls, and overall structural integrity of the home.",
      checkpoints: [
        "Foundation cracks or settling",
        "Basement moisture or water damage",
        "Floor joists and beam condition",
        "Wall framing and support structures",
        "Attic framing and roof support"
      ]
    },
    {
      title: "Roofing System",
      icon: Shield,
      description: "Roof condition, gutters, downspouts, and ventilation systems.",
      checkpoints: [
        "Shingle condition and remaining life",
        "Flashing around chimneys and vents",
        "Gutter and downspout functionality",
        "Roof ventilation adequacy",
        "Signs of leaks or water damage"
      ]
    },
    {
      title: "Plumbing System",
      icon: Droplets,
      description: "Water supply, drainage, fixtures, and water heater condition.",
      checkpoints: [
        "Water pressure and flow rate",
        "Pipe material and condition",
        "Water heater age and functionality",
        "Drainage system performance",
        "Fixture operation and leaks"
      ]
    },
    {
      title: "Electrical System",
      icon: Zap,
      description: "Service panel, wiring, outlets, and overall electrical safety.",
      checkpoints: [
        "Electrical panel capacity and condition",
        "Wiring type and grounding",
        "GFCI outlets in wet areas",
        "Outlet and switch functionality",
        "Fire hazards or code violations"
      ]
    },
    {
      title: "HVAC Systems",
      icon: Wind,
      description: "Heating, ventilation, and air conditioning equipment and performance.",
      checkpoints: [
        "Furnace age and condition",
        "Air conditioning operation (if applicable)",
        "Ductwork condition and insulation",
        "Thermostat functionality",
        "Filter condition and air quality"
      ]
    },
    {
      title: "Major Appliances",
      icon: Wrench,
      description: "Built-in appliances and their operational status.",
      checkpoints: [
        "Range and oven operation",
        "Dishwasher functionality",
        "Refrigerator (if included)",
        "Washer and dryer connections",
        "Garbage disposal operation"
      ]
    }
  ];

  const redFlags = [
    {
      category: "Critical Issues",
      color: "red",
      items: [
        {
          issue: "Major Foundation Problems",
          description: "Large cracks, significant settling, or bowing walls can cost $10,000-$50,000+ to repair.",
          impact: "May affect structural integrity and home value"
        },
        {
          issue: "Roof Replacement Needed",
          description: "Roofs nearing end of life (15-25 years depending on material) require significant investment.",
          impact: "Expect $8,000-$20,000+ for replacement in Vermont"
        },
        {
          issue: "Electrical Panel Issues",
          description: "Outdated panels (Federal Pacific, Zinsco) or insufficient amperage pose safety risks.",
          impact: "Panel replacement costs $1,500-$4,000"
        },
        {
          issue: "Active Water Damage or Mold",
          description: "Signs of ongoing leaks, moisture problems, or mold growth require immediate attention.",
          impact: "Remediation can cost $500-$10,000+ depending on extent"
        }
      ]
    },
    {
      category: "Moderate Concerns",
      color: "yellow",
      items: [
        {
          issue: "Aging HVAC System",
          description: "Furnaces over 15-20 years old may need replacement soon.",
          impact: "New heating system costs $3,000-$8,000 in Vermont"
        },
        {
          issue: "Plumbing Issues",
          description: "Old galvanized pipes, slow drains, or water pressure problems.",
          impact: "Repiping can cost $4,000-$15,000"
        },
        {
          issue: "Windows Need Replacement",
          description: "Single-pane or deteriorating windows affect energy efficiency.",
          impact: "Replacement costs $300-$1,000+ per window"
        },
        {
          issue: "Drainage Problems",
          description: "Poor grading or drainage can lead to foundation and basement issues.",
          impact: "Drainage solutions cost $1,000-$5,000"
        }
      ]
    }
  ];

  const vermontSpecific = [
    {
      title: "Well Water Testing",
      description: "If the property has a well, test for bacteria, nitrates, and other contaminants. Vermont recommends annual testing.",
      cost: "$50-$200 for basic testing"
    },
    {
      title: "Septic System Inspection",
      description: "Many Vermont homes use septic systems. Get a thorough inspection and pumping records. Systems typically need pumping every 3-5 years.",
      cost: "$300-$500 for inspection"
    },
    {
      title: "Radon Testing",
      description: "Vermont has elevated radon levels in many areas. EPA recommends testing all homes. Mitigation systems are effective if levels are high.",
      cost: "$150-$250 for testing, $800-$2,500 for mitigation"
    },
    {
      title: "Oil Tank Inspection",
      description: "Many Vermont homes use oil heat. Check tank condition, age, and location. Underground tanks can be environmental hazards.",
      cost: "$200-$400 for inspection, $1,000-$3,000+ for removal"
    },
    {
      title: "Insulation and Weatherization",
      description: "Critical for Vermont winters. Check attic, wall, and basement insulation. Look for ice dams and heat loss indicators.",
      cost: "Varies widely, $2,000-$10,000+ for improvements"
    },
    {
      title: "Chimney and Fireplace",
      description: "Common in Vermont homes. Ensure chimneys are properly lined, cleaned, and structurally sound.",
      cost: "$100-$300 for cleaning, $300-$1,000+ for inspection and repairs"
    }
  ];

  const inspectionTips = [
    "Attend the inspection in person to ask questions and learn about the home",
    "Take photos and notes during the walkthrough",
    "Don't panic over minor issues - focus on major structural and system problems",
    "Request repair estimates for significant issues to use in negotiations",
    "Consider a re-inspection after repairs are completed",
    "Keep the inspection report for future reference and maintenance planning",
    "Budget for ongoing maintenance - all homes require upkeep"
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#21266c] to-[#3b82f6] pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link href="/buyers-education" className="inline-flex items-center gap-2 text-white hover:text-blue-100 transition-colors mb-8">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Education Center</span>
            </Link>

            {/* Page Header */}
            <div className="text-white">
              <div className="inline-block mb-4">
                <div className="w-12 h-1 bg-white mb-4"></div>
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                  Inspection Guide
                </span>
              </div>

              <h1
                className="mt-6 text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "Coconat" }}
              >
                Home Inspection Guide
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                Know what to expect during your home inspection and learn to identify potential red flags that could affect your purchase decision.
              </p>
            </div>
          </div>
        </section>

        {/* What Inspectors Check Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                What Home Inspectors Check
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A comprehensive home inspection examines all major systems and components of the property. Here's what inspectors typically review.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {inspectionAreas.map((area, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#3b82f6] transition-colors">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center mb-4">
                    <area.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-[#21266c] mb-3">{area.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{area.description}</p>

                  <ul className="space-y-2">
                    {area.checkpoints.map((checkpoint, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{checkpoint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Red Flags Section */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Common Red Flags
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Some issues are more serious than others. Here are the red flags that should give you pause and require careful consideration.
              </p>
            </div>

            <div className="space-y-8">
              {redFlags.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle className={`w-6 h-6 ${category.color === 'red' ? 'text-red-500' : 'text-yellow-500'}`} />
                    <h3 className="text-2xl font-bold text-[#21266c]">{category.category}</h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {category.items.map((item, i) => (
                      <div key={i} className={`bg-white border-l-4 ${category.color === 'red' ? 'border-red-500' : 'border-yellow-500'} rounded-r-xl p-6 shadow-sm`}>
                        <h4 className="text-lg font-bold text-[#21266c] mb-2">{item.issue}</h4>
                        <p className="text-gray-700 mb-3 leading-relaxed">{item.description}</p>
                        <div className={`text-sm font-semibold ${category.color === 'red' ? 'text-red-600' : 'text-yellow-600'}`}>
                          {item.impact}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vermont-Specific Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Vermont-Specific Inspections
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Vermont homes have unique features that require special attention. Don't skip these important inspections.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vermontSpecific.map((item, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-colors">
                  <h3 className="text-xl font-bold text-[#21266c] mb-3">{item.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{item.description}</p>
                  <div className="bg-blue-50 rounded-lg p-3 inline-block">
                    <p className="text-sm font-semibold text-[#3b82f6]">Typical Cost: {item.cost}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inspection Tips Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#21266c] mb-6" style={{ fontFamily: "Coconat" }}>
                Pro Tips for Your Home Inspection
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inspectionTips.map((tip, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <p className="text-gray-700 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cost Perspective Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-[#3b82f6] rounded-2xl p-8 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                Putting Inspection Costs in Perspective
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  A professional home inspection typically costs $300-$600 in Vermont, depending on the size and age of the home. While this may seem expensive, it's a small price compared to the cost of unexpected repairs after purchase.
                </p>
                <p>
                  Consider this: discovering a $10,000 roof problem during inspection gives you negotiating power. You can request repairs, ask for a credit, or walk away if the issues are too severe. Without an inspection, you'd be responsible for the full cost after closing.
                </p>
                <p className="font-semibold text-[#21266c]">
                  The average home inspection uncovers $14,000 worth of issues. Even if you only negotiate half of that, you've saved significantly more than the inspection cost.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-2xl p-8 sm:p-12 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "Coconat" }}>
                Questions About Home Inspections?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Our team can help you understand inspection reports and navigate repair negotiations. We work with trusted Vermont inspectors to ensure you make informed decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#21266c] font-medium text-base rounded-full hover:bg-gray-100 transition-all duration-300"
                >
                  CONTACT US
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/buyers-education"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-medium text-base rounded-full hover:bg-white hover:text-[#21266c] transition-all duration-300"
                >
                  BACK TO EDUCATION
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
