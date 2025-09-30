import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type = 'text', label, description, error, required = false, id, ...props },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseInputClasses =
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-md ring-offset-background ' +
      'file:border-0 file:bg-transparent file:text-sm file:font-medium ' +
      'placeholder:text-muted-foreground focus-visible:outline-none ' +
      'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ' +
      'disabled:cursor-not-allowed disabled:opacity-50';

    if (type === 'checkbox') {
      return (
        <input
          type="checkbox"
          className={cn(
            'h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          id={inputId}
          {...props}
        />
      );
    }

    if (type === 'radio') {
      return (
        <input
          type="radio"
          className={cn(
            'h-4 w-4 rounded-full border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          id={inputId}
          {...props}
        />
      );
    }

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              error ? 'text-destructive' : 'text-foreground'
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <input
          type={type}
          className={cn(
            baseInputClasses,
            error && 'border-destructive focus-visible:ring-destructive',
            className
          )}
          ref={ref}
          id={inputId}
          {...props}
        />

        {description && !error && (
          <p className="text-md text-muted-foreground" style={{ color: '#64748B' }}>
            {description}
          </p>
        )}

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
