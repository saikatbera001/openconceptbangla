import React from 'react';
import { HashRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
        <AppRoutes />
      </div>
    </HashRouter>
  );
}


