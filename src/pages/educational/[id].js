import React from 'react'
import DummyPage from '@/components/pages/educational/[id]';
import Footer from '@/pages/Footer';
import Header from '@/pages/Header2';


export default function learnIndividual() {
    return (
        <div>
          <Header/>
          <DummyPage title="Learn" />
          <Footer />
        </div>
      );
    }
