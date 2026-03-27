import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const DURATION_MS = 6000;

export default function Celebration({ active, onComplete }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;

    setVisible(true);

    // Left side burst
    const end = Date.now() + DURATION_MS;
    let animId;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors: ['#ff0000', '#ffd700', '#ffffff', '#00ff88', '#ff69b4'],
        zIndex: 9999,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors: ['#ff0000', '#ffd700', '#ffffff', '#00ff88', '#ff69b4'],
        zIndex: 9999,
      });

      if (Date.now() < end) {
        animId = requestAnimationFrame(frame);
      }
    };

    // Big initial burst
    confetti({
      particleCount: 180,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#ff0000', '#ffd700', '#ffffff', '#00ff88', '#ff69b4', '#00bfff'],
      zIndex: 9999,
    });

    frame();

    const timer = setTimeout(() => {
      cancelAnimationFrame(animId);
      setVisible(false);
      onComplete?.();
    }, DURATION_MS + 500);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timer);
    };
  }, [active]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 9000 }}
    >
      {/* Semi-transparent overlay ring */}
      <div
        className="animate-celebration-bounce text-center"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.65) 0%, transparent 70%)',
          padding: '60px 80px',
          borderRadius: '50%',
        }}
      >
        <div style={{ fontSize: 'clamp(60px, 10vw, 120px)', lineHeight: 1.1 }}>🎉</div>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(40px, 7vw, 100px)',
            fontWeight: 900,
            color: '#ffd700',
            textShadow: '0 0 30px rgba(255,215,0,1), 0 0 60px rgba(255,165,0,0.8)',
            marginTop: '0.3em',
          }}
        >
          Richtig!
        </div>
        <div
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: 'clamp(20px, 3vw, 44px)',
            color: 'rgba(255,255,255,0.85)',
            marginTop: '0.5em',
            textShadow: '0 0 15px rgba(255,255,255,0.6)',
          }}
        >
          Glückwunsch! 🎄
        </div>
      </div>
    </div>
  );
}
