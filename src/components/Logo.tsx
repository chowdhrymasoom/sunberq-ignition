import logoDark from "@/assets/sunberq-logo.png";
import logoLight from "@/assets/sunberq-logo-light.png";

export function Logo({
  variant = "dark",
  className = "",
  size = "md",
  showWordmark = true,
}: {
  variant?: "dark" | "light";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showWordmark?: boolean;
}) {
  const src = variant === "light" ? logoLight : logoDark;
  const sizeClass = {
    sm: "h-9",
    md: "h-12 sm:h-14",
    lg: "h-16 sm:h-20",
    xl: "h-24 sm:h-28 lg:h-32",
  }[size];
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={src}
        alt="SunBERQ logo"
        width={240}
        height={80}
        className={`${sizeClass} w-auto select-none`}
        draggable={false}
      />
      {showWordmark && (
        <span
          className="font-display font-extrabold tracking-tight leading-none text-foreground text-[1.35rem] sm:text-2xl"
          aria-hidden="true"
        >
          Sun<span className="text-primary">BERQ</span>
        </span>
      )}
    </div>
  );
}
