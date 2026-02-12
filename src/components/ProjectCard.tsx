'use client'

import { motion } from 'framer-motion'

interface ProjectProps {
  id: string
  title: string
  description: string
  tech: string[]
}

export default function ProjectCard({ id, title, description, tech }: ProjectProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative p-8 rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-md overflow-hidden"
    >
      {/* 1. Efecto de Brillo en el borde al hacer Hover */}
      <div className="absolute inset-0 bg-linear-to-br from-pink-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* 2. Número de Misión (Estilo HUD) */}
      <span className="text-[10px] font-mono text-pink-500/50 tracking-widest block mb-4">
        MISSION_ID // {id}
      </span>

      {/* 3. Título y Descripción */}
      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-6">
        {description}
      </p>

      {/* 4. Tags de Tecnología */}
      <div className="flex flex-wrap gap-2">
        {tech.map((item) => (
          <span 
            key={item}
            className="px-3 py-1 text-[9px] font-mono uppercase tracking-tighter border border-white/5 bg-white/5 text-slate-300 rounded-full"
          >
            {item}
          </span>
        ))}
      </div>

      {/* 5. Decoración Holográfica: Línea de escaneo que cruza la card */}
      <motion.div 
        animate={{ top: ['-100%', '200%'] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none"
      />

      {/* 6. Esquina interactiva (Estilo UI militar/espacial) */}
      <div className="absolute top-0 right-0 p-2 opacity-20">
        <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-tr-xs" />
      </div>
    </motion.div>
  )
}