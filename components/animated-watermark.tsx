'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%@$#&?*!+'

// Renders a character that frantically cycles through random characters before decoding to the final value
function DecryptChar({ char, delay }: { char: string; delay: number }) {
  const [displayChar, setDisplayChar] = useState('')

  useEffect(() => {
    if (char === ' ') {
      setDisplayChar(' ')
      return
    }

    // Phase 1: Wait for stagger delay
    const startTimeout = setTimeout(() => {
      let ticks = 0
      const maxTicks = 6 // Number of frantic character flips
      
      const interval = setInterval(() => {
        // Choose a random scramble symbol
        const randomChar = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        setDisplayChar(randomChar)
        
        ticks++
        if (ticks >= maxTicks) {
          clearInterval(interval)
          setDisplayChar(char) // Settle on the target letter
        }
      }, 40) // Cycle every 40ms for a frantic feel

      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(startTimeout)
  }, [char, delay])

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: displayChar ? 1 : 0 }}
      transition={{ duration: 0.05 }}
      className="inline-block"
    >
      {displayChar || '\u00A0'}
    </motion.span>
  )
}

export function AnimatedWatermark({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null)
  
  // Track precise pixel scroll offset of the window
  const { scrollY } = useScroll()
  
  // Matches the homepage title's tight letter spacing (-0.045em) on load,
  // and expands spacing subtly up to 0.05em as the user scrolls.
  const letterSpacing = useTransform(scrollY, [0, 300], ['-0.045em', '0.05em'])
  
  // High contrast base opacity (0.45) fading to 0.0 as scroll passes 250px
  const opacity = useTransform(scrollY, [0, 250], [0.45, 0.0])

  const words = text.split(' ')
  
  // Stagger index for decrypt reveal
  let globalCharIndex = 0

  return (
    <div ref={ref} className="w-full overflow-hidden select-none py-1">
      <motion.div
        style={{ letterSpacing, opacity }}
        className="flex justify-start pl-5 md:pl-8 text-mega whitespace-nowrap"
      >
        {words.map((word, wordIndex) => {
          const chars = word.split('')
          // Swap coloring: First word is orange (accent), second is black (foreground)
          const isOrange = wordIndex === 0
          const wordColorClass = isOrange ? 'text-accent' : 'text-foreground'

          return (
            <span key={wordIndex} className={`inline-block ${wordColorClass} mr-[0.5rem] last:mr-0`}>
              {chars.map((char, charIndex) => {
                const currentIndex = globalCharIndex++
                return (
                  <DecryptChar
                    key={charIndex}
                    char={char}
                    delay={currentIndex * 0.06} // Clean wave stagger delay
                  />
                )
              })}
              
              {/* Append signature orange period immediately after the orange word */}
              {isOrange && (
                <DecryptChar
                  char="."
                  delay={globalCharIndex++ * 0.06}
                />
              )}
            </span>
          )
        })}
      </motion.div>
    </div>
  )
}
