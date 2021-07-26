const connection = require('../db-connection');

const findMany = () => {
  const sql = 'SELECT * FROM buys';
  return connection.promise().query(sql);
};

const findOneById = (id) => {
  const sql = 'SELECT * FROM buys WHERE id=?';
  return connection.promise().query(sql, [id]);
};

const findManyById = (ids) => {
  let sql = 'SELECT * FROM buys WHERE id=?';
  for (let i = 1; i < ids.length; i++) {
    sql += ' OR id=?';
  }
  return connection.promise().query(sql, [...ids]);
};

const createOne = (buys) => {
  const sql = 'INSERT INTO buys SET ?';
  return connection.promise().query(sql, [buys]);
};

const createMany = (buys) => {
  const sql = 'INSERT INTO buys (product_id, user_id, quantity, size_id, material_id, supplies_id, buying_date) VALUES ?';
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
  findManyById,
  createOne,
  createMany,
  updateOne,
  deleteOne,
};
