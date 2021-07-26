const multer = require('multer');

const uploadImage = (req, res, next) => {
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
      res.status(500).json('err');
    } else {
      const configuration = JSON.parse(req.body.configuration);
      req.itemAndImg = {
        image: req.file.filename,
        ...configuration,
      };
      next();
    }
  });
};

const uploadMultImages = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/image');
    },
    filename: (_, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const uploadMultiple = multer({ storage: storage }).array('files', 5);
  uploadMultiple(req, res, (err) => {
    if (err) {
      res.status(500).json('err');
    } else {
      const imgProperty = req.files;
      const imgToCreate = [];
      imgProperty.forEach((e) => imgToCreate.push([e.filename, e.originalname.split('.')[0]]));
      req.prodImages = imgToCreate;
      next();
    }
  });
};

module.exports = {
  uploadImage,
  uploadMultImages,
};
