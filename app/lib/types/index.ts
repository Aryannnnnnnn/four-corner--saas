// app/lib/types.ts

export interface PropertyData {
  success: boolean;
  timestamp: string;
  zpid: string;
  zillowUrl: string;
  source?: string;

  // Property Overview (from API)
  propertyOverview: {
    zpid: string;
    url: string;
    streetAddress: string;
    city: string;
    state: string;
    zipcode: string;
    fullAddress: string;
    neighborhood: string | null;
    county: string | null;
    subdivision: string | null;
    latitude: number | null;
    longitude: number | null;
    propertyType: string | null;
    bedrooms: number | null;
    bathrooms: number | null;
    fullBathrooms: number | null;
    halfBathrooms: number | null;
    squareFeet: number | null;
    lotSize: number | null;
    lotSizeUnit: string;
    yearBuilt: number | null;
    stories: number | null;
    listPrice: number | null;
    zestimate: number | null;
    rentZestimate: number | null;
    taxAssessedValue: number | null;
    pricePerSqft: number | null;
    homeStatus: string | null;
    daysOnZillow: number | null;
    views: number | null;
    saves: number | null;
    dateSold: string | null;
    description: string | null;
  };

  // Raw API Data (complete responses from RapidAPI)
  rawApiData: {
    propertyDetails: any;
    comparables: any;
  };

  // AI Analysis
  aiAnalysis: {
    buyingGrade: string;
    recommendation: string;
    valueAssessment: string;
    comprehensiveDescription: string;
    oneLineSummary: string;
  };

  // Insights
  insights: {
    keyStrengths: string[];
    keyRisks: string[];
    negotiationStrategy: string[];
    redFlags: string[];
    hiddenGems: string[];
    renovationRecommendations: string[];
    immediateActions: string[];
    dealBreakers: string[];
    competitiveAdvantages: string[];
  };

  // Analysis Details
  analysisDetails: {
    priceAnalysis: string;
    locationAnalysis: string;
    marketComparison: string;
    cashFlowAnalysis: string;
    bestFor: string;
    idealBuyer: string;
    estimatedROI5Year: string;
    estimatedROI10Year: string;
    exitStrategies: string[];
  };

  // Market Research (from Perplexity)
  marketResearch: string;

  // Features & Amenities
  features?: {
    garageSpaces: number | null;
    parkingFeatures: string[];
    architecturalStyle: string | null;
    roofType: string | null;
    foundation: string | null;
    exteriorMaterial: string | null;
    constructionMaterials: string | null;
    flooring: string[];
    rooms: number | null;
    livingRooms: number | null;
    diningRooms: number | null;
    heating: string | null;
    cooling: string | null;
    fireplaces: number | null;
    appliances: string[];
    laundryFeatures: string[];
    poolFeatures: string[];
    hasPool: boolean;
    spaFeatures: string[];
    hasSpa: boolean;
    view: string[];
    securityFeatures: string[];
    accessibilityFeatures: string[];
    interiorFeatures: string[];
    exteriorFeatures: string[];
  };

  // Utilities
  utilities?: {
    sewer: string | null;
    waterSource: string | null;
    utilities: string[];
  };

  // Costs
  costs?: {
    annualPropertyTax: number | null;
    taxYear: number;
    taxHistory: Array<{
      time?: number;
      taxPaid?: number;
      taxIncreaseRate?: number;
    }>;
    hoaFee: number | null;
    hoaFeeFrequency: string;
    hasHOA: boolean;
    estimatedMonthlyInsurance: number | null;
  };

  // Price History
  pricing?: {
    priceHistory: Array<{
      date: string;
      price: number | null;
      event: string;
      source: string;
    }>;
    priceChangeCount: number;
    latestPriceChange: any;
  };

  // Schools
  schools?: Array<{
    name: string | null;
    rating: string | null;
    distance: string | null;
    grades: string | null;
    type: string | null;
    link: string | null;
  }>;

  // Comparables
  comparables?: Array<{
    zpid: string;
    address: string;
    city: string | null;
    price: number | null;
    zestimate: number | null;
    bedrooms: number | null;
    bathrooms: number | null;
    squareFeet: number | null;
    pricePerSqft: number | null;
    yearBuilt: number | null;
    daysOnZillow: number | null;
    distance: string | null;
  }>;

  // Media
  media?: {
    images: string[];
    videos: string[];
    imageCount: number;
    videoCount: number;
  };

