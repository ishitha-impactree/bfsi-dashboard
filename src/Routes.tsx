import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PortfolioClimateRiskPage from './pages/Cockpit';
import SectorsPerformanceAnalysisPage from './pages/Sectors';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioClimateRiskPage />} />
        <Route path="/cockpit" element={<PortfolioClimateRiskPage />} />
        <Route path="/sectors" element={<SectorsPerformanceAnalysisPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;