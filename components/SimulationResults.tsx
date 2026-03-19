'use client';

import type { SimulationResult } from '@/data/simulations';

const personaMeta: Record<string, { emoji: string; label: string }> = {
  degen: { emoji: '🎰', label: 'Degen' },
  whale: { emoji: '🐋', label: 'Whale' },
  institutional: { emoji: '🏦', label: 'Institutional' },
  community: { emoji: '👥', label: 'Community' },
};

function getSentimentColor(sentiment: string): string {
  switch (sentiment.toUpperCase()) {
    case 'BULLISH': return '#00ff88';
    case 'BEARISH': return '#ff4444';
    default: return '#ffff00';
  }
}

function getConsensus(simulation: SimulationResult): { label: string; color: string } {
  const clusters = Object.values(simulation.clusters);
  const bullishCount = clusters.filter(c => c.sentiment.toUpperCase() === 'BULLISH').length;
  const bearishCount = clusters.filter(c => c.sentiment.toUpperCase() === 'BEARISH').length;

  if (bullishCount >= 3) return { label: 'BULLISH', color: '#00ff88' };
  if (bearishCount >= 3) return { label: 'BEARISH', color: '#ff4444' };
  if (bullishCount >= 2) return { label: 'BULLISH', color: '#00ff88' };
  if (bearishCount >= 2) return { label: 'BEARISH', color: '#ff4444' };
  return { label: 'NEUTRAL', color: '#ffff00' };
}

function getDecisionColor(decision: string): string {
  switch (decision.toUpperCase()) {
    case 'LIST': return '#00ff88';
    case 'REJECT': return '#ff4444';
    default: return '#ffff00';
  }
}

function getScoreColor(score: number): string {
  if (score >= 85) return '#ff00ff';
  if (score >= 70) return '#00ffff';
  return '#ffff00';
}

export default function SimulationResults({ simulation }: { simulation: SimulationResult }) {
  const consensus = getConsensus(simulation);
  const clusterKeys = Object.keys(simulation.clusters) as Array<keyof typeof simulation.clusters>;

  return (
    <section className="mb-6">
      <h2 className="text-sm text-[#00ffff] tracking-[0.2em] uppercase mb-4">
        Simulation Results Breakdown
      </h2>

      <div className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-6">
        {/* Header: Token + Chain + Consensus */}
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-[#ff00ff] font-mono">${simulation.ticker}</span>
            <span className="px-2 py-0.5 text-xs bg-[#00ffff]/10 border border-[#00ffff]/30 text-[#00ffff] rounded-full uppercase tracking-wider font-mono">
              {simulation.chain}
            </span>
          </div>
          <span
            className="px-3 py-1 text-sm font-bold rounded-lg border font-mono uppercase tracking-wider"
            style={{
              color: consensus.color,
              borderColor: consensus.color,
              backgroundColor: `${consensus.color}15`,
            }}
          >
            {consensus.label}
          </span>
        </div>

        {/* Score Gauge */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="text-center">
            <div
              className="text-7xl font-extrabold font-mono"
              style={{ color: getScoreColor(simulation.score) }}
            >
              {simulation.score}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-mono">
              Pipeline Score
            </div>
          </div>
          <div className="text-center ml-6">
            <div className="text-3xl font-bold text-[#00ffff] font-mono">
              {(simulation.confidence * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-mono">
              Confidence
            </div>
          </div>
        </div>

        {/* Persona Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {clusterKeys.map((key) => {
            const cluster = simulation.clusters[key];
            const meta = personaMeta[key];
            const total = cluster.bullish + cluster.neutral + cluster.bearish;
            const bullishPct = total > 0 ? (cluster.bullish / total) * 100 : 0;
            const neutralPct = total > 0 ? (cluster.neutral / total) * 100 : 0;
            const bearishPct = total > 0 ? (cluster.bearish / total) * 100 : 0;

            return (
              <div
                key={key}
                className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-lg p-4"
              >
                <div className="text-center mb-3">
                  <div className="text-2xl mb-1">{meta.emoji}</div>
                  <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                    {meta.label}
                  </div>
                </div>
                <div className="text-center mb-3">
                  <span
                    className="text-xs font-mono font-bold uppercase"
                    style={{ color: getSentimentColor(cluster.sentiment) }}
                  >
                    {cluster.sentiment}
                  </span>
                </div>
                <div className="space-y-1 text-xs font-mono mb-3">
                  <div className="flex justify-between">
                    <span className="text-[#00ff88]">Bull</span>
                    <span className="text-[#00ff88]">{cluster.bullish}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#ffff00]">Neut</span>
                    <span className="text-[#ffff00]">{cluster.neutral}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#ff4444]">Bear</span>
                    <span className="text-[#ff4444]">{cluster.bearish}</span>
                  </div>
                </div>
                {/* Stacked bar */}
                <div className="w-full h-2 rounded-full overflow-hidden flex bg-[#1a1a2e]">
                  <div className="h-full bg-[#00ff88]" style={{ width: `${bullishPct}%` }} />
                  <div className="h-full bg-[#ffff00]" style={{ width: `${neutralPct}%` }} />
                  <div className="h-full bg-[#ff4444]" style={{ width: `${bearishPct}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommendation Badge */}
        <div className="text-center">
          <span
            className="inline-block px-6 py-3 text-lg font-bold rounded-lg border-2 font-mono uppercase tracking-widest"
            style={{
              color: getDecisionColor(simulation.decision),
              borderColor: getDecisionColor(simulation.decision),
              backgroundColor: `${getDecisionColor(simulation.decision)}15`,
            }}
          >
            {simulation.decision}
          </span>
        </div>
      </div>
    </section>
  );
}
