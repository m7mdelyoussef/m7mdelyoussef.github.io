import { useState, useEffect } from "react";
import { useLang, Lang } from "@/context/LanguageContext";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#skills", label: t.nav.skills },
    { href: "#projects", label: t.nav.projects },
    { href: "#experience", label: t.nav.experience },
    { href: "#certifications", label: t.nav.certs },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["about", "skills", "projects", "experience", "certifications", "contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => setLang(lang === "en" ? "ar" : "en");

  return (
    <nav className={`nav-bar px-6 py-4 ${scrolled ? "scrolled" : ""}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="#" className="text-white font-bold text-lg tracking-tight flex items-center gap-2">
          <span className="text-gradient">ME</span>
          <span className="text-muted-foreground text-sm font-mono">&lt;/&gt;</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className={`nav-link ${active === l.href.slice(1) ? "active" : ""}`}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Language toggle */}
        <button
          onClick={toggle}
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "white",
            cursor: "pointer",
            letterSpacing: "0.04em",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(96,165,250,0.15)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(96,165,250,0.4)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; }}>
          <span style={{ opacity: lang === "en" ? 1 : 0.45, transition: "opacity 0.2s" }}>EN</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
          <span style={{ opacity: lang === "ar" ? 1 : 0.45, transition: "opacity 0.2s" }}>AR</span>
        </button>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <div className={`w-5 h-0.5 bg-white mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <div className={`w-5 h-0.5 bg-white mb-1 transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-5 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 px-6 pb-6 flex flex-col gap-4" style={{ background: "rgba(5,7,15,0.95)" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link text-base py-2" onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <button onClick={() => { toggle(); setMenuOpen(false); }}
            className="text-left text-sm font-semibold py-2"
            style={{ color: "rgba(255,255,255,0.6)", background: "none", border: "none", cursor: "pointer" }}>
            {lang === "en" ? "Switch to Arabic / العربية" : "Switch to English / الإنجليزية"}
          </button>
        </div>
      )}
    </nav>
  );
}
