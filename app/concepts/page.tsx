import type { Metadata } from 'next'
import { RevealLines, FadeUp, StaggerGrid, StaggerItem } from '@/components/motion'

export const metadata: Metadata = {
  title: 'Concepts — Layered',
  description:
    'Core Web3 concepts explained through side-by-side comparisons: Web2 vs Web3, Ethereum vs Bitcoin, public vs private keys, and blockchains vs databases.',
}

type Comparison = {
  index: string
  title: string
  intro: string
  left: { label: string; points: string[] }
  right: { label: string; points: string[] }
}

const COMPARISONS: Comparison[] = [
  {
    index: '01',
    title: 'Web2 vs Web3',
    intro:
      'Web2 is the internet of platforms — companies own your data and identity. Web3 is the internet of ownership — you hold your own keys, data, and money.',
    left: {
      label: 'Web2',
      points: [
        'Your data lives on company servers (Google, Meta) — they control and monetize it',
        'Login with passwords and OAuth, controlled by the platform',
        'Payments run through banks and processors that can block or reverse them',
        'Apps can be shut down or censored by a single company decision',
      ],
    },
    right: {
      label: 'Web3',
      points: [
        'Your data and assets are tied to your wallet — you own them',
        'Login by signing with your private key, no password needed',
        'Payments are peer-to-peer with no regulating middleman',
        'dApps run on decentralized networks no single party can switch off',
      ],
    },
  },
  {
    index: '02',
    title: 'Ethereum vs Bitcoin',
    intro:
      'Bitcoin proved that digital money without a central bank is possible. Ethereum extended the idea into a programmable world computer.',
    left: {
      label: 'Bitcoin',
      points: [
        'Purpose: decentralized digital money — a store of value',
        'Very limited scripting; deliberately simple and conservative',
        'Proof of Work consensus, ~10 minute block times',
        'Solves the "someone regulates your currency" problem',
      ],
    },
    right: {
      label: 'Ethereum',
      points: [
        'Purpose: a decentralized platform for smart contracts and dApps',
        'Fully programmable — self-executing agreements with predefined terms',
        'Proof of Stake consensus, ~12 second block times',
        'ETH powers the network as gas for every computation',
      ],
    },
  },
  {
    index: '03',
    title: 'Public Key vs Private Key',
    intro:
      'A key pair is your identity in Web3. One half you share with the world; the other half you guard with your life.',
    left: {
      label: 'Public key',
      points: [
        'Works like your account number — share it freely',
        'Also called your public address or wallet address',
        'Anyone can send funds or verify your signatures with it',
        'Derived from the private key, but cannot reveal it',
      ],
    },
    right: {
      label: 'Private key',
      points: [
        'Works like the master password to your vault — never share it',
        'Used to sign transactions and prove ownership of assets',
        'Whoever holds it controls the wallet — permanently',
        'Lost key means lost funds; there is no "forgot password"',
      ],
    },
  },
  {
    index: '04',
    title: 'Blockchain vs Traditional Database',
    intro:
      'Both store data — but a database trusts an administrator, while a blockchain trusts math and thousands of independent nodes.',
    left: {
      label: 'Traditional database',
      points: [
        'Controlled by one organization with admin privileges',
        'Records can be updated or deleted at any time (CRUD)',
        'Fast and cheap, but you must trust the operator',
        'A single breach or failure can corrupt or expose everything',
      ],
    },
    right: {
      label: 'Blockchain',
      points: [
        'Maintained by a distributed network — no single owner',
        'Append-only: past blocks are practically immutable',
        'Every record is cryptographically chained to the previous one',
        'Tampering with one block invalidates every block after it',
      ],
    },
  },
]

export default function ConceptsPage() {
  return (
    <main>
      {/* Page hero */}
      <section className="border-b">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
          <FadeUp>
            <span className="rounded-full border px-3 py-1 text-label text-muted-foreground">
              02 — Reference
            </span>
          </FadeUp>
          <RevealLines
            as="h1"
            className="text-mega mt-6"
            lines={['Core', 'Concepts']}
          />
          <FadeUp delay={0.25}>
            <p className="mt-8 max-w-xl leading-relaxed text-muted-foreground">
              Four fundamental comparisons that unlock how Web3 actually works
              — explained side by side, in plain language.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Comparison sections */}
      {COMPARISONS.map((c) => (
        <section key={c.index} className="border-b">
          <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
            <div className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <FadeUp>
                  <span className="text-label text-accent">{c.index}</span>
                </FadeUp>
                <RevealLines
                  as="h2"
                  className="text-display mt-3 text-3xl uppercase md:text-5xl"
                  lines={[c.title]}
                />
              </div>
              <FadeUp delay={0.15}>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  {c.intro}
                </p>
              </FadeUp>
            </div>

            <StaggerGrid className="grid grid-cols-1 border-l border-t md:grid-cols-2">
              {[c.left, c.right].map((side, sideIdx) => (
                <StaggerItem
                  key={side.label}
                  className={`border-b border-r p-6 md:p-8 ${
                    sideIdx === 1 ? 'bg-foreground text-background' : ''
                  }`}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-display text-2xl uppercase">
                      {side.label}
                    </h3>
                    <span
                      className={`rounded-full border px-3 py-1 text-label ${
                        sideIdx === 1
                          ? 'border-accent text-accent'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {sideIdx === 0 ? 'Then / Centralized' : 'Now / Decentralized'}
                    </span>
                  </div>
                  <ul className="flex flex-col">
                    {side.points.map((point, i) => (
                      <li
                        key={i}
                        className={`flex gap-4 border-t py-4 text-sm leading-relaxed ${
                          sideIdx === 1
                            ? 'border-background/20 text-background/80'
                            : 'text-muted-foreground'
                        }`}
                      >
                        <span
                          className={`text-label mt-0.5 shrink-0 ${
                            sideIdx === 1 ? 'text-accent' : 'text-foreground'
                          }`}
                        >
                          0{i + 1}
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>
      ))}
    </main>
  )
}
