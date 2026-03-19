'use client';

import Link from 'next/link';
import type { SimulationResult } from '@/data/simulations';

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

export default function SimulationHistory({ simulations }: { simulations: SimulationResult[] }) {
  const sorted = [...simulations].sort(
    (a, b) => new Date(b.simulatedAt).getTime() - new Date(a.simulatedAt).getTime()
  );

  return (
    <section className="mb-6">
      <h2 className="text-sm text-[#00ffff] tracking-[0.2em] uppercase mb-4">
        Simulation History
      </h2>

      <div className="bg-[#12121a] border border-[#1a1a2e] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="border-b border-[#1a1a2e]">
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-4 py-3">
                  Token
                </th>
                <th className="text-center text-xs text-gray-500 uppercase tracking-wider px-4 py-3">
                  Score
                </th>
                <th className="text-center text-xs text-gray-500 uppercase tracking-wider px-4 py-3">
                  Probability
                </th>
                <th className="text-center text-xs text-gray-500 uppercase tracking-wider px-4 py-3">
                  EV
                </th>
                <th className="text-center text-xs text-gray-500 uppercase tracking-wider px-4 py-3">
                  Decision
                </th>
                <th className="text-right text-xs text-gray-500 uppercase tracking-wider px-4 py-3">
                  Simulated At
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((sim) => (
                <tr
                  key={sim.ticker}
                  className="border-b border-[#1a1a2e] hover:bg-[#0a0a0f]/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/report/${sim.ticker}`}
                      className="text-[#ff00ff] hover:text-[#00ffff] transition-colors font-bold"
                    >
                      ${sim.ticker}
                    </Link>
                    <span className="text-xs text-gray-500 ml-2">{sim.chain}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span style={{ color: getScoreColor(sim.score) }} className="font-bold">
                      {sim.score}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-400">
                    {(sim.probability * 100).toFixed(0)}%
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span style={{ color: sim.ev >= 0 ? '#00ff88' : '#ff4444' }}>
                      {sim.ev >= 0 ? '+' : ''}${sim.ev.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className="px-2 py-0.5 text-xs font-bold rounded uppercase"
                      style={{
                        color: getDecisionColor(sim.decision),
                        backgroundColor: `${getDecisionColor(sim.decision)}15`,
                        border: `1px solid ${getDecisionColor(sim.decision)}40`,
                      }}
                    >
                      {sim.decision}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-gray-500">
                    {new Date(sim.simulatedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t border-[#1a1a2e] px-4 py-3 text-center">
          <p className="text-xs text-gray-500 font-mono">
            Powered by MiroFish Architecture &middot; OASIS Concepts &middot; Financial Datasets MCP
          </p>
        </div>
      </div>
    </section>
  );
}
