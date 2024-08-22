// @/pages/index.js
import React from 'react';
import DummyPage from '@/components/DummyPage';
import Footer from './Footer';
import Header from './Header';

export default function Profile() {
  return (
    <div>
      <Header />
      <DummyPage title="Profile Page" />
      <Footer />
    </div>
  );  
}
