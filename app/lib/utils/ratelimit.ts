import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter that allows 10 requests per 10 seconds
export const loginRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "60 s"), // 5 login attempts per 60 seconds
  analytics: true,
  prefix: "@upstash/ratelimit/login",
});

// Register rate limit - 3 attempts per 10 minutes
export const registerRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "600 s"), // 10 minutes
  analytics: true,
  prefix: "@upstash/ratelimit/register",
});

// Property analysis rate limit - 10 analyses per hour
export const analysisRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "3600 s"), // 10 per hour
  analytics: true,
  prefix: "@upstash/ratelimit/analysis",
});

// General API rate limit - 100 requests per minute
export const apiRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "60 s"),
  analytics: true,
  prefix: "@upstash/ratelimit/api",
});

// Password reset rate limit - 3 attempts per 15 minutes
export const passwordResetRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "900 s"), // 15 minutes
  analytics: true,
  prefix: "@upstash/ratelimit/password-reset",
});

// Helper function to get client IP
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  if (realIp) {
    return realIp;
  }

  return "unknown";
}
