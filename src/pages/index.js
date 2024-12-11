// @/pages/index.js
import React from 'react';
import DummyPage from '@/components/pages/dashboard';
import Footer from './Footer';
import Header from './Header';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import FeedbackForm from './feedback';

export default function HomePage() {
  return (
    <div>
      <Header />
      <DummyPage title="Home Page" />
      <Analytics />
      <SpeedInsights />
      <Footer />
      <FeedbackForm />


    </div>

  );
}
