import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const circleProgressClasses = cva(
  'relative flex items-center justify-center',
  {
    variants: {
      size: {
        small: 'w-12 h-12',
        medium: 'w-16 h-16',
        large: 'w-20 h-20',
      },
    },
    defaultVariants: {
      size: 'large',
    },
  }
);

interface CircleProgressBarProps extends VariantProps<typeof circleProgressClasses> {
  // Optional parameters
  progress?: number;
  strokeWidth?: number;
  fill_background_color?: string;
  layout_width?: string;
  layout_align_self?: string;
  margin?: string;
  
  // Standard React props
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const CircleProgressBar = ({
  progress = 28,
  strokeWidth = 4,
  fill_background_color = "bg-background-dark",
  layout_width,
  layout_align_self,
  margin,
  className,
  size,
}: CircleProgressBarProps) => {
  // Safe validation for optional parameters
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width.trim() !== '';
  const hasValidAlignSelf = layout_align_self && typeof layout_align_self === 'string' && layout_align_self.trim() !== '';
  const hasValidMargin = margin && typeof margin === 'string' && margin.trim() !== '';

  // Parse margin values
  const marginClasses = hasValidMargin ? margin.split(',').map(m => {
    const [side, value] = m.trim().split('=');
    switch(side) {
      case 't': return `mt-[${value}]`;
      case 'r': return `mr-[${value}]`;
      case 'b': return `mb-[${value}]`;
      case 'l': return `ml-[${value}]`;
      default: return '';
    }
  }).filter(Boolean).join(' ') : '';

  // Build optional Tailwind classes
  const optionalClasses = [
    hasValidWidth ? (layout_width === 'flex-1' ? 'w-full' : `w-[${layout_width}]`) : '',
    hasValidAlignSelf ? `self-${layout_align_self}` : '',
    marginClasses,
  ].filter(Boolean).join(' ');

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={twMerge(
      circleProgressClasses({ size }),
      optionalClasses,
      className
    )}>
      <svg
        className="w-full h-full transform -rotate-90"
        viewBox="0 0 80 80"
      >
        {/* Background circle */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#dcdcdc66"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#fba900"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src="/images/img_vector_413.svg" 
          alt="Progress indicator" 
          className="w-9 h-[26px]"
        />
      </div>
    </div>
  );
};

export default CircleProgressBar;