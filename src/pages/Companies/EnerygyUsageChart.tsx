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
  { name: 'FY21', Energy: 0.9 }, // M tCO₂e
  { name: 'FY22', Energy: 0.85 },
  { name: 'FY23', Energy: 0.7 },
  { name: 'FY24', Energy: 0.581 },
  { name: 'FY25', Energy: 0.5313 },
];

export const energyUsageData5 = [ // Sona Comstar
  { name: 'FY21', Energy: 0.031171 }, 
  { name: 'FY22', Energy: 0.047729 }, 
  { name: 'FY23', Energy: 0.043707 },
  { name: 'FY24', Energy: 0.058317 },
  { name: 'FY25', Energy: 0.064659 },
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

const CustomTooltip = ({ active, payload, label, companyName }: any) => {
  if (active && payload && payload.length) {
    const isEmissionsCompany = companyName && (companyName.includes('Bosch') || companyName.includes('Sona Comstar'));
    const unit = isEmissionsCompany ? 'M tCO₂e' : 'GJ';
    
    return (
      <div className="bg-background-card p-3 border border-border-primary rounded-lg shadow-lg">
        <p className="text-text-primary text-sm font-semibold">{`Period: ${label}`}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} className="text-sm" style={{ color: p.stroke }}>
            {`${p.name}: ${p.value !== null ? `${isEmissionsCompany ? p.value.toFixed(6) : formatNumberWithCommas(p.value)} ${unit}` : 'N/A'}`}
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
  const isEmissionsCompany = companyName && (companyName.includes('Bosch') || companyName.includes('Sona Comstar'));
  
  const maxValue = Math.max(...data.map(item => item.Energy as number));
  const yAxisMax = isEmissionsCompany 
    ? Math.ceil(maxValue * 1.2 * 10) / 10
    : Math.ceil(maxValue * 1.1); 

  const lineName = isEmissionsCompany ? 'Scope 1 & 2 Emissions' : 'Scope 1 & 2 Emissions';

  const formatYAxisTickCustom = (value: number): string => {
    if (isEmissionsCompany) {
      return value.toFixed(3);
    }
    return formatNumberWithCommas(value);
  };

  return (
    <div className={`w-full flex flex-col ${className || ''}`}>
      <div className="flex justify-between items-center mb-4 px-3 sm:px-4">
        <h2 className="text-lg font-bold text-primary-dark">
          {companyName ? `${companyName} - ${isEmissionsCompany ? 'Scope 1 & 2 Emissions' : 'Scope 1 & 2 Emissions'}` : 'Scope 1 & 2 Emissions'}
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
              tickFormatter={formatYAxisTickCustom}
            />
            <Tooltip content={<CustomTooltip companyName={companyName} />} />
            <Line
              type="linear"
              dataKey="Energy"
              name={lineName}
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