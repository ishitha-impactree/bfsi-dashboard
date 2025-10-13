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

interface ESGChartProps {
  className?: string;
  data: any[]; 
}

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
    return null; // Don't render a dot for null values
  }
  return <circle cx={cx} cy={cy} r={4} stroke="black" strokeWidth={1} fill={stroke} />;
};

const ESGChart = ({ className, data }: ESGChartProps) => {
  return (
    <div className={`w-full flex flex-col ${className || ''}`}>
      <div className="flex justify-between items-center mb-4 px-3 sm:px-6">
        <h2 className="text-lg font-bold text-primary-dark">ESG Rating</h2>
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
            <Legend
              verticalAlign="top"
              align="right"
              height={36}
              iconType="square"
              iconSize={10}
              wrapperStyle={{ top: -20, right: 0, paddingBottom: '10px' }}
              formatter={(value) => <span className="text-sm text-text-primary">{value}</span>}
            />
            <Line
              type="monotone"
              dataKey="Environment"
              name="Environment"
              stroke="#fba900"
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
              stroke="#05ff00"
              strokeWidth={2}
              dot={<CustomDot />}
              activeDot={{ r: 6, stroke: '#05ff00', strokeWidth: 2 }}
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

export default ESGChart;