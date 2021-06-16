const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM represents';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM represents WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (represents) => {
  const sql = 'INSERT INTO represents SET ?';
  return connection.promise().query(sql, [represents]);
};

const updateOne = (represents, id) => {
  const sql = 'UPDATE represents SET ? WHERE id=?';
  return connection.promise().query(sql, [represents, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM represents WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};
