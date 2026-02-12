'use client'

import type { Container, Engine } from '@tsparticles/engine'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useId, useState } from 'react'
import { cn } from '@/libs/utils'

interface ParticlesProps {
  id?: string
  className?: string
  background?: string
  minSize?: number
  maxSize?: number
  speed?: number
  particleColor?: string
  particleDensity?: number
}

export const SparklesCore = (props: ParticlesProps) => {
  const { id, className, background, minSize, maxSize, speed, particleColor, particleDensity } = props
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const controls = useAnimation()
  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({ opacity: 1, transition: { duration: 1 } })
    }
  }

  const generatedId = useId()

  return (
    <motion.div animate={controls} className={cn('h-full w-full', className)}>
      {init && (
        <Particles
          className={cn('h-full w-full')}
          id={id || generatedId}
          options={{
            background: { color: { value: background || 'transparent' } },
            fullScreen: { enable: false },
            fpsLimit: 120,
            interactivity: {
              detectsOn: 'window',
              events: {
                onHover: {
                  enable: true,
                  mode: ['attract', 'bubble'],
                },
              },
              modes: {
                attract: {
                  distance: 250, // Radio para capturar estrellas
                  duration: 0.4,
                  factor: 10,    // Fuerza con la que las jala tu cohete
                },
                bubble: {
                  distance: 100,
                  duration: 2,
                  size: (maxSize || 1.4) * 2,
                  opacity: 1,
                },
              },
            },
            particles: {
              number: {
                density: { enable: true, width: 400, height: 400 },
                value: particleDensity || 120,
              },
              color: { value: particleColor || '#ffffff' },
              shape: { type: 'circle' },
              opacity: {
                value: { min: 0.1, max: 0.8 },
                animation: { enable: true, speed: speed || 1, sync: false },
              },
              size: { value: { min: minSize || 0.6, max: maxSize || 1.4 } },
              move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                outModes: { default: 'out' },
                attract: { 
                  enable: true, 
                  rotate: { // Corrección del error rotateX/rotateY
                    x: 600, 
                    y: 1200 
                  } 
                },
              },
            },
            detectRetina: true,
          }}
          particlesLoaded={particlesLoaded}
        />
      )}
    </motion.div>
  )
}

export default SparklesCore