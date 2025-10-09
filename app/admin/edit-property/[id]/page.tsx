"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import type { PropertyListing, PropertyImage } from "@/app/lib/types/listings";
import toast, { Toaster } from "react-hot-toast";

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
  "Other"
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
          setExistingImages(data.images.sort((a: PropertyImage, b: PropertyImage) => a.display_order - b.display_order));
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes("price") || name.includes("rooms") || name.includes("feet") || name.includes("size") || name.includes("year") 
        ? parseFloat(value) || 0
        : value
    }));
  };

  // Image management functions
  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    
    const validFiles = Array.from(files).filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error(`${file.name} is too large (max 10MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setNewImages(prev => [...prev, ...validFiles]);
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
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (imageId: string) => {
    setImagesToDelete(prev => [...prev, imageId]);
    setExistingImages(prev => prev.filter(img => img.id !== imageId));
  };

  const restoreExistingImage = (imageId: string) => {
    setImagesToDelete(prev => prev.filter(id => id !== imageId));
    // Re-fetch the property to restore the image
    fetchProperty();
  };

  const reorderImages = (dragIndex: number, hoverIndex: number) => {
    setExistingImages(prev => {
      const draggedImage = prev[dragIndex];
      if (!draggedImage) return prev;
      
      const newImages = [...prev];
      newImages.splice(dragIndex, 1);
      newImages.splice(hoverIndex, 0, draggedImage);
      
      // Update display_order for all images
      return newImages.map((img, index) => ({
        ...img,
        display_order: index + 1
      }));
    });
  };

  const setPrimaryImage = (imageId: string) => {
    setExistingImages(prev => prev.map(img => ({
      ...img,
      is_primary: img.id === imageId
    })));
    
    // Provide user feedback
    toast.success('Primary image updated! Click "Save Changes" to persist this change.');
  };

  const uploadNewImages = async (): Promise<boolean> => {
    if (newImages.length === 0) return true;
    
    setUploadingImages(true);
    
    try {
      const uploadPromises = newImages.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('propertyListingId', propertyId);
        formData.append('displayOrder', '999'); // Will be reordered later
        
        const response = await fetch('/api/admin/images/upload', {
          method: 'POST',
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
      console.error('Error uploading images:', error);
      toast.error('Failed to upload some images');
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
        is_primary: image.is_primary
      }));
      
      console.log('Sending image updates:', updates);
      
      const response = await fetch(`/api/admin/listings/${propertyId}/images/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ images: updates }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update image order');
      }
      
      return true;
    } catch (error) {
      console.error('Error updating image order:', error);
      toast.error('Failed to update image order');
      return false;
    }
  };

  const deleteRemovedImages = async (): Promise<boolean> => {
    if (imagesToDelete.length === 0) return true;
    
    console.log('Deleting images:', imagesToDelete);
    console.log('Property ID:', propertyId);
    
    try {
      const deletePromises = imagesToDelete.map(async imageId => {
        console.log(`Attempting to delete image ${imageId} for property ${propertyId}`);
        const response = await fetch(`/api/admin/listings/${propertyId}/images/${imageId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          const errorData = await response.text();
          console.error(`Failed to delete image ${imageId}:`, response.status, errorData);
          return { success: false, imageId, error: errorData, status: response.status };
        }
        
        return { success: true, imageId };
      });
      
      const results = await Promise.all(deletePromises);
      const failedDeletes = results.filter(result => !result.success);
      
      if (failedDeletes.length > 0) {
        console.error('Failed to delete images:', failedDeletes);
        toast.error(`Failed to delete ${failedDeletes.length} image(s). Check console for details.`);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting images:', error);
      toast.error('Failed to delete some images');
      return false;
    }
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      // Step 1: Update property information
      const response = await fetch(`/api/admin/listings/${propertyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update property');
      }

      // Step 2: Delete removed images
      const deleteSuccess = await deleteRemovedImages();
      if (!deleteSuccess) {
        toast.error('Property updated but some images could not be deleted');
        return;
      }

      // Step 3: Upload new images
      const uploadSuccess = await uploadNewImages();
      if (!uploadSuccess) {
        toast.error('Property updated but some new images could not be uploaded');
        return;
      }

      // Step 4: Update image order and primary status
      const orderSuccess = await updateImageOrder();
      if (!orderSuccess) {
        toast.error('Property updated but image order could not be updated');
        return;
      }

      toast.success('Property updated successfully!');
      
      // Clear the new images and deleted images arrays
      setNewImages([]);
      setImagesToDelete([]);
      
      // Refresh the property data
      await fetchProperty();
      
    } catch (error) {
      console.error('Error saving property:', error);
      toast.error('Failed to update property');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Property Not Found</h2>
        <p className="text-gray-600 mt-2">The requested property could not be found.</p>
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
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
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
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
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
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
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
            <label htmlFor="street_address" className="block text-sm font-medium text-gray-700 mb-1">
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
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
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
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
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
              {US_STATES.map(state => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-1">
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
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="property_type" className="block text-sm font-medium text-gray-700 mb-1">
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
              {PROPERTY_TYPES.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="listing_type" className="block text-sm font-medium text-gray-700 mb-1">
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
            <label htmlFor="list_price" className="block text-sm font-medium text-gray-700 mb-1">
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
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
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
            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
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
            <label htmlFor="square_feet" className="block text-sm font-medium text-gray-700 mb-1">
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
            <label htmlFor="lot_size" className="block text-sm font-medium text-gray-700 mb-1">
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
            <label htmlFor="year_built" className="block text-sm font-medium text-gray-700 mb-1">
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
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact_name" className="block text-sm font-medium text-gray-700 mb-1">
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
            <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-1">
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
            <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700 mb-1">
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
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Property Images</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Image Management Instructions</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use the ↑↓ buttons to reorder existing images</li>
            <li>• Click the star icon to set an image as primary (main image)</li>
            <li>• Click the trash icon to mark images for deletion</li>
            <li>• Use "Restore" to undo deletion before saving</li>
            <li>• Drag & drop or click to upload new images</li>
            <li>• Changes are saved when you click "Save Changes"</li>
          </ul>
        </div>
        
        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-700 mb-3">Current Images</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {existingImages.map((image, index) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={image.s3_url}
                      alt={`Property image ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Image Controls */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 flex flex-wrap gap-1 p-2 justify-center">
                      {/* Move Up Button */}
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => reorderImages(index, index - 1)}
                          className="bg-gray-600 text-white p-1 rounded-full hover:bg-gray-700 transition-colors"
                          title="Move up"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                      )}
                      
                      {/* Move Down Button */}
                      {index < existingImages.length - 1 && (
                        <button
                          type="button"
                          onClick={() => reorderImages(index, index + 1)}
                          className="bg-gray-600 text-white p-1 rounded-full hover:bg-gray-700 transition-colors"
                          title="Move down"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                      
                      {!image.is_primary && (
                        <button
                          type="button"
                          onClick={() => setPrimaryImage(image.id)}
                          className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition-colors"
                          title="Set as primary"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeExistingImage(image.id)}
                        className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        title="Remove image"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Primary Badge */}
                  {image.is_primary && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      Primary
                    </div>
                  )}
                  
                  {/* Order Badge */}
                  <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* New Images to Upload */}
        {newImages.length > 0 && (
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-700 mb-3">New Images to Upload</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {newImages.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`New image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    title="Remove image"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  {/* File Name */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-2 truncate">
                    {file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Images Marked for Deletion */}
        {imagesToDelete.length > 0 && (
          <div className="mb-6">
            <h3 className="text-md font-medium text-red-700 mb-3">Images Marked for Deletion</h3>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600 mb-3">
                The following images will be permanently deleted when you save. Click "Restore" to undo.
              </p>
              <div className="flex flex-wrap gap-2">
                {imagesToDelete.map((imageId, index) => (
                  <div key={imageId} className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-red-200">
                    <span className="text-sm text-gray-700">Image {index + 1}</span>
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
        
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-sm text-gray-600 mb-2">
            Drag and drop images here, or click to select files
          </p>
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
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 cursor-pointer transition-colors"
          >
            Select Images
          </label>
          <p className="text-xs text-gray-500 mt-2">
            Maximum file size: 10MB per image. Supported formats: JPG, PNG, GIF, WebP
          </p>
        </div>
        
        {/* Upload Progress */}
        {uploadingImages && (
          <div className="mt-4 bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm text-blue-700">Uploading images...</span>
            </div>
          </div>
        )}
      </div>

      {/* Property Status Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Property Status</h3>
        <div className="flex items-center gap-4 text-sm">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            property.status === 'approved' ? 'bg-green-100 text-green-800' :
            property.status === 'rejected' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
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