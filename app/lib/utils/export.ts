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
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
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
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    let yPosition = 25;

    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - 30) {
        pdf.addPage();
        yPosition = 25;
      }
    };

    // ========================================
    // MODERN HEADER
    // ========================================
    // Main header background
    pdf.setFillColor(30, 58, 138); // Deep blue
    pdf.rect(0, 0, pageWidth, 45, "F");

    // Accent bar
    pdf.setFillColor(59, 130, 246); // Bright blue
    pdf.rect(0, 45, pageWidth, 3, "F");

    // Company branding
    pdf.setFontSize(24);
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.text("Four Corner Properties", margin, 18);

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(191, 219, 254);
    pdf.text("Premium Real Estate Investment Analysis", margin, 28);

    // Date stamp
    pdf.setFontSize(8);
    pdf.setTextColor(148, 163, 184);
    const dateStr = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    pdf.text(`Generated: ${dateStr}`, pageWidth - margin, 28, {
      align: "right"
    });

    yPosition = 60;

    // ========================================
    // PROPERTY HERO SECTION
    // ========================================
    checkPageBreak(50);

    // Property address
    pdf.setFontSize(20);
    pdf.setTextColor(30, 41, 59);
    pdf.setFont("helvetica", "bold");
    const addressLines = pdf.splitTextToSize(
      data.propertyOverview.streetAddress,
      contentWidth - 60,
    );
    pdf.text(addressLines, margin, yPosition);
    yPosition += addressLines.length * 8;

    // Location details
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(100, 116, 139);
    pdf.text(
      `${data.propertyOverview.city}, ${data.propertyOverview.state} ${data.propertyOverview.zipcode}`,
      margin,
      yPosition,
    );

    // Investment grade badge
    const gradeBoxX = pageWidth - margin - 55;
    const gradeBoxY = yPosition - addressLines.length * 8 - 2;

    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.5);
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(gradeBoxX, gradeBoxY, 55, 35, 3, 3, "FD");

    const gradeValue = data.aiAnalysis?.buyingGrade || "N/A";
    const gradeColor = getGradeColor(gradeValue);
    pdf.setFontSize(32);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(gradeColor[0], gradeColor[1], gradeColor[2]);
    pdf.text(gradeValue, gradeBoxX + 27.5, gradeBoxY + 20, { align: "center" });

    pdf.setFontSize(8);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(100, 116, 139);
    pdf.text("GRADE", gradeBoxX + 27.5, gradeBoxY + 28, { align: "center" });

    yPosition += 10;

    // ========================================
    // EXECUTIVE SUMMARY
    // ========================================
    if (data.aiAnalysis?.oneLineSummary) {
      checkPageBreak(35);

      const summaryLines = pdf.splitTextToSize(
        safeString(data.aiAnalysis.oneLineSummary),
        contentWidth - 12,
      );
      const summaryHeight = summaryLines.length * 5.5 + 14;

      pdf.setFillColor(239, 246, 255);
      pdf.setDrawColor(191, 219, 254);
      pdf.setLineWidth(0.5);
      pdf.roundedRect(margin, yPosition, contentWidth, summaryHeight, 3, 3, "FD");

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 64, 175);
      pdf.text("EXECUTIVE SUMMARY", margin + 6, yPosition + 7);

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(30, 58, 138);
      pdf.text(summaryLines, margin + 6, yPosition + 13);

      yPosition += summaryHeight + 8;
    }

    // ========================================
    // KEY METRICS
    // ========================================
    checkPageBreak(75);

    pdf.setFontSize(14);
    pdf.setTextColor(30, 41, 59);
    pdf.setFont("helvetica", "bold");
    pdf.text("Key Metrics", margin, yPosition);
    yPosition += 8;

    const listPrice = data.propertyOverview?.listPrice || 0;
    const zestimate = data.propertyOverview?.zestimate || 0;
    const pricePerSqft = data.propertyOverview?.pricePerSqft || 0;

    const metricsData = [
      {
        label: "List Price",
        value: listPrice ? formatExactPrice(listPrice) : "N/A",
        color: [34, 197, 94],
      },
      {
        label: "Zestimate",
        value: zestimate ? formatExactPrice(zestimate) : "N/A",
        color: [59, 130, 246],
      },
      {
        label: "Square Feet",
        value: data.propertyOverview?.squareFeet
          ? formatNumber(data.propertyOverview.squareFeet)
          : "N/A",
        color: [168, 85, 247],
      },
      {
        label: "Price/Sqft",
        value: pricePerSqft ? `$${pricePerSqft.toFixed(0)}` : "N/A",
        color: [245, 158, 11],
      },
      {
        label: "Bedrooms",
        value: data.propertyOverview?.bedrooms?.toString() || "N/A",
        color: [236, 72, 153],
      },
      {
        label: "Bathrooms",
        value: data.propertyOverview?.bathrooms?.toString() || "N/A",
        color: [14, 165, 233],
      },
      {
        label: "Year Built",
        value: data.propertyOverview?.yearBuilt?.toString() || "N/A",
        color: [100, 116, 139],
      },
      {
        label: "5-Year ROI",
        value: data.analysisDetails?.estimatedROI5Year || "N/A",
        color: [16, 185, 129],
      },
    ];

    // Draw metrics in 2-column grid
    const colWidth = (contentWidth - 4) / 2;
    const cardHeight = 18;
    const gap = 4;

    metricsData.forEach((metric, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const xPos = margin + col * (colWidth + gap);
      const cardY = yPosition + row * (cardHeight + gap);

      checkPageBreak(cardHeight + 4);

      pdf.setFillColor(249, 250, 251);
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(xPos, cardY, colWidth, cardHeight, 2, 2, "FD");

      // Color bar
      pdf.setFillColor(metric.color[0], metric.color[1], metric.color[2]);
      pdf.roundedRect(xPos, cardY, 3, cardHeight, 1.5, 1.5, "F");

      // Label
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(100, 116, 139);
      pdf.text(metric.label, xPos + 6, cardY + 7);

      // Value
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 41, 59);
      const valueText = pdf.splitTextToSize(metric.value, colWidth - 12);
      pdf.text(valueText[0], xPos + 6, cardY + 14);
    });

    yPosition += Math.ceil(metricsData.length / 2) * (cardHeight + gap) + 8;

    // ========================================
    // AI RECOMMENDATION
    // ========================================
    if (data.aiAnalysis?.recommendation) {
      checkPageBreak(40);

      pdf.setFontSize(14);
      pdf.setTextColor(30, 41, 59);
      pdf.setFont("helvetica", "bold");
      pdf.text("AI Investment Recommendation", margin, yPosition);
      yPosition += 8;

      const recommendation = safeString(data.aiAnalysis.recommendation);
      const splitRecommendation = pdf.splitTextToSize(
        recommendation,
        contentWidth - 12,
      );
      const recHeight = splitRecommendation.length * 5.5 + 12;

      checkPageBreak(recHeight);

      pdf.setFillColor(254, 252, 232);
      pdf.setDrawColor(245, 158, 11);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(margin, yPosition, contentWidth, recHeight, 3, 3, "FD");

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(92, 78, 24);
      pdf.text(splitRecommendation, margin + 6, yPosition + 7);
      yPosition += recHeight + 8;
    }

    // ========================================
    // VALUE ASSESSMENT
    // ========================================
    if (data.aiAnalysis?.valueAssessment) {
      checkPageBreak(35);

      pdf.setFontSize(12);
      pdf.setTextColor(30, 41, 59);
      pdf.setFont("helvetica", "bold");
      pdf.text("Value Assessment", margin, yPosition);
      yPosition += 7;

      const valueAssessment = safeString(data.aiAnalysis.valueAssessment);
      const splitValue = pdf.splitTextToSize(valueAssessment, contentWidth - 10);
      const valHeight = splitValue.length * 5 + 10;

      checkPageBreak(valHeight);

      pdf.setFillColor(248, 250, 252);
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(margin, yPosition, contentWidth, valHeight, 2, 2, "FD");

      pdf.setFontSize(9.5);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(51, 65, 85);
      pdf.text(splitValue, margin + 5, yPosition + 6);
      yPosition += valHeight + 8;
    }

    // ========================================
    // BEST FOR
    // ========================================
    if (data.analysisDetails?.bestFor) {
      const bestForText = safeString(data.analysisDetails.bestFor);
      const splitBestFor = pdf.splitTextToSize(bestForText, contentWidth - 16);
      const boxHeight = Math.max(16, splitBestFor.length * 5 + 10);

      checkPageBreak(boxHeight + 4);

      pdf.setFillColor(236, 253, 245);
      pdf.setDrawColor(16, 185, 129);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(margin, yPosition, contentWidth, boxHeight, 2, 2, "FD");

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(6, 95, 70);
      pdf.text("Best For:", margin + 6, yPosition + 6);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.text(splitBestFor, margin + 6, yPosition + 11);
      yPosition += boxHeight + 8;
    }

    // ========================================
    // DETAILED AI ANALYSIS
    // ========================================
    if (data.aiAnalysis?.comprehensiveDescription) {
      checkPageBreak(40);

      pdf.setFontSize(14);
      pdf.setTextColor(30, 41, 59);
      pdf.setFont("helvetica", "bold");
      pdf.text("Detailed AI Analysis", margin, yPosition);
      yPosition += 8;

      const compDesc = safeString(data.aiAnalysis.comprehensiveDescription);
      const splitDesc = pdf.splitTextToSize(compDesc, contentWidth - 2);

      pdf.setFontSize(9.5);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(51, 65, 85);

      splitDesc.forEach((line: string) => {
        checkPageBreak(5);
        pdf.text(line, margin + 1, yPosition);
        yPosition += 5;
      });
      yPosition += 8;
    }

    // ========================================
    // PRICE ANALYSIS
    // ========================================
    if (data.analysisDetails?.priceAnalysis) {
      checkPageBreak(35);

      pdf.setFontSize(14);
      pdf.setTextColor(30, 41, 59);
      pdf.setFont("helvetica", "bold");
      pdf.text("Price Analysis", margin, yPosition);
      yPosition += 8;

      const priceAnalysis = safeString(data.analysisDetails.priceAnalysis);
      const splitPrice = pdf.splitTextToSize(priceAnalysis, contentWidth - 12);
      const priceHeight = splitPrice.length * 5 + 10;

      checkPageBreak(priceHeight);

      pdf.setFillColor(254, 252, 232);
      pdf.setDrawColor(245, 158, 11);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(margin, yPosition, contentWidth, priceHeight, 2, 2, "FD");

      pdf.setFontSize(9.5);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(92, 78, 24);
      pdf.text(splitPrice, margin + 6, yPosition + 6);
      yPosition += priceHeight + 8;
    }

    // ========================================
    // PROPERTY FEATURES & DETAILS
    // ========================================
    checkPageBreak(60);

    pdf.setFontSize(14);
    pdf.setTextColor(30, 41, 59);
    pdf.setFont("helvetica", "bold");
    pdf.text("Property Features & Details", margin, yPosition);
    yPosition += 8;

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

    // Details in clean table format
    propertyDetails.forEach(([label, value], index) => {
      if (!label || !value) return;
      checkPageBreak(7);

      if (index % 2 === 0) {
        pdf.setFillColor(249, 250, 251);
        pdf.rect(margin, yPosition - 1.5, contentWidth, 6.5, "F");
      }

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(100, 116, 139);
      pdf.text(label, margin + 3, yPosition + 2.5);

      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 41, 59);
      const valueLines = pdf.splitTextToSize(value, contentWidth / 2);
      pdf.text(valueLines[0], pageWidth - margin - 3, yPosition + 2.5, { align: "right" });

      yPosition += 6.5;
    });
    yPosition += 8;

    // Appliances
    if (data.features?.appliances && data.features.appliances.length > 0) {
      checkPageBreak(20);

      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 41, 59);
      pdf.text("Appliances Included", margin, yPosition);
      yPosition += 6;

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(71, 85, 105);
      const appliancesText = data.features.appliances.join(", ");
      const splitAppliances = pdf.splitTextToSize(appliancesText, contentWidth - 6);
      pdf.text(splitAppliances, margin + 3, yPosition);
      yPosition += splitAppliances.length * 4.5 + 8;
    }

    // Pool Features
    if (data.features?.poolFeatures && data.features.poolFeatures.length > 0) {
      checkPageBreak(20);

      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 41, 59);
      pdf.text("Pool Features", margin, yPosition);
      yPosition += 6;

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(71, 85, 105);
      const poolText = data.features.poolFeatures.join(", ");
      const splitPool = pdf.splitTextToSize(poolText, contentWidth - 6);
      pdf.text(splitPool, margin + 3, yPosition);
      yPosition += splitPool.length * 4.5 + 8;
    }

    // ========================================
    // INVESTMENT ANALYSIS
    // ========================================
    checkPageBreak(50);

    pdf.setFontSize(14);
    pdf.setTextColor(30, 41, 59);
    pdf.setFont("helvetica", "bold");
    pdf.text("Investment Analysis", margin, yPosition);
    yPosition += 8;

    // Strengths section
    const strengths = data.insights?.keyStrengths || [];
    if (strengths.length > 0) {
      pdf.setFontSize(12);
      pdf.setTextColor(5, 150, 105);
      pdf.setFont("helvetica", "bold");
      pdf.text("Investment Strengths", margin, yPosition);
      yPosition += 7;

      strengths.forEach((strength, index) => {
        checkPageBreak(14);

        const strengthLines = pdf.splitTextToSize(strength, contentWidth - 14);
        const itemHeight = strengthLines.length * 4.5 + 7;

        pdf.setFillColor(236, 253, 245);
        pdf.roundedRect(margin, yPosition, contentWidth, itemHeight, 2, 2, "F");

        // Number badge
        pdf.setFillColor(16, 185, 129);
        pdf.circle(margin + 5.5, yPosition + 5.5, 3.5, "F");
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(255, 255, 255);
        pdf.text((index + 1).toString(), margin + 5.5, yPosition + 7, {
          align: "center",
        });

        // Strength text
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(6, 78, 59);
        pdf.text(strengthLines, margin + 12, yPosition + 5);
        yPosition += itemHeight + 3;
      });
    } else {
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "italic");
      pdf.setTextColor(148, 163, 184);
      pdf.text("No strengths data available", margin + 3, yPosition);
      yPosition += 8;
    }
    yPosition += 8;

    // Risks section
    checkPageBreak(50);

    const risks = data.insights?.keyRisks || [];
    if (risks.length > 0) {
      pdf.setFontSize(12);
      pdf.setTextColor(220, 38, 38);
      pdf.setFont("helvetica", "bold");
      pdf.text("Potential Risks", margin, yPosition);
      yPosition += 7;

      risks.forEach((risk, index) => {
        checkPageBreak(14);

        const riskLines = pdf.splitTextToSize(risk, contentWidth - 14);
        const itemHeight = riskLines.length * 4.5 + 7;

        pdf.setFillColor(254, 242, 242);
        pdf.roundedRect(margin, yPosition, contentWidth, itemHeight, 2, 2, "F");

        // Number badge
        pdf.setFillColor(239, 68, 68);
        pdf.circle(margin + 5.5, yPosition + 5.5, 3.5, "F");
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(255, 255, 255);
        pdf.text((index + 1).toString(), margin + 5.5, yPosition + 7, {
          align: "center",
        });

        // Risk text
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(127, 29, 29);
        pdf.text(riskLines, margin + 12, yPosition + 5);
        yPosition += itemHeight + 3;
      });
    } else {
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "italic");
      pdf.setTextColor(148, 163, 184);
      pdf.text("No risks data available", margin + 3, yPosition);
      yPosition += 8;
    }
    yPosition += 8;

    // ========================================
    // RED FLAGS
    // ========================================
    if (
      data.insights?.redFlags &&
      data.insights.redFlags.length > 0 &&
      data.insights.redFlags[0] !== "None identified"
    ) {
      checkPageBreak(40);

      pdf.setFontSize(12);
      pdf.setTextColor(220, 38, 38);
      pdf.setFont("helvetica", "bold");
      pdf.text("Red Flags", margin, yPosition);
      yPosition += 7;

      data.insights.redFlags.forEach((flag) => {
        const flagText = pdf.splitTextToSize(flag, contentWidth - 12);
        const boxHeight = Math.max(10, flagText.length * 4.5 + 8);

        checkPageBreak(boxHeight + 3);

        pdf.setFillColor(254, 242, 242);
        pdf.setDrawColor(252, 165, 165);
        pdf.setLineWidth(0.3);
        pdf.roundedRect(margin, yPosition, contentWidth, boxHeight, 2, 2, "FD");

        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(127, 29, 29);
        pdf.text(flagText, margin + 6, yPosition + 5);
        yPosition += boxHeight + 3;
      });
      yPosition += 8;
    }

    // ========================================
    // HIDDEN GEMS
    // ========================================
    if (data.insights?.hiddenGems && data.insights.hiddenGems.length > 0) {
      checkPageBreak(40);

      pdf.setFontSize(12);
      pdf.setTextColor(217, 119, 6);
      pdf.setFont("helvetica", "bold");
      pdf.text("Hidden Gems", margin, yPosition);
      yPosition += 7;

      data.insights.hiddenGems.forEach((gem) => {
        const gemText = pdf.splitTextToSize(gem, contentWidth - 12);
        const boxHeight = Math.max(10, gemText.length * 4.5 + 8);

        checkPageBreak(boxHeight + 3);

        pdf.setFillColor(254, 252, 232);
        pdf.setDrawColor(251, 191, 36);
        pdf.setLineWidth(0.3);
        pdf.roundedRect(margin, yPosition, contentWidth, boxHeight, 2, 2, "FD");

        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(120, 53, 15);
        pdf.text(gemText, margin + 6, yPosition + 5);
        yPosition += boxHeight + 3;
      });
      yPosition += 8;
    }

    // ========================================
    // NEGOTIATION STRATEGIES
    // ========================================
    if (
      data.insights?.negotiationStrategy &&
      data.insights.negotiationStrategy.length > 0
    ) {
      checkPageBreak(40);

      pdf.setFontSize(14);
      pdf.setTextColor(30, 41, 59);
      pdf.setFont("helvetica", "bold");
      pdf.text("Negotiation Strategies", margin, yPosition);
      yPosition += 7;

      data.insights.negotiationStrategy.forEach((strategy, index) => {
        checkPageBreak(14);

        const strategyLines = pdf.splitTextToSize(strategy, contentWidth - 14);
        const itemHeight = strategyLines.length * 4.5 + 7;

        pdf.setFillColor(254, 252, 232);
        pdf.roundedRect(margin, yPosition, contentWidth, itemHeight, 2, 2, "F");

        // Number badge
        pdf.setFillColor(245, 158, 11);
        pdf.circle(margin + 5.5, yPosition + 5.5, 3.5, "F");
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(255, 255, 255);
        pdf.text((index + 1).toString(), margin + 5.5, yPosition + 7, {
          align: "center",
        });

        pdf.setFontSize(9);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(120, 53, 15);
        pdf.text(strategyLines, margin + 12, yPosition + 5);
        yPosition += itemHeight + 3;
      });
      yPosition += 8;
    }

    // ========================================
    // PROPERTY TAXES
    // ========================================
    if (data.costs) {
      checkPageBreak(28);

      pdf.setFontSize(14);
      pdf.setTextColor(30, 41, 59);
      pdf.setFont("helvetica", "bold");
      pdf.text("Property Taxes", margin, yPosition);
      yPosition += 8;

      pdf.setFillColor(248, 250, 252);
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(margin, yPosition, contentWidth, 18, 2, 2, "FD");

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(100, 116, 139);
      pdf.text("Annual Property Tax", margin + 5, yPosition + 7);

      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 41, 59);
      pdf.text(
        data.costs.annualPropertyTax
          ? formatExactPrice(data.costs.annualPropertyTax)
          : "N/A",
        pageWidth - margin - 5,
        yPosition + 7,
        { align: "right" },
      );

      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(100, 116, 139);
      pdf.text(
        `Tax Year: ${data.costs.taxYear || "N/A"}`,
        margin + 5,
        yPosition + 14,
      );
      yPosition += 26;
    }

    // ========================================
    // SCHOOLS
    // ========================================
    if (data.schools && data.schools.length > 0) {
      checkPageBreak(60);

      pdf.setFontSize(14);
      pdf.setTextColor(30, 41, 59);
      pdf.setFont("helvetica", "bold");
      pdf.text("Nearby Schools", margin, yPosition);
      yPosition += 8;

      data.schools.forEach((school, index) => {
        checkPageBreak(20);

        pdf.setFillColor(249, 250, 251);
        pdf.setDrawColor(226, 232, 240);
        pdf.setLineWidth(0.3);
        pdf.roundedRect(margin, yPosition, contentWidth, 17, 2, 2, "FD");

        // School name
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(30, 41, 59);
        pdf.text(school.name || "Unknown School", margin + 5, yPosition + 6);

        // School details
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(100, 116, 139);
        pdf.text(
          `${school.grades} | ${school.type}`,
          margin + 5,
          yPosition + 11,
        );

        // Rating badge
        pdf.setFillColor(245, 158, 11);
        pdf.circle(pageWidth - margin - 16, yPosition + 8.5, 5, "F");
        pdf.setFontSize(9);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(255, 255, 255);
        pdf.text(`${school.rating}`, pageWidth - margin - 16, yPosition + 10.5, {
          align: "center",
        });

        pdf.setFontSize(6);
        pdf.setTextColor(100, 116, 139);
        pdf.text("/10", pageWidth - margin - 10, yPosition + 10.5);

        // Distance
        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(100, 116, 139);
        pdf.text(
          `${school.distance} mi`,
          pageWidth - margin - 5,
          yPosition + 14,
          { align: "right" },
        );

        yPosition += 20;
      });
      yPosition += 6;
    }

    // ========================================
    // COMPARABLE PROPERTIES
    // ========================================
    if (data.comparables && data.comparables.length > 0) {
      checkPageBreak(75);

      pdf.setFontSize(14);
      pdf.setTextColor(30, 41, 59);
      pdf.setFont("helvetica", "bold");
      pdf.text("Comparable Properties", margin, yPosition);
      yPosition += 8;

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
          pdf.text(header, xPos, yPosition + 5.5);
          xPos += colWidths[i] || 0;
        },
      );
      yPosition += 10;

      // Table rows
      data.comparables.slice(0, 8).forEach((comp, index) => {
        checkPageBreak(8);

        if (index % 2 === 0) {
          pdf.setFillColor(249, 250, 251);
          pdf.rect(margin, yPosition - 0.5, contentWidth, 7.5, "F");
        }

        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(30, 41, 59);

        xPos = margin + 2;
        const addressShort =
          comp.address.substring(0, 30) +
          (comp.address.length > 30 ? "..." : "");
        pdf.text(addressShort, xPos, yPosition + 4);
        xPos += colWidths[0] || 0;

        pdf.setFont("helvetica", "bold");
        pdf.text(
          comp.price ? formatExactPrice(comp.price) : "N/A",
          xPos,
          yPosition + 4,
        );
        xPos += colWidths[1] || 0;

        pdf.setFont("helvetica", "normal");
        pdf.text(
          `${comp.bedrooms || 0}/${comp.bathrooms || 0}`,
          xPos,
          yPosition + 4,
        );
        xPos += colWidths[2] || 0;

        pdf.text(
          comp.squareFeet ? formatNumber(comp.squareFeet) : "N/A",
          xPos,
          yPosition + 4,
        );
        xPos += colWidths[3] || 0;

        pdf.text(
          comp.pricePerSqft ? `$${comp.pricePerSqft.toFixed(0)}` : "N/A",
          xPos,
          yPosition + 4,
        );

        yPosition += 7.5;
      });

      // Summary comparison
      yPosition += 4;
      checkPageBreak(18);

      pdf.setFillColor(239, 246, 255);
      pdf.setDrawColor(191, 219, 254);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(margin, yPosition, contentWidth, 15, 2, 2, "FD");

      const avgPrice =
        data.comparables.reduce((sum, c) => sum + (c.price || 0), 0) /
        data.comparables.length;

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 64, 175);
      pdf.text("Average Price:", margin + 5, yPosition + 6);
      pdf.text(formatExactPrice(avgPrice), margin + 50, yPosition + 6);

      pdf.text("This Property:", margin + 5, yPosition + 11);
      pdf.setTextColor(217, 119, 6);
      pdf.text(
        listPrice ? formatExactPrice(listPrice) : "N/A",
        margin + 50,
        yPosition + 11,
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
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.3);
      pdf.line(margin, pageHeight - 16, pageWidth - margin, pageHeight - 16);

      // Company branding
      pdf.setFontSize(8);
      pdf.setTextColor(71, 85, 105);
      pdf.setFont("helvetica", "bold");
      pdf.text(
        "Four Corner Properties",
        pageWidth / 2,
        pageHeight - 11,
        { align: "center" },
      );

      pdf.setFontSize(7);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(148, 163, 184);
      pdf.text(
        "Premium Investment Analysis",
        pageWidth / 2,
        pageHeight - 7,
        { align: "center" },
      );

      // Page numbers
      pdf.setFontSize(7);
      pdf.setTextColor(100, 116, 139);
      pdf.text(
        `Page ${i} of ${totalPages}`,
        pageWidth - margin,
        pageHeight - 9,
        { align: "right" },
      );

      // Zillow link
      if (data.zillowUrl && typeof data.zillowUrl === "string") {
        pdf.setFontSize(7);
        pdf.setTextColor(59, 130, 246);
        pdf.text("View on Zillow", margin, pageHeight - 9);
      }
    }

    // Save PDF
    const fileName = `${data.propertyOverview.streetAddress.replace(/[^a-z0-9]/gi, "_")}_Analysis_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error("PDF export error:", error);
    throw new Error("Failed to export PDF");
  }
}

// Helper function to get grade color
function getGradeColor(grade: string): [number, number, number] {
  const gradeColors: Record<string, [number, number, number]> = {
    "A+": [5, 150, 105],   // Emerald-600
    "A": [16, 185, 129],   // Emerald-500
    "A-": [52, 211, 153],  // Emerald-400
    "B+": [59, 130, 246],  // Blue-500
    "B": [99, 102, 241],   // Indigo-500
    "B-": [139, 92, 246],  // Violet-500
    "C+": [245, 158, 11],  // Amber-500
    "C": [251, 146, 60],   // Orange-400
    "C-": [251, 113, 133], // Rose-400
    "D": [239, 68, 68],    // Red-500
    "F": [220, 38, 38],    // Red-600
  };
  return gradeColors[grade] || [100, 116, 139]; // Slate-500 default
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
                  color: "3b82f6",
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
                safeString(data.aiAnalysis?.recommendation) ||
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
              text: `Square Feet: ${data.propertyOverview?.squareFeet ? formatNumber(data.propertyOverview.squareFeet) : "N/A"}`,
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: `Bedrooms: ${data.propertyOverview?.bedrooms || "N/A"}`,
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: `Bathrooms: ${data.propertyOverview?.bathrooms || "N/A"}`,
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: `Year Built: ${data.propertyOverview?.yearBuilt || "N/A"}`,
              spacing: { after: 400 },
            }),

            new Paragraph({
              text: "Investment Strengths",
              heading: HeadingLevel.HEADING_3,
              spacing: { after: 200 },
            }),
            ...(data.insights?.keyStrengths || []).map(
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
            ...(data.insights?.keyRisks || []).map(
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
              text: data.zillowUrl || "",
              alignment: AlignmentType.CENTER,
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const fileName = `${data.propertyOverview.streetAddress.replace(/[^a-z0-9]/gi, "_")}_Analysis.docx`;
    saveAs(blob, fileName);
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
    text += `${safeString(data.aiAnalysis?.recommendation) || "No recommendation available"}\n\n`;

    text += `VALUE ASSESSMENT\n`;
    text += `${"-".repeat(60)}\n`;
    text += `${safeString(data.aiAnalysis?.valueAssessment) || "No assessment available"}\n\n`;

    text += `KEY METRICS\n`;
    text += `${"-".repeat(60)}\n`;
    text += `List Price:              ${data.propertyOverview?.listPrice ? formatExactPrice(data.propertyOverview.listPrice) : "N/A"}\n`;
    text += `Zestimate:               ${data.propertyOverview?.zestimate ? formatExactPrice(data.propertyOverview.zestimate) : "N/A"}\n`;
    text += `Price per Sq Ft:         ${data.propertyOverview?.pricePerSqft ? `$${data.propertyOverview.pricePerSqft.toFixed(2)}` : "N/A"}\n`;
    text += `Square Feet:             ${data.propertyOverview?.squareFeet ? formatNumber(data.propertyOverview.squareFeet) : "N/A"}\n`;
    text += `Bedrooms:                ${data.propertyOverview?.bedrooms || "N/A"}\n`;
    text += `Bathrooms:               ${data.propertyOverview?.bathrooms || "N/A"}\n`;
    text += `Year Built:              ${data.propertyOverview?.yearBuilt || "N/A"}\n\n`;

    text += `INVESTMENT STRENGTHS\n`;
    text += `${"-".repeat(60)}\n`;
    const strengths = data.insights?.keyStrengths || [];
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
    const risks = data.insights?.keyRisks || [];
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
    text += `Zillow Listing: ${data.zillowUrl || "N/A"}\n`;
    text += `═══════════════════════════════════════════════════════════════\n`;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const fileName = `${data.propertyOverview.streetAddress.replace(/[^a-z0-9]/gi, "_")}_Analysis.txt`;
    saveAs(blob, fileName);
  } catch (error) {
    console.error("TXT export error:", error);
    throw new Error("Failed to export text file");
  }
}
