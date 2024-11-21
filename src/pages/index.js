// @/pages/index.js
import React from 'react';
import DummyPage from '@/components/pages/dashboard';
import Footer from './Footer';
import Header from './Header';
import { Analytics } from "@vercel/analytics/react"

export default function HomePage() {
  return (
    <div>
      <Header />
      <DummyPage title="Home Page" />
      <Analytics />
      <Footer />


    </div>

  );
}
