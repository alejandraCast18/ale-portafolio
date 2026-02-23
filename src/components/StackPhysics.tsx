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
import { useInView } from 'framer-motion'
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
  const [dimensions, setDimensions] = useState({ width: 0, height: 400 })
  const [lang, setLang] = useState<'es' | 'en'>('es')

  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  // Detect browser language
  useEffect(() => {
    const browserLang = navigator.language.startsWith('en') ? 'en' : 'es'
    requestAnimationFrame(() => setLang(browserLang))
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current) return
      const width = containerRef.current.offsetWidth
      const height = window.innerWidth < 768 ? 350 : 450
      setDimensions({ width, height })
    })
    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    if (!containerRef.current || dimensions.width === 0 || !isInView) return

    const engine = Engine.create({ enableSleeping: false })
    const world = engine.world

    const cw = dimensions.width
    const ch = dimensions.height

    const cardWidth = cw < 768 ? 80 : 160
    const cardHeight = cw < 768 ? 40 : 80

    const ground = Bodies.rectangle(cw / 2, ch + 20, cw, 40, { isStatic: true })
    const ceiling = Bodies.rectangle(cw / 2, -20, cw, 40, { isStatic: true })
    const leftWall = Bodies.rectangle(-20, ch / 2, 40, ch, { isStatic: true })
    const rightWall = Bodies.rectangle(cw + 20, ch / 2, 40, ch, {
      isStatic: true,
    })

    Composite.add(world, [ground, ceiling, leftWall, rightWall])

    const bodies = technologies.map((_, i) => {
      return Bodies.rectangle(
        (cw / (technologies.length + 1)) * (i + 1),
        20,
        cardWidth,
        cardHeight,
        {
          restitution: 0.5,
          friction: 0.1,
          chamfer: { radius: cw < 768 ? 8 : 12 },
        },
      )
    })

    Composite.add(world, bodies)

    const mouse = Mouse.create(containerRef.current) as ExtendedMouse
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
  }, [dimensions, isInView])

  const titleText = lang === 'es' ? 'Mis Herramientas' : 'My Tools'
  const subtitleText =
    lang === 'es'
      ? 'lanza las fichas o juega con ellas'
      : 'throw the cards or play with them'

  return (
    <section className='relative z-10 py-12 select-none'>
      <div className='text-center mb-12 cursor-default group'>
        <h2 className='text-4xl md:text-7xl font-black tracking-tighter uppercase leading-tight'>
          <span
            className='text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] 
                           transition-all duration-300 group-hover:drop-shadow-[0_0_40px_rgba(34,211,238,1)]
                           select-none'
          >
            {titleText}
          </span>
        </h2>
        <p className='mt-4 text-cyan-400/60 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase animate-pulse select-none'>
          {subtitleText}
        </p>
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
                       bg-zinc-900/90 backdrop-blur-md border border-cyan-500/20 rounded-xl
                       shadow-[0_10px_30px_rgba(0,0,0,0.5)]
                       will-change-transform select-none cursor-grab active:cursor-grabbing
                       w-20 h-10 md:w-40 md:h-20'
          >
            <tech.icon className={`text-lg md:text-3xl ${tech.color}`} />
            <span className='font-bold text-[10px] md:text-xs text-white uppercase tracking-tighter select-none'>
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
