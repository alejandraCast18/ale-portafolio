'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

const navItemsData = {
  es: [
    { name: 'Inicio', path: 'home', icon: '🏠' },
    { name: 'Sobre Mí', path: 'about', icon: '👤' },
    { name: 'Proyectos', path: 'projects', icon: '🚀' },
    { name: 'Contacto', path: 'contacto', icon: '✉️' },
  ],
  en: [
    { name: 'Home', path: 'home', icon: '🏠' },
    { name: 'About Me', path: 'about', icon: '👤' },
    { name: 'Projects', path: 'projects', icon: '🚀' },
    { name: 'Contact', path: 'contacto', icon: '✉️' },
  ],
}

export default function OrbitalNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [lang, setLang] = useState<'es' | 'en'>('es')

  // Detectar idioma del navegador de forma segura
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      requestAnimationFrame(() => {
        setLang(navigator.language.startsWith('en') ? 'en' : 'es')
      })
    }
  }, [])

  // Cerrar menú con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  const handleNavigation = (targetId: string) => {
    setIsOpen(false)
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const radius = 110
  const navItems = navItemsData[lang]

  return (
    <nav className='fixed bottom-10 right-10 z-50 select-none'>
      <div className='relative flex items-center justify-center'>
        <AnimatePresence>
          {isOpen &&
            navItems.map((item, index) => {
              const angle =
                (index / (navItems.length - 1)) * (Math.PI / 2) + Math.PI
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius

              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{ opacity: 1, x, y, scale: 1 }}
                  exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    delay: index * 0.05,
                  }}
                  className='absolute'
                >
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className='group relative flex items-center justify-center w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-cyan-400/40 hover:border-cyan-400 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.25)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]'
                  >
                    <span className='text-lg filter grayscale group-hover:grayscale-0 transition-all'>
                      {item.icon}
                    </span>

                    <div className='absolute right-14 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none select-none'>
                      <div className='bg-black/80 backdrop-blur-md border border-cyan-400/30 px-3 py-1 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.2)]'>
                        <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-white whitespace-nowrap'>
                          {item.name}
                        </p>
                      </div>
                    </div>
                  </button>
                </motion.div>
              )
            })}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className='relative z-50 w-16 h-16 rounded-full bg-black/70 backdrop-blur-lg flex items-center justify-center transition-all duration-500 border border-cyan-400/50 shadow-[0_0_25px_rgba(34,211,238,0.35)] hover:shadow-[0_0_35px_rgba(34,211,238,0.55)] cursor-pointer overflow-hidden'
        >
          <motion.div
            key={isOpen ? 'moon' : 'sun'}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className='relative z-10'
          >
            {isOpen ? (
              <Moon size={28} className='text-cyan-300' strokeWidth={2} />
            ) : (
              <Sun size={30} className='text-cyan-300' strokeWidth={1.5} />
            )}
          </motion.div>

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{ repeat: Infinity, duration: 4 }}
            className='absolute inset-0 rounded-full bg-cyan-500/20 blur-xl'
          />
        </motion.button>
      </div>
    </nav>
  )
}
