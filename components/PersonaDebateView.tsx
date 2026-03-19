'use client';

import { useState } from 'react';
import type { SimulationResult, ClusterData } from '@/data/simulations';

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

function generateReasoning(key: string, cluster: ClusterData): string {
  const total = cluster.bullish + cluster.neutral + cluster.bearish;
  const label = personaMeta[key]?.label ?? key;

  if (cluster.sentiment.toUpperCase() === 'BULLISH') {
    return `Strong buy signal detected. ${cluster.bullish}/${total} agents recommend listing. The ${label} cluster sees clear upside potential and favorable risk/reward.`;
  }
  if (cluster.sentiment.toUpperCase() === 'BEARISH') {
    return `Risk factors identified. ${cluster.bearish}/${total} agents advise against listing. The ${label} cluster flags concerns that warrant caution.`;
  }
  if (cluster.sentiment.toUpperCase() === 'QUARANTINED') {
    return `QUARANTINED. Data integrity could not be verified. Awaiting triple verification before any assessment can be made.`;
  }
  return `Split consensus. Further monitoring recommended. The ${label} cluster shows ${cluster.bullish} bullish, ${cluster.neutral} neutral, and ${cluster.bearish} bearish out of ${total} agents.`;
}

function hasDisagreement(sentA: string, sentB: string): boolean {
  const a = sentA.toUpperCase();
  const b = sentB.toUpperCase();
  return (a === 'BULLISH' && b === 'BEARISH') || (a === 'BEARISH' && b === 'BULLISH');
}

export default function PersonaDebateView({ simulation }: { simulation: SimulationResult }) {
  const clusterKeys = Object.keys(simulation.clusters) as Array<keyof typeof simulation.clusters>;
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="mb-6">
      <h2 className="text-sm text-[#00ffff] tracking-[0.2em] uppercase mb-4">
        Persona Debate View
      </h2>

      <div className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-6">
        <div className="space-y-0">
          {clusterKeys.map((key, index) => {
            const cluster = simulation.clusters[key];
            const meta = personaMeta[key];
            const sentimentColor = getSentimentColor(cluster.sentiment);
            const reasoning = generateReasoning(key, cluster);
            const isExpanded = expanded[key] ?? true;

            // Check for disagreement with previous persona
            const prevKey = index > 0 ? clusterKeys[index - 1] : null;
            const prevCluster = prevKey ? simulation.clusters[prevKey] : null;
            const showDisagreement = prevCluster
              ? hasDisagreement(prevCluster.sentiment, cluster.sentiment)
              : false;

            return (
              <div key={key}>
                {/* Disagreement connector */}
                {showDisagreement && (
                  <div className="flex items-center justify-center py-2">
                    <div
                      className="flex-1 h-0"
                      style={{ borderTop: '2px dashed #ff4444' }}
                    />
                    <span
                      className="px-3 py-1 text-xs font-mono font-bold tracking-wider rounded"
                      style={{
                        color: '#ff4444',
                        backgroundColor: '#ff444415',
                        border: '1px solid #ff4444',
                      }}
                    >
                      DISAGREEMENT
                    </span>
                    <div
                      className="flex-1 h-0"
                      style={{ borderTop: '2px dashed #ff4444' }}
                    />
                  </div>
                )}

                {/* Timeline connector (non-disagreement) */}
                {!showDisagreement && index > 0 && (
                  <div className="flex justify-start ml-6 py-0">
                    <div
                      className="w-0 h-6"
                      style={{ borderLeft: '2px solid #1a1a2e' }}
                    />
                  </div>
                )}

                {/* Chat bubble */}
                <div
                  className="rounded-lg p-4 cursor-pointer transition-colors hover:bg-[#0a0a0f]/50"
                  style={{
                    borderLeft: `3px solid ${sentimentColor}`,
                    backgroundColor: '#0a0a0f',
                  }}
                  onClick={() => toggle(key)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{meta.emoji}</span>
                      <span className="text-sm font-mono font-bold text-gray-300 uppercase tracking-wider">
                        {meta.label}
                      </span>
                      <span
                        className="px-2 py-0.5 text-xs font-mono font-bold rounded uppercase"
                        style={{
                          color: sentimentColor,
                          backgroundColor: `${sentimentColor}15`,
                          border: `1px solid ${sentimentColor}40`,
                        }}
                      >
                        {cluster.sentiment}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">
                      {isExpanded ? '[-]' : '[+]'}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-400 font-mono leading-relaxed">
                        {reasoning}
                      </p>
                      <div className="flex gap-4 mt-3 text-xs font-mono">
                        <span className="text-[#00ff88]">
                          Bullish: {cluster.bullish}
                        </span>
                        <span className="text-[#ffff00]">
                          Neutral: {cluster.neutral}
                        </span>
                        <span className="text-[#ff4444]">
                          Bearish: {cluster.bearish}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
