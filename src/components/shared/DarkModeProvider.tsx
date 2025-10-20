'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type DarkModeContextType = {
  isDark: boolean
  toggleDarkMode: () => void
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined)

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true) // Default to dark mode

  useEffect(() => {
    // Apply dark mode class to html element
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
  }

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider')
  }
  return context
}