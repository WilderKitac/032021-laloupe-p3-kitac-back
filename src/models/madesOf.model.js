const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM mades_of';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM mades_of WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (mades_of) => {
  const sql = 'INSERT INTO mades_of SET ?';
  return connection.promise().query(sql, [mades_of]);
};

const updateOne = (mades_of, id) => {
  const sql = 'UPDATE mades_of SET ? WHERE id=?';
  return connection.promise().query(sql, [mades_of, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM mades_of WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};
