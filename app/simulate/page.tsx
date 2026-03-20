'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

// ─── Types ───────────────────────────────────────────
interface AgentNode { id: string; label: string; group: string; x: number; y: number; }
interface SimEvent { text: string; color: string; ts: string; }
interface Phase { name: string; desc: string; agents: string[]; events: (token: string) => string[]; duration: number; }
interface TokenSim { ticker: string; score: number; verdict: string; confidence: number; }

// ─── Constants ───────────────────────────────────────
const COLORS: Record<string, string> = {
  core: '#00f0ff', verify: '#f0c020', analysis: '#a855f7',
  hedge: '#22c55e', debate: '#f43f5e', ops: '#ff6b2b',
};

const AGENTS: AgentNode[] = [
  // Core
  { id: 'ORCH', label: 'ORCHESTRATOR', group: 'core', x: 400, y: 30 },
  { id: 'SCAN', label: 'SCANNER', group: 'core', x: 150, y: 30 },
  { id: 'SCORE', label: 'SCORER', group: 'core', x: 400, y: 180 },
  { id: 'CONS', label: 'CONSENSUS', group: 'core', x: 400, y: 380 },
  // Verify
  { id: 'SAFE', label: 'SAFETY', group: 'verify', x: 200, y: 110 },
  { id: 'WALL', label: 'WALLET', group: 'verify', x: 400, y: 110 },
  { id: 'SOCI', label: 'SOCIAL', group: 'verify', x: 600, y: 110 },
  // Analysis
  { id: 'TECH', label: 'TECHNICAL', group: 'analysis', x: 600, y: 180 },
  // Ops
  { id: 'SENT', label: 'SENTINEL', group: 'ops', x: 200, y: 180 },
  // Hedge Brain
  { id: 'DEGN', label: 'DEGEN', group: 'hedge', x: 150, y: 260 },
  { id: 'WHAL', label: 'WHALE', group: 'hedge', x: 320, y: 260 },
  { id: 'INST', label: 'INSTITUTIONAL', group: 'hedge', x: 490, y: 260 },
  { id: 'COMM', label: 'COMMUNITY', group: 'hedge', x: 660, y: 260 },
  // Debate
  { id: 'BULa', label: 'BULL α', group: 'debate', x: 130, y: 340 },
  { id: 'BULb', label: 'BULL β', group: 'debate', x: 260, y: 340 },
  { id: 'BULg', label: 'BULL γ', group: 'debate', x: 130, y: 400 },
  { id: 'BEAa', label: 'BEAR α', group: 'debate', x: 540, y: 340 },
  { id: 'BEAb', label: 'BEAR β', group: 'debate', x: 670, y: 340 },
  { id: 'BEAg', label: 'BEAR γ', group: 'debate', x: 670, y: 400 },
  { id: 'DBAN', label: 'DEBATE ANALYST', group: 'debate', x: 400, y: 440 },
];

const CONNECTIONS = [
  ['ORCH','SCAN'],['ORCH','SAFE'],['ORCH','WALL'],['ORCH','SOCI'],['ORCH','SCORE'],
  ['SAFE','SCORE'],['WALL','SCORE'],['SOCI','SCORE'],['TECH','SCORE'],
  ['SCORE','DEGN'],['SCORE','WHAL'],['SCORE','INST'],['SCORE','COMM'],
  ['DEGN','BULa'],['WHAL','BULb'],['INST','BEAa'],['COMM','BULg'],
  ['BULa','DBAN'],['BULb','DBAN'],['BULg','DBAN'],
  ['BEAa','DBAN'],['BEAb','DBAN'],['BEAg','DBAN'],
  ['DBAN','CONS'],['CONS','ORCH'],
];

