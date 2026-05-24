import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Sun, Zap, Battery, Gauge, ShieldCheck, Smartphone,
  Wrench, Award, Leaf, Building2, Home, Factory, Sprout, GraduationCap,
  Phone, MapPin, CheckCircle2, Star, Quote,
} from "lucide-react";
import heroImg from "@/assets/hero-solar-farm.jpg";
import aboutImg from "@/assets/about-facility.jpg";
import panelImg from "@/assets/product-panel.jpg";
import inverterImg from "@/assets/product-inverter.jpg";
import batteryImg from "@/assets/product-battery.jpg";
import galleryRooftop from "@/assets/gallery-rooftop.jpg";
import galleryIndustrial from "@/assets/gallery-industrial.jpg";
import galleryAssembly from "@/assets/gallery-assembly.jpg";
import galleryTeam from "@/assets/gallery-team.jpg";
import galleryFarm from "@/assets/gallery-farm.jpg";
import galleryResidential from "@/assets/gallery-residential.jpg";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Reveal } from "@/components/Reveal";
import { EnergyDivider } from "@/components/EnergyDivider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SunBERQ — Powering India with Smarter Solar Energy" },
      { name: "description", content: "Premium solar panels, intelligent inverters and advanced battery storage — engineered in India for residential, commercial and industrial use." },
      { property: "og:title", content: "SunBERQ — Powering India with Smarter Solar Energy" },
      { property: "og:description", content: "High-performance solar panels, smart inverters, and batteries built for the future of energy." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" } as any,
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "SunBERQ",
        url: "/",
        logo: "/favicon.ico",
        description: "Solar panels, inverters and battery solutions for India.",
        address: { "@type": "PostalAddress", addressLocality: "Aligarh", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
      }),
    }],
  }),
  component: Home_,
});

const stats = [
  { label: "MW Installed", value: 120, suffix: "+" },
  { label: "Happy Clients", value: 8500, suffix: "+" },
  { label: "Cities Served", value: 140, suffix: "" },
  { label: "Tonnes CO₂ Saved", value: 95000, suffix: "+" },
];

const features = [
  { icon: Gauge, title: "High Efficiency", desc: "Mono PERC and TOPCon cells delivering industry-leading yield per square metre." },
  { icon: ShieldCheck, title: "Reliable Performance", desc: "Built to perform in Indian heat, dust and monsoon for decades." },
  { icon: Smartphone, title: "Smart Monitoring", desc: "Track generation, savings and battery health from a single mobile app." },
  { icon: Phone, title: "Indian Support", desc: "Pan-India service network with rapid response from local engineers." },
  { icon: Wrench, title: "Durable Engineering", desc: "Aluminium frames, IP68 connectors, and corrosion-resistant hardware." },
  { icon: Zap, title: "Fast Installation", desc: "Standardised mounting systems for installations in days, not weeks." },
  { icon: Award, title: "Long Warranty", desc: "Up to 25-year linear performance warranty on panels." },
  { icon: Leaf, title: "Sustainable Tech", desc: "Lower lifecycle emissions and recyclable materials end-to-end." },
];

const industries = [
  { icon: Home, label: "Residential", desc: "Rooftop systems for homes, villas and apartments." },
  { icon: Building2, label: "Commercial", desc: "Offices, retail, hospitality and warehousing." },
  { icon: Factory, label: "Industrial", desc: "MW-scale plants for manufacturing and processing." },
  { icon: Sprout, label: "Agriculture", desc: "Solar pumps and farm-edge generation." },
  { icon: GraduationCap, label: "Institutions", desc: "Schools, colleges, hospitals and government." },
];

const steps = [
  { n: "01", title: "Consultation", desc: "Understand your load profile and goals." },
  { n: "02", title: "Site Survey", desc: "Engineering visit for shadow & structural study." },
  { n: "03", title: "System Design", desc: "Custom layout, BOM, returns & financing plan." },
  { n: "04", title: "Installation", desc: "Certified crews, safety-first execution." },
  { n: "05", title: "Activation", desc: "Net-metering, commissioning and app setup." },
  { n: "06", title: "Support", desc: "25-year monitoring and on-ground service." },
];

