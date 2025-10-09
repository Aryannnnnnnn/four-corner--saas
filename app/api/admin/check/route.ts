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
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }

    // Check if user is admin using the is_admin() function
    const { data, error } = await supabase.rpc("is_admin", {
      user_email: session.user.email,
    });

    if (error) {
      console.error("Error checking admin status:", error);
      return NextResponse.json({ isAdmin: false }, { status: 500 });
    }

    return NextResponse.json({ isAdmin: data || false });
  } catch (error) {
    console.error("Admin check error:", error);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
}
