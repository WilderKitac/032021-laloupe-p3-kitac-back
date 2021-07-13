const Joi = require('joi');
const multer = require('multer');
const { findMany, findOneById, createOne, updateOne, deleteOne, findMaterialsPerProductId } = require('../models/materials.model');

const getAllMaterials = (req, res) => {
  findMany()
    .then((results) => {
      const materials = results[0];
      res.json(materials);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getOneMaterialsById = (req, res) => {
  let id;
  if (req.materialsId) {
    id = req.materialsId;
  } else {
    id = req.params.id;
  }

  findOneById(id)
    .then(([materials]) => {
      if (materials.length === 0) {
        res.status(404).send('Materials not found');
      } else {
        res.json(materials[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const createOneMaterials = (req, res, next) => {
  const { material_type, material_price, quantity, API_Mat_id, image } = req.body;
  const { error } = Joi.object({
    material_type: Joi.string().max(100).required(),
    material_price: Joi.number().precision(2).required(),
    quantity: Joi.number().integer().required(),
    API_Mat_id: Joi.number().integer(),
    image: Joi.string().max(255),
  }).validate({ material_type, material_price, quantity, API_Mat_id, image }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    createOne({ material_type, material_price, quantity, API_Mat_id, image })
      .then(([results]) => {
        res.status(201);
        req.materialsId = results.insertId;
        next();
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const createAssetMaterial = (req, res, next) => {
  const { material_type, material_price, quantity, API_Mat_id, image } = req.body;
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/image');
    },
    filename: (_, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage: storage }).single('file');
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json(err);
    } else {
      let validationData = null;
      validationData = Joi.object({
        material_type: Joi.string().max(100).required(),
        material_price: Joi.number().precision(2).required(),
        quantity: Joi.number().integer().required(),
        API_Mat_id: Joi.number().integer(),
        image: Joi.string().max(255),
      }).validate({ material_type, material_price, quantity, API_Mat_id, image }, { abortEarly: false }).error;

      if (validationData) {
        console.log(validationData);
        res.status(500).send('Données invalides');
      } else {
        console.log(req.file.filename);
        console.log(req.body.configuration);
        const configuration = JSON.parse(req.body.configuration);
        console.log(configuration);
        req.project = {
          image: req.file.filename,
          ...configuration,
        };
        console.log(req.project);
        createOne(req.project).then((result) => {
          req.projectId = result[0].insertId;
          next();
        });
      }
    }
  });
};

const updateOneMaterials = (req, res, next) => {
  const { material_type, material_price, quantity, API_Mat_id } = req.body;
  const { error } = Joi.object({
    material_type: Joi.string().max(100),
    material_price: Joi.number().precision(2),
    quantity: Joi.number().integer(),
    API_Mat_id: Joi.number().integer(),
  })
    .min(1)
    .validate({ material_type, material_price, quantity, API_Mat_id }, { abortEarly: false });
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    updateOne(req.body, req.params.id)
      .then(([results]) => {
        if (results.affectedRows === 0) {
          res.status(404).send('Materials not found');
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
};

const deleteOneMaterials = (req, res) => {
  deleteOne(req.params.id)
    .then(([results]) => {
      if (results.affectedRows === 0) {
        res.status(404).send('Materials not found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getMaterialsByProductId = (req, res, next) => {
  let id;
  if (req.productId) {
    id = req.productId;
  } else {
    id = req.params.id;
  }

  findMaterialsPerProductId(id)
    .then(([Product]) => {
      if (Product.length === 0) {
        res.status(404).send('Material not found for this product');
      } else {
        req.product = { materials: Product };
        next();
      }
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  getAllMaterials,
  getOneMaterialsById,
  createOneMaterials,
  createAssetMaterial,
  updateOneMaterials,
  deleteOneMaterials,
  getMaterialsByProductId,
};
