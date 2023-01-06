const { Router } = require("express")
const userRoutes = require("./user.routes")

const routes = Router()

routes.use("/create-user", userRoutes)

module.exports = routes