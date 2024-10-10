import React from 'react'
import DummyPage from '@/components/pages/news/[id]';
import Footer from '@/pages/Footer';
import Header from '@/pages/Header2';


export default function newsIndividual() {
    return (
        <div>
          <Header/>
          <DummyPage title="News" />
          <Footer />
        </div>
      );
    }
