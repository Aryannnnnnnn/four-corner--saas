import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import type { PropertyData } from "@/app/lib/types/index";
import { formatNumber } from "./format";

// Helper to format exact prices
const formatExactPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

// Helper to safely extract string values
const safeString = (value: any): string => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return String(value);
  if (typeof value === "object") {
    if (Array.isArray(value)) return value.join(", ");
    if (value.text) return String(value.text);
    if (value.value) return String(value.value);
    if (value.content) return String(value.content);
    return JSON.stringify(value);
  }
  return String(value);
};

// Export to PDF - Comprehensive & Beautiful
export async function exportToPDF(data: PropertyData) {
  try {
    if (!data || !data.propertyOverview) {
      throw new Error("Invalid property data provided for export");
    }

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;
    let yPosition = 20;

    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - 25) {
        pdf.addPage();
        yPosition = 20;
      }
    };

    // ========================================
    // HEADER - Premium Design
    // ========================================
    pdf.setFillColor(30, 58, 138); // Deep blue gradient start
    pdf.rect(0, 0, pageWidth, 50, "F");

    // Accent gradient bar
    pdf.setFillColor(59, 130, 246); // Lighter blue
    pdf.rect(0, 45, pageWidth, 5, "F");

    // Add logo
    try {
      const logoImg = await fetch("/logo.png")
        .then((res) => res.blob())
        .then((blob) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
        });
      pdf.addImage(logoImg, "PNG", margin, 10, 20, 20);
    } catch (_err) {
      // Fallback logo
      pdf.setFillColor(255, 255, 255);
      pdf.roundedRect(margin, 10, 20, 20, 3, 3, "F");
      pdf.setFontSize(16);
      pdf.setTextColor(30, 58, 138);
      pdf.setFont("helvetica", "bold");
      pdf.text("4C", margin + 10, 22, { align: "center" });
    }

    // Company name and tagline
    pdf.setFontSize(26);
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.text("Four Corner Properties", margin + 25, 18);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(219, 234, 254); // Light blue
    pdf.text("Premium Real Estate Investment Analysis", margin + 25, 28);

    pdf.setFontSize(9);
    pdf.setTextColor(191, 219, 254); // Even lighter blue
    pdf.text(
      `Generated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
      margin + 25,
      36,
    );

    yPosition = 60;

    // ========================================
    // PROPERTY TITLE & ADDRESS
    // ========================================
    pdf.setFontSize(22);
    pdf.setTextColor(30, 58, 138);
    pdf.setFont("helvetica", "bold");
    const addressLines = pdf.splitTextToSize(
      data.propertyOverview.streetAddress,
      contentWidth,
    );
    pdf.text(addressLines, margin, yPosition);
    yPosition += addressLines.length * 8;

    pdf.setFontSize(13);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(107, 114, 128);
    pdf.text(
      `${data.propertyOverview.city}, ${data.propertyOverview.state} ${data.propertyOverview.zipcode}`,
      margin,
      yPosition,
    );
    yPosition += 12;

    // ========================================
    // INVESTMENT GRADE BOX - Eye-catching
    // ========================================
    checkPageBreak(50);
    pdf.setFillColor(239, 246, 255); // Light blue background
    pdf.roundedRect(margin, yPosition, contentWidth, 35, 4, 4, "F");

    // Left side - Grade
    pdf.setFillColor(59, 130, 246);
    pdf.roundedRect(margin + 5, yPosition + 5, 50, 25, 3, 3, "F");
    pdf.setFontSize(10);
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.text("INVESTMENT", margin + 30, yPosition + 12, { align: "center" });
    pdf.text("GRADE", margin + 30, yPosition + 18, { align: "center" });
    pdf.setFontSize(32);
    pdf.text(
      data.aiAnalysis?.buyingGrade || "N/A",
      margin + 30,
      yPosition + 28,
      {
        align: "center",
      },
    );

    // Right side - One Line Summary
    if (data.aiAnalysis?.oneLineSummary) {
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 58, 138);
      const summaryLines = pdf.splitTextToSize(
        safeString(data.aiAnalysis.oneLineSummary),
        contentWidth - 70,
      );
      pdf.text(summaryLines, margin + 60, yPosition + 15);
    }
    yPosition += 45;

    // ========================================
    // KEY METRICS GRID - Professional Layout
    // ========================================
    checkPageBreak(70);
    pdf.setFontSize(16);
    pdf.setTextColor(30, 58, 138);
    pdf.setFont("helvetica", "bold");
    pdf.text("Key Metrics", margin, yPosition);
    yPosition += 10;

    const listPrice = data.propertyOverview?.listPrice || 0;
    const zestimate = data.propertyOverview?.zestimate || 0;
    const pricePerSqft = data.propertyOverview?.pricePerSqft || 0;

    const metricsData = [
      {
        label: "List Price",
        value: listPrice ? formatExactPrice(listPrice) : "N/A",
        color: [34, 197, 94], // Green
      },
      {
        label: "Zestimate",
        value: zestimate ? formatExactPrice(zestimate) : "N/A",
        color: [59, 130, 246], // Blue
      },
      {
        label: "Price/Sqft",
        value: pricePerSqft ? `$${pricePerSqft.toFixed(2)}` : "N/A",
        color: [168, 85, 247], // Purple
      },
      {
        label: "Square Feet",
        value: data.propertyOverview?.squareFeet
          ? formatNumber(data.propertyOverview.squareFeet)
          : "N/A",
        color: [249, 115, 22], // Orange
      },
      {
        label: "Bedrooms",
        value: data.propertyOverview?.bedrooms?.toString() || "N/A",
        color: [236, 72, 153], // Pink
      },
      {
        label: "Bathrooms",
        value: data.propertyOverview?.bathrooms?.toString() || "N/A",
        color: [14, 165, 233], // Sky blue
      },
      {
        label: "Year Built",
        value: data.propertyOverview?.yearBuilt?.toString() || "N/A",
        color: [139, 92, 246], // Violet
      },
      {
        label: "5-Year ROI",
        value: data.analysisDetails?.estimatedROI5Year || "N/A",
        color: [16, 185, 129], // Emerald
      },
    ];

    // Draw metrics in a 2-column grid
    const colWidth = (contentWidth - 5) / 2;
    let col = 0;
    metricsData.forEach((metric) => {
      checkPageBreak(18);
      const xPos = margin + col * (colWidth + 5);

      pdf.setFillColor(249, 250, 251); // Light gray background
      pdf.roundedRect(xPos, yPosition, colWidth, 15, 2, 2, "F");

      // Colored indicator bar
      const [r = 0, g = 0, b = 0] = metric.color;
      pdf.setFillColor(r, g, b);
      pdf.roundedRect(xPos, yPosition, 3, 15, 1.5, 1.5, "F");

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(107, 114, 128);
      pdf.text(metric.label, xPos + 6, yPosition + 6);

      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0, 0, 0);
      // Ensure text fits within box - truncate if needed
      const maxValueWidth = colWidth - 12; // Leave margin on both sides
      const valueText = pdf.splitTextToSize(metric.value, maxValueWidth);
      pdf.text(valueText[0], xPos + 6, yPosition + 12); // Only show first line to prevent overflow

      col++;
      if (col === 2) {
        col = 0;
        yPosition += 18;
      }
    });

    if (col !== 0) yPosition += 18;
    yPosition += 10;

    // ========================================
    // AI RECOMMENDATION - Highlighted Section
    // ========================================
    checkPageBreak(50);
    pdf.setFontSize(16);
    pdf.setTextColor(30, 58, 138);
    pdf.setFont("helvetica", "bold");
    pdf.text("AI Investment Recommendation", margin, yPosition);
    yPosition += 8;

    pdf.setFillColor(254, 249, 195); // Light yellow/gold background
    const recommendation =
      safeString(data.aiAnalysis?.recommendation) ||
      "No recommendation available";
    const splitRecommendation = pdf.splitTextToSize(
      recommendation,
      contentWidth - 10,
    );
    const recHeight = splitRecommendation.length * 6 + 10;

    checkPageBreak(recHeight);
    pdf.roundedRect(margin, yPosition, contentWidth, recHeight, 3, 3, "F");
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(92, 78, 24); // Dark yellow text
    pdf.text(splitRecommendation, margin + 5, yPosition + 6);
    yPosition += recHeight + 10;

    // ========================================
    // VALUE ASSESSMENT
    // ========================================
    if (data.aiAnalysis?.valueAssessment) {
      checkPageBreak(40);
      pdf.setFontSize(14);
      pdf.setTextColor(30, 58, 138);
      pdf.setFont("helvetica", "bold");
      pdf.text("Value Assessment", margin, yPosition);
      yPosition += 8;

      const valueAssessment = safeString(data.aiAnalysis.valueAssessment);
      const splitValue = pdf.splitTextToSize(
        valueAssessment,
        contentWidth - 10,
      );
      const valHeight = splitValue.length * 5 + 8;

      checkPageBreak(valHeight);
      pdf.setFillColor(243, 244, 246);
      pdf.roundedRect(margin, yPosition, contentWidth, valHeight, 3, 3, "F");
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(55, 65, 81);
      pdf.text(splitValue, margin + 5, yPosition + 6);
      yPosition += valHeight + 10;
    }

    // ========================================
    // BEST FOR
    // ========================================
    if (data.analysisDetails?.bestFor) {
      const bestForText = safeString(data.analysisDetails.bestFor);
      const splitBestFor = pdf.splitTextToSize(bestForText, contentWidth - 14);
      const boxHeight = Math.max(18, splitBestFor.length * 5 + 10);

      checkPageBreak(boxHeight + 5);
      pdf.setFillColor(220, 252, 231); // Light green
      pdf.roundedRect(margin, yPosition, contentWidth, boxHeight, 3, 3, "F");

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(21, 128, 61); // Dark green
      pdf.text("✓ Best For:", margin + 5, yPosition + 7);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.text(splitBestFor, margin + 5, yPosition + 13);
      yPosition += boxHeight + 8;
    }

    // ========================================
    // COMPREHENSIVE AI DESCRIPTION
    // ========================================
    if (data.aiAnalysis?.comprehensiveDescription) {
      checkPageBreak(40);
      pdf.setFontSize(16);
      pdf.setTextColor(30, 58, 138);
      pdf.setFont("helvetica", "bold");
      pdf.text("Detailed AI Analysis", margin, yPosition);
      yPosition += 8;

      const compDesc = safeString(data.aiAnalysis.comprehensiveDescription);
      const splitDesc = pdf.splitTextToSize(compDesc, contentWidth);

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(55, 65, 81);

      splitDesc.forEach((line: string) => {
        checkPageBreak(6);
        pdf.text(line, margin, yPosition);
        yPosition += 5;
      });
      yPosition += 10;
    }

    // ========================================
    // PRICE ANALYSIS
    // ========================================
    if (data.analysisDetails?.priceAnalysis) {
      checkPageBreak(40);
      pdf.setFontSize(16);
      pdf.setTextColor(30, 58, 138);
      pdf.setFont("helvetica", "bold");
      pdf.text("Price Analysis", margin, yPosition);
      yPosition += 8;

      const priceAnalysis = safeString(data.analysisDetails.priceAnalysis);
      const splitPrice = pdf.splitTextToSize(priceAnalysis, contentWidth - 10);
      const priceHeight = splitPrice.length * 5 + 8;

      checkPageBreak(priceHeight);
      pdf.setFillColor(254, 243, 199); // Light amber
      pdf.roundedRect(margin, yPosition, contentWidth, priceHeight, 3, 3, "F");
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(120, 53, 15); // Dark amber
      pdf.text(splitPrice, margin + 5, yPosition + 6);
      yPosition += priceHeight + 10;
    }

    // ========================================
    // PROPERTY FEATURES & DETAILS
    // ========================================
    checkPageBreak(60);
    pdf.setFontSize(16);
    pdf.setTextColor(30, 58, 138);
    pdf.setFont("helvetica", "bold");
    pdf.text("Property Features & Details", margin, yPosition);
    yPosition += 10;

    const propertyDetails = [
      [
        "Property Type",
        data.propertyOverview?.propertyType?.replace(/_/g, " ") || "N/A",
      ],
      ["Stories", data.propertyOverview?.stories?.toString() || "N/A"],
      [
        "Lot Size",
        data.propertyOverview?.lotSize
          ? `${formatNumber(data.propertyOverview.lotSize)} ${data.propertyOverview.lotSizeUnit || "sqft"}`
          : "N/A",
      ],
      ["Garage Spaces", data.features?.garageSpaces?.toString() || "N/A"],
      ["Fireplaces", data.features?.fireplaces?.toString() || "0"],
      ["Architecture", data.features?.architecturalStyle || "Not Specified"],
      ["Roof Type", data.features?.roofType || "Not Specified"],
      ["Exterior", data.features?.exteriorMaterial || "Not Specified"],
      ["Heating", data.features?.heating || "Not Specified"],
      ["Cooling", data.features?.cooling || "Not Specified"],
      ["Water Source", data.utilities?.waterSource || "Not Specified"],
      ["Sewer", data.utilities?.sewer || "Not Specified"],
    ];

    propertyDetails.forEach(([label, value]) => {
      if (!label || !value) return;
      checkPageBreak(7);
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(107, 114, 128);
      pdf.text(label, margin, yPosition);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(31, 41, 55);
      pdf.text(value, pageWidth - margin, yPosition, { align: "right" });
      yPosition += 7;
    });
    yPosition += 8;

    // Appliances
    if (data.features?.appliances && data.features.appliances.length > 0) {
      checkPageBreak(20);
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 58, 138);
      pdf.text("Appliances Included", margin, yPosition);
      yPosition += 6;

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(75, 85, 99);
      const appliancesText = data.features.appliances.join(", ");
      const splitAppliances = pdf.splitTextToSize(appliancesText, contentWidth);
      pdf.text(splitAppliances, margin, yPosition);
      yPosition += splitAppliances.length * 4 + 8;
    }

    // Pool Features
    if (data.features?.poolFeatures && data.features.poolFeatures.length > 0) {
      checkPageBreak(20);
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 58, 138);
      pdf.text("Pool Features", margin, yPosition);
      yPosition += 6;

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(75, 85, 99);
      const poolText = data.features.poolFeatures.join(", ");
      const splitPool = pdf.splitTextToSize(poolText, contentWidth);
      pdf.text(splitPool, margin, yPosition);
      yPosition += splitPool.length * 4 + 8;
    }

    // ========================================
    // INVESTMENT STRENGTHS
    // ========================================
    checkPageBreak(50);
    pdf.setFontSize(16);
    pdf.setTextColor(30, 58, 138);
    pdf.setFont("helvetica", "bold");
    pdf.text("Investment Strengths", margin, yPosition);
    yPosition += 10;

    const strengths = data.insights?.keyStrengths || [];
    if (strengths.length > 0) {
      strengths.forEach((strength, index) => {
        checkPageBreak(15);
        // Green number circle
        pdf.setFillColor(220, 252, 231);
        pdf.circle(margin + 4, yPosition + 1, 3.5, "F");
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(21, 128, 61);
        pdf.text((index + 1).toString(), margin + 4, yPosition + 3, {
          align: "center",
        });

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(22, 101, 52);
        const splitStrength = pdf.splitTextToSize(strength, contentWidth - 15);
        pdf.text(splitStrength, margin + 11, yPosition + 4);
        yPosition += splitStrength.length * 5 + 4;
      });
    } else {
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "italic");
      pdf.setTextColor(156, 163, 175);
      pdf.text("No strengths data available", margin, yPosition);
      yPosition += 10;
    }
    yPosition += 10;

    // ========================================
    // POTENTIAL RISKS
    // ========================================
    checkPageBreak(50);
    pdf.setFontSize(16);
    pdf.setTextColor(30, 58, 138);
    pdf.setFont("helvetica", "bold");
    pdf.text("Potential Risks", margin, yPosition);
    yPosition += 10;

    const risks = data.insights?.keyRisks || [];
    if (risks.length > 0) {
      risks.forEach((risk, index) => {
        checkPageBreak(15);
        // Red number circle
        pdf.setFillColor(254, 226, 226);
        pdf.circle(margin + 4, yPosition + 1, 3.5, "F");
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(185, 28, 28);
        pdf.text((index + 1).toString(), margin + 4, yPosition + 3, {
          align: "center",
        });

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(153, 27, 27);
        const splitRisk = pdf.splitTextToSize(risk, contentWidth - 15);
        pdf.text(splitRisk, margin + 11, yPosition + 4);
        yPosition += splitRisk.length * 5 + 4;
      });
    } else {
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "italic");
      pdf.setTextColor(156, 163, 175);
      pdf.text("No risks data available", margin, yPosition);
      yPosition += 10;
    }
    yPosition += 10;

    // ========================================
    // RED FLAGS
    // ========================================
    if (
      data.insights?.redFlags &&
      data.insights.redFlags.length > 0 &&
      data.insights.redFlags[0] !== "None identified"
    ) {
      checkPageBreak(50);
      pdf.setFontSize(16);
      pdf.setTextColor(220, 38, 38);
      pdf.setFont("helvetica", "bold");
      pdf.text("⚠ Red Flags", margin, yPosition);
      yPosition += 10;

      data.insights.redFlags.forEach((flag) => {
        const flagText = pdf.splitTextToSize(`⚠ ${flag}`, contentWidth - 14);
        const boxHeight = Math.max(10, flagText.length * 5 + 6);

        checkPageBreak(boxHeight + 2);
        pdf.setFillColor(254, 242, 242);
        pdf.roundedRect(margin, yPosition, contentWidth, boxHeight, 2, 2, "F");

        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(127, 29, 29);
        pdf.text(flagText, margin + 5, yPosition + 5);
        yPosition += boxHeight + 3;
      });
      yPosition += 10;
    }

    // ========================================
    // HIDDEN GEMS
    // ========================================
    if (data.insights?.hiddenGems && data.insights.hiddenGems.length > 0) {
      checkPageBreak(50);
      pdf.setFontSize(16);
      pdf.setTextColor(217, 119, 6);
      pdf.setFont("helvetica", "bold");
      pdf.text("✨ Hidden Gems", margin, yPosition);
      yPosition += 10;

      data.insights.hiddenGems.forEach((gem) => {
        const gemText = pdf.splitTextToSize(`✨ ${gem}`, contentWidth - 14);
        const boxHeight = Math.max(10, gemText.length * 5 + 6);

        checkPageBreak(boxHeight + 2);
        pdf.setFillColor(254, 243, 199);
        pdf.roundedRect(margin, yPosition, contentWidth, boxHeight, 2, 2, "F");

        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(120, 53, 15);
        pdf.text(gemText, margin + 5, yPosition + 5);
        yPosition += boxHeight + 3;
      });
      yPosition += 10;
    }

    // ========================================
    // NEGOTIATION STRATEGIES
    // ========================================
    if (
      data.insights?.negotiationStrategy &&
      data.insights.negotiationStrategy.length > 0
    ) {
      checkPageBreak(50);
      pdf.setFontSize(16);
      pdf.setTextColor(30, 58, 138);
      pdf.setFont("helvetica", "bold");
      pdf.text("Negotiation Strategies", margin, yPosition);
      yPosition += 10;

      data.insights.negotiationStrategy.forEach((strategy, index) => {
        checkPageBreak(15);
        // Gold number circle
        pdf.setFillColor(254, 243, 199);
        pdf.circle(margin + 4, yPosition + 1, 3.5, "F");
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(146, 64, 14);
        pdf.text((index + 1).toString(), margin + 4, yPosition + 3, {
          align: "center",
        });

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(120, 53, 15);
        const splitStrategy = pdf.splitTextToSize(strategy, contentWidth - 15);
        pdf.text(splitStrategy, margin + 11, yPosition + 4);
        yPosition += splitStrategy.length * 5 + 4;
      });
      yPosition += 10;
    }

    // ========================================
    // PROPERTY TAXES
    // ========================================
    if (data.costs) {
      checkPageBreak(30);
      pdf.setFontSize(16);
      pdf.setTextColor(30, 58, 138);
      pdf.setFont("helvetica", "bold");
      pdf.text("Property Taxes", margin, yPosition);
      yPosition += 10;

      pdf.setFillColor(243, 244, 246);
      pdf.roundedRect(margin, yPosition, contentWidth, 20, 3, 3, "F");

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(107, 114, 128);
      pdf.text("Annual Property Tax", margin + 5, yPosition + 8);

      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(31, 41, 55);
      pdf.text(
        data.costs.annualPropertyTax
          ? formatExactPrice(data.costs.annualPropertyTax)
          : "N/A",
        pageWidth - margin - 5,
        yPosition + 8,
        { align: "right" },
      );

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(107, 114, 128);
      pdf.text(
        `Tax Year: ${data.costs.taxYear || "N/A"}`,
        margin + 5,
        yPosition + 15,
      );
      yPosition += 28;
    }

    // ========================================
    // SCHOOLS
    // ========================================
    if (data.schools && data.schools.length > 0) {
      checkPageBreak(60);
      pdf.setFontSize(16);
      pdf.setTextColor(30, 58, 138);
      pdf.setFont("helvetica", "bold");
      pdf.text("Nearby Schools", margin, yPosition);
      yPosition += 10;

      data.schools.forEach((school) => {
        checkPageBreak(20);
        pdf.setFillColor(249, 250, 251);
        pdf.roundedRect(margin, yPosition, contentWidth, 18, 3, 3, "F");

        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(31, 41, 55);
        pdf.text(school.name || "Unknown School", margin + 5, yPosition + 6);

        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(107, 114, 128);
        pdf.text(
          `${school.grades} | ${school.type}`,
          margin + 5,
          yPosition + 11,
        );

        // Rating
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(217, 119, 6);
        pdf.text(`${school.rating}/10`, pageWidth - margin - 5, yPosition + 6, {
          align: "right",
        });

        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(107, 114, 128);
        pdf.text(
          `${school.distance} mi`,
          pageWidth - margin - 5,
          yPosition + 11,
          { align: "right" },
        );

        yPosition += 22;
      });
      yPosition += 5;
    }

    // ========================================
    // COMPARABLE PROPERTIES
    // ========================================
    if (data.comparables && data.comparables.length > 0) {
      checkPageBreak(80);
      pdf.setFontSize(16);
      pdf.setTextColor(30, 58, 138);
      pdf.setFont("helvetica", "bold");
      pdf.text("Comparable Properties", margin, yPosition);
      yPosition += 10;

      // Table header
      pdf.setFillColor(30, 58, 138);
      pdf.rect(margin, yPosition, contentWidth, 8, "F");

      pdf.setFontSize(8);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(255, 255, 255);
      const colWidths = [
        contentWidth * 0.35,
        contentWidth * 0.2,
        contentWidth * 0.15,
        contentWidth * 0.15,
        contentWidth * 0.15,
      ];
      let xPos = margin + 2;
      ["Address", "Price", "Beds/Baths", "Sqft", "$/Sqft"].forEach(
        (header, i) => {
          pdf.text(header, xPos, yPosition + 5);
          xPos += colWidths[i] || 0;
        },
      );
      yPosition += 10;

      // Table rows
      data.comparables.slice(0, 8).forEach((comp, index) => {
        checkPageBreak(8);
        if (index % 2 === 0) {
          pdf.setFillColor(249, 250, 251);
          pdf.rect(margin, yPosition - 2, contentWidth, 7, "F");
        }

        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(31, 41, 55);

        xPos = margin + 2;
        const addressShort =
          comp.address.substring(0, 30) +
          (comp.address.length > 30 ? "..." : "");
        pdf.text(addressShort, xPos, yPosition + 3);
        xPos += colWidths[0] || 0;

        pdf.text(
          comp.price ? formatExactPrice(comp.price) : "N/A",
          xPos,
          yPosition + 3,
        );
        xPos += colWidths[1] || 0;

        pdf.text(
          `${comp.bedrooms || 0}/${comp.bathrooms || 0}`,
          xPos,
          yPosition + 3,
        );
        xPos += colWidths[2] || 0;

        pdf.text(
          comp.squareFeet ? formatNumber(comp.squareFeet) : "N/A",
          xPos,
          yPosition + 3,
        );
        xPos += colWidths[3] || 0;

        pdf.text(
          comp.pricePerSqft ? `$${comp.pricePerSqft.toFixed(2)}` : "N/A",
          xPos,
          yPosition + 3,
        );

        yPosition += 7;
      });

      // Average comparison
      yPosition += 5;
      checkPageBreak(20);
      pdf.setFillColor(239, 246, 255);
      pdf.roundedRect(margin, yPosition, contentWidth, 15, 3, 3, "F");

      const avgPrice =
        data.comparables.reduce((sum, c) => sum + (c.price || 0), 0) /
        data.comparables.length;

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 58, 138);
      pdf.text("Average Comp Price:", margin + 5, yPosition + 6);
      pdf.text(formatExactPrice(avgPrice), margin + 60, yPosition + 6);

      pdf.text("This Property:", margin + 5, yPosition + 12);
      pdf.setTextColor(217, 119, 6);
      pdf.text(
        listPrice ? formatExactPrice(listPrice) : "N/A",
        margin + 60,
        yPosition + 12,
      );

      yPosition += 20;
    }

    // ========================================
    // FOOTER ON ALL PAGES
    // ========================================
    const totalPages = pdf.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);

      // Footer separator line
      pdf.setDrawColor(229, 231, 235);
      pdf.setLineWidth(0.5);
      pdf.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

      // Footer text
      pdf.setFontSize(8);
      pdf.setTextColor(156, 163, 175);
      pdf.setFont("helvetica", "normal");
      pdf.text(
        `Four Corner Properties - Premium Investment Analysis`,
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" },
      );
      pdf.text(
        `Page ${i} of ${totalPages}`,
        pageWidth - margin,
        pageHeight - 10,
        { align: "right" },
      );

      if (data.zillowUrl && typeof data.zillowUrl === "string") {
        pdf.setFontSize(7);
        pdf.setTextColor(59, 130, 246);
        pdf.text("View on Zillow", margin, pageHeight - 10);
      }
    }

    pdf.save(
      `${data.propertyOverview.streetAddress.replace(/[^a-z0-9]/gi, "_")}_Comprehensive_Analysis.pdf`,
    );
  } catch (error) {
    console.error("PDF export error:", error);
    throw new Error("Failed to export PDF");
  }
}

// Export to Word (DOCX)
export async function exportToWord(data: PropertyData) {
  try {
    if (!data || !data.propertyOverview) {
      throw new Error("Invalid property data provided for export");
    }

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "Four Corner Properties",
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: "Luxury Real Estate Analysis Report",
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),

            new Paragraph({
              text: data.propertyOverview.streetAddress,
              heading: HeadingLevel.HEADING_2,
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: `${data.propertyOverview.city}, ${data.propertyOverview.state} ${data.propertyOverview.zipcode}`,
              spacing: { after: 400 },
            }),

            new Paragraph({
              text: "Investment Grade",
              heading: HeadingLevel.HEADING_3,
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: data.aiAnalysis?.buyingGrade || "N/A",
                  bold: true,
                  size: 48,
                  color: "3b82f6", // Blue theme
                }),
              ],
              spacing: { after: 400 },
            }),

            new Paragraph({
              text: "AI Recommendation",
              heading: HeadingLevel.HEADING_3,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text:
                data.aiAnalysis?.recommendation ||
                "No recommendation available",
              spacing: { after: 400 },
            }),

            new Paragraph({
              text: "Key Metrics",
              heading: HeadingLevel.HEADING_3,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `List Price: ${data.propertyOverview?.listPrice ? formatExactPrice(data.propertyOverview.listPrice) : "N/A"}`,
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: `Zestimate: ${data.propertyOverview?.zestimate ? formatExactPrice(data.propertyOverview.zestimate) : "N/A"}`,
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: `5-Year Projection: ${data.appreciation?.year5 ? formatExactPrice(data.appreciation.year5) : "N/A"}`,
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: `Days on Zillow: ${data.zillow?.daysOnZillow || "N/A"}`,
              spacing: { after: 400 },
            }),

            new Paragraph({
              text: "Property Details",
              heading: HeadingLevel.HEADING_3,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `Bedrooms: ${data.factsAndFeatures?.bedrooms || "N/A"}`,
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: `Bathrooms: ${data.factsAndFeatures?.bathrooms || "N/A"}`,
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: `Square Feet: ${data.factsAndFeatures?.squareFeet ? formatNumber(data.factsAndFeatures.squareFeet) : "N/A"}`,
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: `Year Built: ${data.property?.yearBuilt || "N/A"}`,
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: `Property Type: ${data.property?.propertyType || "N/A"}`, // ✅ FIXED
              spacing: { after: 400 },
            }),

            new Paragraph({
              text: "Investment Strengths",
              heading: HeadingLevel.HEADING_3,
              spacing: { after: 200 },
            }),
            ...(data.keyStrengths || []).map(
              (strength) =>
                new Paragraph({
                  text: `• ${strength}`,
                  spacing: { after: 100 },
                }),
            ),

            new Paragraph({
              text: "",
              spacing: { after: 200 },
            }),

            new Paragraph({
              text: "Potential Risks",
              heading: HeadingLevel.HEADING_3,
              spacing: { after: 200 },
            }),
            ...(data.keyRisks || []).map(
              (risk) =>
                new Paragraph({
                  text: `• ${risk}`,
                  spacing: { after: 100 },
                }),
            ),

            new Paragraph({
              text: "",
              spacing: { after: 400 },
            }),

            new Paragraph({
              text: `Generated by Four Corner Properties on ${new Date().toLocaleDateString()}`,
              alignment: AlignmentType.CENTER,
              spacing: { before: 400 },
            }),
            new Paragraph({
              text: data.zillow?.url || "",
              alignment: AlignmentType.CENTER,
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(
      blob,
      `${data.propertyOverview.streetAddress.replace(/[^a-z0-9]/gi, "_")}_Analysis.docx`,
    );
  } catch (error) {
    console.error("DOCX export error:", error);
    throw new Error("Failed to export Word document");
  }
}

// Export to Text
export async function exportToText(data: PropertyData) {
  try {
    if (!data || !data.propertyOverview) {
      throw new Error("Invalid property data provided for export");
    }

    let text = "";

    text += "═══════════════════════════════════════════════════════════════\n";
    text += "              FOUR CORNER PROPERTIES\n";
    text += "         Luxury Real Estate Analysis Report\n";
    text +=
      "═══════════════════════════════════════════════════════════════\n\n";

    text += `PROPERTY ADDRESS\n`;
    text += `${data.propertyOverview.streetAddress}\n`;
    text += `${data.propertyOverview.city}, ${data.propertyOverview.state} ${data.propertyOverview.zipcode}\n\n`;

    text += `INVESTMENT GRADE: ${data.aiAnalysis?.buyingGrade || "N/A"}\n\n`;

    text += `AI RECOMMENDATION\n`;
    text += `${"-".repeat(60)}\n`;
    text += `${data.aiAnalysis?.recommendation || "No recommendation available"}\n\n`;

    text += `VALUE ASSESSMENT\n`;
    text += `${"-".repeat(60)}\n`;
    text += `${data.aiAnalysis?.valueAssessment || "No assessment available"}\n\n`;

    text += `KEY METRICS\n`;
    text += `${"-".repeat(60)}\n`;
    text += `List Price:              ${data.propertyOverview?.listPrice ? formatExactPrice(data.propertyOverview.listPrice) : "N/A"}\n`;
    text += `Zestimate:               ${data.propertyOverview?.zestimate ? formatExactPrice(data.propertyOverview.zestimate) : "N/A"}\n`;
    text += `5-Year Projection:       ${data.appreciation?.year5 ? formatExactPrice(data.appreciation.year5) : "N/A"}\n`;
    text += `Days on Zillow:          ${data.zillow?.daysOnZillow || "N/A"}\n\n`;

    text += `PROPERTY DETAILS\n`;
    text += `${"-".repeat(60)}\n`;
    text += `Bedrooms:                ${data.factsAndFeatures?.bedrooms || "N/A"}\n`;
    text += `Bathrooms:               ${data.factsAndFeatures?.bathrooms || "N/A"}\n`;
    text += `Square Feet:             ${data.factsAndFeatures?.squareFeet ? formatNumber(data.factsAndFeatures.squareFeet) : "N/A"}\n`;
    text += `Year Built:              ${data.property?.yearBuilt || "N/A"}\n`;
    text += `Property Type:           ${data.property?.propertyType || "N/A"}\n\n`; // ✅ FIXED

    text += `INVESTMENT STRENGTHS\n`;
    text += `${"-".repeat(60)}\n`;
    const strengths = data.keyStrengths || [];
    if (strengths.length > 0) {
      strengths.forEach((strength, index) => {
        text += `${index + 1}. ${strength}\n`;
      });
    } else {
      text += `No strengths data available\n`;
    }
    text += "\n";

    text += `POTENTIAL RISKS\n`;
    text += `${"-".repeat(60)}\n`;
    const risks = data.keyRisks || [];
    if (risks.length > 0) {
      risks.forEach((risk, index) => {
        text += `${index + 1}. ${risk}\n`;
      });
    } else {
      text += `No risks data available\n`;
    }
    text += "\n";

    text += `═══════════════════════════════════════════════════════════════\n`;
    text += `Generated by Four Corner Properties\n`;
    text += `Date: ${new Date().toLocaleDateString()}\n`;
    text += `Zillow Listing: ${data.zillow?.url || "N/A"}\n`;
    text += `═══════════════════════════════════════════════════════════════\n`;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(
      blob,
      `${data.propertyOverview.streetAddress.replace(/[^a-z0-9]/gi, "_")}_Analysis.txt`,
    );
  } catch (error) {
    console.error("TXT export error:", error);
    throw new Error("Failed to export text file");
  }
}
