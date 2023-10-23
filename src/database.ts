import {Pool} from "pg";
import dotenv from 'dotenv';

dotenv.config();

const  {
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    ENV
} = process.env

console.log(`my ENV is ${ENV}`)

const client = new Pool({
    host: POSTGRES_HOST,
    database: ENV === 'dev' ? POSTGRES_DB: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});

export default client