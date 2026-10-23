import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Sun, Zap, Battery, ShieldCheck, Smartphone,
  Leaf, Home as HomeIcon, Building2, Factory, Sprout, GraduationCap,
  CheckCircle2, Star, Quote, IndianRupee, Phone, Calculator,
} from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/hero-rooftop-light.jpg";
import aboutImg from "@/assets/about-facility.jpg";
import panelImg from "@/assets/product-panel.jpg";
import inverterImg from "@/assets/product-inverter.jpg";
import batteryImg from "@/assets/product-battery.jpg";
import galleryRooftop from "@/assets/gallery-rooftop.jpg";
import galleryIndustrial from "@/assets/gallery-industrial.jpg";
import galleryAssembly from "@/assets/gallery-assembly.jpg";
import galleryFarm from "@/assets/gallery-farm.jpg";
import galleryResidential from "@/assets/gallery-residential.jpg";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SunBERQ — Rooftop Solar that Pays for Itself" },
      { name: "description", content: "Premium rooftop solar systems for Indian homes and businesses. Cut your power bill by up to 90%, claim full PM Surya Ghar subsidy, 25-year warranty." },
      { property: "og:title", content: "SunBERQ — Rooftop Solar that Pays for Itself" },
      { property: "og:description", content: "Premium solar panels, smart inverters and batteries. Engineered in India." },
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
        address: { "@type": "PostalAddress", streetAddress: "DPT 808B, F 79-80, 8th Floor, DLF Prime Tower, Okhla", addressLocality: "New Delhi", addressRegion: "Delhi", postalCode: "110020", addressCountry: "IN" },
      }),
    }],
  }),
  component: Home_,
});

const stats = [
  { label: "Module Power Range", value: 650, suffix: " Wp" },
  { label: "Panel Efficiency", value: 23, suffix: "%+" },
  { label: "Battery Cycle Life", value: 6000, suffix: "" },
  { label: "Inverter MPPT Efficiency", value: 99, suffix: "%" },
];

const benefits = [
  { icon: Zap, title: "High-efficiency PV modules", desc: "Mono PERC, N-Type TOPCon and bifacial designs delivering ~23%+ efficiency across rooftops, factories and ground-mount plants." },
  { icon: ShieldCheck, title: "Engineered for harsh conditions", desc: "IP68 junction boxes, low-iron tempered glass and corrosion-resistant frames rated for −40°C to +85°C operation." },
  { icon: Battery, title: "LFP & Sodium-Ion storage", desc: "LiFePO4 packs with ~6,000-cycle life and emerging Sodium-Ion chemistry — modular, BMS-protected, hybrid-inverter ready." },
  { icon: Smartphone, title: "Smart inverter intelligence", desc: ">99% MPPT, anti-islanding, grid sync and Wi-Fi / RS485 / GSM remote monitoring on every system." },
];

const industries = [
  { icon: HomeIcon, label: "Residential", desc: "Rooftop systems for homes, villas and apartments." },
  { icon: Building2, label: "Commercial", desc: "Offices, retail, hospitality and warehousing." },
  { icon: Factory, label: "Industrial", desc: "MW-scale plants for manufacturing and processing." },
  { icon: Sprout, label: "Agriculture", desc: "Solar pumps and farm-edge generation." },
  { icon: GraduationCap, label: "Institutions", desc: "Schools, colleges, hospitals and government." },
];

const steps = [
  { n: "01", title: "Free site survey", desc: "Engineering visit for shadow & structural study." },
  { n: "02", title: "Custom design", desc: "Tailored layout, BOM, returns & financing plan." },
  { n: "03", title: "Installation", desc: "Certified crews, safety-first execution in days." },
  { n: "04", title: "Activation & support", desc: "Net-metering, app setup and 25-year monitoring." },
];

