import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import packageRoutes from './routes/packages.js';
import contentRoutes from './routes/content.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const API_BASE_PATH = process.env.API_BASE_PATH || '/api';
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
const ADDITIONAL_ALLOWED_ORIGINS = (process.env.CORS_ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = [FRONTEND_ORIGIN, ...ADDITIONAL_ALLOWED_ORIGINS];

app.use(cors({
  origin(origin, callback) {
    // Allow non-browser clients (curl/postman) and whitelisted browser origins.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${API_BASE_PATH}/auth`, authRoutes);
app.use(`${API_BASE_PATH}/packages`, packageRoutes);
app.use(`${API_BASE_PATH}/content`, contentRoutes);
app.get('/', (req, res) => {
  res.send({ status: 'Travouge backend is running.' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found.' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error. Please try again later.' });
});

const server = app.listen(PORT, () => {
  console.log(`Travouge backend listening on http://localhost:${PORT}`);
});

server.on('error', (error) => {
  if (error.syscall === 'listen' && error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please stop the existing process or change the PORT in .env.`);
    process.exit(1);
  }
  console.error('Server error:', error);
  process.exit(1);
});
