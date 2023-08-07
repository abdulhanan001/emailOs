import { save, allUsers } from '../models/user.model.js'
import { validateUserInput } from '../schemas/user.schema.js';

const saveUser = async (req, res) => {
  // try
    const { error } = validateUserInput(req.body);
    // throw new Error("Invalid stuff")
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password, gender, age, about, dob, education } = req.body;

    // Perform validation here if needed (e.g., check if email is valid, password meets requirements, etc.)
    const newUser = await save(email, password, gender, age, about, dob, education);
  
    res.json(newUser);
  // } catch (error) {
  //   console.error('Error saving user data:', error);
  //   res.status(500).json({ error: 'An error occurred while saving user data.' });
  // }
};

const getAllUsers = async (req, res) => {
  try {
    // Get all users using userModel.getAllUsers
    const users = await allUsers();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'An error occurred while retrieving users.' });
  }
};

export { saveUser, getAllUsers };