import express from 'express';
import { db } from '../firebaseAdmin.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();
const COLLECTION = 'content';

function serializeContent(doc) {
  const data = doc.data();
  const normalized = {
    id: doc.id,
    ...data,
  };

  if (data?.updatedAt?.toDate) {
    normalized.updatedAt = data.updatedAt.toDate().toISOString();
  }

  return normalized;
}

// Get all content
router.get('/', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ message: 'Firebase not configured. Please set up Firebase credentials.' });
    }
    const snapshot = await db.collection(COLLECTION).get();
    const content = {};
    snapshot.docs.forEach((doc) => {
      const data = serializeContent(doc);
      content[data.id] = data;
    });
    res.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ message: 'Failed to fetch content.' });
  }
});

// Get specific content by page
router.get('/:page', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ message: 'Firebase not configured. Please set up Firebase credentials.' });
    }
    const doc = await db.collection(COLLECTION).doc(req.params.page).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Content not found.' });
    }
    res.json(serializeContent(doc));
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ message: 'Failed to fetch content.' });
  }
});

// Create or update content
router.put('/:page', verifyAdmin, async (req, res) => {
  try {
    const { title, content, sections } = req.body;
    const docRef = db.collection(COLLECTION).doc(req.params.page);

    const contentData = {
      title: title || '',
      content: content || '',
      sections: sections || [],
      updatedAt: new Date(),
    };

    await docRef.set(contentData, { merge: true });
    res.json({ id: req.params.page, ...contentData });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ message: 'Failed to update content.' });
  }
});

// Delete content
router.delete('/:page', verifyAdmin, async (req, res) => {
  try {
    const docRef = db.collection(COLLECTION).doc(req.params.page);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ message: 'Content not found.' });
    }

    await docRef.delete();
    res.json({ message: 'Content deleted successfully.' });
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({ message: 'Failed to delete content.' });
  }
});

export default router;