"use client";

import { Phone, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface PhoneNumberModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function PhoneNumberModal({ isOpen, onClose }: PhoneNumberModalProps) {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate USA phone number (10 digits)
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      toast.error("Please enter a valid 10-digit USA phone number");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/user/update-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phoneDigits,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to update phone number");
        setIsLoading(false);
        return;
      }

      toast.success("Phone number added successfully!");

      // Force a hard reload to ensure fresh data
      setTimeout(() => {
        window.location.href = window.location.href;
      }, 500);
    } catch (error) {
      console.error("Phone update error:", error);
      toast.error("Unable to update phone number. Please try again.");
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Auto-format phone number as user types
    const value = e.target.value.replace(/\D/g, "");
    let formatted = value;
    if (value.length > 3 && value.length <= 6) {
      formatted = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else if (value.length > 6) {
      formatted = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else if (value.length > 0) {
      formatted = `(${value}`;
    }
    setPhone(formatted);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
        {/* Close button - only if onClose is provided */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <Phone className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Complete Your Profile
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
            We need your phone number to provide you with the best service and property updates
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Phone Number */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
              Phone Number (USA Only)
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(555) 123-4567"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                required
                maxLength={14}
                autoFocus
              />
            </div>
            <p className="text-xs text-gray-500">
              10-digit USA phone number required
            </p>
          </div>

          {/* Why we need this */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Why we need this:</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Property alerts and updates</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Appointment confirmations</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Account security verification</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Better customer service</span>
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Continue
              </>
            )}
          </button>
        </form>

        {/* Note */}
        <p className="text-xs text-gray-500 text-center mt-6">
          Your phone number will be kept private and secure
        </p>
      </div>
    </div>
  );
}
