# ButtonWrapper Component Guide

## Overview

The `ButtonWrapper` component is a client-side wrapper for the HeroUI Button component that allows you to use HeroUI buttons in server-side rendered pages without hydration errors.

## Problem Solved

When using HeroUI components directly in server-side rendered pages, you may encounter hydration mismatches because:
1. Server-side rendering generates static HTML
2. Client-side hydration expects interactive components
3. HeroUI Button has client-side interactivity that can cause mismatches

The `ButtonWrapper` solves this by:
- ✅ **Preventing hydration errors** in SSR pages
- ✅ **Maintaining full Button functionality** and props
- ✅ **Preserving TypeScript support** with proper types
- ✅ **Supporting all HeroUI Button features** (colors, variants, sizes, etc.)

## Installation & Usage

### Import the Component

```tsx
import ButtonWrapper from '@/components/ui/ButtonWrapper';
```

### Basic Usage

```tsx
// In a server component
export default function ServerPage() {
  return (
    <ButtonWrapper color="primary" size="lg">
      Click Me
    </ButtonWrapper>
  );
}
```

## API Reference

The `ButtonWrapper` accepts all the same props as the HeroUI `Button` component:

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Button content |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Button color theme |
| `variant` | `'solid' \| 'bordered' \| 'light' \| 'flat' \| 'faded' \| 'shadow' \| 'ghost'` | `'solid'` | Button variant style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Border radius |
| `startContent` | `ReactNode` | - | Content before button text |
| `endContent` | `ReactNode` | - | Content after button text |
| `isLoading` | `boolean` | `false` | Show loading spinner |
| `isDisabled` | `boolean` | `false` | Disable button interaction |
| `isIconOnly` | `boolean` | `false` | Icon-only button style |
| `fullWidth` | `boolean` | `false` | Full width button |
| `as` | `ElementType` | `'button'` | Render as different element |
| `href` | `string` | - | Link URL (when used with Link) |
| `onPress` | `(e: PressEvent) => void` | - | Press event handler |
| `className` | `string` | - | Additional CSS classes |

## Examples

### 1. Basic Buttons

```tsx
import ButtonWrapper from '@/components/ui/ButtonWrapper';

export function BasicButtons() {
  return (
    <div className="space-y-4">
      <ButtonWrapper color="primary">Primary</ButtonWrapper>
      <ButtonWrapper color="secondary" variant="bordered">Secondary</ButtonWrapper>
      <ButtonWrapper color="success" size="lg">Large Success</ButtonWrapper>
    </div>
  );
}
```

### 2. Buttons as Links

```tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ButtonWrapper from '@/components/ui/ButtonWrapper';

export function LinkButtons() {
  return (
    <div className="space-y-4">
      {/* Internal link */}
      <ButtonWrapper
        as={Link}
        href="/products-services"
        color="primary"
        endContent={<ArrowRight className="w-4 h-4" />}
      >
        View Services
      </ButtonWrapper>

      {/* External link */}
      <ButtonWrapper
        as={Link}
        href="https://example.com"
        target="_blank"
        color="default"
        variant="bordered"
      >
        External Link
      </ButtonWrapper>
    </div>
  );
}
```

### 3. Buttons with Icons

```tsx
import { Download, Heart, Share } from 'lucide-react';
import ButtonWrapper from '@/components/ui/ButtonWrapper';

export function IconButtons() {
  return (
    <div className="flex gap-4">
      {/* Button with start icon */}
      <ButtonWrapper 
        color="primary"
        startContent={<Download className="w-4 h-4" />}
      >
        Download
      </ButtonWrapper>

      {/* Icon-only button */}
      <ButtonWrapper 
        color="danger"
        isIconOnly
        aria-label="Like"
      >
        <Heart className="w-4 h-4" />
      </ButtonWrapper>

      {/* Button with end icon */}
      <ButtonWrapper 
        color="secondary"
        endContent={<Share className="w-4 h-4" />}
      >
        Share
      </ButtonWrapper>
    </div>
  );
}
```

