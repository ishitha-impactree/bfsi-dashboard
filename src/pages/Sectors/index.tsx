import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/common/Header';
import TimelineChart from './TimelineChart';
import FilterSection from './FilterSection';
import CompanyPerformanceCard from './CompanyPerformanceCard';
import MetricsCard from './MetricsCard';
import ESGRatingCard from './ESGRatingCard';
import ESGChart from './ESGChart';
import ScopeMetricsSection from './ScopeMetricsSection';
import RiskBreakdownSection from './RiskBreakdownSection';
import CompaniesTable from './CompaniesTable';
import ThambiInsights from './ThambiInsights';
import PerformingCompanyCard from '../../components/ui/PerformingCompanyCard';

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
        {/* <div className="w-full px-3 sm:px-6 lg:px-8" style={{ marginTop: 70 }}>
          <div className="flex flex-col gap-3 justify-start items-center w-full"> */}
        {/* <div className="w-full px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 justify-start w-full"> */}
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
              <div className="w-full lg:w-[26.5%] mt-4 lg:mt-0">
                <div className="bg-background-light rounded-3xl p-2">
                  <FilterSection />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <section className="w-full">
              <div className="flex flex-col lg:flex-row justify-start items-center w-full border-b border-border-primary py-2 px-2 bg-background-card rounded-3xl">
                <div className="flex flex-col gap-1 justify-start items-center w-full lg:w-[80%]">
                  <TimelineChart />
                </div>

                <div className="w-full lg:w-[20%] mt-4 lg:mt-0">
                  <div className="bg-background-light rounded-3xl p-2">
                    <FilterSection />
                  </div>
                </div>
              </div>
            </section> */}

        <section className="w-full px-8 mb-2">
          <div className="flex flex-col gap-2 justify-start items-center w-full px-3 py-3">
            <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-4">
              <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4 sm:gap-6">
                <span className="text-lg font-medium leading-lg text-left font-['Inter']">
                  <span className="text-text-secondary">Sector : </span>
                  <span className="text-text-primary">All</span>
                </span>
                <span className="text-lg font-medium leading-lg text-left font-['Inter']">
                  <span className="text-text-secondary">Industry : </span>
                  <span className="text-text-primary">All</span>
                </span>
              </div>
              <span className="text-lg font-medium leading-lg text-right text-text-secondary font-['Inter'] mt-2 sm:mt-0">
                Compared to previous 12 months
              </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-3 justify-start items-start w-full">
              <div className="flex flex-col gap-3 justify-start items-center w-full lg:w-[65%]">
                <div className="flex flex-col sm:flex-row gap-3 justify-start items-center w-full">
                  {/* Top Performing Company Card */}
                  <PerformingCompanyCard companyInfo={topCompany} />
                  {/* Lowest Performing Company Card */}
                  <PerformingCompanyCard companyInfo={bottomCompany} />
                </div>

                <div className="flex flex-col lg:flex-row gap-3 justify-start items-start w-full">
                  {/* <div className="flex flex-col gap-3 justify-start items-center w-full lg:w-[50%]"> */}
                  <div className="flex flex-col gap-3 justify-start w-full lg:w-[50%]">
                    {/* <div className="w-full bg-background-light rounded-xl p-3"> */}
                    <MetricsCard
                      title="Exposure"
                      value="₹ 64,55,699"
                      unit="Million"
                      changePercentage="19%"
                      isPositive={true}
                      hasLeftBorder={true}
                    />
                    {/* </div> */}

                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <div className="flex flex-col gap-3 w-full sm:w-1/2">
                        {/* <div className="w-full bg-background-light rounded-xl p-3"> */}
                        <MetricsCard
                          title="Industry ESG Score"
                          value="68%"
                          changePercentage="40%"
                          isPositive={true}
                          hasLeftBorder={true}
                        />
                        {/* </div> */}
                        {/* <div className="w-full bg-background-light rounded-xl p-3"> */}
                        <MetricsCard
                          title="PCHI"
                          value="28%"
                          changePercentage="40%"
                          isPositive={true}
                          hasLeftBorder={true}
                        />
                        {/* </div> */}
                      </div>

                      {/* <div className="flex flex-col gap-4 w-full sm:w-1/2 bg-background-light rounded-xl p-3"> */}
                      {/* <div className="flex gap-4 justify-start items-center w-full flex-1">
                              <img
                                src="/images/img_group_1000003546.svg"
                                alt="Environment icon"
                                className="w-14 h-14"
                              />
                              <div className="flex flex-col justify-start items-start w-full">
                                <span className="text-xl font-normal leading-xl text-left text-text-primary font-['Inter']">
                                  72%
                                </span>
                                <span className="text-lg font-bold leading-lg text-left text-text-primary font-['DM Sans']">
                                  Environment Rating
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-4 justify-start items-center w-full flex-1">
                              <img
                                src="/images/img_group_1000003546_light_blue_a200.svg"
                                alt="Social icon"
                                className="w-14 h-14"
                              />
                              <div className="flex flex-col justify-start items-start w-full">
                                <span className="text-xl font-normal leading-xl text-left text-text-primary font-['Inter']">
                                  45%
                                </span>
                                <span className="text-lg font-bold leading-lg text-left text-text-primary font-['DM Sans']">
                                  Social Rating
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-4 justify-start items-center w-full flex-1">
                              <img
                                src="/images/img_group_1000003546_amber_a700.svg"
                                alt="Governance icon"
                                className="w-14 h-14"
                              />
                              <div className="flex flex-col justify-start items-start w-full">
                                <span className="text-xl font-normal leading-xl text-left text-text-primary font-['Inter']">
                                  87%
                                </span>
                                <span className="text-lg font-bold leading-lg text-left text-text-primary font-['DM Sans']">
                                  Governance Rating
                                </span>
                              </div>
                            </div> */}
                      <div className="space-y-3 sm:space-y-6 lg:space-y-3">
                        <div
                          className="border-l-[3px] border-purple-500 rounded-none p-2 sm:p-4 lg:p-3 bg-card rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                          style={{ background: 'white' }}
                        >
                          <div className="space-y-2 sm:space-y-4 lg:space-y-3">
                            {esgRatings?.map((rating, index) => (
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
                      {/* </div> */}
                    </div>
                  </div>

                  <div className="flex flex-col justify-start items-center w-full lg:w-[50%]">
                    <div
                      className="w-full p-2 bg-card rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                      style={{ background: 'white' }}
                    >
                      <ESGChart />
                    </div>
                  </div>
                </div>

                <div
                  // className="w-full bg-background-light rounded-xl p-3"
                  className="w-full p-2 bg-card rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                  style={{ background: 'white' }}
                >
                  <CompaniesTable />
                </div>
              </div>

              <div className="flex flex-col justify-start items-center w-full lg:w-[35%] gap-3">
                <div className="w-full rounded-xl">
                  <ScopeMetricsSection />
                </div>

                {/* <div className="w-full bg-background-light rounded-xl p-3"> */}
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
        {/* </div>
        </div> */}
      </main>
    </>
  );
};

export default SectorsPerformanceAnalysis;
