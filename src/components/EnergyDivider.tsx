export function EnergyDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`relative h-16 w-full overflow-hidden ${flip ? "rotate-180" : ""}`}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="energyGrad" x1="0" x2="1">
            <stop offset="0" stopColor="#ff7a00" stopOpacity="0.0" />
            <stop offset="0.5" stopColor="#ff7a00" stopOpacity="0.7" />
            <stop offset="1" stopColor="#f4c542" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill="url(#energyGrad)"
          opacity="0.25"
        />
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40"
          fill="none"
          stroke="url(#energyGrad)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
