'use client';

// Cluster configs — whale biggest, community smallest
const fishGroups = [
  { color: '#ff00ff', light: '#ff66ff', dark: '#990099', label: 'degen', baseSize: 1.1 },
  { color: '#00ff88', light: '#66ffb3', dark: '#009952', label: 'whale', baseSize: 1.5 },
  { color: '#ff00ff', light: '#ff66ff', dark: '#990099', label: 'institutional', baseSize: 1.2 },
  { color: '#ffff00', light: '#ffff66', dark: '#999900', label: 'community', baseSize: 0.85 },
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const fish = Array.from({ length: 20 }, (_, i) => {
  const group = fishGroups[Math.floor(i / 5)];
  const sizeVar = 0.85 + seededRandom(i * 11 + 7) * 0.3;
  return {
    id: i,
    ...group,
    scale: group.baseSize * sizeVar,
    top: 10 + seededRandom(i * 7 + 1) * 75,
    delay: seededRandom(i * 7 + 2) * -25,
    duration: 20 + seededRandom(i * 7 + 3) * 16,
    yAmplitude: 6 + seededRandom(i * 7 + 4) * 18,
    yDuration: 3 + seededRandom(i * 7 + 5) * 4,
    rotateMax: 3 + seededRandom(i * 7 + 6) * 7,
    direction: i % 3 === 0 ? 'rtl' : 'ltr',
  };
});

function DroneFish({ color, light, dark, scale, id }: {
  color: string; light: string; dark: string; scale: number; id: number;
}) {
  const gradId = `grad-${id}`;
  const glowId = `glow-${id}`;
  const w = 56 * scale;
  const h = 24 * scale;

  return (
    <svg width={w} height={h} viewBox="0 0 56 24" fill="none">
      <defs>
        {/* Metallic body gradient — lighter top to darker bottom */}
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={light} stopOpacity="0.45" />
          <stop offset="50%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={dark} stopOpacity="0.2" />
        </linearGradient>
        {/* Eye glow */}
        <radialGradient id={glowId}>
          <stop offset="0%" stopColor={light} stopOpacity="1" />
          <stop offset="60%" stopColor={color} stopOpacity="0.6" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* === SEGMENT 1: Nose/Head (pointed, angular) === */}
      <polygon
        points="1,12 7,5 14,4.5 14,19.5 7,19"
        fill={`url(#${gradId})`}
        stroke={light}
        strokeWidth="0.5"
        strokeOpacity="0.7"
      />
      {/* Head panel line */}
      <line x1="7" y1="6" x2="7" y2="18" stroke={light} strokeWidth="0.3" strokeOpacity="0.35" />

      {/* === SEGMENT 2: Main body (largest section) === */}
      <polygon
        points="14,4 28,3 28,21 14,20"
        fill={`url(#${gradId})`}
        stroke={light}
        strokeWidth="0.5"
        strokeOpacity="0.6"
      />
      {/* Segment join line */}
      <line x1="14" y1="4" x2="14" y2="20" stroke={light} strokeWidth="0.6" strokeOpacity="0.5" />
      {/* Body circuit lines — horizontal */}
      <line x1="15" y1="9" x2="27" y2="9" stroke={color} strokeWidth="0.3" strokeOpacity="0.3" />
      <line x1="15" y1="12" x2="27" y2="12" stroke={color} strokeWidth="0.35" strokeOpacity="0.4" />
      <line x1="15" y1="15" x2="27" y2="15" stroke={color} strokeWidth="0.3" strokeOpacity="0.3" />
      {/* Body circuit lines — vertical ribs */}
      <line x1="19" y1="4" x2="19" y2="20" stroke={color} strokeWidth="0.25" strokeOpacity="0.25" />
      <line x1="24" y1="3.5" x2="24" y2="20.5" stroke={color} strokeWidth="0.25" strokeOpacity="0.25" />
      {/* Panel detail — small rectangle */}
      <rect x="20" y="7" width="3" height="2" rx="0.3" fill="none" stroke={color} strokeWidth="0.3" strokeOpacity="0.4" />
      <rect x="20" y="14" width="3" height="2" rx="0.3" fill="none" stroke={color} strokeWidth="0.3" strokeOpacity="0.35" />

      {/* === SEGMENT 3: Tail section (tapers) === */}
      <polygon
        points="28,3.5 40,6 40,18 28,20.5"
        fill={`url(#${gradId})`}
        stroke={light}
        strokeWidth="0.5"
        strokeOpacity="0.5"
      />
      {/* Segment join line */}
      <line x1="28" y1="3" x2="28" y2="21" stroke={light} strokeWidth="0.6" strokeOpacity="0.5" />
      {/* Tail circuit */}
      <line x1="30" y1="12" x2="39" y2="12" stroke={color} strokeWidth="0.3" strokeOpacity="0.35" />
      <line x1="34" y1="7" x2="34" y2="17" stroke={color} strokeWidth="0.25" strokeOpacity="0.25" />

      {/* === TAIL FIN — angular split fin === */}
      <polygon
        points="40,7 46,2 48,4 42,9"
        fill={dark}
        fillOpacity="0.35"
        stroke={light}
        strokeWidth="0.4"
        strokeOpacity="0.5"
      />
      <polygon
        points="40,17 46,22 48,20 42,15"
        fill={dark}
        fillOpacity="0.35"
        stroke={light}
        strokeWidth="0.4"
        strokeOpacity="0.5"
      />
      {/* Tail center strut */}
      <line x1="40" y1="12" x2="46" y2="12" stroke={light} strokeWidth="0.4" strokeOpacity="0.4" />

      {/* === DORSAL FIN — angular blade on top === */}
      <polygon
        points="18,4 22,0.5 26,3.5"
        fill={dark}
        fillOpacity="0.3"
        stroke={light}
        strokeWidth="0.4"
        strokeOpacity="0.5"
      />
      {/* Dorsal strut */}
      <line x1="22" y1="1" x2="22" y2="4" stroke={color} strokeWidth="0.3" strokeOpacity="0.4" />

      {/* === VENTRAL FIN — small angular fin on bottom === */}
      <polygon
        points="20,20 23,23.5 26,20"
        fill={dark}
        fillOpacity="0.25"
        stroke={light}
        strokeWidth="0.3"
        strokeOpacity="0.4"
      />

      {/* === PECTORAL FINS — small side wings === */}
      <polygon
        points="16,18 13,22 18,21"
        fill={dark}
        fillOpacity="0.25"
        stroke={light}
        strokeWidth="0.3"
        strokeOpacity="0.35"
      />

      {/* === EYE — glowing sensor dot === */}
      <circle cx="6" cy="11" r="2.5" fill={`url(#${glowId})`} />
      <circle cx="6" cy="11" r="1.2" fill={light} />
      <circle cx="6" cy="11" r="0.5" fill="#ffffff" />

      {/* === THRUSTER GLOW at tail === */}
      <circle cx="41" cy="12" r="1" fill={color} fillOpacity="0.4" />
      <circle cx="41" cy="12" r="0.5" fill={light} fillOpacity="0.7" />
    </svg>
  );
}

export default function SwarmHero() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: '320px' }}>
      <style>{`
        @keyframes swimRight {
          0% { transform: translateX(-15%); }
          100% { transform: translateX(115vw); }
        }
        @keyframes swimLeft {
          0% { transform: translateX(115vw); }
          100% { transform: translateX(-15%); }
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
          .swarm-container { height: 220px !important; }
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
                  filter: `drop-shadow(0 0 10px ${f.color}40)`,
                  transform: f.direction === 'rtl' ? 'scaleX(-1)' : undefined,
                }}
              >
                <DroneFish
                  color={f.color}
                  light={f.light}
                  dark={f.dark}
                  scale={f.scale}
                  id={f.id}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
