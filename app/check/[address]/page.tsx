'use client';

import { use, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ReadinessBar from '@/components/ReadinessBar';
import { simulations, type SimulationResult } from '@/data/simulations';

// Demo contract address -> ticker mapping
const addressToTicker: Record<string, string> = {
  '2TpMjYXnrgxoeVCq2i6EAR8vNWqe5MNvHCz3bENNpump': 'CHIBI',
  '6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN': 'TRUMP',
  'HzwqbKZw8HxMN6bF2yFZNrht3c2iXXzpKcFu7uBEDKtr': 'EURC',
};

function generateReadiness(sim: SimulationResult) {
  const score = sim.score;
  const readiness = Math.min(100, Math.round(score * 0.85 + sim.confidence * 15));
  const tier_eligibility = {
    tier1: readiness >= 90,
    tier2: readiness >= 75,
    tier3: readiness >= 60,
    tier4: readiness >= 40,
  };

  const strengths: string[] = [];
  if (score >= 70) strengths.push('Strong Pipeline Score (' + score + '/100)');
  if (sim.confidence >= 0.7) strengths.push('High Simulation Confidence (' + (sim.confidence * 100).toFixed(0) + '%)');
  if (sim.decision === 'LIST') strengths.push('AI Recommendation: PROCEED');
  const bullishClusters = Object.entries(sim.clusters).filter(([, c]) => c.sentiment === 'BULLISH');
  if (bullishClusters.length >= 3) strengths.push(bullishClusters.length + '/4 Clusters Aligned Bullish');

  const weaknesses: { label: string; rec: string }[] = [];
  if (score < 85) weaknesses.push({ label: 'Score Below HOT Threshold', rec: 'Improve safety and wallet metrics' });
  if (sim.confidence < 0.8) weaknesses.push({ label: 'Confidence Below 80%', rec: 'Address institutional concerns' });
  const bearishClusters = Object.entries(sim.clusters).filter(([, c]) => c.sentiment === 'BEARISH');
  if (bearishClusters.length > 0) weaknesses.push({ label: bearishClusters.map(([n]) => n).join(', ') + ' cluster bearish', rec: 'Address ' + bearishClusters[0][0] + ' concerns' });
  weaknesses.push({ label: 'No Formal Audit Detected', rec: 'Get smart contract audit from CertiK or Hacken' });

  return {
    readiness,
    tier_eligibility,
    strengths,
    weaknesses,
    exchange_scores: {
      trading_volume: Math.min(100, score),
      liquidity_depth: Math.min(100, Math.round(score * 0.9)),
      holder_distribution: Math.min(100, Math.round(score * 0.75)),
      smart_contract: score >= 85 ? 90 : 75,
      community_health: Math.min(100, Math.round(sim.confidence * 80)),
      regulatory_readiness: 40,
    },
  };
}

function getReadinessColor(r: number) {
  if (r >= 80) return '#00ff88';
  if (r >= 60) return '#ffff00';
  return '#ff4444';
}

function getDecisionColor(d: string) {
  if (d === 'LIST') return '#00ff88';
  if (d === 'MONITOR') return '#ffff00';
  return '#ff4444';
}

export default function CheckResultPage({ params }: { params: Promise<{ address: string }> }) {
  const { address } = use(params);
  const decodedAddress = decodeURIComponent(address);

  // Look up by contract address or by ticker directly
  const sim = useMemo(() => {
    const ticker = addressToTicker[decodedAddress];
    if (ticker && simulations[ticker]) return simulations[ticker];
    // Also try direct ticker lookup (for bookmarked URLs)
    if (simulations[decodedAddress]) return simulations[decodedAddress];
    // Try case-insensitive ticker match
    const upper = decodedAddress.toUpperCase();
    const found = Object.values(simulations).find(s => s.ticker === upper);
    return found || null;
  }, [decodedAddress]);

  const data = useMemo(() => sim ? generateReadiness(sim) : null, [sim]);

  const twitterText = sim
    ? `My token ${sim.ticker} scored ${data?.readiness}% listing readiness on @BuzzBySolCex MicroBuzz!\n\nCheck yours:`
    : '';

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f', color: '#e0e0e0', fontFamily: "'JetBrains Mono', monospace" }}>
      <Navbar />
      <main className="pt-24 px-4 max-w-4xl mx-auto pb-16">

        {/* Back link */}
        <Link href="/check" className="text-xs mb-6 inline-block" style={{ color: '#00ffff' }}>
          &larr; Back to Search
        </Link>

        {!sim || !data ? (
          /* ===== NOT FOUND STATE ===== */
          <div className="text-center py-20">
            <div className="text-6xl mb-6" style={{ color: '#1a1a2e' }}>?</div>
            <h1 className="text-2xl font-bold mb-3" style={{ color: '#ff4444' }}>NOT IN PIPELINE</h1>
            <p className="text-sm mb-2" style={{ color: '#888' }}>
              This contract address has not been simulated by MicroBuzz yet.
            </p>
            <p className="text-xs mb-8" style={{ color: '#555' }}>
              Address: {decodedAddress.slice(0, 12)}...{decodedAddress.slice(-8)}
            </p>
            <div className="flex justify-center gap-3">
              <Link href="/request" className="px-6 py-3 rounded-lg text-sm font-bold"
                style={{ background: '#ff00ff', color: '#0a0a0f' }}>
                Request Simulation &rarr;
              </Link>
              <Link href="/check" className="px-6 py-3 rounded-lg text-sm font-bold border"
                style={{ borderColor: '#1a1a2e', color: '#888' }}>
                Try Another
              </Link>
            </div>
          </div>
        ) : (
          /* ===== RESULTS ===== */
          <>
            {/* Header */}
            <div className="rounded-lg p-6 mb-6" style={{ background: '#12121a', border: '1px solid #1a1a2e' }}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Readiness circle */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="relative w-28 h-28 flex items-center justify-center rounded-full"
                    style={{ border: `3px solid ${getReadinessColor(data.readiness)}`, boxShadow: `0 0 20px ${getReadinessColor(data.readiness)}33` }}>
                    <span className="text-3xl font-bold" style={{ color: getReadinessColor(data.readiness) }}>
                      {data.readiness}%
                    </span>
                  </div>
                  <span className="text-xs mt-2" style={{ color: '#888' }}>READINESS</span>
                </div>
                {/* Token info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-1" style={{ color: '#00ffff' }}>{sim.ticker}</h1>
                  <p className="text-sm mb-1" style={{ color: '#888' }}>{sim.name} &middot; {sim.chain}</p>
                  <p className="text-xs" style={{ color: '#555' }}>
                    Contract: {decodedAddress.slice(0, 16)}...{decodedAddress.slice(-8)}
                  </p>
                  <div className="flex gap-3 mt-3 justify-center md:justify-start flex-wrap">
                    <span className="text-xs px-3 py-1 rounded-full font-bold"
                      style={{ background: 'rgba(0,255,255,0.1)', border: '1px solid rgba(0,255,255,0.3)', color: '#00ffff' }}>
                      Score: {sim.score}/100
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full font-bold"
                      style={{ background: `${getDecisionColor(sim.decision)}15`, border: `1px solid ${getDecisionColor(sim.decision)}44`, color: getDecisionColor(sim.decision) }}>
                      {sim.decision}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tier Eligibility */}
            <div className="rounded-lg p-6 mb-6" style={{ background: '#12121a', border: '1px solid #1a1a2e' }}>
              <h2 className="text-sm font-bold mb-4" style={{ color: '#888' }}>TIER ELIGIBILITY</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {([
                  { key: 'tier1' as const, label: 'Tier 1', desc: 'Top exchanges' },
                  { key: 'tier2' as const, label: 'Tier 2', desc: 'Major exchanges' },
                  { key: 'tier3' as const, label: 'Tier 3', desc: 'Mid-tier exchanges' },
                  { key: 'tier4' as const, label: 'Tier 4', desc: 'Emerging exchanges' },
                ]).map(tier => {
                  const eligible = data.tier_eligibility[tier.key];
                  return (
                    <div key={tier.key} className="rounded-lg p-4 text-center"
                      style={{
                        background: eligible ? 'rgba(0,255,136,0.05)' : 'rgba(255,68,68,0.05)',
                        border: `1px solid ${eligible ? 'rgba(0,255,136,0.2)' : 'rgba(255,68,68,0.2)'}`,
                      }}>
                      <div className="text-lg mb-1">{eligible ? '\u2705' : '\u274C'}</div>
                      <div className="text-xs font-bold" style={{ color: eligible ? '#00ff88' : '#ff4444' }}>
                        {tier.label}
                      </div>
                      <div className="text-xs mt-1" style={{ color: '#555' }}>{tier.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Strengths */}
              <div className="rounded-lg p-6" style={{ background: '#12121a', border: '1px solid #1a1a2e' }}>
                <h2 className="text-sm font-bold mb-4" style={{ color: '#00ff88' }}>STRENGTHS</h2>
                {data.strengths.length > 0 ? (
                  <ul className="space-y-2">
                    {data.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <span style={{ color: '#00ff88' }}>{'\u2713'}</span>
                        <span style={{ color: '#e0e0e0' }}>{s}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs" style={{ color: '#555' }}>No notable strengths identified</p>
                )}
              </div>

              {/* Weaknesses */}
              <div className="rounded-lg p-6" style={{ background: '#12121a', border: '1px solid #1a1a2e' }}>
                <h2 className="text-sm font-bold mb-4" style={{ color: '#ffff00' }}>WEAKNESSES</h2>
                {data.weaknesses.length > 0 ? (
                  <ul className="space-y-3">
                    {data.weaknesses.map((w, i) => (
                      <li key={i} className="text-xs">
                        <div className="flex items-start gap-2">
                          <span style={{ color: '#ffff00' }}>!</span>
                          <span style={{ color: '#e0e0e0' }}>{w.label}</span>
                        </div>
                        <div className="ml-4 mt-1" style={{ color: '#555' }}>{w.rec}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs" style={{ color: '#555' }}>No weaknesses identified</p>
                )}
              </div>
            </div>

            {/* Exchange Scores */}
            <div className="rounded-lg p-6 mb-6" style={{ background: '#12121a', border: '1px solid #1a1a2e' }}>
              <h2 className="text-sm font-bold mb-4" style={{ color: '#888' }}>EXCHANGE READINESS SCORES</h2>
              <ReadinessBar label="Trading Volume" value={data.exchange_scores.trading_volume} />
              <ReadinessBar label="Liquidity Depth" value={data.exchange_scores.liquidity_depth} />
              <ReadinessBar label="Holder Distribution" value={data.exchange_scores.holder_distribution} />
              <ReadinessBar label="Smart Contract" value={data.exchange_scores.smart_contract} />
              <ReadinessBar label="Community Health" value={data.exchange_scores.community_health} />
              <ReadinessBar label="Regulatory Readiness" value={data.exchange_scores.regulatory_readiness} />
            </div>

            {/* Simulation Result */}
            <div className="rounded-lg p-6 mb-6" style={{ background: '#12121a', border: '1px solid #1a1a2e' }}>
              <h2 className="text-sm font-bold mb-4" style={{ color: '#888' }}>SIMULATION RESULT</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-xs mb-1" style={{ color: '#555' }}>Consensus</div>
                  <div className="text-sm font-bold" style={{ color: getDecisionColor(sim.decision) }}>{sim.decision}</div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: '#555' }}>Confidence</div>
                  <div className="text-sm font-bold" style={{ color: '#e0e0e0' }}>{(sim.confidence * 100).toFixed(1)}%</div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: '#555' }}>EV Score</div>
                  <div className="text-sm font-bold" style={{ color: sim.ev >= 0 ? '#00ff88' : '#ff4444' }}>
                    {sim.ev >= 0 ? '+' : ''}{sim.ev}
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: '#555' }}>Agents</div>
                  <div className="text-sm font-bold" style={{ color: '#e0e0e0' }}>{sim.agentsCount}/20</div>
                </div>
              </div>
              {/* Cluster breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4" style={{ borderTop: '1px solid #1a1a2e' }}>
                {Object.entries(sim.clusters).map(([name, cluster]) => {
                  const sentColor = cluster.sentiment === 'BULLISH' ? '#00ff88' : cluster.sentiment === 'BEARISH' ? '#ff4444' : '#ffff00';
                  return (
                    <div key={name} className="text-center">
                      <div className="text-xs capitalize mb-1" style={{ color: '#555' }}>{name}</div>
                      <div className="text-xs font-bold" style={{ color: sentColor }}>{cluster.sentiment}</div>
                      <div className="text-xs mt-1" style={{ color: '#444' }}>
                        {cluster.bullish}B / {cluster.neutral}N / {cluster.bearish}R
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Steps */}
            <div className="rounded-lg p-6 mb-6" style={{ background: '#12121a', border: '1px solid #1a1a2e' }}>
              <h2 className="text-sm font-bold mb-4" style={{ color: '#ff00ff' }}>NEXT STEPS</h2>
              <ol className="space-y-3">
                {[
                  sim.decision === 'LIST'
                    ? 'Token has passed simulation. Proceed with exchange listing application.'
                    : 'Token is under MONITOR. Continue building metrics to improve readiness.',
                  'Complete smart contract audit with CertiK, Hacken, or equivalent.',
                  'Improve holder distribution to reduce concentration risk.',
                  'Build institutional-grade documentation and compliance materials.',
                  'Engage with exchange BD teams with this readiness report.',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: 'rgba(255,0,255,0.15)', color: '#ff00ff' }}>
                      {i + 1}
                    </span>
                    <span style={{ color: '#e0e0e0' }}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent('https://microbuzz.vercel.app/check/' + address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg text-sm font-bold"
                style={{ background: '#00ffff', color: '#0a0a0f' }}
              >
                Share on Twitter
              </a>
              <a
                href={`https://dexscreener.com/solana/${decodedAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg text-sm font-bold border"
                style={{ borderColor: '#1a1a2e', color: '#888' }}
              >
                View on DexScreener
              </a>
              <Link href={`/report/${sim.ticker}`}
                className="px-6 py-3 rounded-lg text-sm font-bold border"
                style={{ borderColor: '#ff00ff', color: '#ff00ff' }}
              >
                Full Report &rarr;
              </Link>
            </div>

            {/* Disclaimer */}
            <div className="rounded-lg p-4" style={{ background: 'rgba(255,68,68,0.05)', border: '1px solid rgba(255,68,68,0.15)' }}>
              <p className="text-xs" style={{ color: '#555' }}>
                <span style={{ color: '#ff4444' }}>DISCLAIMER:</span> This readiness score is generated from MicroBuzz simulation data using demo AI agent consensus.
                It does not constitute financial advice, a guarantee of listing, or an endorsement of any token.
                Exchange listing decisions involve additional due diligence beyond this report.
                Always verify data independently. Token data shown may use simulated values.
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
