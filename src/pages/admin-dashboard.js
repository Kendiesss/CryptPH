// @/pages/index.js
import React from 'react';
import DummyPage from '@/components/pages/admin-dashboard';
import Footer from './adminFooter';
import Header from './adminHeader';

export default function AdminPage() {
  return (
    <div>
      <Header />
      <DummyPage title="Admin Dashboard" />
      <Footer />

      
    </div>
    
  );  
}