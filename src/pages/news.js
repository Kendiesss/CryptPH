import React from 'react'
import DummyPage from '@/components/pages/news'
import Footer from './Footer';
import Header from './Header2';


export default function News() {
    return (
        <div>
          <Header/>
          <DummyPage title="News" />
          <Footer />
        </div>
      );
    }
