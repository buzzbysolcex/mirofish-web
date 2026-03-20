'use client';

import { useState, useEffect, useRef } from 'react';

interface Activity {
  type: string;
  ticker: string;
  detail: string;
  timestamp: string;
}

const AGENT_COLORS: Record<string, string> = {
  scanner: '#00ffff',
  safety: '#00ff88',
  scorer: '#ffaa00',
  sim: '#bb66ff',
  debate: '#ff00ff',
  twitter: '#1da1f2',
  cron: '#888888',
  llm: '#ff8800',
  pipeline: '#00ffff',
  simulation: '#bb66ff',
};

const MOCK_ACTIVITIES: Activity[] = [
  { type: 'scanner', ticker: 'NEWTOKEN', detail: 'Discovered: NEWTOKEN (sol)', timestamp: new Date(Date.now() - 5000).toISOString() },
  { type: 'safety', ticker: 'CHIBI', detail: 'Verified: CHIBI ✅', timestamp: new Date(Date.now() - 15000).toISOString() },
  { type: 'scorer', ticker: 'CHIBI', detail: 'Scored: CHIBI → 94', timestamp: new Date(Date.now() - 30000).toISOString() },
  { type: 'sim', ticker: 'AIFRUITS', detail: 'Simulating: AIFRUITS (17/20)', timestamp: new Date(Date.now() - 45000).toISOString() },
  { type: 'debate', ticker: 'AIFRUITS', detail: 'Bull wins: AIFRUITS 🐂', timestamp: new Date(Date.now() - 60000).toISOString() },
  { type: 'twitter', ticker: '', detail: 'Posted: Alpha Alert', timestamp: new Date(Date.now() - 90000).toISOString() },
  { type: 'cron', ticker: '', detail: 'Morning Brief sent', timestamp: new Date(Date.now() - 120000).toISOString() },
  { type: 'llm', ticker: '', detail: 'M2.7 response: 6.2s', timestamp: new Date(Date.now() - 150000).toISOString() },
];

const FILTERS = ['all', 'scanner', 'sim', 'twitter', 'cron'];

export default function BuzzLiveActivity() {
  const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES);
  const [filter, setFilter] = useState('all');
  const [isLive, setIsLive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch('https://204.168.137.253:3000/api/v1/activity/recent');
        if (res.ok) {
          const data = await res.json();
          if (data.activities?.length > 0) {
            setActivities(data.activities);
            setIsLive(true);
            return;
          }
        }
      } catch {}
      setIsLive(false);
    };
    fetchActivity();
    const interval = setInterval(fetchActivity, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!hovered && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [activities, hovered]);

  const filtered = filter === 'all'
    ? activities
    : activities.filter(a => a.type === filter || a.type?.includes(filter));

  const formatTime = (ts: string) => {
    try {
      const d = new Date(ts);
      return d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch { return '??:??:??'; }
  };

  return (
    <section className="px-6 py-10 max-w-4xl mx-auto">
      <div className="rounded-lg overflow-hidden" style={{ background: '#12121a', border: '1px solid #1a1a2e' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #1a1a2e' }}>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: isLive ? '#00ff88' : '#ffaa00' }} />
            <span className="text-sm font-bold" style={{ color: '#00ffff' }}>🐝 BUZZ LIVE</span>
            {!isLive && <span className="text-xs" style={{ color: '#555' }}>demo</span>}
          </div>
          <div className="flex gap-1">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-2 py-0.5 rounded text-xs"
                style={{
                  background: filter === f ? 'rgba(0,255,255,0.12)' : 'transparent',
                  color: filter === f ? '#00ffff' : '#555',
                  border: `1px solid ${filter === f ? 'rgba(0,255,255,0.3)' : 'transparent'}`,
                }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Log */}
        <div ref={scrollRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="overflow-y-auto px-4 py-2"
          style={{ maxHeight: '200px', fontFamily: "'JetBrains Mono', monospace" }}>
          {filtered.map((a, i) => {
            const color = AGENT_COLORS[a.type] || '#888';
            return (
              <div key={i} className="flex gap-2 py-0.5 text-xs leading-relaxed">
                <span style={{ color: '#555' }}>{formatTime(a.timestamp)}</span>
                <span style={{ color, minWidth: '80px' }}>[{a.type}]</span>
                <span style={{ color: '#e0e0e0' }}>{a.detail}</span>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-xs py-4 text-center" style={{ color: '#555' }}>No activity for this filter</div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
