// server.js

const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const morgan = require('morgan');


const app = express();
const port = 5000; // You can use any port number you prefer
// Middleware
app.use(bodyParser.json());

// Log requests with morgan middleware
app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);





// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  
});


