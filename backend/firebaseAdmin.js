import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const {
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_SERVICE_ACCOUNT_PATH,
} = process.env;

let db, bucket;

const cleanPrivateKey = (rawKey) => {
  if (!rawKey) return rawKey;
  const stripped = rawKey.trim().replace(/^"|"$/g, '');
  return stripped.replace(/\\n/g, '\n');
};

const loadServiceAccount = () => {
  if (!FIREBASE_SERVICE_ACCOUNT_PATH) return null;
  const absolutePath = path.isAbsolute(FIREBASE_SERVICE_ACCOUNT_PATH)
    ? FIREBASE_SERVICE_ACCOUNT_PATH
    : path.join(__dirname, FIREBASE_SERVICE_ACCOUNT_PATH);

  const raw = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(raw);
};

try {
  let credentialConfig;
  const serviceAccount = loadServiceAccount();

  if (serviceAccount) {
    credentialConfig = serviceAccount;
  } else {
    const privateKey = cleanPrivateKey(FIREBASE_PRIVATE_KEY);
    if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !privateKey || !FIREBASE_STORAGE_BUCKET) {
      console.warn('⚠️  Firebase credentials not fully configured. Features requiring Firebase will not work.');
      console.warn('Update .env with valid Firebase credentials or set FIREBASE_SERVICE_ACCOUNT_PATH.');
    } else {
      credentialConfig = {
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey,
      };
    }
  }

  if (credentialConfig && FIREBASE_STORAGE_BUCKET) {
    admin.initializeApp({
      credential: admin.credential.cert(credentialConfig),
      storageBucket: FIREBASE_STORAGE_BUCKET,
    });
    db = admin.firestore();
    bucket = admin.storage().bucket();
    console.log('Firebase initialized successfully.');
  }
} catch (error) {
  console.warn('⚠️  Firebase initialization failed:', error.message);
  console.warn('Continuing without Firebase. Update .env with valid credentials or FIREBASE_SERVICE_ACCOUNT_PATH.');
}

export { db, bucket };
