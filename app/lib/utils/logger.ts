// app/lib/utils/logger.ts
/**
 * Production-safe logging utility
 * Only logs in development, silent in production
 */

const isDevelopment = process.env.NODE_ENV === "development";

export const logger = {
  /**
   * Log general information (only in development)
   */
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },

  /**
   * Log errors (always logs, but can be sent to error tracking service in production)
   */
  error: (...args: any[]) => {
    if (isDevelopment) {
      console.error(...args);
    } else {
      // In production, send to error tracking service (Sentry, etc.)
      // For now, we'll still log errors but they won't show in prod builds
      console.error("[Production Error]:", ...args);
    }
  },

  /**
   * Log warnings (only in development)
   */
  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },

  /**
   * Log debug information (only in development)
   */
  debug: (...args: any[]) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },

  /**
   * Log info (only in development)
   */
  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
};

/**
 * Helper for conditional debugging
 */
export const debugLog = (label: string, data: any) => {
  if (isDevelopment) {
    console.log(`[DEBUG ${label}]:`, data);
  }
};

/**
 * Performance logging (only in development)
 */
export const perfLog = (label: string, startTime: number) => {
  if (isDevelopment) {
    const duration = Date.now() - startTime;
    console.log(`[PERF ${label}]: ${duration}ms`);
  }
};
