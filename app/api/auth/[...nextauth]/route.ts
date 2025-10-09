import { type NextRequest, NextResponse } from "next/server";
import { handlers } from "../../../../auth";

// Wrap handlers with error handling
export async function GET(req: NextRequest) {
  try {
    return await handlers.GET(req);
  } catch (error) {
    console.error("Auth GET error:", error);
    return NextResponse.json(
      { error: "Authentication error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    return await handlers.POST(req);
  } catch (error) {
    console.error("Auth POST error:", error);
    return NextResponse.json(
      { error: "Authentication error" },
      { status: 500 },
    );
  }
}
