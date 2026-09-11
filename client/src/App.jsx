import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <div className="flex flex-col min-h-screen font-bengali bg-slate-50 text-slate-800">
            {/* Main Sticky Header */}
            <Navbar />

            {/* Main Content Viewport */}
            <main className="flex-grow">
              <AppRoutes />
            </main>

            {/* Global Footer */}
            <Footer />
          </div>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
