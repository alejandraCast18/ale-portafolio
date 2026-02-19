'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/libs/utils'

interface Circle {
  x: number
  y: number
  size: number
  alpha: number
  dx: number
  dy: number
}

interface SparklesProps {
  id?: string
  className?: string
  minSize?: number
  maxSize?: number
  particleColor?: string
  particleDensity?: number
}

export const SparklesCore: React.FC<SparklesProps> = ({
  className,
  particleDensity = 300,
  minSize = 0.6,
  maxSize = 1.4,
  particleColor = '#ffffff',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<Circle[]>([])
  const mouse = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number>(0)
  const canvasSize = useRef({ w: 0, h: 0 })
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1

  const REPULSE_RADIUS = 130 // Radio de alejamiento
  const REPULSE_STRENGTH = 0.5

  // Tracking del mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return
    context.current = ctx

    const initCanvas = () => {
      if (!containerRef.current || !canvasRef.current) return

      canvasSize.current.w = containerRef.current.offsetWidth
      canvasSize.current.h = containerRef.current.offsetHeight

      canvasRef.current.width = canvasSize.current.w * dpr
      canvasRef.current.height = canvasSize.current.h * dpr
      canvasRef.current.style.width = `${canvasSize.current.w}px`
      canvasRef.current.style.height = `${canvasSize.current.h}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      circles.current = Array.from({ length: particleDensity }, () => ({
        x: Math.random() * canvasSize.current.w,
        y: Math.random() * canvasSize.current.h,
        size: Math.random() * (maxSize - minSize) + minSize,
        alpha: Math.random() * 0.6 + 0.2,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
      }))
    }

    initCanvas()
    window.addEventListener('resize', initCanvas)

    function loop() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)

      circles.current.forEach((circle) => {
        // Movimiento constante
        circle.x += circle.dx
        circle.y += circle.dy

        // Efecto de repulsión
        const dxMouse = mouse.current.x - circle.x
        const dyMouse = mouse.current.y - circle.y
        const distance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

        if (distance < REPULSE_RADIUS && distance > 0) {
          const force = (REPULSE_RADIUS - distance) / REPULSE_RADIUS
          circle.x -= (dxMouse / distance) * force * REPULSE_STRENGTH * 10
          circle.y -= (dyMouse / distance) * force * REPULSE_STRENGTH * 10
        }

        ctx.beginPath()
        ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.globalAlpha = circle.alpha
        ctx.fill()
        ctx.globalAlpha = 1

        // Loop infinito por los bordes
        if (circle.x < -20) circle.x = canvasSize.current.w + 20
        if (circle.x > canvasSize.current.w + 20) circle.x = -20
        if (circle.y < -20) circle.y = canvasSize.current.h + 20
        if (circle.y > canvasSize.current.h + 20) circle.y = -20
      })

      animationFrameId.current = requestAnimationFrame(loop)
    }

    animationFrameId.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', initCanvas)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [particleDensity, minSize, maxSize, particleColor, dpr])

  return (
    <div ref={containerRef} className={cn('w-full h-full', className)}>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default SparklesCore
