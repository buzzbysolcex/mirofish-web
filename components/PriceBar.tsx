'use client';
import { useState, useEffect } from 'react';

interface PriceData {
  usd: number;
  usd_24h_change: number;
}

export default function PriceBar() {
  const [prices, setPrices] = useState<Record<string, PriceData> | null>(null);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,solana,ethereum&vs_currencies=usd&include_24hr_change=true')
      .then(r => r.json())
      .then(data => setPrices(data))
      .catch(() => {});
  }, []);

  if (!prices) return (
    <div style={{ background: '#06060a', borderBottom: '1px solid #1a1a2e', padding: '6px 0', textAlign: 'center', fontFamily: 'monospace', fontSize: '12px', color: '#555' }}>
      Loading prices...
    </div>
  );

  const format = (id: string, symbol: string) => {
    const p = prices[id];
    if (!p) return null;
    const change = p.usd_24h_change;
    const color = change >= 0 ? '#00ff88' : '#ff4444';
    const sign = change >= 0 ? '+' : '';
    return (
      <span key={id} style={{ marginRight: '24px' }}>
        <span style={{ color: '#888' }}>{symbol}</span>{' '}
        <span style={{ color: '#e0e0e0' }}>${p.usd.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>{' '}
        <span style={{ color, fontSize: '11px' }}>({sign}{change.toFixed(2)}%)</span>
      </span>
    );
  };

  return (
    <div style={{
      background: '#06060a',
      borderBottom: '1px solid #1a1a2e',
      padding: '6px 0',
      textAlign: 'center',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '12px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    }}>
      {format('bitcoin', 'BTC')}
      {format('solana', 'SOL')}
      {format('ethereum', 'ETH')}
    </div>
  );
}
