interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  message = "Loading...",
  fullScreen = true,
}: LoadingSpinnerProps) {
  const containerClass = fullScreen
    ? "min-h-screen flex items-center justify-center"
    : "flex items-center justify-center py-12";

  return (
    <div className={containerClass}>
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-luxury-blue border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-white/70">{message}</p>
      </div>
    </div>
  );
}
