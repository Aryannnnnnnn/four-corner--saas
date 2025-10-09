"use client";

import * as Sentry from "@sentry/nextjs";
import { AlertTriangle, ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect } from "react";

export default function AnalysisError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Report to Sentry with analysis-specific context
    Sentry.captureException(error, {
      tags: {
        component: "AnalysisPage",
        errorDigest: error.digest,
        feature: "property-analysis",
      },
      contexts: {
        analysisError: {
          errorMessage: error.message,
          timestamp: new Date().toISOString(),
        },
      },
    });
  }, [error]);

  const handleReset = useCallback(() => {
    try {
      reset();
    } catch (_resetError) {
      // If reset fails, navigate back to search
      window.location.href = "/search";
    }
  }, [reset]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 text-center">
        <div className="mx-auto w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10 text-red-400" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">Analysis Failed</h1>

        <p className="text-white/80 mb-8 leading-relaxed">
          We encountered an error while analyzing your property. This could be
          due to invalid address data or a temporary service issue.
        </p>

        {process.env.NODE_ENV === "development" && (
          <details className="text-left mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <summary className="cursor-pointer font-medium text-white/90 mb-2">
              Technical Details (Development)
            </summary>
            <pre className="text-xs text-white/70 overflow-auto">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>

          <Link
            href="/search"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200 font-medium border border-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Search
          </Link>
        </div>

        <p className="text-white/60 text-sm mt-6">
          If this problem persists, please contact support with the error
          details.
        </p>
      </div>
    </div>
  );
}
