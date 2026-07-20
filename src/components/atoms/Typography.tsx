import type { ReactNode } from 'react';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  children: ReactNode;
  className?: string;
}

export const Typography = ({ variant = 'body', children, className = '' }: TypographyProps) => {
  const styles = {
    h1: 'text-4xl md:text-5xl font-bold text-gray-900',
    h2: 'text-2xl md:text-3xl font-bold text-gray-900',
    h3: 'text-xl md:text-2xl font-semibold text-gray-800',
    body: 'text-base text-gray-700',
    caption: 'text-sm text-gray-600',
  };

  const Tag = variant.startsWith('h') ? variant : 'p';

  return <Tag className={`${styles[variant]} ${className}`}>{children}</Tag>;
};
