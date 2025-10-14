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
import ButtonWithIcon from '../../components/ui/ButtonWithIcon';
import { Helmet } from 'react-helmet';

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
  // totalReports: number;
  // completedReports: number;
  // pendingReports: number;
  // overdueReports: number;
  // avgCompletionRate: number;
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
    { value: '2022', label: '2022 Reporting Year' },
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
    { id: 'validation', name: 'Validation', icon: 'Shield' },
  ];

  const overallStats: OverallStats = {
    // totalReports: 12,
    // completedReports: 8,
    // pendingReports: 3,
    // overdueReports: 1,
    // avgCompletionRate: 78,
    nextDeadline: 'October 15, 2024',
    daysUntilDeadline: 22,
  };

  const complainceCard = [
    {
      title: 'Total Reports',
      value: '12',
      icon: 'FileText',
      status: 'text-accent-info',
    },
    {
      title: 'Completion Rate',
      value: '78%',
      icon: 'TrendingUp',
      status: 'text-accent-success',
    },
    {
      title: 'Pending Reports',
      value: '3',
      icon: 'Clock',
      status: 'text-accent-warning',
    },
  ];

  return (
     <div className="w-full bg-[#f8fafc]">
      <Helmet>
        <title>Reports | BFSI </title>
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
      <main>
        {/* Updated Header Section matching Cockpit styling */}
        <div
          className="bg-primary-foreground border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
          style={{ marginTop: '70px' }}
        >
          <div className="w-100 mx-auto px-8 py-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Compliance Reporting</h1>
                <p className="text-md text-muted-foreground mt-1">
                  Track regulatory submissions and automated emissions reporting across all
                  frameworks
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="w-full sm:w-48">
                  <Select
                    options={reportingPeriods}
                    value={selectedPeriod}
                    onChange={(value) => setSelectedPeriod(value as string)}
                    placeholder="Select period"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <Select
                    options={frameworkOptions}
                    value={selectedFramework}
                    onChange={(value) => setSelectedFramework(value as string)}
                    placeholder="Select framework"
                  />
                </div>
                <ButtonWithIcon
                  variant="destructive"
                  size="default"
                  iconName="Plus"
                  iconPosition="left"
                  className="flex items-center hover:bg-primary/90 transition-colors"
                >
                  New Report
                </ButtonWithIcon>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section with updated styling */}
        <div className="w-full px-8 bg-background">
          <div className="rounded-none p-3 sm:p-6 lg:p-3 mb-3 overflow-y-auto">
            <div className="w-full py-4 ">
              {/* Stats Cards Section with Cockpit styling */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {complainceCard?.map((complaince: any) => {
                  return (
                    <div className="bg-primary-foreground border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-md font-bold">{complaince?.title}</p>
                          <p className="text-2xl font-bold text-card-foreground">
                            {complaince?.value}
                          </p>
                        </div>
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon
                            name={complaince?.icon}
                            size={24}
                            className={`${complaince?.status}`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="bg-primary-foreground border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-md font-bold">Next Deadline</p>
                      <p className="text-sm font-medium text-card-foreground">
                        {overallStats?.nextDeadline}
                      </p>
                      <p className="text-sm text-text-muted">
                        {overallStats?.daysUntilDeadline} days remaining
                      </p>
                    </div>
                    <div className="p-2 bg-error/10 rounded-lg">
                      <Icon name="AlertTriangle" size={24} className="text-accent-danger  " />
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
                      className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-md whitespace-nowrap transition-colors 
                        ${
                          activeTab === tab.id
                            ? 'border-primary-background text-primary-background'
                            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                        }
                      `}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="space-y-3">
                {activeTab === 'overview' && (
                  <div className="space-y-3">
                    <ComplianceScorecard />
                    <div className="grid grid-cols-1 gap-3">
                      <div className="xl:col-span-2">
                        <ReportingTimeline />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="xl:col-span-2">
                        <DocumentRepository />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="xl:col-span-2">
                        <ComplianceChecklist />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="xl:col-span-2">
                        <ValidationResults />
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
              <div className="mt-3 bg-gradient-to-r from-error/5 to-warning/5 border border-error/20 rounded-lg p-4 shadow-elevation-1">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-error/10 rounded-lg">
                    <Icon name="AlertTriangle" size={18} className="text-accent-danger" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">Urgent Actions Required</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-primary-foreground border border-border rounded-lg p-3 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200">
                        <div>
                          <p className="font-medium text-card-foreground">SBTi Target Validation</p>
                          <p className="text-sm text-text-muted">Third-party verification needed</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-accent-danger font-medium">
                            8 days left
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-accent hover:text-accent-foreground"
                          >
                            Review
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between bg-primary-foreground border border-border rounded-lg p-3 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200">
                        <div>
                          <p className="font-medium text-card-foreground">CDP Climate Response</p>
                          <p className="text-sm text-text-muted">Missing Scope 3 emissions data</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-accent-warning font-medium">
                            23 days left
                          </span>
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
  </div>
  );
};

export default ComplianceReporting;
