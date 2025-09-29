import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Icon from '../../components/ui/AppIcon';
import GlobalControls from './GlobalControls';
// import GlobalControls from './GlobalControls';
import RiskMetricsGauges from './RiskMetricsGauges';
import RiskHeatMap from './RiskHeatMap';
import RiskRankingTable from './RiskRankingTable';
import ScenarioComparison from './ScenarioComparison';
import StressTesting from './StressTesting';
// import Icon from '../../components/AppIcon';

// ---------- Types ----------
interface Filters {
  scenario: string;
  horizon: string;
  categories: string[];
}

interface Tab {
  id: 'overview' | 'scenarios' | 'stress-testing';
  label: string;
  icon: string;
  description: string;
}

interface GlobalControlsProps {
  onFiltersChange: (filters: Partial<Filters>) => void;
}

// ---------- Component ----------
const Risks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab['id']>('overview');
  const [filters, setFilters] = useState<Filters>({
    scenario: '2C',
    horizon: '2030',
    categories: ['transition', 'physical', 'regulatory'],
  });

  const tabs: Tab[] = [
    {
      id: 'overview',
      label: 'Risk Overview',
      icon: 'BarChart3',
      description: 'Portfolio risk metrics and heat map analysis',
    },
    {
      id: 'scenarios',
      label: 'Scenario Analysis',
      icon: 'TrendingUp',
      description: 'Climate pathway comparison and forecasting',
    },
    {
      id: 'stress-testing',
      label: 'Stress Testing',
      icon: 'Target',
      description: 'Monte Carlo simulation and parameter testing',
    },
  ];

  const handleFiltersChange = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  useEffect(() => {
    document.title = 'Risk Assessment - Financed Emissions Dashboard';
  }, []);

  const riskAlertCard = [
    {
      title: 'High Carbon Exposure',
      description: 'Energy sector allocation exceeds risk threshold',
      action: 'Action Required',
      icon: 'AlertTriangle',
      status: 'text-accent-danger',
    },
    {
      title: 'Policy Update',
      description: 'New EU taxonomy regulations effective Q2 2024',
      action: 'Review Needed',
      icon: 'Clock',
      status: 'text-accent-warning',
    },
    {
      title: 'Transition Opportunity',
      description: 'Clean energy investments showing strong performance',
      action: 'Consider Increase',
      icon: 'TrendingUp',
      status: 'text-accent-success',
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-3">
            {/* Risk Metrics */}
            <RiskMetricsGauges />
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
              {/* Heat Map - Takes 3 columns */}
              <div className="xl:col-span-3">
                <RiskHeatMap />
              </div>

              {/* Risk Ranking - Takes 1 column */}
              <div className="xl:col-span-1">
                <div
                  className="bg-card border border-border rounded-lg shadow-elevation-1 h-full hover:shadow-elevation-2 transition-shadow duration-200"
                  style={{ background: 'white' }}
                >
                  <div
                    className="p-4 border-b border-border bg-card shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                    style={{ background: 'white' }}
                  >
                    <h3 className="text-lg font-semibold text-foreground">Risk Alerts</h3>
                    <p className="text-sm text-secondary-foreground">Critical risk notifications</p>
                  </div>
                  <div className="p-4 space-y-3">
                    {riskAlertCard?.map((riskAlert: any) => {
                      return (
                        <div
                          className="flex items-start space-x-3 p-3 bg-card border border-border rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                          style={{ background: 'white' }}
                        >
                          <Icon
                            name={riskAlert?.icon}
                            size={16}
                            className={`${riskAlert?.status} mt-0.5`}
                          />
                          <div>
                            <h4 className="text-md font-medium text-foreground">
                              {riskAlert?.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {riskAlert?.description}
                            </p>
                            <span className="text-sm text-accent-danger font-medium">
                              {riskAlert?.action}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Ranking Table */}
            <RiskRankingTable />
          </div>
        );

      case 'scenarios':
        return (
          <div className="space-y-6">
            <ScenarioComparison />
          </div>
        );

      case 'stress-testing':
        return (
          <div className="space-y-6">
            <StressTesting />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      <Header />
      <div
        className="bg-card border-b border-border shadow-elevation-1 px-8"
        style={{ background: 'white', marginTop: '70px' }}
      >
        <div className="w-100 mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Risk Assessment</h1>
              <p className="text-md text-muted-foreground mt-1">
                Climate risk analysis and portfolio stress testing
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
      <main className="pt-0 px-8">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-5 py-8">
          {/* Page Header */}
          {/* <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div
                className="w-10 h-10 rounded-lg gradient-data-viz flex items-center justify-center"
                style={{ background: '#8b5cf6' }}
              >
                <Icon name="AlertTriangle" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Risk Assessment</h1>
                <p className="text-muted-foreground">
                  Climate risk analysis and portfolio stress testing
                </p>
              </div>
            </div>
          </div> */}

          {/* Global Controls */}
          {/* <GlobalControls onFiltersChange={handleFiltersChange} /> */}
          <GlobalControls onFiltersChange={handleFiltersChange} />

          {/* Tab Navigation */}
          <div className="mb-3 mt-2">
            <div className="border-b border-border border-primary-dark">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-md transition-colors duration-200
                      ${
                        activeTab === tab.id
                          ? 'border-primary-background text-primary-background'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                      }
                    `}
                  >
                    <Icon name={tab.icon} size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Description */}
            <div
              className="mt-3 p-3 bg-card border border-border rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
              style={{ background: 'white' }}
            >
              <p className="text-md text-muted-foreground">
                {tabs.find((tab) => tab.id === activeTab)?.description}
              </p>
            </div>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default Risks;
