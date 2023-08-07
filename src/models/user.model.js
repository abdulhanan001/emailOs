// userModel.js
import prisma from '../config/prismaLogging.js';
import validateUserModel from '../validators/user.model.validations.js';

const save = async (email, password, gender, age, about, dob, education) => {
  const userData = { email, password, gender, age, about, dob, education };
  await validateUserModel(userData);

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
};

const allUsers = async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
};


export { save, allUsers };
