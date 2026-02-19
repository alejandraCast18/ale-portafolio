'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Hero from '@/components/Hero'
import ProjectCard from '@/components/ProjectCard'
import SectorWrapper from '@/components/SectorWrapper'
import About from '@/components/About'
import Contact from '@/components/Contact'
import OrbitalNavbar from '@/components/OrbitalNavbar'
import StackPhysics from '@/components/StackPhysics'

const PROJECTS = [
  {
    id: '01',
    title: 'Nebula UI',
    description: 'Sistema de componentes con React y Tailwind.',
    tech: ['Next.js', 'TypeScript'],
  },
  {
    id: '02',
    title: 'Stellar App',
    description: 'Dashboard interactivo con diseño limpio.',
    tech: ['Framer Motion', 'Lottie'],
  },
  {
    id: '03',
    title: 'Void Engine',
    description: 'Optimización de procesos de renderizado.',
    tech: ['Three.js', 'WebGL'],
  },
]

export default function Home() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <OrbitalNavbar />
      <main className='relative z-10 bg-transparent m-0 p-0'>
        {/* SECCIÓN INICIO */}
        <SectorWrapper
          id='home'
          message='Secuencia de inicio completada. Bienvenida, Alejandra.'
        >
          <Hero />
        </SectorWrapper>

        {/* SECCIÓN SOBRE MÍ */}
        <SectorWrapper
          id='about'
          message='Accediendo al perfil profesional de Alejandra Chacón...'
        >
          <About />
        </SectorWrapper>

        {/* SECCIÓN PROYECTOS */}
        <SectorWrapper
          id='projects'
          message='Escaneando misiones de extremo a extremo... Calidad óptima detectada.'
        >
          <SectorWrapper
            id='stack'
            message='Cargando motor de física Matter.js... Entorno interactivo listo.'
          >
            <StackPhysics />
          </SectorWrapper>
          <div className='flex flex-col items-center w-full pt-20 pb-20'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='text-center mb-24'
            >
              <h2 className='text-6xl font-black tracking-tighter text-white uppercase italic'>
                Misiones{' '}
                <span className='text-violet-500 text-5xl not-italic'>
                  Ejecutadas
                </span>
              </h2>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-7xl px-4'>
              {PROJECTS.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </div>
        </SectorWrapper>

        {/* SECCIÓN CONTACTO */}
        <SectorWrapper
          id='contact'
          message='Terminal de comunicación lista. Esperando entrada de datos...'
        >
          <Contact />
        </SectorWrapper>
      </main>
    </>
  )
}
