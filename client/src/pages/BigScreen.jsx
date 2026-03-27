import { useState, useEffect, useCallback, useMemo } from 'react';
import { getDayTheme } from '../themes.js';
import AdventWindow from '../components/AdventWindow.jsx';
import Particles from '../components/Particles.jsx';
import Celebration from '../components/Celebration.jsx';
import socket from '../socket.js';

export default function BigScreen() {
  const [windowNumber, setWindowNumber] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [qrData, setQrData] = useState(null);
  const [celebrating, setCelebrating] = useState(false);
  const [loading, setLoading] = useState(true);

  // Compute theme dynamically based on windowNumber
  const theme = useMemo(() => {
    return getDayTheme(windowNumber);
  }, [windowNumber]);

  // Fetch config on mount
  useEffect(() => {
    fetch('/api/config')
      .then((r) => r.json())
      .then((data) => {
        setWindowNumber(data.windowNumber);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Fetch QR code
  useEffect(() => {
    fetch('/api/qrcode')
      .then((r) => r.json())
      .then(setQrData)
      .catch(() => {});
  }, []);

  // Socket listeners
  useEffect(() => {
    socket.on('config-updated', ({ windowNumber: n }) => {
      setWindowNumber(n);
    });
    socket.on('correct-answer', () => {
      setCelebrating(true);
    });
    return () => {
      socket.off('config-updated');
      socket.off('correct-answer');
    };
  }, []);

  const handleSetNumber = useCallback(async () => {
    const num = parseInt(inputValue, 10);
    if (isNaN(num) || num < 1 || num > 99) return;
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ windowNumber: num }),
      });
      const data = await res.json();
      setWindowNumber(data.windowNumber);
    } catch {
      // ignore
    }
  }, [inputValue]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSetNumber();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ background: theme.bg }}>
        <div style={{ color: theme.accentColor, fontSize: '2rem', fontFamily: "'Raleway', sans-serif" }}>
          Laden...
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden flex flex-col"
      style={{ background: theme.bg, zIndex: 0 }}
    >
      {/* Particle layer */}
      <Particles type={theme.particles} />

      {/* Main content */}
      <div
        className="relative flex flex-col items-center justify-center w-full h-full"
        style={{ zIndex: 2 }}
      >
        {windowNumber === null ? (
          /* ── Setup screen ── */
          <div className="flex flex-col items-center gap-8 animate-fade-in">
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(24px, 4vw, 52px)',
                color: theme.accentColor,
                textShadow: `0 0 20px ${theme.accentColor}`,
                textAlign: 'center',
              }}
            >
              Adventsfenster
            </div>

            <div
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontFamily: "'Raleway', sans-serif",
                fontSize: 'clamp(14px, 2vw, 22px)',
                textAlign: 'center',
              }}
            >
              Fensternummer eingeben und bestätigen
            </div>

            <div className="flex items-center gap-4">
              <input
                type="number"
                min={1}
                max={99}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="z.B. 7"
                autoFocus
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: `2px solid ${theme.accentColor}`,
                  borderRadius: '8px',
                  color: '#fff',
                  fontFamily: "'Cinzel', serif",
                  fontSize: 'clamp(28px, 5vw, 64px)',
                  fontWeight: 700,
                  textAlign: 'center',
                  width: 'clamp(120px, 14vw, 180px)',
                  padding: '0.3em 0.4em',
                  outline: 'none',
                  boxShadow: `0 0 20px ${theme.accentColor}40`,
                }}
              />
              <button
                onClick={handleSetNumber}
                style={{
                  background: theme.accentColor,
                  color: '#000',
                  fontFamily: "'Cinzel', serif",
                  fontSize: 'clamp(16px, 2vw, 28px)',
                  fontWeight: 700,
                  padding: '0.45em 1.2em',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: `0 0 20px ${theme.accentColor}60`,
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                OK
              </button>
            </div>

            <div
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontFamily: "'Raleway', sans-serif",
                fontSize: 'clamp(12px, 1.5vw, 18px)',
              }}
            >
              Oder öffne /admin für die vollständige Verwaltung
            </div>
          </div>
        ) : (
          /* ── Main display ── */
          <>
            {/* Decorative top strip */}
            <div
              style={{
                position: 'absolute',
                top: '28px',
                left: 0,
                right: 0,
                textAlign: 'center',
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(12px, 1.8vw, 22px)',
                letterSpacing: '0.25em',
                color: theme.accentColor,
                opacity: 0.65,
                filter: `drop-shadow(0 0 6px ${theme.accentColor})`,
                userSelect: 'none',
              }}
            >
              {theme.decorTop}
            </div>

            {/* The window */}
            <AdventWindow number={windowNumber} theme={theme} />

            {/* Decorative bottom strip */}
            <div
              style={{
                position: 'absolute',
                bottom: '28px',
                left: 0,
                right: '280px',
                textAlign: 'center',
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(12px, 1.8vw, 22px)',
                letterSpacing: '0.25em',
                color: theme.accentColor,
                opacity: 0.65,
                filter: `drop-shadow(0 0 6px ${theme.accentColor})`,
                userSelect: 'none',
              }}
            >
              {theme.decorTop}
            </div>
          </>
        )}
      </div>

      {/* QR code sidebar — elegant glass-morphism box on bottom right */}
      {qrData && windowNumber !== null && (
        <div
          className="absolute"
          style={{
            bottom: '28px',
            right: '28px',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {/* Glass container with premium styling */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(12px)',
              borderRadius: '20px',
              padding: '18px',
              border: `2px solid ${theme.frameColor}`,
              boxShadow: `0 0 30px ${theme.accentColor}30, inset 0 0 20px ${theme.accentColor}10`,
              transition: 'all 0.3s ease',
              transform: 'translateZ(0)',
            }}
          >
            <img
              src={qrData.qr}
              alt="QR Code"
              style={{
                width: '140px',
                height: '140px',
                display: 'block',
                filter: `drop-shadow(0 0 8px ${theme.accentColor}40)`,
              }}
            />
          </div>

          {/* "Scan to play" label */}
          <div
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: 'clamp(12px, 1.3vw, 16px)',
              color: theme.accentColor,
              textAlign: 'center',
              letterSpacing: '0.08em',
              fontWeight: 600,
              textTransform: 'uppercase',
              textShadow: `0 0 8px ${theme.accentColor}40`,
              opacity: 0.85,
            }}
          >
            Scan to play
          </div>
        </div>
      )}

      {/* Celebration overlay */}
      <Celebration
        active={celebrating}
        onComplete={() => setCelebrating(false)}
      />
    </div>
  );
}
