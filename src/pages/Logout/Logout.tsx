import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoutProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const Logout: React.FC<LogoutProps> = ({ isOpen, onClose, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    onClose();
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/');
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          maxWidth: '400px',
          width: '90%',
          textAlign: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: '#f59e0b', margin: '0 auto 1rem' }}
          >
            <path d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2Zm10-10V7a4 4 0 0 0-8 0v4h8Z" />
          </svg>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#1f2937', fontSize: '1.25rem', fontWeight: '600' }}>
            Confirm Logout
          </h3>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
            Are you sure you want to logout? You'll need to sign in again to access your account.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 24px',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 24px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;