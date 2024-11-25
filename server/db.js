
import pkg from 'pg';
const { Pool } = pkg;

const db = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432, // Default PostgreSQL port
});

export default db;
