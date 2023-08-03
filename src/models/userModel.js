const pool = require('../db/dataSource.js') // You should require your database configuration here

const saveUser = async (email, password, gender, age, about, dob, education) => {
  console.log("pools is" , pool)
  const query =
    'INSERT INTO users (email, password, gender, age, about, dob, education) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const values = [email, password, gender, age, about, dob, education];
  const result = await pool.query(query, values);

  return result.rows[0];
};

module.exports = { saveUser };