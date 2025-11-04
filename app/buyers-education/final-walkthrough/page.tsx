"use client";

import React, { useState, useEffect } from "react";
import {
  Clipboard,
  CheckSquare,
  Home,
  AlertTriangle,
  Clock,
  FileText,
  Camera,
  Key,
  Printer,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  TreeDeciduous,
  Zap
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

interface ChecklistItem {
  id: string;
  text: string;
}

interface ChecklistCategory {
  title: string;
  icon: React.ElementType;
  color: string;
  items: ChecklistItem[];
}

export default function FinalWalkthroughPage() {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [totalItems, setTotalItems] = useState(0);
  const [checkedCount, setCheckedCount] = useState(0);

  const checklistCategories: ChecklistCategory[] = [
    {
      title: "Exterior Check",
      icon: Home,
      color: "blue",
      items: [
        { id: "ext-1", text: "Overall condition same as during inspection" },
        { id: "ext-2", text: "No new damage to siding, roof, or foundation" },
        { id: "ext-3", text: "Gutters and downspouts attached and functional" },
        { id: "ext-4", text: "Driveway and walkways in same condition" },
        { id: "ext-5", text: "Lawn, landscaping, and trees not removed" },
        { id: "ext-6", text: "Outbuildings (shed, barn, garage) still present and in same condition" },
        { id: "ext-7", text: "Deck or patio in same condition" },
        { id: "ext-8", text: "Pool/hot tub operational (if included)" },
        { id: "ext-9", text: "Exterior lighting works" },
        { id: "ext-10", text: "No new encroachments or boundary issues" }
      ]
    },
    {
      title: "Interior Check",
      icon: CheckSquare,
      color: "green",
      items: [
        { id: "int-1", text: "All agreed-upon repairs have been completed" },
        { id: "int-2", text: "No new damage to walls, floors, or ceilings" },
        { id: "int-3", text: "All doors open/close and lock properly" },
        { id: "int-4", text: "All windows open/close and lock properly" },
        { id: "int-5", text: "No signs of water damage or leaks" },
        { id: "int-6", text: "No signs of pest infestation" },
        { id: "int-7", text: "Smoke detectors present and functional" },
        { id: "int-8", text: "Carbon monoxide detectors present and functional" },
        { id: "int-9", text: "All light fixtures operational (test every switch)" },
        { id: "int-10", text: "All outlets operational (bring phone charger to test)" },
        { id: "int-11", text: "Appliances included in sale are present" },
        { id: "int-12", text: "Floors clean and in same condition" },
        { id: "int-13", text: "No personal items left behind (unless agreed)" },
        { id: "int-14", text: "Keys, garage door openers, and access codes provided" },
        { id: "int-15", text: "Home clean and 'broom swept'" }
      ]
    },
    {
      title: "Systems & Utilities",
      icon: Zap,
      color: "yellow",
      items: [
        { id: "sys-1", text: "Heating system: Turn on and verify warm air/heat" },
        { id: "sys-2", text: "Air conditioning: Turn on and verify cool air (if season permits)" },
        { id: "sys-3", text: "Hot water: Run hot water in kitchen and bathrooms" },
        { id: "sys-4", text: "Cold water: Check all faucets for proper flow and no leaks" },
        { id: "sys-5", text: "Toilets: Flush all toilets, check for leaks" },
        { id: "sys-6", text: "Showers/tubs: Turn on, check drainage and water pressure" },
        { id: "sys-7", text: "Dishwasher: Run short cycle if possible" },
        { id: "sys-8", text: "Garbage disposal: Turn on and test" },
        { id: "sys-9", text: "Washer/dryer: Run brief cycle if included" },
        { id: "sys-10", text: "Refrigerator/freezer: Verify cold and operational" },
        { id: "sys-11", text: "Stove/oven: Turn on burners and oven" },
        { id: "sys-12", text: "Fireplace: Check for functionality and cleanliness" }
      ]
    },
    {
      title: "Vermont-Specific Items",
      icon: TreeDeciduous,
      color: "green-dark",
      items: [
        { id: "vt-1", text: "Well pump operational and water pressure adequate" },
        { id: "vt-2", text: "Well test results provided (if not done previously)" },
        { id: "vt-3", text: "Septic system: No signs of backup or odor" },
        { id: "vt-4", text: "Septic inspection report review" },
        { id: "vt-5", text: "Oil tank: Check level if included in sale" },
        { id: "vt-6", text: "Oil tank inspection certificate provided (if applicable)" },
        { id: "vt-7", text: "Wood stove/pellet stove: Inspect condition if included" },
        { id: "vt-8", text: "Chimney inspection certificate (if wood heat)" }
      ]
    },
    {
      title: "Documents & Inclusions",
      icon: FileText,
      color: "purple",
      items: [
        { id: "doc-1", text: "All items listed as 'inclusions' in P&S are present" },
        { id: "doc-2", text: "Window treatments (blinds, curtains) per agreement" },
        { id: "doc-3", text: "Light fixtures per agreement (verify none swapped)" },
        { id: "doc-4", text: "Appliances per agreement (verify models match)" },
        { id: "doc-5", text: "Garage door openers (all remotes)" },
        { id: "doc-6", text: "Mailbox key" },
        { id: "doc-7", text: "Instruction manuals for appliances/systems" },
        { id: "doc-8", text: "Warranties for appliances/systems" },
        { id: "doc-9", text: "Utility account information" },
        { id: "doc-10", text: "HOA documents (if applicable)" }
      ]
    }
  ];

  const whatToBring = [
    { icon: Clipboard, text: "This checklist (printed or on phone)" },
    { icon: Zap, text: "Phone charger (to test outlets)" },
    { icon: Camera, text: "Flashlight (to check dark areas)" },
    { icon: Camera, text: "Camera/phone (document any issues)" },
    { icon: FileText, text: "Copy of Purchase & Sale Agreement" },
    { icon: Home, text: "Your real estate agent" },
    { icon: FileText, text: "Pen and notepad" }
  ];

  // Calculate total items and initialize all sections as expanded
  useEffect(() => {
    const total = checklistCategories.reduce((sum, cat) => sum + cat.items.length, 0);
    setTotalItems(total);

    // Initialize all sections as expanded
    const initialExpanded: { [key: string]: boolean } = {};
    checklistCategories.forEach((cat) => {
      initialExpanded[cat.title] = true;
    });
    setExpandedSections(initialExpanded);
  }, []);

  // Update checked count
  useEffect(() => {
    const count = Object.values(checkedItems).filter(Boolean).length;
    setCheckedCount(count);
  }, [checkedItems]);

  const toggleCheckbox = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; border: string; text: string; icon: string } } = {
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-900",
        icon: "bg-gradient-to-br from-blue-500 to-blue-600"
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-900",
        icon: "bg-gradient-to-br from-green-500 to-green-600"
      },
      yellow: {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-900",
        icon: "bg-gradient-to-br from-yellow-500 to-yellow-600"
      },
      "green-dark": {
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        text: "text-emerald-900",
        icon: "bg-gradient-to-br from-emerald-600 to-emerald-700"
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        text: "text-purple-900",
        icon: "bg-gradient-to-br from-purple-500 to-purple-600"
      }
    };
    return colors[color] || colors.blue;
  };

  const progressPercentage = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white print:pt-0">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#21266c] to-[#3b82f6] pt-32 pb-16 sm:pt-40 sm:pb-20 print:hidden">
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
                  Final Steps
                </span>
              </div>

              <h1
                className="mt-6 text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "Coconat" }}
              >
                Your Final Walkthrough Checklist
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                The last chance to verify everything before closing
              </p>
            </div>
          </div>
        </section>

        {/* Progress Bar */}
        <div className="sticky top-0 z-10 bg-white border-b-2 border-gray-200 py-4 print:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Clipboard className="w-5 h-5 text-[#21266c]" />
                <span className="font-semibold text-[#21266c]">
                  Progress: {checkedCount} of {totalItems} items checked
                </span>
              </div>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-[#21266c] text-white rounded-lg hover:bg-[#3b82f6] transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print Checklist</span>
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#21266c] to-[#3b82f6] h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Print Header (only visible when printing) */}
        <div className="hidden print:block text-center py-8 border-b-2 border-gray-300">
          <h1 className="text-3xl font-bold text-[#21266c] mb-2" style={{ fontFamily: "Coconat" }}>
            Final Walkthrough Checklist
          </h1>
          <p className="text-gray-600">Four Corner Real Estate</p>
          <p className="text-sm text-gray-500 mt-2">Property Address: _________________________________</p>
          <p className="text-sm text-gray-500">Date: _______________ Time: _______________</p>
        </div>

        {/* What is Final Walkthrough */}
        <section className="py-16 sm:py-20 bg-white print:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-6" style={{ fontFamily: "Coconat" }}>
                  What Is the Final Walkthrough?
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    The final walkthrough is your <strong>last inspection before closing</strong>, typically conducted 24-48 hours before you sign the papers and receive the keys.
                  </p>
                  <p>
                    This is your opportunity to verify that:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                      <span>The property's condition hasn't changed since your inspection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                      <span>All agreed-upon repairs have been completed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                      <span>Nothing has been removed that was supposed to stay</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckSquare className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                      <span>All systems and appliances are functional</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#21266c] mb-2">Important Note</h3>
                      <p className="text-gray-700 leading-relaxed">
                        This is <strong>NOT a re-inspection</strong>. Major issues should have been identified and resolved earlier in the process. The final walkthrough is to confirm everything is as expected.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#21266c] mb-2">Typical Duration</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Plan for <strong>30-60 minutes</strong> to thoroughly check everything. Don't rush through this important step!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Home className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#21266c] mb-2">Bring Your Agent</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Always bring your real estate agent to the walkthrough. They know what to look for and can help address any issues immediately.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* When to Schedule */}
        <section className="py-16 bg-gray-50 print:py-8 print:bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center" style={{ fontFamily: "Coconat" }}>
              When to Schedule Your Walkthrough
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#21266c] mb-3">Ideal Timing</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Schedule for <strong>24-48 hours before closing</strong>
                </p>
                <p className="text-sm text-gray-600">
                  This gives you the most up-to-date view of the property while still allowing time to address any issues.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#21266c] mb-3">Why Not Sooner?</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Sellers may still be moving out
                </p>
                <p className="text-sm text-gray-600">
                  Going too early means the house won't be in its final condition, and you may miss issues that arise during the move.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#21266c] mb-3">Why Not Later?</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  You need time to address issues
                </p>
                <p className="text-sm text-gray-600">
                  Going too late means you won't have time to resolve problems before closing, which could delay or derail your purchase.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Comprehensive Checklist */}
        <section className="py-16 sm:py-20 bg-white print:py-8 print:page-break-before-always">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 print:mb-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4" style={{ fontFamily: "Coconat" }}>
                The Comprehensive Checklist
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Check each item systematically. Document any issues with photos and notes.
              </p>
            </div>

            <div className="space-y-6 print:space-y-4">
              {checklistCategories.map((category, index) => {
                const colors = getColorClasses(category.color) ?? { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-900', icon: 'bg-gradient-to-br from-blue-500 to-blue-600' };
                const Icon = category.icon;
                const isExpanded = expandedSections[category.title];

                return (
                  <div key={index} className={`border-2 ${colors?.border} rounded-xl overflow-hidden print:border print:border-gray-400`}>
                    <button
                      onClick={() => toggleSection(category.title)}
                      className={`w-full ${colors?.bg} px-6 py-4 flex items-center justify-between hover:opacity-80 transition-opacity print:hidden`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg ${colors?.icon} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className={`text-xl font-bold ${colors?.text}`}>
                            {category.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {category.items.filter(item => checkedItems[item.id]).length} of {category.items.length} checked
                          </p>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className={`w-6 h-6 ${colors?.text}`} />
                      ) : (
                        <ChevronDown className={`w-6 h-6 ${colors?.text}`} />
                      )}
                    </button>

                    {/* Print-only header */}
                    <div className="hidden print:block px-6 py-3 bg-gray-100">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-[#21266c]">
                          {category.title}
                        </h3>
                      </div>
                    </div>

                    {(isExpanded || true) && (
                      <div className={`bg-white px-6 py-4 print:block ${!isExpanded ? 'hidden' : ''}`}>
                        <div className="space-y-3 print:space-y-2">
                          {category.items.map((item) => (
                            <label
                              key={item.id}
                              className="flex items-start gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors print:cursor-default print:hover:bg-white"
                            >
                              <input
                                type="checkbox"
                                checked={checkedItems[item.id] || false}
                                onChange={() => toggleCheckbox(item.id)}
                                className="mt-1 w-5 h-5 text-[#3b82f6] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-0 print:w-4 print:h-4"
                              />
                              <span className={`text-gray-700 leading-relaxed flex-1 ${checkedItems[item.id] ? 'line-through text-gray-400' : ''} print:text-sm`}>
                                {item.text}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* What to Bring */}
        <section className="py-16 bg-gray-50 print:py-8 print:bg-white print:page-break-before-always">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center" style={{ fontFamily: "Coconat" }}>
              What to Bring
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {whatToBring.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-4 flex items-center gap-3 print:border print:border-gray-400 print:p-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0 print:w-8 print:h-8">
                      <Icon className="w-5 h-5 text-white print:w-4 print:h-4" />
                    </div>
                    <p className="text-sm font-medium text-gray-700 print:text-xs">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* If You Find Issues */}
        <section className="py-16 sm:py-20 bg-white print:py-8 print:page-break-before-always">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center" style={{ fontFamily: "Coconat" }}>
              If You Find Issues
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Minor Issues */}
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 print:border print:border-gray-400">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#21266c]">Minor Issues</h3>
                </div>

                <p className="text-gray-700 font-semibold mb-3">
                  Cosmetic problems or easy fixes
                </p>

                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <CheckSquare className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Document with photos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Request cash credit at closing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Typically $100-$500 adjustments</span>
                  </li>
                </ul>

                <div className="bg-white rounded-lg p-4 print:border print:border-gray-300">
                  <p className="text-sm text-gray-600">
                    <strong>Examples:</strong> Scratched paint, missing light bulbs, minor cleaning issues, small dents or marks
                  </p>
                </div>
              </div>

              {/* Major Issues */}
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 print:border print:border-gray-400">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#21266c]">Major Issues</h3>
                </div>

                <p className="text-gray-700 font-semibold mb-3">
                  Systems not working or new damage
                </p>

                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Document thoroughly with photos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Contact your attorney immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Options: Delay closing, escrow funds, seller must repair</span>
                  </li>
                </ul>

                <div className="bg-white rounded-lg p-4 border-2 border-red-400 print:border print:border-red-600">
                  <p className="text-sm font-bold text-red-700">
                    DO NOT close if major systems are non-functional!
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Examples: HVAC not working, plumbing leaks, appliances removed, structural damage
                  </p>
                </div>
              </div>
            </div>

            {/* Issue Resolution Flowchart */}
            <div className="mt-12 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-8 print:border print:border-gray-400 print:bg-white">
              <h3 className="text-2xl font-bold text-[#21266c] mb-6 text-center">Issue Resolution Flowchart</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#21266c] text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div className="bg-white rounded-lg p-4 flex-1 print:border print:border-gray-300">
                    <p className="font-semibold text-gray-800">Discover issue during walkthrough</p>
                  </div>
                </div>

                <div className="ml-4 border-l-2 border-[#21266c] h-6"></div>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#21266c] text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div className="bg-white rounded-lg p-4 flex-1 print:border print:border-gray-300">
                    <p className="font-semibold text-gray-800">Document with photos and detailed notes</p>
                  </div>
                </div>

                <div className="ml-4 border-l-2 border-[#21266c] h-6"></div>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#21266c] text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div className="bg-white rounded-lg p-4 flex-1 print:border print:border-gray-300">
                    <p className="font-semibold text-gray-800">Immediately inform your agent and attorney</p>
                  </div>
                </div>

                <div className="ml-4 border-l-2 border-[#21266c] h-6"></div>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#21266c] text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div className="bg-white rounded-lg p-4 flex-1 print:border print:border-gray-300">
                    <p className="font-semibold text-gray-800">Determine severity: Minor (credit) vs. Major (delay/repair)</p>
                  </div>
                </div>

                <div className="ml-4 border-l-2 border-[#21266c] h-6"></div>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#21266c] text-white flex items-center justify-center font-bold flex-shrink-0">5</div>
                  <div className="bg-white rounded-lg p-4 flex-1 print:border print:border-gray-300">
                    <p className="font-semibold text-gray-800">Negotiate solution with seller through your attorney</p>
                  </div>
                </div>

                <div className="ml-4 border-l-2 border-[#21266c] h-6"></div>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">6</div>
                  <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4 flex-1 print:border print:border-green-600">
                    <p className="font-semibold text-green-800">Resolution achieved - proceed to closing!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Walkthrough Etiquette */}
        <section className="py-16 bg-gray-50 print:py-8 print:bg-white print:page-break-before-always">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center" style={{ fontFamily: "Coconat" }}>
              Final Walkthrough Etiquette
            </h2>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 print:border print:border-gray-400">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <CheckSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Be Respectful</h4>
                    <p className="text-sm text-gray-600">Sellers may still be present or finishing their move. Show courtesy and understanding.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <CheckSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Don't Rearrange Items</h4>
                    <p className="text-sm text-gray-600">Check functionality, but don't move furniture or personal belongings unnecessarily.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <CheckSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Don't Test Systems Excessively</h4>
                    <p className="text-sm text-gray-600">Turn things on/off to verify they work, but don't run equipment for extended periods.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <CheckSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Focus on Condition</h4>
                    <p className="text-sm text-gray-600">This isn't the time for decorating ideas. Stay focused on verifying condition and functionality.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <CheckSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Keep Emotions in Check</h4>
                    <p className="text-sm text-gray-600">Stay professional and objective, even if you're excited or discover issues.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <CheckSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Expect "Clean" Not "Perfect"</h4>
                    <p className="text-sm text-gray-600">Home should be empty and broom-swept, but don't expect white-glove perfection.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* After the Walkthrough */}
        <section className="py-16 bg-white print:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center" style={{ fontFamily: "Coconat" }}>
              After the Walkthrough
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border-2 border-green-200 rounded-xl p-6 print:border print:border-gray-400">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#21266c] mb-2">Sign Off</h3>
                <p className="text-sm text-gray-700">
                  If everything is acceptable, sign the walkthrough form confirming the property's condition.
                </p>
              </div>

              <div className="bg-white border-2 border-yellow-200 rounded-xl p-6 print:border print:border-gray-400">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#21266c] mb-2">Report Issues</h3>
                <p className="text-sm text-gray-700">
                  Immediately notify your attorney and agent of any problems discovered during the walkthrough.
                </p>
              </div>

              <div className="bg-white border-2 border-blue-200 rounded-xl p-6 print:border print:border-gray-400">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#21266c] mb-2">Decide Quickly</h3>
                <p className="text-sm text-gray-700">
                  Determine if any issues warrant delaying closing or if they can be resolved with credits.
                </p>
              </div>

              <div className="bg-white border-2 border-purple-200 rounded-xl p-6 print:border print:border-gray-400">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#21266c] mb-2">Proceed Confidently</h3>
                <p className="text-sm text-gray-700">
                  With everything verified, proceed to closing knowing exactly what you're getting.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-6 text-center print:border print:border-gray-400 print:bg-white">
              <p className="text-lg font-semibold text-green-900 mb-2">
                Congratulations! You're Almost Home!
              </p>
              <p className="text-gray-700">
                The final walkthrough is the last major step before closing. Complete it thoroughly, and you'll be ready to receive your keys with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white print:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-2xl p-8 sm:p-12 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "Coconat" }}>
                Questions About Your Final Walkthrough?
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Our experienced agents will accompany you to ensure nothing is missed. We'll help you identify issues and negotiate solutions before closing.
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

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.5in;
            size: letter;
          }

          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .print\\:hidden {
            display: none !important;
          }

          .print\\:block {
            display: block !important;
          }

          .print\\:page-break-before-always {
            page-break-before: always;
          }

          input[type="checkbox"] {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            border: 2px solid #000;
            border-radius: 3px;
            margin-top: 2px;
          }

          input[type="checkbox"]:checked::before {
            content: "✓";
            display: block;
            text-align: center;
            line-height: 12px;
            font-weight: bold;
          }
        }
      `}</style>
    </>
  );
}
