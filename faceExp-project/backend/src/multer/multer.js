const multer  = require('multer')

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("audio/")) {
    cb(null, true);   // file allow
  } else {
    cb(new Error("File type not matched. Only audio files allowed"), false);
  }
};


const storage = multer.memoryStorage()
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits : {
        fileSize : 8 * 1024 * 1024
    }
 })


module.exports = upload