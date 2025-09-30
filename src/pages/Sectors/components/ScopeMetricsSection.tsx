import List from '../../../components/ui/List';
import React from 'react';

interface ScopeMetricProps {
  title: string;
  value: string;
  unit: string;
  changePercentage: string;
  isPositive: boolean;
}

const ScopeMetricCard = ({
  title,
  value,
  unit,
  changePercentage,
  isPositive,
}: ScopeMetricProps) => (
  <div className="flex flex-col justify-start items-center w-full rounded-xl overflow-hidden border border-border-secondary">
    {/* Header with gray background */}
    <div className="flex justify-between items-center w-full bg-gray-100 py-4 px-3">
      <span className="text-xs font-bold text-text-primary font-['Inter']">{title}</span>
      <div className="flex justify-end items-center gap-1">
        <img
          src={
            isPositive
              ? '/images/img_arrow_drop_down_green_500.svg'
              : '/images/img_arrow_drop_up_red_500.svg'
          }
          alt={isPositive ? 'Decrease' : 'Increase'}
          className="w-3 h-3"
        />
        <span
          className={`text-xs font-normal ${isPositive ? 'text-green-600' : 'text-red-600'} font-['Inter']`}
        >
          {changePercentage}
        </span>
      </div>
    </div>

    {/* Value */}
    <div className="flex justify-center items-center w-full bg-white py-6 px-3">
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
    <div className="flex justify-between items-center w-full bg-gray-100 py-4 px-3">
      <span className="text-xs font-bold text-text-primary font-['Inter']">{title}</span>
      <div className="flex justify-end items-center gap-1">
        {isPositive ? (
          <img src="/images/img_arrow_drop_down_green_500.svg" alt="Decrease" className="w-3 h-3" />
        ) : (
          <img src="/images/img_arrow_drop_up_red_500.svg" alt="Increase" className="w-3 h-3" />
        )}
        <span
          className={`text-xs font-normal ${isPositive ? 'text-green-600' : 'text-red-600'} font-['Inter']`}
        >
          {changePercentage}
        </span>
      </div>
    </div>

    {/* Value */}
    <div className="flex justify-center items-center w-full bg-white py-6 px-3">
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
  const portfolioScopes = [
    {
      title: 'Total Scope 1',
      value: '3,036,504',
      unit: 't CO2e',
      change: '10%',
      isPositive: true,
    },
    {
      title: 'Total Scope 2',
      value: '3,711,282',
      unit: 't CO2e',
      change: '2%',
      isPositive: false,
    },
  ];

  const scope3 = [
    {
      title: 'Total Scope 3',
      value: '60,730,080',
      unit: 't CO2e',
      change: '4%',
      isPositive: true,
    },
  ];

  const portfolioOthers = [
    {
      title: 'LTIFR',
      value: '2.4',
      unit: '',
      change: '20%',
      isPositive: false,
    },
    {
      title: 'Active Legal Cases',
      value: '57',
      unit: '',
      change: '2.5%',
      isPositive: false,
    },
  ];
  return (
    <div className={`flex flex-col gap-3 justify-start w-full ${className || ''}`}>
      <h3 className="text-lg font-bold text-primary-dark w-full text-left">Scope Metrics</h3>

      <List direction="row" className="gap-2 sm:gap-4 lg:gap-2">
        {portfolioScopes?.map((scope, index) => (
          <div key={index} className="flex-1">
            <div
              className="border border-border rounded-t-xl p-2 sm:p-4 lg:p-2"
              style={{ background: 'white' }}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-md font-semibold text-text-primary">
                  {scope?.title}
                </span>
                <div className="flex items-center">
                  <img
                    src={
                      scope?.isPositive
                        ? '/images/img_arrow_drop_up_red_500.svg'
                        : '/images/img_arrow_drop_down_green_500.svg'
                    }
                    alt={scope?.isPositive ? 'Increase' : 'Decrease'}
                    className="w-3 h-3 mr-1"
                  />
                  <span className="text-sm font-normal text-text-dark">{scope?.change}</span>
                </div>
              </div>
            </div>

            <div className="bg-background-card border-l border-r border-b border-background-overlay rounded-b-xl p-2 sm:p-4 lg:p-5">
              <div className="text-lg sm:text-2xl font-semibold text-text-primary text-center">
                <span>{scope?.value} </span>
                <span className="text-xs sm:text-base">{scope?.unit}</span>
              </div>
            </div>
          </div>
          // <MetricsCardWithUnit cardData={portfolioScopes} idx={index} />
        ))}
      </List>
      <List direction="row" className="gap-2 sm:gap-4 lg:gap-2">
        {scope3?.map((scope, index) => (
          <div key={index} className="flex-1">
            <div className="bg-background-light border border-border rounded-t-xl p-2 sm:p-4 lg:p-2">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-md font-semibold text-text-primary">
                  {scope?.title}
                </span>
                <div className="flex items-center">
                  <img
                    src={
                      scope?.isPositive
                        ? '/images/img_arrow_drop_up_red_500.svg'
                        : '/images/img_arrow_drop_down_green_500.svg'
                    }
                    alt={scope?.isPositive ? 'Increase' : 'Decrease'}
                    className="w-3 h-3 mr-1"
                  />
                  <span className="text-sm font-normal text-text-dark">{scope?.change}</span>
                </div>
              </div>
            </div>

            <div className="bg-background-card border-l border-r border-b border-background-overlay rounded-b-xl p-2 sm:p-4 lg:p-5">
              <div className="text-lg sm:text-2xl font-semibold text-text-primary text-center">
                <span>{scope?.value} </span>
                <span className="text-xs sm:text-base">{scope?.unit}</span>
              </div>
            </div>
          </div>
          // <MetricsCardWithUnit cardData={portfolioScopes} idx={index} />
        ))}
      </List>
      {/* Scope 1 & 2 Row */}
      {/* <div className="flex gap-3 justify-start items-center w-full">
        <div className="w-1/2">
          <ScopeMetricCard
            title="Total Scope 1"
            value="3,036,504"
            unit="t CO2e"
            changePercentage="10%"
            isPositive={false}
          />
        </div>
      </div> */}

      {/* LTIFR and Active Legal Cases */}
      {/* <div className="flex gap-3 justify-start items-center w-full">
        <div className="w-1/2">
          <MetricCard title="LTIFR" value="2.4" changePercentage="20%" isPositive={true} />
        </div>
        <div className="w-1/2">
          <MetricCard
            title="Active Legal Cases"
            value="57"
            changePercentage="2.5%"
            isPositive={false}
          />
        </div>
      </div> */}
      <List direction="row" className="gap-2 sm:gap-4 lg:gap-2">
        {portfolioOthers?.map((scope, index) => (
          <div key={index} className="flex-1">
            <div className="bg-background-light border border-border rounded-t-xl p-2 sm:p-4 lg:p-2">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-md font-semibold text-text-primary">
                  {scope?.title}
                </span>
                <div className="flex items-center">
                  <img
                    src={
                      scope?.isPositive
                        ? '/images/img_arrow_drop_up_red_500.svg'
                        : '/images/img_arrow_drop_down_green_500.svg'
                    }
                    alt={scope?.isPositive ? 'Increase' : 'Decrease'}
                    className="w-3 h-3 mr-1"
                  />
                  <span className="text-sm font-normal text-text-dark">{scope?.change}</span>
                </div>
              </div>
            </div>

            <div className="bg-background-card border-l border-r border-b border-background-overlay rounded-b-xl p-2 sm:p-4 lg:p-5">
              <div className="text-lg sm:text-2xl font-semibold text-text-primary text-center">
                <span>{scope?.value} </span>
                <span className="text-xs sm:text-base">{scope?.unit}</span>
              </div>
            </div>
          </div>
          // <MetricsCardWithUnit cardData={portfolioScopes} idx={index} />
        ))}
      </List>
    </div>
  );
};

export default ScopeMetricsSection;
