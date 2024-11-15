// @/pages/index.js
import React from 'react';
import DummyPage from '@/components/pages/profile';
import Footer from './Footer';
import Header from './Header2';
import withAdminAuth from '@/pages/api/auth/withAdminAuth';

function Profile() {
  return (
    <div>
      <Header />
      <DummyPage title="Profile Page" />
      <Footer />
    </div>
  );  
}

export default withAdminAuth(Profile);
