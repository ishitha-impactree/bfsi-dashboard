import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, LineChart, Line } from 'recharts';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const chartClasses = cva(
  'w-full',
  {
    variants: {
      variant: {
        scatter: 'bg-chart-background',
        line: 'bg-chart-background',
        bar: 'bg-chart-background',
      },
    },
    defaultVariants: {
      variant: 'scatter',
    },
  }
);

interface DataPoint {
  name: string;
  value: number;
  x?: number;
  y?: number;
  exposure?: number;
  pchi?: number;
  year?: number;
  emissions?: number;
}

interface ChartProps extends VariantProps<typeof chartClasses> {
  // Optional parameters
  layout_width?: string;
  margin?: string;
  componentType?: string;
  
  // Standard React props
  data?: DataPoint[];
  width?: string | number;
  height?: string | number;
  chartType?: 'scatter' | 'line' | 'bar';
  title?: string;
  className?: string;
}

const Chart = ({
  layout_width,
  margin,
  componentType = "Chart",
  data,
  width = "100%",
  height = 300,
  chartType = 'scatter',
  title = "Chart visualization",
  className,
}: ChartProps) => {
  // Safe validation for optional parameters
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width.trim() !== '';
  const hasValidMargin = margin && typeof margin === 'string' && margin.trim() !== '';

  // Parse margin values
  const marginClasses = hasValidMargin ? margin.split(',').map(m => {
    const [side, value] = m.trim().split('=');
    switch(side) {
      case 't': return `mt-[${value}]`;
      case 'r': return `mr-[${value}]`;
      case 'b': return `mb-[${value}]`;
      case 'l': return `ml-[${value}]`;
      default: return '';
    }
  }).filter(Boolean).join(' ') : '';

  // Build optional Tailwind classes
  const optionalClasses = [
    hasValidWidth ? (layout_width === 'flex-1' ? 'w-full' : `w-[${layout_width}]`) : '',
    marginClasses,
  ].filter(Boolean).join(' ');

  // Default data for different chart types
  const defaultScatterData: DataPoint[] = [
    { name: 'A', x: 200, y: 20, exposure: 200, pchi: 20 },
    { name: 'B', x: 400, y: 35, exposure: 400, pchi: 35 },
    { name: 'C', x: 600, y: 45, exposure: 600, pchi: 45 },
    { name: 'D', x: 800, y: 35, exposure: 800, pchi: 35 },
    { name: 'E', x: 1000, y: 60, exposure: 1000, pchi: 60 },
    { name: 'F', x: 1200, y: 65, exposure: 1200, pchi: 65 },
    { name: 'G', x: 1400, y: 55, exposure: 1400, pchi: 55 },
    { name: 'H', x: 1600, y: 50, exposure: 1600, pchi: 50 },
    { name: 'I', x: 1800, y: 55, exposure: 1800, pchi: 55 },
    { name: 'J', x: 2000, y: 65, exposure: 2000, pchi: 65 },
    { name: 'K', x: 2200, y: 75, exposure: 2200, pchi: 75 },
    { name: 'L', x: 2400, y: 80, exposure: 2400, pchi: 80 },
  ];

  const defaultLineData: DataPoint[] = [
    { name: '2024', year: 2024, emissions: 80 },
    { name: '2025', year: 2025, emissions: 75 },
    { name: '2026', year: 2026, emissions: 70 },
    { name: '2027', year: 2027, emissions: 65 },
    { name: '2028', year: 2028, emissions: 55 },
    { name: '2029', year: 2029, emissions: 50 },
  ];

  const chartData = data || (chartType === 'line' ? defaultLineData : defaultScatterData);

  const renderChart = () => {
    switch (chartType) {
      case 'scatter':
        return (
          <ResponsiveContainer width={width} height={height}>
            <ScatterChart data={chartData} role="img" aria-label={title}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                type="number" 
                dataKey="exposure" 
                name="Exposure (in Million ₹)"
                domain={[0, 2500]}
                tickFormatter={(value) => `${value/1000}M`}
              />
              <YAxis 
                type="number" 
                dataKey="pchi" 
                name="Portfolio Climate Hazard Index (PCHI)"
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'exposure' ? `₹${value}M` : `${value}%`,
                  name === 'exposure' ? 'Exposure' : 'PCHI'
                ]}
              />
              <Scatter dataKey="pchi" fill="#7856ff" />
            </ScatterChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width={width} height={height}>
            <LineChart data={chartData} role="img" aria-label={title}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" />
              <YAxis 
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip formatter={(value) => [`${value}%`, 'Emissions']} />
              <Line 
                type="monotone" 
                dataKey="emissions" 
                stroke="#7856ff" 
                strokeWidth={3}
                dot={{ fill: '#7856ff', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      default:
        return (
          <ResponsiveContainer width={width} height={height}>
            <ScatterChart data={chartData} role="img" aria-label={title}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                type="number" 
                dataKey="exposure" 
                name="Exposure (in Million ₹)"
                domain={[0, 2500]}
                tickFormatter={(value) => `${value/1000}M`}
              />
              <YAxis 
                type="number" 
                dataKey="pchi" 
                name="Portfolio Climate Hazard Index (PCHI)"
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'exposure' ? `₹${value}M` : `${value}%`,
                  name === 'exposure' ? 'Exposure' : 'PCHI'
                ]}
              />
              <Scatter dataKey="pchi" fill="#7856ff" />
            </ScatterChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className={twMerge(
      chartClasses({ variant: chartType }),
      optionalClasses,
      className
    )}>
      {renderChart()}
    </div>
  );
};

export default Chart;