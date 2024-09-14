import React from 'react'
import DummyPage from '@/components/pages/charts'
import Footer from './Footer';
import Header from './Header2';

export default function Charts() {
    return (
        <div>
          <Header/>
          <DummyPage title="Charts" />
          <Footer />
        </div>
      );
    }
