// app/api/admin/users/route.ts
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

// GET - Fetch all users with their stats
export async function GET(req: NextRequest) {
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

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") || "all";

    // Fetch users with their listing counts and admin status
    // Use specific foreign keys to avoid ambiguity
    let query = supabase
      .from("users")
      .select(`
        *,
        property_listings:property_listings!property_listings_user_id_fkey(count),
        admin_users:admin_users!admin_users_user_id_fkey(user_id, role)
      `)
      .order("created_at", { ascending: false });

    // Apply search filter
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,email.ilike.%${search}%`
      );
    }

    const { data: users, error } = await query;

    if (error) {
      logger.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch users" },
        { status: 500 }
      );
    }

    // Transform the data to include listing count and role
    let usersWithStats = users?.map((user) => ({
      ...user,
      listingsCount: user.property_listings?.[0]?.count || 0,
      role: user.admin_users?.user_id ? "admin" : "user",
    }));

    // Apply role filter after transformation
    if (role !== "all") {
      usersWithStats = usersWithStats?.filter((user) => user.role === role);
    }

    return NextResponse.json(
      {
        users: usersWithStats || [],
        count: usersWithStats?.length || 0,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Fetch users error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
