import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { DarkModeProvider } from '@/components/shared/DarkModeProvider'
import './globals.css'
import { TranslationsProvider } from '@/lib/i18n/client'

const inter = Inter({ subsets: ['latin'] })

// SEO Configuration - Multi-language ready
export const metadata: Metadata = {
  title: {
    default: 'Vision Business - Votre Partenaire de Confiance pour les Prêts',
    template: '%s | Vision Business'
  },
  description: 'Prêts rapides et transparents pour étudiants, petites entreprises et besoins personnels. Votre vision, notre métier.',
  keywords: ['prêt', 'financement', 'business', 'RD Congo', 'Kinshasa', 'loan', 'funding'],
  authors: [{ name: 'Vision Business' }],
  creator: 'Vision Business',
  publisher: 'Vision Business',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://visionbusiness.com'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://visionbusiness.com',
    siteName: 'Vision Business',
    title: 'Vision Business - Votre Partenaire de Confiance pour les Prêts',
    description: 'Prêts rapides et transparents pour étudiants, petites entreprises et besoins personnels.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vision Business',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vision Business - Votre Partenaire de Confiance pour les Prêts',
    description: 'Prêts rapides et transparents pour étudiants, petites entreprises et besoins personnels.',
    images: ['/og-image.jpg'],
    creator: '@visionbusiness',
  },
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
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  // Initialize services - but handle potential errors
  if (typeof window === 'undefined') {
    // Server-side only
    const initializeApplicationServices = async () => {
      try {
        const { initializeApplicationServices } = await import('@/lib/redis/init');
        await initializeApplicationServices();
      } catch (error) {
        console.error('Failed to initialize application services:', error);
      }
    };
    initializeApplicationServices().catch(console.error);
  }
  
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        
        {/* Preload critical translations */}
        <link rel="preload" href="/locales/fr/common.json" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/locales/fr/prets.json" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}>
        <TranslationsProvider>
          <DarkModeProvider>
            {children}
          </DarkModeProvider>
        </TranslationsProvider>
      </body>
    </html>
  )
}

