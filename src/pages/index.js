// @/pages/index.js
import React from 'react';
import DummyPage from '@/components/pages/dashboard';
import Footer from './Footer';
import Header from './Header';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SlSpeedometer } from 'react-icons/sl';


export default function HomePage() {
  return (
    <div>
      <Header />
      <DummyPage title="Home Page" />
      <Analytics />
      <SpeedInsights />
      <Footer />


    </div>

  );
}
