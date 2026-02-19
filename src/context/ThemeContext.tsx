'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

const ThemeContext = createContext({ isAmanecer: false, toggleAmanecer: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isAmanecer, setIsAmanecer] = useState(false)
  const toggleAmanecer = () => setIsAmanecer(!isAmanecer)

  return (
    <ThemeContext.Provider value={{ isAmanecer, toggleAmanecer }}>
      <div className={`transition-colors duration-1500 min-h-screen relative ${
        isAmanecer ? 'bg-[#030712]' : 'bg-black'
      }`}>
        
        <div 
          className={`transition-opacity duration-2000 fixed inset-0 z-0 pointer-events-none ${
            isAmanecer ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            background: 'linear-gradient(135deg, #0f172a 0%, #312e81 30%, #581c87 60%, #831843 85%, #1e1b4b 100%)',
          }} 
        />

        <div className="relative z-10">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)