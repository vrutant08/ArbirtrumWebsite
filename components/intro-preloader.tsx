'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%@$#&?*!+'

// Renders a preloader character that frantic cycles random symbols before settling
function PreloaderChar({ char, delay }: { char: string; delay: number }) {
  const [displayChar, setDisplayChar] = useState('')

  useEffect(() => {
    if (char === ' ') {
      setDisplayChar(' ')
      return
    }

    const startTimeout = setTimeout(() => {
      let ticks = 0
      const maxTicks = 8 // Quick frantic cycles
      
      const interval = setInterval(() => {
        const randomChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        setDisplayChar(randomChar)
        
        ticks++
        if (ticks >= maxTicks) {
          clearInterval(interval)
          setDisplayChar(char)
        }
      }, 35)

      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(startTimeout)
  }, [char, delay])

  return (
    <span className="inline-block">
      {displayChar || '\u00A0'}
    </span>
  )
}

export function IntroPreloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unlockTimer: NodeJS.Timeout

    // Lock body scroll during preload loading
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => {
      setLoading(false)
      window.dispatchEvent(new Event('preloader-complete'))

      // Delay releasing scroll lock until the curtain exit animation has fully completed (950ms)
      unlockTimer = setTimeout(() => {
        document.body.style.overflow = ''
      }, 950)
    }, 1700) // 1.7s total duration

    return () => {
      clearTimeout(timer)
      clearTimeout(unlockTimer)
      document.body.style.overflow = ''
    }
  }, [])

  const text = "BUILT BY VRUTANT FOR LAMPROS DAO"
  const words = text.split(' ')
  
  let globalCharIndex = 0

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: '-105%',
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } // Apple-style shutter ease
          }}
          className="fixed inset-0 bottom-[-2vh] z-[9999] flex items-center justify-center bg-[#111111] select-none"
        >
          <div className="text-center px-6">
            <div className="font-mono text-xs uppercase tracking-widest text-[#f4f4f2]/75">
              {words.map((word, wordIndex) => {
                const chars = word.split('')
                return (
                  <span key={wordIndex} className="inline-block mr-[0.45rem] last:mr-0">
                    {chars.map((char, charIndex) => {
                      const currentIndex = globalCharIndex++
                      return (
                        <PreloaderChar
                          key={charIndex}
                          char={char}
                          delay={currentIndex * 0.035} // Clean decryption wave
                        />
                      )
                    })}
                  </span>
                )
              })}
              
              {/* Premium signature orange period dot */}
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: globalCharIndex * 0.035 + 0.15,
                  type: 'spring',
                  stiffness: 150,
                  damping: 10
                }}
                className="inline-block text-[#ff4d00] font-sans font-bold ml-[1px]"
              >
                .
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
