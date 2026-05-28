import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import packageRoutes from './routes/packages.js';
import contentRoutes from './routes/content.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4002;
const API_BASE_PATH = process.env.API_BASE_PATH || '/api';

const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN || 'http://localhost:5174';

const ADDITIONAL_ALLOWED_ORIGINS = (
  process.env.CORS_ALLOWED_ORIGINS || ''
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = [
  FRONTEND_ORIGIN,
  ...ADDITIONAL_ALLOWED_ORIGINS,
  'https://travouge-white.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS blocked'));
      }
    },
    credentials: true,
  })
);

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});