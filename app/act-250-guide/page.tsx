"use client";

import {
  Scale,
  Building2,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
  ArrowLeft,
  Mountain,
  Briefcase,
  Users,
  ClipboardCheck,
  FileCheck,
  BookOpen,
  Phone,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useState } from "react";

interface Question {
  id: string;
  question: string;
  type: "yes-no" | "multiple";
  options?: string[];
}

interface DecisionResult {
  status: "likely-required" | "likely-exempt" | "consult-expert";
  title: string;
  description: string;
  recommendations: string[];
}

export default function Act250GuidePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const questions: Question[] = [
    {
      id: "location",
      question: "Is the property located in a town without permanent zoning and subdivision bylaws?",
      type: "yes-no",
    },
    {
      id: "projectType",
      question: "What type of project are you planning?",
      type: "multiple",
      options: ["Residential Development", "Commercial Development", "Mixed Use", "Agricultural", "Other"],
    },
    {
      id: "units",
      question: "How many housing units will the project involve?",
      type: "multiple",
      options: ["1-9 units", "10-49 units", "50+ units"],
    },
    {
      id: "acreage",
      question: "What is the total acreage of the project site?",
      type: "multiple",
      options: ["Less than 1 acre", "1-10 acres", "More than 10 acres"],
    },
    {
      id: "elevation",
      question: "Is any part of the development above 2,500 feet elevation?",
      type: "yes-no",
    },
    {
      id: "municipal",
      question: "Is this a state or municipal project?",
      type: "yes-no",
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    if (!currentQuestion) return;
    setAnswers({ ...answers, [currentQuestion.id]: answer });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleStartOver = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResult(false);
  };

  const calculateResult = (): DecisionResult => {
    // Logic to determine if Act 250 is likely required
    const noZoning = answers.location === "yes";
    const units = answers.units;
    const acreage = answers.acreage;
    const highElevation = answers.elevation === "yes";
    const isMunicipal = answers.municipal === "yes";
    const projectType = answers.projectType;

    // Definite triggers
    if (highElevation) {
      return {
        status: "likely-required",
        title: "Act 250 Permit Likely Required",
        description: "Development above 2,500 feet elevation is subject to Act 250 jurisdiction regardless of other factors.",
        recommendations: [
          "Contact the Vermont Natural Resources Board immediately",
          "Prepare environmental impact documentation",
          "Budget for extended review timeline (6-12 months)",
          "Consider hiring an environmental consultant",
          "Engage with local community early in the process",
        ],
      };
    }

    if (noZoning && units === "10-49 units") {
      return {
        status: "likely-required",
        title: "Act 250 Permit Likely Required",
        description: "In towns without zoning, residential development of 10 or more units triggers Act 250 review.",
        recommendations: [
          "File a jurisdictional opinion request with the District Commission",
          "Prepare comprehensive site plans and environmental assessments",
          "Engage with town planning commission",
          "Budget 6-12 months for the review process",
          "Consider hiring a land use attorney",
        ],
      };
    }

    if (noZoning && units === "50+ units") {
      return {
        status: "likely-required",
        title: "Act 250 Permit Definitely Required",
        description: "Large-scale residential development in towns without zoning requires Act 250 permits.",
        recommendations: [
          "Engage a qualified Act 250 consultant immediately",
          "Prepare for extensive environmental review",
          "Plan for 12-18 month permitting timeline",
          "Budget significant funds for studies and legal fees",
          "Coordinate with state and local agencies",
        ],
      };
    }

    if (projectType === "Commercial Development" && acreage !== "Less than 1 acre") {
      return {
        status: "likely-required",
        title: "Act 250 Permit Likely Required",
        description: "Commercial projects on 1+ acres or with 10+ units/businesses typically require Act 250 review.",
        recommendations: [
          "Request a jurisdictional opinion from the District Commission",
          "Prepare traffic impact studies",
          "Document environmental impacts",
          "Engage with neighboring property owners",
          "Budget for professional environmental and legal consulting",
        ],
      };
    }

    if (isMunicipal) {
      return {
        status: "likely-required",
        title: "Act 250 Permit May Be Required",
        description: "State and municipal projects often trigger Act 250, though exemptions may apply.",
        recommendations: [
          "Consult with the Vermont Natural Resources Board",
          "Review potential exemptions for governmental projects",
          "Prepare environmental documentation as a precaution",
          "Coordinate with relevant state agencies",
        ],
      };
    }

    // Smaller projects or those that don't hit triggers
    if (units === "1-9 units" && acreage === "Less than 1 acre" && !noZoning) {
      return {
        status: "likely-exempt",
        title: "Act 250 Likely Not Required",
        description: "Small-scale residential projects in towns with zoning are typically exempt from Act 250.",
        recommendations: [
          "Confirm exemption status with a jurisdictional inquiry",
          "Comply with local zoning and subdivision regulations",
          "Obtain necessary local permits",
          "Consider voluntary environmental best practices",
        ],
      };
    }

    // Default to consulting an expert
    return {
      status: "consult-expert",
      title: "Consult with an Expert",
      description: "Based on your answers, Act 250 applicability is unclear. Professional consultation is recommended.",
      recommendations: [
        "File a jurisdictional opinion request with the District Commission",
        "Consult with a Vermont land use attorney",
        "Contact the Natural Resources Board for guidance",
        "Review your project details with local planning officials",
        "Consider environmental due diligence regardless of Act 250 status",
      ],
    };
  };

  const result = showResult ? calculateResult() : null;

  const criteria = [
    {
      number: 1,
      title: "Air and Water Pollution",
      description: "Will not cause undue water or air pollution",
    },
    {
      number: 2,
      title: "Water Supply",
      description: "Has sufficient water available for the project",
    },
    {
      number: 3,
      title: "Water Quality",
      description: "Will not cause unreasonable burden on existing water supply",
    },
    {
      number: 4,
      title: "Soil Erosion",
      description: "Will not cause undue soil erosion or danger to life and property",
    },
    {
      number: 5,
      title: "Traffic",
      description: "Will not cause unreasonable congestion or unsafe conditions",
    },
    {
      number: 6,
      title: "Educational Services",
      description: "Will not cause unreasonable burden on educational facilities",
    },
    {
      number: 7,
      title: "Municipal Services",
      description: "Will not place unreasonable burden on municipal services",
    },
    {
      number: 8,
      title: "Aesthetics & Natural Beauty",
      description: "Will not have undue adverse effect on scenic or natural beauty",
    },
    {
      number: 9,
      title: "Historic Sites",
      description: "Is in conformance with local and regional plans",
    },
    {
      number: 10,
      title: "Local & Regional Plans",
      description: "Is in conformance with local and regional development plans",
    },
  ];

  const franklinCountyTowns = [
    { name: "St. Albans City", hasZoning: true },
    { name: "St. Albans Town", hasZoning: true },
    { name: "Swanton", hasZoning: true },
    { name: "Georgia", hasZoning: true },
    { name: "Fairfield", hasZoning: true },
    { name: "Sheldon", hasZoning: true },
    { name: "Highgate", hasZoning: true },
    { name: "Franklin", hasZoning: true },
    { name: "Enosburg", hasZoning: true },
    { name: "Bakersfield", hasZoning: false },
    { name: "Berkshire", hasZoning: true },
    { name: "Montgomery", hasZoning: false },
    { name: "Richford", hasZoning: true },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#21266c] to-[#3b82f6] pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link
              href="/local-resources"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Local Resources
            </Link>

            {/* Page Header */}
            <div className="text-white">
              <div className="inline-block mb-4">
                <div className="w-12 h-1 bg-white mx-auto mb-4"></div>
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                  Vermont Land Use Law
                </span>
              </div>

              <h1
                className="mt-6 text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "Coconat" }}
              >
                Complete Guide to Act 250
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed">
                Vermont's landmark land use and development law. Understand when Act 250 applies, what the review process involves, and how it may impact your real estate transaction or development project.
              </p>
            </div>
          </div>
        </section>

        {/* What is Act 250 Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#21266c]"
                  style={{ fontFamily: "Coconat" }}
                >
                  What is Act 250?
                </h2>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Act 250, enacted in 1970, is Vermont's pioneering land use and development law. It was one of the first comprehensive state-level environmental review processes in the United States, designed to protect Vermont's environment, aesthetics, and natural resources from the impacts of large-scale development.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Why it matters for real estate:</strong> Whether you're buying land to build your dream home, developing a commercial property, or subdividing land for resale, Act 250 can significantly impact your project timeline, costs, and feasibility. Understanding Act 250 is essential for anyone involved in Vermont real estate.
                </p>

                <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
                  <p className="text-gray-800 font-medium mb-2">Key Principle</p>
                  <p className="text-gray-700">
                    Act 250 applies to developments that could have significant environmental, community, or aesthetic impacts. It balances economic development with environmental protection and community character preservation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Decision Tree Section */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4"
                style={{ fontFamily: "Coconat" }}
              >
                Do You Need an Act 250 Permit?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Answer a few questions about your project to get a preliminary assessment. This tool provides guidance only - always consult with professionals for definitive answers.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
              {!showResult ? (
                <>
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Question {currentQuestionIndex + 1} of {questions.length}
                      </span>
                      <span className="text-sm font-medium text-[#3b82f6]">
                        {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#21266c] to-[#3b82f6] transition-all duration-300"
                        style={{
                          width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Question */}
                  {currentQuestion && (
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        {currentQuestion.question}
                      </h3>

                      {/* Answer Options */}
                      <div className="space-y-3">
                        {currentQuestion.type === "yes-no" ? (
                          <>
                            <button
                              onClick={() => handleAnswer("yes")}
                              className="w-full text-left px-6 py-4 border-2 border-gray-200 rounded-xl hover:border-[#3b82f6] hover:bg-blue-50 transition-all duration-200 font-medium text-gray-700 hover:text-[#21266c]"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => handleAnswer("no")}
                              className="w-full text-left px-6 py-4 border-2 border-gray-200 rounded-xl hover:border-[#3b82f6] hover:bg-blue-50 transition-all duration-200 font-medium text-gray-700 hover:text-[#21266c]"
                            >
                              No
                            </button>
                          </>
                        ) : (
                          currentQuestion.options?.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleAnswer(option)}
                              className="w-full text-left px-6 py-4 border-2 border-gray-200 rounded-xl hover:border-[#3b82f6] hover:bg-blue-50 transition-all duration-200 font-medium text-gray-700 hover:text-[#21266c]"
                            >
                              {option}
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  {currentQuestionIndex > 0 && (
                    <button
                      onClick={handleBack}
                      className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous Question
                    </button>
                  )}
                </>
              ) : (
                <>
                  {/* Result Display */}
                  <div className="text-center mb-8">
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                        result?.status === "likely-required"
                          ? "bg-red-100"
                          : result?.status === "likely-exempt"
                          ? "bg-green-100"
                          : "bg-yellow-100"
                      }`}
                    >
                      {result?.status === "likely-required" ? (
                        <AlertCircle className="w-10 h-10 text-red-600" />
                      ) : result?.status === "likely-exempt" ? (
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                      ) : (
                        <FileText className="w-10 h-10 text-yellow-600" />
                      )}
                    </div>

                    <h3
                      className={`text-3xl font-bold mb-4 ${
                        result?.status === "likely-required"
                          ? "text-red-700"
                          : result?.status === "likely-exempt"
                          ? "text-green-700"
                          : "text-yellow-700"
                      }`}
                      style={{ fontFamily: "Coconat" }}
                    >
                      {result?.title}
                    </h3>

                    <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
                      {result?.description}
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      Recommended Next Steps:
                    </h4>
                    <ul className="space-y-3">
                      {result?.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                    <p className="text-sm text-gray-700">
                      <strong>Important:</strong> This tool provides general guidance only and is not a substitute for professional legal advice. Act 250 jurisdiction can be complex and fact-specific. Always consult with a qualified Vermont land use attorney or contact the Natural Resources Board for a definitive jurisdictional opinion.
                    </p>
                  </div>

                  {/* Start Over Button */}
                  <button
                    onClick={handleStartOver}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#21266c] to-[#3b82f6] text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200"
                  >
                    Start Over
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* When Act 250 Applies Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center"
                style={{ fontFamily: "Coconat" }}
              >
                When Does Act 250 Apply?
              </h2>

              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Act 250 jurisdiction is triggered by specific types and scales of development. Here are the main scenarios:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Trigger 1 */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Towns Without Zoning
                      </h3>
                      <p className="text-gray-700 mb-2">
                        Development of <strong>10+ housing units</strong> within a 5-mile radius over any 10-year period.
                      </p>
                      <p className="text-sm text-gray-600">
                        This applies to towns that lack permanent zoning and subdivision bylaws.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trigger 2 */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Commercial Development
                      </h3>
                      <p className="text-gray-700 mb-2">
                        Projects involving <strong>1+ acres</strong> or <strong>10+ units/businesses</strong> within a 5-mile radius over 10 years.
                      </p>
                      <p className="text-sm text-gray-600">
                        Includes retail, office, industrial, and mixed-use projects.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trigger 3 */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                      <Mountain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        High Elevation Development
                      </h3>
                      <p className="text-gray-700 mb-2">
                        Any development above <strong>2,500 feet elevation</strong>.
                      </p>
                      <p className="text-sm text-gray-600">
                        Applies regardless of project size to protect fragile mountain ecosystems.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trigger 4 */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        State & Municipal Projects
                      </h3>
                      <p className="text-gray-700 mb-2">
                        Development by state agencies, municipalities, or involving state land.
                      </p>
                      <p className="text-sm text-gray-600">
                        Some exemptions apply for specific governmental functions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
                <p className="text-gray-800">
                  <strong>Important Note:</strong> These triggers can be complex, and multiple factors may apply to a single project. The 5-mile radius and 10-year lookback period mean that previous developments in the area can affect your project's jurisdiction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Review Process Section */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center"
                style={{ fontFamily: "Coconat" }}
              >
                The Act 250 Review Process
              </h2>

              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Understanding the timeline and steps involved in Act 250 review helps you plan your project effectively.
              </p>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#3b82f6]">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0 text-white font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Jurisdictional Inquiry (Optional but Recommended)
                      </h3>
                      <p className="text-gray-700 mb-2">
                        Submit a request to the District Commission to determine if your project requires an Act 250 permit.
                      </p>
                      <p className="text-sm text-gray-600">
                        Timeline: 2-4 weeks for a response
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#3b82f6]">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0 text-white font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Application Preparation
                      </h3>
                      <p className="text-gray-700 mb-2">
                        Gather required documents: site plans, environmental assessments, traffic studies, stormwater management plans, and evidence of compliance with the 10 criteria.
                      </p>
                      <p className="text-sm text-gray-600">
                        Timeline: 1-3 months depending on project complexity
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#3b82f6]">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0 text-white font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Application Filing
                      </h3>
                      <p className="text-gray-700 mb-2">
                        Submit your application to the appropriate District Commission. The Commission reviews for completeness.
                      </p>
                      <p className="text-sm text-gray-600">
                        Timeline: 1-2 weeks for completeness determination
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#3b82f6]">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0 text-white font-bold">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Public Notice & Comment Period
                      </h3>
                      <p className="text-gray-700 mb-2">
                        Notice is published, and there is a 21-day period for parties to request status or submit written comments.
                      </p>
                      <p className="text-sm text-gray-600">
                        Timeline: 21 days minimum
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#3b82f6]">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0 text-white font-bold">
                      5
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Public Hearing (If Requested)
                      </h3>
                      <p className="text-gray-700 mb-2">
                        If parties request a hearing, the Commission schedules and conducts a public hearing where testimony and evidence are presented.
                      </p>
                      <p className="text-sm text-gray-600">
                        Timeline: 2-4 months from request to hearing completion
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#3b82f6]">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0 text-white font-bold">
                      6
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Commission Decision
                      </h3>
                      <p className="text-gray-700 mb-2">
                        The District Commission issues a written decision granting, denying, or conditionally approving the permit.
                      </p>
                      <p className="text-sm text-gray-600">
                        Timeline: 30-90 days after hearing closes or comment period ends
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 7 */}
                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#3b82f6]">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0 text-white font-bold">
                      7
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Appeal Period
                      </h3>
                      <p className="text-gray-700 mb-2">
                        Any party has 30 days to appeal the decision to the Environmental Division of the Superior Court.
                      </p>
                      <p className="text-sm text-gray-600">
                        Timeline: 30 days; appeals can add 6-12+ months
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                <p className="text-gray-800 font-medium mb-2">
                  Total Timeline Estimate
                </p>
                <p className="text-gray-700">
                  <strong>Without hearing:</strong> 3-6 months<br />
                  <strong>With hearing:</strong> 6-12 months<br />
                  <strong>With appeals:</strong> 12-24+ months
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The 10 Criteria Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center"
                style={{ fontFamily: "Coconat" }}
              >
                The 10 Act 250 Criteria
              </h2>

              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Every Act 250 application is reviewed against these 10 criteria to ensure development is sustainable and appropriate.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {criteria.map((criterion) => (
                  <div
                    key={criterion.number}
                    className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#3b82f6] hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                        {criterion.number}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {criterion.title}
                        </h3>
                        <p className="text-sm text-gray-700">
                          {criterion.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r-lg">
                <p className="text-gray-800">
                  <strong>How It Works:</strong> Your project must demonstrate compliance with all 10 criteria. The burden of proof is on the applicant to show that the project meets each standard. Some criteria require more extensive documentation than others depending on your project type and location.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Exemptions Section */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center"
                style={{ fontFamily: "Coconat" }}
              >
                Common Exemptions
              </h2>

              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Not all development requires Act 250 review. Here are some common exemptions that homebuyers and sellers should know about.
              </p>

              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Single-Family Homes
                      </h3>
                      <p className="text-gray-700">
                        Construction of a single-family home on an existing lot (not created by subdivision) is generally exempt, even in towns without zoning.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Small Subdivisions in Zoned Towns
                      </h3>
                      <p className="text-gray-700">
                        Creating a small number of lots (typically fewer than 10) in a town with permanent zoning and subdivision regulations is usually exempt.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Farming & Forestry Operations
                      </h3>
                      <p className="text-gray-700">
                        Agricultural and forestry operations are generally exempt, including construction of farm buildings and accessory structures necessary for farming.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Replacement & Renovation
                      </h3>
                      <p className="text-gray-700">
                        Replacement of existing structures or renovations that don't substantially change the use, size, or impact of a development may be exempt.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Previously Approved Projects
                      </h3>
                      <p className="text-gray-700">
                        If a property already has an Act 250 permit, certain minor amendments or continuations may not require a new application.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                <p className="text-gray-800">
                  <strong>Note:</strong> There are specific rules, exemptions, and definitions for counting land area and units, so it's always best to consult the Act 250 district coordinator for a formal determination.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Franklin County Specific Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center"
                style={{ fontFamily: "Coconat" }}
              >
                Act 250 in Franklin County
              </h2>

              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Franklin County has a mix of towns with and without zoning bylaws, which significantly affects Act 250 jurisdiction. Here's what you need to know locally.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-[#3b82f6] rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-[#21266c] mb-6">
                  Franklin County Towns - Zoning Status
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {franklinCountyTowns.map((town) => (
                    <div
                      key={town.name}
                      className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200"
                    >
                      <span className="font-medium text-gray-900">{town.name}</span>
                      {town.hasZoning ? (
                        <span className="inline-flex items-center gap-2 text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full">
                          <CheckCircle2 className="w-4 h-4" />
                          Has Zoning
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-sm text-red-700 bg-red-100 px-3 py-1 rounded-full">
                          <AlertCircle className="w-4 h-4" />
                          No Zoning
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    What This Means for Buyers
                  </h4>
                  <p className="text-gray-700 mb-3">
                    If you're purchasing land in a town <strong>without zoning</strong> (like Bakersfield or Montgomery), smaller projects may trigger Act 250 review. Even a 10-unit residential development could require a permit.
                  </p>
                  <p className="text-gray-700">
                    In towns <strong>with zoning</strong>, you have more flexibility for smaller projects, but commercial development and larger subdivisions still may need Act 250 permits.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    Local Considerations
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        <strong>Rural Character:</strong> Franklin County's agricultural and scenic character means aesthetic and land use criteria receive careful scrutiny.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        <strong>Water Resources:</strong> Lake Champlain watershed protections and local water supply issues are important considerations.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        <strong>Community Engagement:</strong> Local planning commissions and residents are actively engaged in development review processes.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-8 text-center"
                style={{ fontFamily: "Coconat" }}
              >
                Resources & Getting Help
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Vermont Natural Resources Board
                      </h3>
                      <p className="text-gray-700 mb-3">
                        The official state agency administering Act 250.
                      </p>
                      <a
                        href="https://nrb.vermont.gov/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-[#21266c] font-medium transition-colors"
                      >
                        Visit Website
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        District Commission Contacts
                      </h3>
                      <p className="text-gray-700 mb-3">
                        Franklin County is in District 6. Contact them for jurisdictional inquiries.
                      </p>
                      <a
                        href="https://nrb.vermont.gov/act250/district-commissions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-[#21266c] font-medium transition-colors"
                      >
                        Find Your District
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                      <ClipboardCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Act 250 Application Forms
                      </h3>
                      <p className="text-gray-700 mb-3">
                        Download official application forms and guidance documents.
                      </p>
                      <a
                        href="https://nrb.vermont.gov/act250/forms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-[#21266c] font-medium transition-colors"
                      >
                        Access Forms
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#21266c] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Vermont Land Use Attorneys
                      </h3>
                      <p className="text-gray-700 mb-3">
                        Find experienced legal counsel for Act 250 matters.
                      </p>
                      <a
                        href="https://www.vtbar.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-[#21266c] font-medium transition-colors"
                      >
                        Find an Attorney
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-xl p-8 text-center text-white">
                <Phone className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "Coconat" }}>
                  Need Personalized Guidance?
                </h3>
                <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                  Four Corner Properties has extensive experience with Act 250 and Vermont land use. We can help you understand how Act 250 may affect your purchase, sale, or development plans.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#21266c] font-medium text-base rounded-full hover:bg-gray-100 transition-all duration-300"
                  >
                    Contact Us Today
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-8 sm:p-12 text-center">
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#21266c] mb-4"
                  style={{ fontFamily: "Coconat" }}
                >
                  Ready to Navigate Vermont Real Estate?
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Whether you need help understanding Act 250, finding the perfect property, or planning your development, Four Corner Properties is here to guide you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#21266c] to-[#3b82f6] text-white font-medium text-base rounded-full hover:shadow-lg transition-all duration-300"
                  >
                    GET IN TOUCH
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/local-resources"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-[#21266c] text-[#21266c] font-medium text-base rounded-full hover:bg-[#21266c] hover:text-white transition-all duration-300"
                  >
                    MORE LOCAL RESOURCES
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