const testimonials = [
  { name: "C&I Project Lead · Pune", role: "600 kWp rooftop", text: "SunBERQ's TOPCon modules and hybrid inverter stack delivered the generation numbers they promised — clean execution, transparent reporting.", rating: 5 },
  { name: "Plant Head · Indore", role: "Manufacturing facility", text: "Battery backup keeps our critical loads running through every grid event. The LFP packs have held capacity beautifully.", rating: 5 },
  { name: "Director · Education Trust", role: "Multi-campus install", text: "Three campuses powered by SunBERQ. App-based monitoring gives us live visibility on generation across sites.", rating: 5 },
];

const gallery = [
  { src: galleryRooftop, alt: "Rooftop solar installation" },
  { src: galleryIndustrial, alt: "Industrial solar plant" },
  { src: galleryAssembly, alt: "Battery assembly line" },
  { src: galleryResidential, alt: "Residential rooftop" },
  { src: galleryFarm, alt: "Utility scale solar farm" },
];

const faqs = [
  { q: "What module technologies does SunBERQ use?", a: "Advanced Mono PERC and N-Type TOPCon cells, plus bifacial modules that capture reflected sunlight from both sides. Power range 500–650 Wp with ~23%+ efficiency and 1500 V DC system voltage." },
  { q: "Which battery chemistries are available?", a: "Lithium Iron Phosphate (LiFePO4 / LFP) packs with ~6,000-cycle life, high thermal safety and modular scalability — plus next-generation Sodium-Ion systems as a future-ready alternative." },
  { q: "What inverter types do you offer?", a: "On-grid, hybrid and off-grid inverters with >99% MPPT efficiency, up to 97–98% peak efficiency, DC input 100–1000 V, single or three phase output, PF ≥0.99 and <3% THD." },
  { q: "How are systems monitored?", a: "Every inverter ships with remote monitoring options (Wi-Fi, RS485 or GSM), intelligent MPPT tracking, anti-islanding, over-voltage / over-current / short-circuit protection and DSP-based fast response control." },
  { q: "What are typical applications?", a: "Industrial rooftops, manufacturing units, logistics warehouses, commercial buildings, large-scale ground-mount plants, residential rooftops and hybrid solar + battery installations." },
];

// PM Surya Ghar subsidy table (residential, kW → ₹)
function subsidyFor(kW: number) {
  if (kW <= 0) return 0;
  if (kW < 2) return 30000;
  if (kW < 3) return 60000;
  return 78000;
}

