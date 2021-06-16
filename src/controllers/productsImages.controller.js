const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne } = require('../models/productsImages');

const getAllImages = (req, res) => {
  findMany()
    .then((results) => {
      const images = results[0];
      res.json(images);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneImagesById = (req, res) => {
  let id;
  if (req.imagesId) {
    id = req.imagesId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([Images]) => {
      if (Images.length === 0) {
        res.status(404).send('Images not found');
      } else {
        res.json(Images[0]);
      }
    })

    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneImages = (req, res, next) => {
  const { link, alt } = req.body;
  const { error } = Joi.object({
    link: Joi.string().max(255).required(),
    alt: Joi.string().max(255).required(),
  }).validate({ link, alt }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    createOne({ link, alt })
      .then(([results]) => {
        res.status(201);
        req.imagesId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const updateOneImages = (req, res, next) => {
  const { link, alt } = req.body;
  const { error } = Joi.object({
    link: Joi.string().max(255).required(),
    alt: Joi.string().max(255).required(),
  }).validate({ link, alt }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send('Images not found');
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const deleteOneImages = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Images not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllImages,
  getOneImagesById,
  createOneImages,
  updateOneImages,
  deleteOneImages,
};
