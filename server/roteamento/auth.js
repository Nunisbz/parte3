
import express from 'express';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
import db from '../db.js';

const SECRET_KEY = 'your_secret_key'; // Replace with a secure key

// Register a new user
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;
    try {
        // Check if user already exists
        const existing = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash the password and save the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(
            'INSERT INTO users (email, password, name, created_at, is_subscriber) VALUES ($1, $2, $3, NOW(), FALSE) RETURNING id, email, name',
            [email, hashedPassword, name]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check the password
        const isValid = await bcrypt.compare(password, user.rows[0].password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate a token
        const token = jwt.sign({ userId: user.rows[0].id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({
            token,
            user: {
                id: user.rows[0].id,
                email: user.rows[0].email,
                name: user.rows[0].name,
                is_subscriber: user.rows[0].is_subscriber,
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update subscription status
router.put('/subscription', async (req, res) => {
    const { userId, isSubscriber } = req.body;
    try {
        await db.query('UPDATE users SET is_subscriber = $1 WHERE id = $2', [isSubscriber, userId]);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
