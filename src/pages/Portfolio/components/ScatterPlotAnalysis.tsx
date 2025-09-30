import React, { useState, useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
  TooltipProps,
} from 'recharts';

import Button from '../../../components/ui/Button';
import ButtonWithIcon from '../../../components/ui/ButtonWithIcon';

type MetricKey = 'returns' | 'esgScore' | 'marketCap';

interface ScatterDataItem {
  company: string;
  emissions: number;
  returns: number;
  esgScore: number;
  marketCap: number;
  sector: string;
  weight: number;
  color: string;
  [key: string]: any;
}

interface MetricOption {
  value: MetricKey;
  label: string;
  yLabel: string;
}
interface CustomTooltipProps extends TooltipProps<number, string> {
  payload?: Array<{ payload: ScatterDataItem; [key: string]: any }>;
}

const ScatterPlotAnalysis: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>('returns');
  const [hoveredPoint, setHoveredPoint] = useState<ScatterDataItem | null>(null);

  const scatterData: ScatterDataItem[] = [
    {
      company: 'Apple Inc.',
      emissions: 12.3,
      returns: 18.5,
      esgScore: 85,
      marketCap: 2800,
      sector: 'Technology',
      weight: 4.2,
      color: '#3B82F6',
    },
    {
      company: 'Microsoft Corp.',
      emissions: 8.7,
      returns: 22.1,
      esgScore: 88,
      marketCap: 2400,
      sector: 'Technology',
      weight: 3.8,
      color: '#3B82F6',
    },
    {
      company: 'ExxonMobil Corp.',
      emissions: 89.4,
      returns: -5.2,
      esgScore: 42,
      marketCap: 450,
      sector: 'Energy',
      weight: 2.1,
      color: '#EF4444',
    },
    {
      company: 'Tesla Inc.',
      emissions: 15.6,
      returns: 35.7,
      esgScore: 78,
      marketCap: 800,
      sector: 'Technology',
      weight: 2.9,
      color: '#3B82F6',
    },
    {
      company: 'Johnson & Johnson',
      emissions: 22.1,
      returns: 8.3,
      esgScore: 72,
      marketCap: 420,
      sector: 'Healthcare',
      weight: 2.5,
      color: '#10B981',
    },
    {
      company: 'JPMorgan Chase',
      emissions: 18.9,
      returns: 12.7,
      esgScore: 65,
      marketCap: 480,
      sector: 'Financials',
      weight: 3.1,
      color: '#8B5CF6',
    },
    {
      company: 'Chevron Corp.',
      emissions: 76.2,
      returns: 2.1,
      esgScore: 38,
      marketCap: 320,
      sector: 'Energy',
      weight: 1.8,
      color: '#EF4444',
    },
    {
      company: 'Pfizer Inc.',
      emissions: 19.4,
      returns: 15.2,
      esgScore: 69,
      marketCap: 280,
      sector: 'Healthcare',
      weight: 2.2,
      color: '#10B981',
    },
    {
      company: 'Caterpillar Inc.',
      emissions: 45.7,
      returns: 6.8,
      esgScore: 58,
      marketCap: 150,
      sector: 'Industrials',
      weight: 1.5,
      color: '#F59E0B',
    },
    {
      company: 'Alphabet Inc.',
      emissions: 11.2,
      returns: 19.8,
      esgScore: 82,
      marketCap: 1600,
      sector: 'Technology',
      weight: 3.5,
      color: '#3B82F6',
    },
  ];

  const metricOptions: MetricOption[] = [
    { value: 'returns', label: 'Financial Returns (%)', yLabel: 'Annual Returns (%)' },
    { value: 'esgScore', label: 'ESG Score', yLabel: 'ESG Score (0-100)' },
    { value: 'marketCap', label: 'Market Cap ($B)', yLabel: 'Market Cap ($B)' },
  ];

  const currentMetric: MetricOption | undefined = metricOptions.find(
    (m) => m.value === selectedMetric
  );

  const averageEmissions: number = useMemo(() => {
    return (
      scatterData.reduce((sum: number, item: ScatterDataItem) => sum + item.emissions, 0) /
      scatterData.length
    );
  }, [scatterData]);

  const averageMetric: number = useMemo(() => {
    return (
      scatterData.reduce((sum: number, item: ScatterDataItem) => sum + item[selectedMetric], 0) /
      scatterData.length
    );
  }, [scatterData, selectedMetric]);

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data: ScatterDataItem = payload[0].payload as ScatterDataItem; // Type assertion

      const formatMetricValue = (value: number): string => {
        if (selectedMetric === 'returns') {
          return `${value.toFixed(1)}%`;
        }
        if (selectedMetric === 'marketCap') {
          return `$${(value / 1000).toFixed(1)}T`;
        }
        return value.toFixed(0);
      };

      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <div className="font-medium text-popover-foreground mb-2">{data.company}</div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Emissions:</span>
              <span className="font-medium">{data.emissions.toFixed(1)} tCO2e/$M</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">{currentMetric?.yLabel}:</span>
              <span className="font-medium">{formatMetricValue(data[selectedMetric])}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Portfolio Weight:</span>
              <span className="font-medium">{data.weight.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Sector:</span>
              <span className="font-medium">{data.sector}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-primary-foreground border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Performance vs Emissions Analysis
          </h3>
          <p className="text-sm text-text-muted">
            Correlation between emissions intensity and {currentMetric?.label?.toLowerCase()}
          </p>
        </div>

        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          {metricOptions.map((option: MetricOption) => (
            <ButtonWithIcon
              key={option.value}
              variant={selectedMetric === option.value ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => setSelectedMetric(option.value)}
            >
              {option.label.split(' ')?.[0]}
            </ButtonWithIcon>
          ))}
        </div>
      </div>
      <div className="h-96 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              type="number"
              dataKey="emissions"
              name="Emissions"
              unit=" tCO2e/$M"
              axisLine={false}
              tickLine={false}
              className="text-xs fill-muted-foreground"
              label={{
                value: 'Emissions Intensity (tCO2e/$M)',
                position: 'insideBottom',
                offset: -10,
                fontSize: '12px',
              }}
              fontSize={10}
            />
            <YAxis
              type="number"
              dataKey={selectedMetric}
              name={currentMetric?.yLabel}
              axisLine={false}
              tickLine={false}
              className="text-xs fill-muted-foreground"
              label={{
                value: currentMetric?.yLabel,
                angle: -90,
                position: 'insideLeft',
                fontSize: '12px',
              }}
            />
            <Tooltip content={<CustomTooltip active={false} payload={[]} label={''} />} />

            <ReferenceLine
              x={averageEmissions}
              stroke="#64748B"
              strokeDasharray="5 5"
              opacity={0.5}
            />
            <ReferenceLine y={averageMetric} stroke="#64748B" strokeDasharray="5 5" opacity={0.5} />

            <Scatter
              data={scatterData}
              fill="#6366F1"
              onMouseEnter={(data: ScatterDataItem) => setHoveredPoint(data)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              {scatterData.map((entry: ScatterDataItem, index: number) => (
                <circle
                  key={`cell-${index}`}
                  r={Math.sqrt(entry.weight) * 3}
                  fill={entry.color}
                  fillOpacity={0.7}
                  stroke={entry.color}
                  strokeWidth={2}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-xl font-semibold text-foreground">{averageEmissions.toFixed(1)}</div>
          <div className="text-md text-text-muted">Avg Emissions</div>
        </div>

        <div className="text-center">
          <div className="text-xl font-semibold text-foreground">
            {selectedMetric === 'returns'
              ? `${averageMetric.toFixed(1)}%`
              : selectedMetric === 'marketCap'
                ? `$${(averageMetric / 1000).toFixed(1)}T`
                : averageMetric.toFixed(0)}
          </div>
          <div className="text-md text-text-muted">Avg {currentMetric?.label.split(' ')?.[0]}</div>
        </div>

        <div className="text-center">
          <div className="text-xl font-semibold text-foreground">-0.65</div>
          <div className="text-sm text-text-muted">Correlation</div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="text-md text-text-muted">
          Bubble size represents portfolio weight • Reference lines show portfolio averages
        </div>

        {/* <ButtonWithIcon variant="ghost" size="sm" iconName="Maximize2" iconSize={16}>
          Full Screen
        </ButtonWithIcon> */}
      </div>
    </div>
  );
};

export default ScatterPlotAnalysis;
