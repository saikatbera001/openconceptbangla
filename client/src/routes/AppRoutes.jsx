import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from '../pages/Home';
import Blogs from '../pages/Blogs';
import BlogDetail from '../pages/BlogDetail';
import Category from '../pages/Category';
import Search from '../pages/Search';
import Tools from '../pages/Tools';
import GovtWebsites from '../pages/GovtWebsites';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import Bookmarks from '../pages/Bookmarks';
import AdminDashboard from '../pages/AdminDashboard';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blog/:slug" element={<BlogDetail />} />
      <Route path="/category/:slug" element={<Category />} />
      <Route path="/search" element={<Search />} />
      <Route path="/tools" element={<Tools />} />
      <Route path="/tools/:toolId" element={<Tools />} />
      <Route path="/government-websites" element={<GovtWebsites />} />
      <Route path="/govt-websites" element={<GovtWebsites />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ForgotPassword />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/admin/settings" element={<Settings />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
