import React from 'react'
import DummyPage from '@/components/pages/newsIndividual';
import Footer from './Footer';
import Header from './Header2';


export default function newsIndividual() {
    return (
        <div>
          <Header/>
          <DummyPage title="News Individual" />
          <Footer />
        </div>
      );
    }
