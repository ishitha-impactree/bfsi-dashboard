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
type PeriodType = '1m' | '3m' | '6m' | '1y';

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

const TopEmittersSidebar: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('3m');

  const topEmitters: Emitter[] = [
    {
      id: 1,
      company: 'ExxonMobil Corp.',
      sector: 'Energy',
      emissions: 89.4,
      portfolioImpact: 12.3,
      trend: -2.1,
      sparklineData: [
        { month: 'Jan', value: 92.1 },
        { month: 'Feb', value: 91.8 },
        { month: 'Mar', value: 90.5 },
        { month: 'Apr', value: 89.9 },
        { month: 'May', value: 89.4 },
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
      trend: -1.8,
      sparklineData: [
        { month: 'Jan', value: 78.5 },
        { month: 'Feb', value: 77.9 },
        { month: 'Mar', value: 77.1 },
        { month: 'Apr', value: 76.8 },
        { month: 'May', value: 76.2 },
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
      trend: -4.3,
      sparklineData: [
        { month: 'Jan', value: 48.9 },
        { month: 'Feb', value: 47.8 },
        { month: 'Mar', value: 46.9 },
        { month: 'Apr', value: 46.1 },
        { month: 'May', value: 45.7 },
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
      trend: -3.7,
      sparklineData: [
        { month: 'Jan', value: 44.8 },
        { month: 'Feb', value: 44.1 },
        { month: 'Mar', value: 43.5 },
        { month: 'Apr', value: 42.9 },
        { month: 'May', value: 42.3 },
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
      trend: -2.9,
      sparklineData: [
        { month: 'Jan', value: 40.8 },
        { month: 'Feb', value: 40.2 },
        { month: 'Mar', value: 39.7 },
        { month: 'Apr', value: 39.3 },
        { month: 'May', value: 38.9 },
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
      trend: -5.2,
      sparklineData: [
        { month: 'Jan', value: 38.4 },
        { month: 'Feb', value: 37.8 },
        { month: 'Mar', value: 37.1 },
        { month: 'Apr', value: 36.3 },
        { month: 'May', value: 35.6 },
      ],
      weight: 1.1,
      esgScore: 54,
    },
  ];

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
          {(['1m', '3m', '6m', '1y'] as PeriodType[]).map((period: PeriodType) => (
            <ButtonWithIcon
              key={period}
              variant={selectedPeriod === period ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
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
                {/* <div className="h-8 mb-3">
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
                </div> */}
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
              <span className="font-medium">3.2%</span>
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
