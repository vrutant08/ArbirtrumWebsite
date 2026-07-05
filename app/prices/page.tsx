import type { Metadata } from 'next'
import { RevealLines, FadeUp } from '@/components/motion'
import { PriceDashboard } from '@/components/prices/price-dashboard'

export const metadata: Metadata = {
  title: 'Live Prices — Layered',
  description:
    'A live cryptocurrency price dashboard tracking BTC, ETH, ARB and more, powered by the CoinGecko API.',
}

export default function PricesPage() {
  return (
    <main>
      <section className="border-b">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <FadeUp>
            <span className="rounded-full border px-3 py-1 text-label text-muted-foreground">
              03 — Dashboard
            </span>
          </FadeUp>
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
