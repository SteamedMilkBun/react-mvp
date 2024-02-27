import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 8000;

const pool = new pg.Pool({
    connectionString: process.env.LOCAL_DB_URL
})

pool.connect()
    .then((client) => {
        console.log(`Connected to postgres using connection string ${process.env.LOCAL_DB_URL}`);
        client.release();
    })
    .catch((err)=>{
        console.log("Failed to connect to postgres: ", err.message);
    })

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.get('/datacards', (req, res) => {
    pool.query('SELECT * FROM datacards')
    .then((data) => {
        console.log(data.rows);
        res.json(data.rows);
    })
    .catch((err) => {
        console.error(err);
        res.sendStatus(500);
    })
})

app.get('/datacards/:id', (req, res) => {
    const id = Number.parseInt(req.params.id);
    pool.query('SELECT * FROM datacards WHERE dc_id = $1', [id])
    .then((data) => {
        console.log(data.rows[0]);
        res.json(data.rows[0]);
    })
    .catch((err) => {
        console.error(err);
        res.sendStatus(500);
    })
})

app.post('/datacards', (req, res) => {
    const dc_title = req.body.dc_title;
    const dc_desc = req.body.dc_desc;

    pool.query(`INSERT INTO datacards (dc_title, dc_desc) VALUES ($1, $2) RETURNING *`, [dc_title, dc_desc])
    .then((data) => {
        console.log("Added: ", dc_title, "and", dc_desc);
        console.log(data.rows[0]);
        res.json(data.rows[0]);
    })
    .catch((err) => {
        console.error(err);
        res.sendStatus(500);
    })
})

app.patch('/datacards/:id', (req, res) => {
    const id = Number.parseInt(req.params.id);
    const dc_title = req.body.dc_title;
    const dc_desc = req.body.dc_desc;

    console.log(dc_title, dc_desc);

    pool.query(`UPDATE datacards SET 
                dc_title = COALESCE($1, dc_title),
                dc_desc = COALESCE($2, dc_desc) WHERE
                dc_id = $3 RETURNING *`, [dc_title, dc_desc, id])       
    .then((data) => {
        console.log(data.rows[0]);
        res.json(data.rows[0]);
    })
    .catch((err) => {
        console.error(err);
        res.sendStatus(500);
    })
})

app.delete('/datacards/:id', (req, res) => {
    const id = req.params.id;
    
    pool.query(`DELETE FROM datacards WHERE dc_id = $1`, [id])
    .then((data) => {
        res.json(data.rows[0]);
    })
    .catch((err) => {
        console.error(err);
        res.sendStatus(500);
    })
})

app.listen(PORT, () => console.log("Listening to port: ", PORT));