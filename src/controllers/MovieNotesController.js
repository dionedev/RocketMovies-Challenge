const knex = require("../database/knex")

class MovieNotesController {
  async createNote(request, response) {
    const { title, description, rating, tags } = request.body
    const { user_id } = request.params

    const note_id = await knex("movie_notes").insert(
      {
        title,
        description,
        rating,
        user_id
      }
    )

    const tagsInsert = tags.map(tag => {
      return {
        name: tag,
        note_id,
        user_id,
      }
    })

    await knex("movie_tags").insert(tagsInsert)

    response.status(201).json(
      { message: "Nota cadastrada com sucesso" }
    )
  }

  async listAll(request, response) {
    const allMovieNotes = await knex("movie_notes")

    response.status(200).json({allMovieNotes})
  }
}
module.exports = MovieNotesController