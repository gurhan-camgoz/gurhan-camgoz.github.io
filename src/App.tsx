import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ResearchPage from './pages/ResearchPage';
import DemoPage from './pages/DemoPage';
import TechnicalPage from './pages/TechnicalPage';
import AboutPage from './pages/AboutPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/technical" element={<TechnicalPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
};

export default App;