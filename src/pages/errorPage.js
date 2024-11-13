import React from 'react'
import DummyPage from '@/components/pages/errorPage'
import Footer from './Footer';
import Header from './Header2';

export default function ErrorPage() {
    return (
        <div>
          <Header/>
          <DummyPage title="ErrorPage" />
          <Footer />
        </div>
      );
    }
