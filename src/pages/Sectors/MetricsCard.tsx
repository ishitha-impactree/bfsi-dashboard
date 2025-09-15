import React from 'react';

interface MetricsCardProps {
  title: string;
  value: string;
  unit?: string;
  changePercentage: string;
  isPositive: boolean;
  hasLeftBorder?: boolean;
  className?: string;
}

const MetricsCard = ({
  title,
  value,
  unit,
  changePercentage,
  isPositive,
  hasLeftBorder = false,
  className
}: MetricsCardProps) => {
  return (
    <div className={`flex flex-col justify-center items-start w-full ${hasLeftBorder ? 'border-l-[3px] border-l-accent-warning' : ''} ${className || ''}`}>
      {/* Change Indicator */}
      <div className="flex justify-end items-center w-full px-2 py-[10px]">
        <div className="flex justify-end items-center gap-[3px]">
          <img 
            src={isPositive ? "/images/img_arrow_drop_up.svg" : "/images/img_arrow_drop_up_red_500.svg"} 
            alt={isPositive ? "Increase" : "Decrease"} 
            className="w-3 h-3"
          />
          <span className="text-xs font-normal leading-sm text-left text-text-dark font-['Inter']">
            {changePercentage}
          </span>
        </div>
      </div>

      {/* Value Section */}
      <div className="px-2 ml-2">
        <div className="text-3xl font-semibold leading-3xl text-left text-text-primary font-['DM Sans']">
          {value}
          {unit && (
            <span className="text-lg font-semibold leading-3xl text-left text-text-primary font-['DM Sans']">
              {' '}{unit}
            </span>
          )}
        </div>
      </div>

      {/* Title Section */}
      <div className="px-2 py-2 ml-2">
        <span className="text-md font-medium leading-md text-left text-text-primary font-['DM Sans']">
          {title}
        </span>
      </div>
    </div>
  );
};

export default MetricsCard;