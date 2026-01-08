require("dotenv").config()
const express = require("express")
const connectDB = require("./database/db")
const cookie = require("cookie-parser")
const cors = require("cors")
const app = express()

app.use(cors())

connectDB()
app.use(cookie())
app.use(express.json())
const userRoutes = require("./routes/user.route")
app.use('/auth', userRoutes)


module.exports = app 