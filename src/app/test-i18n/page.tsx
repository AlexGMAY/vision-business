'use client'

import { useTranslation } from '@/lib/i18n/client'

export default function TestI18n() {
  const { t, locale, setLocale } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Test du système i18n</h1>
        
        <div className="space-y-4 mb-8">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h2 className="font-semibold mb-2">Common:</h2>
            <p>{t('common', 'welcome')}</p>
            <p>{t('common', 'loading')}</p>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h2 className="font-semibold mb-2">Navigation:</h2>
            <p>{t('navigation', 'home')}</p>
            <p>{t('navigation', 'applyForLoan')}</p>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h2 className="font-semibold mb-2">Homepage:</h2>
            <p>{t('homepage', 'hero.title')}</p>
            <p>{t('homepage', 'features.fastApproval.title')}</p>
          </div>

          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h2 className="font-semibold mb-2">Avec paramètres:</h2>
            <p>{t('forms', 'errors.minAmount', { amount: '50,000' })}</p>
          </div>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="font-semibold">Locale actuelle: {locale}</p>
          <button 
            onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Changer de langue
          </button>
        </div>
      </div>
    </div>
  )
}