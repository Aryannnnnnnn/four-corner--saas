// lib/ratelimit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter that allows 10 requests per hour
export const analyzePropertyRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 h"),
  analytics: true,
  prefix: "@upstash/ratelimit/analyze",
});

// Create a new ratelimiter that allows 20 property listings per day
export const propertyListingRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, "24 h"),
  analytics: true,
  prefix: "@upstash/ratelimit/listing",
});

// Create a new ratelimiter for general API routes (100 requests per 15 minutes)
export const generalRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "15 m"),
  analytics: true,
  prefix: "@upstash/ratelimit/general",
});

// Create a new ratelimiter for auth routes (5 requests per 15 minutes)
export const authRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "15 m"),
  analytics: true,
  prefix: "@upstash/ratelimit/auth",
});
