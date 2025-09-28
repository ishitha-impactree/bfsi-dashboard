import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/common/Header';
import Button from '../../components/ui/Button';
import CircleProgressBar from '../../components/ui/CircleProgressBar';
import Chart from '../../components/ui/Chart';
import Line from '../../components/ui/Line';
import List from '../../components/ui/List';
import EmissionsSummaryTable from './EmissionsSummaryTable';
import EditText from '../../components/ui/EditText';
// import Select from '../../components/ui/Select';
import ComplianceStatusCard from './ComplianceStatusCard';
import ReductionTargetsCard from './ReductionTargetsCard';
import EmissionsTrajectory from './EmissionsTrajectory';
import dynamic from 'next/dynamic';
import Select from '../../components/ui/Select';
import EmissionsKPICard from './EmissionsKPICard';
import PerformingCompanyCard from '../../components/ui/PerformingCompanyCard';
import IndustriesList from './IndustriesList';
import ExposureCard from '../../components/ui/cards/ExposureCard';
import RatingsCard from '../../components/ui/cards/RatingsCard';
import MetricsCardWithUnit from '../../components/ui/cards/MetricsCardWithUnit';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const PortfolioClimateRisk = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1 Year');
  const [timeButtons, setTimeButtons] = useState([
    { label: '3 Months', active: false },
    { label: '6 Months', active: false },
    { label: '1 Year', active: true },
    { label: 'All Time', active: false },
  ]);

  const [scatterChartOptions, setScatterChartOptions] = useState<any>({});
  const [scatterChartSeries, setScatterChartSeries] = useState<any[]>([]);
  const [financedEmissionsOptions, setFinancedEmissionsOptions] = useState<any>({});
  const [financedEmissionsSeries, setFinancedEmissionsSeries] = useState<any[]>([]);

  const [selectedPortfolio, setSelectedPortfolio] = useState('global');
  const [selectedDateRange, setSelectedDateRange] = useState('yearly');
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const portfolioOptions = [
    { value: 'global', label: 'Global Portfolio' },
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia-pacific', label: 'Asia Pacific' },
    { value: 'emerging-markets', label: 'Emerging Markets' },
  ];

  const dateRangeOptions = [
    { value: 'monthly', label: 'Monthly View' },
    { value: 'quarterly', label: 'Quarterly View' },
    { value: 'yearly', label: 'Yearly View' },
  ];

  const kpiData = [
    {
      title: 'Total Financed Emissions',
      value: '2,850',
      unit: 'tCO₂e',
      change: -12.5,
      changeType: 'positive',
      icon: 'Zap',
      trend: [65, 70, 68, 62, 58, 55, 52],
    },
    {
      title: 'Emissions Intensity',
      value: '145.2',
      unit: 'tCO₂e/M$',
      change: -8.3,
      changeType: 'positive',
      icon: 'TrendingDown',
      trend: [45, 48, 46, 42, 38, 35, 32],
    },
    {
      title: 'Reduction Progress',
      value: '26.8',
      unit: '%',
      change: 4.2,
      changeType: 'positive',
      icon: 'Target',
      trend: [25, 28, 30, 32, 35, 38, 42],
    },
    {
      title: 'Compliance Score',
      value: '87',
      unit: '/100',
      change: 2.1,
      changeType: 'positive',
      icon: 'Shield',
      trend: [75, 78, 80, 82, 84, 86, 87],
    },
  ];

  const portfolioExposure = {
    percentage: '19%',
    prefixUnit: '₹',
    value: '64,55,699',
    suffixUnit: 'Million',
    title: 'Total Portfolio Exposure',
  };

  const ratingsCard = {
    percentage: '15%',
    title: 'Portfolio ESG Rating',
    value: '68%',
  };
  const taskList: any = [
    {
      id: 1,
      taskName: 'Review Pending',
      taskDescription: 'Q3 Emissions Report for Pama Sports.',
    },
    {
      id: 2,
      taskName: 'Task Due',
      taskDescription: 'Quarterly Risk Review for the "Chemicals" Sector.',
    },
    {
      id: 3,
      taskName: 'Data Gap',
      taskDescription: 'Missing Scope 3 emissions data for Abibas.',
    },
    {
      id: 4,
      taskName: 'Risk Score Alert',
      taskDescription: "Haldisita's risk score increased 15% to High Risk.",
    },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastRefresh(new Date());
      setIsRefreshing(false);
    }, 2000);
  };

  const formatTime = (date: any) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        handleRefresh();
      },
      15 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scatterOptions = {
      chart: {
        type: 'scatter',
        zoom: {
          enabled: true,
          type: 'xy',
        },
        toolbar: {
          show: false,
        },
        fontFamily: 'Inter, sans-serif',
      },
      colors: ['#8065B3'],
      xaxis: {
        tickAmount: 6,
        labels: {
          formatter: function (val: any) {
            if (val >= 1000000) {
              return (val / 1000000).toFixed(1) + 'M';
            } else {
              return (val / 1000).toFixed(0) + 'K';
            }
          },
          style: {
            fontSize: '10px',
            fontWeight: 500,
            colors: '#6B7280',
          },
        },
        title: {
          text: 'Exposure ( in Million ₹ )',
          style: {
            fontSize: '12px',
            fontWeight: 600,
            color: '#374151',
          },
        },
        min: 200000,
        max: 2400000,
      },
      yaxis: {
        tickAmount: 5,
        min: 0,
        max: 100,
        labels: {
          formatter: function (val: any) {
            return val + '%';
          },
          style: {
            fontSize: '10px',
            fontWeight: 500,
            colors: '#6B7280',
          },
        },
        title: {
          text: 'Portfolio Climate Hazard Index (PCHI)',
          style: {
            fontSize: '12px',
            fontWeight: 600,
            color: '#374151',
          },
        },
      },
      grid: {
        borderColor: 'rgba(209, 213, 219, 0.5)',
        strokeDashArray: 5,
      },
      legend: {
        show: false,
      },
      markers: {
        size: 4,
        strokeWidth: 0,
        fillOpacity: 1,
        shape: 'circle',
      },
      tooltip: {
        custom: function ({ seriesIndex, dataPointIndex, w }: any) {
          const point = w.config.series[seriesIndex].data[dataPointIndex];
          return (
            '<div class="apexcharts-tooltip" style="background-color: rgba(255, 255, 255, 0.95); ' +
            'color: #1F2937; padding: 10px; border-radius: 8px; border: 1px solid #E5E7EB;">' +
            '<div style="font-weight: 600; font-size: 12px; margin-bottom: 5px;">' +
            point.company +
            '</div>' +
            '<div style="font-size: 11px; color: #4B5563;">' +
            point.y +
            '% PCHI, ₹' +
            point.x.toLocaleString() +
            ' exposure</div>' +
            '</div>'
          );
        },
      },
    };

    const scatterSeries = [
      {
        name: 'Portfolio Data',
        data: [
          { x: 200000, y: 22, company: 'Company A' },
          { x: 180000, y: 35, company: 'Company B' },
          { x: 400000, y: 40, company: 'Company C' },
          { x: 550000, y: 35, company: 'Company D' },
          { x: 750000, y: 48, company: 'Company E' },
          { x: 780000, y: 35, company: 'Company F' },
          { x: 1000000, y: 58, company: 'Company G' },
          { x: 1150000, y: 62, company: 'Company H' },
          { x: 1200000, y: 46, company: 'Company I' },
          { x: 1400000, y: 55, company: 'Company J' },
          { x: 1450000, y: 74, company: 'Company K' },
          { x: 1600000, y: 50, company: 'Company L' },
          { x: 1800000, y: 56, company: 'Company M' },
          { x: 2000000, y: 64, company: 'Company N' },
          { x: 2050000, y: 82, company: 'Company O' },
          { x: 2200000, y: 64, company: 'Company P' },
          { x: 2300000, y: 76, company: 'Company Q' },
        ],
      },
    ];

    const areaOptions = {
      chart: {
        type: 'area',
        height: 450,
        toolbar: {
          show: false,
        },
        fontFamily: 'Inter, sans-serif',
        zoom: {
          enabled: false,
        },
      },
      colors: ['#8065B3'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
        colors: ['#8065B3'],
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        categories: ['2024', '2025', '2026', '2027', '2028', '2029'],
        labels: {
          style: {
            fontSize: '10px',
            fontWeight: 500,
            colors: '#6B7280',
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        title: {
          text: 'Year',
          style: {
            fontSize: '12px',
            fontWeight: 600,
            color: '#374151',
          },
        },
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 5,
        labels: {
          formatter: function (val: any) {
            return val + 'k' + 't CO₂e';
          },
          style: {
            fontSize: '10px',
            fontWeight: 500,
            colors: '#6B7280',
          },
        },
        title: {
          text: 'Financed Emissions',
          style: {
            fontSize: '12px',
            fontWeight: 600,
            color: '#374151',
          },
        },
      },
      grid: {
        borderColor: 'rgba(209, 213, 219, 0.5)',
        strokeDashArray: 3,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 10,
        },
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
          const value = series[seriesIndex][dataPointIndex];
          const year = w.globals.labels[dataPointIndex];
          return (
            '<div class="apexcharts-tooltip" style="background-color: rgba(255, 255, 255, 0.95); ' +
            'color: #1F2937; padding: 8px; border-radius: 6px; border: 1px solid #E5E7EB; font-size: 12px;">' +
            '<div style="font-weight: 600; margin-bottom: 4px;">' +
            year +
            '</div>' +
            '<div>Financed Emissions: ' +
            value +
            'k t CO₂e</div>' +
            '</div>'
          );
        },
      },
      markers: {
        size: 0, // Remove points/markers from the chart
      },
    };

    const areaSeries = [
      {
        name: 'Financed Emissions',
        data: [60, 55, 52, 40, 28, 20],
      },
    ];

    setScatterChartOptions(scatterOptions);
    setScatterChartSeries(scatterSeries);
    setFinancedEmissionsOptions(areaOptions);
    setFinancedEmissionsSeries(areaSeries);
  }, []);

  const handleTimeButtonClick = (label: string) => {
    setSelectedPeriod(label);
    setTimeButtons(
      timeButtons.map((button) => ({
        ...button,
        active: button.label === label,
      }))
    );
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

  const portfolioOthers = [
    {
      title: 'Portfolio LTIFR',
      value: '2.4',
      unit: '',
      change: '20%',
      isPositive: false,
    },
    {
      title: 'Active Legal Cases in your Portfolio',
      value: '57',
      unit: '',
      change: '2.5%',
      isPositive: false,
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

  const pchiValue = 28;
  const needleRotation = (pchiValue / 100) * 180 - 90;

  // const top5Industries = [
  //   'Software & IT Services',
  //   'Drugs and Pharmaceuticals',
  //   'Commercial Real Estate',
  //   'Logistics and Auxiliary transport activities',
  //   'Automobiles (Including Ancillaries)',
  // ];

  const top5Industries = {
    name: 'Top 5 Industries',
    list: [
      'Software & IT Services',
      'Drugs and Pharmaceuticals',
      'Commercial Real Estate',
      'Logistics and Auxiliary transport activities',
      'Automobiles (Including Ancillaries)',
    ],
  };

  const bottom5Industries = {
    name: 'Top 5 Industries',
    list: [
      'Software & IT Services',
      'Drugs and Pharmaceuticals',
      'Commercial Real Estate',
      'Logistics and Auxiliary transport activities',
      'Automobiles (Including Ancillaries)',
    ],
  };

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

  const rightSideContent = (
    <div className="space-y-3 sm:space-y-6 lg:space-y-3">
      <List direction="row" className="gap-2 sm:gap-4 lg:gap-2">
        {portfolioScopes?.map((scope, index) => (
          // <div key={index} className="flex-1">
          //   <div className="bg-background-light border-b border-background-overlay rounded-t-xl p-4 sm:p-6 lg:p-4">
          //     <div className="flex justify-between items-center">
          //       <span className="text-sm sm:text-base font-semibold text-text-primary">
          //         {scope?.title}
          //       </span>
          //       <div className="flex items-center">
          //         <img
          //           src={
          //             scope?.isPositive
          //               ? '/images/img_arrow_drop_up_red_500.svg'
          //               : '/images/img_arrow_drop_down_green_500.svg'
          //           }
          //           alt={scope?.isPositive ? 'Increase' : 'Decrease'}
          //           className="w-3 h-3 mr-1"
          //         />
          //         <span className="text-xs font-normal text-text-dark">{scope?.change}</span>
          //       </div>
          //     </div>
          //   </div>

          //   <div className="bg-background-card border-l border-r border-b border-background-overlay rounded-b-xl p-4 sm:p-6 lg:p-4">
          //     <div className="text-2xl sm:text-3xl font-semibold text-text-primary text-center">
          //       <span>{scope?.value} </span>
          //       <span className="text-xs sm:text-base">{scope?.unit}</span>
          //     </div>
          //   </div>
          // </div>
          <MetricsCardWithUnit cardData={scope} idx={index} />
        ))}
      </List>

      <List direction="row" className="gap-2 sm:gap-4 lg:gap-2">
        <div className="flex-1">
          <div className="bg-background-light border-b border-background-overlay rounded-t-xl p-4 sm:p-6 lg:p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base font-semibold text-text-primary">
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
            text_font_size="text-3xl"
            text_font_family="DM Sans"
            text_font_weight="font-semibold"
            text_line_height="leading-3xl"
            text_text_align="center"
            text_color="text-text-primary"
            fill_background_color="bg-background-card"
            border_border_radius="rounded-none rounded-b-xl"
            border_border_right="border-r border-background-overlay"
            border_border_left="border-l border-background-overlay"
            border_border_bottom="border-b border-background-overlay"
            padding="py-6 px-10"
            className="w-full"
          />
        </div>

        <div className="flex-1">
          <div className="bg-background-light border-b border-background-overlay rounded-t-xl p-4 sm:p-6 lg:p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base font-semibold text-text-primary">
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
            text_font_size="text-3xl"
            text_font_family="DM Sans"
            text_font_weight="font-semibold"
            text_line_height="leading-3xl"
            text_text_align="center"
            text_color="text-text-primary"
            fill_background_color="bg-background-card"
            border_border_radius="rounded-none rounded-b-xl"
            border_border_right="border-r border-background-overlay"
            border_border_left="border-l border-background-overlay"
            border_border_bottom="border-b border-background-overlay"
            padding="py-6 px-10"
            className="w-full"
          />
        </div>
      </List>

      <List direction="row" className="gap-3 sm:gap-6 lg:gap-3">
        <div className="flex-1 space-y-3 sm:space-y-6 lg:space-y-3">
          <div className="bg-[#ecf2ff7f] border-l-[3px] border-accent-warning rounded-none p-2 sm:p-4 lg:p-2">
            <div className="flex justify-end items-center mb-2">
              <img src="/images/img_arrow_drop_up.svg" alt="Increase" className="w-3 h-3 mr-1" />
              <span className="text-xs sm:text-sm font-normal text-text-dark">15%</span>
            </div>

            <div className="mb-4">
              <div className="text-lg sm:text-xl font-semibold text-text-primary mb-1">
                Portfolio ESG Rating
              </div>
              <div className="text-2xl sm:text-3xl lg:text-3xl font-semibold text-text-primary">
                68%
              </div>
            </div>
          </div>

          <div className="bg-[#ecf2ff7f] border-l-[3px] border-accent-warning rounded-none p-2 sm:p-4 lg:p-2">
            <div className="space-y-2 sm:space-y-4 lg:space-y-2">
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

        <div className="flex-1 bg-background-light rounded-xl p-3 sm:p-6 lg:p-3">
          <h3 className="text-md sm:text-lg font-bold text-primary-dark mb-4 sm:mb-6 lg:mb-4">
            Financed Emissions
          </h3>
          <div className="h-[450px]">
            {typeof window !== 'undefined' && (
              <ReactApexChart
                options={financedEmissionsOptions}
                series={financedEmissionsSeries}
                type="area"
                height="100%"
              />
            )}
          </div>
        </div>
      </List>
    </div>
  );

  const DiamondCounter = ({ color, value }: { color: string; value: number | string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(12,12)">
        <rect
          x="-9"
          y="-9"
          width="18"
          height="18"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="2"
          transform="rotate(45)"
          rx="2"
          ry="2"
        />
        <rect
          x="-5"
          y="-5"
          width="10"
          height="10"
          fill={color}
          transform="rotate(45)"
          rx="1"
          ry="1"
        />
        {/* <text x="0" y="4" textAnchor="middle" fontSize="10" fontWeight="700" fill="#FFFFFF">
          {String(value)}
        </text> */}
      </g>
    </svg>
  );

  const actionHubContent = (
    <div className="space-y-3 sm:space-y-6 lg:space-y-3" style={{ background: '#f1f6ff' }}>
      <Button
        text="Action Hub"
        text_font_size="text-md"
        text_font_family="Inter"
        text_font_weight="font-bold"
        text_line_height="leading-lg"
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
        style={{ background: 'white' }}
      />
      <div className="bg-background-light rounded-xl p-3 sm:p-6 lg:p-0">
        <List direction="row" className="gap-3 sm:gap-4 lg:gap-3 mb-4">
          <div
            className="flex-1 flex flex-col sm:flex-row justify-between items-center bg-[#ecf2ff7f] border-l-[3px] border-purple-500 rounded-none p-3 sm:p-4 lg:p-3 bg-card rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
            style={{ background: 'white' }}
          >
            <div>
              <p className="text-sm sm:text-base font-semibold text-text-primary">Pending Items</p>
              <p
                className="text-2xl sm:text-base font-semibold text-text-primary"
                style={{ fontSize: '24px' }}
              >
                5
              </p>
            </div>
            <div className="flex items-center gap-2">
              <DiamondCounter color="#8065B3" value="0" />
            </div>
          </div>
          <div
            className="flex-1 flex flex-col sm:flex-row justify-between items-center bg-[#ecf2ff7f] border-l-[3px] border-purple-500 rounded-none p-3 sm:p-4 lg:p-3 bg-card rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
            style={{ background: 'white' }}
          >
            <div>
              <p className="text-sm sm:text-base font-semibold text-text-primary">
                Critical Points
              </p>
              <p
                className="text-2xl sm:text-base font-semibold text-text-primary"
                style={{ fontSize: '24px' }}
              >
                3
              </p>
            </div>
            <div className="flex items-center gap-2">
              <DiamondCounter color="#EF4444" value={3} />
            </div>
          </div>
        </List>

        <h3 className="text-md sm:text-lg font-bold text-primary-dark mb-4 sm:mb-6 lg:mb-2">
          Task List
        </h3>

        <div
          className="space-y-3 sm:space-y-6 lg:space-y-0 bg-card rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
          style={{ height: 240, background: 'white' }}
        >
          {taskList?.map((task: any) => {
            return (
              <div
                key={task?.id}
                className="flex items-center gap-3 sm:gap-4 lg:gap-3 p-3 sm:p-6 lg:p-3 border border-background-overlay rounded-base"
              >
                <img src="/images/purple-diamond.svg" alt="Review Pending" className="w-6 h-6" />
                <div className="flex-1">
                  <div className="text-md sm:text-base font-semibold text-text-primary">
                    {task?.taskName}
                  </div>
                  <div className="text-sm sm:text-sm font-normal text-text-primary">
                    {task?.taskDescription}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const OldReductionTargetsCard = () => (
    <div className="bg-background-light rounded-xl p-3 sm:p-6 lg:p-3 space-y-4">
      <h3 className="text-md sm:text-lg font-bold text-primary-dark mb-4 sm:mb-6 lg:mb-4">
        Reduction Targets
      </h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 border-b border-border-light last:border-b-0">
          <div className="text-sm sm:text-base font-normal text-text-primary">Target 1</div>
          <div className="text-sm sm:text-base font-semibold text-green-500">On Track</div>
        </div>
        <div className="flex items-center justify-between p-2 border-b border-border-light last:border-b-0">
          <div className="text-sm sm:text-base font-normal text-text-primary">Target 2</div>
          <div className="text-sm sm:text-base font-semibold text-yellow-500">At Risk</div>
        </div>
        <div className="flex items-center justify-between p-2 border-b border-border-light last:border-b-0">
          <div className="text-sm sm:text-base font-normal text-text-primary">Target 3</div>
          <div className="text-sm sm:text-base font-semibold text-green-500">On Track</div>
        </div>
      </div>
    </div>
  );

  const OldComplianceStatusCard = () => (
    <div className="bg-background-light rounded-xl p-3 sm:p-6 lg:p-3 space-y-4">
      <h3 className="text-md sm:text-lg font-bold text-primary-dark mb-4 sm:mb-6 lg:mb-4">
        Compliance Status
      </h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 border-b border-border-light last:border-b-0">
          <div className="text-sm sm:text-base font-normal text-text-primary">Regulation A</div>
          <div className="text-sm sm:text-base font-semibold text-green-500">In Compliance</div>
        </div>
        <div className="flex items-center justify-between p-2 border-b border-border-light last:border-b-0">
          <div className="text-sm sm:text-base font-normal text-text-primary">Regulation B</div>
          <div className="text-sm sm:text-base font-semibold text-red-500">Non-Compliant</div>
        </div>
        <div className="flex items-center justify-between p-2 border-b border-border-light last:border-b-0">
          <div className="text-sm sm:text-base font-normal text-text-primary">Regulation C</div>
          <div className="text-sm sm:text-base font-semibold text-green-500">In Compliance</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Cockpit | ESG Analytics Platform</title>
        <meta
          name="description"
          content="Comprehensive climate risk assessment dashboard for investment portfolios. Monitor ESG ratings, emissions data, and climate hazard metrics for informed investment decisions."
        />
        <meta
          property="og:title"
          content="Portfolio Climate Risk Dashboard | ESG Analytics Platform"
        />
        <meta
          property="og:description"
          content="Comprehensive climate risk assessment dashboard for investment portfolios. Monitor ESG ratings, emissions data, and climate hazard metrics for informed investment decisions."
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
                <h1 className="text-2xl font-semibold text-foreground">Emissions Overview</h1>
                <p className="text-md text-muted-foreground mt-1">
                  Portfolio-wide carbon footprint monitoring and compliance tracking
                </p>
              </div>
              <div className="flex justify-end mb-0 sm:mb-8 lg:mb-0">
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
            </div>
          </div>
        </div>
        <div className="w-full px-8" style={{ background: '#f8fafc' }}>
          {/* <div className="bg-background-card rounded-none p-3 sm:p-6 lg:p-3 mb-3 overflow-y-auto"> */}
          <div className="rounded-none p-3 sm:p-6 lg:p-3 mb-3 overflow-y-auto">
            <div className="max-w-7xl mx-auto py-8">
              {/* <div className="w-100 py-4"> */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-0"> */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-0">
                {kpiData?.map((kpi: any, index: any) => (
                  <EmissionsKPICard
                    key={index}
                    title={kpi?.title}
                    value={kpi?.value}
                    unit={kpi?.unit}
                    change={kpi?.change}
                    changeType={kpi?.changeType}
                    icon={kpi?.icon}
                    trend={kpi?.trend}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 lg:gap-3 mb-6 sm:mb-8 lg:mb-6">
              <div className="space-y-3 sm:space-y-6 lg:space-y-3">
                <List direction="row" className="gap-3 sm:gap-6 lg:gap-3">
                  <div
                    // className="flex-1 bg-[#ecf2ff7f] border-l-[3px] border-amber-400 rounded-none p-2 sm:p-4 lg:p-2"
                    className="flex-1 bg-[#ecf2ff7f] border-l-[3px] border-purple-500 rounded-none p-2 sm:p-4 lg:p-2 bg-card rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                    style={{ background: 'white' }}
                  >
                    <div className="flex justify-end items-center mb-2">
                      <img
                        src="/images/img_arrow_drop_up_red_500.svg"
                        alt="Increase"
                        className="w-3 h-3 mr-1"
                      />
                      <span className="text-xs sm:text-sm font-normal text-gray-600">17%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-2xl sm:text-3xl lg:text-3xl font-semibold text-gray-800 mb-0">
                          28%
                        </div>
                        <div className="text-xs sm:text-base font-medium text-gray-800">
                          Portfolio Climate Hazard Index (PCHI)
                        </div>
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

                            <circle cx="50" cy="45" r="3" fill="#374151" />

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
                        </div>
                      </div>
                    </div>
                  </div>
                  <ExposureCard cardData={portfolioExposure} />
                </List>
                {/* <div
                  // className="bg-[#ecf2ff7f] border-l-[3px] border-accent-warning rounded-none p-2 sm:p-4 lg:p-2"
                  className="flex-1 bg-[#ecf2ff7f] border-l-[3px] border-purple-500 rounded-none p-2 sm:p-4 lg:p-2 bg-card rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                  style={{ background: 'white' }}
                >
                  <div className="flex justify-end items-center mb-2">
                    <img
                      src="/images/img_arrow_drop_up.svg"
                      alt="Increase"
                      className="w-3 h-3 mr-1"
                    />
                    <span className="text-xs sm:text-sm font-normal text-text-dark">15%</span>
                  </div>

                  <div className="mb-2">
                    <div className="text-lg sm:text-xl font-semibold text-text-primary mb-0">
                      Portfolio ESG Rating
                    </div>
                    <div className="text-2xl sm:text-3xl lg:text-3xl font-semibold text-text-primary">
                      68%
                    </div>
                  </div>
                </div> */}
                <RatingsCard cardData={ratingsCard} />
                <div
                  // className="bg-background-light rounded-xl p-3 sm:p-6 lg:p-5"
                  className="bg-background-light rounded-xl p-3 sm:p-6 lg:p-5 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                  style={{ background: 'white' }}
                >
                  <h3 className="text-md sm:text-lg font-bold text-primary-dark mb-4 sm:mb-6 lg:mb-4">
                    Climate Risk Exposure Matrix
                  </h3>
                  <div className="h-[300px]">
                    {typeof window !== 'undefined' && (
                      <ReactApexChart
                        options={scatterChartOptions}
                        series={scatterChartSeries}
                        type="scatter"
                        height="100%"
                      />
                    )}
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-text-secondary">
                    <span>Low Exposure / Low Risk</span>
                    <span>High Exposure / High Risk</span>
                  </div>
                </div>
                <EmissionsTrajectory />
                {/* <ReductionTargetsCard /> */}
              </div>

              <div className="space-y-3 sm:space-y-6 lg:space-y-3">
                <List direction="row" className="gap-2 sm:gap-4 lg:gap-2">
                  {portfolioScopes?.map((scope, index) => (
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
                            <span className="text-sm font-normal text-text-dark">
                              {scope?.change}
                            </span>
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
                            <span className="text-sm font-normal text-text-dark">
                              {scope?.change}
                            </span>
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

                <div className="bg-background-light border border-border rounded-xl p-3 sm:p-6 lg:p-3">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 lg:gap-3">
                    <div className="space-y-3 sm:space-y-6 lg:space-y-3">
                      <div
                        className="border-l-[3px] border-purple-500 rounded-none p-2 sm:p-4 lg:p-5"
                        style={{ background: 'white' }}
                      >
                        <div className="space-y-2 sm:space-y-4 lg:space-y-4">
                          {esgRatings?.map((rating, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 sm:gap-4 lg:gap-3 py-6 border-b border-border-light last:border-b-0"
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

                    <div
                      className="flex-1 bg-background-light rounded-xl p-3 sm:p-6 lg:p-5"
                      style={{ background: 'white' }}
                    >
                      <h3 className="text-md sm:text-lg font-bold text-primary-dark mb-4 sm:mb-6 lg:mb-4">
                        Financed Emissions
                      </h3>
                      <div className="h-[305px]">
                        {typeof window !== 'undefined' && (
                          <ReactApexChart
                            options={financedEmissionsOptions}
                            series={financedEmissionsSeries}
                            type="area"
                            height="100%"
                          />
                        )}
                      </div>
                      {/* <ComplianceStatusCard /> */}
                    </div>
                  </div>
                </div>
                <List direction="row" className="gap-2 sm:gap-4 lg:gap-2">
                  <div className="flex-1">
                    <ComplianceStatusCard />
                  </div>
                  <div className="flex-1">
                    <ReductionTargetsCard />
                  </div>
                </List>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 lg:gap-3">
              <div
                className="space-y-3 sm:space-y-6 lg:space-y-3"
                style={{ background: '#f1f6ff' }}
              >
                {/* Portfolio Risks & Opportunities section remains the same */}
                <Button
                  text="Portfolio Risks & Opportunities"
                  text_font_size="text-md"
                  text_font_family="Inter"
                  text_font_weight="font-bold"
                  text_line_height="leading-lg"
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
                  style={{ background: 'white' }}
                />

                <List direction="row" className="gap-2 sm:gap-4 lg:gap-2">
                  {/* <div
                    className="flex-1 bg-white-A700 rounded-xl p-3 sm:p-6 lg:p-3 bg-card rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                    style={{ background: 'white' }}
                  >
                    <h4 className="text-md font-bold text-primary-dark mb-4">
                      Top Performing Company
                    </h4>
                    <div className="flex items-center gap-3 sm:gap-4 lg:gap-3 p-2 sm:p-4 lg:p-2 border border-background-overlay rounded-base">
                      <div className="flex items-center gap-2 sm:gap-3 lg:gap-2">
                        <img
                          src={topCompany?.avatar}
                          alt={topCompany?.name}
                          className="w-6 h-6 rounded-2xl"
                        />
                        <span className="text-sm font-normal text-text-primary">
                          {topCompany?.name}
                        </span>
                      </div>
                      <Line
                        fill_background_color="bg-background-overlay"
                        {...{ 'w*h': '1*20' }}
                        className="mx-2"
                      />
                      <div className="flex-1">
                        <span className="text-base font-normal text-text-primary text-center block">
                          {topCompany?.sector}
                        </span>
                      </div>
                    </div>
                  </div> */}
                  <PerformingCompanyCard companyInfo={topCompany} />
                  <PerformingCompanyCard companyInfo={bottomCompany} />
                </List>

                <List direction="row" className="gap-2 sm:gap-4 lg:gap-2">
                  {/* <div
                    className="flex-1 bg-white-A700 rounded-xl p-3 sm:p-6 lg:p-3 bg-card rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                    style={{ background: 'white' }}
                  >
                    <h4 className="text-md font-bold text-primary-dark mb-4">Top 5 Industries</h4>
                    <div className="mt-4 space-y-2">
                      {top5Industries.map((industry, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 border-b last:border-b-0 border-background-overlay"
                        >
                          <span className="text-sm font-normal text-text-primary">{industry}</span>
                        </div>
                      ))}
                    </div>
                  </div> */}
                  <IndustriesList industries={top5Industries} />
                  <IndustriesList industries={bottom5Industries} />
                </List>
              </div>

              <div className="space-y-3 sm:space-y-6 lg:space-y-3">{actionHubContent}</div>
            </div>

            <div className="mt-3 sm:mt-6 lg:mt-3">
              <EmissionsSummaryTable />
            </div>
            {/* </div> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default PortfolioClimateRisk;
