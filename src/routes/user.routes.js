const { Router } = require("express")
const UserController = require("../controllers/UserController")
const userRoutes = Router()
const userController = new UserController

userRoutes.get("/:user_id", userController.showUserById)
userRoutes.post("/", userController.createUser)
userRoutes.put("/:user_id", userController.updateUser)
userRoutes.delete("/:user_id", userController.deleteUser)

module.exports = userRoutes