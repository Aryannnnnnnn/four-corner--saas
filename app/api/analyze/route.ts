import { type NextRequest, NextResponse } from "next/server";
import { analysisRateLimit } from "@/app/lib/utils/ratelimit";
import { auth } from "../../../auth";
import { transformApiResponseToPropertyData } from "../../lib/utils/dataTransform";

// Timeout duration for webhook (2 minutes)
const WEBHOOK_TIMEOUT = 120000;

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to analyze properties." },
        { status: 401 },
      );
    }

    // Rate limiting - 10 analyses per hour per user
    const identifier = session.user.email || session.user.id;
    const { success, reset } = await analysisRateLimit.limit(identifier);

    if (!success) {
      const minutesLeft = Math.ceil((reset - Date.now()) / 60000);
      return NextResponse.json(
        {
          error: `Analysis limit reached (10 per hour). Try again in ${minutesLeft} minute${minutesLeft !== 1 ? "s" : ""}.`,
        },
        { status: 429 },
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await req.json();
    } catch (_error) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const { address } = body;

    // Validate address
    if (
      !address ||
      typeof address !== "string" ||
      address.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Valid address is required" },
        { status: 400 },
      );
    }

    // Check if webhook URL is configured
    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("NEXT_PUBLIC_WEBHOOK_URL is not configured");
      return NextResponse.json(
        {
          error: "Analysis service is not configured. Please contact support.",
        },
        { status: 500 },
      );
    }

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT);

    let webhookResponse;
    try {
      // Call webhook with timeout
      webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Four-Corner-Properties/1.0",
        },
        body: JSON.stringify({
          address: address.trim(),
          userId: session.user.id,
          requestedAt: new Date().toISOString(),
        }),
        signal: controller.signal,
      });
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === "AbortError") {
        console.error("Webhook timeout:", error);
        return NextResponse.json(
          {
            error:
              "Analysis is taking too long. Please try again or contact support if the issue persists.",
            code: "TIMEOUT",
          },
          { status: 504 },
        );
      }

      console.error("Webhook request error:", error);
      return NextResponse.json(
        {
          error:
            "Failed to connect to analysis service. Please check your internet connection and try again.",
          code: "NETWORK_ERROR",
        },
        { status: 503 },
      );
    } finally {
      clearTimeout(timeoutId);
    }

    // Check webhook response status
    if (!webhookResponse.ok) {
      const statusCode = webhookResponse.status;
      let errorMessage = "Property analysis failed";

      try {
        const errorData = await webhookResponse.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {
        errorMessage = webhookResponse.statusText || errorMessage;
      }

      console.error("Webhook error:", {
        status: statusCode,
        message: errorMessage,
        address,
      });

      if (statusCode === 404) {
        return NextResponse.json(
          {
            error:
              "Property not found. Please check the address and try again.",
            code: "PROPERTY_NOT_FOUND",
          },
          { status: 404 },
        );
      }

      if (statusCode === 400) {
        return NextResponse.json(
          {
            error:
              "Invalid property address. Please provide a valid US address.",
            code: "INVALID_ADDRESS",
          },
          { status: 400 },
        );
      }

      if (statusCode === 429) {
        return NextResponse.json(
          {
            error:
              "Too many requests. Please wait a moment before trying again.",
            code: "RATE_LIMIT",
          },
          { status: 429 },
        );
      }

      return NextResponse.json(
        {
          error: errorMessage,
          code: "WEBHOOK_ERROR",
        },
        { status: statusCode },
      );
    }

    // Parse webhook response
    let rawData;
    try {
      rawData = await webhookResponse.json();
    } catch (error) {
      console.error("Failed to parse webhook response:", error);
      return NextResponse.json(
        {
          error: "Received invalid response from analysis service.",
          code: "INVALID_RESPONSE",
        },
        { status: 500 },
      );
    }

    // Transform the API response to match our PropertyData interface
    let data;
    try {
      data = transformApiResponseToPropertyData(rawData);
    } catch (error) {
      console.error("Failed to transform API response:", error);
      return NextResponse.json(
        {
          error: "Failed to process analysis data.",
          code: "TRANSFORM_ERROR",
        },
        { status: 500 },
      );
    }

    // Validate response data
    if (!data || typeof data !== "object") {
      console.error("Invalid data structure from webhook:", data);
      return NextResponse.json(
        {
          error: "Received invalid data from analysis service.",
          code: "INVALID_DATA",
        },
        { status: 500 },
      );
    }

    // Check if analysis was successful
    if (!data.success && !data.propertyOverview) {
      console.error("Analysis unsuccessful:", data);
      return NextResponse.json(
        {
          error: "Analysis failed. Please try again.",
          code: "ANALYSIS_FAILED",
        },
        { status: 500 },
      );
    }

    // Add mock chart data if missing
    if (!data.charts || !data.charts.valueProjection || !data.charts.roi) {
      const currentYear = new Date().getFullYear();
      const mockCharts = {
        valueProjection: {
          title: "10-Year Value Projection",
          type: "line" as const,
          labels: Array.from({ length: 11 }, (_, i) =>
            (currentYear + i).toString(),
          ),
          datasets: [
            {
              label: "Projected Value",
              data: Array.from({ length: 11 }, (_, i) => {
                const baseValue = data.propertyOverview?.listPrice || 500000;
                const growthRate = 1.03; // 3% annual growth
                return Math.round(baseValue * growthRate ** i);
              }),
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              tension: 0.1,
            },
          ],
        },
        roi: {
          title: "ROI Timeline",
          type: "line" as const,
          labels: Array.from({ length: 11 }, (_, i) =>
            (currentYear + i).toString(),
          ),
          datasets: [
            {
              label: "ROI Percentage",
              data: Array.from({ length: 11 }, (_, i) =>
                Math.round(i * 2.5 + 5),
              ), // 5% starting, +2.5% per year
              borderColor: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              tension: 0.1,
            },
          ],
        },
        equity: {
          title: "Equity Growth",
          type: "line" as const,
          labels: Array.from({ length: 11 }, (_, i) =>
            (currentYear + i).toString(),
          ),
          datasets: [
            {
              label: "Equity Value",
              data: Array.from({ length: 11 }, (_, i) => {
                const baseEquity =
                  (data.propertyOverview?.listPrice || 500000) * 0.2; // 20% down payment
                return Math.round(baseEquity * 1.05 ** i); // 5% equity growth
              }),
              borderColor: "#f59e0b",
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              tension: 0.1,
            },
          ],
        },
      };

      data.charts = { ...data.charts, ...mockCharts };
    }

    // Automatically save the analysis to the library
    try {
      // Check if property already exists for this user
      const { createClient } = await import("@supabase/supabase-js");

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error("Missing required Supabase environment variables");
      }

      const supabase = createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          persistSession: false,
        },
      });

      const { data: existingProperty } = await supabase
        .from("properties")
        .select("id")
        .eq("user_id", session.user.id)
        .eq("address", address.trim())
        .maybeSingle();

      if (!existingProperty) {
        // Save the analysis to the library
        const { error: saveError } = await supabase.from("properties").insert({
          user_id: session.user.id,
          address: address.trim(),
          analysis_data: data,
          created_at: new Date().toISOString(),
        });

        if (saveError) {
          console.error("Failed to auto-save analysis to library:", saveError);
          // Don't fail the analysis if saving fails, just log it
        }
      }
    } catch (saveError) {
      console.error("Error during auto-save:", saveError);
      // Don't fail the analysis if saving fails
    }

    // Return successful response
    return NextResponse.json({
      ...data,
      analyzedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Unexpected analysis error:", error);

    return NextResponse.json(
      {
        error:
          "An unexpected error occurred. Please try again or contact support.",
        code: "INTERNAL_ERROR",
      },
      { status: 500 },
    );
  }
}
