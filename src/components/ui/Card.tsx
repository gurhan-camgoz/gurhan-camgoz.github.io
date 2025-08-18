import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hover = false }) => {
  return (
    <div
      className={clsx(
        'rounded-lg border border-gray-200 bg-white p-6 shadow-sm',
        hover && 'transition-shadow hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  );
};
