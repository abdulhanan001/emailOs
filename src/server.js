import { createServer } from './app.js';

createServer()
  .then(() => {
    console.log('Server is running!');
  })
  .catch((error) => {
    console.error('Something went wrong!', error);
  });
