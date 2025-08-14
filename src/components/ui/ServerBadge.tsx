/**
 * Server-side Badge component for SSR compatibility
 * Replaces HeroUI Badge component in server-rendered pages
 */

interface ServerBadgeProps {
  children: React.ReactNode;
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "default";
  variant?: "solid" | "flat" | "bordered" | "light" | "faded" | "shadow";
  className?: string;
}

export default function ServerBadge({ 
  children, 
  color = "default", 
  variant = "solid",
  className = "" 
}: ServerBadgeProps) {
  // Define color classes based on color prop
  const colorClasses = {
    primary: {
      solid: "bg-blue-600 text-white",
      flat: "bg-blue-100 text-blue-800 border-blue-200",
      bordered: "border-2 border-blue-600 text-blue-600 bg-transparent",
      light: "bg-blue-50 text-blue-600",
      faded: "bg-blue-100/50 text-blue-700",
      shadow: "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
    },
    secondary: {
      solid: "bg-purple-600 text-white",
      flat: "bg-purple-100 text-purple-800 border-purple-200",
      bordered: "border-2 border-purple-600 text-purple-600 bg-transparent",
      light: "bg-purple-50 text-purple-600",
      faded: "bg-purple-100/50 text-purple-700",
      shadow: "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
    },
    success: {
      solid: "bg-green-600 text-white",
      flat: "bg-green-100 text-green-800 border-green-200",
      bordered: "border-2 border-green-600 text-green-600 bg-transparent",
      light: "bg-green-50 text-green-600",
      faded: "bg-green-100/50 text-green-700",
      shadow: "bg-green-600 text-white shadow-lg shadow-green-600/25"
    },
    warning: {
      solid: "bg-yellow-600 text-white",
      flat: "bg-yellow-100 text-yellow-800 border-yellow-200",
      bordered: "border-2 border-yellow-600 text-yellow-600 bg-transparent",
      light: "bg-yellow-50 text-yellow-600",
      faded: "bg-yellow-100/50 text-yellow-700",
      shadow: "bg-yellow-600 text-white shadow-lg shadow-yellow-600/25"
    },
    danger: {
      solid: "bg-red-600 text-white",
      flat: "bg-red-100 text-red-800 border-red-200",
      bordered: "border-2 border-red-600 text-red-600 bg-transparent",
      light: "bg-red-50 text-red-600",
      faded: "bg-red-100/50 text-red-700",
      shadow: "bg-red-600 text-white shadow-lg shadow-red-600/25"
    },
    default: {
      solid: "bg-gray-600 text-white",
      flat: "bg-gray-100 text-gray-800 border-gray-200",
      bordered: "border-2 border-gray-600 text-gray-600 bg-transparent",
      light: "bg-gray-50 text-gray-600",
      faded: "bg-gray-100/50 text-gray-700",
      shadow: "bg-gray-600 text-white shadow-lg shadow-gray-600/25"
    }
  };

  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors";
  const variantClasses = colorClasses[color][variant];

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
}
