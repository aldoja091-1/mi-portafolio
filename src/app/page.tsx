"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { dict, type Lang } from "@/lib/i18n";

type Dict = (typeof dict)[Lang];

/* ───────────── Datos de certificados ───────────── */
type CertCat = "industria" | "lobomentoria" | "finanzas";
type Cert = { title: string; file: string; cat: CertCat };

const certificados: Cert[] = [
  // Industria
  { title: "Liderazgo Estoico", file: "/certificados/liderazgo-estoico.jpg", cat: "industria" },
  { title: "LUMI", file: "/certificados/lumi.jpg", cat: "industria" },
  { title: "White Belt", file: "/certificados/white-belt.jpg", cat: "industria" },
  { title: "Yellow Belt", file: "/certificados/yellow-belt.jpg", cat: "industria" },
  { title: "Gestión de Proyectos y Fundamentos de Metodología Agile", file: "/certificados/agile.jpg", cat: "industria" },
  { title: "Power BI", file: "/certificados/powerbi.jpg", cat: "industria" },
  { title: "ISO 9001:2015 Auditor Interno con DC-3", file: "/certificados/iso9001.jpg", cat: "industria" },
  // Mentoría
  { title: "Constancia Formación Inicial de Lobomentoría", file: "/certificados/constancia-formacion-inicial-de-lobomentoria.jpg", cat: "lobomentoria" },
  { title: "Tutoría y Mentoría", file: "/certificados/tutoria.jpg", cat: "lobomentoria" },
  { title: "Fundamentals of Project Management", file: "/certificados/fundamentals.jpg", cat: "lobomentoria" },
  // Finanzas
  { title: "GOB Diplomado en educación financiera", file: "/certificados/gob-diplomado-en-educacion-financiera.jpg", cat: "finanzas" },
  { title: "Análisis de mercado", file: "/certificados/analisis-de-mercado.jpg", cat: "finanzas" },
  { title: "Análisis técnico, interpretando gráficas", file: "/certificados/analisis-tecnico-interpretando-graficas.jpg", cat: "finanzas" },
  { title: "Asignación de activos", file: "/certificados/asignacion-de-activos.jpg", cat: "finanzas" },
  { title: "Cómo invertir en ETFs", file: "/certificados/como-invertir-en-etfs.jpg", cat: "finanzas" },
  { title: "Construcción de portafolios parte 2", file: "/certificados/construccion-de-portafolios-parte-2.jpg", cat: "finanzas" },
  { title: "Construcción de portafolios", file: "/certificados/construccion-de-portafolios.jpg", cat: "finanzas" },
  { title: "Emprendimiento exitoso", file: "/certificados/emprendimiento-exitoso.jpg", cat: "finanzas" },
  { title: "Fondos de inversión y ETFs ESG", file: "/certificados/fondos-de-inversion-y-etfs-esg.jpg", cat: "finanzas" },
  { title: "Gestión de riesgos", file: "/certificados/gestion-de-riesgos.jpg", cat: "finanzas" },
  { title: "Indicadores y osciladores de análisis técnico", file: "/certificados/indicadores-y-osciladores-de-analisis-tecnico.jpg", cat: "finanzas" },
  { title: "Inversiones en bienes raíces, FIBRAs", file: "/certificados/inversiones-en-bienes-raices-fibras.jpg", cat: "finanzas" },
  { title: "Inversiones internacionales, SIC", file: "/certificados/inversiones-internacionales-sic.jpg", cat: "finanzas" },
  { title: "Lo que no se aprende en la escuela sobre inversiones PARTE 1", file: "/certificados/lo-que-no-se-aprende-en-la-escuela-sobre-inversiones-parte-1.jpg", cat: "finanzas" },
  { title: "Lo que no se aprende en la escuela sobre inversiones PARTE 2", file: "/certificados/lo-que-no-se-aprende-en-la-escuela-sobre-inversiones-parte-2.jpg", cat: "finanzas" },
  { title: "Mi primer crédito automotriz", file: "/certificados/mi-primer-credito-automotriz.jpg", cat: "finanzas" },
  { title: "Planeación Financiera", file: "/certificados/planeacion-financiera.jpg", cat: "finanzas" },
  { title: "PPR, piensa en tu retiro", file: "/certificados/ppr-piensa-en-tu-retiro.jpg", cat: "finanzas" },
  { title: "Reto Actinver 2024", file: "/certificados/reto-actinver-2024.jpg", cat: "finanzas" },
  { title: "Seguro de vida", file: "/certificados/seguro-de-vida.jpg", cat: "finanzas" },
  { title: "Sistema Financiero Mexicano", file: "/certificados/sistema-financiero-mexicano.jpg", cat: "finanzas" },
  { title: "Valuación de empresas", file: "/certificados/valuacion-de-empresas.jpg", cat: "finanzas" },
];

const TABS: CertCat[] = ["industria", "lobomentoria", "finanzas"];

/* ───────────── Utilidades ───────────── */
const glass =
  "rounded-3xl border border-black/5 bg-white/60 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5";
const badge =
  "rounded-full border border-black/10 bg-white/70 px-4 py-1.5 text-sm backdrop-blur-md dark:border-white/15 dark:bg-white/10";

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

function Thumb({ cert, onOpen }: { cert: Cert; onOpen: () => void }) {
  const [broken, setBroken] = useState(false);
  return (
    <button
      onClick={onOpen}
      aria-label={cert.title}
      className={`group relative aspect-[4/3] overflow-hidden ${glass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500`}
    >
      {!broken && (
        <Image
          src={cert.file}
          alt={cert.title}
          fill
          sizes="(min-width:1024px) 20vw, (min-width:768px) 25vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
          onError={() => setBroken(true)}
        />
      )}
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 text-left text-xs font-medium text-white">
        {cert.title}
      </span>
    </button>
  );
}

/* ───────────── Experiencia con imagen ───────────── */
const EXP_IMAGES = [
  "/experiencia/procesos.jpg",
  "/experiencia/automatizacion.jpg",
  "/experiencia/mantenimiento.jpg",
  "/experiencia/trading-bot.jpg",
];

