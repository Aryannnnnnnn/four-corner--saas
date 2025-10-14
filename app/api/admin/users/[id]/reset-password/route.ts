// app/api/admin/users/[id]/reset-password/route.ts
import { createClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { logger } from "@/app/lib/utils/logger";
import { z } from "zod";
import bcrypt from "bcryptjs";

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

const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

// POST - Reset user password
export async function POST(
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
    const body = await req.json();

    // Validate input
    const { newPassword } = resetPasswordSchema.parse(body);

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update or insert user credentials
    const { error } = await supabase
      .from("user_credentials")
      .upsert({
        user_id: userId,
        password_hash: hashedPassword,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      logger.error("Reset password error:", error);
      return NextResponse.json(
        { error: "Failed to reset password" },
        { status: 500 }
      );
    }

    logger.log(`Password reset for user ${userId} by admin ${session.user.id}`);

    return NextResponse.json(
      { success: true, message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Reset password error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
