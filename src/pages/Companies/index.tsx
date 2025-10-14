'use client';
import { useState, useEffect, useMemo } from 'react';
import Header from '../../components/common/Header';
import Icon from '../../components/ui/AppIcon';
import MetricsCard from '../../pages/Sectors/components/MetricsCard';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Helmet } from 'react-helmet';
// resource-footprint charts
import EnergyUsageChart, { 
  defaultData as defaultEnergyUsageData,   
  energyUsageData1,
  energyUsageData2,
  energyUsageData3,
  energyUsageData4,
  energyUsageData5,
  energyUsageData6,
  energyUsageData7,
  energyUsageData8,
  energyUsageData9 } from './EnerygyUsageChart';
import CumulativeRatingsChart, { 
  defaultData, 
  data1, 
  data2, 
  data3, 
  data4, 
  data5, 
  data6, 
  data7, 
  data8, 
  data9 
} from './CumulativeRatingsChart';
import KeyEnergyConsumersChart, { 
  defaultEnergyData, 
  energyData1, 
  energyData2, 
  energyData3, 
  energyData4, 
  energyData5, 
  energyData6, 
  energyData7, 
  energyData8, 
  energyData9 
} from './KeyEnergyConsumersChart';
// human-capacity charts
import EmployeeMetrics, { 
  defaultEmployeeData, 
  employeeData1, 
  employeeData2, 
  employeeData3, 
  employeeData4, 
  employeeData5, 
  employeeData6, 
  employeeData7, 
  employeeData8, 
  employeeData9 
} from './HumanCapacity/EmployeeMetrics';
import HiringRates, { 
  defaultHiringData, 
  hiringData1, 
  hiringData2, 
  hiringData3, 
  hiringData4, 
  hiringData5, 
  hiringData6, 
  hiringData7, 
  hiringData8, 
  hiringData9 
} from './HumanCapacity/HiringRates';
// community-engagement charts
import TrainingSessions, {
  defaultTrainingData,
  trainingData1,
  trainingData2,
  trainingData3,
  trainingData4,
  trainingData5,
  trainingData6,
  trainingData7,
  trainingData8,
  trainingData9
} from './Community-Engagement/TrainingSessions';
import AttendeesTrainingSessions, {
  defaultAttendeesData,
  attendeesData1,
  attendeesData2,
  attendeesData3,
  attendeesData4,
  attendeesData5,
  attendeesData6,
  attendeesData7,
  attendeesData8,
  attendeesData9
} from './Community-Engagement/AttendeesTrainingSessions';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  placeholder: string;
  options: DropdownOption[];
  className?: string;
  onChange: (value: string) => void;
  value?: string;
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

