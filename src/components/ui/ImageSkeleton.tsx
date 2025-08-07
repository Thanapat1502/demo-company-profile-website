"use client";

// Simple class name utility
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

interface ImageSkeletonProps {
  /**
   * Width of the skeleton container
   * Can be a string (e.g., "100px", "50%") or number (pixels)
   */
  width?: string | number;

  /**
   * Height of the skeleton container
   * Can be a string (e.g., "100px", "50%") or number (pixels)
   */
  height?: string | number;

  /**
   * Aspect ratio for responsive sizing (e.g., "16/9", "4/3", "1/1")
   */
  aspectRatio?: string;

  /**
   * Border radius variant
   */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";

  /**
   * Animation variant
   */
  animation?: "pulse" | "shimmer" | "wave" | "none";

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Show a placeholder icon in the center
   */
  showIcon?: boolean;

  /**
   * Icon size when showIcon is true
   */
  iconSize?: "sm" | "md" | "lg" | "xl";
}

export default function ImageSkeleton({
  width,
  height,
  aspectRatio,
  rounded = "md",
  animation = "pulse",
  className,
  showIcon = true,
  iconSize = "md",
}: ImageSkeletonProps) {
  // Convert width/height to CSS values
  const getSize = (size: string | number | undefined) => {
    if (typeof size === "number") return `${size}px`;
    return size;
  };

  // Get rounded class
  const getRoundedClass = () => {
    switch (rounded) {
      case "none":
        return "";
      case "sm":
        return "rounded-sm";
      case "md":
        return "rounded-md";
      case "lg":
        return "rounded-lg";
      case "xl":
        return "rounded-xl";
      case "2xl":
        return "rounded-2xl";
      case "3xl":
        return "rounded-3xl";
      case "full":
        return "rounded-full";
      default:
        return "rounded-md";
    }
  };

  // Get animation class
  const getAnimationClass = () => {
    switch (animation) {
      case "pulse":
        return "animate-pulse";
      case "shimmer":
        return "animate-shimmer";
      case "wave":
        return "animate-wave";
      case "none":
        return "";
      default:
        return "animate-pulse";
    }
  };

  // Get icon size class
  const getIconSizeClass = () => {
    switch (iconSize) {
      case "sm":
        return "w-6 h-6";
      case "md":
        return "w-8 h-8";
      case "lg":
        return "w-12 h-12";
      case "xl":
        return "w-16 h-16";
      default:
        return "w-8 h-8";
    }
  };

  const containerStyle: React.CSSProperties = {
    width: getSize(width),
    height: getSize(height),
    aspectRatio: aspectRatio,
  };

  return (
    <div
      className={cn(
        "relative bg-gray-200 overflow-hidden",
        getRoundedClass(),
        getAnimationClass(),
        className
      )}
      style={containerStyle}>
      {/* Shimmer effect overlay */}
      {animation === "shimmer" && (
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      )}

      {/* Wave effect overlay */}
      {animation === "wave" && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-wave" />
      )}

      {/* Placeholder icon */}
      {showIcon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className={cn("text-gray-400", getIconSizeClass())}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

// Predefined skeleton variants for common use cases
export const ImageSkeletonVariants = {
  // Card image skeletons
  cardImage: (props?: Partial<ImageSkeletonProps>) => (
    <ImageSkeleton
      aspectRatio="16/9"
      rounded="lg"
      animation="pulse"
      {...props}
    />
  ),

  // Avatar skeletons
  avatar: (props?: Partial<ImageSkeletonProps>) => (
    <ImageSkeleton
      aspectRatio="1/1"
      rounded="full"
      animation="pulse"
      showIcon={false}
      {...props}
    />
  ),

  // Hero image skeletons
  hero: (props?: Partial<ImageSkeletonProps>) => (
    <ImageSkeleton
      aspectRatio="21/9"
      rounded="none"
      animation="shimmer"
      iconSize="xl"
      {...props}
    />
  ),

  // Thumbnail skeletons
  thumbnail: (props?: Partial<ImageSkeletonProps>) => (
    <ImageSkeleton
      aspectRatio="4/3"
      rounded="md"
      animation="pulse"
      iconSize="sm"
      {...props}
    />
  ),

  // Gallery image skeletons
  gallery: (props?: Partial<ImageSkeletonProps>) => (
    <ImageSkeleton
      aspectRatio="1/1"
      rounded="lg"
      animation="shimmer"
      {...props}
    />
  ),
};
