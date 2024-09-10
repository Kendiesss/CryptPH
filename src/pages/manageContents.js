// @/pages/index.js
import React from 'react';
import DummyPage from '@/components/pages/manageContents';
import Footer from './adminFooter';
import Header from './adminHeader';

export default function manageContents() {
  return (
    <div>
      <Header />
      <DummyPage title="Manage Contents" />
      <Footer />

      
    </div>
    
  );  
}