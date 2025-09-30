import React from 'react';

interface ESGRatingCardProps {
  percentage: string;
  title: string;
  iconSrc: string;
  className?: string;
}

const ESGRatingCard = ({ percentage, title, iconSrc, className }: ESGRatingCardProps) => {
  return (
    <div className={`flex gap-[14px] justify-start items-center w-full border-b border-border-light py-1 ${className || ''}`}>
      {/* Icon */}
      <img 
        src={iconSrc} 
        alt={`${title} icon`} 
        className="w-[56px] h-[56px]"
      />

      {/* Content */}
      <div className="flex flex-col justify-start items-start w-full mb-1">
        <span className="text-xl font-normal leading-xl text-left text-text-primary font-['Inter']">
          {percentage}
        </span>
        <span className="text-lg font-bold leading-lg text-left text-text-primary font-['DM Sans'] whitespace-pre-line">
          {title}
        </span>
      </div>
    </div>
  );
};

export default ESGRatingCard;