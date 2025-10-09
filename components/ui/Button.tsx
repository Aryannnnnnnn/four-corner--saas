import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/app/lib/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap",
          {
            "luxury-button": variant === "primary",
            "bg-gray-200 hover:bg-gray-300 text-gray-900 border border-gray-300":
              variant === "secondary",
            "bg-transparent hover:bg-gray-100 text-gray-700": variant === "ghost",
            "bg-red-500 hover:bg-red-600 text-white": variant === "danger",
            "px-3 py-1.5 text-sm min-h-[32px]": size === "sm",
            "px-6 py-2.5 text-base min-h-[40px]": size === "md",
            "px-8 py-3 text-lg min-h-[48px]": size === "lg",
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
