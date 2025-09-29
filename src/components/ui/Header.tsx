import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from './AppIcon';
import Button from './Button';
import Select from './Select';

type NotificationType = 'warning' | 'success' | 'error';
type PortfolioValue = 'global' | 'north-america' | 'europe' | 'asia-pacific' | 'emerging-markets';

interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  time: string;
  unread: boolean;
}

interface NavigationItem {
  path: string;
  label: string;
  icon: string;
}

interface PortfolioOption {
  value: PortfolioValue;
  label: string;
}

const Header: React.FC = () => {
  const location = useLocation();
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioValue>('global');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: 'warning', message: 'Q3 compliance report due in 5 days', time: '2 hours ago', unread: true },
    { id: 2, type: 'success', message: 'Portfolio emissions reduced by 12%', time: '1 day ago', unread: true },
    { id: 3, type: 'error', message: 'Data sync failed for European portfolio', time: '2 days ago', unread: false }
  ]);

  const navigationItems: NavigationItem[] = [
    { path: '/emissions-overview', label: 'Overview', icon: 'BarChart3' },
    { path: '/portfolio-analytics', label: 'Portfolio', icon: 'PieChart' },
    { path: '/risk-assessment', label: 'Risk', icon: 'AlertTriangle' },
    { path: '/compliance-reporting', label: 'Compliance', icon: 'FileText' }
  ];

  const portfolioOptions: PortfolioOption[] = [
    { value: 'global', label: 'Global Portfolio' },
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia-pacific', label: 'Asia Pacific' },
    { value: 'emerging-markets', label: 'Emerging Markets' }
  ];

  const handlePortfolioChange = (value: string | number | (string | number)[]): void => {
    if (typeof value === 'string') {
      setSelectedPortfolio(value as PortfolioValue);
    }
  };

  const handleRefresh = async (): Promise<void> => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastRefresh(new Date());
      setIsRefreshing(false);
    }, 2000);
  };

  const handleNotificationClick = (notificationId: number): void => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, unread: false } : notif
      )
    );
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (isNotificationOpen && !target.closest('.notification-panel')) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotificationOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg gradient-data-viz flex items-center justify-center">
              <Icon name="Leaf" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-foreground">Financed Emissions</h1>
              <span className="text-xs text-muted-foreground">Dashboard</span>
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <a
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-out ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden lg:block w-48">
            <Select
              options={portfolioOptions}
              value={selectedPortfolio}
              onChange={handlePortfolioChange}
              placeholder="Select portfolio"
            />
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Button
              variant="outline"
              size="small"
              onClick={handleRefresh}
              disabled={isRefreshing}
              iconName={isRefreshing ? "Loader2" : "RefreshCw"}
              iconSize={14}
              className={isRefreshing ? "animate-spin" : ""}
            >
              <span className="hidden sm:inline ml-1">
                {isRefreshing ? 'Updating...' : `Updated ${formatTime(lastRefresh)}`}
              </span>
            </Button>
          </div>

          <div className="relative notification-panel">
            <Button
              variant="outline"
              size="small"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative"
            >
              <Icon name="Bell" size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevation-3 backdrop-blur-subtle">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium text-popover-foreground">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                      className={`p-4 border-b border-border cursor-pointer hover:bg-muted transition-colors duration-150 ${
                        notification.unread ? 'bg-muted/50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'error' ? 'bg-error' :
                          notification.type === 'warning' ? 'bg-warning' : 'bg-success'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm text-popover-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <Button variant="outline" size="small" className="w-full">
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <Button variant="outline" size="small">
              <Icon name="Menu" size={18} />
            </Button>
          </div>
        </div>
      </div>
      <div className="md:hidden border-t border-border bg-card">
        <nav className="flex overflow-x-auto">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <a
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center space-y-1 px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors duration-150 ${
                  isActive
                    ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;