// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { saveScore } = require('./database.js');
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Morav_08#',
    database: 'quiz_game',
    connectionLimit: 10
});

const app = express();
const PORT = 3500;

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));


// Endpoint to handle score saving
app.post('/save-score', (req, res) => {
    const { playerName, score } = req.body;
    saveScore(playerName, score, (err) => {
        if (err) {
            console.error("Failed to save score:", err);
            res.sendStatus(500); // Internal Server Error
        } else {
            res.sendStatus(200); // Success
        }
    });
});


// Endpoint to get all scores
app.get('/scores', (req, res) => {
    const query = 'SELECT player_name, score FROM scores ORDER BY score DESC';

    pool.query(query, (err, results) => {
        if (err) {
            console.error("Failed to fetch scores:", err);
            res.sendStatus(500); // Internal Server Error
        } else {
            res.json(results); // Send scores as JSON
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});