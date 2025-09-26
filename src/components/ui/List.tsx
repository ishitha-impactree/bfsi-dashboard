import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const listClasses = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      column: 'flex-col',
    },
    gap: {
      small: 'gap-2',
      medium: 'gap-4',
      large: 'gap-6',
    },
  },
  defaultVariants: {
    direction: 'row',
    gap: 'medium',
  },
});

interface ListProps extends VariantProps<typeof listClasses> {
  // Optional parameters
  componentType?: string;
  layout_gap?: string;
  layout_width?: string;

  // Standard React props
  children?: React.ReactNode;
  className?: string;
  direction?: 'row' | 'column';
  gap?: 'small' | 'medium' | 'large';
}

const List = ({
  componentType = 'List',
  layout_gap,
  layout_width,
  children,
  className,
  direction,
  gap,
}: ListProps) => {
  // Safe validation for optional parameters
  const hasValidGap = layout_gap && typeof layout_gap === 'string' && layout_gap.trim() !== '';
  const hasValidWidth =
    layout_width && typeof layout_width === 'string' && layout_width.trim() !== '';

  // Build optional Tailwind classes
  const optionalClasses = [
    hasValidGap ? `gap-[${layout_gap}]` : '',
    hasValidWidth ? (layout_width === 'flex-1' ? 'w-full' : `w-[${layout_width}]`) : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={twMerge(listClasses({ direction, gap }), optionalClasses, className)}>
      {children}
    </div>
  );
};

export default List;
