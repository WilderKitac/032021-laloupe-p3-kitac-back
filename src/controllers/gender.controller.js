const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/gender.model');

const getAllGender = (req, res) => {
  findMany()
    .then((results) => {
      const gender = results[0];
      res.json(gender);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneGenderById = (req, res) => {
  let id;
  if (req.genderId) {
    id = req.genderId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([gender]) => {
      if (gender.length === 0) {
        res.status(404).send('Gender not found');
      } else {
        res.json(gender[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneGender = (req, res, next) => {
  const { title } = req.body;
  const { error } = Joi.object({
    title: Joi.string().max(50),
  }).validate({ title }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    createOne({ title })
      .then(([results]) => {
        res.status(201);
        req.genderId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const updateOneGender = (req, res, next) => {
  const { title } = req.body;
  const { error } = Joi.object({
    title: Joi.string().max(50),
  })
    .min(1)
    .validate({ title }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send('Gender not found');
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const deleteOneGender = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Gender not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllGender,
  getOneGenderById,
  createOneGender,
  updateOneGender,
  deleteOneGender,
};
