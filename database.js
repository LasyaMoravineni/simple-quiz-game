const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Morav_08#',
    database: 'quiz_game',
    connectionLimit: 10
});

// Function to save the player's score
function saveScore(playerName, score) {
    const query = "INSERT INTO scores (player_name, score) VALUES (?, ?)";
    
    pool.query(query, [playerName, score], (err, results) => {
        if (err) {
            console.error("Failed to insert score:", err);
            return;
        }
        console.log("Score saved successfully:", results);
    });
}

// Export the saveScore function for use in other files
module.exports = { saveScore };