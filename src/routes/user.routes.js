const { Router } = require("express")
const UserController = require("../controllers/userController")
const userRoutes = Router()
const userController = new UserController

userRoutes.post("/", userController.createNewUser)

module.exports = userRoutes