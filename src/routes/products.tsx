import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";
import { CheckCircle2, Sun, Zap, Battery } from "lucide-react";
import panelImg from "@/assets/product-panel.jpg";
import inverterImg from "@/assets/product-inverter.jpg";
import batteryImg from "@/assets/product-battery.jpg";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Solar Panels, Inverters & Batteries | SunBERQ" },
      { name: "description", content: "Explore SunBERQ solar panels, smart inverters and lithium battery storage. Engineered in India, built for performance." },
      { property: "og:title", content: "SunBERQ Products" },
      { property: "og:description", content: "Premium panels, inverters and batteries." },
      { property: "og:url", content: "/products" },
      { property: "og:image", content: panelImg },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: Products,
});

const catalog = [
  {
    icon: Sun, name: "Solar Panels", img: panelImg,
    intro: "Premium monocrystalline and bifacial modules — sourced from Cosmic PV Power, branded SunBERQ.",
    specs: [
      ["Technology", "Mono PERC / TOPCon / Bifacial"],
      ["Power Range", "400 W – 600 W"],
      ["Efficiency", "Up to 22.5%"],
      ["Warranty", "12 yr product · 25 yr linear power"],
      ["Cells", "108 / 132 half-cut"],
      ["Operating Temp", "−40°C to +85°C"],
    ],
  },
  {
    icon: Zap, name: "Smart Inverters", img: inverterImg,
    intro: "On-grid, hybrid and string inverters — white-labeled from Energiaa with SunBERQ engineering.",
    specs: [
      ["Range", "1 kW – 250 kW"],
      ["Type", "On-grid · Hybrid · String"],
      ["MPPT", "Dual / Quad MPPT"],
      ["Monitoring", "Wi-Fi · 4G · SunBERQ App"],
      ["Efficiency", "Up to 98.6%"],
      ["Warranty", "5 / 10 year options"],
    ],
  },
  {
    icon: Battery, name: "Battery Storage", img: batteryImg,
    intro: "Lithium iron phosphate (LFP) storage assembled at our Aligarh facility for safety and longevity.",
    specs: [
      ["Chemistry", "LFP (LiFePO₄)"],
      ["Capacity", "5 kWh – 100 kWh modular"],
      ["Cycles", ">6,000 @ 80% DoD"],
      ["BMS", "Active balancing · App alerts"],
      ["Safety", "IP65 · UL listed cells"],
      ["Warranty", "10 years"],
    ],
  },
];

function Products() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title={<>One stack. <span className="text-gradient-solar">Total solar.</span></>}
        description="Panels, inverters and batteries designed to work together — for maximum yield, smart control and decades of reliability."
      />
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {catalog.map((p, i) => (
            <Reveal key={p.name}>
              <article className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
                <div className="relative">
                  <div className="absolute -inset-6 bg-gradient-solar opacity-10 blur-3xl rounded-full" />
                  <img src={p.img} alt={p.name} loading="lazy" className="relative rounded-3xl shadow-elevated w-full aspect-square object-cover" />
                </div>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-solar text-white inline-flex items-center justify-center shadow-glow">
                    <p.icon className="w-5 h-5" />
                  </div>
                  <h2 className="mt-5 text-3xl sm:text-4xl font-bold">{p.name}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{p.intro}</p>
                  <div className="mt-6 rounded-2xl border border-border/60 overflow-hidden">
                    <table className="w-full text-sm">
                      <tbody>
                        {p.specs.map(([k, v], j) => (
                          <tr key={k} className={j % 2 ? "bg-surface" : ""}>
                            <th className="text-left font-medium text-muted-foreground px-4 py-3 w-1/3">{k}</th>
                            <td className="px-4 py-3 font-semibold">{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <ul className="mt-5 grid sm:grid-cols-2 gap-2">
                    {["BIS / IEC certified", "Pan-India delivery", "On-site engineering support", "Long-term spares"].map((t) => (
                      <li key={t} className="flex gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />{t}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
