require("dotenv").config();
const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())
const connectDB = require("./database/db")
connectDB()
app.use(express.json())
const songRoute = require('./routes/song.route')
app.use("/song",songRoute)




module.exports = app