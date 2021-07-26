const connection = require('../db-connection');

const simpleFindMany = () => {
  const sql = 'SELECT * FROM products';
  return connection.promise().query(sql);
};

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

const findManyWithCat = () => {
  const sql =
    'SELECT p.id id, c.id cat_id, c.name cat_name FROM products p JOIN category_product cp ON cp.product_id=p.id JOIN category c ON c.id=cp.category_id ORDER by p.id';
  return connection.promise().query(sql);
};

module.exports = {
  simpleFindMany,
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
  findManyWithCat,
};
