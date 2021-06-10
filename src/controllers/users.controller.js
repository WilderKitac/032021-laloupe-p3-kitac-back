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
  // il faudrait vérifier que les données fournies dans la requête sont correctes
  const { name, lastname, identifiant, password, phone, picture_profile } = req.body;
  createOne({ name, lastname, identifiant, password, phone, picture_profile })
    .then(([results]) => {
      // res.status(201).json({ id: results.insertId, name, lastname, identifiant, password, phone, picture_profile });
      req.userId = results.insertId;
      next();
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateOneUser = (req, res, next) => {
  // il faudrait vérifier que les données fournies dans la requête sont correctes
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
