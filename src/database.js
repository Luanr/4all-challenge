import Dotenv from 'dotenv';
import {Pool} from 'pg'

Dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

export const query = (text, params) => pool.query(text, params);