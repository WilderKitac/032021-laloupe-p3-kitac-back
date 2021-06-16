const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/size.model');

const getAllSize = (req, res) => {
  findMany()
    .then((results) => {
      const size = results[0];
      res.json(size);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneSizeById = (req, res) => {
  let id;
  if (req.sizeId) {
    id = req.sizeId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([size]) => {
      if (size.length === 0) {
        res.status(404).send('size not found');
      } else {
        res.json(size[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneSize = (req, res, next) => {
  const { size_number, size_letter } = req.body;
  const { error } = Joi.object({
      size_number: Joi.number().integer(),
      size_letter: Joi.string().max(4),
  }).validate({ size_number, size_letter }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    createOne({ size_number, size_letter })
      .then(([results]) => {
        res.status(201);
        req.sizeId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const updateOneSize = (req, res, next) => {
  const { size_number, size_letter } = req.body;
  const { error } = Joi.object({
    size_number: Joi.number.integer(),
    size_letter: Joi.string().max(4),
  }).validate({ size_number, size_letter }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send('Size not found');
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const deleteOneSize = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Size not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllSize,
  getOneSizeById,
  createOneSize,
  updateOneSize,
  deleteOneSize,
};
