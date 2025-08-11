/**
 * ButtonWrapper Component Tests
 * 
 * These tests verify that ButtonWrapper properly wraps the HeroUI Button
 * and maintains all functionality while being safe for SSR.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonWrapper from '../ButtonWrapper';
import { Download } from 'lucide-react';

// Mock HeroUI Button to avoid dependency issues in tests
jest.mock('@heroui/react', () => ({
  Button: React.forwardRef<HTMLButtonElement, any>(({ children, ...props }, ref) => (
    <button ref={ref} {...props} data-testid="heroui-button">
      {children}
    </button>
  )),
}));

describe('ButtonWrapper', () => {
  it('renders correctly with basic props', () => {
    render(
      <ButtonWrapper color="primary" size="lg">
        Test Button
      </ButtonWrapper>
    );

    const button = screen.getByTestId('heroui-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Test Button');
    expect(button).toHaveAttribute('color', 'primary');
    expect(button).toHaveAttribute('size', 'lg');
  });

  it('forwards all props to HeroUI Button', () => {
    const mockOnPress = jest.fn();
    
    render(
      <ButtonWrapper
        color="secondary"
        variant="bordered"
        size="md"
        isDisabled={true}
        isLoading={false}
        className="custom-class"
        onPress={mockOnPress}
      >
        Forwarded Props
      </ButtonWrapper>
    );

    const button = screen.getByTestId('heroui-button');
    expect(button).toHaveAttribute('color', 'secondary');
    expect(button).toHaveAttribute('variant', 'bordered');
    expect(button).toHaveAttribute('size', 'md');
    expect(button).toHaveAttribute('isDisabled', 'true');
    expect(button).toHaveAttribute('isLoading', 'false');
    expect(button).toHaveAttribute('className', 'custom-class');
  });

  it('handles click events correctly', () => {
    const mockOnPress = jest.fn();
    
    render(
      <ButtonWrapper onPress={mockOnPress}>
        Clickable Button
      </ButtonWrapper>
    );

    const button = screen.getByTestId('heroui-button');
    fireEvent.click(button);
    
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders with start and end content', () => {
    render(
      <ButtonWrapper
        startContent={<Download data-testid="start-icon" />}
        endContent={<span data-testid="end-content">→</span>}
      >
        Button with Content
      </ButtonWrapper>
    );

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-content')).toBeInTheDocument();
    expect(screen.getByText('Button with Content')).toBeInTheDocument();
  });

  it('supports ref forwarding', () => {
    const ref = React.createRef<HTMLButtonElement>();
    
    render(
      <ButtonWrapper ref={ref}>
        Ref Button
      </ButtonWrapper>
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('renders as different elements when using "as" prop', () => {
    // Mock Link component
    const MockLink = React.forwardRef<HTMLAnchorElement, any>(({ children, ...props }, ref) => (
      <a ref={ref} {...props} data-testid="mock-link">
        {children}
      </a>
    ));

    render(
      <ButtonWrapper as={MockLink} href="/test">
        Link Button
      </ButtonWrapper>
    );

    // The HeroUI Button should receive the "as" prop
    const button = screen.getByTestId('heroui-button');
    expect(button).toHaveAttribute('as');
    expect(button).toHaveAttribute('href', '/test');
  });

  it('handles loading state correctly', () => {
    render(
      <ButtonWrapper isLoading={true}>
        Loading Button
      </ButtonWrapper>
    );

    const button = screen.getByTestId('heroui-button');
    expect(button).toHaveAttribute('isLoading', 'true');
  });

  it('handles disabled state correctly', () => {
    render(
      <ButtonWrapper isDisabled={true}>
        Disabled Button
      </ButtonWrapper>
    );

    const button = screen.getByTestId('heroui-button');
    expect(button).toHaveAttribute('isDisabled', 'true');
  });

  it('supports icon-only buttons', () => {
    render(
      <ButtonWrapper isIconOnly aria-label="Download">
        <Download data-testid="icon" />
      </ButtonWrapper>
    );

    const button = screen.getByTestId('heroui-button');
    expect(button).toHaveAttribute('isIconOnly', 'true');
    expect(button).toHaveAttribute('aria-label', 'Download');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    render(
      <ButtonWrapper className="custom-button-class">
        Custom Class Button
      </ButtonWrapper>
    );

    const button = screen.getByTestId('heroui-button');
    expect(button).toHaveAttribute('className', 'custom-button-class');
  });

  it('supports all color variants', () => {
    const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'];
    
    colors.forEach(color => {
      const { unmount } = render(
        <ButtonWrapper color={color as any}>
          {color} Button
        </ButtonWrapper>
      );

      const button = screen.getByTestId('heroui-button');
      expect(button).toHaveAttribute('color', color);
      
      unmount();
    });
  });

  it('supports all size variants', () => {
    const sizes = ['sm', 'md', 'lg'];
    
    sizes.forEach(size => {
      const { unmount } = render(
        <ButtonWrapper size={size as any}>
          {size} Button
        </ButtonWrapper>
      );

      const button = screen.getByTestId('heroui-button');
      expect(button).toHaveAttribute('size', size);
      
      unmount();
    });
  });

  it('supports all variant types', () => {
    const variants = ['solid', 'bordered', 'light', 'flat', 'faded', 'shadow', 'ghost'];
    
    variants.forEach(variant => {
      const { unmount } = render(
        <ButtonWrapper variant={variant as any}>
          {variant} Button
        </ButtonWrapper>
      );

      const button = screen.getByTestId('heroui-button');
      expect(button).toHaveAttribute('variant', variant);
      
      unmount();
    });
  });
});
