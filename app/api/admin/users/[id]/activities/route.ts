// app/api/admin/users/[id]/activities/route.ts
import { createClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { logger } from "@/app/lib/utils/logger";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
  },
});

// Helper function to generate human-readable descriptions
function generateActivityDescription(activityType: string, metadata: any): string {
  if (!metadata) return activityType.replace(/_/g, " ");

  switch (activityType) {
    case "property_analyzed":
      return `Analyzed property at ${metadata.address || "unknown address"}${
        metadata.list_price
          ? ` ($${metadata.list_price.toLocaleString()})`
          : ""
      }`;

    case "listing_viewed":
      const isOwner = metadata.is_owner ? " (own listing)" : "";
      return `Viewed listing: ${metadata.listing_title || "Property"}${
        metadata.list_price
          ? ` - $${metadata.list_price.toLocaleString()}`
          : ""
      }${isOwner}`;

    case "saved_property_viewed":
      return `Viewed saved property: ${metadata.address || "Property"}${
        metadata.is_favorite ? " ⭐" : ""
      }`;

    case "listing_created":
      return `Created new listing: ${metadata.title || "Property"} in ${
        metadata.city || ""
      }, ${metadata.state || ""}${
        metadata.list_price
          ? ` for $${metadata.list_price.toLocaleString()}`
          : ""
      }`;

    case "listing_updated":
      return `Updated listing: ${metadata.listing_title || metadata.title || "Property"}`;

    case "listing_deleted":
      return `Deleted listing: ${metadata.listing_title || metadata.title || "Property"}`;

    case "listing_submitted":
      return `Submitted listing for review: ${metadata.listing_title || "Property"}`;

    case "listing_approved":
      return `Listing approved: ${metadata.listing_title || "Property"}`;

    case "listing_rejected":
      return `Listing rejected: ${metadata.listing_title || "Property"}`;

    case "user_login":
      return "Logged in to account";

    case "user_logout":
      return "Logged out of account";

    case "user_registered":
      return "Registered new account";

    case "profile_updated":
      const updates = [];
      if (metadata.name_changed) updates.push("name");
      if (metadata.email_changed) updates.push("email");
      if (metadata.phone_changed) updates.push("phone");
      return `Updated profile${updates.length > 0 ? ` (${updates.join(", ")})` : ""}`;

    case "password_changed":
      return "Changed account password";

    case "profile_viewed":
      return `Viewed ${metadata.profile_type || "user"} profile: ${metadata.profile_name || "Unknown"}`;

    case "settings_updated":
      return `Updated account settings${
        metadata.section ? ` (${metadata.section})` : ""
      }`;

    case "property_searched":
      return `Searched for properties${
        metadata.search_query ? `: "${metadata.search_query}"` : ""
      }${metadata.results_count !== undefined ? ` (${metadata.results_count} results)` : ""}`;

    default:
      return activityType.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  }
}

// GET - Fetch user activities
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const { data: adminCheck } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", session.user.id)
      .single();

    if (!adminCheck) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id: userId } = await params;
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const activityType = searchParams.get("type") || "all";
    const tab = searchParams.get("tab") || "all";

    // Fetch different types of activities based on tab
    if (tab === "searches") {
      // Fetch property search history
      const { data: searches, error } = await supabase
        .from("property_search_history")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) {
        logger.error("Fetch search history error:", error);
        return NextResponse.json(
          { error: "Failed to fetch search history" },
          { status: 500 }
        );
      }

      const activities = searches?.map((search) => ({
        id: search.id,
        activity_type: "property_searched",
        description: `Searched for: ${search.search_query || "properties"}`,
        metadata: {
          search_query: search.search_query,
          search_type: search.search_type,
          filters_applied: search.filters_applied,
          results_count: search.results_count,
        },
        created_at: search.created_at,
        ip_address: search.ip_address,
      })) || [];

      return NextResponse.json(
        {
          activities,
          count: activities.length,
        },
        { status: 200 }
      );
    }

    if (tab === "sessions") {
      // Fetch session tracking data
      const { data: sessions, error } = await supabase
        .from("user_sessions_tracking")
        .select("*")
        .eq("user_id", userId)
        .order("session_start", { ascending: false })
        .limit(limit);

      if (error) {
        logger.error("Fetch sessions error:", error);
        return NextResponse.json(
          { error: "Failed to fetch sessions" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          sessions: sessions || [],
          count: sessions?.length || 0,
        },
        { status: 200 }
      );
    }

    // Fetch general activity log
    let query = supabase
      .from("user_activity_log")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (activityType !== "all") {
      query = query.eq("activity_type", activityType);
    }

    const { data: activities, error } = await query;

    if (error) {
      logger.error("Fetch activities error:", error);

      // If table doesn't exist or error, return basic activity from listings
      const { data: listings } = await supabase
        .from("property_listings")
        .select("id, title, status, created_at, list_price")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit);

      const fallbackActivities = listings?.map((listing) => ({
        id: listing.id,
        activity_type: "listing_created",
        description: `Created listing: ${listing.title}`,
        activity_data: {
          listing_id: listing.id,
          listing_title: listing.title,
          listing_status: listing.status,
          listing_price: listing.list_price,
        },
        created_at: listing.created_at,
      })) || [];

      return NextResponse.json(
        {
          activities: fallbackActivities,
          count: fallbackActivities.length,
        },
        { status: 200 }
      );
    }

    // Transform activities with better descriptions
    const transformedActivities = activities?.map((activity) => ({
      ...activity,
      description: generateActivityDescription(activity.activity_type, activity.activity_data),
    })) || [];

    return NextResponse.json(
      {
        activities: transformedActivities,
        count: transformedActivities.length,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Fetch activities error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
