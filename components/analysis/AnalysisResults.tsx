"use client";

import {
  AlertTriangle,
  ArrowLeft,
  Bath,
  Bed,
  Building,
  DollarSign,
  Download,
  Home,
  MapPin,
  Maximize,
  Save,
  Share2,
  Sparkles,
  Star,
  TrendingUp,
  Video,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import type { PropertyData } from "@/app/lib/types/index";
import {
  exportToPDF,
  exportToText,
  exportToWord,
} from "@/app/lib/utils/export";
import {
  formatNumber,
  getGradeBgColor,
  getGradeColor,
} from "@/app/lib/utils/format";
import ImageGallery from "@/components/analysis/ImageGallery";
import ROIChart from "@/components/charts/ROIChart";
import ValueProjectionChart from "@/components/charts/ValueProjectionChart";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface AnalysisResultsProps {
  data: PropertyData;
  onViewLibrary: () => void;
  onNewAnalysis: () => void;
  showAutoSaved?: boolean;
  propertyId?: string; // Optional property ID for enhanced PDF export
}

const safeString = (value: any): string => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return String(value);
  if (typeof value === "object") {
    // If it's an object, try to extract meaningful data
    if (Array.isArray(value)) return value.join(", ");
    // If it has a specific property, use it
    if (value.text) return String(value.text);
    if (value.value) return String(value.value);
    if (value.content) return String(value.content);
    // Last resort: return JSON string or empty
    return JSON.stringify(value);
  }
  return String(value);
};

