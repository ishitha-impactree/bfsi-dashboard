import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonClasses = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'hover:opacity-90 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
        outline: 'border-2 bg-transparent hover:bg-opacity-10 focus:ring-blue-500',
      },
      size: {
        small: 'text-sm px-3 py-1.5',
        medium: 'text-base px-4 py-2',
        large: 'text-lg px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

interface ButtonProps extends 
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonClasses> {
  // Required parameters with defaults
  text?: string;
  text_font_size?: string;
  text_font_family?: string;
  text_font_weight?: string;
  text_line_height?: string;
  text_text_align?: 'left' | 'center' | 'right' | 'justify';
  text_color?: string;
  fill_background_color?: string;
  border_border_radius?: string;
  border_border_right?: string;
  border_border_left?: string;
  border_border_bottom?: string;
  
  // Optional parameters (no defaults)
  border_border_top?: string;
  fill_background?: string;
  layout_width?: string;
  padding?: string;
  position?: string;
  layout_gap?: string;
  
  // Standard React props
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  // Required parameters with defaults
  text = "2.4",
  text_font_size = "text-2xl",
  text_font_family = "DM Sans",
  text_font_weight = "font-semibold",
  text_line_height = "leading-2xl",
  text_text_align = "center",
  text_color = "text-text-primary",
  fill_background_color = "bg-background-card",
  border_border_radius = "rounded-none rounded-b-xl",
  border_border_right = "border-r border-border-secondary",
  border_border_left = "border-l border-border-secondary",
  border_border_bottom = "border-b border-border-secondary",
  
  // Optional parameters (no defaults)
  border_border_top,
  fill_background,
  layout_width,
  padding,
  position,
  layout_gap,
  
  // Standard React props
  variant,
  size,
  disabled = false,
  className,
  children,
  onClick,
  type = "button",
  ...props
}: ButtonProps) => {
  // Safe validation for optional parameters
  const hasValidBorderTop = border_border_top && typeof border_border_top === 'string' && border_border_top.trim() !== '';
  const hasValidBackground = fill_background && typeof fill_background === 'string' && fill_background.trim() !== '';
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width.trim() !== '';
  const hasValidPadding = padding && typeof padding === 'string' && padding.trim() !== '';
  const hasValidPosition = position && typeof position === 'string' && position.trim() !== '';
  const hasValidGap = layout_gap && typeof layout_gap === 'string' && layout_gap.trim() !== '';

  // Build optional Tailwind classes
  const optionalClasses = [
    hasValidBorderTop ? border_border_top : '',
    hasValidBackground ? fill_background : '',
    hasValidWidth ? `w-[${layout_width}]` : '',
    hasValidPadding ? `p-[${padding}]` : '',
    hasValidPosition ? position : '',
    hasValidGap ? `gap-[${layout_gap}]` : '',
  ].filter(Boolean).join(' ');

  // Build required Tailwind classes
  const requiredClasses = [
    text_font_size,
    text_font_weight,
    text_line_height,
    `text-${text_text_align}`,
    text_color,
    fill_background_color,
    border_border_radius,
    border_border_right,
    border_border_left,
    border_border_bottom,
  ].filter(Boolean).join(' ');

  // Safe click handler
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (typeof onClick === 'function') {
      onClick(event);
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      style={{ fontFamily: text_font_family }}
      className={twMerge(
        buttonClasses({ variant, size }),
        requiredClasses,
        optionalClasses,
        className
      )}
      aria-disabled={disabled}
      {...props}
    >
      {children || text}
    </button>
  );
};

export default Button;