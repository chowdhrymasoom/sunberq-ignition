export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-9 h-9">
        <div className="absolute inset-0 rounded-full bg-gradient-solar shadow-glow animate-sun-pulse" />
        <div className="absolute inset-[6px] rounded-full bg-graphite" />
        <div className="absolute inset-[10px] rounded-full bg-gradient-solar" />
      </div>
      <span className="font-display font-bold text-xl tracking-tight">
        Sun<span className="text-gradient-solar">BERQ</span>
      </span>
    </div>
  );
}
