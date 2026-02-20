'use client'

import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiSend } from 'react-icons/fi'

export default function Contact() {
  const email = 'alejcast18@gmail.com'
  const subject = encodeURIComponent(
    'Propuesta de Proyecto - Colaboración con Ale',
  )
  const body = encodeURIComponent(
    'Hola Alejandra,\n\nHe estado revisando tu portafolio y me interesa mucho tu perfil para un proyecto que tengo en mente. Me gustaría conocer más sobre tus servicios y disponibilidad.\n\nQuedo atento a tu respuesta.\n\nSaludos,',
  )

  const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`

  const contactInfo = [
    {
      id: 1,
      icon: <FiMail />,
      label: 'Bandeja de entrada',
      val: email,
    },
    {
      id: 2,
      icon: <FiMapPin />,
      label: 'Coordenadas',
      val: 'San Cristóbal, VZLA',
    },
  ]

  return (
    <section className='w-full py-16 md:py-24 px-6 relative flex items-center justify-center min-h-screen bg-transparent'>
      <div className='max-w-5xl mx-auto text-center space-y-12 md:space-y-20 relative z-10 w-full'>
        <div className='space-y-4'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-4xl md:text-8xl font-black text-white uppercase tracking-tighter leading-tight'
          >
            Inicia una{' '}
            <span className='text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]'>
              Colaboración
            </span>
          </motion.h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 text-left w-full'>
          {contactInfo.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ y: -5 }}
              className='relative group p-6 md:p-10 rounded-2xl bg-white/3 backdrop-blur-xl border border-white/10 overflow-hidden'
            >
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className='absolute top-0 left-0 w-1/2 h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_cyan]'
              />
              <motion.div
                animate={{ x: ['100%', '-100%'] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 1.5,
                }}
                className='absolute bottom-0 left-0 w-1/2 h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_cyan]'
              />

              <div className='relative z-10'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='p-2 bg-cyan-500/10 rounded-lg text-cyan-400'>
                    {card.icon}
                  </div>
                  <span className='text-[9px] font-mono text-cyan-400 uppercase tracking-[0.2em] font-bold'>
                    {card.label}
                  </span>
                </div>
                <p className='text-lg md:text-2xl text-white font-bold tracking-tight break-all md:break-normal'>
                  {card.val}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className='flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 px-4'>
          <motion.a
            href={mailtoUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='relative group w-full md:w-auto px-10 py-5 bg-transparent border-x border-cyan-500/40 overflow-hidden text-center cursor-pointer'
          >
            <motion.span
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className='absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent'
            />
            <motion.span
              animate={{ x: ['100%', '-100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className='absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent'
            />

            <div className='flex items-center justify-center gap-4 text-cyan-400 group-hover:text-white transition-all'>
              <FiSend size={18} />
              <span className='font-black uppercase tracking-[0.3em] text-[10px] md:text-xs'>
                Solicitar Servicios
              </span>
            </div>
            <div className='absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity' />
          </motion.a>
        </div>
      </div>
    </section>
  )
}
