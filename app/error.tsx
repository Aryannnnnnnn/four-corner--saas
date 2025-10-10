"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            Something went wrong!
          </h1>
          <p className="text-white/70 text-lg">
            We're sorry, but something unexpected happened. Please try again.
          </p>
        </div>

        {error.message && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-sm text-red-400 font-mono">{error.message}</p>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Button
            onClick={reset}
            className="luxury-button"
          >
            Try Again
          </Button>
          <button
            onClick={() => window.location.href = "/"}
            className="px-8 py-3 bg-white/5 hover:bg-white/10 rounded-full font-semibold transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
