'use client'

import { useEffect } from 'react'
import Hero from '@/components/Hero'
import SectorWrapper from '@/components/SectorWrapper'
import About from '@/components/About'
import Contact from '@/components/Contact'
import OrbitalNavbar from '@/components/OrbitalNavbar'
import StackPhysics from '@/components/StackPhysics'
import ProjectsSection from '@/components/Projects'
import Footer from '@/components/Footer'

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
        <SectorWrapper id='home'>
          <Hero />
        </SectorWrapper>

        <SectorWrapper id='about'>
          <About />
        </SectorWrapper>

        <SectorWrapper id='stack'>
          <StackPhysics />
        </SectorWrapper>

        <SectorWrapper id='projects'>
          <ProjectsSection />
        </SectorWrapper>

        <SectorWrapper id='contact'>
          <Contact />
        </SectorWrapper>

        <Footer />
      </main>
    </>
  )
}
