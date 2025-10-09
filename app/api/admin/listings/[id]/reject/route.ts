import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import { sendListingRejectionEmail } from "@/app/lib/utils/listing-emails";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
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
    const { reason } = body;

    if (!reason) {
      return NextResponse.json(
        { error: "Rejection reason is required" },
        { status: 400 }
      );
    }

    // Get the listing details first
    const { data: listing, error: fetchError } = await supabase
      .from("property_listings")
      .select("*")
      .eq("id", listingId)
      .single();

    if (fetchError || !listing) {
      console.error("Error fetching listing:", fetchError);
      return NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      );
    }

    // Update the listing status to rejected
    const { error: updateError } = await supabase
      .from("property_listings")
      .update({
        status: "rejected",
        rejection_reason: reason,
        rejected_at: new Date().toISOString(),
        rejected_by: session.user.email,
      })
      .eq("id", listingId);

    if (updateError) {
      console.error("Error rejecting listing:", updateError);
      return NextResponse.json(
        { error: "Failed to reject listing" },
        { status: 500 }
      );
    }

    // Send rejection email
    try {
      await sendListingRejectionEmail({
        to: listing.contact_email,
        userName: listing.contact_name,
        listing: listing,
        rejectionReason: reason,
      });
    } catch (emailError) {
      console.error("Error sending rejection email:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Listing rejected successfully",
    });
  } catch (error) {
    console.error("Reject listing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
