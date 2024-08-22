Quiz Application

*Overview*
This project is a dynamic quiz game application that combines front-end technologies (HTML, CSS, and JavaScript) with back-end technologies (Node.js and MySQL) to provide a fully functional and interactive experience. The application includes a responsive design for various devices and integrates a server to handle score storage and retrieval.

*Features*
Responsive Design: Ensures optimal display on all devices.
Dynamic Quiz: Interactive quiz interface with real-time feedback.
Score Management: Scores are stored and retrieved using a MySQL database.
Server Integration: Node.js server handles database interactions and API requests.
Technologies Used
Front-End: HTML, CSS, JavaScript
Back-End: Node.js
Database: MySQL


*Setup and Installation*
1. Clone the Repository
          git clone <repository-url>
          cd <project-directory>

2. Install Dependencies
Navigate to the server directory and install Node.js dependencies:
          cd server
          npm install
   
3. Set Up the Database
Create a new MySQL database and user. Update the database configuration in server/config.js with your database credentials.
Import the provided SQL schema into your MySQL database:

        -- Example schema for creating the table
        CREATE TABLE scores (
            id INT AUTO_INCREMENT PRIMARY KEY,
            player_name VARCHAR(255) NOT NULL,
            score INT NOT NULL
        );
4. Start the Server
In the server directory, start the Node.js server:
          npm start

The server will be running on http://localhost:3000 (or the port specified in your configuration).

6. Run the Front-End
Open the index.html file in your browser to view the quiz game.