const testimonials = [
  { name: "Anjali Mehra", role: "Homeowner, Pune", text: "Power bill dropped 92% in the first quarter. The SunBERQ app is genuinely useful — I check generation daily.", rating: 5 },
  { name: "Ravi Sharma", role: "Plant Head, Indore", text: "A 600 kWp rooftop commissioned in under five weeks. Clean execution, transparent reporting.", rating: 5 },
  { name: "Dr. Priya Iyer", role: "Director, Education Trust", text: "We power three campuses with SunBERQ. The battery backup keeps labs running through any outage.", rating: 5 },
];

const gallery = [
  { src: galleryRooftop, alt: "Rooftop solar", span: "row-span-2" },
  { src: galleryIndustrial, alt: "Industrial installation", span: "" },
  { src: galleryAssembly, alt: "Battery assembly", span: "" },
  { src: galleryFarm, alt: "Solar farm at sunset", span: "row-span-2" },
  { src: galleryResidential, alt: "Residential rooftop", span: "" },
  { src: galleryTeam, alt: "SunBERQ team", span: "" },
];

function Home_() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-graphite text-graphite-foreground">
        <img
          src={heroImg}
          alt="SunBERQ solar farm at sunrise"
          width={1920}
          height={1080}
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/70 to-graphite/40" />
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-solar opacity-25 blur-3xl animate-sun-pulse" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-dark text-xs font-semibold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              India-engineered renewable energy
            </span>
            <h1 className="mt-6 text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.02] tracking-tight">
              Powering India with{" "}
              <span className="text-gradient-solar">Smarter Solar Energy</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/75 max-w-2xl">
              High-performance solar panels, intelligent inverters, and advanced battery solutions —
              engineered for the future of homes, businesses and industries.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/quote"
                className="group inline-flex items-center gap-2 h-12 px-6 rounded-full bg-gradient-solar text-white font-semibold shadow-glow hover:shadow-elevated transition-all"
              >
                Get Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full glass-dark text-white font-semibold hover:bg-white/15 transition"
              >
                Explore Products
              </Link>
            </div>
          </motion.div>

          {/* Floating metrics */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass-dark rounded-2xl p-4 sm:p-5">
                <div className="text-2xl sm:text-3xl font-display font-bold text-gradient-solar">
                  <AnimatedCounter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-white/70 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <EnergyDivider />

      {/* ABOUT */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="relative">
              <img
                src={aboutImg}
                alt="SunBERQ engineering facility"
                loading="lazy"
                width={1280}
                height={1024}
                className="rounded-3xl shadow-elevated w-full h-auto object-cover aspect-[5/4]"
              />
              <div className="absolute -bottom-6 -right-6 hidden sm:block w-40 h-40 rounded-3xl bg-gradient-solar shadow-glow -z-0 animate-float-y" />
              <div className="absolute -bottom-6 -right-6 hidden sm:flex w-40 h-40 rounded-3xl glass items-center justify-center flex-col text-graphite z-10">
                <div className="text-3xl font-display font-bold">25<span className="text-primary">+</span></div>
                <div className="text-xs font-medium uppercase tracking-wider">Year warranty</div>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <span className="inline-block px-3 py-1 rounded-full bg-accent text-xs font-semibold tracking-widest uppercase text-primary">About SunBERQ</span>
              <h2 className="mt-4 text-3xl sm:text-5xl font-bold leading-tight">
                Indian engineering for a <span className="text-gradient-solar">renewable future</span>
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                SunBERQ designs, sources and installs next-generation solar systems with a single mission —
                make clean energy the smartest choice for every Indian home and business. Our panels are produced
                with Cosmic PV Power, inverters with Energiaa, and batteries are assembled at our facility in Aligarh, Uttar Pradesh.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Renewable energy vision led by Indian engineering",
                  "Battery assembly facility in Aligarh, UP",
                  "Quality-focused supply chain and white-label partnerships",
                  "Designed for reliability across the Indian climate",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 text-primary font-semibold group"
              >
                Read our story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-accent text-xs font-semibold tracking-widest uppercase text-primary">Products</span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-bold leading-tight">A complete solar stack, engineered to work as one.</h2>
            <p className="mt-4 text-muted-foreground">Panels, inverters and batteries — designed together for maximum yield, intelligence and lifespan.</p>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { icon: Sun, title: "Solar Panels", img: panelImg, specs: ["Mono PERC / TOPCon", "Up to 22.5% efficiency", "Bifacial options"], desc: "Premium mono and bifacial modules with strong low-light performance." },
              { icon: Zap, title: "Smart Inverters", img: inverterImg, specs: ["1–250 kW range", "App monitoring", "Hybrid & on-grid"], desc: "Residential, commercial and hybrid inverters with real-time monitoring." },
              { icon: Battery, title: "Battery Storage", img: batteryImg, specs: ["LFP chemistry", "Assembled in Aligarh", "10-year design life"], desc: "Safe, modular lithium storage built for Indian conditions." },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <article className="group h-full rounded-3xl bg-card shadow-soft hover:shadow-elevated transition-all overflow-hidden border border-border/60">
                  <div className="relative aspect-[5/4] overflow-hidden bg-graphite">
                    <img src={p.img} alt={p.title} loading="lazy" width={1024} height={820} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 inline-flex items-center justify-center w-11 h-11 rounded-2xl glass">
                      <p.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                    <ul className="mt-4 space-y-1.5">
                      {p.specs.map((s) => (
                        <li key={s} className="flex gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {s}
                        </li>
                      ))}
                    </ul>
                    <Link to="/products" className="mt-5 inline-flex items-center gap-2 text-primary font-semibold text-sm group/btn">
                      Learn more <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-accent text-xs font-semibold tracking-widest uppercase text-primary">Why SunBERQ</span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-bold">Built for performance. Backed for life.</h2>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 4) * 0.05}>
                <div className="group h-full p-6 rounded-3xl border border-border/60 bg-card hover:bg-gradient-glow hover:border-primary/30 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-solar text-white inline-flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-5 font-bold text-lg">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-20 sm:py-28 bg-graphite text-graphite-foreground relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-solar opacity-20 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full glass-dark text-xs font-semibold tracking-widest uppercase">Industries</span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-bold">Serving every kind of energy need.</h2>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {industries.map((i, idx) => (
              <Reveal key={i.label} delay={idx * 0.06}>
                <div className="group h-full p-6 rounded-3xl glass-dark hover:bg-primary/20 hover:border-primary/40 transition-all cursor-pointer">
                  <i.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  <h3 className="mt-5 font-bold text-lg">{i.label}</h3>
                  <p className="mt-2 text-sm text-white/65">{i.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INSTALLATION PROCESS */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-accent text-xs font-semibold tracking-widest uppercase text-primary">Process</span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-bold">From idea to activation in 6 clear steps.</h2>
          </Reveal>
          <div className="mt-14 relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-energy-flow" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.06}>
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-solar text-white font-display font-bold text-xl flex items-center justify-center shadow-glow">
                      {s.n}
                    </div>
                    <h3 className="mt-5 font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-accent text-xs font-semibold tracking-widest uppercase text-primary">Projects</span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-bold">Real installations. Real impact.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] gap-3 sm:gap-4">
            {gallery.map((g, i) => (
              <Reveal key={i} delay={(i % 4) * 0.05} className={g.span}>
                <div className="group relative w-full h-full overflow-hidden rounded-2xl bg-graphite">
                  <img src={g.src} alt={g.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-transparent opacity-0 group-hover:opacity-100 transition" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition">
                    {g.alt}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-accent text-xs font-semibold tracking-widest uppercase text-primary">Testimonials</span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-bold">Trusted across India.</h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <article className="h-full p-7 rounded-3xl glass shadow-soft hover:shadow-elevated transition-all border border-border/60">
                  <Quote className="w-7 h-7 text-primary opacity-60" />
                  <p className="mt-3 text-foreground/90 leading-relaxed">"{t.text}"</p>
                  <div className="mt-5 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, k) => (
                      <Star key={k} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl p-8 sm:p-14 bg-gradient-graphite text-white shadow-elevated">
              <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-gradient-solar opacity-30 blur-3xl animate-sun-pulse" />
              <div className="relative grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
                    Ready to switch to <span className="text-gradient-solar">smarter solar?</span>
                  </h2>
                  <p className="mt-4 text-white/75 max-w-lg">
                    Get a free, no-obligation quote. Our engineers will design a system tailored to your roof, your load and your goals.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link to="/quote" className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-gradient-solar text-white font-semibold shadow-glow">
                    Request a Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 h-12 px-6 rounded-full glass-dark text-white font-semibold">
                    <MapPin className="w-4 h-4" /> Visit Aligarh facility
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
