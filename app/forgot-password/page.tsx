"use client";

import { ArrowLeft, ArrowRight, Check, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          action: "send-otp",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("✉️ Verification code sent! Check your email.");
        setStep("otp");
      } else {
        if (response.status === 404) {
          toast.error("No account found with this email address");
        } else {
          toast.error(
            data.message ||
              "Unable to send verification code. Please try again.",
          );
        }
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      toast.error(
        "Unable to connect. Please check your internet and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          otp,
          action: "verify-otp",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("✅ Code verified! You can now reset your password.");
        setStep("reset");
      } else {
        if (response.status === 401) {
          toast.error("Invalid or expired code. Please try again.");
        } else {
          toast.error(data.message || "Verification failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      toast.error(
        "Unable to connect. Please check your internet and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match. Please check and try again.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          otp,
          newPassword,
          action: "reset-password",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("🎉 Password reset successful! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        if (response.status === 401) {
          toast.error("Session expired. Please start over.");
          setStep("email");
        } else {
          toast.error(
            data.message || "Unable to reset password. Please try again.",
          );
        }
      }
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error(
        "Unable to connect. Please check your internet and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-luxury-gold hover:text-luxury-gold-dark transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Login</span>
          </Link>

          <div className="flex items-center justify-center mb-6">
            <img
              src="/logo.png"
              alt="Four Corner Properties Logo"
              className="w-full h-12 object-contain"
            />
          </div>

          <h1 className="font-display text-4xl font-bold text-gradient">
            {step === "email" && "Reset Password"}
            {step === "otp" && "Verify Code"}
            {step === "reset" && "New Password"}
          </h1>
          <p className="text-white/70">
            {step === "email" &&
              "Enter your email to receive a verification code"}
            {step === "otp" && `We sent a code to ${email}`}
            {step === "reset" && "Enter your new password"}
          </p>
        </div>

        {/* Step 1: Email Form */}
        {step === "email" && (
          <form onSubmit={handleSendOTP} className="glass-card p-8 space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-white/80"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="luxury-input pl-12 w-full"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="luxury-button w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Verification Code
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === "otp" && (
          <form onSubmit={handleVerifyOTP} className="glass-card p-8 space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="otp"
                className="text-sm font-medium text-white/80"
              >
                Verification Code
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="Enter 6-digit code"
                className="luxury-input text-center text-2xl font-mono tracking-widest w-full"
                maxLength={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="luxury-button w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify Code
                  <Check className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() =>
                  handleSendOTP({ preventDefault: () => {} } as React.FormEvent)
                }
                className="text-sm text-luxury-gold hover:text-luxury-gold-dark transition-colors"
              >
                Didn't receive the code? Resend
              </button>
            </div>
          </form>
        )}

        {/* Step 3: New Password */}
        {step === "reset" && (
          <form
            onSubmit={handleResetPassword}
            className="glass-card p-8 space-y-6"
          >
            <div className="space-y-2">
              <label
                htmlFor="newPassword"
                className="text-sm font-medium text-white/80"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="luxury-input w-full"
                minLength={8}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-white/80"
              >
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="luxury-input w-full"
                minLength={8}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="luxury-button w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Resetting...
                </>
              ) : (
                <>
                  Reset Password
                  <Check className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Back to Login Link */}
        <p className="text-center text-white/70">
          Remember your password?{" "}
          <Link
            href="/login"
            className="text-luxury-gold hover:text-luxury-gold-dark font-semibold transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
