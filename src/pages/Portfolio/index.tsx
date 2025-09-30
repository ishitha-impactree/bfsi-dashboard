import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/common/Header';
import GlobalFilterBar from './components/GlobalFilterBar';
import MetricsRow from './components/MetricsRow';
import ScatterPlotAnalysis from './components/ScatterPlotAnalysis';
import TopEmittersSidebar from './components/TopEmittersSidebar';
import HoldingsDataGrid from './components/HoldingsDataGrid';

interface FiltersState {
  portfolio: string;
  category: string;
  region: string;
  dateRange: string;
}

const PortfolioAnalytics: React.FC = () => {
  const [filters, setFilters] = useState<FiltersState>({
    portfolio: 'global-equity',
    category: 'all',
    region: 'all',
    dateRange: 'ytd',
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedPeriod, setSelectedPeriod] = useState('1 Year');

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, [filters]);

  const handleFiltersChange = (newFilters: FiltersState) => {
    setFilters(newFilters);
    setIsLoading(true);
  };

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-background">
  //       <Header />
  //       <main className="pt-16">
  //         <div className="container mx-auto px-6 py-8">
  //           <div className="flex items-center justify-center h-64">
  //             <div className="flex items-center gap-3">
  //               <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  //               <span className="text-muted-foreground">Loading portfolio analytics...</span>
  //             </div>
  //           </div>
  //         </div>
  //       </main>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Portfolio Analytics | ESG Analytics Platform</title>
        <meta
          name="description"
          content="Deep-dive emissions analysis across investment holdings for data-driven sustainable finance decisions"
        />
        <meta property="og:title" content="Portfolio Analytics | ESG Analytics Platform" />
        <meta
          property="og:description"
          content="Deep-dive emissions analysis across investment holdings for data-driven sustainable finance decisions"
        />
      </Helmet>
      <Header />
      <div
        className="bg-primary-foreground border border-border rounded-lg px-8 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
        style={{ background: 'white', marginTop: '70px' }}
      >
        <div className="w-100 mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Portfolio Analytics</h1>
              <p className="text-md text-muted-foreground mt-1">
                Deep-dive emissions analysis across investment holdings for data-driven sustainable
                finance decisions
              </p>
            </div>
          </div>
        </div>
      </div>
      <main className="pt-0" style={{ background: '#f8fafc' }}>
        <div className="w-full px-8">
          <div className="rounded-none p-3 sm:p-6 lg:p-3 mb-3 overflow-y-auto">
            {/* Global Filter Bar */}
            <div className="mb-3">
              <GlobalFilterBar onFiltersChange={handleFiltersChange} />
            </div>

            {/* Primary Metrics Row */}
            <div className="mb-3">
              <MetricsRow />
            </div>

            {/* Main Analytics Section */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-3 mb-3">
              {/* Scatter Plot Analysis - 3 columns */}
              <div className="xl:col-span-3">
                <ScatterPlotAnalysis />
              </div>

              {/* Top Emitters Sidebar - 1 column */}
              <div className="xl:col-span-1">
                <TopEmittersSidebar />
              </div>
            </div>

            {/* Holdings Data Grid */}
            <div className="mb-3">
              <HoldingsDataGrid />
            </div>

            {/* Additional Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div
                className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                style={{ background: 'white' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">Carbon Intensity</h4>
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-accent-info rounded-full"></div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">24.7</div>
                <div className="text-sm text-text-muted mb-2">tCO2e/$M revenue</div>
                <div className="flex items-center gap-1 text-accent-success text-sm">
                  <span>↓ 5.2%</span>
                  <span className="text-text-muted">vs benchmark</span>
                </div>
              </div>

              <div
                className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                style={{ background: 'white' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">ESG Coverage</h4>
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-accent-success rounded-full"></div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">94.8%</div>
                <div className="text-sm text-text-muted mb-2">of portfolio value</div>
                <div className="flex items-center gap-1 text-accent-success text-sm">
                  <span>↑ 2.1%</span>
                  <span className="text-text-muted">vs last quarter</span>
                </div>
              </div>

              <div
                className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                style={{ background: 'white' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-foreground">Climate Risk</h4>
                  <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-accent-warning rounded-full"></div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">Medium</div>
                <div className="text-sm text-text-muted mb-2">overall exposure</div>
                <div className="flex items-center gap-1 text-accent-warning text-sm">
                  <span>→ 0%</span>
                  <span className="text-text-muted">no change</span>
                </div>
              </div>

              <div
                className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                style={{ background: 'white' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-foreground">SBTi Alignment</h4>
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-accent-danger rounded-full"></div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">67%</div>
                <div className="text-sm text-text-muted mb-2">of holdings</div>
                <div className="flex items-center gap-1 text-accent-success text-sm">
                  <span>↑ 8.3%</span>
                  <span className="text-text-muted">vs last year</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PortfolioAnalytics;
