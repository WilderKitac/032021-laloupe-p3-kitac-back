const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM size';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM size WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (size) => {
  const sql = 'INSERT INTO size SET ?';
  return connection.promise().query(sql, [size]);
};

const updateOne = (size, id) => {
  const sql = 'UPDATE size SET ? WHERE id=?';
  return connection.promise().query(sql, [size, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM size WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};
