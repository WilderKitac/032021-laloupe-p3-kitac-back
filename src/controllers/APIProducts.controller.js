const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/APIProducts.model');

const getAllAPIProducts = (req, res) => {
  findMany()
    .then((results) => {
      const APIProducts = results[0];
      res.json(APIProducts);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneAPIProductsById = (req, res) => {
  let id;
  if (req.APIProductsId) {
    id = req.APIProductsId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([APIProducts]) => {
      if (APIProducts.length === 0) {
        res.status(404).send('APIProducts not found');
      } else {
        res.json(APIProducts[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneAPIProducts = (req, res, next) => {
  const { product_id, API_product_id } = req.body;
  const { error } = Joi.object({
    product_id: Joi.number().integer(),
    API_product_id: Joi.number().integer(),
  }).validate({ product_id, API_product_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    createOne({ product_id, API_product_id })
      .then(([results]) => {
        res.status(201);
        req.APIProductsId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const updateOneAPIProducts = (req, res, next) => {
  const { product_id, API_product_id } = req.body;
  const { error } = Joi.object({
    product_id: Joi.number().integer(),
    API_product_id: Joi.number().integer(),
  }).validate({ product_id, API_product_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send('APIProducts not found');
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const deleteOneAPIProducts = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('APIProducts not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllAPIProducts,
  getOneAPIProductsById,
  createOneAPIProducts,
  updateOneAPIProducts,
  deleteOneAPIProducts,
};
