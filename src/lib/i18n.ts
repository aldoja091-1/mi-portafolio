export const es = {
  nav: { toggle: "EN", toggleLabel: "Switch to English" },
  hero: {
    name: "Aldo Justo Alonso",
    role: "Ingeniero Mecatrónico | Procesos, Mejora Continua y Automatización",
    video: "Video aquí",
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
  skills: {
    title: "Habilidades",
    cats: [
      { name: "Procesos y Calidad", items: ["AMEF", "5 Porqués", "Análisis de Causa Raíz", "Reducción de Desperdicio"] },
      { name: "Mejora Continua", items: ["Lean Manufacturing", "Six Sigma", "5S", "Metodología Ágil"] },
      { name: "Automatización y Control", items: ["Sistemas de Control", "Robótica Industrial", "ESP32", "Arduino", "LabVIEW"] },
      { name: "Software y Datos", items: ["Python", "C", "MATLAB", "Power BI", "Excel", "SAP", "PLATO"] },
      { name: "Diseño e Ingeniería", items: ["CATIA", "SolidWorks", "CAD/CAM"] },
    ],
  },
  learn: {
    title: "Certificaciones",
    tabs: { industria: "Industria y Mejora Continua", lobomentoria: "Liderazgo", finanzas: "Finanzas" },
    close: "Cerrar",
    langTitle: "Idiomas",
    langs: ["Inglés Profesional", "Alemán", "Francés"],
  },
  blog: {
    title: "Casos de estudio",
    soon: "Próximamente",
    cases: ["Render 3D · CATIA", "Render 3D · SolidWorks", "Interfaz · LabVIEW", "Dashboard · Power BI", "Circuito · ESP32", "Línea de prensas"],
  },
  words: ["Lean", "Six Sigma", "Kaizen", "5S", "DMAIC", "Calidad", "AMEF", "Poka-Yoke", "Muda", "Takt Time", "OEE", "SMED", "Gemba", "Kanban", "Mejora Continua", "Causa Raíz", "Cero Defectos", "VSM"],
  footer: "Aldo Justo Alonso",
};

export type Dict = typeof es;

export const en: Dict = {
  nav: { toggle: "ES", toggleLabel: "Cambiar a español" },
  hero: {
    name: "Aldo Justo Alonso",
    role: "Mechatronics Engineer | Processes, Continuous Improvement & Automation",
    video: "video here",
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
  skills: {
    title: "Skills",
    cats: [
      { name: "Process & Quality", items: ["FMEA", "5 Whys", "Root Cause Analysis", "Waste Reduction"] },
      { name: "Continuous Improvement", items: ["Lean Manufacturing", "Six Sigma", "5S", "Agile Methodology"] },
      { name: "Automation & Control", items: ["Control Systems", "Industrial Robotics", "ESP32", "Arduino", "LabVIEW"] },
      { name: "Software & Data", items: ["Python", "C", "MATLAB", "Power BI", "Excel", "SAP", "PLATO"] },
      { name: "Design & Engineering", items: ["CATIA", "SolidWorks", "CAD/CAM"] },
    ],
  },
  learn: {
    title: "Certifications",
    tabs: { industria: "Industry & Continuous Improvement", lobomentoria: "Leadership", finanzas: "Finance" },
    close: "Close",
    langTitle: "Languages",
    langs: ["Professional English", "German", "French"],
  },
  blog: {
    title: "Case studies",
    soon: "Coming soon",
    cases: ["3D Render · CATIA", "3D Render · SolidWorks", "Interface · LabVIEW", "Dashboard · Power BI", "Circuit · ESP32", "Press line"],
  },
  words: ["Lean", "Six Sigma", "Kaizen", "5S", "DMAIC", "Quality", "FMEA", "Poka-Yoke", "Muda", "Takt Time", "OEE", "SMED", "Gemba", "Kanban", "Continuous Improvement", "Root Cause", "Zero Defects", "VSM"],
  footer: "Aldo Justo Alonso",
};

export const dict = { es, en };
export type Lang = keyof typeof dict;