'use client';

import { useState, useEffect, useRef } from 'react';

interface Activity {
  type: string;
  ticker: string;
  detail: string;
  timestamp: string;
  id?: string;
}

const AGENT_COLORS: Record<string, string> = {
  scanner: '#00ffff', safety: '#00ff88', scorer: '#ffaa00', sim: '#bb66ff',
  debate: '#ff00ff', twitter: '#1da1f2', cron: '#888888', llm: '#ff8800',
  pipeline: '#00ffff', simulation: '#bb66ff',
};

const MOCK: Activity[] = [
  { type: 'scanner', ticker: 'NEWTOKEN', detail: 'Discovered: NEWTOKEN (sol)', timestamp: new Date(Date.now() - 2000).toISOString(), id: 'm1' },
  { type: 'safety', ticker: 'CHIBI', detail: 'Verified: CHIBI ✅', timestamp: new Date(Date.now() - 8000).toISOString(), id: 'm2' },
  { type: 'scorer', ticker: 'CHIBI', detail: 'Scored: CHIBI → 94', timestamp: new Date(Date.now() - 15000).toISOString(), id: 'm3' },
  { type: 'sim', ticker: 'AIFRUITS', detail: 'Simulating: AIFRUITS (17/20)', timestamp: new Date(Date.now() - 25000).toISOString(), id: 'm4' },
  { type: 'debate', ticker: 'AIFRUITS', detail: 'Bull wins: AIFRUITS 🐂', timestamp: new Date(Date.now() - 35000).toISOString(), id: 'm5' },
  { type: 'twitter', ticker: '', detail: 'Posted: Alpha Alert', timestamp: new Date(Date.now() - 50000).toISOString(), id: 'm6' },
  { type: 'cron', ticker: '', detail: 'Morning Brief sent', timestamp: new Date(Date.now() - 70000).toISOString(), id: 'm7' },
  { type: 'llm', ticker: '', detail: 'M2.7 response: 6.2s', timestamp: new Date(Date.now() - 90000).toISOString(), id: 'm8' },
  { type: 'scanner', ticker: 'FLAG', detail: 'Discovered: FLAG (sol)', timestamp: new Date(Date.now() - 110000).toISOString(), id: 'm9' },
  { type: 'scorer', ticker: 'Aliens', detail: 'Scored: Aliens → 100', timestamp: new Date(Date.now() - 130000).toISOString(), id: 'm10' },
];

const FILTERS = ['all', 'scanner', 'sim', 'twitter', 'cron'];

export default function BuzzLiveActivity() {
  const [activities, setActivities] = useState<Activity[]>(MOCK);
  const [filter, setFilter] = useState('all');
  const [isLive, setIsLive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [secondsAgo, setSecondsAgo] = useState(0);
  const [eventCount, setEventCount] = useState(47);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevIdsRef = useRef<Set<string>>(new Set());

  // Poll API every 2 seconds
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch('https://204.168.137.253:3000/api/v1/activity/recent');
        if (res.ok) {
          const data = await res.json();
          const items = data.activities || [];
          if (items.length > 0) {
            // Detect new entries
            const currentIds = new Set<string>(items.map((a: Activity) => a.id || a.timestamp));
            const fresh = new Set<string>();
            currentIds.forEach((id) => {
              if (!prevIdsRef.current.has(id)) fresh.add(id);
            });
            prevIdsRef.current = currentIds;
            if (fresh.size > 0) setNewIds(fresh);
            setActivities(items);
            setIsLive(true);
            setLastUpdate(Date.now());
            setEventCount(prev => prev + fresh.size);
            return;
          }
        }
      } catch {}
      setIsLive(false);
    };
    fetchActivity();
    const interval = setInterval(fetchActivity, 2000);
    return () => clearInterval(interval);
  }, []);

  // Update "seconds ago" counter every second
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsAgo(Math.floor((Date.now() - lastUpdate) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [lastUpdate]);

  // Clear new-entry highlights after animation
  useEffect(() => {
    if (newIds.size > 0) {
      const timer = setTimeout(() => setNewIds(new Set()), 1500);
      return () => clearTimeout(timer);
    }
  }, [newIds]);

  // Auto-scroll
  useEffect(() => {
    if (!hovered && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [activities, hovered]);

  const filtered = filter === 'all' ? activities : activities.filter(a => a.type === filter || a.type?.includes(filter));

  const formatTime = (ts: string) => {
    try { return new Date(ts).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }); }
    catch { return '??:??:??'; }
  };

  return (
    <section className="px-6 py-6 max-w-4xl mx-auto">
      <div className="rounded-lg overflow-hidden" style={{ background: '#12121a', border: '1px solid #1a1a2e' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: '1px solid #1a1a2e' }}>
          <div className="flex items-center gap-2">
            <span className="live-dot" style={{ background: isLive ? '#00ff88' : '#ffaa00' }} />
            <span className="text-sm font-bold" style={{ color: '#00ffff' }}>🐝 BUZZ LIVE</span>
            <span className="text-xs" style={{ color: '#555' }}>
              {isLive ? `${secondsAgo}s ago` : 'demo'} · {eventCount} events/hr
            </span>
          </div>
          <div className="flex gap-1">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} className="px-2 py-0.5 rounded text-xs"
                style={{
                  background: filter === f ? 'rgba(0,255,255,0.12)' : 'transparent',
                  color: filter === f ? '#00ffff' : '#555',
                  border: `1px solid ${filter === f ? 'rgba(0,255,255,0.3)' : 'transparent'}`,
                }}>{f}</button>
            ))}
          </div>
        </div>

        {/* Log */}
        <div ref={scrollRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="overflow-y-auto px-4 py-2"
          style={{ maxHeight: '220px', fontFamily: "'JetBrains Mono', monospace" }}>
          {filtered.map((a, i) => {
            const color = AGENT_COLORS[a.type] || '#888';
            const isNew = newIds.has(a.id || a.timestamp);
            const isLatest = i === 0;
            return (
              <div key={a.id || a.timestamp + i}
                className={`flex gap-2 py-0.5 text-xs leading-relaxed ${isNew ? 'slide-in' : ''}`}
                style={{ background: isNew ? 'rgba(0,255,255,0.05)' : 'transparent' }}>
                <span style={{ color: '#555' }}>{formatTime(a.timestamp)}</span>
                <span style={{ color, minWidth: '80px' }}>[{a.type}]</span>
                <span style={{ color: '#e0e0e0' }}>
                  {a.detail}
                  {isLatest && <span className="cursor-blink">▌</span>}
                </span>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-xs py-4 text-center" style={{ color: '#555' }}>No activity</div>
          )}
        </div>
      </div>

      <style>{`
        .live-dot {
          display: inline-block;
          width: 8px; height: 8px;
          border-radius: 50%;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 4px currentColor; }
          50% { opacity: 0.4; box-shadow: none; }
        }
        .slide-in {
          animation: slideIn 0.5s ease-out;
        }
        @keyframes slideIn {
          from { transform: translateX(20px); opacity: 0; background: rgba(0,255,255,0.1); }
          to { transform: translateX(0); opacity: 1; background: transparent; }
        }
        .cursor-blink {
          animation: blink 1s step-end infinite;
          color: #00ffff;
          margin-left: 2px;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
