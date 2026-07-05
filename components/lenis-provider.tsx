'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Disable native browser scroll restoration to prevent layout jump conflicts
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual'
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    lenisRef.current = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Listen for route changes and force scroll positions to 0 immediately while halting scroll physics momentum
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.stop() // Halt animation loop and freeze scroll physics
      lenisRef.current.scrollTo(0, { immediate: true }) // Set viewport scroll to 0 immediately
      
      // Delay start to next frame to ensure rendering engine is completely done resetting DOM positions
      requestAnimationFrame(() => {
        lenisRef.current?.start()
      })
    }
    window.scrollTo(0, 0) // Reset native window coordinate
  }, [pathname])

  return <>{children}</>
}
