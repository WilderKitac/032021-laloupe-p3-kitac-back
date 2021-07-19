const Joi = require('joi');
const { findMany, findOneById, createOne, updateOne, deleteOne, findManyWithCat } = require('../models/products.model');

const getAllProducts = (req, res, next) => {
  findMany()
    .then((results) => {
      const products = results[0];
      const prodImgs = [];
      products.forEach((item, index) => {
        if (index === 0) {
          prodImgs.push(item);
        } else if (prodImgs[prodImgs.length - 1].id !== item.id) {
          prodImgs.push(item);
        }
      });
      // ajouter le contenu pour envoyer à la requête suivante
      req.products = prodImgs;
      next();
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getAllProductsWithCat = (req, res) => {
  findManyWithCat()
    .then((results) => {
      const prodCats = results[0];
      const prodImgCat = req.products.map((item) => {
        const categories = [];
        prodCats.forEach((cat) => {
          if (item.id === cat.id) {
            categories.push({ cat_id: cat.cat_id, cat_name: cat.cat_name });
          }
        });
        return { ...item, categories };
      });
      res.json(prodImgCat);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneProductById = (req, res, next) => {
  let id;
  if (req.productId) {
    id = req.productId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([Product]) => {
      if (Product.length === 0) {
        res.status(404).send('Product not found');
      } else if (req.product) {
        req.product.maininformation = Product;
        res.json(req.product);
      } else if (req.body.category_ids) {
        // fonction pour reconstruire le tableau pour la table de jointure
        const rebuiltProdCat = [];
        req.body.category_ids.forEach((item) => {
          rebuiltProdCat.push([req.productId, parseInt(item, 10)]);
        });
        req.catProdArray = rebuiltProdCat;
        next();
      } else {
        res.json(Product[0]);
        next();
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneProduct = (req, res, next) => {
  const { name, description, difficulty, completion_time, product_price, pieces, supplies_id } = req.body;
  console.log(req.body);
  const { error } = Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().max(255),
    difficulty: Joi.string().max(100),
    completion_time: Joi.string().max(100),
    product_price: Joi.number().precision(2),
    pieces: Joi.string().max(100).required(),
    supplies_id: Joi.number().integer(),
  }).validate({ name, description, difficulty, completion_time, product_price, pieces, supplies_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    createOne({ name, description, difficulty, completion_time, product_price, pieces, supplies_id })
      .then(([results]) => {
        res.status(201);
        req.productId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const updateOneProduct = (req, res, next) => {
  const { name, description, difficulty, completion_time, product_price, pieces, supplies_id } = req.body;
  const { error } = Joi.object({
    name: Joi.string().max(100),
    description: Joi.string().max(255),
    difficulty: Joi.string().max(100),
    completion_time: Joi.string().max(100),
    product_price: Joi.number().precision(2),
    pieces: Joi.string().max(100),
    supplies_id: Joi.number().integer(),
  })
    .min(1)
    .validate({ name, description, difficulty, completion_time, product_price, pieces, supplies_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send('Product not found');
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const deleteOneProduct = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Product not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllProducts,
  getOneProductById,
  getAllProductsWithCat,
  createOneProduct,
  // buildProdCatTable,
  updateOneProduct,
  deleteOneProduct,
};
