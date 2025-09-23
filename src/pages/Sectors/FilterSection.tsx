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
        className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 font-inter"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? 'text-gray-800' : 'text-gray-400'}>
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
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm ${
                value === option.value ? 'bg-gray-100 font-medium' : ''
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
    <div className={`flex flex-col gap-3 p-4 bg-[#1e293b] rounded-lg ${className || ''}`}>
      <CustomDropdown
        placeholder="Sector"
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
      
      <CustomDropdown
        placeholder="Industry"
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
      
      <Button
        text="Filter"
        text_font_size="text-sm"
        text_font_family="Inter"
        text_font_weight="font-bold"
        text_line_height="leading-sm"
        text_text_align="center"
        text_color="text-white"
        fill_background="bg-gradient-to-r from-[#4E67E5] to-[#36489A]"
        border_border_radius="rounded-lg"
        layout_width="w-full"
        padding="py-2.5 px-4"
        className="hover:from-[#36489A] hover:to-[#2A376B] transition-colors flex items-center justify-between"
      >
        <span className="flex-1">Filter</span>
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Button>
    </div>
  );
};

export default FilterSection;