import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import Icon from '../../../components/ui/AppIcon';

interface MetricsRowProps {
  filters: {
    portfolio: string;
    category: string;
    region: string;
    dateRange: string;
  };
}

interface EmissionData {
  category: string;
  emissions: number;
  trend: number; 
  color: string;
}

const MetricsRow: React.FC<MetricsRowProps> = ({ filters }) => {
  const getEmissionsData = (): EmissionData[] => {
    const defaultTrend = -3.8;
    const sectorColors = {
      'Energy': '#5DD0A7',
      'Technology': '#3B82F6',
      'Healthcare': '#10B981',
      'Transportation': '#F59E0B',
      'Materials': '#EC4899',
      'Industrial': '#8B5CF6',
    };
    
    // Data provided by the user for the Global Equity Fund in Mt CO₂e, organized by region
    const globalEquityData: Record<string, Record<string, number>> = {
      'all': { 'Energy': 45.2, 'Technology': 28.7, 'Healthcare': 18.9, 'Transportation': 32.1, 'Materials': 15.4, 'Industrial': 24.6 },
      'asia-pacific': { 'Energy': 13.6, 'Technology': 10.2, 'Healthcare': 5.1, 'Transportation': 9.8, 'Materials': 4.5, 'Industrial': 7.4 },
      'americas': { 'Energy': 11.8, 'Technology': 7.8, 'Healthcare': 6.3, 'Transportation': 10.5, 'Materials': 3.8, 'Industrial': 6.1 },
      'europe': { 'Energy': 8.9, 'Technology': 5.9, 'Healthcare': 4.8, 'Transportation': 7.3, 'Materials': 3.2, 'Industrial': 5.5 },
      'emerging-markets': { 'Energy': 6.5, 'Technology': 2.1, 'Healthcare': 1.1, 'Transportation': 2.6, 'Materials': 2.1, 'Industrial': 3.1 },
      'developed-markets': { 'Energy': 4.4, 'Technology': 2.7, 'Healthcare': 1.6, 'Transportation': 1.9, 'Materials': 1.8, 'Industrial': 2.5 },
    };

    // Placeholder data for other funds (using 'tCO2e/$M' for placeholder values)
    const otherFundData: Record<string, EmissionData[]> = {
        'emerging-markets': [
            { category: 'Energy', emissions: 38.7, trend: -1.8, color: sectorColors.Energy },
            { category: 'Technology', emissions: 22.4, trend: -6.5, color: sectorColors.Technology },
            { category: 'Healthcare', emissions: 14.2, trend: -2.1, color: sectorColors.Healthcare },
            { category: 'Transportation', emissions: 28.9, trend: -3.9, color: sectorColors.Transportation },
            { category: 'Materials', emissions: 18.6, trend: -2.7, color: sectorColors.Materials },
            { category: 'Industrial', emissions: 20.3, trend: -5.4, color: sectorColors.Industrial },
        ],
        'sustainable-growth': [
            { category: 'Energy', emissions: 22.1, trend: -4.2, color: sectorColors.Energy },
            { category: 'Technology', emissions: 35.8, trend: -7.1, color: sectorColors.Technology },
            { category: 'Healthcare', emissions: 25.4, trend: -3.5, color: sectorColors.Healthcare },
            { category: 'Transportation', emissions: 18.7, trend: -5.8, color: sectorColors.Transportation },
            { category: 'Materials', emissions: 12.3, trend: -4.1, color: sectorColors.Materials },
            { category: 'Industrial', emissions: 16.9, trend: -6.9, color: sectorColors.Industrial },
        ],
        'tech-innovation': [
            { category: 'Energy', emissions: 8.4, trend: -1.2, color: sectorColors.Energy },
            { category: 'Technology', emissions: 52.6, trend: -8.3, color: sectorColors.Technology },
            { category: 'Healthcare', emissions: 12.8, trend: -2.8, color: sectorColors.Healthcare },
            { category: 'Transportation', emissions: 15.2, trend: -4.5, color: sectorColors.Transportation },
            { category: 'Materials', emissions: 6.9, trend: -3.1, color: sectorColors.Materials },
            { category: 'Industrial', emissions: 11.4, trend: -5.7, color: sectorColors.Industrial },
        ],
        'infrastructure': [
            { category: 'Energy', emissions: 41.8, trend: -2.8, color: sectorColors.Energy },
            { category: 'Technology', emissions: 15.3, trend: -3.4, color: sectorColors.Technology },
            { category: 'Healthcare', emissions: 9.7, trend: -1.4, color: sectorColors.Healthcare },
            { category: 'Transportation', emissions: 38.5, trend: -3.2, color: sectorColors.Transportation },
            { category: 'Materials', emissions: 24.1, trend: -2.5, color: sectorColors.Materials },
            { category: 'Industrial', emissions: 32.8, trend: -4.1, color: sectorColors.Industrial },
        ],
    };

    if (filters.portfolio !== 'global-equity') {
        // When a non-Global Equity fund is selected, return its placeholder data.
        // For simplicity, regional filters are ignored for other funds' placeholder data.
        return otherFundData[filters.portfolio] || otherFundData['emerging-markets'];
    }

    // Logic for Global Equity Fund (uses the provided Mt CO₂e data)
    const regionEmissions = globalEquityData[filters.region];
    let data: EmissionData[] = [];
    let categories = Object.keys(regionEmissions);

    if (filters.category !== 'all') {
      // Filter by specific category
      categories = [filters.category.charAt(0).toUpperCase() + filters.category.slice(1)];
    }

    categories.forEach((cat) => {
      const categoryKey = cat.toLowerCase() as keyof typeof sectorColors; 
      const emissionsValue = regionEmissions[cat];
      
      // Using dummy trend values for the Mt CO₂e data
      let trendValue = defaultTrend;
      if (cat === 'Energy') trendValue = -2.3;
      else if (cat === 'Technology') trendValue = -5.1;
      
      data.push({
        category: cat,
        emissions: emissionsValue,
        trend: trendValue,
        color: sectorColors[categoryKey] || '#374151',
      });
    });

    return data;
  };

  const emissionsData = getEmissionsData();
  const totalEmissions = emissionsData.reduce((sum, item) => sum + item.emissions, 0);

  const formatTrend = (trend: number) => {
    const isPositive = trend > 0;
    return {
      value: Math.abs(trend),
      isPositive,
      icon: isPositive ? 'TrendingUp' : 'TrendingDown',
      // For emissions, UP is BAD (Danger/Red), DOWN is GOOD (Success/Green)
      color: isPositive ? 'text-accent-danger' : 'text-accent-success',
    };
  };

  const portfolioLabels: { [key: string]: string } = {
    'global-equity': 'Global Equity Fund',
    'emerging-markets': 'Emerging Markets Fund',
    'sustainable-growth': 'Sustainable Growth Fund',
    'tech-innovation': 'Tech Innovation Fund',
    'infrastructure': 'Infrastructure Fund'
  };

  const regionLabels: { [key: string]: string } = {
    'all': 'All Regions',
    'asia-pacific': 'Asia Pacific',
    'americas': 'Americas',
    'europe': 'Europe',
    'emerging-markets': 'Emerging Markets',
    'developed-markets': 'Developed Markets'
  };

  const categoryLabels: { [key: string]: string } = {
    'all': 'All Categories',
    'energy': 'Energy',
    'technology': 'Technology',
    'healthcare': 'Healthcare',
    'transportation': 'Transportation',
    'materials': 'Materials',
    'industrial': 'Industrial'
  };
  
  const emissionsUnit = filters.portfolio === 'global-equity' ? 'Mt CO₂e' : 'tCO2e/$M';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const unit = filters.portfolio === 'global-equity' ? 'Mt CO₂e' : 'tCO2e/$M';
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            Emissions:{' '}
            <span className="text-foreground font-medium">{payload[0].value.toFixed(1)} {unit}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Portfolio: {portfolioLabels[filters.portfolio]}
          </p>
          <p className="text-xs text-muted-foreground">
            Region: {regionLabels[filters.region]}
          </p>
        </div>
      );
    }
    return null;
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
      <div className="bg-primary-foreground border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Emissions by Asset Class</h3>
            <p className="text-sm text-muted-foreground">
              {emissionsUnit} • {portfolioLabels[filters.portfolio]} • {regionLabels[filters.region]}
              {filters.category !== 'all' && ` • ${categoryLabels[filters.category]}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="BarChart3" size={20} className="text-primary" />
          </div>
        </div>

        <div style={{ width: '100%', height: 450 }}>
          <ResponsiveContainer>
            <BarChart
              data={emissionsData}
              layout="vertical"
              barSize={filters.category === 'all' ? 20 : 40}
              margin={{ top: 20, right: 40, left: 40, bottom: 20 }}
            >
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                domain={[0, 'dataMax']}
              />
              <YAxis
                type="category"
                dataKey="category"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#374151', fontWeight: 500 }}
                width={filters.category === 'all' ? 90 : 120}
              />

              <Tooltip
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                content={<CustomTooltip />}
              />

              <defs>
                {emissionsData.map((entry, index) => (
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

              <Bar dataKey="emissions" radius={[0, 6, 6, 0]}>
                {emissionsData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={`url(#grad-${index})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{totalEmissions.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Total {emissionsUnit}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-success">-3.8%</div>
            <div className="text-sm text-muted-foreground">vs. Last Quarter</div>
          </div>
        </div>
      </div>

      <div className="bg-primary-foreground border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Emissions Trends</h3>
            <p className="text-sm text-muted-foreground">
              Quarterly change by sector • {portfolioLabels[filters.portfolio]}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="TrendingDown" size={20} className="text-accent-success" />
          </div>
        </div>

        <div className="space-y-4">
          {emissionsData.map((item, index) => {
            const trend = formatTrend(item.trend);
            const percentage = ((item.emissions / totalEmissions) * 100).toFixed(1);

            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div>
                    <div className="font-medium text-foreground">{item.category}</div>
                    <div className="text-sm text-muted-foreground">{percentage}% of portfolio</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="font-medium text-foreground">{item.emissions.toFixed(1)} {emissionsUnit.split(' ')[0]}</div>
                    <div className={`text-sm flex items-center gap-1 ${trend.color}`}>
                      <Icon name={trend.icon} size={14} />
                      {trend.value.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Portfolio Average Reduction:</span>
            <div className="flex items-center gap-1 text-accent-success font-medium">
              <Icon name="TrendingDown" size={14} />
              3.8% QoQ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsRow;