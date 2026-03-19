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
  FLAG: {
    ticker: "FLAG",
    name: "False Flag",
    chain: "SOL",
    score: 100,
    verdict: "HOT",
    probability: 0.63,
    confidence: 0.63,
    ev: 9304,
    decision: "LIST",
    agentsCount: 20,
    clusters: {
      degen: { bullish: 5, neutral: 5, bearish: 0, sentiment: "BULLISH" },
      whale: { bullish: 5, neutral: 5, bearish: 0, sentiment: "BULLISH" },
      institutional: {
        bullish: 0,
        neutral: 5,
        bearish: 0,
        sentiment: "MIXED",
      },
      community: { bullish: 0, neutral: 5, bearish: 0, sentiment: "MIXED" },
    },
    risks: "institutional mixed; new token needs monitoring",
    signals:
      "10/20 bullish; strong degen + whale consensus; score 100",
    simulatedAt: "2026-03-19T00:30:00Z",
  },
  TRUMP: {
    ticker: "TRUMP",
    name: "Official Trump",
    chain: "SOL",
    score: 95,
    verdict: "HOT",
    probability: 0.63,
    confidence: 0.63,
    ev: 9304,
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
    risks: "institutional mixed on regulatory",
    signals: "degen + whale + community bullish; $811M mcap; $82M liquidity",
    simulatedAt: "2026-03-19T00:30:00Z",
  },
  BANANAS31: {
    ticker: "BANANAS31",
    name: "Banana For Scale",
    chain: "BSC",
    score: 95,
    verdict: "HOT",
    probability: 0.63,
    confidence: 0.63,
    ev: 9304,
    decision: "LIST",
    agentsCount: 20,
    clusters: {
      degen: { bullish: 5, neutral: 5, bearish: 0, sentiment: "BULLISH" },
      whale: { bullish: 5, neutral: 0, bearish: 0, sentiment: "BULLISH" },
      institutional: {
        bullish: 0,
        neutral: 5,
        bearish: 0,
        sentiment: "MIXED",
      },
      community: { bullish: 5, neutral: 0, bearish: 0, sentiment: "BULLISH" },
    },
    risks: "institutional mixed",
    signals: "10/20 bullish; $99M mcap; PancakeSwap BSC",
    simulatedAt: "2026-03-19T00:30:00Z",
  },
  VELO: {
    ticker: "VELO",
    name: "Velodrome V2",
    chain: "BSC",
    score: 95,
    verdict: "HOT",
    probability: 0.63,
    confidence: 0.63,
    ev: 9304,
    decision: "LIST",
    agentsCount: 20,
    clusters: {
      degen: { bullish: 5, neutral: 5, bearish: 0, sentiment: "BULLISH" },
      whale: { bullish: 5, neutral: 0, bearish: 0, sentiment: "BULLISH" },
      institutional: {
        bullish: 0,
        neutral: 5,
        bearish: 0,
        sentiment: "MIXED",
      },
      community: { bullish: 5, neutral: 0, bearish: 0, sentiment: "BULLISH" },
    },
    risks: "institutional mixed",
    signals: "10/20 bullish; $80M mcap; PancakeSwap BSC",
    simulatedAt: "2026-03-19T00:30:00Z",
  },
  EURC: {
    ticker: "EURC",
    name: "Euro Coin",
    chain: "SOL",
    score: 90,
    verdict: "HOT",
    probability: 0.63,
    confidence: 0.63,
    ev: 9304,
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
    risks: "degen + community mixed (stablecoin dynamics)",
    signals: "whale + institutional bullish; Circle-backed; $450M mcap",
    simulatedAt: "2026-03-19T00:30:00Z",
  },
  WKEYDAO2: {
    ticker: "WKEYDAO2",
    name: "WebKey DAO 2.0",
    chain: "BSC",
    score: 88,
    verdict: "HOT",
    probability: 0.63,
    confidence: 0.63,
    ev: 9304,
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
    signals: "degen + institutional + community bullish; BSC DeFi",
    simulatedAt: "2026-03-19T00:30:00Z",
  },
  GYN: {
    ticker: "GYN",
    name: "Gensyn",
    chain: "ARB",
    score: 80,
    verdict: "QUALIFIED",
    probability: 0.44,
    confidence: 0.44,
    ev: 6320,
    decision: "LIST",
    agentsCount: 20,
    clusters: {
      degen: { bullish: 0, neutral: 5, bearish: 0, sentiment: "MIXED" },
      whale: { bullish: 0, neutral: 5, bearish: 0, sentiment: "MIXED" },
      institutional: {
        bullish: 0,
        neutral: 5,
        bearish: 0,
        sentiment: "MIXED",
      },
      community: { bullish: 0, neutral: 0, bearish: 5, sentiment: "BEARISH" },
    },
    risks: "community bearish; all other clusters neutral",
    signals: "AI compute narrative; Arbitrum ecosystem; $80 qualified",
    simulatedAt: "2026-03-19T00:30:00Z",
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
    risks: "QUARANTINED: suspicious mcap/liquidity ratio. Not verified by CoinGecko.",
    signals: "QUARANTINED — awaiting triple verification",
    simulatedAt: "2026-03-19T02:45:00Z",
  },
};
