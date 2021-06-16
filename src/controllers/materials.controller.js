const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/materials.model');

const getAllMaterials = (req, res) => {
  findMany()
    .then((results) => {
      const materials = results[0];
      res.json(materials);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneMaterialsById = (req, res) => {
  let id;
  if (req.materialsId) {
    id = req.materialsId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([materials]) => {
      if (materials.length === 0) {
        res.status(404).send('Materials not found');
      } else {
        res.json(materials[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneMaterials = (req, res, next) => {
  const { materials_type, materials_price, quantity, API_Mat_id } = req.body;
  const { error } = Joi.object({
    materials_type: Joi.string().max(100).required(),
    materials_price: Joi.number().precision(2).required(),
    quantity: Joi.number().integer().required(),
    API_Mat_id: Joi.number().integer(),
  }).validate({ materials_type, materials_price, quantity, API_Mat_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    createOne({ materials_type, materials_price, quantity, API_Mat_id })
      .then(([results]) => {
        res.status(201);
        req.materialsId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const updateOneMaterials = (req, res, next) => {
  const { materials_type, materials_price, quantity, API_Mat_id } = req.body;
  const { error } = Joi.object({
    materials_type: Joi.string().max(100).required(),
    materials_price: Joi.number().precision(2).required(),
    quantity: Joi.number().integer().required(),
    API_Mat_id: Joi.number().integer(),
  }).validate({ materials_type, materials_price, quantity, API_Mat_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send('Materials not found');
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const deleteOneMaterials = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Materials not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllMaterials,
  getOneMaterialsById,
  createOneMaterials,
  updateOneMaterials,
  deleteOneMaterials,
};
