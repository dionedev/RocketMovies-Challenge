const knex = require("../database/knex")
const ErrorHandling = require("../utils/errorHandling")

class UserController {
  async createUser(request, response) {
    const { name, email, password } = request.body

    const checkUserExists = await knex("users")
    .select("email")
    .where("email", "=", email)
    .first()

    if(checkUserExists) {
      throw new ErrorHandling("Este email já está sendo utilizado")
    }
    
    await knex("users").insert({ name, email, password })

    return response.status(201).json({
      message: "Usuário cadastrado com sucesso"
    })
  }

  async showUserById(request, response) {
    const { id } = request.params

    const user = await knex("users").where({ id })
    
    if(user.length != 1) {
      throw new ErrorHandling("Não foi possível encontrar este usuário", 404)
    }

    response.status(200).json({ user })
  }

  async deleteUser(request, response) {
    const { user_id } = request.params

    await knex("users").delete().where({ id: user_id })

    response.status(200).json({ message: "Usuário deletado com sucesso."})
  }
}
module.exports = UserController