import React from 'react'
import DummyPage from '@/components/pages/learn'
import Footer from './Footer';
import Header from './Header';

export default function Learn() {
    return (
        <div>
          <Header />
          <DummyPage title="Learn" />
          <Footer />
        </div>
      );
    }
