import React from 'react';
import Icon from '../../../components/ui/AppIcon';

const EmissionsKPICard = ({ title, value, unit, change, changeType, icon, trend }: any) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div
      className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
      style={{ background: 'white' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 rounded-lg gradient-data-viz flex items-center justify-center"
            style={{ background: '#8b5cf6' }}
          >
            <Icon name={icon} size={20} color="white" />
          </div>
          <h3
            className="text-lg font-bold fw-500"
            // style={{ color: '#64748b' }}
          >
            {title}
          </h3>
        </div>
        {trend && (
          <div className="w-16 h-8 flex items-end space-x-1">
            {trend?.map((point: any, index: any) => (
              <div
                key={index}
                className="bg-primary/20 rounded-sm flex-1"
                style={{ height: `${point}%` }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-semibold text-foreground">{value}</span>
          <span className="text-md text-muted-foreground" style={{ color: '#64748b' }}>
            {unit}
          </span>
        </div>

        {change && (
          <div className={`flex items-center space-x-1 text-sm ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={14} style={{ color: '#64b981' }} />
            <span style={{ color: '#64b981' }} className="text-md">
              {Math.abs(change)}%
            </span>
            <span className="text-muted-foreground text-md" style={{ color: '#64748b' }}>
              vs last period
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmissionsKPICard;
