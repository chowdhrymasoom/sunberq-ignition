import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative bg-graphite text-graphite-foreground mt-24 overflow-hidden">
      <div className="absolute inset-0 bg-sun-glow opacity-30 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-xs">
              Powering India with smarter solar energy. Panels, inverters and batteries engineered for the future.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">Products</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><Link to="/products" className="hover:text-primary transition">Solar Panels</Link></li>
              <li><Link to="/products" className="hover:text-primary transition">Smart Inverters</Link></li>
              <li><Link to="/products" className="hover:text-primary transition">Battery Storage</Link></li>
              <li><Link to="/quote" className="hover:text-primary transition">Request Quote</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><Link to="/about" className="hover:text-primary transition">About SunBERQ</Link></li>
              <li><Link to="/dealers" className="hover:text-primary transition">Become a Dealer</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition">Insights & News</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">Reach us</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" /> Battery Assembly Unit, Aligarh, Uttar Pradesh, India</li>
              <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 text-primary shrink-0" /> +91 00000 00000</li>
              <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 text-primary shrink-0" /> hello@sunberq.in</li>
            </ul>
            <div className="mt-5 flex gap-3">
              {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="w-9 h-9 rounded-full glass-dark inline-flex items-center justify-center hover:bg-primary hover:text-white transition">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-white/50">
          <p>© {new Date().getFullYear()} SunBERQ Energy Pvt. Ltd. All rights reserved.</p>
          <p>Made in India · Engineered for the world</p>
        </div>
      </div>
    </footer>
  );
}
