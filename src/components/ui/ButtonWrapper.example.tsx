/**
 * ButtonWrapper Usage Examples
 * 
 * This file demonstrates how to use ButtonWrapper in various scenarios
 * within server-side rendered pages and components.
 */

import Link from 'next/link';
import { Download, ArrowRight, Heart, Share } from 'lucide-react';
import ButtonWrapper from '@/components/ui/ButtonWrapper';

// Example 1: Basic usage in a server component
export function BasicButtonExample() {
  return (
    <div className="space-y-4">
      {/* Primary button */}
      <ButtonWrapper color="primary" size="lg">
        Primary Button
      </ButtonWrapper>

      {/* Secondary button with variant */}
      <ButtonWrapper color="secondary" variant="bordered">
        Secondary Button
      </ButtonWrapper>

      {/* Button with icon */}
      <ButtonWrapper 
        color="success" 
        startContent={<Download className="w-4 h-4" />}
      >
        Download File
      </ButtonWrapper>
    </div>
  );
}

// Example 2: Button as Link (Next.js Link component)
export function LinkButtonExample() {
  return (
    <div className="space-y-4">
      {/* Internal link */}
      <ButtonWrapper
        as={Link}
        href="/products-services"
        color="primary"
        variant="solid"
        endContent={<ArrowRight className="w-4 h-4" />}
      >
        View Services
      </ButtonWrapper>

      {/* External link */}
      <ButtonWrapper
        as={Link}
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
        color="default"
        variant="bordered"
      >
        External Link
      </ButtonWrapper>
    </div>
  );
}

// Example 3: Different sizes and variants
export function SizeVariantExample() {
  return (
    <div className="space-y-4">
      {/* Different sizes */}
      <div className="flex gap-2 items-center">
        <ButtonWrapper size="sm" color="primary">Small</ButtonWrapper>
        <ButtonWrapper size="md" color="primary">Medium</ButtonWrapper>
        <ButtonWrapper size="lg" color="primary">Large</ButtonWrapper>
      </div>

      {/* Different variants */}
      <div className="flex gap-2 flex-wrap">
        <ButtonWrapper variant="solid" color="primary">Solid</ButtonWrapper>
        <ButtonWrapper variant="bordered" color="primary">Bordered</ButtonWrapper>
        <ButtonWrapper variant="light" color="primary">Light</ButtonWrapper>
        <ButtonWrapper variant="flat" color="primary">Flat</ButtonWrapper>
        <ButtonWrapper variant="faded" color="primary">Faded</ButtonWrapper>
        <ButtonWrapper variant="shadow" color="primary">Shadow</ButtonWrapper>
        <ButtonWrapper variant="ghost" color="primary">Ghost</ButtonWrapper>
      </div>
    </div>
  );
}

// Example 4: Different colors
export function ColorExample() {
  return (
    <div className="flex gap-2 flex-wrap">
      <ButtonWrapper color="default">Default</ButtonWrapper>
      <ButtonWrapper color="primary">Primary</ButtonWrapper>
      <ButtonWrapper color="secondary">Secondary</ButtonWrapper>
      <ButtonWrapper color="success">Success</ButtonWrapper>
      <ButtonWrapper color="warning">Warning</ButtonWrapper>
      <ButtonWrapper color="danger">Danger</ButtonWrapper>
    </div>
  );
}

// Example 5: Buttons with loading and disabled states
export function StateExample() {
  return (
    <div className="space-y-4">
      {/* Loading state */}
      <ButtonWrapper color="primary" isLoading>
        Loading Button
      </ButtonWrapper>

      {/* Disabled state */}
      <ButtonWrapper color="primary" isDisabled>
        Disabled Button
      </ButtonWrapper>

      {/* Icon only button */}
      <ButtonWrapper 
        color="primary" 
        isIconOnly 
        aria-label="Like"
      >
        <Heart className="w-4 h-4" />
      </ButtonWrapper>
    </div>
  );
}

// Example 6: Full-width and custom styling
export function CustomStylingExample() {
  return (
    <div className="space-y-4">
      {/* Full width button */}
      <ButtonWrapper 
        color="primary" 
        className="w-full"
      >
        Full Width Button
      </ButtonWrapper>

      {/* Custom styling */}
      <ButtonWrapper 
        color="primary"
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold"
        variant="shadow"
      >
        Custom Gradient Button
      </ButtonWrapper>

      {/* Rounded button */}
      <ButtonWrapper 
        color="secondary"
        className="rounded-full px-8"
        variant="bordered"
      >
        Rounded Button
      </ButtonWrapper>
    </div>
  );
}

// Example 7: Button groups
export function ButtonGroupExample() {
  return (
    <div className="space-y-4">
      {/* Horizontal button group */}
      <div className="flex gap-0">
        <ButtonWrapper 
          color="primary" 
          variant="bordered"
          className="rounded-r-none border-r-0"
        >
          Left
        </ButtonWrapper>
        <ButtonWrapper 
          color="primary" 
          variant="bordered"
          className="rounded-none border-r-0"
        >
          Middle
        </ButtonWrapper>
        <ButtonWrapper 
          color="primary" 
          variant="bordered"
          className="rounded-l-none"
        >
          Right
        </ButtonWrapper>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 justify-center">
        <ButtonWrapper 
          color="primary"
          startContent={<Share className="w-4 h-4" />}
        >
          Share
        </ButtonWrapper>
        <ButtonWrapper 
          color="success"
          startContent={<Download className="w-4 h-4" />}
        >
          Download
        </ButtonWrapper>
      </div>
    </div>
  );
}

// Example 8: Usage in a complete server component
export default function ButtonWrapperExamples() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-4">Basic Buttons</h2>
        <BasicButtonExample />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Link Buttons</h2>
        <LinkButtonExample />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Sizes & Variants</h2>
        <SizeVariantExample />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Colors</h2>
        <ColorExample />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">States</h2>
        <StateExample />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Custom Styling</h2>
        <CustomStylingExample />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Button Groups</h2>
        <ButtonGroupExample />
      </div>
    </div>
  );
}
