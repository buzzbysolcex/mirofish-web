'use client';

const fishColors = [
  { color: '#ff0066', label: 'degen', scale: 1 },
  { color: '#00ff88', label: 'whale', scale: 1.3 },
  { color: '#00ffff', label: 'institutional', scale: 1 },
  { color: '#ffff00', label: 'community', scale: 0.8 },
];

// Seeded pseudo-random for consistent SSR/client rendering
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const fish = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  ...fishColors[Math.floor(i / 5)],
  top: 15 + seededRandom(i * 7 + 1) * 70,
  delay: seededRandom(i * 7 + 2) * -20,
  duration: 18 + seededRandom(i * 7 + 3) * 14,
  yAmplitude: 8 + seededRandom(i * 7 + 4) * 20,
  yDuration: 3 + seededRandom(i * 7 + 5) * 4,
  rotateMax: 5 + seededRandom(i * 7 + 6) * 10,
  direction: i % 3 === 0 ? 'rtl' : 'ltr',
}));

export default function SwarmHero() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: '300px' }}>
      <style>{`
        @keyframes swimRight {
          0% { transform: translateX(-10%); }
          100% { transform: translateX(110vw); }
        }
        @keyframes swimLeft {
          0% { transform: translateX(110vw); }
          100% { transform: translateX(-10%); }
        }
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(var(--y-amp)); }
        }
        @keyframes fishRotate {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(var(--rot-max)); }
          75% { transform: rotate(calc(var(--rot-max) * -1)); }
        }
        @media (max-width: 768px) {
          .swarm-container { height: 200px !important; }
        }
      `}</style>
      <div className="swarm-container absolute inset-0" style={{ height: '100%' }}>
        {fish.map((f) => (
          <div
            key={f.id}
            className="absolute"
            style={{
              top: `${f.top}%`,
              left: 0,
              animation: `${f.direction === 'ltr' ? 'swimRight' : 'swimLeft'} ${f.duration}s linear ${f.delay}s infinite`,
            }}
          >
            <div
              style={{
                ['--y-amp' as string]: `${f.yAmplitude}px`,
                animation: `bob ${f.yDuration}s ease-in-out infinite`,
              }}
            >
              <div
                style={{
                  ['--rot-max' as string]: `${f.rotateMax}deg`,
                  animation: `fishRotate ${f.yDuration * 1.5}s ease-in-out infinite`,
                }}
              >
                <svg
                  width={24 * f.scale}
                  height={12 * f.scale}
                  viewBox="0 0 24 12"
                  fill={f.color}
                  style={{
                    filter: `drop-shadow(0 0 6px ${f.color})`,
                    transform: f.direction === 'rtl' ? 'scaleX(-1)' : undefined,
                  }}
                >
                  <path d="M0,6 Q4,0 12,1 Q18,2 22,6 Q18,10 12,11 Q4,12 0,6 Z" />
                  <path d="M22,6 L24,4 L24,8 Z" />
                  <circle cx="6" cy="5" r="1" fill="#0a0a0f" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
