import React from 'react';
import './index.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: {
    default: 'RB-CRIS Financial Analytics Platform',
    template: 'RB-CRIS Financial Analytics Platform | %s',
  },
  description: 'Professional financial analytics platform for RB-CRIS Index monitoring, portfolio performance tracking, and real-time market data visualization with integrated news updates.',
  keywords: 'RB-CRIS, financial analytics, portfolio tracking, market data, investment dashboard, financial news, performance monitoring',
  
  openGraph: {
    type: 'website',
    title: {
      default: 'RB-CRIS Financial Analytics Platform',
      template: 'RB-CRIS Financial Analytics Platform | %s',
    },
    description: 'Monitor RB-CRIS Index performance, track portfolio metrics, and access real-time financial news through our comprehensive analytics dashboard.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}<script type="module" src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fishithas7453back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.8"></script>
</body>
    </html>
  );
}