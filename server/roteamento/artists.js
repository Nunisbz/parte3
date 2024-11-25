
import express from 'express';
const router = express.Router();
import db from '../db.js';

// Get all artists
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM artists');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
