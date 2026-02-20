'use client'

import { useEffect } from 'react'
import Hero from '@/components/Hero'
import SectorWrapper from '@/components/SectorWrapper'
import About from '@/components/About'
import Contact from '@/components/Contact'
import OrbitalNavbar from '@/components/OrbitalNavbar'
import StackPhysics from '@/components/StackPhysics'
import ProjectsSection from '@/components/Projects'
import Footer from '@/components/Footer' // Importación añadida

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
        <SectorWrapper id='about' message='Accediendo al perfil profesional...'>
          <About />
        </SectorWrapper>

        {/* SECCIÓN STACK (FÍSICAS) */}
        <SectorWrapper
          id='stack'
          message='Cargando motor de física Matter.js...'
        >
          <StackPhysics />
        </SectorWrapper>

        {/* SECCIÓN PROYECTOS (CARRUSEL 3D) */}
        <SectorWrapper
          id='projects'
          message='Escaneando misiones... Calidad óptima detectada.'
        >
          <ProjectsSection />
        </SectorWrapper>

        {/* SECCIÓN CONTACTO */}
        <SectorWrapper id='contact' message='Terminal de comunicación lista...'>
          <Contact />
        </SectorWrapper>

        {/* FOOTER FINAL */}
        <Footer />
      </main>
    </>
  )
}
