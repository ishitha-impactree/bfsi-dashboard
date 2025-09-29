import React, { useState } from 'react';
import Header from '../../components/common/Header';
import ComplianceScorecard from './components/ComplianceScorecard';
import ReportingTimeline from './components/ReportingTimeline';
import DocumentRepository from './components/DocumentRepository';
import ComplianceChecklist from './components/ComplianceChecklist';
import ValidationResults from './components/ValidationResults';
import Icon from '../../components/ui/AppIcon';
import Button from '../../components/reports/ui/Button';
import Select from '../../components/ui/Select';

interface SelectOption {
  value: string;
  label: string;
}

interface Tab {
  id: string;
  name: string;
  icon: string;
}

interface OverallStats {
  totalReports: number;
  completedReports: number;
  pendingReports: number;
  overdueReports: number;
  avgCompletionRate: number;
  nextDeadline: string;
  daysUntilDeadline: number;
}

const ComplianceReporting: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('2024');
  const [selectedFramework, setSelectedFramework] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<string>('overview');

  const reportingPeriods: SelectOption[] = [
    { value: '2024', label: '2024 Reporting Year' },
    { value: '2023', label: '2023 Reporting Year' },
    { value: '2022', label: '2022 Reporting Year' }
  ];

  const frameworkOptions: SelectOption[] = [
    { value: 'all', label: 'All Frameworks' },
    { value: 'qbs', label: 'Quarterly Board Summary' },
    { value: 'prr', label: 'Portfolio Risk Report' },
    { value: 'cvr', label: 'Climate Vulnerability Report' },
  ];

  const tabs: Tab[] = [
    { id: 'overview', name: 'Overview', icon: 'BarChart3' },
    { id: 'timeline', name: 'Timeline', icon: 'Calendar' },
    { id: 'documents', name: 'Documents', icon: 'FileText' },
    { id: 'checklist', name: 'Checklist', icon: 'CheckSquare' },
    { id: 'validation', name: 'Validation', icon: 'Shield' }
  ];

  const overallStats: OverallStats = {
    totalReports: 12,
    completedReports: 8,
    pendingReports: 3,
    overdueReports: 1,
    avgCompletionRate: 78,
    nextDeadline: 'October 15, 2024',
    daysUntilDeadline: 22
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Updated Header Section matching Cockpit styling */}
        <div 
          className="bg-card border-b border-border shadow-elevation-1 px-8"
          style={{ marginTop: '70px' }}
        >
          <div className="w-100 mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Reports Overview</h1>
                <p className="text-md text-muted-foreground mt-1">
                  Track regulatory submissions and automated emissions reporting across all frameworks
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="w-full sm:w-48">
                  <Select
                    options={reportingPeriods}
                    value={selectedPeriod}
                    onChange={value => setSelectedPeriod(value as string)}
                    placeholder="Select period"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <Select
                    options={frameworkOptions}
                    value={selectedFramework}
                    onChange={value => setSelectedFramework(value as string)}
                    placeholder="Select framework"
                  />
                </div>
                <Button 
                  variant="default"
                  size="default"
                  iconName="Plus"
                  iconPosition="left"
                  className="flex items-center hover:bg-primary/90 transition-colors"
                >
                  New Report
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section with updated styling */}
        <div className="w-full px-8 bg-background">
          <div className="rounded-none p-3 sm:p-6 lg:p-3 mb-3 overflow-y-auto">
            <div className="max-w-7xl mx-auto py-8">
              {/* Stats Cards Section with Cockpit styling */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div 
                  className="bg-card border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Reports</p>
                      <p className="text-2xl font-bold text-card-foreground">{overallStats?.totalReports}</p>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon name="FileText" size={20} className="text-primary" />
                    </div>
                  </div>
                </div>

                <div 
                  className="bg-card border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Completion Rate</p>
                      <p className="text-2xl font-bold text-card-foreground">{overallStats?.avgCompletionRate}%</p>
                    </div>
                    <div className="p-2 bg-success/10 rounded-lg">
                      <Icon name="TrendingUp" size={20} className="text-success" />
                    </div>
                  </div>
                </div>

                <div 
                  className="bg-card border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Reports</p>
                      <p className="text-2xl font-bold text-card-foreground">{overallStats?.pendingReports}</p>
                    </div>
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <Icon name="Clock" size={20} className="text-warning" />
                    </div>
                  </div>
                </div>

                <div 
                  className="bg-card border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Next Deadline</p>
                      <p className="text-sm font-medium text-card-foreground">{overallStats?.nextDeadline}</p>
                      <p className="text-xs text-muted-foreground">{overallStats?.daysUntilDeadline} days remaining</p>
                    </div>
                    <div className="p-2 bg-error/10 rounded-lg">
                      <Icon name="AlertTriangle" size={20} className="text-error" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs Navigation with updated styling */}
              <div className="border-b border-border mb-6">
                <nav className="flex space-x-6 overflow-x-auto">
                  {tabs.map((tab: Tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                      }`}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <ComplianceScorecard />
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                      <div className="xl:col-span-2">
                        <ReportingTimeline />
                      </div>
                      
                    </div>
                  </div>
                )}

                {activeTab === 'timeline' && <ReportingTimeline />}

                {activeTab === 'documents' && <DocumentRepository />}

                {activeTab === 'checklist' && <ComplianceChecklist />}

                {activeTab === 'validation' && <ValidationResults />}
              </div>

              {/* Urgent Actions Section with updated styling */}
              <div 
                className="mt-8 bg-gradient-to-r from-error/5 to-warning/5 border border-error/20 rounded-lg p-4 shadow-elevation-1"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-error/10 rounded-lg">
                    <Icon name="AlertTriangle" size={18} className="text-error" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">Urgent Actions Required</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-card rounded-md border border-border">
                        <div>
                          <p className="font-medium text-card-foreground">SBTi Target Validation</p>
                          <p className="text-sm text-muted-foreground">Third-party verification needed</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-error font-medium">8 days left</span>
                          <Button 
                            variant="outline"
                            size="sm"
                            className="hover:bg-accent hover:text-accent-foreground"
                          >
                            Review
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-card rounded-md border border-border">
                        <div>
                          <p className="font-medium text-card-foreground">CDP Climate Response</p>
                          <p className="text-sm text-muted-foreground">Missing Scope 3 emissions data</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-warning font-medium">23 days left</span>
                          <Button 
                            variant="outline"
                            size="sm"
                            className="hover:bg-accent hover:text-accent-foreground"
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComplianceReporting;