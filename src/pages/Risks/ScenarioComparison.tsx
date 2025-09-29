import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import Icon from '../../components/ui/AppIcon';
import ButtonWithIcon from '../../components/ui/ButtonWithIcon';

interface ScenarioData {
  year: number;
  [key: string]: number;
}

interface Metric {
  value: string;
  label: string;
  unit: string;
}

interface Scenario {
  key: string;
  label: string;
  color: string;
  description: string;
}

const ScenarioComparison: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<string>('portfolioValue');
  const [showConfidenceInterval, setShowConfidenceInterval] = useState<boolean>(true);

  const scenarioData: ScenarioData[] = [
    {
      year: 2024,
      '1.5C_value': 100,
      '1.5C_upper': 105,
      '1.5C_lower': 95,
      '2C_value': 100,
      '2C_upper': 104,
      '2C_lower': 96,
      '3C_value': 100,
      '3C_upper': 103,
      '3C_lower': 97,
    },
    {
      year: 2026,
      '1.5C_value': 95,
      '1.5C_upper': 102,
      '1.5C_lower': 88,
      '2C_value': 98,
      '2C_upper': 104,
      '2C_lower': 92,
      '3C_value': 101,
      '3C_upper': 106,
      '3C_lower': 96,
    },
    {
      year: 2028,
      '1.5C_value': 88,
      '1.5C_upper': 98,
      '1.5C_lower': 78,
      '2C_value': 94,
      '2C_upper': 102,
      '2C_lower': 86,
      '3C_value': 99,
      '3C_upper': 108,
      '3C_lower': 90,
    },
    {
      year: 2030,
      '1.5C_value': 82,
      '1.5C_upper': 95,
      '1.5C_lower': 69,
      '2C_value': 89,
      '2C_upper': 99,
      '2C_lower': 79,
      '3C_value': 96,
      '3C_upper': 109,
      '3C_lower': 83,
    },
    {
      year: 2035,
      '1.5C_value': 75,
      '1.5C_upper': 92,
      '1.5C_lower': 58,
      '2C_value': 82,
      '2C_upper': 96,
      '2C_lower': 68,
      '3C_value': 91,
      '3C_upper': 112,
      '3C_lower': 70,
    },
    {
      year: 2040,
      '1.5C_value': 68,
      '1.5C_upper': 89,
      '1.5C_lower': 47,
      '2C_value': 74,
      '2C_upper': 92,
      '2C_lower': 56,
      '3C_value': 85,
      '3C_upper': 115,
      '3C_lower': 55,
    },
    {
      year: 2050,
      '1.5C_value': 58,
      '1.5C_upper': 85,
      '1.5C_lower': 31,
      '2C_value': 63,
      '2C_upper': 87,
      '2C_lower': 39,
      '3C_value': 76,
      '3C_upper': 118,
      '3C_lower': 34,
    },
  ];

  const metrics: Metric[] = [
    { value: 'portfolioValue', label: 'Portfolio Value', unit: '% of current' },
    { value: 'carbonIntensity', label: 'Carbon Intensity', unit: 'tCO2e/M$' },
    { value: 'transitionCost', label: 'Transition Costs', unit: '% of portfolio' },
  ];

  const scenarios: Scenario[] = [
    {
      key: '1.5C',
      label: '1.5°C Pathway',
      color: '#10B981',
      description: 'Aggressive climate action',
    },
    { key: '2C', label: '2°C Pathway', color: '#F59E0B', description: 'Moderate climate action' },
    { key: '3C', label: '3°C Pathway', color: '#EF4444', description: 'Limited climate action' },
  ];

  const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-popover-foreground mb-2">{`Year: ${label}`}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color as string }}
              />
              <span className="text-sm text-popover-foreground">
                {entry.name}: {(entry.value as number)?.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
      style={{ background: 'white' }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Climate Scenario Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Portfolio performance under different warming pathways
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-muted-foreground">Metric:</label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="text-sm border border-border rounded px-2 py-1 bg-input text-foreground"
            >
              {metrics.map((metric) => (
                <option key={metric.value} value={metric.value}>
                  {metric.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="confidence"
              checked={showConfidenceInterval}
              onChange={(e) => setShowConfidenceInterval(e.target.checked)}
              className="rounded border-border"
            />
            <label htmlFor="confidence" className="text-sm text-muted-foreground">
              Show confidence intervals
            </label>
          </div>

          <ButtonWithIcon variant="outline" size="sm" iconName="Download">
            Export
          </ButtonWithIcon>
        </div>
      </div>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={scenarioData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="year" stroke="#64748B" fontSize={12} />
            <YAxis
              stroke="#64748B"
              fontSize={12}
              label={{
                value: metrics.find((m) => m.value === selectedMetric)?.unit || '%',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />

            {scenarios.map((scenario) => (
              <Line
                key={scenario.key}
                type="monotone"
                dataKey={`${scenario.key}_value`}
                stroke={scenario.color}
                strokeWidth={2}
                name={scenario.label}
                dot={{ fill: scenario.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: scenario.color, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Scenario Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {scenarios.map((scenario) => {
          const latestData = scenarioData[scenarioData.length - 1];
          const currentValue = latestData?.[`${scenario.key}_value`];
          const upperBound = latestData?.[`${scenario.key}_upper`];
          const lowerBound = latestData?.[`${scenario.key}_lower`];

          return (
            <div key={scenario.key} className="bg-muted/30 rounded-lg p-4 border border-border">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: scenario.color }} />
                <h4 className="font-medium text-foreground">{scenario.label}</h4>
              </div>
              <div className="space-y-1">
                <p className="text-md text-muted-foreground">{scenario.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">2050 Impact:</span>
                  <span className="text-sm font-semibold text-foreground">
                    {(currentValue as number)?.toFixed(1)}%
                  </span>
                </div>
                {showConfidenceInterval && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Range:</span>
                    <span className="text-sm text-muted-foreground">
                      {(lowerBound as number)?.toFixed(1)}% - {(upperBound as number)?.toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Insights */}
      <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-accent-info mt-0.5" />
          <div>
            <h4 className="text-lg font-medium text-foreground mb-2">Key Insights</h4>
            <ul className="text-md text-muted-foreground space-y-1">
              <li>
                • 1.5°C scenario shows highest portfolio impact due to rapid transition requirements
              </li>
              <li>• 3°C pathway maintains portfolio value but increases physical climate risks</li>
              <li>
                • Confidence intervals widen significantly beyond 2030 due to policy uncertainty
              </li>
              <li>• Energy and utilities sectors drive majority of scenario differentiation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioComparison;
