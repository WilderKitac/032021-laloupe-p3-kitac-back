const argon2 = require('argon2');
const connection = require('../db-connection');

const emailAlreadyExists = async (email) => {
  const sql = 'SELECT * FROM users WHERE email=?';
  const [results] = await connection.promise().query(sql, [email]);
  // syntaxe raccourcie de results.length ? true : false
  return results.length > 0;
};

const hashPassword = (password) => {
  return argon2.hash(password);
};

const verifyPassword = (password, hashedPasword) => {
  return argon2.verify(hashedPasword, password);
};

const findMany = () => {
  const sql = 'SELECT * FROM users';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM users WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const findOneByEmail = (email) => {
  const sql = 'SELECT * FROM users WHERE email=?';
  return connection.promise().query(sql, [email]);
};

const createOne = (users) => {
  const sql = 'INSERT INTO users SET ?';
  return connection.promise().query(sql, [users]);
};

const updateOne = (users, id) => {
  const sql = 'UPDATE users SET ? WHERE id=?';
  return connection.promise().query(sql, [users, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM users WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  emailAlreadyExists,
  hashPassword,
  verifyPassword,
  findMany,
  findOneById,
  findOneByEmail,
  createOne,
  updateOne,
  deleteOne,
};
