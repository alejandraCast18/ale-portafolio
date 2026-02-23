'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiExternalLink } from 'react-icons/fi'

const PROJECTS = [
  {
    id: '01',
    video: '/videos/dorta.mp4',
    link: 'https://dorta.vercel.app/',
  },
  {
    id: '02',
    video: '/videos/cunaguaros.mp4',
    link: 'https://portfolio-cunaguarosdev.vercel.app/',
  },
  {
    id: '03',
    title: 'VOID ENGINE',
    video: '/videos/p3.mp4',
    link: '#',
  },
]

export default function ProjectsSection() {
  const [index, setIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [lang, setLang] = useState<'es' | 'en'>('es')

  // Detectar si es móvil
  useEffect(() => {
    const checkRes = () => setIsMobile(window.innerWidth < 768)
    checkRes()
    window.addEventListener('resize', checkRes)
    return () => window.removeEventListener('resize', checkRes)
  }, [])

  // Detectar idioma del navegador de manera segura
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator) {
      requestAnimationFrame(() => {
        setLang(navigator.language.startsWith('en') ? 'en' : 'es')
      })
    }
  }, [])

  const next = () => setIndex((prev) => (prev + 1) % PROJECTS.length)
  const prev = () =>
    setIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)

  const titleText = lang === 'es' ? 'Mis Proyectos' : 'My Projects'

  return (
    <div className='flex flex-col items-center w-full py-10 md:py-20 select-none'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='text-center mb-10 md:mb-20 group px-4 cursor-default'
      >
        <h2 className='text-4xl md:text-7xl font-black tracking-tighter uppercase leading-tight'>
          <span
            className='text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]
                 transition-all duration-300
                 group-hover:drop-shadow-[0_0_40px_rgba(34,211,238,1)]
                 select-none'
          >
            {titleText}
          </span>
        </h2>
      </motion.div>

      <div className='relative w-full h-80 md:h-137.5 flex items-center justify-center overflow-hidden md:overflow-visible'>
        <AnimatePresence mode='popLayout'>
          {PROJECTS.map((project, i) => {
            const position =
              i === index ? 0 : i === (index + 1) % PROJECTS.length ? 1 : -1

            if (isMobile && position !== 0) return null

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: position === 0 ? 1 : 0.3,
                  scale: position === 0 ? 1 : 0.6,
                  x: position * (isMobile ? 0 : 450),
                  zIndex: position === 0 ? 10 : 5,
                  filter: position === 0 ? 'grayscale(0%)' : 'grayscale(100%)',
                }}
                transition={{ duration: 0.5, ease: 'circOut' }}
                className='absolute w-[90%] md:w-150 aspect-video rounded-xl overflow-hidden border-2 border-cyan-500/30 bg-zinc-900 shadow-[0_0_30px_rgba(34,211,238,0.2)]'
              >
                <video
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className='w-full h-full object-cover'
                />

                {position === 0 && project.title && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='absolute inset-0 bg-linear-to-t from-black/95 via-transparent to-transparent flex flex-col justify-end p-5 md:p-8 select-none'
                  >
                    <h3 className='text-lg md:text-4xl font-bold text-white mb-2 md:mb-4'>
                      {project.title}
                    </h3>
                    <div className='flex gap-3 md:gap-4'>
                      <a
                        href={project.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='p-2 md:p-3 bg-white/10 hover:bg-cyan-500 rounded-full transition-colors'
                      >
                        <FiExternalLink className='text-lg md:text-2xl' />
                      </a>
                    </div>
                  </motion.div>
                )}

                {position === 0 && (
                  <div className='absolute inset-0 border-[3px] md:border-4 border-cyan-400/30 pointer-events-none' />
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>

        <button
          onClick={prev}
          className='absolute left-2 md:left-10 z-50 p-2 text-cyan-400 bg-black/40 backdrop-blur-md rounded-full md:bg-transparent'
        >
          <FiChevronLeft size={isMobile ? 35 : 60} />
        </button>
        <button
          onClick={next}
          className='absolute right-2 md:right-10 z-50 p-2 text-cyan-400 bg-black/40 backdrop-blur-md rounded-full md:bg-transparent'
        >
          <FiChevronRight size={isMobile ? 35 : 60} />
        </button>
      </div>
    </div>
  )
}
