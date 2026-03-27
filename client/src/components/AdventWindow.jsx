import { useEffect, useRef } from 'react';

/**
 * The large centered Advent window showing the configured number.
 * Receives the current theme object and the window number.
 */
export default function AdventWindow({ number, theme }) {
  const outerRef = useRef(null);

  // Inject CSS custom properties for glow animations
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    el.style.setProperty('--glow-base', theme.frameGlow.base);
    el.style.setProperty('--glow-intense', theme.frameGlow.intense);
  }, [theme]);

  const cornerStyle = {
    color: theme.accentColor,
    fontSize: '2rem',
    lineHeight: 1,
    filter: `drop-shadow(0 0 6px ${theme.accentColor})`,
  };

  return (
    <div
      style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* ── Outer decorative wrapper ── */}
      <div
        ref={outerRef}
        style={{
          position: 'relative',
          width: 'min(52vw, 680px)',
          height: 'min(62vh, 720px)',
          borderRadius: '6px',
          border: `5px solid ${theme.frameColor}`,
          boxShadow: theme.frameGlow.base,
          animation: 'frameGlow 3s ease-in-out infinite',
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(2px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Corner ornaments */}
        <span style={{ ...cornerStyle, position: 'absolute', top: '14px', left: '18px' }}>
          {theme.cornerSymbol}
        </span>
        <span style={{ ...cornerStyle, position: 'absolute', top: '14px', right: '18px' }}>
          {theme.cornerSymbol}
        </span>
        <span style={{ ...cornerStyle, position: 'absolute', bottom: '14px', left: '18px' }}>
          {theme.cornerSymbol}
        </span>
        <span style={{ ...cornerStyle, position: 'absolute', bottom: '14px', right: '18px' }}>
          {theme.cornerSymbol}
        </span>

        {/* ── Inner frame ── */}
        <div
          style={{
            width: 'calc(100% - 60px)',
            height: 'calc(100% - 60px)',
            border: `2px solid ${theme.frameColor.replace('0.6', '0.3').replace('0.65', '0.3').replace('0.7', '0.3').replace('0.75', '0.3').replace('0.8', '0.35')}`,
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* ── The Number ── */}
          <span
            style={{
              fontFamily: theme.numberFont,
              fontSize: 'clamp(160px, 22vw, 380px)',
              fontWeight: 900,
              lineHeight: 1,
              color: theme.numberColor,
              textShadow: theme.numberShadow.base,
              animation: theme.numberAnim,
              userSelect: 'none',
              display: 'block',
              // CSS custom props used by keyframes
              '--num-shadow-base': theme.numberShadow.base,
              '--num-shadow-intense': theme.numberShadow.intense,
            }}
          >
            {number}
          </span>
        </div>
      </div>
    </div>
  );
}
