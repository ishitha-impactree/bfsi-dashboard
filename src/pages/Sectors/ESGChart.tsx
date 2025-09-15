import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface ESGChartProps {
  className?: string;
}

const ESGChart = ({ className }: ESGChartProps) => {
  const data = [
    { name: 'Jan', Environment: 45, Social: 42, Governance: 48 },
    { name: 'Feb', Environment: 48, Social: 45, Governance: 52 },
    { name: 'Mar', Environment: 52, Social: 38, Governance: 55 },
    { name: 'Apr', Environment: 55, Social: 48, Governance: 58 },
    { name: 'May', Environment: 58, Social: 52, Governance: 62 },
    { name: 'Jun', Environment: 62, Social: 55, Governance: 65 },
    { name: 'Jul', Environment: 65, Social: 58, Governance: 68 },
    { name: 'Aug', Environment: 68, Social: 62, Governance: 72 },
    { name: 'Sep', Environment: 72, Social: 65, Governance: 75 },
    { name: 'Oct', Environment: 75, Social: 68, Governance: 78 },
    { name: 'Nov', Environment: 78, Social: 72, Governance: 82 },
    { name: 'Dec', Environment: 82, Social: 75, Governance: 85 }
  ];

  return (
    <div className={`w-full h-[300px] sm:h-[350px] lg:h-[400px] ${className || ''}`}>
      <div className="flex flex-col gap-2 mb-4">
        <h3 className="text-md font-bold leading-md text-left text-primary-dark font-['Inter']">
          ESG Rating
        </h3>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent-warning rounded-full"></div>
            <span className="text-text-primary font-['Inter']">Environment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent-info rounded-full"></div>
            <span className="text-text-primary font-['Inter']">Social</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent-success rounded-full"></div>
            <span className="text-text-primary font-['Inter']">Governance</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#232538' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#232538' }}
            domain={[0, 100]}
          />
          <Line 
            type="monotone" 
            dataKey="Environment" 
            stroke="#fba900" 
            strokeWidth={2}
            dot={{ fill: '#fba900', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#fba900', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="Social" 
            stroke="#38c4f7" 
            strokeWidth={2}
            dot={{ fill: '#38c4f7', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#38c4f7', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="Governance" 
            stroke="#05ff00" 
            strokeWidth={2}
            dot={{ fill: '#05ff00', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#05ff00', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ESGChart;