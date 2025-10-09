import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import { sendListingApprovalEmail } from "@/app/lib/utils/listing-emails";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(
  _request: Request,
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

    // Update the listing status to approved
    const { error: updateError } = await supabase
      .from("property_listings")
      .update({ 
        status: "approved",
        approved_at: new Date().toISOString(),
        approved_by: session.user.email,
      })
      .eq("id", listingId);

    if (updateError) {
      console.error("Error approving listing:", updateError);
      return NextResponse.json(
        { error: "Failed to approve listing" },
        { status: 500 }
      );
    }

    // Send approval email
    try {
      await sendListingApprovalEmail({
        to: listing.contact_email,
        userName: listing.contact_name,
        listing: listing,
      });
    } catch (emailError) {
      console.error("Error sending approval email:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ 
      success: true,
      message: "Listing approved successfully" 
    });
  } catch (error) {
    console.error("Approve listing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
