const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/userType.model');

const getAllUserTypes = (req, res) => {
  findMany()
    .then((results) => {
      const userTypes = results[0];
      res.json(userTypes);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneUserTypeById = (req, res) => {
  let id;
  if (req.userTypeId) {
    id = req.userTypeId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([userTypes]) => {
      if (userTypes.length === 0) {
        res.status(404).send('User Type not found');
      } else {
        res.json(userTypes[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneUserType = (req, res, next) => {
  const { title } = req.body;
  const { error } = Joi.object({
    title: Joi.string().max(100).required(),
  }).validate({ title }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    createOne({ title })
      .then(([results]) => {
        res.status(201);
        req.userTypeId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const updateOneUserType = (req, res, next) => {
  const { title } = req.body;
  const { error } = Joi.object({
    title: Joi.string().max(100).required(),
  }).validate({ title }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send('User Type not found');
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const deleteOneUserType = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('User Type not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllUserTypes,
  getOneUserTypeById,
  createOneUserType,
  updateOneUserType,
  deleteOneUserType,
};
