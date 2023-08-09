import dotenv from 'dotenv';

const configureDotenv = (nodeEnv)  => {
  if (nodeEnv === 'dev') {
    dotenv.config({ path: '.env.development' });
  } else if (nodeEnv === 'test') {
    dotenv.config({ path: '.env.test' });
  } else {
    dotenv.config();
  }
}

export { configureDotenv };
