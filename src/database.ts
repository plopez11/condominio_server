import { Pool } from 'pg';

export const pool = new Pool({
    user: 'zjqqeseaewmnxv',
    host: 'ec2-54-147-36-107.compute-1.amazonaws.com',
    password: '65e987f23e1adb4ec3c60db9701b1bc2d5be5f0f36e5cfc61aab9ef2139363f9',
    database: 'dd9cdn7ngd3tsn',
    port: 5432,
    ssl: { rejectUnauthorized: false }
    
});
// pool.connect();
