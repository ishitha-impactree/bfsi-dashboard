import { useEffect, useState } from 'react';

interface DeviceDetection {
  isMobile: boolean;
  isMobileOnly: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
}

export const useDeviceDetection = (): DeviceDetection => {
  const [device, setDevice] = useState<DeviceDetection>({
    isMobile: false,
    isMobileOnly: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      setDevice({
        isMobile: innerWidth < 768,
        isMobileOnly: innerWidth >= 320 && innerWidth < 768,
        isTablet: innerWidth >= 768 && innerWidth < 1024,
        isDesktop: innerWidth >= 1024,
        isLargeDesktop: innerWidth >= 1440,
      });
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return device;
};