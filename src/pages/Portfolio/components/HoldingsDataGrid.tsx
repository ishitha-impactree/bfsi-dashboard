import React, { useState, useMemo } from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import ButtonWithIcon from '../../../components/ui/ButtonWithIcon';

interface Holding {
  id: number;
  company: string;
  ticker: string;
  sector: string;
  weight: number;
  emissions: number;
  esgScore: number;
  carbonIntensity: number;
  scope1: number;
  scope2: number;
  scope3: number;
  reduction: number;
  marketValue: number;
  shares: number;
  lastUpdated: string;
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

interface ESGRating {
  rating: string;
  color: string;
}

const HoldingsDataGrid: React.FC = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'emissions', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 10;

  const holdingsData: Holding[] = [
    {
      id: 1,
      company: 'Motherson Sumi Wiring India Ltd. (MSWIL)',
      ticker: 'MSWIL',
      sector: 'Automotive',
      weight: 12.5,
      emissions: 85000,
      esgScore: 72,
      carbonIntensity: 10.5,
      scope1: 5.5,
      scope2: 3.5,
      scope3: 1.5,
      reduction: 8.3, 
      marketValue: 26750000,
      shares: 1500000,
      lastUpdated: '2024-10-13',
    },
    {
      id: 2,
      company: 'Yazaki (Yazaki India)',
      ticker: 'YAZAKI',
      sector: 'Automotive',
      weight: 8,
      emissions: 60000,
      esgScore: 68,
      carbonIntensity: 9.8,
      scope1: 5.0,
      scope2: 3.0,
      scope3: 1.8,
      reduction: 7, 
      marketValue: 14500000,
      shares: 800000,
      lastUpdated: '2024-10-13',
    },
    {
      id: 3,
      company: 'LEONI India (LEONI Wiring Systems)',
      ticker: 'LEONI',
      sector: 'Automotive',
      weight: 7,
      emissions: 55000,
      esgScore: 65,
      carbonIntensity: 8.5,
      scope1: 4.5,
      scope2: 2.5,
      scope3: 1.5,
      reduction: 6, 
      marketValue: 13000000,
      shares: 700000,
      lastUpdated: '2024-10-13',
    },
    {
      id: 4,
      company: 'Aptiv Components India',
      ticker: 'APTIV',
      sector: 'Automotive',
      weight: 10,
      emissions: 90000,
      esgScore: 75,
      carbonIntensity: 11.2,
      scope1: 6.0,
      scope2: 4.0,
      scope3: 1.2,
      reduction: 9.5, 
      marketValue: 22000000,
      shares: 1100000,
      lastUpdated: '2024-10-13',
    },
    {
      id: 5,
      company: 'Bosch Limited (India)',
      ticker: 'BOSCH',
      sector: 'Automotive',
      weight: 15,
      emissions: 120000,
      esgScore: 80,
      carbonIntensity: 12.0,
      scope1: 7.0,
      scope2: 4.0,
      scope3: 1.0,
      reduction: 7.8, 
      marketValue: 45000000,
      shares: 2000000,
      lastUpdated: '2024-10-13',
    },
    {
      id: 6,
      company: 'Sona Comstar (Sona BLW / Sona Comstar)',
      ticker: 'SONA',
      sector: 'Automotive',
      weight: 9,
      emissions: 50000,
      esgScore: 70,
      carbonIntensity: 7.5,
      scope1: 3.5,
      scope2: 2.5,
      scope3: 1.5,
      reduction: 12,
      marketValue: 26900000,
      shares: 1000000,
      lastUpdated: '2024-10-13',
    },
    {
      id: 7,
      company: 'Uno Minda (Minda Corporation)',
      ticker: 'MINDA',
      sector: 'Automotive',
      weight: 6.5,
      emissions: 40000,
      esgScore: 66,
      carbonIntensity: 6.0,
      scope1: 3.0,
      scope2: 2.0,
      scope3: 1.0,
      reduction: 5.5, 
      marketValue: 11000000,
      shares: 650000,
      lastUpdated: '2024-10-13',
    },
    {
      id: 8,
      company: 'Furukawa Minda Electric (FME)',
      ticker: 'FME',
      sector: 'Automotive',
      weight: 5.5,
      emissions: 35000,
      esgScore: 64,
      carbonIntensity: 5.8,
      scope1: 2.8,
      scope2: 1.8,
      scope3: 1.2,
      reduction: 5, 
      marketValue: 9500000,
      shares: 550000,
      lastUpdated: '2024-10-13',
    },
    {
      id: 9,
      company: 'Varroc Engineering Limited',
      ticker: 'VARROC',
      sector: 'Automotive',
      weight: 11,
      emissions: 75000,
      esgScore: 69,
      carbonIntensity: 10.0,
      scope1: 5.0,
      scope2: 3.0,
      scope3: 2.0,
      reduction: 8.8, 
      marketValue: 20000000,
      shares: 1300000,
      lastUpdated: '2024-10-13',
    },
    {
      id: 10,
      company: 'Lumax Industries Limited (LIL)',
      ticker: 'LIL',
      sector: 'Automotive',
      weight: 5,
      emissions: 30000,
      esgScore: 63,
      carbonIntensity: 5.0,
      scope1: 2.5,
      scope2: 1.5,
      scope3: 1.0,
      reduction: 4.5, 
      marketValue: 8000000,
      shares: 500000,
      lastUpdated: '2024-10-13',
    },
  ];

