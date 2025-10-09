import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { type NextRequest, NextResponse } from "next/server";
import { sendOTPEmail } from "@/app/lib/utils/email";
import { getClientIp, passwordResetRateLimit } from "@/app/lib/utils/ratelimit";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// In-memory storage for OTPs (use database in production)
const otpStore = new Map<string, { otp: string; expires: number }>();

// Generate random 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 3 password reset attempts per 15 minutes
    const ip = getClientIp(request);
    const { success, reset } = await passwordResetRateLimit.limit(ip);

    if (!success) {
      const minutesLeft = Math.ceil((reset - Date.now()) / 60000);
      return NextResponse.json(
        {
          success: false,
          message: `Too many password reset attempts. Try again in ${minutesLeft} minute${minutesLeft !== 1 ? "s" : ""}.`,
        },
        { status: 429 },
      );
    }

    const { email, otp, newPassword, action } = await request.json();

    switch (action) {
      case "send-otp": {
        if (!email) {
          return NextResponse.json(
            { success: false, message: "Email is required" },
            { status: 400 },
          );
        }

        // Check if user exists in database
        const { data: user, error: userError } = await supabase
          .from("users")
          .select("id, email")
          .eq("email", email.toLowerCase())
          .maybeSingle();

        if (userError || !user) {
          return NextResponse.json(
            {
              success: false,
              message: "No account found with this email address",
            },
            { status: 404 },
          );
        }

        // Generate and store OTP (expires in 10 minutes)
        const generatedOTP = generateOTP();
        const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

        otpStore.set(email.toLowerCase(), { otp: generatedOTP, expires });

        // Send OTP via email
        const emailSent = await sendOTPEmail(email, generatedOTP);

        if (!emailSent) {
          return NextResponse.json(
            { success: false, message: "Failed to send email" },
            { status: 500 },
          );
        }

        return NextResponse.json({
          success: true,
          message: "OTP sent successfully",
        });
      }

      case "verify-otp": {
        if (!email || !otp) {
          return NextResponse.json(
            { success: false, message: "Email and OTP are required" },
            { status: 400 },
          );
        }

        const storedData = otpStore.get(email.toLowerCase());

        if (!storedData) {
          return NextResponse.json(
            { success: false, message: "OTP not found or expired" },
            { status: 400 },
          );
        }

        if (Date.now() > storedData.expires) {
          otpStore.delete(email.toLowerCase());
          return NextResponse.json(
            { success: false, message: "OTP expired" },
            { status: 400 },
          );
        }

        if (storedData.otp !== otp) {
          return NextResponse.json(
            { success: false, message: "Invalid OTP" },
            { status: 400 },
          );
        }

        return NextResponse.json({
          success: true,
          message: "OTP verified successfully",
        });
      }

      case "reset-password": {
        if (!email || !otp || !newPassword) {
          return NextResponse.json(
            { success: false, message: "All fields are required" },
            { status: 400 },
          );
        }

        // Validate password strength
        if (newPassword.length < 8) {
          return NextResponse.json(
            {
              success: false,
              message: "Password must be at least 8 characters long",
            },
            { status: 400 },
          );
        }

        // Verify OTP one more time
        const storedData = otpStore.get(email.toLowerCase());

        if (
          !storedData ||
          storedData.otp !== otp ||
          Date.now() > storedData.expires
        ) {
          return NextResponse.json(
            { success: false, message: "Invalid or expired OTP" },
            { status: 400 },
          );
        }

        try {
          // Check if user exists and get their ID
          const { data: user, error: userError } = await supabase
            .from("users")
            .select("id, email")
            .eq("email", email.toLowerCase())
            .maybeSingle();

          if (userError || !user) {
            console.error("User lookup error:", userError);
            return NextResponse.json(
              { success: false, message: "User not found" },
              { status: 404 },
            );
          }

          // Hash the new password
          const saltRounds = 12;
          const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

          // Update password in user_credentials table using the correct column name 'password'
          const { error: updateError } = await supabase
            .from("user_credentials")
            .update({ password_hash: hashedPassword })
            .eq("user_id", user.id);

          if (updateError) {
            console.error("Password update error details:", updateError);
            console.error("Update error code:", updateError.code);
            console.error("Update error message:", updateError.message);
            console.error("Update error hint:", updateError.hint);
            console.error("Update error details:", updateError.details);

            return NextResponse.json(
              {
                success: false,
                message: `Database error: ${updateError.message}`,
              },
              { status: 500 },
            );
          }

          // Clean up the OTP
          otpStore.delete(email.toLowerCase());

          return NextResponse.json({
            success: true,
            message: "Password reset successfully",
          });
        } catch (dbError) {
          console.error("Database error during password reset:", dbError);
          return NextResponse.json(
            { success: false, message: "Failed to update password" },
            { status: 500 },
          );
        }
      }

      default:
        return NextResponse.json(
          { success: false, message: "Invalid action" },
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("Forgot password API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
