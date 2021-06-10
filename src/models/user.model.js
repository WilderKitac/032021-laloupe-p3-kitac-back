const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM users';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM users WHERE id=?';
  return connection.promise().query(sql, [id]);
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
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};
