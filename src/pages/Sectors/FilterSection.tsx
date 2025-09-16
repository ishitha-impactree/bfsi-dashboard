import React, { useState } from 'react';
import Button from '../../components/ui/Button';

interface FilterSectionProps {
  className?: string;
}

interface DropdownProps {
  placeholder: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const CustomDropdown = ({ placeholder, options, value, onChange, className }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={`relative ${className}`}>
      <button
        className="w-full flex items-center justify-between bg-background-card border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary font-inter"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? 'text-text-primary' : 'text-text-secondary'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-background-card border border-border-primary rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-3 py-2 cursor-pointer hover:bg-background-light text-sm ${
                value === option.value ? 'bg-background-light font-medium' : ''
              }`}
              onClick={() => {
                onChange?.(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterSection = ({ className }: FilterSectionProps) => {
  const [sector, setSector] = useState('');
  const [industry, setIndustry] = useState('');

  return (
    <div className={`flex flex-col gap-4 w-full ${className || ''}`}>
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-text-primary font-inter">Filters</h3>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-text-secondary font-inter">Sector</label>
          <CustomDropdown
            placeholder="Select Sector"
            value={sector}
            onChange={setSector}
            options={[
              { value: 'all', label: 'All Sectors' },
              { value: 'technology', label: 'Technology' },
              { value: 'healthcare', label: 'Healthcare' },
              { value: 'financial', label: 'Financial' },
              { value: 'energy', label: 'Energy' },
              { value: 'consumer', label: 'Consumer Goods' },
              { value: 'industrials', label: 'Industrials' },
              { value: 'utilities', label: 'Utilities' },
              { value: 'real_estate', label: 'Real Estate' },
              { value: 'materials', label: 'Materials' },
              { value: 'communication', label: 'Communication Services' }
            ]}
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-text-secondary font-inter">Industry</label>
          <CustomDropdown
            placeholder="Select Industry"
            value={industry}
            onChange={setIndustry}
            options={[
              { value: 'all', label: 'All Industries' },
              { value: 'software', label: 'Software & IT Services' },
              { value: 'oil_gas', label: 'Crude Oil Petroleum & Natural Gas' },
              { value: 'manufacturing', label: 'Manufacturing' },
              { value: 'pharmaceuticals', label: 'Pharmaceuticals' },
              { value: 'banking', label: 'Banking & Financial Services' },
              { value: 'insurance', label: 'Insurance' },
              { value: 'renewable_energy', label: 'Renewable Energy' },
              { value: 'retail', label: 'Retail' },
              { value: 'telecom', label: 'Telecommunications' },
              { value: 'construction', label: 'Construction' },
              { value: 'automotive', label: 'Automotive' },
              { value: 'agriculture', label: 'Agriculture' },
              { value: 'transportation', label: 'Transportation & Logistics' },
              { value: 'media', label: 'Media & Entertainment' }
            ]}
          />
        </div>
      </div>
      
      <Button
        text="Apply Filters"
        text_font_size="text-sm"
        text_font_family="Inter"
        text_font_weight="font-bold"
        text_line_height="leading-sm"
        text_text_align="center"
        text_color="text-white"
        fill_background="bg-primary-blue"
        border_border_radius="rounded-lg"
        layout_width="w-full"
        padding="py-2.5 px-4"
        className="mt-2 hover:bg-primary-darkblue transition-colors"
      />
      
      {(sector || industry) && (
        <Button
          text="Clear Filters"
          text_font_size="text-sm"
          text_font_family="Inter"
          text_font_weight="font-medium"
          text_line_height="leading-sm"
          text_text_align="center"
          text_color="text-text-secondary"
          fill_background="bg-transparent"
          border_border_radius="rounded-lg"
          layout_width="w-full"
          padding="py-2.5 px-4"
          className="mt-1 hover:bg-background-light transition-colors border border-border-primary"
          onClick={() => {
            setSector('');
            setIndustry('');
          }}
        />
      )}
    </div>
  );
};

export default FilterSection;