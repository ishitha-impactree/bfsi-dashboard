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

const iconNameMap: { [key: string]: string } = {
  'reset': 'RefreshCw',
  'refresh': 'RefreshCw',
  'refresh-cw': 'RefreshCw',
  
  'export': 'Download',
  'download': 'Download',
  
  'filter': 'Filter',
  'filters': 'Filter',
  'advanced-filters': 'Filter',
  
  'settings': 'Settings',
  'gear': 'Settings',
  'cog': 'Settings',
  
  'database': 'Database',
  'check-circle': 'CheckCircle',
  'bar-chart': 'BarChart3',
  'bar-chart-3': 'BarChart3',
  'upload': 'Upload',
  'x': 'X',
  'plus': 'Plus',
  'search': 'Search',
  'chevron-down': 'ChevronDown',
  'chevron-up': 'ChevronUp',
  'chevron-left': 'ChevronLeft',
  'chevron-right': 'ChevronRight',
};

function Icon({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
  strokeWidth = 2,
  ...props
}: IconProps) {
  // Convert kebab-case to PascalCase for icon names and handle aliases
  const formatIconName = (iconName: string) => {
    const mappedName = iconNameMap[iconName.toLowerCase()];
    if (mappedName) {
      return mappedName;
    }
    
    return iconName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
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