const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/products.model');

const getAllProducts = (req, res) => {
  findMany()
    .then((results) => {
      const products = results[0];
      res.json(products);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneProductById = (req, res, next) => {
  let id;
  if (req.productId) {
    id = req.productId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([Product]) => {
      if (Product.length === 0) {
        res.status(404).send('Product not found');
      } else if (req.product) {
        req.product.maininformation = Product;
        res.json(req.product);
      } else {
        res.json(Product[0]);
        next();
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneProduct = (req, res, next) => {
  const { name, description, difficulty, completion_time, product_price, pieces, supplies_id } = req.body;
  const { error } = Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().max(255),
    difficulty: Joi.string().max(100),
    completion_time: Joi.string().max(100),
    product_price: Joi.number().precision(2),
    pieces: Joi.string().max(100).required(),
    supplies_id: Joi.number().integer(),
  }).validate({ name, description, difficulty, completion_time, product_price, pieces, supplies_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    createOne({ name, description, difficulty, completion_time, product_price, pieces, supplies_id })
      .then(([results]) => {
        res.status(201);
        req.productId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const updateOneProduct = (req, res, next) => {
  const { name, description, difficulty, completion_time, product_price, pieces, supplies_id } = req.body;
  const { error } = Joi.object({
    name: Joi.string().max(100),
    description: Joi.string().max(255),
    difficulty: Joi.string().max(100),
    completion_time: Joi.string().max(100),
    product_price: Joi.number().precision(2),
    pieces: Joi.string().max(100),
    supplies_id: Joi.number().integer(),
  })
    .min(1)
    .validate({ name, description, difficulty, completion_time, product_price, pieces, supplies_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send('Product not found');
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const deleteOneProduct = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Product not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllProducts,
  getOneProductById,
  createOneProduct,
  updateOneProduct,
  deleteOneProduct,
};
