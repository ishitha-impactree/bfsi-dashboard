'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Icon from '../../components/ui/AppIcon';
import ESGChart from '../../pages/Sectors/components/ESGChart';
import MetricsCard from '../../pages/Sectors/components/MetricsCard';
import CumulativeRatingsChart from './CumulativeRatingsChart';
import KeyEnergyConsumersChart from './KeyEnergyConsumersChart';
import EnergyUsageChart from './EnerygyUsageChart';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  placeholder: string;
  options: DropdownOption[];
  className?: string;
  onChange: (value: string) => void;
}

interface ButtonProps {
  text: string;
  onClick: () => void;
  fill_background_color?: string;
  text_color?: string;
  border_border_radius?: string;
  layout_width?: string;
  padding?: string;
  position?: string;
  variant?: 'primary' | 'secondary' | 'medium';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ placeholder, options, className = '', onChange }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <select
      className={`p-2 border border-gray-300 rounded-md ${className}`}
      value={selectedValue}
      onChange={handleChange}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  fill_background_color = 'bg-gray-200',
  text_color = 'text-black',
  border_border_radius = 'rounded-md',
  layout_width = 'w-auto',
  padding = 'px-4 py-2',
  className = '',
}) => {
  return (
    <button
      className={`
        ${fill_background_color} 
        ${text_color} 
        ${border_border_radius} 
        ${layout_width} 
        ${padding} 
        ${className} 
        transition duration-150 ease-in-out
      `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

interface Company {
  id: string;
  name: string;
  selected?: boolean;
}

interface ESGData {
  exposure: string;
  industryScore: string;
  pchi: string;
  environment: string;
  social: string;
  governance: string;
}

interface ChartDataPoint {
  month: string;
  value: number;
}

const SearchView = ({
  placeholder,
  className = '',
  onSearch,
  onChange,
}: {
  placeholder: string;
  className?: string;
  onSearch: () => void;
  onChange: () => void;
}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => {
          onChange();
        }}
      />
    </div>
  );
};

const EditText = ({
  placeholder,
  fill_background_color = 'bg-white',
  border_border = '1px solid #e0e5ee',
  className = '',
  onClick,
  onChange,
}: {
  placeholder: string;
  fill_background_color?: string;
  border_border?: string;
  className?: string;
  onClick: () => void;
  onChange: () => void;
}) => {
  return (
    <div
      className={`flex justify-between items-center ${fill_background_color} border rounded-lg p-3 ${className} hover:bg-[#fffded]`}
      style={{ border: border_border }}
      onClick={onClick}
    >
      <span className="text-gray-700">{placeholder}</span>
      <Icon name="ChevronsRight" size={14} />
    </div>
  );
};

const CompaniesStatistics = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>('Toyota Motor Company');
  const [activeTab, setActiveTab] = useState<string>('Overview');
  const [esgData, setESGData] = useState<ESGData | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');

  const [searchTerm, setSearchTerm] = useState('');

  // Filter modules based on search term
  const filteredCompanies = Array.isArray(companies)
    ? companies.filter((company: any) =>
        company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const sectorOptions = [
    { value: 'all', label: 'All' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'energy', label: 'Energy' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'financials', label: 'Financials' },
    { value: 'industrials', label: 'Industrials' },
    { value: 'consumer', label: 'Consumer' },
    { value: 'materials', label: 'Materials' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'utilities', label: 'Utilities' },
  ];

  const industryOptions = [
    { value: 'all', label: 'All' },
    { value: 'automobiles', label: 'Automobiles (Including Ancillaries)' },
    { value: 'aerospace', label: 'Aerospace & Defense' },
    { value: 'logistics', label: 'Logistics & Shipping' },
    { value: 'software', label: 'Software & IT Services' },
    { value: 'pharmaceuticals', label: 'Drugs and Pharmaceuticals' },
    { value: 'real-estate', label: 'Commercial Real Estate' },
    { value: 'oil-gas', label: 'Crude Oil Petroleum and Natural Gas' },
    { value: 'banking', label: 'Banking & Financial Services' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'telecom', label: 'Telecommunications' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'construction', label: 'Construction & Engineering' },
    { value: 'mining', label: 'Mining & Metals' },
  ];

  useEffect(() => {
    const loadDashboardData = () => {
      setCompanies([
        { id: '1', name: 'Toyota Motor Company', selected: true },
        { id: '2', name: 'Volkswagen AG' },
        { id: '3', name: 'Mercedes-Benz Group' },
        { id: '4', name: 'Ford Motor Company' },
        { id: '5', name: 'General Motors Company' },
        { id: '6', name: 'Hyundai Motor Group' },
        { id: '7', name: 'Fiat Chrysler Automobiles N.V.' },
        { id: '8', name: 'Mitsubishi Motors' },
      ]);

      setESGData({
        exposure: '₹ 552.2 Million',
        industryScore: '68%',
        pchi: '46%',
        environment: '54%',
        social: '69%',
        governance: '75%',
      });

      setChartData([
        { month: 'Jan', value: 70 },
        { month: 'Feb', value: 75 },
        { month: 'Mar', value: 72 },
        { month: 'Apr', value: 78 },
        { month: 'May', value: 80 },
        { month: 'Jun', value: 76 },
        { month: 'Jul', value: 82 },
        { month: 'Aug', value: 85 },
        { month: 'Sep', value: 83 },
        { month: 'Oct', value: 88 },
        { month: 'Nov', value: 86 },
        { month: 'Dec', value: 90 },
      ]);

      setLoading(false);
    };

    loadDashboardData();
  }, []);

  const handleCompanySelect = (companyName: string) => {
    setSelectedCompany(companyName);
    setCompanies((prev) =>
      prev.map((company) => ({
        ...company,
        selected: company.name === companyName,
      }))
    );
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSectorChange = (value: string) => {
    setSelectedSector(value);
    // Reset industry when sector changes
    setSelectedIndustry('all');
  };

  const handleIndustryChange = (value: string) => {
    setSelectedIndustry(value);
  };

  const tabs = [
    'Overview',
    'Human Capacity',
    'Resource Footprint',
    'Resource Use',
    'Climate Stewardship',
    'Aspiration Need',
    'Growth Need',
    'Community Engagement',
  ];

  const emptyFunction = () => {};
  const emptyStringFunction = (value: string) => {};

  if (loading) {
    return <div>Loading...</div>;
  }

  const esgRatings = [
    {
      percentage: '72%',
      title: 'Portfolio Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '45%',
      title: 'Portfolio Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '87%',
      title: 'Portfolio Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  const esgRatings2 = [
    {
      percentage: '62%',
      title: 'Portfolio Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '58%',
      title: 'Portfolio Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '75%',
      title: 'Portfolio Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  return (
    <div className="w-full bg-[#f8fafc]">
      <Header />
      <div
        className="bg-card border-b border-border shadow-elevation-1 px-8"
        style={{ background: 'white', marginTop: '70px' }}
      >
        <div className="w-100 mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Companies Statistics</h1>
              <p className="text-md text-muted-foreground mt-1">
                Detailed ESG analysis and risk assessment for portfolio companies
              </p>
            </div>
            {/* <div className="flex justify-end mb-0 sm:mb-8 lg:mb-0">
                <div className="flex bg-gray-200 rounded-xl overflow-hidden w-[380px] h-[25px] p-1">
                  {timeButtons.map((button, index) => (
                    <button
                      key={button.label}
                      className={`flex-1 flex items-center justify-center text-sm font-semibold font-Inter text-center transition-all duration-200 ${
                        button.active
                          ? 'bg-primary-background text-text-white rounded-lg'
                          : 'bg-transparent text-text-secondary hover:bg-purple-200'
                      }`}
                      onClick={() => handleTimeButtonClick(button.label)}
                    >
                      {button.label}
                    </button>
                  ))}
                </div>
              </div> */}
            {/* Filters in Header */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end items-start sm:items-center w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                <Dropdown
                  placeholder="Sector"
                  options={sectorOptions}
                  className="w-full sm:w-40 text-sm"
                  onChange={handleSectorChange}
                />
                <Dropdown
                  placeholder="Industry"
                  options={industryOptions}
                  className="w-full sm:w-48 text-sm"
                  onChange={handleIndustryChange}
                />
                <Button
                  text="Apply Filters"
                  // fill_background_color="bg-gradient-to-r from-[#232538] to-[#62689e]"
                  fill_background_color="bg-accent-info"
                  text_color="text-white"
                  layout_width="w-full sm:w-auto"
                  padding="px-4 py-2"
                  onClick={emptyFunction}
                  className="text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 w-full px-8">
        <div className="w-full px-4 py-4">
          <div className="flex flex-col lg:flex-row justify-start items-start w-full gap-4">
            <div className="w-full lg:w-1/4 bg-white border border-[#b7c1d77f] rounded-xl p-4 h-[80vh] sticky top-[70px] z-0">
              <div className="flex flex-col gap-3 justify-start items-start w-full">
                <span className="text-md font-medium">Companies</span>

                <div className="flex flex-col gap-3 justify-start items-center w-full">
                  {/* Search field with icon on the right */}
                  {/* <div className="relative w-full">
                    <SearchView
                      placeholder="Search"
                      className="w-full pr-10" // Added right padding to make space for icon
                      onSearch={emptyFunction}
                      onChange={emptyFunction}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div> */}

                  <input
                    type="text"
                    placeholder="Search companies..."
                    className="border border-border w-full p-2 text-sm rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <div className="flex flex-col gap-3 w-full max-h-[500px] overflow-y-auto">
                    {filteredCompanies.map((company) => (
                      <EditText
                        key={company.id}
                        placeholder={company.name}
                        fill_background_color={company.selected ? 'bg-[#fffded]' : 'bg-white'}
                        border_border={company.selected ? '1px solid #fba900' : '1px solid #e0e5ee'}
                        className="w-full cursor-pointer text-sm"
                        onClick={() => handleCompanySelect(company.name)}
                        onChange={emptyFunction}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-3/4 border border-[#b7c1d77f] rounded-xl p-4">
              <div className="flex flex-col gap-4 justify-start items-center w-full">
                {/* Company Overview Info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 px-3">
                  <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4">
                    <span className="text-lg font-medium text-[#29303f]">
                      <span className="text-[#29303f7f]">Sector: </span>
                      <span className="text-[#29303f]">
                        {sectorOptions.find((s) => s.value === selectedSector)?.label || 'All'}
                      </span>
                    </span>
                    <span className="text-lg font-medium text-[#29303f]">
                      <span className="text-[#29303f7f]">Industry: </span>
                      <span className="text-[#29303f]">
                        {industryOptions.find((i) => i.value === selectedIndustry)?.label || 'All'}
                      </span>
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[#29303f7f]">
                    Compared to previous 12 months
                  </span>
                </div>

                {/* Tabs */}
                <div className="w-full overflow-x-auto px-3">
                  <div className="flex flex-row gap-2 justify-start items-center min-w-max">
                    {tabs.map((tab) => (
                      <Button
                        key={tab}
                        text={tab}
                        fill_background_color={activeTab === tab ? 'bg-[#7856ff]' : 'bg-[#ebeeee]'}
                        text_color={activeTab === tab ? 'text-white' : 'text-primary'}
                        border_border_radius="rounded-lg"
                        layout_width="auto"
                        padding="px-3 py-3"
                        onClick={() => handleTabChange(tab)}
                        className="whitespace-nowrap text-sm hover:bg-[#7856ff] hover:text-white"
                      />
                    ))}
                  </div>
                </div>
                {selectedCompany === 'Toyota Motor Company' && activeTab === 'Overview' && (
                  <>
                    <div className="flex flex-col lg:flex-row gap-3 justify-start items-start w-full">
                      {/* <div className="flex flex-col gap-3 justify-start items-center w-full lg:w-[50%]"> */}
                      <div className="flex flex-col gap-3 justify-start w-full lg:w-[50%]">
                        {/* <div className="w-full bg-background-light rounded-xl p-3"> */}
                        <MetricsCard
                          title="Exposure"
                          value="$ 55,699"
                          unit="Million"
                          changePercentage="19%"
                          isPositive={true}
                          hasLeftBorder={true}
                        />
                        {/* </div> */}

                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                          <div className="flex flex-col gap-3 w-full sm:w-1/2">
                            {/* <div className="w-full bg-background-light rounded-xl p-3"> */}
                            <MetricsCard
                              title="Industry ESG Score"
                              value="68%"
                              changePercentage="40%"
                              isPositive={true}
                              hasLeftBorder={true}
                            />
                            {/* </div> */}
                            {/* <div className="w-full bg-background-light rounded-xl p-3"> */}
                            <MetricsCard
                              title="PCHI"
                              value="28%"
                              changePercentage="40%"
                              isPositive={true}
                              hasLeftBorder={true}
                            />
                            {/* </div> */}
                          </div>

                          {/* <div className="flex flex-col gap-4 w-full sm:w-1/2 bg-background-light rounded-xl p-3"> */}
                          {/* <div className="flex gap-4 justify-start items-center w-full flex-1">
                              <img
                                src="/images/img_group_1000003546.svg"
                                alt="Environment icon"
                                className="w-14 h-14"
                              />
                              <div className="flex flex-col justify-start items-start w-full">
                                <span className="text-xl font-normal leading-xl text-left text-text-primary font-['Inter']">
                                  72%
                                </span>
                                <span className="text-lg font-bold leading-lg text-left text-text-primary font-['DM Sans']">
                                  Environment Rating
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-4 justify-start items-center w-full flex-1">
                              <img
                                src="/images/img_group_1000003546_light_blue_a200.svg"
                                alt="Social icon"
                                className="w-14 h-14"
                              />
                              <div className="flex flex-col justify-start items-start w-full">
                                <span className="text-xl font-normal leading-xl text-left text-text-primary font-['Inter']">
                                  45%
                                </span>
                                <span className="text-lg font-bold leading-lg text-left text-text-primary font-['DM Sans']">
                                  Social Rating
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-4 justify-start items-center w-full flex-1">
                              <img
                                src="/images/img_group_1000003546_amber_a700.svg"
                                alt="Governance icon"
                                className="w-14 h-14"
                              />
                              <div className="flex flex-col justify-start items-start w-full">
                                <span className="text-xl font-normal leading-xl text-left text-text-primary font-['Inter']">
                                  87%
                                </span>
                                <span className="text-lg font-bold leading-lg text-left text-text-primary font-['DM Sans']">
                                  Governance Rating
                                </span>
                              </div>
                            </div> */}
                          <div className="space-y-3 sm:space-y-6 lg:space-y-3">
                            <div
                              className="border-l-[3px] border-purple-500 rounded-none p-2 sm:p-4 lg:p-3 bg-card rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                              style={{ background: 'white' }}
                            >
                              <div className="space-y-2 sm:space-y-4 lg:space-y-3">
                                {esgRatings?.map((rating, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-3 sm:gap-4 lg:gap-3 py-2 border-b border-border-light last:border-b-0"
                                  >
                                    <img
                                      src={rating?.icon}
                                      alt={rating?.title}
                                      className="w-12 h-12 sm:w-14 sm:h-14"
                                    />
                                    <div className="flex-1">
                                      <div className="text-lg sm:text-xl font-normal text-text-primary">
                                        {rating?.percentage}
                                      </div>
                                      <div className="text-sm sm:text-lg font-bold text-text-primary">
                                        {rating?.title}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          {/* </div> */}
                        </div>
                      </div>

                      <div className="flex flex-col justify-start items-center w-full lg:w-[50%]">
                        <div
                          className="w-full p-2 bg-card rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                          style={{ background: 'white' }}
                        >
                          <CumulativeRatingsChart />
                        </div>
                      </div>
                    </div>

                    {/* Content Grid */}
                    <div className="flex flex-col gap-4 justify-start items-center w-full">
                      {/* Risk Breakdown Section */}
                      <div className="w-full bg-primary-foreground border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200">
                        <div className="bg-white px-0">
                          <span className="text-lg font-bold text-[#2b3674]">
                            Pillar wise Risk Breakdown
                          </span>
                        </div>

                        <div className="w-full py-2">
                          <div className="flex flex-col gap-4 w-full mb-2">
                            <div className="flex flex-col gap-1 justify-start items-start w-full">
                              <span className="text-md font-normal text-black">Environmental</span>
                              <div className="grid grid-cols-5 gap-2 justify-start items-center w-full">
                                {[
                                  'Resource Use',
                                  'Climate Stewardship',
                                  'Resource Footprint',
                                  'Aspiration Need',
                                  'Growth Need',
                                ].map((item, index) => (
                                  <Button
                                    key={item}
                                    text={item}
                                    fill_background_color={
                                      index === 0
                                        ? 'bg-[#05ff00]'
                                        : index === 1
                                          ? 'bg-[#acff01]'
                                          : index === 2
                                            ? 'bg-[#ff8b00]'
                                            : index === 3
                                              ? 'bg-[#fe3c00]'
                                              : 'bg-[#73ff01]'
                                    }
                                    text_color="text-black"
                                    border_border_radius="rounded-xs"
                                    layout_width="w-full"
                                    padding="px-2 py-2"
                                    onClick={emptyFunction}
                                    className="w-full text-sm"
                                  />
                                ))}
                              </div>
                            </div>

                            <div className="flex flex-col gap-1 justify-start items-start w-full">
                              <span className="text-md font-normal text-black">Social</span>
                              <div className="grid grid-cols-5 gap-2 justify-start items-center w-full">
                                {[
                                  'Human Capacity',
                                  'Community Engagement',
                                  'Customer Satisfaction',
                                  'Quality Assurance',
                                  'Data Risk',
                                ].map((item, index) => (
                                  <Button
                                    key={item}
                                    text={item}
                                    fill_background_color={
                                      index === 0
                                        ? 'bg-[#05ff00]'
                                        : index === 1
                                          ? 'bg-[#76ff01]'
                                          : index === 2
                                            ? 'bg-[#ff9000]'
                                            : index === 3
                                              ? 'bg-[#ffa101]'
                                              : 'bg-[#fed600]'
                                    }
                                    text_color="text-black"
                                    border_border_radius="rounded-xs"
                                    layout_width="w-full"
                                    padding="px-2 py-2"
                                    onClick={emptyFunction}
                                    className="w-full text-sm"
                                  />
                                ))}
                              </div>
                            </div>

                            <div className="flex flex-col gap-1 justify-start items-start w-full">
                              <span className="text-md font-normal text-black">Governance</span>
                              <div className="grid grid-cols-5 gap-2 justify-start items-center w-full">
                                {[
                                  'Legal Compliance',
                                  'Board Performance',
                                  'Executioner Risk',
                                  'Competitor Risk',
                                  'Financial Risk',
                                ].map((item, index) => (
                                  <Button
                                    key={item}
                                    text={item}
                                    fill_background_color={
                                      index === 0
                                        ? 'bg-[#d4ff00]'
                                        : index === 1
                                          ? 'bg-[#86ff00]'
                                          : index === 2
                                            ? 'bg-[#fed600]'
                                            : index === 3
                                              ? 'bg-[#05ff00]'
                                              : 'bg-[#ff2700]'
                                    }
                                    text_color="text-black"
                                    border_border_radius="rounded-xs"
                                    layout_width="w-full"
                                    padding="px-2 py-2"
                                    onClick={emptyFunction}
                                    className="w-full text-sm"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1 justify-center items-center w-full">
                          <div className="flex flex-row justify-between items-center w-full px-3">
                            <span className="text-sm font-normal text-black">Low</span>
                            <span className="text-sm font-normal text-black">Medium</span>
                            <span className="text-sm font-normal text-black">High</span>
                          </div>
                          <img
                            src="/images/img_frame_1000003883.png"
                            alt="Risk scale"
                            className="w-full h-2 rounded-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedCompany !== 'Toyota Motor Company' && activeTab === 'Overview' && (
                  <>
                    <div className="flex flex-col lg:flex-row gap-3 justify-start items-start w-full">
                      {/* <div className="flex flex-col gap-3 justify-start items-center w-full lg:w-[50%]"> */}
                      <div className="flex flex-col gap-3 justify-start w-full lg:w-[50%]">
                        {/* <div className="w-full bg-background-light rounded-xl p-3"> */}
                        <MetricsCard
                          title="Exposure"
                          value="$ 40,500"
                          unit="Million"
                          changePercentage="25%"
                          isPositive={true}
                          hasLeftBorder={true}
                        />
                        {/* </div> */}

                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                          <div className="flex flex-col gap-3 w-full sm:w-1/2">
                            {/* <div className="w-full bg-background-light rounded-xl p-3"> */}
                            <MetricsCard
                              title="Industry ESG Score"
                              value="72%"
                              changePercentage="45%"
                              isPositive={true}
                              hasLeftBorder={true}
                            />
                            {/* </div> */}
                            {/* <div className="w-full bg-background-light rounded-xl p-3"> */}
                            <MetricsCard
                              title="PCHI"
                              value="35%"
                              changePercentage="30%"
                              isPositive={true}
                              hasLeftBorder={true}
                            />
                            {/* </div> */}
                          </div>

                          {/* <div className="flex flex-col gap-4 w-full sm:w-1/2 bg-background-light rounded-xl p-3"> */}
                          {/* <div className="flex gap-4 justify-start items-center w-full flex-1">
                              <img
                                src="/images/img_group_1000003546.svg"
                                alt="Environment icon"
                                className="w-14 h-14"
                              />
                              <div className="flex flex-col justify-start items-start w-full">
                                <span className="text-xl font-normal leading-xl text-left text-text-primary font-['Inter']">
                                  72%
                                </span>
                                <span className="text-lg font-bold leading-lg text-left text-text-primary font-['DM Sans']">
                                  Environment Rating
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-4 justify-start items-center w-full flex-1">
                              <img
                                src="/images/img_group_1000003546_light_blue_a200.svg"
                                alt="Social icon"
                                className="w-14 h-14"
                              />
                              <div className="flex flex-col justify-start items-start w-full">
                                <span className="text-xl font-normal leading-xl text-left text-text-primary font-['Inter']">
                                  45%
                                </span>
                                <span className="text-lg font-bold leading-lg text-left text-text-primary font-['DM Sans']">
                                  Social Rating
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-4 justify-start items-center w-full flex-1">
                              <img
                                src="/images/img_group_1000003546_amber_a700.svg"
                                alt="Governance icon"
                                className="w-14 h-14"
                              />
                              <div className="flex flex-col justify-start items-start w-full">
                                <span className="text-xl font-normal leading-xl text-left text-text-primary font-['Inter']">
                                  87%
                                </span>
                                <span className="text-lg font-bold leading-lg text-left text-text-primary font-['DM Sans']">
                                  Governance Rating
                                </span>
                              </div>
                            </div> */}
                          <div className="space-y-3 sm:space-y-6 lg:space-y-3">
                            <div
                              className="border-l-[3px] border-purple-500 rounded-none p-2 sm:p-4 lg:p-3 bg-card rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                              style={{ background: 'white' }}
                            >
                              <div className="space-y-2 sm:space-y-4 lg:space-y-3">
                                {esgRatings2?.map((rating, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-3 sm:gap-4 lg:gap-3 py-2 border-b border-border-light last:border-b-0"
                                  >
                                    <img
                                      src={rating?.icon}
                                      alt={rating?.title}
                                      className="w-12 h-12 sm:w-14 sm:h-14"
                                    />
                                    <div className="flex-1">
                                      <div className="text-lg sm:text-xl font-normal text-text-primary">
                                        {rating?.percentage}
                                      </div>
                                      <div className="text-sm sm:text-lg font-bold text-text-primary">
                                        {rating?.title}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          {/* </div> */}
                        </div>
                      </div>

                      <div className="flex flex-col justify-start items-center w-full lg:w-[50%]">
                        <div
                          className="w-full p-2 bg-card rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                          style={{ background: 'white' }}
                        >
                          <CumulativeRatingsChart />
                        </div>
                      </div>
                    </div>

                    {/* Content Grid */}
                    <div className="flex flex-col gap-4 justify-start items-center w-full">
                      {/* Risk Breakdown Section */}
                      <div className="w-full bg-primary-foreground border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200">
                        <div className="bg-white px-0">
                          <span className="text-lg font-bold text-[#2b3674]">
                            Pillar wise Risk Breakdown
                          </span>
                        </div>

                        <div className="w-full py-2">
                          <div className="flex flex-col gap-4 w-full mb-2">
                            <div className="flex flex-col gap-1 justify-start items-start w-full">
                              <span className="text-md font-normal text-black">Environmental</span>
                              <div className="grid grid-cols-5 gap-2 justify-start items-center w-full">
                                {[
                                  'Resource Use',
                                  'Climate Stewardship',
                                  'Resource Footprint',
                                  'Aspiration Need',
                                  'Growth Need',
                                ].map((item, index) => (
                                  <Button
                                    key={item}
                                    text={item}
                                    fill_background_color={
                                      index === 0
                                        ? 'bg-[#05ff00]'
                                        : index === 1
                                          ? 'bg-[#acff01]'
                                          : index === 2
                                            ? 'bg-[#ff8b00]'
                                            : index === 3
                                              ? 'bg-[#fe3c00]'
                                              : 'bg-[#73ff01]'
                                    }
                                    text_color="text-black"
                                    border_border_radius="rounded-xs"
                                    layout_width="w-full"
                                    padding="px-2 py-2"
                                    onClick={emptyFunction}
                                    className="w-full text-sm"
                                  />
                                ))}
                              </div>
                            </div>

                            <div className="flex flex-col gap-1 justify-start items-start w-full">
                              <span className="text-md font-normal text-black">Social</span>
                              <div className="grid grid-cols-5 gap-2 justify-start items-center w-full">
                                {[
                                  'Human Capacity',
                                  'Community Engagement',
                                  'Customer Satisfaction',
                                  'Quality Assurance',
                                  'Data Risk',
                                ].map((item, index) => (
                                  <Button
                                    key={item}
                                    text={item}
                                    fill_background_color={
                                      index === 0
                                        ? 'bg-[#05ff00]'
                                        : index === 1
                                          ? 'bg-[#76ff01]'
                                          : index === 2
                                            ? 'bg-[#ff9000]'
                                            : index === 3
                                              ? 'bg-[#ffa101]'
                                              : 'bg-[#fed600]'
                                    }
                                    text_color="text-black"
                                    border_border_radius="rounded-xs"
                                    layout_width="w-full"
                                    padding="px-2 py-2"
                                    onClick={emptyFunction}
                                    className="w-full text-sm"
                                  />
                                ))}
                              </div>
                            </div>

                            <div className="flex flex-col gap-1 justify-start items-start w-full">
                              <span className="text-md font-normal text-black">Governance</span>
                              <div className="grid grid-cols-5 gap-2 justify-start items-center w-full">
                                {[
                                  'Legal Compliance',
                                  'Board Performance',
                                  'Executioner Risk',
                                  'Competitor Risk',
                                  'Financial Risk',
                                ].map((item, index) => (
                                  <Button
                                    key={item}
                                    text={item}
                                    fill_background_color={
                                      index === 0
                                        ? 'bg-[#d4ff00]'
                                        : index === 1
                                          ? 'bg-[#86ff00]'
                                          : index === 2
                                            ? 'bg-[#fed600]'
                                            : index === 3
                                              ? 'bg-[#05ff00]'
                                              : 'bg-[#ff2700]'
                                    }
                                    text_color="text-black"
                                    border_border_radius="rounded-xs"
                                    layout_width="w-full"
                                    padding="px-2 py-2"
                                    onClick={emptyFunction}
                                    className="w-full text-sm"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1 justify-center items-center w-full">
                          <div className="flex flex-row justify-between items-center w-full px-3">
                            <span className="text-sm font-normal text-black">Low</span>
                            <span className="text-sm font-normal text-black">Medium</span>
                            <span className="text-sm font-normal text-black">High</span>
                          </div>
                          <img
                            src="/images/img_frame_1000003883.png"
                            alt="Risk scale"
                            className="w-full h-2 rounded-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedCompany === 'Toyota Motor Company' &&
                  activeTab === 'Resource Footprint' && (
                    <>
                      <div className="flex flex-col lg:flex-row gap-3 justify-start items-start w-full">
                        {/* <div className="flex flex-col gap-3 justify-start items-center w-full lg:w-[50%]"> */}
                        <div className="flex flex-col gap-3 justify-start w-full lg:w-[50%]">
                          {/* <div className="w-full bg-background-light rounded-xl p-3"> */}
                          <MetricsCard
                            title="Energy Used "
                            value="50"
                            unit="KWH"
                            changePercentage="40%"
                            isPositive={true}
                            hasLeftBorder={true}
                          />
                          <MetricsCard
                            title="EUI"
                            value="3.2"
                            unit="KWH / Unit"
                            changePercentage="22%"
                            isPositive={true}
                            hasLeftBorder={true}
                          />
                          {/* </div> */}
                        </div>

                        <div className="flex flex-col justify-start items-center w-full lg:w-[50%]">
                          <div
                            className="w-full p-2 bg-card rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                            style={{ background: 'white' }}
                          >
                            <KeyEnergyConsumersChart />
                          </div>
                        </div>
                      </div>

                      {/* Content Grid */}
                      <div className="flex flex-col gap-0 justify-start items-center w-full">
                        {/* Risk Breakdown Section */}
                        <div className="w-full bg-primary-foreground border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200">
                          <EnergyUsageChart />
                        </div>
                      </div>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesStatistics;
