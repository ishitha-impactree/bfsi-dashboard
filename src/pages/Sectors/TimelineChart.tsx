import React from 'react';

interface TimelineChartProps {
  className?: string;
}

const TimelineChart = ({ className }: TimelineChartProps) => {
  return (
    <div className={`w-full ${className || ''}`}>
      {/* Timeline Chart Container */}
      <div className="flex flex-col gap-1 w-full">
        {/* Chart Header Images */}
        <div className="flex justify-center items-center gap-1.5 w-full">
          <img 
            src="/images/img_frame_1000004089.svg" 
            alt="Chart header left" 
            className="w-[105px] sm:w-[140px] md:w-[175px] lg:w-[210px] h-[16px] sm:h-[20px] md:h-[26px] lg:h-[32px]"
          />
          <img 
            src="/images/img_frame_1000003099.svg" 
            alt="Chart main timeline" 
            className="flex-1 max-w-[365px] sm:max-w-[487px] md:max-w-[608px] lg:max-w-[730px] h-[13px] sm:h-[17px] md:h-[21px] lg:h-[26px] self-end"
          />
          <img 
            src="/images/img_frame_1000004088.svg" 
            alt="Chart header right" 
            className="w-[73px] sm:w-[97px] md:w-[121px] lg:w-[146px] h-[16px] sm:h-[20px] md:h-[26px] lg:h-[32px]"
          />
        </div>

        {/* Timeline Container */}
        <div className="relative w-full">
          {/* Blue Selection Indicator */}
          <div className="flex justify-center w-full mb-[-3px] relative z-10">
            <img 
              src="/images/img_group_1000003717.svg" 
              alt="Selection indicator" 
              className="w-[43px] sm:w-[57px] md:w-[71px] lg:w-[86px] h-[6px] sm:h-[8px] md:h-[10px] lg:h-[12px]"
            />
          </div>

          {/* Main Timeline Lines */}
          <div className="flex flex-col w-full">
            {/* Background Line */}
            <div className="w-full h-[1px] sm:h-[1.5px] lg:h-[2px] bg-text-text-white"></div>
            
            {/* Active Selection Line */}
            <div className="w-full h-[1px] sm:h-[1.5px] lg:h-[2px] bg-chart-primary -mt-[1px] sm:-mt-[1.5px] lg:-mt-[2px] mx-[109px] sm:mx-[145px] md:mx-[181px] lg:mx-[218px] mr-[78px] sm:mr-[104px] md:mr-[130px] lg:mr-[156px]"></div>
          </div>

          {/* Timeline Markers */}
          <div className="flex justify-between items-start w-full -mt-[1px] px-[11px] sm:px-[15px] md:px-[18px] lg:px-[22px]">
            {/* Left side markers */}
            <div className="flex gap-[31px] sm:gap-[41px] md:gap-[51px] lg:gap-[62px]">
              <img src="/images/img_line_270.svg" alt="Marker" className="w-[1px] sm:w-[1.5px] lg:w-[2px] h-[5px] sm:h-[7px] md:h-[8px] lg:h-[10px] self-center" />
              <img src="/images/img_line_270.svg" alt="Marker" className="w-[1px] sm:w-[1.5px] lg:w-[2px] h-[2px] sm:h-[2.5px] md:h-[3px] lg:h-[4px]" />
              <img src="/images/img_line_270.svg" alt="Marker" className="w-[1px] sm:w-[1.5px] lg:w-[2px] h-[2px] sm:h-[2.5px] md:h-[3px] lg:h-[4px]" />
              <img src="/images/img_line_270.svg" alt="Marker" className="w-[1px] sm:w-[1.5px] lg:w-[2px] h-[2px] sm:h-[2.5px] md:h-[3px] lg:h-[4px]" />
              <img src="/images/img_line_270.svg" alt="Marker" className="w-[1px] sm:w-[1.5px] lg:w-[2px] h-[2px] sm:h-[2.5px] md:h-[3px] lg:h-[4px]" />
              <img src="/images/img_line_270.svg" alt="Marker" className="w-[1px] sm:w-[1.5px] lg:w-[2px] h-[2px] sm:h-[2.5px] md:h-[3px] lg:h-[4px]" />
              <img src="/images/img_line_270.svg" alt="Marker" className="w-[1px] sm:w-[1.5px] lg:w-[2px] h-[2px] sm:h-[2.5px] md:h-[3px] lg:h-[4px]" />
              <img src="/images/img_line_270.svg" alt="Marker" className="w-[1px] sm:w-[1.5px] lg:w-[2px] h-[2px] sm:h-[2.5px] md:h-[3px] lg:h-[4px]" />
            </div>

            {/* Center markers */}
            <div className="flex gap-[31px] sm:gap-[41px] md:gap-[51px] lg:gap-[64px]">
              <img src="/images/img_line_270.svg" alt="Marker" className="w-[1px] sm:w-[1.5px] lg:w-[2px] h-[2px] sm:h-[2.5px] md:h-[3px] lg:h-[4px]" />
              <img src="/images/img_line_270.svg" alt="Marker" className="w-[1px] sm:w-[1.5px] lg:w-[2px] h-[2px] sm:h-[2.5px] md:h-[3px] lg:h-[4px]" />
            </div>

            {/* Right side markers */}
            <div className="flex gap-[31px] sm:gap-[41px] md:gap-[51px] lg:gap-[62px]">
              <img src="/images/img_line_270.svg" alt="Marker" className="w-[1px] sm:w-[1.5px] lg:w-[2px] h-[2px] sm:h-[2.5px] md:h-[3px] lg:h-[4px]" />
              <img src="/images/img_line_270.svg" alt="Marker" className="w-[1px] sm:w-[1.5px] lg:w-[2px] h-[5px] sm:h-[7px] md:h-[8px] lg:h-[10px] self-center" />
              <img src="/images/img_line_270.svg" alt="Marker" className="w-[1px] sm:w-[1.5px] lg:w-[2px] h-[2px] sm:h-[2.5px] md:h-[3px] lg:h-[4px]" />
              <img src="/images/img_line_270.svg" alt="Marker" className="w-[1px] sm:w-[1.5px] lg:w-[2px] h-[2px] sm:h-[2.5px] md:h-[3px] lg:h-[4px]" />
              <img src="/images/img_line_270.svg" alt="Marker" className="w-[1px] sm:w-[1.5px] lg:w-[2px] h-[2px] sm:h-[2.5px] md:h-[3px] lg:h-[4px]" />
              <img src="/images/img_line_270.svg" alt="Marker" className="w-[1px] sm:w-[1.5px] lg:w-[2px] h-[2px] sm:h-[2.5px] md:h-[3px] lg:h-[4px]" />
              <img src="/images/img_line_270.svg" alt="Marker" className="w-[1px] sm:w-[1.5px] lg:w-[2px] h-[2px] sm:h-[2.5px] md:h-[3px] lg:h-[4px]" />
            </div>
          </div>
        </div>

        {/* Month Labels */}
        <div className="flex gap-[16px] sm:gap-[21px] md:gap-[26px] lg:gap-[32px] justify-start items-center w-full mt-[4px] sm:mt-[5px] lg:mt-[6px] px-[6px] sm:px-[8px] md:px-[10px] lg:px-[12px]">
          {[
            { month: 'Oct', year: '2024' },
            { month: 'Nov', year: '2024' },
            { month: 'Dec', year: '2024' },
            { month: 'Jan', year: '2025' },
            { month: 'Feb', year: '2025' },
            { month: 'Mar', year: '2025' },
            { month: 'Apr', year: '2025' },
            { month: 'May', year: '2025' },
            { month: 'Jun', year: '2025' },
            { month: 'Jul', year: '2025' },
            { month: 'Aug', year: '2025' },
            { month: 'Sep', year: '2025' },
            { month: 'Oct', year: '2025' },
            { month: 'Nov', year: '2025' },
            { month: 'Dec', year: '2025' },
            { month: 'Jan', year: '2026' },
            { month: 'Feb', year: '2026' }
          ].map((item, index) => (
            <div key={index} className="flex flex-col justify-start items-center px-[1px] sm:px-[1.5px] lg:px-[2px]">
              <span className="text-lg font-normal leading-lg text-center text-text-primary font-['Inter']">
                {item.month}
              </span>
              <span className="text-sm font-normal leading-sm text-center text-text-muted font-['Inter']">
                {item.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineChart;