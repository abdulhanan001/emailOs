import prisma from '../config/prismaLogging.js';

const validateUserModel = async (userData) => {

    // Check if the email already exists in the database
    const existingUser = await prisma.user.findUnique({ where: { email: userData.email } });
    if (existingUser) {
      throw new Error('Email is already taken.');
    }

    const formattedDOB = new Date(userData.dob);
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    if (formattedDOB > eighteenYearsAgo) {
      throw new Error('Your Date of Birth should be 18 years back.');
    }

};

export default validateUserModel;
