const mongoose = require("mongoose")
function connectDB (){
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("DB Connected sussefull")
    }).catch(()=>{
        console.log("DB not connected")
    })
}

module.exports = connectDB