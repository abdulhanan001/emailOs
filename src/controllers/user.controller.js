import { save, allUsers } from '../dal/user.dal.js'

const saveUser = async (req, res) => {

    const { email, password, gender, age, about, dob, education } = req.body;

    const newUser = await save(email, password, gender, age, about, dob, education);

    res.json(newUser);

};

const getAllUsers = async (req, res) => {
  const users = await allUsers();
  res.json(users);
};

export { saveUser, getAllUsers };