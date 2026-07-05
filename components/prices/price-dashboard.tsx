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
  sparkline: number[]
}

const COIN_IDS = ['bitcoin', 'ethereum', 'arbitrum', 'solana'] as const

const COIN_META: Record<string, { symbol: string; name: string }> = {
  bitcoin: { symbol: 'BTC', name: 'Bitcoin' },
  ethereum: { symbol: 'ETH', name: 'Ethereum' },
  arbitrum: { symbol: 'ARB', name: 'Arbitrum' },
  solana: { symbol: 'SOL', name: 'Solana' },
}

// Markets endpoint provides 7-day sparkline data
const COINGECKO_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COIN_IDS.join(',')}&sparkline=true`

function formatPrice(value: number) {
  if (value === 0) return '——'
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value < 10 ? 4 : 2,
  })
}

// Clean mock sparkline generator using a mathematical sine overlay for smooth, beautiful curves
function generateMockSparkline(id: string, isUp: boolean) {
  const points = 24
  const mockData: number[] = []
  let currentVal = id === 'bitcoin' ? 62000 : id === 'ethereum' ? 1750 : id === 'solana' ? 81 : 0.08
  const trend = isUp ? 0.003 : -0.003
  for (let i = 0; i < points; i++) {
    const noise = Math.sin(i / 2.5) * 0.015 + (Math.random() - 0.5) * 0.01
    currentVal = currentVal * (1 + trend + noise)
    mockData.push(currentVal)
  }
  return mockData
}

function sampleArray<T>(arr: T[], targetLength: number): T[] {
  if (arr.length <= targetLength) return arr
  const sampled: T[] = []
  for (let i = 0; i < targetLength; i++) {
    const index = Math.round((i / (targetLength - 1)) * (arr.length - 1))
    sampled.push(arr[index])
  }
  return sampled
}

// Sub-component to draw and animate sparklines as dotted lines with spring-jumping stagger dots
function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  if (!data || data.length === 0) return null

  // Downsample array to 16 points for clean visual spacing of dots
  const sampledData = sampleArray(data, 16)

  const min = Math.min(...sampledData)
  const max = Math.max(...sampledData)
  const range = max - min
  
  const width = 120
  const height = 48
  
  const points = sampledData.map((val, index) => {
    const x = (index / (sampledData.length - 1)) * width
    const y = range === 0 ? height / 2 : height - ((val - min) / range) * height
    return { x, y }
  })

  const pathD = points.reduce((acc, p, index) => {
    return index === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`
  }, '')

  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`
  const color = positive ? 'var(--success)' : 'var(--destructive)'
  const gradientId = `gradient-${positive ? 'up' : 'down'}-${Math.floor(Math.random() * 1000000)}`

  const areaVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' as const, delay: 0.15 }
    }
  }

  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 1.4, ease: 'easeInOut' as const }
    }
  }

  const makeCircleVariants = (cyTarget: number, index: number) => ({
    hidden: { cy: height, opacity: 0 },
    visible: {
      cy: cyTarget,
      opacity: 1,
      transition: {
        delay: index * 0.07,
        type: 'spring' as const,
        stiffness: 160,
        damping: 10,
      }
    }
  })

  return (
    <div className="relative h-12 w-full">
      <motion.svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-full w-full overflow-visible"
        preserveAspectRatio="none"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.15} />
            <stop offset="100%" stopColor={color} stopOpacity={0.0} />
          </linearGradient>
        </defs>

        {/* Shaded Area underneath */}
        <motion.path
          d={areaD}
          fill={`url(#${gradientId})`}
          variants={areaVariants}
        />

        {/* Dotted Line connecting points */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={1}
          strokeDasharray="2 3"
          variants={lineVariants}
        />

        {/* Sequential spring-jumping dots */}
        {points.map((p, index) => (
          <motion.circle
            key={index}
            cx={p.x}
            r={2}
            fill={color}
            variants={makeCircleVariants(p.y, index)}
          />
        ))}
      </motion.svg>
    </div>
  )
}

export function PriceDashboard() {
  const [coins, setCoins] = useState<Coin[]>(() =>
    COIN_IDS.map((id) => ({
      id,
      ...COIN_META[id],
      price: 0,
      change24h: 0,
      sparkline: generateMockSparkline(id, id !== 'arbitrum'),
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

      if (!Array.isArray(data)) {
        throw new Error('Invalid response structure from API')
      }

      const coinsMap = data.reduce((acc: any, coin: any) => {
        acc[coin.id] = coin
        return acc
      }, {})

      setCoins(
        COIN_IDS.map((id) => {
          const coinData = coinsMap[id]
          const price = coinData?.current_price ?? 0
          const change24h = coinData?.price_change_percentage_24h ?? 0
          const sparklineData = coinData?.sparkline_in_7d?.price ?? []

          return {
            id,
            ...COIN_META[id],
            price,
            change24h,
            sparkline: sparklineData.length > 0 ? sparklineData : generateMockSparkline(id, change24h >= 0),
          }
        })
      )
      setLastUpdated(new Date().toLocaleTimeString())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prices')
      // Fill current coins with fallback mock sparklines if they don't have one
      setCoins((prevCoins) =>
        prevCoins.map((coin) => ({
          ...coin,
          sparkline: coin.sparkline.length > 0 ? coin.sparkline : generateMockSparkline(coin.id, coin.change24h >= 0),
        }))
      )
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
              ? `Using cache/fallback (${error})`
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
              className="group flex min-h-[280px] flex-col justify-between gap-6 border-b border-r p-6 transition-colors duration-500 hover:bg-foreground"
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

              {/* Graphical View with animated transition effects */}
              <div className="my-2 w-full opacity-85 scale-y-[0.9] group-hover:opacity-100 group-hover:scale-y-[1.05] transition-all duration-500 origin-center">
                <Sparkline data={coin.sparkline} positive={up} />
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
          required. Data refreshes on page load and on manual refresh. Includes animated 7-day trend sparklines.
        </p>
      </motion.div>
    </div>
  )
}
