import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, TooltipProps } from 'recharts';
import Icon from '../../components/ui/AppIcon';
import Button from '../../components/ui/Button';
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';

interface EmissionsData {
  year: string;
  emissions: number;
  benchmark: number;
  target: number;
}

interface TimeframeOption {
  value: string;
  label: string;
}

const EmissionsTrajectory = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('yearly');
  const [showBenchmark, setShowBenchmark] = useState<boolean>(false);

  const emissionsData: EmissionsData[] = [
    { year: '2024', emissions: 2850, benchmark: 3200, target: 2800 },
    { year: '2025', emissions: 2650, benchmark: 3000, target: 2500 },
    { year: '2026', emissions: 2400, benchmark: 2800, target: 2200 },
    { year: '2027', emissions: 2150, benchmark: 2600, target: 1900 },
    { year: '2028', emissions: 1900, benchmark: 2400, target: 1600 },
    { year: '2029', emissions: 1650, benchmark: 2200, target: 1300 }
  ];

  const timeframeOptions: TimeframeOption[] = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-popover-foreground mb-2">{`Year ${label}`}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry?.color as string }}
              />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-popover-foreground">
                {entry?.value?.toLocaleString()} tCO₂e
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleExport = () => {
    console.log('Exporting chart data...');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Emissions Trajectory</h2>
          <p className="text-sm text-muted-foreground">Portfolio-wide carbon footprint over time</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {timeframeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedTimeframe(option.value)}
                className={`px-3 py-1 text-sm rounded-md transition-colors duration-150 ${
                  selectedTimeframe === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBenchmark(!showBenchmark)}
              className={showBenchmark ? 'bg-muted' : ''}
            >
              <Icon name="BarChart3" size={14} />
              <span className="ml-1">Benchmark</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              iconName="Download"
              iconSize={14}
            >
              Export
            </Button>
          </div>
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={emissionsData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="emissionsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.5} />
            <XAxis
              dataKey="year"
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="emissions"
              stroke="#6366F1"
              strokeWidth={3}
              fill="url(#emissionsGradient)"
              name="Actual Emissions"
            />

            {showBenchmark && (
              <Area
                type="monotone"
                dataKey="benchmark"
                stroke="#F59E0B"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#benchmarkGradient)"
                name="Industry Benchmark"
              />
            )}

            <ReferenceLine
              y={2000}
              stroke="#10B981"
              strokeDasharray="8 8"
              strokeWidth={2}
              label={{ value: "2030 Target", position: "topRight" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
            <span className="text-sm text-muted-foreground">Actual Emissions</span>
          </div>
          {showBenchmark && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-sm text-muted-foreground">Industry Benchmark</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-success" />
            <span className="text-sm text-muted-foreground">2030 Target</span>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
};

export default EmissionsTrajectory;