import React, { useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const editTextClasses = cva(
  'w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'border-gray-300 focus:border-blue-500',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
        success: 'border-green-500 focus:border-green-500 focus:ring-green-500',
      },
      size: {
        small: 'px-2 py-1 text-sm',
        medium: 'px-3 py-2 text-base',
        large: 'px-4 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
);

interface EditTextProps extends 
  React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof editTextClasses> {

  placeholder?: string;
  text_font_size?: string;
  text_font_family?: string;
  text_font_weight?: string;
  text_line_height?: string;
  text_text_align?: 'left' | 'center' | 'right';
  text_color?: string;
  fill_background_color?: string;
  border_border_bottom?: string;
  
  // Optional parameters (no defaults)
  layout_width?: string;
  padding?: string;
  position?: string;
  
  // Standard React props
  variant?: 'default' | 'error' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const EditText = ({
  // Required parameters with defaults
  placeholder = "Software & IT Services",
  text_font_size = "text-base",
  text_font_family = "Inter",
  text_font_weight = "font-normal",
  text_line_height = "leading-lg",
  text_text_align = "left",
  text_color = "text-text-primary",
  fill_background_color = "bg-background-card",
  border_border_bottom = "border-b border-border-primary",
  
  // Optional parameters (no defaults)
  layout_width,
  padding,
  position,
  
  // Standard React props
  variant,
  size,
  disabled = false,
  className,
  value,
  onChange,
  onFocus,
  onBlur,
  ...props
}: EditTextProps) => {
  const [internalValue, setInternalValue] = useState(value || '');

  // Safe validation for optional parameters
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width.trim() !== '';
  const hasValidPadding = padding && typeof padding === 'string' && padding.trim() !== '';
  const hasValidPosition = position && typeof position === 'string' && position.trim() !== '';

  // Build optional Tailwind classes
  const optionalClasses = [
    hasValidWidth ? `w-[${layout_width}]` : '',
    hasValidPadding ? `p-[${padding}]` : '',
    hasValidPosition ? position : '',
  ].filter(Boolean).join(' ');

  // Build required Tailwind classes
  const requiredClasses = [
    text_font_size,
    text_font_weight,
    text_line_height,
    `text-${text_text_align}`,
    text_color,
    fill_background_color,
    border_border_bottom,
  ].filter(Boolean).join(' ');

  // Handle change event
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    if (typeof onChange === 'function') {
      onChange(event);
    }
  };

  return (
    <input
      type="text"
      disabled={disabled}
      placeholder={placeholder}
      value={value !== undefined ? value : internalValue}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{ fontFamily: text_font_family }}
      className={twMerge(
        editTextClasses({ variant, size }),
        requiredClasses,
        optionalClasses,
        className
      )}
      aria-disabled={disabled}
      {...props}
    />
  );
};

export default EditText;