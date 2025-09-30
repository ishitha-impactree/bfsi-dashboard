import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import Icon from './AppIcon';

const buttonClasses = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
        outline: 'border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-50 focus:ring-blue-500',
        ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-blue-500',
        destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        export: 'bg-green-500 text-gray-900 hover:bg-green-600 focus:ring-green-500', // New export variant
      },
      size: {
        sm: 'h-9 px-3 rounded-md text-sm gap-2',
        default: 'h-10 px-4 py-2 rounded-md text-sm gap-2',
        lg: 'h-11 px-8 rounded-md text-base gap-2',
        icon: 'h-10 w-10 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {
  // Icon properties
  iconName?: string;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  iconColor?: string;
  
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

  // Optional parameters (no defaults)
  border_border_top?: string;
  fill_background?: string;
  layout_width?: string;
  padding?: string;
  position?: string;
  layout_gap?: string;

  // Standard React props
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'export';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  // Icon properties
  iconName,
  iconPosition = 'left',
  iconSize = 16,
  iconColor,

  // Required parameters with defaults
  text = 'Button',
  text_font_size,
  text_font_family = 'inherit',
  text_font_weight,
  text_line_height,
  text_text_align = 'center',
  text_color,
  fill_background_color,
  border_border_radius,

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
  type = 'button',
  ...props
}: ButtonProps) => {
  const hasValidBorderTop =
    border_border_top && typeof border_border_top === 'string' && border_border_top.trim() !== '';
  const hasValidBackground =
    fill_background && typeof fill_background === 'string' && fill_background.trim() !== '';
  const hasValidWidth =
    layout_width && typeof layout_width === 'string' && layout_width.trim() !== '';
  const hasValidPadding = padding && typeof padding === 'string' && padding.trim() !== '';
  const hasValidPosition = position && typeof position === 'string' && position.trim() !== '';
  const hasValidGap = layout_gap && typeof layout_gap === 'string' && layout_gap.trim() !== '';

  const optionalClasses = [
    hasValidBorderTop ? border_border_top : '',
    hasValidBackground ? fill_background : '',
    hasValidWidth ? `w-[${layout_width}]` : '',
    hasValidPadding ? `p-[${padding}]` : '',
    hasValidPosition ? position : '',
    hasValidGap ? `gap-[${layout_gap}]` : '',
  ]
    .filter(Boolean)
    .join(' ');

  // Only apply custom classes if they don't conflict with the variant styles
  const customClasses = [
    text_font_size,
    text_font_weight,
    text_line_height,
    text_text_align !== 'center' ? `text-${text_text_align}` : '',
    text_color,
    fill_background_color,
    border_border_radius,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (typeof onClick === 'function') {
      onClick(event);
    }
  };

  const renderContent = () => {
    const content = children || text;
    
    if (!iconName) {
      return content;
    }

    const iconElement = (
      <Icon 
        name={iconName} 
        size={iconSize} 
        color={iconColor}
        className={size === 'icon' ? '' : 'flex-shrink-0'}
      />
    );

    if (size === 'icon') {
      return iconElement;
    }

    return (
      <div className={`flex items-center ${iconPosition === 'left' ? 'flex-row' : 'flex-row-reverse'} gap-2`}>
        {iconElement}
        {content}
      </div>
    );
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      style={{ fontFamily: text_font_family }}
      className={twMerge(
        buttonClasses({ variant, size }),
        customClasses,
        optionalClasses,
        className
      )}
      aria-disabled={disabled}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;