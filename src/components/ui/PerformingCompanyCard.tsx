import React from 'react';
import Line from './Line';

function PerformingCompanyCard({ companyInfo }: any) {
  return (
    <div
      className="flex-1 bg-white-A700 rounded-xl p-3 sm:p-6 lg:p-3 bg-card rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
      style={{ background: 'white' }}
    >
      <h4 className="text-md font-bold text-primary-dark mb-4">
        {companyInfo?.performanceCategory}
      </h4>
      <div className="flex items-center gap-3 sm:gap-4 lg:gap-3 p-2 sm:p-4 lg:p-2 border border-background-overlay rounded-base">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-2">
          <img src={companyInfo?.avatar} alt={companyInfo?.name} className="w-6 h-6 rounded-2xl" />
          <span className="text-sm font-normal text-text-primary">{companyInfo?.name}</span>
        </div>
        <Line
          fill_background_color="bg-background-overlay"
          {...{ 'w*h': '1*20' }}
          className="mx-2"
        />
        <div className="flex-1">
          <span className="text-base font-normal text-text-primary text-center block">
            {companyInfo?.sector}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PerformingCompanyCard;
