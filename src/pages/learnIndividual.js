import React from 'react'
import DummyPage from '@/components/pages/learnIndividual';
import Footer from './Footer';
import Header from './Header2';


export default function learnIndividual() {
    return (
        <div>
          <Header/>
          <DummyPage title="Learn Individual" />
          <Footer />
        </div>
      );
    }
