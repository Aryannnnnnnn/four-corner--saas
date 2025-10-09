// Custom error class
export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
    public meta?: any,
  ) {
    super(message);
    this.name = "AppError";
  }
}

// Error handler
export const handleError = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unknown error occurred";
};

// Async error wrapper
export const asyncErrorHandler = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
): ((...args: Parameters<T>) => Promise<ReturnType<T> | null>) => {
  return async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error("Async error:", error);
      return null;
    }
  };
};

// Log error to service
export const logError = (error: Error, context?: any): void => {
  if (process.env.NODE_ENV === "production") {
    // In production, send to error tracking service
    console.error("Error logged:", {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
    });

    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
  } else {
    // In development, just log to console
    console.error("Error:", error, "Context:", context);
  }
};
