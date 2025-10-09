import { z } from "zod";

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

export const getPasswordStrength = (
  password: string,
): {
  score: number;
  feedback: string;
} => {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  const feedback =
    ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"][
      Math.min(score, 5)
    ] || "Very Weak";

  return { score, feedback };
};

// US Address validation
export const isValidAddress = (address: string): boolean => {
  const addressRegex =
    /^\d+\s+[\w\s]+,?\s+[\w\s]+,?\s+[A-Z]{2}\s+\d{5}(-\d{4})?$/i;
  return addressRegex.test(address.trim());
};

// Phone number validation
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-()]+$/;
  const cleanPhone = phone.replace(/[\s\-()]/g, "");
  return phoneRegex.test(phone) && cleanPhone.length === 10;
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Credit card validation (Luhn algorithm)
export const isValidCreditCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\s/g, "");
  if (!/^\d+$/.test(cleaned)) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]!, 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

// Zipcode validation
export const isValidZipcode = (zipcode: string): boolean => {
  const zipcodeRegex = /^\d{5}(-\d{4})?$/;
  return zipcodeRegex.test(zipcode);
};

// Price validation
export const isValidPrice = (price: string | number): boolean => {
  const numPrice =
    typeof price === "string" ? parseFloat(price.replace(/[$,]/g, "")) : price;
  return !Number.isNaN(numPrice) && numPrice > 0;
};

// Zod schemas for complex validation
export const propertyAddressSchema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
});

export const userRegistrationSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  location: z
    .string()
    .max(100, "Location must be less than 100 characters")
    .optional(),
});
