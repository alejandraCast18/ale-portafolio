'use client'

import React, { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'
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
} from 'react-icons/si'
import { FaTools } from 'react-icons/fa'

const technologies = [
  { name: 'React', icon: SiReact, color: 'text-cyan-400' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'text-white' },
  { name: 'Tailwind', icon: SiTailwindcss, color: 'text-sky-400' },
  { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-500' },
  { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-500' },
  { name: 'WordPress', icon: SiWordpress, color: 'text-blue-400' },
  { name: 'Figma', icon: SiFigma, color: 'text-orange-500' },
  { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400' },
]

export default function StackPhysics() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<Array<HTMLDivElement | null>>(
    technologies.map(() => null),
  )
  const [physicsStarted, setPhysicsStarted] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !physicsStarted) setPhysicsStarted(true)
      },
      { threshold: 0.3 },
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [physicsStarted])

  useEffect(() => {
    if (!physicsStarted || !containerRef.current) return

    const {
      Engine,
      Runner,
      Bodies,
      Composite,
      Mouse,
      MouseConstraint,
      Events,
    } = Matter

    const engine = Engine.create()
    const world = engine.world

    const cw = containerRef.current.offsetWidth
    const ch = containerRef.current.offsetHeight

    const ground = Bodies.rectangle(cw / 2, ch + 40, cw, 80, { isStatic: true })
    const leftWall = Bodies.rectangle(-40, ch / 2, 80, ch, { isStatic: true })
    const rightWall = Bodies.rectangle(cw + 40, ch / 2, 80, ch, {
      isStatic: true,
    })
    Composite.add(world, [ground, leftWall, rightWall])

    const bodies = technologies.map((_, i) =>
      Bodies.rectangle(
        Math.random() * (cw - 200) + 100,
        -300 - i * 120,
        160,
        80,
        { restitution: 0.5, friction: 0.2, chamfer: { radius: 20 } },
      ),
    )
    Composite.add(world, bodies)

    const mouse = Mouse.create(containerRef.current)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    })
    Composite.add(world, mouseConstraint)

    const runner = Runner.create()
    Runner.run(runner, engine)

    Events.on(engine, 'afterUpdate', () => {
      bodies.forEach((body, i) => {
        const card = cardsRef.current[i]
        if (!card) return
        card.style.transform = `
          translate(${body.position.x - 80}px, ${body.position.y - 40}px)
          rotate(${body.angle}rad)
        `
      })
    })

    return () => {
      Runner.stop(runner)
      Engine.clear(engine)
      Composite.clear(world, false)
    }
  }, [physicsStarted])

  return (
    <div className='relative z-10 mt-20'>
      <div className='text-center mb-16 relative z-20'>
        <span className='text-[10px] font-mono text-cyan-500 tracking-[0.5em] uppercase flex items-center justify-center gap-2'>
          <FaTools className='w-3 h-3 animate-bounce' /> Tech Stack
        </span>

        <h2 className='text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-tight mt-2'>
          <motion.span
            animate={{
              textShadow: [
                '0 0 10px rgba(255,255,255,0.3)',
                '0 0 2px rgba(255,255,255,0.1)',
                '0 0 10px rgba(255,255,255,0.3)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            Herramientas
          </motion.span>
          <br />
          <motion.span
            animate={{
              textShadow: [
                '0 0 15px rgba(34,211,238,0.5)',
                '0 0 5px rgba(34,211,238,0.2)',
                '0 0 15px rgba(34,211,238,0.5)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className='text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-cyan-200 to-blue-500 italic drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]'
          >
            & Lenguajes.
          </motion.span>
        </h2>
      </div>

      <div
        ref={containerRef}
        className='relative w-full h-150 overflow-visible'
        style={{ marginTop: '-50px' }}
      >
        {technologies.map((tech, i) => (
          <div
            key={tech.name}
            ref={(el) => {
              cardsRef.current[i] = el
            }}
            className='absolute w-40 h-20 flex flex-col items-center justify-center gap-2 
                       bg-zinc-900/80 backdrop-blur-lg 
                       border border-white/10 rounded-2xl shadow-2xl'
            style={{ left: 0, top: 0 }}
          >
            <tech.icon className={`text-3xl ${tech.color}`} />
            <span className='text-xs font-bold text-white uppercase'>
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
