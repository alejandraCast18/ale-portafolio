'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/hooks/useLanguage'

const sections = {
  es: [
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
          Tu tiempo es valioso, y me alegra que lo hayas compartido conmigo.
          Espero que disfrutes mi portafolio tanto como yo disfruto crearlo{' '}
          <motion.span
            className='inline-block align-middle'
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src='/rocket.png'
              alt='Rocket'
              width={28}
              height={28}
              className='inline-block'
            />
          </motion.span>
        </>
      ),
    },
  ],
  en: [
    {
      title: 'MY ORIGIN: FROM CODE TO MAGIC',
      text: `Hi, I'm Ale, an engineer passionate about interfaces where creativity and technology meet. I love transforming complex ideas into unique digital experiences and also creating 2D games that tell stories and entertain.`,
    },
    {
      title: 'MY PHILOSOPHY: DESIGN WITH SOUL',
      text: `I create digital products that not only work but connect with people. Every line of code and every pixel has a purpose: to generate emotion, make life easier, and entertain the user.`,
    },
    {
      title: 'MY COMMITMENT: BETWEEN CHALLENGES AND CREATIVITY',
      text: `I enjoy working in teams, facing challenges that push me, and always finding solutions that exceed expectations. I love experimenting with new ideas, especially in 2D games, to deliver memorable experiences.`,
    },
    {
      title: 'THANK YOU FOR STOPPING BY',
      text: (
        <>
          Your time is valuable, and I’m glad you shared it with me. I hope you
          enjoy my portfolio as much as I enjoy creating it{' '}
          <motion.span
            className='inline-block align-middle'
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src='/rocket.png'
              alt='Rocket'
              width={28}
              height={28}
              className='inline-block'
            />
          </motion.span>
        </>
      ),
    },
  ],
}

export default function About() {
  const { lang, mounted } = useLanguage()

  const [sectionIndex, setSectionIndex] = useState(0)
  const [typedTitle, setTypedTitle] = useState('')

  const currentSections = sections[lang]
  const currentTitle = currentSections[sectionIndex].title

  // ✅ Hook SIEMPRE antes del return
  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (typedTitle.length < currentTitle.length) {
      timeout = setTimeout(() => {
        setTypedTitle(currentTitle.slice(0, typedTitle.length + 1))
      }, 60)
    } else {
      timeout = setTimeout(() => {
        setTypedTitle('')
        setSectionIndex((prev) => (prev + 1) % currentSections.length)
      }, 2500)
    }

    return () => clearTimeout(timeout)
  }, [typedTitle, currentTitle, currentSections.length])

  // ✅ guard clause DESPUÉS de hooks
  if (!mounted) return null

  return (
    <section className='relative w-full min-h-screen py-20 px-6 overflow-hidden select-none'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-16 relative'>
        {/* FOTO */}
        <motion.div
          className='z-20 w-64 md:w-80 h-96 md:h-128 cursor-pointer overflow-hidden rounded-xl border border-cyan-500/30'
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className='relative w-full h-full rounded-xl overflow-hidden'
            initial={{ filter: 'grayscale(100%)' }}
            whileHover={{ filter: 'grayscale(0%)' }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src='/2.jpg'
              alt='Ale'
              fill
              className='object-cover rounded-xl'
              priority
            />
          </motion.div>
        </motion.div>

        {/* PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -120, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className='relative'
        >
          <div className='relative w-[80vw] md:w-[40vw] h-full p-10 bg-transparent border border-cyan-400/20 shadow-[0_0_40px_rgba(34,211,238,0.25)] overflow-hidden rounded-xl'>
            <div className='relative z-10 space-y-6'>
              {currentSections.map((section, i) => (
                <div key={i}>
                  <h3 className='text-md text-cyan-400 font-mono tracking-widest uppercase mb-2'>
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
