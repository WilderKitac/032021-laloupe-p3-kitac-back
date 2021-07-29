const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM size';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM size WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (size) => {
  const sql = 'INSERT INTO size SET ?';
  return connection.promise().query(sql, [size]);
};

const updateOne = (size, id) => {
  const sql = 'UPDATE size SET ? WHERE id=?';
  return connection.promise().query(sql, [size, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM size WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const findSizePerProductId = (id) => {
  const sql =
    'SELECT p.id, g.*, s.* FROM products p JOIN characterises ch ON ch.product_id=p.id LEFT JOIN gender g ON g.id=ch.gender_id JOIN size s ON s.id=ch.size_id WHERE p.id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
  findSizePerProductId,
};
