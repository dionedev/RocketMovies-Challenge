const { Router } = require("express")
const UserController = require("../controllers/UserController")
const userRoutes = Router()
const userController = new UserController

userRoutes.get("/:id", userController.showUserById)
userRoutes.post("/", userController.createUser)
userRoutes.delete("/:user_id", userController.deleteUser)

module.exports = userRoutes