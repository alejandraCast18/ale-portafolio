'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'

export default function Contact() {
  const { lang, mounted } = useLanguage()

  const [copied, setCopied] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  const email = 'alejcast18@gmail.com'

  // ✅ evita hydration issues
  if (!mounted) return null

  const handleContact = () => {
    const subject =
      lang === 'es'
        ? 'Solicitud de Servicios de Desarrollo'
        : 'Development Services Request'

    const body =
      lang === 'es'
        ? `Hola Alejandra,\n\nMe gustaría solicitar tus servicios de desarrollo para mi proyecto. ¿Podemos coordinar una reunión para discutir los detalles?\n\nSaludos.`
        : `Hi Alejandra,\n\nI’d like to hire your services for a project. Can we schedule a meeting to discuss the details?\n\nBest regards.`

    setShowNotification(true)

    setTimeout(() => {
      setShowNotification(false)

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`

      window.open(gmailUrl, '_blank')

      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }, 900)
  }

  // ✅ textos dinámicos
  const titleMain =
    lang === 'es' ? 'VAMOS A CREAR ALGO' : 'LET’S CREATE SOMETHING'

  const titleSub = lang === 'es' ? 'INCREÍBLE JUNTOS' : 'AMAZING TOGETHER'

  const buttonText = copied
    ? lang === 'es'
      ? 'EMAIL COPIADO'
      : 'EMAIL COPIED'
    : lang === 'es'
      ? 'INICIAR CONEXIÓN'
      : 'START CONNECTION'

  const inboxLabel = lang === 'es' ? 'Bandeja de entrada:' : 'Inbox:'

  const glowTitle =
    'group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all duration-500'

  return (
    <section
      id='contacto'
      className='w-full min-h-screen flex flex-col items-center justify-center px-6 py-[2cm] relative bg-transparent select-none'
    >
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 md:w-250 h-125 bg-cyan-500/10 blur-[180px] rounded-full -z-10' />

      <div className='w-full max-w-6xl mx-auto bg-black/40 border border-white/10 rounded-[4rem] flex flex-col justify-center items-center px-6 md:px-16 py-16 md:py-20 text-center relative overflow-hidden group hover:border-cyan-500/60 hover:shadow-[0_0_60px_rgba(34,211,238,0.15)] transition-all duration-700'>
        {/* líneas LED */}
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className='absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,1)]'
        />

        <motion.div
          animate={{ y: ['-100%', '100%'] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
            delay: 1.5,
          }}
          className='absolute top-0 right-0 h-full w-0.5 bg-linear-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,1)]'
        />

        <motion.div
          animate={{ x: ['100%', '-100%'] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
            delay: 3,
          }}
          className='absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,1)]'
        />

        <motion.div
          animate={{ y: ['100%', '-100%'] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
            delay: 4.5,
          }}
          className='absolute top-0 left-0 h-full w-0.5 bg-linear-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,1)]'
        />

        <div className='relative z-10 w-full'>
          <h2 className='text-5xl md:text-7xl lg:text-8xl font-black uppercase mb-12 leading-[0.9] tracking-tighter text-white'>
            {titleMain}
            <br />
            <span className={`text-zinc-600 italic block mt-4 ${glowTitle}`}>
              {titleSub}
            </span>
          </h2>

          <div className='flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16'>
            <button
              onClick={handleContact}
              className='w-full md:w-auto relative group/btn overflow-hidden border border-cyan-400/50 px-14 py-6 rounded-full font-black uppercase text-[13px] tracking-[0.4em] text-white transition-all duration-300 hover:border-cyan-400 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,242,255,0.35)] cursor-pointer active:scale-95'
              aria-label={buttonText}
            >
              <span className='relative z-10'>{buttonText}</span>
              <div className='absolute inset-0 bg-cyan-400 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500' />
            </button>

            <div className='flex flex-col items-center md:items-start'>
              <span className='text-zinc-500 font-mono text-[11px] uppercase tracking-[0.4em] mb-3'>
                {inboxLabel}
              </span>
              <span className='text-white font-bold text-xl md:text-2xl group-hover:text-cyan-400 transition-all duration-500'>
                {email}
              </span>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className='fixed bottom-10 left-1/2 -translate-x-1/2 bg-cyan-500/90 text-white px-6 py-3 rounded-full shadow-lg z-50 font-semibold uppercase tracking-wider text-sm'
          >
            {lang === 'es'
              ? 'Preparando tu correo...'
              : 'Preparing your email...'}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
