import Image from 'next/image'
import { Linkedin, Github } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='relative w-full py-20 overflow-hidden bg-transparent text-white'>
      {/* --- LÍNEAS NEÓN CYAN (TOP & BOTTOM) --- */}
      <div className='absolute top-0 left-0 w-full h-0.5 bg-cyan-500 shadow-[0_0_20px_#06b6d4,0_0_40px_#06b6d4] opacity-70' />
      <div className='absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 shadow-[0_0_20px_#06b6d4,0_0_40px_#06b6d4] opacity-70' />

      <div className='absolute pointer-events-none animate-bounce-no-flip opacity-90 z-0'>
        <Image
          src='/rabbit-astronaut1.png'
          alt='Rabbit Astronaut'
          width={70}
          height={70}
          className='object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]'
        />
      </div>

      <div className='container mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-center gap-12'>
        {/* Lado Izquierdo: CunaguarosDev con Brillo al Hover */}
        <div className='flex flex-col items-center md:items-start gap-4'>
          <p className='text-zinc-400 text-sm tracking-wide transition-all'>
            Si necesitas un equipo de desarrolladores profesional, <br />
            puedes contactarnos en{' '}
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

        {/* Lado Derecho: Redes "Sígueme en" */}
        <div className='flex flex-col items-center md:items-end gap-3'>
          <span className='text-xs uppercase tracking-[0.4em] text-cyan-400 font-semibold drop-shadow-[0_0_8px_#06b6d4]'>
            Sígueme en
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

      {/* Copyright */}
      <div className='mt-16 text-center'>
        <p className='text-[10px] text-zinc-600 tracking-[0.4em] uppercase'>
          ©2026 — All rights reserved.
        </p>
      </div>

      {/* ANIMACIONES CSS ACTUALIZADAS */}
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
      `}</style>
    </footer>
  )
}

export default Footer
