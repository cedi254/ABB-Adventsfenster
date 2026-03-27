import { useState, useEffect } from 'react';

export default function MobilePage() {
  const [questionData, setQuestionData] = useState(null);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null); // { correct, message }
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    fetch('/api/today')
      .then((r) => r.json())
      .then((d) => {
        setQuestionData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    if (!answer.trim() || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: answer.trim() }),
      });
      const data = await res.json();
      setResult(data);
      setAttempts((a) => a + 1);
    } catch {
      setResult({ correct: false, message: 'Verbindungsfehler. Bitte nochmal versuchen.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setResult(null);
    setAnswer('');
  };

  return (
    <div
      className="scrollable"
      style={{
        minHeight: '100dvh',
        background: 'linear-gradient(160deg, #0a1a0f 0%, #0d1a2a 40%, #1a0d0d 100%)',
        fontFamily: "'Raleway', sans-serif",
        color: '#e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 0 40px',
      }}
    >
      {/* Header */}
      <div
        style={{
          width: '100%',
          padding: '20px 20px 16px',
          textAlign: 'center',
          background: 'rgba(0,0,0,0.3)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ fontSize: '2rem', marginBottom: '4px' }}>🎄</div>
        <h1
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '1.25rem',
            color: '#fbbf24',
            textShadow: '0 0 12px rgba(251,191,36,0.6)',
            letterSpacing: '0.05em',
          }}
        >
          Adventsfrage
        </h1>
        {questionData && (
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', marginTop: '4px' }}>
            Tag {questionData.day}
          </p>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '28px 20px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {loading && (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '40px 0' }}>
            Laden...
          </div>
        )}

        {!loading && !questionData && (
          <div
            style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.5)',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '32px 20px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>❓</div>
            <p>Für heute gibt es keine Frage.</p>
          </div>
        )}

        {!loading && questionData && !result?.correct && (
          <>
            {/* Question card */}
            <div
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(251,191,36,0.25)',
                borderRadius: '16px',
                padding: '24px 20px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.2rem',
                  lineHeight: 1.55,
                  color: '#fff',
                  textAlign: 'center',
                }}
              >
                {questionData.question}
              </p>
            </div>

            {/* Wrong answer feedback */}
            {result && !result.correct && (
              <div
                style={{
                  background: 'rgba(239,68,68,0.12)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  textAlign: 'center',
                  color: '#fca5a5',
                  fontSize: '1rem',
                  animation: 'slideUp 0.3s ease-out',
                }}
              >
                {result.message}
                {attempts < 4 && (
                  <div style={{ marginTop: '6px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
                    Versuch {attempts} · Denk nochmal nach!
                  </div>
                )}
              </div>
            )}

            {/* Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginLeft: '2px' }}>
                Deine Antwort:
              </label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Antwort eingeben..."
                autoComplete="off"
                autoCorrect="off"
                style={{
                  background: 'rgba(255,255,255,0.09)',
                  border: '2px solid rgba(251,191,36,0.4)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '1.1rem',
                  padding: '0.75em 1em',
                  outline: 'none',
                  fontFamily: "'Raleway', sans-serif",
                  width: '100%',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(251,191,36,0.8)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(251,191,36,0.4)')}
              />

              <button
                onClick={handleSubmit}
                disabled={submitting || !answer.trim()}
                style={{
                  background: submitting || !answer.trim()
                    ? 'rgba(251,191,36,0.3)'
                    : 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.85em 1.5em',
                  fontSize: '1.05rem',
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 700,
                  cursor: submitting || !answer.trim() ? 'not-allowed' : 'pointer',
                  transition: 'transform 0.15s, opacity 0.15s',
                  letterSpacing: '0.04em',
                }}
                onMouseEnter={(e) => { if (!submitting && answer.trim()) e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {submitting ? 'Prüfe...' : 'Antwort absenden'}
              </button>
            </div>
          </>
        )}

        {/* Correct answer screen */}
        {result?.correct && (
          <div
            className="animate-celebration-bounce"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              padding: '40px 20px',
              textAlign: 'center',
              background: 'rgba(74,222,128,0.08)',
              border: '1px solid rgba(74,222,128,0.3)',
              borderRadius: '20px',
              boxShadow: '0 0 30px rgba(74,222,128,0.15)',
            }}
          >
            <div style={{ fontSize: '4rem' }}>🎉</div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem',
                color: '#4ade80',
                textShadow: '0 0 20px rgba(74,222,128,0.8)',
              }}
            >
              Richtig!
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>
              Glückwunsch! Schau auf den Großbildschirm! 🎄
            </p>
            <div style={{ marginTop: '8px', fontSize: '1.8rem' }}>
              ⭐🎁✨🎊🎄
            </div>
            <button
              onClick={handleRetry}
              style={{
                marginTop: '16px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '10px',
                color: 'rgba(255,255,255,0.6)',
                padding: '0.6em 1.4em',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontFamily: "'Raleway', sans-serif",
              }}
            >
              Nochmal spielen
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          color: 'rgba(255,255,255,0.2)',
          fontSize: '0.7rem',
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        Adventsfenster &mdash; Viel Erfolg! 🎄
      </div>
    </div>
  );
}
