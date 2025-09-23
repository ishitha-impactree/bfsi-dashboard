import { Metadata } from 'next';
 import DashboardPage from'./index';

export const metadata: Metadata = {
  title: 'RB-CRIS Index Dashboard - Real-time Financial Analytics',
  description: 'Monitor RB-CRIS Index performance with real-time data visualization, track portfolio metrics against industry benchmarks, and stay updated with latest financial news from trusted sources.',
  keywords: 'RB-CRIS Index, financial dashboard, portfolio performance, industry benchmark, market analytics, financial news, investment tracking, real-time data',
  
  openGraph: {
    title: 'RB-CRIS Index Dashboard - Real-time Financial Analytics',
    description: 'Monitor RB-CRIS Index performance with real-time data visualization, track portfolio metrics against industry benchmarks, and stay updated with latest financial news.',
  }
}

export default function Page() {
  return <DashboardPage />
}