import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const { data: isAdminData } = await supabase.rpc("is_admin", {
      user_email: session.user.email,
    });

    if (!isAdminData) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get stats for each status
    const { data: allListings, error: listingsError } = await supabase
      .from("property_listings")
      .select("id, status");

    if (listingsError) {
      console.error("Error fetching listings:", listingsError);
      return NextResponse.json(
        { error: "Failed to fetch listings" },
        { status: 500 }
      );
    }

    const stats = {
      total: allListings.length,
      pending: allListings.filter((l) => l.status === "pending").length,
      approved: allListings.filter((l) => l.status === "approved").length,
      rejected: allListings.filter((l) => l.status === "rejected").length,
      draft: allListings.filter((l) => l.status === "draft").length,
    };

    // Get recent listings (last 10)
    const { data: recentListings, error: recentError } = await supabase
      .from("property_listings")
      .select("id, title, created_at, status, list_price, city")
      .order("created_at", { ascending: false })
      .limit(10);

    if (recentError) {
      console.error("Error fetching recent listings:", recentError);
      return NextResponse.json(
        { error: "Failed to fetch recent listings" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      stats,
      recentListings: recentListings || [],
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
