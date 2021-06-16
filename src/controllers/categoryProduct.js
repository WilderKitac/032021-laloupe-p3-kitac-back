const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/categoryProduct.model');

const getAllCategoryProduct = (req, res) => {
  findMany()
    .then((results) => {
      const categoryProduct = results[0];
      res.json(categoryProduct);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneCategoryProductById = (req, res) => {
  let id;
  if (req.categoryProductId) {
    id = req.categoryProductId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([CategoryProduct]) => {
      if (CategoryProduct.length === 0) {
        res.status(404).send('CategoryProduct not found');
      } else {
        res.json(CategoryProduct[0]);
      }
    })

    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneCategoryProduct = (req, res, next) => {
  const { product_id, category_id } = req.body;
  const { error } = Joi.object({
    product_id: Joi.number().integer(),
    category_id: Joi.number().integer(),
  }).validate({ product_id, category_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    createOne({ product_id, category_id })
      .then(([results]) => {
        res.status(201);
        req.categoryProductId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const updateOneCategoryProduct = (req, res, next) => {
  const { product_id, category_id } = req.body;
  const { error } = Joi.object({
    product_id: Joi.number().integer(),
    category_id: Joi.number().integer(),
  }).validate({ product_id, category_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send('CategoryProduct not found');
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const deleteOneCategoryProduct = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('CategoryProduct not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllCategoryProduct,
  getOneCategoryProductById,
  createOneCategoryProduct,
  updateOneCategoryProduct,
  deleteOneCategoryProduct,
};
