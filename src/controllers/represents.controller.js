const Joi = require('joi');
const { findMany, findOneById, createOne, createMany, updateOne, deleteOne } = require('../models/represents.model');

const getAllRepresents = (req, res) => {
  findMany()
    .then((results) => {
      const represents = results[0];
      res.json(represents);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneRepresentsById = (req, res) => {
  let id;
  if (req.representsId) {
    id = req.representsId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([Represents]) => {
      if (Represents.length === 0) {
        res.status(404).send('Represents not found');
      } else {
        res.json(Represents[0]);
      }
    })

    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneRepresents = (req, res, next) => {
  const { product_id, product_images_id } = req.body;
  const { error } = Joi.object({
    product_id: Joi.number().integer().required(),
    product_images_id: Joi.number().integer().required(),
  }).validate({ product_id, product_images_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    createOne({ product_id, product_images_id })
      .then(([results]) => {
        res.status(201);
        req.representsId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const assignManyImgsProduct = (req, res) => {
  console.log(req.body);
  createMany(req.body)
    .then(() => {
      res.send('Images associées avec succès');
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateOneRepresents = (req, res, next) => {
  const { product_id, product_images_id } = req.body;
  const { error } = Joi.object({
    product_id: Joi.number().integer(),
    product_images_id: Joi.number().integer(),
  })
    .min(1)
    .validate({ product_id, product_images_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send('Represents not found');
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const deleteOneRepresents = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Represents not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllRepresents,
  getOneRepresentsById,
  createOneRepresents,
  assignManyImgsProduct,
  updateOneRepresents,
  deleteOneRepresents,
};
