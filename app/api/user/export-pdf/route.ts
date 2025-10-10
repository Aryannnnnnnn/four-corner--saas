import { createClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";

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

export async function GET(_req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all user data
    const [userResult, propertiesResult] = await Promise.all([
      supabase
        .from("users")
        .select("id, email, name, created_at")
        .eq("id", session.user.id)
        .single(),
      supabase
        .from("properties")
        .select("id, address, analysis_data, is_favorite, created_at")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false }),
    ]);

    if (userResult.error) {
      console.error("User fetch error:", userResult.error);
      throw new Error("Failed to fetch user data");
    }

    if (propertiesResult.error) {
      console.error("Properties fetch error:", propertiesResult.error);
      throw new Error("Failed to fetch properties");
    }

    const user = userResult.data;
    const properties = propertiesResult.data || [];

    // Generate HTML for PDF
    const html = generatePDFHTML(user, properties);

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Export PDF error:", error);
    return NextResponse.json(
      { error: "Failed to export PDF" },
      { status: 500 },
    );
  }
}

function generatePDFHTML(user: any, properties: any[]) {
  const totalProperties = properties.length;
  const favoriteProperties = properties.filter((p) => p.is_favorite).length;
  const exportDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate portfolio analytics
  const totalValue = properties.reduce(
    (sum, p) => sum + (p.analysis_data.propertyOverview?.listPrice || 0),
    0,
  );
  const averagePrice = totalProperties > 0 ? totalValue / totalProperties : 0;

  // Calculate average grade
  const gradeValues: Record<string, number> = {
    "A+": 97,
    A: 93,
    "A-": 90,
    "B+": 87,
    B: 83,
    "B-": 80,
    "C+": 77,
    C: 73,
    "C-": 70,
    D: 65,
    F: 50,
  };
  const grades = properties
    .map((p) => p.analysis_data.aiAnalysis?.buyingGrade)
    .filter((grade): grade is string => grade && grade in gradeValues);
  const averageGradeValue =
    grades.length > 0
      ? grades.reduce((sum, grade) => sum + (gradeValues[grade] || 0), 0) /
        grades.length
      : 0;
  const averageGrade = getGradeFromValue(averageGradeValue);

  // Find best and worst properties
  const propertiesWithGrades = properties.filter(
    (p) =>
      p.analysis_data.aiAnalysis?.buyingGrade &&
      p.analysis_data.aiAnalysis.buyingGrade in gradeValues,
  );
  const bestProperty = propertiesWithGrades.reduce((best, current) => {
    if (!best) return current;
    const bestGrade =
      gradeValues[best.analysis_data.aiAnalysis?.buyingGrade] || 0;
    const currentGrade =
      gradeValues[current.analysis_data.aiAnalysis?.buyingGrade] || 0;
    return currentGrade > bestGrade ? current : best;
  }, null as any);
  const worstProperty = propertiesWithGrades.reduce((worst, current) => {
    if (!worst) return current;
    const worstGrade =
      gradeValues[worst.analysis_data.aiAnalysis?.buyingGrade] || 100;
    const currentGrade =
      gradeValues[current.analysis_data.aiAnalysis?.buyingGrade] || 100;
    return currentGrade < worstGrade ? current : worst;
  }, null as any);

  // Recent activity (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentProperties = properties.filter(
    (p) => new Date(p.created_at) > thirtyDaysAgo,
  );

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Four Corner Properties - Portfolio Report</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background: #ffffff;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px;
    }

    /* Header */
    .header {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: white;
      padding: 60px 40px;
      border-radius: 20px;
      margin-bottom: 40px;
      box-shadow: 0 10px 40px rgba(59, 130, 246, 0.3);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 30px;
    }

    .logo-icon {
      width: 60px;
      height: 60px;
      background: black;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
    }

    .logo-icon img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .logo-text {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .header h1 {
      font-size: 42px;
      font-weight: 800;
      margin-bottom: 15px;
      letter-spacing: -1px;
    }

    .header p {
      font-size: 18px;
      opacity: 0.95;
      font-weight: 400;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 25px;
      margin-bottom: 40px;
    }

    .stat-card {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border: 2px solid #3b82f6;
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 4px 20px rgba(59, 130, 246, 0.1);
    }

    .stat-label {
      font-size: 14px;
      color: #3b82f6;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }

    .stat-value {
      font-size: 36px;
      font-weight: 800;
      color: #1e40af;
    }

    /* Section */
    .section {
      margin-bottom: 50px;
      page-break-inside: avoid;
    }

    .section-title {
      font-size: 28px;
      font-weight: 700;
      color: #1e40af;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 3px solid #3b82f6;
    }

    /* User Info */
    .user-info {
      background: #f8fafc;
      border: 2px solid #e2e8f0;
      border-radius: 16px;
      padding: 30px;
      margin-bottom: 30px;
    }

    .user-info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
    }

    .info-label {
      font-size: 13px;
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }

    .info-value {
      font-size: 16px;
      color: #1e293b;
      font-weight: 600;
    }

    /* Property Card */
    .property-card {
      background: white;
      border: 2px solid #e0f2fe;
      border-radius: 16px;
      padding: 30px;
      margin-bottom: 25px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      page-break-inside: avoid;
    }

    .property-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 25px;
      padding-bottom: 20px;
      border-bottom: 2px solid #e0f2fe;
    }

    .property-address {
      font-size: 22px;
      font-weight: 700;
      color: #1e40af;
      margin-bottom: 8px;
    }

    .property-date {
      font-size: 14px;
      color: #64748b;
      font-weight: 500;
    }

    .favorite-badge {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      color: #92400e;
      padding: 8px 18px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border: 2px solid #fbbf24;
    }

    .property-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .detail-item {
      background: #f0f9ff;
      padding: 15px;
      border-radius: 10px;
      border-left: 4px solid #3b82f6;
    }

    .detail-label {
      font-size: 12px;
      color: #3b82f6;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 5px;
    }

    .detail-value {
      font-size: 18px;
      color: #1e40af;
      font-weight: 700;
    }

    /* Footer */
    .footer {
      margin-top: 60px;
      padding: 40px;
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      color: white;
      border-radius: 20px;
      text-align: center;
    }

    .footer-logo {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 15px;
    }

    .footer-text {
      font-size: 14px;
      opacity: 0.8;
      margin-bottom: 10px;
    }

    .footer-link {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 600;
    }

    /* Print Styles */
    @media print {
      body {
        background: white;
      }

      .container {
        padding: 20px;
      }

      .property-card,
      .section {
        page-break-inside: avoid;
      }
    }

    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 60px 40px;
      background: #f8fafc;
      border-radius: 16px;
      border: 2px dashed #cbd5e1;
    }

    .empty-state-icon {
      font-size: 64px;
      margin-bottom: 20px;
      opacity: 0.3;
    }

    .empty-state-text {
      font-size: 18px;
      color: #64748b;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo">
        <div class="logo-icon">
          <img src="/logo.png" alt="Four Corner Properties Logo" />
        </div>
        <div class="logo-text">Four Corner Properties</div>
      </div>
      <h1>Portfolio Performance Report</h1>
      <p>Comprehensive analysis of your real estate investment portfolio</p>
      <p style="opacity: 0.8; font-size: 14px;">Generated on ${exportDate}</p>
    </div>

    <!-- Statistics -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Total Properties</div>
        <div class="stat-value">${totalProperties}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Portfolio Value</div>
        <div class="stat-value">$${totalValue > 1000000 ? (totalValue / 1000000).toFixed(1) + "M" : totalValue > 1000 ? (totalValue / 1000).toFixed(0) + "K" : totalValue.toLocaleString()}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Average Grade</div>
        <div class="stat-value">${averageGrade}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Favorites</div>
        <div class="stat-value">${favoriteProperties}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Recent Activity</div>
        <div class="stat-value">${recentProperties.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Member Since</div>
        <div class="stat-value">${new Date(user.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</div>
      </div>
    </div>

    ${
      totalProperties > 0
        ? `
    <!-- Portfolio Analytics -->
    <div class="section">
      <h2 class="section-title">Portfolio Analytics</h2>
      <div class="stats-grid">
        ${
          bestProperty
            ? `
        <div class="stat-card primary">
          <div class="stat-label">Top Performer</div>
          <div class="stat-value">${bestProperty.analysis_data.aiAnalysis?.buyingGrade || "N/A"}</div>
          <div class="stat-subtitle">${bestProperty.address.length > 40 ? bestProperty.address.substring(0, 40) + "..." : bestProperty.address}</div>
        </div>
        `
            : ""
        }
        
        ${
          worstProperty && bestProperty && worstProperty.id !== bestProperty.id
            ? `
        <div class="stat-card warning">
          <div class="stat-label">Needs Attention</div>
          <div class="stat-value">${worstProperty.analysis_data.aiAnalysis?.buyingGrade || "N/A"}</div>
          <div class="stat-subtitle">${worstProperty.address.length > 40 ? worstProperty.address.substring(0, 40) + "..." : worstProperty.address}</div>
        </div>
        `
            : ""
        }
        
        <div class="stat-card">
          <div class="stat-label">Average Property Value</div>
          <div class="stat-value">$${averagePrice > 1000000 ? (averagePrice / 1000000).toFixed(1) + "M" : averagePrice > 1000 ? (averagePrice / 1000).toFixed(0) + "K" : Math.round(averagePrice).toLocaleString()}</div>
          <div class="stat-subtitle">Based on ${totalProperties} properties</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-label">Properties with Grades</div>
          <div class="stat-value">${propertiesWithGrades.length}</div>
          <div class="stat-subtitle">${Math.round((propertiesWithGrades.length / totalProperties) * 100)}% analyzed</div>
        </div>
      </div>
    </div>
    `
        : ""
    }

    <!-- Account Information -->
    <div class="section">
      <h2 class="section-title">Account Information</h2>
      <div class="user-info">
        <div class="user-info-grid">
          <div class="info-item">
            <div class="info-label">Full Name</div>
            <div class="info-value">${user.name || "N/A"}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Email Address</div>
            <div class="info-value">${user.email}</div>
          </div>
          <div class="info-item">
            <div class="info-label">User ID</div>
            <div class="info-value">${user.id.substring(0, 8)}...</div>
          </div>
          <div class="info-item">
            <div class="info-label">Member Since</div>
            <div class="info-value">${new Date(user.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Properties -->
    <div class="section">
      <h2 class="section-title">Property Portfolio (${totalProperties})</h2>

      ${
        properties.length === 0
          ? `
        <div class="empty-state">
          <div class="empty-state-icon">🏠</div>
          <div class="empty-state-text">No properties analyzed yet</div>
        </div>
      `
          : properties
              .map((property) => {
                const analysisData = property.analysis_data || {};
                const overview = analysisData.propertyOverview || {};
                const aiAnalysis = analysisData.aiAnalysis || {};

                return `
        <div class="property-card">
          <div class="property-header">
            <div>
              <div class="property-address">${property.address}</div>
              <div class="property-date">Analyzed on ${new Date(property.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
            </div>
            ${property.is_favorite ? '<div class="favorite-badge">⭐ Favorite</div>' : ""}
          </div>

          ${
            overview.listPrice || overview.bedrooms || overview.bathrooms
              ? `
            <div class="property-details">
              ${
                overview.listPrice
                  ? `
                <div class="detail-item">
                  <div class="detail-label">List Price</div>
                  <div class="detail-value">$${overview.listPrice.toLocaleString()}</div>
                </div>
              `
                  : ""
              }
              ${
                overview.bedrooms
                  ? `
                <div class="detail-item">
                  <div class="detail-label">Bedrooms</div>
                  <div class="detail-value">${overview.bedrooms}</div>
                </div>
              `
                  : ""
              }
              ${
                overview.bathrooms
                  ? `
                <div class="detail-item">
                  <div class="detail-label">Bathrooms</div>
                  <div class="detail-value">${overview.bathrooms}</div>
                </div>
              `
                  : ""
              }
              ${
                overview.squareFeet
                  ? `
                <div class="detail-item">
                  <div class="detail-label">Square Feet</div>
                  <div class="detail-value">${overview.squareFeet.toLocaleString()}</div>
                </div>
              `
                  : ""
              }
              ${
                aiAnalysis.buyingGrade
                  ? `
                <div class="detail-item">
                  <div class="detail-label">AI Grade</div>
                  <div class="detail-value">${aiAnalysis.buyingGrade}</div>
                </div>
              `
                  : ""
              }
            </div>
          `
              : ""
          }
        </div>
        `;
              })
              .join("")
      }
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-logo">Four Corner Properties</div>
      <div class="footer-text">Luxury Real Estate Analysis Platform</div>
      <div class="footer-text">
        This report was generated on ${exportDate}
      </div>
      <div class="footer-text">
        <a href="https://fourcornervt.com" class="footer-link">fourcornervt.com</a>
      </div>
    </div>
  </div>

  <script>
    // Auto-print when page loads
    window.onload = function() {
      window.print();
    }
  </script>
</body>
</html>
  `;
}

function getGradeFromValue(value: number): string {
  if (value >= 97) return "A+";
  if (value >= 93) return "A";
  if (value >= 90) return "A-";
  if (value >= 87) return "B+";
  if (value >= 83) return "B";
  if (value >= 80) return "B-";
  if (value >= 77) return "C+";
  if (value >= 73) return "C";
  if (value >= 70) return "C-";
  if (value >= 65) return "D";
  return "F";
}
