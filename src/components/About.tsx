'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const sections = [
  {
    title: 'MI ORIGEN: DE CÓDIGO A MAGIA',
    text: `Hola, soy Ale, ingeniera apasionada por interfaces donde creatividad y tecnología se encuentran. Me encanta transformar ideas complejas en experiencias digitales únicas y también crear juegos 2D que cuentan historias y divierten al mismo tiempo.`,
  },
  {
    title: 'MI FILOSOFÍA: DISEÑAR CON ALMA',
    text: `Creo productos digitales que no solo funcionan, sino que conectan con las personas. Cada línea de código y cada píxel tienen un propósito: generar emoción, facilitar la vida y divertir al usuario.`,
  },
  {
    title: 'MI COMPROMISO: ENTRE RETOS Y CREATIVIDAD',
    text: `Disfruto trabajar en equipo, enfrentar retos que me desafíen y siempre buscar soluciones que superen expectativas. Amo experimentar con nuevas ideas, sobre todo en juegos 2D, para ofrecer experiencias memorables.`,
  },
 {
  title: 'GRACIAS POR PASAR POR AQUÍ',
  text: (
    <>
      Tu tiempo es valioso, y me alegra que lo hayas compartido conmigo. Espero que disfrutes mi portafolio tanto como yo disfruto crearlo.{' '}
      <motion.img
        src="/rocket.png"
        alt="Rocket"
        className="inline-block w-7 h-7 align-middle"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
    </>
  ),
}
]

export default function About() {
  const [sectionIndex, setSectionIndex] = useState(0)
  const [typedTitle, setTypedTitle] = useState('')

  useEffect(() => {
    const currentTitle = sections[sectionIndex].title
    let timeout: NodeJS.Timeout

    if (typedTitle.length < currentTitle.length) {
      timeout = setTimeout(() => {
        setTypedTitle(currentTitle.slice(0, typedTitle.length + 1))
      }, 60)
    } else {
      timeout = setTimeout(() => {
        setTypedTitle('')
        setSectionIndex((prev) => (prev + 1) % sections.length)
      }, 2500)
    }

    return () => clearTimeout(timeout)
  }, [typedTitle, sectionIndex])

  return (
    <section className='relative w-full min-h-screen py-20 px-6 overflow-hidden'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-16 relative'>
        <div className=' z-20 w-64 md:w-80 h-96 md:h-128'>
          <div className='relative w-full h-full rounded-xl overflow-hidden border border-cyan-500/30 shadow-[0_0_40px_rgba(34,211,238,0.2)]'>
            <Image
              src='/2.jpg'
              alt='Ale'
              fill
              className='object-cover rounded-xl grayscale transition-all duration-1000 hover:grayscale-0'
              priority
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -120, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className='relative'
        >
          <div
            className='relative w-[80vw] md:w-[40vw] h-full p-10
                       bg-transparent border border-cyan-400/20
                       shadow-[0_0_40px_rgba(34,211,238,0.25)]
                       overflow-hidden rounded-xl'
          >
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className='absolute top-0 left-0 w-1/3 h-0.5
                         bg-linear-to-r from-transparent via-cyan-300 to-transparent
                         shadow-[0_0_15px_rgba(34,211,238,1)]'
            />
            <motion.div
              animate={{ y: ['-100%', '100%'] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                delay: 0.75,
              }}
              className='absolute top-0 right-0 h-1/3 w-0.5
                         bg-linear-to-b from-transparent via-cyan-300 to-transparent
                         shadow-[0_0_15px_rgba(34,211,238,1)]'
            />

            <div className='relative z-10 space-y-6'>
              {sections.map((section, i) => (
                <div key={i}>
                  <h3 className='text-md text-cyan-400 font-mono tracking-widest uppercase mb-2 h-6'>
                    {sectionIndex === i ? typedTitle : section.title}
                    {sectionIndex === i && (
                      <span className='animate-pulse'>|</span>
                    )}
                  </h3>
                  <p className='text-sm text-slate-100 leading-relaxed'>
                    {section.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
