/**
 * Server-side Card components for SSR compatibility
 * Replaces HeroUI Card and CardBody components in server-rendered pages
 */

interface ServerCardProps {
  children: React.ReactNode;
  className?: string;
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
}

interface ServerCardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function ServerCard({ children, className = "", shadow = "md" }: ServerCardProps) {
  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl"
  };

  const baseClasses = "bg-white rounded-lg border border-gray-200 overflow-hidden";
  const shadowClass = shadowClasses[shadow];

  return (
    <div className={`${baseClasses} ${shadowClass} ${className}`}>
      {children}
    </div>
  );
}

export function ServerCardBody({ children, className = "" }: ServerCardBodyProps) {
  const baseClasses = "p-6";

  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
}

// Default export for convenience
export default ServerCard;
