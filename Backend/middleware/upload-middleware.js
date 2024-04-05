const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.resolve(__dirname, '..', 'upload');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const filename = `${uuidv4()}${file.originalname}`;
      cb(null, filename);
    },
  });
  
  const upload = multer({ storage: storage });

  module.exports = upload;