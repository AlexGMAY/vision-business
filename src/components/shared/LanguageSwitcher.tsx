'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import ReactCountryFlag from 'react-country-flag'
import { useTranslation } from '@/lib/i18n/client'
import { locales, localeFlags, type Locale } from '@/lib/i18n/config'

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const languages = locales.map(code => ({
    code,
    name: code === 'fr' ? 'Français' : 'English',
    countryCode: localeFlags[code]
  }))

  const currentLanguage = languages.find(lang => lang.code === locale)

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale)
    setIsOpen(false)
    // Ici on ajoutera la logique de changement d'URL plus tard
    console.log('Changing language to:', newLocale)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        className="flex items-center space-x-3 p-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {currentLanguage && (
          <ReactCountryFlag 
            countryCode={currentLanguage.countryCode} 
            svg 
            className="w-2 h-2 rounded shadow-sm"
          />
        )}
        {/* <span className="font-semibold text-sm">{currentLanguage?.code.toUpperCase()}</span> */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-500 dark:text-gray-400"
        >
          <FiChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-56 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden z-50"
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full px-4 py-4 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 flex items-center space-x-4 group border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                  locale === language.code 
                    ? 'bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <ReactCountryFlag 
                  countryCode={language.countryCode} 
                  svg 
                  className="w-6 h-4 rounded shadow-sm transition-transform duration-200 group-hover:scale-110"
                />
                <div className="flex-1 text-left">
                  <div className="font-semibold">{language.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                    {language.code}
                  </div>
                </div>
                {locale === language.code && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}