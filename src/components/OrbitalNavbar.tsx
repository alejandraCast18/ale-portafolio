'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Sun, Star } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

const navItems = [
  { name: 'Inicio', path: 'home', icon: '🏠' },
  { name: 'Sobre Mí', path: 'about', icon: '👤' },
  { name: 'Proyectos', path: 'projects', icon: '🚀' },
  { name: 'Contacto', path: 'contact', icon: '✉️' },
]

export default function OrbitalNavbar() {
  const { isAmanecer } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

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
      const newPath = targetId === 'home' ? '/' : `/${targetId}`
      window.history.pushState(null, '', newPath)
    }
  }

  const radius = 100

  return (
    <nav className='fixed bottom-10 right-10 z-100'>
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
                    className={`group relative flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 border transition-all cursor-pointer shadow-xl ${
                      isAmanecer
                        ? 'border-cyan-400/50 hover:border-pink-400 shadow-cyan-500/20'
                        : 'border-violet-500/50 hover:border-violet-400 shadow-violet-500/20'
                    }`}
                  >
                    <span className='text-lg filter grayscale group-hover:grayscale-0 transition-all'>
                      {item.icon}
                    </span>
                    <div className='absolute right-14 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none'>
                      <div className='bg-slate-900 border border-white/10 px-3 py-1 rounded-lg shadow-2xl'>
                        <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-white whitespace-nowrap'>
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
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`relative z-50 w-16 h-16 rounded-full bg-slate-950 flex items-center justify-center transition-all duration-1000 border-2 cursor-pointer ${
            isAmanecer
              ? 'border-cyan-400/50 shadow-[0_0_25px_rgba(34,211,238,0.4)]'
              : 'border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.3)]'
          }`}
        >
          {/* ICONO DINÁMICO: Sol en modo claro, Estrella/Estrella-rellena en oscuro */}
          <motion.div
            key={isAmanecer ? 'sun' : 'star'}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className='relative z-10'
          >
            {isAmanecer ? (
              <Sun
                size={32}
                className='text-cyan-300'
                fill='currentColor'
                fillOpacity={0.2}
              />
            ) : (
              <Star
                size={32}
                className='text-violet-400'
                fill={isOpen ? '#8b5cf6' : 'none'}
                strokeWidth={1.5}
              />
            )}
          </motion.div>

          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: isAmanecer ? [0.3, 0.6, 0.3] : [0.2, 0.5, 0.2],
            }}
            transition={{ repeat: Infinity, duration: 4 }}
            className={`absolute inset-0 rounded-full blur-xl ${
              isAmanecer ? 'bg-cyan-500/20' : 'bg-violet-500/10'
            }`}
          />
        </motion.button>
      </div>
    </nav>
  )
}
