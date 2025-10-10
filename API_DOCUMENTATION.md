# 📡 Four Corner Properties - API Documentation

Complete API reference for all endpoints in the Four Corner Properties platform.

---

## 🔐 Authentication

All authenticated endpoints require a valid session cookie from NextAuth.js.

**Authentication Methods:**
- Google OAuth 2.0
- Email + Password (credentials)

**Headers:**
```
Cookie: next-auth.session-token=<session_token>
```

---

## 📍 API Endpoints

### Property Analysis

#### `POST /api/analyze-property`

Analyze a property using Zillow data and AI insights.

**Rate Limit:** 10 requests per hour per IP

**Request:**
```json
{
  "address": "123 Main St, Burlington, VT 05401",
  "zpid": "123456789" // Optional Zillow Property ID
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "propertyOverview": {
    "address": "123 Main St",
    "city": "Burlington",
    "state": "VT",
    "zipcode": "05401",
    "price": 450000,
    "bedrooms": 3,
    "bathrooms": 2.5,
    "squareFeet": 2000,
    "lotSize": 0.25,
    "yearBuilt": 2005,
    "propertyType": "Single Family",
    "images": ["https://..."]
  },
  "marketAnalysis": {
    "estimatedValue": 465000,
    "pricePerSqFt": 225,
    "appreciation1Year": 5.2,
    "appreciation5Year": 28.5
  },
  "financialProjections": {
    "roi": {...},
    "cashFlow": {...},
    "valueProjection": [...]
  },
  "comparableProperties": [...],
  "aiInsights": "..."
}
```

**Response (Rate Limited - 429):**
```json
{
  "success": false,
  "error": "Too many analysis requests. Please try again later.",
  "rateLimit": {
    "limit": 10,
    "remaining": 0,
    "reset": "2025-01-15T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Missing or invalid address
- `429` - Rate limit exceeded
- `500` - Analysis workflow error

---

### Property Listings

#### `GET /api/property-listings`

Get user's property listings (authenticated).

**Query Parameters:**
- `status` - Filter by status: `draft`, `pending`, `approved`, `rejected`

**Response:**
```json
{
  "listings": [
    {
      "id": "uuid",
      "title": "Beautiful 3BR Home in Burlington",
      "description": "...",
      "street_address": "123 Main St",
      "city": "Burlington",
      "state": "VT",
      "zipcode": "05401",
      "property_type": "single_family",
      "listing_type": "sale",
      "bedrooms": 3,
      "bathrooms": 2.5,
      "square_feet": 2000,
      "lot_size": 0.25,
      "year_built": 2005,
      "list_price": 450000,
      "status": "pending",
      "images": [
        {
          "id": "uuid",
          "s3_url": "https://...",
          "thumbnail_small_url": "https://...",
          "thumbnail_medium_url": "https://...",
          "thumbnail_large_url": "https://...",
          "display_order": 0,
          "is_primary": true
        }
      ],
      "created_at": "2025-01-15T10:00:00.000Z",
      "updated_at": "2025-01-15T10:00:00.000Z"
    }
  ],
  "count": 1
}
```

---

#### `POST /api/property-listings`

Create a new property listing (authenticated).

**Rate Limit:** 20 requests per 24 hours per user

**Request:**
```json
{
  "title": "Beautiful 3BR Home in Burlington",
  "description": "Spacious family home with modern updates...",
  "street_address": "123 Main St",
  "city": "Burlington",
  "state": "VT",
  "zipcode": "05401",
  "property_type": "single_family",
  "listing_type": "sale",
  "bedrooms": 3,
  "bathrooms": 2.5,
  "square_feet": 2000,
  "lot_size": 0.25,
  "lot_size_unit": "acres",
  "year_built": 2005,
  "list_price": 450000,
  "contact_name": "John Doe",
  "contact_email": "john@example.com",
  "contact_phone": "(802) 555-0123",
  "features": {},
  "images": [
    {
      "s3Key": "property-listings/user-id/...",
      "s3Url": "https://...",
      "thumbnailSmallUrl": "https://...",
      "thumbnailMediumUrl": "https://...",
      "thumbnailLargeUrl": "https://...",
      "displayOrder": 0,
      "isPrimary": true,
      "width": 1920,
      "height": 1080,
      "fileSize": 245678,
      "mimeType": "image/webp",
      "caption": "Front view"
    }
  ],
  "status": "pending"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "listing": {
    "id": "uuid",
    ...listing data with images
  }
}
```

**Validation Errors (400):**
```json
{
  "error": "Validation failed",
  "message": "title: String must contain at least 10 character(s), bedrooms: Required",
  "details": [
    {
      "path": ["title"],
      "message": "String must contain at least 10 character(s)"
    }
  ]
}
```

---

#### `GET /api/property-listings/public`

Get all approved listings (public, no auth required).

**Query Parameters:**
- `limit` - Max results (default: 50)
- `offset` - Pagination offset
- `city` - Filter by city
- `state` - Filter by state
- `min_price` - Minimum price
- `max_price` - Maximum price
- `bedrooms` - Minimum bedrooms
- `property_type` - Filter by type

**Response:**
```json
{
  "listings": [...],
  "count": 42,
  "hasMore": true
}
```

---

### Image Upload

#### `POST /api/upload-property-images`

Upload property images to S3 (authenticated).

**Content-Type:** `multipart/form-data`

**Form Data:**
- `images` - Array of image files (max 35 files, 15MB each)

**Request:**
```
POST /api/upload-property-images
Content-Type: multipart/form-data

