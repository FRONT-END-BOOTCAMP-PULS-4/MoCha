'use client';

import { InputHTMLAttributes } from 'react';
import { cn } from '../root-header/lib/cn';

type InputProps = {
  error?: string | boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'placeholder-gray-6 border px-4 py-3 text-sm',
        error ? 'border-error' : 'border-gray-4',
        className
      )}
      {...props}
    />
  );
}
