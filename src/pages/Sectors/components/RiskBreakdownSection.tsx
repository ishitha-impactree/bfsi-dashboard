import React from 'react';

interface RiskItemProps {
  label: string;
  color: string;
  textColor?: string;
}

const RiskItem = ({ label, color, textColor = 'text-text-dark' }: RiskItemProps) => (
  <div
    className={`flex justify-center items-center px-3 py-2 rounded-sm ${textColor}`}
    style={{ backgroundColor: color }}
  >
    <span
      className="text-sm font-normal leading-xs text-center font-['Inter']"
      style={{ fontSize: 10 }}
    >
      {label}
    </span>
  </div>
);

interface RiskBreakdownSectionProps {
  className?: string;
}

const RiskBreakdownSection = ({ className }: RiskBreakdownSectionProps) => {
  return (
    <div className={`flex flex-col gap-3 justify-start items-center w-full ${className || ''}`}>
      {/* Header */}
      <div className="w-full bg-background-light px-1 py-0 rounded-t-lg">
        <span className="text-lg font-bold leading-md text-left text-primary-dark font-['Inter']">
          Pillar wise Risk Breakdown
        </span>
      </div>

      {/* Risk Categories */}
      <div
        className="flex flex-col gap-3 justify-start items-center w-full p-3 bg-card rounded-b-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
        style={{ background: 'white' }}
      >
        <div className="flex flex-col gap-3 justify-start items-center w-full">
          {/* Environmental */}
          <div className="flex flex-col justify-start items-start w-full">
            <span className="text-sm font-medium leading-md text-text-dark font-['DM Sans']">
              Environmental
            </span>
            <div className="flex gap-1 justify-start items-center w-full mt-2">
              <RiskItem label="Resource Use" color="#05ff00" />
              <RiskItem label="Climate Stewardship" color="#acff01" />
              <RiskItem label="Resource Footprint" color="#ff8b00" />
              <RiskItem label="Aspiration Need" color="#fe7f00" />
              <RiskItem label="Growth Need" color="#73ff01" />
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col justify-start items-start w-full">
            <span className="text-sm font-medium leading-md text-text-dark font-['DM Sans']">
              Social
            </span>
            <div className="flex gap-1 justify-start items-center w-full mt-2">
              <RiskItem label="Human Capacity" color="#ffae00" />
              <RiskItem label="Community Engagement" color="#ff8001" />
              <RiskItem label="Customer Satisfaction" color="#ff9000" />
              <RiskItem label="Quality Assurance" color="#77ff01" />
              <RiskItem label="Data Risk" color="#fe3200" />
            </div>
          </div>

          {/* Governance */}
          <div className="flex flex-col justify-start items-start w-full">
            <span className="text-sm font-medium leading-md text-text-dark font-['DM Sans']">
              Governance
            </span>
            <div className="flex gap-1 justify-start items-center w-full mt-2">
              <RiskItem label="Legal Compliance" color="#d4ff00" />
              <RiskItem label="Board Performance" color="#86ff00" />
              <RiskItem label="Executioner Risk" color="#fed600" />
              <RiskItem label="Competitor Risk" color="#05ff00" />
              <RiskItem label="Financial Risk" color="#fed600" />
            </div>
          </div>
        </div>

        {/* Risk Level Indicator */}
        <div className="flex flex-col gap-2 justify-center items-center w-full mt-2">
          <div className="flex justify-between items-center w-full px-1">
            <span className="text-xs font-normal text-text-dark font-['Inter']">Low</span>
            <span className="text-xs font-normal text-text-dark font-['Inter']">Medium</span>
            <span className="text-xs font-normal text-text-dark font-['Inter']">High</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 h-2 rounded-full"
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskBreakdownSection;