--boundary
Content-Disposition: form-data; name="images"; filename="image1.jpg"

[binary data]
--boundary
```

**Response (Success - 200):**
```json
{
  "success": true,
  "images": [
    {
      "s3Key": "property-listings/user-id/...",
      "s3Url": "https://d3rth578olfe3y.cloudfront.net/...",
      "thumbnailSmallUrl": "https://...",
      "thumbnailMediumUrl": "https://...",
      "thumbnailLargeUrl": "https://...",
      "displayOrder": 0,
      "isPrimary": true,
      "width": 1920,
      "height": 1080,
      "fileSize": 245678,
      "mimeType": "image/webp"
    }
  ]
}
```

**Error Responses:**
- `400` - Invalid file type, size exceeded, or validation error
- `401` - Unauthorized
- `500` - S3 upload error

---

### Admin Endpoints

All admin endpoints require an admin role check.

#### `GET /api/admin/check`

Check if current user has admin privileges.

**Response:**
```json
{
  "isAdmin": true
}
```

---

#### `GET /api/admin/listings`

Get all listings with filters (admin only).

**Query Parameters:**
- `status` - `pending`, `approved`, `rejected`, `all`

**Response:**
```json
{
  "listings": [...],
  "count": 42
}
```

---

#### `POST /api/admin/listings/[id]/approve`

Approve a pending listing (admin only).

**Response:**
```json
{
  "success": true,
  "message": "Listing approved successfully",
  "emailSent": true
}
```

---

#### `POST /api/admin/listings/[id]/reject`

Reject a pending listing (admin only).

**Request:**
```json
{
  "reason": "Incomplete information or property not suitable for listing"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Listing rejected successfully",
  "emailSent": true
}
```

---

#### `DELETE /api/admin/listings/[id]/images/[imageId]`

Delete an image from a listing (admin only).

**Response:**
```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

---

#### `PUT /api/admin/listings/[id]/images/reorder`

Reorder images in a listing (admin only).

**Request:**
```json
{
  "imageOrders": [
    { "id": "image-uuid-1", "display_order": 0 },
    { "id": "image-uuid-2", "display_order": 1 }
  ]
}
```

---

### User Endpoints

#### `GET /api/user/profile`

Get current user profile (authenticated).

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "image": "https://...",
  "created_at": "2025-01-15T10:00:00.000Z"
}
```

---

#### `PUT /api/user/profile`

Update user profile (authenticated).

**Request:**
```json
{
  "name": "John Doe",
  "bio": "Real estate enthusiast"
}
```

---

#### `GET /api/user/has-password`

Check if user has a password set (for OAuth users).

**Response:**
```json
{
  "hasPassword": false
}
```

---

#### `POST /api/user/password`

Set or update password (authenticated).

**Request:**
```json
{
  "currentPassword": "old-password", // Required if updating
  "newPassword": "new-secure-password"
}
```

---

### Search

#### `POST /api/search-properties`

Search for properties with advanced filters.

**Request:**
```json
{
  "query": "Burlington waterfront",
  "filters": {
    "minPrice": 300000,
    "maxPrice": 600000,
    "bedrooms": 3,
    "propertyType": "single_family",
    "city": "Burlington",
    "state": "VT"
  },
  "sort": "price_asc",
  "limit": 20,
  "offset": 0
}
```

---

## 🔢 Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/analyze-property` | 10 requests | 1 hour |
| `/api/property-listings` (POST) | 20 requests | 24 hours |
| `/api/upload-property-images` | 20 requests | 24 hours |
| `/api/auth/*` | 5 requests | 15 minutes |
| General API | 100 requests | 15 minutes |

**Rate Limit Headers:**
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1705315200
```

---

## ❌ Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server-side error |

**Error Response Format:**
```json
{
  "error": "Error message",
  "message": "Detailed explanation",
  "details": {...} // Optional additional context
}
```

---

## 🧪 Testing

### Using cURL

```bash
# Analyze property
curl -X POST https://fourcornervt.com/api/analyze-property \
  -H "Content-Type: application/json" \
  -d '{"address": "123 Main St, Burlington, VT 05401"}'

# Get public listings
curl https://fourcornervt.com/api/property-listings/public?limit=10

# Upload images (with auth)
curl -X POST https://fourcornervt.com/api/upload-property-images \
  -H "Cookie: next-auth.session-token=..." \
  -F "images=@image1.jpg" \
  -F "images=@image2.jpg"
```

### Using Postman

Import the collection: [Download Postman Collection](./postman_collection.json)

---

## 📝 Changelog

### v1.0.0 (2025-01-15)
- Initial API release
- Property analysis endpoint
- Property listings CRUD
- Image upload and management
- Admin approval workflow
- Rate limiting implementation

---

## 🤝 Support

For API support or questions:
- Email: api@fourcornervt.com
- GitHub Issues: [Link](https://github.com/...)
- Documentation: [Link](https://docs.fourcornervt.com)

---

**Last Updated:** January 2025
