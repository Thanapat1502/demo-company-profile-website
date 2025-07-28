"use client";

import { ReactNode } from 'react';

interface MinimalCardProps {
  children: ReactNode;
  variant?: 'light' | 'dark';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  hover?: boolean;
}

export default function MinimalCard({
  children,
  variant = 'light',
  padding = 'lg',
  className = '',
  hover = true,
}: MinimalCardProps) {
  const baseClasses = 'transition-all duration-200';
  
  const variantClasses = {
    light: 'card-minimal',
    dark: 'card-minimal-dark',
  };

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  };

  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
}

interface StatCardProps {
  number: string;
  label: string;
  sublabel?: string;
  variant?: 'light' | 'dark';
  className?: string;
}

export function StatCard({
  number,
  label,
  sublabel,
  variant = 'light',
  className = '',
}: StatCardProps) {
  return (
    <MinimalCard variant={variant} padding="lg" className={className}>
      <div className="text-center">
        <div className={`text-4xl lg:text-5xl font-bold mb-3 ${
          variant === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {number}
        </div>
        <div className={`font-semibold mb-2 tracking-wide uppercase text-sm ${
          variant === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {label}
        </div>
        {sublabel && (
          <div className={`text-sm ${
            variant === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {sublabel}
          </div>
        )}
      </div>
    </MinimalCard>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  variant?: 'light' | 'dark';
  className?: string;
}

export function FeatureCard({
  title,
  description,
  variant = 'light',
  className = '',
}: FeatureCardProps) {
  return (
    <MinimalCard variant={variant} padding="lg" className={className}>
      <div className="space-y-4">
        <h3 className={`text-xl font-bold tracking-tight ${
          variant === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h3>
        <p className={`leading-relaxed ${
          variant === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {description}
        </p>
      </div>
    </MinimalCard>
  );
}
