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

const SectorsPerformanceAnalysis = () => {
  return (
    <>
      <Helmet>
        <title>Sectors Performance Analysis Dashboard | ESG Portfolio Analytics Platform</title>
        <meta name="description" content="Comprehensive sector performance analysis with ESG ratings, climate risk metrics, and comparative industry benchmarks. Track environmental, social, and governance indicators across portfolio companies." />
        <meta property="og:title" content="Sectors Performance Analysis Dashboard | ESG Portfolio Analytics Platform" />
        <meta property="og:description" content="Comprehensive sector performance analysis with ESG ratings, climate risk metrics, and comparative industry benchmarks. Track environmental, social, and governance indicators across portfolio companies." />
      </Helmet>

      <main className="w-full bg-background-main">
        <Header />
        <div className="w-full px-3 sm:px-6 lg:px-3">
          <div className="flex flex-col gap-3 justify-start items-center w-full">
            
            <section className="w-full">
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
            </section>

            <section className="w-full">
              <div className="flex flex-col gap-2 justify-start items-center w-full px-3 py-3 bg-background-card">
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
                      <div className="w-full sm:w-1/2 bg-background-light rounded-xl p-3">
                        <div className="flex flex-col gap-2">
                          <span className="text-xl font-bold text-primary-dark">Top Performing Company</span>
                          <div className="flex items-center p-5 bg-white rounded-lg border border-gray-200">
                            <div className="flex items-center gap-5 justify-start flex-grow">
                              <img src="/images/eternal-ltd-logo.png" alt="Eternal Limited Logo" className="h-8 w-8" />
                              <span className="text-sm font-bold text-text-primary">Eternal Limited</span>
                            </div>
                            <div className="border-l border-gray-300 h-6"></div>
                            <span className="text-lg font-bold text-text-secondary pl-5">Software & IT Services</span>
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-background-light ml-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Lowest Performing Company Card */}
                      <div className="w-full sm:w-1/2 bg-background-light rounded-xl p-3">
                        <div className="flex flex-col gap-2">
                          <span className="text-xl font-bold text-primary-dark">Lowest Performing Company</span>
                          <div className="flex items-center p-5 bg-white rounded-lg border border-gray-200">
                            <div className="flex items-center gap-5 justify-start flex-grow">
                              <img src="/images/shell-logo.png" alt="Shell Logo" className="h-8 w-8" />
                              <span className="text-sm font-bold text-text-primary">Shell</span>
                            </div>
                            <div className="border-l border-gray-300 h-6"></div>
                            <span className="text-lg font-bold text-text-secondary pl-5">Crude Oil Petroleum & Natural Gas</span>
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-background-light ml-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-3 justify-start items-start w-full">
                      <div className="flex flex-col gap-3 justify-start items-center w-full lg:w-[50%]">
                        <div className="w-full bg-background-light rounded-xl p-3">
                          <MetricsCard
                            title="Exposure"
                            value="₹ 64,55,699"
                            unit="Million"
                            changePercentage="19%"
                            isPositive={true}
                            hasLeftBorder={true}
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                          <div className="flex flex-col gap-3 w-full sm:w-1/2">
                            <div className="w-full bg-background-light rounded-xl p-3">
                              <MetricsCard
                                title="Industry ESG Score"
                                value="68%"
                                changePercentage="40%"
                                isPositive={true}
                                hasLeftBorder={true}
                              />
                            </div>
                            <div className="w-full bg-background-light rounded-xl p-3">
                              <MetricsCard
                                title="PCHI"
                                value="28%"
                                changePercentage="40%"
                                isPositive={true}
                                hasLeftBorder={true}
                              />
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-4 w-full sm:w-1/2 bg-background-light rounded-xl p-3">
                            <div className="flex gap-4 justify-start items-center w-full flex-1">
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
                            </div>
                          </div>
                        </div>
                      </div>


                      <div className="flex flex-col justify-start items-center w-full lg:w-[50%]">
                        <div className="w-full bg-background-light rounded-xl p-3">
                          <ESGChart />
                        </div>
                      </div>
                    </div>

                    <div className="w-full bg-background-light rounded-xl p-3">
                      <CompaniesTable />
                    </div>
                  </div>

                  <div className="flex flex-col justify-start items-center w-full lg:w-[35%] gap-3">
                    <div className="w-full bg-background-light rounded-xl p-3">
                      <ScopeMetricsSection />
                    </div>

                    <div className="w-full bg-background-light rounded-xl p-3">
                      <RiskBreakdownSection />
                    </div>

                    <div className="w-full bg-background-light rounded-xl p-3">
                      <ThambiInsights />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default SectorsPerformanceAnalysis;