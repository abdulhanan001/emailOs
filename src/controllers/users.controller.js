import { save, allUsers } from '../models/user.model.js'
import { validateUserInput } from '../schemas/user.schema.js';

const saveUser = async (req, res) => {
    const { error } = validateUserInput(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password, gender, age, about, dob, education } = req.body;

    const newUser = await save(email, password, gender, age, about, dob, education);

    res.json(newUser);

};

const getAllUsers = async (req, res) => {
  const users = await allUsers();
  res.json(users);
};

export { saveUser, getAllUsers };