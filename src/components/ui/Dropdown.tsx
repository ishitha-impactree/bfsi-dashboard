import React, { useState, useRef, useEffect } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const dropdownClasses = cva(
  'relative inline-block text-left w-full',
  {
    variants: {
      variant: {
        default: '',
        primary: '',
        secondary: '',
      },
      size: {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
);

const buttonClasses = cva(
  'inline-flex justify-between items-center w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50 transition-colors duration-200',
  {
    variants: {
      isOpen: {
        true: 'ring-2 ring-blue-500 border-blue-500',
        false: '',
      },
    },
  }
);

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps extends VariantProps<typeof dropdownClasses> {
  placeholder?: string;
  text_font_size?: string;
  text_font_family?: string;
  text_font_weight?: string;
  text_line_height?: string;
  text_text_align?: 'left' | 'center' | 'right';
  text_color?: string;
  fill_background_color?: string;
  border_border?: string;
  border_border_radius?: string;
  layout_gap?: string;
  layout_width?: string;
  padding?: string;
  position?: string;
  
  options?: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

const Dropdown = ({
  placeholder,
  text_font_size,
  text_font_family,
  text_font_weight,
  text_line_height,
  text_text_align,
  text_color,
  fill_background_color,
  border_border,
  border_border_radius,
  layout_gap,
  layout_width,
  padding,
  position,
  
  // Standard React props
  options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ],
  value,
  onChange,
  disabled = false,
  className,
  variant,
  size,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasValidPlaceholder = placeholder && typeof placeholder === 'string' && placeholder.trim() !== '';
  const hasValidFontSize = text_font_size && typeof text_font_size === 'string' && text_font_size.trim() !== '';
  const hasValidFontFamily = text_font_family && typeof text_font_family === 'string' && text_font_family.trim() !== '';
  const hasValidFontWeight = text_font_weight && typeof text_font_weight === 'string' && text_font_weight.trim() !== '';
  const hasValidLineHeight = text_line_height && typeof text_line_height === 'string' && text_line_height.trim() !== '';
  const hasValidTextAlign = text_text_align && typeof text_text_align === 'string' && text_text_align.trim() !== '';
  const hasValidTextColor = text_color && typeof text_color === 'string' && text_color.trim() !== '';
  const hasValidBackgroundColor = fill_background_color && typeof fill_background_color === 'string' && fill_background_color.trim() !== '';
  const hasValidBorder = border_border && typeof border_border === 'string' && border_border.trim() !== '';
  const hasValidBorderRadius = border_border_radius && typeof border_border_radius === 'string' && border_border_radius.trim() !== '';
  const hasValidGap = layout_gap && typeof layout_gap === 'string' && layout_gap.trim() !== '';
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width.trim() !== '';
  const hasValidPadding = padding && typeof padding === 'string' && padding.trim() !== '';
  const hasValidPosition = position && typeof position === 'string' && position.trim() !== '';

  // Build optional Tailwind classes
  const optionalClasses = [
    hasValidFontSize ? text_font_size : '',
    hasValidFontWeight ? text_font_weight : '',
    hasValidLineHeight ? text_line_height : '',
    hasValidTextAlign ? `text-${text_text_align}` : '',
    hasValidTextColor ? text_color : '',
    hasValidBackgroundColor ? fill_background_color : '',
    hasValidBorder ? border_border : '',
    hasValidBorderRadius ? border_border_radius : '',
    hasValidGap ? `gap-[${layout_gap}]` : '',
    hasValidWidth ? `w-[${layout_width}]` : '',
    hasValidPadding ? `p-[${padding}]` : '',
    hasValidPosition ? position : '',
  ].filter(Boolean).join(' ');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    if (typeof onChange === 'function') {
      onChange(optionValue);
    }
  };


  return (
    <div 
      ref={dropdownRef}
      className={twMerge(
        dropdownClasses({ variant, size }),
        optionalClasses,
        className
      )}
      style={{ fontFamily: hasValidFontFamily ? text_font_family : undefined }}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={twMerge(
          buttonClasses({ isOpen }),
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        
        <svg
          className={twMerge(
            'w-5 h-5 ml-2 transition-transform duration-200',
            isOpen && 'transform rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          <ul role="listbox" className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={selectedValue === option.value}
                onClick={() => handleSelect(option.value)}
                className={twMerge(
                  'px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-150',
                  selectedValue === option.value && 'bg-blue-50 text-blue-600'
                )}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;