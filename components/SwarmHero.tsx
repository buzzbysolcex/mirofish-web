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
                  width={32 * f.scale}
                  height={16 * f.scale}
                  viewBox="0 0 32 16"
                  style={{
                    filter: `drop-shadow(0 0 8px ${f.color})`,
                    transform: f.direction === 'rtl' ? 'scaleX(-1)' : undefined,
                  }}
                >
                  {/* Angular mechanical body */}
                  <polygon points="2,8 8,2 22,3 28,8 22,13 8,14" fill={f.color} fillOpacity="0.15" stroke={f.color} strokeWidth="0.6" />
                  {/* Inner hull plate */}
                  <polygon points="6,8 10,4 20,5 24,8 20,11 10,12" fill={f.color} fillOpacity="0.25" stroke={f.color} strokeWidth="0.3" />
                  {/* Circuit lines along body */}
                  <line x1="8" y1="8" x2="20" y2="8" stroke={f.color} strokeWidth="0.4" strokeOpacity="0.6" />
                  <line x1="12" y1="5" x2="12" y2="11" stroke={f.color} strokeWidth="0.3" strokeOpacity="0.4" />
                  <line x1="17" y1="5" x2="17" y2="11" stroke={f.color} strokeWidth="0.3" strokeOpacity="0.4" />
                  {/* Angular tail fin */}
                  <polygon points="26,8 30,4 32,6 30,8 32,10 30,12" fill={f.color} fillOpacity="0.3" stroke={f.color} strokeWidth="0.5" />
                  {/* Dorsal antenna */}
                  <line x1="14" y1="4" x2="14" y2="1" stroke={f.color} strokeWidth="0.4" strokeOpacity="0.5" />
                  <circle cx="14" cy="1" r="0.6" fill={f.color} fillOpacity="0.8" />
                  {/* Glowing eye */}
                  <circle cx="6" cy="7.5" r="1.4" fill="#0a0a0f" stroke={f.color} strokeWidth="0.5" />
                  <circle cx="6" cy="7.5" r="0.7" fill={f.color} />
                  {/* Pectoral fin strut */}
                  <line x1="10" y1="11" x2="8" y2="14" stroke={f.color} strokeWidth="0.4" strokeOpacity="0.4" />
                  <line x1="14" y1="11" x2="13" y2="14" stroke={f.color} strokeWidth="0.3" strokeOpacity="0.3" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
