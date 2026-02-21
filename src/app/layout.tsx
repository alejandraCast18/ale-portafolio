import type { Metadata } from 'next'
import { Inter, Dancing_Script } from 'next/font/google'
import './globals.css'
import SparklesCore from '@/components/SparklesCore'
import { ThemeProvider } from '@/context/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-signature',
})

export const metadata: Metadata = {
  title: 'Ale Dev | Mi Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es' className='scroll-smooth'>
      <body
        className={`${inter.className} ${dancing.variable} bg-black text-white antialiased overflow-x-hidden m-0 p-0`}
      >
        <ThemeProvider>
          <div className='fixed inset-0 z-0 pointer-events-none'>
            <SparklesCore
              minSize={0.6}
              maxSize={1.4}
              particleDensity={120}
              className='w-full h-full'
              particleColor='#FFFFFF'
            />
          </div>

          <div className='relative z-10'>
            <main className='m-0 p-0'>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
