import { useState, useEffect } from 'react';
import { getDayTheme } from '../themes.js';

export default function AdminPanel() {
  const theme = getDayTheme();
  const [windowNumber, setWindowNumber] = useState('');
  const [savedNumber, setSavedNumber] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [qrData, setQrData] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');
  const [qSaveStatus, setQSaveStatus] = useState('');

  useEffect(() => {
    fetch('/api/config')
      .then((r) => r.json())
      .then((d) => {
        setSavedNumber(d.windowNumber);
        setWindowNumber(d.windowNumber ?? '');
      });

    fetch('/api/questions')
      .then((r) => r.json())
      .then(setQuestions);

    fetch('/api/qrcode')
      .then((r) => r.json())
      .then(setQrData);
  }, []);

  const handleSaveNumber = async () => {
    const num = parseInt(windowNumber, 10);
    if (isNaN(num) || num < 1 || num > 99) {
      setSaveStatus('Ungültige Nummer (1–99)');
      setTimeout(() => setSaveStatus(''), 2500);
      return;
    }
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ windowNumber: num }),
      });
      const data = await res.json();
      setSavedNumber(data.windowNumber);
      setSaveStatus('✓ Gespeichert!');
      setTimeout(() => setSaveStatus(''), 2500);
    } catch {
      setSaveStatus('Fehler beim Speichern');
    }
  };

  const handleSaveQuestions = async () => {
    try {
      await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions }),
      });
      setQSaveStatus('✓ Fragen gespeichert!');
      setTimeout(() => setQSaveStatus(''), 2500);
    } catch {
      setQSaveStatus('Fehler beim Speichern');
    }
  };

  const updateQuestion = (index, field, value) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addQuestion = () => {
    setQuestions((prev) => [...prev, { question: '', answer: '' }]);
  };

  const removeQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const accent = theme.accentColor;
  const border = `1px solid ${accent}30`;

  return (
    <div
      className="scrollable"
      style={{
        background: 'linear-gradient(160deg, #0a0e1a 0%, #0d1228 100%)',
        minHeight: '100vh',
        fontFamily: "'Raleway', sans-serif",
        color: '#e2e8f0',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>

        {/* ── Header ── */}
        <div
          className="flex items-center gap-3 mb-8"
          style={{
            borderBottom: `2px solid ${accent}40`,
            paddingBottom: '16px',
          }}
        >
          <span style={{ fontSize: '2rem' }}>🎄</span>
          <div>
            <h1
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '1.8rem',
                color: accent,
                textShadow: `0 0 12px ${accent}80`,
              }}
            >
              Adventsfenster — Admin
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
              Aktuelles Tages-Theme: {theme.name}
            </p>
          </div>
        </div>

        {/* ── Window Number ── */}
        <section
          style={{
            background: 'rgba(255,255,255,0.04)',
            border,
            borderRadius: '10px',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <h2
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '1.1rem',
              color: accent,
              marginBottom: '16px',
            }}
          >
            Fensternummer
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginRight: '4px' }}>
              Aktuell: <strong style={{ color: '#fff' }}>{savedNumber ?? '—'}</strong>
            </div>

            <input
              type="number"
              min={1}
              max={99}
              value={windowNumber}
              onChange={(e) => setWindowNumber(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveNumber()}
              placeholder="1–99"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: `2px solid ${accent}60`,
                borderRadius: '8px',
                color: '#fff',
                fontFamily: "'Cinzel', serif",
                fontSize: '1.6rem',
                fontWeight: 700,
                textAlign: 'center',
                width: '100px',
                padding: '0.3em 0.4em',
                outline: 'none',
              }}
            />

            <button
              onClick={handleSaveNumber}
              style={{
                background: accent,
                color: '#000',
                fontFamily: "'Cinzel', serif",
                fontWeight: 700,
                fontSize: '1rem',
                padding: '0.55em 1.4em',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Speichern
            </button>

            {saveStatus && (
              <span
                style={{
                  color: saveStatus.startsWith('✓') ? '#4ade80' : '#f87171',
                  fontSize: '0.9rem',
                }}
              >
                {saveStatus}
              </span>
            )}
          </div>
        </section>

        {/* ── QR Code Info ── */}
        {qrData && (
          <section
            style={{
              background: 'rgba(255,255,255,0.04)',
              border,
              borderRadius: '10px',
              padding: '24px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            <img
              src={qrData.qr}
              alt="QR Code"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '6px',
                background: '#fff',
                padding: '6px',
              }}
            />
            <div>
              <h2
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '1.1rem',
                  color: accent,
                  marginBottom: '8px',
                }}
              >
                Mobile-Link
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginBottom: '4px' }}>
                Dieser QR-Code erscheint auf dem Großbildschirm.
              </p>
              <a
                href={qrData.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: accent, fontFamily: 'monospace', fontSize: '0.95rem', wordBreak: 'break-all' }}
              >
                {qrData.url}
              </a>
            </div>
          </section>
        )}

        {/* ── Daily Questions ── */}
        <section
          style={{
            background: 'rgba(255,255,255,0.04)',
            border,
            borderRadius: '10px',
            padding: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.1rem', color: accent }}>
              Tagesfragen ({questions.length})
            </h2>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {qSaveStatus && (
                <span style={{ color: qSaveStatus.startsWith('✓') ? '#4ade80' : '#f87171', fontSize: '0.85rem' }}>
                  {qSaveStatus}
                </span>
              )}
              <button
                onClick={addQuestion}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  border: `1px solid ${accent}50`,
                  borderRadius: '6px',
                  padding: '0.4em 1em',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontFamily: "'Raleway', sans-serif",
                }}
              >
                + Hinzufügen
              </button>
              <button
                onClick={handleSaveQuestions}
                style={{
                  background: accent,
                  color: '#000',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.4em 1.2em',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 700,
                }}
              >
                Speichern
              </button>
            </div>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', marginBottom: '16px' }}>
            Frage {new Date().getDate()} (Tag {new Date().getDate()}) wird heute angezeigt. Mehrere Antworten kommagetrennt möglich.
          </p>

          {questions.length === 0 && (
            <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '24px 0' }}>
              Keine Fragen. Füge welche hinzu!
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {questions.map((q, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '36px 1fr 1fr auto',
                  gap: '10px',
                  alignItems: 'center',
                  background: i === (new Date().getDate() - 1) % Math.max(questions.length, 1)
                    ? `${accent}18`
                    : 'rgba(255,255,255,0.03)',
                  border: i === (new Date().getDate() - 1) % Math.max(questions.length, 1)
                    ? `1px solid ${accent}50`
                    : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: i === (new Date().getDate() - 1) % Math.max(questions.length, 1) ? accent : 'rgba(255,255,255,0.3)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}
                >
                  {i + 1}
                </span>

                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => updateQuestion(i, 'question', e.target.value)}
                  placeholder="Frage..."
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '6px',
                    color: '#fff',
                    padding: '0.4em 0.7em',
                    fontSize: '0.9rem',
                    fontFamily: "'Raleway', sans-serif",
                    outline: 'none',
                    width: '100%',
                  }}
                />

                <input
                  type="text"
                  value={Array.isArray(q.answer) ? q.answer.join(', ') : q.answer}
                  onChange={(e) => {
                    const val = e.target.value;
                    const answers = val.includes(',')
                      ? val.split(',').map((s) => s.trim()).filter(Boolean)
                      : val;
                    updateQuestion(i, 'answer', answers);
                  }}
                  placeholder="Antwort(en), kommagetrennt..."
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '6px',
                    color: '#fff',
                    padding: '0.4em 0.7em',
                    fontSize: '0.9rem',
                    fontFamily: "'Raleway', sans-serif",
                    outline: 'none',
                    width: '100%',
                  }}
                />

                <button
                  onClick={() => removeQuestion(i)}
                  style={{
                    background: 'rgba(239,68,68,0.15)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    color: '#f87171',
                    borderRadius: '6px',
                    padding: '0.3em 0.6em',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                  title="Löschen"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer ── */}
        <div style={{ textAlign: 'center', marginTop: '32px', color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
          Großbildschirm → <a href="/" style={{ color: accent }} target="_blank">/ (Startseite)</a>
          &nbsp;·&nbsp;
          Mobile → <a href="/mobile" style={{ color: accent }} target="_blank">/mobile</a>
        </div>
      </div>
    </div>
  );
}
