import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/common/Header';
import Button from '../../components/ui/Button';
import CircleProgressBar from '../../components/ui/CircleProgressBar';
import Chart from '../../components/ui/Chart';
import Line from '../../components/ui/Line';
import List from '../../components/ui/List';
import EditText from '../../components/ui/EditText';

const PortfolioClimateRisk = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1 Year');
  const [timeButtons, setTimeButtons] = useState([
    { label: '3 Months', active: false },
    { label: '6 Months', active: false },
    { label: '1 Year', active: true },
    { label: 'All Time', active: false },
  ]);

  const handleTimeButtonClick = (label: string) => {
    setSelectedPeriod(label);
    setTimeButtons(timeButtons.map(button => ({
      ...button,
      active: button.label === label
    })));
  };

  const portfolioScopes = [
    {
      title: 'Total Portfolio Scope 1',
      value: '3,036,504',
      unit: 't CO2e',
      change: '10%',
      isPositive: true,
    },
    {
      title: 'Total Portfolio Scope 2', 
      value: '3,711,282',
      unit: 't CO2e',
      change: '2%',
      isPositive: false,
    },
    {
      title: 'Total Portfolio Scope 3',
      value: '60,730,080', 
      unit: 't CO2e',
      change: '4%',
      isPositive: true,
    },
  ];

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

  const topCompany = {
    name: 'Eternal Limited',
    sector: 'Software & IT Services',
    avatar: '/images/img_avatar.png',
  };

  const bottomCompany = {
    name: 'Shell',
    sector: 'Crude Oil Petroleum & Natural Gas', 
    avatar: '/images/img_avatar_24x24.png',
  };

  // Sample data points for the Climate Risk Exposure Matrix
  const climateRiskData = {
    datasets: [
      {
        label: 'Low Risk',
        data: [
          { x: 400000, y: 20, company: 'Company A' },
          { x: 600000, y: 30, company: 'Company B' },
          { x: 800000, y: 40, company: 'Company C' },
          { x: 1000000, y: 25, company: 'Company D' },
        ],
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
        borderColor: 'rgba(79, 70, 229, 1)',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'Medium Risk',
        data: [
          { x: 1200000, y: 60, company: 'Company E' },
          { x: 1400000, y: 65, company: 'Company F' },
          { x: 1600000, y: 70, company: 'Company G' },
          { x: 1800000, y: 55, company: 'Company H' },
        ],
        backgroundColor: 'rgba(245, 158, 11, 0.7)',
        borderColor: 'rgba(245, 158, 11, 1)',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'High Risk',
        data: [
          { x: 2000000, y: 85, company: 'Company I' },
          { x: 2200000, y: 90, company: 'Company J' },
          { x: 2400000, y: 95, company: 'Company K' },
        ],
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderColor: 'rgba(239, 68, 68, 1)',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  // Chart options for the Climate Risk Exposure Matrix
  const climateRiskChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: function(value) {
            return value + '%';
          },
          font: {
            family: 'Inter, sans-serif',
            size: 10,
            weight: '500',
          },
          color: '#6B7280',
        },
        title: {
          display: true,
          text: 'Climate Hazard Index (PCH)',
          font: {
            family: 'Inter, sans-serif',
            size: 12,
            weight: '600',
          },
          color: '#374151',
          padding: { top: 10, bottom: 10 },
        },
        grid: {
          color: 'rgba(209, 213, 219, 0.5)',
          drawBorder: true,
          borderDash: [5, 5],
        },
      },
      x: {
        min: 200000,
        max: 2400000,
        ticks: {
          stepSize: 200000,
          callback: function(value) {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + 'M';
            } else {
              return (value / 1000).toFixed(0) + 'K';
            }
          },
          font: {
            family: 'Inter, sans-serif',
            size: 10,
            weight: '500',
          },
          color: '#6B7280',
        },
        title: {
          display: true,
          text: 'Exposure (In Million ₹)',
          font: {
            family: 'Inter, sans-serif',
            size: 12,
            weight: '600',
          },
          color: '#374151',
          padding: { top: 10, bottom: 10 },
        },
        grid: {
          color: 'rgba(209, 213, 219, 0.5)',
          drawBorder: true,
          borderDash: [5, 5],
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: 'Inter, sans-serif',
            size: 12,
            weight: '600',
          },
          color: '#374151',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.raw.company}: ${context.raw.y}% PCH, ₹${context.raw.x.toLocaleString()} exposure`;
          },
        },
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1F2937',
        bodyColor: '#4B5563',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        titleFont: {
          family: 'Inter, sans-serif',
          size: 12,
          weight: '600',
        },
        bodyFont: {
          family: 'Inter, sans-serif',
          size: 11,
        },
        padding: 10,
        cornerRadius: 8,
      },
    },
  };

  // Updated Financed Emissions chart data and options
  const financedEmissionsData = {
    labels: ['2024', '2025', '2026', '2027', '2028', '2029'],
    datasets: [
      {
        label: 'Financed Emissions',
        data: [1000, 800, 600, 400, 200, 0],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#EF4444',
        pointBorderColor: '#FFFFFF',
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const financedEmissionsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 1000,
        ticks: {
          stepSize: 200,
          callback: function(value) {
            return value + 'k';
          },
          font: {
            family: 'Inter, sans-serif',
            size: 10,
            weight: '500',
          },
          color: '#6B7280',
        },
        title: {
          display: true,
          text: 't CO2e',
          font: {
            family: 'Inter, sans-serif',
            size: 12,
            weight: '600',
          },
          color: '#374151',
          padding: { top: 10, bottom: 10 },
        },
        grid: {
          color: 'rgba(209, 213, 219, 0.5)',
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif',
            size: 10,
            weight: '500',
          },
          color: '#6B7280',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1F2937',
        bodyColor: '#4B5563',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        titleFont: {
          family: 'Inter, sans-serif',
          size: 12,
          weight: '600',
        },
        bodyFont: {
          family: 'Inter, sans-serif',
          size: 11,
        },
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            return `Financed Emissions: ${context.raw}k t CO2e`;
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.3,
      },
    },
  };

  const pchiValue = 28; 
  const needleRotation = (pchiValue / 100) * 180 - 90;

  return (
    <>
      <Helmet>
        <title>Cockpit | ESG Analytics Platform</title>
        <meta name="description" content="Comprehensive climate risk assessment dashboard for investment portfolios. Monitor ESG ratings, emissions data, and climate hazard metrics for informed investment decisions." />
        <meta property="og:title" content="Portfolio Climate Risk Dashboard | ESG Analytics Platform" />
        <meta property="og:description" content="Comprehensive climate risk assessment dashboard for investment portfolios. Monitor ESG ratings, emissions data, and climate hazard metrics for informed investment decisions." />
      </Helmet>
      <main className="w-full bg-background-main">
        <Header />

        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-3">
          <div className="bg-background-card rounded-none p-3 sm:p-6 lg:p-3 mb-3 overflow-y-auto">
            
            <div className="flex justify-end mb-6 sm:mb-8 lg:mb-6">
              <div className="flex bg-gray-200 rounded-xl overflow-hidden w-[380px] h-[25px] p-1">
                {timeButtons.map((button, index) => (
                  <button
                    key={button.label}
                    className={`flex-1 flex items-center justify-center text-sm font-semibold font-Inter text-center transition-all duration-200 ${
                      button.active 
                        ? 'bg-primary-background text-text-white rounded-lg' 
                        : 'bg-transparent text-text-secondary hover:bg-purple-200'
                    }`}
                    onClick={() => handleTimeButtonClick(button.label)}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 lg:gap-3 mb-6 sm:mb-8 lg:mb-6">
              
              <div className="space-y-3 sm:space-y-6 lg:space-y-3">
                
                <List direction="row" className="gap-3 sm:gap-6 lg:gap-3">
                <div className="flex-1 bg-[#ecf2ff7f] border-l-[3px] border-amber-400 rounded-none p-2 sm:p-4 lg:p-2">
                <div className="flex justify-end items-center mb-2">
                  <img src="/images/img_arrow_drop_up_red_500.svg" alt="Increase" className="w-3 h-3 mr-1" />
                  <span className="text-xs sm:text-sm font-normal text-gray-600">17%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-2xl sm:text-3xl lg:text-3xl font-semibold text-gray-800 mb-1">28%</div>
                    <div className="text-xs sm:text-base font-medium text-gray-800">Portfolio Climate Hazard Index (PCHI)</div>
                  </div>
                  
                  <div className="flex-shrink-0 ml-4">
                    <div className="relative w-20 h-12 sm:w-24 sm:h-14">
                      <svg 
                        viewBox="0 0 100 50" 
                        className="w-full h-full"
                        style={{ overflow: 'visible' }}
                      >
                        <path
                          d="M 15 45 A 35 35 0 0 1 35 15"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                        
                        <path
                          d="M 35 15 A 35 35 0 0 1 65 15"
                          fill="none"
                          stroke="#eab308"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                        
                        <path
                          d="M 65 15 A 35 35 0 0 1 85 45"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                        
                        <path
                          d="M 15 45 A 35 35 0 0 1 85 45"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        
                        <circle
                          cx="50"
                          cy="45"
                          r="3"
                          fill="#374151"
                        />
                        
                        <line
                          x1="50"
                          y1="45"
                          x2="50"
                          y2="20"
                          stroke="#374151"
                          strokeWidth="2"
                          strokeLinecap="round"
                          transform={`rotate(${needleRotation} 50 45)`}
                        />
                      </svg>
                      
                      <div className="absolute inset-0 flex justify-between items-end text-[8px] text-gray-500 px-1">
                        <span>0</span>
                        <span className="transform translate-x-1">50</span>
                        <span>100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                    <div className="flex-1 bg-[#ecf2ff7f] border-l-[3px] border-accent-warning rounded-none p-2 sm:p-4 lg:p-2">
                    <div className="flex justify-end items-center mb-2">
                      <img src="/images/img_arrow_drop_up.svg" alt="Increase" className="w-3 h-3 mr-1" />
                      <span className="text-xs sm:text-sm font-normal text-text-dark">19%</span>
                    </div>
                    
                    <div className="text-2xl sm:text-3xl lg:text-3xl font-semibold text-text-primary mb-1">
                      <span>₹ 64,55,699 </span>
                      <span className="text-lg sm:text-xl">Million</span>
                    </div>
                    <div className="text-xs sm:text-base font-medium text-text-primary">Total Portfolio Exposure</div>
                  </div>
                </List>

                <div className="bg-background-light rounded-xl p-3 sm:p-6 lg:p-3">
                  <h3 className="text-md sm:text-lg font-bold text-primary-dark mb-4 sm:mb-6 lg:mb-4">Climate Risk Exposure Matrix</h3>
                  <div className="h-[250px]">
                    <Chart 
                      chartType="scatter"
                      data={climateRiskData}
                      options={climateRiskChartOptions}
                      title="Climate Risk Exposure Matrix showing portfolio companies plotted by exposure amount and climate hazard index"
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-text-secondary">
                    <span>Low Exposure / Low Risk</span>
                    <span>High Exposure / High Risk</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-6 lg:space-y-3">
                
                <List direction="row" className="gap-2 sm:gap-4 lg:gap-2">
                  {portfolioScopes?.map((scope, index) => (
                    <div key={index} className="flex-1">
                      <div className="bg-background-light border-b border-background-overlay rounded-t-xl p-2 sm:p-4 lg:p-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm font-semibold text-text-primary">{scope?.title}</span>
                          <div className="flex items-center">
                            <img 
                              src={scope?.isPositive ? "/images/img_arrow_drop_up_red_500.svg" : "/images/img_arrow_drop_up.svg"} 
                              alt={scope?.isPositive ? "Increase" : "Decrease"} 
                              className="w-3 h-3 mr-1" 
                            />
                            <span className="text-xs font-normal text-text-dark">{scope?.change}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-background-card border-l border-r border-b border-background-overlay rounded-b-xl p-2 sm:p-4 lg:p-2">
                        <div className="text-lg sm:text-2xl font-semibold text-text-primary text-center">
                          <span>{scope?.value} </span>
                          <span className="text-xs sm:text-base">{scope?.unit}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </List>

                <List direction="row" className="gap-2 sm:gap-4 lg:gap-2">
                  <div className="flex-1">
                    <div className="bg-background-light border-b border-background-overlay rounded-t-xl p-2 sm:p-4 lg:p-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-semibold text-text-primary">
                          Portfolio LTIFR
                        </span>
                        <div className="flex items-center">
                          <img
                            src="/images/img_arrow_drop_down_green_500.svg"
                            alt="Decrease"
                            className="w-3 h-3 mr-1"
                          />
                          <span className="text-xs font-normal text-text-dark">20%</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      text="2.4"
                      text_font_size="text-2xl"
                      text_font_family="DM Sans"
                      text_font_weight="font-semibold"
                      text_line_height="leading-2xl"
                      text_text_align="center"
                      text_color="text-text-primary"
                      fill_background_color="bg-background-card"
                      border_border_radius="rounded-none rounded-b-xl"
                      border_border_right="border-r border-background-overlay"
                      border_border_left="border-l border-background-overlay"
                      border_border_bottom="border-b border-background-overlay"
                      padding="py-4 px-8"
                      className="w-full"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="bg-background-light border-b border-background-overlay rounded-t-xl p-2 sm:p-4 lg:p-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-semibold text-text-primary">
                          Active Legal Cases in your Portfolio
                        </span>
                        <div className="flex items-center">
                          <img
                            src="/images/img_arrow_drop_down_green_500.svg"
                            alt="Decrease"
                            className="w-3 h-3 mr-1"
                          />
                          <span className="text-xs font-normal text-text-dark">2.5%</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      text="57"
                      text_font_size="text-2xl"
                      text_font_family="DM Sans"
                      text_font_weight="font-semibold"
                      text_line_height="leading-2xl"
                      text_text_align="center"
                      text_color="text-text-primary"
                      fill_background_color="bg-background-card"
                      border_border_radius="rounded-none rounded-b-xl"
                      border_border_right="border-r border-background-overlay"
                      border_border_left="border-l border-background-overlay"
                      border_border_bottom="border-b border-background-overlay"
                      padding="py-4 px-8"
                      className="w-full"
                    />
                  </div>
                </List>

                <List direction="row" className="gap-3 sm:gap-6 lg:gap-3">
                  <div className="flex-1 bg-[#ecf2ff7f] border-l-[3px] border-accent-warning rounded-none p-2 sm:p-4 lg:p-2">
                    <div className="flex justify-end items-center mb-2">
                      <img src="/images/img_arrow_drop_up.svg" alt="Increase" className="w-3 h-3 mr-1" />
                      <span className="text-xs sm:text-sm font-normal text-text-dark">15%</span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-lg sm:text-xl font-semibold text-text-primary mb-1">Portfolio ESG Rating</div>
                      <div className="text-2xl sm:text-3xl lg:text-3xl font-semibold text-text-primary">68%</div>
                    </div>

                    <div className="space-y-2 sm:space-y-4 lg:space-y-2">
                      {esgRatings?.map((rating, index) => (
                        <div key={index} className="flex items-center gap-3 sm:gap-4 lg:gap-3 py-2 border-b border-border-light last:border-b-0">
                          <img src={rating?.icon} alt={rating?.title} className="w-12 h-12 sm:w-14 sm:h-14" />
                          <div className="flex-1">
                            <div className="text-lg sm:text-xl font-normal text-text-primary">{rating?.percentage}</div>
                            <div className="text-sm sm:text-lg font-bold text-text-primary">{rating?.title}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 bg-background-light rounded-xl p-3 sm:p-6 lg:p-3">
                    <h3 className="text-md sm:text-lg font-bold text-primary-dark mb-4 sm:mb-6 lg:mb-4">Financed Emissions</h3>
                    <div className="h-[200px]">
                      <Chart 
                        chartType="line"
                        data={financedEmissionsData}
                        options={financedEmissionsOptions}
                        title="Financed Emissions trend over time showing projected reduction in portfolio emissions"
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-text-secondary">
                      <span>2024</span>
                      <span>2025</span>
                      <span>2026</span>
                      <span>2027</span>
                      <span>2028</span>
                      <span>2029</span>
                    </div>
                  </div>
                </List>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 lg:gap-3">
              
              <div className="space-y-3 sm:space-y-6 lg:space-y-3">
                <Button
                  text="Portfolio Risks & Opportunities"
                  text_font_size="text-md"
                  text_font_family="Inter"
                  text_font_weight="font-bold"
                  text_line_height="leading-md"
                  text_text_align="center"
                  text_color="text-primary-dark"
                  fill_background_color="bg-background-light"
                  border_border_radius="rounded-none"
                  border_border_right=""
                  border_border_left=""
                  border_border_bottom=""
                  border_border_top="border-t-[1px] border-border-accent"
                  padding="py-3 px-8"
                  className="w-full"
                />

                <List direction="row" className="gap-2 sm:gap-4 lg:gap-2">
                  <div className="flex-1 bg-background-light rounded-xl p-3 sm:p-6 lg:p-3">
                    <h4 className="text-md font-bold text-primary-dark mb-4">Top Performing Company</h4>
                    
                    <div className="flex items-center gap-3 sm:gap-4 lg:gap-3 p-2 sm:p-4 lg:p-2 border border-background-overlay rounded-base">
                      <div className="flex items-center gap-2 sm:gap-3 lg:gap-2">
                        <img src={topCompany?.avatar} alt={topCompany?.name} className="w-6 h-6 rounded-2xl" />
                        <span className="text-sm font-normal text-text-primary">{topCompany?.name}</span>
                      </div>
                      
                      <Line 
                        fill_background_color="bg-background-overlay"
                        width={1}
                        height={20}
                        className="mx-2"
                      />
                      
                      <div className="flex-1">
                        <span className="text-base font-normal text-text-primary text-center block">{topCompany?.sector}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 bg-background-light rounded-xl p-3 sm:p-6 lg:p-3">
                    <h4 className="text-md font-bold text-primary-dark mb-4">Lowest Performing Company</h4>
                    
                    <div className="flex items-center gap-3 sm:gap-4 lg:gap-3 p-2 sm:p-4 lg:p-2 border border-background-overlay rounded-base">
                      <div className="flex items-center gap-2 sm:gap-3 lg:gap-2">
                        <img src={bottomCompany?.avatar} alt={bottomCompany?.name} className="w-6 h-6 rounded-2xl" />
                        <span className="text-sm font-normal text-text-primary">{bottomCompany?.name}</span>
                      </div>
                      
                      <Line 
                        fill_background_color="bg-background-overlay"
                        width={1}
                        height={20}
                        className="mx-2"
                      />
                      
                      <div className="flex-1">
                        <span className="text-base font-normal text-text-primary text-center block">{bottomCompany?.sector}</span>
                      </div>
                    </div>
                  </div>
                </List>
              </div>

              <div className="space-y-3 sm:space-y-6 lg:space-y-3">
                <Button
                  text="Action Hub"
                  text_font_size="text-md"
                  text_font_family="Inter"
                  text_font_weight="font-bold"
                  text_line_height="leading-md"
                  text_text_align="center"
                  text_color="text-primary-dark"
                  fill_background_color="bg-background-light"
                  border_border_radius="rounded-none"
                  border_border_right=""
                  border_border_left=""
                  border_border_bottom=""
                  border_border_top="border-t-[1px] border-border-accent"
                  padding="py-3 px-8"
                  className="w-full"
                />
                <div className="bg-background-light rounded-xl p-3 sm:p-6 lg:p-3">
                  <h3 className="text-md sm:text-lg font-bold text-primary-dark mb-4 sm:mb-6 lg:mb-4">Action Items</h3>
                  
                  <div className="space-y-3 sm:space-y-6 lg:space-y-3">
                    <div className="flex items-center gap-3 sm:gap-4 lg:gap-3 p-3 sm:p-6 lg:p-3 border border-background-overlay rounded-base">
                      <div className="flex-shrink-0">
                        <img src="/images/img_icon_blue_500.svg" alt="High Priority" className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="text-sm sm:text-base font-semibold text-text-primary">High Priority</div>
                        <div className="text-xs sm:text-sm font-normal text-text-primary">
                          <span>You have </span>
                          <span className="font-semibold">3 high priority</span>
                          <span> action items to complete</span>
                        </div>
                      </div>
                      
                      <Button
                        text="View"
                        text_font_size="text-sm"
                        text_font_family="Inter"
                        text_font_weight="font-semibold"
                        text_line_height="leading-sm"
                        text_text_align="center"
                        text_color="text-text-white"
                        fill_background_color="bg-primary-background"
                        border_border_radius="rounded-base"
                        border_border_right=""
                        border_border_left=""
                        border_border_bottom=""
                        padding="py-2 px-4"
                      />
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 lg:gap-3 p-3 sm:p-6 lg:p-3">
                      <div className="flex-shrink-0">
                        <img src="/images/img_icon_amber_a700.svg" alt="Medium Priority" className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="text-sm sm:text-base font-semibold text-text-primary">Medium Priority</div>
                        <div className="text-xs sm:text-sm font-normal text-text-primary">
                          <span>You have </span>
                          <span className="font-semibold">7 medium priority</span>
                          <span> action items to complete</span>
                        </div>
                      </div>
                      
                      <Button
                        text="View"
                        text_font_size="text-sm"
                        text_font_family="Inter"
                        text_font_weight="font-semibold"
                        text_line_height="leading-sm"
                        text_text_align="center"
                        text_color="text-text-white"
                        fill_background_color="bg-primary-background"
                        border_border_radius="rounded-base"
                        border_border_right=""
                        border_border_left=""
                        border_border_bottom=""
                        padding="py-2 px-4"
                      />
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 lg:gap-3 p-3 sm:p-6 lg:p-3">
                      <div className="flex-shrink-0">
                        <img src="/images/img_icon_green_600.svg" alt="Low Priority" className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="text-sm sm:text-base font-semibold text-text-primary">Low Priority</div>
                        <div className="text-xs sm:text-sm font-normal text-text-primary">
                          <span>You have </span>
                          <span className="font-semibold">12 low priority</span>
                          <span> action items to complete</span>
                        </div>
                      </div>
                      
                      <Button
                        text="View"
                        text_font_size="text-sm"
                        text_font_family="Inter"
                        text_font_weight="font-semibold"
                        text_line_height="leading-sm"
                        text_text_align="center"
                        text_color="text-text-white"
                        fill_background_color="bg-primary-background"
                        border_border_radius="rounded-base"
                        border_border_right=""
                        border_border_left=""
                        border_border_bottom=""
                        padding="py-2 px-4"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PortfolioClimateRisk;