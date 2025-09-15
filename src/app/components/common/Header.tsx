import React, { useState } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';

const UnderDevelopment = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: '#e3f2fd',
        color: '#1976d2',
        marginBottom: '2rem',
        animation: 'pulse 2s infinite ease-in-out'
      }}>
        <svg 
          width="50" 
          height="50" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      </div>
      
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 600,
        color: '#333',
        marginBottom: '1rem',
        lineHeight: 1.2
      }}>
        Under Development
      </h1>
      
      <p style={{
        fontSize: '1.25rem',
        color: '#666',
        fontWeight: 400,
        lineHeight: 1.6,
        maxWidth: '500px'
      }}>
        This page is currently in progress. Our team is working hard to bring you 
        this feature soon. Please check back later!
      </p>
      
      <div style={{
        width: '200px',
        height: '4px',
        backgroundColor: '#e0e0e0',
        borderRadius: '2px',
        marginTop: '2rem',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '60%',
          backgroundColor: '#1976d2',
          animation: 'progress 2s infinite ease-in-out'
        }} />
      </div>
      
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes progress {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(250%); }
          }
        `}
      </style>
    </div>
  );
};

type DropdownOption = { value: string; label: string };
type DropdownProps = {
  className?: string;
  padding?: string;
  options: DropdownOption[];
};

const Dropdown: React.FC<DropdownProps> = ({ className, padding, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={className} style={{ position: 'relative', display: 'inline-block' }}>
      <button 
        style={{ 
          padding: padding,
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: 'white',
          cursor: 'pointer'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        Options ▼
      </button>
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          minWidth: '120px',
          zIndex: 1000,
          marginTop: '4px'
        }}>
          {options.map(option => (
            <div 
              key={option.value}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee'
              }}
              onClick={() => setIsOpen(false)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Header: React.FC<{ className?: string }> = ({ className }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
      isActive: location.pathname === '/companies'
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
    }
  ];

  const handleNavigation = (path: string, label: string) => {
    if (path !== '#') {
      navigate(path);
      setMenuOpen(false); 
    }
  };

  const getCurrentPageTitle = () => {
    const currentItem = navigationItems.find(item => item.isActive);
    return currentItem?.label || 'Dashboard';
  };

  return (
    <header style={{ 
      width: '100%', 
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #e9ecef',
      ...(className ? JSON.parse(className) : {})
    }}>
      <div style={{ 
        width: '100%',
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 0'
        }}>
          <div style={{ 
            flexShrink: 0,
            cursor: 'pointer'
          }} onClick={() => navigate('/cockpit')}>
            <div style={{
              width: '116px',
              height: '28px',
              backgroundColor: '#ddd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: '#555'
            }}>
              LOGO
            </div>
          </div>

          <button 
            style={{
              display: 'block',
              padding: '0.5rem',
              color: '#6c757d',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
            className="mobile-only"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <nav style={{ 
            display: menuOpen ? 'block' : 'none',
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            backgroundColor: '#f8f9fa',
            borderTop: '1px solid #e9ecef',
            zIndex: 50,
          }} className="desktop-nav">
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              padding: '1rem'
            }}>
              {navigationItems.map((item, index) => (
                <button 
                  key={index}
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textAlign: 'left',
                    transition: 'all 0.2s ease-in-out',
                    color: item.isActive ? '#1976d2' : '#6c757d',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: item.path === '#' ? 'not-allowed' : 'pointer',
                    opacity: item.path === '#' ? 0.6 : 1,
                    textDecoration: item.isActive ? 'underline' : 'none'
                  }}
                  role="menuitem"
                  onClick={() => handleNavigation(item.path, item.label)}
                  disabled={item.path === '#'}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          <div style={{ 
            display: 'none',
            alignItems: 'center',
            gap: '1rem'
          }} className="desktop-only">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#495057' }}>
                Welcome Roxanne
              </span>
              <span style={{ fontSize: '14px', color: '#6c757d' }}>
                15 Sep, Mon
              </span>
            </div>

            <div style={{ flexShrink: 0 }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: '#ddd',
                border: '1px solid #ccc',
                cursor: 'pointer'
              }} />
            </div>
          </div>
        </div>

        <div style={{ 
          display: menuOpen ? 'block' : 'none',
          borderTop: '1px solid #e9ecef',
          padding: '1rem 0'
        }} className="mobile-only">
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#495057' }}>
                Welcome Roxanne
              </span>
              <span style={{ fontSize: '14px', color: '#6c757d' }}>
                15 Sep, Mon
              </span>
            </div>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: '#ddd',
              border: '1px solid #ccc'
            }} />
          </div>
          
        </div>
      </div>
      
      <style>
        {`
          @media (min-width: 1024px) {
            .desktop-only {
              display: flex !important;
            }
            .mobile-only {
              display: none !important;
            }
            .desktop-nav {
              display: block !important;
              position: relative !important;
              top: auto !important;
              left: auto !important;
              width: auto !important;
              background-color: transparent !important;
              border: none !important;
            }
            .desktop-nav div {
              flex-direction: row !important;
              gap: 4rem !important;
              padding: 0 !important;
            }
          }
        `}
      </style>
    </header>
  );
};

// Main App Component with Routing
const App = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/cockpit" element={<div style={{ padding: '2rem' }}><h2>Cockpit Page</h2><p>This is the Cockpit page content.</p></div>} />
          <Route path="/sectors" element={<div style={{ padding: '2rem' }}><h2>Sectors Page</h2><p>This is the Sectors page content.</p></div>} />
          <Route path="/companies" element={<UnderDevelopment />} />
          <Route path="/benchmarks" element={<UnderDevelopment />} />
          <Route path="/reports" element={<UnderDevelopment />} />
          <Route path="/" element={<div style={{ padding: '2rem' }}><h2>Cockpit Page</h2><p>This is the Cockpit page content.</p></div>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;