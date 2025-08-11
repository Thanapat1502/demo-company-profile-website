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
const ButtonWrapper = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <Button ref={ref} {...props} />;
  }
);

ButtonWrapper.displayName = 'ButtonWrapper';

// Export the component as default
export default ButtonWrapper;

// Also export the ButtonProps type for convenience
export type { ButtonProps } from '@heroui/react';