'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-6xl mx-auto py-12'>
      {/* Visualización de Perfil */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className='relative group justify-self-center lg:justify-self-start'
      >
        <div className='relative w-72 h-80 md:w-96 md:h-125 overflow-hidden rounded-lg border border-white/10 shadow-[0_0_30px_rgba(139,92,246,0.1)]'>
          <Image
            src='/2.jpg'
            alt='Alejandra Chacón'
            fill
            className='object-cover grayscale transition-all duration-500 hover:grayscale-0'
            priority
          />
        </div>
        <div className='absolute -bottom-4 -right-4 w-32 h-32 border-r-2 border-b-2 border-violet-500/40 -z-10' />
      </motion.div>

      {/* Descripción Profesional Refinada */}
      <div className='space-y-8'>
        <div className='space-y-2'>
          <h2 className='text-5xl font-bold text-white tracking-tight'>
            Hola, soy <span className='text-violet-500'>Alejandra Chacón.</span>
          </h2>
          <p className='text-xl font-mono text-slate-400 tracking-widest uppercase italic'>
            {'>'} Ingeniero en Informática
          </p>
        </div>

        <div className='space-y-6 text-slate-300 text-lg leading-relaxed font-light'>
          <p>
            Me apasiona materializar mi imaginación a través del código. Mi
            filosofía de diseño se basa en crear **interfaces simples, limpias y
            funcionales** con un toque de creatividad que las haga destacar.
          </p>

          <p>
            Como ingeniero, mi enfoque principal es aumentar el potencial de
            productos digitales mediante un **pensamiento de extremo a
            extremo**, asegurando que cada solución sea brillante, accesible y
            perfectamente responsiva.
          </p>

          <p>
            Me especializo en comunicar calidad visual a través de una interfaz
            de usuario moderna, fundamentada en sólidos principios de UX. Me
            motiva colaborar en entornos creativos para construir el futuro
            digital con un ojo crítico hacia la perfección técnica.
          </p>

          <p className='text-white font-medium'>
            Resido en San Cristóbal, estado Táchira, siempre abierta a nuevos
            desafíos y colaboraciones impactantes.
          </p>
        </div>

        {/* Indicadores de Perfil en Violeta */}
        <div className='flex flex-wrap gap-4 pt-4'>
          <div className='px-4 py-2 border border-violet-500/20 bg-violet-500/5 rounded-md'>
            <span className='text-[10px] font-mono text-violet-400 uppercase font-bold tracking-tighter'>
              Mindset
            </span>
            <p className='text-sm text-white italic'>User-Centric</p>
          </div>
          <div className='px-4 py-2 border border-violet-500/20 bg-violet-500/5 rounded-md'>
            <span className='text-[10px] font-mono text-violet-400 uppercase font-bold tracking-tighter'>
              Desarrollo
            </span>
            <p className='text-sm text-white italic'>End-to-End</p>
          </div>
          <div className='px-4 py-2 border border-violet-500/20 bg-violet-500/5 rounded-md'>
            <span className='text-[10px] font-mono text-violet-400 uppercase font-bold tracking-tighter'>
              Ubicación
            </span>
            <p className='text-sm text-white italic'>San Cristóbal, VZLA</p>
          </div>
        </div>
      </div>
    </div>
  )
}
