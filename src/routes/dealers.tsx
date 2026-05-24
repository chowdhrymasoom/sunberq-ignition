import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";
import { CheckCircle2, Handshake, TrendingUp, Headphones, Award } from "lucide-react";

export const Route = createFileRoute("/dealers")({
  head: () => ({
    meta: [
      { title: "Dealer & Distributor Program — SunBERQ" },
      { name: "description", content: "Partner with SunBERQ. Become an authorised solar dealer or distributor across India." },
      { property: "og:title", content: "Become a SunBERQ Dealer" },
      { property: "og:description", content: "Grow your business with India's next-generation solar brand." },
      { property: "og:url", content: "/dealers" },
    ],
    links: [{ rel: "canonical", href: "/dealers" }],
  }),
  component: Dealers,
});

const perks = [
  { icon: TrendingUp, title: "Strong margins", desc: "Dealer pricing structured for healthy, scalable profitability." },
  { icon: Award, title: "Co-branded marketing", desc: "Local creatives, lead funnels and digital campaign support." },
  { icon: Headphones, title: "Engineering support", desc: "Design help, BOMs, and on-call technical mentoring." },
  { icon: Handshake, title: "Protected territory", desc: "Defined zones to grow without channel conflict." },
];

function Dealers() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader
        eyebrow="Partner with us"
        title={<>Build a solar business with <span className="text-gradient-solar">SunBERQ.</span></>}
        description="We're expanding our authorised dealer & distributor network across India. Apply below."
      />

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {perks.map((p) => (
              <Reveal key={p.title}>
                <div className="h-full p-6 rounded-2xl border border-border/60 bg-card hover:bg-gradient-glow transition">
                  <p.icon className="w-6 h-6 text-primary" />
                  <h3 className="mt-4 font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid lg:grid-cols-2 gap-10 items-start">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold">Who we partner with</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Established EPCs, electrical contractors, system integrators and entrepreneurs with deep local market access.
                We back you with product, training and engineering — you bring the customer relationship.
              </p>
              <ul className="mt-6 space-y-2">
                {[
                  "Minimum 1 year of business operations preferred",
                  "Local sales & service capability",
                  "Commitment to SunBERQ branding standards",
                  "Investment in starter inventory & demo kit",
                ].map((t) => (
                  <li key={t} className="flex gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />{t}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="p-6 sm:p-8 rounded-3xl bg-card border border-border/60 shadow-soft"
              >
                {sent ? (
                  <div className="text-center py-10">
                    <CheckCircle2 className="w-10 h-10 text-primary mx-auto" />
                    <h3 className="mt-4 text-xl font-bold">Application received</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Our channel team will reach out within 2 business days.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold">Dealer / Distributor enquiry</h3>
                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      {[
                        ["Full name", "name", "text"],
                        ["Company", "company", "text"],
                        ["Phone", "phone", "tel"],
                        ["Email", "email", "email"],
                        ["City", "city", "text"],
                        ["State", "state", "text"],
                      ].map(([l, n, t]) => (
                        <div key={n}>
                          <label className="text-sm font-medium">{l}</label>
                          <input required type={t} name={n} className="mt-1.5 w-full h-11 px-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none" />
                        </div>
                      ))}
                      <div className="sm:col-span-2">
                        <label className="text-sm font-medium">Business background</label>
                        <textarea rows={3} className="mt-1.5 w-full p-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none" />
                      </div>
                    </div>
                    <button type="submit" className="mt-6 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-gradient-solar text-white font-semibold shadow-glow">
                      Submit application
                    </button>
                  </>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
