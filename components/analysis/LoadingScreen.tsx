"use client";

import { BarChart3, CheckCircle, Home, Search, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  address: string;
  progress?: number;
}

const loadingSteps = [
  {
    id: 1,
    icon: Search,
    title: "Searching Zillow Database",
    description: "Finding property information...",
  },
  {
    id: 2,
    icon: Home,
    title: "Fetching Property Details",
    description: "Retrieving images, pricing, and features...",
  },
  {
    id: 3,
    icon: TrendingUp,
    title: "Finding Comparable Properties",
    description: "Analyzing similar properties in the area...",
  },
  {
    id: 4,
    icon: BarChart3,
    title: "AI Analysis",
    description: "Generating insights and recommendations...",
  },
  {
    id: 5,
    icon: CheckCircle,
    title: "Calculating Projections",
    description: "Computing ROI and value projections...",
  },
];

export default function LoadingScreen({
  address,
  progress: externalProgress,
}: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [internalProgress, setInternalProgress] = useState(0);

  // Use external progress if provided, otherwise use internal progress
  const progress =
    externalProgress !== undefined ? externalProgress : internalProgress;

  useEffect(() => {
    const stepDuration = 3000; // 3 seconds per step
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          setCompletedSteps((completed) => [...completed, prev]);
          return prev + 1;
        }
        return prev;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Only run internal progress if external progress is not provided
    if (externalProgress === undefined) {
      const progressInterval = setInterval(() => {
        setInternalProgress((prev) => {
          const targetProgress =
            ((currentStep + 1) / loadingSteps.length) * 100;
          if (prev < targetProgress) {
            return Math.min(prev + 1, 100);
          }
          return prev;
        });
      }, 50);

      return () => clearInterval(progressInterval);
    }

    return () => {}; // Return empty cleanup function if external progress is used
  }, [currentStep, externalProgress]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="w-20 h-20 bg-luxury-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-12 h-12 border-4 border-luxury-blue border-t-transparent rounded-full animate-spin" />
          </div>
          <h1 className="font-display text-4xl font-bold">
            Analyzing Property
          </h1>
          <p className="text-white/70 text-xl">{address}</p>
        </div>

        {/* Loading Steps */}
        <div className="glass-card p-8 space-y-6">
          {loadingSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === index;
            const isCompleted = completedSteps.includes(index);

            return (
              <div
                key={step.id}
                className={`flex items-start gap-4 transition-all duration-500 ${
                  isActive
                    ? "opacity-100 scale-100"
                    : isCompleted
                      ? "opacity-60"
                      : "opacity-30"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                    isCompleted
                      ? "bg-green-500/20"
                      : isActive
                        ? "bg-luxury-blue/20 animate-pulse"
                        : "bg-white/5"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Icon
                      className={`w-6 h-6 ${
                        isActive ? "text-luxury-blue" : "text-white/50"
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-semibold mb-1 ${
                      isActive ? "text-white" : "text-white/70"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/50">{step.description}</p>
                </div>
                {isActive && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-luxury-blue rounded-full animate-ping" />
                    <span className="text-sm text-luxury-blue">
                      In progress
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>Analysis Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-luxury-blue via-luxury-blue to-luxury-blue rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Estimated Time */}
        <p className="text-center text-white/50 text-sm">
          This usually takes 15-30 seconds
        </p>
      </div>
    </div>
  );
}
