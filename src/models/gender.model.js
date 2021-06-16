const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM gender';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM gender WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (gender) => {
  const sql = 'INSERT INTO gender SET ?';
  return connection.promise().query(sql, [gender]);
};

const updateOne = (gender, id) => {
  const sql = 'UPDATE gender SET ? WHERE id=?';
  return connection.promise().query(sql, [gender, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM gender WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};
