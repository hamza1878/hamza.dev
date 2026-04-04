import { useEffect, useRef } from "react";

/* ─── Particle ───────────────────────────────────────────────────────────── */
class Particle {
  constructor(w, h) {
    this.w = w; this.h = h;
    this.reset(true);
  }

  reset(init = false) {
    this.x        = Math.random() * this.w;
    this.y        = init ? Math.random() * this.h : this.h + 10;
    this.baseSize = Math.random() * 2.5 + 0.5;
    this.size     = this.baseSize;
    this.hue      = Math.random() * 80 + 240;   // blue-purple range
    this.sat      = 60 + Math.random() * 30;
    this.lit      = 50 + Math.random() * 25;
    this.alpha    = Math.random() * 0.5 + 0.1;
    this.vx       = (Math.random() - 0.5) * 0.6;
    this.vy       = -(Math.random() * 0.8 + 0.2);
    this.life     = 0;
    this.maxLife  = Math.random() * 400 + 200;
    this.pulse    = Math.random() * Math.PI * 2;
    this.pulseSpd = Math.random() * 0.03 + 0.01;
  }

  update(t) {
    this.x      += this.vx + Math.sin(t * 0.001 + this.pulse) * 0.15;
    this.y      += this.vy;
    this.life++;
    this.pulse  += this.pulseSpd;
    this.size    = this.baseSize + Math.sin(this.pulse) * 0.4;

    const r = this.life / this.maxLife;
    if      (r < 0.1) this.alpha = (r / 0.1) * 0.4;
    else if (r > 0.7) this.alpha = ((1 - r) / 0.3) * 0.4;

    if (this.life > this.maxLife || this.y < -20 || this.x < -20 || this.x > this.w + 20) {
      this.reset();
    }
  }

  draw(ctx) {
    const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
    g.addColorStop(0, `hsla(${this.hue},${this.sat}%,${this.lit}%,${this.alpha})`);
    g.addColorStop(1, `hsla(${this.hue},${this.sat}%,${this.lit}%,0)`);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();

    // bright core
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue},90%,90%,${this.alpha * 1.5})`;
    ctx.fill();
  }
}

/* ─── Orb ────────────────────────────────────────────────────────────────── */
class Orb {
  constructor(w, h) {
    this.ox    = Math.random() * w;
    this.oy    = Math.random() * h;
    this.r     = Math.random() * 80 + 40;
    this.hue   = Math.random() * 60 + 240;
    this.phase = Math.random() * Math.PI * 2;
    this.speed = 0.0003 + Math.random() * 0.0004;
    this.drift = 30 + Math.random() * 40;
    this.x     = this.ox;
    this.y     = this.oy;
  }

  draw(ctx, t) {
    this.x = this.ox + Math.sin(t * this.speed + this.phase) * this.drift;
    this.y = this.oy + Math.cos(t * this.speed * 0.7 + this.phase) * this.drift * 0.6;
    const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
    g.addColorStop(0,   `hsla(${this.hue},70%,60%,0.07)`);
    g.addColorStop(0.5, `hsla(${this.hue},70%,60%,0.04)`);
    g.addColorStop(1,   `hsla(${this.hue},70%,60%,0)`);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
  }
}

/* ─── ShootingStar ───────────────────────────────────────────────────────── */
class ShootingStar {
  constructor(w, h) {
    this.w = w; this.h = h;
    this.reset();
  }

  reset() {
    this.x      = Math.random() * this.w;
    this.y      = Math.random() * this.h * 0.5;
    this.len    = Math.random() * 120 + 60;
    this.speed  = Math.random() * 8 + 4;
    this.angle  = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
    this.alpha  = 0;
    this.alive  = true;
    this.phase  = "in";
    this.timer  = 0;
  }

  update() {
    this.x     += Math.cos(this.angle) * this.speed;
    this.y     += Math.sin(this.angle) * this.speed;
    this.timer++;
    if (this.phase === "in") {
      this.alpha = Math.min(1, this.timer / 10);
      if (this.timer > 10) this.phase = "out";
    } else {
      this.alpha -= 0.04;
      if (this.alpha <= 0) this.alive = false;
    }
  }

  draw(ctx) {
    const ex = this.x - Math.cos(this.angle) * this.len;
    const ey = this.y - Math.sin(this.angle) * this.len;
    const g  = ctx.createLinearGradient(ex, ey, this.x, this.y);
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(1, `rgba(200,180,255,${this.alpha})`);
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = g;
    ctx.lineWidth   = 1.5;
    ctx.stroke();
  }
}

/* ─── Connection lines ───────────────────────────────────────────────────── */
function drawConnections(ctx, particles, maxDist = 120) {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        const a = (1 - dist / maxDist) * 0.12;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(167,139,250,${a})`;
        ctx.lineWidth   = 0.8;
        ctx.stroke();
      }
    }
  }
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function ParticleBackground({ isDark }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    // Init objects
    const particles    = Array.from({ length: 90 }, () => new Particle(W, H));
    const orbs         = Array.from({ length: 6  }, () => new Orb(W, H));
    let   shooters     = [];
    let   ssTimer      = 0;
    let   t            = 0;

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      t++;

      // Fade background
      ctx.fillStyle = isDark ? "rgba(8,6,18,0.18)" : "rgba(245,243,255,0.18)";
      ctx.fillRect(0, 0, W, H);

      // Draw orbs
      orbs.forEach(o => o.draw(ctx, t));

      // Draw connections
      drawConnections(ctx, particles);

      // Draw particles
      particles.forEach(p => { p.update(t); p.draw(ctx); });

      // Shooting stars
      ssTimer++;
      if (ssTimer > 180 + Math.random() * 240) {
        shooters.push(new ShootingStar(W, H));
        ssTimer = 0;
      }
      shooters = shooters.filter(s => s.alive);
      shooters.forEach(s => { s.update(); s.draw(ctx); });
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      style={{
        position:      "fixed",
        inset:          0,
        pointerEvents: "none",
        zIndex:         0,
        opacity:        isDark ? 1 : 0.6,
        transition:    "opacity 0.5s",
      }}
    />
  );
}
