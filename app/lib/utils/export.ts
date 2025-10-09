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

// Export to PDF
export async function exportToPDF(data: PropertyData) {
  try {
    if (!data || !data.propertyOverview) {
      throw new Error("Invalid property data provided for export");
    }

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - 20) {
        pdf.addPage();
        yPosition = 20;
      }
    };

    // Header with Blue Theme & Logo
    // Blue gradient background
    pdf.setFillColor(59, 130, 246); // #3b82f6
    pdf.rect(0, 0, pageWidth, 40, "F");

    // Add actual logo image
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
      pdf.addImage(logoImg, "PNG", 15, 8, 15, 15);
    } catch (_err) {
      // Fallback to 4C text if logo fails to load
      pdf.setFillColor(255, 255, 255);
      pdf.roundedRect(15, 8, 15, 15, 2, 2, "F");
      pdf.setFontSize(18);
      pdf.setTextColor(59, 130, 246);
      pdf.setFont("helvetica", "bold");
      pdf.text("4C", 22.5, 18, { align: "center" });
    }

    // Company Name
    pdf.setFontSize(24);
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.text("Four Corner Properties", 35, 15);

    // Tagline
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.text("Luxury Real Estate Analysis", 35, 23);

    yPosition = 45;

    // Property Address
    pdf.setFontSize(20);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont("helvetica", "bold");
    pdf.text(data.propertyOverview.streetAddress, 20, yPosition);
    yPosition += 8;
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(100, 100, 100);
    pdf.text(
      `${data.propertyOverview.city}, ${data.propertyOverview.state} ${data.propertyOverview.zipcode}`,
      20,
      yPosition,
    );
    yPosition += 15;

    // Investment Grade
    pdf.setFillColor(240, 249, 255); // Light blue background
    pdf.roundedRect(20, yPosition, 60, 30, 3, 3, "F");
    pdf.setFontSize(10);
    pdf.setTextColor(59, 130, 246); // Blue text
    pdf.text("Investment Grade", 50, yPosition + 8, { align: "center" });
    pdf.setFontSize(36);
    pdf.setTextColor(59, 130, 246); // Blue grade
    pdf.setFont("helvetica", "bold");
    pdf.text(data.aiAnalysis?.buyingGrade || "N/A", 50, yPosition + 24, {
      align: "center",
    });
    yPosition += 40;

    // Key Metrics
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont("helvetica", "bold");
    pdf.text("Key Metrics", 20, yPosition);
    yPosition += 10;

    const metrics = [
      [
        "List Price",
        data.propertyOverview?.listPrice
          ? formatExactPrice(data.propertyOverview.listPrice)
          : "N/A",
      ],
      [
        "Zestimate",
        data.propertyOverview?.zestimate
          ? formatExactPrice(data.propertyOverview.zestimate)
          : "N/A",
      ],
      [
        "Square Feet",
        data.propertyOverview?.squareFeet
          ? formatNumber(data.propertyOverview.squareFeet)
          : "N/A",
      ],
      [
        "Year Built",
        data.propertyOverview?.yearBuilt
          ? data.propertyOverview.yearBuilt.toString()
          : "N/A",
      ],
      [
        "Estimated 5-Year ROI",
        data.analysisDetails?.estimatedROI5Year || "N/A",
      ],
      [
        "Days on Zillow",
        data.propertyOverview?.daysOnZillow?.toString() || "N/A",
      ],
    ];

    metrics.forEach(([label, value]) => {
      if (!label || !value) return;
      checkPageBreak(8);
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(100, 100, 100);
      pdf.text(label, 20, yPosition);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0, 0, 0);
      pdf.text(value, pageWidth - 20, yPosition, { align: "right" });
      yPosition += 8;
    });

    yPosition += 10;

    // AI Recommendation
    checkPageBreak(30);
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont("helvetica", "bold");
    pdf.text("AI Recommendation", 20, yPosition);
    yPosition += 10;

    pdf.setFillColor(240, 249, 255); // Light blue background
    const recommendationHeight = 40;
    pdf.roundedRect(
      20,
      yPosition,
      pageWidth - 40,
      recommendationHeight,
      3,
      3,
      "F",
    );

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(50, 50, 50);
    const recommendation =
      data.aiAnalysis?.recommendation || "No recommendation available";
    const splitRecommendation = pdf.splitTextToSize(
      recommendation,
      pageWidth - 50,
    );
    pdf.text(splitRecommendation, 25, yPosition + 8);
    yPosition += recommendationHeight + 15;

    // Property Details
    checkPageBreak(40);
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont("helvetica", "bold");
    pdf.text("Property Details", 20, yPosition);
    yPosition += 10;

    const details = [
      ["Bedrooms", data.propertyOverview?.bedrooms?.toString() || "N/A"],
      ["Bathrooms", data.propertyOverview?.bathrooms?.toString() || "N/A"],
      [
        "Square Feet",
        data.propertyOverview?.squareFeet
          ? formatNumber(data.propertyOverview.squareFeet)
          : "N/A",
      ],
      ["Year Built", data.propertyOverview?.yearBuilt?.toString() || "N/A"],
      ["Property Type", data.propertyOverview?.propertyType || "N/A"],
      [
        "Lot Size",
        data.propertyOverview?.lotSize
          ? formatNumber(data.propertyOverview.lotSize) +
            " " +
            (data.propertyOverview.lotSizeUnit || "sqft")
          : "N/A",
      ],
    ];

    details.forEach(([label, value]) => {
      if (!label || !value) return;
      checkPageBreak(8);
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(100, 100, 100);
      pdf.text(label, 20, yPosition);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(0, 0, 0);
      pdf.text(value, pageWidth - 20, yPosition, { align: "right" });
      yPosition += 8;
    });

    yPosition += 10;

    // Investment Strengths
    checkPageBreak(50);
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont("helvetica", "bold");
    pdf.text("Investment Strengths", 20, yPosition);
    yPosition += 10;

    const strengths = data.keyStrengths || [];
    if (strengths.length > 0) {
      strengths.forEach((strength) => {
        checkPageBreak(15);
        pdf.setFillColor(34, 197, 94, 20);
        pdf.circle(25, yPosition - 2, 3, "F");
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(50, 50, 50);
        const splitStrength = pdf.splitTextToSize(strength, pageWidth - 50);
        pdf.text(splitStrength, 32, yPosition);
        yPosition += splitStrength.length * 5 + 5;
      });
    } else {
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "italic");
      pdf.setTextColor(100, 100, 100);
      pdf.text("No strengths data available", 32, yPosition);
      yPosition += 10;
    }

    yPosition += 10;

    // Potential Risks
    checkPageBreak(50);
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont("helvetica", "bold");
    pdf.text("Potential Risks", 20, yPosition);
    yPosition += 10;

    const risks = data.keyRisks || [];
    if (risks.length > 0) {
      risks.forEach((risk) => {
        checkPageBreak(15);
        pdf.setFillColor(239, 68, 68, 20);
        pdf.circle(25, yPosition - 2, 3, "F");
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(50, 50, 50);
        const splitRisk = pdf.splitTextToSize(risk, pageWidth - 50);
        pdf.text(splitRisk, 32, yPosition);
        yPosition += splitRisk.length * 5 + 5;
      });
    } else {
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "italic");
      pdf.setTextColor(100, 100, 100);
      pdf.text("No risks data available", 32, yPosition);
      yPosition += 10;
    }

    // Footer
    const totalPages = pdf.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        `Generated by Four Corner Properties | Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" },
      );
      pdf.text(
        new Date().toLocaleDateString(),
        pageWidth - 20,
        pageHeight - 10,
        { align: "right" },
      );
    }

    pdf.save(
      `${data.propertyOverview.streetAddress.replace(/[^a-z0-9]/gi, "_")}_Analysis.pdf`,
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
