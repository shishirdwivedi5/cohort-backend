const multer = require("multer");

const fileFilter = (req, file, cb) => {
  if (   file.mimetype.startsWith("audio/") ) {
    cb(null, true);
  } else {
    cb(console.error("this is not a right  file  "), false);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

module.exports = upload;
