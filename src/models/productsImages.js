const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM products_images';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM products_images WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (productsImages) => {
  const sql = 'INSERT INTO products_images SET ?';
  return connection.promise().query(sql, [productsImages]);
};

const updateOne = (productsImages, id) => {
  const sql = 'UPDATE products_images SET ? WHERE id=?';
  return connection.promise().query(sql, [productsImages, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM products_images WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};
