require("dotenv").config();
const express = require("express");
const app = express();
var cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectDB = require("./database/db");
//connectDB
connectDB();
//
//middleware

// route
const songRoute = require("./routes/song.route");
app.use("/song", songRoute);







module.exports = app;

// this is crter create file yaha sirf hmm ne express ko create kiya hai
