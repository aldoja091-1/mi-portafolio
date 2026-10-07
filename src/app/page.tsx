"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { dict, type Dict, type Lang } from "@/lib/i18n";

/* ───────────── Utilidades ───────────── */
const glass =
  "rounded-3xl border border-black/5 bg-white/60 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5";

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <h2 className="mb-12 text-4xl font-semibold tracking-tight md:text-6xl">
        {children}
      </h2>
    </Reveal>
  );
}

/* ───────────── Hero ───────────── */
function Hero({ t }: { t: Dict }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.42]);
  const radius = useTransform(scrollYProgress, [0, 0.6], [0, 48]);
  const y = useTransform(scrollYProgress, [0, 0.6], ["0vh", "-6vh"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const captionOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.5, 0.8], [40, 0]);

  return (
    <section ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Video flotante: reemplaza el placeholder por <video autoPlay muted loop playsInline src="/hero.mp4" className="h-full w-full object-cover" /> */}
        <motion.div
          style={{ scale, borderRadius: radius, y }}
          className="relative h-[100vh] w-[100vw] origin-center overflow-hidden bg-gradient-to-br from-neutral-200 via-neutral-100 to-white shadow-2xl dark:from-neutral-800 dark:via-neutral-900 dark:to-black"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,rgba(41,151,255,0.35),transparent)]"
          />
          <p className="absolute bottom-6 right-8 text-sm text-neutral-500">
            {t.hero.video}
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <h1 className="text-5xl font-semibold tracking-tight md:text-8xl">
            {t.hero.name}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-neutral-600 md:text-2xl dark:text-neutral-300">
            {t.hero.role}
          </p>
        </motion.div>

        <motion.p
          style={{ opacity: captionOpacity, y: captionY }}
          className="absolute bottom-[10vh] px-6 text-center text-2xl font-medium tracking-tight md:text-4xl"
        >
          {t.hero.caption}
        </motion.p>
      </div>
    </section>
  );
}

/* ───────────── Página ───────────── */
export default function Page() {
  const [lang, setLang] = useState<Lang>("es");
  const t = dict[lang];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#f5f5f7] text-neutral-900 antialiased dark:bg-black dark:text-neutral-100">
      {/* Header + selector de idioma */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4">
        <span className="text-sm font-semibold tracking-tight">AJA</span>
        <button
          onClick={() => setLang(lang === "es" ? "en" : "es")}
          aria-label={t.nav.toggleLabel}
          className="rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-sm font-medium backdrop-blur-xl transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/20"
        >
          {t.nav.toggle}
        </button>
      </header>

      <Hero t={t} />

      {/* Fondo con manchas de color para que el glassmorphism tenga qué desenfocar */}
      <div className="relative">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
          <div className="absolute -left-40 top-[10%] h-[32rem] w-[32rem] rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -right-40 top-[45%] h-[36rem] w-[36rem] rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute -left-20 bottom-[10%] h-[30rem] w-[30rem] rounded-full bg-cyan-400/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          {/* Scrollytelling */}
          <section className="py-32">
            <SectionTitle>{t.exp.title}</SectionTitle>
            <div className="space-y-10">
              {t.exp.items.map((p) => (
                <Reveal key={p.title}>
                  <article className={`${glass} grid gap-6 p-8 md:grid-cols-[1fr_1.2fr] md:p-12`}>
                    <div>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{p.tag}</p>
                      <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{p.title}</h3>
                      <p className="mt-2 text-neutral-500">{p.org}</p>
                    </div>
                    <p className="self-center text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                      {p.desc}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Learning Path — bento */}
          <section className="py-32">
            <SectionTitle>{t.learn.title}</SectionTitle>
            <div className="grid auto-rows-[14rem] grid-cols-1 gap-4 md:grid-cols-4">
              <Reveal className={`${glass} flex flex-col justify-end p-8 md:col-span-2 md:row-span-2`}>
                <h3 className="text-3xl font-semibold tracking-tight md:text-5xl">{t.learn.certs[0].title}</h3>
                <p className="mt-2 text-neutral-500">{t.learn.certs[0].sub}</p>
              </Reveal>
              <Reveal delay={0.08} className={`${glass} flex flex-col justify-end p-8 md:col-span-2`}>
                <h3 className="text-2xl font-semibold tracking-tight">{t.learn.certs[1].title}</h3>
                <p className="mt-1 text-neutral-500">{t.learn.certs[1].sub}</p>
              </Reveal>
              <Reveal delay={0.16} className={`${glass} flex flex-col justify-end p-8`}>
                <h3 className="text-xl font-semibold tracking-tight">{t.learn.certs[2].title}</h3>
                <p className="mt-1 text-sm text-neutral-500">{t.learn.certs[2].sub}</p>
              </Reveal>
              <Reveal delay={0.24} className={`${glass} flex flex-col justify-between p-8`}>
                <h3 className="text-xl font-semibold tracking-tight">{t.learn.langTitle}</h3>
                <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
                  {t.learn.langs.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>

          {/* Repositorio rápido */}
          <section className="py-32">
            <SectionTitle>{t.repo.title}</SectionTitle>
            <Reveal className={`${glass} divide-y divide-black/5 overflow-hidden dark:divide-white/10`}>
              {t.repo.cats.map((c) => (
                <div key={c.name} className="grid gap-4 p-6 md:grid-cols-[18rem_1fr] md:p-8">
                  <h3 className="text-lg font-semibold tracking-tight">{c.name}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {c.items.map((i) => (
                      <li
                        key={i}
                        className="rounded-full border border-black/10 bg-white/70 px-4 py-1.5 text-sm dark:border-white/15 dark:bg-white/10"
                      >
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
          </section>

          {/* Blog — esqueleto visual de Casos de Estudio */}
          <section className="py-32">
            <div className="mb-12 flex items-end justify-between gap-4">
              <Reveal>
                <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">{t.blog.title}</h2>
              </Reveal>
              <span className="mb-2 rounded-full border border-black/10 px-3 py-1 text-sm text-neutral-500 dark:border-white/15">
                {t.blog.soon}
              </span>
            </div>
            <div className="grid auto-rows-[12rem] grid-cols-2 gap-4 md:grid-cols-4">
              {t.blog.cases.map((c, i) => {
                const span = [
                  "md:col-span-2 md:row-span-2",
                  "",
                  "",
                  "md:col-span-2",
                  "",
                  "md:col-span-2",
                ][i];
                return (
                  <Reveal key={c} delay={i * 0.05} className={`group relative overflow-hidden ${glass} ${span}`}>
                    {/* Reemplaza este div por <Image src="/cases/..." fill className="object-cover" alt={c} /> */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-300/60 to-neutral-100/20 dark:from-white/10 dark:to-transparent" />
                    <p className="absolute bottom-4 left-5 text-sm font-medium">{c}</p>
                  </Reveal>
                );
              })}
            </div>
          </section>
        </div>

        <footer className="relative z-10 py-12 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} {t.footer}
        </footer>
      </div>
    </main>
  );
}
