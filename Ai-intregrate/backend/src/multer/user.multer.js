const multer = require("multer")

const uplode = multer({storage : multer.memoryStorage()})

module.exports = uplode