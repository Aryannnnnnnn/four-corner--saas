import { createClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "../../../auth";

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

// GET - Fetch all properties for user
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      // Return empty array instead of error for unauthenticated users
      return NextResponse.json({
        properties: [],
        count: 0,
      });
    }

    // Optional: Get query params for filtering
    const { searchParams } = new URL(req.url);
    const isFavorite = searchParams.get("favorite");

    let query = supabase
      .from("properties")
      .select("id, address, analysis_data, is_favorite, created_at, updated_at")
      .eq("user_id", session.user.id);

    // Apply filters if provided
    if (isFavorite === "true") {
      query = query.eq("is_favorite", true);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) {
      console.error("Database error:", error);
      // Return empty array on database error instead of failing
      return NextResponse.json({
        properties: [],
        count: 0,
        error: error.message,
      });
    }

    return NextResponse.json(
      {
        properties: data || [],
        count: data?.length || 0,
      },
      {
        headers: {
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    );
  } catch (error) {
    console.error("Fetch properties error:", error);
    // Return empty array instead of error
    return NextResponse.json({
      properties: [],
      count: 0,
      error:
        error instanceof Error ? error.message : "Failed to fetch properties",
    });
  }
}

// POST - Save new property analysis
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { address, analysis_data } = body;

    // Validation
    if (!address || typeof address !== "string") {
      return NextResponse.json(
        { error: "Address is required and must be a string" },
        { status: 400 },
      );
    }

    if (!analysis_data || typeof analysis_data !== "object") {
      return NextResponse.json(
        { error: "Analysis data is required and must be an object" },
        { status: 400 },
      );
    }

    // Check if property already exists
    const { data: existingProperty } = await supabase
      .from("properties")
      .select("id")
      .eq("user_id", session.user.id)
      .eq("address", address)
      .maybeSingle();

    if (existingProperty) {
      return NextResponse.json(
        { error: "Property with this address already exists" },
        { status: 409 },
      );
    }

    const { data, error } = await supabase
      .from("properties")
      .insert({
        user_id: session.user.id,
        address: address.trim(),
        analysis_data,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    return NextResponse.json({ property: data }, { status: 201 });
  } catch (error) {
    console.error("Save property error:", error);
    return NextResponse.json(
      { error: "Failed to save property" },
      { status: 500 },
    );
  }
}
