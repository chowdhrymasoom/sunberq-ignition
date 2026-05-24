import logoDark from "@/assets/sunberq-logo.png";
import logoLight from "@/assets/sunberq-logo-light.png";

export function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const src = variant === "light" ? logoLight : logoDark;
  return (
    <img
      src={src}
      alt="SunBERQ"
      width={180}
      height={60}
      className={`h-9 sm:h-10 w-auto select-none ${className}`}
      draggable={false}
    />
  );
}
