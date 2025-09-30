import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/common/Header';
import PerformingCompanyCard from '../../components/ui/PerformingCompanyCard';
import CompaniesTable from './components/CompaniesTable';
import ESGChart from './components/ESGChart';
import ScopeMetricsSection from './components/ScopeMetricsSection';
import RiskBreakdownSection from './components/RiskBreakdownSection';
import ThambiInsights from './components/ThambiInsights';

const SectorsPerformanceAnalysis = () => {
  const topCompany = {
    performanceCategory: 'Top Performing Company',
    avatar: '/images/eternal-ltd-logo.png',
    name: 'Eternal Limited',
    sector: 'Software and IT Services',
  };

  const bottomCompany = {
    performanceCategory: 'Lowest Performing Company',
    avatar: '/images/shell-logo.png',
    name: 'Shell',
    sector: 'Crude Oil Petroleum and Natural Gas',
  };

  const esgRatings = [
    {
      percentage: '72%',
      title: 'Portfolio Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '45%',
      title: 'Portfolio Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '87%',
      title: 'Portfolio Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  const sectorOptions = [
    { value: 'all', label: 'All' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'energy', label: 'Energy' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'financials', label: 'Financials' },
    { value: 'industrials', label: 'Industrials' },
    { value: 'consumer', label: 'Consumer' },
    { value: 'materials', label: 'Materials' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'utilities', label: 'Utilities' },
  ];

  const industryOptions = [
    { value: 'all', label: 'All' },
    { value: 'automobiles', label: 'Automobiles (Including Ancillaries)' },
    { value: 'aerospace', label: 'Aerospace & Defense' },
    { value: 'logistics', label: 'Logistics & Shipping' },
    { value: 'software', label: 'Software & IT Services' },
    { value: 'pharmaceuticals', label: 'Drugs and Pharmaceuticals' },
    { value: 'real-estate', label: 'Commercial Real Estate' },
    { value: 'oil-gas', label: 'Crude Oil Petroleum and Natural Gas' },
    { value: 'banking', label: 'Banking & Financial Services' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'telecom', label: 'Telecommunications' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'construction', label: 'Construction & Engineering' },
    { value: 'mining', label: 'Mining & Metals' },
  ];

  const emptyFunction = () => {};
  const emptyStringFunction = (value: string) => {};

  return (
    <>
      <Helmet>
        <title>Sectors Performance Analysis Dashboard | ESG Portfolio Analytics Platform</title>
        <meta
          name="description"
          content="Comprehensive sector performance analysis with ESG ratings, climate risk metrics, and comparative industry benchmarks. Track environmental, social, and governance indicators across portfolio companies."
        />
        <meta
          property="og:title"
          content="Sectors Performance Analysis Dashboard | ESG Portfolio Analytics Platform"
        />
        <meta
          property="og:description"
          content="Comprehensive sector performance analysis with ESG ratings, climate risk metrics, and comparative industry benchmarks. Track environmental, social, and governance indicators across portfolio companies."
        />
      </Helmet>

      <main className="w-full" style={{ background: '#f8fafc' }}>
        <Header />
        
        {/* Header Section with Filters */}
        <div className="w-full bg-white border-b border-border shadow-elevation-1 px-8 py-4" style={{ marginTop: '70px' }}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Sectors Overview</h1>
              <p className="text-md text-muted-foreground mt-1">
                Sector-wide carbon footprint monitoring and compliance tracking
              </p>
            </div>
            
            {/* Filters in Header */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end items-start sm:items-center w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                <select
                  className="w-full sm:w-40 text-sm p-2 border border-gray-300 rounded-md"
                  onChange={(e) => emptyStringFunction(e.target.value)}
                >
                  <option value="" disabled>Sector</option>
                  {sectorOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <select
                  className="w-full sm:w-48 text-sm p-2 border border-gray-300 rounded-md"
                  onChange={(e) => emptyStringFunction(e.target.value)}
                >
                  <option value="" disabled>Industry</option>
                  {industryOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <button
                  className="w-full sm:w-auto bg-gradient-to-r from-[#232538] to-[#62689e] text-white rounded-md px-4 py-2 text-sm"
                  onClick={emptyFunction}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        <section className="w-full px-8 py-4">
          <div className="flex flex-col gap-4 justify-start items-center w-full">
            {/* Sector Overview Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 px-3">
              <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4">
                <span className="text-lg font-medium text-[#29303f]">
                  <span className="text-[#29303f7f]">Sector: </span>
                  <span className="text-[#29303f]">All</span>
                </span>
                <span className="text-lg font-medium text-[#29303f]">
                  <span className="text-[#29303f7f]">Industry: </span>
                  <span className="text-[#29303f]">All</span>
                </span>
              </div>
              <span className="text-sm font-medium text-[#29303f7f]">
                Compared to previous 12 months
              </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 justify-start items-start w-full">
              <div className="flex flex-col gap-4 justify-start items-center w-full lg:w-[65%]">
                <div className="flex flex-col sm:flex-row gap-4 justify-start items-center w-full">
                  {/* Top Performing Company Card */}
                  <PerformingCompanyCard companyInfo={topCompany} />
                  {/* Lowest Performing Company Card */}
                  <PerformingCompanyCard companyInfo={bottomCompany} />
                </div>

                <div className="flex flex-col lg:flex-row gap-4 justify-start items-start w-full">
                  <div className="flex flex-col gap-4 justify-start w-full lg:w-[50%]">
                   
                    <div className="w-full bg-white border-l-[3px] border-[#fba900] p-4 rounded-lg shadow-elevation-1">
                      <div className="flex flex-row justify-end items-center w-full mb-2">
                        <img
                          src="/images/img_arrow_drop_up.svg"
                          alt="Up arrow"
                          className="w-3 h-3"
                        />
                        <span className="text-sm font-normal text-black ml-1">
                          19%
                        </span>
                      </div>
                      <div className="px-2">
                        <span className="text-2xl font-semibold text-[#232538]">
                          ₹ 64,55,699
                        </span>
                        <span className="text-sm font-medium text-[#232538] ml-1">
                          Million
                        </span>
                      </div>
                      <div className="px-2 mt-2">
                        <span className="text-sm font-medium text-[#232538]">
                          Exposure
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                      <div className="flex flex-col gap-4 w-full sm:w-1/2">
                        {/* Industry ESG Score */}
                        <div className="w-full bg-white border-l-[3px] border-[#fba900] p-3 rounded-lg shadow-elevation-1">
                          <div className="flex flex-row justify-end items-center w-full mb-2 px-1">
                            <img
                              src="/images/img_arrow_drop_up.svg"
                              alt="Up arrow"
                              className="w-3 h-3"
                            />
                            <span className="text-sm font-normal text-black ml-1">
                              40%
                            </span>
                          </div>
                          <div className="flex flex-col justify-center items-start w-full px-1">
                            <div className="px-2">
                              <span className="text-lg font-semibold text-[#232538]">
                                Industry ESG Score
                              </span>
                            </div>
                            <span className="text-2xl font-semibold text-[#232538] ml-2">
                              68%
                            </span>
                          </div>
                        </div>

                        {/* PCHI */}
                        <div className="w-full bg-white border-l-[3px] border-[#fba900] p-3 rounded-lg shadow-elevation-1">
                          <div className="flex flex-row justify-end items-center w-full mb-2 px-1">
                            <img
                              src="/images/img_arrow_drop_up.svg"
                              alt="Up arrow"
                              className="w-3 h-3"
                            />
                            <span className="text-sm font-normal text-black ml-1">
                              40%
                            </span>
                          </div>
                          <div className="flex flex-col justify-center items-start w-full px-2">
                            <span className="text-lg font-semibold text-[#232538]">
                              PCHI
                            </span>
                            <span className="text-2xl font-semibold text-[#232538]">
                              28%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* ESG Ratings */}
                      <div className="w-full sm:w-1/2 bg-white p-4 rounded-lg shadow-elevation-1">
                        <div className="space-y-4">
                          {esgRatings.map((rating, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 py-2 border-b border-gray-200 last:border-b-0"
                            >
                              <img
                                src={rating.icon}
                                alt={rating.title}
                                className="w-12 h-12"
                              />
                              <div className="flex-1">
                                <div className="text-lg font-normal text-[#232538]">
                                  {rating.percentage}
                                </div>
                                <div className="text-sm font-bold text-[#232538]">
                                  {rating.title}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-start items-center w-full lg:w-[50%]">
                    <div className="w-full p-4 bg-white rounded-lg shadow-elevation-1">
                      <ESGChart />
                    </div>
                  </div>
                </div>

                <div className="w-full p-4 bg-white rounded-lg shadow-elevation-1">
                  <CompaniesTable />
                </div>
              </div>

              <div className="flex flex-col justify-start items-center w-full lg:w-[35%] gap-4">
                <div className="w-full">
                  <ScopeMetricsSection />
                </div>

                <div className="w-full">
                  <RiskBreakdownSection />
                </div>

                <div className="w-full">
                  <ThambiInsights />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SectorsPerformanceAnalysis;