import React from 'react';
import Icon from '../../../components/ui/AppIcon';

// Define a type for a single target object to ensure type safety
type Target = {
  id: number;
  title: string;
  current: number;
  target: number;
  deadline: string;
  progress: number;
  status: 'on-track' | 'ahead' | 'at-risk' | 'behind';
};

const ReductionTargetsCard = () => {
  const targets: Target[] = [
    {
      id: 1,
      title: '2030 Net Zero Target',
      current: 2850,
      target: 0,
      deadline: '2030-12-31',
      progress: 15,
      status: 'on-track',
    },
    {
      id: 2,
      title: 'SBTi Interim Target',
      current: 2850,
      target: 1425,
      deadline: '2027-12-31',
      progress: 35,
      status: 'ahead',
    },
    {
      id: 3,
      title: 'Portfolio Decarbonization',
      current: 2850,
      target: 1710,
      deadline: '2026-12-31',
      progress: 28,
      status: 'at-risk',
    },
    {
      id: 4,
      title: 'Decarbonization',
      current: 2850,
      target: 1710,
      deadline: '2026-12-31',
      progress: 15,
      status: 'behind',
    },
  ];

  const getStatusColor = (status: Target['status']): string => {
    switch (status) {
      case 'ahead':
        return '#22be8a';
      case 'on-track':
        return '#8B5CF6';
      case 'at-risk':
        return '#f7ad32';
      case 'behind':
        return '#f26262';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: Target['status']): string => {
    switch (status) {
      case 'ahead':
        return 'TrendingUp';
      case 'on-track':
        return 'Target';
      case 'at-risk':
        return 'AlertTriangle';
      case 'behind':
        return 'TrendingDown';
      default:
        return 'Circle';
    }
  };

  const getStatusBg = (status: Target['status']): string => {
    switch (status) {
      case 'ahead':
        return 'bg-success/10';
      case 'on-track':
        return 'bg-primary/10';
      case 'at-risk':
        return 'bg-warning/10';
      case 'behind':
        return 'bg-error/10';
      default:
        return 'bg-muted';
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  const calculateReduction = (current: number, target: number): number => {
    return Math.round(((current - target) / current) * 100);
  };

  return (
    <div
      className="bg-card border border-border rounded-lg p-6 shadow-elevation-1"
      style={{ background: 'white' }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Reduction Targets</h3>
          <p className="text-sm text-muted-foreground">Progress towards emissions goals</p>
        </div>
        <Icon name="Target" size={20} className="text-muted-foreground" color="#22be8a" />
      </div>
      <div className="space-y-6 p-2" style={{ height: 300, overflowY: 'scroll' }}>
        {targets?.map((target) => (
          <div key={target?.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full ${getStatusBg(target?.status)} flex items-center justify-center`}
                >
                  <Icon
                    name={getStatusIcon(target?.status)}
                    size={15}
                    // className={getStatusColor(target?.status)}
                    color={getStatusColor(target?.status)}
                  />
                </div>
                <div>
                  <h4 className="text-md font-medium text-foreground">{target?.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    Target: {calculateReduction(target?.current, target?.target)}% reduction by{' '}
                    {formatDate(target?.deadline)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{target?.progress}%</div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span className="text-sm">Current: {target?.current?.toLocaleString()} tCO₂e</span>
                <span className="text-sm">Target: {target?.target?.toLocaleString()} tCO₂e</span>
              </div>

              {/* <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    target?.status === 'ahead' ? 'bg-success' :
                    target?.status === 'on-track' ? 'bg-primary' :
                    target?.status === 'at-risk'? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${target?.progress}%` }}
                />
              </div> */}
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      target?.status === 'ahead'
                        ? 'bg-green-500'
                        : target?.status === 'on-track'
                          ? 'bg-blue-500'
                          : target?.status === 'at-risk'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                    }`}
                    style={{ width: `${target?.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall Progress</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="text-foreground font-medium">26% Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReductionTargetsCard;
