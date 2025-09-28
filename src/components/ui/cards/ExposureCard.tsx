import React from 'react';

function ExposureCard({ cardData }: any) {
  return (
    <div
      // className="flex-1 bg-[#ecf2ff7f] border-l-[3px] border-accent-warning rounded-none p-2 sm:p-4 lg:p-2"
      className="flex-1 bg-[#ecf2ff7f] border-l-[3px] border-purple-500 rounded-none p-2 sm:p-4 lg:p-2 bg-card rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
      style={{ background: 'white' }}
    >
      <div className="flex justify-end items-center mb-2">
        <img src="/images/img_arrow_drop_up.svg" alt="Increase" className="w-3 h-3 mr-1" />
        <span className="text-xs sm:text-sm font-normal text-text-dark">
          {cardData?.percentage}
        </span>
      </div>

      <div className="text-2xl sm:text-3xl lg:text-3xl font-semibold text-text-primary mb-0">
        <span>
          {cardData?.prefixUnit} {cardData?.value}{' '}
        </span>
        <span className="text-lg sm:text-xl">{cardData?.suffixUnit}</span>
      </div>
      <div className="text-xs sm:text-base font-medium text-text-primary">{cardData?.title}</div>
    </div>
  );
}

export default ExposureCard;
