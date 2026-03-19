import Link from "next/link";
import Navbar from "@/components/Navbar";
import PriceBar from "@/components/PriceBar";
import SwarmHero from "@/components/SwarmHero";
import { simulations } from "@/data/simulations";

function getScoreColor(score: number): string {
  if (score >= 85) return "#ff00ff";
  if (score >= 70) return "#00ffff";
  return "#ffff00";
}

function getDecisionStyle(decision: string): { bg: string; color: string } {
  if (decision === "LIST") return { bg: "rgba(0,255,136,0.15)", color: "#00ff88" };
  if (decision === "MONITOR") return { bg: "rgba(255,255,0,0.15)", color: "#ffff00" };
  return { bg: "rgba(255,68,68,0.15)", color: "#ff4444" };
}

function getSentimentColor(sentiment: string): string {
  if (sentiment === "BULLISH") return "#00ff88";
  if (sentiment === "BEARISH") return "#ff4444";
  return "#ffff00";
}

const tokens = Object.values(simulations);

const chains = [
  "Ethereum",
  "Polygon",
  "Arbitrum",
  "Optimism",
  "Base",
  "Solana",
];

export default function Home() {
  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundColor: "#0a0a0f",
        color: "#e0e0e0",
        fontFamily: "var(--font-geist-mono), monospace",
      }}
    >
      {/* Hex grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,255,255,0.03) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Live Price Bar - very top */}
      <PriceBar />

      <Navbar />

      <main className="relative z-10 pt-16">
        {/* ===== HERO ===== */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden">
          {/* Fish swarm animation layer */}
          <div className="absolute inset-0 z-0">
            <SwarmHero />
          </div>
          {/* Dark gradient overlay for text readability */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background: "linear-gradient(180deg, rgba(10,10,15,0.7) 0%, rgba(10,10,15,0.5) 40%, rgba(10,10,15,0.7) 100%)",
            }}
          />
          {/* Text overlay */}
          <div className="relative z-[2] flex flex-col items-center">
            {/* Version pill badge */}
            <span
              className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-6 tracking-wider"
              style={{
                border: "1px solid #00ffff",
                color: "#00ffff",
                backgroundColor: "rgba(0,255,255,0.08)",
              }}
            >
              MicroBuzz v1.0
            </span>
            {/* Brand name */}
            <h1 className="text-6xl md:text-8xl font-bold tracking-widest leading-none mb-2">
              <span
                style={{
                  color: "#00ffff",
                  textShadow:
                    "0 0 20px rgba(0,255,255,0.6), 0 0 60px rgba(0,255,255,0.3), 0 0 100px rgba(0,255,255,0.1)",
                }}
              >
                MICRO
              </span>
              <br />
              <span
                style={{
                  color: "#ff00ff",
                  textShadow:
                    "0 0 20px rgba(255,0,255,0.6), 0 0 60px rgba(255,0,255,0.3), 0 0 100px rgba(255,0,255,0.1)",
                }}
              >
                BUZZ
              </span>
            </h1>
            {/* Taglines */}
            <p
              className="text-lg md:text-xl font-bold mt-4 mb-1"
              style={{ color: "#e0e0e0" }}
            >
              Swarm Simulation Engine
            </p>
            <p
              className="text-base md:text-lg mb-4"
              style={{ color: "#888" }}
            >
              for Token Listing Intelligence
            </p>
            <p className="text-sm mb-2" style={{ color: "#888" }}>
              20 agents &middot; 4 clusters &middot; EV math
            </p>
            <p className="text-sm mb-8" style={{ color: "#666" }}>
              Buzz scans. MicroBuzz predicts. SolCex lists.
            </p>
            {/* CTA buttons */}
            <div className="flex gap-4 flex-wrap justify-center mb-6">
              <Link
                href="/report/EURC"
                className="px-6 py-3 rounded-lg text-sm font-bold transition-all"
                style={{
                  backgroundColor: "#00ffff",
                  color: "#0a0a0f",
                  boxShadow: "0 0 15px rgba(0,255,255,0.4)",
                }}
              >
                View Reports &rarr;
              </Link>
              <Link
                href="/request"
                className="px-6 py-3 rounded-lg text-sm font-bold border transition-all"
                style={{
                  borderColor: "#ff0066",
                  color: "#ff0066",
                }}
              >
                Request Simulation &rarr;
              </Link>
            </div>
            {/* Attribution line */}
            <p className="text-xs" style={{ color: "#555" }}>
              Inspired by MiroFish architecture &middot; Powered by OASIS concepts
            </p>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <h2
            className="text-2xl font-bold text-center mb-10 tracking-wider"
            style={{ color: "#00ffff" }}
          >
            HOW IT WORKS
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "SCAN",
                desc: "22 intel sources scraped and scored by 10 specialized agents. CoinGecko, Twitter sentiment, on-chain data, exchange signals.",
                stat: "22 sources / 10 agents",
              },
              {
                step: "02",
                title: "SIMULATE",
                desc: "20 AI agents across 4 behavioral clusters (Degen, Whale, Institutional, Community) run independent simulations.",
                stat: "20 agents / 4 clusters",
              },
              {
                step: "03",
                title: "DECIDE",
                desc: "Expected Value formula combines probability, confidence, and cluster consensus to output LIST, MONITOR, or REJECT.",
                stat: "EV = P x Gain - (1-P) x Loss",
              },
            ].map((card) => (
              <div
                key={card.step}
                className="rounded-lg p-6 transition-all"
                style={{
                  backgroundColor: "#12121a",
                  border: "1px solid #1a1a2e",
                  boxShadow: "0 0 0px rgba(0,255,255,0)",
                  transition: "box-shadow 0.3s ease",
                }}
                onMouseEnter={undefined}
              >
                <div
                  className="text-xs font-bold mb-2"
                  style={{ color: "#00ffff" }}
                >
                  STEP {card.step}
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "#ff00ff" }}
                >
                  {card.title}
                </h3>
                <p className="text-sm mb-4" style={{ color: "#888" }}>
                  {card.desc}
                </p>
                <div
                  className="text-xs px-3 py-1 rounded inline-block"
                  style={{
                    backgroundColor: "rgba(0,255,255,0.1)",
                    color: "#00ffff",
                    border: "1px solid rgba(0,255,255,0.2)",
                  }}
                >
                  {card.stat}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== LIVE RESULTS ===== */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <h2
            className="text-2xl font-bold text-center mb-10 tracking-wider"
            style={{ color: "#00ffff" }}
          >
            LIVE SIMULATION RESULTS
          </h2>
          <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
            <table className="w-full text-sm" style={{ minWidth: '800px' }}>
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid #1a1a2e",
                    color: "#888",
                  }}
                >
                  <th className="text-left py-3 px-3">Token</th>
                  <th className="text-left py-3 px-3">Name</th>
                  <th className="text-center py-3 px-3">Score</th>
                  <th className="text-center py-3 px-3">Verdict</th>
                  <th className="text-center py-3 px-3">Probability</th>
                  <th className="text-center py-3 px-3">EV</th>
                  <th className="text-center py-3 px-3">Decision</th>
                  <th className="text-center py-3 px-3">Clusters</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((t) => {
                  const decStyle = getDecisionStyle(t.decision);
                  const clusterSentiments = [
                    t.clusters.degen.sentiment,
                    t.clusters.whale.sentiment,
                    t.clusters.institutional.sentiment,
                    t.clusters.community.sentiment,
                  ];
                  return (
                    <Link
                      key={t.ticker}
                      href={`/report/${t.ticker}`}
                      className="contents group"
                    >
                      <tr
                        className="cursor-pointer transition-all"
                        style={{ borderBottom: "1px solid #1a1a2e" }}
                      >
                        <td className="py-3 px-3">
                          <span className="font-bold" style={{ color: "#00ffff" }}>
                            {t.ticker}
                          </span>
                        </td>
                        <td className="py-3 px-3" style={{ color: "#888" }}>
                          {t.name}
                        </td>
                        <td className="text-center py-3 px-3">
                          <span
                            className="font-bold"
                            style={{ color: getScoreColor(t.score) }}
                          >
                            {t.score}
                          </span>
                        </td>
                        <td className="text-center py-3 px-3">
                          <span
                            className="text-xs px-2 py-1 rounded"
                            style={{
                              backgroundColor:
                                t.verdict === "HOT"
                                  ? "rgba(255,0,255,0.15)"
                                  : t.verdict === "QUALIFIED"
                                    ? "rgba(0,255,255,0.15)"
                                    : "rgba(255,255,0,0.15)",
                              color:
                                t.verdict === "HOT"
                                  ? "#ff00ff"
                                  : t.verdict === "QUALIFIED"
                                    ? "#00ffff"
                                    : "#ffff00",
                            }}
                          >
                            {t.verdict}
                          </span>
                        </td>
                        <td
                          className="text-center py-3 px-3"
                          style={{ color: "#e0e0e0" }}
                        >
                          {(t.probability * 100).toFixed(0)}%
                        </td>
                        <td
                          className="text-center py-3 px-3 font-bold"
                          style={{
                            color: t.ev >= 0 ? "#00ff88" : "#ff4444",
                          }}
                        >
                          {t.ev >= 0 ? "+" : ""}
                          {t.ev}
                        </td>
                        <td className="text-center py-3 px-3">
                          <span
                            className="text-xs font-bold px-3 py-1 rounded-full"
                            style={{
                              backgroundColor: decStyle.bg,
                              color: decStyle.color,
                            }}
                          >
                            {t.decision}
                          </span>
                        </td>
                        <td className="text-center py-3 px-3">
                          <span className="inline-flex items-center gap-1">
                            {clusterSentiments.map((s, i) => (
                              <span
                                key={i}
                                title={['Degen', 'Whale', 'Institutional', 'Community'][i] + ': ' + s}
                                style={{
                                  display: 'inline-block',
                                  width: '5px',
                                  height: '5px',
                                  borderRadius: '50%',
                                  backgroundColor: getSentimentColor(s),
                                }}
                              />
                            ))}
                          </span>
                        </td>
                      </tr>
                    </Link>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Row hover styles */}
          <style>{`
            .group:hover tr {
              border-left: 2px solid #00ffff !important;
              filter: brightness(1.15);
              background-color: rgba(0,255,255,0.03);
            }
          `}</style>
        </section>

        {/* ===== ECOSYSTEM ===== */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <h2
            className="text-2xl font-bold text-center mb-10 tracking-wider"
            style={{ color: "#00ffff" }}
          >
            ECOSYSTEM
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* SolCex Card */}
            <div
              className="rounded-lg p-6 relative overflow-hidden"
              style={{
                backgroundColor: "#12121a",
                border: "1px solid #1a1a2e",
                borderLeft: "3px solid #7c3aed",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span style={{ fontSize: '20px' }}>&#x1F4B1;</span>
                <h3 className="text-lg font-bold" style={{ color: "#e0e0e0" }}>
                  SolCex Exchange
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "#888" }}>
                Trade tokens that pass MicroBuzz simulation
              </p>
              <div className="flex gap-4 mb-5">
                <div
                  className="text-xs px-3 py-2 rounded"
                  style={{
                    backgroundColor: "rgba(124,58,237,0.1)",
                    border: "1px solid rgba(124,58,237,0.2)",
                  }}
                >
                  <span style={{ color: "#888" }}>BTC/USDT</span>{" "}
                  <span className="font-bold" style={{ color: "#00ff88" }}>$87,245</span>
                </div>
                <div
                  className="text-xs px-3 py-2 rounded"
                  style={{
                    backgroundColor: "rgba(124,58,237,0.1)",
                    border: "1px solid rgba(124,58,237,0.2)",
                  }}
                >
                  <span style={{ color: "#888" }}>SOL/USDT</span>{" "}
                  <span className="font-bold" style={{ color: "#00ff88" }}>$134.20</span>
                </div>
              </div>
              <a
                href="https://solcex.cc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 rounded text-sm font-bold transition-all"
                style={{
                  backgroundColor: "#7c3aed",
                  color: "#ffffff",
                  boxShadow: "0 0 12px rgba(124,58,237,0.4)",
                }}
              >
                Trade Now &rarr;
              </a>
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{
                  background: "linear-gradient(90deg, #7c3aed, transparent)",
                }}
              />
            </div>

            {/* Buzz Alpha Card */}
            <div
              className="rounded-lg p-6 relative overflow-hidden"
              style={{
                backgroundColor: "#12121a",
                border: "1px solid #1a1a2e",
                borderLeft: "3px solid #00ffff",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span style={{ fontSize: '20px' }}>&#x1F41D;</span>
                <h3 className="text-lg font-bold" style={{ color: "#e0e0e0" }}>
                  Buzz Alpha Mobile
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "#888" }}>
                Monitor pipeline, agents &amp; simulations on mobile
              </p>
              <div className="flex gap-3 mb-5 flex-wrap">
                <div
                  className="text-xs px-3 py-2 rounded"
                  style={{
                    backgroundColor: "rgba(0,255,255,0.08)",
                    border: "1px solid rgba(0,255,255,0.2)",
                    color: "#00ffff",
                  }}
                >
                  Pipeline: <span className="font-bold">7 tokens</span>
                </div>
                <div
                  className="text-xs px-3 py-2 rounded"
                  style={{
                    backgroundColor: "rgba(0,255,255,0.08)",
                    border: "1px solid rgba(0,255,255,0.2)",
                    color: "#00ffff",
                  }}
                >
                  Agents: <span className="font-bold">10/10</span>
                </div>
                <div
                  className="text-xs px-3 py-2 rounded"
                  style={{
                    backgroundColor: "rgba(0,255,136,0.08)",
                    border: "1px solid rgba(0,255,136,0.2)",
                    color: "#00ff88",
                  }}
                >
                  Sentinel: <span className="font-bold">GREEN</span>
                </div>
              </div>
              <button
                disabled
                className="inline-block px-5 py-2 rounded text-sm font-bold cursor-not-allowed"
                style={{
                  backgroundColor: "rgba(0,255,255,0.1)",
                  color: "#555",
                  border: "1px solid #1a1a2e",
                }}
              >
                Coming to App Store
              </button>
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{
                  background: "linear-gradient(90deg, #00ffff, transparent)",
                  boxShadow: "0 0 8px rgba(0,255,255,0.3)",
                }}
              />
            </div>
          </div>
        </section>

        {/* ===== THE BUILDER ===== */}
        <section className="px-6 py-16 max-w-4xl mx-auto">
          <h2
            className="text-2xl font-bold text-center mb-10 tracking-wider"
            style={{ color: "#00ffff" }}
          >
            THE BUILDER
          </h2>
          <div
            className="rounded-lg p-8"
            style={{
              backgroundColor: "#12121a",
              border: "1px solid #1a1a2e",
            }}
          >
            <p
              className="text-lg font-bold mb-4"
              style={{ color: "#ff00ff" }}
            >
              Built by a Chef.
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#e0e0e0" }}>
              <strong style={{ color: "#00ffff" }}>Ogie</strong> &mdash; 20+ years as
              Executive Chef. Zero CS degree. Built Buzz entirely through
              conversational AI with Claude.
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#888" }}>
              No bootcamp. No GitHub history before 2024. Just relentless prompt
              engineering, system design through conversation, and a vision for
              what autonomous BD agents could look like in crypto.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#888" }}>
              MicroBuzz is the intelligence layer. Buzz is the execution engine.
              Together they form a fully autonomous Business Development pipeline
              for token listing &mdash; from discovery to decision.
            </p>
          </div>
        </section>

        {/* ===== TECH STACK ===== */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <h2
            className="text-2xl font-bold text-center mb-10 tracking-wider"
            style={{ color: "#00ffff" }}
          >
            TECH STACK
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "10", label: "AI Agents" },
              { value: "23", label: "Intel Sources" },
              { value: "131", label: "API Endpoints" },
              { value: "47", label: "DB Tables" },
              { value: "28", label: "Cron Jobs" },
              { value: "2", label: "WebSocket Feeds" },
              { value: "ERC-8004", label: "On 6 Chains" },
              { value: "$4.09/mo", label: "Infrastructure" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg p-5 text-center"
                style={{
                  backgroundColor: "#12121a",
                  border: "1px solid #1a1a2e",
                }}
              >
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: "#00ffff" }}
                >
                  {item.value}
                </div>
                <div className="text-xs" style={{ color: "#888" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== IDENTITY / ERC-8004 ===== */}
        <section className="px-6 py-16 max-w-4xl mx-auto">
          <h2
            className="text-2xl font-bold text-center mb-10 tracking-wider"
            style={{ color: "#00ffff" }}
          >
            ON-CHAIN IDENTITY
          </h2>
          <p
            className="text-center text-sm mb-8"
            style={{ color: "#888" }}
          >
            ERC-8004 Agent Identity registered across 6 chains
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {chains.map((chain) => (
              <span
                key={chain}
                className="text-xs px-4 py-2 rounded-full font-bold"
                style={{
                  border: "1px solid #ff00ff",
                  color: "#ff00ff",
                  backgroundColor: "rgba(255,0,255,0.08)",
                }}
              >
                {chain}
              </span>
            ))}
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer
          className="px-6 py-10 text-center"
          style={{ borderTop: "1px solid #1a1a2e" }}
        >
          <div className="flex justify-center gap-6 mb-4">
            <a
              href="https://twitter.com/BuzzBySolCex"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm"
              style={{ color: "#00ffff" }}
            >
              Twitter
            </a>
            <a
              href="https://solcex.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm"
              style={{ color: "#00ffff" }}
            >
              SolCex
            </a>
          </div>
          <p className="text-xs" style={{ color: "#888" }}>
            Powered by MiroFish Architecture &middot; OASIS Concepts &middot; Financial Datasets MCP | Buzz BD Agent v7.6.0
          </p>
        </footer>
      </main>
    </div>
  );
}
