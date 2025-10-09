// Property Search Types
export interface PropertyFilters {
  location: string;
  minPrice?: number;
  maxPrice?: number;
  bedsMin?: number;
  bedsMax?: number;
  bathsMin?: number;
  bathsMax?: number;
  sqftMin?: number;
  sqftMax?: number;
  homeType?: string[];
  daysOnZillow?: number;
  hasPool?: boolean;
  hasGarage?: boolean;
  hasAC?: boolean;
  lotMin?: number;
  lotMax?: number;
  builtYearMin?: number;
  builtYearMax?: number;
  hoaMax?: number;
  keywords?: string;
  sort?: string;
}

export interface PropertySearchResult {
  zpid: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize?: number;
  yearBuilt?: number;
  propertyType: string;
  imageUrl: string;
  daysOnZillow?: number;
  zestimate?: number;
  homeStatus: string;
  latitude?: number;
  longitude?: number;
}

export interface SearchResponse {
  success: boolean;
  results: PropertySearchResult[];
  totalResults: number;
  page: number;
  filters: PropertyFilters;
  timestamp: string;
}

// Property Analysis Types
export interface PropertyOverview {
  zpid: string;
  url: string;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;
  fullAddress: string;
  neighborhood?: string;
  county?: string;
  subdivision?: string;
  latitude?: number;
  longitude?: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  fullBathrooms?: number;
  halfBathrooms?: number;
  squareFeet: number;
  lotSize?: number;
  lotSizeUnit?: string;
  yearBuilt?: number;
  stories?: number;
  listPrice: number;
  priceSource: string;
  zestimate?: number;
  rentZestimate?: number;
  taxAssessedValue?: number;
  pricePerSqft?: number;
  homeStatus: string;
  daysOnZillow?: number;
  views?: number;
  saves?: number;
  dateSold?: string;
  description?: string;
}

export interface PropertyFeatures {
  garageSpaces?: number;
  parkingFeatures?: string[];
  architecturalStyle?: string;
  roofType?: string;
  foundation?: string;
  exteriorMaterial?: string;
  constructionMaterials?: string;
  flooring?: string[];
  rooms?: number;
  livingRooms?: number;
  diningRooms?: number;
  heating?: string;
  cooling?: string;
  fireplaces?: number;
  appliances?: string[];
  laundryFeatures?: string[];
  poolFeatures?: string[];
  hasPool?: boolean;
  spaFeatures?: string[];
  hasSpa?: boolean;
  view?: string[];
  securityFeatures?: string[];
  accessibilityFeatures?: string[];
  interiorFeatures?: string[];
  exteriorFeatures?: string[];
}

export interface PropertyUtilities {
  sewer?: string;
  waterSource?: string;
  utilities?: string[];
}

export interface PropertyCosts {
  annualPropertyTax?: number;
  taxYear?: number;
  taxHistory?: any[];
  hoaFee?: number;
  hoaFeeFrequency?: string;
  hasHOA?: boolean;
  estimatedMonthlyInsurance?: number;
}

export interface PropertyPricing {
  priceHistory?: any[];
  priceChangeCount?: number;
  latestPriceChange?: any;
}

export interface School {
  name: string;
  rating?: number;
  distance?: string;
  grades?: string;
  type?: string;
  link?: string;
}

export interface Comparable {
  zpid: string;
  address: string;
  city?: string;
  price: number;
  zestimate?: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  pricePerSqft?: number;
  yearBuilt?: number;
  daysOnZillow?: number;
  distance?: string;
}

export interface PropertyMedia {
  images: string[];
  videos: string[];
  imageCount: number;
  videoCount: number;
}

export interface SpecialFeatures {
  features: string[];
  virtualTourUrl?: string;
  openHouse?: any;
  newConstruction?: boolean;
}

export interface AIAnalysis {
  buyingGrade: string;
  recommendation: string;
  valueAssessment: string;
  comprehensiveDescription: string;
  oneLineSummary: string;
}

export interface Insights {
  keyStrengths: string[];
  keyRisks: string[];
  negotiationStrategy: string[];
  redFlags: string[];
  hiddenGems: string[];
  renovationRecommendations: string[];
  immediateActions: string[];
  dealBreakers: string[];
  competitiveAdvantages: string[];
}

export interface AnalysisDetails {
  priceAnalysis: string;
  locationAnalysis: string;
  marketComparison: string;
  cashFlowAnalysis: string;
  bestFor: string;
  idealBuyer: string;
  estimatedROI5Year: string;
  estimatedROI10Year: string;
  exitStrategies: string[];
}

export interface PropertyData {
  success: boolean;
  timestamp: string;
  zpid: string;
  zillowUrl: string;
  propertyOverview: PropertyOverview;
  features: PropertyFeatures;
  utilities: PropertyUtilities;
  costs: PropertyCosts;
  pricing?: PropertyPricing;
  schools: School[];
  comparables: Comparable[];
  media: PropertyMedia;
  special: SpecialFeatures;
  rawApiData?: any;
  aiAnalysis: AIAnalysis;
  insights: Insights;
  analysisDetails: AnalysisDetails;
  marketResearch: string;
  charts?: any;
}
