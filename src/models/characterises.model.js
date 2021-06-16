const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM characterises';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM characterises WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (characterises) => {
  const sql = 'INSERT INTO characterises SET ?';
  return connection.promise().query(sql, [characterises]);
};

const updateOne = (characterises, id) => {
  const sql = 'UPDATE characterises SET ? WHERE id=?';
  return connection.promise().query(sql, [characterises, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM characterises WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};