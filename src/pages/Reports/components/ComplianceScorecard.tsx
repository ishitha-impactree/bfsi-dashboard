import React from 'react';
import Icon from '../../../components/ui/AppIcon';

type FrameworkStatus = 'completed' | 'on-track' | 'at-risk' | 'overdue';

type ComplianceFramework = {
  id: string;
  name: string;
  fullName: string;
  completion: number;
  status: FrameworkStatus;
  daysUntilDeadline: number;
  requirements: number;
  completed: number;
};

const ComplianceScorecard: React.FC = () => {
  const complianceFrameworks: ComplianceFramework[] = [
    {
      id: 'qbs',
      name: 'QBS',
      fullName: 'Quarterly Board Summary',
      completion: 85,
      status: 'on-track',
      daysUntilDeadline: 45,
      requirements: 11,
      completed: 9,
    },
    {
      id: 'prr',
      name: 'PRR',
      fullName: 'Portfolio Risk Report',
      completion: 92,
      status: 'completed',
      daysUntilDeadline: 12,
      requirements: 8,
      completed: 8,
    },
    {
      id: 'cvr',
      name: 'CVR',
      fullName: 'Climate Vulnerability Report',
      completion: 67,
      status: 'at-risk',
      daysUntilDeadline: 8,
      requirements: 15,
      completed: 10,
    },
  ];

  const getStatusColor = (status: FrameworkStatus): string => {
    switch (status) {
      case 'completed':
        return 'bg-accent-success text-primary-foreground';
      case 'on-track':
        return 'bg-accent-info text-primary-foreground';
      case 'at-risk':
        return 'bg-accent-warning text-primary-foreground';
      case 'overdue':
        return 'bg-accent-danger text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: FrameworkStatus): string => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'on-track':
        return 'Clock';
      case 'at-risk':
        return 'AlertTriangle';
      case 'overdue':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getProgressBarColor = (completion: number): string => {
    if (completion >= 90) return '#22c55e'; // success green
    if (completion >= 70) return '#3b82f6'; // primary blue
    if (completion >= 50) return '#f59e0b'; // warning amber
    return '#ef4444'; // error red
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
      {complianceFrameworks.map((framework) => (
        <div
          key={framework.id}
          className="bg-primary-foreground border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">{framework.name}</h3>
              <p className="text-sm text-text-muted">{framework.fullName}</p>
            </div>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(framework.status)}`}
            >
              <Icon name={getStatusIcon(framework.status)} size={12} className="mr-1" />
              {framework.status.replace('-', ' ')}
            </span>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-card-foreground">Progress</span>
              <span className="text-sm font-bold text-card-foreground">
                {framework.completion}%
              </span>
            </div>
            <div
              className="w-full bg-gray-200 rounded-full h-2"
              style={{ backgroundColor: 'var(--muted, #f3f4f6)' }}
            >
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${framework.completion}%`,
                  backgroundColor: getProgressBarColor(framework.completion),
                }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Requirements</span>
              <span className="text-sm font-medium text-card-foreground">
                {framework.completed}/{framework.requirements}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Days until deadline</span>
              <span
                className={`text-sm font-medium ${
                  framework.daysUntilDeadline <= 10
                    ? 'text-accent-danger'
                    : framework.daysUntilDeadline <= 30
                      ? 'text-accent-warning'
                      : 'text-accent-success'
                }`}
              >
                {framework.daysUntilDeadline} days
              </span>
            </div>

            <div className="pt-2 border-t border-border">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Next milestone:{' '}
                  {new Date(
                    Date.now() + framework.daysUntilDeadline * 24 * 60 * 60 * 1000
                  ).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplianceScorecard;
