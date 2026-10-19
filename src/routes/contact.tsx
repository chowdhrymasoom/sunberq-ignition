import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, Building2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SunBERQ — Talk to our solar experts" },
      { name: "description", content: "Get in touch with SunBERQ. Corporate office at DLF Prime Tower, Okhla, New Delhi — manufacturing facility in Aligarh, Uttar Pradesh. WhatsApp, email or visit us." },
      { property: "og:title", content: "Contact SunBERQ" },
      { property: "og:description", content: "Reach our solar engineering team across India." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Let's design your <span className="text-gradient-solar">solar future.</span></>}
        description="Tell us what you need — residential, commercial or industrial. We'll respond within one business day."
      />

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-8">
          <Reveal className="lg:col-span-3">
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="p-6 sm:p-10 rounded-3xl bg-card border border-border/60 shadow-soft"
            >
              {sent ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-14 h-14 rounded-full bg-gradient-solar text-white inline-flex items-center justify-center shadow-glow">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold">Thank you — we'll be in touch.</h3>
                  <p className="mt-2 text-muted-foreground">A SunBERQ engineer will contact you shortly.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">Send a message</h2>
                  <p className="mt-1 text-muted-foreground text-sm">All fields required.</p>
                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    <Field label="Name" name="name" />
                    <Field label="Phone" name="phone" type="tel" />
                    <Field label="Email" name="email" type="email" />
                    <Field label="City" name="city" />
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium">Requirement</label>
                      <select className="mt-1.5 w-full h-12 px-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none">
                        <option>Residential rooftop</option>
                        <option>Commercial / office</option>
                        <option>Industrial / MW-scale</option>
                        <option>Battery storage</option>
                        <option>Dealer / distributor</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium">Message</label>
                      <textarea rows={4} className="mt-1.5 w-full p-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                  </div>
                  <button type="submit" className="mt-6 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-gradient-solar text-white font-semibold shadow-glow">
                    Send message <Send className="w-4 h-4" />
                  </button>
                </>
              )}
            </form>
          </Reveal>

          <Reveal className="lg:col-span-2 space-y-4">
            {[
              { icon: Building2, title: "Corporate Office", text: "DPT 808B, F 79-80, 8th Floor, DLF Prime Tower, Okhla, New Delhi 110020" },
              { icon: MapPin, title: "Manufacturing Facility", text: "Battery Assembly Unit, Aligarh, Uttar Pradesh, India" },
              { icon: Phone, title: "Call us", text: "+91 00000 00000 (Mon–Sat, 9am–7pm)" },
              { icon: Mail, title: "Email", text: "hello@sunberq.in" },
            ].map((c) => (
              <div key={c.title} className="p-6 rounded-2xl border border-border/60 bg-card hover:shadow-soft transition">
                <c.icon className="w-6 h-6 text-primary" />
                <h3 className="mt-3 font-bold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
              </div>
            ))}
            <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-2xl bg-gradient-solar text-white shadow-glow hover:scale-[1.02] transition">
              <MessageCircle className="w-6 h-6" />
              <h3 className="mt-3 font-bold">Chat on WhatsApp</h3>
              <p className="mt-1 text-sm text-white/85">Fastest way to reach us.</p>
            </a>
            <div className="rounded-2xl overflow-hidden border border-border/60 aspect-video">
              <iframe
                title="SunBERQ corporate office — DLF Prime Tower, Okhla, New Delhi"
                src="https://www.google.com/maps?q=DLF+Prime+Tower,+Okhla,+New+Delhi+110020&output=embed"
                loading="lazy"
                className="w-full h-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      <input id={name} name={name} type={type} required className="mt-1.5 w-full h-12 px-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none" />
    </div>
  );
}
