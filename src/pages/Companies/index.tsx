'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
// import SearchView from '@/components/ui/SearchView';
// import EditText from '@/components/ui/EditText';
import Dropdown from '../../components/ui/Dropdown';
import Button from '../../components/ui/Button';
import Image from 'next/image';

interface Company {
  id: string
  name: string
  selected?: boolean
}

interface ESGData {
  exposure: string
  industryScore: string
  pchi: string
  environment: string
  social: string
  governance: string
}

interface ChartDataPoint {
  month: string
  value: number
}

const CompaniesStatistics = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [selectedCompany, setSelectedCompany] = useState<string>('Hyundai Motor Group')
  const [activeTab, setActiveTab] = useState<string>('Overview')
  const [esgData, setESGData] = useState<ESGData | null>(null)
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadDashboardData = () => {
      setCompanies([
        { id: '1', name: 'Toyota Motor Company' },
        { id: '2', name: 'Volkswagen AG' },
        { id: '3', name: 'Mercedes-Benz Group' },
        { id: '4', name: 'Ford Motor Company' },
        { id: '5', name: 'General Motors Company' },
        { id: '6', name: 'Hyundai Motor Group', selected: true },
        { id: '7', name: 'Fiat Chrysler Automobiles N.V.' },
        { id: '8', name: 'Mitsubishi Motors' },
      ])

      setESGData({
        exposure: '₹ 552.2 Million',
        industryScore: '68%',
        pchi: '46%',
        environment: '54%',
        social: '69%',
        governance: '75%',
      })

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
      ])

      setLoading(false)
    }

    loadDashboardData()
  }, [])

  const handleCompanySelect = (companyName: string) => {
    setSelectedCompany(companyName)
    setCompanies(prev => 
      prev.map(company => ({
        ...company,
        selected: company.name === companyName
      }))
    )
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const tabs = [
    'Overview',
    'Human Capacity',
    'Resource Footprint',
    'Resource Use',
    'Climate Stewardship',
    'Aspiration Need',
    'Growth Need',
    'Community Engagement'
  ]

  return (
    <div className="flex flex-col gap-[12px] justify-start items-center w-full bg-[#f6f5f3]">
      <Header />

      <div className="w-full max-w-[1440px] mx-auto px-[12px] mb-[18px]">
        <div className="w-full bg-white border-b border-[#b7c1d77f] rounded-xl p-[8px]">
          <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-[12px]">
            <div className="w-full lg:w-4/5 bg-[#f6f9ff] rounded-xl p-[10px]">
              <div className="flex flex-col justify-start items-center w-full">
                <div className="flex flex-row gap-[6px] justify-center items-center w-auto mb-[4px]">
                  <Image
                    src="/images/img_frame_1000004089.svg"
                    alt="Timeline bars"
                    width={210}
                    height={32}
                    className="w-[105px] sm:w-[140px] md:w-[175px] lg:w-[210px] h-[32px]"
                  />
                  <Image
                    src="/images/img_frame_1000003099.svg"
                    alt="Timeline bars"
                    width={730}
                    height={32}
                    className="w-[365px] sm:w-[487px] md:w-[608px] lg:w-[730px] h-[32px]"
                  />
                  <Image
                    src="/images/img_frame_1000004088.svg"
                    alt="Timeline bars"
                    width={146}
                    height={32}
                    className="w-[73px] sm:w-[97px] md:w-[122px] lg:w-[146px] h-[32px]"
                  />
                </div>

                <div className="flex flex-col justify-start items-center w-full">
                  <Image
                    src="/images/img_group_1000003717.svg"
                    alt="Timeline indicator"
                    width={86}
                    height={12}
                    className="w-[43px] sm:w-[57px] md:w-[72px] lg:w-[86px] h-[12px]"
                  />
                  
                  <div className="flex flex-col justify-start items-center w-full -mt-[6px]">
                    <div className="w-full h-[2px] bg-white"></div>
                    <div className="w-full h-[2px] bg-[#0511f2] -mt-[2px] mx-[109px] sm:mx-[145px] md:mx-[182px] lg:mx-[218px] mr-[78px] sm:mr-[104px] md:mr-[130px] lg:mr-[156px]"></div>
                    
                    <div className="flex flex-row justify-between items-start w-full -mt-[2px] px-[11px] sm:px-[15px] md:px-[19px] lg:px-[22px]">
                      {Array.from({ length: 16 }, (_, i) => (
                        <Image
                          key={i}
                          src="/images/img_line_270.svg"
                          alt="Timeline marker"
                          width={2}
                          height={i === 0 || i === 11 ? 10 : 4}
                          className={`w-[2px] ${i === 0 || i === 11 ? 'h-[10px] self-center' : 'h-[4px]'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-[16px] sm:gap-[21px] md:gap-[27px] lg:gap-[32px] justify-start items-center w-full mt-[6px] px-[6px] sm:px-[8px] md:px-[10px] lg:px-[12px]">
                  {[
                    { month: 'Oct', year: '2024' },
                    { month: 'Nov', year: '2024' },
                    { month: 'Dec', year: '2024' },
                    { month: 'Jan', year: '2025' },
                    { month: 'Feb', year: '2025' },
                    { month: 'Mar', year: '2025' },
                    { month: 'Apr', year: '2025' },
                    { month: 'May', year: '2025' },
                    { month: 'Jun', year: '2025' },
                    { month: 'Jul', year: '2025' },
                    { month: 'Aug', year: '2025' },
                    { month: 'Sep', year: '2025' },
                    { month: 'Oct', year: '2025' },
                    { month: 'Nov', year: '2025' },
                    { month: 'Dec', year: '2025' },
                    { month: 'Jan', year: '2026' },
                    { month: 'Feb', year: '2026' },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col justify-start items-center w-full px-[1px] sm:px-[2px]">
                      <span className="text-sm sm:text-base font-normal leading-xl text-center text-[#232538]">
                        {item.month}
                      </span>
                      <span className="text-xs sm:text-sm font-normal leading-sm text-center text-[#a6a6a6]">
                        {item.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/5 bg-[#f6f9ff] rounded-xl p-[8px]">
              <div className="flex flex-col gap-[4px] justify-start items-center w-full">
                <Dropdown
                  placeholder="Transportation"
                  options={[
                    { value: 'transportation', label: 'Transportation' },
                    { value: 'energy', label: 'Energy' },
                    { value: 'technology', label: 'Technology' },
                  ]}
                  className="w-full"
                />
                <Dropdown
                  placeholder="Automobiles (Including Ancillaries)"
                  options={[
                    { value: 'automobiles', label: 'Automobiles (Including Ancillaries)' },
                    { value: 'aerospace', label: 'Aerospace & Defense' },
                    { value: 'logistics', label: 'Logistics & Shipping' },
                  ]}
                  className="w-full"
                />
                <Button
                  text="Filter"
                  fill_background_color="bg-gradient-to-r from-[#232538] to-[#62689e]"
                  text_color="text-white"
                  layout_width="w-full"
                  padding="px-4 py-2"
                  position="relative"
                  variant="primary"
                  size="medium"
                  onClick={() => {}}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-[12px]">
        <div className="flex flex-col lg:flex-row justify-start items-start w-full gap-[12px]">
          <div className="w-full lg:w-1/4 bg-white border-r border-[#b7c1d77f] p-[18px]">
            <div className="flex flex-col gap-[6px] justify-start items-start w-full">
              <span className="text-md font-normal leading-md text-left text-[#29303f7f] ml-[6px]">
                Companies
              </span>
              
              <div className="flex flex-col gap-[10px] justify-start items-center w-full">
                <SearchView
                  placeholder="Search"
                  layout_gap="gap-2"
                  layout_width="w-full"
                  padding="p-2"
                  position="relative"
                  variant="default"
                  size="medium"
                  onSearch={() => {}}
                  onChange={() => {}}
                  className="w-full"
                />
                
                <div className="flex flex-col gap-[10px] w-full">
                  {companies.map((company) => (
                    <EditText
                      key={company.id}
                      placeholder={company.name}
                      fill_background_color={company.selected ? "bg-[#fffded]" : "bg-white"}
                      border_border={company.selected ? "1px solid #fba900" : "1px solid #e0e5ee"}
                      layout_gap="gap-2"
                      layout_width="w-full"
                      padding="p-2"
                      position="relative"
                      label=""
                      error=""
                      helperText=""
                      variant="default"
                      size="medium"
                      onChange={() => {}}
                      className="w-full cursor-pointer"
                      onClick={() => handleCompanySelect(company.name)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/4 bg-white p-[12px]">
            <div className="flex flex-col gap-[8px] justify-start items-center w-full">
              <div className="flex flex-col gap-[8px] justify-start items-start w-full px-[12px]">
                <div className="flex flex-col sm:flex-row justify-start items-center w-full">
                  <div className="flex flex-col sm:flex-row justify-start items-center w-full">
                    <span className="text-xl font-medium leading-xl text-left text-[#29303f7f] mb-2 sm:mb-0">
                      <span className="text-[#29303f7f]">Sector : </span>
                      <span className="text-[#29303f]">Transportation</span>
                    </span>
                    <span className="text-xl font-medium leading-xl text-left text-[#29303f7f] sm:ml-[18px]">
                      <span className="text-[#29303f7f]">Industry : </span>
                      <span className="text-[#29303f]">Automobiles (Including Ancillaries)</span>
                    </span>
                  </div>
                  <span className="text-xl font-medium leading-xl text-right text-[#29303f7f] mt-2 sm:mt-0">
                    Compared to previous 12 months
                  </span>
                </div>

                <div className="w-full overflow-x-auto">
                  <div className="flex flex-row gap-[4px] justify-start items-center min-w-max">
                    {tabs.map((tab) => (
                      <Button
                        key={tab}
                        text={tab}
                        fill_background_color={activeTab === tab ? "bg-[#7856ff]" : "bg-[#f8f8f8]"}
                        text_color={activeTab === tab ? "text-white" : "text-[#29303f7f]"}
                        border_border_radius="rounded-lg"
                        layout_width="auto"
                        padding="px-[10px] py-[4px]"
                        position="relative"
                        variant="secondary"
                        size="small"
                        onClick={() => handleTabChange(tab)}
                        className="whitespace-nowrap"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[12px] justify-start items-center w-full">
                <div className="flex flex-col lg:flex-row justify-start items-center w-full gap-[12px]">
             
                  <div className="w-full lg:w-1/2">
                    <div className="flex flex-col gap-[8px] justify-start items-center w-full">
                      <div className="w-full bg-[#ecf2ff7f] border-l-[3px] border-[#fba900] p-[10px] rounded">
                        <div className="flex flex-row justify-end items-center w-full mb-[4px]">
                          <Image
                            src="/images/img_arrow_drop_up.svg"
                            alt="Up arrow"
                            width={12}
                            height={12}
                            className="w-[12px] h-[12px]"
                          />
                          <span className="text-base font-normal leading-base text-left text-black ml-[4px]">
                            24%
                          </span>
                        </div>
                        <div className="px-[8px]">
                          <span className="text-3xl font-semibold leading-5xl text-left text-[#232538]">
                            {esgData?.exposure || '₹ 552.2 Million'}
                          </span>
                        </div>
                        <div className="px-[8px] mt-[10px]">
                          <span className="text-md font-medium leading-lg text-left text-[#232538]">
                            Exposure
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-[#ecf2ff7f] border-l-[3px] border-[#fba900] p-[4px] rounded">
                        <div className="flex flex-row justify-end items-center w-full mb-[4px] px-[4px]">
                          <Image
                            src="/images/img_arrow_drop_up.svg"
                            alt="Up arrow"
                            width={12}
                            height={12}
                            className="w-[12px] h-[12px]"
                          />
                          <span className="text-base font-normal leading-base text-left text-black ml-[4px]">
                            40%
                          </span>
                        </div>
                        <div className="flex flex-col justify-center items-start w-full px-[4px]">
                          <div className="px-[8px]">
                            <span className="text-xl font-semibold leading-2xl text-left text-[#232538]">
                              Industry ESG Score
                            </span>
                          </div>
                          <span className="text-3xl font-semibold leading-5xl text-left text-[#232538] ml-[8px]">
                            {esgData?.industryScore || '68%'}
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-[#ecf2ff7f] border-l-[3px] border-[#fba900] p-[4px] rounded">
                        <div className="flex flex-row justify-end items-center w-full mb-[4px] px-[4px]">
                          <Image
                            src="/images/img_arrow_drop_up.svg"
                            alt="Up arrow"
                            width={12}
                            height={12}
                            className="w-[12px] h-[12px]"
                          />
                          <span className="text-base font-normal leading-base text-left text-black ml-[4px]">
                            40%
                          </span>
                        </div>
                        <div className="flex flex-col justify-center items-start w-full px-[8px]">
                          <span className="text-xl font-semibold leading-2xl text-left text-[#232538]">
                            PCHI
                          </span>
                          <span className="text-3xl font-semibold leading-5xl text-left text-[#232538]">
                            {esgData?.pchi || '46%'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/4 bg-[#ecf2ff7f] p-[8px] rounded">
                    <div className="flex flex-col justify-start items-center w-full">
                      <div className="flex flex-row gap-[14px] justify-start items-start w-full border-b border-[#e6e6e6] p-[12px]">
                        <Image
                          src="/images/img_group_1000003546.svg"
                          alt="Environment icon"
                          width={56}
                          height={56}
                          className="w-[56px] h-[56px] self-center"
                        />
                        <div className="flex flex-col justify-center items-start w-full mt-[4px]">
                          <span className="text-2xl font-normal leading-3xl text-left text-[#232538]">
                            {esgData?.environment || '54%'}
                          </span>
                          <span className="text-xl font-bold leading-2xl text-left text-[#232538]">
                            Environment
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-row justify-start items-start w-full border-b border-[#e6e6e6] p-[12px]">
                        <Image
                          src="/images/img_group_1000003546_light_blue_a200.svg"
                          alt="Social icon"
                          width={56}
                          height={56}
                          className="w-[56px] h-[56px] self-center"
                        />
                        <div className="flex flex-col justify-center items-start w-full px-[14px] mt-[4px]">
                          <span className="text-2xl font-normal leading-3xl text-left text-[#232538]">
                            {esgData?.social || '69%'}
                          </span>
                          <span className="text-xl font-bold leading-2xl text-left text-[#232538]">
                            Social
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-row gap-[14px] justify-start items-start w-full p-[12px]">
                        <Image
                          src="/images/img_group_1000003546_green_400.svg"
                          alt="Governance icon"
                          width={56}
                          height={56}
                          className="w-[56px] h-[56px] self-center"
                        />
                        <div className="flex flex-col justify-start items-start w-full">
                          <span className="text-2xl font-normal leading-3xl text-left text-[#232538]">
                            {esgData?.governance || '75%'}
                          </span>
                          <span className="text-xl font-bold leading-2xl text-left text-[#232538]">
                            Governance
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/4 bg-[#f6f9ff] rounded-lg p-[16px] ml-0 lg:ml-[12px]">
                    <div className="flex flex-col gap-[18px] justify-start items-center w-full">
                      <div className="bg-[#f6f9ff] px-[34px] py-[2px] mt-[6px]">
                        <span className="text-md font-bold leading-md text-left text-[#2b3674]">
                          Company's Cumulative ESG Rating
                        </span>
                      </div>
                      
                      <div className="w-full h-[294px] bg-white rounded border border-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-full h-full relative">
                            <svg width="100%" height="100%" viewBox="0 0 400 250" className="overflow-visible">
                              <defs>
                                <pattern id="grid" width="40" height="25" patternUnits="userSpaceOnUse">
                                  <path d="M 40 0 L 0 0 0 25" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
                                </pattern>
                              </defs>
                              <rect width="100%" height="100%" fill="url(#grid)" />
                              
                              <text x="10" y="20" fontSize="10" fill="#666">100%</text>
                              <text x="10" y="70" fontSize="10" fill="#666">80%</text>
                              <text x="10" y="120" fontSize="10" fill="#666">60%</text>
                              <text x="10" y="170" fontSize="10" fill="#666">40%</text>
                              <text x="10" y="220" fontSize="10" fill="#666">20%</text>
                              <text x="10" y="245" fontSize="10" fill="#666">0%</text>
                              
                              <polyline
                                fill="none"
                                stroke="#0511f2"
                                strokeWidth="2"
                                points="40,180 70,160 100,170 130,140 160,120 190,130 220,100 250,80 280,90 310,60 340,70 370,50"
                              />
                              
                              {chartData.map((point, index) => (
                                <circle
                                  key={index}
                                  cx={40 + index * 30}
                                  cy={250 - (point.value * 2)}
                                  r="3"
                                  fill="#0511f2"
                                />
                              ))}
                              
                              <text x="35" y="265" fontSize="8" fill="#666">Jan</text>
                              <text x="95" y="265" fontSize="8" fill="#666">Mar</text>
                              <text x="155" y="265" fontSize="8" fill="#666">May</text>
                              <text x="215" y="265" fontSize="8" fill="#666">Jul</text>
                              <text x="275" y="265" fontSize="8" fill="#666">Sep</text>
                              <text x="335" y="265" fontSize="8" fill="#666">Nov</text>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-start items-center w-full">
                  <div className="flex flex-col gap-[10px] justify-start items-start w-full bg-[#f6f9ff] rounded-lg p-[14px]">
                    <div className="bg-[#f6f9ff] px-[34px]">
                      <span className="text-md font-bold leading-md text-left text-[#2b3674]">
                        Pillar wise Risk Breakdown
                      </span>
                    </div>
                    
                    <div className="w-full py-[4px]">
                      <div className="flex flex-col gap-[8px] w-full mb-[4px]">
                   
                        <div className="flex flex-col gap-[2px] justify-start items-start w-full">
                          <span className="text-md font-normal leading-lg text-right text-black">
                            Environmental
                          </span>
                          <div className="flex flex-row gap-[4px] justify-start items-center w-full">
                            <Button
                              text="Resource Use"
                              fill_background_color="bg-[#05ff00]"
                              text_color="text-black"
                              border_border_radius="rounded-xs"
                              layout_width="w-full"
                              padding="px-[12px] py-[12px]"
                              position="relative"
                              variant="secondary"
                              size="medium"
                              onClick={() => {}}
                              className="w-full"
                            />
                            <Button
                              text="Climate Stewardship"
                              fill_background_color="bg-[#acff01]"
                              text_color="text-black"
                              border_border_radius="rounded-xs"
                              layout_width="w-full"
                              padding="px-[32px] py-[14px]"
                              position="relative"
                              variant="secondary"
                              size="medium"
                              onClick={() => {}}
                              className="w-full"
                            />
                            <Button
                              text="Resource Footprint"
                              fill_background_color="bg-[#ff8b00]"
                              text_color="text-black"
                              border_border_radius="rounded-xs"
                              layout_width="w-full"
                              padding="px-[34px] py-[14px]"
                              position="relative"
                              variant="secondary"
                              size="medium"
                              onClick={() => {}}
                              className="w-full"
                            />
                            <Button
                              text="Aspiration Need"
                              fill_background_color="bg-[#fe3c00]"
                              text_color="text-black"
                              border_border_radius="rounded-xs"
                              layout_width="w-full"
                              padding="px-[34px] py-[14px]"
                              position="relative"
                              variant="secondary"
                              size="medium"
                              onClick={() => {}}
                              className="w-full"
                            />
                            <Button
                              text="Growth Need"
                              fill_background_color="bg-[#73ff01]"
                              text_color="text-black"
                              border_border_radius="rounded-xs"
                              layout_width="w-full"
                              padding="px-[34px] py-[14px]"
                              position="relative"
                              variant="secondary"
                              size="medium"
                              onClick={() => {}}
                              className="w-full"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-[2px] justify-start items-start w-full">
                          <span className="text-md font-normal leading-lg text-right text-black">
                            Social
                          </span>
                          <div className="flex flex-row gap-[4px] justify-start items-center w-full">
                            <Button
                              text="Human Capacity"
                              fill_background_color="bg-[#05ff00]"
                              text_color="text-black"
                              border_border_radius="rounded-xs"
                              layout_width="w-full"
                              padding="px-[34px] py-[14px]"
                              position="relative"
                              variant="secondary"
                              size="medium"
                              onClick={() => {}}
                              className="w-full"
                            />
                            <Button
                              text="Community Engagement"
                              fill_background_color="bg-[#76ff01]"
                              text_color="text-black"
                              border_border_radius="rounded-xs"
                              layout_width="w-full"
                              padding="px-[20px] py-[14px]"
                              position="relative"
                              variant="secondary"
                              size="medium"
                              onClick={() => {}}
                              className="w-full"
                            />
                            <Button
                              text="Customer Satisfaction"
                              fill_background_color="bg-[#ff9000]"
                              text_color="text-black"
                              border_border_radius="rounded-xs"
                              layout_width="w-full"
                              padding="px-[28px] py-[14px]"
                              position="relative"
                              variant="secondary"
                              size="medium"
                              onClick={() => {}}
                              className="w-full"
                            />
                            <Button
                              text="Quality Assurance"
                              fill_background_color="bg-[#ffa101]"
                              text_color="text-black"
                              border_border_radius="rounded-xs"
                              layout_width="w-full"
                              padding="px-[34px] py-[14px]"
                              position="relative"
                              variant="secondary"
                              size="medium"
                              onClick={() => {}}
                              className="w-full"
                            />
                            <Button
                              text="Data Risk"
                              fill_background_color="bg-[#fed600]"
                              text_color="text-black"
                              border_border_radius="rounded-xs"
                              layout_width="w-full"
                              padding="px-[34px] py-[14px]"
                              position="relative"
                              variant="secondary"
                              size="medium"
                              onClick={() => {}}
                              className="w-full"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-[2px] justify-start items-start w-full">
                          <span className="text-md font-normal leading-lg text-right text-black">
                            Governance
                          </span>
                          <div className="flex flex-row gap-[4px] justify-start items-center w-full">
                            <Button
                              text="Legal Compliance"
                              fill_background_color="bg-[#d4ff00]"
                              text_color="text-black"
                              border_border_radius="rounded-xs"
                              layout_width="w-full"
                              padding="px-[34px] py-[14px]"
                              position="relative"
                              variant="secondary"
                              size="medium"
                              onClick={() => {}}
                              className="w-full"
                            />
                            <Button
                              text="Board Performance"
                              fill_background_color="bg-[#86ff00]"
                              text_color="text-black"
                              border_border_radius="rounded-xs"
                              layout_width="w-full"
                              padding="px-[34px] py-[14px]"
                              position="relative"
                              variant="secondary"
                              size="medium"
                              onClick={() => {}}
                              className="w-full"
                            />
                            <Button
                              text="Executioner Risk"
                              fill_background_color="bg-[#fed600]"
                              text_color="text-black"
                              border_border_radius="rounded-xs"
                              layout_width="w-full"
                              padding="px-[34px] py-[14px]"
                              position="relative"
                              variant="secondary"
                              size="medium"
                              onClick={() => {}}
                              className="w-full"
                            />
                            <Button
                              text="Competitor Risk"
                              fill_background_color="bg-[#05ff00]"
                              text_color="text-black"
                              border_border_radius="rounded-xs"
                              layout_width="w-full"
                              padding="px-[34px] py-[14px]"
                              position="relative"
                              variant="secondary"
                              size="medium"
                              onClick={() => {}}
                              className="w-full"
                            />
                            <Button
                              text="Financial Risk"
                              fill_background_color="bg-[#ff2700]"
                              text_color="text-black"
                              border_border_radius="rounded-xs"
                              layout_width="w-full"
                              padding="px-[34px] py-[14px]"
                              position="relative"
                              variant="secondary"
                              size="medium"
                              onClick={() => {}}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-[2px] justify-center items-center w-full">
                      <div className="flex flex-row justify-between items-center w-full px-[12px]">
                        <span className="text-xs font-normal leading-xs text-left text-black">
                          Low
                        </span>
                        <span className="text-xs font-normal leading-xs text-left text-black">
                          Medium
                        </span>
                        <span className="text-xs font-normal leading-xs text-left text-black">
                          High
                        </span>
                      </div>
                      <Image
                        src="/images/img_frame_1000003883.png"
                        alt="Risk scale"
                        width={988}
                        height={8}
                        className="w-full h-[8px] rounded-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompaniesStatistics;


