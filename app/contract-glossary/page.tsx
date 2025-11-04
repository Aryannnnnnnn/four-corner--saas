"use client";

import { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Search,
  X,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Printer,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// Type definitions
interface GlossaryTerm {
  term: string;
  definition: string;
  category:
    | "Contract"
    | "Financing"
    | "Legal"
    | "Inspection"
    | "Closing"
    | "Vermont-Specific";
  vermontNote?: string;
  relatedTerms?: string[];
}

// Glossary data with 40+ terms
const glossaryTerms: GlossaryTerm[] = [
  // Contract Terms
  {
    term: "Acceptance",
    definition:
      "The formal agreement by the seller to the terms of the buyer's offer, creating a binding contract. In Vermont, acceptance must be communicated to the buyer before the offer expires.",
    category: "Contract",
    relatedTerms: ["Offer", "Counteroffer", "Effective Date"],
  },
  {
    term: "Addendum",
    definition:
      "A document that adds or modifies terms to an existing purchase agreement. Addendums become part of the contract and must be signed by all parties.",
    category: "Contract",
    relatedTerms: ["Amendment", "Purchase Agreement"],
  },
  {
    term: "Amendment",
    definition:
      "A written change or modification to an existing contract after it has been signed by all parties. Unlike an addendum, which adds new terms, an amendment changes existing terms.",
    category: "Contract",
    relatedTerms: ["Addendum", "Purchase Agreement"],
  },
  {
    term: "Contingency",
    definition:
      "A condition in the purchase agreement that must be satisfied before the sale can proceed. Common contingencies include financing, inspection, and appraisal contingencies.",
    category: "Contract",
    relatedTerms: [
      "Due Diligence Period",
      "Home Inspection",
      "Financing Contingency",
    ],
  },
  {
    term: "Counteroffer",
    definition:
      "A response to an offer that proposes different terms, effectively rejecting the original offer and creating a new offer. The original offer is no longer valid once a counteroffer is made.",
    category: "Contract",
    relatedTerms: ["Offer", "Acceptance"],
  },
  {
    term: "Earnest Money Deposit",
    definition:
      "A deposit made by the buyer to demonstrate serious interest in purchasing the property. This money is typically held in escrow and applied toward the down payment at closing.",
    category: "Contract",
    relatedTerms: ["Escrow", "Down Payment", "Closing"],
  },
  {
    term: "Effective Date",
    definition:
      "The date when the purchase agreement becomes a binding contract, typically when the seller accepts the buyer's offer and all parties have signed.",
    category: "Contract",
    relatedTerms: ["Acceptance", "Purchase Agreement"],
  },
  {
    term: "Offer",
    definition:
      "A formal proposal by a buyer to purchase a property at a specified price and terms. The offer includes the purchase price, contingencies, closing date, and other terms.",
    category: "Contract",
    relatedTerms: ["Acceptance", "Counteroffer", "Purchase Agreement"],
  },
  {
    term: "Purchase Agreement",
    definition:
      "The legally binding contract between buyer and seller that outlines all terms and conditions of the real estate transaction, including price, contingencies, and closing date.",
    category: "Contract",
    relatedTerms: [
      "Purchase and Sale Agreement",
      "Offer",
      "Acceptance",
      "Contingency",
    ],
  },
  {
    term: "Purchase and Sale Agreement",
    definition:
      "Another term for the purchase agreement; the comprehensive contract that governs the entire real estate transaction from offer acceptance through closing.",
    category: "Contract",
    relatedTerms: ["Purchase Agreement", "Closing"],
  },

  // Financing Terms
  {
    term: "Amortization",
    definition:
      "The process of paying off a loan through regular payments over time. Each payment includes both principal and interest, with the proportion changing over the loan term.",
    category: "Financing",
    relatedTerms: ["Fixed-Rate Mortgage", "APR"],
  },
  {
    term: "APR (Annual Percentage Rate)",
    definition:
      "The total cost of borrowing expressed as a yearly rate, including interest and fees. APR provides a more complete picture of loan costs than the interest rate alone.",
    category: "Financing",
    relatedTerms: ["Fixed-Rate Mortgage", "Conventional Loan"],
  },
  {
    term: "Appraisal",
    definition:
      "A professional assessment of a property's market value conducted by a licensed appraiser. Lenders require appraisals to ensure the property is worth the loan amount.",
    category: "Financing",
    relatedTerms: ["Loan-to-Value Ratio (LTV)", "Conventional Loan"],
  },
  {
    term: "Conventional Loan",
    definition:
      "A mortgage that is not insured or guaranteed by the federal government. Conventional loans typically require higher credit scores and larger down payments than government-backed loans.",
    category: "Financing",
    relatedTerms: ["FHA Loan", "VA Loan", "Down Payment", "PMI"],
  },
  {
    term: "Down Payment",
    definition:
      "The upfront cash payment made by the buyer, typically expressed as a percentage of the purchase price. Larger down payments often result in better loan terms and lower monthly payments.",
    category: "Financing",
    relatedTerms: [
      "Earnest Money Deposit",
      "Conventional Loan",
      "Loan-to-Value Ratio (LTV)",
    ],
  },
  {
    term: "Escrow",
    definition:
      "A neutral third-party account where funds are held during the transaction. Escrow accounts are also used by lenders to collect and pay property taxes and insurance.",
    category: "Financing",
    relatedTerms: ["Earnest Money Deposit", "Closing Costs"],
  },
  {
    term: "FHA Loan",
    definition:
      "A mortgage insured by the Federal Housing Administration, designed to help buyers with lower credit scores or smaller down payments. FHA loans require mortgage insurance premiums.",
    category: "Financing",
    relatedTerms: ["Conventional Loan", "VA Loan", "Down Payment"],
  },
  {
    term: "Fixed-Rate Mortgage",
    definition:
      "A loan where the interest rate remains constant throughout the entire loan term, providing predictable monthly payments. Common terms are 15, 20, or 30 years.",
    category: "Financing",
    relatedTerms: ["Amortization", "APR"],
  },
  {
    term: "Loan-to-Value Ratio (LTV)",
    definition:
      "The ratio of the loan amount to the appraised value or purchase price of the property, whichever is lower. A lower LTV typically results in better loan terms.",
    category: "Financing",
    relatedTerms: ["Appraisal", "Down Payment", "PMI"],
  },
  {
    term: "Pre-Approval",
    definition:
      "A lender's conditional commitment to loan a specific amount based on verification of the buyer's financial information. Pre-approval is stronger than pre-qualification and demonstrates serious buyer intent.",
    category: "Financing",
    relatedTerms: ["Pre-Qualification"],
  },
  {
    term: "Pre-Qualification",
    definition:
      "An informal estimate of how much a buyer can borrow based on self-reported financial information. Pre-qualification is less rigorous than pre-approval.",
    category: "Financing",
    relatedTerms: ["Pre-Approval"],
  },
  {
    term: "Private Mortgage Insurance (PMI)",
    definition:
      "Insurance required by lenders when the down payment is less than 20% of the home's value. PMI protects the lender if the borrower defaults on the loan.",
    category: "Financing",
    relatedTerms: ["Conventional Loan", "Loan-to-Value Ratio (LTV)"],
  },
  {
    term: "VA Loan",
    definition:
      "A mortgage guaranteed by the Department of Veterans Affairs, available to eligible veterans, active-duty service members, and surviving spouses. VA loans often require no down payment.",
    category: "Financing",
    relatedTerms: ["FHA Loan", "Conventional Loan"],
  },

  // Legal/Title Terms
  {
    term: "Abstract of Title",
    definition:
      "A summarized history of all recorded documents and proceedings related to a property, including deeds, mortgages, liens, and court actions.",
    category: "Legal",
    relatedTerms: ["Chain of Title", "Title Search", "Clear Title"],
  },
  {
    term: "Chain of Title",
    definition:
      "The sequence of historical transfers of title to a property, showing the progression of ownership from the original owner to the current owner.",
    category: "Legal",
    relatedTerms: ["Abstract of Title", "Title Search"],
  },
  {
    term: "Clear Title",
    definition:
      "A title free of liens, encumbrances, or legal questions about property ownership. Clear title is required to complete a real estate transaction.",
    category: "Legal",
    relatedTerms: ["Title Search", "Title Insurance", "Abstract of Title"],
  },
  {
    term: "Closing Statement",
    definition:
      "A detailed accounting of all financial transactions in the real estate sale, showing all credits, debits, and prorations for both buyer and seller.",
    category: "Legal",
    relatedTerms: ["Closing Disclosure", "HUD-1 Settlement Statement"],
  },
  {
    term: "Deed",
    definition:
      "The legal document that transfers ownership of property from seller to buyer. In Vermont, the most common type is a warranty deed, which guarantees clear title.",
    category: "Legal",
    vermontNote:
      "Vermont uses warranty deeds as the standard deed type, providing the highest level of protection to buyers.",
    relatedTerms: ["Clear Title", "Recording Fees"],
  },
  {
    term: "Title Insurance",
    definition:
      "Insurance that protects the buyer and lender against financial loss from defects in the title that were not discovered during the title search.",
    category: "Legal",
    relatedTerms: ["Clear Title", "Title Search", "Abstract of Title"],
  },
  {
    term: "Title Search",
    definition:
      "An examination of public records to confirm a property's legal ownership and identify any liens, encumbrances, or title defects that could affect the sale.",
    category: "Legal",
    relatedTerms: [
      "Abstract of Title",
      "Chain of Title",
      "Clear Title",
      "Title Insurance",
    ],
  },

  // Inspection Terms
  {
    term: "As-Is Condition",
    definition:
      "A sale where the seller makes no repairs and the buyer accepts the property in its current condition. However, buyers can still conduct inspections and may be able to negotiate or walk away based on findings.",
    category: "Inspection",
    relatedTerms: ["Home Inspection", "Due Diligence Period"],
  },
  {
    term: "Due Diligence Period",
    definition:
      "The time frame specified in the contract during which the buyer can conduct inspections, review documents, and investigate the property. The buyer can typically cancel the contract during this period.",
    category: "Inspection",
    relatedTerms: [
      "Home Inspection",
      "Contingency",
      "Radon Testing",
      "Septic Inspection",
    ],
  },
  {
    term: "Home Inspection",
    definition:
      "A professional examination of a property's condition, including structural components, systems, and major appliances. The inspection helps buyers identify potential issues before completing the purchase.",
    category: "Inspection",
    relatedTerms: [
      "Due Diligence Period",
      "As-Is Condition",
      "Contingency",
    ],
  },
  {
    term: "Radon Testing",
    definition:
      "Testing for radon gas, a naturally occurring radioactive gas that can accumulate in homes and pose health risks. Radon testing is particularly important in Vermont due to geological conditions.",
    category: "Inspection",
    vermontNote:
      "Vermont has higher-than-average radon levels due to granite bedrock. The EPA recommends radon testing for all Vermont homes, and mitigation may be necessary if levels exceed 4.0 pCi/L.",
    relatedTerms: ["Home Inspection", "Due Diligence Period"],
  },
  {
    term: "Septic Inspection",
    definition:
      "An inspection of the septic system to assess its condition, capacity, and compliance with local regulations. Essential for properties not connected to municipal sewer systems.",
    category: "Inspection",
    vermontNote:
      "Vermont has strict septic regulations. Many rural properties use septic systems, and inspections must verify compliance with Vermont Department of Environmental Conservation standards.",
    relatedTerms: ["Home Inspection", "Well Water Testing"],
  },
  {
    term: "Well Water Testing",
    definition:
      "Laboratory testing of well water to check for contaminants, bacteria, and water quality. Critical for properties that rely on private wells rather than municipal water.",
    category: "Inspection",
    vermontNote:
      "Many Vermont properties use private wells. Testing should include bacteria, nitrates, arsenic, and other contaminants common in Vermont groundwater.",
    relatedTerms: ["Home Inspection", "Septic Inspection"],
  },

  // Closing Terms
  {
    term: "Closing Costs",
    definition:
      "All fees and expenses paid at closing, beyond the down payment. These include loan origination fees, title insurance, attorney fees, recording fees, and transfer taxes.",
    category: "Closing",
    relatedTerms: [
      "Closing Disclosure",
      "Recording Fees",
      "Transfer Tax",
      "HUD-1 Settlement Statement",
    ],
  },
  {
    term: "Closing Date",
    definition:
      "The date when the property sale is finalized, ownership is transferred, and the buyer receives the keys. The closing date is specified in the purchase agreement.",
    category: "Closing",
    relatedTerms: ["Final Walkthrough", "Closing Disclosure"],
  },
  {
    term: "Closing Disclosure",
    definition:
      "A standardized five-page form that provides final details about the mortgage loan, including terms, projected monthly payments, and all closing costs. Buyers must receive this at least three business days before closing.",
    category: "Closing",
    relatedTerms: ["Closing Costs", "HUD-1 Settlement Statement"],
  },
  {
    term: "Final Walkthrough",
    definition:
      "The buyer's last inspection of the property before closing, typically conducted 24 hours before closing. This ensures the property is in the agreed-upon condition and any negotiated repairs have been completed.",
    category: "Closing",
    relatedTerms: ["Closing Date", "As-Is Condition"],
  },
  {
    term: "HUD-1 Settlement Statement",
    definition:
      "A standard form that itemizes all charges imposed on borrower and seller in a real estate transaction. For most residential purchases, this has been replaced by the Closing Disclosure.",
    category: "Closing",
    relatedTerms: ["Closing Disclosure", "Closing Statement"],
  },
  {
    term: "Recording Fees",
    definition:
      "Fees charged by the county clerk's office to record the deed and mortgage in public records. Recording establishes public notice of property ownership.",
    category: "Closing",
    relatedTerms: ["Deed", "Closing Costs"],
  },
  {
    term: "Transfer Tax",
    definition:
      "A tax imposed by state or local governments when property ownership is transferred from seller to buyer. The tax is calculated as a percentage of the sale price.",
    category: "Closing",
    relatedTerms: ["Vermont Property Transfer Tax", "Closing Costs"],
  },

  // Vermont-Specific Terms
  {
    term: "Act 250",
    definition:
      "Vermont's land use and development law that regulates major subdivisions and developments to protect the environment, historic sites, and natural resources. Projects meeting certain criteria require Act 250 permits.",
    category: "Vermont-Specific",
    vermontNote:
      "Act 250 review is required for developments involving 10+ lots, commercial projects over 10 acres, or developments above 2,500 feet elevation. The permit process can take 6-12 months or longer.",
    relatedTerms: ["Vermont Disclosure Requirements"],
  },
  {
    term: "Current Use Program",
    definition:
      "A Vermont property tax program that reduces property taxes for landowners who keep their land in agricultural, forest, or conservation use. If the land is developed, significant penalties may apply.",
    category: "Vermont-Specific",
    vermontNote:
      "Properties enrolled in Current Use have significantly lower property taxes but come with restrictions on development. Buyers should understand enrollment status and potential change-of-use penalties.",
    relatedTerms: ["Vermont Disclosure Requirements"],
  },
  {
    term: "Vermont Property Transfer Tax",
    definition:
      "A tax of 1.45% of the property sale price, paid at closing. This includes a 1.25% state property transfer tax and a 0.2% state property transfer tax for the Vermont Housing and Conservation Trust Fund.",
    category: "Vermont-Specific",
    vermontNote:
      "Vermont's transfer tax is split between buyer and seller by local custom, though this is negotiable. Some towns impose an additional local option transfer tax.",
    relatedTerms: ["Transfer Tax", "Closing Costs"],
  },
  {
    term: "Vermont Disclosure Requirements",
    definition:
      "Vermont law requires sellers to complete a property disclosure form revealing known defects and conditions. This includes information about water source, septic, hazards, and environmental issues.",
    category: "Vermont-Specific",
    vermontNote:
      "Vermont's Residential Property Disclosure requires sellers to disclose lead paint, radon, water quality, septic system, heating, and structural issues. Sellers must provide this before the buyer makes an offer.",
    relatedTerms: [
      "Act 250",
      "Current Use Program",
      "Radon Testing",
      "Septic Inspection",
    ],
  },
];

// Category badge colors
const categoryColors = {
  Contract: "bg-blue-100 text-blue-700 border-blue-200",
  Financing: "bg-green-100 text-green-700 border-green-200",
  Legal: "bg-purple-100 text-purple-700 border-purple-200",
  Inspection: "bg-orange-100 text-orange-700 border-orange-200",
  Closing: "bg-red-100 text-red-700 border-red-200",
  "Vermont-Specific": "bg-[#21266c] text-white border-[#21266c]",
};

export default function ContractGlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());

  // Filter terms based on search and category
  const filteredTerms = useMemo(() => {
    let terms = glossaryTerms;

    // Filter by category
    if (selectedCategory) {
      terms = terms.filter((term) => term.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      terms = terms.filter(
        (term) =>
          term.term.toLowerCase().includes(query) ||
          term.definition.toLowerCase().includes(query) ||
          term.vermontNote?.toLowerCase().includes(query)
      );
    }

    return terms;
  }, [searchQuery, selectedCategory]);

  // Group terms alphabetically
  const groupedTerms = useMemo(() => {
    const groups: { [key: string]: GlossaryTerm[] } = {};

    filteredTerms.forEach((term) => {
      const firstLetter = term.term[0]?.toUpperCase();
      if (!firstLetter) return;
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(term);
    });

    // Sort terms within each group
    Object.keys(groups).forEach((letter) => {
      groups[letter]?.sort((a, b) => a.term.localeCompare(b.term));
    });

    return groups;
  }, [filteredTerms]);

  // Get all unique letters that have terms
  const availableLetters = Object.keys(groupedTerms).sort();

  // Toggle term expansion
  const toggleTerm = (termName: string) => {
    const newExpanded = new Set(expandedTerms);
    if (newExpanded.has(termName)) {
      newExpanded.delete(termName);
    } else {
      newExpanded.add(termName);
    }
    setExpandedTerms(newExpanded);
  };

  // Clear search and filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // All categories
  const categories = [
    "Contract",
    "Financing",
    "Legal",
    "Inspection",
    "Closing",
    "Vermont-Specific",
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#21266c] to-[#3b82f6] text-white pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              style={{ fontFamily: "Coconat" }}
            >
              Real Estate Contract Glossary
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Essential terms and definitions for Vermont real estate
              transactions
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search terms or definitions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Section */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#21266c]" />
              <h2
                className="text-2xl font-bold text-[#21266c]"
                style={{ fontFamily: "Coconat" }}
              >
                {filteredTerms.length} Term
                {filteredTerms.length !== 1 ? "s" : ""}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              {(searchQuery || selectedCategory) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              )}

              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#21266c] hover:bg-[#3b82f6] rounded-lg transition-colors print:hidden"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category ? null : category
                  )
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                  selectedCategory === category
                    ? categoryColors[
                        category as keyof typeof categoryColors
                      ]
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Alphabetical Navigation */}
        {availableLetters.length > 0 && (
          <div className="mb-8 pb-6 border-b border-gray-200">
            <div className="flex flex-wrap gap-2">
              {availableLetters.map((letter) => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-[#21266c] hover:text-white text-gray-700 font-semibold transition-colors"
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Glossary Terms */}
        {availableLetters.length > 0 ? (
          <div className="space-y-12">
            {availableLetters.map((letter) => (
              <div key={letter} id={`letter-${letter}`}>
                <h3
                  className="text-3xl font-bold text-[#21266c] mb-6"
                  style={{ fontFamily: "Coconat" }}
                >
                  {letter}
                </h3>
                <div className="space-y-4">
                  {groupedTerms[letter]?.map((term) => {
                    const isExpanded = expandedTerms.has(term.term);
                    const relatedTermsExist =
                      term.relatedTerms && term.relatedTerms.length > 0;

                    return (
                      <div
                        key={term.term}
                        className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#3b82f6] transition-all shadow-sm hover:shadow-md"
                      >
                        <button
                          onClick={() => toggleTerm(term.term)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-xl font-bold text-gray-900">
                                {term.term}
                              </h4>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                                  categoryColors[term.category as keyof typeof categoryColors]
                                }`}
                              >
                                {term.category}
                              </span>
                            </div>
                            {!isExpanded && (
                              <p className="text-gray-600 text-sm line-clamp-2">
                                {term.definition}
                              </p>
                            )}
                          </div>
                          <div className="ml-4 text-gray-400">
                            {isExpanded ? (
                              <ChevronUp className="w-6 h-6" />
                            ) : (
                              <ChevronDown className="w-6 h-6" />
                            )}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="px-6 pb-6 border-t border-gray-200 pt-4">
                            <p className="text-gray-700 leading-relaxed mb-4">
                              {term.definition}
                            </p>

                            {term.vermontNote && (
                              <div className="bg-blue-50 border-l-4 border-[#21266c] p-4 mb-4">
                                <p className="font-semibold text-[#21266c] mb-2">
                                  Vermont-Specific Information:
                                </p>
                                <p className="text-gray-700 text-sm">
                                  {term.vermontNote}
                                </p>
                              </div>
                            )}

                            {relatedTermsExist && (
                              <div className="mt-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">
                                  Related Terms:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {term.relatedTerms!.map((relatedTerm) => (
                                    <button
                                      key={relatedTerm}
                                      onClick={() => {
                                        // Scroll to the related term
                                        const relatedTermElement =
                                          document.querySelector(
                                            `[data-term="${relatedTerm}"]`
                                          );
                                        if (relatedTermElement) {
                                          relatedTermElement.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                          });
                                          // Expand the related term
                                          setExpandedTerms(
                                            (prev) =>
                                              new Set([...prev, relatedTerm])
                                          );
                                        }
                                      }}
                                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                                    >
                                      {relatedTerm}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        <div data-term={term.term} className="hidden" />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No terms found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-[#21266c] hover:bg-[#3b82f6] text-white rounded-lg font-medium transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#21266c] to-[#3b82f6] rounded-xl p-8 text-white">
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Have Questions?
            </h3>
            <p className="text-blue-100 mb-6">
              Our team is here to help you understand every aspect of your real
              estate transaction. Contact us today for personalized guidance.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#21266c] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-8">
            <h3
              className="text-2xl font-bold text-[#21266c] mb-4"
              style={{ fontFamily: "Coconat" }}
            >
              Learn More
            </h3>
            <p className="text-gray-700 mb-6">
              Explore our educational resources to become a more informed buyer
              or seller in Vermont's real estate market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/buyers-education"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#21266c] text-white rounded-lg font-semibold hover:bg-[#3b82f6] transition-colors"
              >
                Buyer's Guide
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/sellers-education"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#21266c] text-[#21266c] rounded-lg font-semibold hover:bg-[#21266c] hover:text-white transition-colors"
              >
                Seller's Guide
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          header,
          footer,
          .print\\:hidden {
            display: none !important;
          }

          body {
            background: white;
          }

          .break-inside-avoid {
            break-inside: avoid;
          }

          h3 {
            page-break-after: avoid;
          }
        }
      `}</style>
    </div>
  );
}
