import React from 'react';

interface CompanyPerformanceCardProps {
  title: string;
  companyName: string;
  companyLogo: string;
  industry: string;
  isTopPerformer?: boolean;
  className?: string;
}

const CompanyPerformanceCard = ({
  title,
  companyName,
  companyLogo,
  industry,
  isTopPerformer = true,
  className
}: CompanyPerformanceCardProps) => {
  return (
    <div className={`flex flex-col gap-[10px] justify-start items-center w-full ${className || ''}`}>
      {/* Card Header */}
      <div className="w-full bg-background-light px-[34px] py-[14px]">
        <span className="text-md font-bold leading-md text-left text-primary-dark font-['Inter']">
          {title}
        </span>
      </div>

      {/* Card Content */}
      <div className="flex justify-center items-center gap-[10px] w-full px-[14px] pb-[14px]">
        <div className="flex justify-center items-center w-full">
          {/* Company Info Section */}
          <div className="flex justify-center items-center gap-[10px] px-[6px] py-[8px] border border-border-secondary rounded-base">
            <div className="flex justify-center items-center gap-[10px]">
              <img 
                src={companyLogo} 
                alt={`${companyName} logo`} 
                className="w-[24px] h-[24px] rounded-2xl"
              />
              <span className="text-sm font-normal leading-sm text-left text-text-primary font-['Inter']">
                {companyName}
              </span>
            </div>

            {/* Divider */}
            <div className="w-[1px] h-[20px] bg-border-secondary ml-[6px]"></div>

            {/* Industry Section */}
            <div className="flex justify-center items-center px-3 py-3">
              <span className="text-base font-normal leading-base text-center text-text-primary font-['Inter']">
                {industry}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-[42px] h-[42px] bg-border-secondary rounded-lg p-3 hover:bg-gray-300 transition-colors">
          <img 
            src="/images/img_frame_1000003605.svg" 
            alt="Action" 
            className="w-full h-full"
          />
        </button>
      </div>
    </div>
  );
};

export default CompanyPerformanceCard;