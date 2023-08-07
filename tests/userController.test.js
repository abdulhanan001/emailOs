// Import the PrismaClient
import request from 'supertest';
import { createServer } from '../src/app.js'
import prisma from '../src/config/prismaLogging.js';

describe('UserController Tests', () => {
  let app;

  beforeAll(async () => {
    app = await createServer();
  });

  afterAll(async () => {
    await app.close();
  })
  
  // Disconnect Prisma Client after all tests are done
  afterAll(async () => {
    console.log(process.env.DATABASE_URL, '=======')
    console.log(process.env.ONE, '-------Node ENV')
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });


  describe('saveUser', () => {
    it('should return the newly created user if the input is valid', async () => {

      const userCountBefore = await prisma.user.count();
      const user = {
        "email": "test@gmail.com",
        "password": "mysecretpassword",
        "gender": "male",
        "age": 19,
        "about": "I'm a software developer passionate about technology.",
        "dob": new Date("1990-08-15").toISOString(),
        "education": "MS"
      }
      
      // Perform the actual database operation using the PrismaClient
    
      const response = await request(app).post('/api/users').send(user);

      const userCountAfter = await prisma.user.count(); // Get user count after saving

      expect(response.status).toBe(200);
      expect(userCountAfter).toBe(userCountBefore + 1);
    });

    it('should return the  error email is not vaild', async () => {
      const user = {
        "email": "testgmail.com"
      }
      
      const response = await request(app).post('/api/users').send(user);

      expect(response.status).toBe(400);
        expect(response.body).toEqual(expect.objectContaining({ message: '"email" must be a valid email' }));
    });

    it('should return an error when password is too short', async () => {
      const user = {
        email: 'test@gmail.com',
        password: '123', // Less than 8 characters
      };
  
      const response = await request(app).post('/api/users').send(user);
  
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({ message: '"password" length must be at least 8 characters long' }));
    })

    it('should return an error when gender is not valid', async () => {
      const user = {
        email: 'test@gmail.com',
        password: '12345678',
        gender: 'unknown', // Invalid gender value
      };
  
      const response = await request(app).post('/api/users').send(user);
  
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({ message: '"gender" must be one of [male, female]' }));
    });

    it('should return an error when age is below 18', async () => {
      const user = {
        email: 'test@gmail.com',
        password: '12345678',
        gender: 'male',
        age: 16, // Age below 18
      };
  
      const response = await request(app).post('/api/users').send(user);
  
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({ message: '"age" must be greater than or equal to 18' }));
    });

    it('should return an error when "about" is missing', async () => {
      const user = {
        email: 'test@gmail.com',
        password: '12345678',
        gender: 'male',
        age: 25,
        // "about" field is missing
        dob: '1998-01-01',
        education: 'bachelors',
      };
  
      const response = await request(app).post('/api/users').send(user);
  
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({ message: '"about" is required' }));
    });

    it('should return an error when "dob" is not in ISO date format', async () => {
      const user = {
        email: 'test@gmail.com',
        password: '12345678',
        gender: 'male',
        age: 25,
        about: 'I am a test user.',
        dob: '1998/01/01', // Invalid date format
      };
  
      const response = await request(app).post('/api/users').send(user);
  
      expect(response.status).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({ message: '"dob" must be in ISO 8601 date format' }));
    });
  
    it('should return an error when "education" is not valid', async () => {
      const user = {
        email: 'test@gmail.com',
        password: '12345678',
        gender: 'male',
        age: 25,
        about: 'I am a test user.',
        dob: '1998-01-01',
        education: 'highschool', // Invalid education level
      };
  
      const response = await request(app).post('/api/users').send(user);
  
      expect(response.status).toBe(400);
      expect(response.body).toEqual(
        expect.objectContaining({ message: '"education" must be one of [becahlurar, MS, PHD]' })
      );
    });
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      
      const response = await request(app).get('/api/users');
  
      expect(response.status).toBe(200);
    });
  });
});
