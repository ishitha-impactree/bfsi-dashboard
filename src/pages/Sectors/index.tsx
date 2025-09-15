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
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-3">
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
                <div className="flex justify-center items-center w-full">
                  <div className="flex justify-start items-center w-full">
                    <span className="text-lg font-medium leading-lg text-left font-['Inter']">
                      <span className="text-text-secondary">Sector : </span>
                      <span className="text-text-primary">All</span>
                    </span>
                    <span className="text-lg font-medium leading-lg text-left font-['Inter'] ml-[18px]">
                      <span className="text-text-secondary">Industry : </span>
                      <span className="text-text-primary">All</span>
                    </span>
                  </div>
                  <span className="text-lg font-medium leading-lg text-right text-text-secondary font-['Inter']">
                    Compared to previous 12 months
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row gap-3 justify-start items-start w-full">
                  <div className="flex flex-col gap-[10px] justify-start items-center w-full lg:w-[65%]">
                    <div className="flex flex-col sm:flex-row gap-2 justify-start items-center w-full">
                      <div className="w-full sm:w-[456px] bg-background-light rounded-xl">
                        <CompanyPerformanceCard
                          title="Top Performing Company"
                          companyName="Eternal Limited"
                          companyLogo="/images/img_avatar.png"
                          industry="Software & IT Services"
                          isTopPerformer={true}
                        />
                      </div>
                      <div className="w-full sm:w-[456px] bg-background-light rounded-xl">
                        <CompanyPerformanceCard
                          title="Lowest Performing Company"
                          companyName="Shell"
                          companyLogo="/images/img_avatar_24x24.png"
                          industry="Crude Oil Petroleum & Natural Gas"
                          isTopPerformer={false}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row justify-start items-start w-full">
                      <div className="flex flex-col gap-3 justify-start items-center w-full lg:w-[50%]">
                        <div className="w-full bg-[#ecf2ff7f] rounded-xl">
                          <MetricsCard
                            title="Exposure"
                            value="₹ 64,55,699"
                            unit="Million"
                            changePercentage="19%"
                            isPositive={true}
                            hasLeftBorder={true}
                          />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                          <div className="w-full bg-[#ecf2ff7f] rounded-xl">
                            <MetricsCard
                              title="Industry ESG Score"
                              value="68%"
                              changePercentage="40%"
                              isPositive={true}
                              hasLeftBorder={true}
                            />
                          </div>
                          <div className="w-full bg-[#ecf2ff7f] rounded-xl">
                            <MetricsCard
                              title="PCHI"
                              value="28%"
                              changePercentage="40%"
                              isPositive={true}
                              hasLeftBorder={true}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-start items-center w-full lg:w-[50%] lg:ml-3">
                        <div className="w-full bg-[#ecf2ff7f] rounded-xl px-2 py-2">
                          <div className="flex flex-col gap-[10px] w-full">
                            <ESGRatingCard
                              percentage="72%"
                              title="Environment\nRating"
                              iconSrc="/images/img_group_1000003546.svg"
                            />
                            <ESGRatingCard
                              percentage="45%"
                              title="Social\nRating"
                              iconSrc="/images/img_group_1000003546_light_blue_a200.svg"
                            />
                            <div className="flex gap-[14px] justify-start items-center w-full px-2">
                              <img 
                                src="/images/img_group_1000003546_amber_a700.svg" 
                                alt="Governance icon" 
                                className="w-[56px] h-[56px] self-end"
                              />
                              <div className="flex flex-col justify-start items-start w-full">
                                <span className="text-xl font-normal leading-xl text-left text-text-primary font-['Inter']">
                                  87%
                                </span>
                                <span className="text-lg font-bold leading-lg text-left text-text-primary font-['DM Sans'] whitespace-pre-line">
                                  Governance{'\n'}Rating
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full bg-background-light rounded-xl">
                      <CompaniesTable />
                    </div>
                  </div>

                  <div className="flex flex-col justify-start items-center w-full lg:w-[35%]">
                    <div className="w-full bg-background-light rounded-xl p-3 mb-3">
                      <ESGChart />
                    </div>

                    <div className="w-full mb-3">
                      <ScopeMetricsSection />
                    </div>

                    <div className="w-full bg-background-light rounded-xl mb-3">
                      <RiskBreakdownSection />
                    </div>

                    <div className="w-full bg-background-light rounded-xl">
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