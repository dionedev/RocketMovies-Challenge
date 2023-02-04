const knex = require("../database/knex")
const ErrorHandling = require("../utils/errorHandling")

class MovieNotesController {
  async createNote(request, response) {
    const { title, description, rating, tags } = request.body
    const { user_id } = request.params

    const userExists = await knex("users").where({ id: user_id }).first()

    if(!userExists) {
      throw new ErrorHandling("Não é possível criar esta nota, pois este usuário não existe.", 404)
    }

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

  async listAllUserNotes(request, response) {
    const { user_id } = request.params
    const { title, tags } = request.query

    let allMovieNotes

    const noteExists = await knex("movie_notes").where({ user_id }).first()

    if(!noteExists) {
      throw new ErrorHandling("Não há notas cadastrada ainda.")
    }
    
    if(tags) {
      const filterTags = tags.split(",").map(tag => tag.trim())

      allMovieNotes = await knex("movie_tags")
      .select(["movie_notes.id", "movie_notes.title", "movie_notes.user_id"])
      .where("movie_notes.user_id", user_id)
      .whereIn("name", filterTags)
      .whereLike("movie_notes.title", `%${ title }%`)
      .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
      .orderBy("movie_notes.title")
    }
    else {
      allMovieNotes = await knex("movie_notes")
      .where({ user_id })
      .orderBy("rating", "desc")
    }

    const userRelatedTags = await knex("movie_tags").where({ user_id })
    const movieTagsAndNotes = allMovieNotes.map(note => {
      const noteTags = userRelatedTags.filter(tag => tag.note_id === note.id)

      return {
        ...note,
        tags: noteTags
      }
    })
    
    response.status(200).json({ movieTagsAndNotes })
  }

  async deleteNote(request, response) {
    const { note_id } = request.params

    await knex("movie_notes").delete().where({ id: note_id })

    response.status(200).json({
      message: "Nota excluída com sucesso"
    })
  } 
}
module.exports = MovieNotesController