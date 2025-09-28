import React from 'react';

function MetricsCardWithUnit({ cardData, idx }: any) {
  return (
    <div key={idx} className="flex-1">
      <div className="bg-background-light border-b border-background-overlay rounded-t-xl p-4 sm:p-6 lg:p-4">
        <div className="flex justify-between items-center">
          <span className="text-sm sm:text-base font-semibold text-text-primary">
            {cardData?.title}
          </span>
          <div className="flex items-center">
            <img
              src={
                cardData?.isPositive
                  ? '/images/img_arrow_drop_up_red_500.svg'
                  : '/images/img_arrow_drop_down_green_500.svg'
              }
              alt={cardData?.isPositive ? 'Increase' : 'Decrease'}
              className="w-3 h-3 mr-1"
            />
            <span className="text-xs font-normal text-text-dark">{cardData?.change}</span>
          </div>
        </div>
      </div>

      <div className="bg-background-card border-l border-r border-b border-background-overlay rounded-b-xl p-4 sm:p-6 lg:p-4">
        <div className="text-2xl sm:text-3xl font-semibold text-text-primary text-center">
          <span>{cardData?.value} </span>
          <span className="text-xs sm:text-base">{cardData?.unit}</span>
        </div>
      </div>
    </div>
  );
}

export default MetricsCardWithUnit;
