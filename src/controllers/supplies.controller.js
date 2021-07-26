const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne, findSuppliesPerProductId } = require('../models/supplies.model');

const getAllSupplies = (req, res) => {
  findMany()
    .then((results) => {
      const supplies = results[0];
      res.json(supplies);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneSuppliesById = (req, res) => {
  let id;
  if (req.suppliesId) {
    id = req.suppliesId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([supplies]) => {
      if (supplies.length === 0) {
        res.status(404).send('Supplies not found');
      } else {
        res.json(supplies[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneSupplies = (req, res, next) => {
  const { title, content, price } = req.body;
  const { error } = Joi.object({
    title: Joi.string().max(50).required(),
    content: Joi.string().max(50).required(),
    price: Joi.number().precision(2),
  }).validate({ title, content, price }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    createOne({ title, content, price })
      .then(([results]) => {
        res.status(201);
        req.suppliesId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const updateOneSupplies = (req, res, next) => {
  const { title, content, price } = req.body;
  const { error } = Joi.object({
    title: Joi.string().max(50),
    content: Joi.string().max(50),
    price: Joi.number().precision(2),
  })
    .min(1)
    .validate({ title, content, price }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send('Supplies not found');
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const deleteOneSupplies = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Supplies not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getSuppliesByProductId = (req, res, next) => {
  let id;
  if (req.productId) {
    id = req.productId;
  } else {
    id = req.params.id;
  }

  findSuppliesPerProductId(id)
    .then(([Product]) => {
      if (Product.length === 0) {
        res.status(404).send('Supplies not found for this product');
      } else {
        req.product.supplies = Product;
        next();
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllSupplies,
  getOneSuppliesById,
  createOneSupplies,
  updateOneSupplies,
  deleteOneSupplies,
  getSuppliesByProductId,
};
