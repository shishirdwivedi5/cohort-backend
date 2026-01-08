const express = require("express")
const {UserController} = require("../controllers/user.controller")
const {LoginController} = require("../controllers/user.controller")
const {UplodeRoute} = require("../controllers/user.controller")
const uplode = require('../multer/user.multer')
const routes = express.Router()

routes.post("/register" , UserController)
routes.post("/login",LoginController)
routes.post("/uplode" , uplode.single("image") , UplodeRoute)

module.exports = routes
