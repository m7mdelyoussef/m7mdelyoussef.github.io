import { useState, useRef } from "react";
import courseraLogo from "@assets/image_1776186874314.png";
import isc2Logo from "@assets/image_1776186885035.png";
import yonseiLogo from "@assets/image_1776186898723.png";
import googleLogo from "@assets/image_1776186911030.png";
import zakaLogo from "@assets/image_1776186920759.png";
import awsLogo from "@assets/image_1776186946154.png";
import ibmLogo from "@assets/image_1776186960200.png";
import { useLang } from "@/context/LanguageContext";

interface Cert {
  title: string;
  titleAr: string;
  issuer: string;
  id: string;
  accentColor: string;
  logo: string;
  year: string;
}

const certs: Cert[] = [
  { title: "Google Cybersecurity Professional", titleAr: "محترف الأمن السيبراني من Google", issuer: "Google / Coursera", id: "0HVUQ3HGHMMB", accentColor: "#4285f4", logo: googleLogo, year: "Dec 2025" },
  { title: "Certified in Cybersecurity (CC)", titleAr: "مُعتمد في الأمن السيبراني (CC)", issuer: "ISC2", id: "5EJ1Z6515A96", accentColor: "#4a9f5c", logo: isc2Logo, year: "Mar 2026" },
  { title: "AWS Academy Cloud Operations", titleAr: "عمليات السحابة من AWS", issuer: "Amazon Web Services", id: "975c14ab", accentColor: "#f90", logo: awsLogo, year: "May 2025" },
  { title: "AWS Academy Cloud Foundations", titleAr: "أساسيات السحابة من AWS", issuer: "Amazon Web Services", id: "66de0f7c", accentColor: "#f90", logo: awsLogo, year: "Mar 2025" },
  { title: "Advanced Relational Database and SQL", titleAr: "قواعد البيانات العلائقية المتقدمة وSQL", issuer: "Coursera", id: "B2KZ3G59I092", accentColor: "#0056d2", logo: courseraLogo, year: "Mar 2026" },
  { title: "IoT Wireless & Cloud Computing", titleAr: "إنترنت الأشياء والحوسبة السحابية", issuer: "Yonsei University", id: "5MJUENNTHLBX", accentColor: "#003087", logo: yonseiLogo, year: "Mar 2026" },
  { title: "Getting Started with Python for Data Science", titleAr: "البدء مع Python لعلم البيانات", issuer: "ZAKA", id: "ot0tsc7s90", accentColor: "#f97316", logo: zakaLogo, year: "Dec 2025" },
  { title: "Introduction to Networking and Storage", titleAr: "مقدمة في الشبكات والتخزين", issuer: "IBM", id: "C7KYDTLUN7DA", accentColor: "#1f70c1", logo: ibmLogo, year: "Mar 2024" },
  { title: "Understanding Basic SQL Syntax", titleAr: "فهم أساسيات SQL", issuer: "Coursera", id: "JMK03ZSR3DTE", accentColor: "#0056d2", logo: courseraLogo, year: "Nov 2024" },
];

export default function CertCarousel() {
  const { lang } = useLang();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [dir, setDir] = useState<"left" | "right">("right");
  const touchStartX = useRef<number | null>(null);

  const go = (d: "left" | "right") => {
    if (animating) return;
    setDir(d);
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => d === "right" ? (c + 1) % certs.length : (c - 1 + certs.length) % certs.length);
      setAnimating(false);
    }, 280);
  };

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(diff > 0 ? "right" : "left");
    touchStartX.current = null;
  };

  const cert = certs[current];
  const prev = certs[(current - 1 + certs.length) % certs.length];
  const next = certs[(current + 1) % certs.length];
  const certTitle = (c: Cert) => lang === "ar" ? c.titleAr : c.title;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center justify-between w-full max-w-xl">
        <span className="text-sm font-mono" style={{ color: "hsl(215 20% 40%)" }}>
          {String(current + 1).padStart(2, "0")} / {String(certs.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          {certs.map((_, i) => (
            <button key={i} onClick={() => { setDir(i > current ? "right" : "left"); setCurrent(i); }}
              style={{ width: i === current ? 22 : 8, height: 8, borderRadius: 4,
                background: i === current ? "#60a5fa" : "rgba(255,255,255,0.18)", border: "none", cursor: "pointer",
                transition: "all 0.3s" }} />
          ))}
        </div>
      </div>

      <div className="flex gap-5 items-stretch justify-center w-full max-w-4xl"
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {/* prev ghost */}
        <div className="hidden md:flex w-48 flex-shrink-0 flex-col items-center justify-center opacity-25 scale-90 origin-right cursor-pointer rounded-2xl p-6 transition-all duration-300"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          onClick={() => go("left")}>
          <img src={prev.logo} alt={prev.issuer} style={{ width: 44, height: 44, objectFit: "contain", borderRadius: 8, marginBottom: 10 }} />
          <p className="text-white text-xs font-semibold text-center line-clamp-2">{certTitle(prev)}</p>
        </div>

        {/* main */}
        <div className={`flex-1 max-w-md rounded-2xl overflow-hidden transition-all duration-280 ${
          animating ? (dir === "right" ? "opacity-0 translate-x-8" : "opacity-0 -translate-x-8") : "opacity-100 translate-x-0"
        }`}
          style={{ background: "rgba(10,15,30,0.95)", border: `1px solid ${cert.accentColor}30`, boxShadow: `0 0 40px ${cert.accentColor}10` }}>
          <div style={{ height: 4, background: cert.accentColor, width: "100%" }} />
          <div className="p-8">
            <div className="flex items-start gap-5 mb-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <img src={cert.logo} alt={cert.issuer} style={{ width: 44, height: 44, objectFit: "contain", borderRadius: 6 }} />
              </div>
              <div>
                <p className="text-white font-bold text-base leading-snug mb-1">{certTitle(cert)}</p>
                <p className="text-sm font-medium" style={{ color: cert.accentColor }}>{cert.issuer}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="tag tag-blue text-xs font-mono">ID: {cert.id.slice(0, 8).toUpperCase()}</span>
              <span className="text-xs font-mono px-3 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.05)", color: "hsl(215 20% 50%)" }}>{cert.year}</span>
            </div>
          </div>
        </div>

        {/* next ghost */}
        <div className="hidden md:flex w-48 flex-shrink-0 flex-col items-center justify-center opacity-25 scale-90 origin-left cursor-pointer rounded-2xl p-6 transition-all duration-300"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          onClick={() => go("right")}>
          <img src={next.logo} alt={next.issuer} style={{ width: 44, height: 44, objectFit: "contain", borderRadius: 8, marginBottom: 10 }} />
          <p className="text-white text-xs font-semibold text-center line-clamp-2">{certTitle(next)}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="carousel-btn" onClick={() => go("left")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button className="carousel-btn" onClick={() => go("right")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
    </div>
  );
}
