'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from '../../components/benchmarks/common/Header';
import Button from '../../components/ui/Button';

interface ChartDataPoint {
  name: string;
  industryBenchmark: number;
  portfolioPerformance: number;
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
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const timeFilters: TimeFilter[] = [
    { label: '3 Months', value: '3 Months', active: false },
    { label: '6 Months', value: '6 Months', active: false },
    { label: '1 Year', value: '1 Year', active: true },
    { label: 'All Time', value: 'All Time', active: false }
  ]

  useEffect(() => {
    loadDashboardData()
  }, [selectedTimeFilter])

  const loadDashboardData = async (): Promise<void> => {
    try {
      setLoading(true)
      
      setTimeout(() => {
        const months = ['Oct 2025', 'Nov 2025', 'Dec 2024', 'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025', 'Sep 2025']
        const sampleChartData: ChartDataPoint[] = months.map((month, index) => ({
          name: month,
          industryBenchmark: 132.5 + Math.random() * 2 - 1,
          portfolioPerformance: 132.7 + Math.random() * 1.5 - 0.75
        }))

        const sampleNewsItems: NewsItem[] = [
          {
            id: '1',
            title: 'Indian auto sales see robust growth in August; utility vehicles in high demand',
            timeAgo: '1 hour ago',
            source: 'Reuters',
            category: 'portfolio'
          },
          {
            id: '2',
            title: 'Govt likely to announce new phase of FAME subsidies to boost EV adoption, sources say',
            timeAgo: '5 hours ago',
            source: 'Reuters',
            category: 'portfolio'
          },
          {
            id: '3',
            title: 'Tata Motors unveils new EV platform, shares gain 3% in intraday trade',
            timeAgo: '9 hours ago',
            source: 'Reuters',
            category: 'portfolio'
          },
          {
            id: '4',
            title: 'SEBI tightens climate disclosure norms for top 500 listed firms',
            timeAgo: '2 hours ago',
            source: 'Reuters',
            category: 'general'
          },
          {
            id: '5',
            title: 'Extreme weather events pose significant risk to infrastructure and insurance sectors, new report warns',
            timeAgo: '5 hours ago',
            source: 'Reuters',
            category: 'general'
          },
          {
            id: '6',
            title: 'ESG funds see record inflows in India amid growing climate risk awareness',
            timeAgo: 'Yesterday',
            source: 'Reuters',
            category: 'general'
          }
        ]

        setChartData(sampleChartData)
        setNewsItems(sampleNewsItems)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
      setLoading(false)
    }
  }

  const handleTimeFilterChange = (filterValue: string): void => {
    setSelectedTimeFilter(filterValue)
  }

  const portfolioNews = newsItems.filter(item => item.category === 'portfolio')
  const generalNews = newsItems.filter(item => item.category === 'general')

  return (
    <div className="w-full bg-background-neutral">
      <Header />
      
      <main className="w-full">
        {/* Index Overview Section */}
        <section className="w-full bg-secondary-background">
          <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-[12px] py-3">
            <div className="w-full bg-background-overlay rounded-sm p-4 sm:p-6 lg:p-[16px]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                {/* Index Logo */}
                <div className="flex-shrink-0">
                  <img 
                    src="/images/rbi-logo.png" 
                    alt="RB-CRIS Index" 
                    className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-full"
                  />
                </div>

                {/* Index Details */}
                <div className="flex-1 w-full">
                  <div className="flex flex-col gap-2 sm:gap-[6px]">
                    {/* Index Title */}
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl sm:text-2xl lg:text-[26px] font-semibold leading-tight sm:leading-xl text-text-primary font-dm">
                        RB-CRIS Index
                      </h1>
                    </div>

                    {/* Index Value and Change */}
                    <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4">
                      <span className="text-xl sm:text-2xl lg:text-[26px] font-normal leading-tight sm:leading-xl text-text-primary font-dm">
                        132.95
                      </span>
                      
                      <div className="flex items-center gap-1 sm:gap-2 pb-0 sm:pb-2">
                        <img 
                          src="/images/img_vector.svg" 
                          alt="Down arrow" 
                          className="w-[8px] h-[4px] sm:w-[10px] sm:h-[5px]"
                        />
                        <span className="text-sm sm:text-base font-semibold leading-sm sm:leading-lg text-accent-error font-dm">
                          45.45 -0.18%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chart and News Section */}
        <section className="w-full bg-accent-warning-light">
          <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-[12px] py-3">
            <div className="flex flex-col gap-3">
              {/* Time Filter Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
                {timeFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => handleTimeFilterChange(filter.value)}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-medium rounded transition-colors duration-200 ${
                      selectedTimeFilter === filter.value
                        ? 'bg-primary-background text-primary-foreground'
                        : 'bg-secondary-background text-text-primary hover:bg-primary-light'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Chart Section */}
              <div className="w-full bg-secondary-background rounded-sm p-4 sm:p-6 mb-3">
                {loading ? (
                  <div className="w-full h-[300px] sm:h-[400px] lg:h-[432px] bg-secondary-light animate-pulse rounded-sm flex items-center justify-center">
                    <span className="text-text-primary">Loading chart...</span>
                  </div>
                ) : (
                  <div className="w-full h-[300px] sm:h-[400px] lg:h-[432px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 12, fill: '#666' }}
                          axisLine={{ stroke: '#e0e0e0' }}
                        />
                        <YAxis 
                          domain={['dataMin - 0.5', 'dataMax + 0.5']}
                          tick={{ fontSize: 12, fill: '#666' }}
                          axisLine={{ stroke: '#e0e0e0' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#ffffff', 
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '14px'
                          }}
                        />
                        <Legend 
                          wrapperStyle={{ paddingTop: '20px' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="industryBenchmark" 
                          stroke="#00bfff" 
                          strokeWidth={2}
                          name="Industry Benchmark"
                          dot={{ fill: '#00bfff', strokeWidth: 2, r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="portfolioPerformance" 
                          stroke="#fba900" 
                          strokeWidth={2}
                          name="Portfolio Performance"
                          dot={{ fill: '#fba900', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {/* News Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {/* Portfolio Specific News */}
                <div className="bg-secondary-light rounded-sm p-2 sm:p-3">
                  <Button
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
                  />
                  
                  <div className="bg-secondary-light rounded-sm p-3 space-y-6">
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

                {/* General News */}
                <div className="bg-secondary-light rounded-sm p-2 sm:p-3">
                  <Button
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
                  />
                  
                  <div className="bg-secondary-light rounded-sm p-3 space-y-6">
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
  )
}