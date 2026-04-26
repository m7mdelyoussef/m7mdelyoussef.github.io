import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "ar";

const en = {
  nav: { about: "About", skills: "Skills", projects: "Projects", experience: "Experience", certs: "Certs", contact: "Contact" },
  badge: "Available for Internship · Ajman, UAE",
  typewriter: [
    "IT Networking & Security Student",
    "Exploring Cybersecurity",
    "Learning Cloud & Networking",
    "Building Android Apps",
    "Solving Capture The Flag Challenges",
  ],
  heroPara: "4th-year IT Networking & Security student at Ajman University, UAE. Actively learning cybersecurity, network design, and cloud computing — seeking my first internship to grow in the field.",
  downloadCV: "Download CV",
  getInTouch: "Get In Touch",
  aboutTitle: "About Me",
  aboutP1: (bold: (t: string) => JSX.Element) => <>I'm a {bold("4th-year IT Networking & Security")} student at Ajman University, UAE. I don't have professional experience yet — but I've been using my studies to build real skills across cybersecurity, networking, and software development.</>,
  aboutP2: "I've worked through cybersecurity labs using tools like Metasploit, Burp Suite, and Nmap. I've designed enterprise-level networks in Packet Tracer, built Android apps in Kotlin, developed games in Unity, and created web projects from scratch.",
  aboutP3: "I'm actively looking for an internship where I can take everything I've learned and start applying it in a real environment.",
  maritalBtn: "Marital Status",
  maritalAnswer: "None of your business 🙄",
  stats: { certs: "Certifications", events: "Events Attended", year: "Year of Study", competitions: "Competitions" },
  skillsTitle: "Skills & Tools",
  skillsHint: "Tap or hover any icon to see its name",
  skillsCat1: "Programming Languages",
  skillsCat2: "Cybersecurity Tools",
  skillsCat3: "Platforms & Environments",
  projectsTitle: "Projects",
  experienceTitle: "Experience",
  educationCard: { title: "Ajman University", deg: "BSc IT Networking & Security", desc: "Participated in coding competitions, hackathons, CTFs, and industry visits — invited to join alongside peers in the IT community." },
  certsTitle: "Courses & Certifications",
  contactTitle: "Get In Touch",
  contactSubtitle: "Open to internship opportunities — feel free to reach out via the form or social links below. I will reply within 24 hours.",
  formName: "Name", formEmail: "Email", formMessage: "Message",
  formPlaceholderName: "Your name", formPlaceholderEmail: "your@email.com", formPlaceholderMessage: "Tell me about the opportunity...",
  sendBtn: "Send Message", sentBtn: "Message Sent!",
  footer: "©ME(Mohamad Elyoussef)2026",
};

const ar = {
  nav: { about: "من أنا", skills: "المهارات", projects: "المشاريع", experience: "الخبرات", certs: "الشهادات", contact: "تواصل" },
  badge: "متاح للتدريب · عجمان، الإمارات",
  typewriter: [
    "طالب شبكات أمن معلومات",
    "أستكشف الأمن السيبراني",
    "أتعلم الشبكات والحوسبة السحابية",
    "أبني تطبيقات أندرويد",
    "أحل تحديات CTF",
  ],
  heroPara: "طالب في السنة الرابعة تخصص شبكات أمن المعلومات بجامعة عجمان، الإمارات. أتعلم بنشاط الأمن السيبراني وتصميم الشبكات والحوسبة السحابية — أبحث عن أول تدريب ميداني لي في هذا المجال.",
  downloadCV: "تحميل السيرة الذاتية",
  getInTouch: "تواصل معي",
  aboutTitle: "من أنا",
  aboutP1: (bold: (t: string) => JSX.Element) => <>أنا طالب في {bold("السنة الرابعة — شبكات وأمن تقنية المعلومات")} بجامعة عجمان، الإمارات. لا أمتلك خبرة مهنية بعد، لكنني استثمرت دراستي لبناء مهارات حقيقية في الأمن السيبراني والشبكات وتطوير البرمجيات.</>,
  aboutP2: "اشتغلت على مختبرات الأمن السيبراني باستخدام Metasploit وBurp Suite وNmap. صممت شبكات على مستوى المؤسسات في Packet Tracer، وبنيت تطبيقات أندرويد بـKotlin، وطوّرت ألعاباً بـUnity، وأنشأت مشاريع ويب من الصفر.",
  aboutP3: "أبحث بنشاط عن تدريب ميداني لتطبيق ما تعلمته في بيئة عمل حقيقية.",
  maritalBtn: "الحالة الاجتماعية",
  maritalAnswer: "هذا لا يعنيك 🙄",
  stats: { certs: "الشهادات", events: "الفعاليات", year: "سنة الدراسة", competitions: "المسابقات" },
  skillsTitle: "المهارات والأدوات",
  skillsHint: "انقر أو مرر المؤشر على أي أيقونة لرؤية اسمها",
  skillsCat1: "لغات البرمجة",
  skillsCat2: "أدوات الأمن السيبراني",
  skillsCat3: "المنصات والبيئات",
  projectsTitle: "المشاريع",
  experienceTitle: "الخبرات",
  educationCard: { title: "جامعة عجمان", deg: "بكالوريوس شبكات وأمن تقنية المعلومات", desc: "شاركت في مسابقات برمجية وهاكاثونات وتحديات CTF وزيارات ميدانية — بدعوة من الأقران المنخرطين في المجتمع التقني." },
  certsTitle: "الشهادات",
  contactTitle: "تواصل معي",
  contactSubtitle: "متاح لفرص التدريب — تواصل معي عبر النموذج أو روابط التواصل الاجتماعي. سأرد خلال 24 ساعة.",
  formName: "الاسم", formEmail: "البريد الإلكتروني", formMessage: "الرسالة",
  formPlaceholderName: "اسمك", formPlaceholderEmail: "بريدك@example.com", formPlaceholderMessage: "أخبرني عن الفرصة...",
  sendBtn: "إرسال الرسالة", sentBtn: "تم الإرسال!",
  footer: "©ME(محمد اليوسف)2026",
};

export type Translations = typeof en;

const translations: Record<Lang, Translations> = { en, ar };

interface CtxType { lang: Lang; setLang: (l: Lang) => void; t: Translations; }
const Ctx = createContext<CtxType>({ lang: "en", setLang: () => {}, t: en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <Ctx.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLang = () => useContext(Ctx);
