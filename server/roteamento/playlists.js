
import express from 'express';
const router = express.Router();
import db from '../db.js';

// Get all playlists
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM playlists');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific playlist and its songs
router.get('/:id', async (req, res) => {
    const playlistId = parseInt(req.params.id, 10);
    try {
        const playlistResult = await db.query('SELECT * FROM playlists WHERE id = $1', [playlistId]);
        const songsResult = await db.query(`
            SELECT songs.* FROM songs
            JOIN playlist_songs ON songs.id = playlist_songs.song_id
            WHERE playlist_songs.playlist_id = $1
        `, [playlistId]);

        if (playlistResult.rows.length === 0) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        res.status(200).json({
            playlist: playlistResult.rows[0],
            songs: songsResult.rows,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add or remove songs from a playlist
router.put('/:id', async (req, res) => {
    const playlistId = parseInt(req.params.id, 10);
    const { songId } = req.body;
    const { action } = req.query; // action: 'add' or 'remove'

    try {
        if (action === 'add') {
            await db.query(
                'INSERT INTO playlist_songs (playlist_id, song_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
                [playlistId, songId]
            );
        } else if (action === 'remove') {
            await db.query(
                'DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2',
                [playlistId, songId]
            );
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a playlist
router.delete('/:id', async (req, res) => {
    const playlistId = parseInt(req.params.id, 10);
    try {
        await db.query('DELETE FROM playlists WHERE id = $1', [playlistId]);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;