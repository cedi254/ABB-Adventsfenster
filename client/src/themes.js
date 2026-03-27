/**
 * 8 distinct daily themes — cycling by dayOfYear % 8.
 * Each theme defines: background, frame style, number style, particle type, and accent color.
 */

export const themes = [
  // ── 0: Midnight Snow ────────────────────────────────────────────────────
  {
    id: 'midnight-snow',
    name: 'Midnight Snow',
    bg: 'linear-gradient(135deg, #0a0e27 0%, #1a1f5e 45%, #0d1135 100%)',
    frameColor: 'rgba(125,211,252,0.65)',
    frameGlow: {
      base: '0 0 30px rgba(125,211,252,0.35), 0 0 60px rgba(125,211,252,0.2), inset 0 0 20px rgba(125,211,252,0.08)',
      intense: '0 0 50px rgba(125,211,252,0.6), 0 0 100px rgba(125,211,252,0.35), inset 0 0 30px rgba(125,211,252,0.12)',
    },
    numberColor: '#ffffff',
    numberShadow: {
      base: '0 0 25px rgba(255,255,255,0.9), 0 0 50px rgba(125,211,252,0.5)',
      intense: '0 0 40px rgba(255,255,255,1), 0 0 80px rgba(125,211,252,0.8), 0 0 120px rgba(125,211,252,0.3)',
    },
    numberFont: "'Playfair Display', serif",
    numberAnim: 'float 4s ease-in-out infinite, glowPulse 3s ease-in-out infinite',
    accentColor: '#7dd3fc',
    cornerSymbol: '❄',
    particles: 'snow',
    decorTop: '❄  ✦  ★  ✦  ❄  ✦  ★  ✦  ❄',
  },

  // ── 1: Ember Hearth ─────────────────────────────────────────────────────
  {
    id: 'ember-hearth',
    name: 'Ember Hearth',
    bg: 'linear-gradient(135deg, #1a0800 0%, #2d0e00 50%, #160404 100%)',
    frameColor: 'rgba(245,158,11,0.75)',
    frameGlow: {
      base: '0 0 30px rgba(245,158,11,0.4), 0 0 60px rgba(239,68,68,0.15), inset 0 0 20px rgba(245,158,11,0.08)',
      intense: '0 0 55px rgba(245,158,11,0.7), 0 0 90px rgba(239,68,68,0.3), inset 0 0 30px rgba(245,158,11,0.12)',
    },
    numberColor: '#fbbf24',
    numberShadow: {
      base: '0 0 25px rgba(251,191,36,0.8), 0 0 50px rgba(239,68,68,0.4)',
      intense: '0 0 40px rgba(251,191,36,1), 0 0 80px rgba(239,68,68,0.6), 0 0 110px rgba(245,158,11,0.3)',
    },
    numberFont: "'Cinzel', serif",
    numberAnim: 'emberFlicker 4s ease-in-out infinite',
    accentColor: '#f59e0b',
    cornerSymbol: '◆',
    particles: 'embers',
    decorTop: '◆  ✦  ◈  ✦  ◆  ✦  ◈  ✦  ◆',
  },

  // ── 2: Northern Lights ──────────────────────────────────────────────────
  {
    id: 'northern-lights',
    name: 'Northern Lights',
    bg: 'linear-gradient(135deg, #000000 0%, #0d3d38 50%, #1a0030 100%)',
    frameColor: 'rgba(45,212,191,0.65)',
    frameGlow: {
      base: '0 0 30px rgba(45,212,191,0.4), 0 0 60px rgba(168,85,247,0.15), inset 0 0 20px rgba(45,212,191,0.08)',
      intense: '0 0 55px rgba(45,212,191,0.7), 0 0 90px rgba(168,85,247,0.35), inset 0 0 30px rgba(45,212,191,0.12)',
    },
    numberColor: '#5eead4',
    numberShadow: {
      base: '0 0 25px rgba(94,234,212,0.9), 0 0 50px rgba(168,85,247,0.45)',
      intense: '0 0 40px rgba(94,234,212,1), 0 0 80px rgba(168,85,247,0.7), 0 0 120px rgba(45,212,191,0.3)',
    },
    numberFont: "'Exo 2', sans-serif",
    numberAnim: 'electricPulse 2.5s ease-in-out infinite',
    accentColor: '#2dd4bf',
    cornerSymbol: '✸',
    particles: 'aurora',
    decorTop: '✸  ∿  ≋  ∿  ✸  ∿  ≋  ∿  ✸',
  },

  // ── 3: Golden Christmas ─────────────────────────────────────────────────
  {
    id: 'golden-christmas',
    name: 'Golden Christmas',
    bg: 'linear-gradient(135deg, #1a0a00 0%, #3d1700 50%, #1a0a00 100%)',
    frameColor: 'rgba(234,179,8,0.8)',
    frameGlow: {
      base: '0 0 35px rgba(234,179,8,0.45), 0 0 70px rgba(234,179,8,0.2), inset 0 0 25px rgba(234,179,8,0.08)',
      intense: '0 0 60px rgba(234,179,8,0.75), 0 0 110px rgba(234,179,8,0.35), inset 0 0 35px rgba(234,179,8,0.14)',
    },
    numberColor: '#fde047',
    numberShadow: {
      base: '0 0 25px rgba(253,224,71,0.9), 0 0 50px rgba(234,179,8,0.6)',
      intense: '0 0 45px rgba(253,224,71,1), 0 0 90px rgba(234,179,8,0.8), 0 0 130px rgba(234,179,8,0.3)',
    },
    numberFont: "'Cinzel Decorative', cursive",
    numberAnim: 'float 5s ease-in-out infinite, glowPulse 3.5s ease-in-out infinite',
    accentColor: '#eab308',
    cornerSymbol: '★',
    particles: 'stars',
    decorTop: '★  ✦  ✶  ✦  ★  ✦  ✶  ✦  ★',
  },

  // ── 4: Winter Crystal ───────────────────────────────────────────────────
  {
    id: 'winter-crystal',
    name: 'Winter Crystal',
    bg: 'linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #0a1628 100%)',
    frameColor: 'rgba(186,230,253,0.7)',
    frameGlow: {
      base: '0 0 30px rgba(186,230,253,0.35), 0 0 60px rgba(147,197,253,0.2), inset 0 0 20px rgba(186,230,253,0.08)',
      intense: '0 0 55px rgba(186,230,253,0.65), 0 0 100px rgba(147,197,253,0.35), inset 0 0 30px rgba(186,230,253,0.12)',
    },
    numberColor: '#e0f2fe',
    numberShadow: {
      base: '0 0 25px rgba(224,242,254,0.9), 0 0 50px rgba(147,197,253,0.5)',
      intense: '0 0 45px rgba(224,242,254,1), 0 0 90px rgba(147,197,253,0.75), 0 0 130px rgba(186,230,253,0.3)',
    },
    numberFont: "'Raleway', sans-serif",
    numberAnim: 'float 4.5s ease-in-out infinite, glowPulse 3s ease-in-out infinite',
    accentColor: '#bae6fd',
    cornerSymbol: '✦',
    particles: 'crystals',
    decorTop: '✦  ◈  ❋  ◈  ✦  ◈  ❋  ◈  ✦',
  },

  // ── 5: Enchanted Forest ─────────────────────────────────────────────────
  {
    id: 'enchanted-forest',
    name: 'Enchanted Forest',
    bg: 'linear-gradient(135deg, #021a0e 0%, #052e16 50%, #021208 100%)',
    frameColor: 'rgba(74,222,128,0.6)',
    frameGlow: {
      base: '0 0 30px rgba(74,222,128,0.3), 0 0 60px rgba(34,197,94,0.15), inset 0 0 20px rgba(74,222,128,0.08)',
      intense: '0 0 55px rgba(74,222,128,0.55), 0 0 90px rgba(34,197,94,0.3), inset 0 0 30px rgba(74,222,128,0.12)',
    },
    numberColor: '#86efac',
    numberShadow: {
      base: '0 0 25px rgba(134,239,172,0.8), 0 0 50px rgba(74,222,128,0.45)',
      intense: '0 0 45px rgba(134,239,172,1), 0 0 90px rgba(74,222,128,0.7), 0 0 130px rgba(34,197,94,0.3)',
    },
    numberFont: "'Playfair Display', serif",
    numberAnim: 'float 5s ease-in-out infinite, glowPulse 4s ease-in-out infinite',
    accentColor: '#4ade80',
    cornerSymbol: '✿',
    particles: 'fireflies',
    decorTop: '✿  ❧  ✾  ❧  ✿  ❧  ✾  ❧  ✿',
  },

  // ── 6: Velvet Twilight ──────────────────────────────────────────────────
  {
    id: 'velvet-twilight',
    name: 'Velvet Twilight',
    bg: 'linear-gradient(135deg, #0f0520 0%, #1e0a40 50%, #0a0518 100%)',
    frameColor: 'rgba(196,181,253,0.65)',
    frameGlow: {
      base: '0 0 30px rgba(196,181,253,0.35), 0 0 60px rgba(139,92,246,0.2), inset 0 0 20px rgba(196,181,253,0.08)',
      intense: '0 0 55px rgba(196,181,253,0.65), 0 0 100px rgba(139,92,246,0.35), inset 0 0 30px rgba(196,181,253,0.12)',
    },
    numberColor: '#c4b5fd',
    numberShadow: {
      base: '0 0 25px rgba(196,181,253,0.9), 0 0 50px rgba(139,92,246,0.5)',
      intense: '0 0 45px rgba(196,181,253,1), 0 0 90px rgba(139,92,246,0.75), 0 0 130px rgba(196,181,253,0.3)',
    },
    numberFont: "'Cormorant Garamond', serif",
    numberAnim: 'float 4s ease-in-out infinite, glowPulse 3.5s ease-in-out infinite',
    accentColor: '#a78bfa',
    cornerSymbol: '✶',
    particles: 'stardust',
    decorTop: '✶  ·  ✦  ·  ✶  ·  ✦  ·  ✶',
  },

  // ── 7: Candy Cane ───────────────────────────────────────────────────────
  {
    id: 'candy-cane',
    name: 'Candy Cane',
    bg: 'linear-gradient(135deg, #1a0000 0%, #2d0505 50%, #1a0005 100%)',
    frameColor: 'rgba(252,165,165,0.7)',
    frameGlow: {
      base: '0 0 30px rgba(239,68,68,0.4), 0 0 60px rgba(252,165,165,0.2), inset 0 0 20px rgba(239,68,68,0.08)',
      intense: '0 0 55px rgba(239,68,68,0.7), 0 0 100px rgba(252,165,165,0.35), inset 0 0 30px rgba(239,68,68,0.12)',
    },
    numberColor: '#fca5a5',
    numberShadow: {
      base: '0 0 25px rgba(252,165,165,0.9), 0 0 50px rgba(239,68,68,0.5)',
      intense: '0 0 45px rgba(252,165,165,1), 0 0 90px rgba(239,68,68,0.75), 0 0 130px rgba(248,113,113,0.3)',
    },
    numberFont: "'Fredoka One', cursive",
    numberAnim: 'float 3s ease-in-out infinite, glowPulse 2.5s ease-in-out infinite',
    accentColor: '#ef4444',
    cornerSymbol: '❤',
    particles: 'snow',
    decorTop: '❤  ✦  ●  ✦  ❤  ✦  ●  ✦  ❤',
  },
];

/**
 * Returns the theme for today based on dayOfYear % themes.length
 */
export function getDayTheme() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return themes[dayOfYear % themes.length];
}
