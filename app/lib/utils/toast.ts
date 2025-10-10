// Toast notification utility with modern UI
type ToastType = "success" | "error" | "info" | "warning";

interface ToastOptions {
  duration?: number;
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
}

export const showToast = (
  message: string,
  type: ToastType,
  options: ToastOptions = {},
) => {
  if (typeof window === "undefined") return;

  const { duration = 3000, position = "top-right" } = options;

  // Create toast container if it doesn't exist
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.style.cssText = `
      position: fixed;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  // Set position
  const positions = {
    "top-right": "top: 1rem; right: 1rem;",
    "top-center": "top: 1rem; left: 50%; transform: translateX(-50%);",
    "top-left": "top: 1rem; left: 1rem;",
    "bottom-right": "bottom: 1rem; right: 1rem;",
    "bottom-center": "bottom: 1rem; left: 50%; transform: translateX(-50%);",
    "bottom-left": "bottom: 1rem; left: 1rem;",
  };
  container.style.cssText += positions[position];

  // Create toast element
  const toast = document.createElement("div");
  toast.style.cssText = `
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
    padding: 1rem 1.25rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    font-size: 0.875rem;
    font-weight: 500;
    pointer-events: auto;
    animation: slideIn 0.3s ease-out;
    max-width: 400px;
    word-wrap: break-word;
  `;

  // Type-specific styling
  const styles = {
    success: {
      bg: "#10b981",
      icon: `<svg style="width: 1.25rem; height: 1.25rem; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>`,
    },
    error: {
      bg: "#ef4444",
      icon: `<svg style="width: 1.25rem; height: 1.25rem; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>`,
    },
    info: {
      bg: "#3b82f6",
      icon: `<svg style="width: 1.25rem; height: 1.25rem; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>`,
    },
    warning: {
      bg: "#f59e0b",
      icon: `<svg style="width: 1.25rem; height: 1.25rem; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>`,
    },
  };

  const style = styles[type];
  toast.style.backgroundColor = style.bg;
  toast.style.color = "white";

  toast.innerHTML = `
    ${style.icon}
    <span style="flex: 1;">${message}</span>
    <button onclick="this.parentElement.remove()" style="background: rgba(255,255,255,0.2); border: none; color: white; width: 1.5rem; height: 1.5rem; border-radius: 0.25rem; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
      <svg style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  `;

  // Add animation styles
  if (!document.getElementById("toast-styles")) {
    const style = document.createElement("style");
    style.id = "toast-styles";
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  container.appendChild(toast);

  // Auto-remove after duration
  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

export const toast = {
  success: (message: string, options?: ToastOptions) =>
    showToast(message, "success", options),
  error: (message: string, options?: ToastOptions) =>
    showToast(message, "error", options),
  info: (message: string, options?: ToastOptions) =>
    showToast(message, "info", options),
  warning: (message: string, options?: ToastOptions) =>
    showToast(message, "warning", options),
};
