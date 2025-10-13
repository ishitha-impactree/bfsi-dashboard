import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/common/Header';
import PerformingCompanyCard from '../../components/ui/PerformingCompanyCard';
import CompaniesTable from './components/CompaniesTable';
import ESGChart from './components/ESGChart';
import ScopeMetricsSection from './components/ScopeMetricsSection';
import RiskBreakdownSection from './components/RiskBreakdownSection';
import ThambiInsights from './components/ThambiInsights';
import MetricsCard from './components/MetricsCard';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface ScopeMetricData {
  title: string;
  value: string;
  unit: string;
  change: string;
  isPositive: boolean;
}

interface ScopeMetricsData {
  portfolioScopes: ScopeMetricData[];
  scope3: ScopeMetricData[];
  portfolioOthers: ScopeMetricData[];
}

interface FilterData {
  topCompany: any;
  bottomCompany: any;
  esgRatings: any[];
  scopeMetrics: ScopeMetricsData;
  esgChartData: any[];
}

const defaultEsgChartData = [
  { name: 'Jan', Environment: 55, Social: 50, Governance: 42 },
  { name: 'Feb', Environment: 45, Social: 55, Governance: 32 },
  { name: 'Mar', Environment: 44, Social: 50, Governance: 36 },
  { name: 'Apr', Environment: 38, Social: 56, Governance: 30 },
  { name: 'May', Environment: 52, Social: 61, Governance: 39 },
  { name: 'Jun', Environment: 45, Social: 56, Governance: 34 },
  { name: 'Jul', Environment: 64, Social: 46, Governance: 34 },
  { name: 'Aug', Environment: 42, Social: 36, Governance: 60 },
  { name: 'Sep', Environment: 56, Social: 41, Governance: 29 },
  { name: 'Oct', Environment: null, Social: null, Governance: null },
  { name: 'Nov', Environment: null, Social: null, Governance: null },
  { name: 'Dec', Environment: null, Social: null, Governance: null },
];

const transportationAutomobilesEsgChartData = [
  { name: 'Jan', Environment: 50, Social: 50, Governance: 42 },
  { name: 'Feb', Environment: 48, Social: 55, Governance: 32 },
  { name: 'Mar', Environment: 46, Social: 50, Governance: 36 },
  { name: 'Apr', Environment: 42, Social: 56, Governance: 30 },
  { name: 'May', Environment: 55, Social: 61, Governance: 39 },
  { name: 'Jun', Environment: 48, Social: 56, Governance: 34 },
  { name: 'Jul', Environment: 52, Social: 46, Governance: 34 },
  { name: 'Aug', Environment: 45, Social: 36, Governance: 60 },
  { name: 'Sep', Environment: 50, Social: 41, Governance: 29 },
  { name: 'Oct', Environment: null, Social: null, Governance: null },
  { name: 'Nov', Environment: null, Social: null, Governance: null },
  { name: 'Dec', Environment: null, Social: null, Governance: null },
];

