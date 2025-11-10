'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type DarkModeContextType = {
  isDark: boolean
  toggleDarkMode: () => void
}

const DarkModeContext = createContext<DarkModeContextType>({
  isDark: false,
  toggleDarkMode: () => {},
})

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    try {
      const saved = localStorage.getItem('darkMode')
      if (saved !== null) {
        setIsDark(saved === 'true')
      } else {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setIsDark(systemDark)
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error)
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(systemDark)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      if (isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      
      try {
        localStorage.setItem('darkMode', isDark.toString())
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    }
  }, [isDark, mounted])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
  }

  // Provide default values until mounted to prevent hydration issues
  const contextValue = mounted 
    ? { isDark, toggleDarkMode }
    : { isDark: false, toggleDarkMode: () => {} }

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  )
}

export function useDarkMode() {
  return useContext(DarkModeContext)
}