import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const lineClasses = cva(
  'block',
  {
    variants: {
      orientation: {
        horizontal: 'h-px',
        vertical: 'w-px',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  }
);

interface LineProps extends VariantProps<typeof lineClasses> {
  // Required parameters with defaults
  fill_background_color?: string;
  
  // Optional parameters
  layout_width?: string;
  componentType?: string;
  
  // Dimension parameters
  'w*h'?: string;
  
  // Standard React props
  className?: string;
}

const Line = ({
  fill_background_color = "bg-background-overlay",
  layout_width,
  componentType = "Line",
  'w*h': dimensions,
  className,
}: LineProps) => {
  // Safe validation for optional parameters
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width.trim() !== '';
  const hasValidDimensions = dimensions && typeof dimensions === 'string' && dimensions.includes('*');

  // Parse dimensions if provided
  let width = '';
  let height = '';
  let orientation: 'horizontal' | 'vertical' = 'vertical';

  if (hasValidDimensions) {
    const [w, h] = dimensions.split('*');
    const widthNum = parseInt(w);
    const heightNum = parseInt(h);
    
    width = `w-[${w}px]`;
    height = `h-[${h}px]`;
    
    // Determine orientation based on dimensions
    orientation = widthNum > heightNum ? 'horizontal' : 'vertical';
  }

  // Build optional Tailwind classes
  const optionalClasses = [
    hasValidWidth ? (layout_width === 'auto' ? 'w-auto' : `w-[${layout_width}]`) : '',
    hasValidDimensions ? width : '',
    hasValidDimensions ? height : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={twMerge(
      lineClasses({ orientation }),
      fill_background_color,
      optionalClasses,
      className
    )} />
  );
};

export default Line;