const Dropdown: React.FC<DropdownProps> = ({ placeholder, options, className = '', onChange, value }) => {
  return (
    <select
      className={`p-2 border border-gray-300 rounded-md ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
    <div className="w-full bg-[#f8fafc]">
      <Helmet>
        <title>Companies | BFSI</title>
        <meta
          name="description"
          content="Detailed ESG analysis and risk assessment for portfolio companies. Track company performance, sector insights, and industry benchmarks."
        />
        <meta
          property="og:title"
          content="Companies Statistics | ESG Analytics Platform"
        />
        <meta
          property="og:description"
          content="Detailed ESG analysis and risk assessment for portfolio companies"
        />
      </Helmet>
      <div
        className={`flex justify-between items-center ${fill_background_color} border rounded-lg p-3 ${className} hover:bg-[#fffded]`}
        style={{ border: border_border }}
        onClick={onClick}
      >
        <span className="text-gray-700">{placeholder}</span>
        <Icon name="ChevronsRight" size={14} />
      </div>
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
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [appliedSector, setAppliedSector] = useState<string>('all');
  const [appliedIndustry, setAppliedIndustry] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompaniesBySectorIndustry = useMemo(() => {
    if (appliedSector === 'all' && appliedIndustry === 'all') {
      return companies;
    }
    
    // post filtering when transportation and automobile is chosen 
    if (appliedSector === 'transportation' && appliedIndustry === 'automobiles') {
      return companies.filter(company => 
        [
          'Motherson Sumi Wiring India Ltd. (MSWIL)',
          'Yazaki (Yazaki India)',
          'LEONI India (LEONI Wiring Systems)',
          'Aptiv Components India',
          'Bosch Limited (India)',
          'Sona Comstar (Sona BLW / Sona Comstar)',
          'Uno Minda (Minda Corporation)',
          'Furukawa Minda Electric (FME)',
          'Varroc Engineering Limited',
          'Lumax Industries Limited (LIL)'
        ].includes(company.name)
      );
    }
    
    return companies;
  }, [companies, appliedSector, appliedIndustry]);

  const filteredCompanies = useMemo(() => {
    const baseCompanies = isFilterApplied ? filteredCompaniesBySectorIndustry : companies;
    
    return Array.isArray(baseCompanies)
      ? baseCompanies.filter((company: any) =>
          company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
  }, [companies, filteredCompaniesBySectorIndustry, searchTerm, isFilterApplied]);

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
      setIsLoading(false);
      
      // Simulate API call delay
      setTimeout(() => {
        setCompanies([
          { id: '1', name: 'Toyota Motor Company', selected: true },
          { id: '2', name: 'Volkswagen AG' },
          { id: '3', name: 'Mercedes-Benz Group' },
          { id: '4', name: 'Ford Motor Company' },
          { id: '5', name: 'General Motors Company' },
          { id: '6', name: 'Hyundai Motor Group' },
          { id: '7', name: 'Fiat Chrysler Automobiles N.V.' },
          { id: '8', name: 'Mitsubishi Motors' },
          { id: '9', name: 'Motherson Sumi Wiring India Ltd. (MSWIL)' },
          { id: '10', name: 'Yazaki (Yazaki India)' },
          { id: '11', name: 'LEONI India (LEONI Wiring Systems)' },
          { id: '12', name: 'Aptiv Components India' },
          { id: '13', name: 'Bosch Limited (India)' },
          { id: '14', name: 'Sona Comstar (Sona BLW / Sona Comstar)' },
          { id: '15', name: 'Uno Minda (Minda Corporation)' },
          { id: '16', name: 'Furukawa Minda Electric (FME)' },
          { id: '17', name: 'Varroc Engineering Limited' },
          { id: '18', name: 'Lumax Industries Limited (LIL)' },
        ]);

        setESGData({
          exposure: '₹552.2 Million',
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
        setIsLoading(false);
      }, 1500);
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
    if (value === 'all') {
      setSelectedIndustry('all');
    }
  };

  const handleIndustryChange = (value: string) => {
    setSelectedIndustry(value);
  };

  const handleApplyFilters = () => {
    setIsLoading(true);
    
    // filter application delay
    setTimeout(() => {
      setAppliedSector(selectedSector);
      setAppliedIndustry(selectedIndustry);
      setIsFilterApplied(true);
      setIsLoading(false);
    }, 1200);
  };

  const handleResetFilters = () => {
    setSelectedSector('all');
    setSelectedIndustry('all');
    setAppliedSector('all');
    setAppliedIndustry('all');
    setIsFilterApplied(false);
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

  const esgRatings = [
    {
      percentage: '74%',
      title: 'Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '58%',
      title: 'Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '75%',
      title: 'Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  const esgRatings2 = [
    {
      percentage: '58%',
      title: 'Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '74%',
      title: 'Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '75%',
      title: 'Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  const esgRatings3 = [
    {
      percentage: '77%',
      title: 'Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '62%',
      title: 'Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '82%',
      title: 'Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  const esgRatings4 = [
    {
      percentage: '65%',
      title: 'Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '71%',
      title: 'Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '69%',
      title: 'Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  const esgRatings5 = [
    {
      percentage: '85%',
      title: 'Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '75%',
      title: 'Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '78%',
      title: 'Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  const esgRatings6 = [
    {
      percentage: '59%',
      title: 'Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '67%',
      title: 'Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '64%',
      title: 'Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  const esgRatings7 = [
    {
      percentage: '76%',
      title: 'Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '68%',
      title: 'Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '71%',
      title: 'Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  const esgRatings8 = [
    {
      percentage: '52%',
      title: 'Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '58%',
      title: 'Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '56%',
      title: 'Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  const esgRatings9 = [
    {
      percentage: '70%',
      title: 'Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '65%',
      title: 'Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '71%',
      title: 'Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  const esgRatings10 = [
    {
      percentage: '79%',
      title: 'Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '72%',
      title: 'Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '73%',
      title: 'Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  const esgRatingsToyota = [
    {
      percentage: '85%',
      title: 'Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '78%',
      title: 'Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '83%',
      title: 'Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  const esgRatingsVolkswagen = [
    {
      percentage: '72%',
      title: 'Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '68%',
      title: 'Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '75%',
      title: 'Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  const esgRatingsMercedes = [
    {
      percentage: '80%',
      title: 'Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '74%',
      title: 'Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '79%',
      title: 'Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  const esgRatingsFord = [
    {
      percentage: '70%',
      title: 'Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '72%',
      title: 'Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '76%',
      title: 'Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  const esgRatingsGM = [
    {
      percentage: '75%',
      title: 'Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '70%',
      title: 'Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '78%',
      title: 'Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  const esgRatingsHyundai = [
    {
      percentage: '78%',
      title: 'Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '76%',
      title: 'Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '74%',
      title: 'Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  const esgRatingsFiat = [
    {
      percentage: '65%',
      title: 'Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '69%',
      title: 'Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '71%',
      title: 'Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

  const esgRatingsMitsubishi = [
    {
      percentage: '68%',
      title: 'Environment Rating',
      color: '#4ade80',
      icon: '/images/img_group_1000003546.svg',
    },
    {
      percentage: '72%',
      title: 'Social Rating',
      color: '#38bdf8',
      icon: '/images/img_group_1000003546_light_blue_a200.svg',
    },
    {
      percentage: '70%',
      title: 'Governance Rating',
      color: '#f59e0b',
      icon: '/images/img_group_1000003546_amber_a700.svg',
    },
  ];

      const getCompanyData = () => {
        switch(selectedCompany) {
          case 'Toyota Motor Company':
            return {
              exposure: { value: '275,000', unit: 'Million', change: '12%', positive: true },
              esgScore: { value: '82%', change: '15%', positive: true },
              pchi: { value: '18%', change: '25%', positive: true },
              ratings: esgRatingsToyota,
              chartData: defaultData,
              energyUsed: { value: '2,500,000', unit: 'GJ', change: '-8%', positive: true },
              eui: { value: '18.5', unit: 'GJ / INR Cr', change: '-12%', positive: true },
              energyChartData: defaultEnergyData,
              energyUsageData: defaultEnergyUsageData,
              totalManpower: { value: '370,000', unit: 'Employees', change: '5%', positive: true },
              ltifr: { value: '0.28', unit: 'per 200k hours', change: '-15%', positive: true },
              employeeChartData: defaultEmployeeData,
              hiringData: defaultHiringData,
              csrInitiatives: { value: '45', unit: 'Initiatives', change: '18%', positive: true },
              beneficiaries: { value: '125,000', unit: 'People', change: '22%', positive: true },
              trainingSessionsData: defaultTrainingData,
              attendeesData: defaultAttendeesData
            };
          case 'Volkswagen AG':
            return {
              exposure: { value: '280,500', unit: 'Million', change: '8%', positive: true },
              esgScore: { value: '72%', change: '12%', positive: true },
              pchi: { value: '22%', change: '18%', positive: true },
              ratings: esgRatingsVolkswagen,
              chartData: data1,
              energyUsed: { value: '2,800,000', unit: 'GJ', change: '-5%', positive: true },
              eui: { value: '20.1', unit: 'GJ / INR Cr', change: '-8%', positive: true },
              energyChartData: energyData1,
              energyUsageData: energyUsageData1,
              totalManpower: { value: '330,000', unit: 'Employees', change: '3%', positive: true },
              ltifr: { value: '0.32', unit: 'per 200k hours', change: '-12%', positive: true },
              employeeChartData: employeeData1,
              hiringData: hiringData1,
              csrInitiatives: { value: '38', unit: 'Initiatives', change: '15%', positive: true },
              beneficiaries: { value: '98,000', unit: 'People', change: '20%', positive: true },
              trainingSessionsData: trainingData1,
              attendeesData: attendeesData1
            };
          case 'Mercedes-Benz Group':
            return {
              exposure: { value: '148,200', unit: 'Million', change: '10%', positive: true },
              esgScore: { value: '78%', change: '14%', positive: true },
              pchi: { value: '16%', change: '22%', positive: true },
              ratings: esgRatingsMercedes,
              chartData: data2,
              energyUsed: { value: '1,850,000', unit: 'GJ', change: '-10%', positive: true },
              eui: { value: '16.8', unit: 'GJ / INR Cr', change: '-15%', positive: true },
              energyChartData: energyData2,
              energyUsageData: energyUsageData2,
              totalManpower: { value: '172,000', unit: 'Employees', change: '4%', positive: true },
              ltifr: { value: '0.25', unit: 'per 200k hours', change: '-18%', positive: true },
              employeeChartData: employeeData2,
              hiringData: hiringData2,
              csrInitiatives: { value: '32', unit: 'Initiatives', change: '12%', positive: true },
              beneficiaries: { value: '75,000', unit: 'People', change: '18%', positive: true },
              trainingSessionsData: trainingData2,
              attendeesData: attendeesData2
            };
          case 'Ford Motor Company':
            return {
              exposure: { value: '156,800', unit: 'Million', change: '6%', positive: true },
              esgScore: { value: '73%', change: '11%', positive: true },
              pchi: { value: '24%', change: '16%', positive: true },
              ratings: esgRatingsFord,
              chartData: data3,
              energyUsed: { value: '2,100,000', unit: 'GJ', change: '-7%', positive: true },
              eui: { value: '19.2', unit: 'GJ / INR Cr', change: '-10%', positive: true },
              energyChartData: energyData3,
              energyUsageData: energyUsageData3,
              totalManpower: { value: '183,000', unit: 'Employees', change: '2%', positive: true },
              ltifr: { value: '0.35', unit: 'per 200k hours', change: '-10%', positive: true },
              employeeChartData: employeeData3,
              hiringData: hiringData3,
              csrInitiatives: { value: '28', unit: 'Initiatives', change: '10%', positive: true },
              beneficiaries: { value: '65,000', unit: 'People', change: '15%', positive: true },
              trainingSessionsData: trainingData3,
              attendeesData: attendeesData3
            };
          case 'General Motors Company':
            return {
              exposure: { value: '157,300', unit: 'Million', change: '9%', positive: true },
              esgScore: { value: '74%', change: '13%', positive: true },
              pchi: { value: '20%', change: '20%', positive: true },
              ratings: esgRatingsGM,
              chartData: data4,
              energyUsed: { value: '2,300,000', unit: 'GJ', change: '-6%', positive: true },
              eui: { value: '21.5', unit: 'GJ / INR Cr', change: '-9%', positive: true },
              energyChartData: energyData4,
              energyUsageData: energyUsageData4,
              totalManpower: { value: '167,000', unit: 'Employees', change: '3%', positive: true },
              ltifr: { value: '0.30', unit: 'per 200k hours', change: '-14%', positive: true },
              employeeChartData: employeeData4,
              hiringData: hiringData4,
              csrInitiatives: { value: '35', unit: 'Initiatives', change: '14%', positive: true },
              beneficiaries: { value: '82,000', unit: 'People', change: '19%', positive: true },
              trainingSessionsData: trainingData4,
              attendeesData: attendeesData4
            };
          case 'Hyundai Motor Group':
            return {
              exposure: { value: '98,500', unit: 'Million', change: '11%', positive: true },
              esgScore: { value: '76%', change: '16%', positive: true },
              pchi: { value: '19%', change: '23%', positive: true },
              ratings: esgRatingsHyundai,
              chartData: data5,
              energyUsed: { value: '1,650,000', unit: 'GJ', change: '-9%', positive: true },
              eui: { value: '17.2', unit: 'GJ / INR Cr', change: '-13%', positive: true },
              energyChartData: energyData5,
              energyUsageData: energyUsageData5,
              totalManpower: { value: '120,000', unit: 'Employees', change: '6%', positive: true },
              ltifr: { value: '0.27', unit: 'per 200k hours', change: '-16%', positive: true },
              employeeChartData: employeeData5,
              hiringData: hiringData5,
              csrInitiatives: { value: '40', unit: 'Initiatives', change: '17%', positive: true },
              beneficiaries: { value: '95,000', unit: 'People', change: '21%', positive: true },
              trainingSessionsData: trainingData5,
              attendeesData: attendeesData5
            };
          case 'Fiat Chrysler Automobiles N.V.':
            return {
              exposure: { value: '132,400', unit: 'Million', change: '7%', positive: true },
              esgScore: { value: '68%', change: '10%', positive: true },
              pchi: { value: '26%', change: '14%', positive: true },
              ratings: esgRatingsFiat,
              chartData: data6,
              energyUsed: { value: '1,950,000', unit: 'GJ', change: '-4%', positive: true },
              eui: { value: '22.8', unit: 'GJ / INR Cr', change: '-7%', positive: true },
              energyChartData: energyData6,
              energyUsageData: energyUsageData6,
              totalManpower: { value: '198,000', unit: 'Employees', change: '1%', positive: true },
              ltifr: { value: '0.38', unit: 'per 200k hours', change: '-8%', positive: true },
              employeeChartData: employeeData6,
              hiringData: hiringData6,
              csrInitiatives: { value: '25', unit: 'Initiatives', change: '8%', positive: true },
              beneficiaries: { value: '58,000', unit: 'People', change: '12%', positive: true },
              trainingSessionsData: trainingData6,
              attendeesData: attendeesData6
            };
          case 'Mitsubishi Motors':
            return {
              exposure: { value: '45,200', unit: 'Million', change: '5%', positive: true },
              esgScore: { value: '70%', change: '9%', positive: true },
              pchi: { value: '28%', change: '12%', positive: true },
              ratings: esgRatingsMitsubishi,
              chartData: data7,
              energyUsed: { value: '850,000', unit: 'GJ', change: '-3%', positive: true },
              eui: { value: '25.4', unit: 'GJ / INR Cr', change: '-5%', positive: true },
              energyChartData: energyData7,
              energyUsageData: energyUsageData7,
              totalManpower: { value: '34,000', unit: 'Employees', change: '0%', positive: true },
              ltifr: { value: '0.42', unit: 'per 200k hours', change: '-6%', positive: true },
              employeeChartData: employeeData7,
              hiringData: hiringData7,
              csrInitiatives: { value: '18', unit: 'Initiatives', change: '6%', positive: true },
              beneficiaries: { value: '42,000', unit: 'People', change: '10%', positive: true },
              trainingSessionsData: trainingData7,
              attendeesData: attendeesData7
            };
          case 'Motherson Sumi Wiring India Ltd. (MSWIL)':
            return {
              exposure: { value: '55,699', unit: 'Million', change: '19%', positive: true },
              esgScore: { value: '69%', change: '40%', positive: true },
              pchi: { value: '26%', change: '40%', positive: true },
              ratings: esgRatings,
              chartData: defaultData,
              energyUsed: { value: '155,000', unit: 'GJ', change: '30%', positive: true },
              eui: { value: '21.5', unit: 'GJ / INR Cr', change: '17%', positive: true },
              energyChartData: defaultEnergyData,
              energyUsageData: defaultEnergyUsageData,
              totalManpower: { value: '39,300', unit: 'Employees', change: '12%', positive: true },
              ltifr: { value: '0.35', unit: 'per 200k hours', change: '-8%', positive: true },
              employeeChartData: defaultEmployeeData,
              hiringData: defaultHiringData,
              csrInitiatives: { value: '22', unit: 'Initiatives', change: '20%', positive: true },
              beneficiaries: { value: '43,500', unit: 'People', change: '25%', positive: true },
              trainingSessionsData: defaultTrainingData,
              attendeesData: defaultAttendeesData
            };
          case 'Yazaki (Yazaki India)':
            return {
              exposure: { value: '37,679', unit: 'Million', change: '25%', positive: true },
              esgScore: { value: '69%', change: '45%', positive: true },
              pchi: { value: '42%', change: '30%', positive: true },
              ratings: esgRatings2,
              chartData: data1,
              energyUsed: { value: '180,000', unit: 'GJ', change: '28%', positive: true },
              eui: { value: '24.0', unit: 'GJ / INR Cr', change: '15%', positive: true },
              energyChartData: energyData1,
              energyUsageData: energyUsageData1,
              totalManpower: { value: '31,600', unit: 'Employees', change: '15%', positive: true },
              ltifr: { value: '0.38', unit: 'per 200k hours', change: '-6%', positive: true },
              employeeChartData: employeeData1,
              hiringData: hiringData1,
              csrInitiatives: { value: '18', unit: 'Initiatives', change: '15%', positive: true },
              beneficiaries: { value: '31,200', unit: 'People', change: '20%', positive: true },
              trainingSessionsData: trainingData1,
              attendeesData: attendeesData1
            };
          case 'LEONI India (LEONI Wiring Systems)':
            return {
              exposure: { value: '25,450', unit: 'Million', change: '15%', positive: true },
              esgScore: { value: '74%', change: '38%', positive: true },
              pchi: { value: '23%', change: '25%', positive: true },
              ratings: esgRatings3,
              chartData: data2,
              energyUsed: { value: '165,000', unit: 'GJ', change: '32%', positive: true },
              eui: { value: '23.5', unit: 'GJ / INR Cr', change: '19%', positive: true },
              energyChartData: energyData2,
              energyUsageData: energyUsageData2,
              totalManpower: { value: '25,300', unit: 'Employees', change: '10%', positive: true },
              ltifr: { value: '0.41', unit: 'per 200k hours', change: '-12%', positive: true },
              employeeChartData: employeeData2,
              hiringData: hiringData2,
              csrInitiatives: { value: '15', unit: 'Initiatives', change: '12%', positive: true },
              beneficiaries: { value: '26,800', unit: 'People', change: '18%', positive: true },
              trainingSessionsData: trainingData2,
              attendeesData: attendeesData2
            };
          case 'Aptiv Components India':
            return {
              exposure: { value: '41,200', unit: 'Million', change: '22%', positive: true },
              esgScore: { value: '68%', change: '42%', positive: true },
              pchi: { value: '35%', change: '28%', positive: true },
              ratings: esgRatings4,
              chartData: data3,
              energyUsed: { value: '170,000', unit: 'GJ', change: '26%', positive: true },
              eui: { value: '22.5', unit: 'GJ / INR Cr', change: '16%', positive: true },
              energyChartData: energyData3,
              energyUsageData: energyUsageData3,
              totalManpower: { value: '27,400', unit: 'Employees', change: '14%', positive: true },
              ltifr: { value: '0.32', unit: 'per 200k hours', change: '-9%', positive: true },
              employeeChartData: employeeData3,
              hiringData: hiringData3,
              csrInitiatives: { value: '15', unit: 'Initiatives', change: '18%', positive: true },
              beneficiaries: { value: '26,800', unit: 'People', change: '22%', positive: true },
              trainingSessionsData: trainingData3,
              attendeesData: attendeesData3
            };
          case 'Bosch Limited (India)':
            return {
              exposure: { value: '78,930', unit: 'Million', change: '30%', positive: true },
              esgScore: { value: '79%', change: '35%', positive: true },
              pchi: { value: '15%', change: '32%', positive: true },
              ratings: esgRatings5,
              chartData: data4,
              energyUsed: { value: '850,000', unit: 'GJ', change: '35%', positive: true },
              eui: { value: '58.5', unit: 'GJ / INR Cr', change: '12%', positive: true },
              energyChartData: energyData4,
              energyUsageData: energyUsageData4,
              totalManpower: { value: '45,200', unit: 'Employees', change: '18%', positive: true },
              ltifr: { value: '0.29', unit: 'per 200k hours', change: '-5%', positive: true },
              employeeChartData: employeeData4,
              hiringData: hiringData4,
              csrInitiatives: { value: '19', unit: 'Initiatives', change: '25%', positive: true },
              beneficiaries: { value: '35,500', unit: 'People', change: '30%', positive: true },
              trainingSessionsData: trainingData4,
              attendeesData: attendeesData4
            };
          case 'Sona Comstar (Sona BLW / Sona Comstar)':
            return {
              exposure: { value: '19,850', unit: 'Million', change: '18%', positive: true },
              esgScore: { value: '63%', change: '36%', positive: true },
              pchi: { value: '41%', change: '22%', positive: true },
              ratings: esgRatings6,
              chartData: data5,
              energyUsed: { value: '210,000', unit: 'GJ', change: '24%', positive: true },
              eui: { value: '75.0', unit: 'GJ / INR Cr', change: '18%', positive: true },
              energyChartData: energyData5,
              energyUsageData: energyUsageData5,
              totalManpower: { value: '22,400', unit: 'Employees', change: '11%', positive: true },
              ltifr: { value: '0.42', unit: 'per 200k hours', change: '-10%', positive: true },
              employeeChartData: employeeData5,
              hiringData: hiringData5,
              csrInitiatives: { value: '25', unit: 'Initiatives', change: '10%', positive: true },
              beneficiaries: { value: '48,200', unit: 'People', change: '15%', positive: true },
              trainingSessionsData: trainingData5,
              attendeesData: attendeesData5
            };
          case 'Uno Minda (Minda Corporation)':
            return {
              exposure: { value: '33,100', unit: 'Million', change: '20%', positive: true },
              esgScore: { value: '72%', change: '41%', positive: true },
              pchi: { value: '24%', change: '26%', positive: true },
              ratings: esgRatings7,
              chartData: data6,
              energyUsed: { value: '330,000', unit: 'GJ', change: '22%', positive: true },
              eui: { value: '28.0', unit: 'GJ / INR Cr', change: '14%', positive: true },
              energyChartData: energyData6,
              energyUsageData: energyUsageData6,
              totalManpower: { value: '42,400', unit: 'Employees', change: '16%', positive: true },
              ltifr: { value: '0.33', unit: 'per 200k hours', change: '-7%', positive: true },
              employeeChartData: employeeData6,
              hiringData: hiringData6,
              csrInitiatives: { value: '14', unit: 'Initiatives', change: '17%', positive: true },
              beneficiaries: { value: '19,800', unit: 'People', change: '24%', positive: true },
              trainingSessionsData: trainingData6,
              attendeesData: attendeesData6
            };
          case 'Furukawa Minda Electric (FME)':
            return {
              exposure: { value: '15,600', unit: 'Million', change: '16%', positive: true },
              esgScore: { value: '55%', change: '28%', positive: true },
              pchi: { value: '48%', change: '19%', positive: true },
              ratings: esgRatings8,
              chartData: data7,
              energyUsed: { value: '95,000', unit: 'GJ', change: '20%', positive: true },
              eui: { value: '35.0', unit: 'GJ / INR Cr', change: '21%', positive: true },
              energyChartData: energyData7,
              energyUsageData: energyUsageData7,
              totalManpower: { value: '19,800', unit: 'Employees', change: '9%', positive: true },
              ltifr: { value: '0.47', unit: 'per 200k hours', change: '-13%', positive: true },
              employeeChartData: employeeData7,
              hiringData: hiringData7,
              csrInitiatives: { value: '23', unit: 'Initiatives', change: '8%', positive: true },
              beneficiaries: { value: '42,900', unit: 'People', change: '12%', positive: true },
              trainingSessionsData: trainingData7,
              attendeesData: attendeesData7
            };
          case 'Varroc Engineering Limited':
            return {
              exposure: { value: '29,750', unit: 'Million', change: '21%', positive: true },
              esgScore: { value: '69%', change: '39%', positive: true },
              pchi: { value: '30%', change: '24%', positive: true },
              ratings: esgRatings9,
              chartData: data8,
              energyUsed: { value: '450,000', unit: 'GJ', change: '27%', positive: true },
              eui: { value: '65.0', unit: 'GJ / INR Cr', change: '15%', positive: true },
              energyChartData: energyData8,
              energyUsageData: energyUsageData8,
              totalManpower: { value: '35,700', unit: 'Employees', change: '17%', positive: true },
              ltifr: { value: '0.36', unit: 'per 200k hours', change: '-6%', positive: true },
              employeeChartData: employeeData8,
              hiringData: hiringData8,
              csrInitiatives: { value: '12', unit: 'Initiatives', change: '16%', positive: true },
              beneficiaries: { value: '15600', unit: 'People', change: '21%', positive: true },
              trainingSessionsData: trainingData8,
              attendeesData: attendeesData8
            };
          case 'Lumax Industries Limited (LIL)':
            return {
              exposure: { value: '12,300', unit: 'Million', change: '17%', positive: true },
              esgScore: { value: '75%', change: '43%', positive: true },
              pchi: { value: '21%', change: '29%', positive: true },
              ratings: esgRatings10,
              chartData: data9,
              energyUsed: { value: '110,000', unit: 'GJ', change: '19%', positive: true },
              eui: { value: '48.0', unit: 'GJ / INR Cr', change: '17%', positive: true },
              energyChartData: energyData9,
              energyUsageData: energyUsageData9,
              totalManpower: { value: '22,500', unit: 'Employees', change: '10%', positive: true },
              ltifr: { value: '0.44', unit: 'per 200k hours', change: '-11%', positive: true },
              employeeChartData: employeeData9,
              hiringData: hiringData9,
              csrInitiatives: { value: '20', unit: 'Initiatives', change: '11%', positive: true },
              beneficiaries: { value: '37200', unit: 'People', change: '16%', positive: true },
              trainingSessionsData: trainingData9,
              attendeesData: attendeesData9
            };
          default:
            return {
              exposure: { value: '12,300', unit: 'Million', change: '19%', positive: true },
              esgScore: { value: '69%', change: '40%', positive: true },
              pchi: { value: '26%', change: '40%', positive: true },
              ratings: esgRatings,
              chartData: defaultData,
              energyUsed: { value: '155,000', unit: 'GJ', change: '30%', positive: true },
              eui: { value: '21.5', unit: 'GJ / INR Cr', change: '17%', positive: true },
              energyChartData: defaultEnergyData,
              energyUsageData: defaultEnergyUsageData,
              totalManpower: { value: '39,300', unit: 'Employees', change: '12%', positive: true },
              ltifr: { value: '0.35', unit: 'per 200k hours', change: '-8%', positive: true },
              employeeChartData: defaultEmployeeData,
              hiringData: defaultHiringData,
              csrInitiatives: { value: '16', unit: 'Initiatives', change: '20%', positive: true },
              beneficiaries: { value: '24,100', unit: 'People', change: '25%', positive: true },
              trainingSessionsData: defaultTrainingData,
              attendeesData: defaultAttendeesData
            };
        }
      };

  const companyData = getCompanyData();

  const getSectorDisplayName = () => {
    const sector = sectorOptions.find(s => s.value === appliedSector);
    return sector ? sector.label : 'All';
  };

  const getIndustryDisplayName = () => {
    const industry = industryOptions.find(i => i.value === appliedIndustry);
    return industry ? industry.label : 'All';
  };

  return (
    <div className="w-full bg-[#f8fafc]">
      <Header />
    
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 min-w-[200px]">
            <LoadingSpinner size="lg" />
            <p className="text-text-primary font-medium">Applying filters...</p>
            <p className="text-text-secondary text-sm">Updating company data</p>
          </div>
        </div>
      )}

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

            {/*filters in header*/} 
            <div className="flex flex-col sm:flex-row gap-3 justify-end items-start sm:items-center w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                <Dropdown
                  placeholder="Sector"
                  options={sectorOptions}
                  className="w-full sm:w-40 text-sm"
                  onChange={handleSectorChange}
                  value={selectedSector}
                />
                <Dropdown
                  placeholder="Industry"
                  options={industryOptions}
                  className="w-full sm:w-48 text-sm"
                  onChange={handleIndustryChange}
                  value={selectedIndustry}
                />
                <button
                  className="w-full sm:w-auto bg-accent-info text-white rounded-md px-4 py-2 text-sm flex items-center justify-center gap-2 min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleApplyFilters}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span>Applying...</span>
                    </>
                  ) : (
                    'Apply Filters'
                  )}
                </button>
                {isFilterApplied && (
                  <button
                    className="w-full sm:w-auto bg-gray-500 text-white rounded-md px-4 py-2 text-sm flex items-center justify-center gap-2 min-w-[100px] hover:bg-gray-600 transition-colors"
                    onClick={handleResetFilters}
                    disabled={isLoading}
                  >
                    Reset
                  </button>
                )}
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 px-3">
                  <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4">
                    <span className="text-lg font-medium text-[#29303f]">
                      <span className="text-[#29303f7f]">Sector: </span>
                      <span className="text-[#29303f]">{getSectorDisplayName()}</span>
                    </span>
                    <span className="text-lg font-medium text-[#29303f]">
                      <span className="text-[#29303f7f]">Industry: </span>
                      <span className="text-[#29303f]">{getIndustryDisplayName()}</span>
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

                {activeTab === 'Overview' && (
                  <>
                    <div className="flex flex-col lg:flex-row gap-3 justify-start items-start w-full">
                      <div className="flex flex-col gap-3 justify-start w-full lg:w-[50%]">
                        <MetricsCard
                          title="Exposure"
                          value={`$ ${companyData.exposure.value}`}
                          unit={companyData.exposure.unit}
                          changePercentage={companyData.exposure.change}
                          isPositive={companyData.exposure.positive}
                          hasLeftBorder={true}
                        />

                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                          <div className="flex flex-col gap-3 w-full sm:w-1/2">
                            <MetricsCard
                              title="ESG Score"
                              value={companyData.esgScore.value}
                              changePercentage={companyData.esgScore.change}
                              isPositive={companyData.esgScore.positive}
                              hasLeftBorder={true}
                            />
                            <MetricsCard
                              title="PCHI"
                              value={companyData.pchi.value}
                              changePercentage={companyData.pchi.change}
                              isPositive={companyData.pchi.positive}
                              hasLeftBorder={true}
                            />
                          </div>
                          
                          <div className="space-y-3 sm:space-y-6 lg:space-y-3 w-full sm:w-1/2">
                            <div
                              className="border-l-[3px] border-purple-500 rounded-none p-2 sm:p-4 lg:p-3 bg-card rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                              style={{ background: 'white' }}
                            >
                              <div className="space-y-2 sm:space-y-4 lg:space-y-3">
                                {companyData.ratings?.map((rating, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-3 sm:gap-4 lg:gap-6 py-3.5 px-2.5 border-b border-border-light last:border-b-0"
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
                        </div>
                      </div>

                      <div className="flex flex-col justify-start items-center w-full lg:w-[50%]">
                        <div
                          className="w-full p-2 bg-card rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                          style={{ background: 'white' }}
                        >
                          <CumulativeRatingsChart data={companyData.chartData} />
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

                {activeTab === 'Resource Footprint' && (
                  <>
                    <div className="flex flex-col lg:flex-row gap-3 justify-start items-start w-full">
                      <div className="flex flex-col gap-3 justify-start w-full lg:w-[50%]">
                        <MetricsCard
                          title="Energy Used"
                          value={companyData.energyUsed.value}
                          unit={companyData.energyUsed.unit}
                          changePercentage={companyData.energyUsed.change}
                          isPositive={companyData.energyUsed.positive}
                          hasLeftBorder={true}
                        />
                        <MetricsCard
                          title="EUI"
                          value={companyData.eui.value}
                          unit={companyData.eui.unit}
                          changePercentage={companyData.eui.change}
                          isPositive={companyData.eui.positive}
                          hasLeftBorder={true}
                        />
                      </div>

                      <div className="flex flex-col justify-start items-center w-full lg:w-[50%]">
                        <div
                          className="w-full p-2 bg-card rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                          style={{ background: 'white' }}
                        >
                          <KeyEnergyConsumersChart data={companyData.energyChartData} />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-0 justify-start items-center w-full">
                      <div className="w-full bg-primary-foreground border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200">
                        <EnergyUsageChart 
                          data={companyData.energyUsageData} 
                          companyName={selectedCompany}
                        />
                      </div>
                    </div>
                  </>
                )}
                {activeTab === 'Human Capacity' && (
                <>
                  <div className="flex flex-col lg:flex-row gap-3 justify-start items-start w-full">
                    <div className="flex flex-col gap-3 justify-start w-full lg:w-[50%]">
                      <MetricsCard
                        title="Total Manpower"
                        value={companyData.totalManpower.value}
                        unit={companyData.totalManpower.unit}
                        changePercentage={companyData.totalManpower.change}
                        isPositive={companyData.totalManpower.positive}
                        hasLeftBorder={true}
                      />
                      <MetricsCard
                        title="LTIFR"
                        value={companyData.ltifr.value}
                        unit={companyData.ltifr.unit}
                        changePercentage={companyData.ltifr.change}
                        isPositive={companyData.ltifr.positive}
                        hasLeftBorder={true}
                      />
                    </div>

                    <div className="flex flex-col justify-start items-center w-full lg:w-[50%]">
                      <div
                        className="w-full p-2 bg-card rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                        style={{ background: 'white' }}
                      >
                        <EmployeeMetrics data={companyData.employeeChartData} />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-0 justify-start items-center w-full">
                    <div className="w-full bg-primary-foreground border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200">
                      <HiringRates
                        data={companyData.hiringData} 
                        companyName={selectedCompany}
                      />
                    </div>
                  </div>
                </>
              )}
              {activeTab === 'Community Engagement' && (
                <>
                  <div className="flex flex-col lg:flex-row gap-3 justify-start items-start w-full">
                    <div className="flex flex-col gap-3 justify-start w-full lg:w-[50%]">
                      <MetricsCard
                        title="Total CSR Initiatives"
                        value={companyData.csrInitiatives.value}
                        unit={companyData.csrInitiatives.unit}
                        changePercentage={companyData.csrInitiatives.change}
                        isPositive={companyData.csrInitiatives.positive}
                        hasLeftBorder={true}
                      />
                      <MetricsCard
                        title="Total Beneficiaries"
                        value={companyData.beneficiaries.value}
                        unit={companyData.beneficiaries.unit}
                        changePercentage={companyData.beneficiaries.change}
                        isPositive={companyData.beneficiaries.positive}
                        hasLeftBorder={true}
                      />
                    </div>

                    <div className="flex flex-col justify-start items-center w-full lg:w-[50%]">
                      <div
                        className="w-full p-2 bg-card rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
                        style={{ background: 'white' }}
                      >
                        <TrainingSessions data={companyData.trainingSessionsData} />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-0 justify-start items-center w-full">
                    <div className="w-full bg-primary-foreground border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200">
                      <AttendeesTrainingSessions
                        data={companyData.attendeesData} 
                        companyName={selectedCompany}
                      />
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