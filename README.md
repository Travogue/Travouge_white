# Travouge

Full-stack travel agency application built with React + Vite frontend and Node.js + Express backend.

## Features
- Admin can upload travel packages with images, price, description, location
- Users can browse travel packages
- Responsive UI with Material UI
- Firebase Firestore and Storage for package data and images
- Admin authentication
- REST API backend

## Setup

### Backend
1. Open `backend` folder
2. Copy `.env.example` to `.env`
3. Fill in Firebase credentials and admin login.
4. Install and run:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

### Frontend
1. Open `frontend` folder
2. Install and run:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Notes
- Backend listens on port `4002`
- Frontend Vite app runs on port `5173`
- Frontend calls backend API at `http://localhost:4001/api`

## Deployment
For a customer-facing URL, deploy the backend and frontend separately.

### Backend (recommended)
- Use a service like Render, Railway, or Heroku.
- In the backend service settings, set environment variables from `backend/.env.example`.
- Use either `FIREBASE_SERVICE_ACCOUNT_PATH` with an uploaded JSON file or set `FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PROJECT_ID`, and `FIREBASE_STORAGE_BUCKET` directly.
- Use `PORT` from the hosting service, or leave it unset if the platform provides it automatically.
- If deploying on Heroku, the included `backend/Procfile` ensures the app starts with `npm start`.

### Frontend
- Use Vercel, Netlify, or any static site host.
- Deploy the `frontend` directory as a separate static site.
- In the frontend environment settings, set `VITE_API_URL` to the deployed backend URL, for example:
  `https://your-backend-service-url/api`
- Vercel users can deploy the `frontend` folder directly; the included `frontend/vercel.json` config helps Vercel build the app correctly.
- Netlify users can deploy the `frontend` folder directly using the included `frontend/netlify.toml`.
- Build the frontend and deploy the `dist` folder.

### Example cloud link setup
- Backend: `https://travouge-backend.onrender.com`
- Frontend: `https://travouge-web.vercel.app`
- Then set `VITE_API_URL=https://travouge-backend.onrender.com/api`
"# Travouge_2026_May" 
"# Travouge_2026_May" 
