import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import QRCode from 'qrcode';
import { networkInterfaces } from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, 'data');

if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });

const CONFIG_FILE = join(DATA_DIR, 'config.json');
const QUESTIONS_FILE = join(DATA_DIR, 'questions.json');

if (!existsSync(CONFIG_FILE)) {
  writeFileSync(CONFIG_FILE, JSON.stringify({ windowNumber: null }, null, 2));
}
if (!existsSync(QUESTIONS_FILE)) {
  writeFileSync(QUESTIONS_FILE, JSON.stringify([], null, 2));
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

app.use(cors());
app.use(express.json());

// ── Helpers ─────────────────────────────────────────────────────────────────

function getLocalIP() {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return 'localhost';
}

function readConfig() {
  return JSON.parse(readFileSync(CONFIG_FILE, 'utf-8'));
}

function writeConfig(data) {
  writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2));
}

function readQuestions() {
  return JSON.parse(readFileSync(QUESTIONS_FILE, 'utf-8'));
}

function writeQuestions(data) {
  writeFileSync(QUESTIONS_FILE, JSON.stringify(data, null, 2));
}

function getTodayQuestion() {
  const questions = readQuestions();
  if (!questions.length) return null;
  const config = readConfig();
  const windowNumber = config.windowNumber || 1;
  const dayIndex = (windowNumber - 1) % questions.length;
  return questions[dayIndex];
}

function normalizeAnswer(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/^(der|die|das|ein|eine|einem|einer|eines)\s+/i, '')
    .replace(/[.,!?]/g, '');
}

function checkAnswer(userAnswer, todayQ) {
  const answers = Array.isArray(todayQ.answer) ? todayQ.answer : [todayQ.answer];
  const normalized = normalizeAnswer(userAnswer);
  return answers.some((a) => normalizeAnswer(a) === normalized);
}

// ── Routes ───────────────────────────────────────────────────────────────────

app.get('/api/config', (_req, res) => {
  res.json(readConfig());
});

app.post('/api/config', (req, res) => {
  const { windowNumber } = req.body;
  const num = parseInt(windowNumber, 10);
  if (isNaN(num) || num < 1 || num > 99) {
    return res.status(400).json({ error: 'Ungültige Fensternummer (1–99)' });
  }
  const config = { windowNumber: num };
  writeConfig(config);
  io.emit('config-updated', config);
  res.json(config);
});

app.get('/api/today', (_req, res) => {
  const q = getTodayQuestion();
  if (!q) return res.status(404).json({ error: 'Keine Frage für heute' });
  const config = readConfig();
  res.json({ question: q.question, day: config.windowNumber });
});

app.get('/api/questions', (_req, res) => {
  res.json(readQuestions());
});

app.post('/api/questions', (req, res) => {
  const { questions } = req.body;
  if (!Array.isArray(questions)) {
    return res.status(400).json({ error: 'questions muss ein Array sein' });
  }
  writeQuestions(questions);
  res.json({ success: true });
});

app.post('/api/answer', (req, res) => {
  const { answer } = req.body;
  if (!answer || typeof answer !== 'string') {
    return res.status(400).json({ error: 'Keine Antwort übermittelt' });
  }

  const todayQ = getTodayQuestion();
  if (!todayQ) return res.status(404).json({ error: 'Keine Frage für heute' });

  const correct = checkAnswer(answer, todayQ);

  if (correct) {
    io.emit('correct-answer', { message: 'Richtig!' });
  }

  res.json({
    correct,
    message: correct
      ? '🎉 Richtig! Glückwunsch!'
      : '❌ Leider falsch – versuch es nochmal!',
  });
});

app.get('/api/qrcode', async (_req, res) => {
  const clientPort = process.env.CLIENT_PORT || 5173;
  const ip = getLocalIP();
  const url = `http://${ip}:${clientPort}/mobile`;
  try {
    const qr = await QRCode.toDataURL(url, {
      width: 220,
      margin: 1,
      color: { dark: '#ffffff', light: '#00000000' },
    });
    res.json({ qr, url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/status', (_req, res) => {
  res.json({ ok: true, ip: getLocalIP() });
});

// ── Socket.io ─────────────────────────────────────────────────────────────────

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

// ── Start ─────────────────────────────────────────────────────────────────────

const PORT = process.env.SERVER_PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`\n🎄 Advent Window Server`);
  console.log(`   Server:  http://localhost:${PORT}`);
  console.log(`   Network: http://${getLocalIP()}:${PORT}`);
  console.log(`   Admin:   http://${getLocalIP()}:5173/admin`);
  console.log(`   Mobile:  http://${getLocalIP()}:5173/mobile\n`);
});
