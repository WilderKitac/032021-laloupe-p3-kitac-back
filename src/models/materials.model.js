const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM materials';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM materials WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (materials) => {
  const sql = 'INSERT INTO materials SET ?';
  return connection.promise().query(sql, [materials]);
};

const updateOne = (materials, id) => {
  const sql = 'UPDATE materials SET ? WHERE id=?';
  return connection.promise().query(sql, [materials, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM materials WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const findMaterialsPerProductId = (id) => {
  const sql = 'SELECT p.id, m.* FROM products p JOIN mades_of mo ON mo.product_id=p.id RIGHT JOIN materials m ON m.id=mo.materials_id WHERE p.id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
  findMaterialsPerProductId,
};
