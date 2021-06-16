const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM user_types';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM user_types WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (user_types) => {
  const sql = 'INSERT INTO user_types SET ?';
  return connection.promise().query(sql, [user_types]);
};

const updateOne = (user_types, id) => {
  const sql = 'UPDATE user_types SET ? WHERE id=?';
  return connection.promise().query(sql, [user_types, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM user_types WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};
