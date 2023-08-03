// userModel.js
const prisma = require('../config/prismaLogging')

const saveUser = async (email, password, gender, age, about, dob, education) => {
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

module.exports = { saveUser };
