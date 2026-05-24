import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";
import { CheckCircle2, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Free Solar Quote — SunBERQ" },
      { name: "description", content: "Request a customised solar quote from SunBERQ. Free, no-obligation system design and ROI estimate." },
      { property: "og:title", content: "Get a Free Solar Quote" },
      { property: "og:description", content: "Custom solar design tailored to your roof and load." },
      { property: "og:url", content: "/quote" },
    ],
    links: [{ rel: "canonical", href: "/quote" }],
  }),
  component: Quote,
});

const steps = ["Property", "Energy use", "Contact"];

function Quote() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const last = step === steps.length - 1;

  return (
    <>
      <PageHeader
        eyebrow="Free quote"
        title={<>Design your <span className="text-gradient-solar">solar system</span> in 60 seconds.</>}
        description="Answer three short questions. We'll come back with a tailored layout, BOM and savings estimate."
      />
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-3xl bg-card border border-border/60 shadow-soft p-6 sm:p-10">
              {done ? (
                <div className="text-center py-10">
                  <div className="mx-auto w-14 h-14 rounded-full bg-gradient-solar text-white inline-flex items-center justify-center shadow-glow">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold">Your quote request is in.</h3>
                  <p className="mt-2 text-muted-foreground max-w-md mx-auto">A SunBERQ engineer will prepare your system design and reach out within one business day.</p>
                </div>
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
                      <Select label="Property type" options={["Residential", "Commercial", "Industrial", "Agriculture", "Institution"]} />
                      <Select label="Roof type" options={["RCC / flat", "Metal sheet", "Tiled", "Ground mount"]} />
                      <Input label="Approx roof area (sq ft)" />
                      <Input label="City / Pincode" />
                    </div>
                  )}
                  {step === 1 && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input label="Average monthly bill (₹)" />
                      <Select label="Backup needed?" options={["No backup", "Critical loads only", "Whole home", "Industrial backup"]} />
                      <Select label="Timeline" options={["Immediate", "Within 1 month", "1–3 months", "Just exploring"]} />
                      <Select label="Budget range" options={["Under ₹2L", "₹2L – ₹5L", "₹5L – ₹15L", "₹15L+"]} />
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
                      {last ? "Submit" : "Next"} <ArrowRight className="w-4 h-4" />
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

function Input({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input type={type} className="mt-1.5 w-full h-11 px-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none" />
    </div>
  );
}
function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select className="mt-1.5 w-full h-11 px-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
