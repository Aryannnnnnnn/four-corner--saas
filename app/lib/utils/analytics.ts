// Track page view
export const trackPageView = (url: string, title: string): void => {
  if (typeof window === "undefined") return;

  // Google Analytics
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID!, {
      page_path: url,
      page_title: title,
    });
  }

  // Add other analytics services here
};

// Track event
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number,
): void => {
  if (typeof window === "undefined") return;

  // Google Analytics
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Add other analytics services here
};

// Track property analysis
export const trackPropertyAnalysis = (address: string, grade: string): void => {
  trackEvent("Property", "Analyze", address, grade.charCodeAt(0));
};

// Track export
export const trackExport = (format: "pdf" | "docx" | "txt"): void => {
  trackEvent("Export", "Download", format);
};

// Track authentication
export const trackAuth = (action: "login" | "register" | "logout"): void => {
  trackEvent("Auth", action);
};

// Track error
export const trackError = (error: string, fatal: boolean = false): void => {
  trackEvent("Error", fatal ? "Fatal" : "Non-Fatal", error);
};

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
