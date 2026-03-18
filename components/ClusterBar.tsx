interface ClusterBarProps {
  name: string;
  emoji: string;
  bullish: number;
  neutral: number;
  bearish: number;
  sentiment: string;
}

export default function ClusterBar({
  name,
  emoji,
  bullish,
  neutral,
  bearish,
  sentiment,
}: ClusterBarProps) {
  const total = bullish + neutral + bearish;
  const bullPct = total > 0 ? (bullish / total) * 100 : 0;
  const neutPct = total > 0 ? (neutral / total) * 100 : 0;
  const bearPct = total > 0 ? (bearish / total) * 100 : 0;

  const sentimentColor =
    sentiment === "BULLISH"
      ? "#00ff88"
      : sentiment === "BEARISH"
        ? "#ff4444"
        : "#ffff00";

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span
          className="text-sm"
          style={{ color: "#e0e0e0", fontFamily: "var(--font-geist-mono), monospace" }}
        >
          {emoji} {name}
        </span>
        <span
          className="text-xs font-bold"
          style={{ color: sentimentColor, fontFamily: "var(--font-geist-mono), monospace" }}
        >
          {sentiment}
        </span>
      </div>
      <div
        className="flex h-4 w-full overflow-hidden rounded"
        style={{ backgroundColor: "#1a1a2e" }}
      >
        {bullPct > 0 && (
          <div
            className="flex items-center justify-center text-xs font-bold"
            style={{
              width: `${bullPct}%`,
              backgroundColor: "#00ff88",
              color: "#0a0a0f",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            {bullish}
          </div>
        )}
        {neutPct > 0 && (
          <div
            className="flex items-center justify-center text-xs font-bold"
            style={{
              width: `${neutPct}%`,
              backgroundColor: "#ffff00",
              color: "#0a0a0f",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            {neutral}
          </div>
        )}
        {bearPct > 0 && (
          <div
            className="flex items-center justify-center text-xs font-bold"
            style={{
              width: `${bearPct}%`,
              backgroundColor: "#ff4444",
              color: "#0a0a0f",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            {bearish}
          </div>
        )}
      </div>
      <div
        className="flex justify-between text-xs mt-1"
        style={{ color: "#888", fontFamily: "var(--font-geist-mono), monospace" }}
      >
        <span style={{ color: "#00ff88" }}>Bullish: {bullish}</span>
        <span style={{ color: "#ffff00" }}>Neutral: {neutral}</span>
        <span style={{ color: "#ff4444" }}>Bearish: {bearish}</span>
      </div>
    </div>
  );
}
