"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { showToast } from "@/app/lib/utils/toast";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  created_at: string;
  updated_at: string;
  property_listings?: Array<{
    id: string;
    title: string;
    status: string;
    list_price: number;
    created_at: string;
  }>;
}

interface Activity {
  id: string;
  activity_type: string;
  description: string;
  metadata?: any;
  created_at: string;
}

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "listings" | "activities">("profile");

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
  });

  const [passwordDialog, setPasswordDialog] = useState({
    isOpen: false,
    newPassword: "",
  });
  const [resettingPassword, setResettingPassword] = useState(false);

  useEffect(() => {
    fetchUser();
    fetchActivities();
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/users/${userId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await response.json();
      setUser(data.user);
      setEditForm({
        name: data.user.name || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        role: data.user.role || "user",
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      showToast("Failed to fetch user details", "error");
      router.push("/admin/users");
    } finally {
      setLoading(false);
    }
  };

  const fetchActivities = async () => {
    try {
      setLoadingActivities(true);
      const response = await fetch(`/api/admin/users/${userId}/activities`);

      if (!response.ok) {
        throw new Error("Failed to fetch activities");
      }

      const data = await response.json();
      setActivities(data.activities || []);
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoadingActivities(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setSaving(true);
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...editForm,
          phone: editForm.phone.replace(/\D/g, ""), // Send only digits
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update user");
      }

      const data = await response.json();
      setUser(data.user);
      setIsEditing(false);
      showToast("User updated successfully", "success");
    } catch (error) {
      console.error("Error updating user:", error);
      showToast(
        error instanceof Error ? error.message : "Failed to update user",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleResetPassword = async () => {
    if (!passwordDialog.newPassword || passwordDialog.newPassword.length < 8) {
      showToast("Password must be at least 8 characters", "error");
      return;
    }

    try {
      setResettingPassword(true);
      const response = await fetch(`/api/admin/users/${userId}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: passwordDialog.newPassword }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to reset password");
      }

      showToast("Password reset successfully", "success");
      setPasswordDialog({ isOpen: false, newPassword: "" });
    } catch (error) {
      console.error("Error resetting password:", error);
      showToast(
        error instanceof Error ? error.message : "Failed to reset password",
        "error"
      );
    } finally {
      setResettingPassword(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "listing_created":
        return (
          <div className="p-2 bg-blue-100 rounded-full">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        );
      case "listing_viewed":
      case "saved_property_viewed":
        return (
          <div className="p-2 bg-green-100 rounded-full">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        );
      case "property_searched":
        return (
          <div className="p-2 bg-purple-100 rounded-full">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        );
      case "property_analyzed":
        return (
          <div className="p-2 bg-indigo-100 rounded-full">
            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        );
      case "listing_updated":
        return (
          <div className="p-2 bg-yellow-100 rounded-full">
            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        );
      case "listing_approved":
        return (
          <div className="p-2 bg-green-100 rounded-full">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case "listing_rejected":
        return (
          <div className="p-2 bg-red-100 rounded-full">
            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case "user_login":
        return (
          <div className="p-2 bg-cyan-100 rounded-full">
            <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="p-2 bg-gray-100 rounded-full">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    };
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  if (loading) {
    return <LoadingSpinner message="Loading user details..." />;
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">User not found</p>
        <Button onClick={() => router.push("/admin/users")} className="mt-4">
          Back to Users
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="secondary"
            onClick={() => router.push("/admin/users")}
            className="mb-4"
          >
            ← Back to Users
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("profile")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "profile"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("listings")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "listings"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Listings ({user.property_listings?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab("activities")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "activities"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Activities
          </button>
        </nav>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                User Information
              </h2>
              {!isEditing ? (
                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(true)}
                  className="text-sm"
                >
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsEditing(false);
                      setEditForm({
                        name: user.name || "",
                        email: user.email || "",
                        phone: user.phone || "",
                        role: user.role || "user",
                      });
                    }}
                    className="text-sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveChanges}
                    disabled={saving}
                    className="text-sm"
                  >
                    {saving ? "Saving..." : "Save"}
                  </Button>
                </div>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number (USA)
                  </label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      let formatted = value;
                      if (value.length > 3 && value.length <= 6) {
                        formatted = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                      } else if (value.length > 6) {
                        formatted = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                      } else if (value.length > 0) {
                        formatted = `(${value}`;
                      }
                      setEditForm({ ...editForm, phone: formatted });
                    }}
                    placeholder="(555) 123-4567"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                    maxLength={14}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={editForm.role}
                    onChange={(e) =>
                      setEditForm({ ...editForm, role: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-gray-900 mt-1">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900 mt-1">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone Number</label>
                  <p className="text-gray-900 mt-1">
                    {user.phone ?
                      `(${user.phone.slice(0, 3)}) ${user.phone.slice(3, 6)}-${user.phone.slice(6, 10)}`
                      : "Not provided"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Role</label>
                  <p className="text-gray-900 mt-1 capitalize">{user.role}</p>
                </div>
              </div>
            )}
          </Card>

          {/* Actions Card */}
          <Card className="p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions</h2>
            <div className="space-y-3">
              <Button
                variant="secondary"
                onClick={() => setPasswordDialog({ isOpen: true, newPassword: "" })}
                className="w-full"
              >
                Reset Password
              </Button>
              <div className="pt-3 border-t">
                <p className="text-sm text-gray-500 mb-2">Member since</p>
                <p className="text-gray-900">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Last updated</p>
                <p className="text-gray-900">
                  {new Date(user.updated_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Listings Tab */}
      {activeTab === "listings" && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            User Listings
          </h2>
          {!user.property_listings || user.property_listings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No listings found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {user.property_listings.map((listing) => (
                <div
                  key={listing.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      ${listing.list_price.toLocaleString()} • Created{" "}
                      {new Date(listing.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(listing.status)}`}
                    >
                      {listing.status}
                    </span>
                    <Link
                      href={`/listings/${listing.id}`}
                      className="text-blue-600 hover:text-blue-900 text-sm"
                      target="_blank"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Activities Tab */}
      {activeTab === "activities" && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activities
          </h2>
          {loadingActivities ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading activities...</p>
            </div>
          ) : activities.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No activities found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex gap-4 p-4 border rounded-lg">
                  {getActivityIcon(activity.activity_type)}
                  <div className="flex-1">
                    <p className="text-gray-900">{activity.description}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(activity.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Password Reset Dialog */}
      <ConfirmDialog
        isOpen={passwordDialog.isOpen}
        onClose={() => setPasswordDialog({ isOpen: false, newPassword: "" })}
        onConfirm={handleResetPassword}
        title="Reset Password"
        message="Enter a new password for this user (minimum 8 characters)"
        confirmText={resettingPassword ? "Resetting..." : "Reset Password"}
        cancelText="Cancel"
        type="info"
        requireInput
        inputPlaceholder="Enter new password..."
        onInputChange={(value) =>
          setPasswordDialog({ ...passwordDialog, newPassword: value })
        }
      />
    </div>
  );
}
