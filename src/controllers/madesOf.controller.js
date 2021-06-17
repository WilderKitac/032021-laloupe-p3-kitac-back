const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/madesOf.model');

const getAllMadesOf = (req, res) => {
  findMany()
    .then((results) => {
      const madesOf = results[0];
      res.json(madesOf);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneMadesOfById = (req, res) => {
  let id;
  if (req.madesOfId) {
    id = req.madesOfId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([madesOf]) => {
      if (madesOf.length === 0) {
        res.status(404).send('Mades of not found');
      } else {
        res.json(madesOf[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneMadesOf = (req, res, next) => {
  const { product_id, materials_id } = req.body;
  const { error } = Joi.object({
    product_id: Joi.number().integer(),
    materials_id: Joi.number().integer(),
  }).validate({ product_id, materials_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    createOne({ product_id, materials_id })
      .then(([results]) => {
        res.status(201);
        req.madesOfId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const updateOneMadesOf = (req, res, next) => {
  const { product_id, materials_id } = req.body;
  const { error } = Joi.object({
    product_id: Joi.number().integer(),
    materials_id: Joi.number().integer(),
  })
    .min(1)
    .validate({ product_id, materials_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send('Mades of not found');
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const deleteOneMadesOf = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Mades of not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllMadesOf,
  getOneMadesOfById,
  createOneMadesOf,
  updateOneMadesOf,
  deleteOneMadesOf,
};
