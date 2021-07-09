const connection = require('../db-connection');

const findMany = () => {
  const sql =
    'SELECT p.*, i.link, i.alt FROM products p JOIN represents r ON r.product_id=p.id LEFT JOIN products_images i ON i.id=r.product_images_id ORDER BY p.id';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM products WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (products) => {
  const sql = 'INSERT INTO products SET ?';
  return connection.promise().query(sql, [products]);
};

const updateOne = (products, id) => {
  const sql = 'UPDATE products SET ? WHERE id=?';
  return connection.promise().query(sql, [products, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM products WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
};
