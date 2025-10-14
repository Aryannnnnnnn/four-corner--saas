import { createClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
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

// Validation schema
const updateAccountSchema = z
  .object({
    name: z.string().min(1).max(100).optional(),
    email: z.string().email().optional(),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits").optional().or(z.literal("")),
  })
  .refine((data) => data.name || data.email || data.phone !== undefined, {
    message: "At least one field must be provided",
  });

// PATCH - Update account info
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Validate input
    const validation = updateAccountSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error,
        },
        { status: 400 },
      );
    }

    const { name, email, phone } = validation.data;
    const updates: Record<string, string | null> = {};

    if (name) {
      updates.name = name.trim();
    }

    if (email && email !== session.user.email) {
      // Check if email is already taken
      const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("email", email.toLowerCase())
        .neq("id", session.user.id)
        .maybeSingle();

      if (existingUser) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 409 },
        );
      }

      updates.email = email.toLowerCase();
      updates.email_verified = null; // Require re-verification
    }

    if (phone !== undefined) {
      if (phone === "") {
        updates.phone = null; // Allow clearing phone number
      } else {
        // Check if phone is already taken
        const { data: existingPhone } = await supabase
          .from("users")
          .select("id")
          .eq("phone", phone)
          .neq("id", session.user.id)
          .maybeSingle();

        if (existingPhone) {
          return NextResponse.json(
            { error: "Phone number already in use" },
            { status: 409 },
          );
        }

        updates.phone = phone;
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No changes to update" },
        { status: 400 },
      );
    }

    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", session.user.id)
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    // If email was changed, you might want to send a verification email here
    // await sendVerificationEmail(email)

    return NextResponse.json({
      user: data,
      message: email
        ? "Account updated. Please verify your new email."
        : "Account updated successfully",
    });
  } catch (error) {
    console.error("Update account error:", error);
    return NextResponse.json(
      { error: "Failed to update account" },
      { status: 500 },
    );
  }
}

// DELETE - Delete account
export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Optional: Require password confirmation
    const body = await req.json().catch(() => ({}));
    const { confirmPassword } = body;

    // If using credentials auth, verify password before deletion
    if (confirmPassword) {
      const { data: credential } = await supabase
        .from("user_credentials")
        .select("password_hash")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (credential) {
        const bcrypt = await import("bcryptjs");
        const isValid = await bcrypt.compare(
          confirmPassword,
          credential.password_hash,
        );

        if (!isValid) {
          return NextResponse.json(
            { error: "Invalid password" },
            { status: 401 },
          );
        }
      }
    }

    // Delete related data first (cascade delete)
    // Delete properties
    await supabase.from("properties").delete().eq("user_id", session.user.id);

    // Delete credentials
    await supabase
      .from("user_credentials")
      .delete()
      .eq("user_id", session.user.id);

    // Delete sessions
    await supabase.from("sessions").delete().eq("userId", session.user.id);

    // Delete accounts (OAuth)
    await supabase.from("accounts").delete().eq("userId", session.user.id);

    // Finally, delete the user
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", session.user.id);

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 },
    );
  }
}
