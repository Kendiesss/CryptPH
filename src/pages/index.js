// @/pages/index.js
import React from 'react';
import DummyPage from '@/components/DummyPage';
import Footer from './Footer';
import Header from './Header';

export default function HomePage() {
  return (
    <div>
      <Header />
      <DummyPage title="Home Page" />
      <Footer />

      
    </div>
    
  );  
}
