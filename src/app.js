// server.js
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';

if (process.env.NODE_ENV === 'dev') {
  console.log('-------D')
  dotenv.config({ path: '.env.development' });
} else if (process.env.NODE_ENV === 'test') {
  console.log('-------T')
  dotenv.config({ path: '.env.test' });
} else {
  console.log('-------P', process.env.NODE_ENV)

  dotenv.config();
}

const createServer = async () => {
  const app = express();
  const port = 5000; // You can use any port number you prefer

  // Middleware
  app.use(bodyParser.json());

  // Log requests with morgan middleware
  app.use(morgan('dev'));

  // Enable CORS
  app.use(cors());

  // Routes
  app.use('/api/users', userRoutes);

  // Start the server
  const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  return server;
};

export { createServer };