function Home_() {
  const [bill, setBill] = useState("");
  const [estimate, setEstimate] = useState<null | {
    systemKw: number;
    cost: number;
    subsidy: number;
    net: number;
    monthlySavings: number;
    paybackYears: number;
    co2: number;
  }>(null);

  function calculate(e: React.FormEvent) {
    e.preventDefault();
    const monthlyBill = Number(bill.replace(/[^0-9.]/g, ""));
    if (!monthlyBill || monthlyBill < 500) {
      setEstimate(null);
      return;
    }
    const tariff = 8; // ₹/kWh average
    const monthlyKwh = monthlyBill / tariff;
    const dailyKwh = monthlyKwh / 30;
    const sunHours = 4.5;
    const systemKw = Math.max(1, Math.round((dailyKwh / sunHours) * 2) / 2); // 0.5 kW steps
    const cost = systemKw * 55000;
    const subsidy = subsidyFor(systemKw);
    const net = Math.max(0, cost - subsidy);
    const monthlySavings = Math.round(monthlyBill * 0.9);
    const paybackYears = Math.max(2, +(net / (monthlySavings * 12)).toFixed(1));
    const co2 = +((systemKw * 1200 * 0.82) / 1000).toFixed(2); // tonnes/year
    setEstimate({ systemKw, cost, subsidy, net, monthlySavings, paybackYears, co2 });
    setTimeout(() => {
      document.getElementById("estimate-result")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }

  return (
    <>
      {/* HERO — light split layout */}
      <section className="relative pt-32 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-sun-glow opacity-60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-semibold tracking-wider uppercase text-foreground/70 shadow-soft">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                PM Surya Ghar approved · Pan-India service
              </div>
              <h1 className="mt-6 text-[2.5rem] sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight">
                Rooftop solar that{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-primary">pays for itself.</span>
                  <span className="absolute left-0 bottom-1.5 w-full h-3 bg-sunlight/60 rounded-full -z-0" />
                </span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
                Premium panels, smart inverters and batteries — engineered in India. Cut your power bill by up to 90% and claim the full PM Surya Ghar subsidy.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/quote"
                  className="group inline-flex items-center gap-2 h-12 px-6 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:shadow-elevated hover:-translate-y-0.5 transition-all"
                >
                  Get Free Site Survey <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-card border border-border text-foreground font-semibold hover:border-primary hover:text-primary transition"
                >
                  <Calculator className="w-4 h-4" /> Check Subsidy
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">4.9 / 5</span>
                  <span className="text-sm text-muted-foreground">· 8,500+ installs</span>
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" /> 25-year warranty
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary" /> Made in India
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative">
                <img
                  src={heroImg}
                  alt="Modern Indian home with rooftop solar panels"
                  width={1536}
                  height={1280}
                  fetchPriority="high"
                  className="w-full aspect-[4/5] object-cover rounded-[2rem] shadow-elevated"
                />
                <div className="absolute -bottom-5 -left-5 bg-card border border-border rounded-2xl px-5 py-4 shadow-elevated">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Avg. monthly savings</div>
                  <div className="mt-1 text-2xl font-bold text-primary">₹ 12,400</div>
                </div>
                <div className="absolute -top-5 -right-5 bg-card border border-border rounded-2xl px-5 py-4 shadow-elevated">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-primary/10 inline-flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">CO₂ saved / yr</div>
                      <div className="text-sm font-bold">4.2 tonnes</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust ticker / stats strip */}
          <div className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {stats.map((s) => (
              <div key={s.label} className="bg-card p-5 sm:p-6">
                <div className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                  <AnimatedCounter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">Why SunBERQ</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-bold leading-tight tracking-tight">
              Premium solar, without the premium hassle.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Engineered components, transparent pricing, paperwork handled — and a service team that actually picks up the phone.
            </p>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <div className="group h-full p-7 rounded-3xl bg-card border border-border hover:border-primary/40 hover:shadow-soft transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary inline-flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <b.icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-5 font-bold text-lg">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SAVINGS CALCULATOR STRIP */}
      <section className="py-14" id="estimator">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[2rem] bg-surface-cream border border-border p-8 sm:p-12">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">Instant solar estimate</div>
                  <h3 className="mt-3 text-2xl sm:text-4xl font-bold leading-tight">
                    See your system size, subsidy &amp; payback — instantly.
                  </h3>
                  <p className="mt-3 text-muted-foreground">Enter your average monthly electricity bill. We calculate the right system size, PM Surya Ghar subsidy and payback right here — no form filling, no waiting.</p>
                </div>
                <form
                  className="lg:col-span-5 flex flex-col sm:flex-row gap-3 bg-card border border-border rounded-2xl p-3 shadow-soft"
                  onSubmit={calculate}
                >
                  <div className="flex-1 flex items-center gap-2 px-3">
                    <IndianRupee className="w-4 h-4 text-muted-foreground" />
                    <input
                      value={bill}
                      onChange={(e) => setBill(e.target.value)}
                      placeholder="Monthly bill (₹)"
                      inputMode="numeric"
                      className="w-full h-11 bg-transparent outline-none text-base"
                    />
                  </div>
                  <button type="submit" className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold hover:-translate-y-0.5 transition-transform shrink-0">
                    Calculate <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {estimate && (
                <div id="estimate-result" className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { k: "Recommended system", v: `${estimate.systemKw} kW`, sub: "Mono PERC / TOPCon" },
                    { k: "Indicative cost", v: `₹ ${estimate.cost.toLocaleString("en-IN")}`, sub: "Turnkey, installed" },
                    { k: "PM Surya Ghar subsidy", v: `₹ ${estimate.subsidy.toLocaleString("en-IN")}`, sub: "Direct benefit transfer" },
                    { k: "Your net investment", v: `₹ ${estimate.net.toLocaleString("en-IN")}`, sub: "After subsidy" },
                    { k: "Monthly savings", v: `₹ ${estimate.monthlySavings.toLocaleString("en-IN")}`, sub: "≈ 90% of your current bill" },
                    { k: "Payback period", v: `${estimate.paybackYears} yrs`, sub: "Then 20+ years near-free power" },
                    { k: "CO₂ saved / year", v: `${estimate.co2} t`, sub: "Equivalent of ~50 trees" },
                    { k: "Next step", v: "Free site survey", sub: "Engineer visit in 48 hours", cta: true },
                  ].map((card) => (
                    <div
                      key={card.k}
                      className={`p-5 rounded-2xl border ${
                        card.cta
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border"
                      }`}
                    >
                      <div className={`text-[11px] font-semibold tracking-wider uppercase ${card.cta ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        {card.k}
                      </div>
                      <div className={`mt-2 text-2xl font-display font-bold ${card.cta ? "" : "text-foreground"}`}>{card.v}</div>
                      <div className={`mt-1 text-xs ${card.cta ? "text-primary-foreground/85" : "text-muted-foreground"}`}>{card.sub}</div>
                      {card.cta && (
                        <Link
                          to="/quote"
                          className="mt-4 inline-flex items-center gap-2 h-9 px-4 rounded-full bg-card text-foreground font-semibold text-sm shadow-soft"
                        >
                          Book survey <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  ))}
                  <p className="md:col-span-2 lg:col-span-4 text-xs text-muted-foreground">
                    * Indicative figures based on ₹8/kWh average tariff and 4.5 peak sun-hours. Final design, cost and subsidy depend on site survey, sanctioned load and discom policy.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">Products</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-bold leading-tight tracking-tight">
              One stack. Total solar.
            </h2>
            <p className="mt-4 text-muted-foreground">Panels, inverters and batteries — designed together for maximum yield, intelligence and lifespan.</p>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { icon: Sun, title: "Solar Panels", img: panelImg, specs: ["Mono PERC & TOPCon", "500–650 Wp · ~23%+ efficiency", "25-year linear warranty"], desc: "Premium high-efficiency modules with strong low-light performance." },
              { icon: Zap, title: "Smart Inverters", img: inverterImg, specs: ["On-grid · Hybrid · Off-grid", ">99% MPPT efficiency", "Wi-Fi · RS485 · GSM monitoring"], desc: "Residential to industrial inverters with real-time app monitoring." },
              { icon: Battery, title: "Battery Storage", img: batteryImg, specs: ["LFP & Sodium-Ion chemistry", "~6,000 cycle life · BMS protected", "Assembled in Aligarh, UP"], desc: "Safe, modular lithium storage built for Indian conditions." },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="group h-full rounded-3xl bg-card border border-border hover:border-primary/40 hover:shadow-elevated transition-all overflow-hidden">
                  <div className="relative aspect-[5/4] overflow-hidden bg-surface">
                    <img src={p.img} alt={p.title} loading="lazy" width={1024} height={820} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-card/95 backdrop-blur border border-border shadow-soft">
                      <p.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-bold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                    <ul className="mt-5 space-y-2">
                      {p.specs.map((s) => (
                        <li key={s} className="flex gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {s}
                        </li>
                      ))}
                    </ul>
                    <Link to="/products" className="mt-6 inline-flex items-center gap-2 text-primary font-semibold text-sm group/btn">
                      Learn more <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">How it works</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-bold leading-tight tracking-tight">From survey to switch-on in weeks.</h2>
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="relative p-7 rounded-3xl bg-card border border-border h-full">
                  <div className="text-4xl font-display font-bold text-primary/30">{s.n}</div>
                  <h3 className="mt-3 font-bold text-lg">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">Who we serve</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-bold leading-tight tracking-tight">Built for every kind of energy need.</h2>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {industries.map((i, idx) => (
              <Reveal key={i.label} delay={idx * 0.06}>
                <div className="group h-full p-6 rounded-3xl bg-card border border-border hover:border-primary/40 hover:-translate-y-1 transition-all cursor-pointer">
                  <i.icon className="w-7 h-7 text-primary" />
                  <h3 className="mt-5 font-bold text-lg">{i.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="relative">
              <img
                src={aboutImg}
                alt="SunBERQ engineering facility in Aligarh"
                loading="lazy"
                width={1280}
                height={1024}
                className="rounded-[2rem] shadow-elevated w-full h-auto object-cover aspect-[5/4]"
              />
              <div className="absolute -bottom-6 -right-6 hidden sm:block bg-card border border-border rounded-2xl px-6 py-5 shadow-elevated">
                <div className="text-3xl font-display font-bold">25<span className="text-primary">+</span></div>
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Year warranty</div>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">About SunBERQ</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-bold leading-tight tracking-tight">
              Indian engineering for a renewable future.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              SunBERQ is a renewable energy manufacturing company building India's energy-secure future through advanced Solar PV technology, intelligent energy storage and efficient power solutions — designed for industries, businesses and energy providers at scale.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "High-efficiency Mono PERC, N-Type TOPCon & bifacial PV modules",
                "Lithium (LFP) and emerging Sodium-Ion battery storage systems",
                "On-grid, hybrid and off-grid smart inverters with remote monitoring",
                "Battery assembly facility in Aligarh, Uttar Pradesh",
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
      </section>

      {/* GALLERY — bento */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">Projects</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-bold leading-tight tracking-tight">Real installations. Real impact.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-6 gap-3 sm:gap-4 auto-rows-[140px] sm:auto-rows-[200px]">
            <GalleryTile className="col-span-6 sm:col-span-4 row-span-2" img={gallery[0]} />
            <GalleryTile className="col-span-3 sm:col-span-2" img={gallery[1]} />
            <GalleryTile className="col-span-3 sm:col-span-2" img={gallery[2]} />
            <GalleryTile className="col-span-3 sm:col-span-3" img={gallery[3]} />
            <GalleryTile className="col-span-3 sm:col-span-3" img={gallery[4]} />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">Loved across India</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-bold leading-tight tracking-tight">Homeowners, factories and campuses — trust SunBERQ.</h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <article className="h-full p-7 rounded-3xl bg-card border border-border hover:shadow-soft transition-all">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, k) => (
                      <Star key={k} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <Quote className="mt-4 w-6 h-6 text-primary/40" />
                  <p className="mt-3 text-foreground/90 leading-relaxed">"{t.text}"</p>
                  <div className="mt-6 pt-5 border-t border-border">
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">FAQ</span>
              <span className="h-px w-8 bg-primary" />
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-bold leading-tight tracking-tight">Questions, answered.</h2>
          </Reveal>
          <Reveal className="mt-12">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-card border border-border rounded-2xl px-5 sm:px-6 data-[state=open]:border-primary/40 transition-colors"
                >
                  <AccordionTrigger className="text-left text-base sm:text-lg font-semibold hover:no-underline py-5">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA — orange band */}
      <section className="pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-primary text-primary-foreground p-10 sm:p-16">
              <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-sunlight/40 blur-3xl" />
              <div className="relative grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl sm:text-5xl font-bold leading-tight tracking-tight">
                    Ready to switch to smarter solar?
                  </h2>
                  <p className="mt-4 text-primary-foreground/85 max-w-lg">
                    Free site survey. Transparent pricing. Subsidy paperwork handled by us.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link to="/quote" className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-card text-foreground font-semibold shadow-soft hover:-translate-y-0.5 transition-transform">
                    Get Free Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="tel:+919719358578" className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-primary-foreground/40 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition">
                    <Phone className="w-4 h-4" /> +91 97193 58578
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function GalleryTile({ img, className = "" }: { img: { src: string; alt: string }; className?: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-card border border-border ${className}`}>
      <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition">
        <div className="text-sm font-semibold text-white">{img.alt}</div>
      </div>
    </div>
  );
}
