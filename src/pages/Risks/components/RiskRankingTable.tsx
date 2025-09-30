import React, { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';
import ButtonWithIcon from '../../../components/ui/ButtonWithIcon';

type Trend = 'up' | 'down' | 'stable';
type Recommendation = 'Reduce' | 'Monitor' | 'Hold' | 'Increase';

interface Holding {
  id: number;
  company: string;
  sector: string;
  allocation: number;
  riskScore: number;
  climateVar: number;
  transitionRisk: number;
  physicalRisk: number;
  recommendation: Recommendation;
  trend: Trend;
}

type SortKey = keyof Holding;

const RiskRankingTable: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortKey>('riskScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const holdings: Holding[] = [
    {
      id: 1,
      company: 'ExxonMobil Corp',
      sector: 'Energy',
      allocation: 4.2,
      riskScore: 87,
      climateVar: 15.3,
      transitionRisk: 92,
      physicalRisk: 68,
      recommendation: 'Reduce',
      trend: 'up',
    },
    {
      id: 2,
      company: 'Chevron Corporation',
      sector: 'Energy',
      allocation: 3.8,
      riskScore: 84,
      climateVar: 14.1,
      transitionRisk: 89,
      physicalRisk: 65,
      recommendation: 'Reduce',
      trend: 'up',
    },
    {
      id: 3,
      company: 'NextEra Energy Inc',
      sector: 'Utilities',
      allocation: 2.9,
      riskScore: 72,
      climateVar: 8.7,
      transitionRisk: 45,
      physicalRisk: 78,
      recommendation: 'Monitor',
      trend: 'down',
    },
    {
      id: 4,
      company: 'Alcoa Corporation',
      sector: 'Materials',
      allocation: 1.8,
      riskScore: 69,
      climateVar: 9.2,
      transitionRisk: 72,
      physicalRisk: 58,
      recommendation: 'Monitor',
      trend: 'stable',
    },
    {
      id: 5,
      company: 'Caterpillar Inc',
      sector: 'Industrials',
      allocation: 2.1,
      riskScore: 65,
      climateVar: 7.8,
      transitionRisk: 68,
      physicalRisk: 52,
      recommendation: 'Hold',
      trend: 'down',
    },
    {
      id: 6,
      company: 'Ford Motor Company',
      sector: 'Consumer Disc.',
      allocation: 1.6,
      riskScore: 62,
      climateVar: 6.9,
      transitionRisk: 75,
      physicalRisk: 45,
      recommendation: 'Hold',
      trend: 'down',
    },
    {
      id: 7,
      company: 'JPMorgan Chase & Co',
      sector: 'Financials',
      allocation: 3.4,
      riskScore: 58,
      climateVar: 5.2,
      transitionRisk: 52,
      physicalRisk: 48,
      recommendation: 'Hold',
      trend: 'stable',
    },
    {
      id: 8,
      company: 'Microsoft Corporation',
      sector: 'Technology',
      allocation: 5.2,
      riskScore: 32,
      climateVar: 2.1,
      transitionRisk: 28,
      physicalRisk: 25,
      recommendation: 'Increase',
      trend: 'down',
    },
  ];

  const handleSort = (column: SortKey) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedHoldings = [...holdings].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    return 0;
  });

  const getRiskColor = (score: number): string => {
    if (score >= 80) return 'text-accent-danger';
    if (score >= 60) return 'text-accent-warning';
    if (score >= 40) return 'text-accent-info';
    return 'text-accent-success';
  };

  const getRecommendationColor = (recommendation: Recommendation): string => {
    switch (recommendation.toLowerCase()) {
      case 'reduce':
        return 'bg-error/10 text-accent-danger border-error/20';
      case 'monitor':
        return 'bg-warning/10 text-accent-warning border-warning/20';
      case 'hold':
        return 'bg-accent/10 text-accent-info border-accent/20';
      case 'increase':
        return 'bg-success/10 text-accent-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTrendIcon = (trend: Trend): { name: string; color: string } => {
    switch (trend) {
      case 'up':
        return { name: 'TrendingUp', color: 'text-accent-danger' };
      case 'down':
        return { name: 'TrendingDown', color: 'text-accent-success' };
      case 'stable':
        return { name: 'Minus', color: 'text-muted-foreground' };
      default:
        return { name: 'Minus', color: 'text-muted-foreground' };
    }
  };

  const SortableHeader: React.FC<{ column: SortKey; children: React.ReactNode }> = ({
    column,
    children,
  }) => (
    <th
      className="px-4 py-3 text-left text-md font-medium text-muted-foreground tracking-wider cursor-pointer hover:text-foreground transition-colors"
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <Icon
          name={sortBy === column && sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'}
          size={14}
          className={sortBy === column ? 'text-primary' : 'text-muted-foreground'}
        />
      </div>
    </th>
  );

  return (
    <div
      className="bg-card border border-border rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
      style={{ background: 'white' }}
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">High-Risk Holdings</h3>
            <p className="text-sm text-muted-foreground">
              Top climate risk exposures by portfolio allocation
            </p>
          </div>
          <ButtonWithIcon variant="outline" size="sm" iconName="Download">
            Export
          </ButtonWithIcon>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <SortableHeader column="company">Company</SortableHeader>
              <SortableHeader column="allocation">Allocation</SortableHeader>
              <SortableHeader column="riskScore">Risk Score</SortableHeader>
              <SortableHeader column="climateVar">Climate VaR</SortableHeader>
              <SortableHeader column="transitionRisk">Transition</SortableHeader>
              <SortableHeader column="physicalRisk">Physical</SortableHeader>
              <th className="px-4 py-3 text-left text-md font-medium text-muted-foreground tracking-wider">
                Recommendation
              </th>
              <th className="px-4 py-3 text-left text-md font-medium text-muted-foreground tracking-wider">
                Trend
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {sortedHoldings.map((holding) => {
              const trendIcon = getTrendIcon(holding.trend);
              return (
                <tr key={holding.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-md font-medium text-foreground">{holding.company}</div>
                      <div className="text-sm text-muted-foreground">{holding.sector}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-md text-foreground">{holding.allocation}%</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`text-md font-semibold ${getRiskColor(holding.riskScore)}`}>
                      {holding.riskScore}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-md text-foreground">{holding.climateVar}%</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`text-md ${getRiskColor(holding.transitionRisk)}`}>
                      {holding.transitionRisk}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`text-md ${getRiskColor(holding.physicalRisk)}`}>
                      {holding.physicalRisk}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-md font-medium rounded-md border ${getRecommendationColor(
                        holding.recommendation
                      )}`}
                    >
                      {holding.recommendation}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Icon name={trendIcon.name} size={16} className={trendIcon.color} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskRankingTable;
