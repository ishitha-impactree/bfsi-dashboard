import React from 'react';

interface CompanyData {
  companyName: string;
  companyLogo: string;
  environmentScore: string;
  socialScore: string;
  governanceScore: string;
  totalScore: string;
  environmentColor: string;
  socialColor: string;
  governanceColor: string;
}

interface CompanyRowProps extends CompanyData {}

const CompanyRow = ({
  companyName,
  companyLogo,
  environmentScore,
  socialScore,
  governanceScore,
  totalScore,
  environmentColor,
  socialColor,
  governanceColor,
}: CompanyRowProps) => (
  <div className="flex justify-center items-center w-full border-b border-border-primary">
    {/* Company Name */}
    <div className="flex justify-start items-center w-[32%] border-l border-r border-border-secondary px-3 py-2 bg-background-card">
      <div className="flex justify-start items-center px-2 py-2">
        <img src={companyLogo} alt={`${companyName} logo`} className="w-6 h-6 rounded-2xl" />
        <span className="text-base font-normal leading-lg text-left text-text-primary font-['Inter'] ml-[10px]">
          {companyName}
        </span>
      </div>
    </div>

    {/* Environment Score */}
    <div className="flex justify-center items-center w-[16%] border-r border-border-secondary px-3 py-2 bg-background-card">
      <div className="flex justify-center items-center px-[10px] py-[10px]">
        <div className="flex justify-center items-center gap-1">
          <div
            className="w-[10px] h-[10px] rounded-md"
            style={{ backgroundColor: environmentColor }}
          ></div>
          <span className="text-base font-normal leading-lg text-left text-text-primary font-['Inter']">
            {environmentScore}
          </span>
        </div>
      </div>
    </div>

    {/* Social Score */}
    <div className="flex justify-center items-center w-[16%] border-r border-border-secondary px-3 py-2 bg-background-card">
      <div className="flex justify-center items-center px-[10px] py-[10px]">
        <div className="flex justify-center items-center gap-1">
          <div
            className="w-[10px] h-[10px] rounded-md"
            style={{ backgroundColor: socialColor }}
          ></div>
          <span className="text-base font-normal leading-lg text-left text-text-primary font-['Inter']">
            {socialScore}
          </span>
        </div>
      </div>
    </div>

    {/* Governance Score */}
    <div className="flex justify-center items-center w-[16%] border-r border-border-secondary px-3 py-2 bg-background-card">
      <div className="flex justify-center items-center px-[10px] py-[10px]">
        <div className="flex justify-center items-center gap-1">
          <div
            className="w-[10px] h-[10px] rounded-md"
            style={{ backgroundColor: governanceColor }}
          ></div>
          <span className="text-base font-normal leading-lg text-left text-text-primary font-['Inter']">
            {governanceScore}
          </span>
        </div>
      </div>
    </div>

    {/* Total Score */}
    <div className="flex justify-center items-center w-[20%] border-r border-border-secondary px-3 py-2 bg-background-card">
      <div className="flex gap-1 justify-center items-center px-2 py-[10px]">
        <img
          src="/images/img_frame_1000004133.svg"
          alt="Total score bar"
          className="w-[68px] h-2 rounded-base"
        />
        <span className="text-base font-normal leading-lg text-center text-text-primary font-['Inter']">
          {totalScore}
        </span>
      </div>
    </div>
  </div>
);

//table props passed
interface CompaniesTableProps {
  className?: string;
  companiesList: CompanyData[];
}

const CompaniesTable = ({ className, companiesList }: CompaniesTableProps) => {
  return (
    <div className={`flex flex-col gap-[10px] justify-start items-start w-full ${className || ''}`}>
      <div className="w-full bg-background-light px-[14px] py-[14px] mt-1.5">
        <span className="text-lg font-bold leading-md text-left text-primary-dark font-['Inter']">
          Companies in Your Portfolio
        </span>
      </div>

      <div className="flex flex-col justify-start items-center w-full max-h-[475px] overflow-y-auto">
        <div className="flex justify-start items-center w-full border-t border-l border-r border-border-primary">
          <div className="flex justify-center items-center w-full">
            <div className="flex justify-start items-center w-[32%] px-[18px] py-3 bg-[#ececec7f]">
              <span className="text-md font-semibold leading-sm text-left text-text-primary font-['Inter']">
                Company
              </span>
            </div>

            <div className="flex justify-center items-center w-[16%] border-l border-r border-border-primary px-3 py-3 bg-[#ececec7f]">
              <span className="text-md font-semibold leading-sm text-center text-text-primary font-['Inter']">
                Environment
              </span>
            </div>

            <div className="flex justify-center items-center w-[16%] border-r border-border-primary px-3 py-3 bg-[#ececec7f]">
              <span className="text-md font-semibold leading-sm text-center text-text-primary font-['Inter']">
                Social
              </span>
            </div>

            <div className="flex justify-center items-center w-[16%] border-r border-border-primary px-3 py-3 bg-[#ececec7f]">
              <span className="text-md font-semibold leading-sm text-center text-text-primary font-['Inter']">
                Governance
              </span>
            </div>

            <div className="flex justify-center items-center w-[20%] border-r border-border-primary px-3 py-3 bg-[#ececec7f]">
              <span className="text-md font-semibold leading-sm text-center text-text-primary font-['Inter']">
                Total
              </span>
            </div>
          </div>
        </div>

        <div className="w-full">
          {companiesList.map((company, index) => (
            <CompanyRow
              key={index}
              companyName={company.companyName}
              companyLogo={company.companyLogo}
              environmentScore={company.environmentScore}
              socialScore={company.socialScore}
              governanceScore={company.governanceScore}
              totalScore={company.totalScore}
              environmentColor={company.environmentColor}
              socialColor={company.socialColor}
              governanceColor={company.governanceColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompaniesTable;