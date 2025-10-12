import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import Icon from '../../components/ui/AppIcon';

interface KeyEnergyConsumersChartProps {
  data?: Array<{
    category: string;
    emissions: number;
    trend: number;
    color: string;
  }>;
  unit?: string;
}

const defaultEnergyData = [
  { category: 'Corporate Office', emissions: 4650, trend: -2.3, color: '#5DD0A7' },
  { category: 'Warehouses', emissions: 1550, trend: -5.1, color: '#3B82F6' },
  { category: 'Manufacturing Plants', emissions: 144150, trend: -3.5, color: '#F97316' },
  { category: 'Water System', emissions: 0, trend: -3.2, color: '#8B5CF6' },
  { category: 'ZLD Plants', emissions: 0, trend: -1.8, color: '#10B981' },
  { category: 'Press Shops', emissions: 0, trend: -3.2, color: '#8B5CF6' },
  { category: 'R&D Stations', emissions: 4650, trend: -4.7, color: '#F59E0B' },
];

// Company-specific energy data - use const instead of export const
const energyData1 = [ // Yazaki
  { category: 'Corporate Office', emissions: 5400, trend: -2.1, color: '#5DD0A7' },
  { category: 'Warehouses', emissions: 1800, trend: -4.8, color: '#3B82F6' },
  { category: 'Manufacturing Plants', emissions: 138500, trend: -3.2, color: '#F97316' },
  { category: 'Water System', emissions: 0, trend: -2.8, color: '#8B5CF6' },
  { category: 'ZLD Plants', emissions: 0, trend: -1.5, color: '#10B981' },
  { category: 'Press Shops', emissions: 0, trend: -2.9, color: '#8B5CF6' },
  { category: 'R&D Stations', emissions: 5400, trend: -4.2, color: '#F59E0B' },
];

const energyData2 = [ // LEONI
  { category: 'Corporate Office', emissions: 4950, trend: -1.9, color: '#5DD0A7' },
  { category: 'Warehouses', emissions: 1650, trend: -4.5, color: '#3B82F6' },
  { category: 'Manufacturing Plants', emissions: 153450, trend: -2.8, color: '#F97316' },
  { category: 'Water System', emissions: 0, trend: -2.5, color: '#8B5CF6' },
  { category: 'ZLD Plants', emissions: 0, trend: -1.2, color: '#10B981' },
  { category: 'Press Shops', emissions: 0, trend: -2.6, color: '#8B5CF6' },
  { category: 'R&D Stations', emissions: 4950, trend: -3.9, color: '#F59E0B' },
];

const energyData3 = [ // Aptiv
  { category: 'Corporate Office', emissions: 5100, trend: -2.4, color: '#5DD0A7' },
  { category: 'Warehouses', emissions: 1700, trend: -5.2, color: '#3B82F6' },
  { category: 'Manufacturing Plants', emissions: 158100, trend: -3.6, color: '#F97316' },
  { category: 'Water System', emissions: 0, trend: -3.1, color: '#8B5CF6' },
  { category: 'ZLD Plants', emissions: 0, trend: -1.7, color: '#10B981' },
  { category: 'Press Shops', emissions: 0, trend: -3.0, color: '#8B5CF6' },
  { category: 'R&D Stations', emissions: 5100, trend: -4.5, color: '#F59E0B' },
];

const energyData4 = [ // Bosch
  { category: 'Corporate Office', emissions: 25500, trend: -2.8, color: '#5DD0A7' },
  { category: 'Warehouses', emissions: 8500, trend: -5.8, color: '#3B82F6' },
  { category: 'Manufacturing Plants', emissions: 790500, trend: -4.2, color: '#F97316' },
  { category: 'Water System', emissions: 0, trend: -3.8, color: '#8B5CF6' },
  { category: 'ZLD Plants', emissions: 0, trend: -2.2, color: '#10B981' },
  { category: 'Press Shops', emissions: 0, trend: -3.5, color: '#8B5CF6' },
  { category: 'R&D Stations', emissions: 25500, trend: -5.2, color: '#F59E0B' },
];

const energyData5 = [ // Sona Comstar
  { category: 'Corporate Office', emissions: 6300, trend: -1.8, color: '#5DD0A7' },
  { category: 'Warehouses', emissions: 2100, trend: -4.2, color: '#3B82F6' },
  { category: 'Manufacturing Plants', emissions: 195300, trend: -2.5, color: '#F97316' },
  { category: 'Water System', emissions: 0, trend: -2.1, color: '#8B5CF6' },
  { category: 'ZLD Plants', emissions: 0, trend: -1.0, color: '#10B981' },
  { category: 'Press Shops', emissions: 0, trend: -2.3, color: '#8B5CF6' },
  { category: 'R&D Stations', emissions: 6300, trend: -3.5, color: '#F59E0B' },
];