const TOKENS: TokenSim[] = [
  { ticker: 'PIPPIN', score: 92, verdict: 'PROCEED', confidence: 1.0 },
  { ticker: 'CHIBI', score: 94, verdict: 'PROCEED', confidence: 0.891 },
  { ticker: 'PEACE', score: 88, verdict: 'PROCEED', confidence: 0.891 },
  { ticker: 'TRUMP', score: 86, verdict: 'CAUTION', confidence: 0.455 },
  { ticker: 'VELO', score: 82, verdict: 'PROCEED', confidence: 0.782 },
];

function getPhases(t: string): Phase[] {
  return [
    { name: 'DISCOVERY', desc: 'Scanning chains for token candidates...', agents: ['ORCH','SCAN'], duration: 3000,
      events: () => [`[SCAN] New token detected: ${t} on Solana`, `[DEXSCREENER] Fetching pair data...`, `[SCAN] Market cap $12.4M | Volume $890K`] },
    { name: 'VERIFICATION', desc: 'Triple verification layer active...', agents: ['SAFE','WALL','SOCI','TECH'], duration: 4000,
      events: () => [`[SAFETY] Contract verified — no honeypot`, `[WALLET] Top 10 hold 18% — healthy`, `[SOCIAL] Twitter 8.2K followers, 3.1% engagement`, `[TECHNICAL] RSI(14): 42.3 | MACD: bullish cross`] },
    { name: 'SCORING', desc: 'Computing 100-point composite score...', agents: ['SCORE','TECH','SENT'], duration: 3000,
      events: () => [`[SCORER] Safety: 23/25 | Wallet: 21/25`, `[SCORER] Social: 12/15 | Technical: 14/20`, `[SCORER] Composite: ${TOKENS.find(x=>x.ticker===t)?.score || 85}/100`] },
    { name: 'HEDGE BRAIN', desc: '4 persona clusters deliberating...', agents: ['DEGN','WHAL','INST','COMM'], duration: 4000,
      events: () => [`[DEGEN] "Ape in. Chart looks pristine." → BULLISH (95)`, `[WHALE] "Accumulation pattern confirmed." → BULLISH (82)`, `[INSTITUTIONAL] "Needs formal audit." → NEUTRAL (55)`, `[COMMUNITY] "Organic growth, active devs." → BULLISH (78)`] },
    { name: 'BULL CASE', desc: 'Constructing bullish arguments...', agents: ['BULa','BULb','BULg'], duration: 3500,
      events: () => [`[BULL α] "Momentum + narrative alignment = high upside."`, `[BULL β] "Whale accumulation signals smart money conviction."`, `[BULL γ] "Community growth trajectory exceeds benchmarks."`] },
    { name: 'BEAR CASE', desc: 'Constructing bearish arguments...', agents: ['BEAa','BEAb','BEAg'], duration: 3500,
      events: () => [`[BEAR α] "Pump.fun origin = elevated rug risk."`, `[BEAR β] "No formal audit — institutional barrier."`, `[BEAR γ] "Social metrics may include bot activity."`] },
    { name: 'ADVERSARIAL DEBATE', desc: 'Bull vs Bear — adversarial debate...', agents: ['BULa','BULb','BULg','BEAa','BEAb','BEAg','DBAN'], duration: 5000,
      events: () => [`[DEBATE] Bull argues: liquidity + holders + momentum`, `[DEBATE] Bear counters: audit gap + concentration risk`, `[DEBATE] Bull rebuts: organic growth outweighs risks`, `[DEBATE] Bull score: 247 vs Bear score: 183`] },
    { name: 'CONSENSUS', desc: 'Forming final verdict...', agents: ['DBAN','CONS'], duration: 3000,
      events: (tk) => { const s = TOKENS.find(x=>x.ticker===tk); return [`[CONSENSUS] Weighted average: +0.${Math.floor((s?.confidence||0.7)*100)}`, `[CONSENSUS] Confidence: ${((s?.confidence||0.7)*100).toFixed(1)}%`, `[CONSENSUS] Refined verdict: ${s?.verdict || 'PROCEED'} (${s?.confidence || 0.7})`]; } },
    { name: 'VERDICT', desc: 'Simulation complete.', agents: ['CONS','ORCH'], duration: 4000,
      events: (tk) => { const s = TOKENS.find(x=>x.ticker===tk); return [`[VERDICT] ✅ ${tk}: ${s?.verdict || 'PROCEED'} — confidence ${((s?.confidence||0.7)*100).toFixed(1)}%`]; } },
  ];
}

