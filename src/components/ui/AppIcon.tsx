import React from 'react';
import * as LucideIcons from 'lucide-react';
import { HelpCircle } from 'lucide-react';

type IconProps = {
  name?: any;
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
} & React.SVGProps<SVGSVGElement>;

function Icon({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
  strokeWidth = 2,
  ...props
}: IconProps) {
  // Convert kebab-case to PascalCase for icon names
  const formatIconName = (iconName: string) => {
    return iconName
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
  };

  const formattedName = name ? formatIconName(name) : '';
  const IconComponent = formattedName ? (LucideIcons as any)[formattedName] : undefined;

  if (!IconComponent) {
    return (
      <HelpCircle
        size={size}
        color="gray"
        strokeWidth={strokeWidth}
        className={className}
        {...props}
      />
    );
  }

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    />
  );
}

export default Icon;
