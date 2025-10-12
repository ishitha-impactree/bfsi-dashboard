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
  Environment: number;
  Social: number;
  Governance: number;
}

interface ESGChartProps {
  className?: string;
  data?: DataPoint[]; 
}
const defaultData = [
  { name: 'Jan', Environment: 62, Social: 56, Governance: 64 }, 
  { name: 'Feb', Environment: 67, Social: 58, Governance: 67 },
  { name: 'Mar', Environment: 78, Social: 55, Governance: 86 },
  { name: 'Apr', Environment: 87, Social: 51, Governance: 81 },
  { name: 'May', Environment: 64, Social: 57, Governance: 76 },
  { name: 'Jun', Environment: 67, Social: 58, Governance: 86 },
  { name: 'Jul', Environment: 86, Social: 60, Governance: 81 },
  { name: 'Aug', Environment: 81, Social: 57, Governance: 76 },
  { name: 'Sep', Environment: 76, Social: 67, Governance: 56 },
];

const data1 = [
  { name: 'Jan', Environment: 56, Social: 62, Governance: 64 }, 
  { name: 'Feb', Environment: 58, Social: 67, Governance: 67 },
  { name: 'Mar', Environment: 55, Social: 78, Governance: 86 },
  { name: 'Apr', Environment: 51, Social: 87, Governance: 81 },
  { name: 'May', Environment: 57, Social: 64, Governance: 76 },
  { name: 'Jun', Environment: 58, Social: 67, Governance: 86 },
  { name: 'Jul', Environment: 60, Social: 86, Governance: 81 },
  { name: 'Aug', Environment: 57, Social: 81, Governance: 76 },
  { name: 'Sep', Environment: 67, Social: 76, Governance: 56 },
];

const data2 = [
  { name: 'Jan', Environment: 75, Social: 60, Governance: 80 }, 
  { name: 'Feb', Environment: 68, Social: 65, Governance: 82 },
  { name: 'Mar', Environment: 72, Social: 62, Governance: 79 },
  { name: 'Apr', Environment: 80, Social: 58, Governance: 85 },
  { name: 'May', Environment: 77, Social: 61, Governance: 81 },
  { name: 'Jun', Environment: 69, Social: 66, Governance: 83 },
  { name: 'Jul', Environment: 74, Social: 63, Governance: 84 },
  { name: 'Aug', Environment: 71, Social: 59, Governance: 80 },
  { name: 'Sep', Environment: 78, Social: 64, Governance: 86 },
];

const data3 = [
  { name: 'Jan', Environment: 62, Social: 70, Governance: 65 }, 
  { name: 'Feb', Environment: 68, Social: 72, Governance: 70 },
  { name: 'Mar', Environment: 60, Social: 68, Governance: 72 },
  { name: 'Apr', Environment: 67, Social: 75, Governance: 68 },
  { name: 'May', Environment: 63, Social: 71, Governance: 66 },
  { name: 'Jun', Environment: 65, Social: 69, Governance: 71 },
  { name: 'Jul', Environment: 69, Social: 74, Governance: 67 },
  { name: 'Aug', Environment: 64, Social: 70, Governance: 73 },
  { name: 'Sep', Environment: 66, Social: 73, Governance: 69 },
];

const data4 = [
  { name: 'Jan', Environment: 82, Social: 72, Governance: 79 }, 
  { name: 'Feb', Environment: 88, Social: 78, Governance: 75 },
  { name: 'Mar', Environment: 85, Social: 74, Governance: 80 },
  { name: 'Apr', Environment: 86, Social: 76, Governance: 76 },
  { name: 'May', Environment: 83, Social: 71, Governance: 77 },
  { name: 'Jun', Environment: 84, Social: 79, Governance: 81 },
  { name: 'Jul', Environment: 89, Social: 73, Governance: 74 },
  { name: 'Aug', Environment: 81, Social: 75, Governance: 78 },
  { name: 'Sep', Environment: 87, Social: 77, Governance: 82 },
];

const data5 = [
  { name: 'Jan', Environment: 55, Social: 65, Governance: 60 }, 
  { name: 'Feb', Environment: 60, Social: 68, Governance: 66 },
  { name: 'Mar', Environment: 58, Social: 66, Governance: 63 },
  { name: 'Apr', Environment: 62, Social: 70, Governance: 67 },
  { name: 'May', Environment: 57, Social: 64, Governance: 61 },
  { name: 'Jun', Environment: 61, Social: 69, Governance: 68 },
  { name: 'Jul', Environment: 56, Social: 63, Governance: 62 },
  { name: 'Aug', Environment: 59, Social: 67, Governance: 65 },
  { name: 'Sep', Environment: 63, Social: 71, Governance: 69 },
];

