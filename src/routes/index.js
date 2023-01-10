const { Router } = require("express")
const userRoutes = require("./user.routes")
const movieNotesRoutes = require("./movieNotes.routes")

const routes = Router()

routes.use("/user", userRoutes)
routes.use("/notes", movieNotesRoutes)

module.exports = routes