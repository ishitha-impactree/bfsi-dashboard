import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';

interface ESGChartProps {
  className?: string;
}

const ESGChart = ({ className }: ESGChartProps) => {
  const data = [
    { name: 'Jan', Environment: 55, Social: 50, Governance: 42 },
    { name: 'Feb', Environment: 45, Social: 55, Governance: 32 },
    { name: 'Mar', Environment: 44, Social: 50, Governance: 36 },
    { name: 'Apr', Environment: 38, Social: 56, Governance: 30 },
    { name: 'May', Environment: 52, Social: 61, Governance: 39 },
    { name: 'Jun', Environment: 45, Social: 56, Governance: 34 },
    { name: 'Jul', Environment: 64, Social: 46, Governance: 34 },
    { name: 'Aug', Environment: 42, Social: 36, Governance: 60 },
    { name: 'Sep', Environment: 56, Social: 41, Governance: 29 },
    { name: 'Oct', Environment: null, Social: null, Governance: null },
    { name: 'Nov', Environment: null, Social: null, Governance: null },
    { name: 'Dec', Environment: null, Social: null, Governance: null },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-md">
          <p className="font-bold text-gray-800">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props: any) => {
    const { cx, cy, stroke } = props;
    
    return (
      <g>
        <circle cx={cx} cy={cy} r={6} fill="white" stroke={stroke} strokeWidth={2} />
        <circle cx={cx} cy={cy} r={2} fill={stroke} />
      </g>
    );
  };

  return (
    <div className={`w-full h-[300px] sm:h-[350px] lg:h-[400px] ${className || ''}`}>
      <div className="flex flex-col gap-2 mb-4">
        <h3 className="text-md font-bold leading-md text-left text-primary-dark font-['Inter']">
          ESG Rating
        </h3>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#232538' }}
            ticks={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#232538' }}
            domain={[0, 100]}
            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            align="right"
            height={36}
            iconType="square"
            iconSize={10}
            wrapperStyle={{ paddingTop: '10px', paddingRight: '10px' }}
            formatter={(value) => <span className="text-xs text-text-primary">{value}</span>}
          />
          <Line 
            type="monotone" 
            dataKey="Environment" 
            name="Environment"
            stroke="#fba900"
            strokeWidth={2}
            dot={<CustomDot />}
            activeDot={{ r: 8, stroke: '#fba900', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="Social" 
            name="Social"
            stroke="#38c4f7" 
            strokeWidth={2}
            dot={<CustomDot />}
            activeDot={{ r: 8, stroke: '#38c4f7', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="Governance" 
            name="Governance"
            stroke="#05ff00" 
            strokeWidth={2}
            dot={<CustomDot />}
            activeDot={{ r: 8, stroke: '#05ff00', strokeWidth: 2 }}
          />
          <ReferenceLine x="Sep" stroke="red" strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ESGChart;