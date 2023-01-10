const { Router } = require("express")
const MovieNotesController = require("../controllers/MovieNotesController")

const movieNotesController = new MovieNotesController
const movieNotesRoutes = Router()

movieNotesRoutes.get("/", movieNotesController.listAll)
movieNotesRoutes.post("/:user_id", movieNotesController.createNote)

module.exports = movieNotesRoutes
