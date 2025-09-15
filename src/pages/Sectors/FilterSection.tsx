import React from 'react';
import Dropdown from '../../components/ui/Dropdown';
import Button from '../../components/ui/Button';

interface FilterSectionProps {
  className?: string;
}

const FilterSection = ({ className }: FilterSectionProps) => {
  return (
    <div className={`flex flex-col gap-1 justify-start items-center w-full sm:w-auto ${className || ''}`}>
      {/* Dropdowns Container */}
      <div className="flex flex-col gap-1 justify-start items-center w-full">
        <Dropdown
          placeholder="Sector"
          text_font_size="text-sm"
          text_font_family="Inter"
          text_font_weight="font-normal"
          text_line_height="leading-sm"
          text_text_align="left"
          text_color="text-text-primary"
          fill_background_color="bg-background-card"
          border_border="border border-border-primary"
          border_border_radius="rounded-lg"
          layout_gap="16px"
          layout_width="flex-1"
          padding="py-1 px-[10px] pr-[26px]"
          options={[
            { value: 'all', label: 'All' },
            { value: 'technology', label: 'Technology' },
            { value: 'healthcare', label: 'Healthcare' },
            { value: 'finance', label: 'Finance' }
          ]}
        />
        
        <Dropdown
          placeholder="Industry"
          text_font_size="text-sm"
          text_font_family="Inter"
          text_font_weight="font-normal"
          text_line_height="leading-sm"
          text_text_align="left"
          text_color="text-text-primary"
          fill_background_color="bg-background-card"
          border_border="border border-border-primary"
          border_border_radius="rounded-lg"
          layout_gap="16px"
          layout_width="flex-1"
          padding="py-1 px-[10px] pr-[26px]"
          options={[
            { value: 'all', label: 'All' },
            { value: 'software', label: 'Software & IT Services' },
            { value: 'oil', label: 'Crude Oil Petroleum & Natural Gas' },
            { value: 'manufacturing', label: 'Manufacturing' }
          ]}
        />
      </div>

      {/* Filter Button */}
      <Button
        text="Filter"
        text_font_size="text-md"
        text_font_family="Inter"
        text_font_weight="font-bold"
        text_line_height="leading-md"
        text_text_align="left"
        text_color="text-text-white"
        fill_background="bg-[linear-gradient(47deg,#232538_0%,#62689e_100%)]"
        border_border_radius="rounded-lg"
        layout_gap="34px"
        layout_width="flex-1"
        padding="py-1 px-[10px] pr-[26px]"
        className="w-full"
      />
    </div>
  );
};

export default FilterSection;