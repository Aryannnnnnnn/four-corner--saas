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

    // Check if user has password credentials
    const { data, error } = await supabase
      .from("user_credentials")
      .select("user_id")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (error) {
      console.error("Database error checking password:", error);
    }

    return NextResponse.json({
      hasPassword: !!data,
    });
  } catch (error) {
    console.error("Check password error:", error);
    return NextResponse.json({ hasPassword: false }, { status: 200 });
  }
}
