import Link from "next/link";
import { simulations } from "@/data/simulations";
import type { SimulationResult, ClusterData } from "@/data/simulations";
import ShareButton from "@/components/ShareButton";
import MiniFish from "@/components/MiniFish";

export async function generateMetadata({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return {
    title: `MicroBuzz Report | ${token.toUpperCase()}`,
    description: `Simulation report for ${token.toUpperCase()} — 20 agents, 4 clusters, EV analysis`,
  };
}

function getVerdictColor(verdict: string) {
  switch (verdict.toUpperCase()) {
    case "HOT": return { bg: "bg-[#ff00ff]/20", border: "border-[#ff00ff]", text: "text-[#ff00ff]" };
    case "QUALIFIED": return { bg: "bg-[#00ffff]/20", border: "border-[#00ffff]", text: "text-[#00ffff]" };
    case "WATCH": return { bg: "bg-[#ffff00]/20", border: "border-[#ffff00]", text: "text-[#ffff00]" };
    default: return { bg: "bg-gray-500/20", border: "border-gray-500", text: "text-gray-400" };
  }
}

function getDecisionStyle(decision: string) {
  switch (decision.toUpperCase()) {
    case "LIST":
      return { bg: "bg-[#00ff88]/10", border: "border-[#00ff88]", text: "text-[#00ff88]" };
    case "REJECT":
      return { bg: "bg-[#ff4444]/10", border: "border-[#ff4444]", text: "text-[#ff4444]" };
    default:
      return { bg: "bg-[#ffff00]/10", border: "border-[#ffff00]", text: "text-[#ffff00]" };
  }
}

const clusterMeta: Record<string, { emoji: string; label: string }> = {
  degen: { emoji: "\u{1F3B0}", label: "Degen" },
  whale: { emoji: "\u{1F40B}", label: "Whale" },
  institutional: { emoji: "\u{1F3E6}", label: "Institutional" },
  community: { emoji: "\u{1F465}", label: "Community" },
};

function ClusterCard({ name, data }: { name: string; data: ClusterData }) {
  const meta = clusterMeta[name];
  const total = data.bullish + data.neutral + data.bearish;
  const bullishPct = (data.bullish / total) * 100;
  const neutralPct = (data.neutral / total) * 100;
  const bearishPct = (data.bearish / total) * 100;

  const sentimentColor =
    data.sentiment.toLowerCase() === "bullish"
      ? "text-[#00ff88]"
      : data.sentiment.toLowerCase() === "bearish"
        ? "text-[#ff4444]"
        : "text-[#ffff00]";

  return (
    <div className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-mono">
          {meta.emoji} {meta.label}
        </span>
        <span className={`font-mono text-sm uppercase font-bold ${sentimentColor}`}>
          {data.sentiment}
        </span>
      </div>
      <div className="flex justify-between text-xs font-mono mb-2 text-gray-400">
        <span className="text-[#00ff88]">Bullish: {data.bullish}</span>
        <span className="text-[#ffff00]">Neutral: {data.neutral}</span>
        <span className="text-[#ff4444]">Bearish: {data.bearish}</span>
      </div>
      <div className="w-full h-3 rounded-full overflow-hidden flex bg-[#0a0a0f]">
        <div
          className="h-full bg-[#00ff88]"
          style={{ width: `${bullishPct}%` }}
        />
        <div
          className="h-full bg-[#ffff00]"
          style={{ width: `${neutralPct}%` }}
        />
        <div
          className="h-full bg-[#ff4444]"
          style={{ width: `${bearishPct}%` }}
        />
      </div>
    </div>
  );
}

export default async function ReportPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const ticker = token.toUpperCase();
  const sim: SimulationResult | undefined = simulations[ticker];

  if (!sim) {
    return (
      <div
        className="min-h-screen font-mono flex flex-col items-center justify-center px-4"
        style={{ background: "#0a0a0f" }}
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#ff00ff] mb-4">404</h1>
          <p className="text-xl text-gray-400 mb-2">Token not yet simulated</p>
          <p className="text-gray-500 mb-8 text-sm">
            <span className="text-[#00ffff]">${ticker}</span> has not been processed by the MicroBuzz pipeline.
          </p>
          <Link
            href="/request"
            className="inline-block px-6 py-3 bg-[#ff00ff]/20 border border-[#ff00ff] text-[#ff00ff] rounded-lg font-mono hover:bg-[#ff00ff]/30 transition-colors"
          >
            Request Simulation
          </Link>
          <div className="mt-6">
            <Link href="/" className="text-gray-500 hover:text-[#00ffff] text-sm font-mono transition-colors">
              &larr; Back to all reports
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const verdictStyle = getVerdictColor(sim.verdict);
  const decisionStyle = getDecisionStyle(sim.decision);
  const evPositive = sim.ev >= 0;

  return (
    <div
      className="min-h-screen font-mono text-gray-300 px-4 py-8 sm:px-8"
      style={{ background: "#0a0a0f" }}
    >
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .scanline-container {
          position: relative;
          overflow: hidden;
        }
        .scanline-container::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 255, 0.03) 2px,
            rgba(0, 255, 255, 0.03) 4px
          );
          pointer-events: none;
          animation: scanline 8s linear infinite;
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* Top Bar: Back Link + Share */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/#results"
            className="text-gray-500 hover:text-[#00ffff] text-sm transition-colors"
          >
            &larr; Back to all reports
          </Link>
          <ShareButton />
        </div>

        {/* Header */}
        <header className="scanline-container bg-[#12121a] border border-[#1a1a2e] rounded-lg p-6 mb-6 text-center">
          <MiniFish />
          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-2 mt-2">
            Buzz BD Agent v7.5.5
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#00ffff] mb-3">
            BUZZ SIMULATION REPORT
          </h1>
          <div className="text-5xl sm:text-6xl font-extrabold text-[#ff00ff] mb-3">
            ${sim.ticker}
          </div>
          <p className="text-lg text-gray-400 mb-3">{sim.name}</p>
          <span className="inline-block px-3 py-1 text-xs bg-[#00ffff]/10 border border-[#00ffff]/30 text-[#00ffff] rounded-full uppercase tracking-wider">
            {sim.chain}
          </span>
        </header>

        {/* Score Section */}
        <section className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-6 mb-6">
          <h2 className="text-sm text-[#00ffff] tracking-[0.2em] uppercase mb-4">Pipeline Score</h2>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="text-6xl font-extrabold text-white">
              {sim.score}
              <span className="text-2xl text-gray-500">/100</span>
            </div>
            <span
              className={`inline-block px-4 py-2 text-sm font-bold rounded-lg border uppercase tracking-wider ${verdictStyle.bg} ${verdictStyle.border} ${verdictStyle.text}`}
            >
              {sim.verdict}
            </span>
          </div>
        </section>

        {/* Simulation Overview */}
        <section className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Agents Dispatched</p>
            <p className="text-3xl font-bold text-[#00ffff]">{sim.agentsCount}</p>
          </div>
          <div className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Probability</p>
            <p className="text-3xl font-bold text-[#00ffff]">{(sim.probability * 100).toFixed(0)}%</p>
          </div>
          <div className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Confidence</p>
            <p className="text-3xl font-bold text-[#00ffff]">{(sim.confidence * 100).toFixed(0)}%</p>
          </div>
        </section>

        {/* EV Section */}
        <section className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-6 mb-6 text-center">
          <h2 className="text-sm text-[#00ffff] tracking-[0.2em] uppercase mb-4">Expected Value Analysis</h2>
          <div
            className={`text-5xl sm:text-6xl font-extrabold mb-4 ${evPositive ? "text-[#00ff88]" : "text-[#ff4444]"}`}
          >
            {evPositive ? "+" : ""}${sim.ev.toFixed(2)}
          </div>
          <p className="text-sm text-gray-500 font-mono">
            EV = {(sim.probability * 100).toFixed(0)}% &times; $1,000 &minus; {((1 - sim.probability) * 100).toFixed(0)}% &times; $500 ={" "}
            <span className={evPositive ? "text-[#00ff88]" : "text-[#ff4444]"}>
              ${sim.ev.toFixed(2)}
            </span>
          </p>
        </section>

        {/* Cluster Breakdown */}
        <section className="mb-6">
          <h2 className="text-sm text-[#00ffff] tracking-[0.2em] uppercase mb-4">Cluster Breakdown</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(Object.keys(sim.clusters) as Array<keyof typeof sim.clusters>).map((key) => (
              <ClusterCard key={key} name={key} data={sim.clusters[key]} />
            ))}
          </div>
        </section>

        {/* Decision Banner */}
        <section
          className={`rounded-lg border-2 p-6 mb-6 text-center ${decisionStyle.bg} ${decisionStyle.border}`}
        >
          <p className={`text-2xl sm:text-3xl font-extrabold tracking-wider ${decisionStyle.text}`}>
            RECOMMENDATION: {sim.decision.toUpperCase()}
          </p>
        </section>

        {/* Signals & Risks */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-5">
            <h3 className="text-sm text-[#00ff88] tracking-[0.2em] uppercase mb-3">Key Signals</h3>
            <p className="text-sm text-[#00ff88]/80 leading-relaxed whitespace-pre-line">
              {sim.signals}
            </p>
          </div>
          <div className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-5">
            <h3 className="text-sm text-[#ff4444] tracking-[0.2em] uppercase mb-3">Key Risks</h3>
            <p className="text-sm text-[#ff4444]/80 leading-relaxed whitespace-pre-line">
              {sim.risks}
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#12121a] border border-[#1a1a2e] rounded-lg p-6 text-center">
          <p className="text-xs text-gray-500 mb-2">
            Powered by MicroBuzz Stage 1 | Buzz BD Agent v7.5.5 | 23 Intel Sources
          </p>
          <p className="text-xs text-gray-500 mb-4">
            Simulated at: {sim.simulatedAt}
          </p>
          <p className="text-sm text-[#00ffff]">
            DM{" "}
            <a
              href="https://x.com/HidayahAnka1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff00ff] hover:underline"
            >
              @HidayahAnka1
            </a>{" "}
            for listing opportunities on{" "}
            <a
              href="https://x.com/SolCex_Exchange"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff00ff] hover:underline"
            >
              @SolCex_Exchange
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
