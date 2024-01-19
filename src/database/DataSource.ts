import { Pool } from 'pg';


export const dataPool = new Pool({
    user: 'andre',
    host: 'localhost',
    database: 'facilitajuridico',
    password: 'qwepoi123',
    port: 5432,
});