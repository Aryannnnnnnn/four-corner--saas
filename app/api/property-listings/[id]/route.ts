// app/api/property-listings/[id]/route.ts
import { createClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

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

// GET - Fetch single listing by ID
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = await auth();

    // Fetch the listing
    const { data, error } = await supabase
      .from("property_listings")
      .select(`
        *,
        images:property_images(*)
      `)
      .eq("id", id)
      .order("display_order", {
        foreignTable: "property_images",
        ascending: true,
      })
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Listing not found" },
          { status: 404 },
        );
      }
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch listing" },
        { status: 500 },
      );
    }

    // Check if user can view this listing
    // Allow if: listing is approved, OR user is the owner, OR user is admin
    const isApproved = data.status === "approved";
    const isOwner = session?.user?.id === data.user_id;

    // Check if user is admin
    let isAdmin = false;
    if (session?.user?.email) {
      const { data: isAdminData } = await supabase.rpc("is_admin", {
        user_email: session.user.email,
      });
      isAdmin = isAdminData || false;
    }

    if (!isApproved && !isOwner && !isAdmin) {
      return NextResponse.json(
        { error: "Listing not found or not available" },
        { status: 404 },
      );
    }

    return NextResponse.json({ listing: data }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
