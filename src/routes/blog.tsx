import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRight } from "lucide-react";
import gFarm from "@/assets/gallery-farm.jpg";
import gIndustrial from "@/assets/gallery-industrial.jpg";
import gResidential from "@/assets/gallery-residential.jpg";
import gAssembly from "@/assets/gallery-assembly.jpg";
import gRooftop from "@/assets/gallery-rooftop.jpg";
import gTeam from "@/assets/gallery-team.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Insights & News — SunBERQ Solar" },
      { name: "description", content: "Articles, news and guides on solar adoption, battery storage and renewable energy in India." },
      { property: "og:title", content: "SunBERQ Insights" },
      { property: "og:description", content: "Renewable energy stories & guides." },
      { property: "og:url", content: "/blog" },
      { property: "og:image", content: gFarm },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

const posts = [
  { title: "Why TOPCon is overtaking PERC in Indian rooftops", date: "May 18, 2026", tag: "Technology", img: gRooftop, excerpt: "The next-gen cell technology promises better low-light performance and lower degradation." },
  { title: "How LFP batteries handle Indian summers", date: "Apr 30, 2026", tag: "Battery", img: gAssembly, excerpt: "Thermal management and BMS choices that decide a battery's real lifespan." },
  { title: "A 600 kWp factory rooftop in five weeks", date: "Apr 12, 2026", tag: "Case Study", img: gIndustrial, excerpt: "Inside a recent SunBERQ commercial commissioning." },
  { title: "What homeowners get wrong about net-metering", date: "Mar 25, 2026", tag: "Guide", img: gResidential, excerpt: "Three myths that quietly shrink your solar ROI." },
  { title: "Inside our Aligarh battery assembly line", date: "Mar 02, 2026", tag: "Inside SunBERQ", img: gTeam, excerpt: "A walk-through of our quality, traceability and burn-in process." },
  { title: "Solar farms at sunset: aerial photography from a 12 MW site", date: "Feb 14, 2026", tag: "Field Notes", img: gFarm, excerpt: "Stories from one of our largest installations." },
];

function Blog() {
  return (
    <>
      <PageHeader
        eyebrow="Insights & News"
        title={<>Solar, simplified.</>}
        description="Guides, deep dives and field notes from our engineers."
      />
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.06}>
              <article className="group h-full rounded-3xl overflow-hidden border border-border/60 bg-card hover:shadow-elevated transition-all">
                <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full glass text-xs font-semibold text-graphite">{p.tag}</span>
                </div>
                <div className="p-6">
                  <div className="text-xs text-muted-foreground">{p.date}</div>
                  <h3 className="mt-2 font-bold text-lg leading-snug group-hover:text-primary transition">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  <Link to="/blog" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Read more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
