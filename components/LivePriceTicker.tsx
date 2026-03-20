'use client';

import { useState, useEffect, useRef } from 'react';

interface PriceData {
  symbol: string;
  price: number;
  change24h: number;
  prevPrice: number;
}

const COINGECKO_IDS: Record<string, string> = {
  'BTC-USDT': 'bitcoin',
  'ETH-USDT': 'ethereum',
  'SOL-USDT': 'solana',
};

export default function LivePriceTicker() {
  const [prices, setPrices] = useState<Record<string, PriceData>>({
    'BTC-USDT': { symbol: 'BTC', price: 0, change24h: 0, prevPrice: 0 },
    'ETH-USDT': { symbol: 'ETH', price: 0, change24h: 0, prevPrice: 0 },
    'SOL-USDT': { symbol: 'SOL', price: 0, change24h: 0, prevPrice: 0 },
  });
  const [flashing, setFlashing] = useState<Record<string, boolean>>({});
  const wsRef = useRef<WebSocket | null>(null);
  const fallbackRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Flash effect when price changes
  const flashPrice = (instId: string) => {
    setFlashing(prev => ({ ...prev, [instId]: true }));
    setTimeout(() => setFlashing(prev => ({ ...prev, [instId]: false })), 300);
  };

  // WebSocket connection
  useEffect(() => {
    let ws: WebSocket;
    let reconnectTimeout: ReturnType<typeof setTimeout>;

    const connect = () => {
      try {
        ws = new WebSocket('wss://ws.okx.com:8443/ws/v5/public');
        wsRef.current = ws;

        ws.onopen = () => {
          ws.send(JSON.stringify({
            op: 'subscribe',
            args: [
              { channel: 'tickers', instId: 'BTC-USDT' },
              { channel: 'tickers', instId: 'ETH-USDT' },
              { channel: 'tickers', instId: 'SOL-USDT' },
            ],
          }));
        };

        ws.onmessage = (event) => {
          try {
            const msg = JSON.parse(event.data);
            if (msg.data?.[0]) {
              const d = msg.data[0];
              const instId = d.instId as string;
              if (prices[instId] !== undefined) {
                const newPrice = parseFloat(d.last);
                const change = parseFloat(d.sodUtc8 || d.open24h)
                  ? ((newPrice - parseFloat(d.sodUtc8 || d.open24h)) / parseFloat(d.sodUtc8 || d.open24h)) * 100
                  : 0;
                setPrices(prev => {
                  const old = prev[instId];
                  if (old && Math.abs(old.price - newPrice) > 0.01) flashPrice(instId);
                  return {
                    ...prev,
                    [instId]: {
                      symbol: instId.split('-')[0],
                      price: newPrice,
                      change24h: change,
                      prevPrice: old?.price || newPrice,
                    },
                  };
                });
              }
            }
          } catch {}
        };

        ws.onclose = () => {
          reconnectTimeout = setTimeout(connect, 5000);
        };
        ws.onerror = () => ws.close();
      } catch {
        // Fallback to CoinGecko
        startFallback();
      }
    };

    const startFallback = () => {
      const fetchPrices = async () => {
        try {
          const ids = Object.values(COINGECKO_IDS).join(',');
          const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`);
          const data = await res.json();
          setPrices(prev => ({
            ...prev,
            'BTC-USDT': { symbol: 'BTC', price: data.bitcoin?.usd || 0, change24h: data.bitcoin?.usd_24h_change || 0, prevPrice: prev['BTC-USDT'].price },
            'ETH-USDT': { symbol: 'ETH', price: data.ethereum?.usd || 0, change24h: data.ethereum?.usd_24h_change || 0, prevPrice: prev['ETH-USDT'].price },
            'SOL-USDT': { symbol: 'SOL', price: data.solana?.usd || 0, change24h: data.solana?.usd_24h_change || 0, prevPrice: prev['SOL-USDT'].price },
          }));
        } catch {}
      };
      fetchPrices();
      fallbackRef.current = setInterval(fetchPrices, 30000);
    };

    connect();

    return () => {
      wsRef.current?.close();
      clearTimeout(reconnectTimeout);
      if (fallbackRef.current) clearInterval(fallbackRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatPrice = (p: number) => {
    if (p >= 1000) return p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (p >= 1) return p.toFixed(2);
    return p.toFixed(4);
  };

  return (
    <div className="w-full overflow-hidden"
      style={{ background: '#080810', borderBottom: '1px solid #1a1a2e', borderTop: '1px solid #1a1a2e', height: '36px' }}>
      <div className="flex items-center justify-center gap-4 h-full px-4 text-xs"
        style={{ fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap' }}>
        {Object.entries(prices).map(([instId, data]) => {
          if (!data.price) return null;
          const isUp = data.change24h >= 0;
          const color = isUp ? '#00ff88' : '#ff4444';
          const arrow = isUp ? '▲' : '▼';
          const flash = flashing[instId];
          return (
            <span key={instId} className="transition-all" style={{
              color,
              background: flash ? (isUp ? 'rgba(0,255,136,0.15)' : 'rgba(255,68,68,0.15)') : 'transparent',
              padding: '2px 6px',
              borderRadius: '4px',
            }}>
              <span style={{ color: '#888' }}>{data.symbol}</span>{' '}
              <span className="font-bold">${formatPrice(data.price)}</span>{' '}
              <span>{arrow}{Math.abs(data.change24h).toFixed(1)}%</span>
            </span>
          );
        })}
        <span style={{ color: '#1a1a2e' }}>|</span>
        <span style={{ color: '#00ffff' }}>🐝 v7.7.0</span>
        <span style={{ color: '#1a1a2e' }}>|</span>
        <a href="https://www.solcex.cc/en_US/" target="_blank" rel="noopener noreferrer"
          style={{ color: '#ff00ff', textDecoration: 'none' }}>
          Trade on SolCex →
        </a>
      </div>
    </div>
  );
}
