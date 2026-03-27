import { useEffect, useRef } from 'react';

// ── Canvas-based particle system ─────────────────────────────────────────────

function createSnowParticle(w, h) {
  return {
    x: Math.random() * w,
    y: Math.random() * h - h,
    r: Math.random() * 3.5 + 0.8,
    vx: (Math.random() - 0.5) * 0.6,
    vy: Math.random() * 1.2 + 0.3,
    op: Math.random() * 0.55 + 0.3,
    wobble: Math.random() * Math.PI * 2,
  };
}

function createEmberParticle(w, h) {
  return {
    x: w * 0.2 + Math.random() * w * 0.6,
    y: h + Math.random() * 60,
    r: Math.random() * 2.5 + 0.8,
    vx: (Math.random() - 0.5) * 0.9,
    vy: -(Math.random() * 2.2 + 0.7),
    op: Math.random() * 0.7 + 0.3,
    g: Math.floor(Math.random() * 130 + 40), // green channel → orange range
  };
}

function createStarParticle(w, h) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 0.5,
    op: Math.random(),
    targetOp: Math.random() * 0.9 + 0.1,
    speed: Math.random() * 0.015 + 0.003,
  };
}

function createCrystalParticle(w, h) {
  return {
    x: Math.random() * w,
    y: Math.random() * h - h,
    r: Math.random() * 4 + 2,
    vx: (Math.random() - 0.5) * 0.4,
    vy: Math.random() * 0.8 + 0.2,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.03,
    op: Math.random() * 0.5 + 0.2,
  };
}

function createFireflyParticle(w, h) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2.5 + 1,
    angle: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.4 + 0.15,
    op: Math.random() * 0.6 + 0.2,
    targetOp: Math.random() * 0.9 + 0.1,
    opSpeed: Math.random() * 0.02 + 0.005,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: (Math.random() - 0.5) * 0.03,
  };
}

function createStardustParticle(w, h) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.8 + 0.3,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    op: Math.random(),
    targetOp: Math.random() * 0.8 + 0.1,
    speed: Math.random() * 0.012 + 0.003,
  };
}

const COUNTS = {
  snow: 110,
  embers: 70,
  stars: 90,
  crystals: 60,
  fireflies: 55,
  stardust: 100,
};

function initParticles(type, w, h) {
  const count = COUNTS[type] || 80;
  const fns = {
    snow: createSnowParticle,
    embers: createEmberParticle,
    stars: createStarParticle,
    crystals: createCrystalParticle,
    fireflies: createFireflyParticle,
    stardust: createStardustParticle,
  };
  const fn = fns[type] || createSnowParticle;
  return Array.from({ length: count }, () => fn(w, h));
}

function updateAndDraw(ctx, particles, type, w, h, t) {
  switch (type) {
    case 'snow':
      updateSnow(ctx, particles, w, h, t);
      break;
    case 'embers':
      updateEmbers(ctx, particles, w, h, t);
      break;
    case 'stars':
      updateStars(ctx, particles, w, h);
      break;
    case 'crystals':
      updateCrystals(ctx, particles, w, h);
      break;
    case 'fireflies':
      updateFireflies(ctx, particles, w, h, t);
      break;
    case 'stardust':
      updateStardust(ctx, particles, w, h);
      break;
    default:
      break;
  }
}

function updateSnow(ctx, particles, w, h, t) {
  particles.forEach((p) => {
    p.wobble += 0.012;
    p.x += p.vx + Math.sin(p.wobble) * 0.35;
    p.y += p.vy;
    if (p.y > h + 10) Object.assign(p, createSnowParticle(w, h));
    if (p.x < -10) p.x = w + 10;
    if (p.x > w + 10) p.x = -10;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(220,240,255,${p.op})`;
    ctx.fill();
  });
}

function updateEmbers(ctx, particles, w, h, t) {
  particles.forEach((p) => {
    p.x += p.vx + Math.sin(t * 0.0015 + p.y * 0.008) * 0.3;
    p.y += p.vy;
    p.op -= 0.003;
    if (p.y < -10 || p.op <= 0) Object.assign(p, createEmberParticle(w, h));

    ctx.shadowBlur = 6;
    ctx.shadowColor = `rgba(255,${p.g},0,0.9)`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,${p.g},0,${p.op})`;
    ctx.fill();
    ctx.shadowBlur = 0;
  });
}

function updateStars(ctx, particles, w, h) {
  particles.forEach((p) => {
    if (Math.abs(p.op - p.targetOp) < p.speed) {
      p.targetOp = Math.random() * 0.9 + 0.05;
    }
    p.op += (p.targetOp - p.op) * p.speed;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(253,224,71,${p.op})`;
    ctx.fill();
  });
}

function updateCrystals(ctx, particles, w, h) {
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.rotSpeed;
    if (p.y > h + 20) Object.assign(p, createCrystalParticle(w, h));

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.strokeStyle = `rgba(186,230,253,${p.op})`;
    ctx.lineWidth = 0.8;
    const s = p.r;
    // Simple snowflake shape: 6 lines
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(s, 0);
      ctx.stroke();
      ctx.rotate(Math.PI / 3);
    }
    ctx.restore();
  });
}

function updateFireflies(ctx, particles, w, h, t) {
  particles.forEach((p) => {
    p.wobble += p.wobbleSpeed;
    p.x += Math.cos(p.angle + p.wobble) * p.speed;
    p.y += Math.sin(p.angle + p.wobble * 0.7) * p.speed;

    if (Math.abs(p.op - p.targetOp) < p.opSpeed) {
      p.targetOp = Math.random() * 0.85 + 0.1;
    }
    p.op += (p.targetOp - p.op) * p.opSpeed;

    // Wrap around edges
    if (p.x < -20) p.x = w + 20;
    if (p.x > w + 20) p.x = -20;
    if (p.y < -20) p.y = h + 20;
    if (p.y > h + 20) p.y = -20;

    ctx.shadowBlur = 8;
    ctx.shadowColor = `rgba(134,239,172,0.8)`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(134,239,172,${p.op})`;
    ctx.fill();
    ctx.shadowBlur = 0;
  });
}

function updateStardust(ctx, particles, w, h) {
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (Math.abs(p.op - p.targetOp) < p.speed) {
      p.targetOp = Math.random() * 0.8 + 0.05;
    }
    p.op += (p.targetOp - p.op) * p.speed;

    // Wrap
    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h;
    if (p.y > h) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(196,181,253,${p.op})`;
    ctx.fill();
  });
}

// ── Aurora (CSS-based) ───────────────────────────────────────────────────────

function AuroraEffect() {
  return (
    <div className="aurora-container">
      <div className="aurora-band aurora-1" />
      <div className="aurora-band aurora-2" />
      <div className="aurora-band aurora-3" />
      <div className="aurora-band aurora-4" />
    </div>
  );
}

// ── Main Particles component ─────────────────────────────────────────────────

export default function Particles({ type }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (type === 'aurora') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = initParticles(type, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 16;
      updateAndDraw(ctx, particles, type, canvas.width, canvas.height, t);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [type]);

  if (type === 'aurora') return <AuroraEffect />;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
