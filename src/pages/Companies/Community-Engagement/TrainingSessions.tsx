import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';

interface EmployeeMetricsProps {
  data?: Array<{
    category: string;
    employees: number;
    color: string;
  }>;
}

export const defaultTrainingData = [
  { category: 'Time Management', employees: 28, color: '#5DD0A7' },
  { category: 'Health & Safety', employees: 42, color: '#3B82F6' },
  { category: 'Sexual Harassment', employees: 15, color: '#F97316' },
  { category: 'Project Management', employees: 25, color: '#8B5CF6' },
  { category: 'Cybersecurity', employees: 30, color: '#8B5CF6' },
];

export const trainingData1 = [ // Yazaki
  { category: 'Time Management', employees: 24, color: '#5DD0A7' },
  { category: 'Health & Safety', employees: 38, color: '#3B82F6' },
  { category: 'Sexual Harassment', employees: 14, color: '#F97316' },
  { category: 'Project Management', employees: 20, color: '#8B5CF6' },
  { category: 'Cybersecurity', employees: 26, color: '#8B5CF6' },
];

export const trainingData2 = [ // LEONI India
  { category: 'Time Management', employees: 20, color: '#5DD0A7' },
  { category: 'Health & Safety', employees: 35, color: '#3B82F6' },
  { category: 'Sexual Harassment', employees: 12, color: '#F97316' },
  { category: 'Project Management', employees: 18, color: '#8B5CF6' },
  { category: 'Cybersecurity', employees: 22, color: '#8B5CF6' },
];

export const trainingData3 = [ // Aptiv
  { category: 'Time Management', employees: 25, color: '#5DD0A7' },
  { category: 'Health & Safety', employees: 40, color: '#3B82F6' },
  { category: 'Sexual Harassment', employees: 16, color: '#F97316' },
  { category: 'Project Management', employees: 23, color: '#8B5CF6' },
  { category: 'Cybersecurity', employees: 28, color: '#8B5CF6' },
];

export const trainingData4 = [ // Bosch
  { category: 'Time Management', employees: 32, color: '#5DD0A7' },
  { category: 'Health & Safety', employees: 48, color: '#3B82F6' },
  { category: 'Sexual Harassment', employees: 20, color: '#F97316' },
  { category: 'Project Management', employees: 28, color: '#8B5CF6' },
  { category: 'Cybersecurity', employees: 35, color: '#8B5CF6' },
];

export const trainingData5 = [ // Sona Comstar
  { category: 'Time Management', employees: 18, color: '#5DD0A7' },
  { category: 'Health & Safety', employees: 30, color: '#3B82F6' },
  { category: 'Sexual Harassment', employees: 11, color: '#F97316' },
  { category: 'Project Management', employees: 15, color: '#8B5CF6' },
  { category: 'Cybersecurity', employees: 20, color: '#8B5CF6' },
];

export const trainingData6 = [ // Uno Minda
  { category: 'Time Management', employees: 27, color: '#5DD0A7' },
  { category: 'Health & Safety', employees: 43, color: '#3B82F6' },
  { category: 'Sexual Harassment', employees: 17, color: '#F97316' },
  { category: 'Project Management', employees: 24, color: '#8B5CF6' },
  { category: 'Cybersecurity', employees: 31, color: '#8B5CF6' },
];

export const trainingData7 = [ // Furukawa Minda
  { category: 'Time Management', employees: 16, color: '#5DD0A7' },
  { category: 'Health & Safety', employees: 26, color: '#3B82F6' },
  { category: 'Sexual Harassment', employees: 9, color: '#F97316' },
  { category: 'Project Management', employees: 13, color: '#8B5CF6' },
  { category: 'Cybersecurity', employees: 18, color: '#8B5CF6' },
];

export const trainingData8 = [ // Varroc
  { category: 'Time Management', employees: 24, color: '#5DD0A7' },
  { category: 'Health & Safety', employees: 39, color: '#3B82F6' },
  { category: 'Sexual Harassment', employees: 14, color: '#F97316' },
  { category: 'Project Management', employees: 21, color: '#8B5CF6' },
  { category: 'Cybersecurity', employees: 27, color: '#8B5CF6' },
];

export const trainingData9 = [ // Lumax
  { category: 'Time Management', employees: 19, color: '#5DD0A7' },
  { category: 'Health & Safety', employees: 32, color: '#3B82F6' },
  { category: 'Sexual Harassment', employees: 12, color: '#F97316' },
  { category: 'Project Management', employees: 16, color: '#8B5CF6' },
  { category: 'Cybersecurity', employees: 22, color: '#8B5CF6' },
];

const formatNumberWithCommas = (value: number): string => {
  return value.toLocaleString('en-IN');
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2">
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">
          Employees: <span className="text-foreground font-medium">{formatNumberWithCommas(payload[0].value)}</span>
        </p>
      </div>
    );
  }
  return null;
};

const TrainingSessions = ({ data = defaultTrainingData }: EmployeeMetricsProps) => {
  const totalEmployees = data?.reduce((sum, item) => sum + item?.employees, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-3 mb-3 p-3">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Employee Distribution</h3>
          <p className="text-sm text-muted-foreground">
            Total: {formatNumberWithCommas(totalEmployees || 0)} Employees
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
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickFormatter={formatNumberWithCommas}
            />
            <YAxis
              type="category"
              dataKey="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#374151', fontWeight: 500 }}
              width={120}
            />

            <Tooltip
              cursor={{ fill: 'rgba(0,0,0,0.05)' }}
              content={<CustomTooltip />}
            />

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

            <Bar 
              dataKey="employees" 
              radius={[0, 6, 6, 0]}
              name="Employees"
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

export default TrainingSessions;