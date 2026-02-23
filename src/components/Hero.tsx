'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useState, useEffect } from 'react'

export default function Hero() {
  const { isAmanecer, toggleAmanecer } = useTheme()
  const [hover, setHover] = useState(false)
  const [blurScroll, setBlurScroll] = useState(false)
  const [isEnglish, setIsEnglish] = useState(true)

  // Detectar idioma de navegador de forma segura
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      requestAnimationFrame(() => {
        setIsEnglish(navigator.language.startsWith('en'))
      })
    }
  }, [])

  // Detectar scroll al final para aplicar blur
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const scrollHeight = document.body.scrollHeight
      const clientHeight = window.innerHeight
      const atBottom = scrollTop + clientHeight >= scrollHeight - 10
      setBlurScroll(atBottom)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const texts = {
    welcome: {
      en: 'Welcome to my Portfolio',
      es: 'Bienvenido a mi Portafolio',
    },
    talent: { en: 'Innovation Talent', es: 'Talento de Innovación' },
    frontend: {
      en: 'Frontend Architecture',
      es: 'Arquitectura Frontend',
    },
  }

  return (
    <div
      className={`relative w-full min-h-screen flex items-center justify-center md:justify-end overflow-hidden bg-transparent font-sans px-4 md:px-0 select-none`}
    >
      {/* Botón día/noche */}
      <button
        onClick={toggleAmanecer}
        className='fixed top-5 right-5 md:top-6 md:right-6 z-50 mix-blend-difference hover:scale-110 transition-transform'
      >
        {isAmanecer ? (
          <Moon className='text-white w-5 h-5 opacity-80' />
        ) : (
          <Sun className='text-white w-5 h-5 opacity-80' />
        )}
      </button>

      {/* Imagen orbital */}
      <div className='absolute left-0 top-0 h-full flex items-center pointer-events-none z-10'>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 250, repeat: Infinity, ease: 'linear' }}
          className='relative w-[90vw] sm:w-[70vw] md:w-150 aspect-square opacity-100'
        >
          <Image
            src={isAmanecer ? '/4.png' : '/3.png'}
            alt='Orbital'
            fill
            className='object-contain'
            priority
          />
        </motion.div>
      </div>

      {/* Panel principal */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className='flex w-full justify-center md:justify-end md:pe-[10vw] relative z-30'
      >
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={`relative w-full max-w-[95vw] sm:max-w-md md:max-w-lg 
                     p-6 sm:p-8 md:p-12
                     border rounded-2xl border-cyan-400/40
                     shadow-[0_0_40px_rgba(34,211,238,0.25)]
                     overflow-hidden transition-all duration-500
                     ${blurScroll ? 'blur-sm' : 'blur-0'}`}
        >
          {/* Bordes animados */}
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className='absolute top-0 left-0 w-1/3 h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,1)]'
          />
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              delay: 0.75,
            }}
            className='absolute top-0 right-0 h-1/3 w-0.5 bg-linear-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,1)]'
          />
          <motion.div
            animate={{ x: ['100%', '-100%'] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              delay: 1.5,
            }}
            className='absolute bottom-0 right-0 w-1/3 h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,1)]'
          />
          <motion.div
            animate={{ y: ['100%', '-100%'] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              delay: 2.25,
            }}
            className='absolute bottom-0 left-0 h-1/3 w-0.5 bg-linear-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,1)]'
          />

          {/* Contenido de texto */}
          <div className='relative z-20 text-center'>
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight transition-all duration-300
              ${
                hover
                  ? 'text-white drop-shadow-[0_0_30px_rgba(255,255,255,1)] scale-105'
                  : 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]'
              }`}
            >
              ING. ALEJANDRA
            </h1>

            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mt-1'>
              <span
                className={`text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-blue-500 transition-all duration-300
                ${
                  hover
                    ? 'drop-shadow-[0_0_40px_rgba(34,211,238,1)] scale-105'
                    : 'drop-shadow-[0_0_25px_rgba(34,211,238,0.8)]'
                }`}
              >
                CHACÓN.
              </span>
            </h2>

            <div className='mt-5 sm:mt-6 h-px w-full bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,1)]' />

            <div className='mt-5 sm:mt-6 space-y-2'>
              <p className='text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.4em] md:tracking-[0.5em] uppercase text-cyan-400'>
                {texts.frontend[isEnglish ? 'en' : 'es']}
              </p>
              <p className='text-sm sm:text-base md:text-lg font-black italic text-white/90'>
                & Creative Engineering
              </p>
            </div>

            <div className='mt-5 sm:mt-6 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-mono text-cyan-200/70'>
              UI / UX Specialist FullStack
            </div>

            <div
              className='mt-6 sm:mt-8 pt-4 border-t border-cyan-500/20 w-full 
                            flex flex-col sm:flex-row justify-between items-center gap-2 
                            font-mono text-[8px] sm:text-[9px] md:text-[10px] text-cyan-400/60'
            >
              <span>{texts.welcome[isEnglish ? 'en' : 'es']}</span>
              <span className='uppercase font-bold'>
                {texts.talent[isEnglish ? 'en' : 'es']}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Horizonte */}
      <motion.div
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className='absolute bottom-0 left-0 w-full z-20 pointer-events-none 
                   h-[22vh] sm:h-[25vh] md:h-[30vh]'
      >
        <AnimatePresence mode='wait'>
          <motion.div
            key={isAmanecer ? 'dia' : 'noche'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className='relative w-full h-full'
          >
            <Image
              src={isAmanecer ? '/dia.png' : '/noche.png'}
              alt='Horizon'
              fill
              className='object-cover object-top'
              priority
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
