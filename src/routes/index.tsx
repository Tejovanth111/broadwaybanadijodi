import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Database,
  Cloud,
  Cpu,
  Workflow,
  Play,
  Shield,
  Globe,
  Users,
  Award,
  Linkedin,
  Twitter,
  Github,
  Mail,
  MapPin,
  Phone,
  Check,
} from "lucide-react";

import heroViz from "@/assets/hero-ai-viz.jpg";
import leader1 from "@/assets/leader-1.jpg";
import leader2 from "@/assets/leader-2.jpg";
import leader3 from "@/assets/leader-3.jpg";
import indHealth from "@/assets/industry-healthcare.jpg";
import indFinance from "@/assets/industry-finance.jpg";
import indRetail from "@/assets/industry-retail.jpg";
import indMfg from "@/assets/industry-manufacturing.jpg";
import indLog from "@/assets/industry-logistics.jpg";
import indTech from "@/assets/industry-technology.jpg";
import case1 from "@/assets/case-1.jpg";
import case2 from "@/assets/case-2.jpg";
import case3 from "@/assets/case-3.jpg";
import insight1 from "@/assets/insight-1.jpg";
import insight2 from "@/assets/insight-2.jpg";
import insight3 from "@/assets/insight-3.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
});

/* ---------- helpers ---------- */

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Counter({ end, suffix = "", prefix = "", duration = 1600 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

function Reveal({ children, delay = 0, as: As = "div" as const, className = "" }: { children: React.ReactNode; delay?: number; as?: any; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <As
      ref={ref as any}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 700ms ${delay}ms cubic-bezier(0.22,1,0.36,1), transform 700ms ${delay}ms cubic-bezier(0.22,1,0.36,1)`,
      }}
    >
      {children}
    </As>
  );
}

/* ---------- brand ---------- */

function CognineLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative grid h-8 w-8 place-items-center rounded-lg bg-[var(--gradient-electric)]">
        <div className="absolute inset-[3px] rounded-md bg-background" />
        <div className="relative h-2 w-2 rounded-full bg-[var(--gradient-electric)] shadow-[0_0_12px_var(--electric)]" />
      </div>
      <span className="text-lg font-semibold tracking-tight font-[family-name:var(--font-display)]">
        Cognine
      </span>
    </div>
  );
}

/* ---------- nav ---------- */

const NAV = [
  { label: "Solutions", href: "#solutions" },
  { label: "Industries", href: "#industries" },
  { label: "Case Studies", href: "#cases" },
  { label: "Insights", href: "#insights" },
  { label: "About", href: "#why" },
  { label: "Careers", href: "#contact" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-6 px-6 py-4 lg:px-10">
        <Link to="/" aria-label="Cognine home">
          <CognineLogo />
        </Link>
        <nav className="hidden justify-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:bg-surface hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline"
          >
            Sign in
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
          >
            Book a consultation
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </a>
          <button
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-md border border-border lg:hidden"
          >
            <div className="space-y-1">
              <span className="block h-px w-4 bg-foreground" />
              <span className="block h-px w-4 bg-foreground" />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------- sections ---------- */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 lg:pt-44 lg:pb-32">
      {/* backdrop */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroViz}
          alt=""
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 grid-lines opacity-40" />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-10 lg:col-start-2 text-center">
            <Reveal>
              <div className="mx-auto inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-widest text-muted-foreground">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--electric)] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--electric)]" />
                </span>
                Introducing Cognine AI Foundry — now in general availability
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-8 text-[44px] leading-[1.02] font-semibold tracking-[-0.03em] sm:text-6xl lg:text-[88px] xl:text-[96px]">
                Engineered intelligence
                <br />
                for the <span className="text-gradient">Fortune 500</span>.
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                Cognine partners with the world's most ambitious enterprises to
                deploy AI, modernize data platforms, and engineer the products
                that move markets.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:opacity-90"
                >
                  Book a consultation
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#cases"
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 backdrop-blur px-6 py-3.5 text-sm font-medium text-foreground transition hover:bg-surface"
                >
                  <Play className="h-3.5 w-3.5" />
                  View case studies
                </a>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-16 grid grid-cols-2 gap-y-6 border-t border-border pt-8 sm:grid-cols-4">
                {[
                  { k: "SOC 2 Type II", v: "Certified" },
                  { k: "ISO 27001", v: "Compliant" },
                  { k: "HIPAA", v: "Ready" },
                  { k: "GDPR", v: "Aligned" },
                ].map((t) => (
                  <div key={t.k} className="text-center">
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                      {t.k}
                    </div>
                    <div className="mt-1 text-sm font-medium">{t.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedBy() {
  const logos = [
    "AXIS BANK", "MERIDIAN", "NORTHWIND", "HELIOS", "QUANTUMFORGE",
    "STRATOS", "OMNIRAIL", "VANTA CORP", "NOVELIS", "PARAGON",
    "SIGMA HEALTH", "BLUEFIN",
  ];
  return (
    <section className="border-y border-border bg-background/80 py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-center text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Trusted by category leaders across 4 continents
        </p>
        <div className="mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-marquee gap-16">
            {[...logos, ...logos].map((l, i) => (
              <div
                key={i}
                className="text-lg font-semibold tracking-[0.15em] text-muted-foreground/70 whitespace-nowrap"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Outcomes() {
  const items = [
    { end: 42, suffix: "%", label: "Cost reduction on operational workloads", note: "Average across 60+ engagements" },
    { end: 8, suffix: "×", label: "Faster processing on data & inference pipelines", note: "Vs. legacy baseline" },
    { end: 93, suffix: "%", label: "AI adoption across piloted business units", note: "Within 6 months of rollout" },
    { end: 400, suffix: "+", label: "Cloud & data platforms modernized", note: "AWS · Azure · GCP · Databricks" },
    { end: 1200, suffix: "+", label: "Engineers, designers & AI scientists", note: "Delivering across 12 timezones" },
  ];
  return (
    <section id="outcomes" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                / 01 — Outcomes
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Outcomes,
                <br />
                not services.
              </h2>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                We're measured by what changes on your P&amp;L — cycle time,
                unit economics, adoption, and delivery velocity — not by
                deliverables shipped.
              </p>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-y-0">
              {items.slice(0, 4).map((it, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className={`p-8 ${i % 2 === 0 ? "sm:border-r border-border" : ""} ${i < 2 ? "sm:border-b border-border" : ""}`}>
                    <div className="text-5xl font-semibold tracking-tight sm:text-6xl">
                      <Counter end={it.end} suffix={it.suffix} />
                    </div>
                    <div className="mt-4 text-sm text-foreground">{it.label}</div>
                    <div className="mt-2 text-xs text-muted-foreground">{it.note}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={320}>
              <div className="mt-6 rounded-2xl glass p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <div className="text-5xl font-semibold tracking-tight sm:text-6xl">
                      <Counter end={items[4].end} suffix={items[4].suffix} />
                    </div>
                    <div className="mt-3 text-sm">{items[4].label}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{items[4].note}</div>
                  </div>
                  <div className="hidden sm:block h-16 w-16 rounded-full bg-[var(--gradient-electric)] opacity-70 animate-pulse-glow" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

const SOLUTIONS = [
  {
    icon: Sparkles,
    title: "AI & Generative AI",
    impact: "Ship agentic workflows, copilots, and RAG systems that measurably lift revenue and reduce cost-to-serve.",
    tags: ["LLMs", "Agents", "RAG", "Evals"],
  },
  {
    icon: Database,
    title: "Data Engineering",
    impact: "Unify data across the enterprise with lakehouses, streaming pipelines, and governance built to scale.",
    tags: ["Lakehouse", "Streaming", "Governance"],
  },
  {
    icon: Cloud,
    title: "Cloud Transformation",
    impact: "Migrate, modernize and optimize workloads across AWS, Azure and GCP — with FinOps built in from day one.",
    tags: ["Migration", "Landing zones", "FinOps"],
  },
  {
    icon: Cpu,
    title: "Digital Engineering",
    impact: "Product engineering squads that ship polished, performant software for the web, mobile and edge.",
    tags: ["Web", "Mobile", "Edge"],
  },
  {
    icon: Workflow,
    title: "Intelligent Automation",
    impact: "Redesign operations end-to-end with process intelligence, RPA and AI-native decisioning.",
    tags: ["Process AI", "RPA", "Decisioning"],
  },
];

function Solutions() {
  const [active, setActive] = useState(0);
  return (
    <section id="solutions" className="relative border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 items-end gap-6">
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                / 02 — Solutions
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Five capabilities.
                <br />
                One operating system for AI-native enterprises.
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <Reveal delay={120}>
              <p className="text-muted-foreground">
                Composable across your stack. Delivered by senior teams. Priced
                to outcomes.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-4">
          {SOLUTIONS.map((s, i) => {
            const Icon = s.icon;
            const isActive = active === i;
            return (
              <button
                key={s.title}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group relative col-span-12 overflow-hidden rounded-3xl border border-border p-8 text-left transition-all duration-500 sm:col-span-6 lg:col-span-4 ${
                  isActive
                    ? "bg-surface-elevated glow-ring"
                    : "bg-surface hover:bg-surface-elevated"
                }`}
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--gradient-electric)] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-20" />
                <div className="flex items-start justify-between">
                  <div
                    className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-background"
                    aria-hidden
                  >
                    <Icon className="h-5 w-5 text-[var(--cyan)]" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <div className="mt-8 text-2xl font-semibold tracking-tight">
                  {s.title}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.impact}
                </p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 inline-flex items-center gap-1 text-xs font-medium text-foreground/80">
                  Learn more
                  <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const INDUSTRIES = [
  { name: "Healthcare", img: indHealth, blurb: "Clinical AI, payer intelligence, patient experience." },
  { name: "Financial Services", img: indFinance, blurb: "Real-time risk, fraud AI, embedded finance." },
  { name: "Retail", img: indRetail, blurb: "Personalization, unified commerce, in-store AI." },
  { name: "Manufacturing", img: indMfg, blurb: "Predictive maintenance, digital twins, quality AI." },
  { name: "Logistics", img: indLog, blurb: "Route optimization, warehouse AI, supply visibility." },
  { name: "Technology", img: indTech, blurb: "Platform modernization, AI copilots, dev productivity." },
];

