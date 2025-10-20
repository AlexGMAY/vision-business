'use client'

import Link from 'next/link'
import { useDarkMode } from '../shared/DarkModeProvider'
import { LanguageSwitcher } from '../shared/LanguageSwitcher'

export function Navigation() {
  const { isDark, toggleDarkMode } = useDarkMode()

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Vision Business Microfinance */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">VB</span>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-4 h-4 border-2 border-white"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                Vision Business
              </span>
              <div className='flex justify-end'>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Microfinance
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">            
            <Link 
              href="/vision-business-microfinance" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium relative group"
            >
              VB Microfinance
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/prets" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium relative group"
            >
              Nos Prêts
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/fonctionnement" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium relative group"
            >
              Comment ça marche
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/application" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium relative group"
            >
              Obtenir un pret
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors hover:scale-110 transform duration-200"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <LanguageSwitcher />

            <Link 
              href="/application" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Demander un Prêt
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
