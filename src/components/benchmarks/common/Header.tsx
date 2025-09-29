import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Dropdown from '../ui/Dropdown';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation() as ReturnType<typeof useLocation> & { state?: { from?: string } };

  const navigationItems = [
    { 
      label: 'Cockpit', 
      path: '/cockpit',
      isActive: location.pathname === '/' || location.pathname === '/cockpit'
    },
    { 
      label: 'Sectors', 
      path: '/sectors',
      isActive: location.pathname === '/sectors'
    },
    { 
      label: 'Companies', 
      path: '/companies',
      isActive: location.pathname === '' && location.state?.from === 'Companies'
    },
    { 
      label: 'Benchmarks', 
      path: '/benchmarks',
      isActive: location.pathname === '/benchmarks'
    },
   { 
      label: 'Reports', 
      path: '/reports',
      isActive: location.pathname === '/reports'
    },
  ];


  const getCurrentPageTitle = () => {
    const currentItem = navigationItems.find(item => item.isActive);
    return currentItem?.label || 'Benchmarks';
  };

  return (
    <header className={`w-full bg-header-background ${className || ''}`}>
      <div className="w-full px-3 sm:px-6 lg:px-3">
        <div className="flex justify-between items-center py-4">
      
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/cockpit')}>
            <img 
              src="/images/img_header_logo.png" 
              alt="Logo" 
              className="w-[116px] h-[28px] hover:opacity-80 transition-opacity"
            />
          </div>

          <button 
            className="block lg:hidden p-2 text-header-text hover:text-header-accent transition-colors"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <nav className={`${menuOpen ? 'block' : 'hidden'} lg:block absolute lg:relative top-full lg:top-auto left-0 lg:left-auto w-full lg:w-auto bg-header-background lg:bg-transparent border-t lg:border-t-0 border-gray-700 lg:border-none z-50 transition-all duration-300 ease-in-out`}>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-[74px] p-4 lg:p-0">
              {navigationItems.map((item, index) => (
                <div key={index} className="relative">
                  <button 
                    className={`text-lg font-bold leading-lg text-left transition-all duration-200 ease-in-out transform hover:scale-105 ${
                      item.isActive 
                        ? 'text-header-accent' : 'text-header-text hover:text-header-accent'
                    } ${
                      item.path === '#' ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                    
                  >
                    {item.label}
                  </button>
                  {item.isActive && (
                    <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-header-accent"></div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-[18px]">
            <div className="flex flex-col gap-1 items-end">
              <span className="text-md font-bold leading-md text-left text-header-text">
                Welcome Roxanne
              </span>
              <span className="text-md font-normal leading-md text-right text-header-text">
                15 Sep, Mon
              </span>
            </div>

            <div className="flex-shrink-0">
              <img 
                src="/images/img_shape.png" 
                alt="Profile" 
                className="w-[34px] h-[34px] rounded-4xl border border-gray-300 hover:opacity-80 transition-opacity cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className={`${menuOpen ? 'block' : 'hidden'} lg:hidden border-t border-gray-700 pt-4 pb-2`}>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-md font-bold leading-md text-header-text">
                Welcome Roxanne
              </span>
              <span className="text-md font-normal leading-md text-header-text">
                15 Sep, Mon
              </span>
            </div>
            <img 
              src="/images/img_shape.png" 
              alt="Profile" 
              className="w-[34px] h-[34px] rounded-4xl border border-gray-300"
            />
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-700">
            <div className="flex items-center text-sm text-header-text">
              <span className="hover:text-header-accent transition-colors cursor-pointer" 
                    onClick={() => navigate('/portfolio-climate-risk')}>
                Home
              </span>
              <span className="mx-2">/</span>
              <span className="text-header-accent font-medium">{getCurrentPageTitle()}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;