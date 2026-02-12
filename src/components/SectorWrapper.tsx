'use client'

import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface Props {
  children: React.ReactNode
  id: string
  message?: string // El mensaje que dirá el conejito en esta sección
}

export default function SectorWrapper({ children, id, message }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" })

  useEffect(() => {
    if (isInView && message) {
      // Enviamos un evento personalizado que el Avatar escuchará
      const event = new CustomEvent('sectorChange', { detail: message })
      window.dispatchEvent(event)
    }
  }, [isInView, message])

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-6"
    >
      <div className="relative z-10 w-full max-w-7xl">
        {children}
      </div>
    </motion.section>
  )
}