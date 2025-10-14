// app/api/admin/users/[id]/route.ts
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

const updateUserSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  email: z.string().email().optional(),
  role: z.enum(["user", "admin"]).optional(),
});

const resetPasswordSchema = z.object({
  newPassword: z.string().min(8),
});

// GET - Fetch single user with details
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
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

    const userId = params.id;

    // Fetch user with their listings and admin status
    // Use specific foreign keys to avoid ambiguity
    const { data: user, error } = await supabase
      .from("users")
      .select(`
        *,
        property_listings:property_listings!property_listings_user_id_fkey(
          id,
          title,
          status,
          list_price,
          created_at
        ),
        admin_users:admin_users!admin_users_user_id_fkey(user_id, role)
      `)
      .eq("id", userId)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Add role based on admin_users table
    const userWithRole = {
      ...user,
      role: user.admin_users?.user_id ? "admin" : "user",
    };

    return NextResponse.json({ user: userWithRole }, { status: 200 });
  } catch (error) {
    logger.error("Fetch user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH - Update user
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
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

    const userId = params.id;
    const body = await req.json();

    // Validate input
    const validatedData = updateUserSchema.parse(body);
    const { role, ...userData } = validatedData;

    // Check if email already exists for other users
    if (validatedData.email) {
      const { data: existingEmail } = await supabase
        .from("users")
        .select("id")
        .eq("email", validatedData.email)
        .neq("id", userId)
        .single();

      if (existingEmail) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 }
        );
      }
    }

    // Update user basic info
    if (Object.keys(userData).length > 0) {
      const { error } = await supabase
        .from("users")
        .update({
          ...userData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (error) {
        logger.error("Update user error:", error);
        return NextResponse.json(
          { error: "Failed to update user" },
          { status: 500 }
        );
      }
    }

    // Handle role change if provided
    if (role) {
      if (role === "admin") {
        // Add to admin_users if not already admin
        const { error } = await supabase
          .from("admin_users")
          .upsert({
            user_id: userId,
            role: "admin",
            assigned_by: session.user.id,
            assigned_at: new Date().toISOString(),
          });

        if (error) {
          logger.error("Failed to add admin role:", error);
          return NextResponse.json(
            { error: "Failed to update role" },
            { status: 500 }
          );
        }
      } else {
        // Remove from admin_users if demoting to user
        const { error } = await supabase
          .from("admin_users")
          .delete()
          .eq("user_id", userId);

        if (error) {
          logger.error("Failed to remove admin role:", error);
          // Don't fail if not found
        }
      }
    }

    // Fetch updated user with admin status
    const { data: updatedUser, error: fetchError } = await supabase
      .from("users")
      .select(`
        *,
        admin_users:admin_users!admin_users_user_id_fkey(user_id, role)
      `)
      .eq("id", userId)
      .single();

    if (fetchError) {
      logger.error("Fetch updated user error:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch updated user" },
        { status: 500 }
      );
    }

    const userWithRole = {
      ...updatedUser,
      role: updatedUser.admin_users?.user_id ? "admin" : "user",
    };

    return NextResponse.json({ user: userWithRole }, { status: 200 });
  } catch (error) {
    logger.error("Update user error:", error);
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

// DELETE - Delete user
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
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

    const userId = params.id;

    // Prevent admin from deleting themselves
    if (userId === session.user.id) {
      return NextResponse.json(
        { error: "Cannot delete your own account" },
        { status: 400 }
      );
    }

    // Delete user (cascade will handle related records)
    const { error } = await supabase.from("users").delete().eq("id", userId);

    if (error) {
      logger.error("Delete user error:", error);
      return NextResponse.json(
        { error: "Failed to delete user" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Delete user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
