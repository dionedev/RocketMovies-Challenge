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
}
module.exports = UserController