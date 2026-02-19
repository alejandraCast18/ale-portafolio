'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  Engine,
  Runner,
  Composite,
  Bodies,
  Mouse,
  MouseConstraint,
  Events,
} from 'matter-js'
import { motion } from 'framer-motion'
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiFigma,
  SiWordpress,
  SiJavascript,
  SiGodotengine,
} from 'react-icons/si'

interface Technology {
  name: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

// Extendemos el tipo de Mouse para evitar los errores de 'any'
interface ExtendedMouse extends Mouse {
  mousewheel?: (event: WheelEvent) => void
}

const technologies: Technology[] = [
  { name: 'React', icon: SiReact, color: 'text-cyan-400' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'text-white' },
  { name: 'Tailwind', icon: SiTailwindcss, color: 'text-sky-400' },
  { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-500' },
  { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-500' },
  { name: 'WordPress', icon: SiWordpress, color: 'text-blue-400' },
  { name: 'Figma', icon: SiFigma, color: 'text-orange-500' },
  { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400' },
  { name: 'Godot', icon: SiGodotengine, color: 'text-cyan-300' },
]

export default function StackPhysics() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<Array<HTMLDivElement | null>>(
    technologies.map(() => null),
  )
  const [dimensions, setDimensions] = useState({ width: 0, height: 350 })

  useEffect(() => {
    if (!containerRef.current) return
    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current) return
      const width = containerRef.current.offsetWidth
      const height = width < 768 ? 300 : 350
      setDimensions({ width, height })
    })
    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    if (!containerRef.current || dimensions.width === 0) return

    const engine = Engine.create({ enableSleeping: true })
    const world = engine.world

    const cw = dimensions.width
    const ch = dimensions.height
    const cardWidth = cw < 768 ? 120 : 160
    const cardHeight = cw < 768 ? 60 : 80

    const ground = Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true })
    const leftWall = Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true })
    const rightWall = Bodies.rectangle(cw + 10, ch / 2, 20, ch, {
      isStatic: true,
    })
    Composite.add(world, [ground, leftWall, rightWall])

    const spacing = cardHeight + 5
    const bodies = technologies.map((_, i) =>
      Bodies.rectangle(
        Math.random() * (cw - cardWidth) + cardWidth / 2,
        -i * spacing,
        cardWidth,
        cardHeight,
        {
          restitution: 0.2,
          friction: 0.8,
          frictionStatic: 0.8,
          chamfer: { radius: 15 },
        },
      ),
    )
    Composite.add(world, bodies)

    // --- ARREGLO DEL SCROLL SIN 'any' ni DOMMouseScroll ---
    const mouse = Mouse.create(containerRef.current) as ExtendedMouse

    if (mouse.mousewheel) {
      mouse.element.removeEventListener('wheel', mouse.mousewheel)
    }

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    })
    Composite.add(world, mouseConstraint)

    Events.on(engine, 'afterUpdate', () => {
      bodies.forEach((body, i) => {
        const card = cardsRef.current[i]
        if (!card) return
        card.style.transform = `translate(${body.position.x - cardWidth / 2}px, ${body.position.y - cardHeight / 2}px) rotate(${body.angle}rad)`
      })
    })

    const runner = Runner.create()
    Runner.run(runner, engine)

    return () => {
      Runner.stop(runner)
      Composite.clear(world, false)
      Engine.clear(engine)
    }
  }, [dimensions])

  return (
    <section className='relative z-10 py-4 md:py-8'>
      <div className='text-center mb-2 md:mb-4 pointer-events-none group'>
        <h2 className='text-3xl md:text-6xl font-black tracking-tighter uppercase leading-tight mt-1'>
          <motion.span
            className={`text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-cyan-200 to-blue-500
                  transition-all duration-300 group-hover:drop-shadow-[0_0_40px_rgba(34,211,238,1)]`}
          >
            Mis Herramientas
          </motion.span>
        </h2>
      </div>

      <div
        ref={containerRef}
        className='relative w-full overflow-hidden mx-auto'
        style={{ height: dimensions.height, maxWidth: '1200px' }}
      >
        {technologies.map((tech, i) => (
          <div
            key={tech.name}
            ref={(el) => {
              cardsRef.current[i] = el
            }}
            className='absolute top-0 left-0 flex flex-col items-center justify-center gap-1
                       bg-zinc-900/80 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl
                       will-change-transform text-xs md:text-sm select-none
                       w-30 h-15 md:w-40 md:h-20'
          >
            <tech.icon className={`text-xl md:text-3xl ${tech.color}`} />
            <span className='font-bold text-white uppercase'>{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
