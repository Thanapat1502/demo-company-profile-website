"use client";

import { ReactNode } from 'react';
import Link from 'next/link';

interface MinimalButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function MinimalButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  className = '',
  icon,
  iconPosition = 'right',
}: MinimalButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold tracking-wide uppercase transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'btn-minimal-primary',
    secondary: 'btn-minimal-secondary',
    white: 'btn-minimal-white',
  };

  const sizeClasses = {
    sm: 'px-6 py-3 text-xs',
    md: 'px-8 py-4 text-sm',
    lg: 'px-10 py-5 text-base',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="mr-3">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-3">{icon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
}
