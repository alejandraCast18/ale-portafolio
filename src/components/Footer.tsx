'use client'

import Image from 'next/image'
import { Linkedin, Github } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const messages = {
  es: {
    description: `Si buscas una desarrolladora para tu proyecto,
puedo ayudarte. Y si necesitas un equipo completo,
mi equipo y yo estamos listos en `,
    follow: 'Sígueme en',
  },
  en: {
    description: `If you’re looking for a developer for your project,
I can help. And if you need a full team,
my team and I are ready at `,
    follow: 'Follow me on',
  },
}

const Footer = () => {
  const [collision, setCollision] = useState(false)
  const [lang, setLang] = useState<'es' | 'en'>('es')
  const rabbit1Ref = useRef<HTMLDivElement>(null)
  const rabbit2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const browserLang = navigator.language.startsWith('en') ? 'en' : 'es'
    requestAnimationFrame(() => setLang(browserLang))
  }, [])

  useEffect(() => {
    const checkCollision = () => {
      if (rabbit1Ref.current && rabbit2Ref.current) {
        const rect1 = rabbit1Ref.current.getBoundingClientRect()
        const rect2 = rabbit2Ref.current.getBoundingClientRect()
        const distance = Math.sqrt(
          Math.pow(rect1.left - rect2.left, 2) +
            Math.pow(rect1.top - rect2.top, 2),
        )
        setCollision(distance < 80)
      }
    }
    const interval = setInterval(checkCollision, 100)
    return () => clearInterval(interval)
  }, [])

  const msg = messages[lang]

  return (
    <footer className='relative w-full py-20 overflow-hidden bg-transparent text-white select-none'>
      {/* Líneas superior e inferior */}
      <div className='absolute top-0 left-0 w-full h-0.5 bg-cyan-500 shadow-[0_0_20px_#06b6d4,0_0_40px_#06b6d4] opacity-70' />
      <div className='absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 shadow-[0_0_20px_#06b6d4,0_0_40px_#06b6d4] opacity-70' />

      {/* Colisiones */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 flex items-center justify-center z-0 ${
          collision ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className='w-64 h-64 bg-pink-500/20 rounded-full blur-[100px] animate-pulse' />
        <span className='text-6xl animate-ping absolute'>💖</span>
      </div>

      {/* Conejitos */}
      <div
        ref={rabbit1Ref}
        className='absolute pointer-events-none animate-bounce-no-flip opacity-90 z-20'
      >
        <Image
          src='/rabbit-astronaut1.png'
          alt='Rabbit Astronaut'
          width={70}
          height={70}
          className={`object-contain transition-all duration-300 ${
            collision
              ? 'drop-shadow-[0_0_20px_#ff007f]'
              : 'drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]'
          }`}
        />
      </div>

      <div
        ref={rabbit2Ref}
        className='absolute pointer-events-none animate-bounce-no-flip-2 opacity-80 z-20'
      >
        <Image
          src='/rabbit-astronaut2.png'
          alt='Rabbit Astronaut 2'
          width={65}
          height={65}
          className={`object-contain transition-all duration-300 ${
            collision
              ? 'drop-shadow-[0_0_20px_#ff007f]'
              : 'drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]'
          }`}
        />
      </div>

      {/* Contenido principal */}
      <div className='container mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-center gap-12'>
        <div className='flex flex-col items-center md:items-start gap-4'>
          <p className='text-zinc-400 text-sm md:text-base tracking-wide leading-relaxed max-w-xl text-center md:text-left whitespace-pre-line'>
            {msg.description}
            <span className='text-white font-bold cursor-pointer transition-all duration-300 hover:text-purple-400 hover:drop-shadow-[0_0_10px_#a855f7]'>
              CunaguarosDev
            </span>
            .
          </p>

          <a
            href='https://portfolio-cunaguarosdev.vercel.app/'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:scale-110 transition-transform duration-300'
          >
            <Image
              src='/logo11.png'
              alt='CunaguarosDev Logo'
              width={70}
              height={20}
              className='object-contain opacity-70 hover:opacity-100 invert brightness-200'
            />
          </a>
        </div>

        <div className='flex flex-col items-center md:items-end gap-3'>
          <span className='text-xs uppercase tracking-[0.4em] text-cyan-400 font-semibold drop-shadow-[0_0_8px_#06b6d4]'>
            {msg.follow}
          </span>
          <div className='flex items-center gap-5 bg-black/60 p-4 rounded-2xl border border-cyan-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]'>
            <a
              href='https://github.com/alejandraCast18'
              target='_blank'
              rel='noopener noreferrer'
              className='text-zinc-400 hover:text-white transition-all hover:drop-shadow-[0_0_10px_#fff]'
            >
              <Github size={24} />
            </a>

            <div className='w-px h-5 bg-zinc-800' />

            <a
              href='https://www.linkedin.com/in/alejandra-cast1811'
              target='_blank'
              rel='noopener noreferrer'
              className='text-zinc-400 hover:text-cyan-400 transition-all hover:drop-shadow-[0_0_10px_#22d3ee]'
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className='mt-16 text-center'>
        <p className='text-[10px] text-zinc-600 tracking-[0.4em] uppercase'>
          ©2026 — All rights reserved.
        </p>
      </div>

      {/* Animaciones */}
      <style jsx global>{`
        @keyframes bounce-no-flip {
          0% {
            top: 5%;
            left: 0%;
          }
          25% {
            top: 60%;
            left: 25%;
          }
          50% {
            top: 15%;
            left: 50%;
          }
          75% {
            top: 55%;
            left: 75%;
          }
          100% {
            top: 5%;
            left: 92%;
          }
        }
        .animate-bounce-no-flip {
          width: 80px;
          height: 80px;
          animation: bounce-no-flip 15s ease-in-out infinite alternate;
        }
        @keyframes bounce-no-flip-2 {
          0% {
            top: 70%;
            left: 90%;
          }
          25% {
            top: 20%;
            left: 65%;
          }
          50% {
            top: 75%;
            left: 35%;
          }
          75% {
            top: 25%;
            left: 10%;
          }
          100% {
            top: 70%;
            left: 0%;
          }
        }
        .animate-bounce-no-flip-2 {
          width: 75px;
          height: 75px;
          animation: bounce-no-flip-2 18s ease-in-out infinite alternate;
        }
      `}</style>
    </footer>
  )
}

export default Footer
