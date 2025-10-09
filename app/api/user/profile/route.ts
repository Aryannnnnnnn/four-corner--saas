import { createClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "../../../../auth";

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

// Profile update validation schema
const profileUpdateSchema = z
  .object({
    name: z.string().min(1).max(100).optional(),
    bio: z.string().max(500).optional(),
    phone: z.string().max(20).optional(),
    location: z.string().max(200).optional(),
    website: z.string().url().optional().or(z.literal("")),
    avatar_url: z.string().url().optional().or(z.literal("")),
    preferences: z.object({}).passthrough().optional(),
  })
  .strict(); // Reject any fields not in the schema

// GET - Fetch user profile
export async function GET(_req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("users")
      .select(
        "id, email, name, image, bio, phone, location, website, avatar_url, preferences, created_at, updated_at, email_verified",
      )
      .eq("id", session.user.id)
      .maybeSingle();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Database error", details: error.message },
        { status: 500 },
      );
    }

    // If no profile exists, return default empty profile
    if (!data) {
      return NextResponse.json({
        profile: {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
          bio: "",
          phone: "",
          location: "",
          website: "",
          avatar_url: "",
          preferences: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          email_verified: null,
        },
      });
    }

    return NextResponse.json(
      { profile: data },
      {
        headers: {
          "Cache-Control": "private, max-age=300, stale-while-revalidate=60",
        },
      },
    );
  } catch (error) {
    console.error("Fetch profile error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch profile",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// PATCH - Update user profile
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Validate input
    const validation = profileUpdateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error,
        },
        { status: 400 },
      );
    }

    const updates = validation.data;

    // Check if there are any updates
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 },
      );
    }

    // Add updated_at timestamp
    const updatePayload = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("users")
      .update(updatePayload)
      .eq("id", session.user.id)
      .select(
        "id, email, name, image, bio, phone, location, website, avatar_url, preferences, created_at, updated_at, email_verified",
      )
      .single();

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    if (!data) {
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      profile: data,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}
