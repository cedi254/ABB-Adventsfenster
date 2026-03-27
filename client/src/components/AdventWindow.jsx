import { useEffect, useRef } from 'react';

/**
 * The large centered Advent window showing the configured number.
 * Premium design with glassmorphism, elegant shadows, and smooth animations.
 */
export default function AdventWindow({ number, theme }) {
  const outerRef = useRef(null);
  const numberRef = useRef(null);

  // Inject CSS custom properties for glow animations
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    el.style.setProperty('--glow-base', theme.frameGlow.base);
    el.style.setProperty('--glow-intense', theme.frameGlow.intense);
  }, [theme]);

  // Animate number on mount/change with staggered appearance
  useEffect(() => {
    const numEl = numberRef.current;
    if (!numEl) return;
    numEl.style.animation = 'none';
    // Force reflow
    void numEl.offsetHeight;
    numEl.style.animation = 'numberReveal 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
  }, [number]);

  const cornerStyle = {
    color: theme.accentColor,
    fontSize: '2.5rem',
    lineHeight: 1,
    filter: `drop-shadow(0 0 8px ${theme.accentColor}60), drop-shadow(0 0 16px ${theme.accentColor}30)`,
    textShadow: `0 0 12px ${theme.accentColor}`,
    opacity: 0.9,
  };

  // Inner accent frame color (lighter/semi-transparent)
  const innerFrameColor = theme.frameColor.replace(/[\d.]+\)/, '0.2)');

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Outer glow layer (decorative background) */}
      <div
        style={{
          position: 'absolute',
          width: 'min(56vw, 720px)',
          height: 'min(66vh, 760px)',
          borderRadius: '12px',
          background: `radial-gradient(circle at 30% 30%, ${theme.accentColor}15, transparent 60%)`,
          filter: 'blur(40px)',
          opacity: 0.6,
          zIndex: -1,
        }}
      />

      {/* ── Outer decorative wrapper (premium frame) ── */}
      <div
        ref={outerRef}
        style={{
          position: 'relative',
          width: 'min(52vw, 680px)',
          height: 'min(62vh, 720px)',
          borderRadius: '12px',
          
          /* Premium double-border effect */
          border: `6px solid ${theme.frameColor}`,
          outline: `2px solid ${theme.frameColor.replace(/[\d.]+\)/, '0.3)')}`,
          outlineOffset: '-2px',
          
          /* Glassmorphism */
          background: `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))`,
          backdropFilter: 'blur(16px)',
          
          /* Multiple shadow layers for depth */
          boxShadow: `
            ${theme.frameGlow.base},
            0 20px 60px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.2),
            inset 0 -1px 0 rgba(0,0,0,0.3)
          `,
          
          animation: 'frameGlow 4s ease-in-out infinite, subtle-lift 6s ease-in-out infinite',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Corner ornaments - decorative symbols */}
        <span
          style={{
            ...cornerStyle,
            position: 'absolute',
            top: '16px',
            left: '20px',
            animation: 'cornerPulse 4s ease-in-out infinite',
          }}
        >
          {theme.cornerSymbol}
        </span>
        <span
          style={{
            ...cornerStyle,
            position: 'absolute',
            top: '16px',
            right: '20px',
            animation: 'cornerPulse 4s ease-in-out infinite 0.5s',
          }}
        >
          {theme.cornerSymbol}
        </span>
        <span
          style={{
            ...cornerStyle,
            position: 'absolute',
            bottom: '16px',
            left: '20px',
            animation: 'cornerPulse 4s ease-in-out infinite 1s',
          }}
        >
          {theme.cornerSymbol}
        </span>
        <span
          style={{
            ...cornerStyle,
            position: 'absolute',
            bottom: '16px',
            right: '20px',
            animation: 'cornerPulse 4s ease-in-out infinite 1.5s',
          }}
        >
          {theme.cornerSymbol}
        </span>

        {/* ── Inner premium frame ── */}
        <div
          style={{
            position: 'absolute',
            width: 'calc(100% - 48px)',
            height: 'calc(100% - 48px)',
            border: `2px double ${theme.frameColor}`,
            borderRadius: '4px',
            background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.05), transparent 70%)`,
            opacity: 0.6,
            pointerEvents: 'none',
          }}
        />

        {/* ── The Number (centered, premium styling) ── */}
        <span
          ref={numberRef}
          style={{
            fontFamily: theme.numberFont,
            fontSize: 'clamp(160px, 22vw, 380px)',
            fontWeight: 900,
            lineHeight: 1,
            color: theme.numberColor,
            
            /* Premium text shadows with layered effect */
            textShadow: `
              ${theme.numberShadow.base},
              0 0 8px ${theme.accentColor}20
            `,
            
            /* Animation */
            animation: theme.numberAnim,
            userSelect: 'none',
            display: 'block',
            position: 'relative',
            zIndex: 10,
            opacity: 1,
            filter: `drop-shadow(0 0 4px ${theme.accentColor}30)`,
            
            /* CSS custom props for keyframes */
            '--num-shadow-base': theme.numberShadow.base,
            '--num-shadow-intense': theme.numberShadow.intense,
          }}
        >
          {number}
        </span>
      </div>

      {/* Add keyframes via style tag */}
      <style>{`
        @keyframes frameGlow {
          0%, 100% {
            box-shadow: 
              var(--glow-base),
              0 20px 60px rgba(0,0,0,0.3),
              inset 0 1px 0 rgba(255,255,255,0.2),
              inset 0 -1px 0 rgba(0,0,0,0.3);
          }
          50% {
            box-shadow: 
              var(--glow-intense),
              0 30px 80px rgba(0,0,0,0.4),
              inset 0 1px 0 rgba(255,255,255,0.25),
              inset 0 -1px 0 rgba(0,0,0,0.4);
          }
        }

        @keyframes subtle-lift {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes cornerPulse {
          0%, 100% {
            opacity: 0.7;
            filter: drop-shadow(0 0 8px var(--theme-accent)) drop-shadow(0 0 16px var(--theme-accent, #7dd3fc)30);
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 12px var(--theme-accent)) drop-shadow(0 0 24px var(--theme-accent, #7dd3fc)50);
          }
        }

        @keyframes numberReveal {
          0% {
            opacity: 0;
            transform: scale(0.7) translateY(20px);
            filter: blur(4px);
          }
          60% {
            opacity: 1;
            transform: scale(1.05) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            text-shadow: var(--num-shadow-base);
          }
          50% {
            text-shadow: var(--num-shadow-intense);
          }
        }

        @keyframes emberFlicker {
          0%, 100% {
            text-shadow: var(--num-shadow-base);
            opacity: 1;
          }
          25% {
            text-shadow: var(--num-shadow-intense);
            opacity: 0.95;
          }
          50% {
            text-shadow: var(--num-shadow-base);
            opacity: 1;
          }
          75% {
            text-shadow: var(--num-shadow-intense);
            opacity: 0.92;
          }
        }

        @keyframes electricPulse {
          0%, 100% {
            text-shadow: var(--num-shadow-base);
          }
          50% {
            text-shadow: var(--num-shadow-intense);
            transform: scale(1.02);
          }
        }
      `}</style>
    </div>
  );
}
