'use client'

import React, { useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function SpaceCursor() {
  // Resortes ligeramente más suaves para que la estela se "arrastre" un poco
  const springConfig = { damping: 30, stiffness: 120 }
  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }
    window.addEventListener('mousemove', moveMouse)
    return () => window.removeEventListener('mousemove', moveMouse)
  }, [cursorX, cursorY])

  return (
    <>
      {/* 1. Aura Violeta Externa (Gran resplandor) */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
       className='fixed top-0 left-0 w-10 h-10 bg-pink-500 rounded-full mix-blend-screen pointer-events-none z-9999 blur-lg opacity-40'
      />

      {/* 2. Estela Rosa Intensa (Brillo medio) */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
        className='fixed top-0 left-0 w-16 h-16 bg-purple-600 rounded-full mix-blend-screen pointer-events-none z-9999 blur-2xl opacity-70'
      />

      {/* 3. Núcleo de la Nave (Orbe blanco brillante) */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
        className='fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-9999 shadow-[0_0_20px_5px_rgba(255,20,147,0.8)]'
      >
        {/* Anillo de pulso violeta */}
        <div className='absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-75' />
        {/* Destello central rosa */}
        <div className='absolute inset-0.5 bg-pink-300 rounded-full blur-[1px]' />
      </motion.div>
    </>
  )
}
