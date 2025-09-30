import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Cell,
} from 'recharts';
import Icon from '../../components/ui/AppIcon';
import ButtonWithIcon from '../../components/ui/ButtonWithIcon';
import Input from '../../components/ui/Input';
import RiskMitigationCard from './RiskMitigationCard';

// ------------------- Types -------------------
interface Parameters {
  carbonPrice: number;
  policyShock: number;
  demandShift: number;
  techDisruption: number;
}

interface Results {
  portfolioImpact: number;
  confidence: number;
  timeToRecover: number;
  worstCaseScenario: number;
}

interface MonteCarloPoint {
  scenario: number;
  impact: number;
  probability: number;
}

interface DistributionPoint {
  range: string;
  frequency: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
}

// ------------------- Component -------------------
const StressTesting: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [parameters, setParameters] = useState<Parameters>({
    carbonPrice: 150,
    policyShock: 25,
    demandShift: 30,
    techDisruption: 40,
  });

  const [results, setResults] = useState<Results>({
    portfolioImpact: -12.5,
    confidence: 85,
    timeToRecover: 18,
    worstCaseScenario: -28.3,
  });

  const monteCarloData: MonteCarloPoint[] = [
    { scenario: 1, impact: -8.2, probability: 0.15 },
    { scenario: 2, impact: -12.5, probability: 0.25 },
    { scenario: 3, impact: -15.8, probability: 0.2 },
    { scenario: 4, impact: -18.9, probability: 0.15 },
    { scenario: 5, impact: -22.1, probability: 0.12 },
    { scenario: 6, impact: -25.4, probability: 0.08 },
    { scenario: 7, impact: -28.3, probability: 0.05 },
  ];

  const distributionData: DistributionPoint[] = [
    { range: '-5 to 0%', frequency: 12, color: '#10B981' },
    { range: '-10 to -5%', frequency: 28, color: '#F59E0B' },
    { range: '-15 to -10%', frequency: 35, color: '#F59E0B' },
    { range: '-20 to -15%', frequency: 18, color: '#EF4444' },
    { range: '-25 to -20%', frequency: 5, color: '#EF4444' },
    { range: '-30 to -25%', frequency: 2, color: '#7C2D12' },
  ];

  const handleParameterChange = (param: keyof Parameters, value: string) => {
    setParameters((prev) => ({
      ...prev,
      [param]: parseFloat(value) || 0,
    }));
  };

  const runStressTest = async () => {
    setIsRunning(true);

    setTimeout(() => {
      const baseImpact = -10;
      const carbonPriceImpact = (parameters.carbonPrice - 100) * -0.05;
      const policyImpact = parameters.policyShock * -0.2;
      const demandImpact = parameters.demandShift * -0.15;
      const techImpact = parameters.techDisruption * -0.1;

      const totalImpact = baseImpact + carbonPriceImpact + policyImpact + demandImpact + techImpact;

      setResults({
        portfolioImpact: totalImpact,
        confidence: Math.max(60, 95 - Math.abs(totalImpact)),
        timeToRecover: Math.max(6, Math.abs(totalImpact) * 1.2),
        worstCaseScenario: totalImpact * 1.8,
      });

      setIsRunning(false);
    }, 3000);
  };

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0]?.payload as MonteCarloPoint;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-popover-foreground">Impact: {data?.impact}%</p>
          <p className="text-sm text-muted-foreground">
            Probability: {(data?.probability * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const stressTestCard = [
    {
      title: 'Portfolio Impact',
      description: 'Expected loss under stress',
      value: -12.5,
      unit: '%',
      icon: 'TrendingDown',
      status: 'text-accent-danger',
    },
    {
      title: 'Confidence Level',
      description: 'Statistical confidence',
      value: 69,
      unit: '%',
      icon: 'Target',
      status: 'text-accent-info',
    },
    {
      title: 'Recovery Time',
      description: 'Expected recovery period',
      value: 31,
      unit: 'mo',
      icon: 'Clock',
      status: 'text-accent-warning',
    },
    {
      title: 'Worst Case',
      description: '5th percentile outcome',
      value: -46.8,
      unit: '%',
      icon: 'AlertTriangle',
      status: 'text-accent-danger',
    },
  ];

  return (
    <div className="space-y-3">
      {/* Parameter Controls */}
      <div
        className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
        style={{ background: 'white' }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Stress Test Parameters</h3>
            <p className="text-sm text-muted-foreground">
              Adjust parameters to model different stress scenarios
            </p>
          </div>
          <ButtonWithIcon
            variant="destructive"
            onClick={runStressTest}
            disabled={isRunning}
            loading={isRunning}
            iconName="Play"
          >
            {isRunning ? 'Running Test...' : 'Run Stress Test'}
          </ButtonWithIcon>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Input
            label="Carbon Price ($/tCO2)"
            type="number"
            value={parameters.carbonPrice}
            onChange={(e: any) => handleParameterChange('carbonPrice', e.target.value)}
            description="Current: $85/tCO2"
          />

          <Input
            label="Policy Shock (%)"
            type="number"
            value={parameters.policyShock}
            onChange={(e: any) => handleParameterChange('policyShock', e.target.value)}
            description="Regulatory tightening"
          />

          <Input
            label="Demand Shift (%)"
            type="number"
            value={parameters.demandShift}
            onChange={(e: any) => handleParameterChange('demandShift', e.target.value)}
            description="Consumer preference change"
          />

          <Input
            label="Tech Disruption (%)"
            type="number"
            value={parameters.techDisruption}
            onChange={(e: any) => handleParameterChange('techDisruption', e.target.value)}
            description="Technology displacement"
          />
        </div>
      </div>

      {/* Results Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {stressTestCard?.map((stressTest: any) => {
          return (
            <div
              className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
              style={{ background: 'white' }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Icon name={stressTest?.icon} size={20} className={stressTest?.status} />
                <h4 className="font-medium text-foreground">{stressTest?.title}</h4>
              </div>
              <p className={`text-2xl font-bold ${stressTest?.status}`}>
                {stressTest?.value.toFixed(1)}
                {stressTest?.unit}
              </p>
              <p className="text-md text-muted-foreground" style={{ color: '#64748B' }}>
                {stressTest?.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Monte Carlo Results */}
        <div
          className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
          style={{ background: 'white' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Monte Carlo Simulation</h3>
              <p className="text-sm text-muted-foreground">10,000 scenario outcomes</p>
            </div>
            <Icon name="Scatter3D" size={20} className="text-primary" />
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  dataKey="impact"
                  stroke="#64748B"
                  fontSize={10}
                  label={{
                    value: 'Portfolio Impact (%)',
                    position: 'insideBottom',
                    offset: 0,
                    fontSize: 10,
                  }}
                />
                <YAxis
                  dataKey="probability"
                  stroke="#64748B"
                  fontSize={10}
                  label={{
                    value: 'Probability',
                    angle: -90,
                    position: 'insideLeft',
                    fontSize: 10,
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Scatter data={monteCarloData} fill="#6366F1">
                  {monteCarloData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.impact > -15 ? '#6366F1' : '#EF4444'} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Chart */}
        <div
          className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
          style={{ background: 'white' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Impact Distribution</h3>
              <p className="text-sm text-muted-foreground">Frequency of outcomes</p>
            </div>
            <Icon name="BarChart3" size={20} className="text-accent-info" />
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  dataKey="range"
                  stroke="#64748B"
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  stroke="#64748B"
                  fontSize={10}
                  label={{
                    value: 'Frequency',
                    angle: -90,
                    position: 'insideLeft',
                    fontSize: 10,
                  }}
                />
                <Tooltip />
                <Bar dataKey="frequency" radius={[4, 4, 0, 0]}>
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Risk Mitigation Recommendations */}
      <div
        className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
        style={{ background: 'white' }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Shield" size={20} className="text-accent-success" />
          <h3 className="text-lg font-semibold text-foreground">Risk Mitigation Recommendations</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <RiskMitigationCard
              title="Diversification"
              description="Reduce concentration in high-risk energy sector holdings"
              icon="CheckCircle"
              status="text-accent-success"
            />
            <RiskMitigationCard
              title="Hedging Strategy"
              description="Consider carbon credit positions to offset transition risks"
              icon="AlertTriangle"
              status="text-accent-warning"
            />
          </div>

          <div className="space-y-3">
            <RiskMitigationCard
              title="Green Allocation"
              description="Increase allocation to renewable energy and clean technology"
              icon="TrendingUp"
              status="text-accent-info"
            />
            <RiskMitigationCard
              title="Enhanced Monitoring"
              description="Implement real-time ESG risk monitoring and alerts"
              icon="Eye"
              status="text-accent-info"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressTesting;
