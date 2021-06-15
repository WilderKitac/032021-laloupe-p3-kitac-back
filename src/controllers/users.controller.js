const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/user.model');

const getAllUsers = (req, res) => {
  findMany()
    .then((results) => {
      const users = results[0];
      res.json(users);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneUserById = (req, res) => {
  let id;
  if (req.userId) {
    id = req.userId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([Users]) => {
      if (Users.length === 0) {
        res.status(404).send('User not found');
      } else {
        res.json(Users[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneUser = (req, res, next) => {
  const { name, email, address, user_password, phone, user_types_id } = req.body;
  const { error } = Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.string().email().max(100).required(),
    address: Joi.string().max(255).required(),
    user_password: Joi.string()
      .min(8)
      .max(255)
      .regex(/^[0-9+]{7}-[0-9+]{1}$/)
      .required(),
    phone: Joi.string().max(30),
    user_types_id: Joi.number().integer(),
  }).validate({ name, email, address, user_password, phone, user_types_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    createOne({ name, email, address, user_password, phone, user_types_id })
      .then(([results]) => {
        res.status(201);
        req.userId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const updateOneUser = (req, res, next) => {
  const { name, email, address, user_password, phone, user_types_id } = req.body;
  const { error } = Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.string().email().max(100).required(),
    address: Joi.string().max(255).required(),
    user_password: Joi.string()
      .min(8)
      .max(255)
      .regex(/^[0-9+]{7}-[0-9+]{1}$/)
      .required(),
    phone: Joi.string().max(30),
    user_types_id: Joi.number().integer(),
  }).validate({ name, email, address, user_password, phone, user_types_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send('User not found');
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const deleteOneUser = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('User not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllUsers,
  getOneUserById,
  createOneUser,
  updateOneUser,
  deleteOneUser,
};
