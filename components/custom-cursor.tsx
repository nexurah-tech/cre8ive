'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Hide cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    dot.style.display = 'block'
    ring.style.display = 'block'

    // Use RAF loop to apply position — decoupled from React renders
    const updateDOM = () => {
      const { x, y } = posRef.current
      dot.style.left = `${x}px`
      dot.style.top = `${y}px`
      ring.style.left = `${x}px`
      ring.style.top = `${y}px`
      rafRef.current = requestAnimationFrame(updateDOM)
    }
    rafRef.current = requestAnimationFrame(updateDOM)

    const handleMouseMove = (e: MouseEvent) => {
      // Just update ref — no setState, no re-render
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const setHover = (hovering: boolean) => {
      if (!dot || !ring) return
      if (hovering) {
        dot.style.width = '60px'
        dot.style.height = '60px'
        dot.style.backgroundColor = '#f2ede6'
        ring.style.width = '80px'
        ring.style.height = '80px'
        ring.style.opacity = '0'
      } else {
        dot.style.width = '12px'
        dot.style.height = '12px'
        dot.style.backgroundColor = '#EAB308'
        ring.style.width = '40px'
        ring.style.height = '40px'
        ring.style.opacity = '0.5'
      }
    }

    const handleMouseEnter = () => setHover(true)
    const handleMouseLeave = () => setHover(false)

    document.addEventListener('mousemove', handleMouseMove, { passive: true })

    const links = document.querySelectorAll('a, button')
    links.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('mousemove', handleMouseMove)
      links.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        id="cursor"
        ref={dotRef}
        style={{
          display: 'none',
          position: 'fixed',
          width: '12px',
          height: '12px',
          backgroundColor: '#EAB308',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s ease-out, height 0.2s ease-out, background-color 0.2s ease-out',
          willChange: 'transform',
        }}
      />
      <div
        id="cursor-ring"
        ref={ringRef}
        style={{
          display: 'none',
          position: 'fixed',
          width: '40px',
          height: '40px',
          border: '1px solid white',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          mixBlendMode: 'difference',
          transform: 'translate(-50%, -50%)',
          opacity: 0.5,
          transition: 'width 0.3s ease-out, height 0.3s ease-out, opacity 0.3s ease-out',
          willChange: 'transform',
        }}
      />
    </>
  )
}
