// Animated abstract SVG: nodes + lines + gradient blobs evoking governance & climate.
export function HeroGraphic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      role="img"
      aria-label="Abstract graphic of intersecting nodes and lines"
    >
      <defs>
        <radialGradient id="g1" cx="30%" cy="30%" r="60%">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="g2" cx="70%" cy="70%" r="55%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.28" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="g3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Soft drifting gradient blobs */}
      <g className="animate-drift" style={{ transformOrigin: "30% 30%" }}>
        <circle cx="200" cy="200" r="220" fill="url(#g1)" />
      </g>
      <g className="animate-drift-slow" style={{ transformOrigin: "70% 70%" }}>
        <circle cx="420" cy="420" r="240" fill="url(#g2)" />
      </g>

      {/* Concentric institutional rings */}
      <g fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.18">
        <circle cx="300" cy="300" r="120" />
        <circle cx="300" cy="300" r="170" />
        <circle cx="300" cy="300" r="220" />
        <circle cx="300" cy="300" r="270" />
      </g>

      {/* Network of nodes */}
      <g stroke="hsl(var(--primary))" strokeWidth="0.8" strokeOpacity="0.55">
        <line x1="160" y1="180" x2="300" y2="300" />
        <line x1="300" y1="300" x2="470" y2="220" />
        <line x1="300" y1="300" x2="380" y2="450" />
        <line x1="300" y1="300" x2="180" y2="420" />
        <line x1="160" y1="180" x2="470" y2="220" />
        <line x1="180" y1="420" x2="380" y2="450" />
        <line x1="160" y1="180" x2="180" y2="420" />
        <line x1="470" y1="220" x2="380" y2="450" />
      </g>

      {/* Accent vector — climate/transition arrow */}
      <path
        d="M 80 480 Q 220 380 300 300 T 520 140"
        fill="none"
        stroke="url(#g3)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Nodes */}
      <g>
        {[
          [160, 180, 7],
          [470, 220, 6],
          [380, 450, 6],
          [180, 420, 5],
          [300, 300, 11],
        ].map(([cx, cy, r], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={Number(r) + 6} fill="hsl(var(--background))" />
            <circle cx={cx} cy={cy} r={r} fill="hsl(var(--primary))" />
            {i === 4 && <circle cx={cx} cy={cy} r={4} fill="hsl(var(--accent))" />}
          </g>
        ))}
      </g>

      {/* Editorial label */}
      <g fontFamily="Inter, sans-serif" fill="hsl(var(--muted-foreground))" fontSize="9" letterSpacing="3">
        <text x="300" y="558" textAnchor="middle">ESTADO · POSITIVO · GOBERNANZA · TRANSICIÓN</text>
      </g>
    </svg>
  );
}