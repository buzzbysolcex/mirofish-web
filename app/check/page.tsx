'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function CheckPage() {
  const [address, setAddress] = useState('');
  const [chain, setChain] = useState('solana');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) router.push(`/check/${encodeURIComponent(address.trim())}?chain=${chain}`);
  };

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f', color: '#e0e0e0', fontFamily: "'JetBrains Mono', monospace" }}>
      <Navbar />
      <main className="pt-24 px-4 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-3" style={{ color: '#00ffff' }}>CHECK YOUR LISTING READINESS</h1>
        <p className="text-sm mb-8" style={{ color: '#888' }}>Paste your contract address. See what exchanges see.</p>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            value={address} onChange={e => setAddress(e.target.value)}
            placeholder="Paste contract address..."
            className="flex-1 px-4 py-3 rounded-lg text-sm outline-none"
            style={{ background: '#12121a', border: '1px solid #1a1a2e', color: '#e0e0e0' }}
          />
          <button type="submit" className="px-6 py-3 rounded-lg text-sm font-bold"
            style={{ background: '#00ffff', color: '#0a0a0f' }}>CHECK &rarr;</button>
        </form>

        <div className="flex justify-center gap-2 mb-16">
          {['solana', 'ethereum', 'base', 'bsc'].map(c => (
            <button key={c} onClick={() => setChain(c)}
              className="px-4 py-1.5 rounded-full text-xs font-bold uppercase"
              style={{
                background: chain === c ? 'rgba(0,255,255,0.15)' : 'transparent',
                border: `1px solid ${chain === c ? '#00ffff' : '#1a1a2e'}`,
                color: chain === c ? '#00ffff' : '#888',
              }}>{c}</button>
          ))}
        </div>

        {/* Demo tokens to try */}
        <div style={{ color: '#555' }}>
          <p className="text-xs mb-3">Try these demo tokens:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { name: 'CHIBI', addr: '2TpMjYXnrgxoeVCq2i6EAR8vNWqe5MNvHCz3bENNpump' },
              { name: 'TRUMP', addr: '6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN' },
              { name: 'EURC', addr: 'HzwqbKZw8HxMN6bF2yFZNrht3c2iXXzpKcFu7uBEDKtr' },
            ].map(t => (
              <button key={t.name} onClick={() => { setAddress(t.addr); setChain('solana'); }}
                className="text-xs px-3 py-1 rounded" style={{ border: '1px solid #1a1a2e', color: '#00ffff' }}>
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
