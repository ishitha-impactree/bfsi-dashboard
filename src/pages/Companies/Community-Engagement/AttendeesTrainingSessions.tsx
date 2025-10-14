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

export const defaultAttendeesData = [
  { name: 'Jan', hiringRate: 520 },
  { name: 'Feb', hiringRate: 610 } ,
  { name: 'Mar', hiringRate: 580 },
  { name: 'Apr', hiringRate: 640 },
  { name: 'May', hiringRate: 590 },
  { name: 'Jun', hiringRate: 670 },
  { name: 'Jul', hiringRate: 710 },
  { name: 'Aug', hiringRate: 690 },
  { name: 'Sep', hiringRate: 720 },
];

export const attendeesData1 = [ // Yazaki
  { name: 'Jan', hiringRate: 460 },
  { name: 'Feb', hiringRate: 480 },
  { name: 'Mar', hiringRate: 510 },
  { name: 'Apr', hiringRate: 530 },
  { name: 'May', hiringRate: 490 },
  { name: 'Jun', hiringRate: 560 },
  { name: 'Jul', hiringRate: 600 },
  { name: 'Aug', hiringRate: 590 },
  { name: 'Sep', hiringRate: 610 },
];

export const attendeesData2 = [ // LEONI India
  { name: 'Jan', hiringRate: 410 },
  { name: 'Feb', hiringRate: 430 },
  { name: 'Mar', hiringRate: 470 },
  { name: 'Apr', hiringRate: 490 },
  { name: 'May', hiringRate: 450 },
  { name: 'Jun', hiringRate: 510 },
  { name: 'Jul', hiringRate: 530 },
  { name: 'Aug', hiringRate: 520 },
  { name: 'Sep', hiringRate: 550 },
];

export const attendeesData3 = [ // Aptiv
  { name: 'Jan', hiringRate: 500 },
  { name: 'Feb', hiringRate: 520 },
  { name: 'Mar', hiringRate: 540 },
  { name: 'Apr', hiringRate: 560 },
  { name: 'May', hiringRate: 530 },
  { name: 'Jun', hiringRate: 590 },
  { name: 'Jul', hiringRate: 620 },
  { name: 'Aug', hiringRate: 600 },
  { name: 'Sep', hiringRate: 640 },
];

export const attendeesData4 = [ // Bosch
  { name: 'Jan', hiringRate: 610 },
  { name: 'Feb', hiringRate: 640 },
  { name: 'Mar', hiringRate: 660 },
  { name: 'Apr', hiringRate: 680 },
  { name: 'May', hiringRate: 650 },
  { name: 'Jun', hiringRate: 710 },
  { name: 'Jul', hiringRate: 750 },
  { name: 'Aug', hiringRate: 740 },
  { name: 'Sep', hiringRate: 780 },
];

export const attendeesData5 = [ // Sona Comstar
  { name: 'Jan', hiringRate: 370 },
  { name: 'Feb', hiringRate: 390 },
  { name: 'Mar', hiringRate: 420 },
  { name: 'Apr', hiringRate: 440 },
  { name: 'May', hiringRate: 410 },
  { name: 'Jun', hiringRate: 470 },
  { name: 'Jul', hiringRate: 490 },
  { name: 'Aug', hiringRate: 480 },
  { name: 'Sep', hiringRate: 500 },
];

export const attendeesData6 = [ // Uno Minda
  { name: 'Jan', hiringRate: 550 },
  { name: 'Feb', hiringRate: 570 },
  { name: 'Mar', hiringRate: 600 },
  { name: 'Apr', hiringRate: 620 },
  { name: 'May', hiringRate: 590 },
  { name: 'Jun', hiringRate: 650 },
  { name: 'Jul', hiringRate: 690 },
  { name: 'Aug', hiringRate: 670 },
  { name: 'Sep', hiringRate: 710 },
];

export const attendeesData7 = [ // Furukawa Minda
  { name: 'Jan', hiringRate: 330 },
  { name: 'Feb', hiringRate: 350 },
  { name: 'Mar', hiringRate: 380 },
  { name: 'Apr', hiringRate: 400 },
  { name: 'May', hiringRate: 370 },
  { name: 'Jun', hiringRate: 420 },
  { name: 'Jul', hiringRate: 450 },
  { name: 'Aug', hiringRate: 440 },
  { name: 'Sep', hiringRate: 470 },
];

export const attendeesData8 = [ // Varroc
  { name: 'Jan', hiringRate: 480 },
  { name: 'Feb', hiringRate: 510 },
  { name: 'Mar', hiringRate: 540 },
  { name: 'Apr', hiringRate: 560 },
  { name: 'May', hiringRate: 530 },
  { name: 'Jun', hiringRate: 590 },
  { name: 'Jul', hiringRate: 610 },
  { name: 'Aug', hiringRate: 600 },
  { name: 'Sep', hiringRate: 640 },
];

export const attendeesData9 = [ // Lumax
  { name: 'Jan', hiringRate: 390 },
  { name: 'Feb', hiringRate: 410 },
  { name: 'Mar', hiringRate: 430 },
  { name: 'Apr', hiringRate: 450 },
  { name: 'May', hiringRate: 420 },
  { name: 'Jun', hiringRate: 480 },
  { name: 'Jul', hiringRate: 500 },
  { name: 'Aug', hiringRate: 490 },
  { name: 'Sep', hiringRate: 520 },
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

const AttendeesTrainingSessions = ({ data = defaultAttendeesData, companyName }: HiringProps) => {
  const maxValue = Math.max(...data.map(item => item.hiringRate));
  const yAxisMax = Math.ceil(maxValue * 1.2); 

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

export default AttendeesTrainingSessions;