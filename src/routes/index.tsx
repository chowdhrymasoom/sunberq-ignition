import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Sun, Zap, Battery, ShieldCheck, Smartphone,
  Wrench, Leaf, Home as HomeIcon, Building2, Factory, Sprout, GraduationCap,
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

const benefits = [
  { icon: IndianRupee, title: "Up to 90% bill savings", desc: "Most homes break even in 3–4 years, then enjoy 21+ years of nearly-free power." },
  { icon: ShieldCheck, title: "25-year warranty", desc: "Linear performance warranty on panels and full system performance guarantee." },
  { icon: Smartphone, title: "Live monitoring", desc: "Track generation, savings and battery health from one mobile app." },
  { icon: Wrench, title: "On-ground service", desc: "Local engineers across 140+ cities, 48-hour response SLA." },
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
  { name: "Anjali Mehra", role: "Homeowner · Pune", text: "Power bill dropped 92% in the first quarter. The SunBERQ app is genuinely useful — I check generation daily.", rating: 5 },
  { name: "Ravi Sharma", role: "Plant Head · Indore", text: "A 600 kWp rooftop commissioned in under five weeks. Clean execution, transparent reporting.", rating: 5 },
  { name: "Dr. Priya Iyer", role: "Director · Education Trust", text: "We power three campuses with SunBERQ. The battery backup keeps labs running through any outage.", rating: 5 },
];

const gallery = [
  { src: galleryRooftop, alt: "Rooftop solar installation" },
  { src: galleryIndustrial, alt: "Industrial solar plant" },
  { src: galleryAssembly, alt: "Battery assembly line" },
  { src: galleryResidential, alt: "Residential rooftop" },
  { src: galleryFarm, alt: "Utility scale solar farm" },
];

const faqs = [
  { q: "How much subsidy can I claim under PM Surya Ghar?", a: "Eligible homeowners can claim up to ₹78,000 in central subsidy plus state incentives. Our team handles the entire paperwork and disbursement for you." },
  { q: "How long is the payback period?", a: "For most residential rooftops in India, payback is 3–5 years. After that you enjoy 20+ years of nearly-free electricity from a 25-year-warranted system." },
  { q: "Do solar panels work during cloudy weather and monsoon?", a: "Yes — modern Mono PERC and TOPCon panels generate meaningful power even in diffused light. Battery storage keeps you covered during extended bad weather." },
  { q: "What about net metering?", a: "We file your net-metering application and coordinate with the local discom. Excess generation gets credited to your account and offsets night-time consumption." },
  { q: "Do you provide service after installation?", a: "Yes. Every SunBERQ system comes with a 25-year performance warranty, free annual maintenance for the first two years, and a pan-India service network." },
];

function Home_() {
  const [bill, setBill] = useState("");
  return (
    <>
      {/* HERO — light split layout */}
      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
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
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[2rem] bg-surface-cream border border-border p-8 sm:p-12 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">2-minute estimate</div>
                <h3 className="mt-3 text-2xl sm:text-4xl font-bold leading-tight">
                  See how much you'll save with solar.
                </h3>
                <p className="mt-3 text-muted-foreground">Just enter your average monthly electricity bill — we'll show your indicative savings and subsidy.</p>
              </div>
              <form
                className="lg:col-span-5 flex flex-col sm:flex-row gap-3 bg-card border border-border rounded-2xl p-3 shadow-soft"
                onSubmit={(e) => { e.preventDefault(); window.location.href = "/quote"; }}
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
              SunBERQ designs and installs next-generation solar systems with one mission — make clean energy
              the smartest choice for every Indian home and business. Panels in partnership with Cosmic PV Power,
              inverters with Energiaa, and batteries assembled at our facility in Aligarh, Uttar Pradesh.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Renewable energy vision led by Indian engineering",
                "Battery assembly facility in Aligarh, UP",
                "Quality-focused supply chain & white-label partnerships",
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
                  <a href="tel:+910000000000" className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-primary-foreground/40 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition">
                    <Phone className="w-4 h-4" /> +91 00000 00000
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
