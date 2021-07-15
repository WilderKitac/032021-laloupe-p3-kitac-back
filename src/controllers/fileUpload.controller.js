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
      console.log('1');
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

module.exports = {
  uploadImage,
};
