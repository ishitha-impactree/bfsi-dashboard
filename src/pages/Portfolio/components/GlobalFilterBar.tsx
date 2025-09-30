import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/ui/AppIcon';

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
    { value: 'infrastructure', label: 'Infrastructure Fund' }
  ];

  const categoryOptions: SelectOption[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'energy', label: 'Energy' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'financials', label: 'Financials' },
    { value: 'industrials', label: 'Industrials' },
    { value: 'materials', label: 'Materials' }
  ];

  const regionOptions: SelectOption[] = [
    { value: 'all', label: 'All Regions' },
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia-pacific', label: 'Asia Pacific' },
    { value: 'emerging-markets', label: 'Emerging Markets' },
    { value: 'developed-markets', label: 'Developed Markets' }
  ];

  const dateRangeOptions: SelectOption[] = [
    { value: 'ytd', label: 'Year to Date' },
    { value: '1y', label: 'Last 12 Months' },
    { value: '3y', label: 'Last 3 Years' },
    { value: '5y', label: 'Last 5 Years' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleFilterChange = (filterType: string, value: string) => {
    // Update the state first
    switch (filterType) {
      case 'portfolio':
        setSelectedPortfolio(value);
        break;
      case 'category':
        setSelectedCategory(value);
        break;
      case 'region':
        setSelectedRegion(value);
        break;
      case 'dateRange':
        setDateRange(value);
        break;
    }

    // Then call onFiltersChange with updated values
    const newFilters: FilterPayload = {
      portfolio: filterType === 'portfolio' ? value : selectedPortfolio,
      category: filterType === 'category' ? value : selectedCategory,
      region: filterType === 'region' ? value : selectedRegion,
      dateRange: filterType === 'dateRange' ? value : dateRange
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
      dateRange: 'ytd'
    });
  };

  const handleExport = () => {
    // Export functionality
    console.log('Exporting data with filters:', {
      portfolio: selectedPortfolio,
      category: selectedCategory,
      region: selectedRegion,
      dateRange: dateRange
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-elevation-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          <Select
            label="Portfolio/Fund"
            options={portfolioOptions}
            value={selectedPortfolio}
            onChange={(value: string) => handleFilterChange('portfolio', value)}
            className="w-full"
          />
          
          <Select
            label="Investment Category"
            options={categoryOptions}
            value={selectedCategory}
            onChange={(value: string) => handleFilterChange('category', value)}
            className="w-full"
          />
          
          <Select
            label="Geographic Region"
            options={regionOptions}
            value={selectedRegion}
            onChange={(value: string) => handleFilterChange('region', value)}
            className="w-full"
          />
          
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={dateRange}
            onChange={(value: string) => handleFilterChange('dateRange', value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2 lg:ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={16}
          >
            Reset Filters
          </Button>
          
          <Button
            variant="default"
            size="sm"
            onClick={handleExport}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export Data
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icon name="Database" size={16} />
            <span>Last updated: {new Date().toLocaleString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span>Data quality: 98.5%</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="BarChart3" size={16} className="text-primary" />
            <span>1,247 records loaded</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            iconName="Filter" 
            iconSize={16}
            iconPosition="left"
          >
            Advanced Filters
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            iconName="Settings" 
            iconSize={16}
          >
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GlobalFilterBar;