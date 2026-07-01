import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Insights" },
  { to: "/dealers", label: "Dealers" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-background/85 backdrop-blur-xl ${
        scrolled ? "border-b border-border/70 shadow-soft" : "border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 sm:h-28 flex items-center justify-between">
        <Link to="/" className="z-50 group" onClick={() => setOpen(false)} aria-label="SunBERQ home">
          <Logo variant="dark" size="lg" showWordmark={false} />
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="px-4 py-2 text-sm font-medium text-foreground/75 hover:text-foreground transition-colors rounded-full"
                activeProps={{ className: "px-4 py-2 text-sm font-semibold text-primary rounded-full" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+910000000000" className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            <Phone className="w-4 h-4" /> +91 00000 00000
          </a>
          <Link
            to="/quote"
            className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 shadow-soft transition-all hover:-translate-y-0.5"
          >
            Free Quote
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden z-50 p-2 -mr-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-background transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="pt-24 px-6 flex flex-col gap-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-2xl font-display font-semibold py-3 border-b border-border"
              activeProps={{ className: "text-2xl font-display font-semibold py-3 border-b border-border text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/quote"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center h-12 px-6 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
