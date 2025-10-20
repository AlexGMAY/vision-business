import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { DarkModeProvider } from '@/components/shared/DarkModeProvider'
import './globals.css'
import { getCurrentLocale } from '@/lib/i18n/server'
import { TranslationsProvider } from '@/lib/i18n/client'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vision Business - Votre Partenaire de Confiance pour les Prêts',
  description: 'Prêts rapides et transparents pour étudiants, petites entreprises et besoins personnels. Votre vision, notre métier.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = getCurrentLocale('/fr')
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}>
        <TranslationsProvider initialLocale={locale}>
          <DarkModeProvider>
            {children}
          </DarkModeProvider>
        </TranslationsProvider>
      </body>
    </html>
  )
}