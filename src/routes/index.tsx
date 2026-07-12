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
  Linkedin,
  Twitter,
  Github,
  Mail,
  MapPin,
  Phone,
  Check,
  Plus,
} from "lucide-react";

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

/* =========================================================
   HOOKS
   ========================================================= */

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

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const on = () => setY(window.scrollY);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return y;
}

function useMouse(active = true) {
  const [p, setP] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!active) return;
    const on = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setP({ x, y });
    };
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, [active]);
  return p;
}

function Counter({ end, suffix = "", prefix = "", duration = 1800 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
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

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 900ms ${delay}ms cubic-bezier(0.22,1,0.36,1), transform 900ms ${delay}ms cubic-bezier(0.22,1,0.36,1)`,
      }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   AURORA MESH BACKGROUND
   ========================================================= */

function Aurora({ intensity = 1 }: { intensity?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -inset-[20%] opacity-[0.55]"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.72 0.22 245) 0%, transparent 70%)",
          filter: `blur(80px) saturate(140%)`,
          animation: "aurora-drift 22s ease-in-out infinite",
          opacity: 0.55 * intensity,
        }}
      />
      <div
        className="absolute -inset-[20%]"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.85 0.15 200) 0%, transparent 65%)",
          filter: `blur(90px)`,
          animation: "aurora-drift-2 28s ease-in-out infinite",
          opacity: 0.5 * intensity,
        }}
      />
      <div
        className="absolute -inset-[10%]"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.55 0.28 300) 0%, transparent 60%)",
          filter: `blur(100px)`,
          animation: "aurora-drift 34s ease-in-out infinite reverse",
          opacity: 0.35 * intensity,
        }}
      />
      {/* film grain via svg */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.08] mix-blend-overlay" aria-hidden>
        <filter id="n">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#n)" />
      </svg>
    </div>
  );
}

/* =========================================================
   BRAND
   ========================================================= */

function CognineLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative grid h-8 w-8 place-items-center">
        <div className="absolute inset-0 rounded-[10px] bg-[var(--gradient-electric)] opacity-90" />
        <div className="absolute inset-[2px] rounded-[8px] bg-background" />
        <div className="relative h-2 w-2 rounded-full bg-[var(--gradient-electric)] shadow-[0_0_14px_var(--electric)]" />
      </div>
      <span className="text-[17px] font-semibold tracking-[-0.02em] font-[family-name:var(--font-display)]">
        Cognine
      </span>
    </div>
  );
}

/* =========================================================
   NAV
   ========================================================= */

const NAV = [
  { label: "Solutions", href: "#solutions" },
  { label: "Industries", href: "#industries" },
  { label: "Work", href: "#cases" },
  { label: "Insights", href: "#insights" },
  { label: "About", href: "#why" },
  { label: "Careers", href: "#contact" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div
          className={`grid grid-cols-[auto_1fr_auto] items-center gap-6 rounded-full px-4 py-2 transition-all duration-500 lg:px-6 ${
            scrolled ? "glass shadow-[0_10px_40px_-20px_oklch(0_0_0/0.6)]" : "bg-transparent"
          }`}
        >
          <Link to="/" aria-label="Cognine home">
            <CognineLogo />
          </Link>
          <nav className="hidden justify-center gap-1 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="rounded-full px-3.5 py-1.5 text-[13px] text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background transition"
            >
              <span className="relative z-10">Book a call</span>
              <ArrowRight className="relative z-10 h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </a>
            <button
              aria-label="Toggle navigation"
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full border border-border lg:hidden"
            >
              <div className="space-y-1">
                <span className="block h-px w-4 bg-foreground" />
                <span className="block h-px w-4 bg-foreground" />
              </div>
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="mx-4 mt-2 rounded-3xl glass p-3 lg:hidden">
          <nav className="flex flex-col gap-0.5">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
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

/* =========================================================
   KINETIC HEADLINE — word-in with stagger
   ========================================================= */

function Kinetic({ text, className = "", delayStart = 0, wordDelay = 90 }: { text: string; className?: string; delayStart?: number; wordDelay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] pr-[0.25em]">
          <span
            className="inline-block will-change-transform"
            style={{
              animation: `word-in 1.1s ${delayStart + i * wordDelay}ms cubic-bezier(0.22,1,0.36,1) both`,
            }}
            dangerouslySetInnerHTML={{ __html: w }}
          />
        </span>
      ))}
    </span>
  );
}

/* =========================================================
   HERO
   ========================================================= */

function Hero() {
  const y = useScrollY();
  const m = useMouse();
  return (
    <section className="relative isolate overflow-hidden pt-36 lg:pt-48 pb-24 lg:pb-40">
      {/* aurora backdrop with parallax */}
      <div
        className="absolute inset-0 -z-10"
        style={{ transform: `translateY(${y * 0.15}px)` }}
      >
        <Aurora />
        <div className="absolute inset-0 grid-lines opacity-[0.35]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* announcement pill */}
        <div className="flex justify-center">
          <Reveal>
            <a
              href="#solutions"
              className="group inline-flex items-center gap-3 rounded-full glass px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition hover:text-foreground"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--electric)] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--electric)]" />
              </span>
              Cognine AI Foundry · GA
              <span className="text-foreground/60 transition group-hover:translate-x-0.5">→</span>
            </a>
          </Reveal>
        </div>

        {/* headline — kinetic, monumental */}
        <h1 className="mt-10 text-center font-semibold tracking-[-0.045em] leading-[0.92] text-[52px] sm:text-[80px] lg:text-[128px] xl:text-[152px]">
          <span className="block">
            <Kinetic text="Intelligence," />
          </span>
          <span className="block">
            <Kinetic text="engineered." delayStart={140} />
          </span>
        </h1>

        {/* sub */}
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <Reveal delay={500}>
            <p className="text-balance text-lg text-muted-foreground sm:text-xl">
              Cognine builds the AI, data, and product platforms behind
              category-defining enterprises — from first prototype to global
              production.
            </p>
          </Reveal>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Reveal delay={620}>
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-4 text-sm font-medium text-background"
            >
              <span className="absolute inset-0 bg-foreground transition group-hover:scale-105" />
              <span className="absolute inset-0 bg-[var(--gradient-electric)] opacity-0 transition group-hover:opacity-100" />
              <span className="relative z-10 flex items-center gap-2">
                Book a consultation
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </a>
          </Reveal>
          <Reveal delay={720}>
            <a
              href="#cases"
              className="group inline-flex items-center gap-2 rounded-full glass px-7 py-4 text-sm font-medium transition hover:bg-white/5"
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-white/10">
                <Play className="h-2.5 w-2.5 fill-current" />
              </span>
              View case studies
            </a>
          </Reveal>
        </div>

        {/* floating hero object — 3D-ish orb with parallax */}
        <div className="relative mt-24 lg:mt-32">
          <Reveal delay={700}>
            <div
              className="relative mx-auto aspect-[16/8] w-full max-w-5xl"
              style={{
                transform: `perspective(1200px) rotateX(${8 - m.y * 3}deg) rotateY(${m.x * 3}deg)`,
                transition: "transform 400ms ease-out",
              }}
            >
              {/* base plate */}
              <div className="absolute inset-0 rounded-[32px] glass overflow-hidden">
                <div className="absolute inset-0 grid-lines opacity-40" />
                {/* conic glow */}
                <div
                  className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 animate-conic opacity-70"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, oklch(0.72 0.22 245 / 0.5) 60deg, transparent 120deg, oklch(0.85 0.15 200 / 0.5) 200deg, transparent 260deg, oklch(0.55 0.28 300 / 0.4) 320deg, transparent 360deg)",
                    filter: "blur(60px)",
                  }}
                />
                {/* fake product ui */}
                <div className="absolute inset-6 rounded-2xl border border-white/10 bg-background/60 backdrop-blur-xl overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground">cognine.foundry / production</div>
                    <div className="text-[10px] text-[var(--cyan)]">● live</div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 p-5">
                    <div className="col-span-4 space-y-2">
                      {["agents", "evals", "guardrails", "traces", "deploy"].map((s, i) => (
                        <div key={s} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${i === 0 ? "bg-white/5 text-foreground" : "text-muted-foreground"}`}>
                          <span className="h-1 w-1 rounded-full bg-[var(--cyan)]" />
                          {s}
                        </div>
                      ))}
                    </div>
                    <div className="col-span-8">
                      <div className="rounded-xl border border-white/10 p-4">
                        <div className="mb-3 flex items-baseline justify-between">
                          <div className="text-xs text-muted-foreground">inference throughput</div>
                          <div className="font-mono text-sm">1,284,201 <span className="text-[var(--cyan)]">req/s</span></div>
                        </div>
                        {/* wave chart */}
                        <svg viewBox="0 0 400 100" className="h-16 w-full">
                          <defs>
                            <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
                              <stop offset="0" stopColor="oklch(0.72 0.2 245)" stopOpacity="0.5" />
                              <stop offset="1" stopColor="oklch(0.72 0.2 245)" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0,70 C40,50 60,80 100,60 C140,40 160,72 200,50 C240,30 260,64 300,44 C340,26 360,52 400,30 L400,100 L0,100 Z"
                            fill="url(#lg)"
                          />
                          <path
                            d="M0,70 C40,50 60,80 100,60 C140,40 160,72 200,50 C240,30 260,64 300,44 C340,26 360,52 400,30"
                            stroke="oklch(0.85 0.15 200)"
                            strokeWidth="1.5"
                            fill="none"
                          />
                        </svg>
                        <div className="mt-4 grid grid-cols-3 gap-3">
                          {[
                            { k: "p95 latency", v: "42ms" },
                            { k: "cost / 1K", v: "$0.021" },
                            { k: "hallucination", v: "0.7%" },
                          ].map((x) => (
                            <div key={x.k} className="rounded-lg bg-white/[0.03] px-3 py-2">
                              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{x.k}</div>
                              <div className="mt-1 font-mono text-xs">{x.v}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* scan line */}
                  <div
                    className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-[var(--cyan)]/0 via-[var(--cyan)]/20 to-transparent"
                    style={{ animation: "scan-line 6s ease-in-out infinite" }}
                  />
                </div>
              </div>
              {/* floating chips */}
              <div className="absolute -left-6 top-16 hidden animate-float glass rounded-2xl px-4 py-3 sm:block">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Fortune 500</div>
                <div className="mt-0.5 text-lg font-semibold">35+ clients</div>
              </div>
              <div className="absolute -right-6 bottom-10 hidden animate-float glass rounded-2xl px-4 py-3 sm:block" style={{ animationDelay: "1.4s" }}>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Delivery</div>
                <div className="mt-0.5 text-lg font-semibold">12 timezones</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MARQUEE — trusted by
   ========================================================= */

function TrustedBy() {
  const logos = [
    "AXIS BANK", "MERIDIAN", "NORTHWIND", "HELIOS", "QUANTUMFORGE",
    "STRATOS", "OMNIRAIL", "VANTA CORP", "NOVELIS", "PARAGON",
    "SIGMA HEALTH", "BLUEFIN",
  ];
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-center text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          Building alongside category leaders on four continents
        </p>
        <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-marquee gap-16">
            {[...logos, ...logos].map((l, i) => (
              <div
                key={i}
                className="text-lg font-medium tracking-[0.18em] text-foreground/50 whitespace-nowrap"
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

/* =========================================================
   GIANT SCROLLING WORD BAND
   ========================================================= */

function WordBand({ words, reverse = false }: { words: string[]; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden py-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className={`flex w-max gap-16 ${reverse ? "animate-marquee-rev" : "animate-marquee-slow"}`}>
        {[...words, ...words, ...words].map((w, i) => (
          <span
            key={i}
            className="whitespace-nowrap text-[64px] sm:text-[112px] lg:text-[160px] font-semibold tracking-[-0.04em] leading-none"
            style={{
              fontFamily: "var(--font-display)",
              WebkitTextStroke: i % 2 === 0 ? "1px oklch(1 0 0 / 0.18)" : undefined,
              color: i % 2 === 0 ? "transparent" : "var(--foreground)",
            }}
          >
            {w}
            <span className="mx-6 inline-block text-[var(--electric)]/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   OUTCOMES — sticky, cinematic
   ========================================================= */

function Outcomes() {
  const items = [
    { end: 42, suffix: "%", label: "Cost reduction on operational workloads", note: "Average across 60+ engagements" },
    { end: 8, suffix: "×", label: "Faster processing on data & inference pipelines", note: "Vs. legacy baseline" },
    { end: 93, suffix: "%", label: "AI adoption across piloted business units", note: "Within 6 months of rollout" },
    { end: 400, suffix: "+", label: "Cloud & data platforms modernized", note: "AWS · Azure · GCP · Databricks" },
  ];
  return (
    <section id="outcomes" className="relative py-32 lg:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  01 / Outcomes
                </div>
                <h2 className="mt-6 text-5xl font-semibold tracking-[-0.035em] leading-[0.95] sm:text-6xl lg:text-7xl">
                  We're measured
                  <br />
                  by <span className="text-gradient">P&amp;L</span>,
                  <br />
                  not decks.
                </h2>
                <p className="mt-8 max-w-md text-lg text-muted-foreground">
                  Every engagement is anchored to cycle time, unit economics,
                  adoption, and delivery velocity — the numbers that move
                  boards.
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <div className="relative grid h-14 w-14 place-items-center rounded-full bg-[var(--gradient-electric)]">
                    <div className="absolute inset-[2px] rounded-full bg-background" />
                    <ArrowRight className="relative h-4 w-4" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">1,200+ engineers</div>
                    <div className="text-muted-foreground">delivering across 12 timezones</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div className="space-y-10 lg:space-y-16">
              {items.map((it, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="group relative">
                    <div className="flex items-baseline gap-6">
                      <div className="font-mono text-[11px] text-muted-foreground pt-6">
                        0{i + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[88px] sm:text-[128px] lg:text-[160px] font-semibold leading-[0.85] tracking-[-0.05em]">
                          <span className="text-gradient">
                            <Counter end={it.end} suffix={it.suffix} />
                          </span>
                        </div>
                        <div className="mt-4 grid grid-cols-[1fr_auto] items-end gap-4 border-t border-border pt-4">
                          <div className="text-base sm:text-lg text-foreground">
                            {it.label}
                          </div>
                          <div className="text-xs text-muted-foreground text-right">
                            {it.note}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SOLUTIONS — horizontal snap scroll with big feature panels
   ========================================================= */

const SOLUTIONS = [
  {
    icon: Sparkles,
    tag: "AI & GenAI",
    title: "Ship agents that pay for themselves.",
    impact: "Copilots, RAG systems, evals and agentic workflows measured in revenue lifted and cost removed.",
    hue: "245",
  },
  {
    icon: Database,
    tag: "Data Engineering",
    title: "One source of truth across the enterprise.",
    impact: "Lakehouses, real-time streams and governance built for regulated scale.",
    hue: "210",
  },
  {
    icon: Cloud,
    tag: "Cloud Transformation",
    title: "Modernize without breaking production.",
    impact: "Landing zones, migrations, and FinOps across AWS, Azure and GCP — from day one.",
    hue: "270",
  },
  {
    icon: Cpu,
    tag: "Digital Engineering",
    title: "Product teams that ship at Apple-caliber polish.",
    impact: "Senior squads that build web, mobile and edge products your customers will remember.",
    hue: "300",
  },
  {
    icon: Workflow,
    tag: "Intelligent Automation",
    title: "Redesign operations around AI decisions.",
    impact: "Process intelligence, RPA and AI-native decisioning — end-to-end.",
    hue: "180",
  },
];

function Solutions() {
  return (
    <section id="solutions" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                02 / Solutions
              </div>
              <h2 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.035em] leading-[0.95] sm:text-6xl lg:text-7xl">
                Five capabilities.
                <br />
                One <span className="text-gradient">operating system</span>.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
              <span>Scroll</span>
              <div className="h-px w-10 bg-border" />
              <span>→</span>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex w-max max-w-none gap-6 px-6 lg:px-10">
          {SOLUTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                className="group relative w-[86vw] max-w-[520px] shrink-0 snap-start overflow-hidden rounded-[32px] p-8 sm:w-[520px] lg:h-[560px] lg:p-10"
                style={{
                  background: `linear-gradient(155deg, oklch(0.22 0.06 ${s.hue} / 0.9), oklch(0.14 0.02 260) 65%)`,
                }}
              >
                {/* aurora inside */}
                <div className="pointer-events-none absolute inset-0 opacity-70">
                  <div
                    className="absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl"
                    style={{ background: `oklch(0.7 0.22 ${s.hue} / 0.6)` }}
                  />
                  <div
                    className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full blur-3xl"
                    style={{ background: `oklch(0.75 0.18 ${(parseInt(s.hue) + 40) % 360} / 0.5)` }}
                  />
                </div>
                {/* number */}
                <div className="relative flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[11px] text-white/50">
                    {String(i + 1).padStart(2, "0")} / {SOLUTIONS.length}
                  </span>
                </div>
                <div className="relative mt-16 lg:mt-24">
                  <div className="text-[11px] uppercase tracking-[0.24em] text-white/60">
                    {s.tag}
                  </div>
                  <h3 className="mt-4 text-[32px] leading-[1.02] font-semibold tracking-[-0.03em] sm:text-[40px] lg:text-[44px]">
                    {s.title}
                  </h3>
                  <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
                    {s.impact}
                  </p>
                  <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs transition group-hover:border-white/40 group-hover:bg-white/5">
                    Explore capability
                    <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </article>
            );
          })}
          <div className="w-6 shrink-0" aria-hidden />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   INDUSTRIES — full-bleed switcher with big numbers
   ========================================================= */

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
    <section id="industries" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            03 / Industries
          </div>
          <h2 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.035em] leading-[0.95] sm:text-6xl lg:text-7xl">
            Where <span className="text-gradient">regulation</span>
            <br />
            meets scale.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
            <ul>
              {INDUSTRIES.map((ind, i) => {
                const isActive = active === i;
                return (
                  <li key={ind.name} className="border-b border-border last:border-0">
                    <button
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-6 py-5 text-left"
                    >
                      <span className="font-mono text-[11px] text-muted-foreground w-8">
                        0{i + 1}
                      </span>
                      <span
                        className={`text-3xl font-semibold tracking-[-0.03em] transition sm:text-4xl lg:text-5xl ${
                          isActive ? "text-foreground" : "text-muted-foreground/60"
                        }`}
                        style={{
                          transform: isActive ? "translateX(10px)" : "translateX(0)",
                          transition: "transform 500ms cubic-bezier(0.22,1,0.36,1), color 300ms",
                        }}
                      >
                        {ind.name}
                      </span>
                      <ArrowUpRight
                        className={`h-5 w-5 transition ${
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="col-span-12 lg:col-span-5 order-1 lg:order-2">
            <div className="lg:sticky lg:top-32">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[32px]">
                {INDUSTRIES.map((ind, i) => (
                  <img
                    key={ind.name}
                    src={ind.img}
                    alt={ind.name}
                    width={1200}
                    height={800}
                    loading="lazy"
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
                      active === i ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                    Industry / 0{active + 1}
                  </div>
                  <div className="mt-2 text-3xl font-semibold tracking-tight">
                    {current.name}
                  </div>
                  <p className="mt-3 max-w-sm text-sm text-white/70">
                    {current.blurb}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CASE STUDIES — bento
   ========================================================= */

const CASES = [
  {
    industry: "Financial Services",
    img: case2,
    challenge: "A top-5 US broker needed to cut real-time risk latency by an order of magnitude.",
    solution: "Rebuilt the risk platform on Databricks + streaming ML with an agentic evaluation layer.",
    outcome: "12× faster risk calc",
    metric: "$38M / yr saved",
  },
  {
    industry: "Healthcare",
    img: case3,
    challenge: "A national payer needed to route millions of prior-auth requests without human review.",
    solution: "Deployed a HIPAA-ready RAG system with clinician-in-the-loop guardrails.",
    outcome: "74% auto-adjudication",
    metric: "22 → 3 day cycle",
  },
  {
    industry: "Manufacturing",
    img: case1,
    challenge: "A global OEM lost margin to unplanned downtime across 40 plants.",
    solution: "Built a predictive maintenance twin fusing PLC telemetry, vision AI and work orders.",
    outcome: "31% less downtime",
    metric: "9-mo payback",
  },
];

function CaseStudies() {
  return (
    <section id="cases" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                04 / Featured work
              </div>
              <h2 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.035em] leading-[0.95] sm:text-6xl lg:text-7xl">
                Enterprises
                <br />
                we've moved.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <a href="#contact" className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              All case studies
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6">
          {/* featured, tall left */}
          <Reveal className="col-span-12 lg:col-span-7 lg:row-span-2">
            <a href="#contact" className="group relative block h-full min-h-[520px] overflow-hidden rounded-[32px]">
              <img
                src={CASES[0].img}
                alt={CASES[0].industry}
                width={1400}
                height={900}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-10">
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-widest backdrop-blur">
                    {CASES[0].industry}
                  </span>
                  <span className="font-mono text-[10px] text-white/60">Case / 01</span>
                </div>
                <div>
                  <div className="text-5xl font-semibold tracking-[-0.03em] sm:text-6xl lg:text-7xl">
                    <span className="text-gradient">{CASES[0].outcome}</span>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Challenge</div>
                      <p className="mt-1 text-sm">{CASES[0].challenge}</p>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Approach</div>
                      <p className="mt-1 text-sm">{CASES[0].solution}</p>
                    </div>
                  </div>
                  <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs backdrop-blur transition group-hover:border-white/40 group-hover:bg-white/5">
                    Read case study
                    <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </a>
          </Reveal>

          {CASES.slice(1).map((c, i) => (
            <Reveal key={i} delay={(i + 1) * 100} className="col-span-12 lg:col-span-5">
              <a href="#contact" className="group relative block overflow-hidden rounded-[32px]">
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-[16/10]">
                  <img
                    src={c.img}
                    alt={c.industry}
                    width={1400}
                    height={900}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-widest backdrop-blur">
                        {c.industry}
                      </span>
                    </div>
                    <div>
                      <div className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                        <span className="text-gradient">{c.outcome}</span>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">{c.metric}</div>
                    </div>
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

/* =========================================================
   WHY COGNINE
   ========================================================= */

function WhyCognine() {
  const facts = [
    { k: 14, suffix: "+", label: "Years engineering for the enterprise" },
    { k: 1200, suffix: "+", label: "Engineers, scientists & designers" },
    { k: 12, suffix: "", label: "Global delivery centers" },
    { k: 35, suffix: "+", label: "Fortune 500 clients" },
  ];
  return (
    <section id="why" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-6">
            <Reveal>
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                05 / Why Cognine
              </div>
              <h2 className="mt-6 text-5xl font-semibold tracking-[-0.035em] leading-[0.95] sm:text-6xl lg:text-7xl">
                Senior teams.
                <br />
                Serious systems.
                <br />
                <span className="text-gradient">Global delivery.</span>
              </h2>
              <p className="mt-8 max-w-md text-lg text-muted-foreground">
                Engineered for regulated, mission-critical work — from earliest
                AI prototypes to platforms that run 24/7 in production.
              </p>
              <div className="mt-10 flex flex-wrap gap-2">
                {["SOC 2 Type II", "ISO 27001", "HIPAA Ready", "GDPR", "AWS Advanced", "Databricks Elite", "Microsoft Gold"].map((c) => (
                  <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.02] px-3 py-1.5 text-xs">
                    <Shield className="h-3 w-3 text-[var(--cyan)]" />
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-14">
              {facts.map((f, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div>
                    <div className="text-[64px] sm:text-[80px] lg:text-[96px] font-semibold leading-[0.9] tracking-[-0.04em] text-gradient">
                      <Counter end={f.k} suffix={f.suffix} />
                    </div>
                    <div className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground">
                      {f.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={320}>
              <div className="mt-14 rounded-3xl border border-border bg-white/[0.02] p-8 backdrop-blur">
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

/* =========================================================
   TECHNOLOGY WALL
   ========================================================= */

const TECH = [
  "AWS", "Azure", "Google Cloud", "Databricks", "Snowflake",
  "Salesforce", "OpenAI", "Anthropic", "NVIDIA", "MongoDB",
  "Kafka", "dbt", "LangChain", "PyTorch", "Hugging Face",
  "Kubernetes", "Terraform", "Vercel",
];

function Technology() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              06 / Ecosystem
            </div>
            <h2 className="mt-6 text-5xl font-semibold tracking-[-0.035em] leading-[0.95] sm:text-6xl lg:text-7xl">
              A stack without
              <br />
              <span className="text-gradient">compromises</span>.
            </h2>
          </div>
        </Reveal>

        <div className="relative mt-20">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-40 -translate-y-1/2 bg-[var(--gradient-electric)] opacity-10 blur-3xl" />
          <div className="relative flex flex-wrap justify-center gap-3">
            {TECH.map((t, i) => (
              <div
                key={t}
                className="group relative overflow-hidden rounded-full border border-border bg-white/[0.02] px-5 py-3 backdrop-blur transition hover:border-white/25 hover:bg-white/[0.05]"
                style={{ animation: `fade-up 500ms ${i * 30}ms both` }}
              >
                <span className="relative z-10 text-sm font-medium tracking-tight text-foreground/80 transition group-hover:text-foreground">
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
    </section>
  );
}

/* =========================================================
   DELIVERY
   ========================================================= */

const PHASES = [
  { k: "Discover", d: "Deep-dive into your goals, systems and constraints." },
  { k: "Design", d: "Architect the solution and de-risk with rapid prototypes." },
  { k: "Build", d: "Senior squads ship production-grade code, models and pipelines." },
  { k: "Deploy", d: "Cutover playbooks, observability, guardrails, change mgmt." },
  { k: "Scale", d: "Roll out globally, tune for cost, transfer ownership." },
];

function Delivery() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            07 / Delivery framework
          </div>
          <h2 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.035em] leading-[0.95] sm:text-6xl lg:text-7xl">
            From signal
            <br />
            to <span className="text-gradient">scale</span>.
          </h2>
        </Reveal>

        <div className="relative mt-20">
          {/* connector line */}
          <div className="absolute left-6 right-6 top-6 hidden h-px bg-gradient-to-r from-transparent via-[var(--electric)]/40 to-transparent lg:block" />
          <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {PHASES.map((p, i) => (
              <Reveal key={p.k} delay={i * 100}>
                <li className="relative">
                  <div className="relative grid h-12 w-12 place-items-center rounded-full bg-background">
                    <div className="absolute inset-0 rounded-full bg-[var(--gradient-electric)] opacity-30 blur-md" />
                    <div className="relative grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-background/80 backdrop-blur">
                      <span className="font-mono text-[11px]">0{i + 1}</span>
                    </div>
                  </div>
                  <div className="mt-8 text-2xl font-semibold tracking-tight">
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

/* =========================================================
   TESTIMONIALS
   ========================================================= */

const QUOTES = [
  {
    q: "Cognine gave us an AI capability that would have taken us 18 months to build. They shipped in 11 weeks.",
    a: "Chief Data Officer",
    c: "Global Insurance Carrier",
  },
  {
    q: "The most technically deep partner we've ever worked with. Their senior engineers set the bar for our own team.",
    a: "SVP Engineering",
    c: "Fortune 100 Retailer",
  },
];

function Testimonials() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            08 / Voices
          </div>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {QUOTES.map((q, i) => (
            <Reveal key={i} delay={i * 100}>
              <figure className="relative h-full overflow-hidden rounded-[32px] border border-border bg-white/[0.02] p-8 lg:p-12">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--gradient-electric)] opacity-15 blur-3xl" />
                <div className="text-8xl leading-none text-[var(--electric)]/40 font-[family-name:var(--font-display)]">
                  "
                </div>
                <blockquote className="mt-2 text-2xl leading-[1.2] tracking-[-0.02em] text-foreground sm:text-3xl">
                  {q.q}
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-3 border-t border-border pt-6">
                  <div className="h-10 w-10 rounded-full bg-[var(--gradient-electric)]" />
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
    </section>
  );
}

/* =========================================================
   LEADERSHIP
   ========================================================= */

const LEADERS = [
  { name: "Ravi Menon", role: "Founder & CEO", img: leader1, bio: "Two decades scaling engineering orgs across financial services and enterprise SaaS." },
  { name: "Ana Petrova", role: "President & CTO", img: leader2, bio: "Formerly VP Engineering at a hyperscaler. Leads AI Foundry and platform R&D." },
  { name: "Marc Ellison", role: "Chief AI Officer", img: leader3, bio: "Researcher-turned-operator. Author of the applied-agents playbook we run in production." },
];

function Leadership() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            09 / Leadership
          </div>
          <h2 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.035em] leading-[0.95] sm:text-6xl lg:text-7xl">
            Operators who've
            <br />
            <span className="text-gradient">shipped at scale</span>.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERS.map((l, i) => (
            <Reveal key={l.name} delay={i * 100}>
              <article className="group relative overflow-hidden rounded-[32px]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={l.img}
                    alt={l.name}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition duration-1000 group-hover:grayscale-0 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
                  <a
                    href="#"
                    aria-label={`${l.name} on LinkedIn`}
                    className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full glass transition hover:bg-white/10"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                      0{i + 1}
                    </div>
                    <div className="mt-2 text-2xl font-semibold tracking-tight">{l.name}</div>
                    <div className="text-sm text-muted-foreground">{l.role}</div>
                    <p className="mt-3 max-h-0 overflow-hidden text-sm text-muted-foreground opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                      {l.bio}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   INSIGHTS
   ========================================================= */

const INSIGHTS = [
  { cat: "AI", title: "The agentic enterprise: why 2026 is the year of production agents", read: "9 min", author: "Ravi Menon", img: insight3 },
  { cat: "Data", title: "Rebuilding the data platform for real-time risk", read: "6 min", author: "Ana Petrova", img: insight2 },
  { cat: "Operations", title: "Warehouse automation that pays back in nine months", read: "5 min", author: "Marc Ellison", img: insight1 },
];

function Insights() {
  const [cat, setCat] = useState("All");
  const cats = ["All", "AI", "Data", "Cloud", "Operations"];
  const [featured, ...rest] = INSIGHTS;
  return (
    <section id="insights" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                10 / Insights
              </div>
              <h2 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.035em] leading-[0.95] sm:text-6xl lg:text-7xl">
                Field notes from
                <br />
                the <span className="text-gradient">frontier</span>.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap gap-1.5">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs transition ${
                    cat === c
                      ? "border-transparent bg-foreground text-background"
                      : "border-border bg-white/[0.02] text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6">
          <Reveal className="col-span-12 lg:col-span-7">
            <a href="#" className="group block overflow-hidden rounded-[32px]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={featured.img} alt="" width={1200} height={800} loading="lazy" className="h-full w-full object-cover transition duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                    <span className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-[10px] backdrop-blur">{featured.cat}</span>
                    <span>{featured.read} read</span>
                  </div>
                  <h3 className="mt-4 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
                    {featured.title}
                  </h3>
                  <div className="mt-4 text-sm text-muted-foreground">By {featured.author}</div>
                </div>
              </div>
            </a>
          </Reveal>
          <div className="col-span-12 grid gap-6 lg:col-span-5">
            {rest.map((it, i) => (
              <Reveal key={i} delay={i * 80}>
                <a href="#" className="group grid grid-cols-[128px_1fr] items-center gap-5">
                  <div className="aspect-square overflow-hidden rounded-2xl">
                    <img src={it.img} alt="" width={400} height={400} loading="lazy" className="h-full w-full object-cover transition duration-1000 group-hover:scale-110" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                      <span className="rounded-full border border-border px-2 py-0.5">{it.cat}</span>
                      <span>{it.read}</span>
                    </div>
                    <div className="mt-2 text-lg font-medium leading-snug tracking-tight">
                      {it.title}
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">By {it.author}</div>
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

/* =========================================================
   CONTACT — CINEMATIC
   ========================================================= */

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative isolate overflow-hidden py-24 lg:py-40">
      <div className="absolute inset-0 -z-10">
        <Aurora intensity={0.7} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-6">
            <Reveal>
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                11 / Let's talk
              </div>
              <h2 className="mt-6 text-5xl font-semibold tracking-[-0.045em] leading-[0.92] sm:text-6xl lg:text-8xl">
                Ready when
                <br />
                you are.
              </h2>
              <p className="mt-8 max-w-md text-lg text-muted-foreground">
                Book a 30-minute working session with our leadership team.
                We'll pressure-test your priorities and share how we'd approach
                them.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  { i: Mail, k: "Email", v: "hello@cognine.com" },
                  { i: Phone, k: "Phone", v: "+1 (415) 555-0142" },
                ].map(({ i: Icon, k, v }) => (
                  <div key={k} className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white/[0.03] backdrop-blur">
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
                <div className="mt-3 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                  {[
                    { c: "New York", a: "220 Park Ave" },
                    { c: "London", a: "1 King William St" },
                    { c: "Singapore", a: "8 Marina Blvd" },
                    { c: "Bangalore", a: "Prestige Tower" },
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
                className="rounded-[32px] border border-border bg-background/70 p-8 backdrop-blur-2xl lg:p-10"
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
                        className="mt-2 w-full rounded-xl border border-border bg-background/70 px-4 py-3 text-sm outline-none transition focus:border-[var(--electric)] focus:ring-2 focus:ring-[var(--electric)]/25"
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
                    className="mt-2 w-full resize-none rounded-xl border border-border bg-background/70 px-4 py-3 text-sm outline-none transition focus:border-[var(--electric)] focus:ring-2 focus:ring-[var(--electric)]/25"
                  />
                </label>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <p className="text-xs text-muted-foreground">
                    We reply within one business day.
                  </p>
                  <button
                    type="submit"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium text-background"
                  >
                    <span className="absolute inset-0 bg-foreground transition group-hover:scale-105" />
                    <span className="absolute inset-0 bg-[var(--gradient-electric)] opacity-0 transition group-hover:opacity-100" />
                    <span className="relative z-10 flex items-center gap-2">
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
                    </span>
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

/* =========================================================
   FOOTER
   ========================================================= */

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
        {/* massive wordmark */}
        <div className="pointer-events-none pb-16 text-center">
          <div className="text-[80px] sm:text-[160px] lg:text-[240px] font-semibold tracking-[-0.06em] leading-none text-gradient opacity-90">
            Cognine
          </div>
        </div>
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
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-white/[0.02] transition hover:bg-white/[0.05]"
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

/* =========================================================
   PAGE
   ========================================================= */

function HomePage() {
  return (
    <div className="relative bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <TrustedBy />
        <Outcomes />
        <WordBand words={["AI.", "DATA.", "CLOUD.", "AGENTS.", "ENGINEERED."]} />
        <Solutions />
        <Industries />
        <WordBand words={["Fortune 500.", "Production-grade.", "24/7.", "Global."]} reverse />
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
