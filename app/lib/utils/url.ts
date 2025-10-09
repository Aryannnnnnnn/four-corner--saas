// Get query params from URL
export const getQueryParams = (url?: string): Record<string, string> => {
  if (typeof window === "undefined") return {};

  const searchParams = new URLSearchParams(url || window.location.search);
  const params: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
};

// Build URL with query params
export const buildUrl = (
  baseUrl: string,
  params: Record<string, string | number | boolean | undefined>,
): string => {
  const url = new URL(baseUrl, window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
};

// Remove query params from URL
export const removeQueryParams = (
  url: string,
  paramsToRemove: string[],
): string => {
  const urlObj = new URL(url, window.location.origin);

  paramsToRemove.forEach((param) => {
    urlObj.searchParams.delete(param);
  });

  return urlObj.toString();
};

// Check if URL is absolute
export const isAbsoluteUrl = (url: string): boolean => {
  return /^https?:\/\//i.test(url);
};

// Get domain from URL
export const getDomain = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
};

// Normalize URL
export const normalizeUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.toString().replace(/\/+$/, "");
  } catch {
    return url;
  }
};
