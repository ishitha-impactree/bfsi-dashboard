import React, { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';
import Select from '../../../components/ui/Select';
// import Button from '../../../components/ui/Button';
import ButtonWithIcon from '../../../components/ui/ButtonWithIcon';

// ---------- Types ----------
interface FilterState {
  scenario: string;
  horizon: string;
  categories: string[];
  refresh?: boolean;
}

interface GlobalControlsProps {
  onFiltersChange?: (filters: FilterState) => void;
}

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface RiskCategory {
  id: string;
  label: string;
  description: string;
  icon: string;
  color: string;
}

// ---------- Component ----------
const GlobalControls: React.FC<GlobalControlsProps> = ({ onFiltersChange }) => {
  const [selectedScenario, setSelectedScenario] = useState<string>('2C');
  const [selectedHorizon, setSelectedHorizon] = useState<string>('2030');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'transition',
    'physical',
    'regulatory',
  ]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const scenarioOptions: Option[] = [
    {
      value: '1.5C',
      label: '1.5°C Pathway',
      description: 'Aggressive climate action scenario',
    },
    {
      value: '2C',
      label: '2°C Pathway',
      description: 'Moderate climate action scenario',
    },
    {
      value: '3C',
      label: '3°C Pathway',
      description: 'Limited climate action scenario',
    },
  ];

  const horizonOptions: Option[] = [
    { value: '2030', label: '2030 (Short-term)' },
    { value: '2040', label: '2040 (Medium-term)' },
    { value: '2050', label: '2050 (Long-term)' },
  ];

  const riskCategories: RiskCategory[] = [
    {
      id: 'transition',
      label: 'Transition Risk',
      description: 'Policy, technology, and market shifts',
      icon: 'ArrowRightLeft',
      color: 'text-primary',
    },
    {
      id: 'physical',
      label: 'Physical Risk',
      description: 'Acute and chronic climate impacts',
      icon: 'Cloud',
      color: 'text-secondary',
    },
    {
      id: 'regulatory',
      label: 'Regulatory Risk',
      description: 'Compliance and reporting requirements',
      icon: 'FileText',
      color: 'text-accent',
    },
  ];

  const handleScenarioChange = (value: string) => {
    setSelectedScenario(value);
    onFiltersChange?.({
      scenario: value,
      horizon: selectedHorizon,
      categories: selectedCategories,
    });
  };

  const handleHorizonChange = (value: string) => {
    setSelectedHorizon(value);
    onFiltersChange?.({
      scenario: selectedScenario,
      horizon: value,
      categories: selectedCategories,
    });
  };

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(newCategories);
    onFiltersChange?.({
      scenario: selectedScenario,
      horizon: selectedHorizon,
      categories: newCategories,
    });
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
    onFiltersChange?.({
      scenario: selectedScenario,
      horizon: selectedHorizon,
      categories: selectedCategories,
      refresh: true,
    });
  };

  const formatLastUpdated = (date: Date): string => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
      style={{ background: 'white' }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Scenario Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center space-x-4">
            {/* <div className="w-48">
              <Select
                label="Climate Scenario"
                options={scenarioOptions}
                value={selectedScenario}
                onChange={handleScenarioChange}
                className="text-sm"
              />
            </div>

            <div className="w-40">
              <Select
                label="Time Horizon"
                options={horizonOptions}
                value={selectedHorizon}
                onChange={handleHorizonChange}
                className="text-sm"
              />
            </div> */}
          </div>

          {/* Risk Category Filters */}
          <div className="flex flex-col">
            <label className="text-md font-bold text-foreground mb-2">Risk Categories</label>
            <div className="flex flex-wrap gap-2">
              {riskCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryToggle(category.id)}
                  className={`
                    flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                    ${
                      // selectedCategories.includes(category.id)
                      //   ? 'bg-primary text-primary-foreground shadow-sm'
                      //   : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                      selectedCategories.includes(category.id)
                        ? 'bg-primary-background text-primary-foreground'
                        : 'bg-secondary-light text-text-primary hover:bg-primary-background hover:text-primary-foreground'
                    }
                  `}
                  title={category.description}
                >
                  <Icon name={category.icon} size={14} />
                  <span>{category.label}</span>
                  {selectedCategories.includes(category.id) && <Icon name="Check" size={12} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Actions & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
      

          <div className="flex items-center space-x-2">
            <ButtonWithIcon
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              iconName="RefreshCw"
            >
              Refresh
            </ButtonWithIcon>

            <ButtonWithIcon variant="outline" size="sm" iconName="Download">
              Export
            </ButtonWithIcon>

            <ButtonWithIcon variant="outline" size="sm" iconName="Settings">
              Settings
            </ButtonWithIcon>
          </div>
        </div>
      </div>

      {/* Active Filters Summary */}
      {selectedCategories.length < riskCategories.length && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={14} className="text-muted-foreground" />
            <span className="text-md text-muted-foreground">Active filters:</span>
            <div className="flex items-center space-x-2">
              {selectedCategories.map((categoryId) => {
                const category = riskCategories.find((c) => c.id === categoryId);
                if (!category) return null;
                return (
                  <span
                    key={categoryId}
                    className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-md rounded-md"
                  >
                    <Icon name={category.icon} size={12} />
                    <span style={{ color: '#6366F1' }}>{category.label}</span>
                  </span>
                );
              })}
            </div>
            <button
              onClick={() => setSelectedCategories(riskCategories.map((c) => c.id))}
              className="text-sm text-primary hover:text-primary/80 underline"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}

      {/* Scenario Description */}
      <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-accent mt-0.5" />
          <div>
            <h4 className="text-md font-medium text-foreground">
              {scenarioOptions.find((s) => s.value === selectedScenario)?.label} - {selectedHorizon}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              {scenarioOptions.find((s) => s.value === selectedScenario)?.description}
              {selectedHorizon === '2030' && ' with near-term policy implementation.'}
              {selectedHorizon === '2040' && ' with medium-term transition impacts.'}
              {selectedHorizon === '2050' && ' with long-term structural changes.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalControls;
