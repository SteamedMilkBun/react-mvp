import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

PORT = process.env.PORT || 8000;

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
})

pool.connect()
    .then((client) => {
        console.log(`Connected to postgres using connection string ${process.env.DATABASE_URL}`);
        client.release();
    })
    .catch((err)=>{
        console.log("Failed to connect to postgres: ", err.message);
    })

    const app = express();
    app.use(express.json());
    app.use(express.static("public"));