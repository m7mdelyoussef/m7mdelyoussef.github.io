import { useState, useEffect, useRef } from "react";
import SkillIcon from "../components/SkillIcon";
import CertCarousel from "../components/CertCarousel";
import SectionReveal from "../components/SectionReveal";
import { useLang } from "@/context/LanguageContext";

/* ── skill tool images ─────────────────────────────── */
import burpSuiteImg from "@assets/image_1776177932441.png";
import metasploitImg from "@assets/image_1776178106682.png";
import wiresharkImg from "@assets/image_1776178214492.png";
import nessusImg from "@assets/image_1776178242133.png";
import kaliImg from "@assets/image_1776178252361.png";
import ciscoImg from "@assets/image_1776178352842.png";
import windowsXPImg from "@assets/image_1776178419545.png";
import virtualBoxImg from "@assets/image_1776178460918.png";

/* ── project screenshots ───────────────────────────── */
import unityGameImg from "@assets/image_1776178889471.png";
import carMaintenanceImg from "@assets/image_1776181493265.png";
import cybersecLabsImg from "@assets/image_1776184060375.png";
import technovaImg from "@assets/image_1776185726315.png";
import gamingWebsiteImg from "@assets/image_1776188180874.png";
import webDevImg from "@assets/image_1776228996265.png";

/* ─────────────────────────────────────────────
   SWIPE HOOK
───────────────────────────────────────────── */
function useSwipe(onLeft: () => void, onRight: () => void) {
  const startX = useRef<number | null>(null);
  return {
    onTouchStart: (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; },
    onTouchEnd: (e: React.TouchEvent) => {
      if (startX.current === null) return;
      const diff = startX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) { diff > 0 ? onLeft() : onRight(); }
      startX.current = null;
    },
  };
}

