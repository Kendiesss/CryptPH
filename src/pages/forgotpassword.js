// @/pages/index.js
import React from 'react';
import DummyPage from '@/components/pages/forgotpwd';
import Footer from './Footer';
import Header from './Header2';

export default function Profile() {
  return (
    <div>
      <Header />
      <DummyPage title="Forgot Password" />
      <Footer />
    </div>
  );  
}