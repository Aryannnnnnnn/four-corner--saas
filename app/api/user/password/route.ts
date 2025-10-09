import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
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

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Validate input
    const validation = passwordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error,
        },
        { status: 400 },
      );
    }

    const { currentPassword, newPassword } = validation.data;

    // Check if new password is same as current
    if (currentPassword === newPassword) {
      return NextResponse.json(
        { error: "New password must be different from current password" },
        { status: 400 },
      );
    }

    // Get current password hash
    const { data: credResult, error: credError } = await supabase
      .from("user_credentials")
      .select("password_hash")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (credError || !credResult) {
      console.error(
        "No credentials found for user:",
        session.user.id,
        credError,
      );
      return NextResponse.json(
        {
          error:
            "This account uses social login (Google). Password change is not available for OAuth accounts.",
        },
        { status: 400 },
      );
    }

    // Verify current password
    const isValid = await bcrypt.compare(
      currentPassword,
      credResult.password_hash,
    );
    if (!isValid) {
      console.error("Password verification failed for user:", session.user.id);
      return NextResponse.json(
        { error: "Current password is incorrect. Please try again." },
        { status: 401 },
      );
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    // Update password
    const { error: updateError } = await supabase
      .from("user_credentials")
      .update({
        password_hash: newPasswordHash,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", session.user.id);

    if (updateError) {
      console.error("Database error:", updateError);
      throw updateError;
    }

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { error: "Failed to change password" },
      { status: 500 },
    );
  }
}
