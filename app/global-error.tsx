"use client";

import * as Sentry from "@sentry/nextjs";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { useCallback, useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Report to Sentry with additional context
    Sentry.captureException(error, {
      tags: {
        component: "GlobalError",
        errorDigest: error.digest,
      },
      contexts: {
        errorBoundary: {
          componentStack: error.stack,
          errorMessage: error.message,
        },
      },
    });
  }, [error]);

  const handleReset = useCallback(() => {
    try {
      reset();
    } catch (_resetError) {
      // If reset fails, reload the page
      window.location.reload();
    }
  }, [reset]);

  const goHome = useCallback(() => {
    window.location.href = "/";
  }, []);

  return (
    <html>
      <body className="bg-gray-50 min-h-screen">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>

            <p className="text-gray-600 mb-8">
              We encountered an unexpected error. Our team has been notified and
              is working on a fix.
            </p>

            {process.env.NODE_ENV === "development" && (
              <details className="text-left mb-6 p-4 bg-gray-100 rounded-md">
                <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                  Error Details (Development)
                </summary>
                <pre className="text-xs text-gray-600 overflow-auto">
                  {error.message}
                  {error.digest && `\nDigest: ${error.digest}`}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>

              <button
                type="button"
                onClick={goHome}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                <Home className="w-4 h-4" />
                Go Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
