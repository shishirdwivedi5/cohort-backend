const mongooes = require('mongoose')

const songSchame = new mongooes.Schema({
   title:String,
    song : String,
    mood : String,
})

const songModels =  mongooes.model("song",songSchame)

module.exports = songModels