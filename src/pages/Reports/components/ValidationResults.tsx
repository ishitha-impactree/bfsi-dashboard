import React, { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';

// Define the interfaces for the data structures
interface Issue {
  id: number;
  type: 'error' | 'warning' | 'info';
  category: string;
  message: string;
  field: string;
  recommendation: string;
}

interface Metrics {
  completeness: number;
  accuracy: number;
  consistency: number;
  timeliness: number;
}

interface ValidationResult {
  id: number;
  framework: string;
  reportName: string;
  validationType: string;
  status: 'passed' | 'failed' | 'in-progress';
  score: number | null;
  lastRun: string;
  issues: Issue[];
  metrics: Metrics | null;
}

const ValidationResults: React.FC = () => {
  const [selectedValidation, setSelectedValidation] = useState<string>('all');

  const validationResults: ValidationResult[] = [
    {
      id: 1,
      framework: 'TCFD',
      reportName: 'Climate Risk Assessment 2024',
      validationType: 'data-quality',
      status: 'passed',
      score: 95,
      lastRun: '2024-09-23T08:30:00Z',
      issues: [
        {
          id: 1,
          type: 'warning',
          category: 'Data Completeness',
          message: 'Scope 3 emissions data missing for 2 subsidiaries',
          field: 'scope3_emissions',
          recommendation: 'Contact subsidiaries for missing data or provide estimation methodology',
        },
      ],
      metrics: {
        completeness: 98,
        accuracy: 94,
        consistency: 96,
        timeliness: 92,
      },
    },
    {
      id: 2,
      framework: 'GRI',
      reportName: 'Sustainability Report 2024',
      validationType: 'compliance-check',
      status: 'failed',
      score: 72,
      lastRun: '2024-09-22T16:45:00Z',
      issues: [
        {
          id: 2,
          type: 'error',
          category: 'Mandatory Disclosure',
          message: 'GRI 305-1 Direct GHG emissions disclosure incomplete',
          field: 'gri_305_1',
          recommendation: 'Complete Scope 1 emissions data for all operational boundaries',
        },
        {
          id: 3,
          type: 'error',
          category: 'Data Verification',
          message: 'Third-party verification statement missing',
          field: 'verification_statement',
          recommendation: 'Upload signed verification statement from accredited provider',
        },
        {
          id: 4,
          type: 'warning',
          category: 'Best Practice',
          message: 'Stakeholder engagement process could be more detailed',
          field: 'stakeholder_engagement',
          recommendation: 'Expand description of stakeholder identification and engagement methods',
        },
      ],
      metrics: {
        completeness: 85,
        accuracy: 78,
        consistency: 82,
        timeliness: 88,
      },
    },
    {
      id: 3,
      framework: 'SBTi',
      reportName: 'Science-Based Targets Submission',
      validationType: 'target-validation',
      status: 'in-progress',
      score: null,
      lastRun: '2024-09-23T12:15:00Z',
      issues: [],
      metrics: {
        completeness: 45,
        accuracy: 0,
        consistency: 0,
        timeliness: 100,
      },
    },
    {
      id: 4,
      framework: 'CDP',
      reportName: 'CDP Climate Change Response',
      validationType: 'scoring-preview',
      status: 'passed',
      score: 88,
      lastRun: '2024-09-21T14:20:00Z',
      issues: [
        {
          id: 5,
          type: 'info',
          category: 'Scoring Opportunity',
          message: 'Additional points available for renewable energy commitments',
          field: 'renewable_energy',
          recommendation: 'Consider adding specific renewable energy targets and timelines',
        },
        {
          id: 6,
          type: 'warning',
          category: 'Data Quality',
          message: 'Some emission factors appear outdated',
          field: 'emission_factors',
          recommendation: 'Update to latest IPCC or regional emission factors',
        },
      ],
      metrics: {
        completeness: 92,
        accuracy: 89,
        consistency: 91,
        timeliness: 95,
      },
    },
  ];

  const validationTypes = [
    { id: 'all', name: 'All Validations', count: validationResults?.length },
    { id: 'data-quality', name: 'Data Quality', count: validationResults?.filter((v) => v?.validationType === 'data-quality')?.length },
    { id: 'compliance-check', name: 'Compliance Check', count: validationResults?.filter((v) => v?.validationType === 'compliance-check')?.length },
    { id: 'target-validation', name: 'Target Validation', count: validationResults?.filter((v) => v?.validationType === 'target-validation')?.length },
    { id: 'scoring-preview', name: 'Scoring Preview', count: validationResults?.filter((v) => v?.validationType === 'scoring-preview')?.length },
  ];

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'passed':
        return 'bg-success text-success-foreground';
      case 'failed':
        return 'bg-error text-error-foreground';
      case 'in-progress':
        return 'bg-primary text-primary-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getIssueColor = (type: string): string => {
    switch (type) {
      case 'error':
        return 'bg-error/10 text-error border-error/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'info':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getIssueIcon = (type: string): string => {
    switch (type) {
      case 'error':
        return 'XCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'info':
        return 'Info';
      default:
        return 'Circle';
    }
  };

  const getScoreColor = (score: number | null): string => {
    if (score === null) {
      return 'text-muted-foreground';
    }
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-primary';
    if (score >= 50) return 'text-warning';
    return 'text-error';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredResults = selectedValidation === 'all' 
    ? validationResults 
    : validationResults?.filter((result) => result?.validationType === selectedValidation);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Validation Results</h2>
          <p className="text-sm text-muted-foreground">Automated quality checks and compliance validation</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Run All
          </Button>
          <Button variant="outline" size="sm" iconName="Settings">
            Configure
          </Button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <div className="space-y-1">
            {validationTypes?.map((type) => (
              <button
                key={type?.id}
                onClick={() => setSelectedValidation(type?.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedValidation === type?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <span>{type?.name}</span>
                <span className="text-xs">{type?.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="space-y-4">
            {filteredResults?.map((result) => (
              <div key={result?.id} className="border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-card-foreground">{result?.reportName}</h3>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        {result?.framework}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result?.status)}`}>
                        {result?.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Last run: {formatDate(result?.lastRun)}
                    </p>
                  </div>
                  
                  {result?.status !== 'in-progress' && result?.score !== null && (
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(result?.score)}`}>
                        {result?.score}
                      </div>
                      <div className="text-sm text-muted-foreground">Quality Score</div>
                    </div>
                  )}
                </div>

                {/* Metrics */}
                {result.metrics && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {Object.entries(result.metrics).map(([metric, value]) => (
                      <div key={metric} className="text-center">
                        <div className={`text-lg font-semibold ${getScoreColor(value)}`}>
                          {value}%
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {metric}
                        </div>
                        <div className="w-full bg-muted rounded-full h-1 mt-1">
                          <div 
                            className={`h-1 rounded-full transition-all duration-300 ${
                              value >= 90 ? 'bg-success' :
                              value >= 70 ? 'bg-primary' :
                              value >= 50 ? 'bg-warning' : 'bg-error'
                            }`}
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Issues */}
                {result?.issues?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-card-foreground mb-3">
                      Issues Found ({result?.issues?.length})
                    </h4>
                    <div className="space-y-3">
                      {result?.issues?.map((issue) => (
                        <div key={issue?.id} className={`border rounded-lg p-4 ${getIssueColor(issue?.type)}`}>
                          <div className="flex items-start space-x-3">
                            <Icon name={getIssueIcon(issue?.type)} size={16} className="mt-0.5" />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium">{issue?.category}</span>
                                <span className="text-xs px-2 py-0.5 bg-background/50 rounded">
                                  {issue?.field}
                                </span>
                              </div>
                              <p className="text-sm mb-2">{issue?.message}</p>
                              <p className="text-xs opacity-80">
                                <strong>Recommendation:</strong> {issue?.recommendation}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result?.issues?.length === 0 && result?.status === 'passed' && (
                  <div className="flex items-center space-x-2 text-success">
                    <Icon name="CheckCircle" size={16} />
                    <span className="text-sm">All validation checks passed</span>
                  </div>
                )}

                {result?.status === 'in-progress' && (
                  <div className="flex items-center space-x-2 text-primary">
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    <span className="text-sm">Validation in progress...</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationResults;