const Joi = require('joi');
const { findMany, findOneById, findManyById, createOne, createMany, updateOne, deleteOne } = require('../models/buys.model');

const getAllBuys = (req, res) => {
  findMany()
    .then((results) => {
      const buys = results[0];
      res.json(buys);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneBuyById = (req, res) => {
  let id;
  if (req.buyId) {
    id = req.buyId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([Buys]) => {
      if (Buys.length === 0) {
        res.status(404).send('Cannot find your item, your order is empty');
      } else {
        res.json(Buys[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getManyBuysById = (req, res) => {
  if (req.buysIds.length === 1) {
    findOneById(req.buysIds[0])
      .then(([BuyItem]) => {
        if (BuyItem.length === 0) {
          res.status(404).send('Element non trouvé');
        } else {
          res.json(BuyItem[0]);
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } else {
    findManyById(req.buysIds)
      .then(([BuyItems]) => {
        if (BuyItems.length === 0) {
          res.status(404).send('Elements non trouvés');
        } else {
          res.json(BuyItems);
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const createOneBuy = (req, res, next) => {
  const { product_id, user_id, quantity, size_id, material_id, supplies_id, buying_date } = req.body;
  const { error } = Joi.object({
    product_id: Joi.number().integer(),
    user_id: Joi.number().integer(),
    quantity: Joi.number().integer(),
    size_id: Joi.number().integer(),
    material_id: Joi.number().integer(),
    supplies_id: Joi.number().integer(),
    buying_date: Joi.number().integer(),
  }).validate({ product_id, user_id, quantity, size_id, material_id, supplies_id, buying_date }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    createOne({ product_id, user_id, quantity, size_id, material_id, supplies_id, buying_date })
      .then(([results]) => {
        res.status(201);
        req.buyId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const createManyBuysItem = (req, res, next) => {
  const buysArray = req.body;
  createMany(buysArray)
    .then(([results]) => {
      const idToSend = [];
      for (let i = 0; i < results.affectedRows; i++) {
        idToSend.push(results.insertId + i);
      }
      req.buysIds = idToSend;
      next();
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateOneBuy = (req, res, next) => {
  const { product_id, user_id, quantity, size_id, material_id, supplies_id, buying_date } = req.body;
  const { error } = Joi.object({
    product_id: Joi.number().integer(),
    user_id: Joi.number().integer(),
    quantity: Joi.number().integer(),
    size_id: Joi.number().integer(),
    material_id: Joi.number().integer(),
    supplies_id: Joi.number().integer(),
    buying_date: Joi.number().integer(),
  })
    .min(1)
    .validate({ product_id, user_id, quantity, size_id, material_id, supplies_id, buying_date }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send('Cannot find your item, your order is empty');
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const deleteOneBuy = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Cannot find your item, your order is empty');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllBuys,
  getOneBuyById,
  getManyBuysById,
  createOneBuy,
  createManyBuysItem,
  updateOneBuy,
  deleteOneBuy,
};
