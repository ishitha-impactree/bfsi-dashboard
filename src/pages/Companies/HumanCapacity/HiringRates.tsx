import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface HiringProps {
  data?: Array<{
    name: string;
    hiringRate: number;
  }>;
  companyName?: string;
}

// Default data for Motherson Sumi Wiring India Ltd.
export const defaultHiringData = [
  { name: 'Jan', hiringRate: 1.20 },
  { name: 'Feb', hiringRate: 1.35 },
  { name: 'Mar', hiringRate: 1.50 },
  { name: 'Apr', hiringRate: 1.25 },
  { name: 'May', hiringRate: 1.40 },
  { name: 'Jun', hiringRate: 1.60 },
  { name: 'Jul', hiringRate: 1.30 },
  { name: 'Aug', hiringRate: 1.45 },
  { name: 'Sep', hiringRate: 1.55 },
];

// Data for other companies
export const hiringData1 = [ // Yazaki
  { name: 'Jan', hiringRate: 1.40 },
  { name: 'Feb', hiringRate: 1.55 },
  { name: 'Mar', hiringRate: 1.70 },
  { name: 'Apr', hiringRate: 1.45 },
  { name: 'May', hiringRate: 1.60 },
  { name: 'Jun', hiringRate: 1.80 },
  { name: 'Jul', hiringRate: 1.50 },
  { name: 'Aug', hiringRate: 1.65 },
  { name: 'Sep', hiringRate: 1.75 },
];

export const hiringData2 = [ // LEONI India
  { name: 'Jan', hiringRate: 1.10 },
  { name: 'Feb', hiringRate: 1.25 },
  { name: 'Mar', hiringRate: 1.40 },
  { name: 'Apr', hiringRate: 1.15 },
  { name: 'May', hiringRate: 1.30 },
  { name: 'Jun', hiringRate: 1.50 },
  { name: 'Jul', hiringRate: 1.20 },
  { name: 'Aug', hiringRate: 1.35 },
  { name: 'Sep', hiringRate: 1.45 },
];

export const hiringData3 = [ // Aptiv
  { name: 'Jan', hiringRate: 1.30 },
  { name: 'Feb', hiringRate: 1.45 },
  { name: 'Mar', hiringRate: 1.60 },
  { name: 'Apr', hiringRate: 1.35 },
  { name: 'May', hiringRate: 1.50 },
  { name: 'Jun', hiringRate: 1.70 },
  { name: 'Jul', hiringRate: 1.40 },
  { name: 'Aug', hiringRate: 1.55 },
  { name: 'Sep', hiringRate: 1.65 },
];

export const hiringData4 = [ // Bosch
  { name: 'Jan', hiringRate: 1.80 },
  { name: 'Feb', hiringRate: 1.95 },
  { name: 'Mar', hiringRate: 2.10 },
  { name: 'Apr', hiringRate: 1.85 },
  { name: 'May', hiringRate: 2.00 },
  { name: 'Jun', hiringRate: 2.20 },
  { name: 'Jul', hiringRate: 1.90 },
  { name: 'Aug', hiringRate: 2.05 },
  { name: 'Sep', hiringRate: 2.15 },
];

export const hiringData5 = [ // Sona Comstar
  { name: 'Jan', hiringRate: 0.90 },
  { name: 'Feb', hiringRate: 1.05 },
  { name: 'Mar', hiringRate: 1.20 },
  { name: 'Apr', hiringRate: 0.95 },
  { name: 'May', hiringRate: 1.10 },
  { name: 'Jun', hiringRate: 1.30 },
  { name: 'Jul', hiringRate: 1.00 },
  { name: 'Aug', hiringRate: 1.15 },
  { name: 'Sep', hiringRate: 1.25 },
];

export const hiringData6 = [ // Uno Minda
  { name: 'Jan', hiringRate: 1.50 },
  { name: 'Feb', hiringRate: 1.65 },
  { name: 'Mar', hiringRate: 1.80 },
  { name: 'Apr', hiringRate: 1.55 },
  { name: 'May', hiringRate: 1.70 },
  { name: 'Jun', hiringRate: 1.90 },
  { name: 'Jul', hiringRate: 1.60 },
  { name: 'Aug', hiringRate: 1.75 },
  { name: 'Sep', hiringRate: 1.85 },
];

export const hiringData7 = [ // Furukawa Minda
  { name: 'Jan', hiringRate: 0.80 },
  { name: 'Feb', hiringRate: 0.95 },
  { name: 'Mar', hiringRate: 1.10 },
  { name: 'Apr', hiringRate: 0.85 },
  { name: 'May', hiringRate: 1.00 },
  { name: 'Jun', hiringRate: 1.20 },
  { name: 'Jul', hiringRate: 0.90 },
  { name: 'Aug', hiringRate: 1.05 },
  { name: 'Sep', hiringRate: 1.15 },
];

export const hiringData8 = [ // Varroc
  { name: 'Jan', hiringRate: 1.60 },
  { name: 'Feb', hiringRate: 1.75 },
  { name: 'Mar', hiringRate: 1.90 },
  { name: 'Apr', hiringRate: 1.65 },
  { name: 'May', hiringRate: 1.80 },
  { name: 'Jun', hiringRate: 2.00 },
  { name: 'Jul', hiringRate: 1.70 },
  { name: 'Aug', hiringRate: 1.85 },
  { name: 'Sep', hiringRate: 1.95 },
];

export const hiringData9 = [ // Lumax
  { name: 'Jan', hiringRate: 1.00 },
  { name: 'Feb', hiringRate: 1.15 },
  { name: 'Mar', hiringRate: 1.30 },
  { name: 'Apr', hiringRate: 1.05 },
  { name: 'May', hiringRate: 1.20 },
  { name: 'Jun', hiringRate: 1.40 },
  { name: 'Jul', hiringRate: 1.10 },
  { name: 'Aug', hiringRate: 1.25 },
  { name: 'Sep', hiringRate: 1.35 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background-card p-3 border border-border-primary rounded-lg shadow-lg">
        <p className="text-text-primary text-sm font-semibold">{`Month: ${label}`}</p>
        <p className="text-sm" style={{ color: '#10B981' }}>
          {`Hiring Rate: ${payload[0].value}%`}
        </p>
      </div>
    );
  }
  return null;
};

const Hiring = ({ data = defaultHiringData, companyName }: HiringProps) => {
  // Calculate max value for YAxis domain with some padding
  const maxValue = Math.max(...data.map(item => item.hiringRate));
  const yAxisMax = Math.ceil(maxValue * 1.2); // 20% padding

  const formatYAxisTick = (value: number): string => {
    return `${value}%`;
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center mb-4 px-3 sm:px-4">
        <h2 className="text-lg font-bold text-primary-dark">
          {companyName ? `${companyName} - Monthly Hiring Rate` : 'Monthly Hiring Rate'}
        </h2>
      </div>

      <div className="w-full flex-grow" style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis
              domain={[0, yAxisMax]}
              tickCount={6}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={formatYAxisTick}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="linear"
              dataKey="hiringRate"
              name="Hiring Rate"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ r: 4, stroke: '#10B981', strokeWidth: 2, fill: 'white' }}
              activeDot={{ r: 6, stroke: '#fba900', strokeWidth: 2, fill: '#10B981' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Hiring;