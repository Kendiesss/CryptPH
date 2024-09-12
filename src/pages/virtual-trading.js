import React from 'react'
import DummyPage from '@/components/pages/vtrading'
import Footer from './Footer';
import Header from './Header2';

export default function VirtualTrading() {
    return (
        <div>
          <Header />
          <DummyPage title="Virtual Trading" />
          <Footer />
        </div>
      );
    }