/* ─────────────────────────────────────────────
   GREETING BADGE
───────────────────────────────────────────── */
function GreetingBadge() {
  const [phase, setPhase] = useState<"en" | "ar">("en");

  useEffect(() => {
    const cycle = () => setPhase((p) => (p === "en" ? "ar" : "en"));
    const interval = setInterval(cycle, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: "absolute", top: "4rem", right: "1.5rem",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "16px", padding: "8px 18px",
      animation: "reveal-up 0.5s ease forwards",
      backdropFilter: "blur(8px)",
      zIndex: 10,
    }}>
      <p style={{
        color: "hsl(215 20% 52%)",
        fontFamily: "monospace",
        fontSize: "0.85rem",
        fontWeight: 500,
        letterSpacing: "0.02em",
        transition: "opacity 0.5s",
        opacity: 1,
        direction: phase === "ar" ? "rtl" : "ltr",
      }}>
        {phase === "en" ? "Assalam Alaikum" : "السلام عليكم"}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SKILLS
───────────────────────────────────────────── */
const languages = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "#fbbf24" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "#f97316" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#facc15" },
  { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", color: "#9b59b6" },
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg", color: "#34d399" },
  { name: "HTML/CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "#f97316" },
  { name: "R", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg", color: "#276dc3" },
  { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg", color: "#e2e8f0" },
];
const securityTools = [
  { name: "Kali", icon: kaliImg, color: "#4ade80" },
  { name: "Burp Suite", icon: burpSuiteImg, color: "#f97316" },
  { name: "Nmap", icon: "https://nmap.org/images/nmap-logo-256x256.png", color: "#4ade80" },
  { name: "Metasploit", icon: metasploitImg, color: "#f87171" },
  { name: "Wireshark", icon: wiresharkImg, color: "#60a5fa" },
  { name: "Nessus", icon: nessusImg, color: "#34d399" },
];
const platforms = [
  { name: "Cisco Packet Tracer", icon: ciscoImg, color: "#818cf8" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", color: "#fb923c" },
  { name: "VirtualBox", icon: virtualBoxImg, color: "#3b82f6" },
  { name: "Windows XP", icon: windowsXPImg, color: "#60a5fa" },
  { name: "Unity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg", color: "#e2e8f0" },
  { name: "Android Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg", color: "#4ade80" },
];

/* ─────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────── */
interface Project {
  title: string; titleAr: string;
  description: string; descriptionAr: string;
  tags: string[];
  tagColor: "green" | "orange" | "purple" | "blue";
  icon: string;
  skills: string[];
  gradient: string; iconBg: string;
  screenshot: string;
  bullets: string[];
  bulletsAr: string[];
  link?: { url: string; label: string; labelAr: string };
}

const projects: Project[] = [
  {
    title: "Car Maintenance Reminder App", titleAr: "تطبيق تذكير صيانة السيارة",
    description: "Android app built in Kotlin to help users track and schedule vehicle maintenance. Features service reminders, mileage tracking, and push notifications.",
    descriptionAr: "تطبيق أندرويد مبني بـ Kotlin لمساعدة المستخدمين على تتبع وجدولة صيانة سياراتهم.",
    tags: ["Android", "Mobile"], tagColor: "green", icon: "🚗",
    skills: ["Kotlin", "Android Studio", "Jetpack Compose"],
    gradient: "linear-gradient(135deg, rgba(74,222,128,0.12) 0%, rgba(10,15,30,0.95) 100%)",
    iconBg: "rgba(74,222,128,0.15)", screenshot: carMaintenanceImg,
    bullets: [
      "Designed and developed a mobile app using Kotlin for Android to help users track and schedule vehicle maintenance.",
      "Implemented features such as service reminders, mileage tracking, and notifications to improve user convenience.",
      "Tested and debugged the app to ensure smooth performance, intuitive UI, and reliable notifications.",
    ],
    bulletsAr: [
      "صممت وطورت تطبيق موبايل باستخدام Kotlin لنظام Android لمساعدة المستخدمين على تتبع وجدولة صيانة سياراتهم.",
      "نفّذت ميزات مثل تذكيرات الخدمة وتتبع المسافة المقطوعة والإشعارات لتحسين راحة المستخدم.",
      "اختبرت التطبيق وأصلحت الأخطاء لضمان أداء سلس وواجهة مستخدم بديهية وإشعارات موثوقة.",
    ],
    link: { url: "https://drive.google.com/file/d/16PBzCE7yecZ2dR7vEu2Dzk8gTnJCxtTY/view", label: "View App", labelAr: "عرض التطبيق" },
  },
  {
    title: "Cybersecurity & Penetration Testing Labs", titleAr: "مختبرات الأمن السيبراني واختبار الاختراق",
    description: "Hands-on security labs covering network scanning, controlled exploits, and web traffic interception.",
    descriptionAr: "مختبرات أمن عملية تشمل مسح الشبكات واستغلال الثغرات واعتراض حركة الويب في بيئات معزولة.",
    tags: ["Security", "Labs"], tagColor: "orange", icon: "🔓",
    skills: ["Nmap", "Metasploit", "Burp Suite", "Nessus", "Kali"],
    gradient: "linear-gradient(135deg, rgba(251,146,60,0.12) 0%, rgba(10,15,30,0.95) 100%)",
    iconBg: "rgba(251,146,60,0.15)", screenshot: cybersecLabsImg,
    bullets: [
      "Conducted comprehensive network scanning and vulnerability assessments using Nmap and Nessus to identify open ports and services.",
      "Executed controlled exploits against vulnerable environments utilizing the Metasploit Framework.",
      "Intercepted and analyzed web application traffic to identify and mitigate vulnerabilities using Burp Suite.",
    ],
    bulletsAr: [
      "أجريت عمليات مسح شاملة للشبكة وتقييمات للثغرات باستخدام Nmap وNessus لتحديد المنافذ المفتوحة والخدمات.",
      "نفّذت عمليات استغلال موجّهة ضد بيئات ضعيفة باستخدام إطار عمل Metasploit.",
      "اعترضت وحللت حركة تطبيقات الويب لتحديد الثغرات والتخفيف منها باستخدام Burp Suite.",
    ],
  },
  {
    title: "Gaming Website with Integrated Mini-Game", titleAr: "موقع ألعاب مع لعبة مدمجة",
    description: "Interactive gaming website featuring an embedded mini-game built with HTML, CSS, and JavaScript.",
    descriptionAr: "موقع ألعاب تفاعلي يحتوي على لعبة مدمجة مبني بـ HTML وCSS وJavaScript.",
    tags: ["Web Dev", "Games"], tagColor: "purple", icon: "🎮",
    skills: ["HTML5", "CSS3", "JavaScript"],
    gradient: "linear-gradient(135deg, rgba(167,139,250,0.12) 0%, rgba(10,15,30,0.95) 100%)",
    iconBg: "rgba(167,139,250,0.15)", screenshot: gamingWebsiteImg,
    bullets: [
      "Designed and developed an interactive gaming website featuring an embedded mini-game for enhanced user engagement.",
      "Implemented front-end development using HTML, CSS, and JavaScript to create responsive and user-friendly interfaces.",
      "Integrated game logic, scoring system, and interactive elements to deliver a dynamic user experience.",
    ],
    bulletsAr: [
      "صممت وطورت موقع ألعاب تفاعلياً يتضمن لعبة مصغّرة مدمجة لتعزيز تفاعل المستخدم.",
      "نفّذت تطوير الواجهة الأمامية باستخدام HTML وCSS وJavaScript لإنشاء واجهات مستجيبة وسهلة الاستخدام.",
      "دمجت منطق اللعبة ونظام التسجيل والعناصر التفاعلية لتقديم تجربة مستخدم ديناميكية.",
    ],
    link: { url: "https://drive.google.com/drive/folders/1mnd68uz0DdqcJS2OOATjXSrWvuc-0tHz", label: "View Files", labelAr: "عرض الملفات" },
  },
  {
    title: "TechNova Solutions — Network Design", titleAr: "TechNova Solutions — تصميم الشبكة",
    description: "Scalable WAN/LAN for 150+ users across 3 UAE branches. Three-tier topology, Hub-and-Spoke VPN, 10 Gbps backbone, 99.95% uptime.",
    descriptionAr: "بنية تحتية للشبكة تخدم أكثر من 150 مستخدماً عبر 3 فروع في الإمارات.",
    tags: ["Networking", "Infrastructure"], tagColor: "blue", icon: "🌐",
    skills: ["Cisco Packet Tracer", "VPN", "VLAN", "HSRP", "QoS"],
    gradient: "linear-gradient(135deg, rgba(99,179,237,0.12) 0%, rgba(10,15,30,0.95) 100%)",
    iconBg: "rgba(99,179,237,0.15)", screenshot: technovaImg,
    bullets: [
      "Designed a scalable and secure WAN/LAN infrastructure for an expanding IT services company to support up to 150 concurrent users across three UAE branches.",
      "Developed a three-tier hierarchical network topology (Core, Distribution, Access) utilizing Cisco hardware and a Hub-and-Spoke VPN for secure inter-branch connectivity.",
      "Engineered a high-availability architecture targeting 99.95% uptime by integrating dual-homed ISPs, redundant multilayer switches and routers, and First Hop Redundancy Protocols (HSRP/VRRP).",
      "Optimized network performance for mission-critical applications by designing a 10 Gbps backbone throughput and configuring Quality of Service (QoS) policies to prioritize VoIP and video traffic (sub-50ms latency).",
      "Implemented a multi-layered security strategy utilizing perimeter firewalls, strict VLAN segmentation, and Multi-Factor Authentication (MFA), alongside a Class C IP addressing scheme using VLSM.",
    ],
    bulletsAr: [
      "صممت بنية تحتية شبكية قابلة للتوسع وآمنة لشركة خدمات تقنية متنامية لدعم ما يصل إلى 150 مستخدماً متزامناً عبر ثلاثة فروع في الإمارات.",
      "طورت طبولوجيا شبكية هرمية ثلاثية الطبقات (Core/Distribution/Access) باستخدام أجهزة Cisco وVPN من النوع Hub-and-Spoke.",
      "صممت بنية عالية التوافر تستهدف وقت تشغيل 99.95% بدمج ISPs مزدوجة ومفاتيح ومسارات متكررة.",
      "حسّنت أداء الشبكة لتطبيقات المهام الحيوية بتصميم سرعة عمود فقري 10 Gbps وسياسات QoS لأولوية VoIP والفيديو.",
      "نفّذت استراتيجية أمان متعددة الطبقات تشمل جدران حماية محيطية وتقسيم VLAN صارم والمصادقة متعددة العوامل.",
    ],
    link: { url: "https://docs.google.com/document/d/1JJ_T-ITZSjNQaZGzfjyNFNU85kaZnSvR/edit?pli=1", label: "View Full Report", labelAr: "عرض التقرير الكامل" },
  },
  {
    title: "Unity Game Development", titleAr: "تطوير لعبة Unity",
    description: "Action game built with Unity and C#. Features zombie AI, collision detection, scoring system, and polished UI.",
    descriptionAr: "لعبة حركية مبنية بـ Unity وC# مع ذكاء اصطناعي وكشف تصادم ونظام نقاط.",
    tags: ["Game Dev", "Unity"], tagColor: "purple", icon: "🎯",
    skills: ["Unity", "C#", "Game Design", "AI Behaviors"],
    gradient: "linear-gradient(135deg, rgba(129,140,248,0.12) 0%, rgba(10,15,30,0.95) 100%)",
    iconBg: "rgba(129,140,248,0.15)", screenshot: unityGameImg,
    bullets: [
      "Designed and developed an interactive game using Unity and C#, implementing gameplay mechanics, player controls, and interactive UI.",
      "Implemented basic AI behaviors, collision detection, and scoring system to enhance player experience.",
      "Tested and debugged the game to ensure smooth performance and a polished user experience.",
    ],
    bulletsAr: [
      "صممت وطورت لعبة تفاعلية باستخدام Unity وC#، مع تنفيذ ميكانيكيات اللعب وتحكم اللاعب وواجهة مستخدم تفاعلية.",
      "نفّذت سلوكيات AI الأساسية وكشف التصادم ونظام التسجيل لتحسين تجربة اللاعب.",
      "اختبرت اللعبة وأصلحت الأخطاء لضمان أداء سلس وتجربة مستخدم مصقولة.",
    ],
    link: { url: "https://drive.google.com/file/d/126JLXttt4jxcUoKdxKEUcipytzfDK1UQ/view", label: "View Game", labelAr: "عرض اللعبة" },
  },
  {
    title: "Web Development Projects", titleAr: "مشاريع تطوير الويب",
    description: "Dynamic e-commerce prototype (BigBack Grocery) with login, user tracking, shopping cart, cookies, and session management.",
    descriptionAr: "نموذج تجارة إلكترونية (BigBack للبقالة) مع تسجيل دخول وسلة تسوق وإدارة جلسات.",
    tags: ["Web Dev", "E-Commerce"], tagColor: "green", icon: "💻",
    skills: ["HTML5", "CSS3", "JavaScript", "SQL"],
    gradient: "linear-gradient(135deg, rgba(52,211,153,0.12) 0%, rgba(10,15,30,0.95) 100%)",
    iconBg: "rgba(52,211,153,0.15)", screenshot: webDevImg,
    bullets: [
      "Developed dynamic and responsive web applications using HTML, CSS, JavaScript, and XML.",
      "Designed user-friendly interfaces and implemented interactive features to enhance user experience.",
      "Built an e-commerce prototype with login, user tracking, and shopping cart functionality.",
      "Implemented cookies and session management to deliver a personalized user experience.",
      "Utilized structured data management and front-end integration techniques for seamless performance.",
    ],
    bulletsAr: [
      "طورت تطبيقات ويب ديناميكية ومستجيبة باستخدام HTML وCSS وJavaScript وXML.",
      "صممت واجهات سهلة الاستخدام ونفّذت ميزات تفاعلية لتحسين تجربة المستخدم.",
      "بنيت نموذج تجارة إلكترونية مع تسجيل الدخول وتتبع المستخدم ووظيفة عربة التسوق.",
      "نفّذت ملفات تعريف الارتباط وإدارة الجلسات لتقديم تجربة مستخدم مخصصة.",
      "استخدمت تقنيات إدارة البيانات المنظمة وتكامل الواجهة الأمامية لأداء سلس.",
    ],
  },
];

/* ─────────────────────────────────────────────
   PROJECT DETAIL MODAL
───────────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { lang } = useLang();
  const bullets = lang === "ar" ? project.bulletsAr : project.bullets;
  const title = lang === "ar" ? project.titleAr : project.title;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem", animation: "reveal-up 0.3s ease forwards",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: "rgba(10,15,30,0.98)", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "24px", maxWidth: "680px", width: "100%",
        maxHeight: "88vh", overflowY: "auto",
        boxShadow: "0 40px 80px rgba(0,0,0,0.7)",
      }}>
        {/* Image */}
        <div style={{ position: "relative" }}>
          <img src={project.screenshot} alt={title}
            style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: "24px 24px 0 0" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(10,15,30,0.95) 100%)", borderRadius: "24px 24px 0 0" }} />
          <button onClick={onClose}
            style={{
              position: "absolute", top: 16, right: 16,
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.2)",
              color: "white", cursor: "pointer", fontSize: "18px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>×</button>
          <div style={{ position: "absolute", top: 16, left: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {project.tags.map((t) => (<span key={t} className={`tag tag-${project.tagColor}`}>{t}</span>))}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "2rem" }}>
          <h2 style={{ color: "white", fontWeight: 700, fontSize: "1.35rem", marginBottom: "1.5rem", lineHeight: 1.3 }}>{title}</h2>

          {/* Skills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "1.5rem" }}>
            {project.skills.map((s) => (
              <span key={s} style={{ fontSize: "0.75rem", padding: "4px 12px", borderRadius: 8, fontFamily: "monospace",
                background: "rgba(255,255,255,0.07)", color: "hsl(215 20% 70%)", border: "1px solid rgba(255,255,255,0.1)" }}>{s}</span>
            ))}
          </div>

          {/* Bullet points */}
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: "1.5rem" }}>
            {bullets.map((b, i) => (
              <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: "#60a5fa", fontWeight: 700, marginTop: 2, flexShrink: 0 }}>→</span>
                <span style={{ color: "hsl(215 20% 65%)", fontSize: "0.875rem", lineHeight: 1.65 }}>{b}</span>
              </li>
            ))}
          </ul>

          {/* Link button */}
          {project.link && (
            <a href={project.link.url} target="_blank" rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: "inline-flex", textDecoration: "none", borderRadius: 12 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>{lang === "ar" ? project.link.labelAr : project.link.label}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TYPEWRITER
───────────────────────────────────────────── */
function TypewriterText({ texts }: { texts: string[] }) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    const current = texts[textIndex % texts.length];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting) {
      if (charIndex < current.length) {
        timeout = setTimeout(() => { setDisplay(current.slice(0, charIndex + 1)); setCharIndex((c) => c + 1); }, 60);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2400);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => { setDisplay(current.slice(0, charIndex - 1)); setCharIndex((c) => c - 1); }, 32);
      } else {
        setDeleting(false);
        setTextIndex((i) => (i + 1) % texts.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, texts]);

  return (
    <span>
      {display}
      <span className="inline-block w-0.5 h-[0.9em] ml-1 align-middle"
        style={{ background: "#60a5fa", animation: "glow-pulse 0.8s ease-in-out infinite", borderRadius: "1px" }} />
    </span>
  );
}

