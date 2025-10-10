"use client";

import { Download, Eye, EyeOff, Key, Save, Trash2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

type SettingsTab = "account" | "api" | "appearance" | "data";

export default function Settings() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Account Settings
  const [accountData, setAccountData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // API Settings
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const [hasPassword, setHasPassword] = useState(false);

  const checkPasswordExists = useCallback(async () => {
    try {
      const response = await fetch("/api/user/has-password");
      const data = await response.json();
      setHasPassword(data.hasPassword || false);
    } catch (error) {
      console.error("Failed to check password:", error);
      setHasPassword(false);
    }
  }, []);

  const fetchSettings = useCallback(async () => {
    try {
      const response = await fetch("/api/user/settings");
      const data = await response.json();
      if (data.settings) {
        // Settings fetched successfully
        console.log("Settings fetched:", data.settings);
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    }
  }, []);

  useEffect(() => {
    if (session?.user) {
      setAccountData((prev) => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
      }));
      fetchSettings();
      checkPasswordExists();
    }
  }, [session, checkPasswordExists, fetchSettings]);

  const handleUpdateAccount = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: accountData.name,
          email: accountData.email,
        }),
      });

      if (!response.ok) throw new Error("Failed to update account");

      await update({ name: accountData.name, email: accountData.email });
      toast.success("✅ Account information updated successfully!");
    } catch (error) {
      console.error("Account update error:", error);
      toast.error("Unable to update account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (accountData.newPassword !== accountData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (accountData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/user/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: accountData.currentPassword,
          newPassword: accountData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to change password");
        return;
      }

      setAccountData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      toast.success("🔒 Password changed successfully!");
    } catch (error) {
      console.error("Password change error:", error);
      toast.error("Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateApiKey = async () => {
    if (!confirm("This will invalidate your existing API key. Continue?"))
      return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/user/api-key", {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to generate API key");

      const data = await response.json();
      setApiKey(data.apiKey);
      toast.success("🔑 API key generated successfully!");
    } catch (_error) {
      toast.error("Failed to generate API key");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = async () => {
    try {
      const response = await fetch("/api/user/export");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `four_corner_properties_data_${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("📥 Data exported successfully!");
    } catch (_error) {
      toast.error("Failed to export data");
    }
  };

  const handleExportPDF = async () => {
    try {
      // Open PDF in new window for printing
      window.open("/api/user/export-pdf", "_blank");
      toast.success("📄 PDF report opened! Use Ctrl+P or Cmd+P to save as PDF");
    } catch (_error) {
      toast.error("Failed to generate PDF");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = prompt(
      'This action cannot be undone. Type "DELETE" to confirm:',
    );
    if (confirmation !== "DELETE") return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/user/account", {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete account");

      toast.success("Account deleted successfully. Logging out...");

      // Sign out and redirect to homepage
      await signOut({ redirect: false });
      router.push("/");
    } catch (_error) {
      toast.error("Failed to delete account");
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "data", label: "Data & Storage", icon: Download },
  ];

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-luxury-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-white/70">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
        <div className="mb-6 sm:mb-8">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            <span className="text-gradient">Settings</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl">
            Manage your account and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Sidebar */}
          <Card className="lg:col-span-1 h-fit p-4 sm:p-6">
            <nav className="space-y-1 sm:space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as SettingsTab)}
                    className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl transition-all text-sm sm:text-base ${
                      activeTab === tab.id
                        ? "bg-luxury-blue text-white"
                        : "hover:bg-white/5 text-white/70"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </Card>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Account Settings */}
            {activeTab === "account" && (
              <>
                <Card>
                  <h2 className="font-display text-2xl font-bold mb-6">
                    Account Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        value={accountData.name}
                        onChange={(e) =>
                          setAccountData({
                            ...accountData,
                            name: e.target.value,
                          })
                        }
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={accountData.email}
                        onChange={(e) =>
                          setAccountData({
                            ...accountData,
                            email: e.target.value,
                          })
                        }
                        placeholder="john@example.com"
                      />
                    </div>

                    <Button
                      onClick={handleUpdateAccount}
                      disabled={isLoading}
                      className="w-full"
                    >
                      <Save className="w-5 h-5 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </Card>

                {hasPassword ? (
                  <Card>
                    <h2 className="font-display text-2xl font-bold mb-6">
                      Change Password
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={accountData.currentPassword}
                            onChange={(e) =>
                              setAccountData({
                                ...accountData,
                                currentPassword: e.target.value,
                              })
                            }
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          New Password
                        </label>
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={accountData.newPassword}
                          onChange={(e) =>
                            setAccountData({
                              ...accountData,
                              newPassword: e.target.value,
                            })
                          }
                          placeholder="Enter new password (min 8 characters)"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Confirm New Password
                        </label>
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={accountData.confirmPassword}
                          onChange={(e) =>
                            setAccountData({
                              ...accountData,
                              confirmPassword: e.target.value,
                            })
                          }
                          placeholder="Confirm new password"
                        />
                      </div>

                      <Button
                        onClick={handleChangePassword}
                        disabled={isLoading}
                        className="w-full"
                      >
                        Update Password
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <Card className="border-2 border-blue-500/20">
                    <h2 className="font-display text-2xl font-bold mb-4">
                      Password Settings
                    </h2>
                    <div className="p-4 bg-blue-500/10 rounded-xl">
                      <p className="text-blue-400">
                        <strong>Note:</strong> This account uses Google sign-in.
                        Password management is handled by Google and cannot be
                        changed here.
                      </p>
                    </div>
                  </Card>
                )}
              </>
            )}

            {/* API Keys */}
            {activeTab === "api" && (
              <Card>
                <h2 className="font-display text-2xl font-bold mb-6">
                  API Keys
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="text-sm text-blue-400">
                      <strong>Note:</strong> Keep your API keys secure. Do not
                      share them publicly or commit them to version control.
                    </p>
                  </div>

                  {apiKey && (
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Your API Key
                      </label>
                      <div className="relative">
                        <Input
                          type={showApiKey ? "text" : "password"}
                          value={apiKey}
                          readOnly
                        />
                        <button
                          type="button"
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                        >
                          {showApiKey ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleGenerateApiKey}
                    disabled={isLoading}
                    variant="secondary"
                    className="w-full"
                  >
                    <Key className="w-5 h-5 mr-2" />
                    {apiKey ? "Regenerate API Key" : "Generate API Key"}
                  </Button>

                  <div className="p-4 bg-white/5 rounded-xl">
                    <h3 className="font-semibold mb-2">API Documentation</h3>
                    <p className="text-sm text-white/70 mb-3">
                      Learn how to integrate Four Corner Properties API into
                      your applications.
                    </p>
                    <a
                      href="/docs/api"
                      className="text-luxury-blue hover:text-luxury-blue-dark text-sm font-semibold"
                    >
                      View Documentation →
                    </a>
                  </div>
                </div>
              </Card>
            )}

            {/* Appearance */}
            {activeTab === "appearance" && (
              <Card>
                <h2 className="font-display text-2xl font-bold mb-6">
                  Appearance
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <h3 className="font-semibold mb-3">Theme</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: "dark", label: "Dark", color: "bg-black" },
                        { id: "light", label: "Light", color: "bg-white" },
                        {
                          id: "auto",
                          label: "Auto",
                          color: "bg-gradient-to-r from-black to-white",
                        },
                      ].map((theme) => (
                        <button
                          key={theme.id}
                          className="p-4 rounded-xl border-2 border-white/10 hover:border-luxury-blue transition-all"
                        >
                          <div
                            className={`w-full h-20 rounded-lg mb-2 ${theme.color}`}
                          />
                          <p className="text-sm font-semibold">{theme.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-luxury-blue/10 border border-luxury-blue/20 rounded-xl">
                    <p className="text-sm text-luxury-blue">
                      Theme customization coming soon! Currently, the platform
                      uses a luxury dark theme optimized for property analysis.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Data & Storage */}
            {activeTab === "data" && (
              <>
                <Card>
                  <h2 className="font-display text-2xl font-bold mb-6">
                    Export Data
                  </h2>
                  <p className="text-white/70 mb-6">
                    Download your property portfolio and account information in
                    your preferred format.
                  </p>
                  <div className="space-y-4">
                    <Button onClick={handleExportPDF} className="w-full">
                      <Download className="w-5 h-5 mr-2" />
                      Export as PDF Report
                    </Button>
                    <Button
                      onClick={handleExportData}
                      variant="secondary"
                      className="w-full"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Export as JSON Data
                    </Button>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                      <p className="text-sm text-blue-400">
                        <strong>PDF Report:</strong> Professional formatted
                        report with your logo, perfect for printing or sharing.
                        <br />
                        <strong>JSON Data:</strong> Complete data export for
                        backup or migration purposes.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="border-2 border-red-500/20">
                  <h2 className="font-display text-2xl font-bold mb-6 text-red-500">
                    Danger Zone
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                      <h3 className="font-semibold mb-2 text-red-400">
                        Delete Account
                      </h3>
                      <p className="text-sm text-white/70 mb-4">
                        Permanently delete your account and all associated data.
                        This action cannot be undone.
                      </p>
                      <Button
                        onClick={handleDeleteAccount}
                        variant="danger"
                        disabled={isLoading}
                        className="w-full"
                      >
                        <Trash2 className="w-5 h-5 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
