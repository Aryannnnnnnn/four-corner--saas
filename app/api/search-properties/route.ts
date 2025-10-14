// app/api/search-properties/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  logActivity,
  getIpFromRequest,
  getUserAgentFromRequest,
} from "@/app/lib/utils/activityLogger";

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

    // Log property search activity (only if user is authenticated)
    const session = await auth();
    console.log("Search - Session check:", {
      hasSession: !!session,
      hasUser: !!session?.user,
      userId: session?.user?.id
    });

    if (session?.user?.id) {
      try {
        const filters = body.filters || {};
        console.log("Logging property search for user:", session.user.id);

        // Log to user_activity_log table instead
        await logActivity({
          userId: session.user.id,
          activityType: "property_searched",
          metadata: {
            search_query: body.location || "property search",
            search_type: body.status_type || "general_search",
            filters_applied: {
              location: body.location,
              minPrice: filters.minPrice,
              maxPrice: filters.maxPrice,
              bedsMin: filters.bedsMin,
              bedsMax: filters.bedsMax,
              bathsMin: filters.bathsMin,
              bathsMax: filters.bathsMax,
              sqftMin: filters.sqftMin,
              sqftMax: filters.sqftMax,
              lotMin: filters.lotMin,
              lotMax: filters.lotMax,
              builtYearMin: filters.builtYearMin,
              builtYearMax: filters.builtYearMax,
              daysOnZillow: filters.daysOnZillow,
              hoaMax: filters.hoaMax,
              homeType: filters.homeType,
              hasPool: filters.hasPool,
              hasGarage: filters.hasGarage,
              hasAC: filters.hasAC,
              keywords: filters.keywords,
              sort: filters.sort,
            },
            results_count: data.totalResults || data.results?.length || 0,
            result_preview: data.results?.slice(0, 5).map((r: any) => ({
              address: r.address,
              price: r.price,
              bedrooms: r.bedrooms,
              bathrooms: r.bathrooms,
            })) || [],
          },
          ipAddress: getIpFromRequest(request),
          userAgent: getUserAgentFromRequest(request),
        });

        console.log("Property search logged successfully");
      } catch (logError) {
        console.error("Failed to log property search:", logError);
        // Don't fail the search if logging fails
      }
    } else {
      console.log("User not authenticated, skipping search logging");
    }

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
