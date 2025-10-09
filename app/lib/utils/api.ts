import type { PropertyData } from "@/app/lib/types/index";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: any;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const { method = "GET", headers = {}, body, cache, next } = options;

    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      cache,
      next,
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.message || `HTTP ${response.status}: ${response.statusText}`,
      );
    }

    return response.json();
  }

  // GET request
  async get<T>(
    endpoint: string,
    options?: Omit<RequestOptions, "method" | "body">,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  // POST request
  async post<T>(
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, "method">,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "POST", body });
  }

  // PUT request
  async put<T>(
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, "method">,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "PUT", body });
  }

  // PATCH request
  async patch<T>(
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, "method">,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "PATCH", body });
  }

  // DELETE request
  async delete<T>(
    endpoint: string,
    options?: Omit<RequestOptions, "method" | "body">,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

// Create singleton instance
export const api = new ApiClient("/api");

// Specific API methods
export const propertyApi = {
  analyze: (address: string) => api.post<PropertyData>("/analyze", { address }),

  getAll: () => api.get<{ properties: any[] }>("/properties"),

  getById: (id: string) => api.get<{ property: any }>(`/properties/${id}`),

  create: (data: { address: string; analysis_data: PropertyData }) =>
    api.post("/properties", data),

  update: (id: string, updates: any) => api.patch(`/properties/${id}`, updates),

  delete: (id: string) => api.delete(`/properties/${id}`),

  toggleFavorite: (id: string, isFavorite: boolean) =>
    api.patch(`/properties/${id}`, { is_favorite: isFavorite }),
};

export const userApi = {
  getSettings: () => api.get<{ settings: any }>("/user/settings"),

  updateSettings: (settings: any) => api.patch("/user/settings", settings),

  getProfile: () => api.get<{ profile: any }>("/user/profile"),

  updateProfile: (profile: any) => api.patch("/user/profile", profile),

  updateAccount: (data: { name?: string; email?: string }) =>
    api.patch("/user/account", data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.post("/user/password", data),

  generateApiKey: () => api.post<{ apiKey: string }>("/user/api-key"),

  exportData: () => api.get("/user/export"),

  deleteAccount: () => api.delete("/user/account"),
};
