import React, { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';
import ButtonWithIcon from '../../../components/ui/ButtonWithIcon';

interface SectorData {
  id: number;
  sector: string;
  emissions: number;
  percentage: number;
  change: number;
  companies: number;
  intensity: number;
  trend: number[];
}

type SortableColumn = 'emissions' | 'percentage' | 'change' | 'companies' | 'intensity';
type SortOrder = 'asc' | 'desc';

const EmissionsSummaryTable: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortableColumn>('emissions');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedSectors, setSelectedSectors] = useState<number[]>([]);

  const sectorData: SectorData[] = [
    {
      id: 1,
      sector: 'Energy',
      emissions: 1185.5,
      percentage: 43.9,
      change: 0.3,
      companies: 48,
      intensity: 293.2,
      trend: [65, 70, 68, 62, 58, 55, 52],
    },
    {
      id: 2,
      sector: 'Materials',
      emissions: 486.2,
      percentage: 23.9,
      change: 13.3,
      companies: 28,
      intensity: 292.7,
      trend: [45, 48, 46, 42, 38, 35, 32],
    },
    {
      id: 3,
      sector: 'Industrials',
      emissions: 425.8,
      percentage: 16.9,
      change: 3.3,
      companies: 69,
      intensity: 102.4,
      trend: [25, 28, 26, 24, 22, 20, 18],
    },
    {
      id: 4,
      sector: 'Utilities',
      emissions: 356.4,
      percentage: 10.0,
      change: 0.8,
      companies: 18,
      intensity: 98.2,
      trend: [35, 32, 30, 28, 25, 22, 18],
    },
    {
      id: 5,
      sector: 'Transportation',
      emissions: 192.1,
      percentage: 6.2,
      change: 3.2,
      companies: 23,
      intensity: 25,
      trend: [15, 16, 17, 18, 19, 20, 21],
    },
  ];

  const handleSort = (column: SortableColumn) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const handleSectorSelect = (sectorId: number) => {
    setSelectedSectors((prev) =>
      prev.includes(sectorId) ? prev.filter((id) => id !== sectorId) : [...prev, sectorId]
    );
  };

  const sortedData = [...sectorData].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getSortIcon = (column: SortableColumn) => {
    if (sortBy !== column) return 'ArrowUpDown';
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getChangeColor = (change: number) => {
    if (change > 3) return '#22be8a';
    if (change < 3) return '#f26262';
    return 'text-muted-foreground';
  };

  const getChangeIcon = (change: number) => {
    if (change > 3) return 'TrendingUp';
    if (change < 3) return 'TrendingDown';
    return 'Minus';
  };

  const handleExport = () => {
    console.log('Exporting sector data...');
  };

  const handleDrillDown = (sector: string) => {
    console.log(`Drilling down into ${sector} sector...`);
  };

  return (
    <div
      // className="bg-card border border-border rounded-lg shadow-elevation-1 h-full flex flex-col"
      className="bg-card border border-border rounded-lg h-full flex flex-col shadow-elevation-1"
      style={{ background: 'white' }}
    >
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-foreground">Emissions by Sector</h3>
            <p className="text-md text-muted-foreground">
              Portfolio transactions and performance metrics
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <ButtonWithIcon
              variant="outline"
              size="sm"
              // text_font_size="text-sm"
              // text_line_height="leading-md"
              // style={{ border: 'none' }}
            >
              <Icon name="Download" size={12} />
              <span className="ml-1">Export</span>
            </ButtonWithIcon>

            <ButtonWithIcon
              variant="outline"
              size="sm"
              // text_font_size="text-sm"
              // text_line_height="leading-md"
              // style={{ border: 'none' }}
            >
              <Icon name="Filter" size={12} />
              <span className="ml-1">Filter</span>
            </ButtonWithIcon>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-muted/50 sticky top-0">
            <tr>
              <th className="text-left p-3 w-[200px]">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    checked={selectedSectors.length === sectorData.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedSectors(sectorData.map((s) => s.id));
                      } else {
                        setSelectedSectors([]);
                      }
                    }}
                  />
                  <span className="text-md font-medium text-foreground">Sector</span>
                </div>
              </th>

              <th className="text-right p-3 w-[120px]">
                <button
                  onClick={() => handleSort('emissions')}
                  className="flex items-center space-x-1 text-md font-medium text-foreground hover:text-primary transition-colors duration-150 ml-auto"
                >
                  <span>Emissions (tCO₂e)</span>
                  <Icon name={getSortIcon('emissions')} size={14} />
                </button>
              </th>

              <th className="text-right p-3 w-[100px]">
                <button
                  onClick={() => handleSort('percentage')}
                  className="flex items-center space-x-1 text-md font-medium text-foreground hover:text-primary transition-colors duration-150 ml-auto"
                >
                  <span>Portfolio %</span>
                  <Icon name={getSortIcon('percentage')} size={14} />
                </button>
              </th>

              <th className="text-right p-3 w-[100px]">
                <button
                  onClick={() => handleSort('change')}
                  className="flex items-center space-x-1 text-md font-medium text-foreground hover:text-primary transition-colors duration-150 ml-auto"
                >
                  <span>Var Change</span>
                  <Icon name={getSortIcon('change')} size={14} />
                </button>
              </th>

              <th className="text-right p-3 w-[100px]">
                <button
                  onClick={() => handleSort('companies')}
                  className="flex items-center space-x-1 text-md font-medium text-foreground hover:text-primary transition-colors duration-150 ml-auto"
                >
                  <span>Components</span>
                  <Icon name={getSortIcon('companies')} size={14} />
                </button>
              </th>

              <th className="text-right p-3 w-[100px]">
                <button
                  onClick={() => handleSort('intensity')}
                  className="flex items-center space-x-1 text-md font-medium text-foreground hover:text-primary transition-colors duration-150 ml-auto"
                >
                  <span>Material</span>
                  <Icon name={getSortIcon('intensity')} size={14} />
                </button>
              </th>

              <th className="text-center p-3 w-[120px]">
                <span className="text-md font-medium text-foreground">Trend</span>
              </th>

              <th className="text-center p-3 w-[100px]">
                <span className="text-md font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedData.map((sector, index) => (
              <tr
                key={sector.id}
                className={`border-b border-border hover:bg-muted/30 transition-colors duration-150 ${
                  selectedSectors.includes(sector.id) ? 'bg-primary/5' : ''
                }`}
              >
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="rounded border-border"
                      checked={selectedSectors.includes(sector.id)}
                      onChange={() => handleSectorSelect(sector.id)}
                    />
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          index === 0
                            ? 'bg-violet-500'
                            : index === 1
                              ? 'bg-blue-500'
                              : index === 2
                                ? 'bg-indigo-500'
                                : index === 3
                                  ? 'bg-purple-500'
                                  : 'bg-cyan-500'
                        }`}
                      />
                      <span className="text-md font-medium text-foreground">{sector.sector}</span>
                    </div>
                  </div>
                </td>

                <td className="p-3 text-right">
                  <span className="text-md font-medium text-foreground">
                    {sector.emissions.toLocaleString()}
                  </span>
                </td>

                <td className="p-3 text-right">
                  <span className="text-md text-foreground">{sector.percentage}%</span>
                </td>

                <td className="p-3 text-right">
                  <div
                    className={`flex items-center justify-end space-x-1 ${getChangeColor(sector.change)}`}
                  >
                    <Icon
                      name={getChangeIcon(sector.change)}
                      size={14}
                      color={getChangeColor(sector.change)}
                    />
                    <span className="text-md font-medium">{sector.change}%</span>
                  </div>
                </td>

                <td className="p-3 text-right">
                  <span className="text-md text-foreground">{sector.companies}</span>
                </td>

                <td className="p-3 text-right">
                  <span className="text-md text-foreground">{sector.intensity}</span>
                </td>

                <td className="p-3">
                  <div className="flex items-center justify-center space-x-1 h-6">
                    {sector.trend.map((point, idx) => (
                      <div
                        key={idx}
                        className="w-1 bg-primary/30 rounded-sm"
                        style={{ height: `${point * 0.3}px` }}
                      />
                    ))}
                  </div>
                </td>

                <td className="p-3">
                  <div className="flex items-center justify-center">
                    <ButtonWithIcon
                      variant="outline"
                      size="sm"
                      // text_font_size="text-md"
                      // text_line_height="leading-md"
                      // style={{ border: 'none', fontWeight: 'normal' }}
                      onClick={() => handleDrillDown(sector.sector)}
                    >
                      <Icon name="ExternalLink" size={12} />
                      <span className="ml-1">Details</span>
                    </ButtonWithIcon>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between text-md">
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">
              {selectedSectors.length > 0
                ? `${selectedSectors.length} sectors selected`
                : 'No sectors selected'}
            </span>
            {selectedSectors.length > 0 && (
              <ButtonWithIcon
                variant="outline"
                size="sm"
                // text_font_size="text-sm"
                // text_line_height="leading-md"
                // style={{ border: 'none' }}
              >
                <span className="ml-1">Compare Selected</span>
              </ButtonWithIcon>
            )}
          </div>

          <div className="text-muted-foreground text-md">
            Total: {sectorData.reduce((sum, sector) => sum + sector.emissions, 0).toLocaleString()}{' '}
            tCO₂e
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmissionsSummaryTable;
