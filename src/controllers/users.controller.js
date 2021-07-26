const Joi = require('joi');
const {
  emailAlreadyExists,
  hashPassword,
  verifyPassword,
  findMany,
  findOneById,
  findOneByEmail,
  createOne,
  updateOne,
  deleteOne,
} = require('../models/user.model');

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
        res.status(404).send('Utilisateur non trouvé');
      } else {
        res.json(Users[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneUserByEmail = (req, res, next) => {
  const { email } = req.body;
  findOneByEmail(email)
    .then(([users]) => {
      if (users.length === 0) {
        res.status(404).send('Utilisateur non trouvé');
      } else {
        // eslint-disable-next-line prefer-destructuring
        req.user = users[0];
        next();
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneUserByIdRefresh = (req, res, next) => {
  let id;
  if (req.userId) {
    id = req.userId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([users]) => {
      if (users.length === 0) {
        res.status(404).send('user not found');
      } else {
        req.user = users[0];
        next();
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneUser = async (req, res, next) => {
  const { name, email, address, clearPassword, phone, user_types_id } = req.body;
  const { error } = Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.string().email().max(100).required(),
    address: Joi.string().max(255).required(),
    clearPassword: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')).required(),
    phone: Joi.string().max(30),
    user_types_id: Joi.number().integer(),
  }).validate({ name, email, address, clearPassword, phone, user_types_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    const emailIsExisting = await emailAlreadyExists(email);
    if (emailIsExisting) {
      res.status(422).send('Email already used');
    } else {
      const user_password = await hashPassword(clearPassword);
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
  }
};

const updateOneUser = async (req, res, next) => {
  const { name, email, address, user_password, phone, user_types_id } = req.body;
  const { error } = Joi.object({
    name: Joi.string().max(100),
    email: Joi.string().email().max(100),
    address: Joi.string().max(255),
    user_password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')),
    phone: Joi.string().max(30),
    user_types_id: Joi.number().integer(),
  })
    .min(1)
    .validate({ name, email, address, user_password, phone, user_types_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    const emailIsExisting = await emailAlreadyExists(email);
    if (emailIsExisting) {
      if (req.body.user_password) {
        req.body.user_password = await hashPassword(user_password);
      }
      updateOne(req.body, req.params.id)
        .then(([results]) => {
          if (results.affectedRows === 0) {
            res.status(404).send('Utilisateur non trouvé');
          } else {
            next();
          }
        })
        .catch((err) => {
          res.status(500).send(err.message);
        });
    } else {
      res.status(422).send('Cet email est déjà utilisé');
    }
  }
};

const deleteOneUser = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Utilisateur non trouvé');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const verifyCredentials = async (req, res, next) => {
  const { email, password } = req.body;
  const [users] = await findOneByEmail(email);
  if (!users[0]) {
    res.status(404).json('Utilisateur non trouvé');
  } else {
    const [user] = users;
    const passwordIsValid = await verifyPassword(password, user.user_password);
    if (passwordIsValid) {
      next();
    } else {
      res.status(401).send('Mot de passe erroné');
    }
  }
};

module.exports = {
  getAllUsers,
  getOneUserById,
  getOneUserByEmail,
  getOneUserByIdRefresh,
  createOneUser,
  updateOneUser,
  deleteOneUser,
  verifyCredentials,
};
