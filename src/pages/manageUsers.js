// @/pages/index.js
import React from 'react';
import DummyPage from '@/components/pages/manageUsers';
import Footer from './adminFooter';
import Header from './adminHeader';

export default function manageContents() {
  return (
    <div>
      <Header />
      <DummyPage title="Manage Users" />
      <Footer />

      
    </div>
    
  );  
}