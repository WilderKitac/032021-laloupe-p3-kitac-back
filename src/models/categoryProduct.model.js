const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM category_product';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM category_product WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (categoryProduct) => {
  const sql = 'INSERT INTO category_product SET ?';
  return connection.promise().query(sql, [categoryProduct]);
};

const createMany = (productsCats) => {
  const sql = 'INSERT INTO category_product (product_id, category_id) VALUES ?';
  return connection.promise().query(sql, [productsCats]);
};

const updateOne = (categoryProduct, id) => {
  const sql = 'UPDATE category_product SET ? WHERE id=?';
  return connection.promise().query(sql, [categoryProduct, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM category_product WHERE id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  createMany,
  updateOne,
  deleteOne,
};