const SectorsPerformanceAnalysis = () => {
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const defaultTopCompany = {
    performanceCategory: 'Top Performing Company',
    avatar: '/images/companies/bosch.png',
    name: 'Bosch Limited India',
    sector: 'Automotive Technology and Services',
  };

  const defaultBottomCompany = {
    performanceCategory: 'Lowest Performing Company',
    avatar: '/images/companies/furukawa.jpg',
    name: 'Furukawa Minda Electric (FME)',
    sector: 'Automotive Parts Manufacturing',
  };

  const defaultEsgRatings = [
    {
      percentage: '72%',
      title: 'Sector Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '45%',
      title: 'Sector Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '87%',
      title: 'Sector Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  const defaultScopeMetrics: ScopeMetricsData = {
    portfolioScopes: [
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
    ],
    scope3: [
      {
        title: 'Total Scope 3',
        value: '60,730,080',
        unit: 't CO2e',
        change: '4%',
        isPositive: true,
      },
    ],
    portfolioOthers: [
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
    ],
  };

  // Transportation/Automobiles filter data
  const transportationAutomobilesData: FilterData = {
    topCompany: {
      performanceCategory: 'Top Performing Company',
      avatar: '/images/companies/bosch.png',
      name: 'Bosch Limited India',
      sector: 'Automotive Technology and Services',
    },
    bottomCompany: {
      performanceCategory: 'Lowest Performing Company',
      avatar: '/images/companies/furukawa.jpg',
      name: 'Furukawa Minda Electric (FME)',
      sector: 'Automotive Parts Manufacturing',
    },
    esgRatings: [
      {
        percentage: '70%',
        title: 'Sector Environment Rating',
        color: '#4ade80',
        icon: '/images/img_group_1000003546.svg',
      },
      {
        percentage: '67%',
        title: 'Sector Social Rating',
        color: '#38bdf8',
        icon: '/images/img_group_1000003546_light_blue_a200.svg',
      },
      {
        percentage: '71%',
        title: 'Sector Governance Rating',
        color: '#f59e0b',
        icon: '/images/img_group_1000003546_amber_a700.svg',
      },
    ],
    scopeMetrics: {
      portfolioScopes: [
        {
          title: 'Total Scope 1',
          value: '435,264',
          unit: 't CO2e',
          change: '10%',
          isPositive: true,
        },
        {
          title: 'Total Scope 2',
          value: '931,212',
          unit: 't CO2e',
          change: '2%',
          isPositive: false,
        },
      ],
      scope3: [
        {
          title: 'Total Scope 3',
          value: '2,450,380',
          unit: 't CO2e',
          change: '4%',
          isPositive: true,
        },
      ],
      portfolioOthers: [
        {
          title: 'LTIFR',
          value: '3.7',
          unit: '',
          change: '20%',
          isPositive: false,
        },
        {
          title: 'Active Legal Cases',
          value: '12',
          unit: '',
          change: '2.5%',
          isPositive: false,
        },
      ],
    },
    esgChartData: transportationAutomobilesEsgChartData,
  };

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

  const handleApplyFilters = async () => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsFilterApplied(true);
    setIsLoading(false);
  };

  const handleSectorChange = (value: string) => {
    setSelectedSector(value);
    setIsFilterApplied(false);
  };

  const handleIndustryChange = (value: string) => {
    setSelectedIndustry(value);
    setIsFilterApplied(false);
  };

  const handleResetFilters = () => {
  setSelectedSector('all');
  setSelectedIndustry('all');
  setIsFilterApplied(false);
};

  const isTransportationAutomobiles =
    isFilterApplied && selectedSector === 'transportation' && selectedIndustry === 'automobiles';

  const displayData: FilterData = isTransportationAutomobiles ? transportationAutomobilesData : {
    topCompany: defaultTopCompany,
    bottomCompany: defaultBottomCompany,
    esgRatings: defaultEsgRatings,
    scopeMetrics: defaultScopeMetrics,
    esgChartData: defaultEsgChartData,
  };

  const getSectorDisplayName = () => {
    if (!isFilterApplied && selectedSector === 'all') return 'All';
    const sector = sectorOptions.find(s => s.value === selectedSector);
    return sector ? sector.label : 'All';
  };

  const getIndustryDisplayName = () => {
    if (!isFilterApplied && selectedIndustry === 'all') return 'All';
    const industry = industryOptions.find(i => i.value === selectedIndustry);
    return industry ? industry.label : 'All';
  };

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
        <div
          className="bg-card border-b border-border shadow-elevation-1 px-8"
          style={{ background: 'white', marginTop: '70px' }}
        >
          <div className="w-100 mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Sectors Overview</h1>
                <p className="text-md text-muted-foreground mt-1">
                  Sector-wide carbon footprint monitoring and compliance tracking
                </p>
              </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-end items-start sm:items-center w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                <select
                  className="w-full sm:w-40 text-sm p-2 border border-gray-300 rounded-md bg-white"
                  value={selectedSector}
                  onChange={(e) => handleSectorChange(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="" disabled>
                    Sector
                  </option>
                  {sectorOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <select
                  className="w-full sm:w-48 text-sm p-2 border border-gray-300 rounded-md bg-white"
                  value={selectedIndustry}
                  onChange={(e) => handleIndustryChange(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="" disabled>
                    Industry
                  </option>
                  {industryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  className="w-full sm:w-auto bg-accent-info text-white rounded-md px-4 py-2 text-sm flex items-center justify-center gap-2 min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleApplyFilters}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span>Filtering...</span>
                    </>
                  ) : (
                    'Apply Filters'
                  )}
                </button>
                {isFilterApplied && (
                  <button
                    className="w-full sm:w-auto bg-gray-500 text-white rounded-md px-4 py-2 text-sm flex items-center justify-center gap-2 min-w-[100px] hover:bg-gray-600 transition-colors"
                    onClick={handleResetFilters}
                    disabled={isLoading}
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 min-w-[200px]">
              <LoadingSpinner size="lg" />
              <p className="text-text-primary font-medium">Applying filters...</p>
              <p className="text-text-secondary text-sm">Updating sector data</p>
            </div>
          </div>
        )}

        <section className="w-full px-10 mb-2">
          <div className="flex flex-col gap-2 justify-start items-center w-full px-3 py-3">
            <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-4">
              <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4 sm:gap-6">
                <span className="text-lg font-medium leading-lg text-left font-['Inter']">
                  <span className="text-text-secondary">Sector : </span>
                  <span className="text-text-primary">{getSectorDisplayName()}</span>
                </span>
                <span className="text-lg font-medium leading-lg text-left font-['Inter']">
                  <span className="text-text-secondary">Industry : </span>
                  <span className="text-text-primary">{getIndustryDisplayName()}</span>
                </span>
              </div>
              <span className="text-lg font-medium leading-lg text-right text-text-secondary font-['Inter'] mt-2 sm:mt-0">
                Compared to previous 12 months
              </span>
            </div>

            {isLoading ? (
              <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row gap-3 justify-start items-center w-full">
                  <div className="flex-1 bg-gray-200 rounded-xl h-32 animate-pulse"></div>
                  <div className="flex-1 bg-gray-200 rounded-xl h-32 animate-pulse"></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-3 justify-start items-start w-full">
                  <div className="flex flex-col gap-3 w-full lg:w-[50%]">
                    <div className="bg-gray-200 rounded-xl h-24 animate-pulse"></div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <div className="flex flex-col gap-3 w-full sm:w-1/2">
                        <div className="bg-gray-200 rounded-xl h-24 animate-pulse"></div>
                        <div className="bg-gray-200 rounded-xl h-24 animate-pulse"></div>
                      </div>
                      <div className="space-y-3 sm:space-y-6 lg:space-y-3 w-full sm:w-1/2">
                        <div className="bg-gray-200 rounded-xl h-48 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-[50%]">
                    <div className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-xl h-96 animate-pulse"></div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-3 justify-start items-start w-full">
                <div className="flex flex-col gap-3 justify-start items-center w-full lg:w-[65%]">
                  <div className="flex flex-col sm:flex-row gap-3 justify-start items-center w-full">
                    <PerformingCompanyCard companyInfo={displayData.topCompany} />
                    <PerformingCompanyCard companyInfo={displayData.bottomCompany} />
                  </div>

                  <div className="flex flex-col lg:flex-row gap-3 justify-start items-start w-full">
                    <div className="flex flex-col gap-3 justify-start w-full lg:w-[50%]">
                      <MetricsCard
                        title="Exposure"
                        value={isTransportationAutomobiles ? "$ 107,245" : "$ 350,333"}
                        unit="Million"
                        changePercentage={isTransportationAutomobiles ? "19%" : "19%"}
                        isPositive={true}
                        hasLeftBorder={true}
                      />

                      <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <div className="flex flex-col gap-3 w-full sm:w-1/2">
                          <MetricsCard
                            title="Industry ESG Score"
                            value={isTransportationAutomobiles ? "69%" : "68%"}
                            changePercentage={isTransportationAutomobiles ? "40%" : "40%"}
                            isPositive={true}
                            hasLeftBorder={true}
                          />
                          <MetricsCard
                            title="PCHI"
                            value={isTransportationAutomobiles ? "42%" : "28%"}
                            changePercentage={isTransportationAutomobiles ? "40%" : "40%"}
                            isPositive={true}
                            hasLeftBorder={true}
                          />
                        </div>
                        <div className="space-y-3 sm:space-y-6 lg:space-y-3">
                          <div
                            className="border-l-[3px] border-purple-500 rounded-none p-2 sm:p-4 lg:p-3 bg-card rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                            style={{ background: 'white' }}
                          >
                            <div className="space-y-2 sm:space-y-4 lg:space-y-3">
                              {displayData.esgRatings?.map((rating, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-3 sm:gap-4 lg:gap-3 py-2 border-b border-border-light last:border-b-0"
                                >
                                  <img
                                    src={rating?.icon}
                                    alt={rating?.title}
                                    className="w-12 h-12 sm:w-14 sm:h-14"
                                  />
                                  <div className="flex-1">
                                    <div className="text-lg sm:text-xl font-normal text-text-primary">
                                      {rating?.percentage}
                                    </div>
                                    <div className="text-sm sm:text-lg font-bold text-text-primary">
                                      {rating?.title}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-start items-center w-full lg:w-[50%]">
                      <div
                        className="w-full p-2 bg-card rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                        style={{ background: 'white' }}
                      >
                        <ESGChart data={displayData.esgChartData} />
                      </div>
                    </div>
                  </div>

                  <div
                    className="w-full p-2 bg-card rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                    style={{ background: 'white' }}
                  >
                    <CompaniesTable />
                  </div>
                </div>

                <div className="flex flex-col justify-start items-center w-full lg:w-[35%] gap-3">
                  <div className="w-full rounded-xl">
                    <ScopeMetricsSection
                      portfolioScopes={displayData.scopeMetrics.portfolioScopes}
                      scope3={displayData.scopeMetrics.scope3}
                      portfolioOthers={displayData.scopeMetrics.portfolioOthers}
                    />
                  </div>

                  <div className="w-full">
                    <RiskBreakdownSection />
                  </div>

                  <div className="w-full">
                    <ThambiInsights />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default SectorsPerformanceAnalysis;