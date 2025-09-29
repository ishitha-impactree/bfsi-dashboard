import React, { useState } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';


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
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                  role="menuitem"
                  onClick={() => handleNavigation(item.path, item.label)}
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

const App = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/cockpit" element={<div style={{ padding: '2rem' }}></div>} />
          <Route path="/sectors" element={<div style={{ padding: '2rem' }}></div>} />
          <Route path="/companies" ></Route>
          <Route path="/benchmarks" element={<div style={{ padding: '2rem' }}></div>} />
          <Route path="/reports"></Route>
          <Route path="/" element={<div style={{ padding: '2rem' }}></div>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;