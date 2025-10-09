"use client";

import {
  ArrowRight,
  BarChart3,
  Clock,
  DollarSign,
  Home,
  PlusCircle,
  Search,
  Star,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import type { SavedAnalysis } from "@/app/lib/types/index";
import {
  formatPrice,
  formatRelativeTime,
  getGradeColor,
} from "@/app/lib/utils/format";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [properties, setProperties] = useState<SavedAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAnalyses: 0,
    totalValue: 0,
    avgGrade: "B",
    favorites: 0,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const calculateStats = useCallback((props: SavedAnalysis[]) => {
    const totalValue = props.reduce(
      (sum, p) => sum + (p.analysis_data.propertyOverview?.listPrice || 0),
      0,
    );
    const favorites = props.filter((p) => p.is_favorite).length;

    // Calculate average grade
    const grades = props
      .map((p) => p.analysis_data.aiAnalysis?.buyingGrade)
      .filter(Boolean);
    const gradeValues: Record<string, number> = {
      A: 4,
      B: 3,
      C: 2,
      D: 1,
      F: 0,
    };
    const avgGradeValue =
      grades.length > 0
        ? grades.reduce((sum, g) => sum + (gradeValues[g?.charAt(0)] || 2), 0) /
          grades.length
        : 2;
    const avgGrade =
      Object.keys(gradeValues).find(
        (k) => gradeValues[k] === Math.round(avgGradeValue),
      ) || "B";

    setStats({
      totalAnalyses: props.length,
      totalValue,
      avgGrade,
      favorites,
    });
  }, []);

  const fetchProperties = useCallback(async () => {
    try {
      const response = await fetch("/api/properties");
      const data = await response.json();

      if (data.properties) {
        setProperties(data.properties);
        calculateStats(data.properties);
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setIsLoading(false);
    }
  }, [calculateStats]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-luxury-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-white/70">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
        {/* Welcome Section */}
        <div className="mb-8 sm:mb-12 animate-fade-in">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Welcome back,{" "}
            <span className="text-gradient">{session?.user?.name}</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl">
            Here's an overview of your property analyses and insights.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Card className="hover:scale-105 transition-transform duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/70 text-sm mb-2">Total Analyses</p>
                <p className="font-display text-4xl font-bold text-white">
                  {stats.totalAnalyses}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-500">
                +{stats.totalAnalyses} this month
              </span>
            </div>
          </Card>

          <Card className="hover:scale-105 transition-transform duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/70 text-sm mb-2">Total Value</p>
                <p className="font-display text-4xl font-bold text-white">
                  {formatPrice(stats.totalValue)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-500">Portfolio value</span>
            </div>
          </Card>

          <Card className="hover:scale-105 transition-transform duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/70 text-sm mb-2">Average Grade</p>
                <p
                  className={`font-display text-4xl font-bold ${getGradeColor(stats.avgGrade)}`}
                >
                  {stats.avgGrade}
                </p>
              </div>
              <div className="w-12 h-12 bg-luxury-blue/10 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-luxury-blue" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="text-white/70">Investment quality</span>
            </div>
          </Card>

          <Card className="hover:scale-105 transition-transform duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/70 text-sm mb-2">Favorites</p>
                <p className="font-display text-4xl font-bold text-white">
                  {stats.favorites}
                </p>
              </div>
              <div className="w-12 h-12 bg-luxury-blue/10 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-luxury-blue" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="text-white/70">Saved properties</span>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Card
            className="group hover:bg-white/10 transition-all cursor-pointer"
            onClick={() => router.push("/analyze-your-property")}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-luxury-blue/10 rounded-xl flex items-center justify-center">
                    <Search className="w-6 h-6 text-luxury-blue" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold">
                    New Analysis
                  </h3>
                </div>
                <p className="text-white/70 text-sm sm:text-base">
                  Analyze a new property and get instant insights
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-luxury-blue group-hover:translate-x-2 transition-transform" />
            </div>
          </Card>

          <Card
            className="group hover:bg-white/10 transition-all cursor-pointer"
            onClick={() => router.push("/library")}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="font-display text-2xl font-bold">
                    View Library
                  </h3>
                </div>
                <p className="text-white/70">
                  Browse and manage all your property analyses
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-blue-500 group-hover:translate-x-2 transition-transform" />
            </div>
          </Card>
        </div>

        {/* Recent Analyses */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-3xl font-bold flex items-center gap-3">
              <Clock className="w-8 h-8 text-luxury-blue" />
              Recent Analyses
            </h2>
            <Button variant="ghost" onClick={() => router.push("/library")}>
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {properties.length === 0 ? (
            <Card className="text-center py-12">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-white/50" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">
                No analyses yet
              </h3>
              <p className="text-white/70 mb-6">
                Start analyzing properties to see them here
              </p>
              <Button onClick={() => router.push("/analyze-your-property")}>
                <PlusCircle className="w-5 h-5 mr-2" />
                Analyze Your First Property
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {properties.slice(0, 6).map((property) => (
                <Link key={property.id} href={`/library/${property.id}`}>
                  <Card className="group hover:scale-105 transition-all duration-300 cursor-pointer h-full">
                    {/* Property Image */}
                    {property.analysis_data.media?.images?.[0] && (
                      <div className="relative h-40 sm:h-48 -m-4 sm:-m-6 mb-3 sm:mb-4 rounded-t-2xl overflow-hidden">
                        <img
                          src={property.analysis_data.media.images[0]}
                          alt={property.address}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        {property.is_favorite && (
                          <div className="absolute top-4 right-4">
                            <Star className="w-6 h-6 text-luxury-blue fill-luxury-blue" />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Property Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-bold mb-1 line-clamp-1">
                          {property.address}
                        </h3>
                        <p className="text-white/70 text-xs sm:text-sm">
                          {property.analysis_data.propertyOverview?.city},{" "}
                          {property.analysis_data.propertyOverview?.state}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white/70 text-xs sm:text-sm">
                            List Price
                          </p>
                          <p className="font-bold text-base sm:text-lg">
                            {property.analysis_data.propertyOverview?.listPrice
                              ? formatPrice(
                                  property.analysis_data.propertyOverview
                                    .listPrice,
                                )
                              : "N/A"}
                          </p>
                        </div>
                        <div
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${getGradeColor(property.analysis_data.aiAnalysis?.buyingGrade)}`}
                        >
                          <span className="font-bold text-base sm:text-lg">
                            {property.analysis_data.aiAnalysis?.buyingGrade}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs sm:text-sm text-white/70">
                        <span>
                          {property.analysis_data.propertyOverview?.bedrooms}{" "}
                          bed •{" "}
                          {property.analysis_data.propertyOverview?.bathrooms}{" "}
                          bath
                        </span>
                        <span className="hidden sm:inline">
                          {formatRelativeTime(property.created_at)}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Insights */}
        {properties.length > 0 && (
          <Card>
            <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Quick Insights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-6 glass-card rounded-xl">
                <p className="text-white/70 mb-2 text-sm sm:text-base">
                  Most Analyzed City
                </p>
                <p className="font-display text-xl sm:text-2xl font-bold">
                  {properties[0]?.analysis_data.propertyOverview?.city || "N/A"}
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 glass-card rounded-xl">
                <p className="text-white/70 mb-2 text-sm sm:text-base">
                  Highest Value Property
                </p>
                <p className="font-display text-xl sm:text-2xl font-bold">
                  {properties.length > 0
                    ? formatPrice(
                        Math.max(
                          ...properties.map(
                            (p) =>
                              p.analysis_data.propertyOverview?.listPrice || 0,
                          ),
                        ),
                      )
                    : "N/A"}
                </p>
              </div>
              <div className="text-center p-4 sm:p-6 glass-card rounded-xl">
                <p className="text-white/70 mb-2 text-sm sm:text-base">
                  Best ROI Projection
                </p>
                <p className="font-display text-xl sm:text-2xl font-bold text-green-500">
                  {properties[0]?.analysis_data.analysisDetails
                    ?.estimatedROI5Year || "N/A"}
                </p>
              </div>
            </div>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}
