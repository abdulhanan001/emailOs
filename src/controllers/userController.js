const userModel = require('../models/userModel');

const saveUser = async (req, res) => {
  try {
    const { email, password, gender, age, about, dob, education } = req.body;

    // Perform validation here if needed (e.g., check if email is valid, password meets requirements, etc.)

    // Save user data using the UserModel
    const newUser = await userModel.saveUser(email, password, gender, age, about, dob, education);

    res.json(newUser);
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ error: 'An error occurred while saving user data.' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Get all users using userModel.getAllUsers
    const allUsers = await userModel.getAllUsers();
    res.json(allUsers);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'An error occurred while retrieving users.' });
  }
};

module.exports = { saveUser,  getAllUsers };