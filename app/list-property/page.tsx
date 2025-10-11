"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Header from "@/components/layout/Header";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { showToast } from "@/app/lib/utils/toast";
import { logger } from "@/app/lib/utils/logger";

type PropertyFormData = {
  title: string;
  description: string;
  street_address: string;
  city: string;
  state: string;
  zipcode: string;
  latitude?: number;
  longitude?: number;
  property_type: string;
  listing_type: "sale" | "rent";
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  lot_size?: number;
  lot_size_unit?: string;
  year_built?: number;
  stories?: number;
  garage_spaces?: number;
  list_price?: number;
  hoa_fees?: number;
  property_tax?: number;
  features?: Record<string, any>;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
};

type LocalImagePreview = {
  id: string;
  file: File;
  preview: string; // blob URL
  file_size: number;
  display_order: number;
};

const STEPS = [
  {
    id: 1,
    name: "Details",
    description: "Basic information about your property",
  },
  { id: 2, name: "Location", description: "Where is your property located?" },
  { id: 3, name: "Features", description: "Property specifications" },
  { id: 4, name: "Photos", description: "Upload property images (max 35)" },
  { id: 5, name: "Contact", description: "How can we reach you?" },
  { id: 6, name: "Review", description: "Review and submit" },
];

export default function ListPropertyPage() {
  const router = useRouter();
  const { status } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localImages, setLocalImages] = useState<LocalImagePreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    description: "",
    street_address: "",
    city: "",
    state: "VT",
    zipcode: "",
    property_type: "single_family",
    listing_type: "sale",
    list_price: 0,
    contact_name: "",
    contact_email: "",
  });

  // Cleanup on unmount ONLY (not on every localImages change)
  useEffect(() => {
    // Store current images to clean up on unmount
    const currentImages = localImages;

    return () => {
      // Clean up timeout
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
      // Clean up image preview URLs only on unmount
      currentImages.forEach((img) => {
        try {
          URL.revokeObjectURL(img.preview);
        } catch (e) {
          // Ignore errors if URL already revoked
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run on mount/unmount

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/list-property");
    }
  }, [status, router]);

  if (status === "loading") {
    return <LoadingSpinner message="Loading..." />;
  }

  if (status === "unauthenticated") {
    return null;
  }

  const handleInputChange = (
    field: keyof PropertyFormData,
    value: PropertyFormData[keyof PropertyFormData],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check total image count
    if (localImages.length + files.length > 35) {
      showToast(
        `You can only upload up to 35 images. You currently have ${localImages.length} images.`,
        "error",
      );
      return;
    }

    // Validate each file
    for (const file of Array.from(files)) {
      if (file.size > 15 * 1024 * 1024) {
        showToast(`File ${file.name} exceeds 15MB limit`, "error");
        return;
      }
      if (!file.type.startsWith("image/")) {
        showToast(`File ${file.name} is not an image`, "error");
        return;
      }
    }

    // Create local previews
    const newLocalImages: LocalImagePreview[] = Array.from(files).map(
      (file, index) => ({
        id: `local-${Date.now()}-${index}`,
        file,
        preview: URL.createObjectURL(file),
        file_size: file.size,
        display_order: localImages.length + index,
      }),
    );

    setLocalImages((prev) => [...prev, ...newLocalImages]);
    showToast(
      `✅ ${files.length} image(s) ready to upload! Total: ${localImages.length + files.length}/35`,
      "success",
      { duration: 3000 },
    );

    // Reset file input
    e.target.value = "";
  };

  const removeLocalImage = (index: number) => {
    setLocalImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      // Revoke the preview URL to free memory
      const removed = prev[index];
      if (removed) {
        URL.revokeObjectURL(removed.preview);
      }
      // Reorder remaining images
      const reordered = updated.map((img, i) => ({ ...img, display_order: i }));
      showToast(
        `Image removed. ${reordered.length} image(s) remaining.`,
        "success",
      );
      return reordered;
    });
  };

  const moveLocalImage = (fromIndex: number, toIndex: number) => {
    setLocalImages((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      if (moved) {
        updated.splice(toIndex, 0, moved);
      }
      // Reorder
      return updated.map((img, i) => ({ ...img, display_order: i }));
    });
  };

  const makePrimaryLocalImage = (index: number) => {
    if (index === 0) return; // Already primary
    moveLocalImage(index, 0);
    showToast("✨ Primary image updated successfully!", "success");
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.title.trim()) {
      showToast("Property title is required", "error");
      setCurrentStep(1);
      return;
    }
    if (formData.title.length < 10) {
      showToast("Property title must be at least 10 characters", "error");
      setCurrentStep(1);
      return;
    }
    if (!formData.description.trim()) {
      showToast("Property description is required", "error");
      setCurrentStep(1);
      return;
    }
    if (formData.description.length < 50) {
      showToast("Property description must be at least 50 characters", "error");
      setCurrentStep(1);
      return;
    }
    if (!formData.list_price || formData.list_price <= 0) {
      showToast("List price is required and must be greater than 0", "error");
      setCurrentStep(1);
      return;
    }
    if (!formData.street_address.trim()) {
      showToast("Street address is required", "error");
      setCurrentStep(2);
      return;
    }
    if (!formData.city.trim()) {
      showToast("City is required", "error");
      setCurrentStep(2);
      return;
    }
    if (!formData.zipcode.trim()) {
      showToast("ZIP code is required", "error");
      setCurrentStep(2);
      return;
    }
    if (!formData.bedrooms || formData.bedrooms <= 0) {
      showToast("Number of bedrooms is required", "error");
      setCurrentStep(3);
      return;
    }
    if (!formData.bathrooms || formData.bathrooms <= 0) {
      showToast("Number of bathrooms is required", "error");
      setCurrentStep(3);
      return;
    }
    if (!formData.square_feet || formData.square_feet <= 0) {
      showToast("Square feet is required", "error");
      setCurrentStep(3);
      return;
    }
    if (!formData.lot_size || formData.lot_size <= 0) {
      showToast("Lot size is required", "error");
      setCurrentStep(3);
      return;
    }
    if (!formData.year_built || formData.year_built <= 0) {
      showToast("Year built is required", "error");
      setCurrentStep(3);
      return;
    }
    if (localImages.length === 0) {
      showToast("Please upload at least one property image", "error");
      setCurrentStep(4);
      return;
    }
    if (!formData.contact_name.trim()) {
      showToast("Contact name is required", "error");
      setCurrentStep(5);
      return;
    }
    if (!formData.contact_email.trim()) {
      showToast("Contact email is required", "error");
      setCurrentStep(5);
      return;
    }
    if (!formData.contact_phone || !formData.contact_phone.trim()) {
      showToast("Contact phone is required", "error");
      setCurrentStep(5);
      return;
    }

    setIsSubmitting(true);

    try {
      // First, upload all images to S3
      showToast("Uploading images...", "info");
      const formDataImages = new FormData();
      localImages.forEach((img) => {
        formDataImages.append("images", img.file);
      });

      const imageUploadResponse = await fetch("/api/upload-property-images", {
        method: "POST",
        body: formDataImages,
      });

      if (!imageUploadResponse.ok) {
        const error = await imageUploadResponse.json();
        throw new Error(error.error || "Failed to upload images");
      }

      const imageData = await imageUploadResponse.json();
      logger.log("Uploaded image data:", imageData);

      // The upload API already returns images with correct camelCase field names
      const uploadedImageData = imageData.images;

      showToast("Images uploaded successfully!", "success");

      // Then submit the listing with image data
      const listingPayload = {
        ...formData,
        features: {},
        images: uploadedImageData,
      };

      logger.log("Submitting listing payload:", listingPayload);
      logger.log("Form data values:", {
        street_address: formData.street_address,
        city: formData.city,
        state: formData.state,
        zipcode: formData.zipcode,
      });

      const response = await fetch("/api/property-listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listingPayload),
      });

      if (!response.ok) {
        const error = await response.json();
        logger.error("API Error:", error);
        logger.error("Full error details:", JSON.stringify(error, null, 2));

        // Show detailed validation errors if available
        if (error.details) {
          logger.error("Validation details:", error.details);
          const validationMessages = (
            error.details as Array<{ path?: string[]; message: string }>
          )
            .map((err) => `${err.path?.join(".")}: ${err.message}`)
            .join("\n");
          showToast(`Validation failed:\n${validationMessages}`, "error");
        } else {
          showToast(
            error.message || error.error || "Failed to submit listing",
            "error",
          );
        }

        throw new Error(
          error.message || error.error || "Failed to submit listing",
        );
      }

      await response.json();
      showToast(
        "🎉 Property listing submitted successfully! It will be reviewed by our team.",
        "success",
        { duration: 5000 },
      );

      // Clean up preview URLs
      localImages.forEach((img) => URL.revokeObjectURL(img.preview));

      // Redirect to user's listings page with cleanup
      redirectTimeoutRef.current = setTimeout(() => {
        router.push("/my-listings");
      }, 2000);
    } catch (error) {
      logger.error("Submission error:", error);
      showToast(
        error instanceof Error ? error.message : "Failed to submit listing",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cleanup on unmount ONLY (not on every localImages change)
  useEffect(() => {
    // Store current images to clean up on unmount
    const currentImages = localImages;

    return () => {
      // Clean up timeout
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
      // Clean up image preview URLs only on unmount
      currentImages.forEach((img) => {
        try {
          URL.revokeObjectURL(img.preview);
        } catch (e) {
          // Ignore errors if URL already revoked
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run on mount/unmount

  const nextStep = () => {
    // Validate current step before proceeding
    if (currentStep === 1) {
      if (!formData.title.trim()) {
        showToast("Property title is required", "error");
        return;
      }
      if (formData.title.length < 10) {
        showToast("Property title must be at least 10 characters", "error");
        return;
      }
      if (!formData.description.trim()) {
        showToast("Property description is required", "error");
        return;
      }
      if (formData.description.length < 50) {
        showToast(
          "Property description must be at least 50 characters",
          "error",
        );
        return;
      }
      if (!formData.list_price || formData.list_price <= 0) {
        showToast("List price is required", "error");
        return;
      }
    }
    if (currentStep === 2) {
      if (
        !formData.street_address.trim() ||
        !formData.city.trim() ||
        !formData.zipcode.trim()
      ) {
        showToast("Please fill in all required address fields", "error");
        return;
      }
    }
    if (currentStep === 3) {
      if (
        !formData.bedrooms ||
        !formData.bathrooms ||
        !formData.square_feet ||
        !formData.lot_size ||
        !formData.year_built
      ) {
        showToast("Please fill in all required property features", "error");
        return;
      }
    }
    if (currentStep === 4) {
      if (localImages.length === 0) {
        showToast("Please upload at least one property image", "error");
        return;
      }
    }
    if (currentStep === 5) {
      if (
        !formData.contact_name.trim() ||
        !formData.contact_email.trim() ||
        !formData.contact_phone?.trim()
      ) {
        showToast("Please fill in all required contact fields", "error");
        return;
      }
    }

    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 md:py-12 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              List Your Property
            </h1>
            <p className="mt-2 text-sm md:text-base text-gray-600">
              Fill out the form below to submit your property for listing. Our
              team will review it shortly.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-start justify-between">
              {STEPS.map((step, index) => (
                <div
                  key={step.id}
                  className="flex items-center flex-1 last:flex-initial"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-colors text-sm md:text-base font-semibold ${
                        currentStep >= step.id
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white border-gray-300 text-gray-500"
                      }`}
                    >
                      {step.id}
                    </div>
                    <div className="mt-2 text-xs text-center text-gray-700 hidden sm:block w-16 md:w-20">
                      <div className="font-medium leading-tight">
                        {step.name}
                      </div>
                    </div>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className="flex-1 px-2 md:px-3 flex items-center">
                      <div
                        className={`h-0.5 md:h-1 w-full transition-colors ${
                          currentStep > step.id ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <Card className="p-5 sm:p-6 md:p-8">
            {/* Step 1: Property Details */}
            {currentStep === 1 && (
              <div className="space-y-5 md:space-y-6">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold mb-4">
                    Property Details
                  </h2>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Property Title <span className="text-red-500">*</span>
                    </label>
                    <span
                      className={`text-xs ${formData.title.length >= 10 ? "text-green-600" : "text-gray-500"}`}
                    >
                      {formData.title.length}/10 characters minimum
                    </span>
                  </div>
                  <Input
                    type="text"
                    placeholder="e.g., Beautiful 3BR Home in Burlington (min 10 chars)"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full"
                  />
                  {formData.title.length > 0 && formData.title.length < 10 && (
                    <p className="text-xs text-amber-600 mt-1">
                      Please add {10 - formData.title.length} more characters
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <span
                      className={`text-xs ${formData.description.length >= 50 ? "text-green-600" : "text-gray-500"}`}
                    >
                      {formData.description.length}/50 characters minimum
                    </span>
                  </div>
                  <textarea
                    rows={6}
                    placeholder="Describe your property in detail... (minimum 50 characters)"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                  />
                  {formData.description.length > 0 &&
                    formData.description.length < 50 && (
                      <p className="text-xs text-amber-600 mt-1">
                        Please add {50 - formData.description.length} more
                        characters
                      </p>
                    )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.property_type}
                    onChange={(e) =>
                      handleInputChange("property_type", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                  >
                    <option value="single_family">Single Family Home</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="multi_family">Multi-Family</option>
                    <option value="land">Land</option>
                    <option value="commercial">Commercial</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Listing Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.listing_type}
                    onChange={(e) =>
                      handleInputChange("listing_type", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    List Price (USD) <span className="text-red-500">*</span>
                    {formData.listing_type === "rent" && (
                      <span className="text-gray-500 text-xs ml-1">
                        (per month)
                      </span>
                    )}
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 450000"
                    value={formData.list_price || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "list_price",
                        e.target.value ? Number(e.target.value) : undefined,
                      )
                    }
                    className="w-full"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Location</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="123 Main Street"
                    value={formData.street_address}
                    onChange={(e) =>
                      handleInputChange("street_address", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Burlington"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    >
                      <option value="VT">Vermont</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="05401"
                    value={formData.zipcode}
                    onChange={(e) =>
                      handleInputChange("zipcode", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Coordinates (latitude/longitude) will
                    be automatically geocoded from your address.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Features */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Property Features
                  </h2>
                  <p className="text-sm text-gray-600">
                    Provide key details about your property
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrooms <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      placeholder="3"
                      value={formData.bedrooms || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "bedrooms",
                          e.target.value ? Number(e.target.value) : undefined,
                        )
                      }
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bathrooms <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      step="0.5"
                      placeholder="2.5"
                      value={formData.bathrooms || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "bathrooms",
                          e.target.value ? Number(e.target.value) : undefined,
                        )
                      }
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Square Feet <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      placeholder="2000"
                      value={formData.square_feet || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "square_feet",
                          e.target.value ? Number(e.target.value) : undefined,
                        )
                      }
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lot Size (acres) <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.5"
                      value={formData.lot_size || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "lot_size",
                          e.target.value ? Number(e.target.value) : undefined,
                        )
                      }
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year Built <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    placeholder="2005"
                    value={formData.year_built || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "year_built",
                        e.target.value ? Number(e.target.value) : undefined,
                      )
                    }
                    className="w-full"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 4: Photos */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Property Photos
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Upload up to 35 high-quality images. The first image will be
                    the primary photo displayed in listings.
                  </p>
                </div>

                {/* Modern Upload Area with Drag & Drop */}
                <div className="relative">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="file-upload"
                      onDragEnter={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (localImages.length < 35) setIsDragging(true);
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (localImages.length < 35) setIsDragging(true);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsDragging(false);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsDragging(false);

                        if (localImages.length >= 35) {
                          showToast("Maximum 35 images allowed", "error");
                          return;
                        }

                        const files = e.dataTransfer.files;
                        if (!files || files.length === 0) return;

                        // Create a synthetic event to reuse handleImageSelect
                        const syntheticEvent = {
                          target: { files, value: "" },
                        } as React.ChangeEvent<HTMLInputElement>;
                        handleImageSelect(syntheticEvent);
                      }}
                      className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden ${
                        localImages.length >= 35
                          ? "h-32 border-gray-300 bg-gray-50 cursor-not-allowed"
                          : isDragging
                            ? "h-56 border-blue-500 bg-gradient-to-br from-blue-100 to-indigo-100 shadow-lg scale-[1.02]"
                            : "h-48 border-gray-300 bg-gradient-to-br from-gray-50 to-blue-50 hover:border-blue-400 hover:shadow-md"
                      }`}
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-grid-pattern"></div>
                      </div>

                      <div className="flex flex-col items-center justify-center pt-5 pb-6 relative z-10">
                        {localImages.length >= 35 ? (
                          <>
                            <div className="relative">
                              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg mb-4">
                                <svg
                                  className="w-9 h-9 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            </div>
                            <p className="text-base font-semibold text-gray-700">
                              Maximum images reached
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              You've selected 35 images (maximum allowed)
                            </p>
                          </>
                        ) : isDragging ? (
                          <>
                            <div className="relative mb-4">
                              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                                <svg
                                  className="w-10 h-10 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                  />
                                </svg>
                              </div>
                              <div className="absolute -inset-2 bg-blue-400 rounded-full opacity-30 blur-xl"></div>
                            </div>
                            <p className="text-lg font-bold text-blue-700 mb-1">
                              Drop your images here!
                            </p>
                            <p className="text-sm text-blue-600">
                              Release to upload your property photos
                            </p>
                          </>
                        ) : (
                          <>
                            <div className="relative mb-4">
                              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                                <svg
                                  className="w-8 h-8 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            </div>
                            <p className="mb-2 text-base font-semibold text-gray-700">
                              <span className="text-blue-600 hover:text-blue-700 transition-colors">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-sm text-gray-500 mb-1">
                              PNG, JPG, WebP up to 15MB each
                            </p>
                            {localImages.length > 0 && (
                              <div className="mt-3 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full">
                                <p className="text-sm text-blue-700 font-semibold">
                                  {localImages.length} of 35 images selected
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={handleImageSelect}
                        disabled={localImages.length >= 35}
                      />
                    </label>
                  </div>
                </div>

                {/* Modern Images Grid */}
                {localImages.length > 0 && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Your Photos ({localImages.length}/35)
                        </h3>
                        <p className="text-xs text-gray-600 mt-1">
                          First image will be displayed as the primary photo
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-blue-600">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {localImages.map((image, index) => (
                        <div
                          key={`${image.id}-${index}`}
                          className="relative group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-400 transition-all duration-300 hover:-translate-y-1"
                        >
                          {/* Primary Badge */}
                          {index === 0 && (
                            <div className="absolute top-3 left-3 z-20">
                              <div className="relative">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg">
                                  <svg
                                    className="w-3.5 h-3.5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  Primary
                                </span>
                                <div className="absolute -inset-1 bg-amber-400 opacity-20 blur-lg rounded-lg"></div>
                              </div>
                            </div>
                          )}

                          {/* Image Number Badge */}
                          <div className="absolute top-3 right-3 z-20">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold bg-gray-900/80 backdrop-blur-sm text-white shadow-lg">
                              #{index + 1}
                            </span>
                          </div>

                          {/* Image Preview */}
                          <div className="aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 relative">
                            <img
                              src={image.preview}
                              alt={`Property ${index + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              loading="lazy"
                            />

                            {/* Quick Action Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                              <div className="w-full p-4 space-y-2">
                                {/* Make Primary Button */}
                                {index !== 0 && (
                                  <button
                                    onClick={() => makePrimaryLocalImage(index)}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg transform hover:scale-105"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    Set as Primary
                                  </button>
                                )}

                                {/* Action Buttons Row */}
                                <div className="flex gap-2">
                                  {/* Move Left */}
                                  {index > 0 && (
                                    <button
                                      onClick={() =>
                                        moveLocalImage(index, index - 1)
                                      }
                                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white/95 backdrop-blur-sm text-gray-800 text-sm font-semibold rounded-lg hover:bg-white transition-all shadow-md hover:shadow-lg"
                                      title="Move left"
                                    >
                                      <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2.5}
                                          d="M15 19l-7-7 7-7"
                                        />
                                      </svg>
                                    </button>
                                  )}

                                  {/* Remove Button */}
                                  <button
                                    onClick={() => removeLocalImage(index)}
                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
                                    title="Remove image"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                    Delete
                                  </button>

                                  {/* Move Right */}
                                  {index < localImages.length - 1 && (
                                    <button
                                      onClick={() =>
                                        moveLocalImage(index, index + 1)
                                      }
                                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white/95 backdrop-blur-sm text-gray-800 text-sm font-semibold rounded-lg hover:bg-white transition-all shadow-md hover:shadow-lg"
                                      title="Move right"
                                    >
                                      <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2.5}
                                          d="M9 5l7 7-7 7"
                                        />
                                      </svg>
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Image Info Footer */}
                          <div className="p-3 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-1.5 text-gray-700">
                                <svg
                                  className="w-3.5 h-3.5 text-gray-500"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="font-semibold">
                                  {(image.file_size / 1024 / 1024).toFixed(2)}{" "}
                                  MB
                                </span>
                              </div>
                              <span
                                className="text-gray-500 truncate max-w-[120px]"
                                title={image.file.name}
                              >
                                {image.file.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Modern Upload Tips */}
                    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 border-2 border-blue-200 rounded-xl p-5 shadow-sm">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                            Photography Tips
                            <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                              Pro Tips
                            </span>
                          </h4>
                          <ul className="text-sm text-gray-700 space-y-2.5">
                            <li className="flex items-start gap-2">
                              <svg
                                className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>
                                The{" "}
                                <strong className="text-blue-700">
                                  first photo
                                </strong>{" "}
                                will be your primary listing image
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <svg
                                className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>
                                Use{" "}
                                <strong>high-quality, well-lit images</strong> -
                                natural lighting works best
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <svg
                                className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>
                                Include photos of{" "}
                                <strong>all rooms, exterior views,</strong> and
                                special features
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <svg
                                className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>
                                Hover over any image to reorder or set as
                                primary photo
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <svg
                                className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>
                                Images are uploaded when you{" "}
                                <strong>submit the listing</strong> (not saved
                                yet)
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Contact */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Contact Information
                  </h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.contact_name}
                    onChange={(e) =>
                      handleInputChange("contact_name", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.contact_email}
                    onChange={(e) =>
                      handleInputChange("contact_email", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    placeholder="(802) 555-0123"
                    value={formData.contact_phone || ""}
                    onChange={(e) =>
                      handleInputChange("contact_phone", e.target.value)
                    }
                    className="w-full"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 6: Review */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Review Your Listing
                  </h2>
                  <p className="text-sm text-gray-600">
                    Please review your information before submitting. You can go
                    back to make changes.
                  </p>
                </div>

                {/* Property Overview Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <div className="flex items-start gap-4">
                    {localImages.length > 0 && localImages[0] && (
                      <img
                        src={localImages[0].preview}
                        alt="Primary"
                        className="w-32 h-32 object-cover rounded-lg shadow-md flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {formData.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>
                          {formData.street_address}, {formData.city},{" "}
                          {formData.state} {formData.zipcode}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-lg font-semibold text-blue-700">
                        <span className="text-3xl">
                          ${formData.list_price?.toLocaleString()}
                        </span>
                        {formData.listing_type === "rent" && (
                          <span className="text-sm font-normal text-gray-600">
                            /month
                          </span>
                        )}
                        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase">
                          For {formData.listing_type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Property Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Property Info */}
                  <div className="bg-white rounded-xl border-2 border-gray-200 p-5 hover:border-blue-300 transition-colors">
                    <div className="flex items-center gap-2 mb-4">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      <h4 className="font-bold text-gray-900">Property Type</h4>
                    </div>
                    <p className="text-gray-700 capitalize">
                      {formData.property_type.replace(/_/g, " ")}
                    </p>
                  </div>

                  {/* Bedrooms & Bathrooms */}
                  <div className="bg-white rounded-xl border-2 border-gray-200 p-5 hover:border-blue-300 transition-colors">
                    <div className="flex items-center gap-2 mb-4">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
                      </svg>
                      <h4 className="font-bold text-gray-900">Rooms</h4>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {formData.bedrooms}
                        </p>
                        <p className="text-xs text-gray-600">Bedrooms</p>
                      </div>
                      <div className="border-l border-gray-300"></div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {formData.bathrooms}
                        </p>
                        <p className="text-xs text-gray-600">Bathrooms</p>
                      </div>
                    </div>
                  </div>

                  {/* Square Feet */}
                  <div className="bg-white rounded-xl border-2 border-gray-200 p-5 hover:border-blue-300 transition-colors">
                    <div className="flex items-center gap-2 mb-4">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <h4 className="font-bold text-gray-900">Living Area</h4>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {formData.square_feet?.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600">Square Feet</p>
                    </div>
                  </div>

                  {/* Lot Size & Year */}
                  <div className="bg-white rounded-xl border-2 border-gray-200 p-5 hover:border-blue-300 transition-colors">
                    <div className="flex items-center gap-2 mb-4">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <h4 className="font-bold text-gray-900">Lot & Age</h4>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {formData.lot_size}
                        </p>
                        <p className="text-xs text-gray-600">Acres</p>
                      </div>
                      <div className="border-l border-gray-300"></div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {formData.year_built}
                        </p>
                        <p className="text-xs text-gray-600">Year Built</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-xl border-2 border-gray-200 p-5">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Description
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {formData.description}
                  </p>
                </div>

                {/* Photos */}
                <div className="bg-white rounded-xl border-2 border-gray-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Photos
                    </h4>
                    <span className="text-sm text-gray-600">
                      {localImages.length} image
                      {localImages.length !== 1 ? "s" : ""} ready to upload
                    </span>
                  </div>
                  {localImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {localImages.map((image, index) => (
                        <div
                          key={`preview-${image.id}-${index}`}
                          className="relative group"
                        >
                          <img
                            src={image.preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                          />
                          {index === 0 && (
                            <div className="absolute top-1 left-1">
                              <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                                Primary
                              </span>
                            </div>
                          )}
                          <div className="absolute bottom-1 right-1">
                            <span className="px-1.5 py-0.5 bg-black bg-opacity-60 text-white text-xs font-medium rounded">
                              #{index + 1}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-xl border-2 border-gray-200 p-5">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600 text-xs mb-1">Name</p>
                      <p className="font-semibold text-gray-900">
                        {formData.contact_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs mb-1">Email</p>
                      <p className="font-semibold text-gray-900">
                        {formData.contact_email}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs mb-1">Phone</p>
                      <p className="font-semibold text-gray-900">
                        {formData.contact_phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Important Notice */}
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-5">
                  <div className="flex gap-3">
                    <svg
                      className="w-6 h-6 text-amber-600 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h5 className="font-bold text-amber-900 mb-1">
                        Important Notice
                      </h5>
                      <p className="text-sm text-amber-800">
                        Your listing will be reviewed by our team before being
                        published. You will receive an email notification once
                        your listing has been approved or if any changes are
                        needed. This typically takes 24-48 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="secondary"
                className="px-6 w-full sm:w-auto order-2 sm:order-1"
              >
                Previous
              </Button>

              {currentStep < STEPS.length ? (
                <Button
                  onClick={nextStep}
                  className="px-6 w-full sm:w-auto order-1 sm:order-2"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 w-full sm:w-auto order-1 sm:order-2"
                >
                  {isSubmitting ? "Submitting..." : "Submit Listing"}
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
