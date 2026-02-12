'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const navItems = [
  { name: 'Inicio', path: '#home', id: '01' },
  { name: 'Proyectos', path: '#projects', id: '02' },
  { name: 'Sobre Mí', path: '#about', id: '03' },
  { name: 'Contacto', path: '#contact', id: '04' },
]

export default function Navbar() {
  const { scrollY } = useScroll()
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Cambia el estado dependiendo de si bajaste más de 100px
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsCollapsed(latest > 100)
    })
  }, [scrollY])

  const { scrollYProgress } = useScroll()
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-100 flex items-center gap-4 h-fit group/nav">
      
      {/* TEXTOS DE NAVEGACIÓN CON REVELADO CONDICIONAL */}
      <div className="flex flex-col items-end gap-8">
        {navItems.map((item) => (
          <Link key={item.name} href={item.path} className="group flex items-center gap-4">
            
            <AnimatePresence>
              {(!isCollapsed) && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex flex-col items-end"
                >
                  <span className="text-[8px] font-mono text-violet-500 tracking-tighter">
                    WAYPOINT_{item.id}
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 group-hover:text-white transition-all whitespace-nowrap">
                    {item.name}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* PUNTO DE ÓRBITA (SIEMPRE VISIBLE) */}
            <motion.div 
              animate={{ 
                scale: isCollapsed ? 0.8 : 1,
                borderColor: isCollapsed ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.3)"
              }}
              className="w-3 h-3 rounded-full border flex items-center justify-center transition-colors group-hover:border-violet-500"
            >
                <div className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-violet-500 transition-colors" />
            </motion.div>
          </Link>
        ))}
      </div>

      {/* LÍNEA DE PROGRESO VERTICAL */}
      <div className="relative w-px h-48 bg-white/5">
        <motion.div 
          style={{ height: progressHeight }}
          className="absolute top-0 w-full bg-violet-500 shadow-[0_0_10px_#8b5cf6]"
        />
      </div>

      {/* TOOLTIP DINÁMICO: Al pasar el mouse sobre el nav colapsado, muestra qué es */}
      {isCollapsed && (
        <div className="absolute -left-20 opacity-0 group-hover/nav:opacity-100 transition-opacity text-[8px] font-mono text-white/20 rotate-270 uppercase tracking-[0.5em]">
          Menu_Minimized
        </div>
      )}
    </nav>
  )
}