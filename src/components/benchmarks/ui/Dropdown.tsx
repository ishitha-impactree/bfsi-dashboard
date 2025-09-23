'use client';
import { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  // Optional parameters
  layout_gap?: string;
  layout_width?: string;
  padding?: string;
  position?: string;
  
  // Standard props
  options?: DropdownOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const Dropdown = ({
  // Optional parameters (no defaults)
  layout_gap,
  layout_width,
  padding,
  position,
  
  // Standard props
  options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ],
  placeholder = "Select an option",
  value,
  onChange,
  disabled = false,
  className,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || '')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Safe validation for optional parameters
  const hasValidGap = layout_gap && typeof layout_gap === 'string' && layout_gap.trim() !== ''
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width.trim() !== ''
  const hasValidPadding = padding && typeof padding === 'string' && padding.trim() !== ''
  const hasValidPosition = position && typeof position === 'string' && position.trim() !== ''

  const optionalClasses = [
    hasValidGap ? `gap-[${layout_gap}]` : '',
    hasValidWidth ? `w-[${layout_width}]` : 'w-full',
    hasValidPadding ? `p-[${padding}]` : '',
    hasValidPosition ? position : '',
  ].filter(Boolean).join(' ')

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue)
    setIsOpen(false)
    if (onChange) {
      onChange(optionValue)
    }
  }

  const selectedOption = options.find(option => option.value === selectedValue)

  return (
    <div 
      ref={dropdownRef}
      className={twMerge(
        'relative inline-block',
        optionalClasses,
        className
      )}
    >
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={twMerge(
          'flex items-center justify-between w-full px-3 py-2 text-left bg-secondary-background border border-secondary-light rounded-sm text-text-primary hover:border-primary-background focus:outline-none focus:ring-2 focus:ring-primary-background focus:border-transparent transition-colors duration-200',
          disabled && 'opacity-50 cursor-not-allowed',
          isOpen && 'border-primary-background ring-2 ring-primary-background'
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="block truncate text-sm font-normal leading-sm">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDownIcon 
          className={twMerge(
            'w-5 h-5 text-text-primary transition-transform duration-200',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-secondary-background border border-secondary-light rounded-sm shadow-lg max-h-60 overflow-auto">
          <ul role="listbox" className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={selectedValue === option.value}
                className={twMerge(
                  'px-3 py-2 text-sm cursor-pointer hover:bg-primary-light transition-colors duration-150',
                  selectedValue === option.value 
                    ? 'bg-primary-light text-primary-background font-medium' :'text-text-primary'
                )}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Dropdown