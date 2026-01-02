import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import { LandingPage } from './pages/LandingPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { GeneratorPage } from './pages/GeneratorPage';
import { ExportPage } from './pages/ExportPage';
export function App() {
  return <Router>
      <ResumeProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/generator" element={<GeneratorPage />} />
          <Route path="/export" element={<ExportPage />} />
        </Routes>
      </ResumeProvider>
    </Router>;
}