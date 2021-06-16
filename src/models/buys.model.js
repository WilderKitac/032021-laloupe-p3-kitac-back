const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM buys';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM buys WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (buys) => {
  const sql = 'INSERT INTO buys SET ?';
  return connection.promise().query(sql, [buys]);
};

const updateOne = (buys, id) => {
  const sql = 'UPDATE buys SET ? WHERE id=?';
  return connection.promise().query(sql, [buys, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM buys WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};
