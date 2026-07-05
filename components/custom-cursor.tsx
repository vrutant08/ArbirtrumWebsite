'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 35, stiffness: 350, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    setMounted(true)
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener('mousemove', moveCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [cursorX, cursorY])

  if (!mounted) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    />
  )
}
