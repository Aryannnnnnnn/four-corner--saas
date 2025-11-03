import { createClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";

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

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: propertyId } = await params;

    // Fetch the specific property with user verification
    const { data: property, error } = await supabase
      .from("properties")
      .select("id, address, analysis_data, is_favorite, created_at, updated_at")
      .eq("id", propertyId)
      .eq("user_id", session.user.id)
      .single();

    if (error || !property) {
      return NextResponse.json(
        { error: "Property not found or access denied" },
        { status: 404 },
      );
    }

    // Generate comprehensive analysis PDF HTML
    const html = generatePropertyAnalysisPDF(property);

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Property PDF export error:", error);
    return NextResponse.json(
      { error: "Failed to export property analysis" },
      { status: 500 },
    );
  }
}

function generatePropertyAnalysisPDF(property: any) {
  const analysisData = property.analysis_data || {};
  const overview = analysisData.propertyOverview || {};
  const aiAnalysis = analysisData.aiAnalysis || {};
  const comparables = analysisData.comparables || [];
  const financials = analysisData.financials || {};
  const marketInsights = analysisData.marketInsights || {};

  const exportDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const analysisDate = new Date(property.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Property Analysis Report - ${property.address}</title>
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
      padding: 30px;
    }

    /* Header Section */
    .header {
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      color: white;
      padding: 50px 40px;
      border-radius: 20px;
      margin-bottom: 40px;
      box-shadow: 0 10px 40px rgba(30, 41, 59, 0.3);
      page-break-inside: avoid;
    }

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 30px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .logo-icon {
      width: 50px;
      height: 50px;
      background: #3b82f6;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
    }

    .logo-text {
      font-size: 24px;
      font-weight: 700;
    }

    .report-type {
      background: rgba(59, 130, 246, 0.2);
      color: #3b82f6;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .property-title {
      font-size: 36px;
      font-weight: 800;
      margin-bottom: 10px;
      letter-spacing: -0.5px;
    }

    .analysis-date {
      font-size: 16px;
      opacity: 0.8;
      margin-bottom: 20px;
    }

    .grade-section {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .grade-badge {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      width: 80px;
      height: 80px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      font-weight: 800;
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
    }

    .grade-info {
      flex: 1;
    }

    .grade-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 5px;
    }

    .grade-description {
      font-size: 14px;
      opacity: 0.8;
    }

    /* Grid Layouts */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
      margin-bottom: 30px;
    }

    /* Cards */
    .metric-card {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border: 2px solid #e2e8f0;
      border-radius: 16px;
      padding: 25px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      page-break-inside: avoid;
    }

    .metric-card.primary {
      background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
      border-color: #3b82f6;
    }

    .metric-card.success {
      background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
      border-color: #10b981;
    }

    .metric-card.warning {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border-color: #f59e0b;
    }

    .metric-label {
      font-size: 13px;
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }

    .metric-value {
      font-size: 28px;
      font-weight: 800;
      color: #1e293b;
      margin-bottom: 5px;
    }

    .metric-subtitle {
      font-size: 14px;
      color: #64748b;
      font-weight: 500;
    }

    /* Sections */
    .section {
      margin-bottom: 50px;
      page-break-inside: avoid;
    }

    .section-title {
      font-size: 26px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 3px solid #3b82f6;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .section-icon {
      font-size: 24px;
    }

    /* Property Details */
    .detail-item {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }

    .detail-label {
      font-size: 12px;
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }

    .detail-value {
      font-size: 16px;
      color: #1e293b;
      font-weight: 600;
    }

    /* AI Analysis */
    .ai-analysis {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border: 2px solid #0ea5e9;
      border-radius: 16px;
      padding: 30px;
      margin-bottom: 30px;
    }

    .ai-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 20px;
      font-weight: 700;
      color: #0c4a6e;
      margin-bottom: 20px;
    }

    .ai-insights {
      display: grid;
      gap: 15px;
    }

    .insight-item {
      background: rgba(255, 255, 255, 0.8);
      border-radius: 12px;
      padding: 20px;
      border-left: 4px solid #0ea5e9;
    }

    .insight-category {
      font-size: 14px;
      font-weight: 600;
      color: #0c4a6e;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .insight-text {
      font-size: 15px;
      color: #374151;
      line-height: 1.6;
    }

    /* Financial Metrics */
    .financial-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .financial-card {
      background: linear-gradient(135deg, #fefce8 0%, #fef3c7 100%);
      border: 2px solid #f59e0b;
      border-radius: 16px;
      padding: 20px;
      text-align: center;
    }

    .financial-card.positive {
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
      border-color: #10b981;
    }

    .financial-card.negative {
      background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
      border-color: #ef4444;
    }

    /* Comparables */
    .comparable-item {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .comparable-address {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 5px;
    }

    .comparable-details {
      font-size: 14px;
      color: #6b7280;
    }

    .comparable-price {
      font-size: 18px;
      font-weight: 700;
      color: #059669;
    }

    /* Footer */
    .footer {
      margin-top: 60px;
      padding: 30px 0;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #6b7280;
      page-break-inside: avoid;
    }

    .footer-logo {
      font-size: 20px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 10px;
    }

    .footer-text {
      margin-bottom: 5px;
    }

    .footer-link {
      color: #3b82f6;
      text-decoration: none;
    }

    /* Print Styles */
    @media print {
      .container {
        padding: 20px;
      }
      
      .section {
        page-break-inside: avoid;
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .header-top {
        flex-direction: column;
        gap: 20px;
      }
      
      .grade-section {
        flex-direction: column;
        text-align: center;
      }
      
      .metrics-grid {
        grid-template-columns: 1fr;
      }
      
      .detail-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .financial-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="header-top">
        <div class="logo">
          <div class="logo-icon">🏠</div>
          <div class="logo-text">Four Corner Properties</div>
        </div>
        <div class="report-type">Property Analysis Report</div>
      </div>
      
      <div class="property-title">${property.address}</div>
      <div class="analysis-date">Analysis Date: ${analysisDate}</div>
      
      ${
        aiAnalysis.buyingGrade
          ? `
      <div class="grade-section">
        <div class="grade-badge">${aiAnalysis.buyingGrade}</div>
        <div class="grade-info">
          <div class="grade-title">Investment Grade</div>
          <div class="grade-description">
            ${getGradeDescription(aiAnalysis.buyingGrade)}
          </div>
        </div>
      </div>
      `
          : ""
      }
    </div>

    <!-- Key Metrics -->
    <div class="section">
      <h2 class="section-title">
        <span class="section-icon">📊</span>
        Key Property Metrics
      </h2>
      <div class="metrics-grid">
        ${
          overview.listPrice
            ? `
        <div class="metric-card primary">
          <div class="metric-label">List Price</div>
          <div class="metric-value">$${overview.listPrice.toLocaleString()}</div>
          <div class="metric-subtitle">Current Market Price</div>
        </div>
        `
            : ""
        }
        
        ${
          overview.zestimate
            ? `
        <div class="metric-card">
          <div class="metric-label">Zestimate</div>
          <div class="metric-value">$${overview.zestimate.toLocaleString()}</div>
          <div class="metric-subtitle">Zillow Estimate</div>
        </div>
        `
            : ""
        }
        
        ${
          overview.pricePerSqft
            ? `
        <div class="metric-card">
          <div class="metric-label">Price per Sq Ft</div>
          <div class="metric-value">$${overview.pricePerSqft}</div>
          <div class="metric-subtitle">Market Rate</div>
        </div>
        `
            : ""
        }
        
        ${
          financials.monthlyROI
            ? `
        <div class="metric-card ${financials.monthlyROI > 0 ? "success" : "warning"}">
          <div class="metric-label">Monthly ROI</div>
          <div class="metric-value">${financials.monthlyROI}%</div>
          <div class="metric-subtitle">Investment Return</div>
        </div>
        `
            : ""
        }
        
        ${
          financials.capRate
            ? `
        <div class="metric-card">
          <div class="metric-label">Cap Rate</div>
          <div class="metric-value">${financials.capRate}%</div>
          <div class="metric-subtitle">Capitalization Rate</div>
        </div>
        `
            : ""
        }
        
        ${
          financials.cashFlow
            ? `
        <div class="metric-card ${financials.cashFlow > 0 ? "success" : "warning"}">
          <div class="metric-label">Cash Flow</div>
          <div class="metric-value">$${financials.cashFlow.toLocaleString()}</div>
          <div class="metric-subtitle">Monthly Net Income</div>
        </div>
        `
            : ""
        }
      </div>
    </div>

    <!-- Property Details -->
    <div class="section">
      <h2 class="section-title">
        <span class="section-icon">🏡</span>
        Property Details
      </h2>
      <div class="detail-grid">
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
          overview.lotSize
            ? `
        <div class="detail-item">
          <div class="detail-label">Lot Size</div>
          <div class="detail-value">${overview.lotSize.toLocaleString()} ${overview.lotSizeUnit || "sq ft"}</div>
        </div>
        `
            : ""
        }
        
        ${
          overview.yearBuilt
            ? `
        <div class="detail-item">
          <div class="detail-label">Year Built</div>
          <div class="detail-value">${overview.yearBuilt}</div>
        </div>
        `
            : ""
        }
        
        ${
          overview.propertyType
            ? `
        <div class="detail-item">
          <div class="detail-label">Property Type</div>
          <div class="detail-value">${overview.propertyType}</div>
        </div>
        `
            : ""
        }
        
        ${
          overview.homeStatus
            ? `
        <div class="detail-item">
          <div class="detail-label">Status</div>
          <div class="detail-value">${overview.homeStatus}</div>
        </div>
        `
            : ""
        }
        
        ${
          overview.daysOnZillow
            ? `
        <div class="detail-item">
          <div class="detail-label">Days on Market</div>
          <div class="detail-value">${overview.daysOnZillow} days</div>
        </div>
        `
            : ""
        }
      </div>
    </div>

    <!-- AI Analysis -->
    ${
      aiAnalysis && (aiAnalysis.pros || aiAnalysis.cons || aiAnalysis.summary)
        ? `
    <div class="section">
      <h2 class="section-title">
        <span class="section-icon">🤖</span>
        AI Investment Analysis
      </h2>
      <div class="ai-analysis">
        <div class="ai-title">
          <span>🧠</span>
          AI-Powered Insights
        </div>
        <div class="ai-insights">
          ${
            aiAnalysis.summary
              ? `
          <div class="insight-item">
            <div class="insight-category">Summary</div>
            <div class="insight-text">${aiAnalysis.summary}</div>
          </div>
          `
              : ""
          }
          
          ${
            aiAnalysis.pros && aiAnalysis.pros.length > 0
              ? `
          <div class="insight-item">
            <div class="insight-category">Investment Pros</div>
            <div class="insight-text">
              <ul style="margin-left: 20px;">
                ${aiAnalysis.pros.map((pro: string) => `<li>${pro}</li>`).join("")}
              </ul>
            </div>
          </div>
          `
              : ""
          }
          
          ${
            aiAnalysis.cons && aiAnalysis.cons.length > 0
              ? `
          <div class="insight-item">
            <div class="insight-category">Investment Considerations</div>
            <div class="insight-text">
              <ul style="margin-left: 20px;">
                ${aiAnalysis.cons.map((con: string) => `<li>${con}</li>`).join("")}
              </ul>
            </div>
          </div>
          `
              : ""
          }
          
          ${
            aiAnalysis.recommendation
              ? `
          <div class="insight-item">
            <div class="insight-category">Recommendation</div>
            <div class="insight-text">${aiAnalysis.recommendation}</div>
          </div>
          `
              : ""
          }
        </div>
      </div>
    </div>
    `
        : ""
    }

    <!-- Financial Analysis -->
    ${
      Object.keys(financials).length > 0
        ? `
    <div class="section">
      <h2 class="section-title">
        <span class="section-icon">💰</span>
        Financial Analysis
      </h2>
      <div class="financial-grid">
        ${
          financials.monthlyRent
            ? `
        <div class="financial-card positive">
          <div class="metric-label">Monthly Rent</div>
          <div class="metric-value">$${financials.monthlyRent.toLocaleString()}</div>
        </div>
        `
            : ""
        }
        
        ${
          financials.monthlyExpenses
            ? `
        <div class="financial-card negative">
          <div class="metric-label">Monthly Expenses</div>
          <div class="metric-value">$${financials.monthlyExpenses.toLocaleString()}</div>
        </div>
        `
            : ""
        }
        
        ${
          financials.annualROI
            ? `
        <div class="financial-card ${financials.annualROI > 0 ? "positive" : "negative"}">
          <div class="metric-label">Annual ROI</div>
          <div class="metric-value">${financials.annualROI}%</div>
        </div>
        `
            : ""
        }
        
        ${
          financials.totalROI
            ? `
        <div class="financial-card ${financials.totalROI > 0 ? "positive" : "negative"}">
          <div class="metric-label">Total ROI</div>
          <div class="metric-value">${financials.totalROI}%</div>
        </div>
        `
            : ""
        }
      </div>
    </div>
    `
        : ""
    }

    <!-- Comparable Properties -->
    ${
      comparables && comparables.length > 0
        ? `
    <div class="section">
      <h2 class="section-title">
        <span class="section-icon">📈</span>
        Comparable Properties
      </h2>
      ${comparables
        .slice(0, 5)
        .map(
          (comp: any) => `
        <div class="comparable-item">
          <div>
            <div class="comparable-address">${comp.address || "Nearby Property"}</div>
            <div class="comparable-details">
              ${comp.bedrooms ? `${comp.bedrooms} bed` : ""} 
              ${comp.bathrooms ? `• ${comp.bathrooms} bath` : ""} 
              ${comp.squareFeet ? `• ${comp.squareFeet.toLocaleString()} sq ft` : ""}
            </div>
          </div>
          <div class="comparable-price">
            $${(comp.price || comp.listPrice || 0).toLocaleString()}
          </div>
        </div>
      `,
        )
        .join("")}
    </div>
    `
        : ""
    }

    <!-- Market Insights -->
    ${
      marketInsights && Object.keys(marketInsights).length > 0
        ? `
    <div class="section">
      <h2 class="section-title">
        <span class="section-icon">🏙️</span>
        Market Insights
      </h2>
      <div class="ai-analysis">
        <div class="ai-insights">
          ${
            marketInsights.marketTrend
              ? `
          <div class="insight-item">
            <div class="insight-category">Market Trend</div>
            <div class="insight-text">${marketInsights.marketTrend}</div>
          </div>
          `
              : ""
          }
          
          ${
            marketInsights.priceHistory
              ? `
          <div class="insight-item">
            <div class="insight-category">Price History</div>
            <div class="insight-text">${marketInsights.priceHistory}</div>
          </div>
          `
              : ""
          }
          
          ${
            marketInsights.neighborhood
              ? `
          <div class="insight-item">
            <div class="insight-category">Neighborhood Analysis</div>
            <div class="insight-text">${marketInsights.neighborhood}</div>
          </div>
          `
              : ""
          }
        </div>
      </div>
    </div>
    `
        : ""
    }

    <!-- Footer -->
    <div class="footer">
      <div class="footer-logo">Four Corner Properties</div>
      <div class="footer-text"> Real Estate Analysis Platform</div>
      <div class="footer-text">
        Report generated on ${exportDate}
      </div>
      <div class="footer-text">
        <a href="https://fourcornervt.com" class="footer-link">fourcornervt.com</a>
      </div>
      <div class="footer-text" style="margin-top: 15px; font-size: 12px; color: #9ca3af;">
        This analysis is for informational purposes only and should not be considered as financial advice.
        Please consult with a qualified financial advisor before making investment decisions.
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

function getGradeDescription(grade: string): string {
  const gradeDescriptions: Record<string, string> = {
    "A+": "Exceptional investment opportunity with outstanding potential",
    A: "Excellent investment with strong fundamentals and high returns",
    "A-": "Very good investment opportunity with solid performance metrics",
    "B+": "Good investment with above-average potential",
    B: "Fair investment opportunity with moderate returns",
    "B-": "Below-average investment with some concerns",
    "C+": "Poor investment with limited upside potential",
    C: "High-risk investment with significant concerns",
    "C-": "Very poor investment opportunity",
    D: "Not recommended for investment",
    F: "Avoid - significant investment risks",
  };

  return gradeDescriptions[grade] || "Investment analysis available";
}