  const sectorOptions = [
    { value: 'all', label: 'All Sectors' },
    { value: 'Automotive', label: 'Automotive' }, 
    { value: 'Technology', label: 'Technology' },
    { value: 'Energy', label: 'Energy' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Financials', label: 'Financials' },
    { value: 'Industrials', label: 'Industrials' },
    { value: 'Materials', label: 'Materials' },
  ];

  const filteredData = useMemo(() => {
    return holdingsData.filter((item) => {
      const matchesSearch =
        item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ticker.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = sectorFilter === 'all' || item.sector === sectorFilter;
      return matchesSearch && matchesSector;
    });
  }, [searchTerm, sectorFilter]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a: any, b: any) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    });
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage]);

  const totalPages: number = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === paginatedData.length ? [] : paginatedData.map((item) => item.id)
    );
  };

  const getSortIcon = (key: string): string => {
    if (sortConfig.key !== key) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getESGRating = (score: number): ESGRating => {
    if (score >= 80) return { rating: 'A', color: 'bg-accent-success text-primary-foreground' };
    if (score >= 70) return { rating: 'B', color: 'bg-accent-warning text-primary-foreground' };
    if (score >= 60) return { rating: 'C', color: 'bg-accent-warning text-primary-foreground' };
    if (score >= 50) return { rating: 'D', color: 'bg-accent-danger text-primary-foreground' };
    return { rating: 'E', color: 'bg-accent-danger text-primary-foreground' };
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number, decimals: number = 1): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  };

  return (
    <div className="bg-primary-foreground border border-border rounded-lg px-8 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Holdings Emissions Data</h3>
            <p className="text-sm text-text-muted">
              Detailed emissions breakdown by holding ({sortedData.length} companies)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:w-64">
              <Input
                type="search"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="w-full sm:w-48">
              <Select
                options={sectorOptions}
                value={sectorFilter}
                // onChange={setSectorFilter}
                placeholder="Filter by sector"
              />
            </div>

            <ButtonWithIcon
              variant="outline"
              size="default"
              iconName="Download"
              iconPosition="left"
              iconSize={16}
              disabled={selectedRows.length === 0}
            >
              Export ({selectedRows.length})
            </ButtonWithIcon>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>

              <th className="p-4 text-left min-w-[200px]">
                <button
                  onClick={() => handleSort('company')}
                  className="flex items-center gap-2 font-medium text-foreground hover:text-primary"
                >
                  Company
                  <Icon name={getSortIcon('company')} size={14} />
                </button>
              </th>

              <th className="p-4 text-left">
                <button
                  onClick={() => handleSort('sector')}
                  className="flex items-center gap-2 font-medium text-foreground hover:text-primary"
                >
                  Sector
                  <Icon name={getSortIcon('sector')} size={14} />
                </button>
              </th>

              <th className="p-4 text-right">
                <button
                  onClick={() => handleSort('weight')}
                  className="flex items-center gap-2 font-medium text-foreground hover:text-primary ml-auto"
                >
                  Weight %
                  <Icon name={getSortIcon('weight')} size={14} />
                </button>
              </th>

              <th className="p-4 text-right">
                <button
                  onClick={() => handleSort('emissions')}
                  className="flex items-center gap-2 font-medium text-foreground hover:text-primary ml-auto"
                >
                  Emissions
                  <Icon name={getSortIcon('emissions')} size={14} />
                </button>
              </th>

              <th className="p-4 text-center">ESG</th>

              <th className="p-4 text-right">
                <button
                  onClick={() => handleSort('reduction')}
                  className="flex items-center gap-2 font-medium text-foreground hover:text-primary ml-auto"
                >
                  YoY Change
                  <Icon name={getSortIcon('reduction')} size={14} />
                </button>
              </th>

              <th className="p-4 text-right">
                <button
                  onClick={() => handleSort('marketValue')}
                  className="flex items-center gap-2 font-medium text-foreground hover:text-primary ml-auto"
                >
                  Market Value
                  <Icon name={getSortIcon('marketValue')} size={14} />
                </button>
              </th>

              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((holding) => {
              const esgRating = getESGRating(holding.esgScore);
              const isSelected = selectedRows.includes(holding.id);
              const isPositiveChange = holding.reduction > 0;

              return (
                <tr
                  key={holding.id}
                  className={`border-b border-border hover:bg-muted/30 transition-colors duration-150 ${
                    isSelected ? 'bg-muted/50' : ''
                  }`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSelectRow(holding.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-foreground">{holding.company}</div>
                      <div className="text-sm text-text-muted">{holding.ticker}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{holding.sector}</span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="font-medium text-foreground">
                      {formatNumber(holding.weight)}%
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div>
                      <div className="font-medium text-foreground">
                        {/* Emissions value used directly as 'tons CO2 eq / year' */}
                        {formatNumber(holding.emissions, 0)}
                      </div>
                      <div className="text-sm text-text-muted">tCO2e/yr</div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-6 text-sm font-medium rounded ${esgRating.color}`}
                    >
                      {esgRating.rating}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div
                      className={`flex items-center justify-end gap-1 ${
                        isPositiveChange ? 'text-accent-success' : 'text-accent-danger'
                      }`}
                    >
                      <Icon name={isPositiveChange ? 'TrendingUp' : 'TrendingDown'} size={14} />
                      <span className="font-medium">{Math.abs(holding.reduction).toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className="font-medium text-foreground">
                      {formatCurrency(holding.marketValue)}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <ButtonWithIcon
                      variant="outline"
                      size="sm"
                      iconName="ExternalLink"
                      iconSize={14}
                    >
                      View
                    </ButtonWithIcon>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-text-muted">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length}{' '}
            holdings
          </div>

          <div className="flex items-center gap-2">
            <ButtonWithIcon
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              iconName="ChevronLeft"
              iconSize={16}
            >
              Previous
            </ButtonWithIcon>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <ButtonWithIcon
                    key={pageNum}
                    variant={currentPage === pageNum ? 'destructive' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </ButtonWithIcon>
                );
              })}
            </div>

            <ButtonWithIcon
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              iconName="ChevronRight"
              iconSize={16}
            >
              Next
            </ButtonWithIcon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoldingsDataGrid;