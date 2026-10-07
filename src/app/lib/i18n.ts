export const es = {
  nav: { toggle: "EN", toggleLabel: "Switch to English" },
  hero: {
    name: "Aldo Justo Alonso",
    role: "Ingeniero Mecatrónico | Procesos, Mejora Continua y Automatización",
    video: "Tu video aquí",
    caption: "Procesos que funcionan. Sistemas que se automatizan.",
  },
  exp: {
    title: "Experiencia y casos de éxito",
    items: [
      {
        tag: "Ingeniería de Procesos",
        org: "Magna Autotek",
        title: "Manufactura bajo control",
        desc: "Monitoreo de manufactura, reducción de desperdicios y análisis de causa raíz (AMEF, 5 Porqués) con SAP y PLATO.",
      },
      {
        tag: "Automatización y Control",
        org: "ESP32 · Arduino · LabVIEW · MATLAB",
        title: "Del sensor al dato",
        desc: "Desarrollo de firmware (ESP32, Arduino) y algoritmos de adquisición de datos integrados con LabVIEW y MATLAB.",
      },
      {
        tag: "Operaciones y Liderazgo",
        org: "Chippewa Ranch Camp (EE.UU.)",
        title: "Líder de Mantenimiento",
        desc: "Diagnóstico de fallas y mantenimiento preventivo/correctivo de sistemas eléctricos y mecánicos.",
      },
      {
        tag: "Desarrollo de Software",
        org: "Python · API de Binance",
        title: "Bot de Trading Algorítmico",
        desc: "Bot de trading en Python integrado con la API de Binance.",
      },
    ],
  },
  learn: {
    title: "Learning Path",
    certs: [
      { title: "Lean Six Sigma White Belt", sub: "Mejora continua" },
      { title: "Power BI", sub: "Santander Open Academy" },
      { title: "Gestión de Proyectos Ágil", sub: "Metodologías ágiles" },
    ],
    langTitle: "Idiomas",
    langs: ["Inglés Profesional", "Alemán", "Francés"],
  },
  repo: {
    title: "Repositorio rápido",
    cats: [
      { name: "Desarrollo de Software y Datos", items: ["Python", "C", "MATLAB", "Power BI", "Excel"] },
      { name: "Automatización y Hardware", items: ["ESP32", "Arduino", "LabVIEW", "Robótica Industrial"] },
      { name: "Ingeniería y Diseño", items: ["SAP", "PLATO", "CATIA", "SolidWorks (CAD/CAM)"] },
    ],
  },
  blog: {
    title: "Casos de estudio",
    soon: "Próximamente",
    cases: ["Render 3D · CATIA", "Render 3D · SolidWorks", "Interfaz · LabVIEW", "Dashboard · Power BI", "Circuito · ESP32", "Línea de prensas"],
  },
  footer: "Aldo Justo Alonso",
};

export type Dict = typeof es;

export const en: Dict = {
  nav: { toggle: "ES", toggleLabel: "Cambiar a español" },
  hero: {
    name: "Aldo Justo Alonso",
    role: "Mechatronics Engineer | Processes, Continuous Improvement & Automation",
    video: "Your video here",
    caption: "Processes that work. Systems that automate.",
  },
  exp: {
    title: "Experience & success stories",
    items: [
      {
        tag: "Process Engineering",
        org: "Magna Autotek",
        title: "Manufacturing under control",
        desc: "Manufacturing monitoring, waste reduction and root cause analysis (FMEA, 5 Whys) using SAP and PLATO.",
      },
      {
        tag: "Automation & Control",
        org: "ESP32 · Arduino · LabVIEW · MATLAB",
        title: "From sensor to data",
        desc: "Firmware development (ESP32, Arduino) and data acquisition algorithms integrated with LabVIEW and MATLAB.",
      },
      {
        tag: "Operations & Leadership",
        org: "Chippewa Ranch Camp (USA)",
        title: "Maintenance Lead",
        desc: "Fault diagnosis and preventive/corrective maintenance of electrical and mechanical systems.",
      },
      {
        tag: "Software Development",
        org: "Python · Binance API",
        title: "Algorithmic Trading Bot",
        desc: "Python trading bot integrated with the Binance API.",
      },
    ],
  },
  learn: {
    title: "Learning Path",
    certs: [
      { title: "Lean Six Sigma White Belt", sub: "Continuous improvement" },
      { title: "Power BI", sub: "Santander Open Academy" },
      { title: "Agile Project Management", sub: "Agile methodologies" },
    ],
    langTitle: "Languages",
    langs: ["Professional English", "German", "French"],
  },
  repo: {
    title: "Quick repository",
    cats: [
      { name: "Software & Data Development", items: ["Python", "C", "MATLAB", "Power BI", "Excel"] },
      { name: "Automation & Hardware", items: ["ESP32", "Arduino", "LabVIEW", "Industrial Robotics"] },
      { name: "Engineering & Design", items: ["SAP", "PLATO", "CATIA", "SolidWorks (CAD/CAM)"] },
    ],
  },
  blog: {
    title: "Case studies",
    soon: "Coming soon",
    cases: ["3D Render · CATIA", "3D Render · SolidWorks", "Interface · LabVIEW", "Dashboard · Power BI", "Circuit · ESP32", "Press line"],
  },
  footer: "Aldo Justo Alonso",
};

export const dict = { es, en };
export type Lang = keyof typeof dict;