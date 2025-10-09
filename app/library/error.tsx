"use client";

import * as Sentry from "@sentry/nextjs";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect } from "react";

export default function LibraryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Report to Sentry with library-specific context
    Sentry.captureException(error, {
      tags: {
        component: "LibraryPage",
        errorDigest: error.digest,
        feature: "property-library",
      },
      contexts: {
        libraryError: {
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
      // If reset fails, navigate to dashboard
      window.location.href = "/dashboard";
    }
  }, [reset]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 text-center">
        <div className="mx-auto w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10 text-orange-400" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">Library Error</h1>

        <p className="text-white/80 mb-8 leading-relaxed">
          We're having trouble loading your property library. This might be a
          temporary issue with our servers.
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
            Reload Library
          </button>

          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200 font-medium border border-white/20"
          >
            <Home className="w-5 h-5" />
            Dashboard
          </Link>
        </div>

        <p className="text-white/60 text-sm mt-6">
          Your saved properties are safe. Please try refreshing or check back in
          a moment.
        </p>
      </div>
    </div>
  );
}
