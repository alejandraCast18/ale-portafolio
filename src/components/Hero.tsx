'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface Star {
  id: number
  top: string
  left: string
  size: string
  duration: number
  initialOpacity: number
}

export default function Hero() {
  // Inicializamos el estado con una función para evitar el error de setState en useEffect
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // Generamos las estrellas solo en el cliente para evitar errores de hidratación
    const generatedStars = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: Math.random() * 3 + 2,
      initialOpacity: Math.random(),
    }))
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(generatedStars)
  }, [])

  return (
    <div className='relative w-full h-screen overflow-hidden transparent'>
      
      {/* 1. PLANETA GIRATORIO - Sin recortes y más pequeño */}
      <div className='absolute inset-0 z-0 flex justify-center pointer-events-none'>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear"
          }}
          // Aumentamos el contenedor (160vh) y usamos -translate-y para que NO se corte arriba
          className='relative w-[140vw] h-[160vh] flex items-center justify-center -translate-y-[18%]'
        >
          {/* Tamaño reducido a 750px para que respire mejor en la pantalla */}
          <div className='relative w-125 h-125 md:w-187.5 md:h-187.5'>
            <Image
              src='/6.png?v=7' 
              alt='Planet'
              fill
              priority
              unoptimized
              className='object-contain select-none'
            />
          </div>
        </motion.div>
      </div>

      {/* 2. ESTRELLAS */}
      <div className='absolute inset-0 z-10 pointer-events-none'>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: star.initialOpacity }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: 'linear',
            }}
            className='absolute bg-white rounded-full'
            style={{
              width: star.size,
              height: star.size,
              top: star.top,
              left: star.left,
              boxShadow: '0 0 8px 1px rgba(255, 255, 255, 0.6)'
            }}
          />
        ))}
      </div>

      {/* 3. TEXTO PRINCIPAL */}
      <div className='relative z-30 h-full flex flex-col items-center justify-center text-center px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <h1 className='text-7xl md:text-[140px] font-black text-white tracking-tighter leading-[0.8] italic uppercase drop-shadow-2xl'>
            ALEJANDRA <br />
            <span 
              className='text-transparent' 
              style={{ WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.5)' }}
            >
              CHACÓN
            </span>
          </h1>

          <div className='flex items-center justify-center gap-6 mt-12'>
            <div className='h-px w-12 bg-violet-600/60 shadow-[0_0_10px_#7c3aed]' />
            <p className='text-white text-[10px] md:text-sm font-bold tracking-[0.6em] uppercase drop-shadow-lg'>
              Software Architecture <span className='text-violet-400'> </span> Cloud Engineer
            </p>
            <div className='h-px w-12 bg-violet-600/60 shadow-[0_0_10px_#7c3aed]' />
          </div>
        </motion.div>

        {/* INDICADOR DE SCROLL */}
        <div className='absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4'>
          <div className='w-px h-14 bg-linear-to-b from-violet-500 to-transparent animate-pulse' />
          <span className='text-[9px] font-mono text-white tracking-[0.5em] uppercase'>
            Sector_Scroll
          </span>
        </div>
      </div>
    </div>
  )
}