// server.js
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import morgan from 'morgan';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}
const createServer = async () => {
  const app = express();
  const port = 5000; // You can use any port number you prefer

  // Middleware
  app.use(bodyParser.json());

  // Log requests with morgan middleware
  app.use(morgan('dev'));

  // Routes
  app.use('/api/users', userRoutes);

  // Start the server
  const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  return server;
};

export { createServer };
