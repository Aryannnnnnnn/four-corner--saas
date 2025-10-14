# User Management System - Database Schema

## Overview

The user management system uses your existing database schema. No migrations are required!

## Existing Tables Used

### 1. `users`
Main users table containing basic user information:
- `id`, `name`, `email`, `email_verified`, `image`
- `created_at`, `updated_at`, `last_login`

### 2. `admin_users`
Tracks which users have admin privileges:
- `user_id` (references users)
- `role` (defaults to 'admin')
- `permissions` (JSONB)
- `assigned_by`, `assigned_at`, `created_at`

### 3. `user_credentials`
Stores password hashes separately for security:
- `user_id` (references users, unique)
- `password_hash`
- `created_at`, `updated_at`

### 4. `user_activity_log`
General activity tracking:
- `user_id` (references users)
- `activity_type` (varchar)
- `activity_data` (JSONB)
- `ip_address`, `user_agent`, `referrer`
- `created_at`

### 5. `property_search_history`
Tracks property searches:
- `user_id` (references users)
- `search_query`, `search_type`
- `filters_applied` (JSONB)
- `results_count`, `result_data` (JSONB)
- `ip_address`, `user_agent`
- `created_at`

### 6. `user_sessions_tracking`
Tracks user sessions:
- `user_id` (references users)
- `session_start`, `session_end`, `total_duration`
- `ip_address`, `user_agent`
- `device_type`, `browser`, `os`
- `pages_viewed` (JSONB), `actions_count`
- `created_at`

### 7. `property_listings`
User's property listings (already exists)

## Activity Types Supported

The system tracks these activity types in `user_activity_log`:

- `listing_created` - User creates a property listing
- `listing_viewed` - User views a listing
- `listing_updated` - User updates their listing
- `listing_deleted` - User deletes their listing
- `property_searched` - User searches for properties (also in property_search_history)
- `user_login` - User logs in
- `user_logout` - User logs out
- `user_registered` - New user registration
- `profile_updated` - User updates their profile
- `password_changed` - User changes password
- `listing_submitted` - User submits listing for review
- `listing_approved` - Listing is approved by admin
- `listing_rejected` - Listing is rejected by admin
- `profile_viewed` - User views a profile
- `settings_updated` - User updates settings

## Using Activity Logging

### Log General Activity

```typescript
import { logActivity } from "@/app/lib/utils/activityLogger";

await logActivity({
  userId: session.user.id,
  activityType: "listing_viewed",
  metadata: {
    listing_id: "abc-123",
    listing_title: "Beautiful House",
  },
  ipAddress: getIpFromRequest(req),
  userAgent: getUserAgentFromRequest(req),
  referrer: req.headers.get("referer"),
});
```

### Log Property Search

```typescript
import { logPropertySearch } from "@/app/lib/utils/activityLogger";

await logPropertySearch({
  userId: session.user.id,
  searchQuery: "houses in Los Angeles",
  searchType: "location_search",
  filtersApplied: {
    minPrice: 500000,
    maxPrice: 1000000,
    bedrooms: 3,
  },
  resultsCount: 42,
  ipAddress: getIpFromRequest(req),
  userAgent: getUserAgentFromRequest(req),
});
```

## Admin Panel Features

### User Management (`/admin/users`)
- View all users with search and filtering
- See user statistics (listings count, join date)
- Access individual user details
- Delete users (with cascade deletion)

### User Detail Page (`/admin/users/[id]`)

**Profile Tab:**
- Edit user name and email
- Change user role (User ↔ Admin)
- Reset user password
- View member since and last updated dates

**Listings Tab:**
- View all property listings by user
- See listing status (Pending, Approved, Rejected)
- Quick link to view each listing

**Activities Tab:**
- View general activities from `user_activity_log`
- View property searches from `property_search_history`
- View user sessions from `user_sessions_tracking`
- Filter by activity type
- See timestamps and metadata

## API Endpoints

### User Management
- `GET /api/admin/users` - List all users
- `GET /api/admin/users/[id]` - Get user details
- `PATCH /api/admin/users/[id]` - Update user
- `DELETE /api/admin/users/[id]` - Delete user

### User Actions
- `POST /api/admin/users/[id]/reset-password` - Reset password
- `GET /api/admin/users/[id]/activities?tab=[all|searches|sessions]` - Get activities

## Security

### Admin Access Control
- Admins identified via `admin_users` table
- Only users in `admin_users` table can access user management
- Session validation on every request

### Password Management
- Passwords stored in separate `user_credentials` table
- Hashed using bcrypt with salt
- Never returned in API responses

### Role Management
- User role determined by presence in `admin_users` table
- Admins can promote/demote users
- Role changes tracked with `assigned_by` and `assigned_at`

## Setup Checklist

✅ Database schema already exists - No migrations needed!

To use the user management system:

1. **Ensure you have admin access:**
   ```sql
   -- Check if you're an admin
   SELECT * FROM admin_users WHERE user_id = 'your-user-id';

   -- If not, add yourself as admin
   INSERT INTO admin_users (user_id, role, assigned_at)
   VALUES ('your-user-id', 'admin', NOW());
   ```

2. **Access the admin panel:**
   - Navigate to `/admin/users`
   - You should see the Users navigation item in the sidebar

3. **Test the features:**
   - View user list
   - Click on a user to see details
   - Try editing a user profile
   - Test password reset
   - View user activities

## Future Enhancements

Consider implementing:

1. **Bulk Operations**
   - Select multiple users
   - Bulk actions (delete, change role)

2. **Advanced Analytics**
   - User activity dashboard
   - Search trends
   - Session analytics
   - Most active users

3. **Export Features**
   - Export user list to CSV
   - Export activity logs
   - Generate reports

4. **Email Notifications**
   - Notify users on password reset
   - Send account status updates
   - Activity alerts

5. **Audit Logs**
   - Track all admin actions
   - Log user management operations
   - Compliance reporting

## Troubleshooting

### "Forbidden" Error
- Ensure your user is in the `admin_users` table
- Check the admin check API endpoint works

### Activities Not Showing
- Verify tables exist: `user_activity_log`, `property_search_history`, `user_sessions_tracking`
- Check that you're logging activities correctly
- Look for errors in server logs

### Cannot Update Role
- Verify `admin_users` table structure
- Check foreign key constraints
- Ensure user_id references valid user

### Password Reset Not Working
- Verify `user_credentials` table exists
- Check bcrypt is installed: `npm install bcryptjs`
- Look for errors in API logs

## Support

For issues:
1. Check browser console for errors
2. Check server logs
3. Verify all tables exist in database
4. Ensure environment variables are set
5. Test with a fresh user account
