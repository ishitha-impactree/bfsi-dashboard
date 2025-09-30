import React, { useState, useRef } from 'react';
import Icon from '../ui/AppIcon';

interface DropdownItem {
  label: string;
  path: string;
  icon?: string;
  isActive?: boolean;
}

interface DropdownProps {
  label: string;
  icon?: string;
  items: DropdownItem[];
  onNavigate: (path: string, label: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, icon, items, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (dropdownRef.current && !dropdownRef.current.matches(':hover')) {
        setOpen(false);
      }
    }, 100);
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 100);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-1 text-lg font-normal transition-all duration-200 ease-in-out hover:scale-105 ${
          items.some((i) => i.isActive)
            ? 'text-primary text-header-accent'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {icon && <Icon name={icon} size={16} className="me-1" />}
        {label}
        <svg
          className={`w-4 h-4 ml-1 transition-transform ${open ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 mt-6 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          {items.map((item, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-2 px-4 py-2 text-md text-left transition-colors ${
                item.isActive ? 'bg-gray-100 text-primary' : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => onNavigate(item.path, item.label)}
            >
              {item.icon && <Icon name={item.icon} size={16} />}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
