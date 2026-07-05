'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV = [
  { href: '/', label: 'Home', index: '01' },
  { href: '/concepts', label: 'Concepts', index: '02' },
  { href: '/prices', label: 'Live Prices', index: '03' },
  { href: '/simulator', label: 'Block Simulator', index: '04' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          className="text-display text-lg uppercase tracking-tight"
          onClick={() => setOpen(false)}
        >
          Layered<span className="text-accent">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`group relative rounded-none border px-4 py-1.5 text-sm transition-colors duration-300 ${
                  active
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                }`}
              >
                <span className="text-label mr-1.5 text-[9px] opacity-50">
                  {item.index}
                </span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <motion.span
            className="block h-px w-5 bg-foreground"
            animate={{ rotate: open ? 45 : 0, y: open ? 3.5 : 0 }}
          />
          <motion.span
            className="block h-px w-5 bg-foreground"
            animate={{ rotate: open ? -45 : 0, y: open ? -3.5 : 0 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            className="overflow-hidden border-t bg-background md:hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul>
              {NAV.map((item, i) => {
                const active = pathname === item.href
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="border-b last:border-b-0"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-baseline gap-3 px-5 py-4 text-display text-2xl uppercase ${
                        active ? 'text-accent' : 'text-foreground'
                      }`}
                    >
                      <span className="text-label text-muted-foreground">
                        {item.index}
                      </span>
                      {item.label}
                    </Link>
                  </motion.li>
                )
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