function ExpCard({
  item,
  src,
  flip,
}: {
  item: Dict["exp"]["items"][number];
  src: string;
  flip: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [broken, setBroken] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
      <Reveal className={flip ? "md:order-2" : ""}>
        <div
          ref={ref}
          className={`relative aspect-[4/3] overflow-hidden ${glass} bg-gradient-to-br from-neutral-300/60 to-neutral-100/20 dark:from-white/10 dark:to-transparent`}
        >
          {!broken && (
            <motion.div style={{ y }} className="absolute -inset-[10%]">
              <Image
                src={src}
                alt={item.title}
                fill
                sizes="(min-width:768px) 45vw, 100vw"
                className="object-cover"
                onError={() => setBroken(true)}
              />
            </motion.div>
          )}
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{item.tag}</p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">{item.title}</h3>
        <p className="mt-2 text-neutral-500">{item.org}</p>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
          {item.desc}
        </p>
        <ul className="mt-5 max-w-lg space-y-3 text-neutral-600 dark:text-neutral-400">
          {item.bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              {b}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

/* ───────────── Línea infinita de habilidades ───────────── */
function Marquee({
  items,
  label,
  prev,
  next,
}: {
  items: string[];
  label: string;
  prev: string;
  next: string;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const list = useRef<HTMLUListElement>(null);
  const dragging = useRef(false);
  const busy = useRef(false);
  const resumeAt = useRef(0);
  const loop = [...items, ...items, ...items]; // 3 copias: el salto de reinicio es invisible
  const hold = (ms: number) => (resumeAt.current = performance.now() + ms);

  // Avance automático de derecha a izquierda (se pausa al interactuar)
  useAnimationFrame((_, delta) => {
    const el = list.current;
    if (!el || dragging.current || busy.current) return;
    const W = el.scrollWidth / 3;
    let v = x.get();
    if (!reduce && performance.now() >= resumeAt.current) v -= delta * 0.04;
    if (v <= -2 * W) v += W;
    if (v >= 0) v -= W;
    if (v !== x.get()) x.set(v);
  });

  const step = (dir: 1 | -1) => {
    busy.current = true;
    hold(2500);
    animate(x, x.get() + dir * 360, {
      duration: 0.4,
      ease: "easeOut",
      onComplete: () => {
        busy.current = false;
      },
    });
  };

  const arrow =
    "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/70 text-2xl backdrop-blur-xl transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/20";

  return (
    <div
      className="relative left-1/2 w-screen -translate-x-1/2 py-6"
      onPointerEnter={(e) => e.pointerType === "mouse" && hold(Infinity)}
      onPointerLeave={() => hold(800)}
    >
      <div
        role="region"
        aria-label={label}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") step(1);
          if (e.key === "ArrowRight") step(-1);
        }}
        onFocus={() => hold(Infinity)}
        onBlur={() => hold(800)}
        className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] focus-visible:outline-none"
      >
        <motion.ul
          ref={list}
          style={{ x }}
          drag="x"
          dragMomentum={false}
          dragElastic={0}
          onDragStart={() => {
            dragging.current = true;
          }}
          onDragEnd={() => {
            dragging.current = false;
            hold(2500);
          }}
          className="flex w-max cursor-grab select-none active:cursor-grabbing"
        >
          {loop.map((s, i) => (
            <li
              key={i}
              aria-hidden={i >= items.length}
              className="mr-4 shrink-0 rounded-full border border-black/10 bg-white/70 px-7 py-3 text-lg backdrop-blur-md dark:border-white/15 dark:bg-white/10"
            >
              {s}
            </li>
          ))}
        </motion.ul>
      </div>
      <button onClick={() => step(1)} aria-label={prev} className={`${arrow} left-4 md:left-8`}>
        ‹
      </button>
      <button onClick={() => step(-1)} aria-label={next} className={`${arrow} right-4 md:right-8`}>
        ›
      </button>
    </div>
  );
}

/* ───────────── Palabras clave de fondo ───────────── */
type Slot = { id: number; word: string; x: number; y: number };

function FloatingWords({ words }: { words: string[] }) {
  const reduce = useReducedMotion();
  const [slots, setSlots] = useState<Slot[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const add = () => {
      const id = idRef.current++;
      setSlots((s) => {
        if (s.length >= 3) return s;
        const free = words.filter((w) => !s.some((x) => x.word === w));
        const word = free[Math.floor(Math.random() * free.length)];
        return [...s, { id, word, x: 4 + Math.random() * 62, y: 10 + Math.random() * 72 }];
      });
      timers.push(setTimeout(() => setSlots((p) => p.filter((x) => x.id !== id)), 6500));
    };
    const iv = setInterval(add, 2200);
    return () => {
      clearInterval(iv);
      timers.forEach(clearTimeout);
    };
  }, [reduce, words]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <AnimatePresence>
        {slots.map((s) => (
          <motion.span
            key={s.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 0.12, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            className="absolute whitespace-nowrap text-4xl font-semibold tracking-tight text-neutral-900 md:text-7xl dark:text-white"
          >
            {s.word}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ───────────── Próximos proyectos ───────────── */
// Imágenes en public/proyectos/ — el orden coincide con blog.cases en i18n.ts
const PROJECT_IMAGES = [
  "/proyectos/green-belt.jpg",
  "/proyectos/monitoreo-esp32-labview.jpg",
  "/proyectos/diseno-3d-solidworks.jpg",
  "/proyectos/proyecto-a3-mejora-continua.jpg",
  "/proyectos/vsm-balanceo-de-linea.jpg",
  "/proyectos/automatizacion-robot-industrial.jpg",
];
const PROJECT_SPANS = ["md:col-span-2 md:row-span-2", "", "", "md:col-span-2", "", "md:col-span-2"];

function ProjectTile({
  src,
  label,
  delay,
  className,
}: {
  src: string;
  label: string;
  delay: number;
  className: string;
}) {
  const [broken, setBroken] = useState(false);
  return (
    <Reveal delay={delay} className={`group relative overflow-hidden ${glass} ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-300/60 to-neutral-100/20 dark:from-white/10 dark:to-transparent" />
      {!broken && (
        <Image
          src={src}
          alt={label}
          fill
          sizes="(min-width:768px) 40vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
          onError={() => setBroken(true)}
        />
      )}
      <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm font-medium text-white">
        {label}
      </p>
    </Reveal>
  );
}

/* ───────────── Hero ───────────── */
function Hero({ t }: { t: Dict }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.55], [1, 0.42]);
  const radius = useTransform(scrollYProgress, [0, 0.55], [0, 48]);
  const y = useTransform(scrollYProgress, [0, 0.55], ["0vh", "-12vh"]);
  // Bloque final bajo el video: termina antes de que el hero se suelte
  const outroOpacity = useTransform(scrollYProgress, [0.45, 0.8], [0, 1]);
  const outroY = useTransform(scrollYProgress, [0.45, 0.8], [40, 0]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Video: guarda tu archivo en public/hero.mp4 (y opcional public/hero-poster.jpg) */}
        <motion.div
          style={{ scale, borderRadius: radius, y }}
          className="relative h-[100vh] w-[100vw] origin-center overflow-hidden bg-neutral-900 shadow-2xl"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div aria-hidden className="absolute inset-0 bg-black/30" />
        </motion.div>

        <motion.div
          style={{ opacity: outroOpacity, y: outroY }}
          className="absolute inset-x-0 bottom-[4vh] z-10 flex flex-col items-center px-6 text-center"
        >
          <p className="text-lg font-medium tracking-tight text-neutral-500 md:text-2xl dark:text-neutral-400">
            {t.hero.caption}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-7xl">{t.hero.name}</h1>
          <p className="mt-3 max-w-3xl text-base text-neutral-600 md:text-xl dark:text-neutral-300">
            {t.hero.role}
          </p>
          <motion.svg
            aria-hidden
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={reduce ? undefined : { y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="mt-5 text-neutral-500"
          >
            <path d="M6 9l6 6 6-6" />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── Página ───────────── */
export default function Page() {
  const [lang, setLang] = useState<Lang>("es");
  const [tab, setTab] = useState<CertCat>("industria");
  const [active, setActive] = useState<Cert | null>(null);
  const t = dict[lang];

  // Lightbox: cerrar con Escape y bloquear scroll del fondo
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  const visible = certificados.filter((c) => c.cat === tab);
   const spans = ["md:col-span-3", "md:col-span-3", "md:col-span-3", "md:col-span-3", "md:col-span-6"];
   
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#f5f5f7] text-neutral-900 antialiased dark:bg-black dark:text-neutral-100">
      <FloatingWords words={t.words} />

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

      <div className="relative">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-[10%] h-[32rem] w-[32rem] rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -right-40 top-[45%] h-[36rem] w-[36rem] rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute -left-20 bottom-[10%] h-[30rem] w-[30rem] rounded-full bg-cyan-400/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          {/* Experiencia */}
          <section id="experiencia" className="pb-32 pt-24">
            <SectionTitle>{t.exp.title}</SectionTitle>
            <div className="space-y-24 md:space-y-32">
              {t.exp.items.map((p, i) => (
                <ExpCard key={p.title} item={p} src={EXP_IMAGES[i]} flip={i % 2 === 1} />
              ))}
            </div>
          </section>

          {/* Habilidades — bento de badges */}
          <section className="py-32">
            <SectionTitle>{t.skills.title}</SectionTitle>
            <div className="grid gap-4 md:grid-cols-6">
              {t.skills.cats.map((c, i) => (
                <Reveal key={c.name} delay={i * 0.06} className={`${glass} p-7 ${spans[i]}`}>
                  <h3 className="mb-5 text-xl font-semibold tracking-tight">{c.name}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {c.items.map((s) => (
                      <motion.li
                        key={s}
                        whileHover={{ scale: 1.06, y: -2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className={badge}
                      >
                        {s}
                      </motion.li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Certificaciones — tabs + lightbox */}
          <section className="py-32">
            <SectionTitle>{t.learn.title}</SectionTitle>
            <Reveal>
              <p className="mb-6 text-neutral-500">
                {t.learn.langTitle}: {t.learn.langs.join(", ")}
              </p>
              <div
                role="tablist"
                className="mb-8 inline-flex flex-wrap gap-1 rounded-full border border-black/5 bg-white/60 p-1 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
              >
                {TABS.map((k) => (
                  <button
                    key={k}
                    role="tab"
                    aria-selected={tab === k}
                    onClick={() => setTab(k)}
                    className="relative rounded-full px-5 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                  >
                    {tab === k && (
                      <motion.span
                        layoutId="tab-pill"
                        className="absolute inset-0 rounded-full bg-neutral-900 dark:bg-white"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className={`relative ${tab === k ? "text-white dark:text-black" : ""}`}>
                      {t.learn.tabs[k]}
                    </span>
                  </button>
                ))}
              </div>
            </Reveal>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                role="tabpanel"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className={
                  tab === "finanzas"
                    ? "grid max-h-[34rem] grid-cols-2 gap-3 overflow-y-auto pr-2 md:grid-cols-4 lg:grid-cols-5"
                    : "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                }
              >
                {visible.map((c) => (
                  <Thumb key={c.file} cert={c} onOpen={() => setActive(c)} />
                ))}
              </motion.div>
            </AnimatePresence>
          </section>

          {/* Habilidades en movimiento */}
          <section className="py-24">
            <Marquee items={t.marquee} label={t.skills.title} prev={t.nav.prev} next={t.nav.next} />
          </section>

          {/* Próximos proyectos */}
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
              {t.blog.cases.map((c, i) => (
                <ProjectTile key={c} src={PROJECT_IMAGES[i]} label={c} delay={i * 0.05} className={PROJECT_SPANS[i]} />
              ))}
            </div>
          </section>
        </div>

        <footer className="relative z-10 py-12 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} {t.footer}
        </footer>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[78vh] w-[92vw] max-w-5xl"
            >
              <Image
                src={active.file}
                alt={active.title}
                fill
                sizes="92vw"
                className="rounded-2xl object-contain"
              />
              <button
                onClick={() => setActive(null)}
                aria-label={t.learn.close}
                className="absolute -top-12 right-0 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-md hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                ✕ {t.learn.close}
              </button>
              <p className="absolute -bottom-10 inset-x-0 text-center text-sm text-white">{active.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
