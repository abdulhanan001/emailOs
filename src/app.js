// server.js
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.routes.js';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.middlware.js';

if (process.env.NODE_ENV === 'dev') {
  dotenv.config({ path: '.env.development' });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

const whitelist = ['http://localhost:3000', undefined, ''];

const createServer = async () => {
  const app = express();
  const port = 5000; // You can use any port number you prefer
  const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
  
  app.use(cors(corsOptions));

  // Middleware
  app.use(bodyParser.json());

  // Log requests with morgan middleware
  app.use(morgan('dev'));

  // Enable CORS

  // Routes
  app.use('/api/users', userRoutes);

  app.use(errorHandler);

  // Start the server
  const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  return server;
};

export { createServer };
