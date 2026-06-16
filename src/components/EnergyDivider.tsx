export function EnergyDivider({ flip: _flip = false }: { flip?: boolean }) {
  return (
    <div aria-hidden className="relative w-full">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
