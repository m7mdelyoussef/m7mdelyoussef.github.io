import { useState, useCallback } from "react";

interface SkillIconProps {
  name: string;
  icon: string;
  color?: string;
}

export default function SkillIcon({ name, icon, color = "#60a5fa" }: SkillIconProps) {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleClick = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => setAnimating(false), 300);
    }, 1800);
  }, [animating]);

  return (
    <div
      className={`skill-icon-btn ${visible ? "tooltip-visible" : ""}`}
      onClick={handleClick}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => { if (!animating) setVisible(false); }}
      style={{ "--skill-color": color } as React.CSSProperties}
    >
      <div className="skill-tooltip">{name}</div>
      <img
        src={icon}
        alt={name}
        width={38}
        height={38}
        style={{ objectFit: "contain", filter: "drop-shadow(0 0 6px rgba(255,255,255,0.1))" }}
        loading="lazy"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            const span = document.createElement("span");
            span.textContent = name.slice(0, 2).toUpperCase();
            span.style.cssText = `font-size:1rem;font-weight:700;color:${color};font-family:monospace;`;
            parent.appendChild(span);
          }
        }}
      />
    </div>
  );
}
