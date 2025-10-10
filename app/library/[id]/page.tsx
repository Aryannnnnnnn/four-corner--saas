"use client";

import { useRouter } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { SavedAnalysis } from "@/app/lib/types/index";
import AnalysisResults from "@/components/analysis/AnalysisResults";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [property, setProperty] = useState<SavedAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProperty = useCallback(async () => {
    try {
      const response = await fetch(`/api/properties/${resolvedParams.id}`);
      const data = await response.json();
      if (data.property) {
        setProperty(data.property);
      } else {
        throw new Error("Property not found");
      }
    } catch (error) {
      console.error("Failed to fetch property:", error);
      toast.error("Property not found");
      router.push("/library");
    } finally {
      setIsLoading(false);
    }
  }, [resolvedParams.id, router]);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  const handleBackToLibrary = () => {
    router.push("/library");
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading property..." />;
  }

  if (!property) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <AnalysisResults
          data={property.analysis_data}
          onViewLibrary={handleBackToLibrary}
          onNewAnalysis={() => router.push("/")}
          propertyId={property.id}
        />
      </div>
      <Footer />
    </div>
  );
}
