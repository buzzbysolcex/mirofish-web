'use client';

import { useState } from 'react';

interface ContractAddressProps {
  address: string;
  chain: string;
  compact?: boolean;
}

function getExplorerUrl(chain: string, address: string) {
  const c = chain.toLowerCase();
  if (c === 'sol' || c === 'solana') return `https://solscan.io/token/${address}`;
  if (c === 'base') return `https://basescan.org/token/${address}`;
  if (c === 'bsc') return `https://bscscan.com/token/${address}`;
  if (c === 'eth' || c === 'ethereum') return `https://etherscan.io/token/${address}`;
  if (c === 'arb' || c === 'arbitrum') return `https://arbiscan.io/token/${address}`;
  return `https://solscan.io/token/${address}`;
}

function getDexUrl(chain: string, address: string) {
  const c = chain.toLowerCase();
  const dexChain = c === 'sol' ? 'solana' : c === 'bsc' ? 'bsc' : c === 'arb' ? 'arbitrum' : c;
  return `https://dexscreener.com/${dexChain}/${address}`;
}

export default function ContractAddress({ address, chain, compact = false }: ContractAddressProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1 text-xs">
        <code style={{ color: '#888' }}>{address.slice(0, 6)}...{address.slice(-4)}</code>
        <button onClick={handleCopy} title="Copy address" className="hover:opacity-80"
          style={{ color: copied ? '#00ff88' : '#555', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
          {copied ? '✅' : '📋'}
        </button>
        <a href={getDexUrl(chain, address)} target="_blank" rel="noopener noreferrer"
          title="View on DexScreener" style={{ color: '#555' }} className="hover:opacity-80">🔗</a>
      </span>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <code className="px-2 py-1 rounded break-all" style={{ background: '#0a0a0f', color: '#888', border: '1px solid #1a1a2e' }}>
        {address}
      </code>
      <div className="flex gap-1">
        <button onClick={handleCopy} className="px-2 py-1 rounded transition-all"
          style={{ background: copied ? 'rgba(0,255,136,0.15)' : 'rgba(0,255,255,0.08)', border: '1px solid rgba(0,255,255,0.2)', color: copied ? '#00ff88' : '#00ffff', cursor: 'pointer' }}>
          {copied ? '✅ Copied' : '📋 Copy'}
        </button>
        <a href={getDexUrl(chain, address)} target="_blank" rel="noopener noreferrer"
          className="px-2 py-1 rounded" style={{ background: 'rgba(0,255,255,0.08)', border: '1px solid rgba(0,255,255,0.2)', color: '#00ffff', textDecoration: 'none' }}>
          🔗 DexScreener
        </a>
        <a href={getExplorerUrl(chain, address)} target="_blank" rel="noopener noreferrer"
          className="px-2 py-1 rounded" style={{ background: 'rgba(255,0,255,0.08)', border: '1px solid rgba(255,0,255,0.2)', color: '#ff00ff', textDecoration: 'none' }}>
          🔍 Explorer
        </a>
      </div>
    </div>
  );
}
