const { Router } = require("express")
const userRoutes = require("./user.routes")
const movieNotesRoutes = require("./movieNotes.routes")

const routes = Router()

routes.use("/create-user", userRoutes)
routes.use("/movie-note", movieNotesRoutes)

module.exports = routes