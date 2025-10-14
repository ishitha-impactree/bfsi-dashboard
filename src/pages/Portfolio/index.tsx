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

  const handleFiltersChange = (newFilters: FiltersState) => {
    setFilters(newFilters);
    setIsLoading(true);
    // Simulate loading completion
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Color definitions for consistent styling across components
  const metricCardColors = {
    carbonIntensity: { bg: 'bg-primary/10', dot: 'bg-accent-info' },
    esgCoverage: { bg: 'bg-success/10', dot: 'bg-accent-success' },
    climateRisk: { bg: 'bg-warning/10', dot: 'bg-accent-warning' },
    sbtiAlignment: { bg: 'bg-accent/10', dot: 'bg-accent-danger' }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Portfolio | BFSI</title>
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
            <div className="mb-3">
              <GlobalFilterBar onFiltersChange={handleFiltersChange} />
            </div>

            <div className="mb-3">
              <MetricsRow filters={filters} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-3 mb-3">
              <div className="xl:col-span-3">
                <ScatterPlotAnalysis />
              </div>

              <div className="xl:col-span-1">
                <TopEmittersSidebar />
              </div>
            </div>

            <div className="mb-3">
              <HoldingsDataGrid />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div
                className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                style={{ background: 'white' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">Carbon Intensity</h4>
                  <div className={`w-8 h-8 ${metricCardColors.carbonIntensity.bg} rounded-lg flex items-center justify-center`}>
                    <div className={`w-3 h-3 ${metricCardColors.carbonIntensity.dot} rounded-full`}></div>
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
                  <div className={`w-8 h-8 ${metricCardColors.esgCoverage.bg} rounded-lg flex items-center justify-center`}>
                    <div className={`w-3 h-3 ${metricCardColors.esgCoverage.dot} rounded-full`}></div>
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
                  <div className={`w-8 h-8 ${metricCardColors.climateRisk.bg} rounded-lg flex items-center justify-center`}>
                    <div className={`w-3 h-3 ${metricCardColors.climateRisk.dot} rounded-full`}></div>
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
                  <div className={`w-8 h-8 ${metricCardColors.sbtiAlignment.bg} rounded-lg flex items-center justify-center`}>
                    <div className={`w-3 h-3 ${metricCardColors.sbtiAlignment.dot} rounded-full`}></div>
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