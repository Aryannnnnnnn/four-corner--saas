# Admin User Management System

## Overview

A complete user management system has been added to the admin panel, allowing administrators to:

- View and manage all users
- Edit user profiles (name, email, username, phone, role)
- Reset user passwords
- Delete users
- View user's property listings
- Track user activities

## Features

### 1. User Management Dashboard (`/admin/users`)

**Features:**
- View all registered users in a table format
- Search users by name, email, or username
- Filter users by role (Admin/User)
- See user statistics (listings count, join date)
- Quick actions (View details, Delete user)

**Displayed Information:**
- User avatar (first letter of name)
- Name and email
- Username
- Role badge (color-coded)
- Number of listings
- Join date
- Action buttons

### 2. User Detail Page (`/admin/users/[id]`)

**Three Tabs:**

#### Profile Tab
- **View Mode:** Display user information
- **Edit Mode:**
  - Update name
  - Update email (with duplicate check)
  - Update username (with duplicate check)
  - Update phone number
  - Change user role (User/Admin)
- **Actions Card:**
  - Reset password button
  - Member since date
  - Last updated date

#### Listings Tab
- View all property listings created by the user
- Display listing title, price, status, and creation date
- Status badges (Pending, Approved, Rejected)
- Direct link to view each listing

#### Activities Tab
- Track user activities with timestamps
- Activity types with icons:
  - 🔵 Listing Created
  - 🟢 Listing Viewed
  - 🟣 Property Searched
  - And more...
- Activity descriptions and metadata
- Chronological display

## API Endpoints

### User Management

#### `GET /api/admin/users`
Fetch all users with filtering options
- Query params: `search`, `role`
- Returns: List of users with listing counts

#### `GET /api/admin/users/[id]`
Get detailed information about a specific user
- Returns: User data with all property listings

#### `PATCH /api/admin/users/[id]`
Update user information
- Body: `name`, `email`, `username`, `phone`, `role`
- Validation: Checks for duplicate email/username
- Returns: Updated user data

#### `DELETE /api/admin/users/[id]`
Delete a user and all their data
- Cascade deletes all user's listings
- Protection: Cannot delete own admin account

#### `POST /api/admin/users/[id]/reset-password`
Reset a user's password
- Body: `newPassword` (min 8 characters)
- Returns: Success confirmation

#### `GET /api/admin/users/[id]/activities`
Get user activity history
- Query params: `limit`, `type`
- Returns: List of activities with metadata

## Database Schema

### `user_activities` Table

```sql
CREATE TABLE user_activities (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  activity_type VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes:**
- `user_id` - For querying user activities
- `activity_type` - For filtering by activity type
- `created_at` - For chronological sorting

**Row Level Security:**
- Users can view their own activities
- Admins can view all activities
- Service role can insert activities

## Activity Logging Utility

### Usage Example

```typescript
import { logActivity } from "@/app/lib/utils/activityLogger";

// Log a user action
await logActivity({
  userId: session.user.id,
  activityType: "listing_viewed",
  description: "Viewed property: Beautiful House",
  metadata: {
    listing_id: "abc-123",
    listing_title: "Beautiful House",
    listing_price: 500000,
  },
  ipAddress: getIpFromRequest(req),
  userAgent: getUserAgentFromRequest(req),
});
```

### Supported Activity Types

```typescript
type ActivityType =
  | "listing_created"
  | "listing_viewed"
  | "listing_updated"
  | "listing_deleted"
  | "property_searched"
  | "user_login"
  | "user_logout"
  | "user_registered"
  | "profile_updated"
  | "password_changed";
```

## Setup Instructions

### Step 1: Run Database Migration

1. Open your Supabase Dashboard
2. Go to SQL Editor
3. Run the migration in `migrations/create_user_activities_table.sql`

### Step 2: Verify Setup

Test the user management features:
1. Navigate to `/admin/users`
2. View the list of users
3. Click on a user to see details
4. Try editing a user profile
5. Test password reset functionality

### Step 3: Implement Activity Logging (Optional)

Add activity logging to your existing routes:

```typescript
// In your listing view route
import { logActivity } from "@/app/lib/utils/activityLogger";

export async function GET(req: NextRequest) {
  const session = await auth();
  const listingId = params.id;

  // ... fetch listing logic ...

  // Log the activity
  if (session?.user?.id) {
    await logActivity({
      userId: session.user.id,
      activityType: "listing_viewed",
      description: `Viewed listing: ${listing.title}`,
      metadata: { listing_id: listingId },
    });
  }

  return NextResponse.json({ listing });
}
```

## Security Features

### Access Control
- Only users with `role = 'admin'` can access user management
- Admins cannot delete their own account
- Email and username uniqueness validation
- Password minimum length enforcement (8 characters)

### Data Protection
- Passwords are hashed using bcrypt
- Password field excluded from API responses
- Row Level Security on activities table
- Cascade deletion of user data

## UI Components Used

- **LoadingSpinner** - Loading states
- **Button** - Action buttons with variants
- **Card** - Content containers
- **ConfirmDialog** - Delete and password reset confirmations
- **Toast notifications** - User feedback

## Navigation

The user management section is accessible from the admin sidebar:

```
Admin Panel
├── Dashboard
├── Pending
├── Approved
├── Rejected
├── All Listings
└── Users ← New Section
    └── [User Detail]
        ├── Profile
        ├── Listings
        └── Activities
```

## Future Enhancements

Consider implementing:

1. **Bulk Operations**
   - Select multiple users
   - Bulk delete
   - Bulk role changes

2. **Advanced Filtering**
   - Filter by registration date range
   - Filter by activity level
   - Filter by number of listings

3. **Export Features**
   - Export user list to CSV
   - Export activity logs
   - Generate user reports

4. **Email Notifications**
   - Notify users when admin resets their password
   - Send welcome emails to new users
   - Activity alerts for suspicious behavior

5. **Activity Analytics**
   - Dashboard with charts
   - Most active users
   - Popular listings
   - Search trends

6. **User Impersonation**
   - Login as user (for support)
   - View site from user's perspective

7. **Audit Logs**
   - Track admin actions
   - Log all user management operations
   - Compliance reporting

## Troubleshooting

### "Forbidden" Error When Accessing Admin Panel
- Ensure your user account has `role = 'admin'` in the database
- Check that the admin check API endpoint is working

### Activities Not Showing
- Verify the `user_activities` table exists
- Check that the migration ran successfully
- Ensure RLS policies are set up correctly

### Cannot Update User Email/Username
- Check for duplicate email/username in database
- Verify validation is working correctly
- Look for error messages in browser console

## Testing Checklist

- [ ] Access `/admin/users` as admin
- [ ] Search for users by name/email
- [ ] Filter users by role
- [ ] View user detail page
- [ ] Edit user profile
- [ ] Reset user password
- [ ] View user's listings
- [ ] View user's activities
- [ ] Delete a user (test with non-admin account)
- [ ] Verify cascade deletion of user data
- [ ] Test preventing self-deletion
- [ ] Verify activity logging is working

## Support

For issues or questions:
1. Check the browser console for errors
2. Check server logs for API errors
3. Verify database schema matches migration
4. Ensure all environment variables are set
