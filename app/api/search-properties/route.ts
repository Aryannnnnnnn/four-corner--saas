// app/api/search-properties/route.ts
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // CHANGED: Use /webhook/ instead of /webhook-test/
    const n8nUrl =
      "https://zyneris.app.n8n.cloud/webhook/zillow-property-search";

    const response = await fetch(n8nUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("n8n error:", errorText);
      return NextResponse.json(
        {
          success: false,
          error: `n8n error: ${response.status}`,
          details: errorText,
        },
        { status: 500 },
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Search failed",
        results: [],
        totalResults: 0,
      },
      { status: 500 },
    );
  }
}
