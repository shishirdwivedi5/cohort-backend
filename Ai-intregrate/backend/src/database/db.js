const mongoose = require("mongoose")

function connectDB (){
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("DB connected")
    })
}

module.exports = connectDB

