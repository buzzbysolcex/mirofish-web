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

export const simulations: Record<string, SimulationResult> = {
  EURC: {
    ticker: "EURC",
    name: "Euro Coin",
    chain: "SOL",
    score: 90,
    verdict: "HOT",
    probability: 0.8,
    confidence: 0.5,
    ev: 700,
    decision: "LIST",
    agentsCount: 20,
    clusters: {
      degen: { bullish: 0, neutral: 5, bearish: 0, sentiment: "MIXED" },
      whale: { bullish: 5, neutral: 0, bearish: 0, sentiment: "BULLISH" },
      institutional: {
        bullish: 5,
        neutral: 0,
        bearish: 0,
        sentiment: "BULLISH",
      },
      community: { bullish: 0, neutral: 5, bearish: 0, sentiment: "MIXED" },
    },
    risks: "degen cluster split; community cluster split",
    signals:
      "whale cluster aligned bullish; institutional cluster aligned bullish",
    simulatedAt: "2026-03-18T03:15:00Z",
  },
  BANANA: {
    ticker: "BANANA",
    name: "Banana Gun",
    chain: "SOL",
    score: 95,
    verdict: "HOT",
    probability: 0.8,
    confidence: 0.5,
    ev: 700,
    decision: "LIST",
    agentsCount: 20,
    clusters: {
      degen: { bullish: 5, neutral: 0, bearish: 0, sentiment: "BULLISH" },
      whale: { bullish: 5, neutral: 0, bearish: 0, sentiment: "BULLISH" },
      institutional: {
        bullish: 5,
        neutral: 0,
        bearish: 0,
        sentiment: "BULLISH",
      },
      community: { bullish: 5, neutral: 0, bearish: 0, sentiment: "BULLISH" },
    },
    risks: "none identified",
    signals: "full consensus bullish across all clusters",
    simulatedAt: "2026-03-18T03:16:00Z",
  },
  TRUMP: {
    ticker: "TRUMP",
    name: "Official Trump",
    chain: "SOL",
    score: 95,
    verdict: "HOT",
    probability: 0.8,
    confidence: 0.5,
    ev: 700,
    decision: "LIST",
    agentsCount: 20,
    clusters: {
      degen: { bullish: 5, neutral: 0, bearish: 0, sentiment: "BULLISH" },
      whale: { bullish: 5, neutral: 0, bearish: 0, sentiment: "BULLISH" },
      institutional: {
        bullish: 0,
        neutral: 5,
        bearish: 0,
        sentiment: "MIXED",
      },
      community: { bullish: 5, neutral: 0, bearish: 0, sentiment: "BULLISH" },
    },
    risks: "institutional cluster mixed on regulatory",
    signals: "degen + whale + community aligned bullish",
    simulatedAt: "2026-03-18T03:17:00Z",
  },
  WKEYDAO2: {
    ticker: "WKEYDAO2",
    name: "WKeyDAO v2",
    chain: "SOL",
    score: 88,
    verdict: "HOT",
    probability: 0.8,
    confidence: 0.5,
    ev: 700,
    decision: "LIST",
    agentsCount: 20,
    clusters: {
      degen: { bullish: 5, neutral: 0, bearish: 0, sentiment: "BULLISH" },
      whale: { bullish: 0, neutral: 5, bearish: 0, sentiment: "MIXED" },
      institutional: {
        bullish: 5,
        neutral: 0,
        bearish: 0,
        sentiment: "BULLISH",
      },
      community: { bullish: 5, neutral: 0, bearish: 0, sentiment: "BULLISH" },
    },
    risks: "whale cluster mixed",
    signals: "degen + institutional + community bullish",
    simulatedAt: "2026-03-18T03:18:00Z",
  },
  MEMECARD: {
    ticker: "MEMECARD",
    name: "MemeCard",
    chain: "SOL",
    score: 85,
    verdict: "HOT",
    probability: 0.8,
    confidence: 0.5,
    ev: 700,
    decision: "LIST",
    agentsCount: 20,
    clusters: {
      degen: { bullish: 5, neutral: 0, bearish: 0, sentiment: "BULLISH" },
      whale: { bullish: 5, neutral: 0, bearish: 0, sentiment: "BULLISH" },
      institutional: {
        bullish: 0,
        neutral: 5,
        bearish: 0,
        sentiment: "MIXED",
      },
      community: { bullish: 0, neutral: 5, bearish: 0, sentiment: "MIXED" },
    },
    risks: "institutional + community mixed",
    signals: "degen + whale aligned bullish",
    simulatedAt: "2026-03-18T03:19:00Z",
  },
  VELO: {
    ticker: "VELO",
    name: "Velo",
    chain: "SOL",
    score: 75,
    verdict: "QUALIFIED",
    probability: 0.3,
    confidence: 0.5,
    ev: -50,
    decision: "REJECT",
    agentsCount: 20,
    clusters: {
      degen: { bullish: 0, neutral: 0, bearish: 5, sentiment: "BEARISH" },
      whale: { bullish: 0, neutral: 5, bearish: 0, sentiment: "MIXED" },
      institutional: {
        bullish: 0,
        neutral: 5,
        bearish: 0,
        sentiment: "MIXED",
      },
      community: { bullish: 0, neutral: 0, bearish: 5, sentiment: "BEARISH" },
    },
    risks: "degen bearish; community bearish; low probability",
    signals: "none positive",
    simulatedAt: "2026-03-18T03:20:00Z",
  },
  HIPPO: {
    ticker: "HIPPO",
    name: "Pygmy Hippo",
    chain: "SOL",
    score: 0,
    verdict: "QUARANTINED",
    probability: 0,
    confidence: 0,
    ev: 0,
    decision: "QUARANTINED",
    agentsCount: 0,
    clusters: {
      degen: { bullish: 0, neutral: 0, bearish: 0, sentiment: "QUARANTINED" },
      whale: { bullish: 0, neutral: 0, bearish: 0, sentiment: "QUARANTINED" },
      institutional: {
        bullish: 0,
        neutral: 0,
        bearish: 0,
        sentiment: "QUARANTINED",
      },
      community: { bullish: 0, neutral: 0, bearish: 0, sentiment: "QUARANTINED" },
    },
    risks: "QUARANTINED: $424M mcap with $17M liquidity (25:1 ratio) — suspicious low-float inflation. Not verified by CoinGecko cross-reference. Data integrity unconfirmed.",
    signals: "QUARANTINED — awaiting triple verification",
    simulatedAt: "2026-03-19T02:45:00Z",
  },
  MUSK: {
    ticker: "MUSK",
    name: "Musk Coin",
    chain: "SOL",
    score: 55,
    verdict: "WATCH",
    probability: 0.0,
    confidence: 0.5,
    ev: -500,
    decision: "REJECT",
    agentsCount: 20,
    clusters: {
      degen: { bullish: 0, neutral: 0, bearish: 5, sentiment: "BEARISH" },
      whale: { bullish: 0, neutral: 0, bearish: 5, sentiment: "BEARISH" },
      institutional: {
        bullish: 0,
        neutral: 0,
        bearish: 5,
        sentiment: "BEARISH",
      },
      community: { bullish: 0, neutral: 0, bearish: 5, sentiment: "BEARISH" },
    },
    risks: "all clusters bearish; zero buy probability",
    signals: "none",
    simulatedAt: "2026-03-18T03:21:00Z",
  },
};
