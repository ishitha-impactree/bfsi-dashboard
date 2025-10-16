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

export const defaultHiringData = [
  { name: 'Jan', hiringRate: 1.20 },
  { name: 'Feb', hiringRate: 0.90},
  { name: 'Mar', hiringRate: 1.10 },
  { name: 'Apr', hiringRate: 1.00 },
  { name: 'May', hiringRate: 0.80 },
  { name: 'Jun', hiringRate: 1.30 },
  { name: 'Jul', hiringRate: 1.00 },
  { name: 'Aug', hiringRate: 0.90 },
  { name: 'Sep', hiringRate: 1.20 },
];

export const hiringData1 = [ // Yazaki
  { name: 'Jan', hiringRate: 1.00 },
  { name: 'Feb', hiringRate: 0.70 },
  { name: 'Mar', hiringRate: 1.20 },
  { name: 'Apr', hiringRate: 0.90 },
  { name: 'May', hiringRate: 0.80 },
  { name: 'Jun', hiringRate: 1.10 },
  { name: 'Jul', hiringRate: 0.90 },
  { name: 'Aug', hiringRate: 1.00 },
  { name: 'Sep', hiringRate: 1.30 },
];

export const hiringData2 = [ // LEONI India
  { name: 'Jan', hiringRate: 1.10 },
  { name: 'Feb', hiringRate: 0.80 },
  { name: 'Mar', hiringRate: 1.00 },
  { name: 'Apr', hiringRate: 0.70 },
  { name: 'May', hiringRate: 0.90 },
  { name: 'Jun', hiringRate: 1.20 },
  { name: 'Jul', hiringRate: 1.00 },
  { name: 'Aug', hiringRate: 0.90 },
  { name: 'Sep', hiringRate: 1.10 },
];

export const hiringData3 = [ // Aptiv
  { name: 'Jan', hiringRate: 1.30 },
  { name: 'Feb', hiringRate: 1.00 },
  { name: 'Mar', hiringRate: 1.10 },
  { name: 'Apr', hiringRate: 0.80 },
  { name: 'May', hiringRate: 1.00 },
  { name: 'Jun', hiringRate: 1.20 },
  { name: 'Jul', hiringRate: 1.00 },
  { name: 'Aug', hiringRate: 1.10 },
  { name: 'Sep', hiringRate: 1.20 },
];

export const hiringData4 = [ // Bosch
  { name: 'FY21', hiringRate: 395034 },
  { name: 'FY22', hiringRate: 402614 },
  { name: 'FY23', hiringRate: 421338 },
  { name: 'FY24', hiringRate: 429416 },
  { name: 'FY25', hiringRate: 417859 },
];

export const hiringData5 = [ // Sona Comstar
  { name: 'FY21', hiringRate: 3143 },
  { name: 'FY22', hiringRate: 3555 },
  { name: 'FY23', hiringRate: 4064 },
  { name: 'FY24', hiringRate: 4674 },
  { name: 'FY25', hiringRate: 5019 },
];

export const hiringData6 = [ // Uno Minda
  { name: 'Jan', hiringRate: 1.10},
  { name: 'Feb', hiringRate: 1.00 },
  { name: 'Mar', hiringRate: 1.20 },
  { name: 'Apr', hiringRate: 0.90 },
  { name: 'May', hiringRate: 1.00 },
  { name: 'Jun', hiringRate: 1.20 },
  { name: 'Jul', hiringRate: 1.10 },
  { name: 'Aug', hiringRate: 1.00 },
  { name: 'Sep', hiringRate: 1.20 },
];

export const hiringData7 = [ // Furukawa Minda
  { name: 'Jan', hiringRate: 1.20 },
  { name: 'Feb', hiringRate: 1.10 },
  { name: 'Mar', hiringRate: 1.30 },
  { name: 'Apr', hiringRate: 1.00 },
  { name: 'May', hiringRate: 0.80 },
  { name: 'Jun', hiringRate: 1.10 },
  { name: 'Jul', hiringRate: 1.00 },
  { name: 'Aug', hiringRate: 1.20 },
  { name: 'Sep', hiringRate: 1.10 },
];

export const hiringData8 = [ // Varroc
  { name: 'Jan', hiringRate: 0.80 },
  { name: 'Feb', hiringRate: 0.90 },
  { name: 'Mar', hiringRate: 1.10 },
  { name: 'Apr', hiringRate: 1.00 },
  { name: 'May', hiringRate: 0.90 },
  { name: 'Jun', hiringRate: 1.20 },
  { name: 'Jul', hiringRate: 1.00 },
  { name: 'Aug', hiringRate: 1.10 },
  { name: 'Sep', hiringRate: 1.20 },
];

export const hiringData9 = [ // Lumax
  { name: 'Jan', hiringRate: 1.00 },
  { name: 'Feb', hiringRate: 0.90 },
  { name: 'Mar', hiringRate: 1.10 },
  { name: 'Apr', hiringRate: 1.00 },
  { name: 'May', hiringRate: 0.80 },
  { name: 'Jun', hiringRate: 1.10 },
  { name: 'Jul', hiringRate: 1.00 },
  { name: 'Aug', hiringRate: 1.00 },
  { name: 'Sep', hiringRate: 1.30 },
];

const formatNumberWithCommas = (value: number): string => {
  return value.toLocaleString('en-US');
};

const CustomTooltip = ({ active, payload, label, companyName }: any) => {
  if (active && payload && payload.length) {
    const isManpowerCompany = companyName && (companyName.includes('Bosch') || companyName.includes('Sona Comstar'));
    
    const formatValue = (value: number) => {
      if (isManpowerCompany) {
        return `$${formatNumberWithCommas(value)}`;
      }
      return `${value}%`;
    };

    const valueName = isManpowerCompany ? 'Total Manpower' : 'Hiring Rate';

    return (
      <div className="bg-background-card p-3 border border-border-primary rounded-lg shadow-lg">
        <p className="text-text-primary text-sm font-semibold">{`Period: ${label}`}</p>
        <p className="text-sm" style={{ color: '#10B981' }}>
          {`${valueName}: ${formatValue(payload[0].value)}`}
        </p>
      </div>
    );
  }
  return null;
};

const Hiring = ({ data = defaultHiringData, companyName }: HiringProps) => {
  const isManpowerCompany = companyName && (companyName.includes('Bosch') || companyName.includes('Sona Comstar'));
  
  const maxValue = Math.max(...data.map(item => item.hiringRate));
  const yAxisMax = isManpowerCompany 
    ? Math.ceil(maxValue * 1.1)
    : Math.ceil(maxValue * 1.2); 

  const formatYAxisTick = (value: number): string => {
    if (isManpowerCompany) {
      return `$${formatNumberWithCommas(value)}`;
    }
    return `${value}%`;
  };

  const lineName = isManpowerCompany ? 'Total Manpower' : 'Hiring Rate';

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center mb-4 px-3 sm:px-4">
        <h2 className="text-lg font-bold text-primary-dark">
          {companyName ? `${companyName} - ${isManpowerCompany ? 'Total Manpower' : 'Hiring Rate'}` : 'Hiring Rate'}
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
            <Tooltip content={<CustomTooltip companyName={companyName} />} />
            <Line
              type="linear"
              dataKey="hiringRate"
              name={lineName}
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