import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import Icon from '../../../components/ui/AppIcon';

const MetricsRow = () => {
  const emissionsData = [
    { category: 'Energy', emissions: 45.2, trend: -2.3, color: '#EF4444' },
    { category: 'Technology', emissions: 28.7, trend: -5.1, color: '#3B82F6' },
    { category: 'Healthcare', emissions: 18.9, trend: -1.8, color: '#10B981' },
    { category: 'Financials', emissions: 15.4, trend: -3.2, color: '#8B5CF6' },
    { category: 'Industrials', emissions: 32.1, trend: -4.7, color: '#F59E0B' },
    { category: 'Materials', emissions: 38.6, trend: -6.2, color: '#EC4899' }
  ];

  const totalEmissions = emissionsData?.reduce((sum, item) => sum + item?.emissions, 0);

  const formatTrend = (trend) => {
    const isPositive = trend > 0;
    return {
      value: Math.abs(trend),
      isPositive,
      icon: isPositive ? 'TrendingUp' : 'TrendingDown',
      color: isPositive ? 'text-error' : 'text-success'
    };
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            Emissions: <span className="text-foreground font-medium">{payload[0].value} tCO2e/$M</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Emissions by Asset Class</h3>
            <p className="text-sm text-muted-foreground">tCO2e per $M invested</p>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="BarChart3" size={20} className="text-primary" />
          </div>
        </div>

        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={emissionsData} layout="horizontal" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
              <XAxis 
                type="number" 
                axisLine={false} 
                tickLine={false} 
                className="text-xs fill-muted-foreground" 
              />
              <YAxis 
                type="category" 
                dataKey="category" 
                axisLine={false} 
                tickLine={false} 
                className="text-xs fill-muted-foreground"
                width={50}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="emissions" radius={[0, 4, 4, 0]}>
                {emissionsData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{totalEmissions?.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Total tCO2e/$M</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">-3.8%</div>
            <div className="text-sm text-muted-foreground">vs. Last Quarter</div>
          </div>
        </div>
      </div>
      {/* Trend Analysis */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Emissions Trends</h3>
            <p className="text-sm text-muted-foreground">Quarterly change by sector</p>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="TrendingDown" size={20} className="text-success" />
          </div>
        </div>

        <div className="space-y-4">
          {emissionsData?.map((item, index) => {
            const trend = formatTrend(item?.trend);
            const percentage = ((item?.emissions / totalEmissions) * 100)?.toFixed(1);
            
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item?.color }}
                  ></div>
                  <div>
                    <div className="font-medium text-foreground">{item?.category}</div>
                    <div className="text-sm text-muted-foreground">{percentage}% of portfolio</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="font-medium text-foreground">{item?.emissions?.toFixed(1)}</div>
                    <div className={`text-sm flex items-center gap-1 ${trend?.color}`}>
                      <Icon name={trend?.icon} size={14} />
                      {trend?.value?.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Portfolio Average Reduction:</span>
            <div className="flex items-center gap-1 text-success font-medium">
              <Icon name="TrendingDown" size={14} />
              3.8% QoQ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsRow;