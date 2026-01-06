const mongoose = require("mongoose")

const songSchame = new mongoose.Schema({
    title : String,
    auther : String,
    mood : String,
    song : String,
})

const songModels = mongoose.model("song",songSchame)

module.exports = songModels