import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';

interface EmployeeMetricsProps {
  data?: Array<{
    category: string;
    employees: number;
    color: string;
  }>;
}

// Default data for Motherson Sumi Wiring India Ltd.
export const defaultEmployeeData = [
  { category: 'Male Employees', employees: 18200, color: '#5DD0A7' },
  { category: 'Female Employees', employees: 6600, color: '#3B82F6' },
  { category: 'Male Workers', employees: 11400, color: '#F97316' },
  { category: 'Female Workers', employees: 3100, color: '#8B5CF6' },
];

// Data for other companies - use export const for each
export const employeeData1 = [ // Yazaki
  { category: 'Male Employees', employees: 14500, color: '#5DD0A7' },
  { category: 'Female Employees', employees: 5100, color: '#3B82F6' },
  { category: 'Male Workers', employees: 9400, color: '#F97316' },
  { category: 'Female Workers', employees: 2600, color: '#8B5CF6' },
];

export const employeeData2 = [ // LEONI India
  { category: 'Male Employees', employees: 11700, color: '#5DD0A7' },
  { category: 'Female Employees', employees: 4100, color: '#3B82F6' },
  { category: 'Male Workers', employees: 7500, color: '#F97316' },
  { category: 'Female Workers', employees: 2000, color: '#8B5CF6' },
];

export const employeeData3 = [ // Aptiv
  { category: 'Male Employees', employees: 12900, color: '#5DD0A7' },
  { category: 'Female Employees', employees: 4300, color: '#3B82F6' },
  { category: 'Male Workers', employees: 8100, color: '#F97316' },
  { category: 'Female Workers', employees: 2100, color: '#8B5CF6' },
];

export const employeeData4 = [ // Bosch
  { category: 'Male Employees', employees: 2100, color: '#5DD0A7' },
  { category: 'Female Employees', employees: 7400, color: '#3B82F6' },
  { category: 'Male Workers', employees: 13500, color: '#F97316' },
  { category: 'Female Workers', employees: 3300, color: '#8B5CF6' },
];

export const employeeData5 = [ // Sona Comstar
  { category: 'Male Employees', employees: 10100, color: '#5DD0A7' },
  { category: 'Female Employees', employees: 3800, color: '#3B82F6' },
  { category: 'Male Workers', employees: 6700, color: '#F97316' },
  { category: 'Female Workers', employees: 1800, color: '#8B5CF6' },
];

export const employeeData6 = [ // Uno Minda
  { category: 'Male Employees', employees: 19900, color: '#5DD0A7' },
  { category: 'Female Employees', employees: 8900, color: '#3B82F6' },
  { category: 'Male Workers', employees: 12700, color: '#F97316' },
  { category: 'Female Workers', employees: 3000, color: '#8B5CF6' },
];

export const employeeData7 = [ // Furukawa Minda
  { category: 'Male Employees', employees: 8900, color: '#5DD0A7' },
  { category: 'Female Employees', employees: 3500, color: '#3B82F6' },
  { category: 'Male Workers', employees: 5900, color: '#F97316' },
  { category: 'Female Workers', employees: 1500, color: '#8B5CF6' },
];

export const employeeData8 = [ // Varroc
  { category: 'Male Employees', employees: 16800, color: '#5DD0A7' },
  { category: 'Female Employees', employees: 5800, color: '#3B82F6' },
  { category: 'Male Workers', employees: 10400, color: '#F97316' },
  { category: 'Female Workers', employees: 2700, color: '#8B5CF6' },
];

export const employeeData9 = [ // Lumax
  { category: 'Male Employees', employees: 10200, color: '#5DD0A7' },
  { category: 'Female Employees', employees: 4100, color: '#3B82F6' },
  { category: 'Male Workers', employees: 6300, color: '#F97316' },
  { category: 'Female Workers', employees: 1900, color: '#8B5CF6' },
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

const EmployeeMetrics = ({ data = defaultEmployeeData }: EmployeeMetricsProps) => {
  const totalEmployees = data?.reduce((sum, item) => sum + item?.employees, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-3 mb-3 p-3">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Employee Metrics</h3>
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

export default EmployeeMetrics;