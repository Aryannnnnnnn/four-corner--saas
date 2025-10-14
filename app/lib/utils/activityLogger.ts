// app/lib/utils/activityLogger.ts
import { createClient } from "@supabase/supabase-js";
import { logger } from "./logger";

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

export type ActivityType =
  | "listing_created"
  | "listing_viewed"
  | "listing_updated"
  | "listing_deleted"
  | "property_searched"
  | "user_login"
  | "user_logout"
  | "user_registered"
  | "profile_updated"
  | "password_changed"
  | "listing_submitted"
  | "listing_approved"
  | "listing_rejected"
  | "profile_viewed"
  | "settings_updated";

interface LogActivityParams {
  userId: string;
  activityType: ActivityType;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
}

/**
 * Log a user activity to the database using user_activity_log table
 */
export async function logActivity({
  userId,
  activityType,
  metadata,
  ipAddress,
  userAgent,
  referrer,
}: LogActivityParams): Promise<boolean> {
  try {
    const { error } = await supabase.from("user_activity_log").insert({
      user_id: userId,
      activity_type: activityType,
      activity_data: metadata || {},
      ip_address: ipAddress,
      user_agent: userAgent,
      referrer: referrer,
    });

    if (error) {
      logger.error("Failed to log activity:", error);
      return false;
    }

    return true;
  } catch (error) {
    logger.error("Activity logging error:", error);
    return false;
  }
}

/**
 * Log a property search to property_search_history table
 */
export async function logPropertySearch({
  userId,
  searchQuery,
  searchType,
  filtersApplied,
  resultsCount,
  resultData,
  ipAddress,
  userAgent,
}: {
  userId: string;
  searchQuery?: string;
  searchType: string;
  filtersApplied?: Record<string, any>;
  resultsCount?: number;
  resultData?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}): Promise<boolean> {
  try {
    const { error } = await supabase.from("property_search_history").insert({
      user_id: userId,
      search_query: searchQuery,
      search_type: searchType,
      filters_applied: filtersApplied || {},
      results_count: resultsCount,
      result_data: resultData,
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    if (error) {
      logger.error("Failed to log property search:", error);
      return false;
    }

    return true;
  } catch (error) {
    logger.error("Property search logging error:", error);
    return false;
  }
}

/**
 * Get user activities from user_activity_log
 */
export async function getUserActivities(
  userId: string,
  limit: number = 50,
  activityType?: ActivityType
) {
  try {
    let query = supabase
      .from("user_activity_log")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (activityType) {
      query = query.eq("activity_type", activityType);
    }

    const { data, error } = await query;

    if (error) {
      logger.error("Failed to fetch activities:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    logger.error("Fetch activities error:", error);
    return [];
  }
}

/**
 * Get user search history
 */
export async function getUserSearchHistory(
  userId: string,
  limit: number = 50
) {
  try {
    const { data, error } = await supabase
      .from("property_search_history")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      logger.error("Failed to fetch search history:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    logger.error("Fetch search history error:", error);
    return [];
  }
}

/**
 * Get user session tracking data
 */
export async function getUserSessions(userId: string, limit: number = 20) {
  try {
    const { data, error } = await supabase
      .from("user_sessions_tracking")
      .select("*")
      .eq("user_id", userId)
      .order("session_start", { ascending: false })
      .limit(limit);

    if (error) {
      logger.error("Failed to fetch sessions:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    logger.error("Fetch sessions error:", error);
    return [];
  }
}

/**
 * Get activity statistics for a user
 */
export async function getUserActivityStats(userId: string) {
  try {
    const { data, error } = await supabase
      .from("user_activity_log")
      .select("activity_type")
      .eq("user_id", userId);

    if (error) {
      logger.error("Failed to fetch activity stats:", error);
      return {};
    }

    // Count activities by type
    const stats: Record<string, number> = {};
    data?.forEach((activity) => {
      const type = activity.activity_type;
      stats[type] = (stats[type] || 0) + 1;
    });

    return stats;
  } catch (error) {
    logger.error("Fetch activity stats error:", error);
    return {};
  }
}

/**
 * Helper to extract IP address from request
 */
export function getIpFromRequest(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return realIp || undefined;
}

/**
 * Helper to get user agent from request
 */
export function getUserAgentFromRequest(request: Request): string | undefined {
  return request.headers.get("user-agent") || undefined;
}
