import React from 'react';

interface ScopeMetricProps {
  title: string;
  value: string;
  unit: string;
  changePercentage: string;
  isPositive: boolean;
}

const ScopeMetricCard = ({ title, value, unit, changePercentage, isPositive }: ScopeMetricProps) => (
  <div className="flex flex-col justify-start items-center w-full rounded-xl overflow-hidden border border-border-secondary">
    {/* Header with gray background */}
    <div className="flex justify-between items-center w-full bg-gray-100 py-2 px-3">
      <span className="text-xs font-semibold text-text-primary font-['Inter']">
        {title}
      </span>
      <div className="flex justify-end items-center gap-1">
        <img 
          src={isPositive ? "/images/img_arrow_drop_up.svg" : "/images/img_arrow_drop_up_red_500.svg"} 
          alt={isPositive ? "Increase" : "Decrease"} 
          className="w-3 h-3"
        />
        <span className={`text-xs font-normal ${isPositive ? 'text-green-600' : 'text-red-600'} font-['Inter']`}>
          {changePercentage}
        </span>
      </div>
    </div>

    {/* Value */}
    <div className="flex justify-center items-center w-full bg-white py-3 px-3">
      <div className="flex justify-center items-center">
        <span className="text-xl font-semibold text-center text-text-primary font-['DM Sans']">
          {value}
        </span>
        <span className="text-sm font-semibold ml-1 text-center text-text-primary font-['DM Sans']">
          {unit}
        </span>
      </div>
    </div>
  </div>
);

interface MetricCardProps {
  title: string;
  value: string;
  changePercentage: string;
  isPositive: boolean;
}

const MetricCard = ({ title, value, changePercentage, isPositive }: MetricCardProps) => (
  <div className="flex flex-col justify-start items-center w-full rounded-xl overflow-hidden border border-border-secondary">
    {/* Header with gray background */}
    <div className="flex justify-between items-center w-full bg-gray-100 py-2 px-3">
      <span className="text-xs font-semibold text-text-primary font-['Inter']">
        {title}
      </span>
      <div className="flex justify-end items-center gap-1">
        {isPositive ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            className="w-3 h-3 text-green-600"
          >
            <path fill="currentColor" d="M7 14l5-5 5 5z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            className="w-3 h-3 text-red-600"
          >
            <path fill="currentColor" d="M7 10l5 5 5-5z" />
          </svg>
        )}
        <span className={`text-xs font-normal ${isPositive ? 'text-green-600' : 'text-red-600'} font-['Inter']`}>
          {changePercentage}
        </span>
      </div>
    </div>

    {/* Value */}
    <div className="flex justify-center items-center w-full bg-white py-3 px-3">
      <span className="text-xl font-semibold text-center text-text-primary font-['DM Sans']">
        {value}
      </span>
    </div>
  </div>
);

interface ScopeMetricsSectionProps {
  className?: string;
}

const ScopeMetricsSection = ({ className }: ScopeMetricsSectionProps) => {
  return (
    <div className={`flex flex-col gap-4 justify-start items-center w-full ${className || ''}`}>
      <h3 className="text-lg font-semibold text-text-primary font-['Inter'] w-full text-left">
        Scope Metrics
      </h3>
      
      {/* Scope 1 & 2 Row */}
      <div className="flex gap-3 justify-start items-center w-full">
        <div className="w-1/2">
          <ScopeMetricCard
            title="Total Scope 1"
            value="3,036,504"
            unit="t CO2e"
            changePercentage="10%"
            isPositive={false}
          />
        </div>
        <div className="w-1/2">
          <ScopeMetricCard
            title="Total Scope 2"
            value="3,711,282"
            unit="t CO2e"
            changePercentage="2%"
            isPositive={false}
          />
        </div>
      </div>

      {/* Scope 3 */}
      <div className="w-full">
        <ScopeMetricCard
          title="Total Scope 3"
          value="60,730,080"
          unit="t CO2e"
          changePercentage="4%"
          isPositive={false}
        />
      </div>

      {/* LTIFR and Active Legal Cases */}
      <div className="flex gap-3 justify-start items-center w-full">
        <div className="w-1/2">
          <MetricCard
            title="LTIFR"
            value="2.4"
            changePercentage="20%"
            isPositive={true}
          />
        </div>
        <div className="w-1/2">
          <MetricCard
            title="Active Legal Cases"
            value="57"
            changePercentage="2.5%"
            isPositive={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ScopeMetricsSection;