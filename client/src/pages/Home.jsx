import React from 'react';
import Hero from '../components/home/Hero';
import ServiceGrid from '../components/home/ServiceGrid';
import ToolsSection from '../components/home/ToolsSection';
import FeaturedPosts from '../components/home/FeaturedPosts';
import LatestAndSidebar from '../components/home/LatestAndSidebar';

export default function Home() {
  return (
    <div>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Government & Citizen Services Quick Cards */}
      <ServiceGrid />

      {/* 3. Useful Online Citizen Tools Showcase */}
      <ToolsSection />

      {/* 4. Featured & Top Articles */}
      <FeaturedPosts />

      {/* 5. Latest Articles Feed + Popular Sidebar */}
      <LatestAndSidebar />
    </div>
  );
}
