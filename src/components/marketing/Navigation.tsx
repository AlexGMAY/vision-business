'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useDarkMode } from '../shared/DarkModeProvider'
import { LanguageSwitcher } from '../shared/LanguageSwitcher'
import { useTranslation } from '@/lib/i18n/client'

export function Navigation() {
  const { isDark, toggleDarkMode } = useDarkMode()
  const { t } = useTranslation()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { href: "/vision-business-microfinance", key: "microfinance" },
    { href: "/prets", key: "loans" },
    { href: "/fonctionnement", key: "howItWorks" },
    { href: "/application", key: "getLoan" },
    { href: "/contact", key: "contact" }
  ]

  // Function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo Vision Business Microfinance */}
          <Link href="/" className="flex items-center space-x-2 lg:space-x-3 group flex-shrink-0">
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm lg:text-lg">VB</span>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-3 h-3 lg:w-4 lg:h-4 border-2 border-white"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white leading-tight">
                Vision Business
              </span>
              <div className='flex justify-end'>
                <span className="text-xs lg:text-sm text-gray-400 font-medium bg-gray-800 px-1.5 lg:px-2 py-0.5 lg:py-1 rounded">
                  {t('navigation', 'microfinance') || "Microfinance"}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1 justify-center">            
            {navigationItems.map((item) => {
              const isActive = isActiveLink(item.href)
              return (
                <Link 
                  key={item.key}
                  href={item.href} 
                  className={`transition-colors font-medium relative group text-sm xl:text-base ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {t('navigation', item.key) || item.key}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              )
            })}
          </div>

          {/* Right Side Controls - Desktop */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4 flex-shrink-0">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors hover:scale-110 transform duration-200"
              aria-label={isDark ? t('navigation', 'switchToLight') || "Switch to light mode" : t('navigation', 'switchToDark') || "Switch to dark mode"}
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <LanguageSwitcher />

            <Link 
              href="/application" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 xl:px-6 py-2 xl:py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm xl:text-base whitespace-nowrap"
            >
              {t('navigation', 'applyForLoan') || "Demander un Prêt"}
            </Link>
          </div>

          {/* Mobile Right Side Controls */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <LanguageSwitcher />
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}></span>
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-4 border-t border-gray-200 dark:border-gray-700">
            {navigationItems.map((item) => {
              const isActive = isActiveLink(item.href)
              return (
                <Link 
                  key={item.key}
                  href={item.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block transition-colors font-medium py-2 text-lg ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {t('navigation', item.key) || item.key}
                </Link>
              )
            })}
            
            {/* Mobile CTA Button */}
            <Link 
              href="/application" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg mt-4"
            >
              {t('navigation', 'applyForLoan') || "Demander un Prêt"}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
