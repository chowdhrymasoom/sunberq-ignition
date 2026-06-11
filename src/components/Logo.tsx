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
      width={240}
      height={80}
      className={`h-14 sm:h-16 lg:h-20 w-auto select-none ${className}`}
      draggable={false}
    />
  );
}
