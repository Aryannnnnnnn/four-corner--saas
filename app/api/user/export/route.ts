import { createClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";

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

export async function GET(_req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all user data
    const [userResult, propertiesResult, settingsResult] = await Promise.all([
      supabase
        .from("users")
        .select(
          "id, email, name, image, created_at, updated_at, email_verified",
        )
        .eq("id", session.user.id)
        .single(),
      supabase
        .from("properties")
        .select(
          "id, address, analysis_data, is_favorite, status, created_at, updated_at",
        )
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("user_settings")
        .select("*")
        .eq("user_id", session.user.id)
        .maybeSingle(), // Use maybeSingle to handle non-existent settings
    ]);

    // Check for errors
    if (userResult.error) {
      console.error("User fetch error:", userResult.error);
      throw new Error("Failed to fetch user data");
    }

    if (propertiesResult.error) {
      console.error("Properties fetch error:", propertiesResult.error);
      throw new Error("Failed to fetch properties");
    }

    if (settingsResult.error) {
      console.error("Settings fetch error:", settingsResult.error);
      // Don't throw here, settings might not exist
    }

    // Sanitize data - remove sensitive information
    const sanitizedUser = {
      ...userResult.data,
      // Remove any sensitive fields if they exist
    };

    const exportData = {
      version: "1.0",
      exported_at: new Date().toISOString(),
      user: sanitizedUser,
      properties: propertiesResult.data || [],
      settings: settingsResult.data || null,
      statistics: {
        total_properties: propertiesResult.data?.length || 0,
        favorite_properties:
          propertiesResult.data?.filter((p) => p.is_favorite).length || 0,
      },
    };

    const filename = `four_corner_properties_export_${session.user.id}_${new Date().toISOString().split("T")[0]}.json`;

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Export data error:", error);
    return NextResponse.json(
      { error: "Failed to export data" },
      { status: 500 },
    );
  }
}
