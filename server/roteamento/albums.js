
import express from 'express';
const router = express.Router();
import db from '../db.js';

// Get all albums
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM albums');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific album and its songs
router.get('/:id', async (req, res) => {
    try {
        const albumId = parseInt(req.params.id, 10);
        const albumResult = await db.query('SELECT * FROM albums WHERE id = $1', [albumId]);
        const songsResult = await db.query('SELECT * FROM songs WHERE album_id = $1', [albumId]);

        if (albumResult.rows.length === 0) {
            return res.status(404).json({ error: 'Album not found' });
        }

        res.status(200).json({
            album: albumResult.rows[0],
            songs: songsResult.rows
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
