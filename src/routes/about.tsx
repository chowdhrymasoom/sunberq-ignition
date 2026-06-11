import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";
import aboutImg from "@/assets/about-facility.jpg";
import assemblyImg from "@/assets/gallery-assembly.jpg";
import { Factory, Leaf, Award, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SunBERQ — Indian Solar Engineering" },
      { name: "description", content: "SunBERQ designs premium solar panels, smart inverters, and assembles batteries in Aligarh, Uttar Pradesh — built for India's renewable future." },
      { property: "og:title", content: "About SunBERQ" },
      { property: "og:description", content: "Indian solar engineering for a renewable future." },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: aboutImg },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const timeline = [
  { year: "2022", title: "Founded", desc: "SunBERQ established with a vision to bring premium solar to India." },
  { year: "2023", title: "Panel partnership", desc: "Strategic supply tie-up with Cosmic PV Power for panel manufacturing." },
  { year: "2024", title: "Aligarh facility", desc: "Battery assembly and quality lab commissioned in Uttar Pradesh." },
  { year: "2025", title: "Inverter line", desc: "White-labeled smart inverters launched with Energiaa." },
  { year: "2026", title: "Pan-India network", desc: "Service & dealer network expanded to 140+ cities." },
];

const pillars = [
  { icon: Factory, title: "Made in India", desc: "Components and assembly anchored in Indian manufacturing." },
  { icon: Award, title: "Quality first", desc: "Every system tested against tropical and industrial conditions." },
  { icon: Leaf, title: "Sustainability", desc: "Lower lifecycle emissions, recyclable materials, responsible sourcing." },
  { icon: Users, title: "People-led", desc: "Local engineers, local installers, local accountability." },
];

function About() {
  return (
    <>
      <PageHeader
        eyebrow="About SunBERQ"
        title={<>Energy that's <span className="text-gradient-solar">smarter, cleaner, ours.</span></>}
        description="A next-generation Indian solar brand engineered for homes, businesses and industries — with a battery assembly facility in Aligarh, Uttar Pradesh."
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <img src={aboutImg} alt="SunBERQ facility" loading="lazy" className="rounded-3xl shadow-elevated w-full aspect-[5/4] object-cover" />
          </Reveal>
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">Our vision</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              To become a globally trusted renewable energy manufacturing company driving India's
              transition towards a cleaner, smarter, and energy-secure future.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              At SunBERQ, we envision a sustainable ecosystem powered by advanced Solar PV technology,
              intelligent energy storage, and efficient power solutions. Through innovation, manufacturing
              excellence, and strong business partnerships, we enable industries, businesses and energy
              providers to adopt reliable renewable energy at scale — reducing energy dependence,
              minimising wastage, and strengthening clean energy infrastructure across every market we serve.
            </p>
            <p className="mt-4 italic text-primary font-medium">
              "Driven by Innovation. Powered by the Sun."
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {pillars.map((p) => (
                <div key={p.title} className="p-5 rounded-2xl border border-border/60 bg-card">
                  <p.icon className="w-6 h-6 text-primary" />
                  <h3 className="mt-4 font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-accent text-xs font-semibold tracking-widest uppercase text-primary">Journey</span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-bold">Milestones so far</h2>
          </Reveal>
          <ol className="mt-12 relative border-l-2 border-primary/30 ml-3 space-y-10">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.06}>
                <li className="pl-8 relative">
                  <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-gradient-solar shadow-glow" />
                  <div className="text-xs font-semibold uppercase tracking-widest text-primary">{t.year}</div>
                  <h3 className="mt-1 text-xl font-bold">{t.title}</h3>
                  <p className="mt-1 text-muted-foreground">{t.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="inline-block px-3 py-1 rounded-full bg-accent text-xs font-semibold tracking-widest uppercase text-primary">Aligarh facility</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold">Battery assembly, engineered in Uttar Pradesh.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our Aligarh facility assembles modular lithium iron phosphate (LFP) battery packs with active balancing BMS,
              electrical safety testing, and full traceability. Every pack is burn-in tested before it ships.
            </p>
          </Reveal>
          <Reveal>
            <img src={assemblyImg} alt="Battery assembly" loading="lazy" className="rounded-3xl shadow-elevated w-full aspect-[5/4] object-cover" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
