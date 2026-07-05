import type { Metadata } from 'next'
import { RevealLines, FadeUp } from '@/components/motion'
import { PriceDashboard } from '@/components/prices/price-dashboard'
import { PricesHeroGraphic } from '@/components/hero-graphics'

export const metadata: Metadata = {
  title: 'Live Prices — Layered',
  description:
    'A live cryptocurrency price dashboard tracking BTC, ETH, ARB and more, powered by the CoinGecko API.',
}

const PRICE_TAGS = [
  'Bitcoin',
  'Ethereum',
  'Arbitrum',
  'Solana',
  'DeFi',
  'Layer 2',
  'Gas Fees',
  'Liquidity Pools',
]

export default function PricesPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b">
        <div className="relative mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <FadeUp>
            <span className="rounded-full border bg-background px-3 py-1 text-label text-muted-foreground">
              03 — Dashboard
            </span>
          </FadeUp>

          {/* Crypto ticker tags */}
          <FadeUp delay={0.15} className="mt-8 flex flex-wrap gap-2">
            {PRICE_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border bg-background px-3 py-1 text-label text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </FadeUp>

          {/* Animated geometric graphic */}
          <PricesHeroGraphic />

          <RevealLines
            as="h1"
            className="text-mega mt-6"
            lines={['Live', 'Prices']}
          />
          <FadeUp delay={0.25}>
            <p className="mt-8 max-w-xl leading-relaxed text-muted-foreground">
              Real-time market data for the assets that power Web3 — fetched
              from the CoinGecko public API with 24-hour change indicators.
            </p>
          </FadeUp>

          {/* Seminar highlight strip */}
          <FadeUp delay={0.35} className="mt-10">
            <div className="flex flex-wrap items-start gap-6 border-t pt-8">
              <div className="flex-1 min-w-[200px]">
                <span className="text-label text-accent">Why track prices?</span>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  The seminar covered how <span className="font-medium text-foreground">DeFi platforms like Uniswap</span> rely 
                  on real-time price feeds — understanding market data is foundational 
                  to building on-chain applications.
                </p>
              </div>
              <div className="flex-1 min-w-[200px]">
                <span className="text-label text-accent">Tokens explained</span>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">ETH</span> powers gas, 
                  <span className="font-medium text-foreground"> ARB</span> governs Arbitrum, 
                  <span className="font-medium text-foreground"> SOL</span> fuels Solana, and 
                  <span className="font-medium text-foreground"> BTC</span> pioneered decentralized money — each serves a distinct role.
                </p>
              </div>
              <div className="flex-1 min-w-[200px]">
                <span className="text-label text-accent">L2 fee advantage</span>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  A token swap costing <span className="font-medium text-foreground">$10–50 on Ethereum</span> mainnet 
                  typically costs just <span className="font-medium text-foreground">a few cents on Arbitrum</span> — settling 
                  in seconds while inheriting Ethereum&apos;s full security.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
          <PriceDashboard />
        </div>
      </section>
    </main>
  )
}
