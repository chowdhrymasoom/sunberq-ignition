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
    icon: Sun, name: "Solar PV Modules", img: panelImg,
    intro: "High-efficiency Mono PERC, N-Type TOPCon and bifacial modules engineered for Commercial & Industrial applications — reliable across rooftops, factories, warehouses and ground-mount plants in high heat, dust and low-light conditions.",
    specs: [
      ["Power Range", "500 Wp – 650 Wp"],
      ["Efficiency", "Up to ~23%+"],
      ["System Voltage", "1500 V DC"],
      ["Cell Type", "Mono Crystalline Half-Cut"],
      ["Operating Temp", "−40°C to +85°C"],
      ["Build", "Tempered low-iron glass · IP68 junction box"],
    ],
  },
  {
    icon: Zap, name: "Solar Inverters", img: inverterImg,
    intro: "On-grid, hybrid and off-grid inverters with advanced MPPT, DSP-based control and high-frequency design for stable grid synchronisation and clean power output.",
    specs: [
      ["Type", "On-Grid · Hybrid · Off-Grid"],
      ["MPPT Efficiency", ">99%"],
      ["Max Efficiency", "Up to 97–98%"],
      ["DC Input", "~100 V – 1000 V"],
      ["Output", "Single / Three Phase · PF ≥0.99"],
      ["Monitoring", "Wi-Fi · RS485 · GSM"],
    ],
  },
  {
    icon: Battery, name: "Lithium & Sodium Battery Storage", img: batteryImg,
    intro: "LiFePO4 (LFP) battery systems with long cycle life and high thermal safety, plus future-ready Sodium-Ion technology — designed for seamless integration with hybrid inverters.",
    specs: [
      ["Chemistry", "LiFePO₄ · Sodium-Ion (next-gen)"],
      ["Cycle Life", "~6,000 cycles"],
      ["Design", "Modular & scalable"],
      ["Safety", "High thermal stability · BMS protection"],
      ["Integration", "Hybrid inverter compatible"],
      ["Use", "Residential · Commercial · Industrial"],
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