### 4. Loading and Disabled States

```tsx
import ButtonWrapper from '@/components/ui/ButtonWrapper';

export function StateButtons() {
  return (
    <div className="space-y-4">
      <ButtonWrapper color="primary" isLoading>
        Loading...
      </ButtonWrapper>

      <ButtonWrapper color="primary" isDisabled>
        Disabled
      </ButtonWrapper>
    </div>
  );
}
```

### 5. Custom Styling

```tsx
import ButtonWrapper from '@/components/ui/ButtonWrapper';

export function CustomButtons() {
  return (
    <div className="space-y-4">
      {/* Full width */}
      <ButtonWrapper 
        color="primary" 
        className="w-full"
      >
        Full Width
      </ButtonWrapper>

      {/* Custom gradient */}
      <ButtonWrapper 
        color="primary"
        className="bg-gradient-to-r from-blue-500 to-purple-600"
        variant="shadow"
      >
        Gradient Button
      </ButtonWrapper>

      {/* Rounded */}
      <ButtonWrapper 
        color="secondary"
        className="rounded-full px-8"
      >
        Rounded
      </ButtonWrapper>
    </div>
  );
}
```

## Best Practices

### ✅ Do's

1. **Use in Server Components**: Perfect for server-side rendered pages
2. **Maintain Accessibility**: Always provide `aria-label` for icon-only buttons
3. **Use Semantic Colors**: Choose appropriate colors for actions (success for save, danger for delete)
4. **Consistent Sizing**: Use consistent button sizes throughout your app
5. **Proper Loading States**: Show loading state during async operations

### ❌ Don'ts

1. **Don't Mix with Regular Button**: Stick to either ButtonWrapper or Button consistently
2. **Don't Forget TypeScript**: Leverage the full TypeScript support
3. **Don't Overuse Custom Styling**: Use HeroUI's built-in variants when possible
4. **Don't Ignore Mobile**: Test button sizes on mobile devices

## Migration from Button

If you're migrating from the regular HeroUI Button:

```tsx
// Before (causes hydration errors in SSR)
import { Button } from '@heroui/react';

export default function ServerPage() {
  return <Button color="primary">Click Me</Button>;
}

// After (works perfectly in SSR)
import ButtonWrapper from '@/components/ui/ButtonWrapper';

export default function ServerPage() {
  return <ButtonWrapper color="primary">Click Me</ButtonWrapper>;
}
```

## TypeScript Support

The ButtonWrapper provides full TypeScript support:

```tsx
import ButtonWrapper, { ButtonProps } from '@/components/ui/ButtonWrapper';

// Custom button component with proper typing
interface CustomButtonProps extends ButtonProps {
  label: string;
  icon?: React.ReactNode;
}

function CustomButton({ label, icon, ...props }: CustomButtonProps) {
  return (
    <ButtonWrapper 
      startContent={icon}
      {...props}
    >
      {label}
    </ButtonWrapper>
  );
}
```

## Performance Considerations

- **Client-Side Only**: The wrapper is marked with `"use client"` so it only runs on the client
- **No Extra Overhead**: Direct passthrough to HeroUI Button with no additional logic
- **Tree Shaking**: Unused props are properly tree-shaken by bundlers
- **Ref Forwarding**: Supports ref forwarding for advanced use cases

## Troubleshooting

### Hydration Errors
If you still get hydration errors, ensure you're using ButtonWrapper instead of Button in server components.

### TypeScript Errors
Make sure you're importing the component correctly and that all required props are provided.

### Styling Issues
ButtonWrapper inherits all HeroUI Button styling. If custom styles aren't working, check CSS specificity.

## Related Components

- **HeroUI Button**: The underlying component
- **Next.js Link**: For navigation buttons
- **Lucide React**: For button icons

This ButtonWrapper provides a seamless way to use HeroUI buttons in server-side rendered applications while maintaining all the functionality and styling options you expect.
