import React from 'react';

interface RiskItemProps {
  label: string;
  color: string;
  textColor?: string;
}

const RiskItem = ({ label, color, textColor = 'text-text-dark' }: RiskItemProps) => (
  <div 
    className={`flex justify-center items-center px-3 py-3 rounded-sm ${textColor}`}
    style={{ backgroundColor: color }}
  >
    <span className="text-xs font-normal leading-xs text-center font-['Inter']">
      {label}
    </span>
  </div>
);

interface RiskBreakdownSectionProps {
  className?: string;
}

const RiskBreakdownSection = ({ className }: RiskBreakdownSectionProps) => {
  return (
    <div className={`flex flex-col gap-1 justify-start items-center w-full ${className || ''}`}>
      {/* Header */}
      <div className="w-full bg-background-light px-[34px] py-[10px]">
        <span className="text-md font-bold leading-md text-left text-primary-dark font-['Inter']">
          Pillar wise Risk Breakdown
        </span>
      </div>

      {/* Risk Categories */}
      <div className="flex flex-col gap-[10px] justify-start items-center w-full px-3">
        <div className="flex flex-col gap-2 justify-start items-center w-full">
          {/* Environmental */}
          <div className="flex flex-col justify-start items-start w-full">
            <span className="text-sm font-normal leading-md text-right text-text-dark font-['DM Sans']">
              Environmental
            </span>
            <div className="flex gap-1 justify-start items-center w-full">
              <RiskItem label="Resource Use" color="#05ff00" />
              <div className="flex justify-start items-center w-full">
                <span className="text-xs font-normal leading-base text-center text-text-dark font-['Inter'] px-2 py-2 rounded-sm" style={{ backgroundColor: '#acff01' }}>
                  Climate{'\n'}Stewardship
                </span>
              </div>
              <RiskItem label="Resource Footprint" color="#ff8b00" />
              <RiskItem label="Aspiration Need" color="#fe7f00" />
              <div className="flex justify-start items-center w-full">
                <RiskItem label="Growth Need" color="#73ff01" />
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col justify-start items-start w-full">
            <span className="text-sm font-normal leading-md text-right text-text-dark font-['DM Sans']">
              Social
            </span>
            <div className="flex gap-1 justify-start items-center w-full">
              <div className="flex justify-center items-center px-[10px] py-3 rounded-sm" style={{ backgroundColor: '#ffae00' }}>
                <span className="text-xs font-normal leading-xs text-center text-text-dark font-['Inter']">
                  Human Capacity
                </span>
              </div>
              <div className="flex justify-start items-center w-full">
                <span className="text-xs font-normal leading-base text-center text-text-dark font-['Inter'] px-2 py-2 rounded-sm" style={{ backgroundColor: '#ff8001' }}>
                  Community{'\n'}Engagement
                </span>
              </div>
              <div className="flex justify-start items-center w-full">
                <span className="text-xs font-normal leading-base text-center text-text-dark font-['Inter'] px-[10px] py-2 rounded-sm" style={{ backgroundColor: '#ff9000' }}>
                  Customer{'\n'}Satisfaction
                </span>
              </div>
              <RiskItem label="Quality Assurance" color="#77ff01" />
              <RiskItem label="Data Risk" color="#fe3200" />
            </div>
          </div>

          {/* Governance */}
          <div className="flex flex-col justify-start items-start w-full">
            <span className="text-sm font-normal leading-md text-right text-text-dark font-['DM Sans']">
              Governance
            </span>
            <div className="flex gap-1 justify-start items-center w-full">
              <RiskItem label="Legal Compliance" color="#d4ff00" />
              <RiskItem label="Board Performance" color="#86ff00" />
              <RiskItem label="Executioner Risk" color="#fed600" />
              <RiskItem label="Competitor Risk" color="#05ff00" />
              <RiskItem label="Financial Risk" color="#fed600" />
            </div>
          </div>
        </div>

        {/* Risk Level Indicator */}
        <div className="flex flex-col gap-1 justify-center items-center w-full bg-background-light">
          <div className="flex justify-between items-center w-full px-3">
            <span className="text-xs font-normal leading-xs text-left text-text-dark font-['Inter']">
              Low
            </span>
            <span className="text-xs font-normal leading-xs text-left text-text-dark font-['Inter']">
              Medium
            </span>
            <span className="text-xs font-normal leading-xs text-left text-text-dark font-['Inter']">
              High
            </span>
          </div>
          <img 
            src="/images/img_frame_1000003883.png" 
            alt="Risk level indicator" 
            className="w-full max-w-[404px] h-2 rounded-base"
          />
        </div>
      </div>
    </div>
  );
};

export default RiskBreakdownSection;