import React from 'react'
import DummyPage from '@/components/DummyPage'
import Footer from './Footer';
import Header from './Header';


export default function News() {
    return (
        <div>
          <Header/>
          <DummyPage title="News" />
          <Footer />
        </div>
      );
    }
