// userModel.js
import prisma from '../config/prismaLogging.js';

const save = async (email, password, gender, age, about, dob, education) => {
  try {
    const formattedDOB = new Date(dob).toISOString();

    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        gender,
        age,
        about,
        dob: formattedDOB,
        education,
      },
    });

    return newUser;
  } catch (error) {
    console.error('Error saving user data:', error);
    throw new Error('An error occurred while saving user data.');
  }
};

const allUsers = async () => {
  try {
    // Use Prisma query to retrieve all users
    const allUsers = await prisma.user.findMany();
    return allUsers;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw new Error('An error occurred while retrieving users.');
  }
};


export { save, allUsers };
