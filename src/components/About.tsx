'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const email = 'alejcast18@gmail.com'
  const subject = 'Propuesta de Proyecto - Colaboración con Ale'
  const body = 'Hola Alejandra,\n\nHe estado revisando tu portafolio y me interesa mucho tu perfil para un proyecto...'

  const handleContact = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    const newWindow = window.open(gmailUrl, '_blank')

    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  const glowTitle = 'group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all duration-700'

  return (
    <section
      id='contacto'
      className='min-h-[90vh] w-full flex flex-col items-center pt-20 pb-10 px-6 relative overflow-hidden bg-transparent'
    >
      <style jsx>{`
        @keyframes pulse-glow-contact {
          0%, 100% { text-shadow: 0 0 0px rgba(34, 211, 238, 0); color: #71717a; }
          50% { text-shadow: 0 0 15px rgba(34, 211, 238, 0.6); color: #22d3ee; }
        }
        .mobile-glow-contact { animation: pulse-glow-contact 3s ease-in-out infinite; }
        @media (min-width: 768px) { .mobile-glow-contact { animation: none; } }
      `}</style>

      {/* Luz de fondo suave */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 md:w-150 h-80 bg-cyan-500/5 blur-[120px] rounded-full -z-10' />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='flex-1 w-full max-w-5xl mx-auto bg-transparent border border-white/10 rounded-[3rem] md:rounded-[4rem] flex flex-col justify-center items-center px-6 md:px-16 py-16 text-center relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-1000 shadow-2xl'
      >
        {/* --- LÍNEAS ANIMADAS ESTILO ABOUT --- */}
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className='absolute top-0 left-0 w-1/3 h-0.5 bg-linear-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_15px_rgba(34,211,238,1)]'
        />
        <motion.div
          animate={{ y: ['-100%', '100%'] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
            delay: 0.75,
          }}
          className='absolute top-0 right-0 h-1/3 w-0.5 bg-linear-to-b from-transparent via-cyan-300 to-transparent shadow-[0_0_15px_rgba(34,211,238,1)]'
        />
        {/* ------------------------------------ */}

        <div className='relative z-10 w-full'>
          <h2 className='text-3xl md:text-5xl lg:text-6xl font-black uppercase mb-6 md:mb-8 leading-none tracking-tighter text-white'>
            VAMOS A CREAR ALGO <br />
            <span className={`text-zinc-500 italic block mt-1 mobile-glow-contact ${glowTitle}`}>
              INCREÍBLE JUNTOS
            </span>
          </h2>

          <div className='flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10'>
            {/* Botón con efecto de llenado vertical */}
            <button
              onClick={handleContact}
              className='w-full md:w-auto relative group/btn overflow-hidden border border-cyan-400/50 px-10 py-4 md:py-5 rounded-full font-black uppercase text-[10px] md:text-[11px] tracking-[0.2em] text-white transition-all hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] cursor-pointer active:scale-95'
            >
              <span className='relative z-10 transition-colors duration-500'>
                {copied ? 'EMAIL COPIADO' : 'Iniciar Conexión'}
              </span>
              <div className='absolute inset-0 bg-cyan-400/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500' />
            </button>

            <div className='flex flex-col items-center md:items-start text-center md:text-left'>
              <span className='text-zinc-500 font-mono text-[8px] uppercase tracking-widest mb-1'>
                Bandeja de entrada:
              </span>
              <span className='text-white font-bold text-sm md:text-base group-hover:text-cyan-400 transition-colors'>
                {email}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}