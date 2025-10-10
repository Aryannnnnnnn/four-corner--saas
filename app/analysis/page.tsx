"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import type { PropertyData } from "@/app/lib/types/index";
import AnalysisResults from "@/components/analysis/AnalysisResults";
import LoadingScreen from "@/components/analysis/LoadingScreen";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { propertyApi } from "@/lib/utils/api";
import { logger } from "@/app/lib/utils/logger";

export default function AnalysisPage() {
  const { status } = useSession();
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisData, setAnalysisData] = useState<PropertyData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const hasStartedRef = useRef(false);

  const startAnalysis = useCallback(async (propertyAddress: string) => {
    let progressInterval: NodeJS.Timeout | null = null;

    try {
      setIsAnalyzing(true);
      setError(null);
      setProgress(0);

      // Simulate progress
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            return 90;
          }
          return prev + 10;
        });
      }, 2000);

      const data = await propertyApi.analyze(propertyAddress);

      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
      setProgress(100);

      if (!data.success) {
        throw new Error("Analysis failed");
      }

      // Give user time to see 100% progress
      await new Promise((resolve) => setTimeout(resolve, 500));

      setAnalysisData(data);
      sessionStorage.removeItem("propertyAddress");
      toast.success("✅ Analysis complete and saved to your library!");
    } catch (err: unknown) {
      logger.error("Analysis error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to analyze property";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      // Ensure interval is always cleaned up
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
      setIsAnalyzing(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Please sign in to analyze properties");
      router.push("/login");
      return;
    }

    if (status === "authenticated" && !hasStartedRef.current) {
      // Get address from session storage
      const storedAddress = sessionStorage.getItem("propertyAddress");
      if (!storedAddress) {
        toast.error("No address provided");
        router.push("/");
        return;
      }

      hasStartedRef.current = true;
      setAddress(storedAddress);
      startAnalysis(storedAddress);
    }
  }, [status, router, startAnalysis]);

  const handleViewLibrary = () => {
    router.push("/library");
  };

  const handleNewAnalysis = () => {
    setAnalysisData(null);
    setError(null);
    setIsAnalyzing(false);
    router.push("/");
  };

  const handleRetry = () => {
    setError(null);
    if (address) {
      startAnalysis(address);
    } else {
      router.push("/");
    }
  };

  if (status === "loading") {
    return <LoadingSpinner message="Loading..." />;
  }

  if (isAnalyzing) {
    return <LoadingScreen address={address} progress={progress} />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
            <span className="text-4xl">❌</span>
          </div>
          <h1 className="font-display text-3xl font-bold">Analysis Failed</h1>
          <p className="text-white/70 text-lg">{error}</p>
          <div className="flex gap-4 justify-center">
            <button onClick={handleRetry} className="luxury-button">
              Try Again
            </button>
            <button
              onClick={handleNewAnalysis}
              className="px-8 py-3 bg-white/5 hover:bg-white/10 rounded-full font-semibold transition-all"
            >
              New Property
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!analysisData) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <AnalysisResults
        data={analysisData}
        onViewLibrary={handleViewLibrary}
        onNewAnalysis={handleNewAnalysis}
        showAutoSaved={true}
      />
      <Footer />
    </div>
  );
}
