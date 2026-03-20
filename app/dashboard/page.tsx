import Link from "next/link";
import { sortedByConfidence, stats } from "@/data/simulations";
import Navbar from "@/components/Navbar";
// ContractAddress used in client components (check page)

export const metadata = {
  title: "MicroBuzz — Pipeline Dashboard",
  description: "Batch simulation results — 25 tokens analyzed by 20 AI agents",
};

function getRecColor(decision: string) {
  if (decision === "LIST") return { bg: "rgba(0,255,136,0.12)", border: "#00ff88", text: "#00ff88" };
  if (decision === "MONITOR") return { bg: "rgba(255,255,0,0.12)", border: "#ffff00", text: "#ffff00" };
  if (decision === "REJECT") return { bg: "rgba(255,68,68,0.12)", border: "#ff4444", text: "#ff4444" };
  return { bg: "rgba(85,85,85,0.12)", border: "#555", text: "#555" };
}

function getScoreColor(score: number) {
  if (score >= 85) return "#ff00ff";
  if (score >= 70) return "#00ffff";
  return "#ffff00";
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0a0a0f", color: "#e0e0e0", fontFamily: "'JetBrains Mono', monospace" }}>
      <Navbar />
      <main className="pt-20 px-4 pb-16 max-w-6xl mx-auto">
        {/* Stats Banner */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#00ffff" }}>PIPELINE DASHBOARD</h1>
          <p className="text-sm mb-4" style={{ color: "#888" }}>Batch Simulation — {stats.batchDate} — {stats.total} tokens analyzed</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 rounded-lg text-sm font-bold" style={{ background: "rgba(0,255,136,0.12)", border: "1px solid #00ff88", color: "#00ff88" }}>
              ✅ PROCEED: {stats.proceed}
            </span>
            <span className="px-4 py-2 rounded-lg text-sm font-bold" style={{ background: "rgba(255,255,0,0.12)", border: "1px solid #ffff00", color: "#ffff00" }}>
              ⚠️ CAUTION: {stats.caution}
            </span>
            <span className="px-4 py-2 rounded-lg text-sm font-bold" style={{ background: "rgba(255,68,68,0.12)", border: "1px solid #ff4444", color: "#ff4444" }}>
              ❌ REJECT: {stats.reject}
            </span>
          </div>
        </div>

        {/* Top 3 Prospects */}
        <section className="mb-10">
          <h2 className="text-lg font-bold mb-4 text-center" style={{ color: "#ff00ff" }}>🏆 TOP BD PROSPECTS</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {sortedByConfidence.slice(0, 3).map((sim, i) => (
              <Link key={sim.ticker} href={`/report/${sim.ticker}`} className="block">
                <div className="rounded-lg p-5 transition-all hover:brightness-110" style={{ background: "#12121a", border: "2px solid #ff00ff" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold" style={{ color: "#ff00ff" }}>#{i + 1}</span>
                    <span className="text-xs px-2 py-1 rounded" style={{ background: "rgba(0,255,136,0.15)", color: "#00ff88" }}>PROCEED</span>
                  </div>
                  <div className="text-xl font-bold mb-1" style={{ color: "#00ffff" }}>${sim.ticker}</div>
                  <div className="text-sm" style={{ color: "#888" }}>{sim.name}</div>
                  <div className="mt-3 flex justify-between text-sm">
                    <span>Score: <strong style={{ color: getScoreColor(sim.score) }}>{sim.score}</strong></span>
                    <span>Conf: <strong style={{ color: "#00ff88" }}>{(sim.confidence * 100).toFixed(0)}%</strong></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Full Results Table */}
        <section>
          <h2 className="text-lg font-bold mb-4" style={{ color: "#00ffff" }}>ALL SIMULATION RESULTS</h2>
          <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
            <table className="w-full text-sm" style={{ minWidth: "700px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #1a1a2e", color: "#888" }}>
                  <th className="text-left py-3 px-2">#</th>
                  <th className="text-left py-3 px-2">Token</th>
                  <th className="text-center py-3 px-2">Score</th>
                  <th className="text-center py-3 px-2">Chain</th>
                  <th className="text-center py-3 px-2">Consensus</th>
                  <th className="text-center py-3 px-2">Confidence</th>
                  <th className="text-center py-3 px-2">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {sortedByConfidence.map((sim, i) => {
                  const recStyle = getRecColor(sim.decision);
                  return (
                    <Link key={sim.ticker + i} href={`/report/${sim.ticker}`} className="contents group">
                      <tr className="cursor-pointer transition-all hover:brightness-125" style={{ borderBottom: "1px solid #1a1a2e" }}>
                        <td className="py-3 px-2" style={{ color: "#555" }}>{i + 1}</td>
                        <td className="py-3 px-2">
                          <div>
                            <span className="font-bold" style={{ color: "#00ffff" }}>{sim.ticker}</span>
                            <span className="text-xs ml-2" style={{ color: "#555" }}>{sim.name}</span>
                          </div>
                          {sim.address && (
                            <div className="mt-1">
                              <span className="text-xs" style={{ color: '#555' }}>
                                {sim.address.slice(0, 6)}...{sim.address.slice(-4)}
                              </span>
                              <a href={`https://dexscreener.com/${sim.chain.toLowerCase() === 'sol' ? 'solana' : sim.chain.toLowerCase()}/${sim.address}`}
                                target="_blank" rel="noopener noreferrer" className="ml-1 text-xs"
                                style={{ color: '#555' }}>🔗</a>
                            </div>
                          )}
                        </td>
                        <td className="text-center py-3 px-2">
                          <span className="font-bold" style={{ color: getScoreColor(sim.score) }}>{sim.score}</span>
                        </td>
                        <td className="text-center py-3 px-2">
                          <span className="text-xs px-2 py-1 rounded" style={{ background: "rgba(0,255,255,0.08)", color: "#00ffff", border: "1px solid rgba(0,255,255,0.2)" }}>
                            {sim.chain}
                          </span>
                        </td>
                        <td className="text-center py-3 px-2">
                          <span style={{ color: sim.probability >= 0.7 ? "#00ff88" : sim.probability >= 0.5 ? "#ffff00" : "#ff4444" }}>
                            {sim.probability >= 0.7 ? "BULLISH" : sim.probability >= 0.5 ? "NEUTRAL" : "BEARISH"}
                          </span>
                        </td>
                        <td className="text-center py-3 px-2">
                          <span className="font-bold" style={{ color: sim.confidence >= 0.8 ? "#00ff88" : sim.confidence >= 0.7 ? "#00ffff" : "#ffff00" }}>
                            {(sim.confidence * 100).toFixed(0)}%
                          </span>
                        </td>
                        <td className="text-center py-3 px-2">
                          <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: recStyle.bg, color: recStyle.text, border: `1px solid ${recStyle.border}` }}>
                            {sim.decision === "LIST" ? "PROCEED" : sim.decision}
                          </span>
                        </td>
                      </tr>
                    </Link>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center" style={{ color: "#555" }}>
          <p className="text-xs">Powered by MiroFish Architecture · OASIS Concepts · Financial Datasets MCP</p>
          <p className="text-xs mt-1">Buzz BD Agent v7.7.0 · MiniMax M2.7 · bankr/gpt-5-nano (FREE)</p>
        </footer>
      </main>
    </div>
  );
}
