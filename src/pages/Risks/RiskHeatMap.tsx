import React, { useState } from 'react';
import Icon from '../../components/ui/AppIcon';

interface SelectedCell {
  sector: string;
  factor: string;
  value: number;
  sectorIndex: number;
  factorIndex: number;
}

const RiskHeatMap: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);

  const sectors: string[] = [
    'Energy',
    'Utilities',
    'Materials',
    'Industrials',
    'Consumer Disc.',
    'Consumer Staples',
    'Healthcare',
    'Financials',
    'Technology',
    'Real Estate',
  ];

  const riskFactors: string[] = [
    'Carbon Pricing',
    'Policy Changes',
    'Technology Shift',
    'Physical Climate',
    'Reputation',
    'Market Demand',
  ];

  const heatMapData: number[][] = [
    [85, 72, 45, 23, 34, 56], // Energy
    [78, 68, 52, 67, 45, 43], // Utilities
    [65, 58, 67, 45, 52, 48], // Materials
    [45, 52, 72, 38, 46, 54], // Industrials
    [34, 43, 58, 28, 67, 72], // Consumer Disc.
    [28, 35, 42, 25, 48, 52], // Consumer Staples
    [15, 25, 38, 18, 32, 28], // Healthcare
    [42, 48, 35, 32, 58, 45], // Financials
    [25, 32, 68, 22, 42, 38], // Technology
    [52, 45, 38, 48, 54, 46], // Real Estate
  ];

  const getRiskColor = (value: number): string => {
    if (value >= 70) return 'bg-accent-danger';
    if (value >= 50) return 'bg-accent-warning';
    if (value >= 30) return 'bg-accent-info';
    return 'bg-accent-success';
  };

  const handleCellClick = (sectorIndex: number, factorIndex: number, value: number) => {
    setSelectedCell({
      sector: sectors[sectorIndex],
      factor: riskFactors[factorIndex],
      value,
      sectorIndex,
      factorIndex,
    });
  };

  return (
    <div
      className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
      style={{ background: 'white' }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Risk Factor Heat Map</h3>
          <p className="text-sm text-muted-foreground">
            Sector exposure to climate risk factors (0-100 scale)
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-muted-foreground">Risk Level:</span>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-accent-success rounded"></div>
              <span className="text-sm">Low</span>
              <div className="w-3 h-3 bg-accent-info rounded"></div>
              <span className="text-sm">Med</span>
              <div className="w-3 h-3 bg-accent-warning rounded"></div>
              <span className="text-sm">High</span>
              <div className="w-3 h-3 bg-accent-danger rounded"></div>
              <span className="text-sm">Critical</span>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            <div className="p-2"></div>
            {riskFactors.map((factor, index) => (
              <div key={index} className="p-2 text-center">
                <span className="text-md font-medium text-muted-foreground transform -rotate-30 inline-block">
                  {factor}
                </span>
              </div>
            ))}
          </div>

          {/* Heat Map Grid */}
          {sectors.map((sector, sectorIndex) => (
            <div key={sectorIndex} className="grid grid-cols-7 gap-1 mb-1">
              <div className="p-3 flex items-center">
                <span className="text-md font-medium text-foreground">{sector}</span>
              </div>
              {heatMapData[sectorIndex].map((value, factorIndex) => (
                <div
                  key={factorIndex}
                  onClick={() => handleCellClick(sectorIndex, factorIndex, value)}
                  className={`
                    p-3 rounded cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md
                    ${getRiskColor(value)} border border-border
                    ${
                      selectedCell?.sectorIndex === sectorIndex &&
                      selectedCell?.factorIndex === factorIndex
                        ? 'ring-2 ring-primary'
                        : ''
                    }
                  `}
                >
                  <div className="text-center">
                    <span className="text-sm font-semibold text-foreground">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Cell Details */}
      {selectedCell && (
        <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-foreground">
                {selectedCell.sector} × {selectedCell.factor}
              </h4>
              <p className="text-md text-muted-foreground mt-1">
                Risk Score: <span className="font-semibold">{selectedCell.value}/100</span>
              </p>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-muted-foreground">
                  • High exposure to {selectedCell.factor.toLowerCase()} risks
                </p>
                <p className="text-sm text-muted-foreground">
                  • Recommended: Enhanced monitoring and mitigation strategies
                </p>
                <p className="text-sm text-muted-foreground">
                  • Impact: Portfolio allocation review suggested
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedCell(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskHeatMap;
