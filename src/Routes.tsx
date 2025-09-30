import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CockpitPage from './pages/Cockpit';
import SectorsPage from './pages/Sectors';
import BenchmarksPage from './pages/Benchmarks';
import ReportsPage from './pages/Reports';
import Risks from './pages/Risks';
import PortfolioPage from './pages/Portfolio';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CockpitPage />} />
        <Route path="/cockpit" element={<CockpitPage />} />
        <Route path="/sectors" element={<SectorsPage />} />
        <Route path="/benchmarks" element={<BenchmarksPage />} />
        <Route path="/reports" element={<ReportsPage />}/>
        <Route path="/risks" element={<Risks />} />
        <Route path="/portfolio" element={<PortfolioPage />}/>
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
