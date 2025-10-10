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

// Settings validation schema
const settingsSchema = z
  .object({
    theme: z.enum(["light", "dark", "system"]).optional(),
    notifications: z
      .object({
        email: z.boolean().optional(),
        push: z.boolean().optional(),
        sms: z.boolean().optional(),
      })
      .optional(),
    privacy: z
      .object({
        profile_visibility: z.enum(["public", "private", "friends"]).optional(),
        show_email: z.boolean().optional(),
      })
      .optional(),
    preferences: z
      .object({
        language: z.string().optional(),
        timezone: z.string().optional(),
        currency: z.string().optional(),
      })
      .optional(),
  })
  .passthrough();

// GET - Fetch user settings
export async function GET(_req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("user_settings")
      .select("*")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (error) {
      console.error("Database error:", error);
      // If the table or column doesn't exist, return default settings
      if (error.code === "42703" || error.code === "42P01") {
        console.log(
          "User settings table not found or has different schema, returning defaults",
        );
      } else {
        throw error;
      }
    }

    // Return default settings if none exist
    const defaultSettings = {
      theme: "system",
      notifications: {
        email: true,
        push: true,
        sms: false,
      },
      privacy: {
        profile_visibility: "public",
        show_email: false,
      },
      preferences: {
        language: "en",
        timezone: "UTC",
        currency: "USD",
      },
    };

    return NextResponse.json({
      settings: data || { ...defaultSettings, user_id: session.user.id },
    });
  } catch (error) {
    console.error("Fetch settings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 },
    );
  }
}

// PATCH - Update user settings
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Validate input
    const validation = settingsSchema.safeParse(body);
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
        { error: "No settings to update" },
        { status: 400 },
      );
    }

    // Upsert settings
    const { data, error } = await supabase
      .from("user_settings")
      .upsert(
        {
          user_id: session.user.id,
          ...updates,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        },
      )
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      // If the table doesn't exist, we can't update settings
      if (error.code === "42703" || error.code === "42P01") {
        return NextResponse.json({
          message: "Settings table not configured. Contact administrator.",
          settings: updates,
        });
      }
      throw error;
    }

    return NextResponse.json({
      settings: data,
      message: "Settings updated successfully",
    });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 },
    );
  }
}
