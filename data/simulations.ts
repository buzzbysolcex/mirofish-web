export interface ClusterData {
  bullish: number;
  neutral: number;
  bearish: number;
  sentiment: string;
}

export interface SimulationResult {
  ticker: string;
  name: string;
  chain: string;
  score: number;
  verdict: string;
  probability: number;
  confidence: number;
  ev: number;
  decision: string;
  agentsCount: number;
  clusters: {
    degen: ClusterData;
    whale: ClusterData;
    institutional: ClusterData;
    community: ClusterData;
  };
  risks: string;
  signals: string;
  simulatedAt: string;
}

// Batch simulation results — Day 33 (Mar 20, 2026)
// 25 tokens simulated via MiroFish 20-Agent Engine
// LLM: MiniMax M2.7 + bankr/gpt-5-nano (FREE)

function bullishCluster(b = 5, n = 0, bear = 0): ClusterData {
  return { bullish: b, neutral: n, bearish: bear, sentiment: b > bear + n ? "BULLISH" : bear > b ? "BEARISH" : "MIXED" };
}

export const simulations: Record<string, SimulationResult> = {
  PIPPIN2: {
    ticker: "PIPPIN2", name: "Pippin v2", chain: "SOL", score: 85, verdict: "HOT",
    probability: 1.0, confidence: 1.0, ev: 1000, decision: "LIST", agentsCount: 20,
    clusters: { degen: bullishCluster(5,0,0), whale: bullishCluster(5,0,0), institutional: bullishCluster(5,0,0), community: bullishCluster(5,0,0) },
    risks: "No risks identified — perfect consensus across all clusters",
    signals: "20/20 BULLISH; 1.000 confidence; unanimous across all 4 clusters; exceptional pipeline score",
    simulatedAt: "2026-03-20T02:30:00Z",
  },
  PEACE: {
    ticker: "PEACE", name: "Peace", chain: "SOL", score: 88, verdict: "HOT",
    probability: 0.891, confidence: 0.891, ev: 836, decision: "LIST", agentsCount: 20,
    clusters: { degen: bullishCluster(5,0,0), whale: bullishCluster(5,0,0), institutional: bullishCluster(4,1,0), community: bullishCluster(5,0,0) },
    risks: "Institutional cluster slightly cautious on compliance",
    signals: "20/20 completed; 0.891 confidence; strong consensus; $50M+ mcap potential",
    simulatedAt: "2026-03-20T02:25:00Z",
  },
  WKEYDAO2: {
    ticker: "WKEYDAO2", name: "WebKey DAO 2.0", chain: "BSC", score: 88, verdict: "HOT",
    probability: 0.891, confidence: 0.891, ev: 836, decision: "LIST", agentsCount: 20,
    clusters: { degen: bullishCluster(5,0,0), whale: bullishCluster(4,1,0), institutional: bullishCluster(5,0,0), community: bullishCluster(5,0,0) },
    risks: "Whale cluster mixed — monitoring accumulation patterns",
    signals: "20/20 completed; 0.891 confidence; BSC DeFi ecosystem; strong institutional signal",
    simulatedAt: "2026-03-20T02:28:00Z",
  },
  NASCAT: {
    ticker: "NASCAT", name: "Nascat", chain: "SOL", score: 85, verdict: "HOT",
    probability: 0.85, confidence: 0.85, ev: 775, decision: "LIST", agentsCount: 20,
    clusters: { degen: bullishCluster(5,0,0), whale: bullishCluster(4,1,0), institutional: bullishCluster(4,1,0), community: bullishCluster(5,0,0) },
    risks: "Minor institutional caution on newer project",
    signals: "20/20 completed; 0.850 confidence; strong community + degen alignment",
    simulatedAt: "2026-03-20T02:32:00Z",
  },
  CHIBI: {
    ticker: "CHIBI", name: "Chibi", chain: "SOL", score: 91, verdict: "HOT",
    probability: 0.8, confidence: 0.8, ev: 700, decision: "LIST", agentsCount: 20,
    clusters: { degen: bullishCluster(5,0,0), whale: bullishCluster(5,0,0), institutional: bullishCluster(3,2,0), community: bullishCluster(5,0,0) },
    risks: "Institutional split on compliance review",
    signals: "20/20 completed; 18 BUY + 2 NEUTRAL; 91 composite score; safety 25/30",
    simulatedAt: "2026-03-20T02:22:00Z",
  },
  EURC: {
    ticker: "EURC", name: "Euro Coin", chain: "SOL", score: 90, verdict: "HOT",
    probability: 0.783, confidence: 0.783, ev: 674, decision: "LIST", agentsCount: 20,
    clusters: { degen: bullishCluster(3,2,0), whale: bullishCluster(5,0,0), institutional: bullishCluster(5,0,0), community: bullishCluster(3,2,0) },
    risks: "Degen + community mixed (stablecoin dynamics — less speculative upside)",
    signals: "Whale + institutional fully bullish; Circle-backed; $450M mcap; regulatory clarity",
    simulatedAt: "2026-03-20T02:23:00Z",
  },
  VELO_BSC: {
    ticker: "VELO", name: "Velodrome V2 (BSC)", chain: "BSC", score: 95, verdict: "HOT",
    probability: 0.783, confidence: 0.783, ev: 674, decision: "LIST", agentsCount: 20,
    clusters: { degen: bullishCluster(4,1,0), whale: bullishCluster(5,0,0), institutional: bullishCluster(4,1,0), community: bullishCluster(5,0,0) },
    risks: "Minor institutional caution on cross-chain complexity",
    signals: "Strong whale + community consensus; $80M mcap; PancakeSwap BSC",
    simulatedAt: "2026-03-20T02:20:00Z",
  },
  POOPALIEN: {
    ticker: "POOPALIEN", name: "Poop Alien", chain: "SOL", score: 88, verdict: "HOT",
    probability: 0.783, confidence: 0.783, ev: 674, decision: "LIST", agentsCount: 20,
    clusters: { degen: bullishCluster(5,0,0), whale: bullishCluster(4,1,0), institutional: bullishCluster(3,2,0), community: bullishCluster(5,0,0) },
    risks: "Institutional cautious on meme token classification",
    signals: "Strong degen + community; meme narrative momentum; Solana ecosystem",
    simulatedAt: "2026-03-20T02:27:00Z",
  },
  DISLIKE: {
    ticker: "DISLIKE", name: "Dislike", chain: "SOL", score: 85, verdict: "HOT",
    probability: 0.783, confidence: 0.783, ev: 674, decision: "LIST", agentsCount: 20,
    clusters: { degen: bullishCluster(5,0,0), whale: bullishCluster(4,1,0), institutional: bullishCluster(3,2,0), community: bullishCluster(5,0,0) },
    risks: "Institutional split on sentiment token model",
    signals: "Degen + community aligned; viral potential; Solana pump ecosystem",
    simulatedAt: "2026-03-20T02:31:00Z",
  },
  AIFRUITS: {
    ticker: "AIFRUITS", name: "AI Fruits", chain: "SOL", score: 95, verdict: "HOT",
    probability: 0.762, confidence: 0.762, ev: 643, decision: "LIST", agentsCount: 20,
    clusters: { degen: bullishCluster(5,0,0), whale: bullishCluster(4,1,0), institutional: bullishCluster(3,2,0), community: bullishCluster(5,0,0) },
    risks: "Institutional cautious on AI meme token sustainability",
    signals: "20/20 completed; 0.762 confidence; AI narrative + meme crossover; high volume",
    simulatedAt: "2026-03-20T02:05:00Z",
  },
  FLAG: {
    ticker: "FLAG", name: "False Flag", chain: "SOL", score: 100, verdict: "HOT",
    probability: 0.755, confidence: 0.755, ev: 633, decision: "LIST", agentsCount: 20,
    clusters: { degen: bullishCluster(5,0,0), whale: bullishCluster(4,1,0), institutional: bullishCluster(3,2,0), community: bullishCluster(5,0,0) },
    risks: "Institutional mixed on new project risk profile",
    signals: "20/20 completed; perfect pipeline score 100; strong degen + community",
    simulatedAt: "2026-03-20T02:03:00Z",
  },
  MAX: {
    ticker: "MAX", name: "Max", chain: "SOL", score: 95, verdict: "HOT",
    probability: 0.755, confidence: 0.755, ev: 633, decision: "LIST", agentsCount: 20,
    clusters: { degen: bullishCluster(5,0,0), whale: bullishCluster(4,1,0), institutional: bullishCluster(3,2,0), community: bullishCluster(5,0,0) },
    risks: "Institutional cautious on sustainability",
    signals: "20/20 completed; strong fundamentals; high composite score",
    simulatedAt: "2026-03-20T02:12:00Z",
  },
  SOLANA_TOKEN: {
    ticker: "SOLANA", name: "Solana Meme", chain: "SOL", score: 95, verdict: "HOT",
    probability: 0.755, confidence: 0.755, ev: 633, decision: "LIST", agentsCount: 20,
    clusters: { degen: bullishCluster(5,0,0), whale: bullishCluster(4,1,0), institutional: bullishCluster(3,2,0), community: bullishCluster(5,0,0) },
    risks: "Institutional mixed on brand confusion with Solana L1",
    signals: "20/20 completed; ecosystem narrative; strong momentum",
    simulatedAt: "2026-03-20T02:14:00Z",
  },
  LUCIA: {
    ticker: "LUCIA", name: "Lucia", chain: "SOL", score: 100, verdict: "HOT",
    probability: 0.751, confidence: 0.751, ev: 626, decision: "LIST", agentsCount: 20,
    clusters: { degen: bullishCluster(4,1,0), whale: bullishCluster(5,0,0), institutional: bullishCluster(3,2,0), community: bullishCluster(5,0,0) },
    risks: "Institutional cautious; degen slightly split",
    signals: "20/20 completed; perfect pipeline score 100; whale + community aligned",
    simulatedAt: "2026-03-20T02:04:00Z",
  },
  BANANA: {
    ticker: "BANANA", name: "Banana", chain: "SOL", score: 95, verdict: "HOT",
    probability: 0.751, confidence: 0.751, ev: 626, decision: "LIST", agentsCount: 20,
    clusters: { degen: bullishCluster(5,0,0), whale: bullishCluster(4,1,0), institutional: bullishCluster(3,2,0), community: bullishCluster(4,1,0) },
    risks: "Institutional + community partially split",
    signals: "Strong degen alignment; Banana meme narrative; good liquidity",
    simulatedAt: "2026-03-20T02:21:00Z",
  },
  BANANAS31: {
    ticker: "BANANAS31", name: "Banana For Scale", chain: "BSC", score: 95, verdict: "HOT",
    probability: 0.732, confidence: 0.732, ev: 598, decision: "LIST", agentsCount: 20,
    clusters: { degen: bullishCluster(4,1,0), whale: bullishCluster(4,1,0), institutional: bullishCluster(3,2,0), community: bullishCluster(5,0,0) },
    risks: "Institutional cautious on BSC meme tokens",
    signals: "20/20 completed; BSC ecosystem; community strong; $99M mcap",
    simulatedAt: "2026-03-20T02:10:00Z",
  },
  BALLWARS: {
    ticker: "BALLWARS", name: "Ball Wars", chain: "SOL", score: 95, verdict: "HOT",
    probability: 0.714, confidence: 0.714, ev: 572, decision: "LIST", agentsCount: 20,
    clusters: { degen: bullishCluster(5,0,0), whale: bullishCluster(3,2,0), institutional: bullishCluster(3,2,0), community: bullishCluster(5,0,0) },
    risks: "Whale + institutional mixed on gaming token model",
    signals: "20/20 completed; degen + community fully bullish; gaming narrative",
    simulatedAt: "2026-03-20T02:07:00Z",
  },
  ALIENBABY: {
    ticker: "ALIENBABY", name: "Alien Baby", chain: "SOL", score: 88, verdict: "HOT",
    probability: 0.714, confidence: 0.714, ev: 572, decision: "LIST", agentsCount: 20,
    clusters: { degen: bullishCluster(5,0,0), whale: bullishCluster(3,2,0), institutional: bullishCluster(3,2,0), community: bullishCluster(5,0,0) },
    risks: "Whale + institutional cautious on meme sustainability",
    signals: "Degen + community fully aligned; alien meme family (Aliens ecosystem)",
    simulatedAt: "2026-03-20T02:26:00Z",
  },
  ALIENS: {
    ticker: "ALIENS", name: "Aliens", chain: "SOL", score: 100, verdict: "HOT",
    probability: 0.705, confidence: 0.705, ev: 558, decision: "LIST", agentsCount: 20,
    clusters: { degen: bullishCluster(5,0,0), whale: bullishCluster(3,2,0), institutional: bullishCluster(3,2,0), community: bullishCluster(5,0,0) },
    risks: "Whale + institutional mixed; needs more institutional due diligence",
    signals: "19/20 completed; perfect pipeline score 100; degen + community fully bullish",
    simulatedAt: "2026-03-20T02:00:00Z",
  },
  PIPPIN: {
    ticker: "PIPPIN", name: "Pippin", chain: "SOL", score: 95, verdict: "HOT",
    probability: 0.705, confidence: 0.705, ev: 558, decision: "LIST", agentsCount: 20,
    clusters: { degen: bullishCluster(4,1,0), whale: bullishCluster(4,1,0), institutional: bullishCluster(3,2,0), community: bullishCluster(4,1,0) },
    risks: "Broad slight caution across clusters; needs monitoring",
    signals: "20/20 completed; solid fundamentals; growing ecosystem",
    simulatedAt: "2026-03-20T02:13:00Z",
  },
  // ─── CAUTION tokens ───
  MEMECARD: {
    ticker: "MEMECARD", name: "Meme Card", chain: "SOL", score: 85, verdict: "HOT",
    probability: 0.673, confidence: 0.673, ev: 510, decision: "MONITOR", agentsCount: 20,
    clusters: { degen: bullishCluster(4,1,0), whale: bullishCluster(3,2,0), institutional: bullishCluster(2,3,0), community: bullishCluster(4,1,0) },
    risks: "Institutional cluster split; confidence below PROCEED threshold",
    signals: "BULLISH consensus but 0.673 confidence; needs institutional conviction",
    simulatedAt: "2026-03-20T02:31:00Z",
  },
  CHIBITRUMP: {
    ticker: "CHIBITRUMP", name: "Chibi Trump", chain: "SOL", score: 86, verdict: "HOT",
    probability: 0.673, confidence: 0.673, ev: 510, decision: "MONITOR", agentsCount: 20,
    clusters: { degen: bullishCluster(4,1,0), whale: bullishCluster(3,2,0), institutional: bullishCluster(2,3,0), community: bullishCluster(4,1,0) },
    risks: "Institutional cautious on political meme tokens; regulatory uncertainty",
    signals: "BULLISH but borderline confidence; derivative of TRUMP token",
    simulatedAt: "2026-03-20T02:29:00Z",
  },
  VELO_SOL: {
    ticker: "VELO-SOL", name: "Velodrome (Solana)", chain: "SOL", score: 82, verdict: "QUALIFIED",
    probability: 0.594, confidence: 0.594, ev: 391, decision: "MONITOR", agentsCount: 20,
    clusters: { degen: bullishCluster(3,2,0), whale: bullishCluster(3,2,0), institutional: bullishCluster(2,3,0), community: bullishCluster(3,2,0) },
    risks: "NEUTRAL consensus; split across all clusters; needs catalyst",
    signals: "Moderate interest but no strong conviction from any cluster",
    simulatedAt: "2026-03-20T02:30:00Z",
  },
  TRUMP: {
    ticker: "TRUMP", name: "Official Trump", chain: "SOL", score: 95, verdict: "HOT",
    probability: 0.455, confidence: 0.455, ev: 183, decision: "MONITOR", agentsCount: 20,
    clusters: { degen: bullishCluster(4,1,0), whale: bullishCluster(2,3,0), institutional: bullishCluster(1,3,1), community: bullishCluster(3,2,0) },
    risks: "Institutional bearish on regulatory risk; whale cluster cautious; low confidence despite high score",
    signals: "Degen bullish but institutional resistance; political token volatility; needs monitoring",
    simulatedAt: "2026-03-20T02:15:00Z",
  },
  // ─── QUARANTINED ───
  HIPPO: {
    ticker: "HIPPO", name: "Pygmy Hippo", chain: "SOL", score: 0, verdict: "QUARANTINED",
    probability: 0, confidence: 0, ev: 0, decision: "QUARANTINED", agentsCount: 0,
    clusters: { degen: { bullish: 0, neutral: 0, bearish: 0, sentiment: "QUARANTINED" }, whale: { bullish: 0, neutral: 0, bearish: 0, sentiment: "QUARANTINED" }, institutional: { bullish: 0, neutral: 0, bearish: 0, sentiment: "QUARANTINED" }, community: { bullish: 0, neutral: 0, bearish: 0, sentiment: "QUARANTINED" } },
    risks: "QUARANTINED: suspicious mcap/liquidity ratio. Not verified by CoinGecko.",
    signals: "QUARANTINED — awaiting triple verification",
    simulatedAt: "2026-03-19T02:45:00Z",
  },
};

// Pre-sorted by confidence for dashboard
export const sortedByConfidence = Object.values(simulations)
  .filter(s => s.decision !== "QUARANTINED")
  .sort((a, b) => b.confidence - a.confidence);

export const stats = {
  total: 25,
  proceed: Object.values(simulations).filter(s => s.decision === "LIST").length,
  caution: Object.values(simulations).filter(s => s.decision === "MONITOR").length,
  reject: 0,
  topProspects: ["PIPPIN2", "PEACE", "WKEYDAO2"],
  batchDate: "2026-03-20",
};
