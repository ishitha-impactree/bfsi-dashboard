import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';

interface DataPoint {
  name: string;
  [key: string]: number | string;
}

interface ESGChartProps {
  className?: string;
  data?: DataPoint[];
  companyName?: string;
}

export const defaultData = [
  { name: 'Jan', Energy: 12400 },
  { name: 'Feb', Energy: 12400 },
  { name: 'Mar', Energy: 13175 },
  { name: 'Apr', Energy: 13950 },
  { name: 'May', Energy: 13950 },
  { name: 'Jun', Energy: 13950 },
  { name: 'Jul', Energy: 11625 },
  { name: 'Aug', Energy: 11625 },
  { name: 'Sep', Energy: 13175 },
];

// Data for other companies
export const energyUsageData1 = [ // Yazaki
  { name: 'Jan', Energy: 14400 },
  { name: 'Feb', Energy: 14400 },
  { name: 'Mar', Energy: 15300 },
  { name: 'Apr', Energy: 16200 },
  { name: 'May', Energy: 16200 },
  { name: 'Jun', Energy: 16200 },
  { name: 'Jul', Energy: 13500 },
  { name: 'Aug', Energy: 13500 },
  { name: 'Sep', Energy: 15300 },
];

export const energyUsageData2 = [ // LEONI India
  { name: 'Jan', Energy: 13200 },
  { name: 'Feb', Energy: 13200 },
  { name: 'Mar', Energy: 14025 },
  { name: 'Apr', Energy: 14850 },
  { name: 'May', Energy: 14850 },
  { name: 'Jun', Energy: 14850 },
  { name: 'Jul', Energy: 12375 },
  { name: 'Aug', Energy: 12375 },
  { name: 'Sep', Energy: 14025 },
];

export const energyUsageData3 = [ // Aptiv
  { name: 'Jan', Energy: 13600 },
  { name: 'Feb', Energy: 13600 },
  { name: 'Mar', Energy: 14450 },
  { name: 'Apr', Energy: 15300 },
  { name: 'May', Energy: 15300 },
  { name: 'Jun', Energy: 15300 },
  { name: 'Jul', Energy: 12750 },
  { name: 'Aug', Energy: 12750 },
  { name: 'Sep', Energy: 14450 },
];

export const energyUsageData4 = [ // Bosch
  { name: 'Jan', Energy: 68000 },
  { name: 'Feb', Energy: 68000 },
  { name: 'Mar', Energy: 72250 },
  { name: 'Apr', Energy: 76500 },
  { name: 'May', Energy: 76500 },
  { name: 'Jun', Energy: 76500 },
  { name: 'Jul', Energy: 63750 },
  { name: 'Aug', Energy: 63750 },
  { name: 'Sep', Energy: 72250 },
];

export const energyUsageData5 = [ // Sona Comstar
  { name: 'Jan', Energy: 16800 },
  { name: 'Feb', Energy: 16800 },
  { name: 'Mar', Energy: 17850 },
  { name: 'Apr', Energy: 18900 },
  { name: 'May', Energy: 18900 },
  { name: 'Jun', Energy: 18900 },
  { name: 'Jul', Energy: 15750 },
  { name: 'Aug', Energy: 15750 },
  { name: 'Sep', Energy: 17850 },
];

export const energyUsageData6 = [ // Uno Minda
  { name: 'Jan', Energy: 26400 },
  { name: 'Feb', Energy: 26400 },
  { name: 'Mar', Energy: 28050 },
  { name: 'Apr', Energy: 29700 },
  { name: 'May', Energy: 29700 },
  { name: 'Jun', Energy: 29700 },
  { name: 'Jul', Energy: 24750 },
  { name: 'Aug', Energy: 24750 },
  { name: 'Sep', Energy: 28050 },
];

export const energyUsageData7 = [ // Furukawa Minda
  { name: 'Jan', Energy: 7600 },
  { name: 'Feb', Energy: 7600 },
  { name: 'Mar', Energy: 8075 },
  { name: 'Apr', Energy: 8550 },
  { name: 'May', Energy: 8550 },
  { name: 'Jun', Energy: 8550 },
  { name: 'Jul', Energy: 7125 },
  { name: 'Aug', Energy: 7125 },
  { name: 'Sep', Energy: 8075 },
];

export const energyUsageData8 = [ // Varroc
  { name: 'Jan', Energy: 36000 },
  { name: 'Feb', Energy: 36000 },
  { name: 'Mar', Energy: 38250 },
  { name: 'Apr', Energy: 40500 },
  { name: 'May', Energy: 40500 },
  { name: 'Jun', Energy: 40500 },
  { name: 'Jul', Energy: 33750 },
  { name: 'Aug', Energy: 33750 },
  { name: 'Sep', Energy: 38250 },
];

export const energyUsageData9 = [ // Lumax
  { name: 'Jan', Energy: 8800 },
  { name: 'Feb', Energy: 8800 },
  { name: 'Mar', Energy: 9350 },
  { name: 'Apr', Energy: 9900 },
  { name: 'May', Energy: 9900 },
  { name: 'Jun', Energy: 9900 },
  { name: 'Jul', Energy: 8250 },
  { name: 'Aug', Energy: 8250 },
  { name: 'Sep', Energy: 9350 },
];

const formatNumberWithCommas = (value: number): string => {
  return value.toLocaleString('en-IN');
};

const formatYAxisTick = (value: number): string => {
  return formatNumberWithCommas(value);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background-card p-3 border border-border-primary rounded-lg shadow-lg">
        <p className="text-text-primary text-sm font-semibold">{`Month: ${label}`}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} className="text-sm" style={{ color: p.stroke }}>
            {`${p.name}: ${p.value !== null ? `${formatNumberWithCommas(p.value)} GJ` : 'N/A'}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomDot = (props: any) => {
  const { cx, cy, stroke, value } = props;
  if (value === null) {
    return null;
  }
  return <circle cx={cx} cy={cy} r={4} stroke="black" strokeWidth={1} fill={stroke} />;
};

const EnergyUsageChart = ({ className, data = defaultData, companyName }: ESGChartProps) => {
  const maxValue = Math.max(...data.map(item => item.Energy as number));
  const yAxisMax = Math.ceil(maxValue * 1.1); 
  return (
    <div className={`w-full flex flex-col ${className || ''}`}>
      <div className="flex justify-between items-center mb-4 px-3 sm:px-4">
        <h2 className="text-lg font-bold text-primary-dark">
          {companyName ? `${companyName} - Energy Usage By Month` : 'Energy Usage By Month'}
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
              dataKey="Energy"
              name="Energy Usage"
              stroke="#10B981"
              strokeWidth={2}
              dot={<CustomDot />}
              activeDot={{ r: 6, stroke: '#fba900', strokeWidth: 2 }}
              connectNulls={false}
            />
            <ReferenceLine y={maxValue / 2} stroke="#e5e7eb" strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EnergyUsageChart;