"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import type { PropertyListing, PropertyImage } from "@/app/lib/types/listings";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

const PROPERTY_TYPES = [
  "Single Family Home",
  "Townhouse",
  "Condominium",
  "Multi-Family",
  "Vacant Land",
  "Commercial",
  "Other",
];

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params.id as string;

  const [property, setProperty] = useState<PropertyListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Image management state
  const [existingImages, setExistingImages] = useState<PropertyImage[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    street_address: "",
    city: "",
    state: "",
    zipcode: "",
    property_type: "",
    listing_type: "sale" as "sale" | "rent",
    list_price: 0,
    bedrooms: 0,
    bathrooms: 0,
    square_feet: 0,
    lot_size: 0,
    year_built: 0,
    contact_name: "",
    contact_email: "",
    contact_phone: "",
  });

  useEffect(() => {
    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  const fetchProperty = async () => {
    try {
      const response = await fetch(`/api/admin/listings/${propertyId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch property");
      }

      const result = await response.json();
      const data = result.property;

      if (data) {
        setProperty(data);
        setFormData({
          title: data.title || "",
          description: data.description || "",
          street_address: data.street_address || "",
          city: data.city || "",
          state: data.state || "",
          zipcode: data.zipcode || "",
          property_type: data.property_type || "",
          listing_type: data.listing_type || "sale",
          list_price: data.list_price || 0,
          bedrooms: data.bedrooms || 0,
          bathrooms: data.bathrooms || 0,
          square_feet: data.square_feet || 0,
          lot_size: data.lot_size || 0,
          year_built: data.year_built || 0,
          contact_name: data.contact_name || "",
          contact_email: data.contact_email || "",
          contact_phone: data.contact_phone || "",
        });

        // Set existing images if they exist
        if (data.images && Array.isArray(data.images)) {
          setExistingImages(
            data.images.sort(
              (a: PropertyImage, b: PropertyImage) =>
                a.display_order - b.display_order,
            ),
          );
        } else {
          setExistingImages([]);
        }
      }
    } catch (error) {
      console.error("Error fetching property:", error);
      toast.error("Failed to load property information");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name.includes("price") ||
        name.includes("rooms") ||
        name.includes("feet") ||
        name.includes("size") ||
        name.includes("year")
          ? parseFloat(value) || 0
          : value,
    }));
  };

  // Image management functions
  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image file`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        toast.error(`${file.name} is too large (max 10MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setNewImages((prev) => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} image(s) selected for upload`);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (imageId: string) => {
    setImagesToDelete((prev) => [...prev, imageId]);
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const restoreExistingImage = (imageId: string) => {
    setImagesToDelete((prev) => prev.filter((id) => id !== imageId));
    // Re-fetch the property to restore the image
    fetchProperty();
  };

  const reorderImages = (dragIndex: number, hoverIndex: number) => {
    setExistingImages((prev) => {
      const draggedImage = prev[dragIndex];
      if (!draggedImage) return prev;

      const newImages = [...prev];
      newImages.splice(dragIndex, 1);
      newImages.splice(hoverIndex, 0, draggedImage);

      // Update display_order for all images
      return newImages.map((img, index) => ({
        ...img,
        display_order: index + 1,
      }));
    });
  };

  const setPrimaryImage = (imageId: string) => {
    setExistingImages((prev) =>
      prev.map((img) => ({
        ...img,
        is_primary: img.id === imageId,
      })),
    );

    // Provide user feedback
    toast.success(
      'Primary image updated! Click "Save Changes" to persist this change.',
    );
  };

  const uploadNewImages = async (): Promise<boolean> => {
    if (newImages.length === 0) return true;

    setUploadingImages(true);

    try {
      const uploadPromises = newImages.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("propertyListingId", propertyId);
        formData.append("displayOrder", "999"); // Will be reordered later

        const response = await fetch("/api/admin/images/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        return response.json();
      });

      await Promise.all(uploadPromises);
      return true;
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload some images");
      return false;
    } finally {
      setUploadingImages(false);
    }
  };

  const updateImageOrder = async (): Promise<boolean> => {
    try {
      // Update display order for existing images
      const updates = existingImages.map((image, index) => ({
        id: image.id,
        display_order: index + 1,
        is_primary: image.is_primary,
      }));

      console.log("Sending image updates:", updates);

      const response = await fetch(
        `/api/admin/listings/${propertyId}/images/reorder`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ images: updates }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update image order");
      }

      return true;
    } catch (error) {
      console.error("Error updating image order:", error);
      toast.error("Failed to update image order");
      return false;
    }
  };

  const deleteRemovedImages = async (): Promise<boolean> => {
    if (imagesToDelete.length === 0) return true;

    console.log("Deleting images:", imagesToDelete);
    console.log("Property ID:", propertyId);

    try {
      const deletePromises = imagesToDelete.map(async (imageId) => {
        console.log(
          `Attempting to delete image ${imageId} for property ${propertyId}`,
        );
        const response = await fetch(
          `/api/admin/listings/${propertyId}/images/${imageId}`,
          {
            method: "DELETE",
          },
        );

        if (!response.ok) {
          const errorData = await response.text();
          console.error(
            `Failed to delete image ${imageId}:`,
            response.status,
            errorData,
          );
          return {
            success: false,
            imageId,
            error: errorData,
            status: response.status,
          };
        }

        return { success: true, imageId };
      });

      const results = await Promise.all(deletePromises);
      const failedDeletes = results.filter((result) => !result.success);

      if (failedDeletes.length > 0) {
        console.error("Failed to delete images:", failedDeletes);
        toast.error(
          `Failed to delete ${failedDeletes.length} image(s). Check console for details.`,
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error deleting images:", error);
      toast.error("Failed to delete some images");
      return false;
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      // Step 1: Update property information
      const response = await fetch(`/api/admin/listings/${propertyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update property");
      }

      // Step 2: Delete removed images
      const deleteSuccess = await deleteRemovedImages();
      if (!deleteSuccess) {
        toast.error("Property updated but some images could not be deleted");
        return;
      }

      // Step 3: Upload new images
      const uploadSuccess = await uploadNewImages();
      if (!uploadSuccess) {
        toast.error(
          "Property updated but some new images could not be uploaded",
        );
        return;
      }

      // Step 4: Update image order and primary status
      const orderSuccess = await updateImageOrder();
      if (!orderSuccess) {
        toast.error("Property updated but image order could not be updated");
        return;
      }

      toast.success("Property updated successfully!");

      // Clear the new images and deleted images arrays
      setNewImages([]);
      setImagesToDelete([]);

      // Refresh the property data
      await fetchProperty();
    } catch (error) {
      console.error("Error saving property:", error);
      toast.error("Failed to update property");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading property..." />;
  }

  if (!property) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">
          Property Not Found
        </h2>
        <p className="text-gray-600 mt-2">
          The requested property could not be found.
        </p>
        <button
          onClick={() => router.push("/admin/all")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to All Listings
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Property</h1>
          <p className="text-gray-600">
            Update property information for: {property.title}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/admin/all")}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Property Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label
              htmlFor="street_address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Street Address *
            </label>
            <input
              type="text"
              id="street_address"
              name="street_address"
              value={formData.street_address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              State *
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              required
            >
              <option value="">Select State</option>
              {US_STATES.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="zipcode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ZIP Code *
            </label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              required
            />
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Property Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="property_type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Property Type *
            </label>
            <select
              id="property_type"
              name="property_type"
              value={formData.property_type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              required
            >
              <option value="">Select Type</option>
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="listing_type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Listing Type *
            </label>
            <select
              id="listing_type"
              name="listing_type"
              value={formData.listing_type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              required
            >
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="list_price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price ($) *
            </label>
            <input
              type="number"
              id="list_price"
              name="list_price"
              value={formData.list_price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              min="0"
              required
            />
          </div>

          <div>
            <label
              htmlFor="bedrooms"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bedrooms
            </label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              min="0"
            />
          </div>

          <div>
            <label
              htmlFor="bathrooms"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bathrooms
            </label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              step="0.5"
              value={formData.bathrooms}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              min="0"
            />
          </div>

          <div>
            <label
              htmlFor="square_feet"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Square Feet
            </label>
            <input
              type="number"
              id="square_feet"
              name="square_feet"
              value={formData.square_feet}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              min="0"
            />
          </div>

          <div>
            <label
              htmlFor="lot_size"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Lot Size (sqft)
            </label>
            <input
              type="number"
              id="lot_size"
              name="lot_size"
              value={formData.lot_size}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              min="0"
            />
          </div>

          <div>
            <label
              htmlFor="year_built"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Year Built
            </label>
            <input
              type="number"
              id="year_built"
              name="year_built"
              value={formData.year_built}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              min="1800"
              max={new Date().getFullYear()}
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="contact_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contact Name *
            </label>
            <input
              type="text"
              id="contact_name"
              name="contact_name"
              value={formData.contact_name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="contact_email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contact Email *
            </label>
            <input
              type="email"
              id="contact_email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="contact_phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contact Phone
            </label>
            <input
              type="tel"
              id="contact_phone"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            />
          </div>
        </div>
      </div>

      {/* Image Management */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Property Images
        </h2>
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 border-2 border-blue-200 rounded-xl p-5 shadow-sm mb-6">
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
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                Image Management Guide
                <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                  Admin
                </span>
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
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
                    Hover over images to access{" "}
                    <strong>reorder, set primary, and delete</strong> controls
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
                    Click the <strong>star icon</strong> to set an image as the
                    primary listing photo
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
                    Use <strong>"Restore"</strong> to undo image deletions
                    before saving
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
                    All changes are applied when you click{" "}
                    <strong>"Save Changes"</strong> at the top
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Current Images ({existingImages.length})
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  Hover over images to access management controls
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {existingImages.map((image, index) => (
                <div
                  key={image.id}
                  className="relative group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-400 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Primary Badge */}
                  {image.is_primary && (
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

                  {/* Order Badge */}
                  <div className="absolute top-3 right-3 z-20">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold bg-gray-900/80 backdrop-blur-sm text-white shadow-lg">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 relative">
                    <Image
                      src={image.s3_url}
                      alt={`Property image ${index + 1}`}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Hover Overlay with Controls */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                      <div className="w-full p-4 space-y-2">
                        {/* Set as Primary Button */}
                        {!image.is_primary && (
                          <button
                            type="button"
                            onClick={() => setPrimaryImage(image.id)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg transform hover:scale-105"
                            title="Set as primary"
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
                          {/* Move Up */}
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => reorderImages(index, index - 1)}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white/95 backdrop-blur-sm text-gray-800 text-sm font-semibold rounded-lg hover:bg-white transition-all shadow-md hover:shadow-lg"
                              title="Move up"
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
                                  d="M5 15l7-7 7 7"
                                />
                              </svg>
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => removeExistingImage(image.id)}
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

                          {/* Move Down */}
                          {index < existingImages.length - 1 && (
                            <button
                              type="button"
                              onClick={() => reorderImages(index, index + 1)}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white/95 backdrop-blur-sm text-gray-800 text-sm font-semibold rounded-lg hover:bg-white transition-all shadow-md hover:shadow-lg"
                              title="Move down"
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
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Images to Upload */}
        {newImages.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  New Images to Upload ({newImages.length})
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  These will be added when you save changes
                </p>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {newImages.map((file, index) => (
                <div
                  key={index}
                  className="relative group bg-white rounded-xl border-2 border-green-200 overflow-hidden hover:shadow-xl hover:border-green-400 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* New Badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      New
                    </span>
                  </div>

                  {/* Image */}
                  <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-100 via-gray-50 to-green-50 relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`New image ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Hover Overlay with Remove */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                      <div className="w-full p-4">
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-all shadow-lg transform hover:scale-105"
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
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* File Name Footer */}
                  <div className="p-3 bg-gradient-to-r from-gray-50 to-green-50 border-t border-green-200">
                    <p
                      className="text-xs text-gray-700 truncate font-medium"
                      title={file.name}
                    >
                      {file.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Images Marked for Deletion */}
        {imagesToDelete.length > 0 && (
          <div className="mb-6">
            <h3 className="text-md font-medium text-red-700 mb-3">
              Images Marked for Deletion
            </h3>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600 mb-3">
                The following images will be permanently deleted when you save.
                Click "Restore" to undo.
              </p>
              <div className="flex flex-wrap gap-2">
                {imagesToDelete.map((imageId, index) => (
                  <div
                    key={imageId}
                    className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-red-200"
                  >
                    <span className="text-sm text-gray-700">
                      Image {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => restoreExistingImage(imageId)}
                      className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
                      title="Restore this image"
                    >
                      Restore
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modern Upload Area with Drag & Drop */}
        <div
          className={`border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden ${
            dragOver
              ? "h-56 border-blue-500 bg-gradient-to-br from-blue-100 to-indigo-100 shadow-lg scale-[1.02]"
              : "h-48 border-gray-300 bg-gradient-to-br from-gray-50 to-blue-50 hover:border-blue-400 hover:shadow-md"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-grid-pattern"></div>
          </div>

          <div className="flex flex-col items-center justify-center h-full pt-5 pb-6 relative z-10">
            {dragOver ? (
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
                  Release to upload property photos
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
                  Drag and drop images here
                </p>
                <p className="text-sm text-gray-500 mb-3">or</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-bold rounded-lg hover:from-blue-600 hover:to-indigo-700 cursor-pointer transition-all shadow-lg transform hover:scale-105"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  Select Images to Upload
                </label>
                <p className="text-xs text-gray-500 mt-3">
                  PNG, JPG, GIF, WebP up to 10MB each
                </p>
              </>
            )}
          </div>
        </div>

        {/* Upload Progress */}
        {uploadingImages && (
          <div className="mt-4 bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="text-sm text-blue-700">Uploading images...</span>
            </div>
          </div>
        )}
      </div>

      {/* Property Status Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Property Status
        </h3>
        <div className="flex items-center gap-4 text-sm">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              property.status === "approved"
                ? "bg-green-100 text-green-800"
                : property.status === "rejected"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {property.status.toUpperCase()}
          </span>
          <span className="text-gray-500">
            Last updated: {new Date(property.updated_at).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
