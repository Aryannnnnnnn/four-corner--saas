// app/api/analyze-property/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/app/lib/utils/logger";
import { analyzePropertyRatelimit } from "@/app/lib/ratelimit";
import { auth } from "../../../auth";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();

    // Rate limiting for authenticated users only
    if (session?.user) {
      const ip =
        request.headers.get("x-forwarded-for") ??
        request.headers.get("x-real-ip") ??
        "127.0.0.1";
      const { success, limit, reset, remaining } =
        await analyzePropertyRatelimit.limit(ip);

      if (!success) {
        return NextResponse.json(
          {
            success: false,
            error: "Too many analysis requests. Please try again later.",
            rateLimit: {
              limit,
              remaining,
              reset: new Date(reset).toISOString(),
            },
          },
          {
            status: 429,
            headers: {
              "X-RateLimit-Limit": limit.toString(),
              "X-RateLimit-Remaining": remaining.toString(),
              "X-RateLimit-Reset": reset.toString(),
            },
          },
        );
      }
    }

    const body = await request.json();
    const { address, zpid } = body;

    if (!address) {
      return NextResponse.json(
        { success: false, error: "Address is required" },
        { status: 400 },
      );
    }

    // Call your original analysis workflow (PRODUCTION webhook)
    const n8nUrl =
      "https://n8n.srv1067543.hstgr.cloud/webhook/zillow-zpid-property-analysis";

    const response = await fetch(n8nUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: address,
        zpid: zpid, // Pass zpid to workflow for direct lookup
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error("n8n Error Response:", errorText.substring(0, 500));

      return NextResponse.json(
        {
          success: false,
          error: `Analysis failed (${response.status}). Workflow may not be active.`,
          details: errorText.substring(0, 200),
        },
        { status: 500 },
      );
    }

    // Check content type
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await response.text();
      logger.error("Non-JSON response:", text.substring(0, 500));

      return NextResponse.json(
        {
          success: false,
          error:
            "Workflow returned HTML instead of JSON. Make sure workflow is ACTIVE (not just tested).",
          hint: 'Go to n8n → Click the "Active" toggle at top-right',
        },
        { status: 500 },
      );
    }

    const data = await response.json();

    // Validate response structure
    if (!data.success || !data.propertyOverview) {
      logger.error(
        "Invalid response structure:",
        JSON.stringify(data).substring(0, 200),
      );
      return NextResponse.json(
        {
          success: false,
          error: "Invalid response from analysis workflow",
          receivedData: data,
        },
        { status: 500 },
      );
    }

    // Add environmental data from climate if not already present
    // Check both locations where climate data might be
    const climate = data.rawApiData?.propertyDetails?.climate || data.propertyDetails?.climate;

    if (!data.environmental && climate) {
      data.environmental = {
        flood: climate.floodSources?.primary ? {
          floodFactorScore: climate.floodSources.primary.riskScore?.value || 1,
          floodFactorSeverity: climate.floodSources.primary.riskScore?.label || "Unknown",
          riskTrend: climate.floodSources.primary.probability?.[climate.floodSources.primary.probability.length - 1]?.probability >
            climate.floodSources.primary.probability?.[0]?.probability ? "increasing" : "not changing",
          femaZone: climate.floodSources.primary.femaZone?.replace(/_/g, " ").replace(/X UNSHADED/i, "X (unshaded)").replace(/X SHADED/i, "X (shaded)") || "Unknown",
          insuranceRequired: climate.floodSources.primary.insuranceSeparatePolicy === "REQUIRED" ||
                            climate.floodSources.primary.insuranceSeparatePolicy === "STRONGLY_RECOMMENDED",
          estimatedInsuranceMin: 435,
          estimatedInsuranceMax: 1294,
          description: `This property has ${climate.floodSources.primary.riskScore?.label?.toLowerCase() || "unknown"} flood risk in the Flood Factor™ model.`,
        } : undefined,
      };
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    logger.error("========================================");
    logger.error("API ROUTE ERROR");
    logger.error("========================================");
    logger.error("Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Analysis failed",
        type: error?.constructor?.name,
      },
      { status: 500 },
    );
  }
}
