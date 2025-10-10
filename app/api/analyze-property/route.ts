// app/api/analyze-property/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/app/lib/utils/logger";
import { analyzePropertyRatelimit } from "@/app/lib/ratelimit";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "127.0.0.1";
    const { success, limit, reset, remaining } = await analyzePropertyRatelimit.limit(ip);

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
      "https://zyneris.app.n8n.cloud/webhook/zillow-zpid-property-analysis";

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
