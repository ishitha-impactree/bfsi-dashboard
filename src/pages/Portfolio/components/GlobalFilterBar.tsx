import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/ui/AppIcon';
import ButtonWithIcon from '../../../components/ui/ButtonWithIcon';

interface SelectOption {
  value: string;
  label: string;
}

interface FilterPayload {
  portfolio: string;
  category: string;
  region: string;
  dateRange: string;
}

interface GlobalFilterBarProps {
  onFiltersChange: (filters: FilterPayload) => void;
}

const GlobalFilterBar: React.FC<GlobalFilterBarProps> = ({ onFiltersChange }) => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>('global-equity');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('ytd');

  const portfolioOptions: SelectOption[] = [
    { value: 'global-equity', label: 'Global Equity Fund' },
    { value: 'emerging-markets', label: 'Emerging Markets Fund' },
    { value: 'sustainable-growth', label: 'Sustainable Growth Fund' },
    { value: 'tech-innovation', label: 'Tech Innovation Fund' },
    { value: 'infrastructure', label: 'Infrastructure Fund' },
  ];

  const categoryOptions: SelectOption[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'energy', label: 'Energy' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'materials', label: 'Materials' },
    { value: 'industrial', label: 'Industrial' },
  ];

  const regionOptions: SelectOption[] = [
    { value: 'all', label: 'All Regions' },
    { value: 'asia-pacific', label: 'Asia Pacific' },
    { value: 'americas', label: 'Americas' },
    { value: 'europe', label: 'Europe' },
    { value: 'emerging-markets', label: 'Emerging Markets' },
    { value: 'developed-markets', label: 'Developed Markets' },
  ];

  const dateRangeOptions: SelectOption[] = [
    { value: 'ytd', label: 'Year to Date' },
    { value: '1y', label: 'Last 12 Months' },
    { value: '3y', label: 'Last 3 Years' },
    { value: '5y', label: 'Last 5 Years' },
    { value: 'custom', label: 'Custom Range' },
  ];

  const handleFilterChange = (filterType: string, value: string) => {
    let updatedPortfolio = selectedPortfolio;
    let updatedCategory = selectedCategory;
    let updatedRegion = selectedRegion;
    let updatedDateRange = dateRange;

    switch (filterType) {
      case 'portfolio':
        updatedPortfolio = value;
        setSelectedPortfolio(value);
        break;
      case 'category':
        updatedCategory = value;
        setSelectedCategory(value);
        break;
      case 'region':
        updatedRegion = value;
        setSelectedRegion(value);
        break;
      case 'dateRange':
        updatedDateRange = value;
        setDateRange(value);
        break;
    }

    const newFilters: FilterPayload = {
      portfolio: updatedPortfolio,
      category: updatedCategory,
      region: updatedRegion,
      dateRange: updatedDateRange,
    };

    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    setSelectedPortfolio('global-equity');
    setSelectedCategory('all');
    setSelectedRegion('all');
    setDateRange('ytd');
    onFiltersChange({
      portfolio: 'global-equity',
      category: 'all',
      region: 'all',
      dateRange: 'ytd',
    });
  };

  const handleExport = () => {
    console.log('Exporting data with filters:', {
      portfolio: selectedPortfolio,
      category: selectedCategory,
      region: selectedRegion,
      dateRange: dateRange,
    });
  };

  return (
    <div className="bg-primary-foreground border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
          <Select
            label="Portfolio/Fund"
            options={portfolioOptions}
            value={selectedPortfolio}
            onChange={(value: string | number | (string | number)[]) => handleFilterChange('portfolio', typeof value === 'string' ? value : String(value))}
            className="w-full"
          />

          <Select
            label="Investment Category"
            options={categoryOptions}
            value={selectedCategory}
            onChange={(value: string | number | (string | number)[]) => handleFilterChange('category', typeof value === 'string' ? value : String(value))}
            className="w-full"
          />

          <Select
            label="Geographic Region"
            options={regionOptions}
            value={selectedRegion}
            onChange={(value: string | number | (string | number)[]) => handleFilterChange('region', typeof value === 'string' ? value : String(value))}
            className="w-full"
          />

          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={dateRange}
            onChange={(value: string | number | (string | number)[]) => handleFilterChange('dateRange', typeof value === 'string' ? value : String(value))}
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2 lg:ml-4">
          <ButtonWithIcon
            variant="outline"
            size="sm"
            onClick={handleReset}
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={16}
          >
            Reset Filters
          </ButtonWithIcon>

          <ButtonWithIcon
            variant="destructive"
            size="sm"
            onClick={handleExport}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export Data
          </ButtonWithIcon>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icon name="Database" size={16} className="text-accent-info" />
            <span>
              Last updated:{' '}
              {new Date().toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="CheckCircle" size={16} className="text-accent-success" />
            <span>Data quality: 98.5%</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="BarChart3" size={16} className="text-accent-warning" />
            <span>1,247 records loaded</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ButtonWithIcon
            variant="outline"
            size="sm"
            iconName="Filter"
            iconSize={16}
            iconPosition="left"
          >
            Advanced Filters
          </ButtonWithIcon>
          <ButtonWithIcon variant="ghost" size="sm" iconName="Settings" iconSize={16}>
            <span className="sr-only">Settings</span>
          </ButtonWithIcon>
        </div>
      </div>
    </div>
  );
};

export default GlobalFilterBar;