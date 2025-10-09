// app/lib/utils/listing-emails.ts
import nodemailer from "nodemailer";
import type { PropertyListing } from "@/app/lib/types/listings";

// Create reusable transporter object using the same config as forgot-password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const FROM_EMAIL = process.env.EMAIL_USER || "noreply@fourcorner.com";
const FROM_NAME = "Four Corner Properties";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

interface SendListingApprovalEmailParams {
  to: string;
  userName: string;
  listing: PropertyListing;
}

interface SendListingRejectionEmailParams {
  to: string;
  userName: string;
  listing: PropertyListing;
  rejectionReason: string;
}

/**
 * Send property listing approval email
 */
export async function sendListingApprovalEmail({
  to,
  userName,
  listing,
}: SendListingApprovalEmailParams): Promise<void> {
  const listingUrl = `${SITE_URL}/listings/${listing.id}`;
  const myListingsUrl = `${SITE_URL}/my-listings`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Property Listing Approved</title>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .property-details { background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .success-icon { font-size: 48px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Listing Approved!</h1>
        </div>
        <div class="content">
          <p>Hi ${userName},</p>
          
          <div class="success-icon" style="text-align: center;">✅</div>
          
          <p><strong>Great news!</strong> Your property listing has been approved and is now live on Four Corner Properties.</p>
          
          <div class="property-details">
            <h3>${listing.title}</h3>
            <p><strong>Address:</strong> ${listing.street_address}, ${listing.city}, ${listing.state} ${listing.zipcode}</p>
            <p><strong>Price:</strong> $${listing.list_price.toLocaleString()}</p>
            <p><strong>Type:</strong> ${listing.property_type}</p>
            <p><strong>Beds/Baths:</strong> ${listing.bedrooms || 0} bed, ${listing.bathrooms || 0} bath</p>
            <p><strong>Size:</strong> ${(listing.square_feet || 0).toLocaleString()} sq ft</p>
          </div>
          
          <p>Your listing is now visible to thousands of potential buyers and renters. Here's what you can do next:</p>
          
          <ul>
            <li><strong>View your public listing</strong> to see how it appears to visitors</li>
            <li><strong>Share the listing</strong> on social media to reach more people</li>
            <li><strong>Monitor inquiries</strong> from interested buyers/renters</li>
            <li><strong>Update details</strong> anytime from your dashboard</li>
          </ul>
          
          <div style="text-align: center;">
            <a href="${listingUrl}" class="button">View Your Listing</a>
            <a href="${myListingsUrl}" class="button" style="background: #6b7280;">Manage Listings</a>
          </div>
          
          <p style="margin-top: 30px;">Thank you for choosing Four Corner Properties!</p>
          
          <p>Best regards,<br>
          <strong>The Four Corner Properties Team</strong></p>
        </div>
        <div class="footer">
          <p>This email was sent to ${to}</p>
          <p>© ${new Date().getFullYear()} Four Corner Properties. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
    Property Listing Approved!
    
    Hi ${userName},
    
    Great news! Your property listing has been approved and is now live on Four Corner Properties.
    
    Property Details:
    - ${listing.title}
    - Address: ${listing.street_address}, ${listing.city}, ${listing.state} ${listing.zipcode}
    - Price: $${listing.list_price.toLocaleString()}
    - Type: ${listing.property_type}
    - Beds/Baths: ${listing.bedrooms || 0} bed, ${listing.bathrooms || 0} bath
    - Size: ${(listing.square_feet || 0).toLocaleString()} sq ft
    
    View your listing: ${listingUrl}
    Manage your listings: ${myListingsUrl}
    
    Thank you for choosing Four Corner Properties!
    
    Best regards,
    The Four Corner Properties Team
  `;

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to,
    subject: `✅ Property Listing Approved - ${listing.title}`,
    text: textContent,
    html: htmlContent,
  });
}

/**
 * Send property listing rejection email
 */
export async function sendListingRejectionEmail({
  to,
  userName,
  listing,
  rejectionReason,
}: SendListingRejectionEmailParams): Promise<void> {
  const myListingsUrl = `${SITE_URL}/my-listings`;
  const contactUrl = `${SITE_URL}/contact`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Property Listing Update Required</title>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .property-details { background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0; }
        .reason-box { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; border-radius: 4px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .icon { font-size: 48px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📋 Listing Needs Updates</h1>
        </div>
        <div class="content">
          <p>Hi ${userName},</p>
          
          <div class="icon" style="text-align: center;">⚠️</div>
          
          <p>Thank you for submitting your property listing to Four Corner Properties. After review, we found that your listing requires some updates before it can be published.</p>
          
          <div class="property-details">
            <h3>${listing.title}</h3>
            <p><strong>Address:</strong> ${listing.street_address}, ${listing.city}, ${listing.state} ${listing.zipcode}</p>
            <p><strong>Price:</strong> $${listing.list_price.toLocaleString()}</p>
          </div>
          
          <div class="reason-box">
            <h4 style="margin-top: 0; color: #dc2626;">📝 Reason for Update Request:</h4>
            <p>${rejectionReason}</p>
          </div>
          
          <p><strong>What to do next:</strong></p>
          <ol>
            <li>Review the feedback above</li>
            <li>Update your listing with the necessary changes</li>
            <li>Resubmit your listing for review</li>
          </ol>
          
          <p>We want to ensure all listings meet our quality standards to provide the best experience for property seekers. If you have any questions about the feedback, please don't hesitate to contact us.</p>
          
          <div style="text-align: center;">
            <a href="${myListingsUrl}" class="button">Update My Listing</a>
            <a href="${contactUrl}" class="button" style="background: #6b7280;">Contact Support</a>
          </div>
          
          <p style="margin-top: 30px;">We look forward to helping you list your property successfully!</p>
          
          <p>Best regards,<br>
          <strong>The Four Corner Properties Team</strong></p>
        </div>
        <div class="footer">
          <p>This email was sent to ${to}</p>
          <p>© ${new Date().getFullYear()} Four Corner Properties. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
    Property Listing Update Required
    
    Hi ${userName},
    
    Thank you for submitting your property listing to Four Corner Properties. After review, we found that your listing requires some updates before it can be published.
    
    Property Details:
    - ${listing.title}
    - Address: ${listing.street_address}, ${listing.city}, ${listing.state} ${listing.zipcode}
    - Price: $${listing.list_price.toLocaleString()}
    
    Reason for Update Request:
    ${rejectionReason}
    
    What to do next:
    1. Review the feedback above
    2. Update your listing with the necessary changes
    3. Resubmit your listing for review
    
    Update your listing: ${myListingsUrl}
    Contact support: ${contactUrl}
    
    We look forward to helping you list your property successfully!
    
    Best regards,
    The Four Corner Properties Team
  `;

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to,
    subject: `📋 Property Listing Update Required - ${listing.title}`,
    text: textContent,
    html: htmlContent,
  });
}
