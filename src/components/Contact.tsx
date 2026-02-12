'use client'

import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <div className='w-full max-w-4xl mx-auto text-center space-y-12 py-10'>
      <div className='space-y-4'>
        <h2 className='text-5xl font-black text-white uppercase italic'>
          Inicia una <span className='text-violet-500'>Colaboración</span>
        </h2>
        <p className='text-slate-400 text-lg font-light max-w-2xl mx-auto'>
          ¿Tienes una idea o un proyecto que necesita un toque de creatividad y
          rigor técnico? Mi terminal siempre está abierta para nuevas
          conexiones.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-left'>
        <a
          href='mailto:tuemail@ejemplo.com'
          className='group p-8 border border-white/10 bg-white/5 rounded-2xl hover:border-violet-500/50 transition-all shadow-lg shadow-violet-500/5'
        >
          <span className='text-[10px] font-mono text-violet-500 uppercase tracking-widest font-bold'>
            Enviar Email
          </span>
          <p className='text-xl text-white mt-2 group-hover:translate-x-2 transition-transform italic'>
            contacto@alejandrachacon.dev
          </p>
        </a>

        <div className='p-8 border border-white/10 bg-white/5 rounded-2xl shadow-lg shadow-violet-500/5'>
          <span className='text-[10px] font-mono text-violet-500 uppercase tracking-widest font-bold'>
            Ubicación
          </span>
          <p className='text-xl text-white mt-2 italic'>
            San Cristóbal, Táchira, VZLA
          </p>
        </div>
      </div>

      <motion.button
        whileHover={{
          scale: 1.05,
          boxShadow: '0px 0px 20px rgba(139, 92, 246, 0.4)',
        }}
        whileTap={{ scale: 0.95 }}
        className='px-12 py-4 bg-violet-600 text-white font-bold rounded-full transition-colors uppercase tracking-widest text-sm'
      >
        Descargar CV_Archivo
      </motion.button>
    </div>
  )
}
