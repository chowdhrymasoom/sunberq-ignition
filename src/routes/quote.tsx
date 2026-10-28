import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Home as HomeIcon, Building2, Factory,
  Sprout, Phone, IndianRupee, Sun, Battery, Leaf, Calendar, MapPin, Sparkles, User,
} from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get Your Free Solar Estimate — 2 Minutes | SunBERQ" },
      { name: "description", content: "Answer a few quick questions and get an instant solar estimate — recommended system size, PM Surya Ghar subsidy, monthly savings and payback period. Free, no obligation." },
      { property: "og:title", content: "Get Your Free Solar Estimate — SunBERQ" },
      { property: "og:description", content: "Instant system size, subsidy and payback estimate in under 2 minutes." },
      { property: "og:url", content: "/quote" },
    ],
    links: [{ rel: "canonical", href: "/quote" }],
  }),
  component: Quote,
});

const PHONE = "+91 97193 58578";
const PHONE_HREF = "tel:+919719358578";

// ---- Estimation model (shared with the homepage calculator) ----
const RATE_PER_KW: Record<string, number> = {
  Residential: 55000,
  Commercial: 48000,
  Industrial: 42000,
  Agriculture: 50000,
  Institution: 50000,
};

function subsidyFor(kW: number) {
  if (kW <= 0) return 0;
  if (kW < 2) return 30000;
  if (kW < 3) return 60000;
  return 78000;
}

type Estimate = {
  systemKw: number;
  cost: number;
  subsidy: number;
  net: number;
  monthlySavings: number;
  paybackYears: number;
  annualKwh: number;
  co2: number;
  batteryKwh: number;
};

function buildEstimate(billRupees: number, propertyType: string, backup: string): Estimate | null {
  if (!billRupees || billRupees < 500) return null;
  const tariff = 8; // ₹/kWh average
  const monthlyKwh = billRupees / tariff;
  const dailyKwh = monthlyKwh / 30;
  const sunHours = 4.5;
  const systemKw = Math.max(1, Math.round((dailyKwh / sunHours) * 2) / 2); // 0.5 kW steps
  const ratePerKw = RATE_PER_KW[propertyType] ?? 55000;
  const cost = Math.round(systemKw * ratePerKw);
  const subsidy = propertyType === "Residential" ? subsidyFor(systemKw) : 0;
  const net = Math.max(0, cost - subsidy);
  const monthlySavings = Math.round(billRupees * 0.9);
  const paybackYears = Math.max(2, +(net / (monthlySavings * 12)).toFixed(1));
  const annualKwh = Math.round(systemKw * 4.5 * 365);
  const co2 = +((annualKwh * 0.82) / 1000).toFixed(2);
  const batteryKwh = backup === "No backup" ? 0 : backup === "Critical loads only" ? 5 : backup === "Whole home" ? 10 : 25;
  return { systemKw, cost, subsidy, net, monthlySavings, paybackYears, annualKwh, co2, batteryKwh };
}

// ---- Wizard content ----
const propertyOptions = [
  { key: "Residential", icon: HomeIcon, label: "Home", desc: "House, villa or apartment" },
  { key: "Commercial", icon: Building2, label: "Business", desc: "Office, retail or warehouse" },
  { key: "Industrial", icon: Factory, label: "Factory", desc: "Manufacturing or processing" },
  { key: "Agriculture", icon: Sprout, label: "Farm", desc: "Solar pumps, farm-edge power" },
];

const billRanges = [
  { label: "Under ₹1,000", mid: 700 },
  { label: "₹1,000 – ₹2,000", mid: 1500 },
  { label: "₹2,000 – ₹4,000", mid: 3000 },
  { label: "₹4,000 – ₹8,000", mid: 6000 },
  { label: "Over ₹8,000", mid: 12000 },
  { label: "I'm not sure", mid: 2500 },
];

