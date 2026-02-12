'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

// 1. Definimos la interfaz para el evento personalizado
interface SectorChangeEvent extends CustomEvent {
  detail: string
}

export default function SpaceAvatar() {
  const [message, setMessage] = useState('Sistemas en línea. Bienvenida, Ale.')
  const [isAutoMessaging, setIsAutoMessaging] = useState(true)

  useEffect(() => {
    // 2. Tipamos la función manejadora sin usar 'any'
    const handleSectorChange = (e: Event) => {
      const customEvent = e as SectorChangeEvent
      setMessage(customEvent.detail)

      // Pausamos mensajes automáticos brevemente para que se lea el del sector
      setIsAutoMessaging(false)
      setTimeout(() => setIsAutoMessaging(true), 10000)
    }

    window.addEventListener('sectorChange', handleSectorChange)
    return () => window.removeEventListener('sectorChange', handleSectorChange)
  }, [])

  useEffect(() => {
    if (!isAutoMessaging) return

    const messages = [
      'Explorando el vacío digital...',
      'Nuevas misiones detectadas en el sector.',
      'Estabilidad del núcleo al 100%.',
      '¿Lista para el siguiente salto?',
    ]

    const interval = setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)]
      setMessage(randomMsg)
    }, 8000)

    return () => clearInterval(interval)
  }, [isAutoMessaging])

  return (
    <div className='fixed bottom-10 left-10 z-50 flex items-end gap-5 pointer-events-auto'>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className='relative w-24 h-24 flex items-center justify-center'
      >
        <div className='absolute inset-0 bg-pink-500/20 blur-2xl rounded-full animate-pulse' />

        <div className='relative z-10 w-full h-full'>
          <Image
            src='/rabbit-astronaut1.png'
            alt='Avatar'
            fill
            className='object-contain'
            priority
          />
        </div>

        <div className='absolute inset-0 bg-linear-to-t from-pink-500/10 to-transparent opacity-30 pointer-events-none rounded-full' />
      </motion.div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={message} // Esto hace que la burbuja se anime cada vez que el texto cambie
          initial={{ opacity: 0, x: -10, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 5, scale: 0.95 }}
          className='mb-4 max-w-45'
        >
          <div className='bg-slate-900/60 backdrop-blur-xl border border-white/10 p-3 rounded-2xl rounded-bl-none shadow-2xl relative'>
            <p className='text-[10px] text-pink-500 font-mono mb-1 font-bold tracking-tighter'>
              A.I. RABBIT_UNIT
            </p>
            <p className='text-[11px] text-white/80 leading-tight font-light italic'>
              &quot;{message}&quot;
            </p>
            {/* Pequeña decoración de esquina de la burbuja */}
            <div className='absolute top-0 right-0 w-2 h-2 border-t border-r border-pink-500/30 rounded-tr-md' />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
