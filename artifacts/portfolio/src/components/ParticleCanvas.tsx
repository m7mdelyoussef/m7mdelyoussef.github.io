import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  baseOpacity: number;
  glowing: boolean;
  glowIntensity: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COUNT = 160;
    const REPEL_RADIUS = 130;
    const REPEL_STRENGTH = 4.5;
    const GLOW_RADIUS = 100;
    const MAX_SPEED = 0.7;
    const FRICTION = 0.96;
    const CONNECTION_DIST = 100;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const initParticles = () => {
      particlesRef.current = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.4,
        opacity: Math.random() * 0.5 + 0.2,
        baseOpacity: Math.random() * 0.5 + 0.2,
        glowing: false,
        glowIntensity: 0,
      }));
    };
    initParticles();

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          const nx = dx / dist;
          const ny = dy / dist;
          p.vx += nx * force * 0.08;
          p.vy += ny * force * 0.08;
        }

        p.vx *= FRICTION;
        p.vy *= FRICTION;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const glowDist = dist < GLOW_RADIUS ? dist : GLOW_RADIUS + 1;
        const targetGlow = glowDist < GLOW_RADIUS ? (1 - glowDist / GLOW_RADIUS) : 0;
        p.glowIntensity += (targetGlow - p.glowIntensity) * 0.08;
        p.glowing = p.glowIntensity > 0.01;

        const finalOpacity = p.baseOpacity + p.glowIntensity * 0.6;

        if (p.glowing) {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * (3 + p.glowIntensity * 4));
          gradient.addColorStop(0, `rgba(147, 197, 253, ${finalOpacity})`);
          gradient.addColorStop(0.3, `rgba(147, 197, 253, ${finalOpacity * 0.6})`);
          gradient.addColorStop(1, "rgba(147, 197, 253, 0)");
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * (3 + p.glowIntensity * 4), 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + p.glowIntensity * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const cx = p.x - q.x;
          const cy = p.y - q.y;
          const cdist = Math.sqrt(cx * cx + cy * cy);
          if (cdist < CONNECTION_DIST) {
            const alpha = (1 - cdist / CONNECTION_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas id="canvas-bg" ref={canvasRef} />;
}
