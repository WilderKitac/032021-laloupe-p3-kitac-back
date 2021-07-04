const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM supplies';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM supplies WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const createOne = (supplies) => {
  const sql = 'INSERT INTO supplies SET ?';
  return connection.promise().query(sql, [supplies]);
};

const updateOne = (supplies, id) => {
  const sql = 'UPDATE supplies SET ? WHERE id=?';
  return connection.promise().query(sql, [supplies, id]);
};

const deleteOne = (id) => {
  const sql = 'DELETE FROM supplies WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const findSuppliesPerProductId = (id) => {
  const sql = 'SELECT p.id, s.* FROM supplies s RIGHT JOIN products p ON p.supplies_id=s.id WHERE p.id=?';
  return connection.promise().query(sql, [id]);
};

module.exports = {
  findMany,
  findOneById,
  createOne,
  updateOne,
  deleteOne,
  findSuppliesPerProductId,
};
