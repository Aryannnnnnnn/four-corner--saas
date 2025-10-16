import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import { logger } from "@/app/lib/utils/logger";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const { data: isAdminData } = await supabase.rpc("is_admin", {
      user_email: session.user.email,
    });

    if (!isAdminData) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id: listingId } = await params;
    const body = await request.json();
    const { sold_price, sale_notes } = body;

    // Get the listing details first
    const { data: listing, error: fetchError } = await supabase
      .from("property_listings")
      .select("*")
      .eq("id", listingId)
      .single();

    if (fetchError || !listing) {
      logger.error("Error fetching listing:", fetchError);
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    // Only approved listings can be marked as sold
    if (listing.status !== "approved") {
      return NextResponse.json(
        { error: "Only approved listings can be marked as sold" },
        { status: 400 },
      );
    }

    // Update the listing status to sold
    const { error: updateError } = await supabase
      .from("property_listings")
      .update({
        status: "sold",
        sold_at: new Date().toISOString(),
        sold_by: session.user.email,
        sold_price: sold_price || listing.list_price, // Use list_price if sold_price not provided
        sale_notes: sale_notes || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", listingId);

    if (updateError) {
      logger.error("Error marking listing as sold:", updateError);
      return NextResponse.json(
        { error: "Failed to mark listing as sold" },
        { status: 500 },
      );
    }

    logger.info(`Listing ${listingId} marked as sold by ${session.user.email}`);

    return NextResponse.json({
      success: true,
      message: "Listing marked as sold successfully",
    });
  } catch (error) {
    logger.error("Mark as sold error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Endpoint to revert sold status back to approved
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const { data: isAdminData } = await supabase.rpc("is_admin", {
      user_email: session.user.email,
    });

    if (!isAdminData) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id: listingId } = await params;

    // Get the listing details first
    const { data: listing, error: fetchError } = await supabase
      .from("property_listings")
      .select("*")
      .eq("id", listingId)
      .single();

    if (fetchError || !listing) {
      logger.error("Error fetching listing:", fetchError);
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    // Only sold listings can be reverted
    if (listing.status !== "sold") {
      return NextResponse.json(
        { error: "Only sold listings can be reverted to approved" },
        { status: 400 },
      );
    }

    // Revert the listing status back to approved
    const { error: updateError } = await supabase
      .from("property_listings")
      .update({
        status: "approved",
        sold_at: null,
        sold_by: null,
        sold_price: null,
        sale_notes: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", listingId);

    if (updateError) {
      logger.error("Error reverting sold listing:", updateError);
      return NextResponse.json(
        { error: "Failed to revert sold listing" },
        { status: 500 },
      );
    }

    logger.info(
      `Listing ${listingId} reverted from sold to approved by ${session.user.email}`,
    );

    return NextResponse.json({
      success: true,
      message: "Listing reverted to approved successfully",
    });
  } catch (error) {
    logger.error("Revert sold listing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