const data6 = [
  { name: 'Jan', Environment: 74, Social: 66, Governance: 70 }, 
  { name: 'Feb', Environment: 78, Social: 70, Governance: 73 },
  { name: 'Mar', Environment: 75, Social: 67, Governance: 69 },
  { name: 'Apr', Environment: 79, Social: 71, Governance: 74 },
  { name: 'May', Environment: 73, Social: 65, Governance: 68 },
  { name: 'Jun', Environment: 77, Social: 69, Governance: 72 },
  { name: 'Jul', Environment: 72, Social: 64, Governance: 67 },
  { name: 'Aug', Environment: 76, Social: 68, Governance: 71 },
  { name: 'Sep', Environment: 80, Social: 72, Governance: 75 },
];

const data7 = [
  { name: 'Jan', Environment: 50, Social: 56, Governance: 53 }, 
  { name: 'Feb', Environment: 54, Social: 60, Governance: 58 },
  { name: 'Mar', Environment: 51, Social: 57, Governance: 55 },
  { name: 'Apr', Environment: 55, Social: 61, Governance: 59 },
  { name: 'May', Environment: 49, Social: 55, Governance: 52 },
  { name: 'Jun', Environment: 53, Social: 59, Governance: 57 },
  { name: 'Jul', Environment: 48, Social: 54, Governance: 51 },
  { name: 'Aug', Environment: 52, Social: 58, Governance: 56 },
  { name: 'Sep', Environment: 56, Social: 62, Governance: 60 },
];

const data8 = [
  { name: 'Jan', Environment: 68, Social: 62, Governance: 70 }, 
  { name: 'Feb', Environment: 72, Social: 67, Governance: 73 },
  { name: 'Mar', Environment: 69, Social: 64, Governance: 69 },
  { name: 'Apr', Environment: 73, Social: 68, Governance: 74 },
  { name: 'May', Environment: 67, Social: 61, Governance: 68 },
  { name: 'Jun', Environment: 71, Social: 66, Governance: 72 },
  { name: 'Jul', Environment: 66, Social: 60, Governance: 67 },
  { name: 'Aug', Environment: 70, Social: 65, Governance: 71 },
  { name: 'Sep', Environment: 74, Social: 69, Governance: 75 },
];

const data9 = [
  { name: 'Jan', Environment: 78, Social: 70, Governance: 71 }, 
  { name: 'Feb', Environment: 81, Social: 74, Governance: 75 },
  { name: 'Mar', Environment: 77, Social: 71, Governance: 72 },
  { name: 'Apr', Environment: 82, Social: 75, Governance: 76 },
  { name: 'May', Environment: 76, Social: 69, Governance: 70 },
  { name: 'Jun', Environment: 80, Social: 73, Governance: 74 },
  { name: 'Jul', Environment: 75, Social: 68, Governance: 69 },
  { name: 'Aug', Environment: 79, Social: 72, Governance: 73 },
  { name: 'Sep', Environment: 83, Social: 76, Governance: 77 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background-card p-3 border border-border-primary rounded-lg shadow-lg">
        <p className="text-text-primary text-sm font-semibold">{`Month: ${label}`}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} className="text-sm" style={{ color: p.stroke }}>
            {`${p.name}: ${p.value !== null ? `${p.value}%` : 'N/A'}`}
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

const CumulativeRatingsChart = ({ className, data = defaultData }: ESGChartProps) => {
  return (
    <div className={`w-full flex flex-col ${className || ''}`}>
      <div className="flex justify-between items-center mb-4 px-3 sm:px-6">
        <h2 className="text-lg font-bold text-primary-dark">Company's Cumulative ESG Rating</h2>
      </div>

      <div className="w-full flex-grow" style={{ height: '400px' }}>
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
              domain={[0, 100]}
              tickCount={11}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="Environment"
              name="Environment"
              stroke="#0fe95fff"
              strokeWidth={2} 
              dot={<CustomDot />}
              activeDot={{ r: 6, stroke: '#fba900', strokeWidth: 2 }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="Social"
              name="Social"
              stroke="#38c4f7"
              strokeWidth={2}
              dot={<CustomDot />}
              activeDot={{ r: 6, stroke: '#38c4f7', strokeWidth: 2 }} 
              connectNulls={false}
            />
              <Line
              type="monotone"
              dataKey="Governance"
              name="Governance"
              stroke="#fba900"
              strokeWidth={2} 
              dot={<CustomDot />}
              activeDot={{ r: 6, stroke: '#38c4f7', strokeWidth: 2 }} 
              connectNulls={false}
            />
            <ReferenceLine y={50} stroke="#e5e7eb" strokeDasharray="3 3" />
            <ReferenceLine x="Sep" stroke="#d1d5db" strokeDasharray="3 3" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CumulativeRatingsChart;

export { 
  defaultData, 
  data1, 
  data2, 
  data3, 
  data4, 
  data5, 
  data6, 
  data7, 
  data8, 
  data9 
};