function Quote() {
  const [screen, setScreen] = useState<"flow" | "result">("flow");
  const [step, setStep] = useState(0);
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [owns, setOwns] = useState<string | null>(null);
  const [billMid, setBillMid] = useState<number | null>(null);
  const [pincode, setPincode] = useState("");
  const [backup, setBackup] = useState("Critical loads only");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const advance = useRef<number | null>(null);

  useEffect(() => () => { if (advance.current) window.clearTimeout(advance.current); }, []);

  // Flow: 0 property · 1 ownership (home only) · 2 backup · 3 bill · 4 location · 5 contact
  const flowLength = propertyType === "Residential" ? 6 : 5;
  const billIndex = propertyType === "Residential" ? 3 : 2;
  const contactIndex = flowLength - 1;

  const estimate = useMemo(
    () => (billMid ? buildEstimate(billMid, propertyType ?? "Residential", backup) : null),
    [billMid, propertyType, backup],
  );

  function goNext() {
    setStep((s) => Math.min(s + 1, contactIndex));
  }
  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function pickAndAdvance<T>(setter: (v: T) => void, value: T, delay = 280) {
    setter(value);
    if (advance.current) window.clearTimeout(advance.current);
    advance.current = window.setTimeout(goNext, delay);
  }

  function submitContact(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
    setScreen("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- Result screen ----------
  if (screen === "result") {
    return <ResultScreen estimate={estimate} propertyType={propertyType} name={name} pincode={pincode} submitted={submitted} />;
  }

  const progress = Math.round(((step + 1) / flowLength) * 100);

  return (
    <section className="min-h-screen pt-28 sm:pt-32 pb-20 bg-surface-cream/60">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header: logo + progress */}
        <div className="flex items-center justify-between gap-4">
          <Link to="/" aria-label="SunBERQ home" className="shrink-0">
            <Logo variant="dark" size="sm" showWordmark={false} />
          </Link>
          <div className="text-xs font-semibold text-muted-foreground">
            Step {step + 1} of {flowLength}
          </div>
        </div>
        <div className="mt-4 h-1.5 w-full rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Card */}
        <div className="mt-8 rounded-3xl bg-card border border-border shadow-soft p-6 sm:p-10">
          {step > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}

          {/* 0 — Property type */}
          {step === 0 && (
            <Question
              q="What kind of property is this?"
              hint="This helps us size the right system and apply the correct subsidy rules."
            >
              <div className="grid grid-cols-2 gap-3">
                {propertyOptions.map((o) => (
                  <OptionCard
                    key={o.key}
                    selected={propertyType === o.key}
                    onClick={() => pickAndAdvance(setPropertyType, o.key)}
                    icon={<o.icon className="w-6 h-6" />}
                    label={o.label}
                    desc={o.desc}
                  />
                ))}
              </div>
            </Question>
          )}

          {/* 1 — Ownership (residential only) */}
          {step === 1 && propertyType === "Residential" && (
            <Question
              q="Do you own the property?"
              hint="PM Surya Ghar subsidy is available to homeowners who own their roof."
            >
              <div className="grid grid-cols-2 gap-3">
                <OptionCard
                  selected={owns === "own"}
                  onClick={() => pickAndAdvance(setOwns, "own")}
                  icon={<CheckCircle2 className="w-6 h-6" />}
                  label="Yes, I own it"
                  desc="Full subsidy eligible"
                />
                <OptionCard
                  selected={owns === "rent"}
                  onClick={() => pickAndAdvance(setOwns, "rent")}
                  icon={<User className="w-6 h-6" />}
                  label="No, I rent"
                  desc="We'll suggest options with your landlord"
                />
              </div>
              {owns === "rent" && (
                <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground bg-surface-cream border border-border rounded-xl p-3">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  Rented properties can still go solar — we'll coordinate directly with your landlord during the free site survey.
                </div>
              )}
            </Question>
          )}

          {/* 2 (non-residential) / 3 (residential) — Backup preference */}
          {step === billIndex - 1 && (
            <Question
              q="Do you want battery backup with your system?"
              hint="Backup keeps critical loads running during grid cuts. You can skip this."
            >
              <div className="grid gap-3">
                {[
                  { key: "No backup", icon: Sun, label: "Grid-tied only", desc: "Lowest cost — no battery" },
                  { key: "Critical loads only", icon: Battery, label: "Critical loads", desc: "Lights, fans, Wi-Fi & fridge stay on" },
                  { key: "Whole home", icon: Battery, label: "Whole property", desc: "Everything runs through the battery" },
                  { key: "Industrial backup", icon: Factory, label: "Industrial backup", desc: "Large-capacity storage for machinery" },
                ].map((o) => (
                  <OptionCard
                    key={o.key}
                    selected={backup === o.key}
                    onClick={() => pickAndAdvance(setBackup, o.key)}
                    icon={<o.icon className="w-6 h-6" />}
                    label={o.label}
                    desc={o.desc}
                    wide
                  />
                ))}
              </div>
            </Question>
          )}

          {/* Bill range */}
          {step === billIndex && (
            <Question
              q="What's your average monthly electricity bill?"
              hint="A ballpark is fine — this is the single biggest factor in sizing your system."
            >
              <div className="grid grid-cols-2 gap-3">
                {billRanges.map((r) => (
                  <OptionCard
                    key={r.label}
                    selected={billMid === r.mid}
                    onClick={() => pickAndAdvance(setBillMid, r.mid)}
                    icon={<IndianRupee className="w-5 h-5" />}
                    label={r.label}
                    compact
                  />
                ))}
              </div>
            </Question>
          )}

          {/* Location */}
          {step === contactIndex - 1 && (
            <Question
              q="Where is the property located?"
              hint="We use this to check local sun-hours, net-metering rules and your discom's subsidy process."
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (pincode.replace(/\D/g, "").length >= 5) goNext();
                }}
                className="mt-6"
              >
                <label className="text-sm font-medium" htmlFor="pincode">City, town or PIN code</label>
                <input
                  id="pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="e.g. 110020 — Okhla, Delhi"
                  autoFocus
                  className="mt-2 w-full h-12 px-4 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none text-base"
                />
                <button
                  type="submit"
                  disabled={pincode.replace(/\D/g, "").length < 5}
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 h-12 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft disabled:opacity-40"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
                <p className="mt-3 text-xs text-muted-foreground text-center">
                  Your details stay private — used only to prepare your estimate.
                </p>
              </form>
            </Question>
          )}

          {/* Contact */}
          {step === contactIndex && (
            <Question
              q="Where should we send your detailed quote?"
              hint={estimate
                ? "Your instant estimate is ready — a SunBERQ engineer will refine it after a free site survey."
                : "Almost done — tell us where to send your detailed quote."}
            >
              {estimate && (
                <div className="mb-6 p-4 rounded-2xl bg-surface-cream border border-border">
                  <div className="text-xs font-semibold tracking-wider uppercase text-primary">Your instant estimate</div>
                  <div className="mt-2 grid grid-cols-3 gap-3 text-sm">
                    <Mini k="System" v={`${estimate.systemKw} kW`} />
                    <Mini k="Subsidy" v={`₹${(estimate.subsidy / 1000).toFixed(0)}k`} />
                    <Mini k="Payback" v={`${estimate.paybackYears} yrs`} />
                  </div>
                </div>
              )}
              <form onSubmit={submitContact} className="grid sm:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="text-sm font-medium" htmlFor="cname">Full name</label>
                  <input
                    id="cname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1.5 w-full h-11 px-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="cphone">Phone number</label>
                  <input
                    id="cphone"
                    type="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="mt-1.5 w-full h-11 px-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium" htmlFor="cemail">Email (optional)</label>
                  <input
                    id="cemail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full h-11 px-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="sm:col-span-2 inline-flex items-center justify-center gap-2 h-12 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:-translate-y-0.5 transition-transform"
                >
                  See my estimate <ArrowRight className="w-4 h-4" />
                </button>
                <p className="sm:col-span-2 text-xs text-muted-foreground text-center">
                  By continuing you agree to be contacted about your quote. No spam, ever.
                </p>
              </form>
            </Question>
          )}
        </div>

        {/* Assurances */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 100% free</span>
          <span className="inline-flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> No obligation</span>
          <a href={PHONE_HREF} className="inline-flex items-center gap-2 font-medium text-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4 text-primary" /> {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}

function Question({ q, hint, children }: { q: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug">{q}</h1>
      {hint && <p className="mt-2 text-sm text-muted-foreground">{hint}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function OptionCard({
  selected, onClick, icon, label, desc, wide, compact,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  desc?: string;
  wide?: boolean;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-2xl border-2 p-4 sm:p-5 transition-all duration-150 ${
        selected
          ? "border-primary bg-primary/5 shadow-soft"
          : "border-border bg-background hover:border-primary/50 hover:shadow-soft"
      } ${wide ? "flex items-center gap-4" : ""}`}
    >
      {!wide && (
        <div className={`${compact ? "w-8 h-8" : "w-10 h-10"} rounded-xl bg-primary/10 text-primary inline-flex items-center justify-center`}>
          {icon}
        </div>
      )}
      <div className={wide ? "" : "mt-3"}>
        <div className="flex items-center gap-2">
          {wide && <span className="text-primary">{icon}</span>}
          <span className="font-semibold">{label}</span>
        </div>
        {desc && <div className="mt-0.5 text-sm text-muted-foreground">{desc}</div>}
      </div>
    </button>
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

function ResultScreen({
  estimate, propertyType, name, pincode, submitted,
}: {
  estimate: Estimate | null;
  propertyType: string | null;
  name: string;
  pincode: string;
  submitted: boolean;
}) {
  return (
    <section className="min-h-screen pt-28 sm:pt-32 pb-20 bg-surface-cream/60">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-card border border-border shadow-soft p-6 sm:p-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground inline-flex items-center justify-center shadow-soft">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {submitted ? `Thanks${name ? `, ${name.split(" ")[0]}` : ""} — here's your estimate.` : "Your SunBERQ estimate"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {pincode ? `${pincode} · ` : ""}{propertyType ?? "Residential"} · Engineered for your bill and roof.
              </p>
            </div>
          </div>

          {estimate ? (
            <>
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {[
                  { icon: Sun, k: "Recommended system", v: `${estimate.systemKw} kW`, sub: "Mono PERC / TOPCon modules" },
                  { icon: IndianRupee, k: "Indicative cost", v: `₹ ${estimate.cost.toLocaleString("en-IN")}`, sub: "Turnkey, installed" },
                  { icon: Sparkles, k: "PM Surya Ghar subsidy", v: `₹ ${estimate.subsidy.toLocaleString("en-IN")}`, sub: estimate.subsidy ? "Direct benefit transfer" : "Not applicable for this property type" },
                  { icon: IndianRupee, k: "Net investment", v: `₹ ${estimate.net.toLocaleString("en-IN")}`, sub: "After subsidy" },
                  { icon: IndianRupee, k: "Monthly savings", v: `₹ ${estimate.monthlySavings.toLocaleString("en-IN")}`, sub: "≈ 90% of your current bill" },
                  { icon: Calendar, k: "Payback period", v: `${estimate.paybackYears} yrs`, sub: "Then 20+ years of near-free power" },
                  { icon: Battery, k: "Suggested battery", v: estimate.batteryKwh ? `${estimate.batteryKwh} kWh LFP` : "Grid-tied (no battery)", sub: "LiFePO₄ · ~6,000 cycles" },
                  { icon: Leaf, k: "CO₂ saved / year", v: `${estimate.co2} tonnes`, sub: `${estimate.annualKwh.toLocaleString("en-IN")} kWh generated` },
                ].map((c) => (
                  <div key={c.k} className="p-5 rounded-2xl border border-border bg-surface-cream">
                    <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                      <c.icon className="w-3.5 h-3.5 text-primary" /> {c.k}
                    </div>
                    <div className="mt-1.5 text-xl font-display font-bold">{c.v}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{c.sub}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-6 rounded-2xl bg-primary text-primary-foreground">
                <div className="font-bold text-lg">What happens next</div>
                <ol className="mt-3 space-y-2 text-sm text-primary-foreground/90 list-none">
                  {[
                    "A SunBERQ engineer calls you within one business day to confirm details.",
                    "We schedule your free site survey (48-hour window).",
                    "You get a custom system design, final pricing and net-metering paperwork — no obligation.",
                  ].map((t, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-primary-foreground/20 inline-flex items-center justify-center text-[11px] font-bold shrink-0">{i + 1}</span>
                      {t}
                    </li>
                  ))}
                </ol>
                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <a
                    href={PHONE_HREF}
                    className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-card text-foreground font-semibold shadow-soft"
                  >
                    <Phone className="w-4 h-4" /> Call us now — {PHONE}
                  </a>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full border border-primary-foreground/40 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors"
                  >
                    Back to home
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-8 text-center py-6">
              <h3 className="text-xl font-bold">Your request is in.</h3>
              <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                Your bill is on the lower side, so we'll size your system after a quick call. A SunBERQ engineer will reach out within one business day.
              </p>
              <a href={PHONE_HREF} className="mt-5 inline-flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft">
                <Phone className="w-4 h-4" /> Call us now — {PHONE}
              </a>
            </div>
          )}

          <p className="mt-6 text-[11px] text-muted-foreground">
            * Indicative figures based on ₹8/kWh average tariff, 4.5 peak sun-hours and standard installation. Final design, cost and subsidy depend on site survey, sanctioned load and discom policy.
          </p>
        </div>
      </div>
    </section>
  );
}
