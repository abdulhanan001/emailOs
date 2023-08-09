import { createServer } from './app.js';

createServer()
  .catch((error) => {
    console.error('Something went wrong!', error);
  });
