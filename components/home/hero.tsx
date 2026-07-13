'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])

  const [preloaderComplete, setPreloaderComplete] = useState(false)

  useEffect(() => {
    let delayTimeout: NodeJS.Timeout

    const handleComplete = () => {
      delayTimeout = setTimeout(() => {
        setPreloaderComplete(true)
      }, 300) // Adjust this value (in milliseconds) to delay/accelerate entrance animations after preloader finishes
    }
    window.addEventListener('preloader-complete', handleComplete)

    // Fallback safety to trigger entrance animations after 2.1s
    const fallback = setTimeout(() => {
      setPreloaderComplete(true)
    }, 2100)

    return () => {
      window.removeEventListener('preloader-complete', handleComplete)
      clearTimeout(delayTimeout)
      clearTimeout(fallback)
    }
  }, [])

  const titleContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2, // Animate as the preloader curtain rises
      }
    }
  }

  const titleChildVariants = {
    hidden: { y: '110%' },
    visible: {
      y: '0%',
      transition: { duration: 1.1, ease: EASE }
    }
  }

  const tagsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, delay: 0.8 }
    }
  }

  const descVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: EASE, delay: 0.4 }
    }
  }

  const buttonsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: EASE, delay: 0.55 }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.1, ease: EASE, delay: 0.6 }
    }
  }

  return (
    <section ref={ref} className="relative border-b">
      <div className="mx-auto max-w-[1400px] px-5 pt-14 md:px-8 md:pt-20">
        {/* Top meta row */}
        <motion.div
          initial="hidden"
          animate={preloaderComplete ? 'visible' : 'hidden'}
          variants={tagsVariants}
          className="mb-6 flex flex-wrap items-center gap-2"
        >
          {['Lampros DAO', 'Builder Labs', 'Web3 & Stylus'].map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-3 py-1 text-label text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Massive headline */}
        <motion.div
          style={{ y: titleY }}
          className="relative z-10"
          initial="hidden"
          animate={preloaderComplete ? 'visible' : 'hidden'}
          variants={titleContainerVariants}
        >
          <h1 className="text-mega">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                variants={titleChildVariants}
              >
                Builder
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block pl-[8vw]"
                variants={titleChildVariants}
              >
                Labs<span className="text-accent">.</span>
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* Sub row */}
        <div className="relative z-10 mt-8 flex flex-col justify-between gap-6 pb-10 md:mt-10 md:flex-row md:items-end md:pb-14">
          <motion.p
            initial="hidden"
            animate={preloaderComplete ? 'visible' : 'hidden'}
            variants={descVariants}
            className="max-w-md text-pretty leading-relaxed text-muted-foreground"
          >
            Welcome to the official portal for the Arbitrum Builder Labs seminar by Lampros DAO.
            We explored Web3 evolution, compiled Rust contracts via Stylus, and activated
            university-based Builder Pods for real-world projects.
          </motion.p>

          <motion.div
            initial="hidden"
            animate={preloaderComplete ? 'visible' : 'hidden'}
            variants={buttonsVariants}
            className="flex items-center gap-3"
          >
            <Link
              href="/concepts"
              className="group inline-flex items-center gap-3 border border-foreground bg-foreground px-6 py-3.5 text-xs font-mono uppercase tracking-widest text-background hover:bg-transparent hover:text-foreground transition-all duration-300 rounded-none"
            >
              Explore concepts
              <span className="transition-transform duration-300 group-hover:translate-x-1 font-sans">→</span>
            </Link>
            <Link
              href="/simulator"
              className="group inline-flex items-center gap-3 border border-foreground bg-transparent px-6 py-3.5 text-xs font-mono uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all duration-300 rounded-none"
            >
              Mine a block
              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 font-sans">↗</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Hero image with parallax */}
      <div className="mx-auto max-w-[1400px] px-5 pb-14 md:px-8 md:pb-20">
        <motion.div
          initial="hidden"
          animate={preloaderComplete ? 'visible' : 'hidden'}
          variants={imageVariants}
          className="img-zoom relative aspect-[16/8] overflow-hidden border"
        >
          <motion.img
            src="/images/hero-layers.png"
            alt="Abstract illustration of stacked black layers on an orange background, representing blockchain layers"
            className="h-[120%] w-full object-cover"
            style={{ y: imgY }}
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-background px-3 py-1 text-label">
            Fig. 01 — Layers of trust
          </span>
        </motion.div>
      </div>
    </section>
  )
}
