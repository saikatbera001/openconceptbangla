import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EtekSolution from '../pages/EtekSolution';
import Tools from '../pages/Tools';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Primary E-Tek Solution Web Application */}
      <Route path="/" element={<EtekSolution />} />
      <Route path="/eteksolution" element={<EtekSolution />} />
      <Route path="/etek" element={<EtekSolution />} />
      <Route path="/home" element={<EtekSolution />} />
      <Route path="/services" element={<EtekSolution />} />
      <Route path="/services/:serviceId" element={<EtekSolution />} />

      {/* Online Citizen & Cyber Cafe Tools Suite */}
      <Route path="/tools" element={<Tools />} />
      <Route path="/tools/:toolId" element={<Tools />} />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}