export default function AnalysisResults({
  data,
  onViewLibrary,
  onNewAnalysis,
  showAutoSaved = false,
  propertyId,
}: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "details" | "comparables" | "features" | "environmental"
  >("overview");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: "pdf" | "docx" | "txt") => {
    setIsExporting(true);
    try {
      switch (format) {
        case "pdf":
          if (propertyId) {
            // Use comprehensive property analysis PDF export
            window.open(`/api/properties/${propertyId}/export-pdf`, "_blank");
            toast.success(
              "🔥 Comprehensive PDF report opened! Use Ctrl+P or Cmd+P to save as PDF",
            );
          } else {
            // Fallback to basic PDF export
            await exportToPDF(data);
            toast.success("PDF exported successfully!");
          }
          break;
        case "docx":
          await exportToWord(data);
          toast.success("DOCX exported successfully!");
          break;
        case "txt":
          await exportToText(data);
          toast.success("TXT exported successfully!");
          break;
      }
    } catch (error) {
      console.error("Export error:", error);
      toast.error(`Failed to export ${format.toUpperCase()}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `Property Analysis - ${safeString(data.propertyOverview?.streetAddress) || "Property"}`,
      text: `Check out this property analysis: ${safeString(data.propertyOverview?.fullAddress) || safeString(data.propertyOverview?.streetAddress) || "Property"}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Shared successfully!");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Share error:", error);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      } catch (_error) {
        toast.error("Failed to copy link");
      }
    }
  };

  // Helper functions
  const formatExactPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const displayValue = (value: any, fallback: string = "Not Specified") => {
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      value === "N/A" ||
      value === "Unknown"
    ) {
      return fallback;
    }
    return value;
  };

  // Safe accessors with new structure
  const listPrice = Number(data.propertyOverview?.listPrice) || 0;
  const zestimate = Number(data.propertyOverview?.zestimate) || 0;

  // Debug logging to check received values (development only)
  if (process.env.NODE_ENV === "development") {
    console.log("=== AnalysisResults Debug ===");
    console.log("Full data.propertyOverview:", data.propertyOverview);
    console.log("Extracted listPrice:", listPrice);
    console.log("Raw listPrice from data:", data.propertyOverview?.listPrice);
    console.log("=== Environmental Data Debug ===");
    console.log("Has environmental:", !!data.environmental);
    console.log("Has environmental.flood:", !!data.environmental?.flood);
    console.log("Full environmental data:", data.environmental);
    console.log("rawApiData.propertyDetails.climate:", data.rawApiData?.propertyDetails?.climate);
  }
  const bedrooms = Number(data.propertyOverview?.bedrooms) || 0;
  const bathrooms = Number(data.propertyOverview?.bathrooms) || 0;
  const squareFeet = Number(data.propertyOverview?.squareFeet) || 0;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Button className="text-white hover:text-black text-sm sm:text-base" variant="ghost" onClick={onNewAnalysis}>
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          New Analysis
        </Button>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Button variant="secondary" onClick={onViewLibrary} className="flex-1 sm:flex-none text-xs sm:text-sm">
            <Save className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">{showAutoSaved ? "View in Library" : "Back to Library"}</span>
            <span className="sm:hidden">Library</span>
          </Button>

          <div className="relative group flex-1 sm:flex-none">
            <Button variant="secondary" disabled={isExporting} className="w-full text-xs sm:text-sm">
              <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              {isExporting ? "Exporting..." : "Export"}
            </Button>
            {!isExporting && (
              <div className="absolute right-0 top-full mt-2 w-48 glass-card border border-white/10 rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <button
                  onClick={() => handleExport("pdf")}
                  className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors"
                >
                  {propertyId ? (
                    <>
                      <span className="text-luxury-blue">
                        📊 Comprehensive PDF Report
                      </span>
                      <div className="text-xs text-white/60 mt-1">
                        Detailed analysis with AI insights, metrics &
                        comparables
                      </div>
                    </>
                  ) : (
                    "Export as PDF"
                  )}
                </button>
                <button
                  onClick={() => handleExport("docx")}
                  className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors"
                >
                  Export as DOCX
                </button>
                <button
                  onClick={() => handleExport("txt")}
                  className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors"
                >
                  Export as TXT
                </button>
              </div>
            )}
          </div>

          <Button variant="secondary" onClick={handleShare} className="flex-1 sm:flex-none text-xs sm:text-sm">
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Property Header */}
      <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-white/5 to-white/10 border border-white/20">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="flex-1 w-full">
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-gradient break-words">
              {safeString(data.propertyOverview?.streetAddress) || "Property Address"}
            </h1>
            <div className="flex items-center gap-2 text-white/70 mb-4">
              <MapPin className="w-5 h-5 text-luxury-blue" />
              <span className="text-base md:text-lg">
                {safeString(data.propertyOverview?.city) || "City"},{" "}
                {safeString(data.propertyOverview?.state) || "State"}{" "}
                {safeString(data.propertyOverview?.zipcode) || "Zip"}
              </span>
            </div>
            {data.propertyOverview?.neighborhood &&
              data.propertyOverview.neighborhood !== "N/A" && (
                <p className="text-white/60 text-sm mb-4">
                  Neighborhood: {safeString(data.propertyOverview.neighborhood)} | County:{" "}
                  {safeString(data.propertyOverview.county)}
                </p>
              )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                {bedrooms} beds
              </span>
              <span className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                {bathrooms} baths
              </span>
              <span className="flex items-center gap-1">
                <Maximize className="w-4 h-4" />
                {squareFeet ? formatNumber(squareFeet) : 0} sqft
              </span>
              <span className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                Built {safeString(data.propertyOverview?.yearBuilt) || "N/A"}
              </span>
            </div>
          </div>

          <div
            className={`px-6 py-4 rounded-2xl border ${getGradeBgColor(data.aiAnalysis?.buyingGrade || "N/A")} shadow-lg`}
          >
            <p className="text-sm text-white/70 mb-1">Investment Grade</p>
            <p
              className={`font-display text-4xl md:text-5xl font-bold ${getGradeColor(data.aiAnalysis?.buyingGrade || "N/A")}`}
            >
              {safeString(data.aiAnalysis?.buyingGrade) || "N/A"}
            </p>
          </div>
        </div>

        {/* Auto-Save Success */}
        {showAutoSaved && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <Save className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="text-green-400 font-semibold text-sm">
                  Analysis Saved
                </p>
                <p className="text-white/60 text-xs">
                  This property has been automatically added to your library
                </p>
              </div>
            </div>
          </div>
        )}

        {/* One Line Summary */}
        {data.aiAnalysis?.oneLineSummary && (
          <div className="bg-luxury-blue/10 border border-luxury-blue/20 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-luxury-blue flex-shrink-0" />
              <h3 className="font-display text-lg sm:text-xl font-bold text-luxury-blue">
                AI Summary
              </h3>
            </div>
            <p className="text-white/90 text-sm sm:text-base lg:text-lg font-semibold break-words">
              {safeString(data.aiAnalysis?.oneLineSummary)}
            </p>
          </div>
        )}

        {/* AI Recommendation */}
        <div className="bg-gradient-to-r from-luxury-gold/10 to-blue-500/10 border border-luxury-gold/20 rounded-xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-luxury-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-luxury-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-lg sm:text-xl font-bold mb-2 text-luxury-gold">
                Investment Recommendation
              </h3>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-3 font-semibold break-words">
                {safeString(data.aiAnalysis?.recommendation) ||
                  "Analyzing property..."}
              </p>
              <p className="text-white/80 mb-2 text-sm sm:text-base break-words">
                <strong className="text-luxury-blue">Value Assessment:</strong>{" "}
                {safeString(data.aiAnalysis?.valueAssessment) ||
                  "Assessment in progress"}
              </p>
              <p className="text-white/80 text-sm sm:text-base break-words">
                <strong className="text-green-500">Best For:</strong>{" "}
                {safeString(data.analysisDetails?.bestFor) ||
                  "Investment analysis"}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Media Gallery */}
      {((data.media?.images && data.media.images.length > 0) ||
        (data.media?.videos && data.media.videos.length > 0)) && (
        <div className="mb-8">
          {data.media.videos && data.media.videos.length > 0 && (
            <Card className="mb-4">
              <div className="flex items-center gap-3 mb-4">
                <Video className="w-6 h-6 text-luxury-blue" />
                <h3 className="font-display text-xl font-bold">
                  Property Videos ({safeString(data.media.videoCount)})
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {data.media.videos.map((videoUrl, index) => (
                  <div
                    key={index}
                    className="relative rounded-xl overflow-hidden bg-black/20"
                  >
                    <video
                      src={videoUrl}
                      controls
                      className="w-full h-auto"
                      poster={data.media?.images?.[0] || ""}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {data.media.images && data.media.images.length > 0 && (
            <ImageGallery images={data.media.images} />
          )}
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-white/5 to-white/10 border border-white/20 hover:border-green-500/30 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <p className="text-white/70 text-sm mb-1">List Price</p>
          <p className="font-display text-xl md:text-2xl lg:text-3xl font-bold break-words">
            {listPrice ? formatExactPrice(listPrice) : "Not Available"}
          </p>
          <p className="text-sm text-white/50 mt-2">
            {data.propertyOverview?.pricePerSqft
              ? `$${data.propertyOverview.pricePerSqft.toFixed(2)}/sqft`
              : "N/A"}
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-white/5 to-white/10 border border-white/20 hover:border-blue-500/30 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Home className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <p className="text-white/70 text-sm mb-1">Zestimate By Zillow</p>
          <p className="font-display text-xl md:text-2xl lg:text-3xl font-bold break-words">
            {zestimate > 0 ? formatExactPrice(zestimate) : "Not Available"}
          </p>
          <p
            className={`text-sm mt-2 ${(((listPrice - zestimate) / zestimate) * 100) < 0 ? "text-green-500" : "text-red-500"}`}
          >
            {listPrice && zestimate
              ? `${(((listPrice - zestimate) / zestimate) * 100).toFixed(2)}% vs list`
              : "--"}
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-white/5 to-white/10 border border-white/20 hover:border-purple-500/30 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <p className="text-white/70 text-sm mb-1">5-Year ROI</p>
          <p className="font-display text-xl md:text-2xl lg:text-3xl font-bold">
            {data.analysisDetails?.estimatedROI5Year || "15-25%"}
          </p>
          <p className="text-sm text-green-500 mt-2">Projected: N/A</p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 overflow-x-auto bg-gradient-to-br from-[#21266c]/20 to-luxury-blue/20 border-2 border-luxury-blue/40 rounded-xl p-2 sm:p-3 shadow-lg scrollbar-hide">
        {[
          { id: "overview", label: "Overview" },
          { id: "features", label: "Facts & Features" },
          { id: "details", label: "Investment Details" },
          { id: "comparables", label: "Comparables" },
          { id: "environmental", label: "Environmental Risk" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 md:px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-lg ${
              activeTab === tab.id
                ? "text-luxury-gold border-b-2 border-luxury-gold"
                : "text-white/90 hover:text-white hover:bg-white/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Lead-Based Paint Warning for Pre-1978 Properties */}
          {data.propertyOverview?.yearBuilt && data.propertyOverview.yearBuilt < 1978 && (
            <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border-yellow-500/40">
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-500/40 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-yellow-300 mb-2 sm:mb-3">
                    Lead-Based Paint Disclosure
                  </h3>
                  <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3 mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm font-semibold text-yellow-200">
                      Built in {data.propertyOverview.yearBuilt} - Before 1978
                    </p>
                  </div>
                  <p className="text-white leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base break-words">
                    This property was built before 1978, when lead-based paint was banned in the United States.
                    Homes built before this date may contain lead-based paint, which can pose health risks,
                    especially to young children and pregnant women.
                  </p>
                  <div className="bg-white/10 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                    <h4 className="font-semibold text-white text-sm sm:text-base mb-2">Important Information:</h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-white/90">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-1 flex-shrink-0">•</span>
                        <span className="break-words">Federal law requires sellers to disclose known lead-based paint hazards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-1 flex-shrink-0">•</span>
                        <span className="break-words">Buyers have the right to a 10-day period to conduct a lead inspection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-1 flex-shrink-0">•</span>
                        <span className="break-words">Lead inspection costs typically range from $300-$500</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-1 flex-shrink-0">•</span>
                        <span className="break-words">Lead paint remediation costs can range from $8,000-$15,000+ depending on extent</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-yellow-500/30">
                    <p className="text-xs sm:text-sm text-white/80 break-words">
                      <strong className="text-yellow-300">Recommendation:</strong> Request a professional lead-based paint inspection before purchase.
                      Contact a certified lead inspector or risk assessor for testing.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* What's Special */}
          {data.propertyOverview?.description &&
            data.propertyOverview.description !== "" && (
              <Card>
                <h2 className="section-title">Property Description</h2>
                <p className="text-white/80 text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                  {safeString(data.propertyOverview.description)}
                </p>
                {data.special?.features && data.special.features.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {data.special.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-luxury-blue/20 border border-luxury-blue/30 rounded-full text-sm text-luxury-blue"
                      >
                        {safeString(feature)}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            )}

          {/* Comprehensive Description */}
          {data.aiAnalysis?.comprehensiveDescription && (
            <Card>
              <h2 className="section-title">AI Analysis</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-white/80 text-base leading-relaxed whitespace-pre-wrap">
                  {safeString(data.aiAnalysis?.comprehensiveDescription)}
                </p>
              </div>
            </Card>
          )}

          {/* Price Analysis */}
          {data.analysisDetails?.priceAnalysis && (
            <Card>
              <h2 className="section-title">Price Analysis</h2>
              <div className="bg-gradient-to-br from-luxury-gold/10 to-blue-500/10 border border-luxury-gold/20 rounded-xl p-6">
                <p className="text-white/90 text-base md:text-lg leading-relaxed">
                  {safeString(data.analysisDetails?.priceAnalysis)}
                </p>
              </div>
            </Card>
          )}

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-8">
            {data.charts?.valueProjection && (
              <Card>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-6">
                  10-Year Value Projection
                </h3>
                <ValueProjectionChart data={data.charts.valueProjection} />
              </Card>
            )}

            {data.charts?.roi && (
              <Card>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-6">
                  ROI Timeline
                </h3>
                <ROIChart data={data.charts.roi} />
              </Card>
            )}
          </div>

          {/* Strengths & Risks */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <h3 className="font-display text-xl md:text-2xl font-bold mb-6 text-green-500">
                Investment Strengths
              </h3>
              <ul className="space-y-3">
                {data.insights?.keyStrengths &&
                data.insights.keyStrengths.length > 0 ? (
                  data.insights.keyStrengths.map((strength, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
                    >
                      <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-500 text-sm font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-white/90">{safeString(strength)}</p>
                    </li>
                  ))
                ) : (
                  <li className="text-white/60 italic">
                    No strengths data available
                  </li>
                )}
              </ul>
            </Card>

            <Card>
              <h3 className="font-display text-xl md:text-2xl font-bold mb-6 text-red-500">
                Potential Risks
              </h3>
              <ul className="space-y-3">
                {data.insights?.keyRisks &&
                data.insights.keyRisks.length > 0 ? (
                  data.insights.keyRisks.map((risk, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                    >
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-500 text-sm font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-white/90">{safeString(risk)}</p>
                    </li>
                  ))
                ) : (
                  <li className="text-white/60 italic">
                    No risks data available
                  </li>
                )}
              </ul>
            </Card>
          </div>

          {/* Red Flags & Hidden Gems */}
          <div className="grid md:grid-cols-2 gap-8">
            {data.insights?.redFlags &&
              data.insights.redFlags.length > 0 &&
              data.insights.redFlags[0] !== "None identified" && (
                <Card>
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-6 text-orange-500 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6" />
                    Red Flags
                  </h3>
                  <ul className="space-y-3">
                    {data.insights.redFlags.map((flag, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl"
                      >
                        <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <p className="text-white/90">{safeString(flag)}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

            {data.insights?.hiddenGems &&
              data.insights.hiddenGems.length > 0 && (
                <Card>
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-6 text-luxury-gold flex items-center gap-2">
                    <Sparkles className="w-6 h-6" />
                    Hidden Gems
                  </h3>
                  <ul className="space-y-3">
                    {data.insights.hiddenGems.map((gem, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 p-4 bg-luxury-gold/10 border border-luxury-gold/20 rounded-xl"
                      >
                        <Sparkles className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                        <p className="text-white/90">{safeString(gem)}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
          </div>

          {/* Negotiation Strategies */}
          {data.insights?.negotiationStrategy &&
            data.insights.negotiationStrategy.length > 0 && (
              <Card>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-6 text-luxury-gold">
                  Negotiation Strategies
                </h3>
                <ul className="space-y-3">
                  {data.insights.negotiationStrategy.map((tip, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-4 bg-luxury-gold/10 border border-luxury-gold/20 rounded-xl"
                    >
                      <div className="w-6 h-6 bg-luxury-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-luxury-gold text-sm font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-white/90">{safeString(tip)}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
        </div>
      )}

      {activeTab === "features" && (
        <div className="space-y-8">
          <Card>
            <h2 className="section-title">Facts & Features</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-white/70 text-sm mb-1">Property Type</p>
                <p className="font-bold text-xl">
                  {safeString(data.propertyOverview?.propertyType)?.replace(/_/g, " ")}
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-white/70 text-sm mb-1">Bedrooms</p>
                <p className="font-bold text-xl">{bedrooms || 0}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-white/70 text-sm mb-1">Bathrooms</p>
                <p className="font-bold text-xl">{bathrooms}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-white/70 text-sm mb-1">Square Feet</p>
                <p className="font-bold text-xl">
                  {squareFeet ? formatNumber(squareFeet) : "N/A"}
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-white/70 text-sm mb-1">Lot Size</p>
                <p className="font-bold text-xl">
                  {data.propertyOverview?.lotSize
                    ? formatNumber(data.propertyOverview.lotSize)
                    : "N/A"}{" "}
                  {safeString(data.propertyOverview?.lotSizeUnit) || ""}
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-white/70 text-sm mb-1">Stories</p>
                <p className="font-bold text-xl">
                  {safeString(data.propertyOverview?.stories) || "N/A"}
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-white/70 text-sm mb-1">Garage</p>
                <p className="font-bold text-xl">
                  {displayValue(data.features?.garageSpaces)}
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-white/70 text-sm mb-1">Architecture</p>
                <p className="font-bold text-xl">
                  {displayValue(data.features?.architecturalStyle)}
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-white/70 text-sm mb-1">Roof Type</p>
                <p className="font-bold text-xl">
                  {displayValue(data.features?.roofType)}
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-white/70 text-sm mb-1">Exterior</p>
                <p className="font-bold text-xl">
                  {displayValue(data.features?.exteriorMaterial)}
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-white/70 text-sm mb-1">Heating</p>
                <p className="font-bold text-xl">
                  {displayValue(data.features?.heating)}
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-white/70 text-sm mb-1">Cooling</p>
                <p className="font-bold text-xl">
                  {displayValue(data.features?.cooling)}
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-white/70 text-sm mb-1">Fireplaces</p>
                <p className="font-bold text-xl">
                  {data.features?.fireplaces || 0}
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-white/70 text-sm mb-1">Water Source</p>
                <p className="font-bold text-xl">
                  {displayValue(data.utilities?.waterSource)}
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-white/70 text-sm mb-1">Sewer</p>
                <p className="font-bold text-xl">
                  {displayValue(data.utilities?.sewer)}
                </p>
              </div>
            </div>

            {/* Appliances */}
            {data.features?.appliances &&
              data.features.appliances.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-display text-lg font-bold mb-3">
                    Appliances Included
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.features.appliances.map((appliance, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm"
                      >
                        {safeString(appliance)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {/* Pool Features */}
            {data.features?.poolFeatures &&
              data.features.poolFeatures.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-display text-lg font-bold mb-3">
                    Pool Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.features.poolFeatures.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-sm"
                      >
                        {safeString(feature)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </Card>
        </div>
      )}

      {activeTab === "details" && (
        <div className="space-y-6 sm:space-y-8">
          {/* Investment Breakdown */}
          <Card>
            <h2 className="section-title">Investment Breakdown</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between py-2 sm:py-3 border-b border-white/10 gap-2">
                <span className="text-white/70 text-sm sm:text-base">Purchase Price</span>
                <span className="font-bold text-base sm:text-lg md:text-xl break-words text-right">
                  {listPrice > 0 ? formatExactPrice(listPrice) : "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 sm:py-3 border-b border-white/10 gap-2">
                <span className="text-white/70 text-sm sm:text-base">
                  Estimated Closing Costs (3%)
                </span>
                <span className="font-bold text-base sm:text-lg md:text-xl break-words text-right">
                  {listPrice > 0 ? formatExactPrice(listPrice * 0.03) : "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 sm:py-3 border-b border-white/10 gap-2">
                <span className="text-white/70 text-sm sm:text-base">Estimated Rehab/Repairs</span>
                <span className="font-bold text-base sm:text-lg md:text-xl break-words text-right">
                  {listPrice > 0 ? formatExactPrice(listPrice * 0.02) : "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 sm:py-4 bg-luxury-gold/10 border border-luxury-gold/20 rounded-xl px-3 sm:px-4 gap-2">
                <span className="font-bold text-base sm:text-lg">Total Investment</span>
                <span className="font-display text-lg sm:text-xl md:text-2xl font-bold text-luxury-gold break-words text-right">
                  {listPrice > 0 ? formatExactPrice(listPrice * 1.05) : "N/A"}
                </span>
              </div>
            </div>
          </Card>

          {/* Taxes */}
          {data.costs && (
            <Card>
              <h2 className="section-title">Property Taxes</h2>
              <div className="flex items-center justify-between py-3 sm:py-4 bg-white/5 rounded-xl px-4 sm:px-6">
                <div>
                  <p className="text-white/70 text-xs sm:text-sm mb-1">
                    Annual Property Tax
                  </p>
                  <p className="font-display text-xl sm:text-2xl font-bold break-words">
                    {data.costs.annualPropertyTax
                      ? formatExactPrice(data.costs.annualPropertyTax)
                      : "N/A"}
                  </p>
                  <p className="text-white/60 text-xs sm:text-sm mt-1">
                    Tax Year: {safeString(data.costs.taxYear)}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Schools */}
          {data.schools && data.schools.length > 0 && (
            <Card>
              <h2 className="section-title">Nearby Schools</h2>
              <div className="space-y-3">
                {data.schools.map((school, index) => (
                  <div key={index} className="p-3 sm:p-4 bg-white/5 rounded-xl">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-base sm:text-lg break-words">{safeString(school.name)}</p>
                        <p className="text-white/60 text-xs sm:text-sm">
                          {safeString(school.grades)} | {safeString(school.type)}
                        </p>
                      </div>
                      <div className="text-left sm:text-right flex-shrink-0">
                        <p className="text-luxury-gold font-bold text-base sm:text-lg">
                          Rating: {safeString(school.rating)}/10
                        </p>
                        <p className="text-white/60 text-xs sm:text-sm">
                          {safeString(school.distance)} miles
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Zillow Link */}
          <Card>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-2">
                  View on Zillow
                </h3>
                <p className="text-white/70">
                  See the full listing with all photos and details
                </p>
              </div>
              <a
                href={
                  data.zillowUrl ||
                  `https://www.zillow.com/homedetails/${data.zpid}_zpid/`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="luxury-button whitespace-nowrap"
              >
                Visit Zillow →
              </a>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "comparables" && (
        <Card>
          <h2 className="section-title">Comparable Properties</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-white/70 font-semibold">
                    Address
                  </th>
                  <th className="text-left py-4 px-4 text-white/70 font-semibold">
                    Price
                  </th>
                  <th className="text-left py-4 px-4 text-white/70 font-semibold">
                    Beds
                  </th>
                  <th className="text-left py-4 px-4 text-white/70 font-semibold">
                    Baths
                  </th>
                  <th className="text-left py-4 px-4 text-white/70 font-semibold">
                    Sqft
                  </th>
                  <th className="text-left py-4 px-4 text-white/70 font-semibold">
                    $/Sqft
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.comparables && data.comparables.length > 0 ? (
                  data.comparables.map((comp, index) => (
                    <tr
                      key={index}
                      className="border-b border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-4">{safeString(comp.address)}</td>
                      <td className="py-4 px-4 font-bold">
                        {comp.price ? formatExactPrice(Number(comp.price)) : "N/A"}
                      </td>
                      <td className="py-4 px-4">{safeString(comp.bedrooms)}</td>
                      <td className="py-4 px-4">{safeString(comp.bathrooms)}</td>
                      <td className="py-4 px-4">
                        {comp.squareFeet
                          ? formatNumber(Number(comp.squareFeet))
                          : "N/A"}
                      </td>
                      <td className="py-4 px-4">
                        {comp.pricePerSqft ? `$${Number(comp.pricePerSqft).toFixed(2)}` : "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 px-4 text-center text-white/60 italic"
                    >
                      No comparable properties data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-6 bg-white/5 rounded-xl">
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <p className="text-white/70 text-sm mb-1">Average Price</p>
                <p className="font-display text-xl md:text-2xl font-bold">
                  {data.comparables && data.comparables.length > 0
                    ? formatExactPrice(
                        data.comparables.reduce(
                          (sum, c) => sum + (c.price || 0),
                          0,
                        ) / data.comparables.length,
                      )
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">This Property</p>
                <p className="font-display text-xl md:text-2xl font-bold text-luxury-gold">
                  {listPrice > 0 ? formatExactPrice(listPrice) : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Avg $/Sqft</p>
                <p className="font-display text-xl md:text-2xl font-bold">
          {data.propertyOverview?.pricePerSqft
            ? `$${Number(data.propertyOverview.pricePerSqft).toFixed(2)}`
            : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {activeTab === "environmental" && (
        <div className="space-y-4 sm:space-y-6">
          {data.environmental?.flood ? (
            <>
              {/* Hero Section - Flood Risk Score */}
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-luxury-blue/20 to-luxury-gold/10 rounded-full blur-3xl"></div>
                <div className="relative">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-white/10">
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-auto">
                      <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        data.environmental.flood.floodFactorScore <= 2
                          ? "bg-green-500"
                          : data.environmental.flood.floodFactorScore <= 4
                          ? "bg-blue-500"
                          : data.environmental.flood.floodFactorScore <= 6
                          ? "bg-yellow-500"
                          : data.environmental.flood.floodFactorScore <= 8
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }`}>
                        <span className="text-3xl sm:text-4xl font-bold text-white">
                          {data.environmental.flood.floodFactorScore}/10
                        </span>
                      </div>
                      <div className="text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                          <h3 className="text-xl sm:text-2xl font-bold text-white break-words">
                            {data.environmental.flood.floodFactorSeverity}
                          </h3>
                        </div>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                          <div className="bg-luxury-blue/20 border border-luxury-blue/40 text-luxury-blue text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
                            FLOOD FACTOR®
                          </div>
                          <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-bold ${
                            data.environmental.flood.riskTrend === "increasing"
                              ? "bg-red-500/20 border border-red-500/40 text-red-400"
                              : "bg-green-500/20 border border-green-500/40 text-green-400"
                          }`}>
                            {data.environmental.flood.riskTrend === "increasing" ? "↗ INCREASING" : "→ STABLE"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center md:text-right w-full md:w-auto">
                      <p className="text-white/60 text-xs sm:text-sm mb-1">Property Address</p>
                      <p className="text-white font-semibold text-base sm:text-lg break-words">
                        {safeString(data.propertyOverview?.streetAddress)}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-white/5 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                    <p className="text-white/90 leading-relaxed text-sm sm:text-base break-words">
                      {data.environmental.flood.description} This property's flood risk is{" "}
                      <span className={`font-bold ${
                        data.environmental.flood.riskTrend === "increasing"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}>
                        {data.environmental.flood.riskTrend}
                      </span>{" "}
                      over time.
                    </p>
                  </div>
                </div>
              </Card>

              {/* FEMA Zone & Insurance Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* FEMA Zone Card */}
                <Card className="bg-gradient-to-br from-luxury-blue/10 to-luxury-blue/5 border-luxury-blue/30">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-luxury-blue/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-base sm:text-xl font-bold text-luxury-blue">FEMA</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg sm:text-xl font-bold mb-2 text-luxury-blue">
                        FEMA Flood Zone
                      </h3>
                      <div className="bg-luxury-blue/20 border border-luxury-blue/40 rounded-lg px-3 sm:px-4 py-2 sm:py-3 inline-block">
                        <p className="text-xl sm:text-2xl font-bold text-white">
                          {data.environmental.flood.femaZone}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/70 text-xs sm:text-sm mt-3 sm:mt-4 break-words">
                    FEMA flood zones indicate the level of flood risk in different areas. This classification helps determine insurance requirements and rates.
                  </p>
                </Card>

                {/* Insurance Card */}
                <Card className={`bg-gradient-to-br ${
                  data.environmental.flood.insuranceRequired
                    ? "from-red-500/10 to-orange-500/5 border-red-500/30"
                    : "from-luxury-gold/10 to-luxury-gold/5 border-luxury-gold/30"
                }`}>
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      data.environmental.flood.insuranceRequired
                        ? "bg-red-500/30"
                        : "bg-luxury-gold/30"
                    }`}>
                      <DollarSign className={`w-6 h-6 sm:w-7 sm:h-7 ${
                        data.environmental.flood.insuranceRequired
                          ? "text-red-400"
                          : "text-luxury-gold"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-display text-lg sm:text-xl font-bold mb-2 ${
                        data.environmental.flood.insuranceRequired
                          ? "text-red-400"
                          : "text-luxury-gold"
                      }`}>
                        Flood Insurance
                      </h3>
                      <div className={`rounded-lg px-2.5 sm:px-3 py-1 inline-block text-xs sm:text-sm font-bold ${
                        data.environmental.flood.insuranceRequired
                          ? "bg-red-500/20 border border-red-500/40 text-red-400"
                          : "bg-green-500/20 border border-green-500/40 text-green-400"
                      }`}>
                        {data.environmental.flood.insuranceRequired ? "REQUIRED" : "OPTIONAL"}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
                    <p className="text-white/70 text-xs sm:text-sm mb-2 sm:mb-3">
                      Estimated Annual Cost:
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-white break-words">
                      ${formatNumber(data.environmental.flood.estimatedInsuranceMin)} - ${formatNumber(data.environmental.flood.estimatedInsuranceMax)}
                    </p>
                    <p className="text-white/50 text-xs mt-2">per year</p>
                  </div>
                </Card>
              </div>

              {/* Insurance Details */}
              <Card className="bg-gradient-to-br from-white/5 to-white/10">
                <h3 className="font-display text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-luxury-gold flex-shrink-0" />
                  <span className="break-words">Insurance Requirements</span>
                </h3>
                <p className="text-white/80 leading-relaxed text-sm sm:text-base break-words">
                  {data.environmental.flood.insuranceRequired
                    ? `This property is located in FEMA Zone ${data.environmental.flood.femaZone}. Flood insurance is federally required to obtain a mortgage for properties in this zone.`
                    : `This property is located in FEMA Zone ${data.environmental.flood.femaZone}. While flood insurance is not federally required to obtain a mortgage, you may want to purchase it to protect your investment.`}
                </p>
              </Card>

              {/* Disclaimer */}
              <Card className="bg-white/5 border-white/10">
                <p className="text-xs text-white/50 leading-relaxed break-words">
                  <strong className="text-white/70">Data Sources & Disclaimers:</strong> Flood risk data including FEMA ratings is provided by First Street Foundation®.
                  The Flood Factor score is designed to approximate flood risk and not intended to be used to place a value on a property
                  or determine flood insurance requirements. Insurance quotes are based on $250K in building and $100K in contents coverage.
                  Always consult with insurance professionals for accurate quotes.
                </p>
              </Card>
            </>
          ) : (
            <Card>
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="w-10 h-10 text-white/30" />
                </div>
                <h3 className="text-2xl font-bold text-white/70 mb-3">
                  Flood Risk Data Unavailable
                </h3>
                <p className="text-white/50 text-base max-w-md mx-auto">
                  Environmental risk data is not currently available for this property. This may be due to limited data coverage in this area.
                </p>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
