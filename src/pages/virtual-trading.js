import React from 'react'
import DummyPage from '@/components/DummyPage'
import Footer from './Footer';
import Header from './Header';

export default function VirtualTrading() {
    return (
        <div>
          <Header />
          <DummyPage title="Virtual Trading" />
          <Footer />
        </div>
      );
    }
