import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";
import { CheckCircle2, ArrowRight, ArrowLeft, Sparkles, IndianRupee, Sun, Battery, Leaf, Calendar } from "lucide-react";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Solar Estimator — Instant System Size, Subsidy & Payback | SunBERQ" },
      { name: "description", content: "Get an instant solar estimate from SunBERQ — recommended system size, PM Surya Ghar subsidy, monthly savings and payback period calculated live." },
      { property: "og:title", content: "SunBERQ Solar Estimator" },
      { property: "og:description", content: "Instant system size, subsidy and payback estimate." },
      { property: "og:url", content: "/quote" },
    ],
    links: [{ rel: "canonical", href: "/quote" }],
  }),
  component: Quote,
});

const steps = ["Property", "Energy use", "Contact"];

function subsidyFor(kW: number) {
  if (kW <= 0) return 0;
  if (kW < 2) return 30000;
  if (kW < 3) return 60000;
  return 78000;
}

const RATE_PER_KW: Record<string, number> = {
  Residential: 55000,
  Commercial: 48000,
  Industrial: 42000,
  Agriculture: 50000,
  Institution: 50000,
};

function Quote() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  // form state
  const [propertyType, setPropertyType] = useState("Residential");
  const [roofType, setRoofType] = useState("RCC / flat");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [bill, setBill] = useState("");
  const [backup, setBackup] = useState("Critical loads only");
  const [timeline, setTimeline] = useState("Within 1 month");
  const [budget, setBudget] = useState("₹2L – ₹5L");

  const last = step === steps.length - 1;

  const estimate = useMemo(() => {
    const monthlyBill = Number(bill.replace(/[^0-9.]/g, "")) || 0;
    if (monthlyBill < 500) return null;
    const tariff = 8;
    const monthlyKwh = monthlyBill / tariff;
    const dailyKwh = monthlyKwh / 30;
    const sunHours = 4.5;
    let systemKw = Math.max(1, Math.round((dailyKwh / sunHours) * 2) / 2);

    // cap by roof area if provided (10 sq m ≈ 1 kW → 108 sq ft / kW)
    const areaNum = Number(area.replace(/[^0-9.]/g, ""));
    if (areaNum > 0) {
      const cap = Math.max(1, Math.floor((areaNum / 108) * 2) / 2);
      systemKw = Math.min(systemKw, cap);
    }
    const ratePerKw = RATE_PER_KW[propertyType] ?? 55000;
    const cost = Math.round(systemKw * ratePerKw);
    const subsidy = propertyType === "Residential" ? subsidyFor(systemKw) : 0;
    const net = Math.max(0, cost - subsidy);
    const monthlySavings = Math.round(monthlyBill * 0.9);
    const paybackYears = +(net / (monthlySavings * 12)).toFixed(1);
    const annualKwh = Math.round(systemKw * 4.5 * 365);
    const co2 = +((annualKwh * 0.82) / 1000).toFixed(2);
    const batteryKwh = backup === "No backup" ? 0 : backup === "Critical loads only" ? 5 : backup === "Whole home" ? 10 : 25;
    return { systemKw, cost, subsidy, net, monthlySavings, paybackYears, annualKwh, co2, batteryKwh };
  }, [bill, area, propertyType, backup]);

  return (
    <>
      <PageHeader
        eyebrow="Solar estimator"
        title={<>Design your <span className="text-gradient-solar">solar system</span> — instantly.</>}
        description="Three short steps. You'll see your system size, subsidy, savings and payback right here, before you ever speak to us."
      />
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-3xl bg-card border border-border/60 shadow-soft p-6 sm:p-10">
              {done ? (
                <Result estimate={estimate} />
              ) : (
                <>
                  {/* progress */}
                  <div className="flex items-center gap-2 mb-8">
                    {steps.map((s, i) => (
                      <div key={s} className="flex-1 flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full inline-flex items-center justify-center text-xs font-bold ${i <= step ? "bg-gradient-solar text-white shadow-glow" : "bg-muted text-muted-foreground"}`}>
                          {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                        </div>
                        <div className={`text-sm font-medium ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{s}</div>
                        {i < steps.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-primary" : "bg-border"}`} />}
                      </div>
                    ))}
                  </div>

                  {step === 0 && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Select label="Property type" value={propertyType} onChange={setPropertyType} options={["Residential", "Commercial", "Industrial", "Agriculture", "Institution"]} />
                      <Select label="Roof type" value={roofType} onChange={setRoofType} options={["RCC / flat", "Metal sheet", "Tiled", "Ground mount"]} />
                      <Input label="Approx roof area (sq ft)" value={area} onChange={setArea} />
                      <Input label="City / Pincode" value={city} onChange={setCity} />
                    </div>
                  )}
                  {step === 1 && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input label="Average monthly bill (₹)" value={bill} onChange={setBill} inputMode="numeric" />
                      <Select label="Backup needed?" value={backup} onChange={setBackup} options={["No backup", "Critical loads only", "Whole home", "Industrial backup"]} />
                      <Select label="Timeline" value={timeline} onChange={setTimeline} options={["Immediate", "Within 1 month", "1–3 months", "Just exploring"]} />
                      <Select label="Budget range" value={budget} onChange={setBudget} options={["Under ₹2L", "₹2L – ₹5L", "₹5L – ₹15L", "₹15L+"]} />

                      {estimate && (
                        <div className="sm:col-span-2 mt-2 p-4 rounded-2xl bg-surface-cream border border-border">
                          <div className="text-xs font-semibold tracking-wider uppercase text-primary">Live preview</div>
                          <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                            <Mini k="System" v={`${estimate.systemKw} kW`} />
                            <Mini k="Cost" v={`₹${(estimate.cost / 100000).toFixed(2)}L`} />
                            <Mini k="Subsidy" v={`₹${estimate.subsidy.toLocaleString("en-IN")}`} />
                            <Mini k="Payback" v={`${estimate.paybackYears} yrs`} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {step === 2 && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input label="Full name" />
                      <Input label="Phone" type="tel" />
                      <Input label="Email" type="email" />
                      <Input label="WhatsApp (optional)" type="tel" />
                      <div className="sm:col-span-2">
                        <label className="text-sm font-medium">Anything else?</label>
                        <textarea rows={3} className="mt-1.5 w-full p-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none" />
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex justify-between gap-3">
                    <button
                      type="button"
                      disabled={step === 0}
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-input font-medium disabled:opacity-40"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={() => (last ? setDone(true) : setStep((s) => s + 1))}
                      className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-gradient-solar text-white font-semibold shadow-glow"
                    >
                      {last ? "See my estimate" : "Next"} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Result({ estimate }: { estimate: ReturnType<typeof useMemo> extends infer T ? any : never }) {
  if (!estimate) {
    return (
      <div className="text-center py-10">
        <div className="mx-auto w-14 h-14 rounded-full bg-gradient-solar text-white inline-flex items-center justify-center shadow-glow">
          <Sparkles className="w-7 h-7" />
        </div>
        <h3 className="mt-5 text-2xl font-bold">Thanks — we've got your request.</h3>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">
          A SunBERQ engineer will prepare your full system design and reach out within one business day.
        </p>
      </div>
    );
  }
  const cards = [
    { icon: Sun, k: "Recommended system", v: `${estimate.systemKw} kW`, sub: "Mono PERC / TOPCon modules" },
    { icon: IndianRupee, k: "Indicative cost", v: `₹ ${estimate.cost.toLocaleString("en-IN")}`, sub: "Turnkey, installed" },
    { icon: Sparkles, k: "PM Surya Ghar subsidy", v: `₹ ${estimate.subsidy.toLocaleString("en-IN")}`, sub: "Residential systems" },
    { icon: IndianRupee, k: "Net investment", v: `₹ ${estimate.net.toLocaleString("en-IN")}`, sub: "After subsidy" },
    { icon: Calendar, k: "Payback period", v: `${estimate.paybackYears} yrs`, sub: "Then 20+ years of near-free power" },
    { icon: IndianRupee, k: "Monthly savings", v: `₹ ${estimate.monthlySavings.toLocaleString("en-IN")}`, sub: "≈ 90% of your current bill" },
    { icon: Battery, k: "Suggested battery", v: estimate.batteryKwh ? `${estimate.batteryKwh} kWh LFP` : "Grid-tied (no battery)", sub: "LiFePO₄ · ~6,000 cycles" },
    { icon: Leaf, k: "CO₂ saved / year", v: `${estimate.co2} tonnes`, sub: `${estimate.annualKwh.toLocaleString("en-IN")} kWh generated` },
  ];
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-solar text-white inline-flex items-center justify-center shadow-glow">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Your SunBERQ estimate</h3>
          <p className="text-sm text-muted-foreground">Engineered for your bill, roof and backup needs.</p>
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        {cards.map((c) => (
          <div key={c.k} className="p-4 rounded-2xl border border-border bg-surface-cream">
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
              <c.icon className="w-3.5 h-3.5 text-primary" /> {c.k}
            </div>
            <div className="mt-1.5 text-xl font-display font-bold">{c.v}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-5 rounded-2xl bg-primary text-primary-foreground flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div>
          <div className="font-bold">Your request is in.</div>
          <div className="text-sm text-primary-foreground/85">Our engineer will confirm your site survey within one business day.</div>
        </div>
        <a href="tel:+919719358578" className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-card text-foreground font-semibold shadow-soft">
          Call SunBERQ
        </a>
      </div>

      <p className="mt-4 text-[11px] text-muted-foreground">
        * Indicative figures based on ₹8/kWh average tariff, 4.5 peak sun-hours and standard installation. Final design, cost and subsidy depend on site survey, sanctioned load and discom policy.
      </p>
    </div>
  );
}

function Mini({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{k}</div>
      <div className="mt-0.5 font-bold">{v}</div>
    </div>
  );
}

function Input({
  label,
  type = "text",
  value,
  onChange,
  inputMode,
}: {
  label: string;
  type?: string;
  value?: string;
  onChange?: (v: string) => void;
  inputMode?: "numeric" | "text";
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        inputMode={inputMode}
        onChange={(e) => onChange?.(e.target.value)}
        className="mt-1.5 w-full h-11 px-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
      />
    </div>
  );
}
function Select({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="mt-1.5 w-full h-11 px-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
