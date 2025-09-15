import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationCardProps {
  title: string;
  description: string;
  iconSrc: string;
  path: string;
  isActive?: boolean;
  className?: string;
}

const NavigationCard: React.FC<NavigationCardProps> = ({
  title,
  description,
  iconSrc,
  path,
  isActive = false,
  className = ''
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div 
      className={`
        bg-background-card border border-background-overlay rounded-xl p-4 cursor-pointer 
        transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg 
        hover:border-accent-warning group ${isActive ? 'ring-2 ring-accent-warning' : ''} ${className}
      `}
      onClick={handleClick}
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-background-light rounded-lg flex items-center justify-center group-hover:bg-accent-warning/10 transition-colors duration-200">
          <img src={iconSrc} alt={title} className="w-8 h-8" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-accent-warning transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-200">
            {description}
          </p>
        </div>
        
        <div className="flex-shrink-0">
          <svg 
            className="w-5 h-5 text-text-secondary group-hover:text-accent-warning transition-colors duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      
      {isActive && (
        <div className="mt-2 text-xs text-accent-warning font-medium">
          Currently Viewing
        </div>
      )}
    </div>
  );
};

export default NavigationCard;