const energyData6 = [ // Uno Minda
  { category: 'Corporate Office', emissions: 9900, trend: -1.7, color: '#5DD0A7' },
  { category: 'Warehouses', emissions: 3300, trend: -4.0, color: '#3B82F6' },
  { category: 'Manufacturing Plants', emissions: 306900, trend: -2.7, color: '#F97316' },
  { category: 'Water System', emissions: 0, trend: -1.9, color: '#8B5CF6' },
  { category: 'ZLD Plants', emissions: 0, trend: -0.9, color: '#10B981' },
  { category: 'Press Shops', emissions: 0, trend: -2.1, color: '#8B5CF6' },
  { category: 'R&D Stations', emissions: 9900, trend: -3.2, color: '#F59E0B' },
];

const energyData7 = [ // FME
  { category: 'Corporate Office', emissions: 2850, trend: -1.5, color: '#5DD0A7' },
  { category: 'Warehouses', emissions: 950, trend: -3.8, color: '#3B82F6' },
  { category: 'Manufacturing Plants', emissions: 88350, trend: -2.2, color: '#F97316' },
  { category: 'Water System', emissions: 0, trend: -1.6, color: '#8B5CF6' },
  { category: 'ZLD Plants', emissions: 0, trend: -0.7, color: '#10B981' },
  { category: 'Press Shops', emissions: 0, trend: -1.8, color: '#8B5CF6' },
  { category: 'R&D Stations', emissions: 2850, trend: -2.8, color: '#F59E0B' },
];

const energyData8 = [ // Varroc
  { category: 'Corporate Office', emissions: 13500, trend: -2.0, color: '#5DD0A7' },
  { category: 'Warehouses', emissions: 4500, trend: -4.3, color: '#3B82F6' },
  { category: 'Manufacturing Plants', emissions: 418500, trend: -2.9, color: '#F97316' },
  { category: 'Water System', emissions: 0, trend: -2.3, color: '#8B5CF6' },
  { category: 'ZLD Plants', emissions: 0, trend: -1.1, color: '#10B981' },
  { category: 'Press Shops', emissions: 0, trend: -2.4, color: '#8B5CF6' },
  { category: 'R&D Stations', emissions: 13500, trend: -3.6, color: '#F59E0B' },
];

const energyData9 = [ // LIL
  { category: 'Corporate Office', emissions: 3300, trend: -1.6, color: '#5DD0A7' },
  { category: 'Warehouses', emissions: 1100, trend: -3.9, color: '#3B82F6' },
  { category: 'Manufacturing Plants', emissions: 102300, trend: -2.4, color: '#F97316' },
  { category: 'Water System', emissions: 0, trend: -1.8, color: '#8B5CF6' },
  { category: 'ZLD Plants', emissions: 0, trend: -0.8, color: '#10B981' },
  { category: 'Press Shops', emissions: 0, trend: -2.0, color: '#8B5CF6' },
  { category: 'R&D Stations', emissions: 3300, trend: -3.0, color: '#F59E0B' },
];

// Format number with commas for Indian numbering system
const formatNumberWithCommas = (value: number): string => {
  return value.toLocaleString('en-IN');
};

// Custom XAxis tick formatter
const formatXAxisTick = (value: number): string => {
  return formatNumberWithCommas(value);
};

const KeyEnergyConsumersChart = ({ 
  data = defaultEnergyData, 
  unit = 'GJ' 
}: KeyEnergyConsumersChartProps) => {
  const totalEmissions = data?.reduce((sum, item) => sum + item?.emissions, 0);

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
            Energy Consumption:{' '}
            <span className="text-foreground font-medium">
              {formatNumberWithCommas(payload[0].value)} {unit}
            </span>
          </p>
          {payload[0].payload.trend !== 0 && (
            <p className="text-sm text-muted-foreground">
              Trend:{' '}
              <span className={`font-medium ${payload[0].payload.trend < 0 ? 'text-accent-success' : 'text-accent-danger'}`}>
                {payload[0].payload.trend > 0 ? '+' : ''}{payload[0].payload.trend}%
              </span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-3 mb-3 p-3">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Key Energy Consumers</h3>
          <p className="text-sm text-muted-foreground">
            Total: {formatNumberWithCommas(totalEmissions || 0)} {unit}
          </p>
        </div>
      </div>

      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout="vertical"
            barSize={20}
            margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
          >
            {/* Axis */}
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickFormatter={formatXAxisTick}
            />
            <YAxis
              type="category"
              dataKey="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#374151', fontWeight: 500 }}
              width={100}
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{ fill: 'rgba(0,0,0,0.05)' }}
              content={<CustomTooltip />}
            />

            {/* Gradient defs */}
            <defs>
              {data.map((entry, index) => (
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
            <Bar 
              dataKey="emissions" 
              radius={[0, 6, 6, 0]}
              name="Energy Consumption"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={`url(#grad-${index})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default KeyEnergyConsumersChart;
export { 
  defaultEnergyData, 
  energyData1, 
  energyData2, 
  energyData3, 
  energyData4, 
  energyData5, 
  energyData6, 
  energyData7, 
  energyData8, 
  energyData9 
};