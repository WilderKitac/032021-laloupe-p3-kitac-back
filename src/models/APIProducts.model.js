const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM API_products';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM API_products WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (APIProducts) => {
  const sql = 'INSERT INTO API_products SET ?';
  return connection.promise().query(sql, [APIProducts]);
};

const updateOne = (APIProducts, id) => {
  const sql = 'UPDATE API_products SET ? WHERE id=?';
  return connection.promise().query(sql, [APIProducts, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM API_products WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};
