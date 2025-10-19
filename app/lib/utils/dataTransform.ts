// Data transformation utilities for API responses
import type { PropertyData } from "@/app/lib/types/index";

export function transformApiResponseToPropertyData(
  apiResponse: any,
): PropertyData {
  const propertyDetails = apiResponse.rawApiData?.propertyDetails || {};

  // Debug logging for environmental data
  if (process.env.NODE_ENV === "development") {
    console.log("=== Environmental Data Debug (dataTransform.ts) ===");
    console.log("Has climate:", !!propertyDetails.climate);
    console.log("Has climate.floodSources:", !!propertyDetails.climate?.floodSources);
    console.log("Has climate.floodSources.primary:", !!propertyDetails.climate?.floodSources?.primary);
    console.log("climate.floodSources structure:", propertyDetails.climate?.floodSources);
    console.log("Has climate.fireSources:", !!propertyDetails.climate?.fireSources);
    console.log("Has climate.airSources:", !!propertyDetails.climate?.airSources);
  }

  // Helper function to parse price values
  const parsePrice = (priceValue: any): number | null => {
    if (!priceValue) return null;
    if (typeof priceValue === "number") return priceValue;
    const parsed = parseFloat(priceValue.toString().replace(/[$,]/g, ""));
    return Number.isNaN(parsed) ? null : parsed;
  };

  // Extract price history for list price calculation
  const priceHistory = Array.isArray(propertyDetails.priceHistory)
    ? propertyDetails.priceHistory.map((item: any) => ({
        date:
          item.date ||
          (item.time ? new Date(item.time).toISOString().split("T")[0] : null),
        time: item.time,
        price: item.price || null,
        event: item.event || "",
        source: item.source || "",
      }))
    : [];

  // ==================== GET CURRENT LIST PRICE FROM PRICE HISTORY ====================
  let listPrice = null;

  if (priceHistory.length > 0) {
    // Use the first entry in price history (most recent listing)
    const latestListing = priceHistory[0];
    listPrice = parsePrice(latestListing.price);
  } else {
    // Fallback to static price field if no price history
    listPrice = parsePrice(propertyDetails.price);
  }

  // Extract lot size if available
  let lotSize: number | null = null;
  let lotSizeUnit = "sqft";
  if (propertyDetails.resoFacts?.lotSize) {
    const lotSizeStr = propertyDetails.resoFacts.lotSize;
    const lotSizeMatch = lotSizeStr.match(/^([\d,.]+)\s*(.+)?$/);
    if (lotSizeMatch) {
      const lotSizeValue = parseFloat(lotSizeMatch[1].replace(/,/g, ""));
      if (!Number.isNaN(lotSizeValue)) {
        lotSize = lotSizeValue;
        lotSizeUnit = lotSizeMatch[2] || "sqft";
      }
    }
  }

  // Extract basic property information
  const propertyOverview = {
    zpid:
      apiResponse.zpid?.toString() || propertyDetails.zpid?.toString() || "",
    url: apiResponse.zillowUrl || propertyDetails.url || "",
    streetAddress:
      propertyDetails.streetAddress ||
      propertyDetails.address?.streetAddress ||
      "",
    city: propertyDetails.city || propertyDetails.address?.city || "",
    state: propertyDetails.state || propertyDetails.address?.state || "",
    zipcode: propertyDetails.zipcode || propertyDetails.address?.zipcode || "",
    fullAddress:
      `${propertyDetails.streetAddress || propertyDetails.address?.streetAddress || ""}, ${propertyDetails.city || propertyDetails.address?.city || ""}, ${propertyDetails.state || propertyDetails.address?.state || ""} ${propertyDetails.zipcode || propertyDetails.address?.zipcode || ""}`.trim(),
    neighborhood:
      propertyDetails.address?.neighborhood ||
      propertyDetails.neighborhoodRegion ||
      null,
    county: propertyDetails.county || null,
    subdivision: propertyDetails.address?.subdivision || null,
    latitude: propertyDetails.latitude || null,
    longitude: propertyDetails.longitude || null,
    propertyType:
      propertyDetails.homeType || propertyDetails.resoFacts?.homeType || null,
    bedrooms:
      apiResponse.propertyOverview?.bedrooms || propertyDetails.bedrooms || propertyDetails.resoFacts?.bedrooms || null,
    bathrooms:
      apiResponse.propertyOverview?.bathrooms || propertyDetails.bathrooms || propertyDetails.resoFacts?.bathrooms || null,
    fullBathrooms: apiResponse.propertyOverview?.fullBathrooms || propertyDetails.resoFacts?.bathroomsFull || null,
    halfBathrooms: propertyDetails.resoFacts?.bathroomsHalf || null,
    squareFeet:
      propertyDetails.livingAreaValue || propertyDetails.livingArea || null,
    lotSize: lotSize,
    lotSizeUnit: lotSizeUnit,
    yearBuilt:
      propertyDetails.yearBuilt || propertyDetails.resoFacts?.yearBuilt || null,
    stories:
      propertyDetails.resoFacts?.stories ||
      propertyDetails.resoFacts?.storiesDecimal ||
      null,
    listPrice: listPrice,
    zestimate: propertyDetails.zestimate || null,
    rentZestimate: propertyDetails.rentZestimate || null,
    taxAssessedValue: propertyDetails.resoFacts?.taxAssessedValue || null,
    pricePerSqft: propertyDetails.resoFacts?.pricePerSquareFoot || null,
    homeStatus: propertyDetails.homeStatus || null,
    daysOnZillow: propertyDetails.timeOnZillow
      ? parseInt(propertyDetails.timeOnZillow, 10)
      : propertyDetails.resoFacts?.daysOnZillow || null,
    views: propertyDetails.pageViewCount || null,
    saves: propertyDetails.favoriteCount || null,
    dateSold: propertyDetails.dateSold
      ? new Date(propertyDetails.dateSold).toISOString()
      : null,
    description: propertyDetails.description || null,
  };

  // Extract media information
  const media = {
    images: [], // Will need to be populated from photos endpoint
    videos: [],
    imageCount: propertyDetails.photoCount || 0,
    videoCount: 0,
  };

  // Extract pricing information (using processed priceHistory from above)
  const pricing = {
    priceHistory: priceHistory,
    priceChangeCount: priceHistory.length || 0,
    latestPriceChange: propertyDetails.priceChange || null,
  };

  // Extract costs information
  const costs = {
    annualPropertyTax: propertyDetails.resoFacts?.taxAnnualAmount || null,
    taxYear: new Date().getFullYear(),
    taxHistory: Array.isArray(propertyDetails.taxHistory)
      ? propertyDetails.taxHistory.map((item: any) => ({
          time: item.time,
          taxPaid: item.taxPaid,
          taxIncreaseRate: item.taxIncreaseRate,
        }))
      : [],
    hoaFee:
      propertyDetails.monthlyHoaFee ||
      propertyDetails.resoFacts?.hoaFee ||
      null,
    hoaFeeFrequency: "monthly",
    hasHOA:
      !!propertyDetails.monthlyHoaFee || !!propertyDetails.resoFacts?.hoaFee,
    estimatedMonthlyInsurance: propertyDetails.annualHomeownersInsurance
      ? Math.round(propertyDetails.annualHomeownersInsurance / 12)
      : null,
  };

  // Extract schools information
  const schools = Array.isArray(propertyDetails.schools)
    ? propertyDetails.schools.map((school: any) => ({
        name: school.name || null,
        rating: school.rating?.toString() || null,
        distance: school.distance?.toString() || null,
        grades: school.grades || null,
        type: school.type || null,
        link: school.link || null,
      }))
    : [];

  // Extract comparable properties
  const comparables = Array.isArray(propertyDetails.nearbyHomes)
    ? propertyDetails.nearbyHomes.map((home: any) => ({
        zpid: home.zpid?.toString() || "",
        address:
          home.formattedChip?.location?.[0]?.fullValue ||
          home.address?.streetAddress ||
          "",
        city: home.address?.city || null,
        price: home.price || null,
        zestimate: home.zestimate || null,
        bedrooms: home.bedrooms || null,
        bathrooms: home.bathrooms || null,
        squareFeet: home.livingAreaValue || home.livingArea || null,
        pricePerSqft:
          home.price && home.livingAreaValue
            ? Math.round(home.price / home.livingAreaValue)
            : null,
        yearBuilt: home.yearBuilt || null,
        daysOnZillow: null,
        distance: null,
      }))
    : [];

  // Create the complete PropertyData structure
  const transformedData: PropertyData = {
    success: apiResponse.success || true,
    timestamp: apiResponse.timestamp || new Date().toISOString(),
    zpid:
      apiResponse.zpid?.toString() || propertyDetails.zpid?.toString() || "",
    zillowUrl: apiResponse.zillowUrl || propertyDetails.url || "",
    source: "api",

    propertyOverview,
    rawApiData: apiResponse.rawApiData || {},

    // AI Analysis - will be populated by AI service
    aiAnalysis: apiResponse.aiAnalysis || {
      buyingGrade: "C",
      recommendation: "Analysis pending",
      valueAssessment: "Assessment pending",
      comprehensiveDescription: "Detailed analysis pending",
      oneLineSummary: "Property analysis in progress",
    },

    // Insights - will be populated by AI service
    insights: apiResponse.insights || {
      keyStrengths: [],
      keyRisks: [],
      negotiationStrategy: [],
      redFlags: [],
      hiddenGems: [],
      renovationRecommendations: [],
      immediateActions: [],
      dealBreakers: [],
      competitiveAdvantages: [],
    },

    // Analysis Details - will be populated by AI service
    analysisDetails: apiResponse.analysisDetails || {
      priceAnalysis: "Price analysis pending",
      locationAnalysis: "Location analysis pending",
      marketComparison: "Market comparison pending",
      cashFlowAnalysis: "Cash flow analysis pending",
      bestFor: "Analysis pending",
      idealBuyer: "Analysis pending",
      estimatedROI5Year: "Calculating...",
      estimatedROI10Year: "Calculating...",
      exitStrategies: [],
    },

    // Market Research
    marketResearch: apiResponse.marketResearch || "Market analysis pending",

    // Features - extracted from resoFacts
    features: propertyDetails.resoFacts
      ? {
          garageSpaces: propertyDetails.resoFacts.garageParkingCapacity || null,
          parkingFeatures: propertyDetails.resoFacts.parkingFeatures || [],
          architecturalStyle:
            propertyDetails.resoFacts.architecturalStyle || null,
          roofType: propertyDetails.resoFacts.roofType || null,
          foundation: propertyDetails.resoFacts.foundationDetails?.[0] || null,
          exteriorMaterial:
            propertyDetails.resoFacts.constructionMaterials?.[0] || null,
          constructionMaterials:
            propertyDetails.resoFacts.constructionMaterials || [],
          flooring: propertyDetails.resoFacts.flooring || [],
          rooms: propertyDetails.bedrooms + propertyDetails.bathrooms || null,
          livingRooms: null,
          diningRooms: null,
          heating: propertyDetails.resoFacts.heating?.[0] || null,
          cooling: propertyDetails.resoFacts.cooling?.[0] || null,
          fireplaces: propertyDetails.resoFacts.fireplaces || null,
          appliances: propertyDetails.resoFacts.appliances || [],
          laundryFeatures: propertyDetails.resoFacts.laundryFeatures || [],
          poolFeatures: propertyDetails.resoFacts.poolFeatures || [],
          hasPool: !!propertyDetails.resoFacts.poolFeatures?.length,
          spaFeatures: propertyDetails.resoFacts.spaFeatures || [],
          hasSpa: propertyDetails.resoFacts.hasSpa || false,
          view: propertyDetails.resoFacts.view || [],
          securityFeatures: propertyDetails.resoFacts.securityFeatures || [],
          accessibilityFeatures:
            propertyDetails.resoFacts.accessibilityFeatures || [],
          interiorFeatures: propertyDetails.resoFacts.interiorFeatures || [],
          exteriorFeatures: propertyDetails.resoFacts.exteriorFeatures || [],
        }
      : undefined,

    // Utilities
    utilities: propertyDetails.resoFacts
      ? {
          sewer: propertyDetails.resoFacts.sewer?.[0] || null,
          waterSource: propertyDetails.resoFacts.waterSource || null,
          utilities: propertyDetails.resoFacts.utilities || [],
        }
      : undefined,

    costs,
    pricing,
    schools,
    comparables,
    media,

    // Special features
    special: {
      features: [],
      virtualTourUrl: propertyDetails.resoFacts?.virtualTour || null,
      openHouse: propertyDetails.openHouseSchedule || null,
      newConstruction: propertyDetails.resoFacts?.isNewConstruction || false,
    },

    // Charts (preserve existing charts if available)
    charts: apiResponse.charts,

    // Environmental Risk Data - extract from climate object
    environmental: (() => {
      const envData = apiResponse.environmental ||
        apiResponse.environmentalRisks ||
        (propertyDetails.climate
          ? {
              flood: propertyDetails.climate.floodSources?.primary
                ? {
                  floodFactorScore:
                    propertyDetails.climate.floodSources.primary.riskScore?.value || 1,
                  floodFactorSeverity:
                    propertyDetails.climate.floodSources.primary.riskScore?.label ||
                    "Unknown",
                  riskTrend:
                    propertyDetails.climate.floodSources.primary.probability?.[
                      propertyDetails.climate.floodSources.primary.probability.length - 1
                    ]?.probability >
                    propertyDetails.climate.floodSources.primary.probability?.[0]
                      ?.probability
                      ? "increasing"
                      : "not changing",
                  femaZone:
                    propertyDetails.climate.floodSources.primary.femaZone
                      ?.replace(/_/g, " ")
                      .replace(/X UNSHADED/i, "X (unshaded)")
                      .replace(/X SHADED/i, "X (shaded)") || "Unknown",
                  insuranceRequired:
                    propertyDetails.climate.floodSources.primary
                      .insuranceSeparatePolicy === "REQUIRED",
                  estimatedInsuranceMin: 435,
                  estimatedInsuranceMax: 1294,
                  description: `This property has ${propertyDetails.climate.floodSources.primary.riskScore?.label?.toLowerCase() || "unknown"} flood risk in the Flood Factor™ model.`,
                }
              : undefined,
            fire: propertyDetails.climate.fireSources?.primary
              ? {
                  riskLevel:
                    propertyDetails.climate.fireSources.primary.riskScore?.label ||
                    "Unknown",
                  description: `This property has ${propertyDetails.climate.fireSources.primary.riskScore?.label?.toLowerCase() || "unknown"} wildfire risk.${propertyDetails.climate.fireSources.primary.historicCountAll ? ` There have been ${propertyDetails.climate.fireSources.primary.historicCountAll} historic fire incidents in the area.` : ""}`,
                }
              : undefined,
            airQuality: propertyDetails.climate.airSources?.primary
              ? {
                  aqi:
                    propertyDetails.climate.airSources.primary.riskScore?.value === 1
                      ? 45
                      : propertyDetails.climate.airSources.primary.riskScore?.value === 2
                        ? 75
                        : propertyDetails.climate.airSources.primary.riskScore?.value <=
                            4
                          ? 110
                          : 155,
                  category:
                    propertyDetails.climate.airSources.primary.riskScore?.value === 1
                      ? "Good"
                      : propertyDetails.climate.airSources.primary.riskScore?.value === 2
                        ? "Moderate"
                        : propertyDetails.climate.airSources.primary.riskScore?.value <=
                            4
                          ? "Unhealthy for Sensitive Groups"
                          : "Unhealthy",
                  description: `Air quality risk is ${propertyDetails.climate.airSources.primary.riskScore?.label?.toLowerCase() || "unknown"} for this area.${propertyDetails.climate.airSources.primary.badAirDays?.[0]?.dayCount === 0 ? " No bad air days are expected currently." : ""}`,
                }
              : undefined,
            earthquake: undefined, // Not provided in Zillow data
            noise: undefined, // Not provided in Zillow data
          }
        : undefined);

      if (process.env.NODE_ENV === "development") {
        console.log("=== Final environmental data ===");
        console.log("envData:", envData);
        console.log("Has flood:", !!envData?.flood);
      }

      return envData;
    })(),
  };

  return transformedData;
}

export default transformApiResponseToPropertyData;
