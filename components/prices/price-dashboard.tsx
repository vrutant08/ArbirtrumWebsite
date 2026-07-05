'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FadeUp, StaggerGrid, StaggerItem, Magnetic } from '@/components/motion'

const EASE = [0.16, 1, 0.3, 1] as const

type Coin = {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
}

const COIN_IDS = ['bitcoin', 'ethereum', 'arbitrum', 'solana'] as const

const COIN_META: Record<string, { symbol: string; name: string }> = {
  bitcoin: { symbol: 'BTC', name: 'Bitcoin' },
  ethereum: { symbol: 'ETH', name: 'Ethereum' },
  arbitrum: { symbol: 'ARB', name: 'Arbitrum' },
  solana: { symbol: 'SOL', name: 'Solana' },
}

const COINGECKO_URL = `https://api.coingecko.com/api/v3/simple/price?ids=${COIN_IDS.join(',')}&vs_currencies=usd&include_24hr_change=true`

function formatPrice(value: number) {
  if (value === 0) return '——'
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value < 10 ? 4 : 2,
  })
}

export function PriceDashboard() {
  const [coins, setCoins] = useState<Coin[]>(
    COIN_IDS.map((id) => ({
      id,
      ...COIN_META[id],
      price: 0,
      change24h: 0,
    }))
  )
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchPrices = useCallback(async () => {
    setRefreshing(true)
    setError(null)
    try {
      const res = await fetch(COINGECKO_URL)
      if (!res.ok) throw new Error(`API responded with ${res.status}`)
      const data = await res.json()

      setCoins(
        COIN_IDS.map((id) => ({
          id,
          ...COIN_META[id],
          price: data[id]?.usd ?? 0,
          change24h: data[id]?.usd_24h_change ?? 0,
        }))
      )
      setLastUpdated(new Date().toLocaleTimeString())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prices')
    } finally {
      setRefreshing(false)
    }
  }, [])

  // Fetch on mount
  useEffect(() => {
    fetchPrices()
  }, [fetchPrices])

  return (
    <div>
      {/* Controls */}
      <FadeUp className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-label text-muted-foreground">
            {error
              ? `Error: ${error}`
              : lastUpdated
                ? `Live · Last updated ${lastUpdated}`
                : 'Connecting to CoinGecko API…'}
          </span>
        </div>

        <Magnetic>
          <button
            type="button"
            onClick={fetchPrices}
            disabled={refreshing}
            className="btn-wipe inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-2.5 text-sm font-medium transition-colors disabled:opacity-50"
          >
            <motion.span
              animate={refreshing ? { rotate: 360 } : { rotate: 0 }}
              transition={
                refreshing
                  ? { repeat: Infinity, duration: 0.8, ease: 'linear' }
                  : { duration: 0.3 }
              }
              className="inline-block"
              aria-hidden="true"
            >
              ↻
            </motion.span>
            Refresh
          </button>
        </Magnetic>
      </FadeUp>

      {/* Price cards */}
      <StaggerGrid className="grid grid-cols-1 border-l border-t sm:grid-cols-2 lg:grid-cols-4">
        {coins.map((coin) => {
          const up = coin.change24h >= 0
          return (
            <StaggerItem
              key={coin.id}
              className="group flex min-h-56 flex-col justify-between gap-8 border-b border-r p-6 transition-colors duration-500 hover:bg-foreground"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-display text-2xl uppercase transition-colors duration-500 group-hover:text-background">
                    {coin.symbol}
                  </h2>
                  <p className="text-sm text-muted-foreground transition-colors duration-500 group-hover:text-background/60">
                    {coin.name}
                  </p>
                </div>
                <span className="rounded-full border px-2.5 py-0.5 text-label text-muted-foreground transition-colors duration-500 group-hover:border-background/30 group-hover:text-background/60">
                  USD
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-3xl tracking-tight transition-colors duration-500 group-hover:text-background">
                  {formatPrice(coin.price)}
                </span>
                <span
                  className={`flex w-fit items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-xs ${
                    coin.price === 0
                      ? 'bg-secondary text-muted-foreground'
                      : up
                        ? 'bg-success/10 text-success'
                        : 'bg-destructive/10 text-destructive'
                  }`}
                >
                  {coin.price === 0 ? (
                    'pending'
                  ) : (
                    <>
                      <span aria-hidden="true">{up ? '▲' : '▼'}</span>
                      {Math.abs(coin.change24h).toFixed(2)}%
                      <span className="sr-only">
                        {up ? 'up' : 'down'} in the last 24 hours
                      </span>
                    </>
                  )}
                </span>
              </div>
            </StaggerItem>
          )
        })}
      </StaggerGrid>

      {/* Note strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        className="mt-8 flex items-center gap-3 border p-4"
      >
        <span className="rounded-full bg-accent px-3 py-1 text-label text-accent-foreground">
          Live
        </span>
        <p className="text-sm text-muted-foreground">
          Prices fetched from the free CoinGecko public API — no API key
          required. Data refreshes on page load and on manual refresh.
        </p>
      </motion.div>
    </div>
  )
}
