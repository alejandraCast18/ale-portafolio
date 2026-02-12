'use client'

import { motion } from 'framer-motion'
import Hero from '@/components/Hero'
import ProjectCard from '@/components/ProjectCard'
import SectorWrapper from '@/components/SectorWrapper'
import About from '@/components/About'
import Contact from '@/components/Contact'

const PROJECTS = [
  {
    id: '01',
    title: 'Nebula UI',
    description: 'Sistema de componentes con React y Tailwind enfocado en la simplicidad y el minimalismo.',
    tech: ['Next.js', 'TypeScript'],
  },
  {
    id: '02',
    title: 'Stellar App',
    description: 'Dashboard interactivo con un diseño limpio y funcional para el manejo de datos complejos.',
    tech: ['Framer Motion', 'Lottie'],
  },
  {
    id: '03',
    title: 'Void Engine',
    description: 'Optimización de procesos de renderizado para visualizaciones de alto impacto y performance.',
    tech: ['Three.js', 'WebGL'],
  },
]

export default function Home() {
  return (
    <main className='relative z-10 bg-transparent'>
      
      {/* SECTOR 01: HOME */}
      <section id="home">
        <SectorWrapper
          id='hero'
          message='Secuencia de inicio completada. Bienvenida, Alejandra.'
        >
          <Hero />
        </SectorWrapper>
      </section>

      {/* SECTOR 02: PROYECTOS (Ubicado después del Hero para impacto inmediato) */}
      <section id="projects">
        <SectorWrapper
          id='proyectos-sector'
          message='Escaneando misiones de extremo a extremo... Calidad óptima detectada.'
        >
          <div className='flex flex-col items-center w-full'>
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
              <div className='h-0.5 w-32 bg-linear-to-r from-violet-500 to-transparent mx-auto mt-4' />
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-7xl px-4'>
              {PROJECTS.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </div>
        </SectorWrapper>
      </section>

      {/* SECTOR 03: SOBRE MÍ */}
      <section id="about">
        <SectorWrapper
          id='sobre-mi'
          message='Accediendo al perfil profesional de Alejandra Chacón...'
        >
          <About />
        </SectorWrapper>
      </section>

      {/* SECTOR 04: CONTACTO */}
      <section id="contact">
        <SectorWrapper
          id='contacto'
          message='Terminal de comunicación lista. Esperando entrada de datos...'
        >
          <Contact />
        </SectorWrapper>
      </section>

    </main>
  )
}