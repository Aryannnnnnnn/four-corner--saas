import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendWelcomeEmail } from "@/app/lib/utils/email";
import { getClientIp, registerRateLimit } from "@/app/lib/utils/ratelimit";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: NextRequest) {
  try {
    // Rate limiting - 3 registration attempts per 10 minutes
    const ip = getClientIp(req);
    const { success, reset } = await registerRateLimit.limit(ip);

    if (!success) {
      const minutesLeft = Math.ceil((reset - Date.now()) / 60000);
      return NextResponse.json(
        {
          error: `Too many registration attempts. Please try again in ${minutesLeft} minute${minutesLeft !== 1 ? "s" : ""}.`,
        },
        { status: 429 },
      );
    }

    const body = await req.json();

    // Validate input
    const validatedData = registerSchema.parse(body);
    const { name, email, phone, password } = validatedData;

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email.toLowerCase())
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 },
      );
    }

    // Check if phone number already exists
    const { data: existingPhone } = await supabase
      .from("users")
      .select("id")
      .eq("phone", phone)
      .maybeSingle();

    if (existingPhone) {
      return NextResponse.json(
        { error: "User with this phone number already exists" },
        { status: 409 },
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const { data: user, error: userError } = await supabase
      .from("users")
      .insert({
        name,
        email: email.toLowerCase(),
        phone,
        email_verified: new Date().toISOString(),
      })
      .select()
      .single();

    if (userError) {
      console.error("User creation error:", userError);
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 },
      );
    }

    // Store password hash
    const { error: credError } = await supabase
      .from("user_credentials")
      .insert({
        user_id: user.id,
        password_hash: passwordHash,
      });

    if (credError) {
      console.error("Credentials error:", credError);
      // Rollback user creation
      await supabase.from("users").delete().eq("id", user.id);
      return NextResponse.json(
        { error: "Failed to create user credentials" },
        { status: 500 },
      );
    }

    // Send welcome email (don't await to avoid blocking the response)
    sendWelcomeEmail(user.email, user.name).catch((error) => {
      console.error("Failed to send welcome email:", error);
    });

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || "Validation error" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
