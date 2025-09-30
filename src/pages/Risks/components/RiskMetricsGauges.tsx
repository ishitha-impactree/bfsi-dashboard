import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/ui/AppIcon';

type RiskStatus = 'success' | 'warning' | 'error' | 'default';

interface RiskMetric {
  id: string;
  title: string;
  value: number;
  threshold: number;
  unit: string;
  status: RiskStatus;
  description: string;
  trend: number;
}

interface GaugeData {
  name: string;
  value: number;
  fill: string;
}

const RiskMetricsGauges: React.FC = () => {
  const riskMetrics: RiskMetric[] = [
    {
      id: 'climate-var',
      title: 'Climate VaR',
      value: 12.5,
      threshold: 15,
      unit: '%',
      status: 'warning',
      description: 'Portfolio value at risk under climate scenarios',
      trend: -2.3,
    },
    {
      id: 'transition-risk',
      title: 'Transition Risk Score',
      value: 68,
      threshold: 70,
      unit: '/100',
      status: 'warning',
      description: 'Exposure to transition risks from policy changes',
      trend: 5.2,
    },
    {
      id: 'stranded-assets',
      title: 'Stranded Asset Exposure',
      value: 8.7,
      threshold: 10,
      unit: '%',
      status: 'success',
      description: 'Assets at risk of becoming stranded',
      trend: -1.8,
    },
  ];

  const getGaugeData = (value: number, max: number = 100): GaugeData[] => [
    { name: 'value', value: value, fill: '#6366F1' },
    { name: 'remaining', value: max - value, fill: '#E2E8F0' },
  ];

  const getStatusColor = (status: RiskStatus): string => {
    switch (status) {
      case 'success':
        return 'text-accent-success';
      case 'warning':
        return 'text-accent-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: RiskStatus): string => {
    switch (status) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Info';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {riskMetrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
          style={{ background: 'white' }}
        >
          <div className="flex items-center justify-between mb-0">
            <h3 className="text-md font-bold text-muted-foreground">{metric.title}</h3>
            <Icon
              name={getStatusIcon(metric.status)}
              size={18}
              className={getStatusColor(metric.status)}
            />
          </div>

          <div className="relative w-32 h-32 mx-auto mb-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getGaugeData(metric.value)}
                  cx="50%"
                  cy="50%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={40}
                  outerRadius={60}
                  dataKey="value"
                >
                  {getGaugeData(metric.value).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">
                {metric.value}
                {metric.unit}
              </span>
              <span className="text-sm text-muted-foreground">
                of {metric.threshold}
                {metric.unit}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-md text-secondary-foreground text-center">{metric.description}</p>
            <div className="flex items-center justify-center space-x-2">
              <Icon
                name={metric.trend > 0 ? 'TrendingUp' : 'TrendingDown'}
                size={14}
                className={metric.trend > 0 ? 'text-accent-danger' : 'text-accent-success'}
              />
              <span
                className={`text-sm font-medium ${
                  metric.trend > 0 ? 'text-accent-danger' : 'text-accent-success'
                }`}
              >
                {Math.abs(metric.trend)}% vs last month
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RiskMetricsGauges;
