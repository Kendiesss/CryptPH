import React from 'react'
import DummyPage from '@/components/pages/vtrading'
import Footer from './Footer';
import Header from './Header2';
import withAdminAuth from '@/pages/api/auth/withAdminAuth';


function VirtualTrading() {
    return (
        <div>
          <Header />
          <DummyPage title="Virtual Trading" />
          <Footer />
        </div>
      );
}

export default withAdminAuth(VirtualTrading);