import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import SparklesCore from '@/components/SparklesCore'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ale Dev | Space Portfolio',
  description: 'Una aventura espacial a través de mis proyectos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es'>
      <body
        className={`${inter.className} bg-slate-950 text-white antialiased overflow-x-hidden`}
      >

        {/* FONDO ESPACIAL FIJO */}
        <div className='fixed inset-0 z-0'>
          <SparklesCore
            id='tsparticlesfullpage'
            background='transparent'
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className='w-full h-full'
            particleColor='#FFFFFF'
            speed={0.5}
          />
        </div>

        {/* CONTENIDO DE LA APP */}
        <div className='relative z-10'>
          <Navbar />
          <main className='pt-20'>{children}</main>
        </div>
      </body>
    </html>
  )
}