import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PortfolioClimateRiskPage from './pages/Cockpit';
import SectorsPerformanceAnalysisPage from './pages/Sectors';
import BenchmarksPage from './pages/Benchmarks';
import ComplianceReportingPage from './pages/Reports';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioClimateRiskPage />} />
        <Route path="/cockpit" element={<PortfolioClimateRiskPage />} />
        <Route path="/sectors" element={<SectorsPerformanceAnalysisPage />} />
        <Route path="/benchmarks" element={<BenchmarksPage />} />
        <Route path="/reports" element={<ComplianceReportingPage />}/>
      </Routes>
    </Router>
  );
};

export default AppRoutes;