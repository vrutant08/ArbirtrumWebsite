'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const DIFFICULTY = '00' // hash must start with this to be valid
const GENESIS_PREV = '0'.repeat(64)

/** SHA-256 via the built-in Web Crypto API */
async function sha256(message: string): Promise<string> {
  const data = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function blockPayload(index: number, prevHash: string, data: string, nonce: number) {
  return `${index}${prevHash}${data}${nonce}`
}

type BlockState = {
  data: string
  nonce: number
  hash: string
  mining: boolean
  attempts: number
}

const initialBlock = (data: string): BlockState => ({
  data,
  nonce: 0,
  hash: '',
  mining: false,
  attempts: 0,
})

export function BlockChain() {
  const [block1, setBlock1] = useState<BlockState>(() =>
    initialBlock('Alice pays Bob 5 ETH'),
  )
  const [block2, setBlock2] = useState<BlockState>(() =>
    initialBlock('Bob pays Carol 2 ETH'),
  )

  // Recompute Block 1 hash whenever its contents change
  useEffect(() => {
    let cancelled = false
    sha256(blockPayload(1, GENESIS_PREV, block1.data, block1.nonce)).then((h) => {
      if (!cancelled) setBlock1((b) => ({ ...b, hash: h }))
    })
    return () => {
      cancelled = true
    }
  }, [block1.data, block1.nonce])

  // Block 2 reads Block 1's hash as its Previous Hash — the chain link
  useEffect(() => {
    if (!block1.hash) return
    let cancelled = false
    sha256(blockPayload(2, block1.hash, block2.data, block2.nonce)).then((h) => {
      if (!cancelled) setBlock2((b) => ({ ...b, hash: h }))
    })
    return () => {
      cancelled = true
    }
  }, [block1.hash, block2.data, block2.nonce])

  const mine = useCallback(
    async (which: 1 | 2) => {
      const setBlock = which === 1 ? setBlock1 : setBlock2
      const block = which === 1 ? block1 : block2
      const prevHash = which === 1 ? GENESIS_PREV : block1.hash

      setBlock((b) => ({ ...b, mining: true, attempts: 0 }))

      let nonce = 0
      // Increment the nonce until the hash starts with the difficulty prefix
      for (;;) {
        const hash = await sha256(blockPayload(which, prevHash, block.data, nonce))
        if (nonce % 25 === 0) {
          const shown = nonce
          setBlock((b) => ({ ...b, attempts: shown }))
          // Yield to the browser so the UI can animate
          await new Promise((r) => setTimeout(r, 0))
        }
        if (hash.startsWith(DIFFICULTY)) {
          setBlock((b) => ({
            ...b,
            nonce,
            hash,
            mining: false,
            attempts: nonce,
          }))
          return
        }
        nonce++
      }
    },
    [block1, block2],
  )

  const valid1 = block1.hash.startsWith(DIFFICULTY)
  const valid2 = block2.hash.startsWith(DIFFICULTY)

  return (
    <div className="flex flex-col items-stretch gap-0 lg:flex-row">
      <BlockCard
        index={1}
        block={block1}
        prevHash={GENESIS_PREV}
        valid={valid1}
        onDataChange={(data) => setBlock1((b) => ({ ...b, data }))}
        onNonceChange={(nonce) => setBlock1((b) => ({ ...b, nonce }))}
        onMine={() => mine(1)}
      />

      {/* Chain link */}
      <div
        aria-hidden="true"
        className="flex items-center justify-center py-2 lg:px-2 lg:py-0"
      >
        <motion.span
          animate={{
            color: valid1 && valid2 ? 'var(--foreground)' : 'var(--destructive)',
            rotate: 0,
          }}
          className="text-display rotate-90 text-3xl lg:rotate-0"
        >
          {valid1 && valid2 ? '→' : '⤫'}
        </motion.span>
      </div>

      <BlockCard
        index={2}
        block={block2}
        prevHash={block1.hash}
        valid={valid2}
        onDataChange={(data) => setBlock2((b) => ({ ...b, data }))}
        onNonceChange={(nonce) => setBlock2((b) => ({ ...b, nonce }))}
        onMine={() => mine(2)}
      />
    </div>
  )
}

function BlockCard({
  index,
  block,
  prevHash,
  valid,
  onDataChange,
  onNonceChange,
  onMine,
}: {
  index: number
  block: BlockState
  prevHash: string
  valid: boolean
  onDataChange: (data: string) => void
  onNonceChange: (nonce: number) => void
  onMine: () => void
}) {
  return (
    <motion.div
      layout
      className={`flex flex-1 flex-col border transition-colors duration-500 ${
        valid ? 'bg-background' : 'bg-destructive/5'
      }`}
    >
      {/* Card header */}
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div className="flex items-baseline gap-3">
          <span className="text-label text-muted-foreground">Block</span>
          <span className="text-display text-3xl">#{index}</span>
        </div>
        <motion.span
          key={valid ? 'valid' : 'invalid'}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`rounded-full px-3 py-1 text-label ${
            valid
              ? 'bg-success/10 text-success'
              : 'bg-destructive text-background'
          }`}
        >
          {valid ? 'Block valid' : 'Block invalid'}
        </motion.span>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5">
        {/* Data */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor={`data-${index}`}
            className="text-label text-muted-foreground"
          >
            Block data
          </label>
          <textarea
            id={`data-${index}`}
            value={block.data}
            onChange={(e) => onDataChange(e.target.value)}
            rows={2}
            className="w-full resize-none border bg-background p-3 text-sm leading-relaxed outline-none transition-colors focus:border-foreground"
          />
        </div>

        {/* Nonce */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor={`nonce-${index}`}
            className="text-label text-muted-foreground"
          >
            Nonce
          </label>
          <input
            id={`nonce-${index}`}
            type="number"
            value={block.nonce}
            onChange={(e) => onNonceChange(Number(e.target.value) || 0)}
            className="w-full border bg-background p-3 font-mono text-sm outline-none transition-colors focus:border-foreground"
          />
        </div>

        {/* Previous hash */}
        <div className="flex flex-col gap-2">
          <span className="text-label text-muted-foreground">
            Previous hash {index === 2 && '(linked to Block #1)'}
          </span>
          <p className="break-all border bg-secondary p-3 font-mono text-xs leading-relaxed text-muted-foreground">
            {prevHash || '…'}
          </p>
        </div>

        {/* Hash output */}
        <div className="flex flex-col gap-2">
          <span className="text-label text-muted-foreground">Hash</span>
          <motion.p
            key={block.hash}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            className={`break-all border p-3 font-mono text-xs leading-relaxed ${
              valid
                ? 'border-success/40 bg-success/5 text-success'
                : 'border-destructive/40 bg-destructive/5 text-destructive'
            }`}
          >
            {block.hash || 'computing…'}
          </motion.p>
        </div>

        {/* Mine */}
        <div className="mt-auto flex items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={onMine}
              disabled={block.mining}
              className="btn-wipe inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors disabled:opacity-60"
            >
              {block.mining ? 'Mining…' : 'Mine ⛏'}
            </button>
          <span className="font-mono text-xs text-muted-foreground">
            {block.mining
              ? `${block.attempts.toLocaleString()} attempts`
              : block.attempts > 0
                ? `mined in ${block.attempts.toLocaleString()} tries`
                : `target: hash starts with "${DIFFICULTY}"`}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
