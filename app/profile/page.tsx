"use client";

import {
  Activity,
  Award,
  BarChart3,
  DollarSign,
  Edit,
  Home,
  LogOut,
  Mail,
  MapPin,
  Star,
  TrendingUp,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import type { SavedAnalysis } from "@/app/lib/types/index";
import { formatPrice, formatRelativeTime } from "@/app/lib/utils/format";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [properties, setProperties] = useState<SavedAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState("");

  const [stats, setStats] = useState({
    totalAnalyses: 0,
    totalValue: 0,
    avgGrade: "B",
    favorites: 0,
    joinDate: "",
    lastActive: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const fetchUserData = useCallback(async () => {
    try {
      // Fetch properties
      const propertiesResponse = await fetch("/api/properties");
      const propertiesData = await propertiesResponse.json();

      if (propertiesData.properties) {
        setProperties(propertiesData.properties);
        calculateStats(propertiesData.properties);
      }

      // Fetch user profile
      const profileResponse = await fetch("/api/user/profile");
      const profileData = await profileResponse.json();

      if (profileData.profile) {
        setLocation(profileData.profile.location || "");
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const calculateStats = (props: SavedAnalysis[]) => {
    const totalValue = props.reduce(
      (sum, p) => sum + (p.analysis_data.propertyOverview?.listPrice || 0),
      0,
    );
    const favorites = props.filter((p) => p.is_favorite).length;

    const grades = props
      .map((p) => p.analysis_data.aiAnalysis?.buyingGrade || "C")
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
      joinDate: session?.user ? new Date().toISOString() : "",
      lastActive: new Date().toISOString(),
    });
  };

  const recentActivity = properties.slice(0, 5).map((p) => ({
    type: "analysis",
    title: `Analyzed ${p.address}`,
    timestamp: p.created_at,
    icon: Home,
    color: "text-blue-500",
  }));

  if (status === "loading" || isLoading) {
    return <LoadingSpinner message="Loading profile..." />;
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
        {/* Profile Header */}
        <Card className="mb-8 p-6 sm:p-8 bg-gradient-to-br from-white/5 to-white/10 border border-white/20">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Avatar */}
            <div className="mx-auto md:mx-0">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-luxury-blue/20 to-luxury-blue/5 border-2 border-luxury-blue/30 flex items-center justify-center overflow-hidden shadow-2xl backdrop-blur-sm">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-luxury-blue" />
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-gradient">
                    {session?.user?.name || "User"}
                  </h1>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-white/70 text-sm">
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-luxury-blue" />
                      {session?.user?.email}
                    </span>
                    {location && (
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-luxury-blue" />
                        {location}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <Button
                    variant="secondary"
                    onClick={() => router.push("/settings")}
                    className="bg-luxury-blue/10 border-luxury-blue/30 text-luxury-blue hover:bg-luxury-blue/20"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>

              {/* Member Since */}
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/10"></div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Overview */}
            <Card className="p-6 bg-gradient-to-br from-white/5 to-white/10 border border-white/20">
              <h2 className="font-display text-xl font-bold mb-6 text-luxury-blue flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Statistics
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Home className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Analyses</p>
                      <p className="font-bold text-lg">{stats.totalAnalyses}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Total Value</p>
                      <p className="font-bold text-lg">
                        {formatPrice(stats.totalValue)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-luxury-blue/5 to-luxury-blue/10 rounded-xl border border-luxury-blue/20 hover:border-luxury-blue/40 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-luxury-blue/20 rounded-xl flex items-center justify-center shadow-lg">
                      <Star className="w-6 h-6 text-luxury-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-white/70 uppercase tracking-wide">
                        Favorites
                      </p>
                      <p className="font-bold text-xl text-luxury-blue">
                        {stats.favorites}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Avg Grade</p>
                      <p className="font-bold text-lg text-luxury-gold">
                        {stats.avgGrade}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6 bg-gradient-to-br from-white/5 to-white/10 border border-white/20">
              <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2 text-luxury-blue">
                <Award className="w-5 h-5" />
                Achievements
              </h2>
              <div className="space-y-3">
                {[
                  {
                    icon: "🏆",
                    title: "First Analysis",
                    description: "Completed your first property analysis",
                    unlocked: stats.totalAnalyses >= 1,
                  },
                  {
                    icon: "📊",
                    title: "Data Enthusiast",
                    description: "Analyzed 10 properties",
                    unlocked: stats.totalAnalyses >= 10,
                  },
                  {
                    icon: "⭐",
                    title: "Curator",
                    description: "Added 5 properties to favorites",
                    unlocked: stats.favorites >= 5,
                  },
                  {
                    icon: "💎",
                    title: "High Roller",
                    description: "Analyzed properties worth $10M+",
                    unlocked: stats.totalValue >= 10000000,
                  },
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border transition-all ${
                      achievement.unlocked
                        ? "bg-luxury-blue/10 border-luxury-blue/20 shadow-lg"
                        : "bg-white/5 border-white/10 opacity-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-white/70">
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.unlocked && (
                        <span className="text-luxury-blue text-xl">✓</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <Card className="p-6 bg-gradient-to-br from-white/5 to-white/10 border border-white/20">
              <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2 text-luxury-blue">
                <Activity className="w-5 h-5" />
                Recent Activity
              </h2>
              {recentActivity.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-white/70">No recent activity</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <div
                          className={`w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center ${activity.color}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{activity.title}</p>
                          <p className="text-sm text-white/70">
                            {formatRelativeTime(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>

            {/* Top Properties */}
            <Card className="p-6 bg-gradient-to-br from-white/5 to-white/10 border border-white/20">
              <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2 text-luxury-blue">
                <TrendingUp className="w-5 h-5" />
                Top Properties
              </h2>
              {properties.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-white/70">No properties analyzed yet</p>
                  <Button onClick={() => router.push("/")} className="mt-4">
                    Analyze Your First Property
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {properties
                    .sort(
                      (a, b) =>
                        (b.analysis_data.propertyOverview?.listPrice || 0) -
                        (a.analysis_data.propertyOverview?.listPrice || 0),
                    )
                    .slice(0, 5)
                    .map((property) => (
                      <div
                        key={property.id}
                        onClick={() => router.push(`/library/${property.id}`)}
                        className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        {property.analysis_data.media?.images?.[0] ? (
                          <img
                            src={property.analysis_data.media.images[0]}
                            alt={property.address}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-white/5 rounded-lg flex items-center justify-center">
                            <Home className="w-8 h-8 text-white/30" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">
                            {property.address}
                          </h3>
                          <p className="text-sm text-white/70">
                            {property.analysis_data.propertyOverview?.city},{" "}
                            {property.analysis_data.propertyOverview?.state}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">
                            {property.analysis_data.propertyOverview?.listPrice
                              ? formatPrice(
                                  property.analysis_data.propertyOverview
                                    .listPrice,
                                )
                              : "N/A"}
                          </p>
                          <p className="text-sm text-luxury-blue font-semibold">
                            Grade{" "}
                            {property.analysis_data.aiAnalysis?.buyingGrade ||
                              "N/A"}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