  // Special Features
  special?: {
    features: string[];
    virtualTourUrl: string | null;
    openHouse: any;
    newConstruction: boolean;
  };

  // Charts (if included)
  charts?: {
    valueProjection?: ChartData;
    equity?: ChartData;
    roi?: ChartData;
    comparables?: ChartData;
    priceHistory?: ChartData | null;
    cashFlow?: ChartData;
  };

  // Environmental Risk
  environmental?: {
    flood?: {
      floodFactorScore: number; // 1-10 scale
      floodFactorSeverity: string; // "Minimal" | "Minor" | "Moderate" | "Major" | "Severe" | "Extreme"
      riskTrend: string; // "not changing" | "increasing" | "decreasing"
      femaZone: string; // e.g., "X (unshaded)", "AE", "VE", etc.
      insuranceRequired: boolean;
      estimatedInsuranceMin: number; // yearly cost
      estimatedInsuranceMax: number; // yearly cost
      description: string;
    };
    fire?: {
      riskLevel: string; // "Low" | "Moderate" | "High" | "Very High"
      description: string;
    };
    airQuality?: {
      aqi: number; // Air Quality Index
      category: string; // "Good" | "Moderate" | "Unhealthy for Sensitive Groups" | etc.
      description: string;
    };
    earthquake?: {
      riskLevel: string; // "Very Low" | "Low" | "Moderate" | "High" | "Very High"
      description: string;
    };
    noise?: {
      level: string; // "Low" | "Moderate" | "High"
      sources: string[]; // ["Highway", "Airport", "Train", etc.]
      description: string;
    };
  };

  // Legacy fields for backward compatibility
  zillow?: {
    zpid: string;
    url: string;
    homeStatus: string;
    daysOnZillow: number;
    dateSold?: string;
  };

  property?: {
    address: string;
    city: string;
    state: string;
    zipcode: string;
    neighborhood: string;
    county: string;
    subdivision?: string;
    propertyType: string;
    yearBuilt: number;
    age?: number;
  };

  factsAndFeatures?: {
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    lotSize: number;
    garage?: string;
    architecture?: string;
    roofType?: string;
    heating?: string;
    cooling?: string;
    fireplaces?: number;
    appliances?: string[];
    poolFeatures?: string[];
    waterSource?: string;
    sewer?: string;
  };

  whatsSpecial?: {
    description: string;
    specialFeatures: string[];
  };

  taxes?: {
    annualTax: number;
    taxYear: number;
  };

  valuation?: {
    totalInvestment: number;
    closingCosts: number;
    rehabCost: number;
    breakEvenPrice: number;
  };

  appreciation?: {
    rate: number;
    year1: number;
    year3: number;
    year5: number;
    year10: number;
  };

  marketValue?: {
    comparables: Array<{
      zpid: string;
      address: string;
      price: number;
      beds: number;
      baths: number;
      sqft: number;
      pricePerSqft: number;
    }>;
  };

  rentalAnalysis?: {
    monthlyRent: number;
    monthlyMortgage: number;
    monthlyTax: number;
    monthlyInsurance: number;
    monthlyCashFlow: number;
    annualCashFlow: number;
    capRate: string;
  };

  keyStrengths?: string[];
  keyRisks?: string[];
  negotiationStrategy?: string[];
  redFlags?: string[];
  hiddenGems?: string[];

  summary?: {
    buyingGrade: string;
    recommendation: string;
    valueAssessment: string;
    oneLineSummary: string;
    listPrice: string;
    zestimate: string;
    priceVsZestimate: string;
    priceVsMarket: string;
    daysOnZillow: number;
    zillowUrl: string;
  };
}

export interface ChartData {
  title: string;
  type: "line" | "bar" | "area";
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string | string[];
    tension?: number;
    fill?: boolean;
    borderWidth?: number;
  }>;
}

export interface SavedAnalysis {
  id: string;
  user_id: string;
  address: string;
  analysis_data: PropertyData;
  is_favorite: boolean | null;
  status: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
}

export interface Session {
  user: User;
  expires: string;
}

export interface AnalysisFilters {
  priceRange: [number, number];
  grades: string[];
  propertyTypes: string[];
  sortBy: "date" | "price" | "grade";
  sortOrder: "asc" | "desc";
}

export interface PropertySearchParams {
  address: string;
  city?: string;
  state?: string;
  zipcode?: string;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PropertyListResponse {
  properties: SavedAnalysis[];
  count: number;
}