function Industries() {
  const [active, setActive] = useState(0);
  const current = INDUSTRIES[active];
  return (
    <section id="industries" className="relative border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                / 03 — Industries
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Deep expertise
                <br />
                where regulation meets scale.
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5">
            <ul className="divide-y divide-border border-y border-border">
              {INDUSTRIES.map((ind, i) => {
                const isActive = active === i;
                return (
                  <li key={ind.name}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className="group flex w-full items-center justify-between py-5 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`h-1.5 w-1.5 rounded-full transition ${
                            isActive ? "bg-[var(--electric)] shadow-[0_0_10px_var(--electric)]" : "bg-border"
                          }`}
                        />
                        <span
                          className={`text-2xl font-medium tracking-tight transition sm:text-3xl ${
                            isActive ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {ind.name}
                        </span>
                      </div>
                      <ArrowUpRight
                        className={`h-4 w-4 transition ${
                          isActive ? "text-foreground opacity-100" : "opacity-0 group-hover:opacity-60"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-surface">
              {INDUSTRIES.map((ind, i) => (
                <img
                  key={ind.name}
                  src={ind.img}
                  alt={ind.name}
                  width={1200}
                  height={800}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                    active === i ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Industry
                </div>
                <div className="mt-2 text-3xl font-semibold tracking-tight">
                  {current.name}
                </div>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  {current.blurb}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const CASES = [
  {
    industry: "Financial Services",
    img: case2,
    challenge: "A top-5 US broker needed to cut real-time risk latency by an order of magnitude.",
    solution: "Rebuilt the risk platform on Databricks + streaming ML with a new agentic evaluation layer.",
    outcome: "12× faster risk calc",
    metric: "$38M saved / yr",
  },
  {
    industry: "Healthcare",
    img: case3,
    challenge: "A national payer struggled to route millions of prior-auth requests without human review.",
    solution: "Deployed a HIPAA-ready RAG system with clinician-in-the-loop guardrails and audit trails.",
    outcome: "74% auto-adjudication",
    metric: "22-day cycle → 3 days",
  },
  {
    industry: "Manufacturing",
    img: case1,
    challenge: "A global OEM lost margin to unplanned downtime across 40 plants.",
    solution: "Built a predictive maintenance twin fusing PLC telemetry, vision AI and work-order data.",
    outcome: "31% less downtime",
    metric: "9-mo payback",
  },
];

function CaseStudies() {
  return (
    <section id="cases" className="relative border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 items-end gap-6">
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                / 04 — Featured work
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Enterprises we've moved.
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <Reveal delay={120}>
              <a
                href="#contact"
                className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                Browse all case studies
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6">
          {CASES.map((c, i) => (
            <Reveal key={i} delay={i * 80} className={i === 0 ? "col-span-12 lg:col-span-8" : "col-span-12 sm:col-span-6 lg:col-span-4"}>
              <a
                href="#contact"
                className="group relative block h-full overflow-hidden rounded-3xl border border-border bg-surface transition hover:border-white/20"
              >
                <div className={`relative overflow-hidden ${i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                  <img
                    src={c.img}
                    alt={c.industry}
                    width={1400}
                    height={900}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute left-6 top-6 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-widest backdrop-blur">
                    {c.industry}
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="text-3xl font-semibold tracking-tight">
                      {c.outcome}
                    </div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      {c.metric}
                    </div>
                  </div>
                  {i === 0 && (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Challenge</div>
                        <p className="mt-1 text-sm">{c.challenge}</p>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Solution</div>
                        <p className="mt-1 text-sm">{c.solution}</p>
                      </div>
                    </div>
                  )}
                  {i !== 0 && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      {c.challenge}
                    </p>
                  )}
                  <div className="mt-6 inline-flex items-center gap-1 text-xs font-medium">
                    Read case study
                    <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyCognine() {
  const facts = [
    { k: "14", suffix: "+", label: "Years engineering for the enterprise" },
    { k: "1,200", suffix: "+", label: "Engineers, scientists & designers" },
    { k: "12", suffix: "", label: "Global delivery centers" },
    { k: "35", suffix: "+", label: "Fortune 500 clients" },
  ];
  return (
    <section id="why" className="relative border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                / 05 — Why Cognine
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Senior teams.
                <br />
                Serious systems.
                <br />
                <span className="text-gradient">Global delivery.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                We are engineered for regulated, mission-critical work — from
                the earliest AI prototypes to platforms that run 24/7 in
                production.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["SOC 2 Type II", "ISO 27001", "HIPAA Ready", "GDPR", "AWS Advanced", "Databricks Elite", "Microsoft Gold"].map((c) => (
                  <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs">
                    <Shield className="h-3 w-3 text-[var(--cyan)]" />
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border">
              {facts.map((f, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="bg-surface p-8 h-full">
                    <div className="text-5xl font-semibold tracking-tight sm:text-6xl">
                      <Counter end={parseInt(f.k.replace(/,/g, ""))} suffix={f.suffix} />
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground">{f.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={320}>
              <div className="mt-6 rounded-3xl border border-border bg-surface p-8">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4 text-[var(--cyan)]" />
                  Delivery centers in
                </div>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  {["New York", "Dallas", "London", "Frankfurt", "Dubai", "Bangalore", "Hyderabad", "Singapore", "Sydney"].map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

const TECH = [
  "AWS", "Azure", "Google Cloud", "Databricks", "Snowflake",
  "Salesforce", "OpenAI", "Anthropic", "NVIDIA", "MongoDB",
  "Kafka", "dbt", "LangChain", "PyTorch", "Hugging Face",
  "Kubernetes", "Terraform", "Vercel",
];

function Technology() {
  return (
    <section className="relative border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                / 06 — Ecosystem
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                A technology stack
                <br />
                without compromises.
              </h2>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                Partnerships and certifications across the platforms our
                clients standardize on — plus the open-source frontier we
                help push.
              </p>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <div className="grid grid-cols-3 gap-px overflow-hidden rounded-3xl border border-border bg-border">
              {TECH.map((t, i) => (
                <div
                  key={t}
                  className="group relative flex h-24 items-center justify-center bg-surface transition hover:bg-surface-elevated"
                  style={{ animation: `fade-up 500ms ${i * 40}ms both` }}
                >
                  <span className="text-sm font-medium tracking-tight text-muted-foreground transition group-hover:text-foreground">
                    {t}
                  </span>
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                    <div className="absolute inset-x-0 top-0 h-px bg-[var(--gradient-electric)]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PHASES = [
  { k: "Discover", d: "Deep-dive into your goals, systems and constraints. Prioritize by impact." },
  { k: "Design", d: "Architect the solution and de-risk with rapid prototypes and evals." },
  { k: "Build", d: "Senior squads ship production-grade code, models and pipelines." },
  { k: "Deploy", d: "Cutover playbooks, observability, guardrails and change management." },
  { k: "Scale", d: "Roll out globally, tune for cost and performance, transfer ownership." },
];

function Delivery() {
  return (
    <section className="relative border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                / 07 — Delivery framework
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                How we get from
                <br />
                signal to scale.
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {PHASES.map((p, i) => (
              <Reveal key={p.k} delay={i * 100}>
                <li className="relative">
                  <div className="flex items-center gap-3">
                    <div className="relative grid h-12 w-12 place-items-center rounded-full border border-border bg-background">
                      <div className="absolute inset-0 rounded-full bg-[var(--gradient-electric)] opacity-20 blur-md" />
                      <span className="relative font-mono text-xs">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <div className="mt-6 text-2xl font-semibold tracking-tight">
                    {p.k}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const QUOTES = [
  {
    q: "Cognine gave us an AI capability that would have taken us 18 months to build. They shipped in 11 weeks.",
    a: "Chief Data Officer",
    c: "Global Insurance Carrier",
  },
  {
    q: "This is the most technically deep partner we've ever worked with. Their senior engineers set the bar for our own team.",
    a: "SVP Engineering",
    c: "Fortune 100 Retailer",
  },
];

function Testimonials() {
  return (
    <section className="relative border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                / 08 — Voices
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                What leaders say
                <br />
                after we ship.
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {QUOTES.map((q, i) => (
                <Reveal key={i} delay={i * 100}>
                  <figure className="h-full rounded-3xl glass p-8">
                    <div className="text-6xl leading-none text-[var(--electric)]/60 font-[family-name:var(--font-display)]">
                      "
                    </div>
                    <blockquote className="mt-2 text-xl leading-snug tracking-tight text-foreground">
                      {q.q}
                    </blockquote>
                    <figcaption className="mt-8 flex items-center gap-3 border-t border-border pt-6">
                      <div className="h-9 w-9 rounded-full bg-[var(--gradient-electric)] opacity-80" />
                      <div>
                        <div className="text-sm font-medium">{q.a}</div>
                        <div className="text-xs text-muted-foreground">{q.c}</div>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const LEADERS = [
  { name: "Ravi Menon", role: "Founder & CEO", img: leader1, bio: "Two decades scaling engineering orgs across financial services and enterprise SaaS." },
  { name: "Ana Petrova", role: "President & CTO", img: leader2, bio: "Formerly VP Engineering at a hyperscaler. Leads AI Foundry and platform R&D." },
  { name: "Marc Ellison", role: "Chief AI Officer", img: leader3, bio: "Researcher-turned-operator. Author of the applied-agents playbook we run in production." },
];

function Leadership() {
  return (
    <section className="relative border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                / 09 — Leadership
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Operators who've
                <br />
                shipped at scale.
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6">
          {LEADERS.map((l, i) => (
            <Reveal key={l.name} delay={i * 100} className="col-span-12 sm:col-span-6 lg:col-span-4">
              <article className="group relative overflow-hidden rounded-3xl border border-border bg-surface">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={l.img}
                    alt={l.name}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                  <a
                    href="#"
                    aria-label={`${l.name} on LinkedIn`}
                    className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full glass transition hover:bg-surface-elevated"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
                <div className="p-6">
                  <div className="text-xl font-semibold tracking-tight">{l.name}</div>
                  <div className="text-sm text-muted-foreground">{l.role}</div>
                  <p className="mt-3 text-sm text-muted-foreground">{l.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const INSIGHTS = [
  { cat: "AI", title: "The agentic enterprise: why 2026 is the year of production agents", read: "9 min", author: "Ravi Menon", img: insight3 },
  { cat: "Data", title: "Rebuilding the data platform for real-time risk", read: "6 min", author: "Ana Petrova", img: insight2 },
  { cat: "Operations", title: "Warehouse automation that pays back in nine months", read: "5 min", author: "Marc Ellison", img: insight1 },
];

function Insights() {
  const [cat, setCat] = useState("All");
  const cats = ["All", "AI", "Data", "Cloud", "Operations"];
  const [featured, ...rest] = INSIGHTS;
  const filtered = cat === "All" ? INSIGHTS : INSIGHTS.filter((i) => i.cat === cat);
  return (
    <section id="insights" className="relative border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 items-end gap-6">
          <div className="col-span-12 lg:col-span-6">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                / 10 — Insights
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Field notes from the frontier.
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Reveal delay={100}>
              <div className="flex flex-wrap gap-1.5 lg:justify-end">
                {cats.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs transition ${
                      cat === c
                        ? "border-transparent bg-foreground text-background"
                        : "border-border bg-surface text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6">
          <Reveal className="col-span-12 lg:col-span-7">
            <a href="#" className="group block overflow-hidden rounded-3xl border border-border bg-surface">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={featured.img} alt="" width={1200} height={800} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                  <span className="rounded-full border border-border px-2 py-0.5 text-[10px]">{featured.cat}</span>
                  <span>{featured.read} read</span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {featured.title}
                </h3>
                <div className="mt-6 text-sm text-muted-foreground">By {featured.author}</div>
              </div>
            </a>
          </Reveal>
          <div className="col-span-12 grid gap-6 lg:col-span-5">
            {(cat === "All" ? rest : filtered.filter((x) => x !== featured)).map((it, i) => (
              <Reveal key={i} delay={i * 80}>
                <a href="#" className="group grid grid-cols-[120px_1fr] items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition hover:bg-surface-elevated">
                  <div className="aspect-square overflow-hidden rounded-xl">
                    <img src={it.img} alt="" width={400} height={400} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                      <span className="rounded-full border border-border px-2 py-0.5">{it.cat}</span>
                      <span>{it.read}</span>
                    </div>
                    <div className="mt-2 text-base font-medium leading-snug tracking-tight">
                      {it.title}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground truncate">By {it.author}</div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative border-t border-border py-32">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-6">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                / 11 — Let's talk
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Ready when
                <br />
                you are.
              </h2>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                Book a 30-minute working session with our leadership team. We'll
                pressure-test your priorities and share how we'd approach them.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  { i: Mail, k: "Email", v: "hello@cognine.com" },
                  { i: Phone, k: "Phone", v: "+1 (415) 555-0142" },
                ].map(({ i: Icon, k, v }) => (
                  <div key={k} className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface">
                      <Icon className="h-4 w-4 text-[var(--cyan)]" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div>
                      <div className="text-sm">{v}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Offices</div>
                <div className="mt-3 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                  {[
                    { c: "New York", a: "220 Park Ave" },
                    { c: "London", a: "1 King William St" },
                    { c: "Singapore", a: "8 Marina Blvd" },
                    { c: "Bangalore", a: "Prestige Trade Tower" },
                  ].map((o) => (
                    <div key={o.c} className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{o.c}</div>
                        <div className="text-xs text-muted-foreground">{o.a}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Reveal delay={120}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="rounded-3xl border border-border bg-surface/80 p-8 backdrop-blur-xl"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {[
                    { n: "name", l: "Full name", t: "text" },
                    { n: "email", l: "Work email", t: "email" },
                    { n: "company", l: "Company", t: "text" },
                    { n: "role", l: "Role", t: "text" },
                  ].map((f) => (
                    <label key={f.n} className="block">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{f.l}</span>
                      <input
                        type={f.t}
                        name={f.n}
                        required
                        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[var(--electric)] focus:ring-2 focus:ring-[var(--electric)]/25"
                      />
                    </label>
                  ))}
                </div>
                <label className="mt-5 block">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">What are you exploring?</span>
                  <textarea
                    name="msg"
                    rows={4}
                    required
                    className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-[var(--electric)] focus:ring-2 focus:ring-[var(--electric)]/25"
                  />
                </label>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <p className="text-xs text-muted-foreground">
                    We reply within one business day.
                  </p>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90"
                  >
                    {sent ? (
                      <>
                        <Check className="h-4 w-4" /> Sent
                      </>
                    ) : (
                      <>
                        Book consultation
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { h: "Solutions", l: ["AI & GenAI", "Data Engineering", "Cloud", "Digital Engineering", "Automation"] },
    { h: "Industries", l: ["Healthcare", "Financial Services", "Retail", "Manufacturing", "Logistics", "Technology"] },
    { h: "Company", l: ["About", "Leadership", "Careers", "Newsroom", "Contact"] },
    { h: "Resources", l: ["Case Studies", "Insights", "Trust Center", "Security", "Privacy"] },
  ];
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <CognineLogo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Engineered intelligence for the world's most demanding enterprises.
            </p>
            <div className="mt-6 flex gap-2">
              {[Linkedin, Twitter, Github].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface transition hover:bg-surface-elevated"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-12 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {cols.map((c) => (
              <div key={c.h}>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{c.h}</div>
                <ul className="mt-4 space-y-2 text-sm">
                  {c.l.map((x) => (
                    <li key={x}>
                      <a href="#" className="text-foreground/80 hover:text-foreground">
                        {x}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Cognine, Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <div className="relative bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <TrustedBy />
        <Outcomes />
        <Solutions />
        <Industries />
        <CaseStudies />
        <WhyCognine />
        <Technology />
        <Delivery />
        <Testimonials />
        <Leadership />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
