
import db from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

export const register = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ error: 'Email already in use' });
        }

async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}
        await db.query(
            'INSERT INTO users (email, password, name, created_at, is_subscriber) VALUES ($1, $2, $3, NOW(), FALSE)',
            [email, hashedPassword, name]
        );

        res.status(201).json({ message: ' registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isValid = await bcrypt.compare(password, user.rows[0].password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

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
};


 (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isValid = await bcrypt.compare(password, user.rows[0].password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

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
};


export const registro = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ error: 'Email already in use' });
        }

async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}
        await db.query(
            'INSERT INTO users (email, password, name, created_at, is_subscriber) VALUES ($1, $2, $3, NOW(), FALSE)',
            [email, hashedPassword, name]
        );

        res.status(201).json({ message: ' registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
