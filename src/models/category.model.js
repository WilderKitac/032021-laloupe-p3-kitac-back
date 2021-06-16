const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM category';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM category WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (category) => {
  const sql = 'INSERT INTO category SET ?';
  return connection.promise().query(sql, [category]);
};

const updateOne = (category, id) => {
  const sql = 'UPDATE category SET ? WHERE id=?';
  return connection.promise().query(sql, [category, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM category WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};
