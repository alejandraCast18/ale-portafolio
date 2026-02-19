'use client'

import { motion } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  children: React.ReactNode
  id: string
  message?: string
}

export default function SectorWrapper({ children, id, message }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: '-40% 0px -40% 0px' })
  const isHero = id === 'hero' || id === 'home'

  useEffect(() => {
    if (isInView && message) {
      const event = new CustomEvent('sectorChange', { detail: message })
      window.dispatchEvent(event)
    }
  }, [isInView, message])

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: isHero ? 0 : 50 }}
      animate={
        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isHero ? 0 : 50 }
      }
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative min-h-screen w-full flex flex-col items-center justify-center ${
        isHero ? 'py-0' : 'py-20'
      }`}
    >
      <div className={`w-full ${isHero ? 'static' : 'relative z-10'}`}>
        {children}
      </div>
    </motion.section>
  )
}
