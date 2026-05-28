import express from 'express';
import multer from 'multer';
import { db, bucket } from '../firebaseAdmin.js';
import { verifyAdmin } from '../middleware/auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const COLLECTION = 'packages';

function serializePackage(doc) {
  const data = doc.data();
  const normalized = {
    id: doc.id,
    ...data,
  };

  if (data?.createdAt?.toDate) {
    normalized.createdAt = data.createdAt.toDate().toISOString();
  }
  if (data?.updatedAt?.toDate) {
    normalized.updatedAt = data.updatedAt.toDate().toISOString();
  }

  return normalized;
}

async function uploadImageToFirebase(file) {
  if (!bucket) {
    throw new Error('Firebase storage bucket is not configured.');
  }

  const fileName = `packages/${Date.now()}-${uuidv4()}-${file.originalname}`;
  const fileUpload = bucket.file(fileName);

  await fileUpload.save(file.buffer, {
    metadata: {
      contentType: file.mimetype,
      metadata: {
        firebaseStorageDownloadTokens: uuidv4(),
      },
    },
    public: true,
  });

  await fileUpload.makePublic();
  return fileUpload.publicUrl();
}

router.get('/', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ message: 'Firebase not configured. Please set up Firebase credentials.' });
    }
    const snapshot = await db.collection(COLLECTION).orderBy('createdAt', 'desc').get();
    const packages = snapshot.docs.map((doc) => serializePackage(doc));
    res.json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ message: 'Failed to fetch packages.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ message: 'Firebase not configured. Please set up Firebase credentials.' });
    }
    const doc = await db.collection(COLLECTION).doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Package not found.' });
    }
    res.json(serializePackage(doc));
  } catch (error) {
    console.error('Error fetching package:', error);
    res.status(500).json({ message: 'Failed to fetch package.' });
  }
});

router.post('/', verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!db || !bucket) {
      return res.status(503).json({ message: 'Backend not ready: Firebase is not configured.' });
    }

    const { title, description, location, price } = req.body;
    const imageFile = req.file;

    if (!title || !description || !location || !price || !imageFile) {
      return res.status(400).json({ message: 'All fields and an image are required.' });
    }

    const imageUrl = await uploadImageToFirebase(imageFile);
    const newPackage = {
      title,
      description,
      location,
      price: Number(price),
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const packageRef = await db.collection(COLLECTION).add(newPackage);
    res.status(201).json({ id: packageRef.id, ...newPackage });
  } catch (error) {
    console.error('Error creating package:', error);
    res.status(500).json({ message: error.message || 'Failed to create package.' });
  }
});

router.put('/:id', verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    const { title, description, location, price } = req.body;
    const imageFile = req.file;
    const docRef = db.collection(COLLECTION).doc(req.params.id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: 'Package not found.' });
    }

    const existingPackage = snapshot.data();
    let imageUrl = existingPackage?.imageUrl || '';

    if (imageFile) {
      imageUrl = await uploadImageToFirebase(imageFile);
    }

    const updatedPackage = {
      title: title ?? existingPackage.title,
      description: description ?? existingPackage.description,
      location: location ?? existingPackage.location,
      price: price !== undefined ? Number(price) : existingPackage.price,
      imageUrl,
      updatedAt: new Date(),
    };

    await docRef.set(updatedPackage, { merge: true });
    res.json({ id: req.params.id, ...updatedPackage });
  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).json({ message: 'Failed to update package.' });
  }
});

router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const docRef = db.collection(COLLECTION).doc(req.params.id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: 'Package not found.' });
    }

    await docRef.delete();
    res.json({ message: 'Package deleted successfully.' });
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).json({ message: 'Failed to delete package.' });
  }
});

export default router;
