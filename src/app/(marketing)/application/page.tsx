
import { Metadata } from 'next';
import React from 'react';
import { InternalHero } from '@/components/shared/InternalHero/InternalHero';
import { ApplicationLayout } from './components/ApplicationLayout';

export const metadata: Metadata = {
  title: 'Loan Application - Vision Business | Fast & Secure Online Application',
  description: 'Apply for your business or personal loan online. Secure 5-step application process with instant progress tracking. Competitive rates, flexible terms.',
  keywords: [
    'loan application',
    'business loan apply',
    'personal loan online',
    'quick loan application',
    'secure loan process',
    'DRC loans',
    'Kinshasa financing',
    'SME funding application'
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Loan Application - Vision Business | Fast & Secure Online Application',
    description: 'Apply for your business or personal loan online. Secure 5-step application process with instant progress tracking.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://visionbusiness.com/application',
    siteName: 'Vision Business',
    images: [
      {
        url: '/og-application.jpg',
        width: 1200,
        height: 630,
        alt: 'Vision Business Loan Application Process',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Application - Vision Business',
    description: 'Secure online loan application with instant progress tracking',
    images: ['/og-application.jpg'],
  },
  alternates: {
    canonical: 'https://visionbusiness.com/application',
    languages: {
      'fr-FR': 'https://visionbusiness.com/application',
      'en-US': 'https://visionbusiness.com/en/application',
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function page() {
  return (
    <>
        <InternalHero
            title="Obtenez votre prêt"
            subtitle="Notre engagement à respecter les régulations" 
        />
        <ApplicationLayout />
    </>
  );
}