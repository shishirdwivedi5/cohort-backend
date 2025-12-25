const mongoose = require('mongoose')
function connectDB(){
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("Database connected successfully")
    })
} 

module.exports = connectDB