// server.js
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.middlware.js';
import { router } from './routes/index.js';
import { configureDotenv } from './utlis/setEnv.js';

if (process.env.NODE_ENV === 'dev') {
  dotenv.config({ path: '.env.development' });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

// const nodeEnv = process.env.NODE_ENV || 'development';
// configureDotenv(nodeEnv);

const whitelist = ['http://localhost:3000', undefined];

const app = express();

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
app.use('/api', router);

app.use(errorHandler);

const createServer = async () => {
  const port = process.env.PORT || 5000;

  // Start the server
  const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  return server;
};

export { createServer };
