"use client";

import { ArrowRight, Home, Lock, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (!formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate USA phone number (10 digits)
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      toast.error("Please enter a valid 10-digit USA phone number");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match. Please check and try again.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.replace(/\D/g, ""), // Send only digits
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          toast.error(
            "An account with this email already exists. Please sign in.",
          );
        } else {
          toast.error(
            data.error || "Unable to create account. Please try again.",
          );
        }
        return;
      }

      toast.success("🎉 Account created successfully! Signing you in...");

      // Auto sign in after registration
      const signInResult = await signIn("credentials", {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        redirect: false,
      });

      if (signInResult?.error) {
        toast.error(
          "Account created but sign-in failed. Please login manually.",
        );
        router.push("/login");
      } else {
        toast.success("Welcome to Four Corner Properties!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        "Unable to connect. Please check your internet and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      toast.loading("Redirecting to Google...", { duration: 2000 });
      await signIn("google", { callbackUrl: "/", redirect: true });
    } catch (error) {
      console.error("Google sign-up error:", error);
      toast.error("Unable to connect to Google. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-luxury-blue hover:text-luxury-blue-dark transition-colors mb-4"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>

          <div className="flex items-center justify-center gap-3">
            <img
              src="/logo.png"
              alt="Four Corner Properties Logo"
              className="w-12 h-12 object-contain"
            />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gradient">
            Create Account
          </h1>
          <p className="text-white/70 text-sm sm:text-base">
            Start analyzing luxury real estate properties
          </p>
        </div>

        {/* Register Form */}
        <form
          onSubmit={handleSubmit}
          className="glass-card p-6 sm:p-8 space-y-4 sm:space-y-6"
        >
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-white/80">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
                className="luxury-input pl-12 w-full"
                required
              />
            </div>
          </div>

          {/* Email */}
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
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="you@example.com"
                className="luxury-input pl-12 w-full"
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-white/80"
            >
              Phone Number (USA)
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  // Auto-format phone number as user types
                  const value = e.target.value.replace(/\D/g, "");
                  let formatted = value;
                  if (value.length > 3 && value.length <= 6) {
                    formatted = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                  } else if (value.length > 6) {
                    formatted = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                  } else if (value.length > 0) {
                    formatted = `(${value}`;
                  }
                  setFormData({ ...formData, phone: formatted });
                }}
                placeholder="(555) 123-4567"
                className="luxury-input pl-12 w-full"
                required
                maxLength={14}
              />
            </div>
            <p className="text-xs text-white/50">
              10-digit USA phone number
            </p>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-white/80"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
                className="luxury-input pl-12 w-full"
                required
                minLength={8}
              />
            </div>
            <p className="text-xs text-white/50">
              Must be at least 8 characters
            </p>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-white/80"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                placeholder="••••••••"
                className="luxury-input pl-12 w-full"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="luxury-button w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-luxury-black text-white/50">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full glass-card border border-white/10 hover:bg-white/10 py-3 rounded-xl flex items-center justify-center gap-3 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-white/70">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-luxury-blue hover:text-luxury-blue-dark font-semibold transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
