import React, { useState, useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';
import ButtonWithIcon from '../../../components/ui/ButtonWithIcon';

type SectorType =
  | 'Energy'
  | 'Materials'
  | 'Industrials'
  | 'Technology'
  | 'Healthcare'
  | 'Financials';
type PeriodType = '1 Month' | '3 Months' | '6 Months' | '1 Year';

interface SparklineDataPoint {
  month: string;
  value: number;
}

interface Emitter {
  id: number;
  company: string;
  sector: SectorType;
  emissions: number;
  portfolioImpact: number;
  trend: number;
  sparklineData: SparklineDataPoint[];
  weight: number;
  esgScore: number;
}

interface ESGRating {
  rating: string;
  color: 'text-success' | 'text-warning' | 'text-error';
}
  
const emitterData: Record<PeriodType, Emitter[]> = {
  '1 Month': [
    {
      id: 1,
      company: 'ExxonMobil Corp.',
      sector: 'Energy',
      emissions: 89.4,
      portfolioImpact: 12.3,
      trend: 2.1,
      sparklineData: [
        { month: 'Jan', value: 87.3 },
        { month: 'Feb', value: 88.1 },
        { month: 'Mar', value: 89.4 },
      ],
      weight: 2.1,
      esgScore: 42,
    },
    {
      id: 2,
      company: 'Chevron Corp.',
      sector: 'Energy',
      emissions: 76.2,
      portfolioImpact: 8.7,
      trend: 1.8,
      sparklineData: [
        { month: 'Jan', value: 74.4 },
        { month: 'Feb', value: 75.3 },
        { month: 'Mar', value: 76.2 },
      ],
      weight: 1.8,
      esgScore: 38,
    },
    {
      id: 3,
      company: 'Caterpillar Inc.',
      sector: 'Industrials',
      emissions: 45.7,
      portfolioImpact: 5.2,
      trend: 4.3,
      sparklineData: [
        { month: 'Jan', value: 41.4 },
        { month: 'Feb', value: 43.5 },
        { month: 'Mar', value: 45.7 },
      ],
      weight: 1.5,
      esgScore: 58,
    },
    {
      id: 4,
      company: 'ArcelorMittal SA',
      sector: 'Materials',
      emissions: 42.3,
      portfolioImpact: 4.8,
      trend: 3.7,
      sparklineData: [
        { month: 'Jan', value: 38.6 },
        { month: 'Feb', value: 40.4 },
        { month: 'Mar', value: 42.3 },
      ],
      weight: 1.2,
      esgScore: 51,
    },
    {
      id: 5,
      company: 'ConocoPhillips',
      sector: 'Energy',
      emissions: 38.9,
      portfolioImpact: 4.1,
      trend: 2.9,
      sparklineData: [
        { month: 'Jan', value: 36.0 },
        { month: 'Feb', value: 37.4 },
        { month: 'Mar', value: 38.9 },
      ],
      weight: 1.4,
      esgScore: 45,
    },
    {
      id: 6,
      company: 'Dow Inc.',
      sector: 'Materials',
      emissions: 35.6,
      portfolioImpact: 3.7,
      trend: 5.2,
      sparklineData: [
        { month: 'Jan', value: 30.4 },
        { month: 'Feb', value: 33.0 },
        { month: 'Mar', value: 35.6 },
      ],
      weight: 1.1,
      esgScore: 54,
    },
  ],
  '3 Months': [
    {
      id: 1,
      company: 'ExxonMobil Corp.',
      sector: 'Energy',
      emissions: 87.2,
      portfolioImpact: 11.9,
      trend: 1.9,
      sparklineData: [
        { month: 'Oct', value: 85.3 },
        { month: 'Nov', value: 86.1 },
        { month: 'Dec', value: 86.8 },
        { month: 'Jan', value: 87.2 },
      ],
      weight: 2.1,
      esgScore: 42,
    },
    {
      id: 2,
      company: 'Chevron Corp.',
      sector: 'Energy',
      emissions: 74.5,
      portfolioImpact: 8.4,
      trend: 1.6,
      sparklineData: [
        { month: 'Oct', value: 72.9 },
        { month: 'Nov', value: 73.5 },
        { month: 'Dec', value: 74.1 },
        { month: 'Jan', value: 74.5 },
      ],
      weight: 1.8,
      esgScore: 38,
    },
    {
      id: 3,
      company: 'Caterpillar Inc.',
      sector: 'Industrials',
      emissions: 44.8,
      portfolioImpact: 5.0,
      trend: 3.8,
      sparklineData: [
        { month: 'Oct', value: 41.0 },
        { month: 'Nov', value: 42.5 },
        { month: 'Dec', value: 43.7 },
        { month: 'Jan', value: 44.8 },
      ],
      weight: 1.5,
      esgScore: 58,
    },
    {
      id: 4,
      company: 'ArcelorMittal SA',
      sector: 'Materials',
      emissions: 41.7,
      portfolioImpact: 4.6,
      trend: 3.5,
      sparklineData: [
        { month: 'Oct', value: 38.2 },
        { month: 'Nov', value: 39.6 },
        { month: 'Dec', value: 40.8 },
        { month: 'Jan', value: 41.7 },
      ],
      weight: 1.2,
      esgScore: 51,
    },
    {
      id: 5,
      company: 'ConocoPhillips',
      sector: 'Energy',
      emissions: 37.9,
      portfolioImpact: 4.0,
      trend: 2.5,
      sparklineData: [
        { month: 'Oct', value: 35.4 },
        { month: 'Nov', value: 36.4 },
        { month: 'Dec', value: 37.2 },
        { month: 'Jan', value: 37.9 },
      ],
      weight: 1.4,
      esgScore: 45,
    },
    {
      id: 6,
      company: 'Dow Inc.',
      sector: 'Materials',
      emissions: 34.9,
      portfolioImpact: 3.5,
      trend: 4.9,
      sparklineData: [
        { month: 'Oct', value: 30.0 },
        { month: 'Nov', value: 31.8 },
        { month: 'Dec', value: 33.5 },
        { month: 'Jan', value: 34.9 },
      ],
      weight: 1.1,
      esgScore: 54,
    },
  ],
  '6 Months': [
    {
      id: 1,
      company: 'ExxonMobil Corp.',
      sector: 'Energy',
      emissions: 80.5,
      portfolioImpact: 11.3,
      trend: 2.2,
      sparklineData: [
        { month: 'Jul', value: 78.3 },
        { month: 'Aug', value: 79.1 },
        { month: 'Sep', value: 79.8 },
        { month: 'Oct', value: 80.2 },
        { month: 'Nov', value: 80.4 },
        { month: 'Dec', value: 80.5 },
      ],
      weight: 2.1,
      esgScore: 42,
    },
    {
      id: 2,
      company: 'Chevron Corp.',
      sector: 'Energy',
      emissions: 72.1,
      portfolioImpact: 8.0,
      trend: 1.9,
      sparklineData: [
        { month: 'Jul', value: 70.2 },
        { month: 'Aug', value: 70.9 },
        { month: 'Sep', value: 71.5 },
        { month: 'Oct', value: 71.8 },
        { month: 'Nov', value: 72.0 },
        { month: 'Dec', value: 72.1 },
      ],
      weight: 1.8,
      esgScore: 38,
    },
    {
      id: 3,
      company: 'Caterpillar Inc.',
      sector: 'Industrials',
      emissions: 43.2,
      portfolioImpact: 4.9,
      trend: 3.6,
      sparklineData: [
        { month: 'Jul', value: 39.6 },
        { month: 'Aug', value: 40.8 },
        { month: 'Sep', value: 41.7 },
        { month: 'Oct', value: 42.3 },
        { month: 'Nov', value: 42.8 },
        { month: 'Dec', value: 43.2 },
      ],
      weight: 1.5,
      esgScore: 58,
    },
    {
      id: 4,
      company: 'ArcelorMittal SA',
      sector: 'Materials',
      emissions: 40.9,
      portfolioImpact: 4.5,
      trend: 3.2,
      sparklineData: [
        { month: 'Jul', value: 37.7 },
        { month: 'Aug', value: 38.6 },
        { month: 'Sep', value: 39.3 },
        { month: 'Oct', value: 39.9 },
        { month: 'Nov', value: 40.4 },
        { month: 'Dec', value: 40.9 },
      ],
      weight: 1.2,
      esgScore: 51,
    },
    {
      id: 5,
      company: 'ConocoPhillips',
      sector: 'Energy',
      emissions: 36.8,
      portfolioImpact: 3.8,
      trend: 2.7,
      sparklineData: [
        { month: 'Jul', value: 34.1 },
        { month: 'Aug', value: 35.0 },
        { month: 'Sep', value: 35.6 },
        { month: 'Oct', value: 36.1 },
        { month: 'Nov', value: 36.5 },
        { month: 'Dec', value: 36.8 },
      ],
      weight: 1.4,
      esgScore: 45,
    },
    {
      id: 6,
      company: 'Dow Inc.',
      sector: 'Materials',
      emissions: 33.1,
      portfolioImpact: 3.4,
      trend: 4.4,
      sparklineData: [
        { month: 'Jul', value: 28.7 },
        { month: 'Aug', value: 29.9 },
        { month: 'Sep', value: 30.9 },
        { month: 'Oct', value: 31.7 },
        { month: 'Nov', value: 32.4 },
        { month: 'Dec', value: 33.1 },
      ],
      weight: 1.1,
      esgScore: 54,
    },
  ],
  '1 Year': [
    {
      id: 1,
      company: 'ExxonMobil Corp.',
      sector: 'Energy',
      emissions: 39.7,
      portfolioImpact: 0.75,
      trend: -2.1,
      sparklineData: [
        { month: 'Jan', value: 41.8 },
        { month: 'Feb', value: 41.2 },
        { month: 'Mar', value: 40.7 },
        { month: 'Apr', value: 40.3 },
        { month: 'May', value: 39.9 },
        { month: 'Jun', value: 39.7 },
        { month: 'Jul', value: 39.6 },
        { month: 'Aug', value: 39.5 },
        { month: 'Sep', value: 39.5 },
        { month: 'Oct', value: 39.6 },
        { month: 'Nov', value: 39.7 },
        { month: 'Dec', value: 39.7 },
      ],
      weight: 2.1,
      esgScore: 42,
    },
    {
      id: 2,
      company: 'Chevron Corp.',
      sector: 'Energy',
      emissions: 38.3,
      portfolioImpact: -0.89,
      trend: -5.2,
      sparklineData: [
        { month: 'Jan', value: 43.5 },
        { month: 'Feb', value: 42.8 },
        { month: 'Mar', value: 41.9 },
        { month: 'Apr', value: 41.1 },
        { month: 'May', value: 40.3 },
        { month: 'Jun', value: 39.6 },
        { month: 'Jul', value: 39.0 },
        { month: 'Aug', value: 38.6 },
        { month: 'Sep', value: 38.4 },
        { month: 'Oct', value: 38.3 },
        { month: 'Nov', value: 38.3 },
        { month: 'Dec', value: 38.3 },
      ],
      weight: 1.8,
      esgScore: 38,
    },
    {
      id: 3,
      company: 'Caterpillar Inc.',
      sector: 'Industrials',
      emissions: 36.9,
      portfolioImpact: -2.52,
      trend: -5.74,
      sparklineData: [
        { month: 'Jan', value: 42.6 },
        { month: 'Feb', value: 41.7 },
        { month: 'Mar', value: 40.7 },
        { month: 'Apr', value: 39.7 },
        { month: 'May', value: 38.8 },
        { month: 'Jun', value: 38.0 },
        { month: 'Jul', value: 37.5 },
        { month: 'Aug', value: 37.1 },
        { month: 'Sep', value: 36.9 },
        { month: 'Oct', value: 36.9 },
        { month: 'Nov', value: 36.9 },
        { month: 'Dec', value: 36.9 },
      ],
      weight: 1.5,
      esgScore: 58,
    },
    {
      id: 4,
      company: 'ArcelorMittal SA',
      sector: 'Materials',
      emissions: 35.5,
      portfolioImpact: -4.16,
      trend: -6.28,
      sparklineData: [
        { month: 'Jan', value: 41.8 },
        { month: 'Feb', value: 40.8 },
        { month: 'Mar', value: 39.7 },
        { month: 'Apr', value: 38.6 },
        { month: 'May', value: 37.6 },
        { month: 'Jun', value: 36.8 },
        { month: 'Jul', value: 36.2 },
        { month: 'Aug', value: 35.8 },
        { month: 'Sep', value: 35.6 },
        { month: 'Oct', value: 35.5 },
        { month: 'Nov', value: 35.5 },
        { month: 'Dec', value: 35.5 },
      ],
      weight: 1.2,
      esgScore: 51,
    },
  ],
};

const avgReductionData: Record<PeriodType, number> = {
  '1 Month': 3.2,
  '3 Months': 3.0,
  '6 Months': 3.3,
  '1 Year': 103.2,
};

const TopEmittersSidebar: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('1 Month');

  const topEmitters: Emitter[] = useMemo(() => {
    return emitterData[selectedPeriod];
  }, [selectedPeriod]);

  const getSectorColor = (sector: SectorType): string => {
    const colors: Record<SectorType, string> = {
      Energy: '#EF4444',
      Materials: '#EC4899',
      Industrials: '#F59E0B',
      Technology: '#3B82F6',
      Healthcare: '#10B981',
      Financials: '#8B5CF6',
    };
    return colors[sector] || '#64748B';
  };

  const getESGRating = (score: number): ESGRating => {
    if (score >= 80) return { rating: 'A', color: 'text-success' };
    if (score >= 70) return { rating: 'B', color: 'text-warning' };
    if (score >= 60) return { rating: 'C', color: 'text-warning' };
    if (score >= 50) return { rating: 'D', color: 'text-error' };
    return { rating: 'E', color: 'text-error' };
  };

  const totalPortfolioImpact: number = useMemo(() => {
    return topEmitters.reduce((sum: number, emitter: Emitter) => sum + emitter.portfolioImpact, 0);
  }, [topEmitters]);

  const handlePeriodChange = (period: PeriodType) => {
    setSelectedPeriod(period);
  };

  return (
    <div className="bg-primary-foreground border border-border rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Top Emissions Contributors</h3>
            <p className="text-sm text-text-muted">Ranked by portfolio impact</p>
          </div>
          <Icon name="TrendingUp" size={20} className="text-accent-danger" />
        </div>

        <div className="flex items-center gap-2">
          {(['1 Month', '3 Months', '6 Months', '1 Year'] as PeriodType[]).map((period: PeriodType) => (
            <ButtonWithIcon
              key={period}
              variant={selectedPeriod === period ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => handlePeriodChange(period)}
            >
              {period}
            </ButtonWithIcon>
          ))}
        </div>
      </div>
      <div className="p-3">
        <div className="space-y-3 max-h-[335px] overflow-y-auto">
          {topEmitters.map((emitter: Emitter, index: number) => {
            const esgRating: ESGRating = getESGRating(emitter.esgScore);
            const isPositiveTrend: boolean = emitter.trend > 0;
            const sectorColor: string = getSectorColor(emitter.sector);

            return (
              <div
                key={emitter.id}
                className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-150 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-text-muted">#{index + 1}</span>
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: sectorColor }}
                      ></div>
                    </div>
                    <h4 className="font-medium text-foreground text-md truncate">
                      {emitter.company}
                    </h4>
                    <p className="text-sm text-muted-foreground">{emitter.sector}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-semibold text-foreground">
                      {emitter.emissions.toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">tCO2e/$M</div>
                  </div>
                </div>
                <div className="h-8 mb-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={emitter.sparklineData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={sectorColor}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Icon
                        name={isPositiveTrend ? 'TrendingUp' : 'TrendingDown'}
                        size={12}
                        className={isPositiveTrend ? 'text-accent-danger' : 'text-accent-success'}
                      />
                      <span
                        className={isPositiveTrend ? 'text-accent-danger' : 'text-accent-success'}
                      >
                        {Math.abs(emitter.trend).toFixed(1)}%
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="text-text-muted">ESG:</span>
                      <span className={`font-medium ${esgRating.color}`}>{esgRating.rating}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-medium text-foreground">
                      {emitter.portfolioImpact.toFixed(1)}%
                    </div>
                    <div className="text-muted-foreground">impact</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Impact:</span>
            <span className="font-semibold text-foreground">
              {totalPortfolioImpact.toFixed(1)}%
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-muted-foreground">Avg Reduction:</span>
            <div className="flex items-center gap-1 text-accent-success">
              <Icon name="TrendingDown" size={12} />
              <span className="font-medium">{avgReductionData[selectedPeriod].toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <ButtonWithIcon
            variant="outline"
            size="sm"
            className="w-full"
            iconName="ExternalLink"
            iconPosition="right"
            iconSize={14}
          >
            View Detailed Analysis
          </ButtonWithIcon>
        </div>
      </div>
    </div>
  );
};

export default TopEmittersSidebar;