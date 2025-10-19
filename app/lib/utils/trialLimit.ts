import { createClient } from "@supabase/supabase-js";

const TRIAL_LIMIT = 3; // Maximum free actions (searches + analyses combined) per IP

/**
 * Check if an IP address has exceeded the trial limit
 * @param ipAddress - The IP address to check
 * @returns Object with canUse (boolean) and remaining (number)
 */
export async function checkTrialLimit(
  ipAddress: string,
): Promise<{ canUse: boolean; remaining: number; total: number }> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase environment variables");
      // In case of error, allow usage (fail open)
      return { canUse: true, remaining: TRIAL_LIMIT, total: TRIAL_LIMIT };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
      },
    });

    // Get or create trial usage record
    const { data: existingUsage, error: fetchError } = await supabase
      .from("trial_usage")
      .select("*")
      .eq("ip_address", ipAddress)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching trial usage:", fetchError);
      console.error("Make sure trial_usage table exists in Supabase");
      // Fail open - allow usage on error (table might not exist yet)
      return { canUse: true, remaining: TRIAL_LIMIT, total: TRIAL_LIMIT };
    }

    if (!existingUsage) {
      // No existing usage, create new record using upsert to avoid conflicts
      const { error: upsertError } = await supabase
        .from("trial_usage")
        .upsert(
          {
            ip_address: ipAddress,
            usage_count: 0,
            last_used_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
          },
          {
            onConflict: "ip_address",
          }
        );

      if (upsertError) {
        console.error("Error creating trial usage record:", upsertError);
      }

      return { canUse: true, remaining: TRIAL_LIMIT, total: TRIAL_LIMIT };
    }

    const usageCount = existingUsage.usage_count || 0;
    const remaining = Math.max(0, TRIAL_LIMIT - usageCount);
    const canUse = usageCount < TRIAL_LIMIT;

    return { canUse, remaining, total: TRIAL_LIMIT };
  } catch (error) {
    console.error("Unexpected error in checkTrialLimit:", error);
    // Fail open - allow usage on error
    return { canUse: true, remaining: TRIAL_LIMIT, total: TRIAL_LIMIT };
  }
}

/**
 * Increment the trial usage count for an IP address
 * @param ipAddress - The IP address to increment
 */
export async function incrementTrialUsage(
  ipAddress: string,
): Promise<{ success: boolean; remaining: number }> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase environment variables");
      return { success: false, remaining: TRIAL_LIMIT };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
      },
    });

    // Get current usage
    const { data: existingUsage } = await supabase
      .from("trial_usage")
      .select("*")
      .eq("ip_address", ipAddress)
      .maybeSingle();

    const currentCount = existingUsage?.usage_count || 0;
    const newCount = currentCount + 1;

    // Update or insert usage record
    const { error: upsertError } = await supabase.from("trial_usage").upsert(
      {
        ip_address: ipAddress,
        usage_count: newCount,
        last_used_at: new Date().toISOString(),
        created_at: existingUsage?.created_at || new Date().toISOString(),
      },
      {
        onConflict: "ip_address",
      },
    );

    if (upsertError) {
      console.error("Error incrementing trial usage:", upsertError);
      return { success: false, remaining: TRIAL_LIMIT };
    }

    const remaining = Math.max(0, TRIAL_LIMIT - newCount);
    return { success: true, remaining };
  } catch (error) {
    console.error("Unexpected error in incrementTrialUsage:", error);
    return { success: false, remaining: TRIAL_LIMIT };
  }
}

/**
 * Get trial usage info for an IP address
 * @param ipAddress - The IP address to check
 */
export async function getTrialUsage(
  ipAddress: string,
): Promise<{ used: number; remaining: number; total: number }> {
  const { remaining, total } = await checkTrialLimit(ipAddress);
  const used = total - remaining;
  return { used, remaining, total };
}
