import React from 'react';
import Icon from '../../../components/ui/AppIcon';

type ComplianceStatus = 'compliant' | 'in-progress' | 'pending' | 'at-risk';

type ComplianceItem = {
  id: number;
  regulation: string;
  status: ComplianceStatus;
  deadline: string;
  progress: number;
  description: string;
};

const ComplianceStatusCard = () => {
  const complianceItems: ComplianceItem[] = [
    {
      id: 1,
      regulation: 'EU Taxonomy',
      status: 'compliant',
      deadline: '2025-03-31',
      progress: 100,
      description: 'Environmental objectives alignment',
    },
    {
      id: 2,
      regulation: 'TCFD Reporting',
      status: 'in-progress',
      deadline: '2025-04-15',
      progress: 75,
      description: 'Climate-related financial disclosures',
    },
    {
      id: 3,
      regulation: 'SFDR Article 8',
      status: 'pending',
      deadline: '2025-06-30',
      progress: 45,
      description: 'Sustainable finance disclosure',
    },
    {
      id: 4,
      regulation: 'CDP Disclosure',
      status: 'at-risk',
      deadline: '2025-02-28',
      progress: 30,
      description: 'Carbon disclosure project submission',
    },
  ];

  const getStatusColor = (status: ComplianceStatus): string => {
    switch (status) {
      case 'compliant':
        return '#22be8a';
      case 'in-progress':
        return '#8B5CF6';
      case 'pending':
        return '#f7ad32';
      case 'at-risk':
        return '#f26262';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: ComplianceStatus): string => {
    switch (status) {
      case 'compliant':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'pending':
        return 'AlertCircle';
      case 'at-risk':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusBg = (status: ComplianceStatus): string => {
    switch (status) {
      case 'compliant':
        return 'bg-success/10';
      case 'in-progress':
        return 'bg-primary/10';
      case 'pending':
        return 'bg-warning/10';
      case 'at-risk':
        return 'bg-error/10';
      default:
        return 'bg-muted';
    }
  };

  const getStatusLabel = (status: ComplianceStatus): string => {
    switch (status) {
      case 'compliant':
        return 'Compliant';
      case 'in-progress':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      case 'at-risk':
        return 'At Risk';
      default:
        return 'Unknown';
    }
  };

  const formatDeadline = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays <= 7) return `${diffDays} days left`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks left`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const overallCompliance = Math.round(
    complianceItems.reduce((sum, item) => sum + item.progress, 0) / complianceItems.length
  );

  return (
    <div
      className="bg-card border border-border rounded-lg p-6 shadow-elevation-1"
      style={{ background: 'white' }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Compliance Status</h3>
          <p className="text-sm text-muted-foreground">Regulatory requirements tracking</p>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`w-8 h-8 rounded-full ${
              overallCompliance >= 80
                ? 'bg-success/10'
                : overallCompliance >= 60
                  ? 'bg-warning/10'
                  : 'bg-error/10'
            } flex items-center justify-center`}
          >
            <Icon
              name={
                overallCompliance >= 80
                  ? 'Shield'
                  : overallCompliance >= 60
                    ? 'AlertTriangle'
                    : 'ShieldX'
              }
              size={18}
              className={
                overallCompliance >= 80
                  ? 'text-success'
                  : overallCompliance >= 60
                    ? 'text-warning'
                    : 'text-error'
              }
              color="#f7ad32"
            />
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">{overallCompliance}%</div>
            <div className="text-sm text-muted-foreground">Overall</div>
          </div>
        </div>
      </div>
      <div className="space-y-4 p-2" style={{ height: 300, overflowY: 'scroll' }}>
        {complianceItems.map((item) => (
          <div key={item.id} className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div
                  className={`w-6 h-6 rounded-full ${getStatusBg(item.status)} flex items-center justify-center mt-0.5`}
                >
                  <Icon
                    name={getStatusIcon(item.status)}
                    size={15}
                    className={getStatusColor(item.status)}
                    // color="#8B5CF6"
                    color={getStatusColor(item.status)}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-md font-medium text-foreground truncate">
                      {item.regulation}
                    </h4>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${getStatusBg(item.status)} ${getStatusColor(item.status)}`}
                    >
                      {getStatusLabel(item.status)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  <div className="flex items-center justify-between mt-0">
                    <span className="text-sm text-muted-foreground">
                      {formatDeadline(item.deadline)}
                    </span>
                    <span className="text-sm font-medium text-foreground">{item.progress}%</span>
                  </div>
                  {/* <progress
                    id="file"
                    value="32"
                    max="100"
                    // style={{ width: '100%', height: '5px' }}
                    style={{
                      width: '100%',
                      height: '5px',
                      borderRadius: '9999px', // fully rounded
                      overflow: 'hidden',
                      appearance: 'none',
                    }}
                  /> */}

                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          item?.status === 'compliant'
                            ? 'bg-green-500'
                            : item?.status === 'in-progress'
                              ? 'bg-blue-500'
                              : item?.status === 'pending'
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                        }`}
                        style={{ width: `${item?.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ml-9">
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    item.status === 'compliant'
                      ? 'bg-success'
                      : item.status === 'in-progress'
                        ? 'bg-primary'
                        : item.status === 'pending'
                          ? 'bg-warning'
                          : 'bg-error'
                  }`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Next Deadline</span>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={14} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">CDP - Feb 28</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceStatusCard;