/* ─────────────────────────────────────────────
   PROJECT CAROUSEL
───────────────────────────────────────────── */
function ProjectCarousel({ onReadMore }: { onReadMore: (p: Project) => void }) {
  const { lang } = useLang();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [animating, setAnimating] = useState(false);

  const go = (dir: "left" | "right") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => dir === "right" ? (c + 1) % projects.length : (c - 1 + projects.length) % projects.length);
      setAnimating(false);
    }, 320);
  };

  const swipe = useSwipe(() => go("right"), () => go("left"));
  const p = projects[current];
  const prev = projects[(current - 1 + projects.length) % projects.length];
  const next = projects[(current + 1) % projects.length];
  const ptitle = (proj: Project) => lang === "ar" ? proj.titleAr : proj.title;
  const pdesc = (proj: Project) => lang === "ar" ? proj.descriptionAr : proj.description;
  const readMoreLabel = lang === "ar" ? "اقرأ أكثر" : "Read More";

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <span className="text-sm font-mono" style={{ color: "hsl(215 20% 45%)" }}>
          {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          {projects.map((_, i) => (
            <button key={i} onClick={() => { setDirection(i > current ? "right" : "left"); setCurrent(i); }}
              className="transition-all duration-300"
              style={{ width: i === current ? "24px" : "8px", height: "8px", borderRadius: "4px",
                background: i === current ? "#60a5fa" : "rgba(255,255,255,0.18)", border: "none", cursor: "pointer" }} />
          ))}
        </div>
      </div>

      <div className="relative flex gap-5 items-stretch justify-center" {...swipe}>
        <button onClick={() => go("left")} aria-label="Previous"
          className="hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", cursor: "pointer" }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(96,165,250,0.15)"; el.style.borderColor = "rgba(96,165,250,0.5)"; el.style.color = "#60a5fa"; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.05)"; el.style.borderColor = "rgba(255,255,255,0.12)"; el.style.color = "rgba(255,255,255,0.7)"; }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>

        {/* prev ghost */}
        <div className="hidden lg:block w-52 flex-shrink-0 opacity-30 scale-95 origin-right transition-all duration-300 rounded-2xl overflow-hidden cursor-pointer"
          onClick={() => go("left")} style={{ background: prev.gradient, border: "1px solid rgba(255,255,255,0.06)", minHeight: 320 }}>
          <div style={{ height: 160, overflow: "hidden" }}><img src={prev.screenshot} alt={ptitle(prev)} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
          <div className="p-4"><p className="text-white font-semibold text-sm line-clamp-2">{ptitle(prev)}</p></div>
        </div>

        {/* main card */}
        <div className={`flex-1 max-w-xl project-card transition-all duration-300 ${animating ? (direction === "right" ? "opacity-0 translate-x-8" : "opacity-0 -translate-x-8") : "opacity-100 translate-x-0"}`}>
          <div className="relative overflow-hidden" style={{ height: 220 }}>
            <img src={p.screenshot} alt={ptitle(p)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 55%, rgba(8,12,24,0.85) 100%)" }} />
            <div className="absolute top-3 right-3 flex gap-2 flex-wrap justify-end">
              {p.tags.map((t) => (<span key={t} className={`tag tag-${p.tagColor}`}>{t}</span>))}
            </div>
          </div>
          <div className="p-7">
            <h3 className="text-white font-bold text-xl mb-3">{ptitle(p)}</h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "hsl(215 20% 60%)" }}>{pdesc(p)}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {p.skills.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-lg font-mono"
                  style={{ background: "rgba(255,255,255,0.07)", color: "hsl(215 20% 70%)", border: "1px solid rgba(255,255,255,0.08)" }}>{s}</span>
              ))}
            </div>
            <button onClick={() => onReadMore(p)}
              className="btn-ghost text-sm py-2 px-4"
              style={{ borderRadius: 10, display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span>{readMoreLabel}</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>

        {/* next ghost */}
        <div className="hidden lg:block w-52 flex-shrink-0 opacity-30 scale-95 origin-left transition-all duration-300 rounded-2xl overflow-hidden cursor-pointer"
          onClick={() => go("right")} style={{ background: next.gradient, border: "1px solid rgba(255,255,255,0.06)", minHeight: 320 }}>
          <div style={{ height: 160, overflow: "hidden" }}><img src={next.screenshot} alt={ptitle(next)} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
          <div className="p-4"><p className="text-white font-semibold text-sm line-clamp-2">{ptitle(next)}</p></div>
        </div>

        <button onClick={() => go("right")} aria-label="Next"
          className="hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", cursor: "pointer" }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(96,165,250,0.15)"; el.style.borderColor = "rgba(96,165,250,0.5)"; el.style.color = "#60a5fa"; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.05)"; el.style.borderColor = "rgba(255,255,255,0.12)"; el.style.color = "rgba(255,255,255,0.7)"; }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>

      <div className="flex gap-3 justify-center mt-6 lg:hidden">
        <button className="carousel-btn" onClick={() => go("left")}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button className="carousel-btn" onClick={() => go("right")}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   EXPERIENCE CAROUSEL
───────────────────────────────────────────── */
const experiences = [
  {
    title: "GITEX Global 2025", titleAr: "جيتكس جلوبال 2025",
    org: "World's Largest Tech & Startup Show", orgAr: "أكبر معرض تقني وشركات ناشئة في العالم",
    date: "Oct 2025",
    desc: "Explored AI, cloud, and robotics innovations. Engaged with professionals from e&, Huawei, Cisco, Microsoft, AWS, and NVIDIA.",
    descAr: "استكشفت ابتكارات الذكاء الاصطناعي والسحابة والروبوتات. تواصلت مع متخصصين من e& وHuawei وCisco وMicrosoft وAWS وNVIDIA.",
    color: "#60a5fa", icon: "🌍",
  },
  {
    title: "Digital Dubai Visit", titleAr: "زيارة Digital Dubai",
    org: "Digital Dubai", orgAr: "Digital Dubai",
    date: "2025",
    desc: "Deep dive into DubaiNow, UAE Pass, and government cybersecurity strategy. Learned about AI in public services and deepfake threat awareness.",
    descAr: "تعمقت في DubaiNow وUAE Pass واستراتيجية الأمن السيبراني الحكومية. تعلمت عن الذكاء الاصطناعي في الخدمات العامة.",
    color: "#a78bfa", icon: "🏙️",
  },
  {
    title: "Coding Competitions & CTF", titleAr: "مسابقات البرمجة و CTF",
    org: "Ajman University × Dubai Police Academy", orgAr: "جامعة عجمان × أكاديمية شرطة دبي",
    date: "2024–2025",
    desc: "Participated in 2 coding battles, 1 hackathon, and 1 CTF — invited to join alongside IT-active peers. No AI, no internet, just raw problem-solving.",
    descAr: "شاركت في مسابقتي برمجة وهاكاثون وتحدي CTF — بدعوة من الأقران. بدون ذكاء اصطناعي أو إنترنت.",
    color: "#4ade80", icon: "⚔️",
  },
];

function ExperienceCarousel() {
  const { lang } = useLang();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [dir, setDir] = useState<"left" | "right">("right");

  const go = (d: "left" | "right") => {
    if (animating) return;
    setDir(d);
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => d === "right" ? (c + 1) % experiences.length : (c - 1 + experiences.length) % experiences.length);
      setAnimating(false);
    }, 300);
  };

  const swipe = useSwipe(() => go("right"), () => go("left"));
  const exp = experiences[current];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-mono" style={{ color: "hsl(215 20% 45%)" }}>
          {String(current + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}
        </span>
        <div className="flex gap-3">
          <button className="carousel-btn" onClick={() => go("left")}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button className="carousel-btn" onClick={() => go("right")}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      </div>

      <div className={`glass rounded-2xl p-8 transition-all duration-300 ${animating ? (dir === "right" ? "opacity-0 translate-x-6" : "opacity-0 -translate-x-6") : "opacity-100 translate-x-0"}`}
        style={{ minHeight: 200 }} {...swipe}>
        <div className="flex items-start gap-5">
          <div className="text-4xl flex-shrink-0">{exp.icon}</div>
          <div className="flex-1">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h3 className="text-white font-bold text-lg">{lang === "ar" ? exp.titleAr : exp.title}</h3>
              <span className="tag tag-blue text-xs">{exp.date}</span>
            </div>
            <p className="text-sm font-medium mb-4" style={{ color: exp.color }}>{lang === "ar" ? exp.orgAr : exp.org}</p>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(215 20% 60%)" }}>{lang === "ar" ? exp.descAr : exp.desc}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-5 justify-center">
        {experiences.map((_, i) => (
          <button key={i} onClick={() => { setDir(i > current ? "right" : "left"); setCurrent(i); }}
            className="transition-all duration-300"
            style={{ width: i === current ? "24px" : "8px", height: "8px", borderRadius: "4px",
              background: i === current ? "#60a5fa" : "rgba(255,255,255,0.18)", border: "none", cursor: "pointer" }} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function Home() {
  const { t, lang } = useLang();
  const [cursorPos, setCursorPos] = useState({ x: -9999, y: -9999 });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<"email" | "failed" | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError(null);

    if (!isValidEmail(formData.email)) {
      setSendError("email");
      return;
    }

    setSending(true);
    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.send(
        (import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "").trim(),
        (import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "").trim(),
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setSendError("failed");
    }
    setSending(false);
  };

  return (
    <>
      <div className="cursor-glow" style={{ left: cursorPos.x, top: cursorPos.y }} />
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}

      {/* ── HERO ─────────────────────────────── */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16 relative">
        <GreetingBadge />
        <div className="max-w-5xl mx-auto w-full">
          <div className="mb-6" style={{ opacity: 0, animation: "reveal-up 0.7s 0.1s ease forwards" }}>
            <span className="tag tag-blue px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400 inline-block mr-1 animate-pulse" />
              {t.badge}
            </span>
          </div>

          <h1 className="hero-title mb-4" style={{ opacity: 0, animation: "reveal-up 0.8s 0.2s ease forwards" }}>
            <span className="text-gradient-white">Mohamad</span>
            <br />
            <span className="text-shimmer">Elyoussef</span>
          </h1>

          <div className="text-base md:text-lg font-mono mb-7"
            style={{ color: "hsl(215 20% 55%)", opacity: 0, animation: "reveal-up 0.8s 0.4s ease forwards" }}>
            <TypewriterText texts={t.typewriter} />
          </div>

          <p className="text-sm max-w-lg leading-relaxed mb-10"
            style={{ color: "hsl(215 20% 50%)", opacity: 0, animation: "reveal-up 0.8s 0.55s ease forwards" }}>
            {t.heroPara}
          </p>

          <div className="flex flex-wrap gap-4" style={{ opacity: 0, animation: "reveal-up 0.8s 0.7s ease forwards" }}>
            <a
              href={`${import.meta.env.BASE_URL}Mohamad_Elyoussef_CV.pdf`}
              download="Mohamad_Elyoussef_CV.pdf"
              className="btn-primary cv-download-btn"
              style={{ position: "relative", overflow: "hidden", whiteSpace: "nowrap" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="cv-download-icon">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{t.downloadCV}</span>
            </a>
            <a href="#contact" className="btn-ghost"><span>{t.getInTouch}</span></a>
            <a href="https://www.linkedin.com/in/mohamadelyoussef/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionReveal><h2 className="section-title mb-14">{t.aboutTitle}</h2></SectionReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <SectionReveal delay={80}>
              <div className="space-y-5">
                <p className="text-base leading-relaxed" style={{ color: "hsl(215 20% 65%)" }}>
                  {t.aboutP1((txt) => <span className="text-blue-400 font-semibold">{txt}</span>)}
                </p>
                <p className="text-base leading-relaxed" style={{ color: "hsl(215 20% 65%)" }}>{t.aboutP2}</p>
                <p className="text-base leading-relaxed" style={{ color: "hsl(215 20% 65%)" }}>{t.aboutP3}</p>
              </div>
            </SectionReveal>
            <SectionReveal delay={180}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Projects", value: "6", color: "#a78bfa", icon: "💻" },
                  { label: t.stats.events, value: "5+", color: "#4ade80", icon: "🎯" },
                  { label: t.stats.year, value: lang === "ar" ? "الرابعة" : "4th", color: "#fb923c", icon: "🎓" },
                  { label: t.stats.competitions, value: "3+", color: "#60a5fa", icon: "⚔️" },
                ].map((stat) => (
                  <div key={stat.label} className="glass glass-hover rounded-2xl p-6 text-center">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-4xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-sm" style={{ color: "hsl(215 20% 50%)" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────── */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <h2 className="section-title mb-3">{t.skillsTitle}</h2>
            <p className="mb-14 text-sm" style={{ color: "hsl(215 20% 48%)" }}>{t.skillsHint}</p>
          </SectionReveal>
          <SectionReveal delay={80}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "hsl(215 20% 40%)" }}>{t.skillsCat1}</p>
            <div className="flex flex-wrap gap-4 mb-14">{languages.map((s) => <SkillIcon key={s.name} {...s} />)}</div>
          </SectionReveal>
          <SectionReveal delay={160}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "hsl(215 20% 40%)" }}>{t.skillsCat2}</p>
            <div className="flex flex-wrap gap-4 mb-14">{securityTools.map((s) => <SkillIcon key={s.name} {...s} />)}</div>
          </SectionReveal>
          <SectionReveal delay={240}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "hsl(215 20% 40%)" }}>{t.skillsCat3}</p>
            <div className="flex flex-wrap gap-4">{platforms.map((s) => <SkillIcon key={s.name} {...s} />)}</div>
          </SectionReveal>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────── */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionReveal><h2 className="section-title mb-14">{t.projectsTitle}</h2></SectionReveal>
          <SectionReveal delay={80}><ProjectCarousel onReadMore={setSelectedProject} /></SectionReveal>
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────── */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionReveal><h2 className="section-title mb-14">{t.experienceTitle}</h2></SectionReveal>
          <SectionReveal delay={80}><ExperienceCarousel /></SectionReveal>
          <SectionReveal delay={160}>
            <div className="glass rounded-2xl p-8 mt-6">
              <div className="flex items-start gap-5">
                <div className="text-4xl flex-shrink-0">🎓</div>
                <div>
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                    <h3 className="text-white font-bold text-lg">{t.educationCard.title}</h3>
                    <span className="tag tag-orange">2022 – Jan 2027</span>
                  </div>
                  <p className="text-sm font-medium mb-3" style={{ color: "#f59e0b" }}>{t.educationCard.deg}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(215 20% 60%)" }}>{t.educationCard.desc}</p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── CERTIFICATIONS ───────────────────── */}
      <section id="certifications" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionReveal><h2 className="section-title mb-14">{t.certsTitle}</h2></SectionReveal>
          <SectionReveal delay={80}><CertCarousel /></SectionReveal>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────── */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <h2 className="section-title mb-4">{t.contactTitle}</h2>
            <p className="text-sm mb-14" style={{ color: "hsl(215 20% 50%)" }}>{t.contactSubtitle}</p>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Social icon buttons — desktop bigger */}
            <SectionReveal delay={80}>
              <div className="flex gap-5 items-center">
                {/* Instagram — gradient */}
                <a href="https://www.instagram.com/m7mdelyoussef/" target="_blank" rel="noopener noreferrer"
                  title="Instagram"
                  style={{
                    width: "clamp(64px, 8vw, 88px)", height: "clamp(64px, 8vw, 88px)",
                    borderRadius: "22px", display: "flex", alignItems: "center", justifyContent: "center",
                    background: "linear-gradient(135deg, rgba(131,58,180,0.15), rgba(253,29,29,0.12), rgba(252,176,69,0.12))",
                    border: "1px solid rgba(225,48,108,0.35)",
                    transition: "all 0.22s ease", cursor: "pointer", textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "linear-gradient(135deg, rgba(131,58,180,0.3), rgba(253,29,29,0.2), rgba(252,176,69,0.2))"; el.style.borderColor = "rgba(225,48,108,0.7)"; el.style.transform = "translateY(-4px) scale(1.06)"; el.style.boxShadow = "0 12px 32px rgba(225,48,108,0.25)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "linear-gradient(135deg, rgba(131,58,180,0.15), rgba(253,29,29,0.12), rgba(252,176,69,0.12))"; el.style.borderColor = "rgba(225,48,108,0.35)"; el.style.transform = "translateY(0) scale(1)"; el.style.boxShadow = "none"; }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#igGrad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                      <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f9ce34" />
                        <stop offset="33%" stopColor="#ee2a7b" />
                        <stop offset="100%" stopColor="#6228d7" />
                      </linearGradient>
                    </defs>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="url(#igGrad)" stroke="none" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/mohamadelyoussef/" target="_blank" rel="noopener noreferrer"
                  title="LinkedIn"
                  style={{
                    width: "clamp(64px, 8vw, 88px)", height: "clamp(64px, 8vw, 88px)",
                    borderRadius: "22px", display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(10,102,194,0.12)", border: "1px solid rgba(10,102,194,0.32)",
                    transition: "all 0.22s ease", cursor: "pointer", textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(10,102,194,0.25)"; el.style.borderColor = "rgba(10,102,194,0.65)"; el.style.transform = "translateY(-4px) scale(1.06)"; el.style.boxShadow = "0 12px 32px rgba(10,102,194,0.28)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(10,102,194,0.12)"; el.style.borderColor = "rgba(10,102,194,0.32)"; el.style.transform = "translateY(0) scale(1)"; el.style.boxShadow = "none"; }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="#0a66c2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                  </svg>
                </a>

                {/* GitHub */}
                <a href="https://github.com/m7mdelyoussef" target="_blank" rel="noopener noreferrer"
                  title="GitHub"
                  style={{
                    width: "clamp(64px, 8vw, 88px)", height: "clamp(64px, 8vw, 88px)",
                    borderRadius: "22px", display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)",
                    transition: "all 0.22s ease", cursor: "pointer", textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.14)"; el.style.borderColor = "rgba(255,255,255,0.35)"; el.style.transform = "translateY(-4px) scale(1.06)"; el.style.boxShadow = "0 12px 32px rgba(255,255,255,0.08)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.06)"; el.style.borderColor = "rgba(255,255,255,0.14)"; el.style.transform = "translateY(0) scale(1)"; el.style.boxShadow = "none"; }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
              </div>
            </SectionReveal>

            {/* Contact form */}
            <SectionReveal delay={160}>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "hsl(215 20% 58%)" }}>{t.formName}</label>
                  <input type="text" className="contact-input" placeholder={t.formPlaceholderName} required
                    value={formData.name} onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "hsl(215 20% 58%)" }}>{t.formEmail}</label>
                  <input type="email" className="contact-input" placeholder={t.formPlaceholderEmail} required
                    value={formData.email}
                    onChange={(e) => { setFormData((f) => ({ ...f, email: e.target.value })); setSendError(null); }}
                    style={{ borderColor: sendError === "email" ? "rgba(248,113,113,0.6)" : undefined }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "hsl(215 20% 58%)" }}>{t.formMessage}</label>
                  <textarea className="contact-input resize-none" rows={5} placeholder={t.formPlaceholderMessage} required
                    value={formData.message} onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))} />
                </div>
                {sendError === "email" && (
                  <p className="text-xs" style={{ color: "#f87171" }}>
                    ⚠ Please enter a valid email address (e.g. name@example.com).
                  </p>
                )}
                {sendError === "failed" && (
                  <p className="text-xs" style={{ color: "#f87171" }}>
                    Failed to send — please try again or reach out on LinkedIn.
                  </p>
                )}
                <button type="submit" disabled={sending}
                  className="btn-primary w-full justify-center"
                  style={{ borderRadius: "12px", background: sent ? "linear-gradient(135deg,#4ade80,#22c55e)" : undefined, transition: "background 0.4s ease", opacity: sending ? 0.7 : 1 }}>
                  <span>{sending ? "Sending..." : sent ? t.sentBtn : t.sendBtn}</span>
                  {sent
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>}
                </button>
              </form>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────── */}
      <footer className="py-10 px-6 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-center">
          <p className="text-sm font-mono" style={{ color: "hsl(215 20% 38%)" }}>{t.footer}</p>
        </div>
      </footer>
    </>
  );
}
