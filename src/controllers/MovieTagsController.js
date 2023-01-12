const knex = require("../database/knex")

class MovieTagsController {
  async listAllMovieTags(request, response) {
    const { user_id } = request.params

    const movieTags = await knex("movie_tags").where({ user_id })

    response.status(200).json({ movieTags })
  }
}

module.exports = MovieTagsController