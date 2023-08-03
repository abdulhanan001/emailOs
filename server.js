// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 5000; // You can use any port number you prefer

// Middleware
app.use(bodyParser.json());

// PostgreSQL Configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'emailOs',
  password: 'password',
  port: 5432, // Default PostgreSQL port
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
