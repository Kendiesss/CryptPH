// @/pages/index.js
import React from 'react';
import DummyPage from '@/components/pages/manageFAQs';
import Footer from './adminFooter';
import Header from './adminHeader';

export default function manageFAQs() {
  return (
    <div>
      <Header />
      <DummyPage title="Manage FAQs" />
      <Footer />

      
    </div>
    
  );  
}