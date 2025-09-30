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
      company: 'Apple Inc.',
      ticker: 'AAPL',
      sector: 'Technology',
      weight: 4.2,
      emissions: 12.3,
      esgScore: 85,
      carbonIntensity: 8.7,
      scope1: 4.2,
      scope2: 3.8,
      scope3: 4.3,
      reduction: -5.2,
      marketValue: 125000000,
      shares: 850000,
      lastUpdated: '2024-09-20',
    },
    {
      id: 2,
      company: 'Microsoft Corp.',
      ticker: 'MSFT',
      sector: 'Technology',
      weight: 3.8,
      emissions: 8.7,
      esgScore: 88,
      carbonIntensity: 6.2,
      scope1: 2.8,
      scope2: 2.4,
      scope3: 3.5,
      reduction: -7.1,
      marketValue: 112000000,
      shares: 320000,
      lastUpdated: '2024-09-20',
    },
    {
      id: 3,
      company: 'ExxonMobil Corp.',
      ticker: 'XOM',
      sector: 'Energy',
      weight: 2.1,
      emissions: 89.4,
      esgScore: 42,
      carbonIntensity: 156.8,
      scope1: 45.2,
      scope2: 18.7,
      scope3: 25.5,
      reduction: -2.1,
      marketValue: 62000000,
      shares: 580000,
      lastUpdated: '2024-09-19',
    },
    {
      id: 4,
      company: 'Tesla Inc.',
      ticker: 'TSLA',
      sector: 'Technology',
      weight: 2.9,
      emissions: 15.6,
      esgScore: 78,
      carbonIntensity: 11.2,
      scope1: 5.8,
      scope2: 4.2,
      scope3: 5.6,
      reduction: -12.3,
      marketValue: 85000000,
      shares: 420000,
      lastUpdated: '2024-09-20',
    },
    {
      id: 5,
      company: 'Johnson & Johnson',
      ticker: 'JNJ',
      sector: 'Healthcare',
      weight: 2.5,
      emissions: 22.1,
      esgScore: 72,
      carbonIntensity: 18.9,
      scope1: 8.7,
      scope2: 6.2,
      scope3: 7.2,
      reduction: -3.8,
      marketValue: 74000000,
      shares: 460000,
      lastUpdated: '2024-09-20',
    },
    {
      id: 6,
      company: 'JPMorgan Chase',
      ticker: 'JPM',
      sector: 'Financials',
      weight: 3.1,
      emissions: 18.9,
      esgScore: 65,
      carbonIntensity: 14.2,
      scope1: 6.8,
      scope2: 5.4,
      scope3: 6.7,
      reduction: -4.5,
      marketValue: 91000000,
      shares: 620000,
      lastUpdated: '2024-09-19',
    },
    {
      id: 7,
      company: 'Chevron Corp.',
      ticker: 'CVX',
      sector: 'Energy',
      weight: 1.8,
      emissions: 76.2,
      esgScore: 38,
      carbonIntensity: 142.5,
      scope1: 38.9,
      scope2: 15.2,
      scope3: 22.1,
      reduction: -1.8,
      marketValue: 53000000,
      shares: 340000,
      lastUpdated: '2024-09-19',
    },
    {
      id: 8,
      company: 'Pfizer Inc.',
      ticker: 'PFE',
      sector: 'Healthcare',
      weight: 2.2,
      emissions: 19.4,
      esgScore: 69,
      carbonIntensity: 16.8,
      scope1: 7.2,
      scope2: 5.8,
      scope3: 6.4,
      reduction: -6.2,
      marketValue: 65000000,
      shares: 1200000,
      lastUpdated: '2024-09-20',
    },
  ];

  const sectorOptions = [
    { value: 'all', label: 'All Sectors' },
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
                onChange={setSectorFilter}
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
                        {formatNumber(holding.emissions)}
                      </div>
                      <div className="text-sm text-text-muted">tCO2e/$M</div>
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
                        isPositiveChange ? 'text-accent-danger' : 'text-accent-success'
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
