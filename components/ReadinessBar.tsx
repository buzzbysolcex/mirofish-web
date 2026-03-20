export default function ReadinessBar({ label, value }: { label: string; value: number }) {
  const color = value > 70 ? '#00ff88' : value > 40 ? '#ffff00' : '#ff4444';
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span style={{ color: '#888' }}>{label}</span>
        <span style={{ color }}>{value}/100</span>
      </div>
      <div className="h-2 rounded-full" style={{ background: '#1a1a2e' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}
