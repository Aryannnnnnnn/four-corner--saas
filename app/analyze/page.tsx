// app/analyze/page.tsx
"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import AnalysisResults from "@/components/analysis/AnalysisResults";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import type { PropertyData } from "@/lib/types/index";

function AnalyzeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState("");

  const analyzeProperty = useCallback(
    async (address: string, zpid?: string) => {
      setIsAnalyzing(true);
      setError(null);
      setProgress("Initializing analysis...");

      try {
        setProgress("Fetching property data from Zillow...");

        const response = await fetch("/api/analyze-property", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address, zpid }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Error:", errorData);
          throw new Error(
            errorData.error || errorData.hint || "Analysis failed",
          );
        }

        setProgress("Processing property details...");
        const data = await response.json();

        if (!data.success || !data.propertyOverview) {
          console.error("Invalid data structure received");
          throw new Error("Analysis returned incomplete data");
        }

        // Ensure all required fields are present and valid
        const validatedData: PropertyData = {
          success: data.success,
          timestamp: data.timestamp,
          zpid: data.zpid || "",
          zillowUrl: data.zillowUrl || "",
          propertyOverview: {
            ...data.propertyOverview,
            bedrooms: data.propertyOverview.bedrooms || 0,
            bathrooms: data.propertyOverview.bathrooms || 0,
            squareFeet: data.propertyOverview.squareFeet || 0,
            listPrice: data.propertyOverview.listPrice || 0,
          },
          features: data.features || {},
          utilities: data.utilities || {},
          costs: data.costs || {},
          schools: Array.isArray(data.schools) ? data.schools : [],
          comparables: Array.isArray(data.comparables) ? data.comparables : [],
          media: data.media || {
            images: [],
            videos: [],
            imageCount: 0,
            videoCount: 0,
          },
          special: data.special || { features: [] },
          rawApiData: data.rawApiData || {},
          aiAnalysis: {
            buyingGrade: data.aiAnalysis?.buyingGrade || "N/A",
            recommendation:
              data.aiAnalysis?.recommendation || "Analysis in progress",
            valueAssessment: data.aiAnalysis?.valueAssessment || "",
            comprehensiveDescription:
              data.aiAnalysis?.comprehensiveDescription || "",
            oneLineSummary: data.aiAnalysis?.oneLineSummary || "",
          },
          insights: {
            keyStrengths: Array.isArray(data.insights?.keyStrengths)
              ? data.insights.keyStrengths
              : [],
            keyRisks: Array.isArray(data.insights?.keyRisks)
              ? data.insights.keyRisks
              : [],
            negotiationStrategy: Array.isArray(
              data.insights?.negotiationStrategy,
            )
              ? data.insights.negotiationStrategy
              : [],
            redFlags: Array.isArray(data.insights?.redFlags)
              ? data.insights.redFlags
              : [],
            hiddenGems: Array.isArray(data.insights?.hiddenGems)
              ? data.insights.hiddenGems
              : [],
            renovationRecommendations: Array.isArray(
              data.insights?.renovationRecommendations,
            )
              ? data.insights.renovationRecommendations
              : [],
            immediateActions: Array.isArray(data.insights?.immediateActions)
              ? data.insights.immediateActions
              : [],
            dealBreakers: Array.isArray(data.insights?.dealBreakers)
              ? data.insights.dealBreakers
              : [],
            competitiveAdvantages: Array.isArray(
              data.insights?.competitiveAdvantages,
            )
              ? data.insights.competitiveAdvantages
              : [],
          },
          analysisDetails: {
            priceAnalysis: data.analysisDetails?.priceAnalysis || "",
            locationAnalysis: data.analysisDetails?.locationAnalysis || "",
            marketComparison: data.analysisDetails?.marketComparison || "",
            cashFlowAnalysis: data.analysisDetails?.cashFlowAnalysis || "",
            bestFor: data.analysisDetails?.bestFor || "",
            idealBuyer: data.analysisDetails?.idealBuyer || "",
            estimatedROI5Year: data.analysisDetails?.estimatedROI5Year || "",
            estimatedROI10Year: data.analysisDetails?.estimatedROI10Year || "",
            exitStrategies: Array.isArray(data.analysisDetails?.exitStrategies)
              ? data.analysisDetails.exitStrategies
              : [],
          },
          marketResearch: data.marketResearch || "",
        };

        setPropertyData(validatedData);
        toast.success("Property analysis complete!");
      } catch (error) {
        console.error("Analysis error:", error);
        const message =
          error instanceof Error ? error.message : "Failed to analyze property";
        setError(message);
        toast.error(message);
      } finally {
        setIsAnalyzing(false);
      }
    },
    [],
  );

  useEffect(() => {
    const zpid = searchParams.get("zpid");
    const address = searchParams.get("address");

    if (address) {
      analyzeProperty(address, zpid || undefined);
    } else {
      setError("No address provided");
    }
  }, [searchParams, analyzeProperty]);

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-blue to-luxury-blue/20">
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-16 h-16 text-luxury-blue animate-spin mb-6" />
            <h2 className="font-display text-3xl font-bold mb-2">
              Analyzing Property
            </h2>
            <p className="text-white/60 text-lg mb-6">{progress}</p>
            <div className="mt-8 space-y-3 text-white/50 text-sm max-w-md">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-luxury-blue rounded-full animate-pulse" />
                <p>Searching Zillow database...</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-luxury-blue rounded-full animate-pulse" />
                <p>Extracting property details...</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-luxury-blue rounded-full animate-pulse" />
                <p>Finding comparable properties...</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-luxury-blue rounded-full animate-pulse" />
                <p>Running AI investment analysis...</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-luxury-blue rounded-full animate-pulse" />
                <p>Gathering market research...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-blue to-luxury-blue/20">
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
          <Button variant="ghost" onClick={() => router.push("/search")}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Search
          </Button>
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
              <span className="text-red-500 text-3xl">✕</span>
            </div>
            <h2 className="font-display text-3xl font-bold mb-2 text-red-500">
              Analysis Failed
            </h2>
            <p className="text-white/60 text-lg mb-4 text-center max-w-md">
              {error}
            </p>
            {error.includes("workflow") && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 max-w-md">
                <p className="text-yellow-400 text-sm">
                  <strong>Troubleshooting:</strong>
                  <br />• Make sure the workflow is <strong>Active</strong> (not
                  just tested)
                  <br />• Check n8n → Workflows → Toggle "Active" switch
                  <br />• Verify webhook path is{" "}
                  <code>zillow-property-analysis</code>
                </p>
              </div>
            )}
            <div className="flex gap-3">
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push("/search")}
              >
                Go to Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!propertyData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-blue to-luxury-blue/20">
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-16 h-16 text-luxury-blue animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <AnalysisResults
      data={propertyData}
      onViewLibrary={() => router.push("/library")}
      onNewAnalysis={() => router.push("/search")}
      showAutoSaved={false}
    />
  );
}

export default function AnalyzePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-dark-blue via-dark-blue to-luxury-blue/20">
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="w-16 h-16 text-luxury-blue animate-spin" />
          </div>
        </div>
      }
    >
      <AnalyzeContent />
      <Footer />
    </Suspense>
  );
}
