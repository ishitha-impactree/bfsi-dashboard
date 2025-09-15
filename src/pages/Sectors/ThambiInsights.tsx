import React from 'react';

interface ThambiInsightsProps {
  className?: string;
}

const ThambiInsights = ({ className }: ThambiInsightsProps) => {
  return (
    <div className={`flex flex-col gap-[10px] justify-start items-center w-full ${className || ''}`}>
      {/* Header */}
      <div className="flex justify-start items-center w-full bg-background-light mt-1.5">
        <img 
          src="/images/img_2027.png" 
          alt="Thambi Insights logo" 
          className="w-5 h-5"
        />
        <span className="text-md font-bold leading-lg text-left text-primary-dark font-['Inter'] ml-[5px]">
          Thambi Insights
        </span>
      </div>

      {/* Insight Item */}
      <div className="flex justify-start items-center w-[96%]">
        <div className="flex justify-start items-center w-full">
          <div className="flex gap-[10px] justify-start items-center w-full px-3">
            <img 
              src="/images/img_diamond.svg" 
              alt="Insight icon" 
              className="w-4 h-4 rounded-xs self-center"
            />
            <div className="flex flex-col justify-start items-start w-full py-1.5">
              <span className="text-base font-semibold leading-lg text-left text-text-primary font-['Inter']">
                Review Pending
              </span>
              <span className="text-base font-normal leading-lg text-left text-text-primary font-['Inter']">
                Q3 Emissions Report for Pama Sports.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThambiInsights;