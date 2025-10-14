'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '../../components/common/Header';
import Button from '../../components/ui/Button';
import { Helmet } from 'react-helmet';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartDataPoint {
  x: number; // timestamp
  y: number; // value
}

interface SeriesData {
  name: string;
  data: ChartDataPoint[];
}

interface NewsItem {
  id: string;
  title: string;
  timeAgo: string;
  source: string;
  category: 'portfolio' | 'general';
}

interface TimeFilter {
  label: string;
  value: string;
  active: boolean;
}

export default function BenchmarksPage() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>('1 Year');
  const [seriesData, setSeriesData] = useState<SeriesData[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [highLowValues, setHighLowValues] = useState<{ high: number; low: number }>({
    high: 0,
    low: 0,
  });

  const timeFilters: TimeFilter[] = [
    { label: '3 Months', value: '3 Months', active: false },
    { label: '6 Months', value: '6 Months', active: false },
    { label: '1 Year', value: '1 Year', active: true },
    { label: 'All Time', value: 'All Time', active: false },
  ];

  const generateStockData = (timeRange: string): SeriesData[] => {
    let dataPoints: number;
    let baseDate: Date;
    const now = new Date('2026-03-31T00:00:00Z');

    switch (timeRange) {
      case '3 Months':
        dataPoints = 90;
        baseDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '6 Months':
        dataPoints = 180;
        baseDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
        break;
      case '1 Year':
        dataPoints = 365;
        baseDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      case 'All Time':
        dataPoints = 730;
        baseDate = new Date(now.getTime() - 730 * 24 * 60 * 60 * 1000);
        break;
      default:
        dataPoints = 365;
        baseDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    }

    const industryData: ChartDataPoint[] = [];
    const portfolioData: ChartDataPoint[] = [];

    let industryValue = 130;
    let portfolioValue = 125;

    const industryTrend = 0.08;
    const portfolioTrend = 0.12;

    let portfolioHigh = portfolioValue;
    let portfolioLow = portfolioValue;

    for (let i = 0; i < dataPoints; i++) {
      const date = new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000);

      if (date.getDay() === 0 || date.getDay() === 6) continue;

      const volatility = 1.5;

      const industryChange = (Math.random() - 0.5) * volatility + industryTrend;
      industryValue += industryChange;
      industryValue = Math.max(100, Math.min(200, industryValue));

      const portfolioChange = (Math.random() - 0.45) * (volatility + 0.5) + portfolioTrend;
      portfolioValue += portfolioChange;
      portfolioValue = Math.max(100, Math.min(200, portfolioValue));

      // Update high/low values
      if (portfolioValue > portfolioHigh) portfolioHigh = portfolioValue;
      if (portfolioValue < portfolioLow) portfolioLow = portfolioValue;

      industryData.push({
        x: date.getTime(),
        y: parseFloat(industryValue.toFixed(2)),
      });

      portfolioData.push({
        x: date.getTime(),
        y: parseFloat(portfolioValue.toFixed(2)),
      });
    }

    // Set high/low values for the current time range
    setHighLowValues({
      high: parseFloat(portfolioHigh.toFixed(2)),
      low: parseFloat(portfolioLow.toFixed(2)),
    });

    return [
      {
        name: 'Industry Benchmark',
        data: industryData,
      },
      {
        name: 'Portfolio Performance',
        data: portfolioData,
      },
    ];
  };

  const chartOptions = {
    chart: {
      type: 'line' as const,
      height: 400,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight' as const,
      width: [2, 2],
    },
    colors: ['#008FFB', '#00E396'],
    title: {
      text: 'RB-CRIS Index Performance',
      align: 'left' as const,
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
      borderColor: '#f1f1f1',
    },
    markers: {
      size: 0,
      hover: {
        size: 5,
      },
    },
    xaxis: {
      type: 'datetime' as const,
      labels: {
        datetimeUTC: false,
        datetimeFormatter: {
          year: 'yyyy',
          month: "MMM 'yy",
          day: 'dd MMM',
          hour: 'hh:mm tt',
        },
        style: {
          fontFamily: 'DM Sans, Inter, sans-serif',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Index Value',
      },
      labels: {
        formatter: (value: number) => value.toFixed(1),
        style: {
          fontFamily: 'DM Sans, Inter, sans-serif',
        },
      },
      opposite: true,
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
      y: {
        formatter: (value: number) => value.toFixed(2),
      },
    },
    legend: {
      position: 'top' as const,
      horizontalAlign: 'right' as const,
      floating: true,
      offsetY: -25,
      offsetX: -5,
      markers: {
        shape: 'square' as const,
        radius: 0,
      },
    },
  };

  useEffect(() => {
    loadDashboardData();
  }, [selectedTimeFilter]);

  const loadDashboardData = async (): Promise<void> => {
    try {
      setLoading(true);

      setTimeout(() => {
        const chartData = generateStockData(selectedTimeFilter);

        const sampleNewsItems: NewsItem[] = [
          {
            id: '1',
            title: 'Indian auto sales see robust growth in August; utility vehicles in high demand',
            timeAgo: '1 hour ago',
            source: 'Reuters',
            category: 'portfolio',
          },
          {
            id: '2',
            title:
              'Govt likely to announce new phase of FAME subsidies to boost EV adoption, sources say',
            timeAgo: '5 hours ago',
            source: 'Reuters',
            category: 'portfolio',
          },
          {
            id: '3',
            title: 'Tata Motors unveils new EV platform, shares gain 3% in intraday trade',
            timeAgo: '9 hours ago',
            source: 'Reuters',
            category: 'portfolio',
          },
          {
            id: '4',
            title: 'SEBI tightens climate disclosure norms for top 500 listed firms',
            timeAgo: '2 hours ago',
            source: 'Reuters',
            category: 'general',
          },
          {
            id: '5',
            title:
              'Extreme weather events pose significant risk to infrastructure and insurance sectors, new report warns',
            timeAgo: '5 hours ago',
            source: 'Reuters',
            category: 'general',
          },
          {
            id: '6',
            title: 'ESG funds see record inflows in India amid growing climate risk awareness',
            timeAgo: 'Yesterday',
            source: 'Reuters',
            category: 'general',
          },
        ];

        setSeriesData(chartData);
        setNewsItems(sampleNewsItems);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setLoading(false);
    }
  };

  const handleTimeFilterChange = (filterValue: string): void => {
    setSelectedTimeFilter(filterValue);
  };

  const portfolioNews = newsItems.filter((item) => item.category === 'portfolio');
  const generalNews = newsItems.filter((item) => item.category === 'general');

  return (
     <div className="w-full bg-[#f8fafc]">
      <Helmet>
        <title>Benchmarks | BFSI </title>
        <meta
          name="description"
          content="Detailed ESG analysis and risk assessment for portfolio companies. Track company performance, sector insights, and industry benchmarks."
        />
        <meta
          property="og:title"
          content="Companies Statistics | ESG Analytics Platform"
        />
        <meta
          property="og:description"
          content="Detailed ESG analysis and risk assessment for portfolio companies"
        />
      </Helmet>
      
    <div className="w-full" style={{ background: '#f8fafc' }}>
      <Header />
      <div
        className="bg-card border-b border-border shadow-elevation-1 px-8"
        style={{ background: 'white', marginTop: '70px' }}
      >
        <div className="w-100 mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Benchmarks Overview</h1>
              <p className="text-md text-muted-foreground mt-1">
                Portfolio-wide carbon footprint monitoring and compliance tracking
              </p>
            </div>
            {/* <div className="flex justify-end mb-0 sm:mb-8 lg:mb-0">
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
              </div> */}
          </div>
        </div>
      </div>
      <main className="w-full px-8 mb-2">
        <section className="w-full">
          <div className="w-full px-3 sm:px-6 lg:px-[12px] py-3">
            <div
              className="w-full p-4 sm:p-6 lg:p-[16px] bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
              style={{ background: 'white' }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <img
                    src="/images/rbi-logo.png"
                    alt="RB-CRIS Index"
                    className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-full"
                  />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex flex-col gap-2 sm:gap-[6px]">
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl sm:text-2xl lg:text-[26px] font-semibold leading-tight sm:leading-xl text-text-primary font-dm">
                        RB-CRIS Index
                      </h1>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4">
                      <span className="text-xl sm:text-2xl lg:text-[26px] font-normal leading-tight sm:leading-xl text-text-primary font-dm">
                        {seriesData[0]?.data[seriesData[0]?.data.length - 1]?.y.toFixed(2) ||
                          '132.95'}
                      </span>
                      <div className="flex items-center gap-1 sm:gap-2 pb-0 sm:pb-2">
                        <span className="text-sm sm:text-base font-semibold leading-sm sm:leading-lg text-accent-error font-dm">
                          -45.45
                        </span>
                        <span className="text-sm sm:text-base font-semibold leading-sm sm:leading-lg text-accent-error font-dm">
                          -0.18%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full">
          <div className="w-full px-3 sm:px-6 lg:px-[12px] py-3">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
                {timeFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => handleTimeFilterChange(filter.value)}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-medium rounded transition-colors duration-200 ${
                      selectedTimeFilter === filter.value
                        ? 'bg-primary-background text-primary-foreground'
                        : 'bg-secondary-background text-text-primary hover:bg-primary-background hover:text-primary-foreground'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <div
                  className="w-full p-4 sm:p-6 relative bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                  style={{ background: 'white' }}
                >
                  {loading ? (
                    <div className="w-full h-[400px] bg-secondary-light animate-pulse rounded-sm flex items-center justify-center">
                      <span className="text-text-primary">Loading chart data...</span>
                    </div>
                  ) : (
                    <div className="w-full h-[400px]">
                      <Chart
                        options={chartOptions}
                        series={seriesData}
                        type="line"
                        height="100%"
                        width="100%"
                      />
                    </div>
                  )}
                </div>
                <div
                  className="flex flex-col justify-between rounded-sm p-4 min-w-[120px] bg-card border border-border rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                  style={{ background: 'white' }}
                >
                  <div className="text-center">
                    <div className="text-sm font-medium text-text-secondary mb-1">HIGH</div>
                    <div className="text-lg font-semibold text-text-primary">
                      {highLowValues.high.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-text-secondary mb-1">LOW</div>
                    <div className="text-lg font-semibold text-text-primary">
                      {highLowValues.low.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div
                  className="p-2 sm:p-3 bg-card border border-border rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                  style={{ background: 'white' }}
                >
                  {/* <Button
                    text="Portfolio Specific News"
                    text_font_size="text-sm"
                    text_font_family="Inter"
                    text_font_weight="font-medium"
                    text_line_height="leading-sm"
                    text_color="text-button-primary-text"
                    fill_background_color="bg-button-primary-bg"
                    border_border_radius="rounded-sm"
                    padding="8px 14px"
                    margin="8px"
                    className="mb-4"
                    layout_width="auto"
                    position="relative"
                    variant="primary"
                    size="medium"
                    onClick={() => {}}
                  /> */}
                  <span
                    className="text-md px-3 py-2 border border-border rounded-lg"
                    style={{ background: '#EAE5FF', color: '#7857FF' }}
                  >
                    Portfolio Specific News
                  </span>
                  <div className="bg-secondary-light rounded-sm p-3 space-y-6 mt-3">
                    {loading ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-4 bg-secondary-background rounded mb-2"></div>
                            <div className="h-3 bg-secondary-background rounded w-1/3"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      portfolioNews.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <img
                            src="/images/purple-diamond.svg"
                            alt="News indicator"
                            className="w-4 h-4 mt-1 flex-shrink-0"
                          />
                          <div className="flex-1">
                            <h3 className="text-base font-medium leading-lg text-text-primary font-dm mb-1">
                              {item.title}
                            </h3>
                            <p className="text-base font-light leading-lg text-text-primary font-dm">
                              {item.timeAgo} • {item.source}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div
                  className="p-2 sm:p-3 bg-card border border-border rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                  style={{ background: 'white' }}
                >
                  {/* <Button
                    text="General News"
                    text_font_size="text-sm"
                    text_font_family="Inter"
                    text_font_weight="font-medium"
                    text_line_height="leading-sm"
                    text_color="text-button-error-text"
                    fill_background_color="bg-button-error-bg"
                    border_border_radius="rounded-sm"
                    padding="8px 14px"
                    margin="8px"
                    className="mb-4"
                    layout_width="auto"
                    position="relative"
                    variant="error"
                    size="medium"
                    onClick={() => {}}
                  /> */}
                  <span
                    className="text-md px-3 py-2 border border-border rounded-lg"
                    style={{ background: '#FFE5E5', color: '#FF575A' }}
                  >
                    General News
                  </span>
                  <div className="bg-secondary-light rounded-sm p-3 space-y-6 mt-3">
                    {loading ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-4 bg-secondary-background rounded mb-2"></div>
                            <div className="h-3 bg-secondary-background rounded w-1/3"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      generalNews.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <img
                            src="/images/red-diamond.svg"
                            alt="News indicator"
                            className="w-4 h-4 mt-1 flex-shrink-0"
                          />
                          <div className="flex-1">
                            <h3 className="text-base font-medium leading-lg text-text-primary font-dm mb-1">
                              {item.title}
                            </h3>
                            <p className="text-base font-light leading-lg text-text-primary font-dm">
                              {item.timeAgo} • {item.source}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
  );
}
