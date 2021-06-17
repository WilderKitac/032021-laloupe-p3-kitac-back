const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/buys.model');

const getAllBuys = (req, res) => {
  findMany()
    .then((results) => {
      const buys = results[0];
      res.json(buys);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneBuyById = (req, res) => {
  let id;
  if (req.buyId) {
    id = req.buyId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([Buys]) => {
      if (Buys.length === 0) {
        res.status(404).send('Cannot find your item, your order is empty');
      } else {
        res.json(Buys[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneBuy = (req, res, next) => {
  const { product_id, user_id, quantity, size_id, material_id, supplies_id, buying_date } = req.body;
  const { error } = Joi.object({
    product_id: Joi.number().integer(),
    user_id: Joi.number().integer(),
    quantity: Joi.number().integer(),
    size_id: Joi.number().integer(),
    material_id: Joi.number().integer(),
    supplies_id: Joi.number().integer(),
    buying_date: Joi.date().greater('now'),
  }).validate({ product_id, user_id, quantity, size_id, material_id, supplies_id, buying_date }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    createOne({ product_id, user_id, quantity, size_id, material_id, supplies_id, buying_date })
      .then(([results]) => {
        res.status(201);
        req.buyId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const updateOneBuy = (req, res, next) => {
  const { product_id, user_id, quantity, size_id, material_id, supplies_id, buying_date } = req.body;
  const { error } = Joi.object({
    product_id: Joi.number().integer(),
    user_id: Joi.number().integer(),
    quantity: Joi.number().integer(),
    size_id: Joi.number().integer(),
    material_id: Joi.number().integer(),
    supplies_id: Joi.number().integer(),
    buying_date: Joi.date().greater('now'),
  })
    .min(1)
    .validate({ product_id, user_id, quantity, size_id, material_id, supplies_id, buying_date }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send('Cannot find your item, your order is empty');
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const deleteOneBuy = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Cannot find your item, your order is empty');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllBuys,
  getOneBuyById,
  createOneBuy,
  updateOneBuy,
  deleteOneBuy,
};
