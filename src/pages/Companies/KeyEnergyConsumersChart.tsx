import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import Icon from '../../components/ui/AppIcon';

const KeyEnergyConsumersChart = () => {
  const emissionsData = [
    { category: 'Office', emissions: 45.2, trend: -2.3, color: '#5DD0A7' },
    { category: 'Warehouse', emissions: 28.7, trend: -5.1, color: '#3B82F6' },
    { category: 'Compressor', emissions: 18.9, trend: -1.8, color: '#10B981' },
    { category: 'Water System', emissions: 15.4, trend: -3.2, color: '#8B5CF6' },
    { category: 'Housekeeping', emissions: 32.1, trend: -4.7, color: '#F59E0B' },
  ];

  const totalEmissions = emissionsData?.reduce((sum, item) => sum + item?.emissions, 0);

  const formatTrend = (trend: any) => {
    const isPositive = trend > 0;
    return {
      value: Math.abs(trend),
      isPositive,
      icon: isPositive ? 'TrendingUp' : 'TrendingDown',
      color: isPositive ? 'text-accent-danger' : 'text-accent-success',
    };
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            Emissions:{' '}
            <span className="text-foreground font-medium">{payload[0].value} tCO2e/$M</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-3 mb-3 p-3">
      {/* <div className="bg-primary-foreground border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"> */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Key Energy Consumers</h3>
        </div>
        {/* <div className="flex items-center gap-2">
          <Icon name="BarChart3" size={20} className="text-primary" />
        </div> */}
      </div>

      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <BarChart
            data={emissionsData}
            layout="vertical"
            barSize={20}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            {/* Axis */}
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis
              type="category"
              dataKey="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#374151', fontWeight: 500 }}
              width={90}
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{ fill: 'rgba(0,0,0,0.05)' }}
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                fontSize: '12px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
              }}
              formatter={(value: number, _name, entry: any) => [
                `${value} Mt CO₂`,
                entry?.payload?.category,
              ]}
            />

            {/* Gradient defs */}
            <defs>
              {emissionsData.map((entry, index) => (
                <linearGradient
                  key={`grad-${index}`}
                  id={`grad-${index}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor={entry.color} stopOpacity={0.7} />
                  <stop offset="100%" stopColor={entry.color} stopOpacity={1} />
                </linearGradient>
              ))}
            </defs>

            {/* Bars */}
            <Bar dataKey="emissions" radius={[0, 6, 6, 0]}>
              {emissionsData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={`url(#grad-${index})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* </div> */}
    </div>
  );
};

export default KeyEnergyConsumersChart;
