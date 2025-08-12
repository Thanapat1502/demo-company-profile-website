"use client";

import { Button, ButtonProps } from '@heroui/react';
import { forwardRef } from 'react';

/**
 * ButtonWrapper - A client-side wrapper for HeroUI Button component
 *
 * This wrapper allows the HeroUI Button to be used in server-side rendered pages
 * without causing hydration errors. It maintains all the same props and functionality
 * as the original Button component.
 *
 * Usage:
 * - Use ButtonWrapper instead of Button in server components
 * - All Button props are supported (color, variant, size, etc.)
 * - Maintains the same API and behavior as HeroUI Button
 *
 * Example:
 * ```tsx
 * import ButtonWrapper from '@/components/ui/ButtonWrapper';
 *
 * // In a server component
 * export default function ServerPage() {
 *   return (
 *     <ButtonWrapper
 *       color="primary"
 *       variant="solid"
 *       size="lg"
 *       onPress={() => console.log('clicked')}
 *     >
 *       Click Me
 *     </ButtonWrapper>
 *   );
 * }
 * ```
 */
const PrimaryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <Button
      size="lg"
      ref={ref}
      {...props}
      className={`group relative px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white
                   rounded-lg font-medium text-md tracking-wide overflow-hidden
                   hover:from-primary-700 hover:to-primary-600 transition-all duration-500 ease-out
                   hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 ${props.className ?? ''}`}
    >
      {props.children}
      {/* Luxury Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                        bg-gradient-to-r from-transparent via-white/20 to-transparent
                        transition-transform duration-700 ease-out"></div>
    </Button>;
  }
);

PrimaryButton.displayName = 'PrimaryButton';

// Export the component as default
export default PrimaryButton;

// Also export the ButtonProps type for convenience
export type { ButtonProps } from '@heroui/react';