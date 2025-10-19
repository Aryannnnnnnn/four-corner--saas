import { type NextRequest, NextResponse } from "next/server";
import { auth } from "../../../auth";
import { getTrialUsage } from "@/app/lib/utils/trialLimit";
import { getIpFromRequest } from "@/app/lib/utils/activityLogger";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    // If user is authenticated, they don't have trial limits
    if (session?.user) {
      return NextResponse.json({
        isAuthenticated: true,
        hasUnlimitedAnalyses: true,
      });
    }

    // For non-authenticated users, check trial status
    const ipAddress = getIpFromRequest(req);
    if (!ipAddress) {
      return NextResponse.json({
        isAuthenticated: false,
        hasUnlimitedAnalyses: false,
        trial: {
          used: 0,
          remaining: 3,
          total: 3,
          limitReached: false,
        },
      });
    }
    const { used, remaining, total } = await getTrialUsage(ipAddress);

    return NextResponse.json({
      isAuthenticated: false,
      hasUnlimitedAnalyses: false,
      trial: {
        used,
        remaining,
        total,
        limitReached: remaining <= 0,
      },
    });
  } catch (error) {
    console.error("Error fetching trial status:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch trial status",
      },
      { status: 500 },
    );
  }
}
