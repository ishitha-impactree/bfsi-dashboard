import Button from '../../components/ui/Button';
import React from 'react';

interface ScopeMetricProps {
  title: string;
  value: string;
  unit: string;
  changePercentage: string;
  isPositive: boolean;
}

const ScopeMetricCard = ({ title, value, unit, changePercentage, isPositive }: ScopeMetricProps) => (
  <div className="flex flex-col justify-start items-center w-full">
    {/* Header */}
    <div className="flex justify-center items-center w-full border-b border-border-secondary rounded-t-xl py-2 px-2 bg-background-light">
      <span className="text-xs font-semibold leading-sm text-left text-text-primary font-['Inter'] self-end">
        {title}
      </span>
      <div className="flex justify-end items-center w-full gap-[3px]">
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

    {/* Value */}
    <div className="flex justify-center items-center w-full border-l border-r border-b border-border-secondary rounded-b-xl py-4 px-[34px] bg-background-card">
      <div className="flex justify-center items-center px-1.5 py-1.5">
        <span className="text-2xl font-semibold leading-2xl text-center text-text-primary font-['DM Sans']">
          {value}{' '}
          <span className="text-base font-semibold leading-sm text-center text-text-primary font-['DM Sans']">
            {unit}
          </span>
        </span>
      </div>
    </div>
  </div>
);

interface ScopeMetricsSectionProps {
  className?: string;
}

const ScopeMetricsSection = ({ className }: ScopeMetricsSectionProps) => {
  return (
    <div className={`flex flex-col gap-2 justify-start items-center w-full ${className || ''}`}>
      {/* Scope 1 & 2 Row */}
      <div className="flex gap-2 justify-start items-center w-full">
        <ScopeMetricCard
          title="Total Scope 1"
          value="3,036,504"
          unit="t CO2e"
          changePercentage="10%"
          isPositive={false}
        />
        <ScopeMetricCard
          title="Total Scope 2"
          value="3,711,282"
          unit="t CO2e"
          changePercentage="2%"
          isPositive={false}
        />
      </div>

      {/* Scope 3 */}
      <div className="flex flex-col justify-start items-center w-full">
        <div className="flex justify-center items-center w-full border-b border-border-secondary rounded-t-xl py-2 px-2 bg-background-light">
          <span className="text-xs font-semibold leading-sm text-left text-text-primary font-['Inter'] self-end">
            Total Scope 3
          </span>
          <div className="flex justify-end items-center w-full gap-[3px]">
            <img 
              src="/images/img_arrow_drop_up_red_500.svg" 
              alt="Decrease" 
              className="w-3 h-3"
            />
            <span className="text-xs font-normal leading-sm text-left text-text-dark font-['Inter']">
              4%
            </span>
          </div>
        </div>
        <div className="w-full border-l border-r border-b border-border-secondary rounded-b-xl py-4 px-[34px] bg-background-card">
          <span className="text-2xl font-semibold leading-2xl text-center text-text-primary font-['DM Sans'] block">
            60,730,080{' '}
            <span className="text-base font-semibold leading-2xl text-center text-text-primary font-['DM Sans']">
              t CO2e
            </span>
          </span>
        </div>
      </div>

      <div className="flex gap-2 justify-start items-center w-full">
        <div className="flex flex-col justify-start items-center w-[224px]">
          <div className="flex justify-center items-center w-full border-b border-border-secondary rounded-t-xl py-2 px-2 bg-background-light">
            <span className="text-xs font-semibold leading-sm text-left text-text-primary font-['Inter']">
              LTIFR
            </span>
         <div className="flex justify-end items-center w-full gap-[3px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              className="w-3 h-3"
            >
              <path fill="#4CAF50" d="M7 10l5 5 5-5z" />
            </svg>
            <span className="text-xs font-normal leading-sm text-left text-text-dark font-['Inter']">
              20%
            </span>
          </div>
          </div>
          <Button
            text="2.4"
            text_font_size="text-2xl"
            text_font_family="DM Sans"
            text_font_weight="font-semibold"
            text_line_height="leading-2xl"
            text_text_align="center"
            text_color="text-text-primary"
            fill_background_color="bg-background-card"
            border_border_radius="rounded-none rounded-b-xl"
            border_border_right="border-r border-border-secondary"
            border_border_left="border-l border-border-secondary"
            border_border_bottom="border-b border-border-secondary"
            layout_width="flex-1"
            padding="py-4 px-[34px]"
          />
        </div>

        <div className="flex flex-col justify-start items-center w-[224px]">
          <div className="flex justify-center items-center w-full border-b border-border-secondary rounded-t-xl py-2 px-2 bg-background-light">
            <span className="text-xs font-semibold leading-sm text-left text-text-primary font-['Inter'] self-end">
              Active Legal Cases
            </span>
           <div className="flex justify-end items-center gap-[3px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                        className="w-3 h-3"
                      >
                        <path fill="#F44336" d="M7 14l5-5 5 5z" />
                      </svg>
                      <span className="text-xs font-normal leading-sm text-left text-text-dark font-['Inter']">
                        2.5%
                      </span>
                    </div>
          </div>
          <Button
            text="57"
            text_font_size="text-2xl"
            text_font_family="DM Sans"
            text_font_weight="font-semibold"
            text_line_height="leading-2xl"
            text_text_align="center"
            text_color="text-text-primary"
            fill_background_color="bg-background-card"
            border_border_radius="rounded-none rounded-b-xl"
            border_border_right="border-r border-border-secondary"
            border_border_left="border-l border-border-secondary"
            border_border_bottom="border-b border-border-secondary"
            layout_width="flex-1"
            padding="py-4 px-[34px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ScopeMetricsSection;