// ─── Component ───────────────────────────────────────
export default function SimulatePage() {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(-1);
  const [activeAgents, setActiveAgents] = useState<Set<string>>(new Set());
  const [events, setEvents] = useState<SimEvent[]>([]);
  const [tokenIdx, setTokenIdx] = useState(0);
  const [showVerdict, setShowVerdict] = useState(false);
  const [metrics, setMetrics] = useState({ latency: 0, ops: 0, mem: 42, cpu: 12, queue: 0, errors: 0, tokens: 47 });
  const logRef = useRef<HTMLDivElement>(null);
  const token = TOKENS[tokenIdx % TOKENS.length];
  const phases = getPhases(token.ticker);

  const addEvent = useCallback((text: string, color: string) => {
    const ts = new Date().toLocaleTimeString('en-US', { hour12: false });
    setEvents(prev => [...prev, { text, color, ts }]);
  }, []);

  // Auto-scroll log
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [events]);

  // Metric animation
  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setMetrics(prev => ({
        latency: Math.floor(Math.random() * 15) + 3,
        ops: Math.floor(Math.random() * 200) + 50,
        mem: Math.min(78, prev.mem + Math.random() * 2 - 0.5),
        cpu: Math.min(65, prev.cpu + Math.random() * 8 - 2),
        queue: Math.max(0, Math.floor(Math.random() * 5)),
        errors: prev.errors,
        tokens: 47,
      }));
    }, 500);
    return () => clearInterval(interval);
  }, [running]);

  const runSimulation = async () => {
    if (running) return;
    setRunning(true);
    setShowVerdict(false);
    setEvents([]);
    setPhase(-1);
    setActiveAgents(new Set());
    addEvent(`[SYSTEM] MiroFish Simulation Engine v7.7.0`, '#00f0ff');
    addEvent(`[SYSTEM] Target: ${token.ticker} | Chain: Solana`, '#00f0ff');
    addEvent(`[SYSTEM] Dispatching 20 agents across 9 phases...`, '#00f0ff');
    await sleep(1000);

    for (let i = 0; i < phases.length; i++) {
      const p = phases[i];
      setPhase(i);
      setActiveAgents(new Set(p.agents));
      addEvent(`[PHASE] ═══ ${p.name} ═══`, '#f0c020');
      const phaseEvents = p.events(token.ticker);
      const eventDelay = p.duration / (phaseEvents.length + 1);
      for (const evt of phaseEvents) {
        await sleep(eventDelay);
        const color = evt.startsWith('[BULL') ? '#22c55e' : evt.startsWith('[BEAR') ? '#f43f5e' :
          evt.startsWith('[VERDICT') ? '#00ff88' : evt.startsWith('[DEBATE') ? '#ff00ff' :
          evt.startsWith('[PHASE') ? '#f0c020' : '#e0e0e0';
        addEvent(evt, color);
      }
      await sleep(eventDelay);
    }

    setActiveAgents(new Set());
    setPhase(-1);
    setShowVerdict(true);
    setRunning(false);
    setTokenIdx(prev => prev + 1);
  };

  const verdictColor = token.verdict === 'PROCEED' ? '#00ff88' : token.verdict === 'CAUTION' ? '#ffff00' : '#ff4444';
  const verdictIcon = token.verdict === 'PROCEED' ? '✅' : token.verdict === 'CAUTION' ? '⚠️' : '❌';

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0f', color: '#e0e0e0', fontFamily: "'JetBrains Mono', monospace" }}>
      {/* TOP BAR */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2 gap-2 text-xs" style={{ borderBottom: '1px solid #1a1a2e' }}>
        <div className="flex items-center gap-3">
          <Link href="/" style={{ color: '#00f0ff', textDecoration: 'none' }}>◆ MIROFISH</Link>
          <span className="px-2 py-0.5 rounded text-xs" style={{ background: running ? 'rgba(0,255,136,0.15)' : 'rgba(255,255,0,0.1)', color: running ? '#00ff88' : '#ffff00', border: `1px solid ${running ? '#00ff88' : '#ffff00'}44` }}>
            {running ? '● LIVE' : '○ IDLE'}
          </span>
          <span style={{ color: '#555' }}>v7.7.0 · P33</span>
        </div>
        <div className="flex gap-3" style={{ color: '#555' }}>
          {[
            { l: 'LAT', v: `${metrics.latency}ms`, c: metrics.latency < 10 ? '#00ff88' : '#ffaa00' },
            { l: 'OPS', v: `${metrics.ops}/s`, c: '#00f0ff' },
            { l: 'MEM', v: `${metrics.mem.toFixed(0)}%`, c: metrics.mem > 70 ? '#ff4444' : '#00ff88' },
            { l: 'CPU', v: `${metrics.cpu.toFixed(0)}%`, c: metrics.cpu > 50 ? '#ffaa00' : '#00ff88' },
            { l: 'AGT', v: '20', c: '#a855f7' },
            { l: 'TKN', v: `${metrics.tokens}`, c: '#00f0ff' },
          ].map(m => (
            <span key={m.l}>{m.l} <span style={{ color: m.c }}>{m.v}</span></span>
          ))}
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* LEFT — Event Stream */}
        <div className="md:w-80 flex-shrink-0 flex flex-col" style={{ borderRight: '1px solid #1a1a2e' }}>
          <div className="px-3 py-2 text-xs font-bold" style={{ borderBottom: '1px solid #1a1a2e', color: '#00f0ff' }}>
            EVENT STREAM
          </div>
          <div ref={logRef} className="flex-1 overflow-y-auto px-3 py-2 text-xs" style={{ maxHeight: 'calc(100vh - 180px)' }}>
            {events.map((e, i) => (
              <div key={i} className="py-0.5 leading-relaxed slide-in">
                <span style={{ color: '#555' }}>{e.ts} </span>
                <span style={{ color: e.color }}>{e.text}</span>
              </div>
            ))}
            {running && <span className="cursor-blink" style={{ color: '#00f0ff' }}>▌</span>}
            {events.length === 0 && <div style={{ color: '#333' }}>Awaiting simulation start...</div>}
          </div>
        </div>

        {/* RIGHT — Agent Graph */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
          {/* Phase banner */}
          {phase >= 0 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-lg text-center" style={{ background: 'rgba(18,18,26,0.9)', border: '1px solid #1a1a2e' }}>
              <div className="text-sm font-bold" style={{ color: '#f0c020' }}>{phases[phase]?.name}</div>
              <div className="text-xs" style={{ color: '#888' }}>{phases[phase]?.desc}</div>
            </div>
          )}

          {/* Verdict overlay */}
          {showVerdict && (
            <div className="absolute inset-0 flex items-center justify-center z-20" style={{ background: 'rgba(10,10,15,0.85)' }}>
              <div className="text-center p-8 rounded-xl" style={{ border: `2px solid ${verdictColor}`, background: '#12121a', boxShadow: `0 0 40px ${verdictColor}33` }}>
                <div className="text-5xl mb-3">{verdictIcon}</div>
                <div className="text-3xl font-bold mb-2" style={{ color: '#00f0ff' }}>${token.ticker}</div>
                <div className="text-xl font-bold mb-1" style={{ color: verdictColor }}>{token.verdict}</div>
                <div className="text-sm" style={{ color: '#888' }}>Score: {token.score}/100 · Confidence: {(token.confidence * 100).toFixed(1)}%</div>
                <div className="text-xs mt-3" style={{ color: '#555' }}>20 agents · 9 phases · adversarial debate</div>
              </div>
            </div>
          )}

          {/* SVG Graph */}
          <svg viewBox="0 0 800 480" className="w-full max-w-3xl" style={{ maxHeight: 'calc(100vh - 250px)' }}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {/* Connections */}
            {CONNECTIONS.map(([from, to], i) => {
              const a = AGENTS.find(n => n.id === from)!;
              const b = AGENTS.find(n => n.id === to)!;
              const active = activeAgents.has(from) && activeAgents.has(to);
              return (
                <line key={i} x1={a.x} y1={a.y + 10} x2={b.x} y2={b.y + 10}
                  stroke={active ? COLORS[a.group] || '#00f0ff' : '#1a1a2e'}
                  strokeWidth={active ? 1.5 : 0.5}
                  opacity={active ? 0.8 : 0.3}
                  filter={active ? 'url(#glow)' : undefined}
                  className={active ? 'conn-pulse' : ''} />
              );
            })}
            {/* Agent nodes */}
            {AGENTS.map(agent => {
              const active = activeAgents.has(agent.id);
              const color = COLORS[agent.group] || '#888';
              return (
                <g key={agent.id} className={active ? 'node-pulse' : ''}>
                  <rect x={agent.x - 45} y={agent.y - 8} width={90} height={22} rx={4}
                    fill={active ? `${color}22` : '#12121a'}
                    stroke={active ? color : '#1a1a2e'}
                    strokeWidth={active ? 1.5 : 0.5}
                    filter={active ? 'url(#glow)' : undefined} />
                  <circle cx={agent.x - 35} cy={agent.y + 3} r={active ? 3.5 : 2}
                    fill={active ? color : '#333'} />
                  <text x={agent.x - 25} y={agent.y + 6} fill={active ? color : '#555'}
                    fontSize="7" fontFamily="'JetBrains Mono', monospace">
                    {agent.label.length > 12 ? agent.label.slice(0, 11) + '…' : agent.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: '1px solid #1a1a2e' }}>
        <div className="text-xs" style={{ color: '#555' }}>
          🐝 Buzz BD Agent · SolCex Exchange · MiroFish v7.7.0 ·{' '}
          <span style={{ color: '#00f0ff' }}>20 AGENTS</span> ·{' '}
          <span style={{ color: '#f0c020' }}>TRIPLE VERIFIED</span> ·{' '}
          <span style={{ color: '#f43f5e' }}>ADVERSARIAL DEBATE</span>
        </div>
        <button onClick={runSimulation} disabled={running}
          className="px-6 py-2 rounded-lg text-sm font-bold transition-all"
          style={{
            background: running ? '#1a1a2e' : 'linear-gradient(135deg, #00f0ff, #00c8ff)',
            color: running ? '#555' : '#0a0a0f',
            cursor: running ? 'not-allowed' : 'pointer',
            boxShadow: running ? 'none' : '0 0 20px rgba(0,240,255,0.3)',
          }}>
          {running ? '◼ RUNNING...' : showVerdict ? '▶ SIMULATE NEXT TOKEN' : '▶ START SIMULATION'}
        </button>
      </div>

      <style>{`
        @keyframes slideIn { from { transform: translateX(-10px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .slide-in { animation: slideIn 0.3s ease-out; }
        @keyframes blink { 50% { opacity: 0; } }
        .cursor-blink { animation: blink 1s step-end infinite; }
        @keyframes nodePulse { 0%,100% { opacity: 0.8; } 50% { opacity: 1; } }
        .node-pulse { animation: nodePulse 1.5s ease-in-out infinite; }
        @keyframes connPulse { 0%,100% { opacity: 0.4; } 50% { opacity: 0.9; } }
        .conn-pulse { animation: connPulse 1s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }
