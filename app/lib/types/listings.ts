// app/lib/types/listings.ts

export type ListingStatus = "pending" | "approved" | "rejected" | "draft";

export interface PropertyListingFeatures {
  heating?: string;
  cooling?: string;
  appliances?: string[];
  flooring?: string[];
  hasPool?: boolean;
  hasSpa?: boolean;
  parking?: string[];
  view?: string[];
  securityFeatures?: string[];
  accessibility?: string[];
  renovationYear?: number;
  renovationDetails?: string;
  virtualTourUrl?: string;
  [key: string]: any; // Allow additional dynamic fields
}

export interface PropertyListing {
  id: string;
  user_id: string;
  status: ListingStatus;

  // Basic Information
  title: string;
  description: string;

  // Location
  street_address: string;
  city: string;
  state: string;
  zipcode: string;
  latitude?: number;
  longitude?: number;

  // Property Details
  property_type: string;

  // Thumbnails for property card
  thumbnail_small_url?: string;
  thumbnail_medium_url?: string;
  thumbnail_large_url?: string;
  listing_type: "sale" | "rent";
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  lot_size?: number;
  lot_size_unit?: string;
  year_built?: number;
  stories?: number;
  garage_spaces?: number;
  
  // Financial
  list_price: number;
  hoa_fees?: number;
  property_tax?: number;
  
  // Contact Information
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  
  // Features (JSONB)
  features?: PropertyListingFeatures;
  
  // Admin Review
  rejection_reason?: string;
  admin_notes?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  
  // Populated from joins
  user?: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  reviewer?: {
    id: string;
    name: string;
    email: string;
  };
  images?: PropertyImage[];
}

export interface PropertyImage {
  id: string;
  property_listing_id: string;
  s3_key: string;
  s3_url: string;
  thumbnail_small_url?: string;
  thumbnail_medium_url?: string;
  thumbnail_large_url?: string;
  display_order: number;
  is_primary: boolean;
  caption?: string;
  file_size?: number;
  mime_type?: string;
  width?: number;
  height?: number;
  uploaded_at: string;
}

export interface PropertyListingFormData {
  // Basic Information
  title: string;
  description: string;
  
  // Location
  street_address: string;
  city: string;
  state: string;
  zipcode: string;
  
  // Property Details
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  lot_size?: number;
  lot_size_unit?: string;
  year_built?: number;
  stories?: number;
  garage_spaces?: number;
  
  // Financial
  list_price: number;
  hoa_fees?: number;
  property_tax?: number;
  
  // Features
  features?: PropertyListingFeatures;
  
  // Images (files to upload)
  imageFiles: File[];
}

export interface AdminUser {
  user_id: string;
  role: string;
  permissions?: Record<string, any>;
  assigned_by?: string;
  assigned_at: string;
  created_at: string;
}

export interface ListingStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  draft: number;
  recentSubmissions: number; // Last 7 days
  recentApprovals: number; // Last 7 days
  recentRejections: number; // Last 7 days
}

export interface ListingFilters {
  status?: ListingStatus;
  userId?: string;
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string[];
  bedrooms?: number;
  bathrooms?: number;
  city?: string;
  state?: string;
  sortBy?: "created_at" | "updated_at" | "list_price" | "bedrooms";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface PaginatedListings {
  listings: PropertyListing[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserActivityLog {
  id: string;
  user_id: string;
  activity_type: string;
  activity_data?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  created_at: string;
}
